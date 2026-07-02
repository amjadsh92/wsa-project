
import { suisse } from "@/app/fonts";

export default function Footer(){


    return(
<>
<div className="flex h-fit justify-center items-center">
            <div
              className={`${suisse.className} pt-6 w-fit text-black text-[160px] font-[450] tracking-wide leading-none scale-x-125 translate-y-4`}
            >
              KAAN
            </div>
          </div>
          <div className={`${suisse.className} flex justify-between items-center border-t w-full h-[40px] p-[10px] text-[12px]`}>
            <div>CONTACT</div>
            <div>NEWS ARCHIVE</div>
            <div>INSTAGRAM</div>
            <div>LINKEDIN</div>
            <div>IMPRINT AND PRIVACY POLICY</div>
            <div>@KAAN ARCHITECTEN</div>

          </div>
          </>
    )
}         








