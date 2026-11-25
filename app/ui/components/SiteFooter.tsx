"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function SiteFooter() {
  return usePathname().startsWith("/admin") ? null : <Footer />;
}
