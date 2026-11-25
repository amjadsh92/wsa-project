"use client";

import { useEffect, useState } from "react";
import Home from "@/app/home/Home";
import Footer from "@/app/ui/components/Footer";
import { defaultHomeContent, parseHomeContent } from "@/lib/home-content";

export default function PreviewPage() {
  const [content, setContent] = useState(defaultHomeContent);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== "home-preview") return;
      try { setContent(parseHomeContent(event.data.content, true)); } catch { /* Ignore unrelated or malformed messages. */ }
    };
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "home-preview-ready" }, location.origin);
    // Preview stays inside the editor even if a website link is clicked.
    const keepPreview = (event: MouseEvent) => {
      if ((event.target as Element).closest("a")) event.preventDefault();
    };
    document.addEventListener("click", keepPreview, true);
    return () => { window.removeEventListener("message", receive); document.removeEventListener("click", keepPreview, true); };
  }, []);
  return <><Home content={content} preview /><Footer /></>;
}
