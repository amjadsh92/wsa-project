import { suisse } from "@/app/fonts";

export default function ServicesHeader({servicesAttachedTop, contactAttachedTop}:{servicesAttachedTop:boolean, contactAttachedTop:boolean}){

    return(
        <>
        <div
                  className={`absolute border-t inset-0 ${
                    (servicesAttachedTop && !contactAttachedTop) ? "bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]" : "bg-[#E1E3E3]"
                  }`}
                  style={{
                    WebkitMaskImage: (servicesAttachedTop && !contactAttachedTop)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                    maskImage: (servicesAttachedTop && !contactAttachedTop)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                  }}
                />
                <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px] py-[5px]`}>
                  Services
                </div>
       </>
        
    )




}