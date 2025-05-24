import React from "react";
import VisitCoursesCard from "./VisitComponentCard.tsx";
import { motion } from "framer-motion";

const VisitCoursesHome = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="relative w-full py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 -z-10" />
            <div className="absolute top-0 left-0 w-full h-64 -translate-y-32 -skew-y-6 opacity-50 bg-orange-50 transform-gpu"></div>
            <div className="absolute top-0 right-0 hidden -translate-y-1/2 bg-orange-100 rounded-full w-96 h-96 opacity-20 -translate-x-1/4 lg:block"></div>
            <div className="absolute bottom-0 left-0 hidden w-64 h-64 translate-y-1/2 bg-orange-100 rounded-full opacity-20 translate-x-1/4 lg:block"></div>

            <div className="container relative z-10 px-4 mx-auto md:px-8 max-w-7xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-16 text-center"
                >
                    <div className="inline-block px-6 py-2 mb-6 text-sm font-medium text-orange-700 bg-orange-100 border border-orange-200 rounded-full">
                        Educational Programs
                    </div>
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-5xl">
                        Explore Our <span className="text-orange-600">Professional</span> Courses
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-600">
                        COC Education offers specialized programs to empower your career.
                        Discover the perfect path for your professional growth.
                    </p>
                </motion.div>

                {/* Search/Filter Section */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-3 mb-16"
                >
                    <button className="px-5 py-2 text-sm font-medium text-white transition-colors bg-orange-600 rounded-lg shadow-sm hover:bg-orange-700 hover:shadow">
                        All Courses
                    </button>
                    <button className="px-5 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                        Professional
                    </button>
                    <button className="px-5 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                        Academic
                    </button>
                    <button className="px-5 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                        Skills
                    </button>
                </motion.div> */}

                {/* Courses Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <motion.div variants={itemVariants}>
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/cs.svg"}
                            iconBgColor={"#FEF2F2"}
                            title={"CFM"}
                            labels={["Government-Recognised Dual Certification", "Life Changing Program"]}
                            link={"https://www.coceducation.com/new-course/skill-courses/chartered-financial-management"}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/cma.svg"}
                            iconBgColor={"#FFFBEB"}
                            title={"CMA"}
                            labels={["Foundation", "Inter Group-1", "Inter Group-2"]}
                            link={"https://www.coceducation.com/new-course/cma/cma-foundation-syllabus-2022"}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/ca.svg"}
                            iconBgColor={"#FFF7ED"}
                            title={"CA"}
                            labels={["Foundation", "Inter Group-1", "Inter Group-2"]}
                            link={"https://www.coceducation.com/new-course/ca-new-syllabus"}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/bcom.svg"}
                            iconBgColor={"#FFF7ED"}
                            title={"B.Com"}
                            labels={["Full Course", "Accounts"]}
                            link={"https://www.coceducation.com/new-course/b-com/graduation"}
                        />
                    </motion.div>


                    <motion.div variants={itemVariants}>
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/11th.svg"}
                            iconBgColor={"#FFEDD5"}
                            title={"Class 11th"}
                            labels={["Combo", "Full Course", "Chapter Wise"]}
                            link={"https://www.coceducation.com/new-course/class-11-12/class-11th"}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/12th.svg"}
                            iconBgColor={"#FEF3C7"}
                            title={"Class 12th"}
                            labels={["Combo", "Full Course", "Chapter Wise"]}
                            link={"https://www.coceducation.com/new-course/class-11-12/class-12th"}
                        />
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                > */}
                {/* <div className="relative p-10 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600"> */}
                {/* CTA Background Elements */}
                {/* <div className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 bg-orange-400 rounded-full opacity-20 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 translate-y-1/2 rounded-full bg-amber-400 opacity-20 -translate-x-1/4"></div> */}

                {/* <h3 className="mb-4 text-2xl font-bold text-white">Ready to advance your career?</h3>
                        <p className="mb-8 text-orange-100">Join thousands of successful professionals who chose COC Education</p> */}
                {/* <a 
                            href="https://www.coceducation.com/courses" 
                            className="inline-flex items-center px-6 py-3 font-medium text-orange-700 transition-all duration-300 bg-white rounded-lg hover:bg-orange-50 hover:shadow-lg"
                        >
                            View All Courses
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </a> */}
                {/* </div> */}
                {/* </motion.div> */}
            </div>
        </section>
    );
};

export default VisitCoursesHome;