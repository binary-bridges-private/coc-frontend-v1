// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// interface props {
//   setStep: Dispatch<SetStateAction<number>>,
//   authorizedSign: any,
// }

// const Verification: React.FC<props> = ({ setStep, authorizedSign }) => {
//   const [formData, setFormData] = useState({
//     signatory: "",
//     place: "",
//     designation: "",
//     agreed: false,
//   });

//   const isFormValid =
//     formData.signatory && formData.place && formData.designation && formData.agreed;

//   return (
//     <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="flex items-center mb-4 text-lg font-semibold">
//         <span className="mr-2">👍</span> Verification
//       </h2>
//       <div className="p-4 text-sm font-medium bg-gray-100 border rounded-lg">
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             className="checkbox checkbox-success"
//             checked={formData.agreed}
//             onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
//           />
//           <span>
//             I hereby solemnly affirm and declare that the information given herein above is true and correct to the
//             best of my knowledge and belief and nothing has been concealed therefrom.
//           </span>
//         </label>
//       </div>

//       <div className="mt-4 space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Name of Authorized Signatory<span className="text-red-500">*</span></label>
//           <select
//             className="w-full select select-bordered"
//             value={formData.signatory}
//             onChange={(e) => setFormData({ ...formData, signatory: e.target.value })}
//           >
//             <option value="">Select</option>
//             <option value="John Doe">John Doe</option>
//             <option value="Jane Smith">Jane Smith</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Place<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             className="w-full input input-bordered"
//             placeholder="Enter Place"
//             value={formData.place}
//             onChange={(e) => setFormData({ ...formData, place: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Designation / Status<span className="text-red-500">*</span></label>
//           <input
//             type="text"
//             className="w-full input input-bordered"
//             value={formData.designation}
//             onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Date<span className="text-red-500">*</span></label>
//           <input type="text" className="w-full input input-bordered" value="23/02/2025" disabled />
//         </div>
//       </div>

//       <div className="mt-4 text-sm text-blue-600">
//         <a href="#" className="hover:underline">⚠ Facing problem using DSC? Click here for help</a>
//       </div>

//       <div className="p-3 mt-4 text-sm text-yellow-800 bg-yellow-100 rounded-lg">
//         Submit buttons will get enabled only after all mandatory fields are filled. Please check that you have filled all mandatory fields in the Form.
//       </div>

//       <div className="flex justify-end gap-2 mt-6">
//         <button className="btn btn-outline" onClick={() => setStep(10)}>Back</button>
//         <button className="btn btn-primary" disabled={!isFormValid}>Submit with DSC</button>
//         <button className="btn btn-primary" disabled={!isFormValid}>Submit with EVC</button>
//         <button className="btn btn-primary" onClick={() => setStep(12)}>Submit</button>

//       </div>
//     </div>
//   );
// };

// export default Verification;

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  setStep: Dispatch<SetStateAction<number>>;
  authorizedSign: { firstName: string; middleName?: string; lastName: string }[];
}

const Verification: React.FC<props> = ({ setStep, authorizedSign }) => {
  const [formData, setFormData] = useState({
    signatory: "",
    place: "",
    designation: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({
    signatory: "",
    place: "",
    designation: "",
    agreed: "",
  });

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      signatory: !formData.signatory ? "Please select an authorized signatory." : "",
      place: !formData.place ? "Please enter the place." : "",
      designation: !formData.designation ? "Please enter the designation." : "",
      agreed: !formData.agreed ? "You must agree to the declaration." : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error); // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      console.log("Form submitted:", formData);
      setStep(12); // Proceed to the next step
    }
  };

  // Check if the form is valid
  const isFormValid =
    formData.signatory && formData.place && formData.designation && formData.agreed;

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="flex items-center mb-4 text-lg font-semibold">
        <span className="mr-2">👍</span> Verification
      </h2>
      <div className="p-4 text-sm font-medium bg-gray-100 border rounded-lg">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            checked={formData.agreed}
            onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
          />
          <span>
            I hereby solemnly affirm and declare that the information given herein above is true and correct to the
            best of my knowledge and belief and nothing has been concealed therefrom.
          </span>
        </label>
        {errors.agreed && <p className="mt-2 text-sm text-red-500">{errors.agreed}</p>}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name of Authorized Signatory<span className="text-red-500">*</span></label>
          <select
            className="w-full select select-bordered"
            value={formData.signatory}
            onChange={(e) => setFormData({ ...formData, signatory: e.target.value })}
          >
            <option value="">Select</option>
            {authorizedSign.map((signatory, index) => (
              <option key={index} value={`${signatory.firstName} ${signatory.middleName || ""} ${signatory.lastName}`}>
                {`${signatory.firstName} ${signatory.middleName || ""} ${signatory.lastName}`}
              </option>
            ))}
          </select>
          {errors.signatory && <p className="mt-2 text-sm text-red-500">{errors.signatory}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Place<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full input input-bordered"
            placeholder="Enter Place"
            value={formData.place}
            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
          />
          {errors.place && <p className="mt-2 text-sm text-red-500">{errors.place}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Designation / Status<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full input input-bordered"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
          />
          {errors.designation && <p className="mt-2 text-sm text-red-500">{errors.designation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Date<span className="text-red-500">*</span></label>
          <input type="text" className="w-full input input-bordered" value={Date.now()} disabled />
        </div>
      </div>


      <div className="p-3 mt-4 text-sm text-yellow-800 bg-yellow-100 rounded-lg">
        Submit buttons will get enabled only after all mandatory fields are filled. Please check that you have filled all mandatory fields in the Form.
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button className="btn btn-outline" onClick={() => setStep(10)}>Back</button>
        <button className="btn btn-primary" disabled={true} onClick={handleSubmit}>Submit with DSC</button>
        <button className="btn btn-primary" disabled={true} onClick={handleSubmit}>Submit with EVC</button>
        <button className="btn btn-primary" disabled={!isFormValid} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Verification;