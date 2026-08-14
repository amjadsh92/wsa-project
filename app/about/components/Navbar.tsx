import { suisse } from "@/app/fonts";


export default function Navbar({showNav}:{showNav: boolean}){
return(
<div
        className={`fixed top-0 left-0 w-full z-50 transition-[top] duration-300 ease-in-out ${
          showNav ? "top-0" : "top-[-53px]"
        }`}
      >
        <div className={`${suisse.className} relative flex h-[53px] justify-between items-center border-b bg-[#E1E3E3] p-3`}>
          <div className="flex justify-between items-center text-[14px] ml-[10px]">
            <div className={`${suisse.className} mr-3`}>About</div>
            <div className={`${suisse.className} mr-3`}>Services</div>
            <div>Work</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- intentional: forces a full reload so Home restarts from its true initial state, not a client-side route swap */}
          <a
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-[450] text-[23px] tracking-wide cursor-pointer"
          >
            KAAN
          </a>
          <div className="text-[16px]">
            <i className="pi pi-search text-[16px]"></i>
          </div>
        </div>
      </div>
)
    }     