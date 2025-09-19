import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export const dbPath = path.join(dataDir, "db.json");

type DBSchema = {
  lastId: number;
  resources: any[];
};

export function readDB(): DBSchema {
  if (!fs.existsSync(dbPath)) {
    const fresh: DBSchema = { lastId: 0, resources: [] };
    fs.writeFileSync(dbPath, JSON.stringify(fresh, null, 2), "utf8");
    return fresh;
  }
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw) as DBSchema;
}

export function writeDB(data: DBSchema) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}
