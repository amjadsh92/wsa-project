// "use client";

// import Img from "next/image";
// import { useState } from "react";

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

//   const [selectedImage, setSelectedImage] = useState<
//     (typeof images)[number] | null
//   >(null);

//   return (
//     <>
//       <div
//         className="
//           grid
//           grid-cols-3
//           gap-x-[clamp(1.5rem,12.5vw,11.25rem)]
//           gap-y-[clamp(2rem,7vw,6.25rem)]
//           pt-[10rem]
//           p-[1.5rem]
//           pb-[2.5rem]
//         "
//       >
//         {images.map((image, index) => {
//           return (
//             <div
//               key={index}
//               onClick={() => setSelectedImage(image)}
//               className="
//                 group
//                 relative
//                 w-full
//                 aspect-[340/300]
//                 overflow-hidden
//                 cursor-pointer
//                 transition-transform
//                 duration-300
//                 ease-out
//                 hover:-translate-y-[6px]
//               "
//             >
//               <Img
//                 src={image.image}
//                 alt={image.title}
//                 fill
//                 sizes="33vw"
//                 className="
//                   object-cover
//                   transition-transform
//                   duration-700
//                   ease-out
//                   group-hover:scale-105
//                 "
//               />

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-0
//                   opacity-0
//                   backdrop-blur-[10px]
//                   transition-opacity
//                   duration-700
//                   ease-out
//                   group-hover:opacity-100
//                 "
//                 style={{
//                   WebkitMaskImage:
//                     "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",
//                   maskImage:
//                     "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",
//                 }}
//               />
//             </div>
//           );
//         })}
//       </div>

//       {/* Modal */}
//       {selectedImage && (
//         <div
//           onClick={() => setSelectedImage(null)}
//           className="
//             fixed
//             inset-0
//             z-50
//             flex
//             items-center
//             justify-center
//             bg-black/70
//             backdrop-blur-sm
//             p-6
//           "
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="
//               relative
//               w-full
//               max-w-[900px]
//               bg-white
//               p-6
//             "
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="
//                 absolute
//                 right-4
//                 top-4
//                 z-10
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-black
//                 text-xl
//                 text-white
//                 cursor-pointer
//               "
//             >
//               ×
//             </button>

//             {/* Modal image */}
//             <div className="relative aspect-[16/10] w-full overflow-hidden">
//               <Img
//                 src={selectedImage.image}
//                 alt={selectedImage.title}
//                 fill
//                 sizes="900px"
//                 className="object-cover"
//               />
//             </div>

//             {/* Information */}
//             <div className="pt-5">
//               <h2 className="text-2xl font-medium">
//                 {selectedImage.title}
//               </h2>

//               <p className="mt-2 text-sm text-gray-500">
//                 {selectedImage.location}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import Img from "next/image";
// import { useState } from "react";

// export default function Header1Content() {
//   const images = [
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//     {
//       title: "Building 140 CERN",
//       location: "GENEVA, CH",
//       year: "2025",
//       category: "Architecture",
//       description:
//         "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
//       image: "/architecture/images/project1.jpg",
//     },
//   ];

//   const [selectedImage, setSelectedImage] = useState<
//     (typeof images)[number] | null
//   >(null);

//   return (
//     <>
//       <div
//         className="
//           grid
//           grid-cols-3
//           gap-x-[clamp(1.5rem,12.5vw,11.25rem)]
//           gap-y-[clamp(2rem,7vw,6.25rem)]
//           pt-[10rem]
//           p-[1.5rem]
//           pb-[2.5rem]
//         "
//       >
//         {images.map((image, index) => {
//           return (
//             <div
//               key={index}
//               onClick={() => setSelectedImage(image)}
//               className="
//                 group
//                 relative
//                 w-full
//                 aspect-[340/300]
//                 overflow-hidden
//                 cursor-pointer
//                 transition-transform
//                 duration-300
//                 ease-out
//                 hover:-translate-y-[6px]
//               "
//             >
//               <Img
//                 src={image.image}
//                 alt={image.title}
//                 fill
//                 sizes="33vw"
//                 className="
//                   object-cover
//                   transition-transform
//                   duration-700
//                   ease-out
//                   group-hover:scale-105
//                 "
//               />

//               <div
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-0
//                   opacity-0
//                   backdrop-blur-[10px]
//                   transition-opacity
//                   duration-700
//                   ease-out
//                   group-hover:opacity-100
//                 "
//                 style={{
//                   WebkitMaskImage:
//                     "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",
//                   maskImage:
//                     "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",
//                 }}
//               />
//             </div>
//           );
//         })}
//       </div>

