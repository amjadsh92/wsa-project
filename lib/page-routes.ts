import "server-only";
import { notFound } from "next/navigation";
import { readHomeDocument } from "./home-store";
import { pageIds, pageSlug } from "./home-content";
export async function resolvePage(segment: string) {
  const { published } = await readHomeDocument();
  const id = pageIds.find(id => pageSlug(published.navigation[id]) === segment);
  if (!id) notFound();
  return id;
}
