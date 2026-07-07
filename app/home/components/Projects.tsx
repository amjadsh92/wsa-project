import Img from "next/image";
import React from "react";
import { suisse } from "@/app/fonts";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type Project = {
  title: string;
  location: string;
  image: string;
};

type ArchitectureProps = {
  projects: Project[];
};

type Drawing = {
  image: string;
};

type DrawingsProps = {
  drawings: Drawing[];
};

export default function Projects() {
  const projects = [
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/home/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/home/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/home/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/home/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/home/images/project1.jpg",
    },
  ];

  const drawings = [
    {
      image: "/home/images/project1.jpg",
    },
    {
      image: "/home/images/project1.jpg",
    },
    {
      image: "/home/images/project1.jpg",
    },
    {
      image: "/home/images/project1.jpg",
    },
    {
      image: "/home/images/project1.jpg",
    },
  ];

  return (
    <>
      <Architecture projects={projects} />
      <Art drawings={drawings} />
    </>
  );
}

function Architecture({ projects }: ArchitectureProps) {
  return (
    <div>
      {projects.map((project, index) => {
        return (
          <React.Fragment key={index}>
            <div
              style={{
                zIndex: index >= 5 ? (index - 1) * 10 : 20,
                top:
                  index >= 5
                    ? "var(--search-bar-height)"
                    : `calc(var(--search-bar-height) + ${index} * var(--project-header-block))`,
              }}
              className={`sticky z-20 bg-white max-[960px]:relative max-[960px]:top-0! `}
            >
              <div className="border-t w-[var(--header-width)] font-[300] max-[960px]:w-[var(--header-width)]"></div>
              <div className="flex justify-between items-end w-[var(--header-width)] h-[25px] max-[960px]:h-[40px] max-[960px]:flex-col max-[960px]:items-start max-[960px]:pl-[10px] max-[960px]:pt-[10px]">
                <h3 className={`${suisse.className} text-[13px] max-[500px]:text-[11px]`}>
                  {project.title}
                </h3>
                <h3 className={`${suisse.className} text-[13px] max-[500px]:text-[11px]`}>
                  {project.location}
                </h3>
              </div>
            </div>

            <div
              style={{
                zIndex: index >= 5 ? (index - 2) * 10 : 10,

                position: "relative",
              }}
              className={`bg-white max-[960px]:bg-transparent h-[25vw] w-[var(--header-width)] max-[960px]:w-[var(--header-width)] max-[960px]:h-[55vw] max-[500px]:h-[100vw] `}
            >
              <Img
                style={{ zIndex: index >= 5 ? (index - 2) * 10 : 10 }}
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 960px) var(--header-width), var(--header-width)"
                className="object-cover pt-4 pb-[40px] bg-white"
                priority
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Art({ drawings }: DrawingsProps) {
  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="sticky top-[var(--search-bar-height)] z-40 bg-white">
      <div className="sticky top-[var(--search-bar-height)]  border-t w-[var(--header-width)] z-50 bg-white max-[960px]:w-[var(--header-width)]"></div>
      <div className="sticky top-[var(--search-bar-height)] flex justify-start z-40 bg-white items-center h-[50px] max-[960px]:relative  max-[960px]:top-0! ">
        <h3 className={`${suisse.className} text-[18px] max-[960px]:text-[22px] max-[500px]:text-[18px] max-[500px]:text-[18px] max-[400px]:text-[16px]  max-[960px]:pl-[10px]`}>Art Work</h3>
      </div>

      <div className="relative z-30 mt-[40px] flex flex-wrap justify-center items-center gap-[50px] max-[500px]:gap-[30px] max-[500px]:mt-[20px] max-[400px]:mt-[10px]">
        {drawings.map((drawing, index) => (
          <motion.div
            key={index}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-[30vw] h-[30vw] max-[960px]:w-[60vw] max-[960px]:h-[60vw] max-[600px]:w-[75vw] max-[600px]:h-[75vw] max-[400px]:w-[85vw] max-[400px]:h-[85vw] "
          >
            <Img
              src={drawing.image}
              alt="photo"
              fill
              sizes="(max-width: 960px) 60vw, 30vw"
              className="object-cover pt-4 pb-[40px] bg-white"
              priority
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
