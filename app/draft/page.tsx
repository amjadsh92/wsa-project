// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [jump, setJump] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > window.innerHeight * 0.15) {
//         setJump(true);
//       } else {
//         setJump(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <div className="h-auto">
//         {/* FIRST IMAGE */}
//         <div
//           style={{
//             backgroundImage: `url("/home/images/project1.jpg")`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: 1,
//           }}
//           className="sticky top-0 h-[200vh] overflow-hidden"
//         />

//         {/* SECOND SECTION */}
//         {/* <div
//           style={{
//             zIndex: 2,
//           }}
//           className="sticky top-0 h-[400vh]"
//         > */}
//           {/* TRANSFORM ONLY THE INNER VISUAL LAYER */}
//           <div
//             style={{
//               transform: jump
//                 ? "translateY(-65vh)"
//                 : "translateY(0vh)",

//               transition: "transform 0.35s ease-out",
//               zIndex:2
//             }}
//             className="sticky top-0 h-[100vh] bg-white"
//           >
//             <div className="sticky top-[65vh]">
//               Hello
//             </div>
//           </div>
//         </div>
    
//     </>
//   );
// }




"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [jump, setJump] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.15) {
        setJump(true);
      } else {
        setJump(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className=" flex flex-col">
        {/* FIRST IMAGE */}
        <div
          style={{
            backgroundImage: `url("/home/images/project1.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className="sticky top-0 h-[100vh] overflow-hidden"
        /> 

        {/* SECOND SECTION */}
        {/* <div
          style={{
            zIndex: 2,
          }}
          className="sticky top-0 h-[400vh]"
        >
          {/* TRANSFORM ONLY THE INNER VISUAL LAYER */}
          <div
            style={{
              backgroundImage: `url("/home/images/project1.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: jump
                ? "translateY(-65vh)"
                : "translateY(0vh)",

              transition: "transform 0.35s ease-out",
              zIndex:2
            }}
            className="sticky top-0 h-[300vh] bg-white"
          >
            <div className="sticky top-[65vh]">
              Hello
            </div>
            
          </div>
          <div style={{zIndex:3}} className="h-[65vh] bg-red-500"></div>
        </div>

        
    
    </>
  );
}