import fs from "fs/promises";
import { connectRedis, popFromQueue, setStatus } from "../services/redis.services";
import { simulateOCR } from "../services/ocr.service";
import { openDb } from "../db/sqlite";
import { uploadedDocumentSchema } from "../schemas/document.schema";
import { ocrResultSchema } from "../schemas/ocr.schema";

async function processJobs() {
  await connectRedis();

  while (true) {
    const rawDoc = await popFromQueue("doc:queue");

    if (!rawDoc) {
      await delay(1000);
      continue;
    }

    const parsed = uploadedDocumentSchema.safeParse(rawDoc);
    if (!parsed.success) {
      continue;
    }

    const doc = parsed.data;
    await setStatus(`doc:status:${doc.id}`, "processing");

    try {
      const fileBuffer = await fs.readFile(doc.path);
      const ocr = await simulateOCR(fileBuffer);

      const ocrParsed = ocrResultSchema.safeParse(ocr);
      if (!ocrParsed.success) {
        console.error("❌ Invalid OCR result:", ocrParsed.error.flatten());
        await setStatus(`doc:status:${doc.id}`, "failed");
        continue;
      }

      const db = await openDb();
      await db.run(
        `UPDATE documents
         SET status = ?, text = ?, confidence = ?, language = ?
         WHERE id = ?`,
        "processed",
        ocr.text,
        ocr.confidence,
        ocr.language,
        doc.id
      );

      await setStatus(`doc:status:${doc.id}`, "processed");
    } catch (err) {
      await setStatus(`doc:status:${doc.id}`, "failed");
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

processJobs();
