import React from "react";
import VisitCourses from "../ui/visitCourses/VisitCoursesHome.tsx"
import WhyChooseCOC from "../ui/WhyChooseCoc.tsx";
import FreeVideo from "../ui/FreeVideo.tsx";

const LandingPage = () => {
    return (
        <div>
            <VisitCourses />
            <WhyChooseCOC />
            <FreeVideo />
        </div>
    );
};

export default LandingPage;
