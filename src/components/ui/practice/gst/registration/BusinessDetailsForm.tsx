import React, { Dispatch, SetStateAction, useState } from "react";

interface props {
  setStep: Dispatch<SetStateAction<number>>
}

const BusinessDetailsForm: React.FC<props> = ({ setStep }) => {
  const [registrations, setRegistrations] = useState([{ id: Date.now(), type: "", number: "", date: "" }]);

  // Handle Add Registration
  const handleAddRegistration = () => {
    setRegistrations([...registrations, { id: Date.now(), type: "", number: "", date: "" }]);
  };

  // Handle Remove Registration
  const handleRemoveRegistration = (id: number) => {
    setRegistrations(registrations.filter((reg) => reg.id !== id));
  };

  // Handle Input Change
  const handleInputChange = (id: number, field: string, value: string) => {
    setRegistrations(
      registrations.map((reg) =>
        reg.id === id ? { ...reg, [field]: value } : reg
      )
    );
  };

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Details of your Business</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium label">Legal Name of the Business</label>
          <input type="text" value="ASHUTOSH NEGI" className="w-full input input-bordered" disabled />
        </div>

        <div>
          <label className="text-sm font-medium label">Permanent Account Number (PAN)</label>
          <input type="text" value="DBCPN9221G" className="w-full input input-bordered" disabled />
        </div>

        <div>
          <label className="text-sm font-medium label">Trade Name</label>
          <input type="text" placeholder="Enter Trade Name" className="w-full input input-bordered" />
        </div>

        <div>
          <label className="text-sm font-medium label">Constitution of Business</label>
          <select className="w-full select select-bordered">
            <option>Select</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium label">Name of the State</label>
          <input type="text" value="Delhi" className="w-full input input-bordered" disabled />
        </div>

        <div>
          <label className="text-sm font-medium label">District</label>
          <select className="w-full select select-bordered">
            <option>South East Delhi</option>
          </select>
        </div>

        <div className="flex col-span-2 gap-4">
          <label className="flex items-center cursor-pointer label">
            <span className="mr-2 text-sm font-medium">Are you applying as a casual taxable person?</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </label>

          <label className="flex items-center cursor-pointer label">
            <span className="mr-2 text-sm font-medium">Option for Composition</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium label">Reason to Obtain Registration</label>
          <select className="w-full select select-bordered">
            <option>Select</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium label">Date of Commencement of Business</label>
          <input type="date" className="w-full input input-bordered" />
        </div>

        <div>
          <label className="text-sm font-medium label">Date on which liability arises</label>
          <input type="date" className="w-full input input-bordered" />
        </div>
      </div>

      {/* Existing Registrations */}
      <h3 className="mt-6 text-lg font-semibold">Indicate Existing Registrations</h3>

      {registrations.map((reg) => (
        <div key={reg.id} className="grid grid-cols-3 gap-4 mt-2 text-sm font-medium">
          <select className="select select-bordered" value={reg.type} onChange={(e) => handleInputChange(reg.id, "type", e.target.value)}>
            <option value="">Select</option>
            <option value="GSTIN">GSTIN</option>
            <option value="TIN">TIN</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Registration No." className="input input-bordered" value={reg.number} onChange={(e) => handleInputChange(reg.id, "number", e.target.value)} />
          <input type="date" className="input input-bordered" value={reg.date} onChange={(e) => handleInputChange(reg.id, "date", e.target.value)} />

          {/* Remove button */}
          {registrations.length > 1 && (
            <button className="mt-1 btn btn-error btn-sm" onClick={() => handleRemoveRegistration(reg.id)}>Cancel</button>
          )}
        </div>
      ))}

      {/* Add button */}
      <button className="mt-4 btn btn-outline btn-sm" onClick={handleAddRegistration}>ADD</button>

      {/* Document Upload */}
      <h3 className="mt-10 font-semibold text-md">Document Upload</h3>
      <input type="file" className="w-full file-input file-input-bordered" />

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
        <button className="btn bg-[#101C36] text-white" onClick={() => setStep(3)} >Save & Continue</button>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;
