import { suisse } from "@/app/fonts";


export default function Footer(){


    return(
        <>
         <div className="flex h-fit justify-center items-center max-[960px]:hidden [@media(max-height:550px)]:hidden">
                    <div
                      className={`${suisse.className} pt-6 w-fit text-black text-[10rem] font-[450] tracking-wide leading-none scale-x-125 translate-y-4`}
                    >
                      KAAN
                    </div>
                  </div>
                  <div className={`${suisse.className} flex justify-between items-center border-t w-full h-[2.5rem] p-[0.625rem] text-[0.75rem] max-[960px]:hidden [@media(max-height:550px)]:hidden`}>
                   
                    <div>CONTACT</div>
                    <div>NEWS ARCHIVE</div>
                    <div>INSTAGRAM</div>
                    <div>LINKEDIN</div>
                    <div>IMPRINT AND PRIVACY POLICY</div>
                    <div>@KAAN ARCHITECTEN</div>
                    
        
                  </div>
        
        
        
        
                   <div className={`${suisse.className} flex flex-col mt-[1.25rem] items-start justify-center border-t gap-[0.625rem] w-full p-[0.625rem] text-[0.75rem] max-[500px]:text-[0.6875rem] min-[960px]:hidden [@media(max-height:550px)]:hidden`}>
                   <div className="flex justify-between w-full">
                       <div>CONTACT</div>
                      <div>@KAAN ARCHITECTEN</div>
        
                   </div>
                
                  
                    <div>NEWS ARCHIVE</div>
                    <div>INSTAGRAM</div>
                    <div>LINKEDIN</div>
                    <div>IMPRINT AND PRIVACY POLICY</div>
                     
                  
                    
                    
                    
        
                  </div>
        
                  <div className="flex h-fit justify-center items-center min-[960px]:hidden [@media(max-height:550px)]:hidden">
                    <div
                      className={`${suisse.className} pt-6 w-fit text-black text-[7.5rem] max-[650px]:text-[5.625rem] max-[500px]:text-[3.75rem] font-[450] tracking-wide leading-none scale-x-125 translate-y-4`}
                    >
                      KAAN
                    </div>
                  </div>



                  <div className="flex h-fit justify-center items-center [@media(min-height:550px)]:hidden">
                    <div
                      className={`${suisse.className} pt-6 w-fit text-black text-[4rem] font-[450] tracking-wide leading-none scale-x-125`}
                    >
                      KAAN
                    </div>
                  </div>
                  <div className={`${suisse.className} flex flex-col gap-[0.625rem] justify-between items-center border-t w-full h-[2.5rem] p-[0.625rem] text-[0.6rem] [@media(min-height:550px)]:hidden`}>
                    <div className="flex justify-between items-center w-full">

                      <div>CONTACT</div>
                    <div>NEWS ARCHIVE</div>
                    <div>INSTAGRAM</div>
                    </div>
                   <div className="flex justify-between items-center w-full">
                    <div>LINKEDIN</div>
                    <div>IMPRINT AND PRIVACY POLICY</div>
                    <div>@KAAN ARCHITECTEN</div>
                    </div>
        
                  </div>
        
        
        
                  </>
    )
}
