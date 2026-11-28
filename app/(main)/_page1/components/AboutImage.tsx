"use client";
import { useState } from "react";
import type { AboutImageLayout } from "@/lib/about-content";

export default function AboutImage({ src, alt, title, layout }: {
  src: string; alt?: string; title?: string; layout: AboutImageLayout;
}) {
  const [naturalWidth, setNaturalWidth] = useState<number | null>(null);
  return (
    // Markdown supports external images; use their original source and avoid upscaling.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ""} title={title} decoding="async"
      onLoad={event => setNaturalWidth(event.currentTarget.naturalWidth)}
      style={{
        display: "block", width: `${layout.width}%`, height: "auto",
        maxWidth: naturalWidth ? `min(100%, ${naturalWidth}px)` : "100%",
        marginLeft: layout.align === "left" ? 0 : "auto",
        marginRight: layout.align === "right" ? 0 : "auto",
      }}
    />
  );
}
