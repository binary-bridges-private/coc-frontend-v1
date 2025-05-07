// import React from "react";
// import Slider from "react-slick";
// import FacultyCard from "./FacultyCard.tsx";

// const FacultyHome = () => {
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

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         pauseOnHover: true,
//         arrows: false,
//         responsive: [
//             {
//                 breakpoint: 1635, // Large desktops
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 1278, // Tablets
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 895, // Large mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 576, // Small mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     arrows: false, // Hide navigation arrows for smaller screens
//                 },
//             },
//             {
//                 breakpoint: 375, // Very small mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     arrows: false,
//                 },
//             },
//         ],
//     };

//     return (
//         <div className="flex flex-col items-center w-full px-2 py-20 faculty-home lg:px-20 md:px-20 bg-theme1">
//             {/* Heading Section */}
//             <h2 className="mb-8 text-center text-white lg:text-hl md:text-hm text-hs">
//                 Guiding You to Success: <span className="italic text-red-600">Our Faculty</span>
//             </h2>

//             {/* Faculty Slider */}
//             <div className="w-full max-w-8xl color-white">
//                 <Slider {...settings}>
//                     {facultiesList.map((faculty, index) => (
//                         <FacultyCard
//                             key={index}
//                             image={faculty.image}
//                             label={faculty.label}
//                             name={faculty.name}
//                             bio={faculty.bio}
//                         />
//                     ))}
//                 </Slider>
//             </div>

//             {/* Explore Button */}
//             <div className="flex justify-center w-full mt-12">
//                 <button className="flex items-center justify-center px-6 py-2 text-white transition-all duration-300 bg-white border rounded-lg explore-btn hover:bg-white hover:text-blue-600">
//                     <span className="text-lg font-medium text-[#101C36]">Explore Faculty</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default FacultyHome;


import React from "react";
import Slider from "react-slick";
import FacultyCard from "./FacultyCard.tsx";
import { FaArrowRight } from "react-icons/fa";

const FacultyHome = () => {
    const facultiesList = [
        {
            image: "/assets/faculties/first.svg",
            label: "Professor, CA",
            name: "Raghav Goel",
            bio: "Qualified Chartered Accountant with MBA from Birla Institute of Technology. Specializes in financial accounting and corporate law.",
            subjects: ["Financial Accounting", "Corporate Law", "Taxation"],
            rating: 4.9
        },
        {
            image: "/assets/faculties/second.svg",
            label: "Instructor, ACCA",
            name: "Amarjit Kaur",
            bio: "ACCA certified with 10+ years experience teaching Tally & IT software. Expert in practical accounting applications.",
            subjects: ["Tally", "IT Software", "Practical Accounting"],
            rating: 4.8
        },
        {
            image: "/assets/faculties/third.svg",
            label: "Professor",
            name: "Nitin Bhardwaj",
            bio: "University topper in Commerce with specialization in Business Law. Known for simplifying complex legal concepts.",
            subjects: ["Business Law", "Economics", "Commerce"],
            rating: 4.7
        },
        {
            image: "/assets/faculties/first.svg",
            label: "Professor, CA",
            name: "Raghav Goel",
            bio: "Qualified Chartered Accountant with MBA from Birla Institute of Technology. Specializes in financial accounting and corporate law.",
            subjects: ["Financial Accounting", "Corporate Law", "Taxation"],
            rating: 4.9
        },
        {
            image: "/assets/faculties/second.svg",
            label: "Instructor, ACCA",
            name: "Amarjit Kaur",
            bio: "ACCA certified with 10+ years experience teaching Tally & IT software. Expert in practical accounting applications.",
            subjects: ["Tally", "IT Software", "Practical Accounting"],
            rating: 4.8
        },
        {
            image: "/assets/faculties/third.svg",
            label: "Professor",
            name: "Nitin Bhardwaj",
            bio: "University topper in Commerce with specialization in Business Law. Known for simplifying complex legal concepts.",
            subjects: ["Business Law", "Economics", "Commerce"],
            rating: 4.7
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        centerMode: true,
        centerPadding: "0",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "60px"
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "30px"
                }
            }
        ]
    };

    return (
        <section className="w-full py-16 bg-gradient-to-br from-theme1 to-theme2">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                {/* Header with modern typography */}
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Guiding You to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Success</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-200">
                        Learn from industry experts and academic leaders
                    </p>
                </div>

                {/* Enhanced slider container */}
                <div className="relative faculty-slider">
                    <Slider {...settings} className="px-2 pb-12 -mx-2">
                        {facultiesList.map((faculty, index) => (
                            <div key={index} className="px-2">
                                <FacultyCard
                                    image={faculty.image}
                                    label={faculty.label}
                                    name={faculty.name}
                                    bio={faculty.bio}
                                    // subjects={faculty.subjects}
                                    // rating={faculty.rating}
                                />
                            </div>
                        ))}
                    </Slider>
                    
                    {/* Custom dots position */}
                    <style jsx global>{`
                        .slick-dots {
                            bottom: -10px !important;
                        }
                        .slick-dots li button:before {
                            color: rgba(255,255,255,0.5) !important;
                            font-size: 10px !important;
                        }
                        .slick-dots li.slick-active button:before {
                            color: white !important;
                        }
                    `}</style>
                </div>

                {/* Animated CTA button */}
                <div className="flex justify-center mt-10">
                    <button className="flex items-center px-8 py-3 space-x-2 text-lg font-semibold text-white transition-all duration-300 transform bg-red-600 rounded-full hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        <span>Explore All Faculty</span>
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FacultyHome;