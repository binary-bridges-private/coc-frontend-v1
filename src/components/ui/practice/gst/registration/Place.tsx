import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface props {
    setStep: Dispatch<SetStateAction<number>>
}

const Place: React.FC<props> = ({ setStep }) => {

    const [formData, setFormData] = useState({
        pinCode: "",
        state: "Delhi",
        district: "",
        city: "",
        locality: "",
        road: "",
        premises: "",
        buildingNo: "",
        floorNo: "",
        landmark: "",
        latitude: "",
        longitude: "",
        stateJurisdiction: "",
        sector: "",
        commissioner: "",
        division: "",
        range: "",
        officeEmail: "",
        officeTelephone: "",
        mobileNumber: "",
        officeFax: "",
        natureOfPossession: "",
        documentProof: "",
        businessNature: [] as string[],
        otherBusinessNature: "",
        uploadedFile: null as File | null,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle checkbox changes for business nature
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        let updatedBusinessNature = [...formData.businessNature];
        if (checked) {
            updatedBusinessNature.push(value);
        } else {
            updatedBusinessNature = updatedBusinessNature.filter(item => item !== value);
        }
        setFormData({
            ...formData,
            businessNature: updatedBusinessNature,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};

        // Basic validation
        if (!formData.pinCode) newErrors.pinCode = "PIN Code is required";
        if (!formData.district) newErrors.district = "District is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.officeEmail) newErrors.officeEmail = "Office Email is required";
        if (!formData.officeTelephone) newErrors.officeTelephone = "Office Telephone is required";
        if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile Number is required";

        if (!formData.sector) newErrors.sector = "Sector is required";
        if (!formData.commissioner) newErrors.commissioner = "Commissionerate is required";
        if (!formData.division) newErrors.division = "Division is required";
        if (!formData.range) newErrors.range = "Range is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log(formData);
        setStep(7);
    };


    return (
        // <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">GST Registration Form</h2>
            <form>
                {/* Address Section */}
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">PIN Code</label>
                        <input
                            type="text"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleInputChange}
                            placeholder="PIN Code"
                            className="w-full input input-bordered"
                        />
                        {errors.pinCode && <p className="text-sm text-red-500">{errors.pinCode}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            readOnly
                            className="w-full input input-bordered"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">District</label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            placeholder="District"
                            className="w-full input input-bordered"
                        />
                        {errors.district && <p className="text-sm text-red-500">{errors.district}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">City / Town / Village</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City / Town / Village"
                            className="w-full input input-bordered"
                        />
                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Locality / Sub Locality</label>
                        <input
                            type="text"
                            name="locality"
                            value={formData.locality}
                            onChange={handleInputChange}
                            placeholder="Locality / Sub Locality"
                            className="w-full input input-bordered"
                        />
                        {errors.locality && <p className="text-sm text-red-500">{errors.locality}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Road / Street / Lane</label>
                        <input
                            type="text"
                            name="road"
                            value={formData.road}
                            onChange={handleInputChange}
                            placeholder="Road / Street / Lane"
                            className="w-full input input-bordered"
                        />
                        {errors.road && <p className="text-sm text-red-500">{errors.road}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">Name of the Premises / Building</label>
                        <input
                            type="text"
                            name="premises"
                            value={formData.premises}
                            onChange={handleInputChange}
                            placeholder="Name of the Premises / Building"
                            className="w-full input input-bordered"
                        />
                        {errors.premises && <p className="text-sm text-red-500">{errors.premises}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Building No. / Flat No.</label>
                        <input
                            type="text"
                            name="buildingNo"
                            value={formData.buildingNo}
                            onChange={handleInputChange}
                            placeholder="Building No. / Flat No."
                            className="w-full input input-bordered"
                        />
                        {errors.buildingNo && <p className="text-sm text-red-500">{errors.buildingNo}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Floor No.</label>
                        <input
                            type="text"
                            name="floorNo"
                            value={formData.floorNo}
                            onChange={handleInputChange}
                            placeholder="Floor No."
                            className="w-full input input-bordered"
                        />
                        {errors.floorNo && <p className="text-sm text-red-500">{errors.floorNo}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">Nearby Landmark</label>
                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleInputChange}
                            placeholder="Nearby Landmark"
                            className="w-full input input-bordered"
                        />
                        {errors.landmark && <p className="text-sm text-red-500">{errors.landmark}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Latitude</label>
                        <input
                            type="text"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                            placeholder="Latitude"
                            className="w-full input input-bordered"
                        />
                        {errors.latitude && <p className="text-sm text-red-500">{errors.latitude}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Longitude</label>
                        <input
                            type="text"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                            placeholder="Longitude"
                            className="w-full input input-bordered"
                        />
                        {errors.longitude && <p className="text-sm text-red-500">{errors.longitude}</p>}
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full mt-4 btn btn-outline"
                // onClick={handleReset}
                >
                    Reset Address
                </button>


                <div className="w-full mt-20">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium">State Jurisdiction</label>
                            <input
                                type="text"
                                name="stateJurisdiction"
                                value={formData.stateJurisdiction}
                                onChange={handleInputChange}
                                placeholder="Enter state jurisdiction"
                                className="w-full mt-1 input input-bordered"
                            />
                            {errors.stateJurisdiction && <p className="text-sm text-red-500">{errors.stateJurisdiction}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Sector / Circle / Ward / Charge / Unit *</label>
                            <input
                                type="text"
                                name="sector"
                                value={formData.sector}
                                onChange={handleInputChange}
                                placeholder=""
                                className="w-full text-sm font-medium input input-bordered"
                            />
                            {errors.sector && <p className="text-sm text-red-500">{errors.sector}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Commissionerate *</label>
                            <input
                                type="text"
                                name="commissioner"
                                value={formData.commissioner}
                                onChange={handleInputChange}
                                placeholder=""
                                className="w-full text-sm font-medium input input-bordered"
                            />
                            {errors.commissioner && <p className="text-sm text-red-500">{errors.commissioner}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Division *</label>
                            <input
                                type="text"
                                name="division"
                                value={formData.division}
                                onChange={handleInputChange}
                                placeholder=""
                                className="w-full text-sm font-medium input input-bordered"
                            />
                            {errors.division && <p className="text-sm text-red-500">{errors.division}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Range *</label>
                            <input
                                type="text"
                                name="range"
                                value={formData.range}
                                onChange={handleInputChange}
                                placeholder=""
                                className="w-full text-sm font-medium input input-bordered"
                            />
                            {errors.range && <p className="text-sm text-red-500">{errors.range}</p>}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <h3 className="mt-10 text-lg font-bold">Contact Information</h3>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">Office Email *</label>
                        <input
                            type="email"
                            name="officeEmail"
                            value={formData.officeEmail}
                            onChange={handleInputChange}
                            placeholder="Office Email"
                            className="w-full text-sm font-medium input input-bordered"
                        />
                        {errors.officeEmail && <p className="text-sm text-red-500">{errors.officeEmail}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Office Telephone Number *</label>
                        <input
                            type="text"
                            name="officeTelephone"
                            value={formData.officeTelephone}
                            onChange={handleInputChange}
                            placeholder="Office Telephone Number"
                            className="w-full text-sm font-medium input input-bordered"
                        />
                        {errors.officeTelephone && <p className="text-sm text-red-500">{errors.officeTelephone}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile Number *</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Mobile Number"
                            className="w-full text-sm font-medium input input-bordered"
                        />
                        {errors.mobileNumber && <p className="text-sm text-red-500">{errors.mobileNumber}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium">Office Fax Number</label>
                        <input
                            type="text"
                            name="officeFax"
                            value={formData.officeFax}
                            onChange={handleInputChange}
                            placeholder="Office Fax Number"
                            className="w-full text-sm font-medium input input-bordered"
                        />
                    </div>
                </div>

                {/* Document Upload */}
                <div className="flex flex-col justify-between mt-10 lg:flex-row">
                    <div className="flex flex-col lg:w-[48%] w-[100%]">
                        <h3 className="mt-6 text-lg font-bold">Nature of possession of premises</h3>
                        <div className="gap-4 mt-4 text-sm font-medium">
                            <select
                                name="natureOfPossession"
                                value={formData.natureOfPossession}
                                onChange={handleInputChange}
                                className="w-full select select-bordered"
                            >
                                <option value="">Select</option>
                                <option value="Electricity Bill">Electricity Bill</option>
                                <option value="Rent Agreement">Rent Agreement</option>
                            </select>
                            {errors.natureOfPossession && <p className="text-sm text-red-500">{errors.natureOfPossession}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:w-[48%] w-[100%]">
                        <h3 className="mt-6 text-lg font-bold">Document Upload</h3>
                        <div className="gap-4 mt-4 text-sm font-medium">
                            <select
                                name="documentProof"
                                value={formData.documentProof}
                                onChange={handleInputChange}
                                className="w-full select select-bordered"
                            >
                                <option value="">Select Proof of Principal Place of Business</option>
                                <option value="Electricity Bill">Electricity Bill</option>
                                <option value="Rent Agreement">Rent Agreement</option>
                            </select>
                            {errors.documentProof && <p className="text-sm text-red-500">{errors.documentProof}</p>}
                            <input
                                type="file"
                                // onChange={handleFileChange}
                                className="w-full mt-2 file-input"
                            />
                            {errors.uploadedFile && <p className="text-sm text-red-500">{errors.uploadedFile}</p>}
                        </div>
                    </div>
                </div>

                <h3 className="mt-10 text-lg font-bold">Nature of business actively being carried out at above mentioned premises</h3>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Bonded Warehouse"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Bonded Warehouse</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="EOU / STP / EHTP"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>EOU / STP / EHTP</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Export"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Export</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Factory / Manufacturing"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Factory / Manufacturing</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Import"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Import</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Supplier of Services"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Supplier of Services</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Leasing Business"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Leasing Business</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Office/ Sale office"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Office/ Sale office</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Recipient of Goods/ Services"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Recipient of Goods/ Services</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Retail Business"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Retail Business</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Warehouse Depot"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Warehouse Depot</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Wholesale Business"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Wholesale Business</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Works Contact"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Works Contact</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            value="Others"
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <span>Others</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="text"
                            name="otherBusinessNature"
                            value={formData.otherBusinessNature}
                            onChange={handleInputChange}
                            placeholder="please specify"
                            className="input input-bordered"
                        />
                    </label>
                </div>

                {/* Error Message */}
                {errors.businessNature && (
                    <p className="mt-4 text-sm text-red-500">{errors.businessNature}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-between mt-6">
                    <button className="btn btn-outline" onClick={() => setStep(5)}>Back</button>
                    <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>Save & Continue</button>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
};

export default Place;