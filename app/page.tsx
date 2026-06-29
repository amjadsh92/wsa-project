"use client";
import { useEffect, useState, useRef } from "react";
import Carousel from "@/app/home/components/Carousel";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Title from "./home/components/Title";
import Subtitle from "./home/components/Subtitle";
import Nav from "./home/components/Nav";
import Projects from "./home/components/Projects";
import Footer from "./home/components/Footer";
import "primeicons/primeicons.css";


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
  // const [animationDone, setAnimationDone] = useState(!jump);
  
  const [showOverlay, setShowOverlay] = useState(true);
  const [scope, animate] = useAnimate();
  const [ready, setReady] = useState(false)
  
  

 

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


    handleScroll()
    

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHide(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  const bigJumpFunc = async () => {
  if (jump) {
    await animate(
      window.scrollY,
      window.innerHeight * 0.35,
      {
        duration: 0.5,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
      }
    );
  } else {
    window.scrollTo({
      top: window.innerHeight * 0.35,
      behavior: "smooth",
    });
  }
};

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
            className="fixed inset-0 bg-neutral-800 z-1000"
          />
        )}
      </AnimatePresence>
      {/* Title and subtitle above the Hero section */}
      <div className="fixed w-full z-1000 pointer-events-none">
        <Title hide={hide} jump={jump} />
        <Subtitle showOverlay={showOverlay} jump={jump} />
      </div>

      <div className="flex flex-col">
        {/* Hero section (Carousel) */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          onClick={bigJumpFunc}
        >
          {!showOverlay && (
            <Carousel
              images={images}
              titles={titles}
              descriptions={descriptions}
              speed={700}
            />
          )}
        </div>

        {/* home section */}

        <motion.div
          ref={scope}
          initial={false}
          animate={ {
            y: jump ? "0vh" : "65vh",
          }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 18,
            
          }}
          className={`z-2 home flex flex-col bg-white mt-[-65vh] `}
            onAnimationStart={() => {
    // document.body.style.overflow = "clip";
    setReady(false)
   
  }}
           onAnimationComplete={() => {
    // document.body.style.overflow = "";
    setReady(true)
    
  }}
        >
          {/* Search bar */}
          <div
            className={`sticky top-0 flex justify-end z-1000 py-[12px] bg-white`}
          >
            <i className=" pi pi-search pr-[10px] text-[18px]"></i>
          </div>
          {/* Navbar and Projects */}
          <div className={`flex z-10 gap-[20px] flex-1`}>
            {/* Navbar */}
            <div
              className={`sticky top-[calc(var(--search-bar-height)-2px)] self-start`}
            >
              <Nav paddingTop={"--nav-padding-top"} />
            </div>

            {/* projects */}
            <div
              className={`mt-[calc(var(--nav-height-block)+var(--nav-padding-top))]`}
            >
              <Projects ready={ready}/>
            </div>
          </div>
            {/* Footer */}
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
