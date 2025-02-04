import React, { useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

const Signup = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        captcha: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const options = ["Google", "Friends", "Social Media", "Advertisement"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const handleDropdownChange = (option) => {
        setSelectedOption(option);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <dialog id="signup_modal" className="modal" open={true}>
            <div className="modal-box">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-start gap-6 w-[441px]">
                        {/* Header Section */}
                        <div className="flex flex-col items-center w-full gap-3">
                            <h1 className="text-2xl font-medium text-gray-900">Sign Up</h1>
                            <p className="text-sm text-gray-500">
                                Welcome to COC Education! Please enter your details.
                            </p>
                        </div>

                        {/* Form Section */}
                        <div className="flex flex-col w-full gap-4">
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
                                    className="w-full input input-bordered"
                                />
                                <span className="mt-1 text-sm text-red-500">
                                    This is an error message.
                                </span>
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
                                    className="w-full input input-bordered"
                                />

                                <span className="mt-1 text-sm text-red-500">
                                    This is an error message.
                                </span>
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
                                    className="w-full input input-bordered"
                                />
                                <span className="mt-1 text-sm text-red-500">
                                    This is an error message.
                                </span>
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
                                    className="w-full input input-bordered"
                                />

                                <span className="mt-1 text-sm text-red-500">
                                    This is an error message.
                                </span>
                            </div>

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
                                        className="w-full input input-bordered"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                <span className="mt-1 text-sm text-red-500">
                                    This is an error message.
                                </span>
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
                                        className="w-full input input-bordered"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                <span className="mt-1 text-sm text-red-500">
                                    This is an error message.
                                </span>
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
                        </div>

                    </div><div className="flex flex-col items-center gap-4 w-[441px] h-[94px]">
                        {/* Button */}
                        <button className="flex justify-center items-center w-[441px] h-12 px-4 py-2 bg-[#101C36] text-white text-base font-medium rounded-lg">
                            Sign up
                        </button>

                        {/* Text Section */}
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-[#041B2D] text-base font-medium">
                                Already have an account?
                            </span>
                            <button className="text-[#101C36] text-base font-medium">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog >
    );
};

export default Signup;
