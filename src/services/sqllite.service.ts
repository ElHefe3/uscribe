import { openDb } from "../db/sqlite";

export interface NewDocument {
  id: string;
  originalname: string;
  filename: string;
  mimetype: string;
  path: string;
  status: string;
  createdAt: string;
}

export async function saveNewDocument(doc: NewDocument): Promise<void> {
  const db = await openDb();

  try {
    await db.run(
      `INSERT INTO documents (
        id,
        originalname,
        filename,
        mimetype,
        path,
        status,
        createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      doc.id,
      doc.originalname,
      doc.filename,
      doc.mimetype,
      doc.path,
      doc.status,
      doc.createdAt
    );
  } catch (err) {
    throw err;
  }
}
