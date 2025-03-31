// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Registration = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         userType: "",
//         state: "",
//         district: "",
//         businessName: "",
//         pan: "",
//         email: "",
//         mobileNumber: "",
//     });
//     const [errors, setErrors] = useState({
//         userType: false,
//         state: false,
//         district: false,
//         businessName: false,
//         pan: false,
//         email: false,
//         mobileNumber: false,
//     });
//     const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//     const [trnNumber, setTrnNumber] = useState("");

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         setErrors({ ...errors, [e.target.name]: false });
//     };

//     const validateForm = () => {
//         const newErrors = {
//             userType: !formData.userType.trim(),
//             state: !formData.state.trim(),
//             district: !formData.district.trim(),
//             businessName: !formData.businessName.trim(),
//             pan: !formData.pan.trim(),
//             email: !formData.email.trim(),
//             mobileNumber: !formData.mobileNumber.trim(),
//         };
//         setErrors(newErrors);
//         return !Object.values(newErrors).includes(true);
//     };

//     const generateTRN = () => {
//         // TRN format typically varies by country, but we'll create a standard format
//         // Example format: TRN-{country code}-{year}-{random alphanumeric}

//         // Get first 3 letters of state in uppercase
//         const stateCode = formData.state.toUpperCase().substring(0, 3).padEnd(3, 'X');

//         // Get last 2 digits of current year
//         const year = new Date().getFullYear().toString().slice(-2);

//         // Generate random alphanumeric (6 characters)
//         const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//         let randomPart = '';
//         for (let i = 0; i < 6; i++) {
//             randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
//         }

//         // Combine all parts
//         return `TRN-${stateCode}-${year}-${randomPart}`;
//     };

//     const handleSubmit = async () => {
//         if (validateForm()) {
//             try {
//                 const generatedTRN = generateTRN();
//                 setTrnNumber(generatedTRN);
//                 setShowSuccessPopup(true);

//                 setFormData({
//                     userType: "",
//                     state: "",
//                     district: "",
//                     businessName: "",
//                     pan: "",
//                     email: "",
//                     mobileNumber: "",
//                 });

//             } catch (error) {
//                 console.error("Registration failed:", error);
//             }
//         }
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(trnNumber)
//             .then(() => {
//                 alert("TRN copied to clipboard!");
//             })
//             .catch(err => {
//                 console.error("Failed to copy:", err);
//             });
//     };

//     const closePopup = () => {
//         setShowSuccessPopup(false);
//         navigate("/practice/gst");
//     };

//     return (
//         <>
//             {/* <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg breadcrumbs">
//                 <ul>
//                     <li className="cursor-pointer" onClick={() => navigate("/practice")}>Practice</li>
//                     <li className="cursor-pointer" onClick={() => navigate("/practice/gst")}>Gst</li>
//                     <li>Registration</li>
//                 </ul>
//             </div> */}

// <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
//     <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
//         <li
//             className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
//             onClick={() => navigate("/practice")}
//         >
//             <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
//             </svg>
//             Practice
//         </li>
//         <span className="text-gray-400">›</span>
//         <li
//             className="transition duration-200 cursor-pointer hover:text-blue-600"
//             onClick={() => navigate("/practice/gst")}
//         >
//             GST
//         </li>
//         <span className="text-gray-400">›</span>
//         <li className="text-gray-500">Registration</li>
//     </ul>
// </div>


// <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
//     <h2 className="text-xl font-extrabold text-white">
//         Tax Registration Application
//     </h2>
// </div>




//             <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
//                 {/* <h2 className="mb-6 text-2xl font-bold text-center text-[#2c3e50]">Tax Registration Application</h2> */}
//                 <form className="space-y-4">
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                         <div>
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">I am a *</label>
//                             <input
//                                 type="text"
//                                 name="userType"
//                                 value={formData.userType}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Individual, Company, etc."
//                                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.userType ? "border-red-500" : "border-[#bdc3c7]"
//                                     }`}
//                             />
//                             {errors.userType && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>

