"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./admin.module.css";

export default function ConfirmDialog({ title, description, confirmLabel, destructive = false, onConfirm, onCancel }: {
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    cancelRef.current?.focus();
    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.confirmDialog} aria-labelledby={titleId} aria-describedby={descriptionId}
      onCancel={event => { event.preventDefault(); onCancel(); }}>
      <button type="button" className={styles.confirmClose} aria-label="Close confirmation" onClick={onCancel}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
      </button>
      <div className={styles.confirmMark} data-destructive={destructive}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d={destructive ? "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 10v7m4-7v7" : "M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6"} />
        </svg>
      </div>
      <p className={styles.confirmEyebrow}>STUDIO / {destructive ? "PROJECTS" : "PUBLISHING"}</p>
      <h2 id={titleId}>{title}</h2>
      <p id={descriptionId} className={styles.confirmDescription}>{description}</p>
      <div className={styles.confirmActions}>
        <button ref={cancelRef} type="button" className={styles.secondaryButton} onClick={onCancel}>Cancel</button>
        <button type="button" className={styles.confirmPrimary} data-destructive={destructive} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </dialog>
  );
}
