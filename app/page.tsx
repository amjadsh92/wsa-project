"use client";
import { useEffect, useState } from "react";
import { suisse } from "@/app/fonts";
import Carousel from "@/app/home/components/Carousel";
import { motion } from "framer-motion";

const images = [
  "/home/images/project1.jpg",
  "/home/images/project2.jpg",
  "/home/images/project3.jpg",
];

const titles = ""
const descriptions = ""



export default function Home() {

  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHide(true); // trigger once
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return(
    <>
    <div className="absolute z-20 h-full w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${suisse.className} flex text-[55px] text-white w-fit mx-auto font-extrabold pt-[60px]`}
      >
         <span className= "">  KAAN  </span>
        
          
          <motion.span
          className="font-light ml-2 overflow-hidden"
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
        </motion.div>
        {/* Words (delayed + staggered) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.9, 
                staggerChildren: 0.07 
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
      

    <Carousel images={images} titles={titles} descriptions={descriptions} speed={700} />

    <div className="bg-black h-screen">



    </div>

    

     
    </>  
  )



 

}



function Word({ children }:{children:React.ReactNode}) {
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