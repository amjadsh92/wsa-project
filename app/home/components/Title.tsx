"use client";

import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { i } from "framer-motion/client";

export default function Title({
  hide,
  jump,
  
}: {
  hide: boolean;
  jump: boolean;
  
}) {

//  const pathname = usePathname();
//  const [introDone, setIntroDone] = useState(false);
//  const [animStarted, setAnimStarted] = useState(false)
 

 useEffect(()=>{

  
    
  console.log("remounted")
    
// const frame = requestAnimationFrame(() => {
   
//       setIntroDone(true)
   
//       console.log(jump)

 
//     }
  
//   )


//    return () => cancelAnimationFrame(frame);
}
 ,[jump])

 




//   useEffect(() => {
//   const frame = requestAnimationFrame(() => {
//     if(!firstMounted) {
//       setIntroDone(true)
//     } ;
//   });
//   return () => cancelAnimationFrame(frame);
// }, [pathname]);
  return (
  //   <motion.div
  //   onAnimationEnd = {(e) => {
  //   if (e.animationName === "animate-logo-enter") {
  //     setIntroDone(true);
  //     console.log(introDone);
  //   }
  // }}
  //     animate={
  //       // jump
  //       //   ? {
  //       //       opacity: 0,
  //       //       y: -30,
  //       //     }
  //       //   : {
  //       //       opacity: 1,
  //       //       y: 0,
  //       //     }
  //       jump
  //         ? "hidden"
  //         : "visible"
     
      
      
  //         }

  //          variants={{

  //            hidden: {opacity:0, y:-30},

  //       visible: {
  //         opacity: 1,
  //         y: 0,
        
  //     }}}
  //     transition={{
  //       duration: 0.35,
  //       ease: "easeOut",
  //     }}
  //     className={`
  //       ${suisse.className}
  //       flex text-[55px] text-white w-fit mx-auto
  //       font-extrabold pt-[60px]
  //        ${!introDone ? "animate-logo-enter" : ""}
  //     `}
  //   >


   <div
    
  // onAnimationEnd={() => {
    
  //     // setTitleAnimationPlayed(true)
    
  // }}
  className={`
    
    flex text-[55px] text-white w-fit mx-auto
    font-extrabold pt-[60px] animate-logo-enter 
    opacity-0
  `}
>
  
  

      <span className={`${suisse.className}
       ${
        jump
        ? "logo-hidden"
        : "logo-visible"
    }`}>KAAN</span>

      <motion.span
        className={`${suisse.className}   ${
        jump
        ? "logo-hidden"
        : "logo-visible"
    } font-light ml-2 overflow-hidden`}
        initial={false}
        animate={
          hide
            ? {
                width: 0,
                clipPath: "inset(0% 100% 0% 0%)",
                opacity: 0,
                marginLeft: 0,
              }
            : {}
        }

       

        
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        Architecten
      </motion.span>
    </div>


  );
}