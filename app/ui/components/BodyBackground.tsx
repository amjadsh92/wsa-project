"use client";

import { usePageNames } from "./PageNames";
import { pagePath } from "@/lib/home-content";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyBackground() {
  const aboutPath = pagePath(usePageNames(), "page1");
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.backgroundColor = pathname === aboutPath ? "#E1E3E3" : "";
  }, [pathname, aboutPath]);

  return null;
}
