
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

     <div  className="relative h-[200vh] flex bg-red-600">

    
       
     <div className="sticky top-[70vh] h-fit">Hello</div>
     <div className="sticky top-[71vh] h-fit">Hello</div>
     
     
     </div>
    
      <div style={{ transform:
                
                 "translateY(0vh)"}} className="relative h-[150vh] flex mt-[0vh] bg-black">

    
       
     
     
     
     </div>
       


       
   
      
        

      
    </>
  );
}
