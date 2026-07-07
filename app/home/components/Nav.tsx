import { suisse } from "@/app/fonts";


export default function Nav({paddingTop}:{paddingTop:string}){

  return(  

<ul style={{paddingTop: `var(${paddingTop})`}} className="bg-white">
                    <li
                      className={`${suisse.className} flex justify-between items-center pl-2 bg-white  `}
                    >
                      <div className="max-[500px]:text-[25.2px] max-[960px]:text-[35.2px] text-[52.2px] font-[400]">ABOUT</div>
                       <div className=" pi pi-search pr-[10px] text-[20px] max-[500px]:text-[17px] -translate-y-[4px] min-[960px]:!hidden "></div>

                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-[var(--nav-header-width)] font-[800]"></div>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2 bg-white max-[960px]:text-[35.2px] max-[500px]:text-[25.2px]`}
                    >
                      WORK
                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-[var(--nav-header-width)] font-[800]"></div>
                    <li
                      className={`${suisse.className} text-[52.2px] font-[400] pl-2 bg-white  max-[960px]:text-[35.2px] max-[500px]:text-[25.2px]`}
                    >
                      REPOSITORY
                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-[var(--nav-header-width)]  font-[800]"></div>
</ul>

  )

}
