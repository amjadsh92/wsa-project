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
//                 <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px] py-[5px]`}>
//                   Services
//                 </div>
//        </>
        
//     )




// }



import { suisse } from "@/app/fonts";

export default function ServicesHeader({servicesAttachedTop, contactAttachedTop, isOpaque}:{servicesAttachedTop:boolean, contactAttachedTop:boolean, isOpaque:boolean}){

    return(
        <>
        <div
                  className={`absolute border-t inset-0 transition-[backdrop-filter] duration-1000  ease-in-out ${
                    (servicesAttachedTop && !contactAttachedTop && !isOpaque) ? "backdrop-blur-[8px] bg-[#E1E3E3]/60 top-0 left-0 right-0 h-[160%]" : "backdrop-blur-[16px] bg-[#E1E3E3]/100"
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
                <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px] py-[5px]`}>
                  Services
                </div>
       </>

    )




}
