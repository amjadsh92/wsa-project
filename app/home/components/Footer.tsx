
import { suisse } from "@/app/fonts";

export default function Footer(){


    return(
<>
<div className="flex h-fit justify-center items-center max-[960px]:hidden">
            <div
              className={`${suisse.className} pt-6 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 translate-y-4`}
            >
              KAAN
            </div>
          </div>
          <div className={`${suisse.className} flex justify-between items-center border-t w-full h-[40px] p-[10px] text-[12px] max-[960px]:hidden`}>
           
            <div>CONTACT</div>
            <div>NEWS ARCHIVE</div>
            <div>INSTAGRAM</div>
            <div>LINKEDIN</div>
            <div>IMPRINT AND PRIVACY POLICY</div>
            <div>@KAAN ARCHITECTEN</div>
            

          </div>




           <div className={`${suisse.className} flex flex-col mt-[20px] items-start justify-center border-t gap-[10px] w-full p-[10px] text-[12px] max-[500px]:text-[11px] min-[960px]:hidden`}>
           <div className="flex justify-between w-full">
               <div>CONTACT</div>
              <div>@KAAN ARCHITECTEN</div>

           </div>
        
          
            <div>NEWS ARCHIVE</div>
            <div>INSTAGRAM</div>
            <div>LINKEDIN</div>
            <div>IMPRINT AND PRIVACY POLICY</div>
             
          
            
            
            

          </div>

          <div className="flex h-fit justify-center items-center min-[960px]:hidden">
            <div
              className={`${suisse.className} pt-6 w-fit text-black text-[120px] max-[650px]:text-[90px] max-[500px]:text-[60px] font-[450] tracking-wide leading-none scale-x-125 translate-y-4`}
            >
              KAAN
            </div>
          </div>
          </>
    )
}         








