import React from "react";
import WhatOurStudentSays from "../ui/WhatOurStudentSays.tsx";
import EnquirySection from "../ui/EnquirySection.tsx";
import VisitCourses from "../ui/visitCourses/VisitCoursesHome.tsx"
import WhyChooseCoc from "../ui/WhyChooseCoc.tsx"
import FreeVideo from "../ui/FreeVideo.tsx"

const LandingPage = () => {
    return (
        <div>
            <EnquirySection/>
            <VisitCourses />
            <WhyChooseCoc />
            <FreeVideo />
            <WhatOurStudentSays />
        </div>
    );
};

export default LandingPage;
