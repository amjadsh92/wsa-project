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
  // Current project photo
  const [current, setCurrent] = useState(0); 
  // The button that is currently highlighted
  const [currentButton, setCurrentButton] = useState(0);
  // Next project photo 
  const [next, setNext] = useState(1);
  // Transition to the next photo should begin when animate is true 
  const [animate, setAnimate] = useState(false);
  // Transition direction is to right 
  const [right, setRight] = useState(true); 
  // This state indicates that you pressed the right arrow and the transition has completed
  const [rightFunc, setRightFunc] = useState(false); 
  // This state indicates that you pressed the left arrow and the transition has completed
  const [leftFunc, setLeftFunc] = useState(false); 
   // This state indicates that you pressed a button and the transition has completed
  const [goToFunc, setGoToFunc] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  // Indicates if arrows are clickable or no
  const [clickable, setClickable] = useState(true); 
  // Keep photo
  const [keepPhoto, setKeepPhoto] = useState(false)

  useEffect(() => {
    if (!right || !clickable) {
      return;
    }
    // In normal flow this runs every 3 seconds
    const interval = setInterval(() => {
      if(!keepPhoto){
      setAnimate(true);
      setCurrentButton(next);
      setClickable(false);
      }
      else{
        setKeepPhoto(false)
        
      }
      
     
    }, 3000);

    return () => clearInterval(interval);
  }, [next, keepPhoto]);

  // This runs when the  transition to the next image is finished
  const handleTransitionEnd = () => {
    // Logic when right arrow is pressed
    if (rightFunc) {
      setCurrent((prev) => (prev + 1) % images.length);
      setNext((prev) => (prev + 1) % images.length);
      setAnimate(false);
      setClickable(true);
      setRightFunc(false);
    }

    // Logic when left arrow is pressed
    if (leftFunc) {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setNext(current);
      setAnimate(false);
      setRight(true);
      setClickable(true);
      setLeftFunc(false);
    }
    // Logic when a button is pressed
    if (goToFunc) {
      
      setCurrent(photoIndex);
      setClickable(true);
      setNext((photoIndex + 1) % images.length);
      setAnimate(false);
      setRight(true);
      setGoToFunc(false);
      
    }
    // normal flow (photos transition in default to the right direction)
    else {
      setCurrent(next);
      setNext((next + 1) % images.length);
      setClickable(true);
      setAnimate(false);
    }
  };

  // This runs when you press the right arrow

  const goRight = () => {
    if (!clickable) {
      return;
    }
    setAnimate(true);
    setRight(true);
    setCurrentButton((prev) => (prev + 1) % images.length);
    setClickable(false);
    setRightFunc(true);
  };

  // This runs when you press the left arrow

  const goLeft = () => {
    if (!clickable) {
      return;
    }
    const newNext = (current - 1 + images.length) % images.length;

    setRight(false);
    setNext(newNext);
    setCurrentButton((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setAnimate(true), 0);
    setClickable(false);
    setLeftFunc(true);
  };

  // This runs when you press a button that takes you to a specific photo

  const goTo = (index: number) => {
    if (!clickable) {
      return;
    }

    // const stepsToReachIndexFromRightToLeft =
    //   (images.length % (index + 1)) + current + 1;
    // const stepsToReachIndexFromLeftToRight =
    //   (images.length % (current + 1)) + index + 1;
    // if (index > current && index - current > stepsToReachIndexFromRightToLeft) {
    //   setRight(false);
    // }

    // if (
    //   index < current &&
    //   current - index <= stepsToReachIndexFromLeftToRight
    // ) {
    //   setRight(false);
    // }

    if( index < current){
      setRight(false)
    }

    if (index === current) {
      setKeepPhoto(true)
      return
    }

    setNext(index);
    setCurrentButton(index);
    setClickable(false);
    setPhotoIndex(index);
    setTimeout(() => setAnimate(true), 0);
    setGoToFunc(true);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Current Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${animate ? `transition-transform duration-700 ${right ? `-translate-x-full` : `translate-x-full`}` : "translate-x-0"}`}
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
        // className={`absolute inset-0 bg-cover bg-center ${animate ? (right ? `transition-transform duration-700 translate-x-0` : `transition-transform duration-700 translate-x-0`) : right ? "translate-x-full" : "-translate-x-full"}  `}
         className={`absolute inset-0 bg-cover bg-center ${
  animate
    ? "transition-transform duration-700 translate-x-0"
    : right
    ? "translate-x-full"
    : "-translate-x-full"
}`}
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
              index === currentButton
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
