"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { modalReloadKey, parseModalReloadSnapshot, type ModalReloadSnapshot } from "./projectModalReloadState";
import { setHomeModalRestoration } from "@/app/home/components/homeModalRestoration";
import { setModalRestorationProject } from "./modalRestorationAnimation";

function revealBackground(keepLoadingModal = false) {
  document.documentElement.removeAttribute("data-project-restoring");
  document.getElementById("project-reload-preview")?.replaceChildren();
  if (!keepLoadingModal) {
    document.documentElement.removeAttribute("data-project-modal-loading");
    document.documentElement.removeAttribute("data-project-modal-entrance");
  }
}

export default function ProjectModalReload({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const background = useRef(pathname);
  const restore = useRef<(ModalReloadSnapshot & { phase: "background" | "modal" }) | null>(null);

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const saved = parseModalReloadSnapshot(sessionStorage.getItem(modalReloadKey), pathname);
        sessionStorage.removeItem(modalReloadKey);
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        if (saved && navigation?.type !== "back_forward") {
          restore.current = { ...saved, phase: "background" };
          background.current = saved.background;
          setHomeModalRestoration(saved.background === "/" ? saved.pageScroll : null);
          setModalRestorationProject(saved.project);
          // Both replacements preserve the existing Back-button history.
          router.replace(saved.background, { scroll: false });
        } else {
          revealBackground();
        }
      } catch {
        revealBackground();
      }
    }

    const pending = restore.current;
    let frame = 0;
    if (pending?.phase === "background" && pathname === pending.background) {
      // Keep the same modal frame visible while the background route mounts.
      revealBackground(true);
      window.scrollTo(0, pending.pageScroll);
      frame = requestAnimationFrame(() => {
        window.scrollTo(0, pending.pageScroll);
        pending.phase = "modal";
        router.replace(pending.project, { scroll: false });
      });
    } else if (pending?.phase === "modal" && pathname === pending.project) {
      // The route portals its content into the already visible modal frame.
      restore.current = null;
      setHomeModalRestoration(null);
      setModalRestorationProject(null);
      revealBackground(true);
    } else if (!pending && !document.querySelector("[data-project-modal]")) {
      background.current = pathname;
    } else if (pending && pathname !== pending.project && pathname !== pending.background) {
      restore.current = null;
      setHomeModalRestoration(null);
      setModalRestorationProject(null);
      background.current = pathname;
      revealBackground();
    }

    const fallback = pending ? window.setTimeout(() => {
      cancelAnimationFrame(frame);
      restore.current = null;
      setHomeModalRestoration(null);
      setModalRestorationProject(null);
      revealBackground();
    }, 10000) : undefined;

    const save = () => {
      if (restore.current) return;
      const modal = document.querySelector<HTMLElement>("[data-project-modal]");
      try {
        if (modal && container.current) {
          const copy = container.current.cloneNode(true) as HTMLElement;
          copy.querySelectorAll("[data-project-modal-layer],[data-home-intro-overlay],script").forEach(node => node.remove());
          copy.querySelectorAll(".animate-logo-enter").forEach(node => {
            node.classList.remove("animate-logo-enter", "opacity-0");
            node.classList.add("opacity-100");
          });
          sessionStorage.setItem(modalReloadKey, JSON.stringify({
            project: pathname,
            background: background.current,
            pageScroll: window.scrollY,
            html: copy.innerHTML,
            backgroundColor: getComputedStyle(document.body).backgroundColor,
            savedAt: Date.now(),
          } satisfies ModalReloadSnapshot));
          // Keep this frame visible until the new document takes over.
          document.documentElement.setAttribute("data-project-modal-loading", "");
        } else {
          sessionStorage.removeItem(modalReloadKey);
        }
      } catch {
        // Disabled storage must not interrupt normal navigation.
      }
    };
    const resume = () => {
      // BFCache restores the existing modal rather than bootstrapping a new one.
      if (!restore.current && document.querySelector("[data-project-modal]")) {
        document.documentElement.removeAttribute("data-project-modal-loading");
      }
    };
    window.addEventListener("beforeunload", save);
    window.addEventListener("pagehide", save);
    window.addEventListener("pageshow", resume);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("pageshow", resume);
    };
  }, [pathname, router]);

  return <div ref={container} className="project-route-shell contents">{children}</div>;
}
