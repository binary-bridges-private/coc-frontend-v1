import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
}

const AdhaarAuth: React.FC<Props> = ({ setStep }) => {
    const [isAadhaarAuth, setIsAadhaarAuth] = useState(false);

    const handleToggle = (e) => {
        setIsAadhaarAuth(e.target.value === "yes");
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
                                <tr>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>1</td>
                                    <td>Yes</td>
                                    <td>Yes</td>
                                    <td>No</td>
                                    <td>developer</td>
                                    <td>test@gmail.com</td>
                                    <td>8920689369</td>
                                    <td>NA</td>
                                </tr>
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
                                <tr>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>1</td>
                                    <td>Yes</td>
                                    <td>Yes</td>
                                    <td>No</td>
                                    <td>developer</td>
                                    <td>NA</td>
                                    <td>NA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setStep(9)}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => setStep(11)} >Save & Continue</button>
            </div>
        </div>
    );
};

export default AdhaarAuth;


