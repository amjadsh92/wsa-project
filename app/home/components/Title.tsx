"use client";

import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";
import { useEffect, useState } from "react";

export default function Title({
  hide,
  jump,
}: {
  hide: boolean;
  jump: boolean;
}) {

 const [introDone, setIntroDone] = useState(false);

//   useEffect(() => {
//   const frame = requestAnimationFrame(() => {
//     setIntroDone(true);
//   });
//   return () => cancelAnimationFrame(frame);
// }, []);
  return (
    <motion.div
    onAnimationEnd = {() => setIntroDone(true)}
      animate={
        jump
          ? {
              opacity: 0,
              y: -30,
            }
          : {
              opacity: 1,
              y: 0,
            }
      }
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className={`
        ${suisse.className}
        flex text-[55px] text-white w-fit mx-auto
        font-extrabold pt-[60px]
         ${!introDone ? "animate-logo-enter" : ""}
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
    </motion.div>
  );
}