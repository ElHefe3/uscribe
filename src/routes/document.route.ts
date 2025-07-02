import { Router, Request, Response } from "express";
import { upload } from "../middleware/multer";
import { getDocuments, uploadDocument } from "../controllers/document.controller";
import { getDocumentById } from "../services/sqllite.service";

export const documentRouter = Router();

documentRouter.post("/upload", upload.single("file"), uploadDocument);
documentRouter.get("/", getDocuments)

documentRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const docId = req.params.id;

  try {
    const doc = await getDocumentById(docId);
    if (!doc) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

