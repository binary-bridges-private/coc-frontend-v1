// import React, { useState } from "react";
// import { ChevronDown, Eye, EyeOff } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
// import { switchSignupToLogin, toggleSignupPopup } from "../../../store/slices/PopupSlice.ts";
// import { signupUser } from "../../../store/slices/AuthSlice.ts";

// const Signup = () => {
//     const [selectedOption, setSelectedOption] = useState("");
//     const [inputValues, setInputValues] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         confirmPassword: "",
//         enrollmentNumber: "",
//     });
//     const [errors, setErrors] = useState<{
//         firstName?: string;
//         lastName?: string;
//         email?: string;
//         phoneNumber?: string;
//         password?: string;
//         confirmPassword?: string;
//         enrollmentNumber?: string;
//         general?: string;
//     }>({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const dispatch = useAppDispatch();
//     const isOpen = useAppSelector((state) => state.popup.isSignupPopupOpen);

//     const options = ["Google", "Friends", "Social Media", "Advertisement"];

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setInputValues({
//             ...inputValues,
//             [name]: value,
//         });
//         // Clear error when user types
//         if (errors[name as keyof typeof errors]) {
//             setErrors({
//                 ...errors,
//                 [name]: "",
//             });
//         }
//     };

//     const handleDropdownChange = (option: string) => {
//         setSelectedOption(option);
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword((prev) => !prev);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword((prev) => !prev);
//     };

//     const validateForm = () => {
//         let valid = true;
//         const newErrors: typeof errors = {};

//         // First Name validation
//         if (!inputValues.firstName.trim()) {
//             newErrors.firstName = "First name is required";
//             valid = false;
//         }

//         // Last Name validation
//         if (!inputValues.lastName.trim()) {
//             newErrors.lastName = "Last name is required";
//             valid = false;
//         }

//         // Email validation
//         if (!inputValues.email.trim()) {
//             newErrors.email = "Email is required";
//             valid = false;
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email)) {
//             newErrors.email = "Please enter a valid email";
//             valid = false;
//         }

//         // Phone Number validation
//         if (!inputValues.phoneNumber.trim()) {
//             newErrors.phoneNumber = "Phone number is required";
//             valid = false;
//         } else if (!/^\+?[0-9]{10}$/.test(inputValues.phoneNumber)) {
//             newErrors.phoneNumber = "Please enter a valid phone number";
//             valid = false;
//         }

//         // Password validation
//         if (!inputValues.password) {
//             newErrors.password = "Password is required";
//             valid = false;
//         } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(inputValues.password)) {
//             newErrors.password = "Password must meet all requirements";
//             valid = false;
//         }

//         // Confirm Password validation
//         if (!inputValues.confirmPassword) {
//             newErrors.confirmPassword = "Please confirm your password";
//             valid = false;
//         } else if (inputValues.password !== inputValues.confirmPassword) {
//             newErrors.confirmPassword = "Passwords do not match";
//             valid = false;
//         }

//         setErrors(newErrors);
//         return valid;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setErrors({});
//         setLoading(true);

//         if (!validateForm()) {
//             setLoading(false);
//             return;
//         }

//         try {
//             const resultAction = await dispatch(signupUser({
//                 firstName: inputValues.firstName,
//                 lastName: inputValues.lastName,
//                 email: inputValues.email,
//                 phoneNumber: inputValues.phoneNumber,
//                 password: inputValues.password,
//                 enrollmentNumber: inputValues.enrollmentNumber,
//             }));

//             if (signupUser.fulfilled.match(resultAction)) {
//                 // Clear form on successful signup
//                 setInputValues({
//                     firstName: "",
//                     lastName: "",
//                     email: "",
//                     phoneNumber: "",
//                     password: "",
//                     confirmPassword: "",
//                     enrollmentNumber: "",
//                 });
//                 dispatch(toggleSignupPopup());
//             } else if (signupUser.rejected.match(resultAction)) {
//                 const error = resultAction.payload as any;
//                 setErrors({
//                     firstName: error?.errors?.firstName,
//                     lastName: error?.errors?.lastName,
//                     email: error?.errors?.email,
//                     phoneNumber: error?.errors?.phoneNumber,
//                     password: error?.errors?.password,
//                     general: error?.message || 'Signup failed.',
//                 });
//             }
//         } catch (err) {
//             setErrors({ general: 'Something went wrong.' });
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center modal modal-open bg-black/50">
//             <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-xl modal-box">
//                 <div className="flex flex-col items-center justify-center">
//                     <div className="flex flex-col items-start w-full gap-11">
//                         {/* Header Section */}
//                         <div className="flex flex-col items-center w-full gap-3">
//                             <h1 className="text-xl font-medium text-gray-900">Sign Up</h1>
//                             <p className="text-sm font-normal text-gray-500">
//                                 Welcome to COC Education! Please enter your details.
//                             </p>
//                             {errors.general && (
//                                 <span className="text-sm text-red-500">{errors.general}</span>
//                             )}
//                         </div>

//                         <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
//                             {/* First Name */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">First Name*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     placeholder="Enter your first name"
//                                     value={inputValues.firstName}
//                                     onChange={handleInputChange}
//                                     className={`w-full input input-bordered ${errors.firstName ? "input-error" : ""}`}
//                                 />
//                                 {errors.firstName && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.firstName}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Last Name */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">Last Name*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     placeholder="Enter your last name"
//                                     value={inputValues.lastName}
//                                     onChange={handleInputChange}
//                                     className={`w-full input input-bordered ${errors.lastName ? "input-error" : ""}`}
//                                 />
//                                 {errors.lastName && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.lastName}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Email Address */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">Email Address*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Enter your email address"
//                                     value={inputValues.email}
//                                     onChange={handleInputChange}
//                                     className={`w-full input input-bordered ${errors.email ? "input-error" : ""}`}
//                                 />
//                                 {errors.email && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.email}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Phone Number */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">Phone Number*</span>
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     name="phoneNumber"
//                                     placeholder="+91 0000000000"
//                                     value={inputValues.phoneNumber}
//                                     onChange={handleInputChange}
//                                     className={`w-full input input-bordered ${errors.phoneNumber ? "input-error" : ""}`}
//                                 />
//                                 {errors.phoneNumber && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.phoneNumber}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* enrollmentNumber */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">Enrollment Number*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="enrollmentNumber"
//                                     placeholder="Enter your enrollment number"
//                                     value={inputValues.enrollmentNumber}
//                                     onChange={handleInputChange}
//                                     className={`w-full input input-bordered ${errors.enrollmentNumber ? "input-error" : ""}`}
//                                 />
//                                 {errors.lastName && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.enrollmentNumber}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Password */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">Password*</span>
//                                 </label>
//                                 <div className="relative w-full">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         placeholder="Enter your password"
//                                         value={inputValues.password}
//                                         onChange={handleInputChange}
//                                         className={`w-full input input-bordered ${errors.password ? "input-error" : ""}`}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="absolute right-3 top-3"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                 </div>
//                                 {errors.password && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.password}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Confirm Password */}
//                             <div className="w-full form-control">
//                                 <label className="label">
//                                     <span className="text-gray-900 label-text">Confirm Password*</span>
//                                 </label>
//                                 <div className="relative w-full">
//                                     <input
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         name="confirmPassword"
//                                         placeholder="Re-enter your password"
//                                         value={inputValues.confirmPassword}
//                                         onChange={handleInputChange}
//                                         className={`w-full input input-bordered ${errors.confirmPassword ? "input-error" : ""}`}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="absolute right-3 top-3"
//                                         onClick={toggleConfirmPasswordVisibility}
//                                     >
//                                         {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                     </button>
//                                 </div>
//                                 {errors.confirmPassword && (
//                                     <span className="mt-1 text-sm text-red-500">
//                                         {errors.confirmPassword}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Password Validation */}
//                             <div className="text-sm text-gray-500">
//                                 <ul className="ml-4 list-disc">
//                                     <li>At least one capital letter (A-Z)</li>
//                                     <li>At least one small letter (a-z)</li>
//                                     <li>At least one number (0-9)</li>
//                                     <li>Minimum 8 letters</li>
//                                 </ul>
//                             </div>

//                             {/* Button */}
//                             <div className="flex flex-col items-center w-full gap-4">
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="flex items-center justify-center w-full h-12 px-4 py-2 text-base font-medium text-white rounded-lg bg-theme1"
//                                 >
//                                     {loading ? 'Signing up...' : 'Sign up'}
//                                 </button>

//                                 {/* Text Section */}
//                                 <div className="flex flex-row items-center gap-2">
//                                     <span className="text-[#041B2D] text-base font-medium">
//                                         Already have an account?
//                                     </span>
//                                     <button
//                                         type="button"
//                                         onClick={() => dispatch(switchSignupToLogin())}
//                                         className="text-base font-medium text-theme1"
//                                     >
//                                         Login
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             {/* Backdrop - matches the Login component */}
//             <div
//                 className="fixed inset-0 z-0 bg-black opacity-50"
//                 onClick={() => dispatch(toggleSignupPopup())}
//             ></div>
//         </div>
//     );
// };

// export default Signup;

import React, { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { switchSignupToLogin, toggleSignupPopup } from "../../../store/slices/PopupSlice.ts";
import { signupUser } from "../../../store/slices/AuthSlice.ts";

const Signup = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [userType, setUserType] = useState<"new" | "cfm">("new");
    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        enrollmentNumber: "",
    });
    const [errors, setErrors] = useState<{
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
        password?: string;
        confirmPassword?: string;
        enrollmentNumber?: string;
        general?: string;
    }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.popup.isSignupPopupOpen);

    const userTypes = [
        { value: "new", label: "New User" },
        { value: "cfm", label: "CFM Registered User" }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handleUserTypeSelect = (type: "new" | "cfm") => {
        setUserType(type);
        setShowUserTypeDropdown(false);
        // Clear enrollment number when switching to new user
        if (type === "new") {
            setInputValues(prev => ({ ...prev, enrollmentNumber: "" }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: typeof errors = {};

        // First Name validation
        if (!inputValues.firstName.trim()) {
            newErrors.firstName = "First name is required";
            valid = false;
        }

        // Last Name validation
        if (!inputValues.lastName.trim()) {
            newErrors.lastName = "Last name is required";
            valid = false;
        }

        // Email validation
        if (!inputValues.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email)) {
            newErrors.email = "Please enter a valid email";
            valid = false;
        }

        // Phone Number validation
        if (!inputValues.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
            valid = false;
        } else if (!/^\+?[0-9]{10}$/.test(inputValues.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
            valid = false;
        }

        // Password validation
        if (!inputValues.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(inputValues.password)) {
            newErrors.password = "Password must meet all requirements";
            valid = false;
        }

        // Confirm Password validation
        if (!inputValues.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            valid = false;
        } else if (inputValues.password !== inputValues.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        // Enrollment Number validation (only for CFM users)
        if (userType === "cfm" && !inputValues.enrollmentNumber.trim()) {
            newErrors.enrollmentNumber = "Enrollment number is required for CFM users";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const resultAction = await dispatch(signupUser({
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                email: inputValues.email,
                phoneNumber: inputValues.phoneNumber,
                password: inputValues.password,
                enrollmentNumber: userType === "cfm" ? inputValues.enrollmentNumber : "",
                userType: userType === "cfm" ? "cfm" : "new",
            }));

            if (signupUser.fulfilled.match(resultAction)) {
                // Clear form on successful signup
                setInputValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                    enrollmentNumber: "",
                });
                setUserType("new");
                dispatch(toggleSignupPopup());
            } else if (signupUser.rejected.match(resultAction)) {
                const error = resultAction.payload as any;
                setErrors({
                    firstName: error?.errors?.firstName,
                    lastName: error?.errors?.lastName,
                    email: error?.errors?.email,
                    phoneNumber: error?.errors?.phoneNumber,
                    password: error?.errors?.password,
                    enrollmentNumber: error?.errors?.enrollmentNumber,
                    general: error?.message || 'Signup failed.',
                });
            }
        } catch (err) {
            setErrors({ general: 'Something went wrong.' });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal modal-open bg-black/50">
            <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-xl modal-box">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-start w-full gap-11">
                        {/* Header Section */}
                        <div className="flex flex-col items-center w-full gap-3">
                            <h1 className="text-xl font-medium text-gray-900">Sign Up</h1>
                            <p className="text-sm font-normal text-gray-500">
                                Welcome to COC Education! Please enter your details.
                            </p>
                            {errors.general && (
                                <span className="text-sm text-red-500">{errors.general}</span>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                            {/* User Type Dropdown */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">User Type*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className={`flex items-center justify-between w-full px-4 py-3 text-left input input-bordered ${errors.enrollmentNumber ? "input-error" : ""}`}
                                        onClick={() => setShowUserTypeDropdown(!showUserTypeDropdown)}
                                    >
                                        {userTypes.find(type => type.value === userType)?.label || "Select user type"}
                                        <ChevronDown className={`transition-transform ${showUserTypeDropdown ? "rotate-180" : ""}`} />
                                    </button>
                                    {showUserTypeDropdown && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                            {userTypes.map((type) => (
                                                <div
                                                    key={type.value}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleUserTypeSelect(type.value as "new" | "cfm")}
                                                >
                                                    {type.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* First Name */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">First Name*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={inputValues.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full input input-bordered ${errors.firstName ? "input-error" : ""}`}
                                />
                                {errors.firstName && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.firstName}
                                    </span>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">Last Name*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    value={inputValues.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full input input-bordered ${errors.lastName ? "input-error" : ""}`}
                                />
                                {errors.lastName && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.lastName}
                                    </span>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">Email Address*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={inputValues.email}
                                    onChange={handleInputChange}
                                    className={`w-full input input-bordered ${errors.email ? "input-error" : ""}`}
                                />
                                {errors.email && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">Phone Number*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="+91 0000000000"
                                    value={inputValues.phoneNumber}
                                    onChange={handleInputChange}
                                    className={`w-full input input-bordered ${errors.phoneNumber ? "input-error" : ""}`}
                                />
                                {errors.phoneNumber && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.phoneNumber}
                                    </span>
                                )}
                            </div>

                            {/* Enrollment Number (Conditional) */}
                            {userType === "cfm" && (
                                <div className="w-full form-control">
                                    <label className="label">
                                        <span className="text-gray-900 label-text">Enrollment Number*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="enrollmentNumber"
                                        placeholder="Enter your enrollment number"
                                        value={inputValues.enrollmentNumber}
                                        onChange={handleInputChange}
                                        className={`w-full input input-bordered ${errors.enrollmentNumber ? "input-error" : ""}`}
                                    />
                                    {errors.enrollmentNumber && (
                                        <span className="mt-1 text-sm text-red-500">
                                            {errors.enrollmentNumber}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Password */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">Password*</span>
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={inputValues.password}
                                        onChange={handleInputChange}
                                        className={`w-full input input-bordered ${errors.password ? "input-error" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">Confirm Password*</span>
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Re-enter your password"
                                        value={inputValues.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full input input-bordered ${errors.confirmPassword ? "input-error" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.confirmPassword}
                                    </span>
                                )}
                            </div>

                            {/* Password Validation */}
                            <div className="text-sm text-gray-500">
                                <ul className="ml-4 list-disc">
                                    <li>At least one capital letter (A-Z)</li>
                                    <li>At least one small letter (a-z)</li>
                                    <li>At least one number (0-9)</li>
                                    <li>Minimum 8 letters</li>
                                </ul>
                            </div>

                            {/* Button */}
                            <div className="flex flex-col items-center w-full gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center w-full h-12 px-4 py-2 text-base font-medium text-white rounded-lg bg-theme1"
                                >
                                    {loading ? 'Signing up...' : 'Sign up'}
                                </button>

                                {/* Text Section */}
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-[#041B2D] text-base font-medium">
                                        Already have an account?
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(switchSignupToLogin())}
                                        className="text-base font-medium text-theme1"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div
                className="fixed inset-0 z-0 bg-black opacity-50"
                onClick={() => dispatch(toggleSignupPopup())}
            ></div>
        </div>
    );
};

export default Signup;