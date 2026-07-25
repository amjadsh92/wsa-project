"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PAGE_BACKGROUNDS: Record<string, string> = {
  "/about": "#E1E3E3",
};

export default function BodyBackground() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.backgroundColor = PAGE_BACKGROUNDS[pathname] ?? "";
  }, [pathname]);

  return null;
}
