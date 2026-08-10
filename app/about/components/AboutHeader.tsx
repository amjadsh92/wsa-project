// import { suisse } from "@/app/fonts";


// export default function  AboutHeader({servicesAttachedTop, isOpaque}:{servicesAttachedTop:boolean, isOpaque:boolean}){


// return(

//    <>
//             {/* Masked Backdrop & Blur Effect */}
//             <div
//               className={`absolute ${
//                 servicesAttachedTop 
//                   ? "bg-[#E1E3E3] inset-0"
//                   : `${isOpaque  ? "bg-[#E1E3E3] inset-0" : "inset-0 bg-[#E1E3E3]/60 backdrop-blur-sm top-0 left-0 right-0 h-[160%]"}`
//               }`}
//               style={{
//                 WebkitMaskImage: servicesAttachedTop 
//                   ? ""
//                   : `${isOpaque ? "" : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)" }`,
//                 maskImage: servicesAttachedTop
//                   ? ""
//                   : `${isOpaque ? "" : "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)" }`,
//               }}
//             />
//             <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px]`}>
//               Projects
//             </div>

            
//       </>  
    
    
         
// )


// }


import { suisse } from "@/app/fonts";


export default function  AboutHeader({servicesAttachedTop, isOpaque}:{servicesAttachedTop:boolean, isOpaque:boolean}){


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
            <div className={`${suisse.className} pl-[20px] relative font-[400] tracking-wide text-[40px]`}>
              Projects
            </div>


      </>



)


}