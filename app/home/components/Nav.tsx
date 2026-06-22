import { suisse } from "@/app/fonts";


export default function Nav(){

  return(  

<ul className="pt-[var(--nav-padding-top)]">
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2 `}
                    >
                      ABOUT
                    </li>
                    <div className="border w-[50vw] font-light"></div>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2`}
                    >
                      WORK
                    </li>
                    <div className="border w-[50vw]"></div>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2`}
                    >
                      REPOSITORY
                    </li>
                    <div className="border w-[50vw]"></div>
</ul>

  )

}
