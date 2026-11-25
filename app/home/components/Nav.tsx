import { pagePath } from "@/lib/home-content";
import { suisse } from "@/app/fonts";
import type { HomeContent } from "@/lib/home-content";

import { useRouter } from "next/navigation";

export default function Nav({paddingTop, navigation}:{paddingTop:string; navigation: HomeContent["navigation"]}){

   const router = useRouter();

  return(  

<ul style={{paddingTop: `var(${paddingTop})`}} className="bg-white uppercase">
                    <li
                      onClick={() => router.push(pagePath(navigation, "page1"))}
                      className={`${suisse.className} cursor-pointer flex justify-between items-center pl-2 bg-whit`} 
                    >
                      <div className="max-[500px]:text-[1.575rem] max-[960px]:text-[2.2rem] text-[3.2625rem] font-[400]" >{navigation.page1}</div>
                       <div className=" pi pi-search pr-[0.625rem] text-[1.25rem] max-[500px]:text-[1.0625rem] -translate-y-[0.25rem] min-[960px]:!hidden "></div>

                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-full font-[800]"></div>
                    <li
                      onClick={() => router.push(pagePath(navigation, "page2"))}
                      className={`${suisse.className} cursor-pointer text-[3.2625rem] font-[400] pl-2 bg-white max-[960px]:text-[2.2rem] max-[500px]:text-[1.575rem]`}
                    >
                      {navigation.page2}
                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-full font-[800]"></div>
                    <li
                      onClick={() => router.push(pagePath(navigation, "page3"))}
                      className={`${suisse.className} cursor-pointer text-[3.2625rem] font-[400] pl-2 bg-white  max-[960px]:text-[2.2rem] max-[500px]:text-[1.575rem]`}
                    >
                      {navigation.page3}
                    </li>
                    <div className="border-t w-[var(--nav-header-width)] max-[960px]:w-full  font-[800]"></div>
</ul>

  )

}
