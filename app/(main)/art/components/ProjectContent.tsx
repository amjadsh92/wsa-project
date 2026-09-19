"use client";

import Img from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projects, type Project } from "../projects";
import { suisse } from "@/app/fonts";

const description = `JUMP is located at the intersection of diverse urban areas in Aubervilliers, Paris. Commissioned by Icade, the building connects two green zones, “Place du Front Populaire” and the urban forest of “Parc Icade des Portes de Paris”. With its colossal landing, JUMP has established itself as the central point of convergence in the area. The building integrates a hotel, offices, retail spaces, and parking. The design embraces the area’s electic architecture and enhances the dynamism of this urban area served by Metro Line 12.`;

export default function ProjectContent({
  project,
}: {
  project: Project;
}) {
  const [showMore, setShowMore] = useState(false);
  const relatedProjects = projects
    .filter(
      (relatedProject) =>
        relatedProject.slug !== project.slug &&
        relatedProject.category === project.category,
    )
    .slice(0, 3);

  return (
   <div className="pt-[1px]">
     <div className={` ${suisse.className} flex justify-start m-4 gap-4 text-[0.8rem]`}>
      <div>{project.location}</div>
      <div>{project.year}</div>
      <div>{project.category}</div>
     </div>

     

      <div className={` ${suisse.className} text-[2.6rem] m-4`}>
        {project.title}
     </div>

  
     <div className="relative min-h-screen w-full mt-[150px]">
        <Img
          src={project.image}
          alt={project.title}
          fill
          
          className="object-cover"
        />
</div>

<p className={`${suisse.className} text-[25.2785px] mt-[80px] leading-tight w-[75%] pl-[20px]`}>

  {description}


</p>

<div id="additional-paragraphs">
  {showMore &&
    [1, 2].map((paragraphNumber) => (
      <p
        key={paragraphNumber}
        className={`${suisse.className} mt-[80px] w-[75%] pl-[20px] text-[25.2785px] leading-tight`}
      >
        {description}
      </p>
    ))}
</div>

<button
  type="button"
  className="mt-[40px] cursor-pointer ml-[20px] text-[40px] leading-none"
  aria-expanded={showMore}
  aria-controls="additional-paragraphs"
  aria-label={showMore ? "Hide additional paragraphs" : "Show additional paragraphs"}
  onClick={() => setShowMore((isVisible) => !isVisible)}
>
  {showMore ? "−" : "+"}
</button>


    
<div className="flex w-full my-[150px]">
  <div className="flex flex-col w-1/2">

    <Img
          src={project.image}
          alt={project.title}
          width="300"
          height="300"
          sizes="50vw"
          
          className="h-auto w-full"
        />

    <Img
          src={project.image}
          alt={project.title}
          width="300"
          height="300"
          sizes="50vw"
          className="h-auto w-full"
        />    


     
    <Img
          src={project.image}
          alt={project.title}
          width="300"
          height="300"
          sizes="50vw"
          
          className="h-auto w-full"
        />   
    


  </div>
  <div className="flex flex-col w-1/2">

 <Img
          src={project.image}
          alt={project.title}
          width="300"
          height="300"
          sizes="50vw"
          
          className="h-auto w-full"
        />

    <Img
          src={project.image}
          alt={project.title}
          width="300"
          height="300"
          sizes="50vw"
          className="h-auto w-full"
        /> 

     
    <Img
          src={project.image}
          alt={project.title}
          width="300"
          height="300"
          sizes="50vw"
          
          className="h-auto w-full"
        />     

  </div>



</div>

{relatedProjects.length > 0 && (
  <section className="mb-[80px] px-[20px]" aria-labelledby="related-heading">
    <h2
      id="related-heading"
      className={`${suisse.className} mb-[40px] text-[1.6rem]`}
    >
      Related
    </h2>

    <div className="flex gap-[20px] w-[80%]">
      {relatedProjects.map((relatedProject) => (
        <Link
          key={relatedProject.slug}
          href={`/architecture/${relatedProject.slug}`}
          scroll={false}
          className="group"
        >
          <div className="relative aspect-[4/3] w-[22vw] overflow-hidden">
            <Img
              src={relatedProject.image}
              alt={relatedProject.title}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>

          <div className={`${suisse.className} mt-3 text-[12px]`}>
            <p>{relatedProject.title}</p>
            <p>{relatedProject.location}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}

     


   </div>
  );
}
