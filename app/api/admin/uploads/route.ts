import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db";
import { mediaDirectory } from "@/lib/media-store";
import { MAX_UPLOAD_BYTES } from "@/lib/home-content";
import { apiError, checkOrigin, readLimitedBody, RequestError } from "@/lib/admin-request";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const bytes = await readLimitedBody(request, MAX_UPLOAD_BYTES + 64 * 1024);
    let form;
    try { form = await new Response(bytes, { headers: { "Content-Type": request.headers.get("content-type") ?? "" } }).formData(); }
    catch { throw new RequestError("Choose an image file to upload."); }
    const file = form.get("image");
    if (!(file instanceof File) || !file.size) throw new RequestError("Choose an image file to upload.");
    if (file.size > MAX_UPLOAD_BYTES) throw new RequestError("Images must be 10 MB or smaller.", 413);
    let result;
    try {
      const input = Buffer.from(await file.arrayBuffer());
      const metadata = await sharp(input, { limitInputPixels: 50_000_000 }).metadata();
      if (!["jpeg", "png", "webp"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) throw new Error("Unsupported image");
      result = await sharp(input, { limitInputPixels: 50_000_000 }).rotate().resize({ width: 4096, height: 4096, fit: "inside", withoutEnlargement: true }).webp({ quality: 90 }).toBuffer({ resolveWithObject: true });
    } catch { throw new RequestError("Use a valid, still JPG, PNG or WebP image (up to 50 megapixels)."); }
    const id = `${randomUUID()}.webp`;
    await mkdir(mediaDirectory, { recursive: true });
    const target = path.join(mediaDirectory, id);
    await writeFile(target, result.data, { flag: "wx" });
    try { await db.imageAsset.create({ data: { id, originalName: file.name.slice(0, 255), width: result.info.width, height: result.info.height, bytes: result.data.byteLength } }); }
    catch (error) { await unlink(target); throw error; }
    return Response.json({ id, src: `/api/media/${id}`, alt: file.name.replace(/\.[^.]+$/, "").slice(0, 160), x: 50, y: 50 }, { status: 201 });
  } catch (error) { return apiError(error); }
}
