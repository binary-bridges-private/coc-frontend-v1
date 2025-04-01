// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TopBar from "./Topbar.tsx";
// import BusinessDetailsForm from "./BusinessDetailsForm.tsx";
// import Promoter from "./Promoter.tsx";
// import AuthorizedSignatory from "./AuthorizedSignatory.tsx";
// import AuthorizedRepresentativeForm from "./AuthorizedRepresentative.tsx";
// import Place from "./Place.tsx";
// import GoodsServices from "./GoodsServices.tsx";
// import StateSpecificInfo from "./StateSpecificInfo.tsx";
// import AdhaarAuth from "./AdhaarAuthentication.tsx";
// import Verification from "./Verification.tsx";
// import AdditionalPlace from "./AdditionalPlace.tsx";
// import TrnSuccessfull from "./TrnSuccessfull.tsx";

// interface FormData {
//   userType: string;
//   state: string;
//   district: string;
//   businessName: string;
//   pan: string;
//   email: string;
//   mobileNumber: string;
//   trn: string;
// }

// interface Errors {
//   trn: boolean;
//   captcha: string;
// }

// const generateCaptcha = () => {
//   const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
//   let captcha = "";
//   for (let i = 0; i < 6; i++) {
//     captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return captcha;
// };

// const Trn = () => {

//   const [captchaText, setCaptchaText] = useState("");
//   const [userCaptcha, setUserCaptcha] = useState("");

//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     userType: "",
//     state: "",
//     district: "",
//     businessName: "",
//     pan: "",
//     email: "",
//     mobileNumber: "",
//     trn: ""
//   });

//   const [promoterData, setPromoterData] = useState<any[]>([]);
//   const [authorizedSign, setAuthorizedSign] = useState<any[]>([]);
//   const [errors, setErrors] = useState<Errors>({
//     trn: false,
//     captcha: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: false });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       trn: !formData.trn.trim(),
//     };
//     setErrors({ ...errors, trn: newErrors.trn });
//     return !newErrors.trn;
//   };

//   const handleNextStep = () => {
//     if (step === 1 && validateForm()) {
//       console.log(formData);
//       setStep(step + 1);
//     }
//   };

//   const refreshCaptcha = () => {
//     setCaptchaText(generateCaptcha());
//     setUserCaptcha("");
//   };

//   return (
//     <>
//       <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
//         <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
//           <li
//             className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
//             onClick={() => navigate("/practice")}
//           >
//             <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
//             </svg>
//             Practice
//           </li>
//           <span className="text-gray-400">›</span>
//           <li
//             className="transition duration-200 cursor-pointer hover:text-blue-600"
//             onClick={() => navigate("/practice/gst")}
//           >
//             GST
//           </li>
//           <span className="text-gray-400">›</span>
//           <li className="text-gray-500">TRN</li>
//         </ul>
//       </div>

//       {step === 1 && (
//         <>
//           <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
//             <h2 className="text-xl font-extrabold text-white">
//               Temporary Reference Number
//             </h2>
//           </div>
//           <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//             <form className="space-y-4">
//               {/* TRN Input */}
//               <div>
//                 <label className="label"><span className="label-text">TRN :</span></label>
//                 <input
//                   type="text"
//                   name="trn"
//                   value={formData.trn}
//                   onChange={handleChange}
//                   className={`w-full input input-bordered ${errors.trn ? "border-red-500" : ""}`}
//                   placeholder="Enter your Temporary Reference Number"
//                 />
//                 {errors.trn && <p className="text-sm text-red-500">This field is required.</p>}
//               </div>

//               <div className="mt-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="p-2 mr-4 font-mono text-2xl tracking-widest bg-gray-100 rounded-md">
//                       {captchaText.split("").map((char, i) => (
//                         <span
//                           key={i}
//                           style={{
//                             transform: `rotate(${Math.random() * 20 - 10}deg)`,
//                             display: "inline-block"
//                           }}
//                         >
//                           {char}
//                         </span>
//                       ))}
//                     </div>
//                     <button
//                       type="button"
//                       onClick={refreshCaptcha}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                       </svg>
//                     </button>
//                   </div>
//                   <div className="w-1/2">
//                     <input
//                       type="text"
//                       name="captcha"
//                       value={userCaptcha}
//                       onChange={handleChange}
//                       placeholder="Enter CAPTCHA"
//                       className={`w-full input input-bordered ${errors.captcha ? "border-red-500" : ""}`}
//                     />
//                     {errors.captcha && <p className="text-sm text-red-500">{errors.captcha}</p>}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="w-full text-white btn bg-[#101C36]"
//                   onClick={handleNextStep}
//                 >
//                   Proceed
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}

//       {step === 2 && <BusinessDetailsForm setStep={setStep} data={formData} />}
//       {step === 3 && <Promoter setStep={setStep} setPromoterData={setPromoterData} />}
//       {step === 4 && <AuthorizedSignatory setStep={setStep} setAuthorizedSign={setAuthorizedSign} />}
//       {step === 5 && <AuthorizedRepresentativeForm setStep={setStep} />}
//       {step === 6 && <Place setStep={setStep} />}
//       {step === 7 && <AdditionalPlace setStep={setStep} />}
//       {step === 8 && <GoodsServices setStep={setStep} />}
//       {step === 9 && <StateSpecificInfo setStep={setStep} />}
//       {step === 10 && <AdhaarAuth setStep={setStep} promoterData={promoterData} />}
//       {step === 11 && <Verification setStep={setStep} authorizedSign={authorizedSign} />}
//       {step === 12 && <TrnSuccessfull />}
//     </>
//   );
// };

