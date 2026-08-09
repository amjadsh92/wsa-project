import { suisse } from "@/app/fonts";




export default function AboutContent (){


    return(
         <div className="relative pt-[120px] pb-[40px]">
                <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem]`}>
                  <p>
                    KAAN Architecten is an international architectural practice engaged in context-specific, timeless designs
                    spanning a broad range of scales and typologies in both the private and public sectors.
                  </p>
                  <p className="mt-4">
                    Based in Rotterdam, the office is led by founding partners Kees Kaan, Vincent Panhuysen, and Dikkie Scipio,
                    together with associate partners Renata Gilio, Marco Lanna, Antony Laurijsen, and Hrvoje Smidihen. With
                    satellite offices in Paris and São Paulo, and nearly forty years of experience, a diverse international team
                    shapes a dynamic, culturally rich work environment.
                  </p>
                  <p className="mt-4">
                    The firm’s approach centers on an architecture of dialogue, embracing an inclusive, relational understanding
                    to the surrounding world, fostering meaningful connections within its growing complexity.
                  </p>
                </div>
                <div className={`${suisse.className} text-[22px] text-justify p-[20px] w-[80%] mb-[1.5rem] pb-[100px]`}>
                  <p>
                    Among the most prominent completed projects are large-scale, complex structures such as the Netherlands
                    Forensic Institute and the Amsterdam Courthouse; cultural landmarks, including the transformation of the
                    Royal Museum of Fine Arts in Antwerp (KMSKA); and smaller, intimate buildings like Crematorium Siesegem or
                    the Loenen Pavilion.
                  </p>
                  <p className="mt-4">
                    Recently, KAAN Architecten completed the Education Centre for the University of Groningen and JUMP, a
                    large-scale, versatile building in Aubervilliers, Paris. Currently, the office is engaged in several
                    high-profile projects across Europe.
                  </p>
                </div>
              </div>
    )
}