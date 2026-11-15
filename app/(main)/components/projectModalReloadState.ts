export const modalReloadKey = "project-modal-reload";

export type ModalReloadSnapshot = {
  project: string;
  background: string;
  pageScroll: number;
  html: string;
  backgroundColor: string;
  savedAt: number;
};

// Also embedded in the pre-paint scripts below; keep this self-contained.
export function parseModalReloadSnapshot(raw: string | null, pathname: string): ModalReloadSnapshot | null {
  try {
    if (!raw) return null;
    const value = JSON.parse(raw);
    if (
      value.project !== pathname ||
      !/^\/(art|architecture)\/[^/]+$/.test(value.project) ||
      !["/", "/art", "/architecture", "/about"].includes(value.background) ||
      !Number.isFinite(value.pageScroll) || value.pageScroll < 0 ||
      typeof value.html !== "string" || value.html.length > 2_000_000 ||
      typeof value.backgroundColor !== "string" ||
      !Number.isFinite(value.savedAt) || Date.now() - value.savedAt > 120_000
    ) return null;
    return value;
  } catch {
    return null;
  }
}

// Session storage belongs to this tab. Both reload and same-URL navigation
// can resume its outgoing modal; a copied URL in a new tab has no snapshot.
export function modalReloadHeadScript() {
  return `(() => {
    try {
      const saved = (${parseModalReloadSnapshot.toString()})(sessionStorage.getItem("${modalReloadKey}"), location.pathname);
      const navigation = performance.getEntriesByType("navigation")[0];
      if (saved && navigation?.type !== "back_forward") {
        document.documentElement.setAttribute("data-project-restoring", "");
        document.documentElement.setAttribute("data-project-modal-loading", "");
        document.documentElement.setAttribute("data-project-modal-entrance", "");
        window.setTimeout(() => {
          document.documentElement.removeAttribute("data-project-restoring");
          document.documentElement.removeAttribute("data-project-modal-loading");
          if (!document.querySelector("[data-project-modal]")) {
            document.documentElement.removeAttribute("data-project-modal-entrance");
          }
        }, 10000);
      }
    } catch {}
  })();`;
}

// Paint an inert copy of the unblurred background while Next loads its route.
export function modalReloadPreviewScript() {
  return `(() => {
    if (!document.documentElement.hasAttribute("data-project-restoring")) return;
    try {
      const saved = (${parseModalReloadSnapshot.toString()})(sessionStorage.getItem("${modalReloadKey}"), location.pathname);
      const preview = document.getElementById("project-reload-preview");
      if (!saved || !preview) throw new Error("No preview");
      const parsed = new DOMParser().parseFromString(saved.html, "text/html");
      parsed.querySelectorAll("script,iframe,object,embed,link,meta,base").forEach(node => node.remove());
      parsed.querySelectorAll("*").forEach(node => {
        for (const attribute of Array.from(node.attributes)) {
          if (/^on/i.test(attribute.name) || /^(javascript|vbscript):/i.test(attribute.value.trim())) {
            node.removeAttribute(attribute.name);
          }
        }
      });
      preview.replaceChildren(...Array.from(parsed.body.childNodes));
      preview.style.backgroundColor = saved.backgroundColor;
      preview.scrollTop = saved.pageScroll;
    } catch {
      document.documentElement.removeAttribute("data-project-restoring");
    }
  })();`;
}
