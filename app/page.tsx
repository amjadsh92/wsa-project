

"use client";
import { useEffect, useState } from "react";
import { suisse } from "@/app/fonts";
import Carousel from "@/app/home/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";
// import Logo from "./home/components/Logo";

const images = [
  "/home/images/project1.jpg",
  "/home/images/project2.jpg",
  "/home/images/project3.jpg",
];

const titles = "";
const descriptions = "";

export default function Home() {
  const [hide, setHide] = useState(false);
  const [jump, setJump] = useState(false);

  // NEW
  const [showOverlay, setShowOverlay] = useState(true);

// useEffect(() => {
//   const frame = requestAnimationFrame(() => {
//     setShowOverlay(false);
//   });

//   return () => cancelAnimationFrame(frame);
// }, []);

// useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowOverlay(false);
//     }, 700);

//     return () => clearTimeout(timer);
//   }, []);

useEffect(() => {
  let loadedCount = 0;

  images.forEach((src) => {
    const img = new Image();

    img.src = src;

    img.onload = () => {
      loadedCount++;

      if (loadedCount === images.length) {
        setShowOverlay(false);
      }
    };
  });
}, []);

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

  useEffect(() => {
    const handleScroll = () => {
      setHide(true);
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* BLACK OVERLAY */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-neutral-800 z-[999]"
          />
        )}
      </AnimatePresence>

      <div className="fixed z-1000 w-full">
        <div
          
          
          className={`${suisse.className} flex text-[55px] text-white w-fit mx-auto pt-[60px]`}
        >
          <span className={`${suisse.className} animate-logo-enter font-extrabold`}>KAAN</span>

          <motion.span
            className={`${suisse.className} animate-logo-enter font-light ml-2 overflow-hidden`}
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
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

        {/* <Logo hide ={hide} /> */}

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
      </div>

      <div className="flex flex-col">
        <div
          style={{ zIndex: 1 }}
          className="sticky top-0 h-screen w-full overflow-hidden"
        >
          {!showOverlay &&  <Carousel
            images={images}
            titles={titles}
            descriptions={descriptions}
            speed={700}
          />}
        </div>

        <div
          style={{
            transform: jump
              ? "translateY(-65vh)"
              : "translateY(0vh)",
            zIndex: 2,
            transition: "transform 0.35s ease-out",
          }}
          className="sticky top-0 h-[200vh] bg-white"
        >
          <div className="sticky top-[65vh]">Hello</div>
        </div>
      </div>
    </>
  );
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