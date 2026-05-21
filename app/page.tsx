
"use client";
import { useEffect, useState } from "react";
import Carousel from "@/app/home/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import Title from "./home/components/Title";
import Subtitle from "./home/components/Subtitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'primeicons/primeicons.css';

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
      {/* BLACK OVERLAY  */}
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
       

        <Title hide ={hide} jump={jump} /> 
        <Subtitle showOverlay = {showOverlay} jump ={jump} />
       
      </div>

      <div className="flex z-[1001] flex-col">
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
          <div className="sticky top-[67vh] mt-[2vh] flex justify-end mr-[2vh]">
            <i className="pi pi-search"></i>
         </div>
           
        </div>
      </div>
    </>
  );
}

