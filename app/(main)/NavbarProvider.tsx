"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";

type NavbarContextValue = {
  showNav: boolean;
  setShowNav: (visible: boolean) => void;
  prevScrollYRef: RefObject<number>;
  isProgrammaticScrollRef: RefObject<boolean>;
};

const NavbarContext = createContext<NavbarContextValue | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [visibility, setVisibility] = useState({ pathname, visible: true });
  const prevScrollYRef = useRef(0);
  const isProgrammaticScrollRef = useRef(false);
  // A newly visited route starts with its navigation visible.
  if (visibility.pathname !== pathname) {
    setVisibility({ pathname, visible: true });
  }
  const showNav = visibility.pathname !== pathname || visibility.visible;
  const setShowNav = useCallback(
    (visible: boolean) =>
      setVisibility((current) =>
        current.pathname === pathname && current.visible === visible
          ? current
          : { pathname, visible },
      ),
    [pathname],
  );

  useEffect(() => {
    prevScrollYRef.current = window.scrollY;
    isProgrammaticScrollRef.current = false;

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY === 0 || currentScrollY <= prevScrollYRef.current);
      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowNav]);

  return (
    <NavbarContext.Provider
      value={{ showNav, setShowNav, prevScrollYRef, isProgrammaticScrollRef }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("useNavbar must be used within NavbarProvider");
  return context;
}
