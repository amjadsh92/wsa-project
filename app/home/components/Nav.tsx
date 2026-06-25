import { suisse } from "@/app/fonts";


export default function Nav({paddingTop}:{paddingTop:string}){

  return(  

<ul style={{paddingTop: `var(${paddingTop})`}}className={`pt-[var(${paddingTop})]`}>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2 `}
                    >
                      ABOUT
                    </li>
                    <div className="border-t w-[50vw] font-[800]"></div>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2`}
                    >
                      WORK
                    </li>
                    <div className="border-t w-[50vw] font-[800]"></div>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2`}
                    >
                      REPOSITORY
                    </li>
                    <div className="border-t w-[50vw] font-[800]"></div>
</ul>

  )

}
