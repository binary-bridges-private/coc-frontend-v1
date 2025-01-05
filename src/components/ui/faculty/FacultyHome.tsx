import React from "react";
import Slider from "react-slick";
import FacultyCard from "./FacultyCard.tsx";
import "./slider.css";

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
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1400, // Large desktops
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1124, // Tablets
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 868, // Large mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576, // Small mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false, // Hide navigation arrows for smaller screens
                },
            },
            {
                breakpoint: 375, // Very small mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };
    

    return (
        <div className="faculty-home w-full px-20 py-20 bg-[#101C36] flex flex-col items-center">
            {/* Heading Section */}
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
                Meet Our Faculty
            </h2>

            {/* Faculty Slider */}
            <div className="w-full max-w-8xl slider-container color-white">
                <Slider {...settings}>
                    {facultiesList.map((faculty, index) => (
                        <FacultyCard
                            key={index}
                            image={faculty.image}
                            label={faculty.label}
                            name={faculty.name}
                            bio={faculty.bio}
                        />
                    ))}
                </Slider>
            </div>

            {/* Explore Button */}
            <div className="w-full flex justify-center mt-12">
                <button className="explore-btn flex items-center justify-center bg-white text-white hover:bg-white hover:text-blue-600 border px-6 py-2 rounded-lg transition-all duration-300">
                    <span className="text-lg font-medium text-[#101C36]">Explore Faculty</span>
                </button>
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
