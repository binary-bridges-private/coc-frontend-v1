// // import React from "react";
// // import Slider from "react-slick";
// // import ProductCard from "./ProductCard.tsx";

// // const ProductSectionLandingPage = () => {
// const courses = [
//     {
//         name: "CMA Inter Group-2 Full Course (Combo)",
//         byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//         photo: "course-example.png",
//         priceRange: "₹22,500 - ₹31,000",
//         rating: 4.8,
//         students: 1250,
//         tag: "BEST SELLER",
//     },
//     {
//         name: "CMA Final Group-1 Full Course",
//         byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//         photo: "course-example.png",
//         priceRange: "₹30,000 - ₹40,000",
//         rating: 4.9,
//         students: 980,
//         tag: "NEW",
//     },
//     {
//         name: "CMA Foundation Complete Course",
//         byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//         photo: "course-example.png",
//         priceRange: "₹18,000 - ₹25,000",
//         rating: 4.7,
//         students: 2150,
//         tag: "POPULAR",
//     },
//     {
//         name: "CMA Inter Group-1 Full Course",
//         byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//         photo: "course-example.png",
//         priceRange: "₹20,000 - ₹28,000",
//         rating: 4.6,
//         students: 1750,
//     },
//     {
//         name: "CA Foundation Accounts Mastery",
//         byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat",
//         photo: "course-example.png",
//         priceRange: "₹15,000 - ₹22,000",
//         rating: 4.9,
//         students: 3200,
//         tag: "HOT",
//     },
//     {
//         name: "CS Executive Law Special",
//         byline: "CA/CS Amit Bachhawat, CMA Sumit Rastogi",
//         photo: "course-example.png",
//         priceRange: "₹25,000 - ₹32,000",
//         rating: 4.7,
//         students: 890,
//     },
// ];

// //     // Enhanced carousel settings
// //     const settings = {
// //         dots: true,
// //         infinite: true,
// //         speed: 500,
// //         slidesToShow: 4,
// //         slidesToScroll: 1,
// //         autoplay: true,
// //         autoplaySpeed: 5000,
// //         pauseOnHover: true,
// //         arrows: true,
// //         centerMode: false,
// //         centerPadding: "0px",
// //         responsive: [
// //             {
// //                 breakpoint: 1280, // Large desktops
// //                 settings: {
// //                     slidesToShow: 3,
// //                     slidesToScroll: 1,
// //                     arrows: true,
// //                 },
// //             },
// //             {
// //                 breakpoint: 1024, // Tablets landscape
// //                 settings: {
// //                     slidesToShow: 2,
// //                     slidesToScroll: 1,
// //                     arrows: true,
// //                 },
// //             },
// //             {
// //                 breakpoint: 768, // Tablets portrait
// //                 settings: {
// //                     slidesToShow: 1.5,
// //                     slidesToScroll: 1,
// //                     arrows: false,
// //                     centerMode: true,
// //                     centerPadding: "40px",
// //                 },
// //             },
// //             {
// //                 breakpoint: 640, // Large mobile devices
// //                 settings: {
// //                     slidesToShow: 1.2,
// //                     slidesToScroll: 1,
// //                     arrows: false,
// //                     centerMode: true,
// //                     centerPadding: "30px",
// //                 },
// //             },
// //             {
// //                 breakpoint: 480, // Small mobile devices
// //                 settings: {
// //                     slidesToShow: 1,
// //                     slidesToScroll: 1,
// //                     arrows: false,
// //                     centerMode: true,
// //                     centerPadding: "20px",
// //                 },
// //             },
// //         ],
// //     };

// //     return (
// //         <section className="w-full py-10 bg-white md:py-10 lg:py-10">
// //             <div className="container px-4 mx-auto sm:px-6 lg:px-8">
// //                 {/* Enhanced Heading Section */}
// //                 <div className="max-w-4xl mx-auto mb-12 text-center">
// //                     <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
// //                         Boost Your Learning with{" "}
// //                         <span className="italic text-red-600">Our Trending Combos</span>
// //                     </h2>
// //                     <p className="mt-4 text-lg text-gray-600 md:mt-6 md:text-xl">
// //                         Maximize your potential with expertly curated course combinations 
// //                         designed to give you an edge. Get the best value, seamless learning, 
// //                         and guaranteed results—all in one package!
// //                     </p>
// //                 </div>

// //                 {/* Enhanced Carousel Container */}
// //                 <div className="relative">
// //                     <Slider {...settings} className="px-2 -mx-2 md:px-4 md:-mx-4">
// //                         {courses.map((course, index) => (
// //                             <div key={index} className="px-2 md:px-4">
// //                                 <ProductCard
// //                                     name={course.name}
// //                                     byline={course.byline}
// //                                     photo={course.photo}
// //                                     priceRange={course.priceRange}
// //                                     // rating={course.rating}
// //                                     // students={course.students}
// //                                     // tag={course.tag}
// //                                 />
// //                             </div>
// //                         ))}
// //                     </Slider>
// //                 </div>

