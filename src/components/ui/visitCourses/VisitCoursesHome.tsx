import React from "react";
import VisitCoursesCard from "./VisitComponentCard.tsx";
import { motion } from "framer-motion";

const VisitCoursesHome = () => {
    return (
        <section className="w-full py-16 bg-gray-50">
            <div className="container px-4 mx-auto md:px-8 max-w-7xl">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Explore Our Professional Courses
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        COC Education offers specialized programs to empower your career. 
                        Discover the perfect path for your professional growth.
                    </p>
                </motion.div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
                    <VisitCoursesCard
                        iconUrl={"/assets/visitCourses/ca.svg"}
                        iconBgColor={"#F3F3F3"}
                        title={"CA"}
                        labels={["Foundation", "Inter Group-1", "Inter Group-2"]}
                    />
                    <VisitCoursesCard
                        iconUrl={"/assets/visitCourses/cma.svg"}
                        iconBgColor={"#F6FFEF"}
                        title={"CMA"}
                        labels={["Foundation", "Inter Group-1", "Inter Group-2"]}
                    />
                    <VisitCoursesCard
                        iconUrl={"/assets/visitCourses/cs.svg"}  
                        iconBgColor={"#FFFAE0"}
                        title={"CFM"}
                        labels={["Inter Froup-2"]}
                    />
                    <VisitCoursesCard
                        iconUrl={"/assets/visitCourses/bcom.svg"}
                        iconBgColor={"#FFF1DC"}
                        title={"B.Com"}
                        labels={["Full Course", "Accounts", "Post Graduation"]}
                    />
                    <VisitCoursesCard
                        iconUrl={"/assets/visitCourses/11th.svg"}
                        iconBgColor={"#F1FDFF"}
                        title={"Class 11th"}
                        labels={["Combo","Full Course", "Chapter Wise"]}
                    />
                    <VisitCoursesCard
                        iconUrl={"/assets/visitCourses/12th.svg"}
                        iconBgColor={"#FFEDF2"}
                        title={"Class 12th"}
                        labels={["Combo","Full Course", "Chapter Wise"]}
                    />
                </div>
            </div>
        </section>
    );
};

export default VisitCoursesHome;