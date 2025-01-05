import React from "react";
import VisitCoursesCard from "./VisitComponentCard.tsx";

const VisitCoursesHome = () => {
    return (
        <>
            <div className="flex flex-col items-center w-full h-full gap-10 px-4 py-10 top-44 md:px-8 border bg-white">
                <div className="flex flex-col items-center w-full h-auto max-w-2xl gap-2">
                    <h1 className="text-3xl font-bold text-center text-black">
                        Click and Visit Our Different Courses
                    </h1>
                    <p className="text-lg text-center text-[#545454]">
                        COC is preparing students for different Categories.
                        Explore to find the one you are preparing for.
                    </p>
                </div>

                <div className="w-full max-w-[1116px] h-auto flex flex-col justify-center">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/ca.svg"}
                            iconBgColor={"#F3F3F3"}
                            title={"CA"}
                            label1={"Foundation"}
                            label2={"Inter Group -1"}
                            label3={"Inter Group -2"}
                        />
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/cma.svg"}
                            iconBgColor={"#F6FFEF"}
                            title={"CMA"}
                            label1={"Foundation"}
                            label2={"Inter Group -1"}
                            label3={"Inter Group -2"}
                        />
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/cs.svg"}
                            iconBgColor={"#FFFAE0"}
                            title={"CS"}
                            label1={"Foundation"}
                            label2={"Inter Group -1"}
                            label3={"Inter Group -2"}
                        />
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/bcom.svg"}
                            iconBgColor={"#FFF1DC"}
                            title={"B.Com"}
                            label1={"Full Course"}
                            label2={"Accounts"}
                            label3={"Post Graduation"}
                        />
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/11th.svg"}
                            iconBgColor={"#F1FDFF"}
                            title={"Class 11th"}
                            label1={"Combo"}
                            label2={"Full Course"}
                            label3={"Chapter Wise"}
                        />
                        <VisitCoursesCard
                            iconUrl={"/assets/visitCourses/12th.svg"}
                            iconBgColor={"#FFEDF2"}
                            title={"Class 12th"}
                            label1={"Combo"}
                            label2={"Full Course"}
                            label3={"Chapter Wise"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisitCoursesHome;
