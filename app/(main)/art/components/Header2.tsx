


import { suisse } from "@/app/fonts";

export default function Header2({header2AttachedTop, header3AttachedTop, isOpaque, goToHeader2}:{header2AttachedTop:boolean, header3AttachedTop:boolean, isOpaque:boolean, goToHeader2: () => void}){

    return(
        <>
        <div
                  className={`absolute border-t inset-0 transition-[backdrop-filter] duration-1000  ease-in-out ${
                    (header2AttachedTop && !header3AttachedTop && !isOpaque) ? "backdrop-blur-[0.5rem] bg-white/60 top-0 left-0 right-0 h-[160%]" : "backdrop-blur-[1rem] bg-white/100"
                  }`}
                  style={{
                    WebkitMaskImage: (header2AttachedTop && !header3AttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                    maskImage: (header2AttachedTop && !header3AttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                  }}
                />
                <div onClick={goToHeader2}  className={`${suisse.className} cursor-pointer pl-[1.25rem] relative font-[400] tracking-wide text-[2.5rem] py-[0.3125rem] max-[960px]:text-[2.1875rem] max-[750px]:text-[2.03125rem]  max-[650px]:text-[1.875rem] max-[500px]:text-[1.71875rem]`}>
                  Header2
                </div>
       </>

    )




}
