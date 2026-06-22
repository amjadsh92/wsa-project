import Img from "next/image";
import React from "react";

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
      <Architecture projects={projects} />
      <Art />
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
              className={`sticky z-20 bg-white`}
            >
              <div className="flex justify-between border-t w-[45vw]">
                <h3 className="text-[11.5px]">{project.title}</h3>
                <h3 className="text-[11.5px]">{project.location}</h3>
              </div>
            </div>

            <div
              style={{ zIndex: index >= 5 ? (index - 2) * 10 : 10 }}
              className="relative h-[22.5vw] w-[45vw] bg-white"
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


function Art(){

    return(

        <div className="sticky top-[var(--search-bar-height)] z-40 bg-white">
        <div className="sticky top-[var(--search-bar-height)] flex justify-between border-t w-[45vw] z-40 bg-white">
          <h3 className="text-[11.5px]">Building 140 CERN</h3>
          <h3 className="text-[11.5px]">GENEVA, CH</h3>
        </div>
        <div className="h-[90vh] w-[400px] bg-white z-30"></div>
      </div>
    )
}