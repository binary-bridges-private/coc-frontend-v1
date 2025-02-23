import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
}

const AuthorizedSignatory: React.FC<Props> = ({ setStep }) => {
    const [directors, setDirectors] = useState([{}]);

    const addNewDirector = () => {
        setDirectors([...directors, {}]);
    };

    const removeDirector = (id: number) => {
        setDirectors(directors.filter((director, index) => index !== id));
    };

    return (
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
            {directors.map((director, index) => (
                <div key={index} className="p-4 mb-2 space-y-4 border rounded-lg shadow-md">
                    {/* <h2 className="text-lg font-semibold">Entry: {index + 1}</h2> */}
                    {directors.length > 1 && (
                        <button
                            onClick={() => removeDirector(index)}
                            className="relative text-[28px] text-bold text-red-500 left-[98%] hover:text-red-700"
                        >
                            ❌
                        </button>
                    )}

                    <h3 className="font-semibold text-md">Details of Authorized Signatory</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <label className="flex items-center space-x-2 text-sm font-medium">
                            <input type="checkbox" className="checkbox" />
                            <span>Primary Authorized Signatory</span>
                        </label>
                    </div>


                    <h3 className="font-semibold text-md">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input type="text" placeholder="First Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Middle Name</label>
                            <input type="text" placeholder="Middle Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input type="text" placeholder="Last Name" className="w-full input input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Father's First Name</label>
                            <input type="text" placeholder="Father's First Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father's Middle Name</label>
                            <input type="text" placeholder="Father's Middle Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father's Last Name</label>
                            <input type="text" placeholder="Father's Last Name" className="w-full input input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input type="date" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mobile Number</label>
                            <input type="text" placeholder="Mobile Number" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block w-full text-sm font-medium">Gender</label>
                            <select className="w-full select select-bordered">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Telephone Number (with STD Code)</label>
                            <input type="text" placeholder="Telephone Number (with STD Code)" className="w-full input input-bordered" />
                        </div>
                    </div>

                    {/* Identity Information */}
                    <h3 className="mt-10 font-semibold text-md">Identity Information</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Designation</label>
                            <input type="text" placeholder="Designation" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Director Identification Number</label>
                            <input type="text" placeholder="Director Identification Number" className="w-full input input-bordered" />
                        </div>
                        <label className="flex items-center space-x-2">
                            <span>Are you a citizen of India?</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Permanent Account Number (PAN)</label>
                            <input type="text" placeholder="Permanent Account Number (PAN)" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Passport Number (If Foreign)</label>
                            <input type="text" placeholder="Passport Number (If Foreign)" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Aadhaar Number</label>
                            <input type="text" placeholder="Aadhaar Number" className="w-full input input-bordered" />
                        </div>
                    </div>

                    {/* Residential Address */}
                    <h3 className="mt-10 font-semibold text-md">Residential Address</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">PIN Code</label>
                            <input type="text" placeholder="PIN Code" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <input type="text" value="Delhi" readOnly className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">District</label>
                            <input type="text" placeholder="District" className="w-full input input-bordered" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">City / Town / Village</label>
                            <input type="text" placeholder="City / Town / Village" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Locality / Sub Locality</label>
                            <input type="text" placeholder="Locality / Sub Locality" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Road / Street / Lane</label>
                            <input type="text" placeholder="Road / Street / Lane" className="w-full input input-bordered" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Name of the Premises / Building</label>
                            <input type="text" placeholder="Name of the Premises / Building" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Building No. / Flat No.</label>
                            <input type="text" placeholder="Building No. / Flat No." className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Floor No.</label>
                            <input type="text" placeholder="Floor No." className="w-full input input-bordered" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Nearby Landmark</label>
                            <input type="text" placeholder="Nearby Landmark" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Latitude</label>
                            <input type="text" placeholder="Latitude" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Longitude</label>
                            <input type="text" placeholder="Longitude" className="w-full input input-bordered" />
                        </div>
                    </div>

                    <button className="w-full mt-4 btn btn-outline">Reset Address</button>


                    {/* Document Upload */}
                    <h3 className="font-semibold text-md">Proof of details of authorized signatory</h3>
                    <input type="file" className="w-full file-input file-input-bordered" />
                    <h3 className="font-semibold text-md">Upload Photograph (of person whose information has been given above)</h3>
                    <input type="file" className="w-full file-input file-input-bordered" />
                </div>
            ))}
            <div className="flex mt-4 space-x-4">
                <button className="btn btn-outline" onClick={() => setStep(3)}>Back</button>
                <button className="btn btn-outline" onClick={addNewDirector}>Add New</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => setStep(5)}>Save & Continue</button>
            </div>
        </div>
    );
}

export default AuthorizedSignatory;
