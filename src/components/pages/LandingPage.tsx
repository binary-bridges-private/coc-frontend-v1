import React from "react";
import WhatOurStudentSays from "../ui/WhatOurStudentSays.tsx";
import EnquirySection from "../ui/EnquirySection.tsx";
import VisitCourses from "../ui/visitCourses/VisitCoursesHome.tsx"
import WhyChooseCoc from "../ui/WhyChooseCoc.tsx"
import FreeVideo from "../ui/FreeVideo.tsx"
import TopBanner from "../ui/TopBanner.tsx";
import NoticeBoardHome from "../ui/noticeBoard/NoticeBoardHome.tsx";
import Faculties from "../ui/faculty/FacultyHome.tsx"

const LandingPage = () => {
    return (
        <div>
            <EnquirySection />
            <TopBanner />
            <NoticeBoardHome />
            {/* <Faculties /> */}
            {/* <VisitCourses /> */}
            {/* <WhyChooseCoc /> */}
            {/* <FreeVideo /> */}
            {/* <WhatOurStudentSays /> */}
        </div>
    );
};

export default LandingPage;
