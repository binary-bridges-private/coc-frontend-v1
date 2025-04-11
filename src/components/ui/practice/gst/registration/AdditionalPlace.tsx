import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks.ts";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";

interface PlaceProps {
    formData: any;
    errors: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
    index: number;
}

const Place: React.FC<PlaceProps> = ({ formData, errors, handleInputChange, handleCheckboxChange, handleFileChange, handleReset, index }) => {
    // Standardized input classes
    const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
    const selectClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white";
    const disabledInputClass = "w-full p-3 border rounded-md bg-gray-100";

    return (
        <div className="p-4 mb-6 border rounded-md shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Additional Place {index + 1}</h3>

            {/* Address Section */}
            <div className="mb-6">
                <h4 className="mb-3 font-medium text-gray-700 text-md">Address Details</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">PIN Code *</label>
                        <input
                            type="text"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleInputChange}
                            placeholder="PIN Code"
                            className={inputClass}
                        />
                        {errors[`pinCode-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`pinCode-${index}`]}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state || "Delhi"}
                            readOnly
                            className={disabledInputClass}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">District *</label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            placeholder="District"
                            className={inputClass}
                        />
                        {errors[`district-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`district-${index}`]}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">City / Town / Village *</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City / Town / Village"
                            className={inputClass}
                        />
                        {errors[`city-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`city-${index}`]}</p>}
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
                    onClick={handleReset}
                >
                    Reset Address
                </button>
            </div>

            {/* Jurisdiction Section */}
            <div className="mb-6">
                <h4 className="mb-3 font-medium text-gray-700 text-md">Jurisdiction Details</h4>

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
                        {errors[`sector-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`sector-${index}`]}</p>}
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
                        {errors[`commissioner-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`commissioner-${index}`]}</p>}
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
                        {errors[`division-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`division-${index}`]}</p>}
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
                        {errors[`range-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`range-${index}`]}</p>}
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
                <h4 className="mb-3 font-medium text-gray-700 text-md">Contact Information</h4>

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
                        {errors[`officeEmail-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`officeEmail-${index}`]}</p>}
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
                        {errors[`officeTelephone-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`officeTelephone-${index}`]}</p>}
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
                        {errors[`mobileNumber-${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`mobileNumber-${index}`]}</p>}
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
            <div className="mb-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <h4 className="mb-3 font-medium text-gray-700 text-md">Nature of possession of premises</h4>
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
                        <h4 className="mb-3 font-medium text-gray-700 text-md">Document Upload</h4>
                        <select
                            name="documentProof"
                            value={formData.documentProof}
                            onChange={handleInputChange}
                            className={selectClass}
                        >
                            <option value="">Select Proof of Additional Place</option>
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
            <div>
                <h4 className="mb-3 font-medium text-gray-700 text-md">Nature of business at this location</h4>

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
            </div>
        </div>
    );
};

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    gstRegistratinId: string | null; 
}

const AdditionalPlace: React.FC<Props> = ({ setStep, gstRegistratinId }) => {
    const [places, setPlaces] = useState<any[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const addNewPlace = () => {
        setPlaces([
            ...places,
            {
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
                businessNature: [],
                otherBusinessNature: "",
                uploadedFile: null,
            },
        ]);
    };

    const removePlace = (index: number) => {
        const updatedPlaces = places.filter((_, i) => i !== index);
        setPlaces(updatedPlaces);
    };

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedPlaces = [...places];
        updatedPlaces[index] = { ...updatedPlaces[index], [name]: value };
        setPlaces(updatedPlaces);

        // Clear error when field is edited
        if (errors[`${name}-${index}`]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`${name}-${index}`];
                return newErrors;
            });
        }
    };

    const handleCheckboxChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const updatedPlaces = [...places];
        let updatedBusinessNature = [...updatedPlaces[index].businessNature];

        if (checked) {
            updatedBusinessNature.push(value);
        } else {
            updatedBusinessNature = updatedBusinessNature.filter((item) => item !== value);
        }

        updatedPlaces[index] = {
            ...updatedPlaces[index],
            businessNature: updatedBusinessNature,
        };
        setPlaces(updatedPlaces);
    };

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        const updatedPlaces = [...places];
        updatedPlaces[index] = {
            ...updatedPlaces[index],
            uploadedFile: file
        };
        setPlaces(updatedPlaces);
    };

    const handleReset = (index: number) => {
        const updatedPlaces = [...places];
        updatedPlaces[index] = {
            ...updatedPlaces[index],
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
            longitude: "",
        };
        setPlaces(updatedPlaces);
    };

    const dispatch = useAppDispatch();

    const handleSave = async () => {
        try {
            const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, additionalPlaces: places })).unwrap();
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

        places.forEach((place, index) => {
            if (!place.pinCode) newErrors[`pinCode-${index}`] = "PIN Code is required";
            if (!place.district) newErrors[`district-${index}`] = "District is required";
            if (!place.city) newErrors[`city-${index}`] = "City is required";
            if (!place.officeEmail) newErrors[`officeEmail-${index}`] = "Office Email is required";
            if (!place.officeTelephone) newErrors[`officeTelephone-${index}`] = "Office Telephone is required";
            if (!place.mobileNumber) newErrors[`mobileNumber-${index}`] = "Mobile Number is required";
            if (!place.sector) newErrors[`sector-${index}`] = "Sector is required";
            if (!place.commissioner) newErrors[`commissioner-${index}`] = "Commissionerate is required";
            if (!place.division) newErrors[`division-${index}`] = "Division is required";
            if (!place.range) newErrors[`range-${index}`] = "Range is required";
            if (place.businessNature.length === 0) newErrors[`businessNature-${index}`] = "At least one business nature must be selected";
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const success = await handleSave();
        if(success) setStep(8);
    };

    return (
        <>
            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Additional Places of Business
                </h2>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-700">
                        {places.length > 0 ? `${places.length} Additional Place(s)` : "No Additional Places Added"}
                    </h3>
                    <button
                        onClick={addNewPlace}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        + Add Place
                    </button>
                </div>

                {places.length === 0 && (
                    <div className="p-4 mb-6 text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md">
                        No additional places of business added. Click "Add Place" to add one or proceed without adding any.
                    </div>
                )}

                {places.map((place, index) => (
                    <div key={index} className="relative mb-6 border rounded-md">
                        {places.length > 1 && (
                            <button
                                onClick={() => removePlace(index)}
                                className="absolute p-1 text-red-500 top-2 right-2 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        <Place
                            formData={place}
                            errors={errors}
                            handleInputChange={(e) => handleInputChange(index, e)}
                            handleCheckboxChange={(e) => handleCheckboxChange(index, e)}
                            handleFileChange={(e) => handleFileChange(index, e)}
                            handleReset={() => handleReset(index)}
                            index={index}
                        />
                    </div>
                ))}

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setStep(6)}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdditionalPlace;