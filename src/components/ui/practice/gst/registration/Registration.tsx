import React, { useState } from "react";
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

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: "",
    state: "",
    district: "",
    businessName: "",
    pan: "",
    email: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({
    userType: false,
    state: false,
    district: false,
    businessName: false,
    pan: false,
    email: false,
    mobileNumber: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      userType: !formData.userType.trim(),
      state: !formData.state.trim(),
      district: !formData.district.trim(),
      businessName: !formData.businessName.trim(),
      pan: !formData.pan.trim(),
      email: !formData.email.trim(),
      mobileNumber: !formData.mobileNumber.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleNextStep = () => {
    if (step === 1 && validateForm()) {
      console.log(formData);
      setStep(step + 1);
    }
  };

  return (
    <>
      <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg  breadcrumbs">
        <ul>
          <li className="cursor-pointer" onClick={() => navigate("/practice")}>Practice</li>
          <li className="cursor-pointer" onClick={() => navigate("/practice/gst")}>Gst</li>
          <li>Registration</li>
        </ul>
      </div>

      {step === 1 && (
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
          <h2 className="mb-4 text-xl font-semibold">New Registration</h2>
          <form className="space-y-4">
            {/* User Type */}
            <div>
              <label className="label"><span className="label-text">I am a *</span></label>
              <input 
                type="text" 
                name="userType" 
                value={formData.userType} 
                onChange={handleChange} 
                className={`w-full input input-bordered ${errors.userType ? "border-red-500" : ""}`} 
              />
              {errors.userType && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* State / UT */}
            <div>
              <label className="label"><span className="label-text">State / UT *</span></label>
              <input 
                type="text" 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
                className={`w-full input input-bordered ${errors.state ? "border-red-500" : ""}`} 
              />
              {errors.state && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* District */}
            <div>
              <label className="label"><span className="label-text">District *</span></label>
              <input 
                type="text" 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
                className={`w-full input input-bordered ${errors.district ? "border-red-500" : ""}`} 
              />
              {errors.district && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* Business Name */}
            <div>
              <label className="label"><span className="label-text">Legal Name of the Business (As mentioned in PAN) *</span></label>
              <input 
                type="text" 
                name="businessName" 
                value={formData.businessName} 
                onChange={handleChange} 
                className={`w-full input input-bordered ${errors.businessName ? "border-red-500" : ""}`} 
              />
              {errors.businessName && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* PAN */}
            <div>
              <label className="label"><span className="label-text">Permanent Account Number (PAN) *</span></label>
              <input 
                type="text" 
                name="pan" 
                value={formData.pan} 
                onChange={handleChange} 
                className={`w-full input input-bordered ${errors.pan ? "border-red-500" : ""}`} 
              />
              {errors.pan && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label"><span className="label-text">Email Address *</span></label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className={`w-full input input-bordered ${errors.email ? "border-red-500" : ""}`} 
              />
              {errors.email && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="label"><span className="label-text">Mobile Number *</span></label>
              <div className="flex gap-2">
                <span className="flex items-center justify-center w-16 input input-bordered">+91</span>
                <input 
                  type="text" 
                  name="mobileNumber" 
                  value={formData.mobileNumber} 
                  onChange={handleChange} 
                  className={`w-full input input-bordered ${errors.mobileNumber ? "border-red-500" : ""}`} 
                />
              </div>
              {errors.mobileNumber && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button type="button" className="w-full text-white btn bg-[#101C36]" onClick={handleNextStep}>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* {step === 2 && <BusinessDetailsForm setStep={setStep} data={formData}/>} */}
      {/* {step === 3 && <Promoter setStep={setStep} />} */}
      {/* {step === 4 && <AuthorizedSignatory setStep={setStep} />} */}
      {/* {step === 5 && <AuthorizedRepresentativeForm setStep={setStep} />} */}
      {/* {step === 6 && <Place setStep={setStep} />} */}
      {step === 2 && <AdditionalPlace setStep={setStep} />}
      {step === 8 && <GoodsServices setStep={setStep} />}
      {step === 9 && <StateSpecificInfo setStep={setStep} />}
      {step === 10 && <AdhaarAuth setStep={setStep} />}
      {step === 11 && <Verification setStep={setStep} />}
      {step === 12 && <TrnSuccessfull />}
    </>
  );
};

export default Registration;
