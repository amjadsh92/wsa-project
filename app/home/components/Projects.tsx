import Img from "next/image";
import React from "react";
import { suisse } from "@/app/fonts";

type Project = {
  title: string;
  location: string;
  image: string;
};

type ArchitectureProps = {
  projects: Project[];
  
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

  return (
    <>
      <Architecture projects={projects}  />
      <Art />
    </>
  );
}

function Architecture({ projects}: ArchitectureProps) {
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
                // top: `${stickyToRelative ? `calc(var(--search-bar-height) + ${index} * var(--project-header-block))` : `calc(var(--search-bar-height) + ${index} * var(--project-header-block))`}`,
                position: "relative" 
              }}
              className={`h-[22.5vw] w-[45vw] bg-white 
  }`}
            >
              <Img
                style={{ zIndex: index >= 5 ? (index - 2) * 10 : 10 }}
                src={project.image}
                alt={project.title}
                fill
                className="relative object-cover pt-4 pb-[40px] bg-white"
                priority
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Art() {
  return (
    <div className="sticky top-[var(--search-bar-height)] z-40 bg-white">
      <div className="sticky top-[var(--search-bar-height)]  border-t w-[45vw] z-40 bg-white"></div>
      <div className="sticky top-[var(--search-bar-height)] flex justify-start items-end h-[30px]">
        <h3 className={`${suisse.className} text-[16px]`}>Art Work</h3>
      </div>
      <div className="h-[90vh] w-[400px] bg-white z-30"></div>
    </div>
  );
}