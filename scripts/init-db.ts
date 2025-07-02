import { openDb } from "../src/db/sqlite";

const init = async () => {
    const db = await openDb();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            originalname TEXT NOT NULL,
            filename TEXT NOT NULL,
            mimetype TEXT NOT NULL,
            path TEXT NOT NULL,
            status TEXT NOT NULL,
            text TEXT,
            confidence REAL,
            language TEXT,
            createdAt TEXT NOT NULL
        );
    `);

    await db.close();
};

init().catch((err) => {
    console.error("❌ Failed to initialize DB:", err);
});
