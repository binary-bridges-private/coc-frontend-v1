import React, { Dispatch, SetStateAction, useState } from "react";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";
import { useAppDispatch } from "../../../../../store/hooks.ts";

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
  data: Register;
  gstRegistratinId: string | null; 
}

interface Registration {
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

const BusinessDetailsForm: React.FC<Props> = ({ setStep, data, gstRegistratinId }) => {
  const [formData, setFormData] = useState<FormData>({
    tradeName: "",
    constitutionOfBusiness: "",
    reasonForRegistration: "",
    commencementDate: "",
    liabilityDate: "",
    isCasualTaxablePerson: false,
    isCompositionOption: false,
    registrations: [{ type: "", number: "", date: "" }],
    document: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleAddRegistration = () => {
    const lastRegistration = formData.registrations[formData.registrations.length - 1];
    const isLastEmpty = !lastRegistration.type && !lastRegistration.number && !lastRegistration.date;

    if (isLastEmpty) {
      return;
    }

    setFormData({
      ...formData,
      registrations: [
        ...formData.registrations,
        { type: "", number: "", date: "" },
      ],
    });
  };

  const handleRemoveRegistration = (id: number) => {
    setFormData({
      ...formData,
      registrations: formData.registrations.filter((reg, idx) => idx !== id),
    });
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      registrations: formData.registrations.map((reg, idx) =>
        idx === id ? { ...reg, [field]: value } : reg
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

  const dispatch = useAppDispatch();

  const handleSave = async (registrationData: FormData) => {
    try {
      const filteredRegistrations = registrationData.registrations.filter(
        reg => reg.type.trim() !== "" || reg.number.trim() !== "" || reg.date.trim() !== ""
      );

      const payload = {
        ...registrationData,
        registrations: filteredRegistrations
      };

      const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, businessDetails : payload })).unwrap();
      console.log('Save successful:', result.data);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  const handleSubmit = async (registrationData: FormData) => {
    console.log(formData);
    if (validateForm()) {
      const success = await handleSave(registrationData);
      if (success) {
        setStep(3);
      }
    }
  };

  // Standardized input class
  const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
  const selectClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white";
  const disabledInputClass = "w-full p-3 border rounded-md bg-gray-100";

  return (
    <>
      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          Details of your Business
        </h2>
      </div>
      <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          {/* Legal Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Legal Name of the Business
            </label>
            <input
              type="text"
              value={data?.businessName}
              className={disabledInputClass}
              disabled
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Permanent Account Number (PAN)
            </label>
            <input
              type="text"
              value={data?.pan}
              className={disabledInputClass}
              disabled
            />
          </div>

          {/* Trade Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Trade Name
            </label>
            <input
              type="text"
              placeholder="Enter Trade Name"
              className={inputClass}
              value={formData.tradeName}
              onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
            />
            {errors.tradeName && (
              <p className="mt-1 text-sm text-red-500">{errors.tradeName}</p>
            )}
          </div>

          {/* Constitution of Business */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Constitution of Business
            </label>
            <select
              className={selectClass}
              value={formData.constitutionOfBusiness}
              onChange={(e) => setFormData({ ...formData, constitutionOfBusiness: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Individual">Individual</option>
              <option value="Partnership">Partnership</option>
              <option value="Company">Company</option>
            </select>
            {errors.constitutionOfBusiness && (
              <p className="mt-1 text-sm text-red-500">{errors.constitutionOfBusiness}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name of the State
            </label>
            <input
              type="text"
              value={data?.state}
              className={disabledInputClass}
              disabled
            />
          </div>

          {/* District */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              value={data?.district}
              className={disabledInputClass}
              disabled
            />
          </div>

          {/* Checkboxes */}
          <div className="flex col-span-2 gap-4">
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm font-medium text-gray-700">
                Are you applying as a casual taxable person?
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={formData.isCasualTaxablePerson}
                onChange={(e) => setFormData({ ...formData, isCasualTaxablePerson: e.target.checked })}
              />
            </label>

            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm font-medium text-gray-700">
                Option for Composition
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={formData.isCompositionOption}
                onChange={(e) => setFormData({ ...formData, isCompositionOption: e.target.checked })}
              />
            </label>
          </div>

          {/* Reason for Registration */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Reason to Obtain Registration
            </label>
            <select
              className={selectClass}
              value={formData.reasonForRegistration}
              onChange={(e) => setFormData({ ...formData, reasonForRegistration: e.target.value })}
            >
              <option value="">Select</option>
              <option value="New Business">Crossing the threshold</option>
              <option value="Expansion">Inter-state supply</option>
              <option value="Expansion">Liability to pay as reciept of goods and services</option>
              <option value="Expansion">Transfer / Succession of business</option>
              <option value="Expansion">Death of the proprietor</option>
              <option value="Expansion">De-merger</option>
              <option value="Expansion">Change in constitution of business</option>
              <option value="Expansion">Merger / Amalgamation</option>
              <option value="Expansion">E-commerce operator</option>
              <option value="Expansion">Selling through e-commerce portal</option>
              <option value="Expansion">Voluntary basis</option>
              <option value="Expansion">Input service distributor only</option>
              <option value="Expansion">Supplies on behalf of other taxable person</option>
              <option value="Expansion">SEZ unit</option>
              <option value="Expansion">SEZ developer</option>
              <option value="Expansion">Others</option>
              <option value="Expansion">Corporate debtor undergoing the corporate insolvency resolution process with IRP/RP</option>


            </select>
            {errors.reasonForRegistration && (
              <p className="mt-1 text-sm text-red-500">{errors.reasonForRegistration}</p>
            )}
          </div>

          {/* Commencement Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date of Commencement of Business
            </label>
            <input
              type="date"
              className={inputClass}
              value={formData.commencementDate}
              onChange={(e) => setFormData({ ...formData, commencementDate: e.target.value })}
            />
            {errors.commencementDate && (
              <p className="mt-1 text-sm text-red-500">{errors.commencementDate}</p>
            )}
          </div>

          {/* Liability Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date on which liability arises
            </label>
            <input
              type="date"
              className={inputClass}
              value={formData.liabilityDate}
              onChange={(e) => setFormData({ ...formData, liabilityDate: e.target.value })}
            />
            {errors.liabilityDate && (
              <p className="mt-1 text-sm text-red-500">{errors.liabilityDate}</p>
            )}
          </div>
        </div>

        {/* Existing Registrations */}
        <h3 className="mt-6 text-lg font-semibold text-gray-700">
          Indicate Existing Registrations
        </h3>

        {formData.registrations.map((reg, idx) => (
          <div key={idx} className="grid grid-cols-3 gap-4 mt-4">
            <select
              className={selectClass}
              value={reg.type}
              onChange={(e) => handleInputChange(idx, "type", e.target.value)}
            >
              <option value="">Select</option>
              <option value="GSTIN">GSTIN</option>
              <option value="TIN">TIN</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Registration No."
              className={inputClass}
              value={reg.number}
              onChange={(e) => handleInputChange(idx, "number", e.target.value)}
            />
            <input
              type="date"
              className={inputClass}
              value={reg.date}
              onChange={(e) => handleInputChange(idx, "date", e.target.value)}
            />

            {/* Remove button */}
            {formData.registrations.length > 1 && (
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => handleRemoveRegistration(idx)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add button */}
        <button
          className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
          onClick={handleAddRegistration}
        >
          ADD REGISTRATION
        </button>

        {/* Document Upload */}
        <h3 className="mt-10 text-lg font-semibold text-gray-700">
          Document Upload
        </h3>
        <div className="flex items-center gap-4 mt-2">
          <input
            type="file"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            onChange={handleFileChange}
          />
          {formData.document && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                {formData.document.name}
              </span>
              <button
                className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => setStep(1)}
          >
            Back
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            onClick={() => handleSubmit(formData)}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default BusinessDetailsForm;