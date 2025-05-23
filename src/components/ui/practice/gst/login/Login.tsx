import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRestricted } from "../../../../../store/api.ts"
import { gstLogin } from "../../../../../store/slices/gstAuthSlice.ts";
import { useAppDispatch } from "../../../../../store/hooks.ts";

const Login = () => {
    const navigate = useNavigate();
    const [gstins, setGstins] = useState<any>([]);
    const [selectedGstin, setSelectedGstin] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [showRegistrationPrompt, setShowRegistrationPrompt] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hasFetchedRef = useRef(false);

    const dispatch = useAppDispatch();

    const fetchGstins = async () => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        
        try {
            setIsLoading(true);
            const res = await apiRestricted.get("/gst/gstIns");
            console.log(res);
            if (res?.data?.data?.gstIns?.length > 0) {
                setGstins(res.data?.data?.gstIns);
            } else {
                setShowRegistrationPrompt(true);
            }
        } catch (err) {
            setError('Failed to fetch GSTINs. Please try again.');
        } finally {
            setIsLoading(false);
            generateNewCaptcha();
        }
    };

    // Call fetchGstins directly
    fetchGstins();

    const generateCaptchaText = () => {
        const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const drawCaptcha = (text: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background with noise
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add random dots for noise
        for (let i = 0; i < 100; i++) {
            ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
            ctx.beginPath();
            ctx.arc(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        // Add random lines for more noise
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
            ctx.lineWidth = Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            );
            ctx.lineTo(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            );
            ctx.stroke();
        }

        // Draw each character with random distortion
        const charWidth = canvas.width / text.length;
        for (let i = 0; i < text.length; i++) {
            // Random font size and style
            ctx.font = `${20 + Math.random() * 10}px ${Math.random() > 0.5 ? 'Arial' : 'Verdana'}`;
            ctx.fillStyle = `rgba(0, 0, 0, ${0.7 + Math.random() * 0.3})`;

            // Random rotation and position
            ctx.save();
            ctx.translate(
                charWidth * i + charWidth / 2,
                canvas.height / 2 + (Math.random() * 10 - 5)
            );
            ctx.rotate((Math.random() * 0.4 - 0.2));

            // Draw character
            ctx.fillText(
                text.charAt(i),
                -ctx.measureText(text.charAt(i)).width / 2,
                5
            );
            ctx.restore();
        }
    };

    const generateNewCaptcha = () => {
        const newCaptcha = generateCaptchaText();
        setCaptcha(newCaptcha);
        drawCaptcha(newCaptcha);
    };

    const handleSave = async () => {
        try {
            const result = await dispatch(gstLogin({ gstIn: selectedGstin })).unwrap();
            console.log("Gst login :", result);
            return true;
        } catch (error) {
            console.error('Save failed:', error);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (showRegistrationPrompt) {
            setError('Please register a GSTIN first before logging in.');
            return;
        }

        if (!selectedGstin) {
            setError('Please select a GSTIN');
            return;
        }

        if (userInput !== captcha) {
            setError('Captcha verification failed. Please try again.');
            generateNewCaptcha();
            setUserInput('');
            return;
        }

        const success = await handleSave();

        if (success) {
            setError('');
            console.log('Logging in with GSTIN:', selectedGstin);
            navigate("/practice/gst/dashboard");
        }
    };

    const handleRegisterClick = () => {
        console.log('Redirecting to registration...');
        navigate('/practice/gst/registration')
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto mt-10">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        GST Portal Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Access your GST account securely
                    </p>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden bg-white rounded-lg shadow-xl">
                    {/* Blue Header Bar */}
                    <div className="px-6 py-4 bg-blue-600">
                        <h3 className="text-lg font-medium text-white">Login</h3>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {showRegistrationPrompt ? (
                            <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">No GSTINs Found</h3>
                                <p className="mb-6 text-gray-500">
                                    You need to register a GSTIN before you can login to the portal.
                                </p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Register GSTIN
                                </button>
                            </div>
                        ) : (
                            // <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                {/* GSTIN Selection */}
                                <div>
                                    <label htmlFor="gstin" className="block mb-1 text-sm font-medium text-gray-700">
                                        Select GSTIN
                                    </label>
                                    <select
                                        id="gstin"
                                        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={selectedGstin}
                                        onChange={(e) => setSelectedGstin(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Select GSTIN --</option>
                                        {gstins.map((gstin: any, index: any) => (
                                            <option key={index} value={gstin}>
                                                {gstin}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Enhanced Captcha */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Captcha Verification
                                    </label>
                                    <div className="flex items-center space-x-3">
                                        <div className="relative flex-1">
                                            <canvas
                                                ref={canvasRef}
                                                width="200"
                                                height="50"
                                                className="w-full h-12 border border-gray-300 rounded-md bg-gray-50"
                                                title="Captcha Image"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={generateNewCaptcha}
                                            className="inline-flex items-center p-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            title="Refresh Captcha"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full px-3 py-2 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Enter the captcha code"
                                        required
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        spellCheck="false"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Type the characters you see in the image above
                                    </p>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-md bg-red-50">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                            // </form>
                        )}
                    </div>
                </div>

                {/* Footer Links */}
                {!showRegistrationPrompt && <div className="mt-6 text-sm text-center text-gray-500">
                    <p>Haven't Registered ? <a href="/practice/gst/registration" className="font-medium text-blue-600 hover:text-blue-500">Click here to register</a></p>
                </div>}
            </div>
        </div>
    );
};

export default Login;