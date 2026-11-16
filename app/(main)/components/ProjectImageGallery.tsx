"use client";

import Img from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type GalleryImage = { src: string; alt: string };

export default function ProjectImageGallery({ images, inModal }: {
  images: readonly GalleryImage[];
  inModal: boolean;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeGallery = useCallback(() => setSelectedIndex(null), []);
  const columnLength = Math.ceil(images.length / 2);

  return (
    <>
      <div className="flex w-full my-[9.375rem] max-[960px]:flex-col max-[960px]:my-[5rem] max-[650px]:my-[3rem]">
        {[0, 1].map(column => (
          <div key={column} className="flex flex-col w-1/2 max-[960px]:w-full">
            {images.slice(column * columnLength, (column + 1) * columnLength).map((image, offset) => {
              const index = column * columnLength + offset;
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Enlarge image ${index + 1}: ${image.alt}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedIndex(index)}
                  className="relative block w-full shrink-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                >
                  <Img
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                    sizes="(width < 960px) 100vw, 50vw"
                    className={`h-auto w-full ${inModal ? "max-[500px]:aspect-[4/3] max-[500px]:object-cover" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {selectedIndex !== null && createPortal(
        <GalleryViewer images={images} initialIndex={selectedIndex} onClose={closeGallery} />,
        document.body,
      )}
    </>
  );
}

function GalleryViewer({ images, initialIndex, onClose }: {
  images: readonly GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(initialIndex);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const root = document.documentElement;
    const modal = document.querySelector<HTMLElement>("[data-project-modal]");
    const rootOverflow = root.style.overflow;
    const modalOverflow = modal?.style.overflowY;
    root.style.overflow = "hidden";
    if (modal) modal.style.overflowY = "hidden";
    // The native top layer keeps the gallery above the project modal and traps
    // keyboard focus without changing the project's route or scroll position.
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      root.style.overflow = rootOverflow;
      if (modal) modal.style.overflowY = modalOverflow ?? "";
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const move = (step: number) => {
    setIndex(current => Math.max(0, Math.min(images.length - 1, current + step)));
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Project image gallery"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-white p-0 text-black backdrop:bg-white"
    >
      <header className="relative flex h-16 items-center justify-center">
        <p aria-live="polite" aria-atomic="true" className="text-sm tabular-nums">
          <span className="sr-only">Image </span>{index + 1} / {images.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close image gallery" className="absolute right-2 top-2 flex h-12 w-12 cursor-pointer items-center justify-center text-4xl font-light">
          ×
        </button>
      </header>
      <div className="relative h-[calc(100dvh-4rem)] px-16 py-4 max-[650px]:px-12 max-[650px]:py-3">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <GallerySlide key={index} image={images[index]} onClose={onClose} />
        </div>
        <button type="button" aria-label="Previous image" disabled={index === 0} onClick={() => move(-1)} className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-black disabled:invisible">
          <Arrow backwards />
        </button>
        <button type="button" aria-label="Next image" disabled={index === images.length - 1} onClick={() => move(1)} className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-black disabled:invisible">
          <Arrow />
        </button>
      </div>
    </dialog>
  );
}

function GallerySlide({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <p role="status">This image could not be loaded. Try another image.</p>;
  return (
    // Use the original file and intrinsic dimensions here: no thumbnail
    // optimization, cropping, or upscaling in the full-screen viewer.
    // eslint-disable-next-line @next/next/no-img-element -- Preserve original intrinsic dimensions without thumbnail optimization.
    <img
      src={image.src}
      alt={image.alt}
      onError={() => setFailed(true)}
      role="button"
      tabIndex={0}
      aria-label={`${image.alt}. Close image gallery`}
      onClick={onClose}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClose();
        }
      }}
      className="block h-auto max-h-full w-auto max-w-full cursor-zoom-out object-contain"
    />
  );
}

function Arrow({ backwards = false }: { backwards?: boolean }) {
  return (
    <svg aria-hidden="true" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={backwards ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
    </svg>
  );
}
