"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
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
  const [showNav, setShowNav] = useState(true);
  const [isOpaque, setIsOpaque] = useState(true)
  const [servicesAttachedTop, setServicesAttachedTop] = useState(false);
  const [contactAttachedTop, setContactAttachedTop] = useState(false);

  const prevScrollY = useRef(0);
  const AboutMeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  console.log(isOpaque)

  // Runs before paint, and immediately on mount (not just on 'scroll'
  // events), so a refresh that restores a scrolled-down position computes
  // the correct attached state right away instead of flashing the
  // not-attached (blurred) look until the first scroll event fires.
  useLayoutEffect(() => {
    const updateAttachedStates = () => {
      if (!AboutMeRef.current || !servicesRef.current || !contactRef.current) {
        return;
      }

      setTimeout(() => setIsOpaque(false),0)

      const projectsRect = AboutMeRef.current.getBoundingClientRect();
      const servicesRect = servicesRef.current.getBoundingClientRect();
      const contactRect = contactRef.current.getBoundingClientRect();

      setServicesAttachedTop(servicesRect.top <= projectsRect.bottom + 2);
      setContactAttachedTop(contactRect.top <= servicesRect.bottom + 2);
    };

    updateAttachedStates();
    window.addEventListener("scroll", updateAttachedStates, { passive: true });
    return () => window.removeEventListener("scroll", updateAttachedStates);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
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

  const hideNav = () => {
    setShowNav(false)
    window.scrollTo({
    top: 0,
    behavior: "smooth",
});
  }

  return (
    <div className="flex flex-col relative bg-[#E1E3E3] min-h-screen">
      <Navbar showNav={showNav} />

      {/* FIXED PROJECTS HEADER */}
      <div
        ref={AboutMeRef}
        className={`fixed left-0 w-full z-30 transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[53px]" : "top-0"
        } pt-[5px]`}
        onClick={hideNav}
      >
        <AboutHeader servicesAttachedTop={servicesAttachedTop} isOpaque={isOpaque} />
      </div>

      <AboutContent />

      <div
        ref={servicesRef}
        className={`sticky z-40 w-full transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[113.5px]" : "top-[61px]"
        } bottom-[70px]`}
      >
        <ServicesHeader
          servicesAttachedTop={servicesAttachedTop}
          contactAttachedTop={contactAttachedTop}
          isOpaque={isOpaque}
        />
      </div>

      <ServicesContent />

      <div
        ref={contactRef}
        className={`sticky z-40 w-full transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[178.5px]" : "top-[126px]"
        } bottom-0`}
      >
        {/* Masked Backdrop & Blur Effect */}
        <ContactHeader
          contactAttachedTop={contactAttachedTop}
          servicesAttachedTop={servicesAttachedTop}
          isOpaque={isOpaque}
        />
      </div>

      <ContactContent />

      <Footer />
    </div>
  );
}