// //                 {/* Enhanced CTA Button */}
// //                 <div className="flex justify-center mt-12">
// //                     <button className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-[#101C36] rounded-lg hover:bg-[#1a2d52] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#101C36] focus:ring-opacity-50 active:scale-95">
// //                         Explore All Courses
// //                     </button>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default ProductSectionLandingPage;

// import React from "react";
// import Slider from "react-slick";
// import ProductCard from "./ProductCard.tsx";
// import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// const ProductSectionLandingPage = () => {
//     const courses = [
//         {
//             id: 1,
//             name: "CMA Inter Group-2 Full Course (Combo)",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹22,500 - ₹31,000",
//             rating: 4.8,
//             students: 1250,
//             tag: "BEST SELLER",
//             discount: "15% OFF",
//         },
//         {
//             id: 2,
//             name: "CMA Final Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹30,000 - ₹40,000",
//             rating: 4.9,
//             students: 980,
//             tag: "NEW",
//             discount: "20% OFF",
//         },
//         {
//             id: 3,
//             name: "CMA Foundation Complete Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹18,000 - ₹25,000",
//             rating: 4.7,
//             students: 2150,
//             tag: "POPULAR",
//             discount: "10% OFF",
//         },
//         {
//             id: 4,
//             name: "CMA Inter Group-1 Full Course",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
//             photo: "course-example.png",
//             priceRange: "₹20,000 - ₹28,000",
//             rating: 4.6,
//             students: 1750,
//             discount: "12% OFF",
//         },
//         {
//             id: 5,
//             name: "CA Foundation Accounts Mastery",
//             byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat",
//             photo: "course-example.png",
//             priceRange: "₹15,000 - ₹22,000",
//             rating: 4.9,
//             students: 3200,
//             tag: "HOT",
//             discount: "18% OFF",
//         },
//         {
//             id: 6,
//             name: "CS Executive Law Special",
//             byline: "CA/CS Amit Bachhawat, CMA Sumit Rastogi",
//             photo: "course-example.png",
//             priceRange: "₹25,000 - ₹32,000",
//             rating: 4.7,
//             students: 890,
//             discount: "25% OFF",
//         },
//     ];

//     // Custom arrow components
//     const NextArrow = (props) => {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={`${className} custom-arrow next-arrow`}
//                 style={{ ...style, display: "block", right: "-25px" }}
//                 onClick={onClick}
//             >
//                 <FaArrowRight className="text-gray-700 hover:text-red-600" />
//             </div>
//         );
//     };

//     const PrevArrow = (props) => {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={`${className} custom-arrow prev-arrow`}
//                 style={{ ...style, display: "block", left: "-25px" }}
//                 onClick={onClick}
//             >
//                 <FaArrowLeft className="text-gray-700 hover:text-red-600" />
//             </div>
//         );
//     };

//     // Enhanced carousel settings with partial visibility
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         pauseOnHover: true,
//         arrows: true,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         centerMode: true,
//         centerPadding: "60px",
//         responsive: [
//             {
//                 breakpoint: 1536, // Extra large screens
//                 settings: {
//                     slidesToShow: 3,
//                     centerMode: true,
//                     centerPadding: "100px",
//                 },
//             },
//             {
//                 breakpoint: 1280, // Large desktops
//                 settings: {
//                     slidesToShow: 2,
//                     centerMode: true,
//                     centerPadding: "150px",
//                 },
//             },
//             {
//                 breakpoint: 1024, // Tablets landscape
//                 settings: {
//                     slidesToShow: 2,
//                     centerMode: true,
//                     centerPadding: "100px",
//                 },
//             },
//             {
//                 breakpoint: 868, // Tablets portrait
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                     centerPadding: "80px",
//                     // arrows: false,
//                 },
//             },
//             {
//                 breakpoint: 768, // Tablets portrait
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                     centerPadding: "60px",
//                     arrows: false,
//                 },
//             },
//             {
//                 breakpoint: 640, // Large mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                     centerPadding: "40px",
//                     arrows: false,
//                 },
//             },
//             {
//                 breakpoint: 480, // Small mobile devices
//                 settings: {
//                     slidesToShow: 1,
//                     centerMode: true,
//                     centerPadding: "20px",
//                     arrows: false,
//                 },
//             },
//         ],
//     };

//     return (
//         <section className="w-full py-10 bg-gradient-to-b from-gray-50 to-white md:py-10 lg:py-10">
//             <div className="container px-4 mx-auto sm:px-6 lg:px-8">
//                 {/* Enhanced Heading Section */}
//                 <div className="max-w-4xl mx-auto mb-12 text-center">
//                     <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-red-600 uppercase bg-red-100 rounded-full">
//                         Featured Courses
//                     </span>
//                     <h2 className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
//                             Boost Your Career
//                         </span>{" "}
//                         With Our Courses
//                     </h2>
//                     <p className="mt-6 text-lg text-gray-600 md:mt-8 md:text-xl">
//                         Expertly curated courses designed to give you competitive edge. Get the best
//                         value, comprehensive learning, and proven results.
//                     </p>
//                 </div>

