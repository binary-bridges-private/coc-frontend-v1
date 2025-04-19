import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";
import { useAppDispatch } from "../../../../../store/hooks.ts";

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
    gstRegistratinId: string | null;
}

const Promoter: React.FC<Props> = ({ setStep, setPromoterData, gstRegistratinId }) => {
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
            state: '',
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
            state: '',
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

    // const validateForm = (director: Director): boolean => {
    //     const requiredFields = [
    //         'firstName',
    //         'lastName',
    //         'dateOfBirth',
    //         'mobileNumber',
    //         'email',
    //         'gender',
    //         'designation',
    //         'directorIdentificationNumber',
    //         'pan',
    //         'aadhaarNumber',
    //         'pinCode',
    //         'district',
    //         'city',
    //     ];

    //     for (const field of requiredFields) {
    //         if (!director[field as keyof Director]) {
    //             return false;
    //         }
    //     }

    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if (!emailRegex.test(director.email)) {
    //         return false;
    //     }

    //     const mobileRegex = /^[0-9]{10}$/;
    //     if (!mobileRegex.test(director.mobileNumber)) {
    //         return false;
    //     }

    //     return true;
    // };

    // const handleInputChange = (index: number, field: keyof Director, value: string | boolean | File) => {
    //     const updatedDirectors = [...directors];
    //     updatedDirectors[index] = { ...updatedDirectors[index], [field]: value };
    //     setDirectors(updatedDirectors);

    //     setErrors((prevErrors) => {
    //         const newErrors = { ...prevErrors };
    //         delete newErrors[`${index}-${field}`];
    //         return newErrors;
    //     });
    // };

    // const handleFileChange = (index: number, file: File | null) => {
    //     const updatedDirectors = [...directors];
    //     updatedDirectors[index].photograph = file;
    //     setDirectors(updatedDirectors);
    // };

    // const dispatch = useAppDispatch();

    // const handleSave = async (directors: any) => {
    //     try {
    //         const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, promoter: directors })).unwrap();
    //         console.log('Save successful:', result.data);
    //         return true;
    //     } catch (error) {
    //         console.error('Save failed:', error);
    //         return false;
    //     }
    // };

    // const handleSubmit = async (directors: any) => {
    //     const newErrors: { [key: string]: string } = {};

    //     directors.forEach((director, index) => {
    //         if (!validateForm(director)) {
    //             if (!director.firstName) newErrors[`${index}-firstName`] = 'First Name is required';
    //             if (!director.lastName) newErrors[`${index}-lastName`] = 'Last Name is required';
    //             if (!director.dateOfBirth) newErrors[`${index}-dateOfBirth`] = 'Date of Birth is required';
    //             if (!director.mobileNumber) newErrors[`${index}-mobileNumber`] = 'Mobile Number is required';
    //             if (!director.email) newErrors[`${index}-email`] = 'Email is required';
    //             if (!director.gender) newErrors[`${index}-gender`] = 'Gender is required';
    //             if (!director.designation) newErrors[`${index}-designation`] = 'Designation is required';
    //             if (!director.directorIdentificationNumber) newErrors[`${index}-directorIdentificationNumber`] = 'Director Identification Number is required';
    //             if (!director.pan) newErrors[`${index}-pan`] = 'PAN is required';
    //             if (!director.aadhaarNumber) newErrors[`${index}-aadhaarNumber`] = 'Aadhaar Number is required';
    //             if (!director.pinCode) newErrors[`${index}-pinCode`] = 'PIN Code is required';
    //             if (!director.district) newErrors[`${index}-district`] = 'District is required';
    //             if (!director.city) newErrors[`${index}-city`] = 'City is required';
    //         }
    //     });

    //     console.log(newErrors);
    //     if (Object.keys(newErrors).length > 0) {
    //         setErrors(newErrors);
    //         return;
    //     }
    //     const success = await handleSave(directors);

    //     if (success) {
    //         for (let i = 0; i < directors.length; i++) {
    //             if (directors[i].isAuthorizedSignatory) {
    //                 setStep(5);
    //                 return;
    //             }
    //         }
    //         setPromoterData(directors);
    //         setStep(4);
    //     }
    // }


    const validateForm = (director: Director): boolean => {
        const requiredFields = [
            'firstName',
            'lastName',
            'dateOfBirth',
            'mobileNumber',
            'email',
            'gender',
            'designation',
            'pan',
            'aadhaarNumber',
            'pinCode',
            'district',
            'city',
        ];

        for (const field of requiredFields) {
            if (!director[field as keyof Director]) {
                return false;
            }
        }

        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // if (!emailRegex.test(director.email)) {
        //     return false;
        // }

        // const mobileRegex = /^[0-9]{10}$/;
        // if (!mobileRegex.test(director.mobileNumber)) {
        //     return false;
        // }

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

    const dispatch = useAppDispatch();

    const handleSave = async (directors: any) => {
        try {
            const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, promoter: directors })).unwrap();
            console.log('Save successful:', result.data);
            return true;
        } catch (error) {
            console.error('Save failed:', error);
            return false;
        }
    };

    const handleSubmit = async (directors: any) => {
        const newErrors: { [key: string]: string } = {};

        directors.forEach((director, index) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const mobileRegex = /^[0-9]{10}$/;
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            const aadhaarRegex = /^\d{12}$/;
            const pinCodeRegex = /^\d{6}$/;

            if (!director.firstName) newErrors[`${index}-firstName`] = 'First Name is required';
            if (!director.lastName) newErrors[`${index}-lastName`] = 'Last Name is required';
            if (!director.dateOfBirth) newErrors[`${index}-dateOfBirth`] = 'Date of Birth is required';

            if (!director.mobileNumber) {
                newErrors[`${index}-mobileNumber`] = 'Mobile Number is required';
            } else if (!mobileRegex.test(director.mobileNumber)) {
                newErrors[`${index}-mobileNumber`] = 'Invalid Mobile Number';
            }

            if (!director.email) {
                newErrors[`${index}-email`] = 'Email is required';
            } else if (!emailRegex.test(director.email)) {
                newErrors[`${index}-email`] = 'Invalid Email';
            }

            if (!director.gender) newErrors[`${index}-gender`] = 'Gender is required';
            if (!director.designation) newErrors[`${index}-designation`] = 'Designation is required';

            if (!director.pan) {
                newErrors[`${index}-pan`] = 'PAN is required';
            } else if (!panRegex.test(director.pan)) {
                newErrors[`${index}-pan`] = 'Invalid PAN format (e.g., ABCDE1234F)';
            }

            if (!director.aadhaarNumber) {
                newErrors[`${index}-aadhaarNumber`] = 'Aadhaar Number is required';
            } else if (!aadhaarRegex.test(director.aadhaarNumber)) {
                newErrors[`${index}-aadhaarNumber`] = 'Aadhaar must be a 12-digit number';
            }

            if (!director.pinCode) {
                newErrors[`${index}-pinCode`] = 'PIN Code is required';
            } else if (!pinCodeRegex.test(director.pinCode)) {
                newErrors[`${index}-pinCode`] = 'PIN Code must be 6 digits';
            }
            if (!director.district) newErrors[`${index}-district`] = 'District is required';
            if (!director.city) newErrors[`${index}-city`] = 'City is required';
        });

        console.log(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const success = await handleSave(directors);
            setPromoterData(directors);
            for (let i = 0; i < directors.length; i++) {
                if (directors[i].isAuthorizedSignatory) {
                    setStep(5);
                    return;
                }
            }
            setStep(4);
            return true;
        }
        catch(error) {
            console.error('Submission failed:', error);
            newErrors['form'] = 'Submission failed. Please try again.';
            setErrors(newErrors);
            return false;
        }
    };


    // Standardized input classes
    const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
    const selectClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white";
    const checkboxClass = "checkbox checkbox-primary";
    const toggleClass = "toggle toggle-primary";
    const fileInputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
    const buttonClass = "px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500";
    const primaryButtonClass = `${buttonClass} bg-blue-600 text-white hover:bg-blue-700`;
    const outlineButtonClass = `${buttonClass} border border-gray-300 hover:bg-gray-100`;
    const errorButtonClass = `${buttonClass} bg-red-500 text-white hover:bg-red-600`;

    return (
        <>
            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Promoter Details
                </h2>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                {directors.map((director, index) => (
                    <div key={index} className="p-6 mb-6 space-y-6 border rounded-lg shadow-sm">
                        {directors.length > 1 && (
                            <button
                                onClick={() => removeDirector(index)}
                                className="float-right p-1 text-red-500 hover:text-red-700"
                                aria-label="Remove director"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}

                        {/* Personal Information */}
                        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={inputClass}
                                    value={director.firstName}
                                    onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                                />
                                {errors[`${index}-firstName`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-firstName`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Middle Name</label>
                                <input
                                    type="text"
                                    placeholder="Middle Name"
                                    className={inputClass}
                                    value={director.middleName}
                                    onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className={inputClass}
                                    value={director.lastName}
                                    onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                                />
                                {errors[`${index}-lastName`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-lastName`]}</p>}
                            </div>
                        </div>

                        {/* Father's Information */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Father's First Name</label>
                                <input
                                    type="text"
                                    placeholder="Father's First Name"
                                    className={inputClass}
                                    value={director.fathersFirstName}
                                    onChange={(e) => handleInputChange(index, 'fathersFirstName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Father's Middle Name</label>
                                <input
                                    type="text"
                                    placeholder="Father's Middle Name"
                                    className={inputClass}
                                    value={director.fathersMiddleName}
                                    onChange={(e) => handleInputChange(index, 'fathersMiddleName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Father's Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Father's Last Name"
                                    className={inputClass}
                                    value={director.fathersLastName}
                                    onChange={(e) => handleInputChange(index, 'fathersLastName', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    className={inputClass}
                                    value={director.dateOfBirth}
                                    onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                                />
                                {errors[`${index}-dateOfBirth`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-dateOfBirth`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    className={inputClass}
                                    value={director.mobileNumber}
                                    onChange={(e) => handleInputChange(index, 'mobileNumber', e.target.value)}
                                />
                                {errors[`${index}-mobileNumber`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-mobileNumber`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className={inputClass}
                                    value={director.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                />
                                {errors[`${index}-email`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-email`]}</p>}
                            </div>
                        </div>

                        {/* Gender and Telephone */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    className={selectClass}
                                    value={director.gender}
                                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors[`${index}-gender`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-gender`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Telephone Number</label>
                                <input
                                    type="text"
                                    placeholder="Telephone Number"
                                    className={inputClass}
                                    value={director.telephoneNumber}
                                    onChange={(e) => handleInputChange(index, 'telephoneNumber', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Identity Information */}
                        <h3 className="mt-8 text-lg font-semibold text-gray-700">Identity Information</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Designation</label>
                                <input
                                    type="text"
                                    placeholder="Designation"
                                    className={inputClass}
                                    value={director.designation}
                                    onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                />
                                {errors[`${index}-designation`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-designation`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Director ID Number</label>
                                <input
                                    type="text"
                                    placeholder="Director Identification Number"
                                    className={inputClass}
                                    value={director.directorIdentificationNumber}
                                    onChange={(e) => handleInputChange(index, 'directorIdentificationNumber', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <input
                                        type="checkbox"
                                        className={checkboxClass}
                                        checked={director.isIndianCitizen}
                                        onChange={(e) => handleInputChange(index, 'isIndianCitizen', e.target.checked)}
                                    />
                                    Citizen of India?
                                </label>
                            </div>
                        </div>

                        {/* Document Numbers */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">PAN Number</label>
                                <input
                                    type="text"
                                    placeholder="Permanent Account Number"
                                    className={inputClass}
                                    value={director.pan}
                                    onChange={(e) => handleInputChange(index, 'pan', e.target.value)}
                                />
                                {errors[`${index}-pan`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-pan`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Passport Number</label>
                                <input
                                    type="text"
                                    placeholder="Passport Number (if foreign)"
                                    className={inputClass}
                                    value={director.passportNumber}
                                    onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Aadhaar Number</label>
                                <input
                                    type="text"
                                    placeholder="Aadhaar Number"
                                    className={inputClass}
                                    value={director.aadhaarNumber}
                                    onChange={(e) => handleInputChange(index, 'aadhaarNumber', e.target.value)}
                                />
                                {errors[`${index}-aadhaarNumber`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-aadhaarNumber`]}</p>}
                            </div>
                        </div>

                        {/* Residential Address */}
                        <h3 className="mt-8 text-lg font-semibold text-gray-700">Residential Address</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">PIN Code</label>
                                <input
                                    type="text"
                                    placeholder="PIN Code"
                                    className={inputClass}
                                    value={director.pinCode}
                                    onChange={(e) => handleInputChange(index, 'pinCode', e.target.value)}
                                />
                                {errors[`${index}-pinCode`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-pinCode`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    value={director.state}
                                    readOnly
                                    className={`${inputClass} bg-gray-100`}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">District</label>
                                <input
                                    type="text"
                                    placeholder="District"
                                    className={inputClass}
                                    value={director.district}
                                    onChange={(e) => handleInputChange(index, 'district', e.target.value)}
                                />
                                {errors[`${index}-district`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-district`]}</p>}
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">City/Town/Village</label>
                                <input
                                    type="text"
                                    placeholder="City / Town / Village"
                                    className={inputClass}
                                    value={director.city}
                                    onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                                />
                                {errors[`${index}-city`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-city`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Locality</label>
                                <input
                                    type="text"
                                    placeholder="Locality / Sub Locality"
                                    className={inputClass}
                                    value={director.locality}
                                    onChange={(e) => handleInputChange(index, 'locality', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Road/Street</label>
                                <input
                                    type="text"
                                    placeholder="Road / Street / Lane"
                                    className={inputClass}
                                    value={director.road}
                                    onChange={(e) => handleInputChange(index, 'road', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Building Details */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Premises/Building</label>
                                <input
                                    type="text"
                                    placeholder="Name of the Premises / Building"
                                    className={inputClass}
                                    value={director.premisesName}
                                    onChange={(e) => handleInputChange(index, 'premisesName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Building/Flat No.</label>
                                <input
                                    type="text"
                                    placeholder="Building No. / Flat No."
                                    className={inputClass}
                                    value={director.buildingNumber}
                                    onChange={(e) => handleInputChange(index, 'buildingNumber', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Floor No.</label>
                                <input
                                    type="text"
                                    placeholder="Floor No."
                                    className={inputClass}
                                    value={director.floorNumber}
                                    onChange={(e) => handleInputChange(index, 'floorNumber', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Landmark</label>
                                <input
                                    type="text"
                                    placeholder="Nearby Landmark"
                                    className={inputClass}
                                    value={director.landmark}
                                    onChange={(e) => handleInputChange(index, 'landmark', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    placeholder="Latitude"
                                    className={inputClass}
                                    value={director.latitude}
                                    onChange={(e) => handleInputChange(index, 'latitude', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    placeholder="Longitude"
                                    className={inputClass}
                                    value={director.longitude}
                                    onChange={(e) => handleInputChange(index, 'longitude', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Reset Address Button */}
                        <button
                            className={`${outlineButtonClass} mt-4`}
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
                        <h3 className="mt-8 text-lg font-semibold text-gray-700">Document Upload</h3>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Photograph</label>
                            <input
                                type="file"
                                className={fileInputClass}
                                onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                                accept="image/*"
                            />
                            {errors[`${index}-photograph`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-photograph`]}</p>}
                        </div>

                        {/* Other Information */}
                        <h3 className="mt-8 text-lg font-semibold text-gray-700">Other Information</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className={checkboxClass}
                                checked={director.isAuthorizedSignatory}
                                onChange={(e) => handleInputChange(index, 'isAuthorizedSignatory', e.target.checked)}
                            />
                            <label className="text-sm font-medium text-gray-700">Also Authorized Signatory</label>
                        </div>
                    </div>
                ))}

                {/* Form Actions */}
                <div className="flex justify-end gap-4 mt-6">
                    <button className={outlineButtonClass} onClick={() => setStep(2)}>Back</button>
                    <button className={outlineButtonClass} onClick={addNewDirector}>Add New Promoter</button>
                    <button className={primaryButtonClass} onClick={() => handleSubmit(directors)}>Save & Continue</button>
                </div>
            </div>
        </>
    );
};

export default Promoter;