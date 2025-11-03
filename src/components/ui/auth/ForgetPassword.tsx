import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { closeForgetPasswordPopup, switchForgetPasswordToLogin, toggleForgetPasswordPopup } from "../../../store/slices/PopupSlice.ts";
import { requestPasswordReset } from "../../../store/slices/AuthSlice.ts";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        general?: string;
    }>({});

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.popup.isForgetPasswordPopupOpen);

    const validateForm = () => {
        let valid = true;
        const newErrors: typeof errors = {};

        // Email validation
        if (!email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email";
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
            // Generate a reset link - you might want to customize this based on your frontend URL
            const resetLink = `${window.location.origin}/reset-password`;
            
            const resultAction = await dispatch(requestPasswordReset({
                email,
                resetLink
            }));

            if (requestPasswordReset.fulfilled.match(resultAction)) {
                dispatch(closeForgetPasswordPopup());
            } else if (requestPasswordReset.rejected.match(resultAction)) {
                setErrors({ general: 'Failed to send reset link. Please try again.' });
            }
        } catch (error) {
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
                            <h1 className="text-xl font-medium text-gray-900">Forgot Password</h1>
                            <p className="text-sm font-normal text-gray-500">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            {errors.general && (
                                <span className="text-sm text-red-500">{errors.general}</span>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                            {/* Email Address */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">Email Address*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full input input-bordered ${errors.email ? "input-error" : ""}`}
                                />
                                {errors.email && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Button */}
                            <div className="flex flex-col items-center w-full gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center justify-center w-full h-12 px-4 py-2 text-base font-medium text-white rounded-lg bg-theme1"
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </button>

                                {/* Text Section */}
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-[#041B2D] text-base font-medium">
                                        Remember your password?
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(switchForgetPasswordToLogin())}
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
                onClick={() => dispatch(toggleForgetPasswordPopup())}
            ></div>
        </div>
    );
};

export default ForgetPassword; 