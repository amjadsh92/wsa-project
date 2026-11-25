"use client";

import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";
import { Fragment, useState } from "react";

export default function Subtitle({
  showOverlay,
  jump,
  skipIntro = false,
  words = ["Architecture", "Art", "Design"],
}: {
  showOverlay: boolean;
  jump: boolean;
  skipIntro?: boolean;
  words?: string[];
}) {
  const [introDone, setIntroDone] = useState(skipIntro);

  return (
    <>
      <motion.div
        initial={skipIntro ? false : "hidden"}
        animate={jump ? "jumped" : !showOverlay ? "visible" : "hidden"}
        variants={{
          hidden: {},

          visible: {
            opacity: 1,
            y: 0,

            transition: !introDone
              ? {
                  delayChildren: 0.4,
                  staggerChildren: 0.07,
                }
              : {
                  duration: 0.35,
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
        onAnimationStart={(definition) => {
          if (definition === "visible") {
            setIntroDone(true);
          }
        }}
        className={`${suisse.className} text-[1.25rem] mx-auto w-fit text-white font-light max-[500px]:text-[1.125rem]`}
      >
        {words.map((word, index) => (
          <Fragment key={index}>
            {index > 0 && <Separator />}
            <Word>{word}</Word>
          </Fragment>
        ))}
      </motion.div>
    </>
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
      className="inline-block mx-1 align-[0.15625rem]"
    >
      |
    </motion.span>
  );
}
