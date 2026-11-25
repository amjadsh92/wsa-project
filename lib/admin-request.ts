export class RequestError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

// Authentication is intentionally deferred. Reject cross-site browser writes.
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && new URL(origin).host !== request.headers.get("host"))) {
    throw new RequestError("This request must come from the website's own panel.", 403);
  }
}
export async function readLimitedBody(request: Request, maximum: number) {
  if (Number(request.headers.get("content-length")) > maximum) throw new RequestError("The upload is too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError("The request body is empty.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximum) { await reader.cancel(); throw new RequestError("The upload is too large.", 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks);
}
export function apiError(error: unknown) {
  if (error instanceof RequestError) return Response.json({ error: error.message }, { status: error.status });
  console.error("Admin request failed:", error);
  return Response.json({ error: "Unable to save right now. Please try again." }, { status: 500 });
}
