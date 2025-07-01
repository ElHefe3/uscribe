import { Request, Response } from "express";
import { pushToQueue, setStatus } from "../services/redis.services";


export async function uploadDocument(req: Request, res: Response) {
    const doc = {
        id: crypto.randomUUID(),
        filename: req.body.filename,
        uploadedAt: new Date().toISOString()
    };

    await pushToQueue("doc:queue", doc);
    await setStatus(`doc:status:${doc.id}`, "queued");

    res.status(202).json({ message: "Document queued", docId: doc.id });
}