"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function ProjectEntrance({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [entrance, setEntrance] = useState<"hidden" | "animate" | "shown">("hidden");
  const appeared = entrance !== "hidden";
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const card = ref.current;
    const image = card?.querySelector("img");
    if (!card || !image || appeared) return;

    const headers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-gallery-occluder]"),
    );
    let frame = 0;
    let finished = false;

    const checkVisibility = () => {
      frame = 0;
      if (finished) return;
      const bounds = image.getBoundingClientRect();
      if (bounds.height <= 0) return;

      const covers = headers
        .map((header) => header.getBoundingClientRect())
        .sort((a, b) => a.top - b.top);

      // Find the bottom of the header stack connected to the viewport's top.
      // Bottom-pinned headers must not count as part of this stack.
      let topBoundary = 0;
      for (const cover of covers) {
        if (cover.bottom <= 0) continue;
        if (cover.top > topBoundary + 2) break;
        topBoundary = Math.max(topBoundary, cover.bottom);
      }

      // Reveal immediately only when the entire image has passed behind
      // the top header stack. Partially covered images can still animate.
      if (bounds.bottom <= topBoundary) {
        finished = true;
        setEntrance("shown");
        return;
      }

      const top = Math.max(topBoundary, bounds.top);
      let bottom = Math.min(window.innerHeight, bounds.bottom);

      // Headers span the page width, so only their vertical positions matter.
      // Stop counting at the first header covering the remaining image height.
      const coveringHeader = covers.find(
        (cover) => cover.bottom > top && cover.top < bottom,
      );
      if (coveringHeader) {
        bottom = Math.min(bottom, coveringHeader.top);
      }

      const visibleHeight = Math.max(0, bottom - top);
      if (visibleHeight >= bounds.height * 0.2) {
        finished = true;
        setEntrance("animate");
      }
    };

    const schedule = () => {
      if (!frame && !finished) frame = requestAnimationFrame(checkVisibility);
    };
    const onTransition = (event: TransitionEvent) => {
      if (headers.includes(event.target as HTMLElement)) schedule();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(image);
    headers.forEach((header) => observer.observe(header));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("transitionrun", onTransition, true);
    document.addEventListener("transitionend", onTransition, true);
    window.addEventListener("pageshow", schedule);
    schedule();

    return () => {
      finished = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("transitionrun", onTransition, true);
      document.removeEventListener("transitionend", onTransition, true);
      window.removeEventListener("pageshow", schedule);
    };
  }, [appeared]);

  return (
    <motion.div
      ref={ref}
      className="motion-reduce:transform-none!"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: appeared ? 0 : 60, opacity: appeared ? 1 : 0 }}
      transition={{
        duration: prefersReducedMotion || entrance === "shown" ? 0 : 1,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: prefersReducedMotion || entrance === "shown" ? 0 : 0.18, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}
