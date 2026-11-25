"use client";
import { createContext, useContext } from "react";
import { defaultHomeContent, pagePath, type HomeContent } from "@/lib/home-content";
const Context = createContext(defaultHomeContent.navigation);
export function PageNames({ navigation, children }: { navigation: HomeContent["navigation"]; children: React.ReactNode }) {
  return <Context.Provider value={navigation}>{children}</Context.Provider>;
}
export const usePageNames = () => useContext(Context);
export function useProjectBasePath(base: "/page2" | "/page3") {
  return pagePath(usePageNames(), base === "/page2" ? "page2" : "page3");
}
