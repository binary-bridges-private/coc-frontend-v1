import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import { SiPaytm, SiPaypal, SiGooglepay, SiPhonepe, SiRazorpay } from "react-icons/si";
import { PiCurrencyInrBold } from "react-icons/pi";
import { motion } from 'framer-motion';
import { apiRestricted } from "../../store/api"

const Footer = () => {
    return (
        <div className="bg-white">
            
            <NewsletterSignup />
            {/* Main Footer */}
            <footer className="container px-4 py-10 mx-auto sm:px-6 lg:px-8 xl:px-20">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    {/* Expanded Company Info Section */}
                    <div className="space-y-8 lg:pr-8">
                        <div className="space-y-4">
                            <img
                                src="icon-wide.svg"
                                alt="COC Logo"
                                className="w-64 h-auto max-w-full"
                            />
                            <p className="text-sm font-medium text-gray-800 sm:text-base">
                                COC Education Pvt. Ltd. Office No-132 Ithum Tower-B
                                Sector-62, Noida, Uttar Pradesh
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 sm:text-base">
                                    For Purchase Related
                                </h4>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                    Call/WhatsApp: 9999631597 / 8448322142 / 7303445575 / 7011668629
                                    <br />
                                    E-mail: enquiry.coceducation@gmail.com
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 sm:text-base">
                                    For Technical Support
                                </h4>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                    Call/WhatsApp: 9811455109, 9311281468
                                    <br />
                                    E-mail: coceducation.technical@gmail.com
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 sm:text-base">
                                    For Courier Related Enquiry
                                </h4>
                                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                    Call/WhatsApp: 8595539968, 7042664033
                                    <br />
                                    E-mail: coceducation.logistics@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Narrower Navigation Links */}
                    <div className="space-y-6 lg:pl-4">
                        <h5 className="text-sm font-semibold text-blue-900 sm:text-base">
                            Important Links
                        </h5>
                        <ul className="space-y-3">
                            {['Home', 'About us', 'Video Lectures', 'Faculties', 'Quiz', 'Blogs', 'FAQs'].map((item) => (
                                <li key={item} className="text-sm text-gray-800 transition-colors hover:text-blue-600 sm:text-base">
                                    <a href="#" className="block py-1">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-6">
                        <h5 className="text-sm font-semibold text-blue-900 sm:text-base">
                            Follow Us
                        </h5>
                        <div className="flex space-x-4">
                            {[
                                { icon: <FaFacebook className="text-xl" />, color: "bg-blue-600", link: "https://www.facebook.com/share/1ATktFboCS/" },
                                { icon: <FaInstagram className="text-xl" />, color: "bg-pink-600", link: "https://www.instagram.com/cfmcoceducation?igsh=MTN2OXF3Z2ZsdzRnMw==" },
                                { icon: <FaTelegram className="text-xl" />, color: "bg-blue-400", link: "https://t.me/cfmbycoceducation" },
                                { icon: <FaYoutube className="text-xl" />, color: "bg-red-600", link: "https://youtube.com/@cfmcoceducation?si=vhRbpsOvVbrh1k5Y" }
                            ].map((social, index) => (
                                <a href={social.link} target="_">
                                    <button
                                        key={index}
                                        className={`flex items-center justify-center w-10 h-10 text-white rounded-full transition-transform hover:scale-110 ${social.color}`}
                                    >
                                        {social.icon}
                                    </button>
                                </a>
                            ))}
                        </div>

                        {/* YouTube Embed */}
                        <div className="w-full max-w-xs mt-4 aspect-video">
                            <YouTube />
                        </div>
                    </div>

                    {/* Payment Partners */}
                    <div className="space-y-6">
                        <h5 className="text-sm font-semibold text-blue-900 sm:text-base">
                            Payment Partners
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <PiCurrencyInrBold className="text-2xl" />, name: "PayUMoney" },
                                { icon: <SiPaytm className="text-2xl text-blue-600" />, name: "Paytm" },
                                { icon: <SiPaypal className="text-2xl text-blue-600" />, name: "PayPal" },
                                { icon: <SiGooglepay className="text-2xl text-blue-500" />, name: "GPay" },
                                { icon: <SiPhonepe className="text-2xl text-purple-600" />, name: "PhonePe" },
                                { icon: <SiRazorpay className="text-2xl text-blue-700" />, name: "Razorpay" }
                            ].map((payment, index) => (
                                <div key={index} className="flex flex-col items-center space-y-2">
                                    <div className="flex items-center justify-center w-12 h-12 p-2 bg-white rounded-lg shadow-md">
                                        {payment.icon}
                                    </div>
                                    <span className="text-xs text-gray-600">{payment.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="pt-6 mt-12 border-t border-gray-200">
                    <p className="text-xs text-center text-gray-500 sm:text-sm">
                        © {new Date().getFullYear()} COC Education Pvt. Ltd. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

const YouTube = () => {
    return (
        <div className="flex flex-row items-center gap-4 w-[308px] h-[66px]">
            {/* Image */}

            <img
                src={"santosh.svg"}
                alt="Youtube"
                className="w-[66px] h-[66px] rounded-[2px] bg-cover"
            />

            {/* Content Section */}
            <div className="flex flex-col items-start gap-3 w-[226px] h-[66px]">
                {/* Title */}
                <div className="text-[14px] font-medium leading-[140%] text-[#282828]">
                    Santosh Kumar - COC Education
                </div>

                {/* Payment Method Icon Section */}
                <div className="relative w-[143px] h-[32px] bg-[#FF0000] border rounded-[2px] cursor-pointer">
                    <a href="https://youtube.com/@cfmcoceducation?si=vhRbpsOvVbrh1k5Y" target="_blank" rel="noopener noreferrer">
                        {/* YouTube Logo */}
                        <img
                            src={"youtube.svg"}
                            alt="Youtube Logo"
                            className="absolute w-[73px] h-[16px] left-[6px] top-[50%] translate-y-[-50%] bg-contain bg-no-repeat"
                        />

                        {/* Subscriber Count */}
                        <div className="border absolute w-[49px] h-[32px] left-[94px] top-0 bg-[#FFFFFF] flex items-center justify-center">
                            <span className="text-[14px] font-normal leading-[140%] text-[#737373]">
                                2.48K
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

const NewsletterSignup = () => {

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await apiRestricted.post('/news-letter', {
                emailAddress: email
            });

            if (response.data.status === 'success') {
                setIsSuccess(true);
                setEmail('');
                setTimeout(() => setIsSuccess(false), 3000);
            } else {
                setErrorMessage(response.data.message || 'Subscription failed');
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ? error.response?.data?.message : 'Failed to subscribe'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative w-full py-10 overflow-hidden bg-gray-500">
            {/* Animated decorative elements */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-700/20 blur-3xl"
            ></motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-72 h-72 bg-gray-700/20 blur-3xl"
            ></motion.div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-6 px-4 mx-auto text-center">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-100"
                >
                    Stay Ahead with Our Newsletter
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-white md:text-xl"
                >
                    Get exclusive insights, updates, and special offers delivered to your inbox
                </motion.p>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col w-full max-w-md gap-4 mx-auto mt-6 sm:flex-row"
                    >
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-6 py-4 text-gray-900 placeholder-gray-500 transition-all bg-white border-2 border-transparent rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                                required
                                disabled={isSubmitting}
                            />
                            <svg
                                className="absolute w-6 h-6 text-gray-400 -translate-y-1/2 right-4 top-1/2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-4 font-medium text-white transition-all transform bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                            <span className="ml-2">→</span>
                        </button>
                    </motion.div>
                </form>

                {/* Status Messages */}
                {errorMessage && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-200"
                    >
                        ⚠️ {errorMessage}
                    </motion.p>
                )}

                {isSuccess && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-200"
                    >
                        🎉 Success! Thank you for subscribing
                    </motion.p>
                )}

                {/* Privacy text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 text-sm text-white"
                >
                    We respect your privacy. Unsubscribe anytime.
                </motion.p>
            </div>
        </div>
    );
};