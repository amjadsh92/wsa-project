// import { suisse } from "@/app/fonts";
// import Img from "next/image";
// import project1 from "@/public/architecture/images/project1.jpg";

// export default function Header1Content() {
//   const images = [
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       image: "/architecture/images/project1.jpg",
//     },
//   ];

//   return (
//     <>
//       <div className="flex flex-wrap pt-[10rem] p-[1.5rem] pb-[2.5rem] gap-[80px]">
//         {images.map((image, index) => {
//           return (
//             <div
//               key={index}
//               className="w-[400px] h-[200px] overflow-hidden"
//             >
//               <Img
//                 src={image.image}
//                 alt={image.title}
               
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }




import Img from "next/image";

export default function Header1Content() {
  const images = [
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
      {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
      {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
      {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
    {
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      image: "/architecture/images/project1.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-x-[clamp(1.5rem,12.5vw,11.25rem)] gap-y-[clamp(2rem,7vw,6.25rem)] pt-[10rem] p-[1.5rem] pb-[2.5rem]">
      {images.map((image, index) => {
        return (
          <div
            key={index}
            className="relative w-full aspect-[340/300] overflow-hidden"
          >
            <Img
              src={image.image}
              alt={image.title}
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
