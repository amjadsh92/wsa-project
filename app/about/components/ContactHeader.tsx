import { suisse } from "@/app/fonts";

export default function ContactHeader({servicesAttachedTop, contactAttachedTop, isOpaque, goToContact}:{servicesAttachedTop:boolean, contactAttachedTop:boolean, isOpaque:boolean, goToContact: () => void}){

    return(
         <>
         <div
                  className={`absolute border-t inset-0 transition-[backdrop-filter,background-color] duration-1000  ease-in-out ${
                    (contactAttachedTop && servicesAttachedTop && !isOpaque) ? "bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]" : "backdrop-blur-[1rem] bg-[#E1E3E3]"
                  }`}
                  style={{
                    WebkitMaskImage: (contactAttachedTop && servicesAttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                    maskImage: (contactAttachedTop && servicesAttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                  }}
                />
                <div onClick={goToContact} className={`${suisse.className} cursor-pointer pl-[1.25rem] relative font-[400] tracking-wide text-[2.5rem] py-[0.3125rem] max-[960px]:text-[2.1875rem] max-[750px]:text-[2.03125rem]
                max-[650px]:text-[1.875rem] max-[500px]:text-[1.71875rem]`}>
                  Contact
                </div>

         </>


    )}
