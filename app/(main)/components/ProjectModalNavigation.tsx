"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const ProjectModalNavigationContext = createContext<{
  fadeIn: boolean;
  openRelated: (href: string) => void;
  finishTransition: () => void;
}>({
  fadeIn: false,
  openRelated: () => {},
  finishTransition: () => {},
});

export function ProjectModalNavigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const outgoingLayer = useRef<HTMLDivElement>(null);

  const finishTransition = () => {
    outgoingLayer.current?.replaceChildren();
  };

  const openRelated = (href: string) => {
    const modal = document.querySelector<HTMLElement>("[data-project-modal]");
    const layer = outgoingLayer.current;

    if (modal && layer) {
      // Preserve the outgoing view at its current scroll position. This is a
      // visual snapshot only: it cannot receive focus or handle navigation.
      const snapshot = modal.cloneNode(true) as HTMLElement;
      snapshot.removeAttribute("data-project-modal");
      snapshot.removeAttribute("id");
      snapshot.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
      snapshot.inert = true;
      snapshot.setAttribute("aria-hidden", "true");
      snapshot.style.pointerEvents = "none";
      layer.replaceChildren(snapshot);
      snapshot.scrollTop = modal.scrollTop;
    }

    setRelatedPath(href);
  };
  const [relatedPath, setRelatedPath] = useState<string | null>(null);
  const [previousPath, setPreviousPath] = useState(pathname);

  // Keep the transition across the intercepted page's remount, but reset it
  // when leaving that project (including browser Back navigation).
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    if (relatedPath !== pathname) setRelatedPath(null);
  }

  useEffect(() => {
    if (relatedPath === null) finishTransition();
  }, [pathname, relatedPath]);

  return (
    <ProjectModalNavigationContext.Provider
      value={{ fadeIn: relatedPath === pathname, openRelated, finishTransition }}
    >
      <div ref={outgoingLayer} aria-hidden="true" inert />
      {children}
    </ProjectModalNavigationContext.Provider>
  );
}

export const InProjectModalContext = createContext(false);

export function useProjectModalNavigation() {
  return useContext(ProjectModalNavigationContext);
}
