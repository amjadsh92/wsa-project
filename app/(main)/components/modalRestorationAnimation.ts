"use client";

import { useSyncExternalStore } from "react";

let projectToRestore: string | null = null;
const listeners = new Set<() => void>();

export function setModalRestorationProject(project: string | null) {
  if (projectToRestore === project) return;
  projectToRestore = project;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useModalRestorationProject() {
  return useSyncExternalStore(subscribe, () => projectToRestore, () => null);
}
