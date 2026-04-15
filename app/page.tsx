import { archivo, lato } from './fonts';


export default function Home() {
  return (
    <div className="h-screen w-screen bg-[url('/home/images/project1.jpg')] bg-cover p-[1px]">
      <div className={`${archivo.className} text-[55px] text-white w-fit m-auto font-bold mt-[60px]`}> KAAN{" "}<span className={`${lato.className}`}>Architecten </span></div> 
     
    </div>
  );
}
