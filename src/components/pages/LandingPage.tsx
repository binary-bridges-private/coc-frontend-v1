import React from "react";
import WhatOurStudentSays from "../ui/WhatOurStudentSays.tsx";
import EnquirySection from "../ui/EnquirySection.tsx";
import ProductSectionLandingPage from "../Product/ProductSectionLandingPage.tsx";
import FreeVideo from "../ui/FreeVideo.tsx";
import WhyChooseCOC from "../ui/WhyChooseCoc.tsx";
import VisitCoursesHome from "../ui/visitCourses/VisitCoursesHome.tsx";
import Faculties from "../ui/faculty/FacultyHome.tsx";

const LandingPage = () => {
    return (
        <div className="">
            <EnquirySection />
            
            <ProductSectionLandingPage />
            {/* <Faculties /> */}
            <VisitCoursesHome />
            <WhyChooseCOC />
            <FreeVideo />
            <WhatOurStudentSays />
        </div>
    );
};

export default LandingPage;
