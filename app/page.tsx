// "use client";
// import { useEffect, useState} from "react";
// import Carousel from "@/app/home/components/Carousel";
// import { motion, AnimatePresence } from "framer-motion";
// import Title from "./home/components/Title";
// import Subtitle from "./home/components/Subtitle";
// import { suisse } from "@/app/fonts";

// import 'primeicons/primeicons.css';

// const images = [
//   "/home/images/project1.jpg",
//   "/home/images/project2.jpg",
//   "/home/images/project3.jpg",
// ];

// const titles = "";
// const descriptions = "";

// export default function Home() {
//   const [hide, setHide] = useState(false);
//   const [jump, setJump] = useState(false);

//   const [showOverlay, setShowOverlay] = useState(true);

// useEffect(() => {
//   let loadedCount = 0;

//   images.forEach((src) => {
//     const img = new Image();

//     img.src = src;

//     img.onload = () => {
//       loadedCount++;

//       if (loadedCount === images.length) {
//         setShowOverlay(false);
//       }
//     };

//   });
// }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > window.innerHeight * 0.15) {

//         setJump(true);
//       }
//        else

//        {

//         setJump(false);
//       }

//     //       if (window.scrollY >= window.innerHeight) {
//     //   setJump(false);

//     // } else if (window.scrollY > window.innerHeight * 0.15) {
//     //   setJump(true);

//     // } else {
//     //   setJump(false);

//     // }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setHide(true);
//       // window.removeEventListener("scroll", handleScroll);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const bigJumpFunc = () => {
//     console.log(window.innerHeight)
//    if(window.scrollY <= window.innerHeight * 0.15){
//    window.scrollTo({
//     top: (window.innerHeight * 0.35) ,
//     behavior: "smooth",
//   });
//   }

//   else{
//     window.scrollTo({
//     top: (window.innerHeight * 0.35 ),
//     behavior: "smooth",
//   });
//   }
// };

//   return (
//     <>
//       {/* BLACK OVERLAY  */}
//       <AnimatePresence>
//         {showOverlay && (
//           <motion.div
//             initial={{ opacity: 1 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: 0.3,
//               ease: "easeInOut",
//             }}
//             className="fixed inset-0 bg-neutral-800 z-1000"
//           />
//         )}
//       </AnimatePresence>
//       {/* Title and subtitle above the Hero section */}
//       <div className="fixed w-full z-1000 pointer-events-none">

//         <Title  hide ={hide} jump={jump}  />
//         <Subtitle showOverlay = {showOverlay} jump ={jump}  />

//       </div>

//       <div className="flex flex-col">
//         {/* Hero section (Carousel) */}
//         <div

//           className="sticky top-0 h-screen w-full overflow-hidden"
//           onClick={bigJumpFunc}
//         >

//           {!showOverlay &&  <Carousel
//             images={images}
//             titles={titles}
//             descriptions={descriptions}
//             speed={700}
//           />}
//         </div>
//         {/* home section */}
//         <motion.div
//             // key={jump ? "jumped" : "notjumped"}
//             animate={{
//               y: jump ? "-65vh" : "0vh",
//             }}
//             transition={{

//               type: "spring",
//               stiffness: 90,
//               damping: 18,
//             }}

//             // className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] sticky top-[65vh] h-[100vh] bg-white"
//             className={`flex flex-col sticky h-[200vh] top-[64vh] bg-white`}
//         >
//           <div className={`flex search sticky top-[66vh] flex justify-end mr-[2vh] mt-[2vh]`}>
//             <i className="pi pi-search"></i>
//          </div>
//          {/* nav */}
//          <div className={`flex sticky justify-between top-[70vh] pt-[0px]`}>
//           <ul>
//             <li className={`${suisse.className}  text-[42.2px] font-[400] pl-2 `}>ABOUT</li>
//             <div className="border w-[50vw] font-light"></div>
//             <li className={`${suisse.className}  text-[42.2px] font-[400] pl-2`}>WORK</li>
//             <div className="border w-[50vw]"></div>
//             <li className={`${suisse.className}  text-[42.2px] font-[400] pl-2`}>REPOSITORY</li>
//             <div className="border w-[50vw]"></div>

//           </ul>
//           {/* projects */}
//           <div className="projects">example</div>
//          </div>
//          {/* <div style={{zIndex:3}} className="sticky top-[200vh] flex flex-col h-[65vh] w-full justify-end items-center bg-white">
//            <div className={`${suisse.className} pb-0 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 `}>KAAN</div>
//            <div className="border w-full mt-[-30px]"></div>
//           </div>
//             */}
//         </motion.div>
//         <div style={{zIndex:3}} className="flex flex-col h-[65vh] w-full justify-end items-center bg-white">
//            <div className={`${suisse.className} pb-0 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 `}>KAAN</div>
//            <div className="border w-full mt-[-30px]"></div>
//           </div>

