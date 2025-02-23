import React, { Dispatch, SetStateAction, useState } from "react";

interface props {
  setStep: Dispatch<SetStateAction<number>>
}

const AuthorizedRepresentativeForm: React.FC<props> = ({ setStep }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
  <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md">
    <label className="flex items-center mb-4 space-x-2">
      <span className="text-lg font-semibold">Do you have any Authorized Representative?</span>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={isEnabled}
        onChange={() => setIsEnabled(!isEnabled)}
      />
    </label>

    {isEnabled && (
      <form className="grid grid-cols-1 gap-4">
        <div>
          <label className="font-semibold label">Type of Authorized Representative</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="type" className="radio radio-primary" />
              <span>GST Practitioner</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="type" className="radio radio-primary" />
              <span>Other</span>
            </label>
          </div>
        </div>

        <div>
          <label className="font-semibold label">Enrollment ID</label>
          <div className="flex space-x-2">
            <input type="text" className="w-full input input-bordered" placeholder="Enter Enrollment ID" />
            <button type="button" className="btn btn-outline">Search</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="font-semibold label">First Name</label>
            <input type="text" className="w-full input input-bordered" placeholder="First Name" />
          </div>
          <div>
            <label className="font-semibold label">Middle Name</label>
            <input type="text" className="w-full input input-bordered" placeholder="Middle Name" />
          </div>
          <div>
            <label className="font-semibold label">Last Name</label>
            <input type="text" className="w-full input input-bordered" placeholder="Last Name" />
          </div>
        </div>

        <div>
          <label className="font-semibold label">Designation / Status</label>
          <input type="text" className="w-full input input-bordered" placeholder="Designation / Status" />
        </div>

        <div>
          <label className="font-semibold label">Mobile Number</label>
          <input type="text" className="w-full input input-bordered" placeholder="Mobile Number" />
        </div>

        <div>
          <label className="font-semibold label">Email Address</label>
          <input type="email" className="w-full input input-bordered" placeholder="Email Address" />
        </div>

        <div>
          <label className="font-semibold label">Permanent Account Number (PAN)</label>
          <input type="text" className="w-full input input-bordered" placeholder="Permanent Account Number (PAN)" />
        </div>

        <div>
          <label className="font-semibold label">Aadhaar Number</label>
          <input type="text" className="w-full input input-bordered" placeholder="Aadhaar Number" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold label">Telephone Number (STD Code)</label>
            <input type="text" className="w-full input input-bordered" placeholder="Telephone Number (STD Code)" />
          </div>
          <div>
            <label className="font-semibold label">FAX Number (STD Code)</label>
            <input type="text" className="w-full input input-bordered" placeholder="FAX Number (STD Code)" />
          </div>
        </div>
      </form>
    )}
    
    <div className="flex justify-end gap-4 mt-6">
      <button className="btn btn-outline" onClick={() => setStep(4)}>Back</button>
      <button className="btn bg-[#101C36] text-white" onClick={() => setStep(6)}>Save & Continue</button>
    </div>
  </div>
</div>

  );
}

export default AuthorizedRepresentativeForm;
