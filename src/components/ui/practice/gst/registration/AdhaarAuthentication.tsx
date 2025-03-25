import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    promoterData: any; // Assuming promoterData is an array of promoter objects
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

const AdhaarAuth: React.FC<Props> = ({ setStep, promoterData }) => {
    const [isAadhaarAuth, setIsAadhaarAuth] = useState(false);
    const [selectedPromoter, setSelectedPromoter] = useState<number | null>(null); // Track single selection
    const [error, setError] = useState<string | null>(null);

    // Handle Aadhaar authentication toggle
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAadhaarAuth(e.target.value === "yes");
        setSelectedPromoter(null); // Reset selected promoter when toggling
        setError(null); // Clear error
    };

    // Handle promoter selection (single selection)
    const handlePromoterSelection = (id: number) => {
        if (selectedPromoter === id) {
            // If the same promoter is clicked again, deselect it
            setSelectedPromoter(null);
        } else {
            // Select the new promoter
            setSelectedPromoter(id);
        }
        setError(null); // Clear error when a promoter is selected
    };

    // Handle form submission
    const handleSubmit = () => {
        if (selectedPromoter === null) {
            setError("Please select at least one promoter.");
            return;
        }
        console.log("Selected Promoter:", selectedPromoter);
        setStep(11); // Proceed to the next step
    };

    return (
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg p-4" style={{ fontFamily: "Arial, sans-serif" }}>
            <h1 className="mb-4 text-xl font-bold">Aadhaar Authentication</h1>
            <div className="mb-4">
                <label className="font-bold">
                    Do you want to opt for Aadhaar Authentication of details of
                    Promoter/Partner, Primary Authorized Signatory added by you? *
                </label>
                <div className="mt-2">
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            name="aadhaarAuth"
                            value="no"
                            checked={!isAadhaarAuth}
                            onChange={handleToggle}
                            className="form-radio"
                        />
                        <span className="ml-2">No</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="aadhaarAuth"
                            value="yes"
                            checked={isAadhaarAuth}
                            onChange={handleToggle}
                            className="form-radio"
                        />
                        <span className="ml-2">Yes</span>
                    </label>
                </div>
            </div>

            {isAadhaarAuth ? (
                <div>
                    <p className="mb-4">
                        1. Authentication request shall be shared on mobile number, email upon
                        submission of application of Promoter/Partner, and Primary Authorized
                        Signatory which are selected.
                    </p>
                    <p className="mb-4">
                        2. ARN would be generated once Aadhaar Authentication exercise is
                        completed for all applicable persons whose name are selected in this
                        table.
                    </p>
                    <p className="mb-4">
                        3. Kindly select one person from Promoter/Partner for Aadhaar
                        Authentication.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Sl No</th>
                                    <th>Citizen/Resident of India</th>
                                    <th>Promoter/Partner</th>
                                    <th>Primary Authorized Signatory</th>
                                    <th>Designation</th>
                                    <th>Email Address</th>
                                    <th>Mobile Number</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promoterData && Array.isArray(promoterData) && promoterData.map((promoter: Promoter, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedPromoter === index} // Single selection
                                                onChange={() => handlePromoterSelection(index)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{promoter.isIndianCitizen ? "Yes" : "No"}</td>
                                        <td>{promoter.isPromoter ? "Yes" : "No"}</td>
                                        <td>{promoter.isAuthorizedSignatory ? "Yes" : "No"}</td>
                                        <td>{promoter.designation}</td>
                                        <td>{promoter.email}</td>
                                        <td>{promoter.mobileNumber}</td>
                                        <td>NA</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="mb-4 text-red-500">
                        1. If you wish you can upload E-KYC documents for Primary Authorized
                        Signatory and one Promoter/Partner to proceed further.
                    </p>
                    <p className="mb-4 text-red-500">
                        2. You would be required to visit the designated GSK for Photo
                        Capturing and Document Verification. ARN would be generated once both
                        the processes are completed for all applicable persons whose names are
                        selected in this table.
                    </p>
                    <p className="mb-4 text-red-500">
                        3. Kindly select one person from Promoter/Partner for Photo Capturing
                        and Document Verification.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Sl No</th>
                                    <th>Citizen/Resident of India</th>
                                    <th>Promoter/Partner</th>
                                    <th>Primary Authorized Signatory</th>
                                    <th>Designation</th>
                                    <th>Aadhaar Enrolment ID</th>
                                    <th>Document Upload</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promoterData && Array.isArray(promoterData) && promoterData.map((promoter: Promoter, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedPromoter === index} // Single selection
                                                onChange={() => handlePromoterSelection(index)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{promoter.isIndianCitizen ? "Yes" : "No"}</td>
                                        <td>{promoter.isPromoter ? "Yes" : "No"}</td>
                                        <td>{promoter.isAuthorizedSignatory ? "Yes" : "No"}</td>
                                        <td>{promoter.designation}</td>
                                        <td>{promoter.aadhaarNumber || "NA"}</td>
                                        <td>{promoter.photograph ? "Uploaded" : "NA"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Validation Error */}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setStep(9)}>
                    Back
                </button>
                <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>
                    Save & Continue
                </button>
            </div>
        </div>
    );
};

export default AdhaarAuth;