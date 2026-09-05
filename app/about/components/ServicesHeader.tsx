// import { suisse } from "@/app/fonts";

// export default function ServicesHeader({servicesAttachedTop, contactAttachedTop, isOpaque}:{servicesAttachedTop:boolean, contactAttachedTop:boolean, isOpaque:boolean}){

//     return(
//         <>
//         <div
//                   className={`absolute border-t inset-0 ${
//                     (servicesAttachedTop && !contactAttachedTop && !isOpaque) ? "bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]" : "bg-[#E1E3E3]"
//                   }`}
//                   style={{
//                     WebkitMaskImage: (servicesAttachedTop && !contactAttachedTop && !isOpaque)
//                       ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
//                       : "",
//                     maskImage: (servicesAttachedTop && !contactAttachedTop && !isOpaque)
//                       ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
//                       : "",
//                   }}
//                 />
//                 <div className={`${suisse.className} pl-[1.25rem] relative font-[400] tracking-wide text-[2.5rem] py-[0.3125rem]`}>
//                   Services
//                 </div>
//        </>
        
//     )




// }



import { suisse } from "@/app/fonts";

export default function ServicesHeader({servicesAttachedTop, contactAttachedTop, isOpaque, goToService}:{servicesAttachedTop:boolean, contactAttachedTop:boolean, isOpaque:boolean, goToService: () => void}){

    return(
        <>
        <div
                  className={`absolute border-t inset-0 transition-[backdrop-filter] duration-1000  ease-in-out ${
                    (servicesAttachedTop && !contactAttachedTop && !isOpaque) ? "backdrop-blur-[0.5rem] bg-[#E1E3E3]/60 top-0 left-0 right-0 h-[160%]" : "backdrop-blur-[1rem] bg-[#E1E3E3]/100"
                  }`}
                  style={{
                    WebkitMaskImage: (servicesAttachedTop && !contactAttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                    maskImage: (servicesAttachedTop && !contactAttachedTop && !isOpaque)
                      ? "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
                      : "",
                  }}
                />
                <div onClick={goToService}  className={`${suisse.className} cursor-pointer pl-[1.25rem] relative font-[400] tracking-wide text-[2.5rem] py-[0.3125rem] max-[960px]:text-[2.1875rem] max-[750px]:text-[2.03125rem]  max-[650px]:text-[1.875rem] max-[500px]:text-[1.71875rem]`}>
                  Services
                </div>
       </>

    )




}
