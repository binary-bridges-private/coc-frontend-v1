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

// interface Errors {
//   trn: boolean;
//   captcha: string;
// }

interface PromoterData {
  [key: string]: any;
}

// interface AuthorizedSignatoryData {
//   [key: string]: any;
// }


let stateCodes: Record<string, string> = {
  'andhra pradesh': '37',
  'arunachal pradesh': '12',
  'assam': '18',
  'bihar': '10',
  'chhattisgarh': '22',
  'goa': '30',
  'gujarat': '24',
  'haryana': '06',
  'himachal pradesh': '02',
  'jharkhand': '20',
  'karnataka': '29',
  'kerala': '32',
  'madhya pradesh': '23',
  'maharashtra': '27',
  'manipur': '14',
  'meghalaya': '17',
  'mizoram': '15',
  'nagaland': '13',
  'odisha': '21',
  'punjab': '03',
  'rajasthan': '08',
  'sikkim': '11',
  'tamil nadu': '33',
  'telangana': '36',
  'tripura': '16',
  'uttar pradesh': '09',
  'uttarakhand': '05',
  'west bengal': '19',
  'andaman and nicobar islands': '35',
  'chandigarh': '04',
  'dadra and nagar haveli and daman and diu': '26',
  'lakshadweep': '31',
  'puducherry': '34',
  'delhi': '07',
  'ladakh': '38',
  'jammu and kashmir': '01'
};

const Registration = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const [gstRegistratinId, setGstRegistartionId] = useState<string | null>(null);
  const [promoterData, setPromoterData] = useState<PromoterData[]>([]);
  const [authorizedSign, setAuthorizedSign] = useState<any>();

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

  const handleSave = async (registrationData: any) => {
    try {
      const result = await dispatch(saveGstRegistration(registrationData)).unwrap();
      console.log('Save successful:', result.data);
      setGstRegistartionId(result?.data?.data?.id);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  const handleNextStep = async (registrationData: any) => {
    if (!validateForm()) return;
    const success = await handleSave(registrationData);
    if (success) setStep(step + 1);
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
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={(e) => handleChange(e as any)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.userType ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select user type</option>
                  <option value="Individual">Individual</option>
                  <option value="Company">Company</option>
                  <option value="LLP">LLP</option>
                  <option value="Partnership">Partnership</option>
                </select>
                {errors.userType && <p className="mt-1 text-xs text-red-500">This field is required</p>}
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
                      {state.charAt(0).toUpperCase() + state.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-xs text-red-500">This field is required</p>}
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
                {errors.district && <p className="mt-1 text-xs text-red-500">This field is required</p>}
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
                {errors.businessName && <p className="mt-1 text-xs text-red-500">This field is required</p>}
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
                {errors.pan && <p className="mt-1 text-xs text-red-500">This field is required</p>}
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
                {errors.email && <p className="mt-1 text-xs text-red-500">This field is required</p>}
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
                {errors.mobileNumber && <p className="mt-1 text-xs text-red-500">This field is required</p>}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => handleNextStep(formData)}
                  className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Application
                </button>
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
      {step === 10 && <AdhaarAuth setStep={setStep} promoterData={promoterData} gstRegistratinId={gstRegistratinId} />}
      {step === 11 && <Verification setStep={setStep} authorizedSign={authorizedSign} gstRegistratinId={gstRegistratinId} />}
    </>
  );
};

export default Registration;