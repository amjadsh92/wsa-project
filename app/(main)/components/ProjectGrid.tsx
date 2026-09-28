import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { suisse } from "@/app/fonts";
import ProjectEntrance from "./ProjectEntrance";

type ProjectGridProps = {
  projects: readonly {
    slug: string;
    title: string;
    image: ImageProps["src"];
  }[];
  basePath: "/art" | "/architecture";
  isFirstSection?: boolean;
};

const blurMask =
  "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)";

export default function ProjectGrid({
  projects,
  basePath,
  isFirstSection = false,
}: ProjectGridProps) {
  return (
    <div
      className={`grid grid-cols-3 gap-x-[clamp(1.5rem,12.5vw,11.25rem)] gap-y-[clamp(2rem,7vw,6.25rem)] px-[1.5rem] pb-[11.75rem] ${
        isFirstSection ? "pt-[10rem]" : "pt-[5rem]"
      }`}
    >
      {projects.map((project) => (
        <ProjectEntrance key={project.slug}>
          <Link
            href={`${basePath}/${project.slug}`}
            scroll={false}
            className="group relative block w-full min-w-0 cursor-pointer"
          >
            <div className="relative aspect-[340/300] w-full overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-[6px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 backdrop-blur-[10px] transition-opacity duration-700 ease-out group-hover:opacity-100"
                style={{ WebkitMaskImage: blurMask, maskImage: blurMask }}
              />
            </div>
          </Link>
          <div
            className={`${suisse.className} flex items-center justify-center pt-3 font-normal`}
          >
            <h2 className="text-[0.9rem]">{project.title}</h2>
          </div>
        </ProjectEntrance>
      ))}
    </div>
  );
}
