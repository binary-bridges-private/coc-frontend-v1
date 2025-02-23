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

const Registration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  return (
    <>
      <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg  breadcrumbs">
        <ul>
          <li className="cursor-pointer" onClick={() => { navigate("/practice") }}>Practice</li>
          <li className="cursor-pointer" onClick={() => { navigate("/practice/gst") }}>Gst</li>
          <li>Registration</li>
        </ul>
      </div>

      {step === 1 &&
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
          <h2 className="mb-4 text-xl font-semibold">New Registration</h2>
          <form className="space-y-4">
            {/* I am a */}
            <div>
              <label className="label">
                <span className="label-text">I am a</span>
              </label>
              <select className="w-full select select-bordered">
                <option>Select</option>
                <option>Individual</option>
                <option>Company</option>
                <option>Partnership</option>
              </select>
            </div>

            {/* State / UT */}
            <div>
              <label className="label">
                <span className="label-text">State / UT</span>
              </label>
              <select className="w-full select select-bordered">
                <option>Select</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select className="w-full select select-bordered">
                <option>Select</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Delhi</option>
              </select>
            </div>

            {/* Legal Name of the Business */}
            <div>
              <label className="label">
                <span className="label-text">Legal Name of the Business (As mentioned in PAN)</span>
              </label>
              <input type="text" placeholder="Enter Legal Name of Business" className="w-full input input-bordered" />
            </div>

            {/* Permanent Account Number (PAN) */}
            <div>
              <label className="label">
                <span className="label-text">Permanent Account Number (PAN)</span>
              </label>
              <input type="text" placeholder="Enter PAN" className="w-full uppercase input input-bordered" />
            </div>

            {/* Email Address */}
            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input type="email" placeholder="Enter Email Address" className="w-full input input-bordered" />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <div className="flex gap-2">
                <span className="flex items-center justify-center w-16 input input-bordered">+91</span>
                <input type="text" placeholder="Enter Mobile Number" className="w-full input input-bordered" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4" onClick={() => setStep(2)}>
              <button className="w-full text-white btn bg-[#101C36]">Submit</button>
            </div>
          </form>
        </div>}
      {step === 2 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={0} />
          <BusinessDetailsForm setStep={setStep} />
        </div>}
      {step === 3 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={1} />
          <Promoter setStep={setStep} />
        </div>}
      {step === 4 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={2} />
          <AuthorizedSignatory setStep={setStep} />
        </div>}
      {step === 5 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={3} />
          <AuthorizedRepresentativeForm setStep={setStep} />
        </div>}
      {step === 6 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={4} />
          <Place setStep={setStep} />
        </div>}
      {step === 7 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={6} />
          <GoodsServices setStep={setStep} />
        </div>}
      {step === 8 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={7} />
          <StateSpecificInfo setStep={setStep} />
        </div>}
      {step === 9 &&
        <div className="min-h-screen p-8 bg-gray-100">
          <TopBar curr={8} />
          <AdhaarAuth setStep={setStep} />
        </div>}
    </>
  );
};

export default Registration;
