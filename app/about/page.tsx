"use client";

import { useRef, useState, useEffect} from "react";
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
  const [isOpaque, setIsOpaque] = useState(true);
  const [servicesAttachedTop, setServicesAttachedTop] = useState(false);
  const [contactAttachedTop, setContactAttachedTop] = useState(false);

  const prevScrollY = useRef(0);
  const isProgrammaticScroll = useRef(false);
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

  const smoothScrollTo = (target: number) => {
  isProgrammaticScroll.current = true;

  window.scrollTo({
    top: target,
    behavior: "smooth",
  });

  const checkScrollFinished = () => {
    if (Math.abs(window.scrollY - target) <= 1) {
      setTimeout(()=> isProgrammaticScroll.current = false, 200);

      window.removeEventListener("scroll", checkScrollFinished);

      // Make sure prevScrollY starts from the new position
      prevScrollY.current = window.scrollY;
    }
  };

  window.addEventListener("scroll", checkScrollFinished, {
    passive: true,
  });
};

  const goToAboutMe = () => {
    setShowNav(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        className={`fixed z-10 left-0 w-full transition-[top] duration-300 ease-in-out py-[5px] ${
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
            ? "top-[calc(var(--header-height)+var(--navbar-height)-1px)]"
            : "top-[calc(var(--header-height)-1px)]"
        } bottom-[calc(var(--header-height)-1px)]`}
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
            ? "top-[calc(2*var(--header-height)+var(--navbar-height)-1px)]"
            : "top-[calc(2*var(--header-height)-1px)]"
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

      <Footer />
    </div>
  );
}
