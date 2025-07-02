import crypto from "node:crypto";
import { Request, Response } from "express";

import { pushToQueue, setStatus } from "../services/redis.services";
import { uploadedDocumentSchema } from "../schemas/document.schema";
import { saveNewDocument } from "../services/sqllite.service";     

export async function uploadDocument(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }

  const doc = {
    id: crypto.randomUUID(),
    originalname: req.file.originalname,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    path: req.file.path,
    status: "queued",
    createdAt: new Date().toISOString(),
  };

  const parsed = uploadedDocumentSchema.safeParse(doc);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid file data", issues: parsed.error.flatten() });
    return;
  }

  await saveNewDocument(doc);
  await pushToQueue("doc:queue", doc);
  await setStatus(`doc:status:${doc.id}`, "queued");

  res.status(202).json({ message: "Document uploaded and queued", docId: doc.id });
}