//                         <div>
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">State / UT *</label>
//                             <input
//                                 type="text"
//                                 name="state"
//                                 value={formData.state}
//                                 onChange={handleChange}
//                                 placeholder="Enter your state"
//                                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.state ? "border-red-500" : "border-[#bdc3c7]"
//                                     }`}
//                             />
//                             {errors.state && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>

//                         <div>
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">District *</label>
//                             <input
//                                 type="text"
//                                 name="district"
//                                 value={formData.district}
//                                 onChange={handleChange}
//                                 placeholder="Enter your district"
//                                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.district ? "border-red-500" : "border-[#bdc3c7]"
//                                     }`}
//                             />
//                             {errors.district && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>

//                         <div>
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">Legal Name *</label>
//                             <input
//                                 type="text"
//                                 name="businessName"
//                                 value={formData.businessName}
//                                 onChange={handleChange}
//                                 placeholder="As mentioned in PAN"
//                                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.businessName ? "border-red-500" : "border-[#bdc3c7]"
//                                     }`}
//                             />
//                             {errors.businessName && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>

//                         <div>
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">PAN *</label>
//                             <input
//                                 type="text"
//                                 name="pan"
//                                 value={formData.pan}
//                                 onChange={handleChange}
//                                 placeholder="Permanent Account Number"
//                                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.pan ? "border-red-500" : "border-[#bdc3c7]"
//                                     }`}
//                             />
//                             {errors.pan && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>

//                         <div>
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">Email Address *</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="your@email.com"
//                                 className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.email ? "border-red-500" : "border-[#bdc3c7]"
//                                     }`}
//                             />
//                             {errors.email && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>

//                         <div className="md:col-span-2">
//                             <label className="block mb-2 text-sm font-medium text-[#34495e]">Mobile Number *</label>
//                             <div className="flex gap-2">
//                                 <span className="flex items-center justify-center w-16 p-3 border rounded-lg bg-gray-50 border-[#bdc3c7]">+91</span>
//                                 <input
//                                     type="text"
//                                     name="mobileNumber"
//                                     value={formData.mobileNumber}
//                                     onChange={handleChange}
//                                     placeholder="Enter mobile number"
//                                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] ${errors.mobileNumber ? "border-red-500" : "border-[#bdc3c7]"
//                                         }`}
//                                 />
//                             </div>
//                             {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">This field is required.</p>}
//                         </div>
//                     </div>

