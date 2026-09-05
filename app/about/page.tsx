"use client";

import { useRef, useState, useEffect } from "react";
import { animate, useReducedMotion } from "framer-motion";
import "primeicons/primeicons.css";
import Navbar from "./components/Navbar";
import AboutHeader from "./components/AboutHeader";
import AboutContent from "./components/AboutContent";
import ServicesHeader from "./components/ServicesHeader";
import ServicesContent from "./components/ServicesContent";
import ContactHeader from "./components/ContactHeader";
import ContactContent from "./components/ContactContent";
import Footer from "./components/Footer";

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const [showNav, setShowNav] = useState(true);
  const [isOpaque, setIsOpaque] = useState(true);
  const [servicesAttachedTop, setServicesAttachedTop] = useState(false);
  const [contactAttachedTop, setContactAttachedTop] = useState(false);

  const prevScrollY = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const scrollAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const scrollCompletionCleanup = useRef<(() => void) | null>(null);
  const scrollCompletionTimeout = useRef<number | null>(null);
  const AboutMeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutMeContentRef = useRef<HTMLDivElement>(null);
  const serviceContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateAttachedStates = () => {
      if (!AboutMeRef.current || !servicesRef.current || !contactRef.current) {
        return;
      }

      setTimeout(() => setIsOpaque(false), 0);

      const AboutMeHeader = AboutMeRef.current.getBoundingClientRect();
      const servicesHeader = servicesRef.current.getBoundingClientRect();
      const contactHeader = contactRef.current.getBoundingClientRect();

      setServicesAttachedTop(servicesHeader.top <= AboutMeHeader.bottom + 2);
      setContactAttachedTop(contactHeader.top <= servicesHeader.bottom + 2);
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

  const goToAboutMe = () => {
    setShowNav(true);
    smoothScrollTo(0);
  };

  const getSectionHeights = () => {
    if (
      !aboutMeContentRef.current ||
      !AboutMeRef.current ||
      !serviceContentRef.current
    ) {
      return null;
    }

    return {
      aboutMeContentHeight:
        aboutMeContentRef.current.getBoundingClientRect().height,
      aboutMeHeaderHeight: AboutMeRef.current.getBoundingClientRect().height,
      serviceContentHeight:
        serviceContentRef.current.getBoundingClientRect().height,
    };
  };

  const goToService = () => {
    setShowNav(false);
    const heights = getSectionHeights();
    if (!heights) return;

    // window.scrollTo({
    //   top: heights.aboutMeContentHeight - heights.aboutMeHeaderHeight + 20,
    //   behavior: "smooth",
    // });

    const target =
    heights.aboutMeContentHeight -
    heights.aboutMeHeaderHeight +
    20;

    smoothScrollTo(target);
  };

  const goToContact = () => {
    setShowNav(false);
    const heights = getSectionHeights();
    if (!heights) return;

    // window.scrollTo({
    //   top:
    //     heights.aboutMeContentHeight +
    //     heights.serviceContentHeight -
    //     heights.aboutMeHeaderHeight + 25,
    //   behavior: "smooth",
    // });

    const target =
    heights.aboutMeContentHeight +
    heights.serviceContentHeight -
    heights.aboutMeHeaderHeight +
    25;

    smoothScrollTo(target);
  };

  return (
    <div className="about flex flex-col relative bg-[#E1E3E3] min-h-screen">
      <Navbar showNav={showNav} />

      <div
        ref={AboutMeRef}
        className={`fixed z-10 left-0 w-full transition-[top] duration-300 ease-in-out py-[0.3125rem] ${
          showNav ? "top-[var(--navbar-height)]" : "top-0"
        } `}
        // onClick={goToAboutMe}
      >
        <AboutHeader
          servicesAttachedTop={servicesAttachedTop}
          isOpaque={isOpaque}
          goToAboutMe={goToAboutMe}
        />
      </div>
      <div ref={aboutMeContentRef}>
        <AboutContent />
      </div>
      <div
        ref={servicesRef}
        className={`sticky z-10 w-full transition-[top] duration-300 ease-in-out ${
          showNav
            ? "top-[calc(var(--header-height)+var(--navbar-height)-0.1875rem)]"
            : "top-[calc(var(--header-height)-0.1875rem)]"
        } bottom-[calc(var(--header-height)-0.0625rem)]`}
        // onClick={goToService}
      >
        <ServicesHeader
          servicesAttachedTop={servicesAttachedTop}
          contactAttachedTop={contactAttachedTop}
          isOpaque={isOpaque}
          goToService={goToService}
        />
      </div>
      <div ref={serviceContentRef}>
        <ServicesContent />
      </div>
      <div
        ref={contactRef}
        className={`sticky z-10 w-full transition-[top] duration-300 ease-in-out ${
          showNav
            ? "top-[calc(2*var(--header-height)+var(--navbar-height)-0.1875rem)]"
            : "top-[calc(2*var(--header-height)-0.1875rem)]"
        } bottom-0`}
        // onClick={goToContact}
      >
        <ContactHeader
          contactAttachedTop={contactAttachedTop}
          servicesAttachedTop={servicesAttachedTop}
          isOpaque={isOpaque}
          goToContact={goToContact}
        />
      </div>

      <ContactContent />

      {/* <Footer /> */}
    </div>
  );
}
