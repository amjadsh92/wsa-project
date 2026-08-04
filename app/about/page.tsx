"use client";

import { useRef, useState, useEffect } from "react";
import { suisse } from "@/app/fonts";
import "primeicons/primeicons.css";

export default function About() {
  const [showNav, setShowNav] = useState(true);
  const [servicesAttachedTop, setServicesAttachedTop] = useState(false);

  const prevScrollY = useRef(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Navbar hide/show logic on scroll
      if (currentScrollY === 0) {
        setShowNav(true);
      } else if (currentScrollY > prevScrollY.current) {
        setShowNav(false); // Scrolling down
      } else {
        setShowNav(true); // Scrolling up
      }

      // 2. Detect when Services header touches/locks under Projects header
      if (projectsRef.current && servicesRef.current) {
        const projectsRect = projectsRef.current.getBoundingClientRect();
        const servicesRect = servicesRef.current.getBoundingClientRect();

        // When the top of Services reaches the bottom of Projects
        if (servicesRect.top <= projectsRect.bottom + 2) {
          setServicesAttachedTop(true);
        } else {
          setServicesAttachedTop(false);
        }
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col relative bg-[#E1E3E3] min-h-screen">
      {/* NAVBAR */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-[top] duration-300 ease-in-out ${
          showNav ? "top-0" : "top-[-53px]"
        }`}
      >
        <div className={`${suisse.className} flex h-[53px] justify-between items-center border-b bg-[#E1E3E3] p-3`}>
          <div className="flex justify-between items-center text-[14px] ml-[10px]">
            <div className={`${suisse.className} mr-3`}>About</div>
            <div className={`${suisse.className} mr-3`}>Services</div>
            <div>Work</div>
          </div>
          <div className="font-[450] text-[23px] tracking-wide mt-[2px]">KAAN</div>
          <div className="text-[16px]">
            <i className="pi pi-search text-[16px]"></i>
          </div>
        </div>
      </div>

      {/* FIXED PROJECTS HEADER */}
      <div
        ref={projectsRef}
        className={`fixed left-0 w-full z-30 transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[53px]" : "top-0"
        } pt-[5px]`}
      >
        {/* Masked Backdrop & Blur Effect */}
        <div
          className={`absolute ${
            servicesAttachedTop
              ? "bg-[#E1E3E3] inset-0"
              : "inset-0 bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]"
          }`}
          style={{
            WebkitMaskImage: servicesAttachedTop
              ? ""
              : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
            maskImage: servicesAttachedTop
              ? ""
              : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          }}
        />
        <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px]`}>
          Projects
        </div>
      </div>

      {/* PROJECTS CONTENT */}
      <div className="relative pt-[120px] pb-[40px]">
        <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem]`}>
          <p>
            KAAN Architecten is an international architectural practice engaged in context-specific, timeless designs
            spanning a broad range of scales and typologies in both the private and public sectors.
          </p>
          <p className="mt-4">
            Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
            together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
            satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
            shapes a dynamic, culturally rich work environment.
          </p>
          <p className="mt-4">
            The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
            to the surrounding world, fostering meaningful connections within its growing complexity.
          </p>
        </div>
        <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem] pb-[100px]`}>
          <p>
            Among the most prominent completed projects are large-scale, complex structures such as the Netherlands
            Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the
            Royal Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or
            the Loenen Pavilion.
          </p>
          <p className="mt-4">
            Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a
            large-scale, versatile building in Aubervilliers, Paris. Currently, the office is engaged in several
            high-profile projects across Europe.
          </p>
        </div>
      </div>

      {/* STICKY SERVICES HEADER */}
      <div
        ref={servicesRef}
        className={`sticky z-40 w-full transition-[top] duration-300 ease-in-out ${
          showNav ? "top-[112px]" : "top-[59px]"
        } bottom-0 mt-[-59px]`}
      >
        {/* Masked Backdrop & Blur Effect */}
        <div
          className={`absolute border-t inset-0 ${
            servicesAttachedTop ? "bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]" : "bg-[#E1E3E3]"
          }`}
          style={{
            WebkitMaskImage: servicesAttachedTop
              ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
              : "",
            maskImage: servicesAttachedTop
              ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
              : "",
          }}
        />
        <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px] py-[5px]`}>
          Services
        </div>
      </div>

      {/* SERVICES CONTENT */}
      <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] my-[1.5rem] relative z-10`}>
        <p>
          Among the most prominent completed projects are large-scale, complex structures such as the Netherlands
          Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the Royal
          Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or the
          Loenen Pavilion.
        </p>
        <p className="mt-4">
          Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a
          large-scale, versatile building in Aubervilliers, Paris. Currently, the office is engaged in several
          high-profile projects across Europe.
        </p>

        <p>
          Among the most prominent completed projects are large-scale, complex structures such as the Netherlands
          Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the Royal
          Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or the
          Loenen Pavilion.
        </p>
        <p className="mt-4">
          Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a
          large-scale, versatile building in Aubervilliers, Paris. Currently, the office is engaged in several
          high-profile projects across Europe.
        </p>
        <p>
          Among the most prominent completed projects are large-scale, complex structures such as the Netherlands
          Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the Royal
          Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or the
          Loenen Pavilion.
        </p>
        <p className="mt-4">
          Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a
          large-scale, versatile building in Aubervilliers, Paris. Currently, the office is engaged in several
          high-profile projects across Europe.
        </p>
        {/* <div className="h-[500px]" /> */}
      </div>
    </div>
  );
}