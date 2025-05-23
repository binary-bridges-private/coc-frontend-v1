import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/helpers/ProtectedRoutes.tsx";
import GstProtectedRoutes from "./components/helpers/GstProtectedRoutes.tsx";
import LandingPage from "./components/pages/LandingPage.tsx";
import Practice from "./components/pages/Practice.tsx";
import Footer from "./components/ui/Footer.tsx";
import Header from "./components/ui/Header.tsx";
import ComingSoon from "./components/ui/practice/helpers/ComingSoon.tsx";
import Gst from "./components/ui/practice/Gst.tsx";
import Itr from "./components/ui/practice/Itr.tsx";
import Tds from "./components/ui/practice/Tds.tsx";
import RocFiling from "./components/ui/practice/RocFiling.tsx";
import PfEsi from "./components/ui/practice/PfEsi.tsx";
import Registration from "./components/ui/practice/gst/registration/Registration.tsx";
import GstLogin from "./components/ui/practice/GstLogin.tsx";
import Gstr1 from "./components/ui/practice/gst/gsrt1/Gstr1.tsx";
import Gstr3b from "./components/ui/practice/gst/gstr3b/Gstr3b.tsx";
import Gstr2a from "./components/ui/practice/gst/gstr2a/Gstr2a.tsx";
import ItrLogin from "./components/ui/practice/itr/Login.tsx";
import LoginGst from "./components/ui/practice/gst/login/Login.tsx";
import Login from "./components/ui/auth/Login.tsx";
import Signup from "./components/ui/auth/Signup.tsx";
import Banner from "./components/ui/Banner.tsx";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col w-screen h-screen min-h-screen overflow-auto">
        <Login />
        <Signup />
        {/* <Banner /> */}
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/practice" element={<Practice />} />

            <Route path="/practice/gst" element={<ProtectedRoutes isFree={true} children={< Gst />} />} />
            <Route path="/practice/gst/login" element={<ProtectedRoutes isFree={false} children={<LoginGst />} />} />
            <Route path="/practice/gst/registration" element={<ProtectedRoutes isFree={true} children={<Registration />} />} />
            <Route path="/practice/gst/dashboard" element={<GstProtectedRoutes children={<GstLogin />} />} />
            <Route path="/practice/gst/gstr-1" element={<GstProtectedRoutes children={< Gstr1 />} />} />
            <Route path="/practice/gst/gstr-2a" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/gstr-2b" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/gstr-3b" element={<GstProtectedRoutes children={<Gstr3b />} />} />
            <Route path="/practice/gst/gstr-4" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/gstr-9" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/gstr-9c" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/gstr-10" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/eway-bill" element={<GstProtectedRoutes children={<ComingSoon />} />} />
            <Route path="/practice/gst/e-invoice" element={<GstProtectedRoutes children={<ComingSoon />} />} />

            <Route path="/practice/itr" element={<ProtectedRoutes isFree={false} children={<Itr />} />} />
            <Route path="/practice/itr/login" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-1" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-2" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-3" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-4" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-5" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-6" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/itr-7" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/itr/registration" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />

            <Route path="/practice/tds" element={<ProtectedRoutes isFree={false} children={<Tds />} />} />
            <Route path="/practice/tds/registration" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/tds/pay-tds" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/tds/tds-return" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />

            <Route path="/practice/pf-esi" element={<ProtectedRoutes isFree={false} children={<PfEsi />} />} />
            <Route path="/practice/pf-esi/pf-return" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/pf-esi/esi-return" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/pf-esi/registration" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />

            <Route path="/practice/roc-filing" element={<ProtectedRoutes isFree={false} children={<RocFiling />} />} />
            <Route path="/practice/roc-filing/incorporation" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />
            <Route path="/practice/roc-filing/roc-filing" element={<ProtectedRoutes isFree={false} children={<ComingSoon />} />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;