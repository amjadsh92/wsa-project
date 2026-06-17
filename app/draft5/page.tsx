
"use client";
import { useEffect, useState } from "react";


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
    
      <div className="flex flex-col">
        {/* Hero section (Carousel) */}
       

         
        <div
          style={{
            backgroundImage: `url("/home/images/project1.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className="sticky top-0 h-[100vh] overflow-hidden"
        /> 


        <div className="h-[200vh]">
         <div
            style={{
              backgroundImage: `url("/home/images/project1.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: jump
                ? "translateY(0vh)"
                : "translateY(65vh)",

              transition: "transform 0.35s ease-out",
              zIndex:2
            }}
            className="relative flex flex-col bg-white h-[200vh] mt-[-65vh]"
          >
            <div className="sticky top-0">
              Hello
            </div>
            {/* <div className="h-[200vh]"></div> */}
            
          </div>
          </div>
      </div>
      
   
      
        

      
    </>
  );
}
