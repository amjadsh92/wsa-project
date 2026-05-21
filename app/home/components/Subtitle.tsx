"use client";

import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";
import { useState } from "react";

export default function Subtitle({
  showOverlay,
  jump,
}: {
  showOverlay: boolean;
  jump: boolean;
}) {

  const [introDone, setIntroDone] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate={
        jump
          ? "jumped"
          : !showOverlay 
          ? "visible"
          : "hidden"
      }
      variants={{
        hidden: {},

        visible: {
          opacity: 1,
          y: 0,
          
          transition: !introDone ? {
            delayChildren: 0.4,
            staggerChildren: 0.07,
          }:
          {
            duration:0.35
          },
        },

        jumped: {
          opacity: 0,
          y: -10,
          transition: {
            duration: 0.35,
            ease: "easeOut",
          },
        },
      }}

      onAnimationComplete={(definition) => {
    if (definition === "visible") {
      setIntroDone(true);
    }
  }}
      className={`${suisse.className} text-[20px] mx-auto w-fit text-white font-light`}
    >
      <Word>Architecture</Word>
      <Separator />
      <Word>Art</Word>
      <Separator />
      <Word>Design</Word>
    </motion.div>
  );
}

function Word({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        jumped: {
          y: -10,
          opacity: 0,
          transition: {
            duration: 0.35,
            ease: "easeOut",
          },
        },
      }}
      className="inline-block mx-1"
    >
      {children}
    </motion.span>
  );
}

function Separator() {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        jumped: {
          y: -10,
          opacity: 0,
          transition: {
            duration: 0.35,
            ease: "easeOut",
          },
        },
      }}
      className="inline-block mx-1 align-[2.5px]"
    >
      |
    </motion.span>
  );
}