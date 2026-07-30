"use client"

import { suisse } from "@/app/fonts";
import "primeicons/primeicons.css";
import { useEffect,useState, useRef } from "react";

export default function About() {


   
  const [showNav, setShowNav] = useState(true);
  // const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const prevScrollY = useRef(0);

  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [servicesAttached, setServicesAttached] = useState(false);
  const [contactAttached, setContactAttached] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    if (!projectsRef.current || !servicesRef.current) return;

    const projects = projectsRef.current.getBoundingClientRect();
    const services = servicesRef.current.getBoundingClientRect();

    // Has Services reached the bottom of Projects?
    if (services.top <= projects.bottom) {
      setServicesAttached(true);
    } else {
      setServicesAttached(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



   useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine direction
      if(currentScrollY === 0){
        setShowNav(true)
      }
      else if (currentScrollY > prevScrollY.current) {
        // setScrollDirection("down");
        setShowNav(false)
      } else if (currentScrollY < prevScrollY.current) {
        // setScrollDirection("up");
        setShowNav(true)
      }

      // Update the previous position
      prevScrollY.current = currentScrollY;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className="flex flex-col">
      <div
        className={`
          sticky
          top-0
          left-0
          w-full
          
          z-50
          
          transition-transform
          duration-300
          ${showNav ? "translate-y-0" : "-translate-y-[50%]"}
        `}
      >
    <div className={`${suisse.className} flex h-fit justify-between items-center border-b bg-[#E1E3E3] p-3 pb-2 pt-2`}>
      <div className="flex justify-between items-center text-[14px] ml-[10px]">

        <div className={` ${suisse.className} mr-3`}>About</div>
        <div className={` ${suisse.className} mr-3`}>Services</div>
        <div>Work</div>
      </div>
      <div className="font-[450] text-[23px] tracking-wide mt-[2px]">KAAN</div>
      <div className="text-[16px]"> <i className="pi pi-search text-[16px]"></i></div>
    </div>
    
      
    <div ref={projectsRef} className="sticky top-0 z-10 pt-[5px] ">
      <div
        className="absolute inset-0 bg-[#E1E3E3]/60 backdrop-blur-sm"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
        }}
      />
      <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px]`}>
        Projects
      </div>
    </div>
   </div>
   <div  >
    <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem]`}>
      
      <p>KAAN Architecten is an international architectural practice engaged in context-specific, timeless designs spanning a broad range of scales and typologies in both the private and public sectors.</p>
    <p>Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio, together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team shapes a dynamic, culturally rich work environment.</p>
    <p>The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding to the surrounding world, fostering meaningful connections within its growing complexity.</p>
    </div>
    <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem] pb-[100px]`}>
    <p>Among the most prominent completed projects are large-scale, complex structures such as the Netherlands Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the Royal Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or the Loenen Pavilion.</p>
    <p>Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a large-scale, versatile building in Aubervilliers, Paris.
    Currently, the office is engaged in several high-profile projects across Europe. Among them are the new terminal at Amsterdam Airport Schiphol, the refurbishment of the National Bank of Belgium in Brussels, a 155m tower in the city center of Rotterdam, a laboratory and office building at CERN in Geneva, and the renovation of the Paul-Henri Spaak building at the European Parliament in Brussels.</p>
    
    
    </div>
    </div>

    {/* </div> */}
      
      <div  ref={servicesRef} className={`${servicesAttached ? "top-[53px]" : "bottom-0"} sticky z-20 pt-[5px] `}>
       
      <div
        // className="absolute border-t inset-0 bg-[#E1E3E3]/60 backdrop-blur-sm"
        // style={{
        //   WebkitMaskImage:
        //     "linear-gradvient(to bottom, black 0%, black 35%, transparent 100%)",
        //   maskImage:
        //     "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
        // }}
      />
      <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px]`}>
        Services
      </div>
    </div>

     <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem]`}>
    <p>Among the most prominent completed projects are large-scale, complex structures such as the Netherlands Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the Royal Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or the Loenen Pavilion.</p>
    <p>Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a large-scale, versatile building in Aubervilliers, Paris.
    Currently, the office is engaged in several high-profile projects across Europe. Among them are the new terminal at Amsterdam Airport Schiphol, the refurbishment of the National Bank of Belgium in Brussels, a 155m tower in the city center of Rotterdam, a laboratory and office building at CERN in Geneva, and the renovation of the Paul-Henri Spaak building at the European Parliament in Brussels.</p>

     <p>Among the most prominent completed projects are large-scale, complex structures such as the Netherlands Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the Royal Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or the Loenen Pavilion.</p>
    <p>Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a large-scale, versatile building in Aubervilliers, Paris.
    Currently, the office is engaged in several high-profile projects across Europe. Among them are the new terminal at Amsterdam Airport Schiphol, the refurbishment of the National Bank of Belgium in Brussels, a 155m tower in the city center of Rotterdam, a laboratory and office building at CERN in Geneva, and the renovation of the Paul-Henri Spaak building at the European Parliament in Brussels.</p>
    
    
    </div>
   
    </div>
  );
}
