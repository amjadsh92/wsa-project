"use client";

import { archivo, lato, monteserrat, suisse } from "@/app/fonts";
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

  return(
    <>
    <div className="absolute z-20 h-full w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`${suisse.className} text-[55px] text-white w-fit mx-auto font-extrabold pt-[60px]`}
      >
       
          KAAN <span className={`${suisse.className} font-light`} >Architecten</span>
        </motion.div>
      </div>
    <Carousel images={images} titles={titles} descriptions={descriptions} speed={700} />

    

     
    </>  
  )
 

}