"use client";
import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { coverGeometry } from "@/lib/project-content";

type Props = {
  src: ImageProps["src"]; alt: string;
  coverX?: number; coverY?: number; coverZoom?: number;
  sizes?: string; priority?: boolean;
  onFitZoom?: (zoom: number) => void;
};
export default function ProjectCover(props: Props) {
  const key = typeof props.src === "string" ? props.src : JSON.stringify(props.src);
  return <CoverFrame key={key} {...props} />;
}
function CoverFrame({ src, alt, coverX = 50, coverY = 50, coverZoom = 1, sizes = "100vw", priority = false, onFitZoom }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [natural, setNatural] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setBounds(previous => previous.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const geometry = bounds.width && bounds.height && natural.width && natural.height
    ? coverGeometry(bounds.width, bounds.height, natural.width, natural.height, coverZoom, coverX, coverY) : null;
  const fitZoom = geometry?.fitZoom;
  useEffect(() => { if (fitZoom !== undefined) onFitZoom?.(fitZoom); }, [fitZoom, onFitZoom]);
  return <div ref={frame} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    <div style={geometry ? {
      position: "absolute", width: geometry.width, height: geometry.height, left: geometry.left, top: geometry.top,
    } : { position: "absolute", inset: 0 }}>
    <Image src={src} alt={alt} fill quality={90} priority={priority}
      sizes={geometry ? `${Math.ceil(geometry.width)}px` : sizes}
      onLoad={event => {
        const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
        setNatural(previous => previous.width === width && previous.height === height ? previous : { width, height });
      }}
      style={{ objectFit: geometry ? "contain" : "cover", objectPosition: `${coverX}% ${coverY}%` }}
    />
    </div>
  </div>;
}