// export default Trn;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./Topbar.tsx";
import BusinessDetailsForm from "./BusinessDetailsForm.tsx";
import Promoter from "./Promoter.tsx";
import AuthorizedSignatory from "./AuthorizedSignatory.tsx";
import AuthorizedRepresentativeForm from "./AuthorizedRepresentative.tsx";
import Place from "./Place.tsx";
import GoodsServices from "./GoodsServices.tsx";
import StateSpecificInfo from "./StateSpecificInfo.tsx";
import AdhaarAuth from "./AdhaarAuthentication.tsx";
import Verification from "./Verification.tsx";
import AdditionalPlace from "./AdditionalPlace.tsx";
import TrnSuccessfull from "./TrnSuccessfull.tsx";

interface FormData {
  userType: string;
  state: string;
  district: string;
  businessName: string;
  pan: string;
  email: string;
  mobileNumber: string;
  trn: string;
}

interface Errors {
  trn: boolean;
  captcha: string;
}

interface PromoterData {
  // Define your promoter data interface here
  [key: string]: any;
}

interface AuthorizedSignatoryData {
  // Define your authorized signatory data interface here
  [key: string]: any;
}

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const Trn = () => {
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState("");
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    userType: "",
    state: "",
    district: "",
    businessName: "",
    pan: "",
    email: "",
    mobileNumber: "",
    trn: ""
  });

  const [promoterData, setPromoterData] = useState<PromoterData[]>([]);
  const [authorizedSign, setAuthorizedSign] = useState<any>();
  const [errors, setErrors] = useState<Errors>({
    trn: false,
    captcha: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "captcha") {
      setUserCaptcha(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      trn: !formData.trn.trim(),
      captcha: userCaptcha !== captchaText ? "CAPTCHA doesn't match" : ""
    };
    setErrors(newErrors);
    return !newErrors.trn && !newErrors.captcha;
  };

  const handleNextStep = () => {
    if (!validateForm()) return;
    console.log(formData);
    setStep(step + 1);
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserCaptcha("");
    setErrors({ ...errors, captcha: "" });
  };

  return (
    <>
      <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
          <li
            className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice")}
          >
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
            </svg>
            Practice
          </li>
          <span className="text-gray-400">›</span>
          <li
            className="transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice/gst")}
          >
            GST
          </li>
          <span className="text-gray-400">›</span>
          <li className="text-gray-500">TRN</li>
        </ul>
      </div>

      {step === 1 && (
        <>
          <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
            <h2 className="text-xl font-extrabold text-white">
              Temporary Reference Number
            </h2>
          </div>
          <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* TRN Input */}
              <div>
                <label className="label">
                  <span className="label-text">TRN:</span>
                </label>
                <input
                  type="text"
                  name="trn"
                  value={formData.trn}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.trn ? "border-red-500" : ""}`}
                  placeholder="Enter your Temporary Reference Number"
                />
                {errors.trn && <p className="text-sm text-red-500">This field is required.</p>}
              </div>

              {/* CAPTCHA Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 mr-4 font-mono text-2xl tracking-widest bg-gray-100 rounded-md select-none">
                      {captchaText.split("").map((char, i) => (
                        <span
                          key={i}
                          style={{
                            transform: `rotate(${Math.random() * 20 - 10}deg)`,
                            display: "inline-block"
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="text-blue-500 transition-colors hover:text-blue-700"
                      aria-label="Refresh CAPTCHA"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-1/2">
                    <input
                      type="text"
                      name="captcha"
                      value={userCaptcha}
                      onChange={handleChange}
                      placeholder="Enter CAPTCHA"
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.captcha ? "border-red-500" : ""}`}
                    />
                    {errors.captcha && <p className="text-sm text-red-500">{errors.captcha}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleNextStep}
                  disabled={!formData.trn.trim() || !userCaptcha}
                >
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {step === 2 && <BusinessDetailsForm setStep={setStep} data={formData} />}
      {step === 3 && <Promoter setStep={setStep} setPromoterData={setPromoterData} />}
      {step === 4 && <AuthorizedSignatory setStep={setStep} setAuthorizedSign={setAuthorizedSign} />}
      {step === 5 && <AuthorizedRepresentativeForm setStep={setStep} />}
      {step === 6 && <Place setStep={setStep} />}
      {step === 7 && <AdditionalPlace setStep={setStep} />}
      {step === 8 && <GoodsServices setStep={setStep} />}
      {step === 9 && <StateSpecificInfo setStep={setStep} />}
      {step === 10 && <AdhaarAuth setStep={setStep} promoterData={promoterData} />}
      {step === 11 && <Verification setStep={setStep} authorizedSign={authorizedSign} />}
      {step === 12 && <TrnSuccessfull />}
    </>
  );
};

export default Trn;