import { uploadedDocumentSchema } from "../schemas/document.schema";
import { ocrResultSchema } from "../schemas/ocr.schema";

export function validateUploadedDocument(data: unknown) {
  return uploadedDocumentSchema.safeParse(data);
}

export function validateOCRResult(data: unknown) {
  return ocrResultSchema.safeParse(data);
}
