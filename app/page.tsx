
"use client";
import { useEffect, useState} from "react";
import Carousel from "@/app/home/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import Title from "./home/components/Title";
import Subtitle from "./home/components/Subtitle";
import { suisse } from "@/app/fonts";

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
  const [bigJump, setBigJump] = useState(false)
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
        console.log(scrollY)
        setJump(true);
      } else {
        console.log(scrollY)
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


  const bigJumpFunc = () => {
    console.log(window.innerHeight)
   if(window.scrollY <= window.innerHeight * 0.15){
   window.scrollTo({
    top: (window.innerHeight * 0.35) ,
    behavior: "smooth",
  });
  }

  else{
    window.scrollTo({
    top: (window.innerHeight * 0.35 ),
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
       

        <Title  hide ={hide} jump={jump}  /> 
        <Subtitle showOverlay = {showOverlay} jump ={jump}  />
       
      </div>

      <div className="flex flex-col">
        {/* Hero section (Carousel) */}
        <div
          
          className="sticky top-0 h-screen w-full overflow-hidden"
          onClick={bigJumpFunc}
        >
       
          {!showOverlay &&  <Carousel
            images={images}
            titles={titles}
            descriptions={descriptions}
            speed={700}
          />}
        </div>
        {/* home section */}
        <motion.div
         
            animate={{
              y: jump ? "-65vh" : "0vh",
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
            }}

            className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] sticky top-[65vh] h-[100vh] bg-white"
        >
          <div className="search col-span-2 sticky top-[66vh] flex justify-end mr-[2vh] mt-[2vh]">
            <i className="pi pi-search"></i>
         </div>
         <div className="nav h-fit sticky top-[70vh]">
          <ul>
            <li>About</li>
            <li>Work</li>
            <li>Repository</li>

          </ul>
         </div>
         <div className="projects h-fit"></div>
           
        </motion.div>
        <div style={{zIndex:3}} className="flex flex-col h-[65vh] w-full justify-end items-center bg-white">
           <div className={`${suisse.className} pb-0 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125`}>KAAN</div>
           <div className="border w-full mt-[-15px]"></div>
          </div>
          
         

         
      </div>
    </>
  );
}



