import { Router } from "express";
import { upload } from "../middleware/multer";
import { uploadDocument } from "../controllers/document.controller";

export const documentRouter = Router();

documentRouter.post("/upload", upload.single("file"), uploadDocument);
