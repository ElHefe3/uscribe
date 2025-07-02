import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

export const openDb = async () => {
  const dbDir = path.resolve(__dirname, "../../data");
  const dbPath = path.join(dbDir, "uscribe.db");

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};
