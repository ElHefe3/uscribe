import { z } from "zod";

export const uploadedDocumentSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  path: z.string().min(1),
  createdAt: z.string().datetime(),
});

export type UploadedDocument = z.infer<typeof uploadedDocumentSchema>;
