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
        },
        {
            name: "CMA Final Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹30,000 - ₹40,000",
        },
        {
            name: "CMA Foundation Complete Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹18,000 - ₹25,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
    ];

    // Settings for the carousel
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
                breakpoint: 1154, // Tablets
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
        <div className="flex flex-col w-full px-20 py-20 overflow-hidden bg-white">
            <div>
                <HeadingSection />
            </div>
            <div>
                <Slider {...settings}>
                    {courses.map((course, index) => (
                        <ProductCard
                            key={index}
                            name={course.name}
                            byline={course.byline}
                            photo={course.photo}
                            priceRange={course.priceRange}
                        />
                    ))}
                </Slider>
            </div>
            <div className="flex flex-col items-center w-full mt-8">
                <button className="flex  active:scale-80 bg-[#101C36]  active:bg-white active:text-[#101C36] text-white flex-row justify-center items-center gap-2.5 p-2 w-[235px] h-[48px] border border-[#101C36] rounded-md">
                    <span className="font-sans font-medium text-[16px]">
                        Explore Courses
                    </span>
                </button>
            </div>
        </div>
    );
};
const HeadingSection = () => {
    return (
        <div className="flex flex-col items-center gap-3 px-4 md:px-8 lg:px-12">
            {/* Main Heading */}
            <h1 className="text-black lg:text-hl md:text-hm text-hs leading-[140%] text-center font-bold ">
                Boost Your Learning with{" "}
                <span className="italic text-red-600">Our Trending Combos</span>
            </h1>

            {/* Subheading */}
            <p className="text-[#545454] font-normal lg:text-pl md:text-pm text-ps leading-[148%] text-center max-w-screen-lg">
                Maximize your potential with expertly curated course
                combinations designed to give you an edge. Get the best value,
                seamless learning, and guaranteed results—all in one package!
            </p>
        </div>
    );
};
export default ProductSectionLandingPage;
