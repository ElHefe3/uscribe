import crypto from "node:crypto";
import { Request, Response } from "express";

import { pushToQueue, setStatus } from "../services/redis.services";
import { uploadedDocumentSchema } from "../schemas/document.schema";
import { getAllDocuments, getDocumentById, saveNewDocument } from "../services/sqllite.service";     

export async function uploadDocument(req: Request, res: Response): Promise<void> {
    try {
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
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getDocument(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const document = await getDocumentById(id);

    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
}

export async function getDocuments(req: Request, res: Response): Promise<void> {
  try {
    const documents = await getAllDocuments();
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
}

