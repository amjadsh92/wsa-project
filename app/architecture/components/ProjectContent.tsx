import Img from "next/image";
import type { Project } from "../projects";
import { projects } from "../projects"
import { suisse } from "@/app/fonts";

export default function ProjectContent({
  project,
}: {
  project: Project;
}) {
  return (
   <div className="p-[1px]">
     <div className={` ${suisse.className} flex justify-start m-4 gap-4 text-[0.8rem]`}>
      <div>{project.location}</div>
      <div>{project.year}</div>
      <div>{project.category}</div>
     </div>

     <div>

      <div className={` ${suisse.className} text-[2.6rem] m-4`}>
        {project.title}
     </div>

  
     <div className="relative min-h-screen w-full mt-[150px]">
        <Img
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
</div>


    


     </div>


   </div>
  );
}