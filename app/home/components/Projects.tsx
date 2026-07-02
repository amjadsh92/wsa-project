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
              className={`sticky z-20 bg-white `}
            >
              <div className="border-t w-[45vw] font-[300]"></div>
              <div className="flex justify-between items-end w-[45vw] h-[25px]">
                <h3 className={`${suisse.className} text-[13px] `}>
                  {project.title}
                </h3>
                <h3 className={`${suisse.className} text-[13px] `}>
                  {project.location}
                </h3>
              </div>
            </div>

            <div
              style={{
                zIndex: index >= 5 ? (index - 2) * 10 : 10,

                position: "relative",
              }}
              className={`bg-white 
  }`}
            >
              <Img
                style={{ zIndex: index >= 5 ? (index - 2) * 10 : 10 }}
                src={project.image}
                alt={project.title}
                width={200}
                height={200}
                className="relative object-cover h-[25vw] w-[45vw] pt-4 pb-[40px] bg-white"
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
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="sticky top-[var(--search-bar-height)] z-40 bg-white">
      <div className="sticky top-[var(--search-bar-height)]  border-t w-[45vw] z-50 bg-white"></div>
      <div className="sticky top-[var(--search-bar-height)] flex justify-start z-40 bg-white items-center h-[50px]">
        <h3 className={`${suisse.className} text-[16px]`}>Art Work</h3>
      </div>

      <div className="relative z-30 mt-[40px] flex flex-wrap justify-center items-center gap-[50px]">
        {drawings.map((drawing, index) => (
          <motion.div
            key={index}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Img
              src={drawing.image}
              alt="photo"
              width={400}
              height={400}
              className="w-[30vw] h-[30vw] object-cover pt-4 pb-[40px] bg-white"
              priority
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
