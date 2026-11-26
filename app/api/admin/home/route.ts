import { parseHomeContent } from "@/lib/home-content";
import { readHomeDocument, writeHomeDocument, ContentConflict, ContentValidationError } from "@/lib/home-store";
import { apiError, checkOrigin, readLimitedBody, RequestError } from "@/lib/admin-request";

export const runtime = "nodejs";
export async function GET() {
  try { return Response.json(await readHomeDocument(), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return apiError(error); }
}
async function save(request: Request, publish: boolean) {
  try {
    checkOrigin(request);
    let payload;
    try { payload = JSON.parse((await readLimitedBody(request, 3 * 1024 * 1024)).toString()); }
    catch (error) { if (error instanceof RequestError) throw error; throw new RequestError("Invalid settings request."); }
    if (!payload || !Number.isInteger(payload.revision) || payload.revision < 0) throw new RequestError("Invalid draft revision.");
    let content;
    try { content = parseHomeContent(payload.content); }
    catch (error) { throw new RequestError(error instanceof Error ? error.message : "Invalid settings."); }
    return Response.json(await writeHomeDocument(content, payload.revision, publish), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ContentValidationError) return Response.json({ error: error.message }, { status: 400 });
    if (error instanceof ContentConflict) return Response.json({ error: error.message }, { status: 409 });
    return apiError(error);
  }
}
export const PUT = (request: Request) => save(request, false);
export const POST = (request: Request) => save(request, true);
