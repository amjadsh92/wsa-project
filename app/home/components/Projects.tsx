import Img from "next/image";
import Link from "next/link";
import React from "react";
import { suisse } from "@/app/fonts";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
};

type ArchitectureProps = {
  projects: Project[];
};

type Drawing = Pick<Project, "slug" | "title" | "category" | "image">;

type DrawingsProps = {
  drawings: Drawing[];
};

export default function Projects() {
  const projects = [
    {
      slug: "image1",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      category:"Architecture",
      image: "/home/images/project1.jpg",
    },
    {
      slug: "image2",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      category:"Architecture",
      image: "/home/images/project1.jpg",
    },
    {
      slug: "image3",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      category:"Architecture",
      image: "/home/images/project1.jpg",
    },
    {
      slug: "image4",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      category:"Architecture",
      image: "/home/images/project1.jpg",
    },
    {
      slug: "image5",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      category:"Architecture",
      image: "/home/images/project1.jpg",
    },
  ];

  const drawings: Drawing[] = Array.from({ length: 5 }, (_, index) => ({
    slug: `image${index + 1}`,
    title: `Art project ${index + 1}`,
    category: "Art",
    image: "/home/images/project1.jpg",
  }));

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
          <React.Fragment key={`${project.category}/${project.slug}`}>
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
              <div className="border-t w-full font-[300] "></div>
              <Link href={`/${project.category.toLowerCase()}/${project.slug}`} scroll={false} className="flex justify-between items-center w-full h-[2.2rem] max-[960px]:h-[2.5rem] max-[960px]:flex-col max-[960px]:items-start max-[960px]:pl-[0.625rem] max-[960px]:pt-[0.625rem]">
                <h3 className={`${suisse.className} text-[0.8125rem] max-[500px]:text-[0.6875rem] pr-[0.625rem]`}>
                  {project.title}
                </h3>
                <h3 className={`${suisse.className} text-[0.8125rem] max-[500px]:text-[0.6875rem] pr-[0.625rem]`}>
                  {project.location}
                </h3>
              </Link>
            </div>

            <Link
              href={`/${project.category.toLowerCase()}/${project.slug}`}
              scroll={false}
              aria-label={`Open ${project.title}`}
              style={{
                zIndex: index >= 5 ? (index - 2) * 10 : 10,

                position: "relative",
              }}
              className={`block bg-white max-[960px]:bg-transparent h-[27vw] w-full max-[1200px]:h-[35vw] max-[960px]:h-[55vw] max-[650px]:h-[75vw] max-[500px]:h-[100vw] `}
            >
              <Img
                style={{ zIndex: index >= 5 ? (index - 2) * 10 : 10 }}
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                className="object-cover pt-4 pb-[2.5rem] bg-white"
                priority
              />
            </Link>
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
      <div className="sticky top-[var(--search-bar-height)]  border-t w-full z-50 bg-white"></div>
      <div className="sticky top-[var(--search-bar-height)] flex justify-start z-40 bg-white items-center h-[3.125rem] max-[960px]:relative  max-[960px]:top-0! ">
        <h3 className={`${suisse.className} text-[1.125rem] max-[960px]:text-[1.375rem] max-[500px]:text-[1.125rem] max-[500px]:text-[1.125rem] max-[400px]:text-[1rem]  max-[960px]:pl-[0.625rem]`}>Art Work</h3>
      </div>

      <div className="relative z-30 mt-[2.5rem] flex flex-wrap justify-center items-center gap-[3.125rem] max-[500px]:gap-[1.875rem] max-[500px]:mt-[1.25rem] max-[400px]:mt-[0.625rem]">
        {drawings.map((drawing) => (
          <motion.div
            key={`${drawing.category}/${drawing.slug}`}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-[30vw] h-[30vw] max-[1200px]:w-[35vw] max-[1200px]:h-[35vw] max-[960px]:w-[60vw] max-[960px]:h-[60vw] max-[600px]:w-[75vw] max-[600px]:h-[75vw] max-[400px]:w-[85vw] max-[400px]:h-[85vw] "
          >
            <Link
              href={`/${drawing.category.toLowerCase()}/${drawing.slug}`}
              scroll={false}
              aria-label={`Open ${drawing.title}`}
              className="relative block h-full w-full"
            >
            <Img
              src={drawing.image}
              alt={drawing.title}
              fill
              sizes="(max-width: 960px) 60vw, 30vw"
              className="object-cover pt-4 pb-[2.5rem] bg-white"
              priority
            />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