//       {selectedImage && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-50
//             overflow-y-auto
//             bg-[#f3f1ec]
//           "
//         >
//           {/* Close button */}
//           <button
//             onClick={() => setSelectedImage(null)}
//             className="
//               fixed
//               top-6
//               right-6
//               z-[60]
//               flex
//               h-12
//               w-12
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-black/20
//               bg-[#f3f1ec]
//               text-[2rem]
//               leading-none
//               cursor-pointer
//               transition
//               duration-300
//               hover:bg-black
//               hover:text-white
//             "
//             aria-label="Close modal"
//           >
//             ×
//           </button>

//           <div
//             className="
//               min-h-[110vh]
//               w-full
//               px-[clamp(1.5rem,4vw,5rem)]
//               pt-[clamp(6rem,10vh,9rem)]
//               pb-[6rem]
//             "
//           >
//             {/* Project header */}
//             <div
//               className="
//                 mb-[3rem]
//                 grid
//                 grid-cols-[1fr_auto]
//                 items-end
//                 gap-10
//               "
//             >
//               <div>
//                 <h1
//                   className="
//                     text-[clamp(2.5rem,6vw,6rem)]
//                     leading-[0.95]
//                     font-medium
//                     tracking-[-0.04em]
//                   "
//                 >
//                   {selectedImage.title}
//                 </h1>
//               </div>

//               <div
//                 className="
//                   flex
//                   flex-col
//                   gap-1
//                   text-right
//                   text-[0.75rem]
//                   uppercase
//                   tracking-[0.14em]
//                 "
//               >
//                 <span>{selectedImage.location}</span>
//                 <span>{selectedImage.year}</span>
//                 <span>{selectedImage.category}</span>
//               </div>
//             </div>

//             {/* Main image */}
//             <div
//               className="
//                 relative
//                 h-[75vh]
//                 min-h-[520px]
//                 w-full
//                 overflow-hidden
//               "
//             >
//               <Img
//                 src={selectedImage.image}
//                 alt={selectedImage.title}
//                 fill
//                 priority
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>

//             {/* Description */}
//             <div
//               className="
//                 py-[clamp(4rem,8vw,8rem)]
//                 grid
//                 grid-cols-12
//               "
//             >
//               <p
//                 className="
//                   col-span-7
//                   col-start-5
//                   max-w-[900px]
//                   text-[clamp(1.4rem,2.4vw,2.7rem)]
//                   leading-[1.25]
//                   tracking-[-0.025em]
//                 "
//               >
//                 {selectedImage.description}
//               </p>
//             </div>

//             {/* Small image gallery */}
//             <div
//               className="
//                 grid
//                 grid-cols-2
//                 gap-x-[1.5rem]
//                 gap-y-[1.5rem]
//               "
//             >
//               {Array.from({ length: 6 }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="
//                     relative
//                     h-[25vh]
//                     min-h-[220px]
//                     w-full
//                     overflow-hidden
//                   "
//                 >
//                   <Img
//                     src={selectedImage.image}
//                     alt={`${selectedImage.title} detail ${index + 1}`}
//                     fill
//                     sizes="50vw"
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import Img from "next/image";
import Link from "next/link";
import { projects } from "../projects";
import { suisse } from "@/app/fonts";

export default function Header1Content() {
  return (
    <div
      className="
        grid
        grid-cols-3
        gap-x-[clamp(1.5rem,12.5vw,11.25rem)]
        gap-y-[clamp(2rem,7vw,6.25rem)]
        pt-[10rem]
        p-[1.5rem]
        pb-[11.75rem]
      "
    >
      {projects.map((project) => {
        return (
          <div key={project.slug}>
          <Link
            key={project.slug}
            href={`/art/${project.slug}`}
            scroll={false}
            className="
              group
              relative
              w-full
              min-w-0
              cursor-pointer
              transition-transform
              duration-300
              ease-out
              hover:-translate-y-[6px]
            "
          >
            <div className="relative aspect-[340/300] w-full overflow-hidden">
              <Img
                src={project.image}
                alt={project.title}
                fill
                sizes="33vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-0
                  backdrop-blur-[10px]
                  transition-opacity
                  duration-700
                  ease-out
                  group-hover:opacity-100
                "
                style={{
                  WebkitMaskImage:
                    "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",

                  maskImage:
                    "linear-gradient(155deg, black 0%, black 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.5) 80%, transparent 100%)",
                }}
              />
            </div>
           
          </Link>
           <div className={`${suisse.className} flex justify-center items-center pt-3 font-normal`}>
              <h2 className="text-[0.9rem]">{project.title}</h2>
             
            </div>
            </div>
        );
      })}
    </div>
  );
}
