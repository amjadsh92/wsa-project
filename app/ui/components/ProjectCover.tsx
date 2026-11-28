"use client";
import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { coverGeometry } from "@/lib/project-content";

type Props = {
  src: ImageProps["src"]; alt: string;
  coverX?: number; coverY?: number; coverZoom?: number;
  coverFit?: boolean;
  sizes?: string; priority?: boolean;
  onFitZoom?: (zoom: number) => void;
  onPositionChange?: (x: number, y: number) => void;
};
export default function ProjectCover(props: Props) {
  const key = typeof props.src === "string" ? props.src : JSON.stringify(props.src);
  return <CoverFrame key={key} {...props} />;
}
function CoverFrame({ src, alt, coverX = 50, coverY = 50, coverZoom = 1, coverFit = false, sizes = "100vw", priority = false, onFitZoom, onPositionChange }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; coverX: number; coverY: number; freeX: number; freeY: number; scaleX: number; scaleY: number } | null>(null);
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
    ? coverGeometry(bounds.width, bounds.height, natural.width, natural.height, coverZoom, coverX, coverY, coverFit) : null;
  const fitZoom = geometry?.fitZoom;
  useEffect(() => { if (fitZoom !== undefined) onFitZoom?.(fitZoom); }, [fitZoom, onFitZoom]);
  const clamp = (value: number) => Math.max(0, Math.min(100, value));
  return <div ref={frame}
    role={onPositionChange ? "group" : undefined}
    aria-label={onPositionChange ? `Position ${alt}: drag or use arrow keys` : undefined}
    tabIndex={onPositionChange ? 0 : undefined}
    onPointerDown={event => {
      if (!onPositionChange || !geometry || event.button !== 0) return;
      event.preventDefault();
      event.currentTarget.focus();
      const rect = event.currentTarget.getBoundingClientRect();
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, coverX, coverY, freeX: bounds.width - geometry.width, freeY: bounds.height - geometry.height, scaleX: bounds.width / rect.width, scaleY: bounds.height / rect.height };
      event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerMove={event => {
      const start = drag.current;
      if (!start || start.id !== event.pointerId || !onPositionChange) return;
      onPositionChange(
        Math.abs(start.freeX) < 0.5 ? start.coverX : clamp(start.coverX + (event.clientX - start.x) * start.scaleX / start.freeX * 100),
        Math.abs(start.freeY) < 0.5 ? start.coverY : clamp(start.coverY + (event.clientY - start.y) * start.scaleY / start.freeY * 100),
      );
    }}
    onPointerUp={event => { drag.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
    onPointerCancel={() => { drag.current = null; }}
    onLostPointerCapture={() => { drag.current = null; }}
    onKeyDown={event => {
      if (!onPositionChange || !geometry || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      const step = event.shiftKey ? 10 : 1;
      const x = (event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0) * Math.sign(bounds.width - geometry.width);
      const y = (event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0) * Math.sign(bounds.height - geometry.height);
      onPositionChange(clamp(coverX + x), clamp(coverY + y));
    }}
    style={{ position: "absolute", inset: 0, overflow: "hidden", touchAction: onPositionChange ? "none" : undefined, cursor: onPositionChange ? "grab" : undefined }}>
    <div style={geometry ? {
      position: "absolute", width: geometry.width, height: geometry.height, left: geometry.left, top: geometry.top,
    } : { position: "absolute", inset: 0 }}>
    <Image src={src} alt={alt} fill quality={90} priority={priority} draggable={false}
      sizes={geometry ? `${Math.ceil(geometry.width)}px` : sizes}
      onLoad={event => {
        const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
        setNatural(previous => previous.width === width && previous.height === height ? previous : { width, height });
      }}
      style={{ objectFit: geometry || coverFit ? "contain" : "cover", objectPosition: `${coverX}% ${coverY}%` }}
    />
    </div>
  </div>;
}
