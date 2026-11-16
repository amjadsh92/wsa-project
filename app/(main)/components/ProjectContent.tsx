"use client";

import Img from "next/image";
import Link from "next/link";
import { useContext, useState, type CSSProperties } from "react";
import { suisse } from "@/app/fonts";
import ProjectImageGallery from "./ProjectImageGallery";

import { InProjectModalContext, useProjectModalNavigation } from "./ProjectModalNavigation";

type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
};

const description = `JUMP is located at the intersection of diverse urban areas in Aubervilliers, Paris. Commissioned by Icade, the building connects two green zones, “Place du Front Populaire” and the urban forest of “Parc Icade des Portes de Paris”. With its colossal landing, JUMP has established itself as the central point of convergence in the area. The building integrates a hotel, offices, retail spaces, and parking. The design embraces the area’s electic architecture and enhances the dynamism of this urban area served by Metro Line 12.`;

export default function ProjectContent({
  project,
  relatedProjects,
  basePath,
}: {
  project: Project;
  relatedProjects: readonly Project[];
  basePath: "/art" | "/architecture";
}) {
  const inModal = useContext(InProjectModalContext);
  const { openRelated } = useProjectModalNavigation();
  const [showMore, setShowMore] = useState(false);
  const [relatedIndex, setRelatedIndex] = useState(0);
  const activeRelatedIndex = relatedProjects.length ? relatedIndex % relatedProjects.length : 0;

  return (
   <div className={`pt-[0.0625rem] `}>
     <div className={` ${suisse.className} ${!inModal ? "mt-[5.125rem]" : "mt-4 pr-16"} flex flex-wrap justify-start m-4 gap-x-4 gap-y-2 text-[0.8rem] max-[650px]:text-[0.75rem]`}>
      <div>{project.location}</div>
      <div>{project.year}</div>
      <div>{project.category}</div>
     </div>

     

      <div className={` ${suisse.className} text-[2.6rem] m-4 break-words leading-tight max-[960px]:text-[2.2rem] max-[650px]:text-[1.8rem] ${inModal ? "pr-16" : ""}`}>
        {project.title}
     </div>

  
     <div className="relative min-h-screen w-full mt-[9.375rem] max-[960px]:min-h-0 max-[960px]:h-[60svh] max-[960px]:mt-[5rem] max-[650px]:h-[50svh] max-[650px]:mt-[3rem]">
        <Img
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
</div>

<p className={`${suisse.className} text-[1.57990625rem] mt-[5rem] leading-tight w-[75%] pl-[1.25rem] max-[960px]:w-full max-[960px]:pr-[1.25rem] max-[960px]:text-[1.25rem] max-[960px]:mt-[3rem] max-[650px]:text-[1.125rem] max-[650px]:leading-relaxed max-[650px]:mt-[2rem] ${inModal ? "max-[400px]:text-[1rem]" : ""}`}>

  {description}


</p>

<div id="additional-paragraphs">
  {showMore &&
    [1, 2].map((paragraphNumber) => (
      <p
        key={paragraphNumber}
        className={`${suisse.className} mt-[5rem] w-[75%] pl-[1.25rem] text-[1.57990625rem] leading-tight max-[960px]:w-full max-[960px]:pr-[1.25rem] max-[960px]:text-[1.25rem] max-[960px]:mt-[3rem] max-[650px]:text-[1.125rem] max-[650px]:leading-relaxed max-[650px]:mt-[2rem] ${inModal ? "max-[400px]:text-[1rem]" : ""}`}
      >
        {description}
      </p>
    ))}
</div>

<button
  type="button"
  className="mt-[2.5rem] cursor-pointer ml-[1.25rem] text-[2.5rem] leading-none min-h-12 min-w-12 max-[650px]:mt-[1.5rem]"
  aria-expanded={showMore}
  aria-controls="additional-paragraphs"
  aria-label={showMore ? "Hide additional paragraphs" : "Show additional paragraphs"}
  onClick={() => setShowMore((isVisible) => !isVisible)}
>
  {showMore ? "−" : "+"}
</button>


    
<ProjectImageGallery
  inModal={inModal}
  images={Array.from({ length: 6 }, () => ({ src: project.image, alt: project.title }))}
/>

{relatedProjects.length > 0 && (
  <section className="pb-[5rem] px-[1.25rem] max-[650px]:px-0 max-[650px]:pb-[2.5rem]" aria-labelledby="related-heading">
    <h2
      id="related-heading"
      className={`${suisse.className} mb-[2.5rem] text-[1.6rem] max-[650px]:px-5 max-[650px]:mb-[1.5rem] max-[650px]:text-[1.4rem]`}
    >
      Related
    </h2>

    <div className="relative max-[650px]:overflow-hidden">
    <div
      style={{ "--related-offset": `${-activeRelatedIndex * 100}%` } as CSSProperties}
      className="flex gap-[1.25rem] w-[80%] max-[960px]:w-full max-[650px]:gap-0 max-[650px]:translate-x-[var(--related-offset)] max-[650px]:transition-transform max-[650px]:duration-300 max-[650px]:ease-out motion-reduce:transition-none"
    >
      {relatedProjects.map((relatedProject, index) => (
        <Link
          key={relatedProject.slug}
          href={`${basePath}/${relatedProject.slug}`}
          replace={inModal}
          onNavigate={() => {
            if (inModal) openRelated(`${basePath}/${relatedProject.slug}`);
          }}
          scroll={false}
          onFocus={() => setRelatedIndex(index)}
          className="group max-[960px]:min-w-0 max-[960px]:flex-1 max-[650px]:flex-none max-[650px]:w-full"
        >
          <div className="relative aspect-[4/3] w-[22vw] max-[960px]:w-full max-[650px]:aspect-[16/9] overflow-hidden">
            <Img
              src={relatedProject.image}
              alt={relatedProject.title}
              fill
              sizes="(width < 650px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className={`${suisse.className} mt-3 text-[0.75rem] max-[650px]:px-5`}>
            <p>{relatedProject.title}</p>
            <p>{relatedProject.location}</p>
          </div>
        </Link>
      ))}
    </div>
    <div className="pointer-events-none absolute inset-x-0 top-0 hidden aspect-[16/9] max-[650px]:block">
      {activeRelatedIndex > 0 && (
        <button
          type="button"
          aria-label="Previous related project"
          className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center text-black cursor-pointer"
          onClick={() => setRelatedIndex(activeRelatedIndex - 1)}
        >
          <svg aria-hidden="true" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="drop-shadow-[0_0_0.125rem_white]">
            <path d="m14 6-6 6 6 6" />
          </svg>
        </button>
      )}
      {activeRelatedIndex < relatedProjects.length - 1 && (
        <button
          type="button"
          aria-label="Next related project"
          className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center text-black cursor-pointer"
          onClick={() => setRelatedIndex(activeRelatedIndex + 1)}
        >
          <svg aria-hidden="true" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="drop-shadow-[0_0_0.125rem_white]">
            <path d="m10 6 6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
    <span className="sr-only" aria-live="polite" aria-atomic="true">
      Related project {activeRelatedIndex + 1} of {relatedProjects.length}
    </span>
    </div>

  </section>
)}

     


   </div>
  );
}
