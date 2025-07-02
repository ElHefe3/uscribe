import { z } from "zod";

export const ocrResultSchema = z.object({
  text: z.string().min(1),
  confidence: z.number().min(0).max(1),
  language: z.string().min(2).max(20),
});

export type OCRResult = z.infer<typeof ocrResultSchema>;
