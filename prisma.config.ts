import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "node:path";
import { closeSync, mkdirSync, openSync } from "node:fs";

const databaseUrl = process.env.DATABASE_URL ?? `file:${path.join(process.cwd(), "data", "site.db")}`;
// Ensure a fresh checkout can run migrate deploy before the app has opened SQLite.
if (databaseUrl.startsWith("file:")) {
  const databasePath = databaseUrl.slice(5);
  mkdirSync(path.dirname(databasePath), { recursive: true });
  closeSync(openSync(databasePath, "a"));
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: databaseUrl },
});
