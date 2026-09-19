
// import { suisse } from "@/app/fonts";


// export default function Header3Content(){

//     return(

//         <>
//                 <div className={`${suisse.className} relative pt-[2.5rem] text-[1.375rem] text-justify p-[1.25rem] w-[80%] pb-[21.25rem] max-[960px]:text-[1.25rem] max-[750px]:text-[1.125rem] max-[600px]:text-[1rem]
//                  max-[500px]:w-[90%] max-[400px]:text-[0.875rem]`}>
//                   <p>
//                     KAAN Architecten is an international architectural practice engaged in context-specific, timeless designs
//                     spanning a broad range of scales and typologies in both the private and public sectors.
//                   </p>
//                   <p className="mt-4">
//                     Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
//                     together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
//                     satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
//                     shapes a dynamic, culturally rich work environment.
//                   </p>
//                   <p className="mt-4">
//                     The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
//                     to the surrounding world, fostering meaningful connections within its growing complexity.
//                   </p>

//                   <p>
//                     KAAN Architecten is an international architectural practice engaged in context-specific, timeless designs
//                     spanning a broad range of scales and typologies in both the private and public sectors.
//                   </p>
//                   <p className="mt-4">
//                     Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
//                     together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
//                     satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
//                     shapes a dynamic, culturally rich work environment.
//                   </p>
//                   <p className="mt-4">
//                     The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
//                     to the surrounding world, fostering meaningful connections within its growing complexity.
//                   </p>

//                   <p className="mt-4">
//                     Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
//                     together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
//                     satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
//                     shapes a dynamic, culturally rich work environment.
//                   </p>
//                   <p className="mt-4">
//                     The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
//                     to the surrounding world, fostering meaningful connections within its growing complexity.
//                   </p>
//                   <p className="mt-4">
//                     Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
//                     together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
//                     satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
//                     shapes a dynamic, culturally rich work environment.
//                   </p>
//                   <p className="mt-4">
//                     The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
//                     to the surrounding world, fostering meaningful connections within its growing complexity.
//                   </p>
//                   <p className="mt-4">
//                     Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
//                     together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
//                     satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
//                     shapes a dynamic, culturally rich work environment.
//                   </p>
//                   <p className="mt-4">
//                     The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
//                     to the surrounding world, fostering meaningful connections within its growing complexity.
//                   </p>
                  
                
                
//                   <p  className="mt-4">
//                     Among the most prominent completed projects are large-scale, complex structures such as the Netherlands
//                     Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the
//                     Royal Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or
//                     the Loenen Pavilion.
//                   </p>
//                   <p className="mt-4">
//                     Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a
//                     large-scale, versatile building in Aubervilliers, Paris. Currently, the office is engaged in several
//                     high-profile projects across Europe.
//                   </p>
//               </div>               
//               </>


//     )
// }




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
            href={`/architecture/${project.slug}`}
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
