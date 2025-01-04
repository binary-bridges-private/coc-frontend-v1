import React, { useEffect, useRef, useState } from "react";
import FacultyCard from "./FacultyCard";

const FacultyHome = () => {
    // const [offset, setOffset] = useState(0); // Track scroll position
    // const [direction, setDirection] = useState("right"); // Scroll direction
    // const scrollContainerRef: any = useRef(null);

    const facultiesList = [
        {
            image: "/assets/faculties/first.svg",
            label: "Professor, CA",
            name: "Raghav Goel",
            bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
        },
        {
            image: "/assets/faculties/second.svg",
            label: "Instructor, ACCA",
            name: "Amarjit Kaur",
            bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
        },
        {
            image: "/assets/faculties/third.svg",
            label: "Professor",
            name: "Nitin Bhardwaj",
            bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
        },
    ];

    // Automatically scrolls horizontally
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     if (scrollContainerRef.current) {
    //       const scrollWidth = scrollContainerRef.current.scrollWidth;
    //       const clientWidth = scrollContainerRef.current.clientWidth;

    //       setOffset((prevOffset) => {
    //         let newOffset = prevOffset;

    //         if (direction === "right") {
    //           newOffset += 1;
    //           if (newOffset >= scrollWidth - clientWidth) {
    //             setDirection("left"); // Reverse direction
    //           }
    //         } else {
    //           newOffset -= 1;
    //           if (newOffset <= 0) {
    //             setDirection("right"); // Reverse direction
    //           }
    //         }

    //         return newOffset;
    //       });
    //     }
    //   }, 30); // Adjust speed by changing the interval time

    //   return () => clearInterval(interval);
    // }, [direction]);

    return (
        <div className="bg-[#101C36] w-full min-h-screen flex flex-col items-center">
            <div className="py-10 text-3xl font-medium text-center text-white">
                Our Faculties
            </div>

            <div className="relative w-full max-w-screen-lg px-10 overflow-scroll">
                <div
                    // ref={scrollContainerRef}
                    className="flex gap-10"
                    style={{
                        // transform: `translateX(-${offset}px)`,
                        // transition: "transform 0.1s linear", // Smooth sliding effect
                        // willChange: "transform",
                    }}
                >
                    {facultiesList.map((ele, index) => (
                        <FacultyCard
                            key={index}
                            image={ele.image}
                            label={ele.label}
                            name={ele.name}
                            bio={ele.bio}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacultyHome;


// import React, { useEffect, useRef } from "react";
// import Faculty from "../ui/Faculty.tsx";

// const Faculties = () => {

//   const facultiesList = [
//     {
//       "image": "/assets/faculties/first.svg",
//       "label": "Professor, CA",
//       "name": "Raghav Goel",
//       "bio": "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology."
//     },
//     {
//       "image": "/assets/faculties/second.svg",
//       "label": "Instructor, ACCA",
//       "name": "Amarjit Kaur",
//       "bio": "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & amp; Information technology and other computer software."
//     },
//     {
//       "image": "/assets/faculties/third.svg",
//       "label": "Professor",
//       "name": "Nitin Bhardwaj",
//       "bio": "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM."
//     }
//   ]

//   return (
//     <div className="bg-[#101C36] w-full min-h-screen flex flex-col items-center">
//       <div className="py-10 text-3xl font-medium text-center text-white">
//         Our Faculties
//       </div>

//       <div className="relative w-full max-w-screen-lg overflow-hidden">
//         <div
//           className="flex gap-10 overflow-x-scroll no-scrollbar"
//         >
//           {
//             facultiesList.map((ele) => {
//               return (
//                 <Faculty image={ele.image} label={ele.label} name={ele.name} bio={ele.bio} />
//               )
//             })
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Faculties;
