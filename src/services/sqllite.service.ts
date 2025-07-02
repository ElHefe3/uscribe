import { openDb } from "../db/sqlite";

export async function saveNewDocument(doc: {
  id: string;
  originalname: string;
  filename: string;
  mimetype: string;
  path: string;
  status: string;
  uploadedAt: string;
}) {
  const db = await openDb();
  await db.run(
    `INSERT INTO documents (id, originalname, filename, mimetype, path, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    doc.id, doc.originalname, doc.filename, doc.mimetype, doc.path, doc.status, doc.uploadedAt
  );
}
