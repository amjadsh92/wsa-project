"use client";

import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";


export default function Title({
  hide,
  jump,
  skipIntro = false,
  title = "KAAN",
  companion = "Architecten",
}: {
  hide: boolean;
  jump: boolean;
  skipIntro?: boolean;
  title?: string;
  companion?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- A full navigation restarts the home page and its intro.
    <a
      href="/"
      aria-label={`${title} ${companion} home`}
      tabIndex={jump ? -1 : undefined}
      className={`
    ${jump ? "pointer-events-none" : "pointer-events-auto"}
    
    flex flex-wrap justify-center text-center max-w-full px-4 text-[3.4375rem] text-white w-fit mx-auto
    font-extrabold pt-[3.75rem] ${skipIntro ? "opacity-100" : "animate-logo-enter opacity-0"}
    max-[500px]:text-[2.8125rem] max-[400px]:text-[2.1875rem]
  `}
    >
      <span
        className={`${suisse.className}
       ${jump ? "logo-hidden" : "logo-visible"}`}
      >
        {title}
      </span>

      {companion && <motion.span
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
        {companion}
      </motion.span>}
    </a>
  );
}
