"use client";
import ProjectCover from "@/app/ui/components/ProjectCover";
import { useProjectBasePath } from "@/app/ui/components/PageNames";
import { type ImageProps } from "next/image";
import Link from "next/link";
import { suisse } from "@/app/fonts";
import ProjectEntrance from "./ProjectEntrance";

type ProjectGridProps = {
  projects: readonly {
    slug: string;
    title: string;
    image: ImageProps["src"];
    coverX?: number;
    coverY?: number;
    coverZoom?: number;
  }[];
  basePath: "/page2" | "/page3";
  isFirstSection?: boolean;
};

const blurMask =
  "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)";

export default function ProjectGrid({
  projects,
  basePath: pageId,
  isFirstSection = false,
}: ProjectGridProps) {
  const basePath = useProjectBasePath(pageId);
  return (
    <div
      className={`grid grid-cols-3 gap-x-[clamp(1.5rem,12.5vw,11.25rem)] max-[1250px]:gap-x-[clamp(0.75rem,6.25vw,5.625rem)] max-[960px]:grid-cols-2 max-[960px]:gap-x-[clamp(1.5rem,12.5vw,11.25rem)] max-[650px]:grid-cols-1 gap-y-[clamp(2rem,7vw,6.25rem)] px-[1.5rem] pb-[11.75rem] ${
        isFirstSection ? "pt-[10rem]" : "pt-[5rem]"
      }`}
    >
      {projects.map((project) => (
        <ProjectEntrance key={project.slug}>
          <Link
            href={`${basePath}/${project.slug}`}
            scroll={false}
            className="group relative block w-full min-w-0 cursor-pointer max-[650px]:mx-auto max-[650px]:w-[80%] max-[400px]:w-[90%]"
          >
            <div className="relative aspect-[340/300] w-full overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-[0.375rem]">
              <ProjectCover src={project.image} alt={project.title} coverX={project.coverX} coverY={project.coverY} coverZoom={project.coverZoom}
                sizes="(width < 400px) 90vw, (width < 650px) 80vw, (width < 960px) 50vw, 33vw" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 backdrop-blur-[0.625rem] transition-opacity duration-700 ease-out group-hover:opacity-100"
                style={{ WebkitMaskImage: blurMask, maskImage: blurMask }}
              />
            </div>
          </Link>
          <div
            className={`${suisse.className} flex items-center justify-center pt-3 font-normal`}
          >
            <h2 className="text-[0.9rem] max-[1200px]:text-[0.8rem]">{project.title}</h2>
          </div>
        </ProjectEntrance>
      ))}
    </div>
  );
}
