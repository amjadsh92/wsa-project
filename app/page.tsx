
"use client";

import { useEffect, useState } from "react";
import { archivo, lato } from "./fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";



const images = [
  "/home/images/project1.jpg",
  "/home/images/project2.jpg",
   "/home/images/project3.jpg"

];

const text = ["Project1", "Project2", "Project3"]
const description = ["Description of Project 1", "Description of project 2", "Description of project 3"]

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [right, setRight] = useState(true);
  const [clickable, setClickable] = useState(true)
  

  


  useEffect(() => {

    if (!right){
      return;
    }
    const interval = setInterval(() => {
     
      setAnimate(true);

      const timeout = setTimeout(() => {
        
        setCurrent(next);
        setNext((next + 1) % images.length);
        
        setAnimate(false);
      }, 700); 

      return () => clearTimeout(timeout);
    }, 3000); 

    return () => clearInterval(interval);
  }, [next]);


  const goRight = () => {
  if(!clickable){
    return
  }  
  setAnimate(true);
  setRight(true)
  setClickable(false)
  setTimeout(() => {
    setCurrent(prev => (prev + 1) % images.length);
    setNext(prev => (prev + 1) % images.length);
    setAnimate(false);
    setClickable(true)
  }, 700);
};

// const goLeft = () => {
//   setAnimate(true);
//   setRight(false)
  
//   setTimeout(() => {
//     setCurrent(prev => (prev - 1) % images.length);
//     setNext(prev => (prev - 1) % images.length);
//     setAnimate(false);
//     setRight(true)
//   }, 700);
// };


const goLeft = () => {
   if(!clickable){
    return
  }  
  const newNext =
    (current - 1 + images.length) % images.length;
   
  setRight(false)
  setNext(newNext);
  setTimeout(() => setAnimate(true),0)
  setClickable(false)
  setTimeout(() => {
   
    setCurrent((prev)=> (prev - 1 + images.length ) % images.length)
    setNext(current)
    setAnimate(false);
    setRight(true);
    setClickable(true)
  
  }, 700);
};

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Current Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center  ${animate ? (right ? `transition-transform duration-700 -translate-x-full` : `transition-transform duration-700 translate-x-full`) : (right ?  `translate-x-0` : `translate-x-0`)} `}
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
      > 
     <div className="absolute inset-0 bg-black/10 z-10" >    
      <div className={`${lato.className} mt-[400px] w-fit mx-auto text-white text-5xl z-50 font-extrabold select-none`}>{text[current]}</div>
      <div className={`${lato.className} mt-[30px] w-fit mx-auto text-white text-3xl z-50 font-extrabold select-none`}>{description[current]}</div>
      </div>
       </div>

    

   

      <FontAwesomeIcon className="absolute right-[50px] bottom-[50vh] text-4xl text-white z-40" icon={faAngleRight}  onClick={goRight} />
       <FontAwesomeIcon className="absolute left-[50px] bottom-[50vh] text-4xl text-white z-40" icon={faAngleLeft}  onClick={goLeft} />

      {/* Next Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${animate ? (right ? `transition-transform duration-700 translate-x-0` : `transition-transform duration-700 translate-x-0`) : (right ? "translate-x-full" : "-translate-x-full")}  `}
        style={{
          backgroundImage: `url(${images[next]})`,
        }}
      >
   <div className="absolute inset-0 bg-black/10 z-10" >        
         <div className={` ${lato.className} mt-[400px] mx-auto w-fit text-white text-5xl font-extrabold select-none `}>{text[next]}</div>
         <div className={`${lato.className} mt-[30px] w-fit mx-auto text-white text-3xl z-50 font-extrabold select-none`}>{description[next]}</div>
         </div>
       </div>

     


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 h-full w-full">
        <div
          className={`${archivo.className} text-[55px] text-white w-fit mx-auto font-extrabold pt-[60px]`}
        >
          KAAN{" "}
          <span className={lato.className}>Architecten</span>
        </div>
      </div>
    </div>
  );
}


