import { Request, Response } from "express";
import { pushToQueue, setStatus } from "../services/redis.services";
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
        uploadedAt: new Date().toISOString(),
    };

    await saveNewDocument(doc);
    await pushToQueue("doc:queue", doc);
    await setStatus(`doc:status:${doc.id}`, "queued");

    res.status(202).json({ message: "Document uploaded and queued", docId: doc.id });
}
