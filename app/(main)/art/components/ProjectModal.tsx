"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ProjectModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [hasArrived, setHasArrived] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const isReady = hasArrived || Boolean(prefersReducedMotion);

  useEffect(() => {
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousScrollbarGutter = root.style.scrollbarGutter;
    const previousBodyOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    // The page normally reserves a stable scrollbar gutter. Release that gutter
    // so the modal scrollbar occupies the browser's usual scrollbar position.
    root.style.overflow = "hidden";
    root.style.scrollbarGutter = "auto";
    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      root.style.overflow = previousRootOverflow;
      root.style.scrollbarGutter = previousScrollbarGutter;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.15 : 0.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (isClosing) router.back();
      }}
      inert={isClosing}
      className="fixed inset-0 z-50 overflow-x-hidden overscroll-contain"
      style={{
        overflowY: isReady && !isClosing ? "scroll" : "hidden",
        scrollbarGutter: "stable",
      }}
    >
      {/* Space outside the modal panel, at the start of its document. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.4 }}
        className="h-[10vh] bg-gray-200/70 backdrop-blur-[4px]"
        style={{
          // WebkitMaskImage:
          //   "linear-gradient(-30deg, transparent 1rem, black 95%)",
          // maskImage:
          //   "linear-gradient(-30deg, transparent 1rem, black 95%)",

            WebkitMaskImage:
            "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, rgba(0,0,0,0.5) 100%)",
          maskImage: "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, rgba(0,0,0,0.5) 100%)",

        }}
      />

      <motion.div
        className="relative min-h-screen bg-white"
        initial={{ y: prefersReducedMotion ? 0 : "100vh" }}
        animate={{ y: 0 }}
        transition={{
          type: "tween",
          duration: prefersReducedMotion ? 0 : 1,
          ease: [0.22, 0, 0.18, 1],
        }}
        onAnimationComplete={() => setHasArrived(true)}
      >
        <div className="sticky top-6 z-20 flex h-0 justify-end pr-6">
          <button
            onClick={() => setIsClosing(true)}
            disabled={isClosing}
            aria-label="Close project"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              text-black
              text-[2.25rem]
              font-light
              leading-none
              cursor-pointer"
          >
            ×
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 1,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* Space outside the modal panel, at the end of its document. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.4 }}
        className="h-[10vh]  bg-gray-200/70 backdrop-blur-[4px]"
        style={{
          // WebkitMaskImage:
          //   "linear-gradient(-30deg, transparent 2rem, black 95%)",
          // maskImage:
          //   "linear-gradient(-30deg, transparent 2rem, black 95%)",

           WebkitMaskImage:
            "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, rgba(0,0,0,0.5) 100%)",
          maskImage: "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </motion.div>
  );
}
