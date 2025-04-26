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
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks.ts"
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";
import { stateCodes } from "../../../../helpers/Constants.tsx";

interface PromoterData {
  [key: string]: any;
}

const Registration = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
    userType: "",
    state: "",
    district: "",
    businessName: "",
    pan: "",
    email: "",
    mobileNumber: "",
  });

  const [gstRegistratinId, setGstRegistartionId] = useState<string | null>(null);
  const [promoterData, setPromoterData] = useState<PromoterData[]>([]);
  const [authorizedSign, setAuthorizedSign] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateForm = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    const newErrors = {
      userType: !formData.userType.trim() ? "This field is required" : "",
      state: !formData.state.trim() ? "This field is required" : "",
      district: !formData.district.trim() ? "This field is required" : "",
      businessName: !formData.businessName.trim() ? "This field is required" : "",
      pan: !formData.pan.trim() ? "This field is required" : (!panRegex.test(formData.pan.toUpperCase()) ? "Invalid format" : ""),
      email: !formData.email.trim() ? "This field is required" : (!emailRegex.test(formData.email) ? "Invalid format" : ""),
      mobileNumber: !formData.mobileNumber.trim() ? "This field is required" : (!mobileRegex.test(formData.mobileNumber) ? "Invalid format" : ""),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  // const handleSave = async (registrationData: any) => {
  //   try {
  //     const result = await dispatch(saveGstRegistration(registrationData)).unwrap();
  //     console.log('Save successful:', result.data);
  //     setGstRegistartionId(result?.data?.data?.id);
  //     return true;
  //   } catch (error) {
  //     console.error('Save failed:', error);
  //     return false;
  //   }
  // };

  const handleSave = async (registrationData: any) => {
    setIsLoading(true);
    setSaveError(null);
    try {
      const result = await dispatch(saveGstRegistration(registrationData)).unwrap();
      console.log('Save successful:', result.data);
      setGstRegistartionId(result?.data?.data?.id);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      setSaveError('Failed to save registration. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async (registrationData: any) => {
    if (!validateForm()) return;
    const success = await handleSave(registrationData);
    if (success) setStep(step + 1);
  };

  return (
    <>
      <div className="p-4 mt-4 text-lg text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md ">
        Please do not refresh otherwise the progress will be lost!.
      </div>
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
          <li className="text-gray-500">Registration</li>
        </ul>
      </div>

      {step === 1 && (
        <>
          <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
            <h2 className="text-xl font-extrabold text-white">
              Registration
            </h2>
          </div>

          {/* Main Form */}
          <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
            <form className="space-y-6">
              {/* User Type */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  I am a <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  placeholder=""
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.userType ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.userType && <p className="mt-1 text-sm text-red-500">{errors.userType}</p>}
              </div>
              
              {/* State */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  State/UT <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleChange(e as any)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select state</option>
                  {Object.keys(stateCodes).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>

              {/* District */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.district ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
              </div>

              {/* Business Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Legal Name of Business (As mentioned in PAN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="As per PAN records"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.businessName && <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>}
              </div>

              {/* PAN */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="10 character PAN"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="official@email.com"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center justify-center w-16 p-3 text-sm bg-gray-100 border border-gray-300 rounded-md">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.mobileNumber ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>}
              </div>

              {/* <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleNextStep(formData)}
                  className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Application
                </button>
              </div> */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleNextStep(formData)}
                  disabled={isLoading}
                  className={`w-full px-6 py-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
                {saveError && (
                  <div className="mt-2 text-sm text-red-500">{saveError}</div>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      {step === 2 && <BusinessDetailsForm setStep={setStep} data={formData} gstRegistratinId={gstRegistratinId} />}
      {step === 3 && <Promoter setStep={setStep} setPromoterData={setPromoterData} gstRegistratinId={gstRegistratinId} />}
      {step === 4 && <AuthorizedSignatory setStep={setStep} setAuthorizedSign={setAuthorizedSign} gstRegistratinId={gstRegistratinId} />}
      {step === 5 && <AuthorizedRepresentativeForm setStep={setStep} gstRegistratinId={gstRegistratinId} />}
      {step === 6 && <Place setStep={setStep} gstRegistratinId={gstRegistratinId} />}
      {step === 7 && <AdditionalPlace setStep={setStep} gstRegistratinId={gstRegistratinId} />}
      {step === 8 && <GoodsServices setStep={setStep} gstRegistratinId={gstRegistratinId} />}
      {step === 9 && <StateSpecificInfo setStep={setStep} gstRegistratinId={gstRegistratinId} />}
      {step === 10 && <AdhaarAuth setStep={setStep} promoterData={promoterData} authorizedSign={authorizedSign} gstRegistratinId={gstRegistratinId} />}
      {step === 11 && <Verification setStep={setStep} promoterData={promoterData} authorizedSign={authorizedSign} gstRegistratinId={gstRegistratinId} />}
    </>
  );
};

export default Registration;