
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks.ts";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  authorizedSign: { firstName: string; middleName?: string; lastName: string }[];
  promoterData: any;
  gstRegistratinId: string | null;
}

interface Promoter {
  firstName: string;
  middleName: string;
  lastName: string;
  isIndianCitizen: boolean;
  isPromoter: boolean;
  isAuthorizedSignatory: boolean;
  designation: string;
  email: string;
  mobileNumber: string;
  aadhaarNumber?: string;
  photograph?: boolean;
}

const Verification: React.FC<Props> = ({ setStep, authorizedSign, promoterData, gstRegistratinId }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    signatory: "yes",
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [gstrinNumber, setGstrinNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);


  // Format current date as DD/MM/YYYY
  const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [currentDate] = useState(formatDate());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const newErrors = {
      signatory: !formData.signatory ? "Please select an authorized signatory." : "",
      place: !formData.place ? "Please enter the place." : "",
      designation: !formData.designation ? "Please enter the designation." : "",
      agreed: !formData.agreed ? "You must agree to the declaration." : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const generateGSTRIN = () => {
    // This is a mock function to generate a sample GSTRIN number
    const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
    return `22AAAAA0000A1Z${randomPart}`;
  };

  const dispatch = useAppDispatch();

  const handleSave = async (generatedGstrin: string) => {
    setIsLoading(true);
    setSaveError(null);
    try {
      const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, verification: formData, gstIn: generatedGstrin })).unwrap();
      console.log('Save successful:', result.data);
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      setSaveError('Failed to save registration. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const isValid = validateForm();
    const generatedGstrin = generateGSTRIN();
    setGstrinNumber(generatedGstrin);
    const success = await handleSave(generatedGstrin);

    if (isValid && success) {
      console.log("Form submitted:", formData);
      // Generate a sample GSTRIN number
      setShowSuccessModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gstrinNumber);
    // You can add a toast or some visual feedback here
    alert("GSTRIN number copied to clipboard!");
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setStep(12); // Move to next step after closing modal
  };

  const isFormValid = formData.signatory && formData.place && formData.designation && formData.agreed;

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Success!</h3>
              <div className="mt-4">
                <p className="text-gray-600">Your application has been submitted successfully.</p>
                <p className="mt-2 font-medium">Your GSTRIN Number:</p>
                <div className="flex items-center justify-between px-4 py-2 mt-2 bg-gray-100 rounded-md">
                  <span className="font-mono text-gray-800">{gstrinNumber}</span>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Copy to clipboard"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => { navigate("/practice/gst") }}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          Verification
        </h2>
      </div>
      <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-4 mb-6 text-sm font-medium border rounded-lg bg-gray-50">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 checkbox checkbox-success"
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

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name of Authorized Signatory <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.signatory}
              onChange={(e) => setFormData({ ...formData, signatory: e.target.value })}
            >
              <option value="">Select</option>
              {promoterData && promoterData.map((promoter: Promoter, index) => (
                <option
                  key={index}
                  value={`${promoter.firstName} ${promoter.middleName || ""} ${promoter.lastName}`}
                >
                  {`${promoter.firstName} ${promoter.middleName || ""} ${promoter.lastName}`}
                </option>
              ))}
              {authorizedSign && authorizedSign.map((signatory, index) => (
                <option
                  key={index}
                  value={`${signatory.firstName} ${signatory.middleName || ""} ${signatory.lastName}`}
                >
                  {`${signatory.firstName} ${signatory.middleName || ""} ${signatory.lastName}`}
                </option>
              ))}
            </select>
            {errors.signatory && <p className="mt-1 text-sm text-red-500">{errors.signatory}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Place <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Place"
              value={formData.place}
              onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            />
            {errors.place && <p className="mt-1 text-sm text-red-500">{errors.place}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Designation / Status <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            />
            {errors.designation && <p className="mt-1 text-sm text-red-500">{errors.designation}</p>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md bg-gray-50"
              value={currentDate}
              disabled
            />
          </div>
        </div>

        <div className="p-4 mt-4 text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md">
          Submit buttons will get enabled only after all mandatory fields are filled.
          Please check that you have filled all mandatory fields in the Form.
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => setStep(10)}
          >
            Back
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-gray-400 rounded-md cursor-not-allowed"
            disabled
          >
            Submit with DSC
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-gray-400 rounded-md cursor-not-allowed"
            disabled
          >
            Submit with EVC
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submiting...
              </div>
            ) : (
              'Next'
            )}
          </button>
        </div>
        {saveError && (
          <div className="mt-2 text-sm text-red-500">{saveError}</div>
        )}
      </div>
    </>
  );
};

export default Verification;