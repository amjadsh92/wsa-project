// "use client";

// import { useEffect, useState } from "react";

// export default function Home() {
//   const [jump, setJump] = useState(false);
//   const [scrolled, setScrolled] = useState(false)
//   const [heightValue, setHeightValue] = useState(200)

//   useEffect(() => {
//     const handleScroll = () => {
      
//       if (window.scrollY > window.innerHeight * 0.15) {
//         setJump(true);
//         setScrolled(true)
//       } else {
//         setJump(false);
//         setScrolled(false)
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//     <div className="h-[200vh]">
//       {/* FIRST IMAGE */}
//       <div
//         style={{
//           backgroundImage: `url("/home/images/project1.jpg")`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           zIndex: 1,
//         }}
//         className="sticky top-0 h-screen overflow-hidden"
//       />

//       {/* SECOND IMAGE */}
//       <div
//         style={{
//         //   backgroundImage: `url("/home/images/project2.jpg")`,
//         //   backgroundSize: "cover",
//         //   backgroundPosition: "center",
//           zIndex: 2,
//         //   transform:"translateY(-10vh)"
         
//           /*
//             Normal position initially.
//             Then quickly jumps upward by 65vh.
//             Since 15vh was already covering,
//             total becomes ~80vh.
//           */

//           transform: jump
//             ? "translateY(-65vh)"
//             : "translateY(0vh)",

//           transition: "transform 0.35s ease-out"
//         }}
//         className="sticky top-[0vh]  h-[400vh] bg-white"
    
//       >
//         <div  className="sticky top-[65vh]"> Hello</div>
//         </div>
//         </div>
//     </>
//   );
// }



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
//       <div className="h-[200vh]">
//         {/* FIRST IMAGE */}
//         <div
//           style={{
//             backgroundImage: `url("/home/images/project1.jpg")`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: 1,
//           }}
//           className="sticky top-0 h-screen overflow-hidden"
//         />

//         {/* SECOND SECTION */}
//         <div
//           style={{
//             zIndex: 2,
//           }}
//           className="sticky top-0 h-[400vh]"
//         >
//           {/* TRANSFORM ONLY THE INNER VISUAL LAYER */}
//           <div
//             style={{
//               transform: jump
//                 ? "translateY(-65vh)"
//                 : "translateY(0vh)",

//               transition: "transform 0.35s ease-out",
//             }}
//             className="h-full bg-white"
//           >
//             <div className="sticky top-[65vh]">
//               Hello
//             </div>
//           </div>
//         </div>
//       </div>
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
      <div className="h-[400vh]">
        {/* FIRST IMAGE */}
        <div
          style={{
            backgroundImage: `url("/home/images/project1.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
          className="sticky top-0 h-screen overflow-hidden"
        />

        {/* SECOND SECTION */}
        <div
          style={{
            zIndex: 2,
          }}
          className="sticky top-0 h-[465vh]"
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
            }}
            className="h-full bg-white"
          >
            <div className="sticky top-[65vh]">
              Hello
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
