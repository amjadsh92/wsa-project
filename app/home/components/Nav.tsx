import { suisse } from "@/app/fonts";


export default function Nav({paddingTop}:{paddingTop:string}){

  return(  

<ul style={{paddingTop: `var(${paddingTop})`}} className="bg-white">
                    <li
                      className={`${suisse.className} flex justify-between items-center pl-2 bg-white  `}
                    >
                      <div className="max-[500px]:text-[1.575rem] max-[960px]:text-[2.2rem] text-[3.2625rem] font-[400]">ABOUT</div>
                       <div className=" pi pi-search pr-[0.625rem] text-[1.25rem] max-[500px]:text-[1.0625rem] -translate-y-[0.25rem] min-[960px]:!hidden "></div>

                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-full font-[800]"></div>
                    <li
                      className={`${suisse.className} text-[3.2625rem] font-[400] pl-2 bg-white max-[960px]:text-[2.2rem] max-[500px]:text-[1.575rem]`}
                    >
                      WORK
                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-full font-[800]"></div>
                    <li
                      className={`${suisse.className} text-[3.2625rem] font-[400] pl-2 bg-white  max-[960px]:text-[2.2rem] max-[500px]:text-[1.575rem]`}
                    >
                      REPOSITORY
                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-full  font-[800]"></div>
</ul>

  )

}
