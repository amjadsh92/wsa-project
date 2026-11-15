"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

import { InProjectModalContext, useProjectModalNavigation } from "./ProjectModalNavigation";
import { useModalRestorationProject } from "./modalRestorationAnimation";

const subscribeToHost = () => () => {};
const getHost = () => document.getElementById("project-modal-content");
const getServerHost = () => null;

export default function ProjectModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const restorationProject = useModalRestorationProject();
  const [skipEntrance] = useState(() => restorationProject === pathname);
  // The root layout owns this DOM node throughout loading and navigation.
  const host = useSyncExternalStore(subscribeToHost, getHost, getServerHost);
  const { fadeIn, finishTransition } = useProjectModalNavigation();
  const finishRelatedTransition = useEffectEvent(finishTransition);
  const prefersReducedMotion = useReducedMotion();
  const [hasArrived, setHasArrived] = useState(fadeIn || skipEntrance);
  const [isClosing, setIsClosing] = useState(false);
  const isReady = hasArrived || Boolean(prefersReducedMotion);

  useLayoutEffect(() => {
    const modal = document.getElementById("project-modal-frame");
    if (!host || !modal) return;
    const previouslyFocused = document.activeElement;
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousScrollbarGutter = root.style.scrollbarGutter;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    root.style.scrollbarGutter = "auto";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    modal.setAttribute("data-project-modal", "");
    modal.scrollTop = 0;
    // Restoration already started its CSS slide before React loaded. Normal
    // openings use the entrance below instead of replaying that CSS animation.
    if (!skipEntrance) root.removeAttribute("data-project-modal-entrance");
    // Activation and removal of the loading flag happen in the same commit:
    // neither the frame nor its panel is replaced or hidden.
    root.removeAttribute("data-project-modal-loading");

    const entrance = !fadeIn && !skipEntrance && !prefersReducedMotion
      ? host.animate([{ transform: "translateY(100vh)" }, { transform: "translateY(0)" }], {
          duration: 500, easing: "cubic-bezier(0.22, 0, 0.18, 1)",
        })
      : null;
    entrance?.finished.then(() => setHasArrived(true)).catch(() => {});
    const crossfade = fadeIn && !skipEntrance
      ? modal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: prefersReducedMotion ? 150 : 850 })
      : null;
    crossfade?.finished.then(() => finishRelatedTransition()).catch(() => {});

    return () => {
      entrance?.cancel();
      crossfade?.cancel();
      modal.removeAttribute("data-project-modal");
      // React may immediately activate this same frame again (Strict Mode).
      // Clear the restoration animation only if the modal really stayed closed.
      queueMicrotask(() => {
        if (!modal.hasAttribute("data-project-modal")) {
          root.removeAttribute("data-project-modal-entrance");
        }
      });
      root.style.overflow = previousRootOverflow;
      root.style.scrollbarGutter = previousScrollbarGutter;
      document.body.style.paddingRight = previousPaddingRight;
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [host, fadeIn, skipEntrance, prefersReducedMotion]);

  useLayoutEffect(() => {
    const modal = document.getElementById("project-modal-frame");
    if (!host || !modal) return;
    modal.inert = isClosing;
    modal.style.overflowY = isReady && !isClosing ? "scroll" : "hidden";
    return () => { modal.inert = false; modal.style.overflowY = ""; };
  }, [host, isClosing, isReady]);

  useEffect(() => {
    const modal = document.getElementById("project-modal-frame");
    if (isReady && !isClosing && modal && !modal.contains(document.activeElement)) {
      modal.focus({ preventScroll: true });
    }
  }, [host, isReady, isClosing]);

  useEffect(() => {
    const modal = document.getElementById("project-modal-frame");
    if (!host || !modal || !isClosing) return;
    const exit = modal.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: prefersReducedMotion ? 150 : 200, fill: "forwards",
    });
    exit.finished.then(() => router.back()).catch(() => {});
    return () => exit.cancel();
  }, [host, isClosing, prefersReducedMotion, router]);

  if (!host) return null;
  return createPortal(
    <>
      <div className="sticky top-6 z-20 flex h-0 justify-end pr-6 max-[960px]:top-[max(0.75rem,env(safe-area-inset-top))] max-[960px]:pr-[max(0.75rem,env(safe-area-inset-right))]">
        <button
          onClick={() => { finishTransition(); setIsClosing(true); }}
          disabled={isClosing}
          aria-label="Close project"
          className="flex h-12 w-12 items-center justify-center text-black text-[2.25rem] font-light leading-none cursor-pointer [text-shadow:0_0_0.125rem_white,0_0_0.25rem_white,0_0_0.375rem_white]"
        >
          ×
        </button>
      </div>
      <motion.div
        data-project-modal-content
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.15 : skipEntrance ? 0.3 : 0.85, ease: [0.22, 0, 0.18, 1] }}
      >
        <InProjectModalContext.Provider value={true}>{children}</InProjectModalContext.Provider>
      </motion.div>
    </>,
    host,
  );
}
