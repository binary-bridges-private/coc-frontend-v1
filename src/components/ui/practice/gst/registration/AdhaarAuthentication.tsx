import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks.ts";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    promoterData: any;
    authorizedSign: any;
    gstRegistratinId: string | null;
}

interface Promoter {
    isIndianCitizen: boolean;
    isPromoter: boolean;
    isAuthorizedSignatory: boolean;
    designation: string;
    email: string;
    mobileNumber: string;
    aadhaarNumber?: string;
    photograph?: boolean;
}

const AdhaarAuth: React.FC<Props> = ({ setStep, promoterData, authorizedSign, gstRegistratinId }) => {
    const [isAadhaarAuth, setIsAadhaarAuth] = useState(false);
    const [selectedPromoter, setSelectedPromoter] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAadhaarAuth(e.target.value === "yes");
        setSelectedPromoter(null);
        setError(null);
    };

    const handlePromoterSelection = (id: number) => {
        setSelectedPromoter(selectedPromoter === id ? null : id);
        setError(null);
    };

    const dispatch = useAppDispatch();

    const handleSave = async () => {
        setIsLoading(true);
        setSaveError(null);
        try {
            const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, isAdhaarAuth: isAadhaarAuth })).unwrap();
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
        if (isAadhaarAuth && selectedPromoter === null) {
            setError("Please select at least one promoter.");
            return;
        }
        const success = await handleSave();

        if (success) setStep(11);
    };

    return (
        <>
            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Aadhaar Authentication
                </h2>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                <div className="mb-6">
                    <label className="block mb-4 text-lg font-semibold text-gray-700">
                        Do you want to opt for Aadhaar Authentication of details of
                        Promoter/Partner, Primary Authorized Signatory added by you? *
                    </label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="aadhaarAuth"
                                value="no"
                                checked={!isAadhaarAuth}
                                onChange={handleToggle}
                                className="radio radio-primary"
                            />
                            <span>No</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="aadhaarAuth"
                                value="yes"
                                checked={isAadhaarAuth}
                                onChange={handleToggle}
                                className="radio radio-primary"
                            />
                            <span>Yes</span>
                        </label>
                    </div>
                </div>

                {isAadhaarAuth ? (
                    <div className="space-y-4">
                        <div className="p-4 rounded-md bg-blue-50">
                            <p className="text-sm text-gray-700">
                                1. Authentication request shall be shared on mobile number, email upon
                                submission of application of Promoter/Partner, and Primary Authorized
                                Signatory which are selected.
                            </p>
                            <p className="mt-2 text-sm text-gray-700">
                                2. ARN would be generated once Aadhaar Authentication exercise is
                                completed for all applicable persons whose name are selected in this
                                table.
                            </p>
                            <p className="mt-2 text-sm text-gray-700">
                                3. Kindly select one person from Promoter/Partner for Aadhaar
                                Authentication.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 rounded-md bg-red-50">
                            <p className="text-sm text-red-600">
                                1. If you wish you can upload E-KYC documents for Primary Authorized
                                Signatory and one Promoter/Partner to proceed further.
                            </p>
                            <p className="mt-2 text-sm text-red-600">
                                2. You would be required to visit the designated GSK for Photo
                                Capturing and Document Verification. ARN would be generated once both
                                the processes are completed for all applicable persons whose names are
                                selected in this table.
                            </p>
                            <p className="mt-2 text-sm text-red-600">
                                3. Kindly select one person from Promoter/Partner for Photo Capturing
                                and Document Verification.
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-6 overflow-x-auto">
                    <table className="table w-full border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-sm font-medium text-left text-gray-700 border">Select</th>
                                <th className="p-3 text-sm font-medium text-left text-gray-700 border">Sl No</th>
                                <th className="p-3 text-sm font-medium text-left text-gray-700 border">Citizen/Resident</th>
                                <th className="p-3 text-sm font-medium text-left text-gray-700 border">Promoter/Partner</th>
                                <th className="p-3 text-sm font-medium text-left text-gray-700 border">Authorized Signatory</th>
                                <th className="p-3 text-sm font-medium text-left text-gray-700 border">Designation</th>
                                {isAadhaarAuth ? (
                                    <>
                                        <th className="p-3 text-sm font-medium text-left text-gray-700 border">Email</th>
                                        <th className="p-3 text-sm font-medium text-left text-gray-700 border">Mobile</th>
                                        <th className="p-3 text-sm font-medium text-left text-gray-700 border">Status</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="p-3 text-sm font-medium text-left text-gray-700 border">Aadhaar ID</th>
                                        <th className="p-3 text-sm font-medium text-left text-gray-700 border">Document</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {promoterData && Array.isArray(promoterData) && promoterData.map((promoter: Promoter, index: number) => (
                                <tr key={index} className="border hover:bg-gray-50">
                                    <td className="p-3 border">
                                        <input
                                            type="checkbox"
                                            checked={selectedPromoter === index}
                                            onChange={() => handlePromoterSelection(index)}
                                            className="checkbox checkbox-primary"
                                        />
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 border">{index + 1}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{promoter.isIndianCitizen ? "Yes" : "No"}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{promoter.isPromoter ? "Yes" : "No"}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{promoter.isAuthorizedSignatory ? "Yes" : "No"}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{promoter.designation}</td>
                                    {isAadhaarAuth ? (
                                        <>
                                            <td className="p-3 text-sm text-gray-700 border">{promoter.email}</td>
                                            <td className="p-3 text-sm text-gray-700 border">{promoter.mobileNumber}</td>
                                            <td className="p-3 text-sm text-gray-700 border">NA</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-3 text-sm text-gray-700 border">{promoter.aadhaarNumber || "NA"}</td>
                                            <td className="p-3 text-sm text-gray-700 border">{promoter.photograph ? "Uploaded" : "NA"}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            {authorizedSign && Array.isArray(authorizedSign) && authorizedSign.map((authS: Promoter, index: number) => (
                                <tr key={index} className="border hover:bg-gray-50">
                                    <td className="p-3 border">
                                        <input
                                            type="checkbox"
                                            checked={selectedPromoter === index}
                                            onChange={() => handlePromoterSelection(index)}
                                            className="checkbox checkbox-primary"
                                        />
                                    </td>
                                    <td className="p-3 text-sm text-gray-700 border">{index + 1}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{authS.isIndianCitizen ? "Yes" : "No"}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{authS.isPromoter ? "Yes" : "No"}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{authS.isAuthorizedSignatory ? "Yes" : "No"}</td>
                                    <td className="p-3 text-sm text-gray-700 border">{authS.designation}</td>
                                    {isAadhaarAuth ? (
                                        <>
                                            <td className="p-3 text-sm text-gray-700 border">{authS.email}</td>
                                            <td className="p-3 text-sm text-gray-700 border">{authS.mobileNumber}</td>
                                            <td className="p-3 text-sm text-gray-700 border">NA</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-3 text-sm text-gray-700 border">{authS.aadhaarNumber || "NA"}</td>
                                            <td className="p-3 text-sm text-gray-700 border">{authS.photograph ? "Uploaded" : "NA"}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setStep(9)}
                    >
                        Back
                    </button>
                    <button
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
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

export default AdhaarAuth;