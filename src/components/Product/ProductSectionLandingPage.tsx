import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard.tsx";

const ProductSectionLandingPage = () => {
    const courses = [
        {
            name: "CMA Inter Group-2 Full Course (Combo)",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹22,500 - ₹31,000",
        },
        {
            name: "CMA Final Group-1 Full Course",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹30,000 - ₹40,000",
        },
        {
            name: "CMA Foundation Complete Course",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹18,000 - ₹25,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
        {
            name: "CMA Inter Group-1 Full Course",
            byline: "By: CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
        },
    ];

    // Settings for the carousel
    const settings = {
        dots: true, // Pagination dots
        infinite: true, // Infinite scroll
        speed: 500, // Animation speed
        slidesToShow: 4, // Number of slides visible
        slidesToScroll: 1, // Number of slides to scroll per swipe
        autoplay: true, // Auto-play slides
        autoplaySpeed: 3000, // Auto-play speed (3 seconds)
        pauseOnHover: true, // Pause on hover
        responsive: [
            {
                breakpoint: 1024, // Tablet
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // Mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full px-6 py-10 bg-white overflow-hidden flex flex-col">
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
            <div>
                <button className="flex active:scale-80 bg-[#101C36]  active:bg-white active:text-[#101C36] text-white flex-row justify-center items-center gap-2.5 p-2 w-[235px] h-[48px] border border-[#101C36] rounded-md">
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
        <div className="flex flex-col items-center gap-3 w-[1174px] h-[129px]">
            {/* Main Heading */}
            <h1 className="text-black text-[36px] leading-[140%] text-center w-[1024px] font-bold">
                Boost Your Learning with{" "}
                <span className="italic text-red-600">
                    {" "}
                    Our Trending Combos
                </span>
            </h1>

            {/* Subheading */}
            <p className="text-[#545454] font-normal text-[22px] leading-[148%] text-center w-[1174px]">
                Maximize your potential with expertly curated course
                combinations designed to give you an edge. Get the best value,
                seamless learning, and guaranteed results—all in one package!
            </p>
        </div>
    );
};

export default ProductSectionLandingPage;
