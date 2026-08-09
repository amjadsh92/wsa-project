import { suisse } from "@/app/fonts";


export default function  AboutHeader({servicesAttachedTop}:{servicesAttachedTop:boolean}){


return(

   <>
            {/* Masked Backdrop & Blur Effect */}
            <div
              className={`absolute ${
                servicesAttachedTop
                  ? "bg-[#E1E3E3] inset-0"
                  : "inset-0 bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]"
              }`}
              style={{
                WebkitMaskImage: servicesAttachedTop
                  ? ""
                  : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
                maskImage: servicesAttachedTop
                  ? ""
                  : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
              }}
            />
            <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px]`}>
              Projects
            </div>

            
      </>  
    
    
         
)


}