//                 {/* Enhanced Carousel Container */}
//                 <div className="relative px-8">
//                     <Slider {...settings} className="px-4 -mx-4">
//                         {courses.map((course) => (
//                             <div key={course.id} className="px-4 transition-transform duration-300 hover:scale-105">
//                                 <ProductCard
//                                     name={course.name}
//                                     byline={course.byline}
//                                     photo={course.photo}
//                                     priceRange={course.priceRange}
//                                     rating={course.rating}
//                                     students={course.students}
//                                     tag={course.tag}
//                                     discount={course.discount}
//                                 />
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>

//                 {/* Enhanced CTA Button */}

//                 <div className="flex justify-center mt-14 sm:mt-16">
//                         <a href="https://www.coceducation.com/new-course/skill-courses" target="_blank" rel="noopener noreferrer">
//                     <button className="flex items-center px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-red-600 rounded-full hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">

//                             Explore All Courses
//                         <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
//                     </button>
//                         </a>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ProductSectionLandingPage;


import { motion } from "framer-motion";
import Slider from "react-slick";
import ProductCard from "./ProductCard.tsx";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ProductSectionLandingPage = () => {

    const courses = [
        {
            id: 1,
            name: "CMA Inter Group-2 Full Course (Combo)",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹22,500 - ₹31,000",
            rating: 4.8,
            students: 1250,
            tag: "BEST SELLER",
            discount: "15% OFF",
        },
        {
            id: 2,
            name: "CMA Final Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹30,000 - ₹40,000",
            rating: 4.9,
            students: 980,
            tag: "NEW",
            discount: "20% OFF",
        },
        {
            id: 3,
            name: "CMA Foundation Complete Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹18,000 - ₹25,000",
            rating: 4.7,
            students: 2150,
            tag: "POPULAR",
            discount: "10% OFF",
        },
        {
            id: 4,
            name: "CMA Inter Group-1 Full Course",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA Sumit Rastogi, CA Satish Jalan",
            photo: "course-example.png",
            priceRange: "₹20,000 - ₹28,000",
            rating: 4.6,
            students: 1750,
            discount: "12% OFF",
        },
        {
            id: 5,
            name: "CA Foundation Accounts Mastery",
            byline: "CA/CMA Santosh Kumar, CA/CS Amit Bachhawat",
            photo: "course-example.png",
            priceRange: "₹15,000 - ₹22,000",
            rating: 4.9,
            students: 3200,
            tag: "HOT",
            discount: "18% OFF",
        },
        {
            id: 6,
            name: "CS Executive Law Special",
            byline: "CA/CS Amit Bachhawat, CMA Sumit Rastogi",
            photo: "course-example.png",
            priceRange: "₹25,000 - ₹32,000",
            rating: 4.7,
            students: 890,
            discount: "25% OFF",
        },
    ];

    const CustomArrow = ({ direction, onClick }) => (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer p-3 rounded-full bg-white shadow-lg hover:shadow-xl ${direction === 'next' ? '-right-12' : '-left-12'
                }`}
            onClick={onClick}
        >
            {direction === 'next' ? (
                <FaArrowRight className="text-2xl text-gray-700 hover:text-red-600" />
            ) : (
                <FaArrowLeft className="text-2xl text-gray-700 hover:text-red-600" />
            )}
        </motion.div>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <CustomArrow direction="next" onClick={undefined} />,
        prevArrow: <CustomArrow direction="prev" onClick={undefined} />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: false,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    centerMode: false
                }
            }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full py-10 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                {/* Animated Heading Section */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-4xl mx-auto mb-12 text-center"
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-red-600 uppercase bg-red-100 rounded-full"
                    >
                        Featured Courses
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold text-gray-900"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                            Boost Your Career
                        </span>{" "}
                        With Our Courses
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        className="mt-6 text-lg text-gray-600 md:mt-8 md:text-xl"
                    >
                        Expertly curated courses designed to give you competitive edge. Get the best
                        value, comprehensive learning, and proven results.
                    </motion.p>
                </motion.div>

                {/* Enhanced Carousel */}
                <motion.div
                    variants={itemVariants}
                    className="relative px-2 sm:px-4 lg:px-8"
                >
                    <Slider {...settings}>
                        {courses.map((course) => (
                            <motion.div
                                key={course.id}
                                variants={itemVariants}
                                className="px-4"
                            >
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="h-full p-2"
                                >
                                    <ProductCard
                                        name={course.name}
                                        byline={course.byline}
                                        photo={course.photo}
                                        priceRange={course.priceRange}
                                        rating={course.rating}
                                        students={course.students}
                                        tag={course.tag}
                                        discount={course.discount}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </Slider>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-12 sm:mt-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none"
                        >
                            <a
                                href="https://www.coceducation.com/new-course/skill-courses"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                Explore All Courses
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 ml-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </motion.button>
                    </motion.div>
                </motion.div>


            </div>
        </motion.section>
    );
};

export default ProductSectionLandingPage;