import "server-only";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
const globalDb = globalThis as unknown as { siteDb?: PrismaClient };
export const db = globalDb.siteDb ?? new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? `file:${path.join(process.cwd(), "data", "site.db")}` }),
});
if (process.env.NODE_ENV !== "production") globalDb.siteDb = db;
