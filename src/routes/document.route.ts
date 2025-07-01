import { Router } from "express";
import { uploadDocument } from "../controllers/document.controller";

export const documentRouter = Router();

documentRouter.post("/upload", uploadDocument);
