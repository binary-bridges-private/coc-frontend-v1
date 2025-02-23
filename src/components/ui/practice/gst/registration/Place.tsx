import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface props {
    setStep: Dispatch<SetStateAction<number>>
}

const Place: React.FC<props> = ({ setStep }) => {
    return (
        // <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">GST Registration Form</h2>
            <form>
                {/* Address Section */}
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

                {/* <h3 className="mt-6 text-lg font-bold">Center Jurisdiction</h3>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <input type="email" placeholder="Office Email" className="w-full input input-bordered" />
                    <input type="text" placeholder="Office Telephone Number" className="w-full input input-bordered" />
                    <input type="text" placeholder="Mobile Number" className="w-full input input-bordered" />
                </div> */}

                <div className="w-full mt-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium">State Jurisdiction</label>
                            <input type="text" className="w-full mt-1 input input-bordered" placeholder="Enter state jurisdiction" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Sector / Circle / Ward / Charge / Unit *</label>
                            <select className="w-full mt-1 select select-bordered">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium">
                            Center Jurisdiction <span className="text-blue-500 cursor-pointer">(Refer the link for Center Jurisdiction)</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Commissionerate *</label>
                            <select className="w-full mt-1 select select-bordered">
                                <option>Select</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Division *</label>
                            <select className="w-full mt-1 select select-bordered">
                                <option>Select</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Range *</label>
                            <select className="w-full mt-1 select select-bordered">
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <h3 className="mt-10 text-lg font-bold">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">Office Email *</label>
                        <input type="email" placeholder="Office Email" className="w-full text-sm font-medium input input-bordered" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Office Telephone Number *</label>
                        <input type="email" placeholder="Office Email" className="w-full text-sm font-medium input input-bordered" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile Number *</label>
                        <input type="email" placeholder="Office Email" className="w-full text-sm font-medium input input-bordered" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">Office Fax Number</label>
                        <input type="email" placeholder="Office Email" className="w-full text-sm font-medium input input-bordered" />
                    </div>
                </div>

                {/* Document Upload */}
                <div className="flex flex-col justify-between lg:flex-row">
                    <div className="flex flex-col lg:w-[48%] w-[100%]">
                        <h3 className="mt-6 text-lg font-bold">Nature of possession of premises</h3>
                        <div className="gap-4 mt-4 text-sm font-medium">
                            <select className="w-full select select-bordered">
                                <option>Select</option>
                                <option>Electricity Bill</option>
                                <option>Rent Agreement</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col lg:w-[48%] w-[100%]">
                        <h3 className="mt-6 text-lg font-bold">Document Upload</h3>
                        <div className="gap-4 mt-4 text-sm font-medium">
                            <select className="w-full select select-bordered">
                                <option>Select Proof of Principal Place of Business</option>
                                <option>Electricity Bill</option>
                                <option>Rent Agreement</option>
                            </select>
                            <input type="file" className="w-full mt-2 file-input" />
                        </div>
                    </div>
                </div>

                {/* Nature of Business */}
                <h3 className="mt-10 text-lg font-bold">Nature of business actively being carried out at above mention premises</h3>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium ">
                        <input type="checkbox" className="checkbox" />
                        <span>Bonded Warehouse</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>EOU / STP / EHTP</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Export</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Factory / Manufacturing</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Import</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Supplier of Services</span>
                    </label>
                </div><div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Leasing Business</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Office/ Sale office</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Recipient of Goods/ Services</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Retail Business</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Warehouse Depot</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Wholesale Business</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Works Contact</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="checkbox" className="checkbox" />
                        <span>Others</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input type="text" placeholder="please specify" className="input input-bordered" />
                    </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between mt-6">
                    <button className="btn btn-outline" onClick={() => setStep(5)}>Back</button>
                    <button className="btn bg-[#101C36] text-white" onClick={() => setStep(7)}>Save & Continue</button>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
};

export default Place;
