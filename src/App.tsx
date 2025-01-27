import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/helpers/ProtectedRoutes.tsx";
import LandingPage from "./components/pages/LandingPage.tsx";
import Courses from "./components/pages/Courses.tsx";
import Faculties from "./components/pages/Faculties.tsx";
import FacultyDetails from "./components/ui/faculty/FacultyDetails.tsx";
import AboutUs from "./components/pages/AboutUs.tsx";
import ContactUs from "./components/pages/ContactUs.tsx";
import Footer from "./components/ui/Footer.tsx";
import Header from "./components/ui/Header.tsx";
import CartInfo from "./components/ui/cart/CartInfo.tsx";

function App() {
    return (
        <div className="flex flex-col w-screen h-screen min-h-screen overflow-auto ">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/courses"
                        element={<ProtectedRoutes element={Courses} />}
                    />
                    <Route
                        path="/faculties"
                        element={<ProtectedRoutes element={CartInfo} />}
                    />
                    <Route
                        path="/about-us"
                        element={<ProtectedRoutes element={AboutUs} />}
                    />
                    <Route
                        path="/contact-us"
                        element={<ProtectedRoutes element={ContactUs} />}
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
