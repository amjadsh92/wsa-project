import { archivo, lato } from './fonts';


export default function Home() {
  return (
    <div>
      <div className={`${archivo.className} text-[40px] w-fit m-auto font-bold`}> KAAN{" "}<span className={`${lato.className}`}>Architecten </span></div> 
     
    </div>
  );
}
