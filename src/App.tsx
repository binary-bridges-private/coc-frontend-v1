import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/helpers/ProtectedRoutes.tsx";
import LandingPage from "./components/pages/LandingPage.tsx";
import Courses from "./components/pages/Courses.tsx";
import Faculties from "./components/pages/Faculties.tsx";
import AboutUs from "./components/pages/AboutUs.tsx";
import ContactUs from "./components/pages/ContactUs.tsx";
import Footer from "./components/ui/Footer.tsx";
function App() {
    return (
        <div className="flex flex-col min-h-screen h-screen w-screen">
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/courses"
                        element={<ProtectedRoutes element={Courses} />}
                    />
                    <Route
                        path="/faculties"
                        element={<ProtectedRoutes element={Faculties} />}
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
