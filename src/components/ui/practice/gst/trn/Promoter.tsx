import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";

interface Director {
    firstName: string;
    middleName: string;
    lastName: string;
    fathersFirstName: string;
    fathersMiddleName: string;
    fathersLastName: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    gender: string;
    telephoneNumber: string;
    designation: string;
    directorIdentificationNumber: string;
    isIndianCitizen: boolean;
    pan: string;
    passportNumber: string;
    aadhaarNumber: string;
    pinCode: string;
    state: string;
    district: string;
    city: string;
    locality: string;
    road: string;
    premisesName: string;
    buildingNumber: string;
    floorNumber: string;
    landmark: string;
    latitude: string;
    longitude: string;
    photograph: File | null;
    isAuthorizedSignatory: boolean;
}

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    setPromoterData: any;
}

const Promoter: React.FC<Props> = ({ setStep, setPromoterData }) => {

    const [directors, setDirectors] = useState<Director[]>([
        {
            firstName: '',
            middleName: '',
            lastName: '',
            fathersFirstName: '',
            fathersMiddleName: '',
            fathersLastName: '',
            dateOfBirth: '',
            mobileNumber: '',
            email: '',
            gender: '',
            telephoneNumber: '',
            designation: '',
            directorIdentificationNumber: '',
            isIndianCitizen: false,
            pan: '',
            passportNumber: '',
            aadhaarNumber: '',
            pinCode: '',
            state: 'Delhi',
            district: '',
            city: '',
            locality: '',
            road: '',
            premisesName: '',
            buildingNumber: '',
            floorNumber: '',
            landmark: '',
            latitude: '',
            longitude: '',
            photograph: null,
            isAuthorizedSignatory: false,
        },
    ]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const addNewDirector = () => {
        setDirectors([...directors, {
            firstName: '',
            middleName: '',
            lastName: '',
            fathersFirstName: '',
            fathersMiddleName: '',
            fathersLastName: '',
            dateOfBirth: '',
            mobileNumber: '',
            email: '',
            gender: '',
            telephoneNumber: '',
            designation: '',
            directorIdentificationNumber: '',
            isIndianCitizen: false,
            pan: '',
            passportNumber: '',
            aadhaarNumber: '',
            pinCode: '',
            state: 'Delhi',
            district: '',
            city: '',
            locality: '',
            road: '',
            premisesName: '',
            buildingNumber: '',
            floorNumber: '',
            landmark: '',
            latitude: '',
            longitude: '',
            photograph: null,
            isAuthorizedSignatory: false,
        }]);
    };

    const removeDirector = (id: number) => {
        setDirectors(directors.filter((director, index) => index !== id));
    };

    const validateForm = (director: Director): boolean => {
        const requiredFields = [
            'firstName',
            'lastName',
            'dateOfBirth',
            'mobileNumber',
            'email',
            'gender',
            'designation',
            'directorIdentificationNumber',
            'pan',
            'aadhaarNumber',
            'pinCode',
            'district',
            'city',
            'locality',
            'road',
            'premisesName',
            'buildingNumber',
            'floorNumber',
        ];

        for (const field of requiredFields) {
            if (!director[field as keyof Director]) {
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(director.email)) {
            return false;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(director.mobileNumber)) {
            return false;
        }

        return true;
    };

    const handleInputChange = (index: number, field: keyof Director, value: string | boolean | File) => {
        const updatedDirectors = [...directors];
        updatedDirectors[index] = { ...updatedDirectors[index], [field]: value };
        setDirectors(updatedDirectors);

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[`${index}-${field}`];
            return newErrors;
        });
    };

    const handleFileChange = (index: number, file: File | null) => {
        const updatedDirectors = [...directors];
        updatedDirectors[index].photograph = file;
        setDirectors(updatedDirectors);
    };

    const handleSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        directors.forEach((director, index) => {
            if (!validateForm(director)) {
                if (!director.firstName) newErrors[`${index}-firstName`] = 'First Name is required';
                if (!director.lastName) newErrors[`${index}-lastName`] = 'Last Name is required';
                if (!director.dateOfBirth) newErrors[`${index}-dateOfBirth`] = 'Date of Birth is required';
                if (!director.mobileNumber) newErrors[`${index}-mobileNumber`] = 'Mobile Number is required';
                if (!director.email) newErrors[`${index}-email`] = 'Email is required';
                if (!director.gender) newErrors[`${index}-gender`] = 'Gender is required';
                if (!director.designation) newErrors[`${index}-designation`] = 'Designation is required';
                if (!director.directorIdentificationNumber) newErrors[`${index}-directorIdentificationNumber`] = 'Director Identification Number is required';
                if (!director.pan) newErrors[`${index}-pan`] = 'PAN is required';
                if (!director.aadhaarNumber) newErrors[`${index}-aadhaarNumber`] = 'Aadhaar Number is required';
                if (!director.pinCode) newErrors[`${index}-pinCode`] = 'PIN Code is required';
                if (!director.district) newErrors[`${index}-district`] = 'District is required';
                if (!director.city) newErrors[`${index}-city`] = 'City is required';
            }
        });

        console.log(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // let nextStep = false;
        for (let i = 0; i < directors.length; i++) {
            if (directors[i].isAuthorizedSignatory) {
                setStep(5);
                return;
            }
        }

        setPromoterData(directors);
        setStep(4);
    }



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

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full input input-bordered"
                                value={director.firstName}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                            />
                            {errors[`${index}-firstName`] && <p className="text-sm text-red-500">{errors[`${index}-firstName`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Middle Name</label>
                            <input
                                type="text"
                                placeholder="Middle Name"
                                className="w-full input input-bordered"
                                value={director.middleName}
                                onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full input input-bordered"
                                value={director.lastName}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                            />
                            {errors[`${index}-lastName`] && <p className="text-sm text-red-500">{errors[`${index}-lastName`]}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Father's First Name</label>
                            <input
                                type="text"
                                placeholder="Father's First Name"
                                className="w-full input input-bordered"
                                value={director.fathersFirstName}
                                onChange={(e) => handleInputChange(index, 'fathersFirstName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father's Middle Name</label>
                            <input
                                type="text"
                                placeholder="Father's Middle Name"
                                className="w-full input input-bordered"
                                value={director.fathersMiddleName}
                                onChange={(e) => handleInputChange(index, 'fathersMiddleName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father's Last Name</label>
                            <input
                                type="text"
                                placeholder="Father's Last Name"
                                className="w-full input input-bordered"
                                value={director.fathersLastName}
                                onChange={(e) => handleInputChange(index, 'fathersLastName', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                className="w-full input input-bordered"
                                value={director.dateOfBirth}
                                onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                            />
                            {errors[`${index}-dateOfBirth`] && <p className="text-sm text-red-500">{errors[`${index}-dateOfBirth`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mobile Number</label>
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                className="w-full input input-bordered"
                                value={director.mobileNumber}
                                onChange={(e) => handleInputChange(index, 'mobileNumber', e.target.value)}
                            />
                            {errors[`${index}-mobileNumber`] && <p className="text-sm text-red-500">{errors[`${index}-mobileNumber`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-full input input-bordered"
                                value={director.email}
                                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                            />
                            {errors[`${index}-email`] && <p className="text-sm text-red-500">{errors[`${index}-email`]}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block w-full text-sm font-medium">Gender</label>
                            <select
                                className="w-full select select-bordered"
                                value={director.gender}
                                onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors[`${index}-gender`] && <p className="text-sm text-red-500">{errors[`${index}-gender`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Telephone Number (with STD Code)</label>
                            <input
                                type="text"
                                placeholder="Telephone Number (with STD Code)"
                                className="w-full input input-bordered"
                                value={director.telephoneNumber}
                                onChange={(e) => handleInputChange(index, 'telephoneNumber', e.target.value)}
                            />
                        </div>
                    </div>

                    <h3 className="mt-10 font-semibold text-md">Identity Information</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Designation</label>
                            <input
                                type="text"
                                placeholder="Designation"
                                className="w-full input input-bordered"
                                value={director.designation}
                                onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                            />
                            {errors[`${index}-designation`] && <p className="text-sm text-red-500">{errors[`${index}-designation`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Director Identification Number</label>
                            <input
                                type="text"
                                placeholder="Director Identification Number"
                                className="w-full input input-bordered"
                                value={director.directorIdentificationNumber}
                                onChange={(e) => handleInputChange(index, 'directorIdentificationNumber', e.target.value)}
                            />
                            {errors[`${index}-directorIdentificationNumber`] && <p className="text-sm text-red-500">{errors[`${index}-directorIdentificationNumber`]}</p>}
                        </div>
                        <label className="flex items-center space-x-2">
                            <span>Are you a citizen of India?</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={director.isIndianCitizen}
                                onChange={(e) => handleInputChange(index, 'isIndianCitizen', e.target.checked)}
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Permanent Account Number (PAN)</label>
                            <input
                                type="text"
                                placeholder="Permanent Account Number (PAN)"
                                className="w-full input input-bordered"
                                value={director.pan}
                                onChange={(e) => handleInputChange(index, 'pan', e.target.value)}
                            />
                            {errors[`${index}-pan`] && <p className="text-sm text-red-500">{errors[`${index}-pan`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Passport Number (If Foreign)</label>
                            <input
                                type="text"
                                placeholder="Passport Number (If Foreign)"
                                className="w-full input input-bordered"
                                value={director.passportNumber}
                                onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Aadhaar Number</label>
                            <input
                                type="text"
                                placeholder="Aadhaar Number"
                                className="w-full input input-bordered"
                                value={director.aadhaarNumber}
                                onChange={(e) => handleInputChange(index, 'aadhaarNumber', e.target.value)}
                            />
                            {errors[`${index}-aadhaarNumber`] && <p className="text-sm text-red-500">{errors[`${index}-aadhaarNumber`]}</p>}
                        </div>
                    </div>

                    {/* Residential Address */}
                    <h3 className="mt-10 font-semibold text-md">Residential Address</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">PIN Code</label>
                            <input
                                type="text"
                                placeholder="PIN Code"
                                className="w-full input input-bordered"
                                value={director.pinCode}
                                onChange={(e) => handleInputChange(index, 'pinCode', e.target.value)}
                            />
                            {errors[`${index}-pinCode`] && <p className="text-sm text-red-500">{errors[`${index}-pinCode`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <input
                                type="text"
                                value="Delhi"
                                readOnly
                                className="w-full input input-bordered"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">District</label>
                            <input
                                type="text"
                                placeholder="District"
                                className="w-full input input-bordered"
                                value={director.district}
                                onChange={(e) => handleInputChange(index, 'district', e.target.value)}
                            />
                            {errors[`${index}-district`] && <p className="text-sm text-red-500">{errors[`${index}-district`]}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">City / Town / Village</label>
                            <input
                                type="text"
                                placeholder="City / Town / Village"
                                className="w-full input input-bordered"
                                value={director.city}
                                onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                            />
                            {errors[`${index}-city`] && <p className="text-sm text-red-500">{errors[`${index}-city`]}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Locality / Sub Locality</label>
                            <input
                                type="text"
                                placeholder="Locality / Sub Locality"
                                className="w-full input input-bordered"
                                value={director.locality}
                                onChange={(e) => handleInputChange(index, 'locality', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Road / Street / Lane</label>
                            <input
                                type="text"
                                placeholder="Road / Street / Lane"
                                className="w-full input input-bordered"
                                value={director.road}
                                onChange={(e) => handleInputChange(index, 'road', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Name of the Premises / Building</label>
                            <input
                                type="text"
                                placeholder="Name of the Premises / Building"
                                className="w-full input input-bordered"
                                value={director.premisesName}
                                onChange={(e) => handleInputChange(index, 'premisesName', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Building No. / Flat No.</label>
                            <input
                                type="text"
                                placeholder="Building No. / Flat No."
                                className="w-full input input-bordered"
                                value={director.buildingNumber}
                                onChange={(e) => handleInputChange(index, 'buildingNumber', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Floor No.</label>
                            <input
                                type="text"
                                placeholder="Floor No."
                                className="w-full input input-bordered"
                                value={director.floorNumber}
                                onChange={(e) => handleInputChange(index, 'floorNumber', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Nearby Landmark</label>
                            <input
                                type="text"
                                placeholder="Nearby Landmark"
                                className="w-full input input-bordered"
                                value={director.landmark}
                                onChange={(e) => handleInputChange(index, 'landmark', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Latitude</label>
                            <input
                                type="text"
                                placeholder="Latitude"
                                className="w-full input input-bordered"
                                value={director.latitude}
                                onChange={(e) => handleInputChange(index, 'latitude', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Longitude</label>
                            <input
                                type="text"
                                placeholder="Longitude"
                                className="w-full input input-bordered"
                                value={director.longitude}
                                onChange={(e) => handleInputChange(index, 'longitude', e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="w-full mt-4 btn btn-outline"
                        onClick={() => {
                            const updatedDirectors = [...directors];
                            updatedDirectors[index] = {
                                ...updatedDirectors[index],
                                pinCode: '',
                                district: '',
                                city: '',
                                locality: '',
                                road: '',
                                premisesName: '',
                                buildingNumber: '',
                                floorNumber: '',
                                landmark: '',
                                latitude: '',
                                longitude: '',
                            };
                            setDirectors(updatedDirectors);
                        }}
                    >
                        Reset Address
                    </button>

                    {/* Document Upload */}
                    <h3 className="mt-10 font-semibold text-md">Document Upload</h3>
                    <label className="block text-sm font-medium">Photograph (Of person whose info is given above)</label>
                    <input
                        type="file"
                        className="w-full file-input file-input-bordered"
                        onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                    />
                    {errors[`${index}-photograph`] && <p className="text-sm text-red-500">{errors[`${index}-photograph`]}</p>}

                    {/* Other Information */}
                    <h3 className="mt-10 font-semibold text-md">Other Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <label className="flex items-center space-x-2 text-sm font-medium">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={director.isAuthorizedSignatory}
                                onChange={(e) => handleInputChange(index, 'isAuthorizedSignatory', e.target.checked)}
                            />
                            <span>Also Authorized Signatory</span>
                        </label>
                    </div>
                </div >
            ))}
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-outline" onClick={addNewDirector}>Add New</button>
                <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>Save & Continue</button>
            </div>
        </div >
    );
}

export default Promoter;
