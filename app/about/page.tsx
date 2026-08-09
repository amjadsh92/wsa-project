"use client";

import { useRef, useState, useEffect } from "react";
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
  const [servicesAttachedTop, setServicesAttachedTop] = useState(false);
  const [contactAttachedTop, setContactAttachedTop] = useState(false);

  const prevScrollY = useRef(0);
  const AboutMeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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

      if (AboutMeRef.current && servicesRef.current && contactRef.current) {
        const projectsRect = AboutMeRef.current.getBoundingClientRect();
        const servicesRect = servicesRef.current.getBoundingClientRect();
        const contactRect = contactRef.current.getBoundingClientRect();

        if (servicesRect.top <= projectsRect.bottom + 2) {
          setServicesAttachedTop(true);
        } else {
          setServicesAttachedTop(false);
        }

        if (contactRect.top <= servicesRect.bottom + 2) {
          setContactAttachedTop(true);
        } else {
          setContactAttachedTop(false);
        }
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col relative bg-[#E1E3E3] min-h-screen">
      <Navbar showNav={showNav} />

      {/* FIXED PROJECTS HEADER */}
      <div
        ref={AboutMeRef}
        className={`fixed left-0 w-full z-30 transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[53px]" : "top-0"
        } pt-[5px]`}
      >
        <AboutHeader servicesAttachedTop={servicesAttachedTop} />
      </div>

      <AboutContent />

      <div
        ref={servicesRef}
        className={`sticky z-40 w-full transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[113.5px]" : "top-[61px]"
        } bottom-[70px] mt-[-59px]`}
      >
        <ServicesHeader
          servicesAttachedTop={servicesAttachedTop}
          contactAttachedTop={contactAttachedTop}
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
        />
      </div>

      <ContactContent />

      <Footer />
    </div>
  );
}
