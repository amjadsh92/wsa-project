"use client";

import { useSyncExternalStore } from "react";

let restoredScroll: number | null = null;
const listeners = new Set<() => void>();

// Published before the home background mounts, so its first render can skip
// the loading overlay and intro rather than mounting and then hiding them.
export function setHomeModalRestoration(scroll: number | null) {
  if (restoredScroll === scroll) return;
  restoredScroll = scroll;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useHomeModalRestoration() {
  return useSyncExternalStore(subscribe, () => restoredScroll, () => null);
}
