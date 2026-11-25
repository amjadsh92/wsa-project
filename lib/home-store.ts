import "server-only";
import { db } from "./db";
import { defaultHomeContent, parseHomeContent, type HomeContent, type HomeDocument } from "./home-content";
import type { HomeSettings } from "@/generated/prisma/client";

export class ContentConflict extends Error {}
export class ContentValidationError extends Error {}
const defaults = () => ({ draft: defaultHomeContent, published: defaultHomeContent });
function toDocument(row: HomeSettings): HomeDocument {
  return {
    revision: row.revision,
    draft: parseHomeContent(row.draft), published: parseHomeContent(row.published),
    savedAt: row.savedAt?.toISOString() ?? null, publishedAt: row.publishedAt?.toISOString() ?? null,
  };
}
export async function readHomeDocument(): Promise<HomeDocument> {
  const row = await db.homeSettings.upsert({ where: { id: 1 }, create: { id: 1, ...defaults() }, update: {} });
  return toDocument(row);
}
export async function writeHomeDocument(content: HomeContent, expectedRevision: number, publish: boolean): Promise<HomeDocument> {
  await readHomeDocument();
  return db.$transaction(async tx => {
    const assets = await tx.imageAsset.count({ where: { id: { in: content.images.map(image => image.id) } } });
    if (assets !== content.images.length) throw new ContentValidationError("An uploaded image is missing. Please upload it again.");
    const now = new Date();
    const updated = await tx.homeSettings.updateMany({
      where: { id: 1, revision: expectedRevision },
      data: { draft: content, savedAt: now, revision: { increment: 1 }, ...(publish ? { published: content, publishedAt: now } : {}) },
    });
    if (!updated.count) throw new ContentConflict("Someone saved a newer draft. Reload the panel before saving again.");
    const row = await tx.homeSettings.findUniqueOrThrow({ where: { id: 1 } });
    return toDocument(row);
  });
}
