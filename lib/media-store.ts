import "server-only";
import path from "node:path";
export const mediaDirectory = path.resolve(/* turbopackIgnore: true */ process.env.UPLOAD_DIR ?? path.join(process.cwd(), "data", "uploads"));
export const validMediaId = (id: string) => /^[a-f0-9-]{36}\.webp$/.test(id);
