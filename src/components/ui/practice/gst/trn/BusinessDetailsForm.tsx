// import React, { Dispatch, SetStateAction, useState } from "react";

// interface props {
//   setStep: Dispatch<SetStateAction<number>>
// }

// const BusinessDetailsForm: React.FC<props> = ({ setStep }) => {
//   const [registrations, setRegistrations] = useState([{ id: Date.now(), type: "", number: "", date: "" }]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // Handle Add Registration
//   const handleAddRegistration = () => {
//     setRegistrations([...registrations, { id: Date.now(), type: "", number: "", date: "" }]);
//   };

//   // Handle Remove Registration
//   const handleRemoveRegistration = (id: number) => {
//     setRegistrations(registrations.filter((reg) => reg.id !== id));
//   };

//   // Handle Input Change
//   const handleInputChange = (id: number, field: string, value: string) => {
//     setRegistrations(
//       registrations.map((reg) =>
//         reg.id === id ? { ...reg, [field]: value } : reg
//       )
//     );
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   // Handle File Removal
//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//   };

//   return (
//     <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="mb-4 text-xl font-bold">Details of your Business</h2>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-medium label">Legal Name of the Business</label>
//           <input type="text" value="ASHUTOSH NEGI" className="w-full input input-bordered" disabled />
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Permanent Account Number (PAN)</label>
//           <input type="text" value="DBCPN9221G" className="w-full input input-bordered" disabled />
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Trade Name</label>
//           <input type="text" placeholder="Enter Trade Name" className="w-full input input-bordered" />
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Constitution of Business</label>
//           <select className="w-full select select-bordered">
//             <option>Select</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Name of the State</label>
//           <input type="text" value="Delhi" className="w-full input input-bordered" disabled />
//         </div>

//         <div>
//           <label className="text-sm font-medium label">District</label>
//           <select className="w-full select select-bordered">
//             <option>South East Delhi</option>
//           </select>
//         </div>

//         <div className="flex col-span-2 gap-4">
//           <label className="flex items-center cursor-pointer label">
//             <span className="mr-2 text-sm font-medium">Are you applying as a casual taxable person?</span>
//             <input type="checkbox" className="toggle toggle-primary" />
//           </label>

//           <label className="flex items-center cursor-pointer label">
//             <span className="mr-2 text-sm font-medium">Option for Composition</span>
//             <input type="checkbox" className="toggle toggle-primary" />
//           </label>
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Reason to Obtain Registration</label>
//           <select className="w-full select select-bordered">
//             <option>Select</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Date of Commencement of Business</label>
//           <input type="date" className="w-full input input-bordered" />
//         </div>

//         <div>
//           <label className="text-sm font-medium label">Date on which liability arises</label>
//           <input type="date" className="w-full input input-bordered" />
//         </div>
//       </div>

//       {/* Existing Registrations */}
//       <h3 className="mt-6 text-lg font-semibold">Indicate Existing Registrations</h3>

//       {registrations.map((reg) => (
//         <div key={reg.id} className="grid grid-cols-3 gap-4 mt-2 text-sm font-medium">
//           <select className="select select-bordered" value={reg.type} onChange={(e) => handleInputChange(reg.id, "type", e.target.value)}>
//             <option value="">Select</option>
//             <option value="GSTIN">GSTIN</option>
//             <option value="TIN">TIN</option>
//             <option value="Other">Other</option>
//           </select>
//           <input type="text" placeholder="Registration No." className="input input-bordered" value={reg.number} onChange={(e) => handleInputChange(reg.id, "number", e.target.value)} />
//           <input type="date" className="input input-bordered" value={reg.date} onChange={(e) => handleInputChange(reg.id, "date", e.target.value)} />

//           {/* Remove button */}
//           {registrations.length > 1 && (
//             <button className="mt-1 btn btn-error btn-sm" onClick={() => handleRemoveRegistration(reg.id)}>Cancel</button>
//           )}
//         </div>
//       ))}

