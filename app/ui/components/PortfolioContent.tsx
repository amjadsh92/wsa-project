"use client";
import { createContext, useContext } from "react";
import { defaultPortfolio, type Portfolio } from "@/lib/project-content";
const Context = createContext<Portfolio>(defaultPortfolio());
export function PortfolioContent({ portfolio, children }: { portfolio: Portfolio; children: React.ReactNode }) {
  return <Context.Provider value={portfolio}>{children}</Context.Provider>;
}
export const usePortfolio = () => useContext(Context);
