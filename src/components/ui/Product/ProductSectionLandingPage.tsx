// import React from "react";
// import Slider from "react-slick";
// import ProductCard from "./ProductCard.tsx";

// const ProductSectionLandingPage = () => {
//     const courses = [
//         {
//             name: "CMA Inter Group-2 Full Course (Combo)",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹22,500 - ₹31,000",
//         },
//         {
//             name: "CMA Final Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹30,000 - ₹40,000",
//         },
//         {
//             name: "CMA Foundation Complete Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹18,000 - ₹25,000",
//         },
//         {
//             name: "CMA Inter Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹20,000 - ₹28,000",
//         },
//         {
//             name: "CMA Inter Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹20,000 - ₹28,000",
//         },
//         {
//             name: "CMA Inter Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹20,000 - ₹28,000",
//         },
//         {
//             name: "CMA Inter Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹20,000 - ₹28,000",
//         },
//     ];

//     // Settings for the carousel
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
//                 breakpoint: 1538, // Large desktops
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 1181, // Tablets
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 868, // Large mobile devices
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
//         <div className="flex flex-col w-full px-2 py-20 overflow-hidden bg-white lg:px-20 md:px-20">
//             <div>
//                 <HeadingSection />
//             </div>
//             <div>
//                 <Slider {...settings}>
//                     {courses.map((course, index) => (
//                         <ProductCard
//                             key={index}
//                             name={course.name}
//                             byline={course.byline}
//                             photo={course.photo}
//                             priceRange={course.priceRange}
//                         />
//                     ))}
//                 </Slider>
//             </div>
//             <div className="flex flex-col items-center w-full mt-8">
//                 <button className="flex  active:scale-80 bg-[#101C36]  active:bg-white active:text-[#101C36] text-white flex-row justify-center items-center gap-2.5 p-2 w-[235px] h-[48px] border border-[#101C36] rounded-md">
//                     <span className="font-sans font-medium text-[16px]">
//                         Explore Courses
//                     </span>
//                 </button>
//             </div>
//         </div>
//     );
// };
// const HeadingSection = () => {
//     return (
//         <div className="flex flex-col items-center gap-3 px-4 md:px-8 lg:px-12">
//             {/* Main Heading */}
//             <h1 className="text-black lg:text-hl md:text-hm text-hs leading-[140%] text-center font-bold ">
//                 Boost Your Learning with{" "}
//                 <span className="italic text-red-600">Our Trending Combos</span>
//             </h1>

//             {/* Subheading */}
//             <p className="text-[#545454] font-normal lg:text-pl md:text-pm text-ps leading-[148%] text-center max-w-screen-lg">
//                 Maximize your potential with expertly curated course
//                 combinations designed to give you an edge. Get the best value,
//                 seamless learning, and guaranteed results—all in one package!
//             </p>
//         </div>
//     );
// };
// export default ProductSectionLandingPage;


import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard.tsx";

const ProductSectionLandingPage = () => {
    const courses = [
        {
            name: "CMA Inter Group-2 Full Course (Combo)",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹22,500 - ₹31,000",
            rating: 4.8,
            students: 1250,
            tag: "BEST SELLER",
        },
        {
            name: "CMA Final Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹30,000 - ₹40,000",
            rating: 4.9,
            students: 980,
            tag: "NEW",
        },
        {
            name: "CMA Foundation Complete Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹18,000 - ₹25,000",
            rating: 4.7,
            students: 2150,
            tag: "POPULAR",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
            rating: 4.6,
            students: 1750,
        },
        {
            name: "CA Foundation Accounts Mastery",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat",
            photo: "course-example.png",
            priceRange: "₹15,000 - ₹22,000",
            rating: 4.9,
            students: 3200,
            tag: "HOT",
        },
        {
            name: "CS Executive Law Special",
            byline: "CA/CS Amit Bachhawat, CMA Sumit Rastogi",
            photo: "course-example.png",
            priceRange: "₹25,000 - ₹32,000",
            rating: 4.7,
            students: 890,
        },
    ];

    // Enhanced carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true,
        centerMode: false,
        centerPadding: "0px",
        responsive: [
            {
                breakpoint: 1280, // Large desktops
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 1024, // Tablets landscape
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 768, // Tablets portrait
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 640, // Large mobile devices
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "30px",
                },
            },
            {
                breakpoint: 480, // Small mobile devices
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: "20px",
                },
            },
        ],
    };

    return (
        <section className="w-full py-16 bg-white md:py-24 lg:py-28">
            <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                {/* Enhanced Heading Section */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                        Boost Your Learning with{" "}
                        <span className="italic text-red-600">Our Trending Combos</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 md:mt-6 md:text-xl">
                        Maximize your potential with expertly curated course combinations 
                        designed to give you an edge. Get the best value, seamless learning, 
                        and guaranteed results—all in one package!
                    </p>
                </div>

                {/* Enhanced Carousel Container */}
                <div className="relative">
                    <Slider {...settings} className="px-2 -mx-2 md:px-4 md:-mx-4">
                        {courses.map((course, index) => (
                            <div key={index} className="px-2 md:px-4">
                                <ProductCard
                                    name={course.name}
                                    byline={course.byline}
                                    photo={course.photo}
                                    priceRange={course.priceRange}
                                    // rating={course.rating}
                                    // students={course.students}
                                    // tag={course.tag}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Enhanced CTA Button */}
                <div className="flex justify-center mt-12">
                    <button className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-[#101C36] rounded-lg hover:bg-[#1a2d52] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#101C36] focus:ring-opacity-50 active:scale-95">
                        Explore All Courses
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductSectionLandingPage;