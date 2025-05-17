import React from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import { SiPaytm, SiPaypal, SiGooglepay, SiPhonepe, SiRazorpay } from "react-icons/si";
import { PiCurrencyInrBold } from "react-icons/pi";

const Footer = () => {
    return (
        <div className="bg-white">
            {/* Newsletter Component */}
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
                        <div className="grid grid-cols-3 gap-4">
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
                                329K
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

const NewsletterSignup = () => {
    return (
        <div className="relative w-full p-8 overflow-hidden text-white bg-theme1">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-xl"></div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
                {/* Title with subtle animation */}
                <h2 className="mb-3 text-3xl font-bold text-center md:text-4xl lg:text-5xl animate-fade-in-up">
                    Stay Updated With Our Newsletter
                </h2>

                {/* Subtitle */}
                <p className="max-w-2xl text-lg text-center text-white/80 md:text-xl">
                    Get the latest news, updates, and exclusive offers delivered straight to your inbox.
                </p>

                {/* Input Form with modern styling */}
                <div className="flex flex-col w-full max-w-xl mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <div className="relative flex-1">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-5 py-4 text-gray-900 transition-all duration-300 bg-white border-none rounded-lg shadow-lg focus:ring-2 focus:ring-theme1/50 focus:outline-none placeholder-gray-400/80 hover:shadow-xl"
                            required
                        />
                        <svg
                            className="absolute w-6 h-6 text-gray-400 -translate-y-1/2 right-3 top-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                    </div>

                    <button className="px-8 py-4 text-lg font-semibold text-theme1 transition-all duration-300 transform bg-white  rounded-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/50 whitespace-nowrap">
                        Subscribe Now
                        <span className="ml-2">→</span>
                    </button>
                </div>

                {/* Privacy assurance text */}
                <p className="mt-4 text-sm text-center text-white/60">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </div>
    );
};