//       {/* Add button */}
//       <button className="mt-4 btn btn-outline btn-sm" onClick={handleAddRegistration}>ADD</button>

//       {/* Document Upload */}
//       <h3 className="mt-10 font-semibold text-md">Document Upload</h3>
//       <div className="flex items-center gap-4">
//         <input type="file" className="w-full file-input file-input-bordered" onChange={handleFileChange} />
//         {selectedFile && (
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium">{selectedFile.name}</span>
//             <button className="btn btn-error btn-sm" onClick={handleRemoveFile}>Remove</button>
//           </div>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-4 mt-6">
//         <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
//         <button className="btn bg-[#101C36] text-white" onClick={() => setStep(3)} >Save & Continue</button>
//       </div>
//     </div>
//   );
// };

// export default BusinessDetailsForm;

import React, { Dispatch, SetStateAction, useState } from "react";

interface Register {
  userType: string;
  state: string;
  district: string;
  businessName: string;
  pan: string;
  email: string;
  mobileNumber: string;
}


interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  data: Register
}

interface Registration {
  id: number;
  type: string;
  number: string;
  date: string;
}

interface FormData {
  tradeName: string;
  constitutionOfBusiness: string;
  reasonForRegistration: string;
  commencementDate: string;
  liabilityDate: string;
  isCasualTaxablePerson: boolean;
  isCompositionOption: boolean;
  registrations: Registration[];
  document: File | null;
}

