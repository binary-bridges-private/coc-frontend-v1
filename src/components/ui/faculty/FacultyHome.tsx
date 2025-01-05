import React from "react";
import FacultyCard from "./FacultyCard.tsx";

const FacultyHome = () => {
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

    return (
        <div className="bg-[#101C36] w-full min-h-screen flex flex-col items-center">
            <div className="py-10 text-3xl font-medium text-center text-white">
                Our Faculties
            </div>

            <div className="grid max-w-screen-lg grid-cols-1 gap-6 px-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
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
            <span className="mt-20 text-white loading loading-bars loading-lg"></span>
        </div>
    );
};

export default FacultyHome;

// import React, { useEffect, useRef, useState } from "react";
// import FacultyCard from "./FacultyCard.tsx";

// const FacultyHome = () => {
//     // const [offset, setOffset] = useState(0); // Track scroll position
//     // const [direction, setDirection] = useState("right"); // Scroll direction
//     // const scrollContainerRef: any = useRef(null);

//     const facultiesList = [
//         {
//             image: "/assets/faculties/first.svg",
//             label: "Professor, CA",
//             name: "Raghav Goel",
//             bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
//         },
//         {
//             image: "/assets/faculties/second.svg",
//             label: "Instructor, ACCA",
//             name: "Amarjit Kaur",
//             bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
//         },
//         {
//             image: "/assets/faculties/third.svg",
//             label: "Professor",
//             name: "Nitin Bhardwaj",
//             bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
//         },
//         {
//             image: "/assets/faculties/first.svg",
//             label: "Professor, CA",
//             name: "Raghav Goel",
//             bio: "He is a Qualified Chartered Accountant by profession. Associate Chartered Accountant Master of Business Administration from Birla Institute of Technology.",
//         },
//         {
//             image: "/assets/faculties/second.svg",
//             label: "Instructor, ACCA",
//             name: "Amarjit Kaur",
//             bio: "ACCA, M.com, 3-year Diploma in Computer Applications. 10 Years Experience in teaching Tally & Information technology and other computer software.",
//         },
//         {
//             image: "/assets/faculties/third.svg",
//             label: "Professor",
//             name: "Nitin Bhardwaj",
//             bio: "He is known as a devoted teacher for Law having a consistent growth rate and success within a short span of time. He was a university topper in M.COM & B.COM.",
//         },
//     ];

//     return (
//         <div className="bg-[#101C36] w-full min-h-screen flex flex-col items-center">
//             <div className="py-10 text-3xl font-medium text-center text-white">
//                 Our Faculties
//             </div>

//             <div className="relative w-full max-w-screen-lg px-10 overflow-scroll ">
//                 <div
//                     className="flex gap-10"
//                 >
//                     {facultiesList.map((ele, index) => (
//                         <FacultyCard
//                             key={index}
//                             image={ele.image}
//                             label={ele.label}
//                             name={ele.name}
//                             bio={ele.bio}
//                         />
//                     ))}
//                 </div>
//             </div>
//             <span className="mt-20 text-white loading loading-bars loading-lg"></span>
//         </div>
//     );
// };

// export default FacultyHome;