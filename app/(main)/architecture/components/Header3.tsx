import { suisse } from "@/app/fonts";

export default function Header3({header2AttachedTop, header3AttachedTop, isOpaque, goToHeader3}:{header2AttachedTop:boolean, header3AttachedTop:boolean, isOpaque:boolean, goToHeader3: () => void}){

    return(
         <>
         <div
                  className={`absolute border-t inset-0 transition-[backdrop-filter,background-color] duration-1000  ease-in-out ${
                    (header3AttachedTop && header2AttachedTop && !isOpaque) ? "bg-white/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]" : "backdrop-blur-[1rem] bg-white"
                  }`}
                  style={{
                    WebkitMaskImage: (header3AttachedTop && header2AttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                    maskImage: (header3AttachedTop && header2AttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                  }}
                />
                <div onClick={goToHeader3} className={`${suisse.className} cursor-pointer pl-[1.25rem] relative font-[400] tracking-wide text-[2.5rem] py-[0.3125rem] max-[960px]:text-[2.1875rem] max-[750px]:text-[2.03125rem]
                max-[650px]:text-[1.875rem] max-[500px]:text-[1.71875rem]`}>
                  Contact
                </div>

         </>


    )}
