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

const Trn = () => {
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
    trn: "",
  });

  const [promoterData, setPromoterData] = useState([]);
  const [authorizedSign, setAuthorizedSign] = useState([]);

  const [errors, setErrors] = useState({
    trn: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      trn: !formData.trn.trim(),
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
          <li>Trn</li>
        </ul>
      </div>

      {step === 1 && (
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
          <h2 className="mb-4 text-xl font-semibold">Temporary Reference Number</h2>
          <form className="space-y-4">
            {/* User Type */}
            <div>
              <label className="label"><span className="label-text">TRN :</span></label>
              <input
                type="text"
                name="trn"
                value={formData.trn}
                onChange={handleChange}
                className={`w-full input input-bordered ${errors.trn ? "border-red-500" : ""}`}
              />
              {errors.trn && <p className="text-sm text-red-500">This field is required.</p>}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button type="button" className="w-full text-white btn bg-[#101C36]" onClick={handleNextStep}>
                Proceed
              </button>
            </div>
          </form>
        </div>
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
