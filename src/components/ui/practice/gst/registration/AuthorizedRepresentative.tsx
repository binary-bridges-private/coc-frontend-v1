import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks.ts";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  gstRegistratinId: string | null;
}

const AuthorizedRepresentativeForm: React.FC<Props> = ({ setStep, gstRegistratinId }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    enrollmentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    designation: "",
    mobileNumber: "",
    email: "",
    pan: "",
    aadhaar: "",
    telephone: "",
    fax: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Standardized input classes
  const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
  const selectClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.enrollmentId) newErrors.enrollmentId = "Enrollment ID is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile Number is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.pan) newErrors.pan = "PAN is required";
    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar Number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useAppDispatch();

  const handleSave = async (data: any) => {
    try {
      const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, authorizedRepresentative: data })).unwrap();
      console.log('Save successful:', result.data);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  const handleSubmit = async (data: any) => {
    if (isEnabled && !validate()) return;
    const success = await handleSave(data);
    if (success) {
      setStep(6);
    }
  };

  return (
    <>
      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          Authorized Representative Details
        </h2>
      </div>
      <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 mb-6 rounded-md bg-gray-50">
          <span className="text-lg font-semibold text-gray-700">
            Do you have any Authorized Representative?
          </span>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isEnabled}
              onChange={() => setIsEnabled(!isEnabled)}
            />
          </label>
        </div>

        {isEnabled && (
          <div className="space-y-6">
            <div className="p-4 border rounded-md">
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700 text-md">
                  Type of Authorized Representative
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="type"
                      value="GST Practitioner"
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    <span>GST Practitioner</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="type"
                      value="Other"
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    <span>Other</span>
                  </label>
                </div>
                {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
              </div>

              <div className="mt-10 mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enrollment ID
                </label>
                <input
                  type="text"
                  name="enrollmentId"
                  value={formData.enrollmentId}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter Enrollment ID"
                />
                {errors.enrollmentId && <p className="mt-1 text-sm text-red-500">{errors.enrollmentId}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="First Name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Middle Name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Mobile Number"
                />
                {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Email Address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Permanent Account Number (PAN)
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="PAN"
                  />
                  {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Aadhaar Number"
                  />
                  {errors.aadhaar && <p className="mt-1 text-sm text-red-500">{errors.aadhaar}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => setStep(4)}
          >
            Back
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => handleSubmit(formData)}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthorizedRepresentativeForm;