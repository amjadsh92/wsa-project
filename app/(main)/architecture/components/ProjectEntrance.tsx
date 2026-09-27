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
      if (bounds.width <= 0 || bounds.height <= 0) return;

      const left = Math.max(0, bounds.left);
      const right = Math.min(window.innerWidth, bounds.right);
      const covers = headers.map((header) => header.getBoundingClientRect());

      // Find the bottom of the header stack connected to the viewport's top.
      // Bottom-pinned headers must not count as part of this stack.
      let topBoundary = 0;
      for (const cover of [...covers].sort((a, b) => a.top - b.top)) {
        if (cover.right <= left || cover.left >= right || cover.bottom <= 0) continue;
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

      // Count the area below the top stack and above any other covering header.
      for (const cover of covers) {
        const overlapsHorizontally = cover.right > left && cover.left < right;
        const overlapsVertically = cover.bottom > top && cover.top < bottom;
        if (overlapsHorizontally && overlapsVertically) {
          bottom = Math.min(bottom, cover.top);
        }
      }

      const visibleHeight = Math.max(0, bottom - top);
      const visibleArea = Math.max(0, right - left) * visibleHeight;
      if (visibleArea >= bounds.width * bounds.height * 0.05) {
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