//                     <div className="mt-8">
//                         <button
//                             type="button"
//                             className="w-full px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:ring-offset-2 transition-colors duration-300"
//                             onClick={handleSubmit}
//                         >
//                             Submit Application
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             {/* Success Popup */}
//             {showSuccessPopup && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
//                         <div className="text-center">
//                             <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full">
//                                 <svg
//                                     className="w-12 h-12 text-green-500"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M5 13l4 4L19 7"
//                                     ></path>
//                                 </svg>
//                             </div>
//                             <h3 className="text-2xl font-bold text-[#2c3e50]">Registration Successful!</h3>
//                             <div className="mt-4">
//                                 <p className="text-gray-600">Your Tax Registration Number (TRN) has been generated:</p>
//                                 <div className="flex items-center justify-between p-4 mt-3 rounded-lg bg-blue-50">
//                                     <span className="font-mono font-bold text-[#2980b9]">{trnNumber}</span>
//                                     <button
//                                         onClick={copyToClipboard}
//                                         className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700"
//                                         title="Copy to clipboard"
//                                     >
//                                         <svg
//                                             className="w-5 h-5"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
//                                             ></path>
//                                         </svg>
//                                     </button>
//                                 </div>
//                                 <p className="mt-2 text-sm text-gray-500">Please save this number for future reference.</p>
//                             </div>
//                             <div className="mt-6">
//                                 <button
//                                     type="button"
//                                     className="px-6 py-2 font-medium text-white bg-[#2980b9] rounded-lg hover:bg-[#3498db] focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:ring-offset-2 transition-colors duration-300"
//                                     onClick={closePopup}
//                                 >
//                                     Continue to Dashboard
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Registration;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
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

    let stateCodes: Record<string, string> = {
        'andhra pradesh': '37',
        'arunachal pradesh': '12',
        'assam': '18',
        'bihar': '10',
        'chhattisgarh': '22',
        'goa': '30',
        'gujarat': '24',
        'haryana': '06',
        'himachal pradesh': '02',
        'jharkhand': '20',
        'karnataka': '29',
        'kerala': '32',
        'madhya pradesh': '23',
        'maharashtra': '27',
        'manipur': '14',
        'meghalaya': '17',
        'mizoram': '15',
        'nagaland': '13',
        'odisha': '21',
        'punjab': '03',
        'rajasthan': '08',
        'sikkim': '11',
        'tamil nadu': '33',
        'telangana': '36',
        'tripura': '16',
        'uttar pradesh': '09',
        'uttarakhand': '05',
        'west bengal': '19',
        'andaman and nicobar islands': '35',
        'chandigarh': '04',
        'dadra and nagar haveli and daman and diu': '26',
        'lakshadweep': '31',
        'puducherry': '34',
        'delhi': '07',
        'ladakh': '38',
        'jammu and kashmir': '01'
    };


    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [trnNumber, setTrnNumber] = useState("");

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

    const generateTRN = () => {
        const stateCode = stateCodes[formData.state.toLowerCase()] || '00';
        const timestamp = Date.now().toString().slice(-6);
        const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
        return `${stateCode}${timestamp}${randomDigits}`;
    };


    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const generatedTRN = generateTRN();
                setTrnNumber(generatedTRN);
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
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(trnNumber)
            .then(() => {
                alert("TRN copied to clipboard!");
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
            {/* Breadcrumbs */}
            <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
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
                        onClick={() => navigate("/practice/gst")}
                    >
                        GST
                    </li>
                    <span className="text-gray-400">›</span>
                    <li className="text-gray-500">Registration</li>
                </ul>
            </div>


            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Registration
                </h2>
            </div>

            {/* Main Form */}
            <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
                <form className="space-y-6">
                    {/* User Type */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            I am a <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="userType"
                            value={formData.userType}
                            onChange={(e) => handleChange(e as any)}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.userType ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Select user type</option>
                            <option value="Individual">Individual</option>
                            <option value="Company">Company</option>
                            <option value="LLP">LLP</option>
                            <option value="Partnership">Partnership</option>
                        </select>
                        {errors.userType && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            State/UT <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={(e) => handleChange(e as any)}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Select state</option>
                            {Object.keys(stateCodes).map((state) => (
                                <option key={state} value={state}>
                                    {state.charAt(0).toUpperCase() + state.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.state && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* District */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            District <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="Enter district"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.district ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.district && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* Business Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Legal Name of Business (As mentioned in PAN) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="As per PAN records"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessName ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.businessName && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* PAN */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            PAN <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="pan"
                            value={formData.pan}
                            onChange={handleChange}
                            placeholder="10 character PAN"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.pan && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="official@email.com"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <span className="flex items-center justify-center w-16 p-3 text-sm bg-gray-100 border border-gray-300 rounded-md">
                                +91
                            </span>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.mobileNumber ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>
                        {errors.mobileNumber && <p className="mt-1 text-xs text-red-500">This field is required</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="w-full max-w-lg p-8 mx-6 bg-white shadow-2xl rounded-2xl">
                    <div className="text-center">
                        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-200 rounded-full">
                            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Registration Successful!</h2>
                        <p className="mt-3 text-base text-gray-600">Your 15-digit TRN:</p>
                        <div className="flex items-center justify-between p-4 mt-3 bg-blue-100 border border-blue-300 rounded-lg">
                            <span className="font-mono text-lg font-bold text-blue-800">
                                {trnNumber.match(/.{1,5}/g)?.join(' ')}
                            </span>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 text-gray-600 rounded-lg hover:bg-gray-200"
                                title="Copy to clipboard"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-gray-500">Please save this number for all tax-related transactions.</p>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={closePopup}
                                className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Continue to Dashboard
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