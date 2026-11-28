import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { defaultUrlTransform } from "react-markdown";
import { imageKey } from "./about-content";
type Node = { type: string; url?: string; alt?: string | null; identifier?: string; children?: Node[] };
const parser = unified().use(remarkParse).use(remarkGfm);

// Parse Markdown rather than matching text: reference images work, code is ignored.
export function markdownImages(markdown: string): { src: string; alt: string }[] {
  const root: Node = parser.parse(markdown);
  const definitions = new Map<string, string>();
  function walk(node: Node, visit: (node: Node) => void) {
    visit(node); node.children?.forEach(child => walk(child, visit));
  }
  walk(root, node => {
    if (node.type === "definition" && node.identifier && node.url && !definitions.has(node.identifier.toLowerCase())) definitions.set(node.identifier.toLowerCase(), node.url);
  });
  const images = new Map<string, { src: string; alt: string }>();
  walk(root, node => {
    const url = node.type === "image" ? node.url : node.type === "imageReference" ? definitions.get(node.identifier?.toLowerCase() ?? "") : undefined;
    const src = url ? defaultUrlTransform(url) : "";
    if (src && !images.has(imageKey(src))) images.set(imageKey(src), { src, alt: node.alt || "Image" });
  });
  return [...images.values()];
}
