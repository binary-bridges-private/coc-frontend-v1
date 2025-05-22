import React from 'react';
import { motion } from "framer-motion";
import Slider from "react-slick";
import ProductCard from "./ProductCard.tsx";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ProductSectionLandingPage = () => {

    const courses = [
        {
            id: 1,
            name: "CFM (SAP ID Included)",
            byline: "By CA/CMA Santosh Kumar , CA/ACCA Amarjit Kaur , CA Raghav Goel",
            photo: "./assets/courses/first.png",
            priceRange: "₹9,299",
            rating: 4.8,
            students: 1250,
            tag: "BEST SELLER",
            discount: "81% OFF",
            link: "https://www.coceducation.com/course/sap-id-cfm-course"
        },
        {
            id: 2,
            name: "CFM (Chartered Financial Management)",
            byline: "By CA/CMA Santosh Kumar , CA/ACCA Amarjit Kaur , CA Raghav Goel",
            photo: "./assets/courses/second.png",
            priceRange: "₹7,999",
            rating: 4.9,
            students: 980,
            tag: "NEW",
            discount: "83.34% OFF",
            link: "https://www.coceducation.com/course/chartered-financial-management-cfm"
        },
        {
            id: 3,
            name: "SAP ID Validity For 3 Months",
            byline: "By CA/ACCA Amarjit Kaur",
            photo: "./assets/courses/third.png",
            priceRange: "₹1,300",
            rating: 4.7,
            students: 2150,
            tag: "POPULAR",
            discount: "45.83% OFF",
            link: "https://www.coceducation.com/course/sap-id-cfm"
        }
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
                <FaArrowRight className="text-2xl text-orange-600 hover:text-orange-700" />
            ) : (
                <FaArrowLeft className="text-2xl text-orange-600 hover:text-orange-700" />
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
            className="w-full py-24 relative"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl -z-10" />
            
            <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                {/* Animated Heading Section */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-4xl mx-auto mb-20 text-center"
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="inline-block px-4 py-2 mb-4 text-sm font-semibold tracking-wider text-orange-600 uppercase bg-orange-50 rounded-full"
                    >
                        Featured Courses
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800">
                            Boost Your Career
                        </span>{" "}
                        With Our Courses
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        className="mt-6 text-lg text-gray-600 md:mt-8 md:text-xl max-w-2xl mx-auto"
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
                    <div className="max-w-[1400px] mx-auto">
                        <Slider {...settings}>
                            {courses.map((course) => (
                                <motion.div
                                    key={course.id}
                                    variants={itemVariants}
                                    className="px-4 h-full"
                                >
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="h-full p-2"
                                    >
                                        <div className="h-[450px]">
                                            <ProductCard
                                                name={course.name}
                                                byline={course.byline}
                                                photo={course.photo}
                                                priceRange={course.priceRange}
                                                rating={course.rating}
                                                students={course.students}
                                                tag={course.tag}
                                                discount={course.discount}
                                                link={course.link}
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </Slider>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-20"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 mx-auto text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg hover:from-orange-700 hover:to-orange-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            <a
                                href="https://www.coceducation.com/new-course/skill-courses/chartered-financial-management"
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