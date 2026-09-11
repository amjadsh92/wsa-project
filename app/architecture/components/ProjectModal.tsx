"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

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
    <div
      className="
        fixed
        inset-0
        z-50
        overflow-y-scroll
        overscroll-contain
      "
    >
      {/* Space outside the modal panel, at the start of its document. */}
      <div
        aria-hidden="true"
        className="h-[10vh] bg-gray-300/25 backdrop-blur-[2.5px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, rgba(0,0,0,0.5) 100%)",
          maskImage: "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="relative min-h-screen bg-white">
        <div className="sticky top-6 z-20 flex h-0 justify-end pr-6">
          <button
            onClick={() => router.back()}
            aria-label="Close project"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              text-[oklch(0.45_0.01_0)]
              text-[2.25rem]
              font-light
              leading-none
              cursor-pointer
            
            "
          >
            ×
          </button>
        </div>

        {children}
      </div>

      {/* Space outside the modal panel, at the end of its document. */}
      <div
        aria-hidden="true"
        className="h-[10vh] bg-gray-300/25 backdrop-blur-[2.5px]"
        style={{
             WebkitMaskImage:
            "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, black 100%)",
          maskImage: "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, black 80%, black 100%)",
          
        }}
      />
    </div>
  );
}
