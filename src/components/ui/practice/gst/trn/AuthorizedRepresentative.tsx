import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const AuthorizedRepresentativeForm: React.FC<Props> = ({ setStep }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = () => {
    if (validate()) {
      setStep(6);
    }
  };

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
                  <input type="radio" name="type" value="GST Practitioner" onChange={handleChange} className="radio radio-primary" />
                  <span>GST Practitioner</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="type" value="Other" onChange={handleChange} className="radio radio-primary" />
                  <span>Other</span>
                </label>
              </div>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div>
              <label className="font-semibold label">Enrollment ID</label>
              <input type="text" name="enrollmentId" value={formData.enrollmentId} onChange={handleChange} className="w-full input input-bordered" placeholder="Enter Enrollment ID" />
              {errors.enrollmentId && <p className="text-sm text-red-500">{errors.enrollmentId}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-semibold label">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full input input-bordered" placeholder="First Name" />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label className="font-semibold label">Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full input input-bordered" placeholder="Middle Name" />
              </div>
              <div>
                <label className="font-semibold label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full input input-bordered" placeholder="Last Name" />
              </div>
            </div>

            <div>
              <label className="font-semibold label">Mobile Number</label>
              <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full input input-bordered" placeholder="Mobile Number" />
              {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
            </div>

            <div>
              <label className="font-semibold label">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full input input-bordered" placeholder="Email Address" />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="font-semibold label">Permanent Account Number (PAN)</label>
              <input type="text" name="pan" value={formData.pan} onChange={handleChange} className="w-full input input-bordered" placeholder="PAN" />
              {errors.pan && <p className="text-sm text-red-500">{errors.pan}</p>}
            </div>

            <div>
              <label className="font-semibold label">Aadhaar Number</label>
              <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} className="w-full input input-bordered" placeholder="Aadhaar Number" />
              {errors.aadhaar && <p className="text-sm text-red-500">{errors.aadhaar}</p>}
            </div>
          </form>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button className="btn btn-outline" onClick={() => setStep(4)}>Back</button>
          <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>Save & Continue</button>
        </div>
      </div>
    </div>
  );
};

export default AuthorizedRepresentativeForm;
