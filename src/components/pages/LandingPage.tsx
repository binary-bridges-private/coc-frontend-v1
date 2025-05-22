import React from "react";
import WhatOurStudentSays from "../ui/WhatOurStudentSays.tsx";
import EnquirySection from "../ui/EnquirySection.tsx";
import ProductSectionLandingPage from "../ui/Product/ProductSectionLandingPage.tsx";
import FreeVideo from "../ui/FreeVideo.tsx";
import WhyChooseCOC from "../ui/WhyChooseCoc.tsx";
import VisitCoursesHome from "../ui/visitCourses/VisitCoursesHome.tsx";
import Faculties from "../ui/faculty/FacultyHome.tsx";
import TopBanner from "../ui/TopBanner.tsx";
import NoticeBoardHome from "../ui/noticeBoard/NoticeBoardHome.tsx";
import EnquiryForm from "../ui/EnquiryForm.tsx";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Enquiry Form */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 -z-10" />
        <EnquiryForm />
      </section>

      {/* Main Content Sections */}
      <main className="">
        {/* Hero Section */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <EnquirySection />
        </div>

        {/* Top Banner Section */}
        <TopBanner />

        {/* Courses Section */}
        <VisitCoursesHome />

        {/* Why Choose COC Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl -z-10" />
          <WhyChooseCOC />
        </div>

        {/* Products Section */}
        <ProductSectionLandingPage />

        {/* Faculty Section */}
        <Faculties />

        {/* Free Video Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl -z-10" />
          <FreeVideo />
        </div>

        {/* Testimonials Section */}
        <WhatOurStudentSays />
      </main>
    </div>
  );
};

export default LandingPage;
