"use client";

import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";


export default function Title({
  hide,
  jump,
}: {
  hide: boolean;
  jump: boolean;
}) {
  return (
    <div
      className={`
    
    flex text-[3.4375rem] text-white w-fit mx-auto
    font-extrabold pt-[3.75rem] animate-logo-enter
    opacity-0 max-[500px]:text-[2.8125rem] max-[400px]:text-[2.1875rem]
  `}
    >
      <span
        className={`${suisse.className}
       ${jump ? "logo-hidden" : "logo-visible"}`}
      >
        KAAN
      </span>

      <motion.span
        className={`${suisse.className}   ${
          jump ? "logo-hidden" : "logo-visible"
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