//       </div>
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Carousel from "@/app/home/components/Carousel";
import { motion, AnimatePresence } from "framer-motion";
import Title from "./home/components/Title";
import Subtitle from "./home/components/Subtitle";
import { suisse } from "@/app/fonts";
import Img from "next/image";

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

      //       if (window.scrollY >= window.innerHeight) {
      //   setJump(false);

      // } else if (window.scrollY > window.innerHeight * 0.15) {
      //   setJump(true);

      // } else {
      //   setJump(false);

      // }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHide(true);
      // window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bigJumpFunc = () => {
    console.log(window.innerHeight);
    if (window.scrollY <= window.innerHeight * 0.15) {
      window.scrollTo({
        top: window.innerHeight * 0.35,
        behavior: "smooth",
      });
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

        <div className="relative">
          <motion.div
            initial={{ y: "65vh" }}
            animate={{
              y: jump ? "0vh" : "65vh",
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 18,
            }}
            // className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] sticky top-[65vh] h-[100vh] bg-white"
            className={`relative flex flex-col h-[400vh] bg-white mt-[-65vh]`}
          >
            <div className={`sticky top-0 flex search justify-end z-1000 py-[12px] bg-white`}>
              <i className="pi pi-search pr-[10px]"></i>
            </div>
            {/* nav */}
            {/* <div className="sticky top-0"> */}

            <div className={`flex z-10 gap-[20px] h-full`}>
              <div className={`sticky top-0 self-start`}>
                <ul className=" pt-[10vh]">
                  <li
                    className={`${suisse.className}  text-[52.2px] font-[400] pl-2 `}
                  >
                    ABOUT
                  </li>
                  <div className="border w-[50vw] font-light"></div>
                  <li
                    className={`${suisse.className}  text-[52.2px] font-[400] pl-2`}
                  >
                    WORK
                  </li>
                  <div className="border w-[50vw]"></div>
                  <li
                    className={`${suisse.className}  text-[52.2px] font-[400] pl-2`}
                  >
                    REPOSITORY
                  </li>
                  <div className="border w-[50vw]"></div>
                </ul>
              </div>

              {/* projects */}
              <div className={`relative top-[calc(78.3px+10vh)] right-0`}>
               
                <div className="sticky top-[40px] z-20 bg-white">
                  <div className="flex justify-between border-t w-[45vw]">
                    <h3 className="text-[11.5px]">Building 140 CERN</h3>
                    <h3 className="text-[11.5px]">GENEVA, CH</h3>
                  </div>
                </div>

                {/* <div className="mt-4">
                  <Img
                    src="/home/images/project1.jpg"
                    alt=""
                    className="w-[279.212px] h-[497.212px] object-cover"
                  />
               </div> */}

               <div className="relative h-[22.5vw] w-[45vw] mt-4 mb-[40px]">
                  <Img
                    src="/home/images/project1.jpg"
                    alt="Project 1"
                    fill
                    className="object-cover"
                    priority
                  />
              </div>
              

               <div className="sticky top-[calc(40px+17.2px)] z-20 bg-white">
                  <div className="flex justify-between border-t w-[45vw]">
                    <h3 className="text-[11.5px]">Building 140 CERN</h3>
                    <h3 className="text-[11.5px]">GENEVA, CH</h3>
                  </div>
                </div>
               
                {/* <div className="mt-4">
                  <Img
                    src="/home/images/project1.jpg"
                    alt=""
                    className="w-[279.212px] h-[497.212px] object-cover"
                  />
               </div> */}

               <div className="relative h-[22.5vw] w-[45vw] mt-4 mb-[40px]">
                  <Img
                    src="/home/images/project1.jpg"
                    alt="Project 1"
                    fill
                    className="object-cover"
                    priority
                  />
              </div>

            <div className="sticky top-[calc(40px+2*17.2px)] z-20 bg-white">
                  <div className="flex justify-between border-t w-[45vw]">
                    <h3 className="text-[11.5px]">Building 140 CERN</h3>
                    <h3 className="text-[11.5px]">GENEVA, CH</h3>
                  </div>
                </div>
               
                {/* <div className="mt-4">
                  <Img
                    src="/home/images/project1.jpg"
                    alt=""
                    className="w-[279.212px] h-[497.212px] object-cover"
                  />
               </div> */}

               <div className="relative h-[22.5vw] w-[45vw] mt-4 mb-[40px]">
                  <Img
                    src="/home/images/project1.jpg"
                    alt="Project 1"
                    fill
                    className="object-cover"
                    priority
                  />
              </div>



              </div>
            </div>

            {/* </div> */}

            <div
              style={{ 
                zIndex: 3,
                bottom: "calc(-78.3px - 10vh)"

               }}
              className="relative flex flex-col h-fit w-full justify-end items-center bg-white"
            >
              <div
                className={`${suisse.className} pb-0 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 `}
              >
                KAAN
              </div>
              <div className="border w-full mt-[-30px]"></div>
            </div>
          </motion.div>
        </div>

        {/* <div style={{zIndex:3}} className="flex flex-col h-[65vh] w-full justify-end items-center bg-white">
           <div className={`${suisse.className} pb-0 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 `}>KAAN</div>
           <div className="border w-full mt-[-30px]"></div>
          </div> */}
      </div>
    </>
  );
}
