import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks.ts";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    gstRegistratinId: string | null;
}

const Place: React.FC<Props> = ({ setStep, gstRegistratinId }) => {
    const [formData, setFormData] = useState({
        pinCode: "",
        state: "",
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

    // Standardized input classes
    const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
    const selectClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white";
    const disabledInputClass = "w-full p-3 border rounded-md bg-gray-100";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                uploadedFile: e.target.files[0]
            });
        }
    };

    const dispatch = useAppDispatch();

    const handleSave = async () => {
        try {
            const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, place: formData })).unwrap();
            console.log('Save successful:', result.data);
            return true;
        } catch (error) {
            console.error('Save failed:', error);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
        if (formData.businessNature.length === 0) newErrors.businessNature = "At least one business nature must be selected";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log(formData);
        const success = await handleSave();
        if (success) {
            setStep(7);
        }
    };

    return (
        <>
            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Principal Place of Business
                </h2>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    {/* Address Section */}
                    <div className="p-4 mb-6 border rounded-md">
                        <h3 className="mb-4 text-lg font-semibold text-gray-700">Address Details</h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">PIN Code</label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    placeholder="PIN Code"
                                    className={inputClass}
                                />
                                {errors.pinCode && <p className="mt-1 text-sm text-red-500">{errors.pinCode}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    readOnly
                                    className={disabledInputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    placeholder="District"
                                    className={inputClass}
                                />
                                {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">City / Town / Village</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City / Town / Village"
                                    className={inputClass}
                                />
                                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Locality / Sub Locality</label>
                                <input
                                    type="text"
                                    name="locality"
                                    value={formData.locality}
                                    onChange={handleInputChange}
                                    placeholder="Locality / Sub Locality"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Road / Street / Lane</label>
                                <input
                                    type="text"
                                    name="road"
                                    value={formData.road}
                                    onChange={handleInputChange}
                                    placeholder="Road / Street / Lane"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Name of the Premises / Building</label>
                                <input
                                    type="text"
                                    name="premises"
                                    value={formData.premises}
                                    onChange={handleInputChange}
                                    placeholder="Name of the Premises / Building"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Building No. / Flat No.</label>
                                <input
                                    type="text"
                                    name="buildingNo"
                                    value={formData.buildingNo}
                                    onChange={handleInputChange}
                                    placeholder="Building No. / Flat No."
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Floor No.</label>
                                <input
                                    type="text"
                                    name="floorNo"
                                    value={formData.floorNo}
                                    onChange={handleInputChange}
                                    placeholder="Floor No."
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Nearby Landmark</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleInputChange}
                                    placeholder="Nearby Landmark"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleInputChange}
                                    placeholder="Latitude"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleInputChange}
                                    placeholder="Longitude"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    pinCode: "",
                                    district: "",
                                    city: "",
                                    locality: "",
                                    road: "",
                                    premises: "",
                                    buildingNo: "",
                                    floorNo: "",
                                    landmark: "",
                                    latitude: "",
                                    longitude: ""
                                });
                            }}
                        >
                            Reset Address
                        </button>
                    </div>

                    {/* Jurisdiction Section */}
                    <div className="p-4 mb-6 border rounded-md">
                        <h3 className="mb-4 text-lg font-semibold text-gray-700">Jurisdiction Details</h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">State Jurisdiction</label>
                                <input
                                    type="text"
                                    name="stateJurisdiction"
                                    value={formData.stateJurisdiction}
                                    onChange={handleInputChange}
                                    placeholder="Enter state jurisdiction"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Sector / Circle / Ward / Charge / Unit *</label>
                                <input
                                    type="text"
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleInputChange}
                                    placeholder=""
                                    className={inputClass}
                                />
                                {errors.sector && <p className="mt-1 text-sm text-red-500">{errors.sector}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Commissionerate *</label>
                                <input
                                    type="text"
                                    name="commissioner"
                                    value={formData.commissioner}
                                    onChange={handleInputChange}
                                    placeholder=""
                                    className={inputClass}
                                />
                                {errors.commissioner && <p className="mt-1 text-sm text-red-500">{errors.commissioner}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Division *</label>
                                <input
                                    type="text"
                                    name="division"
                                    value={formData.division}
                                    onChange={handleInputChange}
                                    placeholder=""
                                    className={inputClass}
                                />
                                {errors.division && <p className="mt-1 text-sm text-red-500">{errors.division}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Range *</label>
                                <input
                                    type="text"
                                    name="range"
                                    value={formData.range}
                                    onChange={handleInputChange}
                                    placeholder=""
                                    className={inputClass}
                                />
                                {errors.range && <p className="mt-1 text-sm text-red-500">{errors.range}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="p-4 mb-6 border rounded-md">
                        <h3 className="mb-4 text-lg font-semibold text-gray-700">Contact Information</h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Office Email *</label>
                                <input
                                    type="email"
                                    name="officeEmail"
                                    value={formData.officeEmail}
                                    onChange={handleInputChange}
                                    placeholder="Office Email"
                                    className={inputClass}
                                />
                                {errors.officeEmail && <p className="mt-1 text-sm text-red-500">{errors.officeEmail}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Office Telephone Number *</label>
                                <input
                                    type="text"
                                    name="officeTelephone"
                                    value={formData.officeTelephone}
                                    onChange={handleInputChange}
                                    placeholder="Office Telephone Number"
                                    className={inputClass}
                                />
                                {errors.officeTelephone && <p className="mt-1 text-sm text-red-500">{errors.officeTelephone}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number *</label>
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                    placeholder="Mobile Number"
                                    className={inputClass}
                                />
                                {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Office Fax Number</label>
                                <input
                                    type="text"
                                    name="officeFax"
                                    value={formData.officeFax}
                                    onChange={handleInputChange}
                                    placeholder="Office Fax Number"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Document Upload */}
                    <div className="p-4 mb-6 border rounded-md">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-700">Nature of possession of premises</h3>
                                <select
                                    name="natureOfPossession"
                                    value={formData.natureOfPossession}
                                    onChange={handleInputChange}
                                    className={selectClass}
                                >
                                    <option value="">Select</option>
                                    <option value="Electricity Bill">Electricity Bill</option>
                                    <option value="Rent Agreement">Rent Agreement</option>
                                </select>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-700">Document Upload</h3>
                                <select
                                    name="documentProof"
                                    value={formData.documentProof}
                                    onChange={handleInputChange}
                                    className={selectClass}
                                >
                                    <option value="">Select Proof of Principal Place of Business</option>
                                    <option value="Electricity Bill">Electricity Bill</option>
                                    <option value="Rent Agreement">Rent Agreement</option>
                                </select>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 mt-2 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Nature */}
                    <div className="p-4 border rounded-md">
                        <h3 className="mb-4 text-lg font-semibold text-gray-700">Nature of business actively being carried out at above mentioned premises</h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Bonded Warehouse"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span>Bonded Warehouse</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="EOU / STP / EHTP"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span>EOU / STP / EHTP</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Export"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
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
                                    className="checkbox checkbox-primary"
                                />
                                <span>Factory / Manufacturing</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Import"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span>Import</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Supplier of Services"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
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
                                    className="checkbox checkbox-primary"
                                />
                                <span>Leasing Business</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Office/ Sale office"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span>Office/ Sale office</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Recipient of Goods/ Services"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
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
                                    className="checkbox checkbox-primary"
                                />
                                <span>Retail Business</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Warehouse Depot"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span>Warehouse Depot</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Wholesale Business"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
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
                                    className="checkbox checkbox-primary"
                                />
                                <span>Works Contact</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    value="Others"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span>Others</span>
                            </label>
                            <div>
                                <input
                                    type="text"
                                    name="otherBusinessNature"
                                    value={formData.otherBusinessNature}
                                    onChange={handleInputChange}
                                    placeholder="please specify"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {errors.businessNature && (
                            <p className="mt-4 text-sm text-red-500">{errors.businessNature}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={() => setStep(5)}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Save & Continue
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Place;