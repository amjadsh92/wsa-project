
"use client";


import { motion } from "framer-motion";
import { suisse } from "@/app/fonts";



export default function Subtitle({showOverlay}:{showOverlay:boolean}){

return(
    <>
    <motion.div
          initial="hidden"
          animate={!showOverlay ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.4,
                staggerChildren: 0.07,
              },
            },
          }}
          className={`${suisse.className} text-[20px] mx-auto w-fit text-white font-light`}
        >
          <Word>Architecture</Word>
          <Separator />
          <Word>Art</Word>
          <Separator />
          <Word>Design</Word>
        </motion.div>
     </>
)

}     




function Word({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
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
      }}
      className="inline-block mx-1 align-[2.5px]"
    >
      |
    </motion.span>
  );

} 