"use client";
import { useEffect,useState,useMemo } from "react";
import Carousel from "@/app/home/components/Carousel";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Title from "@/app/home/components/Title";
import Subtitle from "@/app/home/components/Subtitle";
import Nav from "@/app/home/components/Nav";
import Projects from "@/app/home/components/Projects";
import { useHomeModalRestoration } from "@/app/home/components/homeModalRestoration";
import "primeicons/primeicons.css";
import { visibleImages, visibleWords, type HomeContent } from "@/lib/home-content";

export default function Home({ content, preview = false }: { content: HomeContent; preview?: boolean }) {
  const slides = useMemo(() => visibleImages(content), [content]);
  const images = useMemo(() => slides.map(image => image.src), [slides]);
  const restoredScroll = useHomeModalRestoration();
  const isRestoringModal = restoredScroll !== null;
  // Keep the intro skipped for this mounted background after restoration ends.
  const [skipIntro] = useState(preview || isRestoringModal);
  const [hide, setHide] = useState(() => restoredScroll !== null && restoredScroll > 0);
  const [jump, setJump] = useState(() => restoredScroll !== null && restoredScroll > window.innerHeight * 0.15);
  const [showOverlay, setShowOverlay] = useState(!skipIntro);
  const [initialHidingOfOverlay, setInitialHidingOfOverlay] = useState(!skipIntro);
  const [scope, animate] = useAnimate();
  

useEffect(() => {
  if (skipIntro) return;
  const timer = window.setTimeout(() => setInitialHidingOfOverlay(false), 400);
  return () => window.clearTimeout(timer);
}, [skipIntro]);


  useEffect(() => {
    if (skipIntro || initialHidingOfOverlay) return;
    let cancelled = false;
    const loaded = images.map(src => new Promise<void>(resolve => {
      const image = new Image();
      image.onload = image.onerror = () => resolve();
      image.src = src;
      if (image.complete) resolve();
    }));
    const reveal = () => { if (!cancelled) setShowOverlay(false); };
    Promise.all(loaded).then(reveal);
    const timeout = window.setTimeout(reveal, 4000);
    return () => { cancelled = true; window.clearTimeout(timeout); };
  }, [images, initialHidingOfOverlay, skipIntro]);

  useEffect(() => {
    if (isRestoringModal) return;

    const handleScroll = () => {
      
      if (window.scrollY > window.innerHeight * 0.15) {
        setJump(true);
      } else {
        setJump(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRestoringModal]);

  

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
        { showOverlay && (
          <motion.div
            data-home-intro-overlay
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
        <Title hide={hide} jump={jump} skipIntro={skipIntro} title={content.title} companion={content.showCompanion ? content.companion : ""} />
        <Subtitle showOverlay={showOverlay} jump={jump} skipIntro={skipIntro} words={visibleWords(content)} />
      </div>

      <div className="flex flex-col">
        {/* Hero section (Carousel) */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          onClick={bigJumpFunc}
        >
          {!showOverlay && (
            <Carousel
              key={images.join("|")}
              images={images}
              positions={slides}
              titles=""
              descriptions=""
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
             isRestoringModal ? { duration: 0 } : {
                  type: "spring",
                  stiffness: 225,
                  damping: 25,
                }
          }
          // Keep the section just below the viewport despite subpixel rounding.
          className={`z-2 home flex flex-col bg-white mt-[calc(1px_-_65vh)] `}
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
              <Projects skipIntro={skipIntro} />
            </div>
          </div>
          {/* Footer */}
          {/* <Footer /> */}
        </motion.div>
      </div>
    </>
  );
}
