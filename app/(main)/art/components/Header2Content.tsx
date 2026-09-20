
import Img from "next/image";
import Link from "next/link";
import { projects } from "../projects";
import { suisse } from "@/app/fonts";

export default function Header2Content() {
  return (
    <div
      className="
        grid
        grid-cols-3
        gap-x-[clamp(1.5rem,12.5vw,11.25rem)]
        gap-y-[clamp(2rem,7vw,6.25rem)]
        pt-[5rem]
        p-[1.5rem]
        pb-[11.75rem]
      "
    >
      {projects.map((project) => {
        return (

          <div key={project.slug}>
          <Link
            key={project.slug}
            href={`/art/${project.slug}`}
            scroll={false}
            className="
              group
              relative
              w-full
              min-w-0
              cursor-pointer
              transition-transform
              duration-300
              ease-out
              hover:-translate-y-[6px]
            "
          >
            <div className="relative aspect-[340/300] w-full overflow-hidden">
              <Img
                src={project.image}
                alt={project.title}
                fill
                sizes="33vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-0
                  backdrop-blur-[10px]
                  transition-opacity
                  duration-700
                  ease-out
                  group-hover:opacity-100
                "
                style={{
                  WebkitMaskImage:
                    "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",

                  maskImage:
                    "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",
                }}
              />
            </div>
           
          </Link>
           <div className={`${suisse.className} flex justify-center items-center pt-3 font-normal`}>
              <h2 className="text-[0.9rem]">{project.title}</h2>
             
            </div>
            </div>
        )
         
      })}
    </div>
  );
}