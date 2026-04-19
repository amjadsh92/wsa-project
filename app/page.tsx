// import { archivo, lato } from './fonts';


// export default function Home() {
//   return (
//     <div className="h-screen w-screen bg-[url('/home/images/project1.jpg')] bg-cover p-[1px]">
//       <div className={`${archivo.className} text-[55px] text-white w-fit m-auto font-bold mt-[60px]`}> KAAN{" "}<span className={`${lato.className}`}>Architecten </span></div> 
     
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { archivo, lato } from "./fonts";

const images = [
  "/home/images/project1.jpg",
  "/home/images/project2.jpg",
   "/home/images/project3.jpg"

];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1);
  const [animate, setAnimate] = useState(false);


  useEffect(() => {
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

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Current Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${animate ? `transition-transform duration-700` :""} ${
          animate ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
      />

      {/* Next Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${animate ? `transition-transform duration-700` :""}  ${
          animate ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage: `url(${images[next]})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 h-full w-full">
        <div
          className={`${archivo.className} text-[55px] text-white w-fit mx-auto font-bold pt-[60px]`}
        >
          KAAN{" "}
          <span className={lato.className}>Architecten</span>
        </div>
      </div>
    </div>
  );
}