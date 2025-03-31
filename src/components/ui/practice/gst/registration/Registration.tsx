import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userType: "",
        state: "",
        district: "",
        businessName: "",
        pan: "",
        email: "",
        mobileNumber: "",
    });
    const [errors, setErrors] = useState({
        userType: false,
        state: false,
        district: false,
        businessName: false,
        pan: false,
        email: false,
        mobileNumber: false,
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [gstinNumber, setGstinNumber] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const validateForm = () => {
        const newErrors = {
            userType: !formData.userType.trim(),
            state: !formData.state.trim(),
            district: !formData.district.trim(),
            businessName: !formData.businessName.trim(),
            pan: !formData.pan.trim(),
            email: !formData.email.trim(),
            mobileNumber: !formData.mobileNumber.trim(),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    };

    const generateGSTIN = () => {
        // GSTIN format: 22AAAAA0000A1Z5 (15 characters)
        // Structure breakdown:
        // 1-2: State code (numeric)
        // 3-12: PAN number (alphanumeric)
        // 13: Entity number (alphanumeric)
        // 14: Default 'Z'
        // 15: Check digit (alphanumeric)
    
        // 1-2: State code (map from formData.state or use default)
        const stateCodeMap: Record<string, string> = {
            'maharashtra': '27',
            'delhi': '07',
            'karnataka': '29',
            // Add all state mappings as needed
        };
        const stateCode = stateCodeMap[formData.state.toLowerCase()] || '22'; // Default if not found
    
        // 3-12: PAN number (uppercase, exactly 10 chars)
        let panPart = formData.pan.toUpperCase().replace(/[^A-Z0-9]/g, '');
        // Pad with X if PAN is shorter than 10 characters
        panPart = panPart.padEnd(10, 'X').substring(0, 10);
    
        // 13: Entity number (alphanumeric, typically 1-9 or A-Z)
        const entityChars = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const entityNumber = entityChars.charAt(Math.floor(Math.random() * entityChars.length));
    
        // 14: Default character (usually 'Z')
        const defaultChar = 'Z';
    
        // 15: Check digit (alphanumeric, calculated based on previous digits)
        // For demo purposes, we'll use a random alphanumeric
        const checkDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const checkDigit = checkDigits.charAt(Math.floor(Math.random() * checkDigits.length));
    
        // Combine all parts
        const gstin = `${stateCode}${panPart}${entityNumber}${defaultChar}${checkDigit}`;
    
        // Ensure exactly 15 characters
        return gstin.length === 15 ? gstin : gstin.substring(0, 15).padEnd(15, 'X');
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const generatedGSTIN = generateGSTIN();
                setGstinNumber(generatedGSTIN);
                setShowSuccessPopup(true);

                setFormData({
                    userType: "",
                    state: "",
                    district: "",
                    businessName: "",
                    pan: "",
                    email: "",
                    mobileNumber: "",
                });

            } catch (error) {
                console.error("Registration failed:", error);
                // Handle error (show error message, etc.)
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gstinNumber)
            .then(() => {
                alert("GSTIN copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy:", err);
            });
    };

    const closePopup = () => {
        setShowSuccessPopup(false);
        navigate("/practice/gst"); 
    };

    return (
        <>
            <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg breadcrumbs">
                <ul>
                    <li className="cursor-pointer" onClick={() => navigate("/practice")}>Practice</li>
                    <li className="cursor-pointer" onClick={() => navigate("/practice/gst")}>Gst</li>
                    <li>Registration</li>
                </ul>
            </div>

            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">New Registration</h2>
                <form className="space-y-4">

                    <div>
                        <label className="label"><span className="label-text">I am a *</span></label>
                        <input
                            type="text"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className={`w-full input input-bordered ${errors.userType ? "border-red-500" : ""}`}
                        />
                        {errors.userType && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text">State / UT *</span></label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full input input-bordered ${errors.state ? "border-red-500" : ""}`}
                        />
                        {errors.state && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text">District *</span></label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className={`w-full input input-bordered ${errors.district ? "border-red-500" : ""}`}
                        />
                        {errors.district && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text">Legal Name of the Business (As mentioned in PAN) *</span></label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className={`w-full input input-bordered ${errors.businessName ? "border-red-500" : ""}`}
                        />
                        {errors.businessName && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text">Permanent Account Number (PAN) *</span></label>
                        <input
                            type="text"
                            name="pan"
                            value={formData.pan}
                            onChange={handleChange}
                            className={`w-full input input-bordered ${errors.pan ? "border-red-500" : ""}`}
                        />
                        {errors.pan && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text">Email Address *</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full input input-bordered ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>

                    <div>
                        <label className="label"><span className="label-text">Mobile Number *</span></label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center w-16 input input-bordered">+91</span>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className={`w-full input input-bordered ${errors.mobileNumber ? "border-red-500" : ""}`}
                            />
                        </div>
                        {errors.mobileNumber && <p className="text-sm text-red-500">This field is required.</p>}
                    </div>



                    <div className="mt-4">
                        <button
                            type="button"
                            className="w-full text-white btn bg-[#101C36]"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg">
                        <div className="text-center">
                            <svg
                                className="w-16 h-16 mx-auto text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                            <h3 className="mt-3 text-lg font-medium text-gray-900">Registration Successful!</h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Your GSTIN number has been generated:</p>
                                <div className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-md">
                                    <span className="font-mono font-bold">{gstinNumber}</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-1 text-gray-500 hover:text-gray-700"
                                        title="Copy to clipboard"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-white bg-[#101C36] rounded-md hover:bg-[#0a1427] focus:outline-none"
                                    onClick={closePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Registration;