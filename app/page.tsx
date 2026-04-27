"use client";

import { useEffect, useState } from "react";
import { archivo, lato } from "./fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const images = [
  "/home/images/project1.jpg",
  "/home/images/project2.jpg",
  "/home/images/project3.jpg",
];

const text = ["Project1", "Project2", "Project3"];
const description = [
  "Description of Project 1",
  "Description of project 2",
  "Description of project 3",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [currentOwl, setCurrentOwl] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [right, setRight] = useState(true);
  const [rightFunc, setRightFunc] = useState(false)
  const [leftFunc, setLeftFunc] = useState(false)
  const [goToFunc, setGoToFunc] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [clickable, setClickable] = useState(true);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [triggerInterval, setTriggerInterval] = useState(false);

  useEffect(() => {
    if (!right || buttonPressed || !clickable) {
      return;
    }
    // setClickable(true)


    
    const interval = setInterval(() => {
      setAnimate(true);
      setCurrentOwl(next);
      setClickable(false)
      
    }, 3000);

    return () => clearInterval(interval);
  }, [next, triggerInterval]);


  const handleTransitionEnd = () => {
    
    
       
    
    if(rightFunc){
      setCurrent((prev) => (prev + 1) % images.length);
      setNext((prev) => (prev + 1) % images.length);
      setAnimate(false);
      setClickable(true)
      setRightFunc(false)
    }  
    
    if(leftFunc){
       setCurrent((prev) => (prev - 1 + images.length) % images.length);
       setNext(current);
       setAnimate(false);
       setRight(true);
       setClickable(true);
       setLeftFunc(false)
    }

    if(goToFunc){

      setCurrent(photoIndex)
      setClickable(true)
      setNext((photoIndex+1)%(images.length))
      setButtonPressed(false)
      setAnimate(false)
      setRight(true)
      setGoToFunc(false)
      setTriggerInterval(!triggerInterval)
    }

    else{
       setCurrent(next);
        setNext((next + 1) % images.length);
        setClickable(true);
        setAnimate(false);
    }

    
  }

  const goRight = () => {
    if (!clickable) {
      return;
    }
    setAnimate(true);
    setRight(true);
    setCurrentOwl((prev) => (prev + 1) % images.length);
    setClickable(false);
    setRightFunc(true)
    
  
  };

  const goLeft = () => {
    if (!clickable) {
      return;
    }
    const newNext = (current - 1 + images.length) % images.length;

    setRight(false);
    setNext(newNext);
    setCurrentOwl((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setAnimate(true), 0);
    setClickable(false);
    setLeftFunc(true)
    
  };

  const goTo = (index: number) => {

    if(!clickable){
      return
    }

    
    if(index > current){
      if((index - current) > (images.length % (index +1) + current + 1)){
             setRight(false)
      }

     


    }

    if(index < current){
      if((current-index) <= (images.length % (current+1) + index + 1)){
             setRight(false)
      }

      
    }

    if(index === current){
      return
    }



    setNext(index);
    
    setCurrentOwl(index)
    setButtonPressed(true)
    setClickable(false)
    setPhotoIndex(index)
    setTimeout(() => setAnimate(true), 0);
    setGoToFunc(true)
    
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Current Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center  ${animate ? (right ? `transition-transform duration-700 -translate-x-full` : `transition-transform duration-700 translate-x-full`) : right ? `translate-x-0` : `translate-x-0`} `}
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="absolute inset-0 bg-black/10 z-10">
          <div
            className={`${lato.className} mt-[400px] w-fit mx-auto text-white text-5xl z-50 font-extrabold select-none`}
          >
            {text[current]}
          </div>
          <div
            className={`${lato.className} mt-[30px] w-fit mx-auto text-white text-3xl z-50 font-extrabold select-none`}
          >
            {description[current]}
          </div>
        </div>
      </div>

      <FontAwesomeIcon
        className="absolute right-[50px] bottom-[50vh] text-4xl text-white z-40"
        icon={faAngleRight}
        onClick={goRight}
      />
      <FontAwesomeIcon
        className="absolute left-[50px] bottom-[50vh] text-4xl text-white z-40"
        icon={faAngleLeft}
        onClick={goLeft}
      />

      {/* Next Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${animate ? (right ? `transition-transform duration-700 translate-x-0` : `transition-transform duration-700 translate-x-0`) : right ? "translate-x-full" : "-translate-x-full"}  `}
        style={{
          backgroundImage: `url(${images[next]})`,
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-10">
          <div
            className={` ${lato.className} mt-[400px] mx-auto w-fit text-white text-5xl font-extrabold select-none `}
          >
            {text[next]}
          </div>
          <div
            className={`${lato.className} mt-[30px] w-fit mx-auto text-white text-3xl z-50 font-extrabold select-none`}
          >
            {description[next]}
          </div>
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 h-full w-full">
        <div
          className={`${archivo.className} text-[55px] text-white w-fit mx-auto font-extrabold pt-[60px]`}
        >
          KAAN <span className={lato.className}>Architecten</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2  z-30 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goTo(index)}
            className={`h-3 w-3 rounded-full cursor-pointer  ${
              index === currentOwl
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}