import { readFile } from "node:fs/promises";
import path from "node:path";
import { mediaDirectory, validMediaId } from "@/lib/media-store";

export const runtime = "nodejs";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!validMediaId(id)) return new Response("Not found", { status: 404 });
  try {
    const bytes = await readFile(path.join(mediaDirectory, id));
    return new Response(bytes, { headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response("Not found", { status: 404 });
    throw error;
  }
}
