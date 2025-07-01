import { connectRedis, popFromQueue, setStatus } from "../services/redis.services";
import { simulateOCR } from "../services/ocr.service";
import { openDb } from "../db/sqlite";

async function processJobs() {
  await connectRedis();
  while (true) {
    const doc = await popFromQueue("doc:queue");
    if (!doc) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }

    console.log("🛠 Processing:", doc.id);
    await setStatus(`doc:status:${doc.id}`, "processing");

    try {
      const ocr = await simulateOCR(Buffer.from("image"));
      const db = await openDb();
      await db.run(
        "INSERT INTO documents (id, filename, text, status) VALUES (?, ?, ?, ?)",
        doc.id, doc.filename, ocr.text, "processed"
      );
      await setStatus(`doc:status:${doc.id}`, "processed");
    } catch (err) {
      console.error("❌ Error:", err);
      await setStatus(`doc:status:${doc.id}`, "failed");
    }
  }
}

processJobs();
