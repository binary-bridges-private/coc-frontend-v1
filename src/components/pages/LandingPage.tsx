import React from "react";
import WhatOurStudentSays from "../ui/WhatOurStudentSays.tsx";
import EnquirySection from "../ui/EnquirySection.tsx";
import ProductSectionLandingPage from "../Product/ProductSectionLandingPage.tsx";

const LandingPage = () => {
    return (
        <div className="">
            <EnquirySection />
            <ProductSectionLandingPage />
            <VisitCourses />
            <WhyChooseCoc />
            <FreeVideo />
            <WhatOurStudentSays />
        </div>
    );
};

export default LandingPage;
