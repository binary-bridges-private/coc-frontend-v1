import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TdsRegister = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpData, setOtpData] = useState({
        emailOtp: "",
        mobileOtp: "",
    });
    const [otpErrors, setOtpErrors] = useState({
        emailOtp: "",
        mobileOtp: "",
    });

    const [formData, setFormData] = useState({
        otherType: "", // For user types
        tan: "",
        eriOption: "", // For e-return Intermediary options
        
        // External Agency specific fields
        externalAgencyType: "",
        serviceType: "",
        organizationPan: "",
        organizationTan: "",
        organizationName: "",
        tanAllotmentDate: "",
        organizationLandline: "",
        organizationEmail: "",
        
        // Contact Details
        primaryMobile: "",
        mobileBelongsTo: "",
        primaryEmail: "",
        emailBelongsTo: "",
        landlineNumber: "",
        
        // Postal Address Details
        country: "",
        flatDoorBuilding: "",
        roadStreetBlock: "",
        postOffice: "",
        areaLocality: "",
        townCityDistrict: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({
        otherType: "",
        tan: "",
        eriOption: "",
        externalAgencyType: "",
        serviceType: "",
        organizationPan: "",
        organizationTan: "",
        organizationName: "",
        tanAllotmentDate: "",
        organizationLandline: "",
        organizationEmail: "",
        primaryMobile: "",
        mobileBelongsTo: "",
        primaryEmail: "",
        emailBelongsTo: "",
        landlineNumber: "",
        country: "",
        flatDoorBuilding: "",
        roadStreetBlock: "",
        postOffice: "",
        areaLocality: "",
        townCityDistrict: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateTan = (tan: string) => {
        const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
        return tanRegex.test(tan.toUpperCase());
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateLandline = (landline: string) => {
        const landlineRegex = /^[0-9]{10,12}$/;
        return landlineRegex.test(landline);
    };

    const validateMobile = (mobile: string) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    };

    const validatePincode = (pincode: string) => {
        const pincodeRegex = /^[0-9]{6}$/;
        return pincodeRegex.test(pincode);
    };

    const validateStep = (stepNumber: number) => {
        const newErrors = { ...errors };
        let isValid = true;

        switch (stepNumber) {
            case 1:
                if (!formData.otherType) {
                    newErrors.otherType = "Please select a type";
                    isValid = false;
                }

                if (formData.otherType === "External Agency") {
                    if (!formData.externalAgencyType) {
                        newErrors.externalAgencyType = "Please select an agency type";
                        isValid = false;
                    }
                    
                    if (!formData.serviceType) {
                        newErrors.serviceType = "Please select a service type";
                        isValid = false;
                    }

                    if (!formData.organizationPan) {
                        newErrors.organizationPan = "PAN of Organization is required";
                        isValid = false;
                    }

                    if (!formData.organizationTan) {
                        newErrors.organizationTan = "TAN of Organization is required";
                        isValid = false;
                    } else if (!validateTan(formData.organizationTan)) {
                        newErrors.organizationTan = "Invalid TAN format";
                        isValid = false;
                    }

                    if (!formData.organizationName) {
                        newErrors.organizationName = "Organization Name is required";
                        isValid = false;
                    }

                    if (!formData.tanAllotmentDate) {
                        newErrors.tanAllotmentDate = "Date of TAN allotment is required";
                        isValid = false;
                    }

                    if (!formData.organizationLandline) {
                        newErrors.organizationLandline = "Landline Number is required";
                        isValid = false;
                    } else if (!validateLandline(formData.organizationLandline)) {
                        newErrors.organizationLandline = "Invalid landline number format";
                        isValid = false;
                    }

                    if (!formData.organizationEmail) {
                        newErrors.organizationEmail = "Organization Email is required";
                        isValid = false;
                    } else if (!validateEmail(formData.organizationEmail)) {
                        newErrors.organizationEmail = "Invalid email format";
                        isValid = false;
                    }
                }

                if (formData.otherType === "Tax Deductor and Collector") {
                    if (!formData.tan) {
                        newErrors.tan = "TAN is required";
                        isValid = false;
                    } else if (!validateTan(formData.tan)) {
                        newErrors.tan = "Invalid TAN format";
                        isValid = false;
                    }
                }

                if (formData.otherType === "e-return Intermediary") {
                    if (!formData.eriOption) {
                        newErrors.eriOption = "Please select an option";
                        isValid = false;
                    }
                }
                break;

            case 2:
                if (!formData.primaryMobile) {
                    newErrors.primaryMobile = "Primary Mobile Number is required";
                    isValid = false;
                } else if (!validateMobile(formData.primaryMobile)) {
                    newErrors.primaryMobile = "Invalid mobile number format";
                    isValid = false;
                }

                if (!formData.mobileBelongsTo) {
                    newErrors.mobileBelongsTo = "Please select who the mobile number belongs to";
                    isValid = false;
                }

                if (!formData.primaryEmail) {
                    newErrors.primaryEmail = "Primary Email ID is required";
                    isValid = false;
                } else if (!validateEmail(formData.primaryEmail)) {
                    newErrors.primaryEmail = "Invalid email format";
                    isValid = false;
                }

                if (!formData.emailBelongsTo) {
                    newErrors.emailBelongsTo = "Please select who the email belongs to";
                    isValid = false;
                }
                break;

            case 3:
                if (!formData.country) {
                    newErrors.country = "Country is required";
                    isValid = false;
                }

                if (!formData.flatDoorBuilding) {
                    newErrors.flatDoorBuilding = "Flat/Door/Building is required";
                    isValid = false;
                }

                if (!formData.roadStreetBlock) {
                    newErrors.roadStreetBlock = "Road/Street/Block/Sector is required";
                    isValid = false;
                }

                if (!formData.pincode) {
                    newErrors.pincode = "Pincode is required";
                    isValid = false;
                } else if (!validatePincode(formData.pincode)) {
                    newErrors.pincode = "Invalid pincode format";
                    isValid = false;
                }

                if (!formData.postOffice) {
                    newErrors.postOffice = "Post Office is required";
                    isValid = false;
                }

                if (!formData.areaLocality) {
                    newErrors.areaLocality = "Area/Locality is required";
                    isValid = false;
                }

                if (!formData.townCityDistrict) {
                    newErrors.townCityDistrict = "Town/City/District is required";
                    isValid = false;
                }

                if (!formData.state) {
                    newErrors.state = "State is required";
                    isValid = false;
                }
                break;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOtpData(prev => ({ ...prev, [name]: value }));
        setOtpErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateOtp = () => {
        const newErrors = { ...otpErrors };
        let isValid = true;

        if (!otpData.emailOtp) {
            newErrors.emailOtp = "Email OTP is required";
            isValid = false;
        } else if (otpData.emailOtp.length !== 6) {
            newErrors.emailOtp = "Email OTP must be 6 digits";
            isValid = false;
        }

        if (!otpData.mobileOtp) {
            newErrors.mobileOtp = "Mobile OTP is required";
            isValid = false;
        } else if (otpData.mobileOtp.length !== 6) {
            newErrors.mobileOtp = "Mobile OTP must be 6 digits";
            isValid = false;
        }

        setOtpErrors(newErrors);
        return isValid;
    };

    const handleSendOtp = async () => {
        setIsLoading(true);
        try {
            // API call to send OTP would go here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
            setOtpSent(true);
            setSaveError(null);
        } catch (error) {
            setSaveError("Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (validateOtp()) {
            setIsLoading(true);
            try {
                // API call to verify OTP would go here
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
                navigate("/practice/tds/login");
            } catch (error) {
                setSaveError("Failed to verify OTP. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleNextStep = async () => {
        if (validateStep(step)) {
            if (step === 3) {
                setShowOtpVerification(true);
            } else {
                setStep(step + 1);
            }
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    return (
        <>
            <div className="p-4 mt-4 text-lg text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md">
                Please do not refresh otherwise the progress will be lost!
            </div>

            <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200">
                <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
                    <li
                        className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate("/practice")}
                    >
                        <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
                        </svg>
                        Practice
                    </li>
                    <span className="text-gray-400">›</span>
                    <li
                        className="transition duration-200 cursor-pointer hover:text-blue-600"
                        onClick={() => navigate("/practice/tds")}
                    >
                        TDS
                    </li>
                    <span className="text-gray-400">›</span>
                    <li className="text-gray-500">Registration</li>
                </ul>
            </div>

            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    {showOtpVerification ? "Verify OTP" : 
                        `Step ${step} of 3: ${step === 1 ? "Register as" : 
                                        step === 2 ? "Contact Details" : 
                                        "Postal Address Details"}`
                    }
                </h2>
            </div>

            <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
                {!showOtpVerification ? (
                    <>
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block mb-4 text-lg font-medium text-gray-700">
                                        Select Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="otherType"
                                        value={formData.otherType}
                                        onChange={handleChange}
                                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.otherType ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="">Select type</option>
                                        <option value="Tax Deductor and Collector">Tax Deductor and Collector</option>
                                        <option value="External Agency">External Agency</option>
                                        <option value="e-return Intermediary">e-return Intermediary</option>
                                    </select>
                                    {errors.otherType && <p className="mt-1 text-sm text-red-500">{errors.otherType}</p>}
                                </div>

                                {formData.otherType === "External Agency" && (
                                    <>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                External Agency Type <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="externalAgencyType"
                                                value={formData.externalAgencyType}
                                                onChange={handleChange}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.externalAgencyType ? "border-red-500" : "border-gray-300"}`}
                                            >
                                                <option value="">Select agency type</option>
                                                <option value="Central Government Department/Agency">Central Government Department/Agency</option>
                                                <option value="State Government Department/Agency">State Government Department/Agency</option>
                                                <option value="RBI approved Banks">RBI approved Banks</option>
                                                <option value="Approved Undertaking Agency">Approved Undertaking Agency</option>
                                            </select>
                                            {errors.externalAgencyType && <p className="mt-1 text-sm text-red-500">{errors.externalAgencyType}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Type of service required <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="serviceType"
                                                value={formData.serviceType}
                                                onChange={handleChange}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.serviceType ? "border-red-500" : "border-gray-300"}`}
                                            >
                                                <option value="">Select service type</option>
                                                <option value="file/upload form">File/Upload Form</option>
                                            </select>
                                            {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                PAN of Organization <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="organizationPan"
                                                value={formData.organizationPan}
                                                onChange={handleChange}
                                                placeholder="Enter PAN number"
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.organizationPan ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors.organizationPan && <p className="mt-1 text-sm text-red-500">{errors.organizationPan}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                TAN of Organization <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="organizationTan"
                                                value={formData.organizationTan}
                                                onChange={handleChange}
                                                placeholder="Enter TAN number"
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.organizationTan ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors.organizationTan && <p className="mt-1 text-sm text-red-500">{errors.organizationTan}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Organization Name (as per TAN) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="organizationName"
                                                value={formData.organizationName}
                                                onChange={handleChange}
                                                placeholder="Enter organization name"
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.organizationName ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors.organizationName && <p className="mt-1 text-sm text-red-500">{errors.organizationName}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Date of TAN allotment <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="tanAllotmentDate"
                                                value={formData.tanAllotmentDate}
                                                onChange={handleChange}
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.tanAllotmentDate ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors.tanAllotmentDate && <p className="mt-1 text-sm text-red-500">{errors.tanAllotmentDate}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                Landline Number of Organization <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="organizationLandline"
                                                value={formData.organizationLandline}
                                                onChange={handleChange}
                                                placeholder="Enter landline number"
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.organizationLandline ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors.organizationLandline && <p className="mt-1 text-sm text-red-500">{errors.organizationLandline}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                                E-mail of Organization <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="organizationEmail"
                                                value={formData.organizationEmail}
                                                onChange={handleChange}
                                                placeholder="Enter organization email"
                                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.organizationEmail ? "border-red-500" : "border-gray-300"}`}
                                            />
                                            {errors.organizationEmail && <p className="mt-1 text-sm text-red-500">{errors.organizationEmail}</p>}
                                        </div>
                                    </>
                                )}

                                {formData.otherType === "Tax Deductor and Collector" && (
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            TAN of Organization <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="tan"
                                            value={formData.tan}
                                            onChange={handleChange}
                                            placeholder="Enter TAN number"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.tan ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.tan && <p className="mt-1 text-sm text-red-500">{errors.tan}</p>}
                                    </div>
                                )}

                                {formData.otherType === "e-return Intermediary" && (
                                    <div>
                                        <label className="block mb-4 text-lg font-medium text-gray-700">
                                            Select Option <span className="text-red-500">*</span>
                                        </label>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="newApplicant"
                                                    name="eriOption"
                                                    value="newApplicant"
                                                    checked={formData.eriOption === "newApplicant"}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label htmlFor="newApplicant" className="ml-2 text-sm font-medium text-gray-700">
                                                    Register as new Applicant
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="oldSystem"
                                                    name="eriOption"
                                                    value="oldSystem"
                                                    checked={formData.eriOption === "oldSystem"}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label htmlFor="oldSystem" className="ml-2 text-sm font-medium text-gray-700">
                                                    Register using 1.0 (old e-filing system) active ERI User Id/Software Provider Id
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="checkStatus"
                                                    name="eriOption"
                                                    value="checkStatus"
                                                    checked={formData.eriOption === "checkStatus"}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <label htmlFor="checkStatus" className="ml-2 text-sm font-medium text-gray-700">
                                                    Check Registration Status
                                                </label>
                                            </div>
                                        </div>
                                        {errors.eriOption && <p className="mt-1 text-sm text-red-500">{errors.eriOption}</p>}
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-700">Contact Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Primary Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="primaryMobile"
                                            value={formData.primaryMobile}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.primaryMobile ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.primaryMobile && <p className="mt-1 text-sm text-red-500">{errors.primaryMobile}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Primary Mobile Number Belongs to <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="mobileBelongsTo"
                                            value={formData.mobileBelongsTo}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.mobileBelongsTo ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option value="">Select option</option>
                                            <option value="Self">Self</option>
                                            <option value="Sister">Sister</option>
                                            <option value="Brother">Brother</option>
                                            <option value="Friend">Friend</option>
                                            <option value="Son">Son</option>
                                            <option value="Relative">Relative</option>
                                        </select>
                                        {errors.mobileBelongsTo && <p className="mt-1 text-sm text-red-500">{errors.mobileBelongsTo}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Primary Email ID <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="primaryEmail"
                                            value={formData.primaryEmail}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.primaryEmail ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.primaryEmail && <p className="mt-1 text-sm text-red-500">{errors.primaryEmail}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Primary Email ID Belongs to <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="emailBelongsTo"
                                            value={formData.emailBelongsTo}
                                            onChange={handleChange}
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.emailBelongsTo ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option value="">Select option</option>
                                            <option value="Self">Self</option>
                                            <option value="Sister">Sister</option>
                                            <option value="Brother">Brother</option>
                                            <option value="Friend">Friend</option>
                                            <option value="Son">Son</option>
                                            <option value="Relative">Relative</option>
                                        </select>
                                        {errors.emailBelongsTo && <p className="mt-1 text-sm text-red-500">{errors.emailBelongsTo}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Landline Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="landlineNumber"
                                            value={formData.landlineNumber}
                                            onChange={handleChange}
                                            placeholder="Enter landline number"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-700">Postal Address Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="Enter country"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.country ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Flat/Door/Building <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="flatDoorBuilding"
                                            value={formData.flatDoorBuilding}
                                            onChange={handleChange}
                                            placeholder="Enter flat/door/building"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.flatDoorBuilding ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.flatDoorBuilding && <p className="mt-1 text-sm text-red-500">{errors.flatDoorBuilding}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Road/Street/Block/Sector <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="roadStreetBlock"
                                            value={formData.roadStreetBlock}
                                            onChange={handleChange}
                                            placeholder="Enter road/street/block/sector"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.roadStreetBlock ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.roadStreetBlock && <p className="mt-1 text-sm text-red-500">{errors.roadStreetBlock}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="Enter pincode"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Post Office <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="postOffice"
                                            value={formData.postOffice}
                                            onChange={handleChange}
                                            placeholder="Enter post office"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.postOffice ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.postOffice && <p className="mt-1 text-sm text-red-500">{errors.postOffice}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Area/Locality <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="areaLocality"
                                            value={formData.areaLocality}
                                            onChange={handleChange}
                                            placeholder="Enter area/locality"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.areaLocality ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.areaLocality && <p className="mt-1 text-sm text-red-500">{errors.areaLocality}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Town/City/District <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="townCityDistrict"
                                            value={formData.townCityDistrict}
                                            onChange={handleChange}
                                            placeholder="Enter town/city/district"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.townCityDistrict ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.townCityDistrict && <p className="mt-1 text-sm text-red-500">{errors.townCityDistrict}</p>}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Enter state"
                                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
                                        />
                                        {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="mb-6 text-xl font-semibold text-gray-700">Verify Your Contact Details</h3>
                        
                        <div className="mb-6">
                            <p className="text-gray-600">
                                We have sent OTP to your registered email ({formData.primaryEmail}) and mobile number ({formData.primaryMobile}).
                                Please enter the OTPs to verify your contact details.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Email OTP <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="emailOtp"
                                    value={otpData.emailOtp}
                                    onChange={handleOtpChange}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${otpErrors.emailOtp ? "border-red-500" : "border-gray-300"}`}
                                />
                                {otpErrors.emailOtp && <p className="mt-1 text-sm text-red-500">{otpErrors.emailOtp}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Mobile OTP <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="mobileOtp"
                                    value={otpData.mobileOtp}
                                    onChange={handleOtpChange}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${otpErrors.mobileOtp ? "border-red-500" : "border-gray-300"}`}
                                />
                                {otpErrors.mobileOtp && <p className="mt-1 text-sm text-red-500">{otpErrors.mobileOtp}</p>}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    onClick={handleSendOtp}
                                    disabled={isLoading || otpSent}
                                    className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        isLoading || otpSent ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    {otpSent ? "OTP Sent" : "Resend OTP"}
                                </button>

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={isLoading}
                                    className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </div>
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!showOtpVerification && (
                    <div className="flex justify-between mt-8">
                        {step > 1 && (
                            <button
                                onClick={handlePreviousStep}
                                className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            onClick={handleNextStep}
                            disabled={isLoading}
                            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
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
                                step === 3 ? "Submit" : "Next"
                            )}
                        </button>
                    </div>
                )}
                {saveError && (
                    <div className="mt-2 text-sm text-red-500">{saveError}</div>
                )}
            </div>
        </>
    );
};

export default TdsRegister;