"use client";
import { createContext, useContext } from "react";
import { defaultAboutSections, type AboutSection } from "@/lib/about-content";
const Context = createContext(defaultAboutSections);
export function AboutContent({ sections, children }: { sections: AboutSection[]; children: React.ReactNode }) {
  return <Context.Provider value={sections}>{children}</Context.Provider>;
}
export const useAboutSections = () => useContext(Context);
