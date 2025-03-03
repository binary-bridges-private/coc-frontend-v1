import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import Login from "./components/ui/auth/Login.jsx";
import Signup from "./components/ui/auth/Signup.tsx";
import ProductPage from "./components/pages/ProductPage.tsx";
import Practice from "./components/pages/Practice.tsx";
import Gst from "./components/ui/practice/Gst.tsx";
import Itr from "./components/ui/practice/Itr.tsx";
import Tds from "./components/ui/practice/Tds.tsx";
import RocFiling from "./components/ui/practice/RocFiling.tsx";
import PfEsi from "./components/ui/practice/PfEsi.tsx";
import Registration from "./components/ui/practice/gst/registration/Registration.tsx";
import Gstr1 from "./components/ui/practice/gst/gsrt1/Gstr1.tsx";

function App() {
    return (
        <div className="flex flex-col w-screen h-screen min-h-screen overflow-auto ">
            <Header />
            {/* <Login /> */}
            {/* <Signup /> */}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/practice" element={<ProtectedRoutes element={Practice} />} />
                    <Route path="/practice/gst" element={<ProtectedRoutes element={Gst} />} />
                    <Route path="/practice/itr" element={<ProtectedRoutes element={Itr} />} />
                    <Route path="/practice/tds" element={<ProtectedRoutes element={Tds} />} />
                    <Route path="/practice/roc-filing" element={<ProtectedRoutes element={RocFiling} />} />
                    <Route path="/practice/pf-esi" element={<ProtectedRoutes element={PfEsi} />} />

                    {/*------------- gst ----------------- */}
                    <Route path="/practice/gst/registration" element={<ProtectedRoutes element={Registration} />} />
                    <Route path="/practice/gst/gstr-1" element={<ProtectedRoutes element={Gstr1} />} />

                    {/* <Route
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
                    <Route path="/product/:id" element={<ProductPage />} /> */}
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