const BusinessDetailsForm: React.FC<Props> = ({ setStep, data }) => {
  const [formData, setFormData] = useState<FormData>({
    tradeName: "",
    constitutionOfBusiness: "",
    reasonForRegistration: "",
    commencementDate: "",
    liabilityDate: "",
    isCasualTaxablePerson: false,
    isCompositionOption: false,
    registrations: [{ id: Date.now(), type: "", number: "", date: "" }],
    document: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleAddRegistration = () => {
    setFormData({
      ...formData,
      registrations: [
        ...formData.registrations,
        { id: Date.now(), type: "", number: "", date: "" },
      ],
    });
  };

  const handleRemoveRegistration = (id: number) => {
    setFormData({
      ...formData,
      registrations: formData.registrations.filter((reg) => reg.id !== id),
    });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      registrations: formData.registrations.map((reg) =>
        reg.id === id ? { ...reg, [field]: value } : reg
      ),
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFormData({ ...formData, document: event.target.files[0] });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, document: null });
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.tradeName) newErrors.tradeName = "Trade Name is required";
    if (!formData.constitutionOfBusiness)
      newErrors.constitutionOfBusiness = "Constitution of Business is required";
    if (!formData.reasonForRegistration)
      newErrors.reasonForRegistration = "Reason for Registration is required";
    if (!formData.commencementDate)
      newErrors.commencementDate = "Commencement Date is required";
    if (!formData.liabilityDate)
      newErrors.liabilityDate = "Liability Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    console.log(formData);
    if (validateForm()) {
      setStep(3);
    }
  };

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Details of your Business</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium label">Legal Name of the Business</label>
          <input type="text" value={data?.businessName} className="w-full input input-bordered" disabled />
        </div>

        <div>
          <label className="text-sm font-medium label">Permanent Account Number (PAN)</label>
          <input type="text" value={data?.pan} className="w-full input input-bordered" disabled />
        </div>

        <div>
          <label className="text-sm font-medium label">Trade Name</label>
          <input
            type="text"
            placeholder="Enter Trade Name"
            className="w-full input input-bordered"
            value={formData.tradeName}
            onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
          />
          {errors.tradeName && <p className="text-sm text-red-500">{errors.tradeName}</p>}
        </div>

        <div>
          <label className="text-sm font-medium label">Constitution of Business</label>
          <select
            className="w-full select select-bordered"
            value={formData.constitutionOfBusiness}
            onChange={(e) => setFormData({ ...formData, constitutionOfBusiness: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Individual">Individual</option>
            <option value="Partnership">Partnership</option>
            <option value="Company">Company</option>
          </select>
          {errors.constitutionOfBusiness && (
            <p className="text-sm text-red-500">{errors.constitutionOfBusiness}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium label">Name of the State</label>
          <input type="text" value={data?.state} className="w-full input input-bordered" disabled />
        </div>

        <div>
          <label className="text-sm font-medium label">District</label>
          <input type="text" value={data?.district} className="w-full input input-bordered" />
        </div>

        <div className="flex col-span-2 gap-4">
          <label className="flex items-center cursor-pointer label">
            <span className="mr-2 text-sm font-medium">Are you applying as a casual taxable person?</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={formData.isCasualTaxablePerson}
              onChange={(e) => setFormData({ ...formData, isCasualTaxablePerson: e.target.checked })}
            />
          </label>

          <label className="flex items-center cursor-pointer label">
            <span className="mr-2 text-sm font-medium">Option for Composition</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={formData.isCompositionOption}
              onChange={(e) => setFormData({ ...formData, isCompositionOption: e.target.checked })}
            />
          </label>
        </div>

        <div>
          <label className="text-sm font-medium label">Reason to Obtain Registration</label>
          <select
            className="w-full select select-bordered"
            value={formData.reasonForRegistration}
            onChange={(e) => setFormData({ ...formData, reasonForRegistration: e.target.value })}
          >
            <option value="">Select</option>
            <option value="New Business">New Business</option>
            <option value="Expansion">Expansion</option>
          </select>
          {errors.reasonForRegistration && (
            <p className="text-sm text-red-500">{errors.reasonForRegistration}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium label">Date of Commencement of Business</label>
          <input
            type="date"
            className="w-full input input-bordered"
            value={formData.commencementDate}
            onChange={(e) => setFormData({ ...formData, commencementDate: e.target.value })}
          />
          {errors.commencementDate && (
            <p className="text-sm text-red-500">{errors.commencementDate}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium label">Date on which liability arises</label>
          <input
            type="date"
            className="w-full input input-bordered"
            value={formData.liabilityDate}
            onChange={(e) => setFormData({ ...formData, liabilityDate: e.target.value })}
          />
          {errors.liabilityDate && <p className="text-sm text-red-500">{errors.liabilityDate}</p>}
        </div>
      </div>

      {/* Existing Registrations */}
      <h3 className="mt-6 text-lg font-semibold">Indicate Existing Registrations</h3>

      {formData.registrations.map((reg) => (
        <div key={reg.id} className="grid grid-cols-3 gap-4 mt-2 text-sm font-medium">
          <select
            className="select select-bordered"
            value={reg.type}
            onChange={(e) => handleInputChange(reg.id, "type", e.target.value)}
          >
            <option value="">Select</option>
            <option value="GSTIN">GSTIN</option>
            <option value="TIN">TIN</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Registration No."
            className="input input-bordered"
            value={reg.number}
            onChange={(e) => handleInputChange(reg.id, "number", e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered"
            value={reg.date}
            onChange={(e) => handleInputChange(reg.id, "date", e.target.value)}
          />

          {/* Remove button */}
          {formData.registrations.length > 1 && (
            <button className="mt-1 btn btn-error btn-sm" onClick={() => handleRemoveRegistration(reg.id)}>
              Cancel
            </button>
          )}
        </div>
      ))}

      {/* Add button */}
      <button className="mt-4 btn btn-outline btn-sm" onClick={handleAddRegistration}>
        ADD
      </button>

      {/* Document Upload */}
      <h3 className="mt-10 font-semibold text-md">Document Upload</h3>
      <div className="flex items-center gap-4">
        <input type="file" className="w-full file-input file-input-bordered" onChange={handleFileChange} />
        {formData.document && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{formData.document.name}</span>
            <button className="btn btn-error btn-sm" onClick={handleRemoveFile}>
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="btn btn-outline" onClick={() => setStep(1)}>
          Back
        </button>
        <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;