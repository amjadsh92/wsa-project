import { suisse } from "@/app/fonts";
import "primeicons/primeicons.css";


export default function About() {
  return (
    <>
    <div className={`${suisse.className} flex h-fit justify-between items-center border-b p-3 pb-2 pt-2`}>
      <div className="flex justify-between items-center text-[14px]">

        <div className={` ${suisse.className} mr-3`}>About</div>
        <div className={` ${suisse.className} mr-3`}>Services</div>
        <div>Work</div>
      </div>
      <div className="font-[450] text-[23px] tracking-wide mt-[2px]">KAAN</div>
      <div className="text-[16px]"> <i className="pi pi-search text-[16px]"></i></div>
    </div>
    <div className={`${suisse.className} font-[450] tracking-wide text-[40px] mt-[5px] ml-[9px]`}>Projects</div>
    </>
  );
}
