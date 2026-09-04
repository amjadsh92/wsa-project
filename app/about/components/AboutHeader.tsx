
import { suisse } from "@/app/fonts";


export default function  AboutHeader({servicesAttachedTop, isOpaque, goToAboutMe}:{servicesAttachedTop:boolean, isOpaque:boolean, goToAboutMe: () => void}){


return(

   <>
            {/* Masked Backdrop & Blur Effect */}
            <div
              className={`absolute transition-[backdrop-filter] duration-1000  ease-in-out ${
                servicesAttachedTop
                  ? "bg-[#E1E3E3] inset-0"
                  : `${isOpaque  ? "inset-0 backdrop-blur-[16px] bg-[#E1E3E3]" : "inset-0 bg-[#E1E3E3]/60 backdrop-blur-[8px] bg-[#E1E3E3]/60 top-0 left-0 right-0 h-[160%]"}`
              }`}
              style={{
                WebkitMaskImage: servicesAttachedTop
                  ? ""
                  : `${isOpaque ? "" : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)" }`,
                maskImage: servicesAttachedTop
                  ? ""
                  : `${isOpaque ? "" : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)" }`,
              }}
            />
            <div onClick={goToAboutMe} className={`${suisse.className} cursor-pointer pl-[20px] relative font-[400] tracking-wide text-[40px] max-[960px]:text-[35px] max-[750px]:text-[32.5px] 
              max-[650px]:text-[30px] max-[500px]:text-[27.5px]`}>
              About Me
            </div>


      </>



)


}