"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Pairs with the inline scripts in layout.tsx: one sets
// history.scrollRestoration = 'manual' and restores scroll position from
// sessionStorage after all content has rendered (so it has real scroll
// height to work with); this component keeps sessionStorage up to date on
// every route, so "refresh keeps your scroll position" keeps working
// app-wide instead of relying on the browser's own restoration timing,
// which isn't synchronized with when our own effects/CSS transitions run.
export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const key = `scrollY:${pathname}`;

    const saveScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    window.addEventListener("beforeunload", saveScroll);

    return () => {
      window.removeEventListener("scroll", saveScroll);
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, [pathname]);

  return null;
}
