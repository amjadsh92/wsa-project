"use client";

import { useEffect, useState } from "react";
import Img from "next/image";
import "primeicons/primeicons.css";

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
            //   backgroundImage: `url("/home/images/project1.jpg")`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
              transform: jump
                ? "translateY(0vh)"
                : "translateY(65vh)",

              transition: "transform 0.35s ease-out",
              zIndex:2
            }}
            className="flex flex-col bg-white mt-[-65vh]"
          >
            
              <div
              className={`sticky top-0 flex search justify-end z-1000 py-[12px] bg-white`}
            >
              <i className="pi pi-search pr-[10px]"></i>
            </div>

            <div className={`flex z-10 gap-[20px] flex-1`}>
                <div className={`sticky top-[calc(38px)] self-start`}>
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

                <div className="sticky top-[calc(40px)] z-20 bg-white">
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

             <div className="sticky top-[calc(40px+17.2px)] z-20 bg-white">
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


                       <div className="sticky top-[40px] z-30 bg-white">
                                           <div className="flex justify-between border-t w-[45vw]">
                                             <h3 className="text-[11.5px]">Building 140 CERN</h3>
                                             <h3 className="text-[11.5px]">GENEVA, CH</h3>
                                           </div>
                                         </div>
                       
                                        
                       
                                         <div className="relative h-[22.5vw] w-[45vw] z-20 bg-white ">
                                           <Img
                                             src="/home/images/project1.jpg"
                                             alt="Project 1"
                                             fill
                                             className="object-cover pt-4 pb-4 z-20"
                                             priority
                                           />
                                         </div>   
                                          <div className="sticky top-[40px] z-40 bg-white">
                  <div className="sticky top-[40px] flex justify-between border-t w-[45vw] z-40 bg-white">
                  <h3 className="text-[11.5px]">Building 140 CERN</h3>
                  <h3 className="text-[11.5px]">GENEVA, CH</h3>
                </div>
                 <div className="w-[400px] h-[95vh] bg-white z-30">
                  
                 
                  
                 
                 </div>
                </div>

                 
                                         
                                            

                                              
               </div>

               
               
            </div>

            <div
                        //   style={{
                        //     zIndex: 3,
                        //     bottom: "calc(-78.3px - 10vh)",
                        //   }}
                          className="flex h-fit w-full justify-end items-center"
                        >
                          <div
                            className={`pt-6 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 `}
                          >
                            KAAN
                          </div>
                          
                        </div>
                        <div className="border-t w-full h-[20px]"></div>
            
          </div>
          
      
        </div>

        
    
    </>
  );
}