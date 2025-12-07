import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Gstr2a from "./components/ui/practice/gst/gstr2a/Gstr2a.tsx";
import Gstr2b from "./components/ui/practice/gst/gstr2b/Gstr2b.tsx";
import Gstr3b from "./components/ui/practice/gst/gstr3b/Gstr3b.tsx";
// import ItrLogin from "./components/ui/practice/itr/Login.tsx";
import LoginGst from "./components/ui/practice/gst/login/Login.tsx";
import Login from "./components/ui/auth/Login.tsx";
import Signup from "./components/ui/auth/Signup.tsx";
import ForgetPassword from "./components/ui/auth/ForgetPassword.tsx";
import Banner from "./components/ui/Banner.tsx";
import EWayBill from "./components/ui/practice/gst/eway-bill/index.tsx";
import EInvoice from "./components/ui/practice/gst/e-invoice/index.tsx";
import GSTR4Form from "./components/ui/practice/gst/gstr4/index.tsx";
import GSTR9Form from "./components/ui/practice/gst/gstr9/index.tsx";
import GSTR9CForm from "./components/ui/practice/gst/gstr9c/index.tsx";
import GSTR10Form from "./components/ui/practice/gst/gstr10/index.tsx";
import VerifyForgetPassword from "./components/ui/auth/VerifyForgetPassword.tsx";
import ItrLogin from "./components/ui/practice/ItrLogin.tsx";

// itr
// import LoginItr from "./components/ui/practice/itr/Login.tsx";
import ItrRegistration from "./components/ui/practice/itr/Registration.tsx";
import ItrOne from "./components/ui/practice/itr/itr-1/itr-1.tsx";
import ItrTwo from "./components/ui/practice/itr/itr-2/Itr-two.tsx";
// import ItrFour from "./components/ui/practice/itr/ItrFour.tsx";
import ItrThree from "./components/ui/practice/itr/itr-3/itr-three.tsx";
import ItrFour from "./components/ui/practice/itr/itr-4/itr-four.tsx";
import ItrSeven from "./components/ui/practice/itr/itr-5/itr-five.tsx";
import ItrFive from "./components/ui/practice/itr/itr-6/itr-6.tsx";
import ItrSix from "./components/ui/practice/itr/itr-7/itr-7.tsx";

