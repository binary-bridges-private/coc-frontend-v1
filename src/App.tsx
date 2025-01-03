import React from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom"
import ProtectedRoutes from "./components/helpers/ProtectedRoutes.tsx";
import LandingPage from "./components/pages/LandingPage.tsx";
import Courses from "./components/pages/Courses.tsx";
import Faculties from "./components/pages/Faculties.tsx";
import AboutUs from "./components/pages/AboutUs.tsx";
import ContactUs from "./components/pages/ContactUs.tsx";
import Header from "./components/ui/Header.tsx";

function App() {
    return (
        <div className="border h-screen w-screen bg-primary text-white">
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/courses" element={<ProtectedRoutes element={Courses} />} ></Route>
                <Route path="/faculties" element={<ProtectedRoutes element={Faculties} />}></Route>
                <Route path="/about-us" element={<ProtectedRoutes element={AboutUs} />}></Route>
                <Route path="/contact-us" element={<ProtectedRoutes element={ContactUs} />}></Route>
            </Routes>
        </div>
    );
}

export default App;
