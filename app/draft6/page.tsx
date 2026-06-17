"use client";

import { useEffect, useState } from "react";
import Img from "next/image";

export default function Home() {
  const [jump, setJump] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.15) {
        setJump(true);
      } else {
        setJump(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className=" flex flex-col">
        {/* FIRST IMAGE */}
        <div
          style={{
            backgroundImage: `url("/home/images/project1.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className="sticky top-0 h-[100vh] overflow-hidden"
        /> 

        {/* SECOND SECTION */}
        {/* <div
          style={{
            zIndex: 2,
          }}
          className="sticky top-0 h-[400vh]"
        >
          {/* TRANSFORM ONLY THE INNER VISUAL LAYER */}
          <div
            style={{
              backgroundImage: `url("/home/images/project1.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: jump
                ? "translateY(-65vh)"
                : "translateY(0vh)",

              transition: "transform 0.35s ease-out",
              zIndex:2
            }}
            className="sticky top-0 flex flex-col h-[200vh] bg-white"
          >
            
              <div
              className={`sticky top-0 flex search justify-end z-1000 py-[12px] bg-white`}
            >
              <i className="pi pi-search pr-[10px]"></i>
            </div>

            <div className={`flex z-10 gap-[20px] flex-1 bg-white`}>
                <div className={`sticky top-[calc(38px+65vh)] self-start`}>
                    <ul className=" pt-[10vh]">
                        <li
                        className={`text-[52.2px] font-[400] pl-2 `}
                        >
                        ABOUT
                        </li>
                        <div className="border w-[50vw] font-light"></div>
                        <li
                        className={`text-[52.2px] font-[400] pl-2`}
                        >
                        WORK
                        </li>
                        <div className="border w-[50vw]"></div>
                        <li
                        className={`text-[52.2px] font-[400] pl-2`}
                        >
                        REPOSITORY
                        </li>
                        <div className="border w-[50vw]"></div>
                    </ul>
               </div>

               <div className={`mt-[calc(78.3px+10vh)] `}>

                <div className="sticky top-[calc(40px+65vh)] z-20 bg-white">
                    <div className="flex justify-between border-t w-[45vw]">
                      <h3 className="text-[11.5px]">Building 140 CERN</h3>
                      <h3 className="text-[11.5px]">GENEVA, CH</h3>
                    </div>
                </div>

                <div className="relative h-[22.5vw] w-[45vw] mt-4 mb-[40px]">
                        <Img
                            src="/home/images/project1.jpg"
                            alt="Project 1"
                            fill
                            className="object-cover"
                            priority
                        />
             </div> 
               </div>
               
            </div>
            
          </div>
         
        </div>

        
    
    </>
  );
}