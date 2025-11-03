import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
    identifier: string;
    identifierConfirm: string;
    identifierType: "PAN" | "TAN";
    name: string;
    mobileNumber: string;
    amount: string;
    paymentMode: string;
    otp: string;
}

interface FormErrors {
    identifier: string;
    identifierConfirm: string;
    identifierType: string;
    name: string;
    mobileNumber: string;
    amount: string;
    paymentMode: string;
    otp: string;
}

const OTP_EXPIRY_TIME = 120; // 2 minutes in seconds
const MAX_OTP_ATTEMPTS = 3;

const PayTds = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        identifier: "",
        identifierConfirm: "",
        identifierType: "PAN",
        name: "",
        mobileNumber: "",
        amount: "",
        paymentMode: "online",
        otp: "",
    });

    const [errors, setErrors] = useState<FormErrors>({
        identifier: "",
        identifierConfirm: "",
        identifierType: "",
        name: "",
        mobileNumber: "",
        amount: "",
        paymentMode: "",
        otp: "",
    });

    // OTP related states
    const [otpSent, setOtpSent] = useState(false);
    const [otpAttempts, setOtpAttempts] = useState(0);
    const [otpTimer, setOtpTimer] = useState(OTP_EXPIRY_TIME);
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState("");

    // Generate a random 6-digit OTP
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    // Handle OTP timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (otpSent && otpTimer > 0) {
            timer = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setCanResendOtp(true);
        }
        return () => clearInterval(timer);
    }, [otpSent, otpTimer]);

    const sendOTP = () => {
        const newOtp = generateOTP();
        setGeneratedOtp(newOtp);
        setOtpSent(true);
        setOtpTimer(OTP_EXPIRY_TIME);
        setCanResendOtp(false);
        setOtpAttempts(0);
        // In a real application, you would send this OTP to the user's mobile number
        console.log("OTP sent:", newOtp); // For development purposes only
    };

    const validateIdentifier = (identifier: string, type: "PAN" | "TAN") => {
        if (type === "PAN") {
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            return panRegex.test(identifier);
        } else {
            const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]$/;
            return tanRegex.test(identifier);
        }
    };

    const validateMobile = (mobile: string) => {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(mobile);
    };

    const validateStep = (stepNumber: number) => {
        const newErrors = { ...errors };

        if (stepNumber === 1) {
            // Validate identifier
            if (!formData.identifier) {
                newErrors.identifier = `${formData.identifierType} number is required`;
            } else if (!validateIdentifier(formData.identifier, formData.identifierType)) {
                newErrors.identifier = `Invalid ${formData.identifierType} number format`;
            } else {
                newErrors.identifier = "";
            }

            // Validate identifier confirmation
            if (!formData.identifierConfirm) {
                newErrors.identifierConfirm = `Please confirm your ${formData.identifierType} number`;
            } else if (formData.identifier !== formData.identifierConfirm) {
                newErrors.identifierConfirm = `${formData.identifierType} numbers do not match`;
            } else {
                newErrors.identifierConfirm = "";
            }

            // Validate name
            if (!formData.name) {
                newErrors.name = "Name is required";
            } else if (formData.name.trim().length < 3) {
                newErrors.name = "Name must be at least 3 characters long";
            } else {
                newErrors.name = "";
            }

            // Validate mobile number
            if (!formData.mobileNumber) {
                newErrors.mobileNumber = "Mobile number is required";
            } else if (!validateMobile(formData.mobileNumber)) {
                newErrors.mobileNumber = "Invalid mobile number format";
            } else {
                newErrors.mobileNumber = "";
            }
        }

        if (stepNumber === 2) {
            if (!formData.otp) {
                newErrors.otp = "OTP is required";
            } else if (formData.otp !== generatedOtp) {
                newErrors.otp = "Invalid OTP";
                setOtpAttempts((prev) => prev + 1);
            } else {
                newErrors.otp = "";
            }
        }

        if (stepNumber === 3) {
            if (!formData.amount) {
                newErrors.amount = "Amount is required";
            } else if (parseFloat(formData.amount) <= 0) {
                newErrors.amount = "Amount must be greater than 0";
            } else {
                newErrors.amount = "";
            }
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep === 1) {
                sendOTP(); // Send OTP when moving to step 2
            }
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            if (otpAttempts >= MAX_OTP_ATTEMPTS) {
                setErrors(prev => ({
                    ...prev,
                    otp: "Maximum attempts reached. Please request a new OTP."
                }));
                return;
            }
            console.log("Payment submitted:", formData);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center justify-center p-4 mt-20 mb-20">
            <div className="w-full max-w-2xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Pay TDS</h1>
                    <p className="text-gray-500">Make your TDS payment online</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-blue-600' : 'border-gray-400'}`}>
                                1
                            </div>
                            <span className="ml-2">Details</span>
                        </div>
                        <div className="flex-1 h-1 bg-gray-200">
                            <div className={`h-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-blue-600' : 'border-gray-400'}`}>
                                2
                            </div>
                            <span className="ml-2">Verify</span>
                        </div>
                        <div className="flex-1 h-1 bg-gray-200">
                            <div className={`h-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-blue-600' : 'border-gray-400'}`}>
                                3
                            </div>
                            <span className="ml-2">Payment</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {currentStep === 1 && (
                        <>
                            <div>
                                <label htmlFor="identifierType" className="block mb-2 text-sm font-medium text-gray-700">
                                    Select Type
                                </label>
                                <select
                                    id="identifierType"
                                    name="identifierType"
                                    value={formData.identifierType}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="PAN">PAN</option>
                                    <option value="TAN">TAN</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-gray-700">
                                    {formData.identifierType} Number
                                </label>
                                <input
                                    type="text"
                                    id="identifier"
                                    name="identifier"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder={`Enter your ${formData.identifierType} number`}
                                    required
                                />
                                {errors.identifier && (
                                    <p className="mt-1 text-sm text-red-500">{errors.identifier}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="identifierConfirm" className="block mb-2 text-sm font-medium text-gray-700">
                                    Confirm {formData.identifierType} Number
                                </label>
                                <input
                                    type="text"
                                    id="identifierConfirm"
                                    name="identifierConfirm"
                                    value={formData.identifierConfirm}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.identifierConfirm ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder={`Confirm your ${formData.identifierType} number`}
                                    required
                                />
                                {errors.identifierConfirm && (
                                    <p className="mt-1 text-sm text-red-500">{errors.identifierConfirm}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Enter your mobile number"
                                    required
                                />
                                {errors.mobileNumber && (
                                    <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>
                                )}
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <div className="p-6 bg-gray-50 rounded-lg">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Verification</h3>
                                <p className="text-gray-600">
                                    Please enter the OTP sent to your mobile number
                                    <br />
                                    <span className="font-medium">{formData.mobileNumber}</span>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                            Enter OTP
                                        </label>
                                        {otpSent && (
                                            <span className="text-sm text-gray-500">
                                                Time remaining: {formatTime(otpTimer)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="otp"
                                            name="otp"
                                            value={formData.otp}
                                            onChange={handleChange}
                                            className={`flex-1 p-3 border ${errors.otp ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Enter 6-digit OTP"
                                            maxLength={6}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={sendOTP}
                                            disabled={!canResendOtp}
                                            className={`px-4 py-2 rounded-lg ${
                                                canResendOtp
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {otpSent ? 'Resend OTP' : 'Send OTP'}
                                        </button>
                                    </div>
                                    {errors.otp && (
                                        <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                                    )}
                                    {otpAttempts > 0 && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            Attempts remaining: {MAX_OTP_ATTEMPTS - otpAttempts}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <>
                            <div className="p-6 bg-gray-50 rounded-lg mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Details Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium">{formData.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{formData.identifierType} Number:</span>
                                        <span className="font-medium">{formData.identifier}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Mobile Number:</span>
                                        <span className="font-medium">{formData.mobileNumber}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">
                                    Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Enter amount"
                                    required
                                />
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="paymentMode" className="block mb-2 text-sm font-medium text-gray-700">
                                    Payment Mode
                                </label>
                                <select
                                    id="paymentMode"
                                    name="paymentMode"
                                    value={formData.paymentMode}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="online">Online Payment</option>
                                    <option value="neft">NEFT/RTGS</option>
                                    <option value="cheque">Cheque</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="flex justify-between pt-4">
                        {currentStep === 1 ? (
                            <button
                                type="button"
                                onClick={() => navigate("/practice/tds")}
                                className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
                            >
                                ⬅ Back
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handlePreviousStep}
                                className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
                            >
                                ⬅ Previous
                            </button>
                        )}
                        
                        {currentStep === 1 || currentStep === 2 ? (
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Next ➡
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={otpAttempts >= MAX_OTP_ATTEMPTS}
                                className={`px-6 py-2 text-white rounded-lg ${
                                    otpAttempts >= MAX_OTP_ATTEMPTS
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                Proceed to Pay
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PayTds; 