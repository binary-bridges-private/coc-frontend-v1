
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/helpers/ProtectedRoutes.tsx";
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

function App() {
  return (
    <div className="flex flex-col w-screen h-screen min-h-screen overflow-auto">
      <Login />
      <Signup />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/practice" element={<ProtectedRoutes children={<Practice />} />} />

          {/* GST Routes */}

          <Route path="/practice/gst" element={<ProtectedRoutes children={< Gst />} />} />
          <Route path="/practice/gst/login" element={<ProtectedRoutes children={<LoginGst />} />} />
          <Route path="/practice/gst/registration" element={<ProtectedRoutes children={<Registration />} />} />
          <Route path="/practice/gst/dashboard" element={<ProtectedRoutes children={<GstLogin />} />} />
          <Route path="/practice/gst/gstr-1" element={<ProtectedRoutes children={< Gstr1 />} />} />
          <Route path="/practice/gst/gstr-2a" element={<ProtectedRoutes children={<Gstr2a />} />} />
          <Route path="/practice/gst/gstr-2b" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/gstr-3b" element={<ProtectedRoutes children={<Gstr3b />} />} />
          <Route path="/practice/gst/gstr-4" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/gstr-9" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/gstr-9c" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/gstr-10" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/eway-bill" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/e-invoice" element={<ProtectedRoutes children={<ComingSoon />} />} />
          <Route path="/practice/gst/login" element={<ProtectedRoutes children={<ComingSoon />} />} />

          {/* <Route path="/practice/itr" element={<ProtectedRoutes element={Itr} />} />
          <Route path="/practice/itr/login" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-1" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-2" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-3" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-4" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-5" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-6" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/itr-7" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/itr/registration" element={<ProtectedRoutes element={ComingSoon} />} /> */}

          {/* <Route path="/practice/tds" element={<ProtectedRoutes element={Tds} />} />
          <Route path="/practice/tds/pay-tds" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/tds/tds-return" element={<ProtectedRoutes element={ComingSoon} />} /> */}

          {/* <Route path="/practice/pf-esi" element={<ProtectedRoutes element={PfEsi} />} />
          <Route path="/practice/pf-esi/pf-return" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/pf-esi/esi-return" element={<ProtectedRoutes element={ComingSoon} />} /> */}

          {/* <Route path="/practice/roc-filing" element={<ProtectedRoutes element={RocFiling} />} />
          <Route path="/practice/roc-filing/incorporation" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/roc-filing/roc-filing" element={<ProtectedRoutes element={ComingSoon} />} />
          <Route path="/practice/roc-filing/registration" element={<ProtectedRoutes element={ComingSoon} />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;