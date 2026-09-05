"use client";
import { useEffect,useState } from "react";
import Carousel from "@/app/home/components/Carousel";
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

// declare global {
//   interface Window {
//     __NAVIGATION_TYPE?: NavigationTimingType;
//   }
// }

export default function Home() {
  const [hide, setHide] = useState(false);
  const [jump, setJump] = useState(false);
   const [showOverlay, setShowOverlay] = useState(true);
  const [scope, animate] = useAnimate();
  const [isInitialJump, setIsInitialJump] = useState(true);
//   const [showOverlay,setShowOverlay] = useState(() => {
//   if (typeof window === "undefined") return false;

//   const hasVisited = sessionStorage.getItem("home-visited");

//   if (!hasVisited) {
//     sessionStorage.setItem("home-visited", "true");
//     return true;
//   }

//   return false;
// });

// useEffect(() => {
//   const syncOverlayVisibility = () => {
//     const hasVisited = sessionStorage.getItem("home-visited");

//     if (hasVisited) {
//       setShowOverlay(false);
//     } else {
//       sessionStorage.setItem("home-visited", "true");
//     }
//   };

//   syncOverlayVisibility();
// }, []);




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
      // if(isInitialJump){
      //   setShowOverlay(false)
      // }
      if (window.scrollY > window.innerHeight * 0.15) {
        setJump(true);
      } else {
        setJump(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   // Scroll-position restoration (e.g. landing here via the browser back
  //   // button) fires its own async 'scroll' event on mount, so we can't tell
  //   // it apart from a real one by timing alone. Only a genuine input gesture
  //   // should turn the jump into an animated spring.
  //   const enableAnimation = () => setIsInitialJump(false);
  //   const events = ["wheel", "touchstart", "keydown", "pointerdown"];

  //   events.forEach((event) =>
  //     window.addEventListener(event, enableAnimation, {
  //       once: true,
  //       passive: true,
  //     })
  //   );

  //   return () =>
  //     events.forEach((event) =>
  //       window.removeEventListener(event, enableAnimation)
  //     );
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHide(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bigJumpFunc = async () => {
    if (jump) {
      await animate(window.scrollY, window.innerHeight * 0.35, {
        duration: 0.5,
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
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
              duration: 0.6,
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
          animate={{
            y: jump ? "0vh" : "65vh",
          }}
          transition={
             {
                  type: "spring",
                  stiffness: 225,
                  damping: 25,
                }
          }
          className={`z-2 home flex flex-col bg-white mt-[-65vh] `}
        >
          {/* Search bar */}
          <div
            className={`sticky top-0 flex justify-end z-1000 py-[0.75rem] bg-white max-[960px]:hidden`}
          >
            <i className=" pi pi-search pr-[0.625rem] text-[1.125rem]"></i>
          </div>
          {/* Navbar and Projects */}
          <div className={`flex max-[960px]:flex-col max-[960px]:z-[1001] gap-[3.125rem] flex-1`}>
            {/* Navbar */}
            <div
              className={`sticky top-[calc(var(--search-bar-height)-2rem)] max-[960px]:top-0 min-[960px]:self-start z-[1001]`}
            >
              <Nav paddingTop={"--nav-padding-top"} />
            </div>

            {/* projects */}
            <div
              className={`min-[960px]:flex-1 mt-[calc(var(--nav-height-block)+var(--nav-padding-top))]`}
            >
              <Projects />
            </div>
          </div>
          {/* Footer */}
          {/* <Footer /> */}
        </motion.div>
      </div>
    </>
  );
}
