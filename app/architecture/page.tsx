"use client";

import { useRef, useState, useEffect } from "react";
import { animate, useReducedMotion } from "framer-motion";
import "primeicons/primeicons.css";
import Navbar from "./components/Navbar";
import Header1 from "./components/Header1";
import Header1Content from "./components/Header1Content";
import Header2 from "./components/Header2";
import Header2Content from "./components/Header2Content";
import Header3 from "./components/Header3";
import Header3Content from "./components/Header3Content";




export default function Architecture(){

    const prefersReducedMotion = useReducedMotion();
  const [showNav, setShowNav] = useState(true);
  const [isOpaque, setIsOpaque] = useState(true);
  const [header2AttachedTop, setHeader2AttachedTop] = useState(false);
  const [header3AttachedTop, setHeader3AttachedTop] = useState(false);

  const prevScrollY = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const scrollAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const scrollCompletionCleanup = useRef<(() => void) | null>(null);
  const scrollCompletionTimeout = useRef<number | null>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);
  const header3Ref = useRef<HTMLDivElement>(null);
  const header1ContentRef = useRef<HTMLDivElement>(null);
  const header2ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateAttachedStates = () => {
      if (!header1Ref.current || !header2Ref.current || !header3Ref.current) {
        return;
      }

      setTimeout(() => setIsOpaque(false), 0);

      const header1Header = header1Ref.current.getBoundingClientRect();
      const header2Header = header2Ref.current.getBoundingClientRect();
      const header3Header = header3Ref.current.getBoundingClientRect();

      setHeader2AttachedTop(header2Header.top <= header1Header.bottom + 2);
      setHeader3AttachedTop(header3Header.top <= header2Header.bottom + 2);
    };

    updateAttachedStates();
    window.addEventListener("scroll", updateAttachedStates, { passive: true });
    return () => window.removeEventListener("scroll", updateAttachedStates);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
 
      if (isProgrammaticScroll.current) {
      return;
    }


      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShowNav(true);
      } else if (currentScrollY > prevScrollY.current) {
        setShowNav(false); // Scrolling down
      } else {
        setShowNav(true); // Scrolling up
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      scrollAnimation.current?.stop();
      scrollCompletionCleanup.current?.();

      if (scrollCompletionTimeout.current !== null) {
        window.clearTimeout(scrollCompletionTimeout.current);
      }
    };
  }, []);

  const smoothScrollTo = (target: number) => {
    scrollAnimation.current?.stop();
    scrollCompletionCleanup.current?.();

    if (scrollCompletionTimeout.current !== null) {
      window.clearTimeout(scrollCompletionTimeout.current);
      scrollCompletionTimeout.current = null;
    }

    isProgrammaticScroll.current = true;

    const start = window.scrollY;
    const distance = Math.abs(target - start);
    const duration = Math.min(1.4, Math.max(0.65, distance / 1400));

    const checkScrollFinished = () => {
      if (Math.abs(window.scrollY - target) <= 1) {
        scrollCompletionCleanup.current?.();
        scrollAnimation.current = null;
        prevScrollY.current = window.scrollY;

        scrollCompletionTimeout.current = window.setTimeout(() => {
          isProgrammaticScroll.current = false;
          scrollCompletionTimeout.current = null;
        }, 200);
      }
    };

    const removeCompletionListener = () => {
      window.removeEventListener("scroll", checkScrollFinished);
      scrollCompletionCleanup.current = null;
    };

    scrollCompletionCleanup.current = removeCompletionListener;
    window.addEventListener("scroll", checkScrollFinished, { passive: true });

    scrollAnimation.current = animate(start, target, {
      duration: prefersReducedMotion ? 0 : duration,
      // ease: [0.65, 0, 0.35, 1],
      ease: [0.65, 0.35, 0.65, 1],
      onUpdate: (value) => window.scrollTo(0, value),
    });

    checkScrollFinished();
  };

  const goToHeader1 = () => {
    setShowNav(true);
    smoothScrollTo(0);
  };

  const getSectionHeights = () => {
    if (
      !header1ContentRef.current ||
      !header1Ref.current ||
      !header2ContentRef.current
    ) {
      return null;
    }

    return {
      header1ContentHeight:
        header1ContentRef.current.getBoundingClientRect().height,
      header1HeaderHeight: header1Ref.current.getBoundingClientRect().height,
      header2ContentHeight:
        header2ContentRef.current.getBoundingClientRect().height,
    };
  };

  const goToHeader2 = () => {
    setShowNav(false);
    const heights = getSectionHeights();
    if (!heights) return;

    // window.scrollTo({
    //   top: heights.aboutMeContentHeight - heights.aboutMeHeaderHeight + 20,
    //   behavior: "smooth",
    // });

    const target =
    heights.header1ContentHeight -
    heights.header1HeaderHeight +
    20;

    smoothScrollTo(target);
  };

  const goToHeader3 = () => {
    setShowNav(false);
    const heights = getSectionHeights();
    if (!heights) return;

    // window.scrollTo({
    //   top:
    //     heights.aboutMeContentHeight +
    //     heights.header2ContentHeight -
    //     heights.aboutMeHeaderHeight + 25,
    //   behavior: "smooth",
    // });

    const target =
    heights.header1ContentHeight +
    heights.header2ContentHeight -
    heights.header1HeaderHeight +
    25;

    smoothScrollTo(target);
  };

  return (
    <div className="about flex flex-col relative min-h-screen">
      <Navbar showNav={showNav} />

      <div
        ref={header1Ref}
        className={`fixed z-10 left-0 w-full transition-[top] duration-300 ease-in-out py-[0.3125rem] ${
          showNav ? "top-[var(--navbar-height)]" : "top-0"
        } `}
        // onClick={goToHeader1}
      >
        <Header1
          header2AttachedTop={header2AttachedTop}
          isOpaque={isOpaque}
          goToHeader1={goToHeader1}
        />
      </div>
      <div ref={header1ContentRef}>
        <Header1Content />
      </div>
      <div
        ref={header2Ref}
        className={`sticky z-10 w-full transition-[top] duration-300 ease-in-out ${
          showNav
            ? "top-[calc(var(--header-height)+var(--navbar-height)-0.1875rem)]"
            : "top-[calc(var(--header-height)-0.1875rem)]"
        } bottom-[calc(var(--header-height)-0.0625rem)]`}
        // onClick={goToheader2}
      >
        <Header2
          header2AttachedTop={header2AttachedTop}
          header3AttachedTop={header3AttachedTop}
          isOpaque={isOpaque}
          goToHeader2={goToHeader2}
        />
      </div>
      <div ref={header2ContentRef}>
        <Header2Content />
      </div>
      <div
        ref={header3Ref}
        className={`sticky z-10 w-full transition-[top] duration-300 ease-in-out ${
          showNav
            ? "top-[calc(2*var(--header-height)+var(--navbar-height)-0.1875rem)]"
            : "top-[calc(2*var(--header-height)-0.1875rem)]"
        } bottom-0`}
        // onClick={goToheader3}
      >
        <Header3
          header3AttachedTop={header3AttachedTop}
          header2AttachedTop={header2AttachedTop}
          isOpaque={isOpaque}
          goToHeader3={goToHeader3}
        />
      </div>

      <Header3Content />

      {/* <Footer /> */}
    </div>
  );
}



