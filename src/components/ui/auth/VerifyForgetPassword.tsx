import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks.ts';
import { verifyPasswordReset } from '../../../store/slices/AuthSlice.ts';

const VerifyForgetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = searchParams.get("token");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});

    const validateForm = () => {
        let valid = true;
        const newErrors: typeof errors = {};

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(password)) {
            newErrors.password = "Password must meet all requirements";
            valid = false;
        }

        // Confirm Password validation
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            valid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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

        if (!token) {
            setErrors({ general: 'Invalid or missing reset token' });
            setLoading(false);
            return;
        }

        try {
            const resultAction = await dispatch(verifyPasswordReset({
                token,
                password
            }));

            if (verifyPasswordReset.fulfilled.match(resultAction)) {
                // Redirect to login page after successful password reset
                navigate('/home');
            } else if (verifyPasswordReset.rejected.match(resultAction)) {
                setErrors({ general: 'Failed to reset password. Please try again.' });
            }
        } catch (error) {
            setErrors({ general: 'Something went wrong.' });
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="mb-4 text-2xl font-bold text-center text-red-600">Invalid Reset Link</h1>
                    <p className="text-center text-gray-600">
                        The password reset link is invalid or has expired. Please request a new password reset link.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-start w-full gap-8">
                        {/* Header Section */}
                        <div className="flex flex-col items-center w-full gap-3">
                            <h1 className="text-2xl font-medium text-gray-900">Reset Your Password</h1>
                            <p className="text-sm font-normal text-gray-500">
                                Please enter your new password below.
                            </p>
                            {errors.general && (
                                <span className="text-sm text-red-500">{errors.general}</span>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                            {/* Password */}
                            <div className="w-full form-control">
                                <label className="label">
                                    <span className="text-gray-900 label-text">New Password*</span>
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full input input-bordered ${errors.password ? "input-error" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
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
                                    <span className="text-gray-900 label-text">Confirm New Password*</span>
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Re-enter your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full input input-bordered ${errors.confirmPassword ? "input-error" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {errors.confirmPassword}
                                    </span>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="text-sm text-gray-500">
                                <p className="font-medium mb-2">Password Requirements:</p>
                                <ul className="ml-4 list-disc">
                                    <li>At least one capital letter (A-Z)</li>
                                    <li>At least one small letter (a-z)</li>
                                    <li>At least one number (0-9)</li>
                                    <li>Minimum 8 characters</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center w-full h-12 px-4 py-2 text-base font-medium text-white rounded-lg bg-theme1"
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyForgetPassword;