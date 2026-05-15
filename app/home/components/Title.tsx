"use client";


import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";


export default function Title({hide}: {hide: boolean} ) {
  

  return (
    
     <div
    className={`
      ${suisse.className}
      flex text-[55px] text-white w-fit mx-auto
      font-extrabold pt-[60px]
      animate-logo-enter
    `}
  >
    <span>KAAN</span>

    <motion.span
      className={`${suisse.className} font-light ml-2 overflow-hidden`}
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