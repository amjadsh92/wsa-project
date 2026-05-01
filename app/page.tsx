"use client";

import { archivo, lato } from "@/app/fonts";
import Carousel from "@/app/home/components/Carousel";

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
    
    <Carousel images={images} titles={titles} descriptions={descriptions} speed={700} />

    

     
    </>  
  )
 

}