//tds
import TdsLogin from "./components/ui/practice/tds/Login.tsx";
import TdsRegister from "./components/ui/practice/tds/Register.tsx";
import PayTds from "./components/ui/practice/tds/PayTds.tsx";
import Form26Q from "./components/ui/practice/tds/Form26Q.tsx";
import Form16A from "./components/ui/practice/tds/Form16A.tsx";
import Form27Q from "./components/ui/practice/tds/Form27Q.tsx";
import Form27EQ from "./components/ui/practice/tds/Form27EQ.tsx";
import FormAOC4 from "./components/ui/practice/roc/FormAOC4.tsx";
import FormMGT7 from "./components/ui/practice/roc/FormMGT7.tsx";
import Incorporation from "./components/ui/practice/roc/Incorporation.tsx";
import RocFilingForm from "./components/ui/practice/roc/RocFilingForm.tsx";

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
      <div
        id="app-scroll-container"
        className="flex flex-col w-screen h-screen min-h-screen overflow-auto"
      >
        <Login />
        <Signup />
        <ForgetPassword />
        <Banner />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/reset-password" element={<VerifyForgetPassword />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/practice" element={<Practice />} />

            <Route
              path="/practice/gst"
              element={<ProtectedRoutes isFree={true} children={<Gst />} />}
            />
            <Route
              path="/practice/gst/login"
              element={
                <ProtectedRoutes isFree={false} children={<LoginGst />} />
              }
            />
            <Route
              path="/practice/gst/registration"
              element={
                <ProtectedRoutes isFree={true} children={<Registration />} />
              }
            />
            <Route
              path="/practice/gst/dashboard"
              element={<GstProtectedRoutes children={<GstLogin />} />}
            />
            <Route
              path="/practice/gst/gstr-1"
              element={<GstProtectedRoutes children={<Gstr1 />} />}
            />
            <Route
              path="/practice/gst/gstr-2a"
              element={<GstProtectedRoutes children={<Gstr2a />} />}
            />
            <Route
              path="/practice/gst/gstr-2b"
              element={<GstProtectedRoutes children={<Gstr2b />} />}
            />
            <Route
              path="/practice/gst/gstr-3b"
              element={<GstProtectedRoutes children={<Gstr3b />} />}
            />
            <Route
              path="/practice/gst/gstr-4"
              element={<GstProtectedRoutes children={<GSTR4Form />} />}
            />
            <Route
              path="/practice/gst/gstr-9"
              element={<GstProtectedRoutes children={<GSTR9Form />} />}
            />
            <Route
              path="/practice/gst/gstr-9c"
              element={<GstProtectedRoutes children={<GSTR9CForm />} />}
            />
            <Route
              path="/practice/gst/gstr-10"
              element={<GstProtectedRoutes children={<GSTR10Form />} />}
            />
            <Route
              path="/practice/gst/eway-bill"
              element={<GstProtectedRoutes children={<EWayBill />} />}
            />
            <Route
              path="/practice/gst/e-invoice"
              element={<GstProtectedRoutes children={<ComingSoon />} />}
            />

            <Route
              path="/practice/itr"
              element={<ProtectedRoutes isFree={true} children={<Itr />} />}
            />
            {/* <Route path="/practice/itr/login" element={<ProtectedRoutes isFree={true} children={<LoginItr />} />} /> */}
            <Route
              path="/practice/itr/registration"
              element={
                <ProtectedRoutes isFree={true} children={<ItrRegistration />} />
              }
            />
            <Route
              path="/practice/itr/login"
              element={
                <ProtectedRoutes isFree={true} children={<ItrLogin />} />
              }
            />
            <Route
              path="/practice/itr/itr-1"
              element={<ProtectedRoutes isFree={true} children={<ItrOne />} />}
            />
            <Route
              path="/practice/itr/itr-1/:activeSection"
              element={<ProtectedRoutes isFree={true} children={<ItrOne />} />}
            />
            <Route
              path="/practice/itr/itr-2"
              element={<ProtectedRoutes isFree={true} children={<ItrTwo />} />}
            />
            <Route
              path="/practice/itr/itr-3"
              element={
                <ProtectedRoutes isFree={true} children={<ItrThree />} />
              }
            />
            <Route
              path="/practice/itr/itr-4"
              element={<ProtectedRoutes isFree={true} children={<ItrFour />} />}
            />
            <Route
              path="/practice/itr/itr-5"
              element={<ProtectedRoutes isFree={true} children={<ItrFive />} />}
            />
            <Route
              path="/practice/itr/itr-6"
              element={<ProtectedRoutes isFree={true} children={<ItrFive />} />}
            />
            <Route
              path="/practice/itr/itr-7"
              element={<ProtectedRoutes isFree={true} children={<ItrSix />} />}
            />

            <Route
              path="/practice/tds"
              element={<ProtectedRoutes isFree={false} children={<Tds />} />}
            />
            <Route
              path="/practice/tds/registration"
              element={
                <ProtectedRoutes isFree={false} children={<TdsRegister />} />
              }
            />
            <Route
              path="/practice/tds/login"
              element={
                <ProtectedRoutes isFree={false} children={<TdsLogin />} />
              }
            />
            <Route
              path="/practice/tds/pay-tds"
              element={<ProtectedRoutes isFree={false} children={<PayTds />} />}
            />
            <Route
              path="/practice/tds/tds-return"
              element={
                <ProtectedRoutes isFree={false} children={<Form26Q />} />
              }
            />
            <Route
              path="/practice/tds/form16a"
              element={
                <ProtectedRoutes isFree={false} children={<Form16A />} />
              }
            />
            <Route
              path="/practice/tds/form27q"
              element={
                <ProtectedRoutes isFree={false} children={<Form27Q />} />
              }
            />
            <Route
              path="/practice/tds/form27eq"
              element={
                <ProtectedRoutes isFree={false} children={<Form27EQ />} />
              }
            />

            <Route
              path="/practice/pf-esi"
              element={<ProtectedRoutes isFree={false} children={<PfEsi />} />}
            />
            <Route
              path="/practice/pf-esi/pf-return"
              element={
                <ProtectedRoutes isFree={false} children={<ComingSoon />} />
              }
            />
            <Route
              path="/practice/pf-esi/esi-return"
              element={
                <ProtectedRoutes isFree={false} children={<ComingSoon />} />
              }
            />
            <Route
              path="/practice/pf-esi/registration"
              element={
                <ProtectedRoutes isFree={false} children={<ComingSoon />} />
              }
            />
            <Route
              path="/practice/roc-filing"
              element={
                <ProtectedRoutes isFree={false} children={<RocFiling />} />
              }
            />
            <Route
              path="/practice/roc-filing/incorporation"
              element={
                <ProtectedRoutes isFree={false} children={<Incorporation />} />
              }
            />
            <Route
              path="/practice/roc-filing/roc-filing"
              element={
                <ProtectedRoutes isFree={false} children={<RocFilingForm />} />
              }
            />
            <Route
              path="/practice/roc-filing/aoc4"
              element={
                <ProtectedRoutes isFree={false} children={<FormAOC4 />} />
              }
            />
            <Route
              path="/practice/roc-filing/mgt7"
              element={
                <ProtectedRoutes isFree={false} children={<FormMGT7 />} />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
