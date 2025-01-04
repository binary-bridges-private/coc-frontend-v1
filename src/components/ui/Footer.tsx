import React from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
// TODO: add links to important navigation
const Footer = () => {
    return (
        <div className="">
            <NewsletterSignup />
            <footer className="flex flex-col border md:flex-row justify-evenly items-start px-4 md:px-2 py-12 gap-4 bg-white w-full">
                {/* Group Section */}
                <div className="flex flex-col justify-between items-start w-full md:w-[520px] gap-8">
                    {/* Frame 255 */}
                    <div className="flex flex-col items-start gap-8">
                        {/* Frame 254 */}
                        <div className="flex flex-col items-start gap-3">
                            {/* Logo */}
                            <img
                                src={"icon-wide.svg"}
                                alt="COC Logo"
                                className="w-[271px] h-[93px]"
                            />
                            {/* Address */}
                            <p className="text-lg font-semibold text-gray-800 leading-6">
                                COC Education Pvt. Ltd. Office No-132 Ithum
                                Tower-B Sector-62, Noida, Uttar Pradesh
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col items-start gap-4">
                        {/* Section */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-bold text-gray-800">
                                For Purchase Related
                            </h4>
                            <p className="text-base font-medium text-gray-600 leading-7">
                                Call/WhatsApp: 9999631597 / 8448322142 /
                                7303445575 / 7011668629
                                <br />
                                E-mail: enquiry.coceducation@gmail.com
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-bold text-gray-800">
                                For Technical Support
                            </h4>
                            <p className="text-base font-medium text-gray-600 leading-7">
                                Call/WhatsApp: 9811455109, 9311281468
                                <br />
                                E-mail: coceducation.technical@gmail.com
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="text-xl font-bold text-gray-800">
                                For Courier Related Enquiry
                            </h4>
                            <p className="text-base font-medium text-gray-600 leading-7">
                                Call/WhatsApp: 8595539968, 7042664033
                                <br />
                                E-mail: coceducation.logistics@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full md:w-auto">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4">
                        <h5 className="text-xl font-semibold text-blue-900">
                            Important
                        </h5>
                        <ul className="flex flex-col gap-4 text-base font-medium text-gray-800">
                            <li>Home</li>
                            <li>About us</li>
                            <li>Video Lectures</li>
                            <li>Faculties</li>
                            <li>Quiz</li>
                            <li>Blogs</li>
                            <li>FAQs</li>
                        </ul>
                    </div>
                </div>
                {/* Links Section */}
                <div className="flex flex-col h-full md:flex-row justify-between items-start w-full md:w-auto">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4 w-full">
                        <h5 className="text-xl font-semibold text-blue-900">
                            Follow Us
                        </h5>
                        <div className="w-full">
                            <button className="btn text-xl text-white btn-circle mr-4">
                                <FaFacebook className="" />
                            </button>
                            <button className="btn text-xl text-white btn-circle mr-4">
                                <FaTelegram className="" />
                            </button>
                            <button className="btn text-xl text-white btn-circle mr-4">
                                <FaInstagram className="" />
                            </button>
                            <button className="btn text-xl text-white btn-circle mr-4">
                                <FaYoutube className="" />
                            </button>
                        </div>
                        <YouTube />
                    </div>
                </div>
            </footer>
            <PaymentPartnersSection />
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
                <div className="relative w-[143px] h-[32px] bg-[#FF0000] border rounded-[2px]">
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
                </div>
            </div>
        </div>
    );
};
const PaymentPartnersSection = () => {
    return (
        <div className="bg-[#EDEDED] w-full">
            {/* Main Container */}
            <div className="flex flex-row justify-between items-center px-6 md:px-18 lg:px-24 py-4 mx-auto max-w-[1440px]">
                {/* Payment Partners Title */}
                <h2 className="text-[#101C36] font-semibold text-lg md:text-xl lg:text-2xl">
                    Payment Partners
                </h2>

                {/* Partner Logos Container */}
                <div className="flex flex-wrap justify-start gap-5">
                    {/* Individual Logo Items */}
                    <div
                        className="w-[75.61px] h-[20px] bg-center bg-contain"
                        style={{
                            backgroundImage: "url(paypal.svg)",
                        }}
                    ></div>
                    <div
                        className="w-[88.58px] h-[20px] bg-center bg-contain"
                        style={{
                            backgroundImage: "url(payu.svg)",
                        }}
                    ></div>
                    <div
                        className="w-[40.38px] h-[13px] bg-center bg-contain"
                        style={{
                            backgroundImage: "url(paytm.svg)",
                        }}
                    ></div>
                    <div
                        className="w-[49.56px] h-[20px] bg-center bg-contain"
                        style={{
                            backgroundImage: "url(googlepay.svg)",
                        }}
                    ></div>
                    <div
                        className="w-[73.62px] h-[20px] bg-center bg-contain"
                        style={{
                            backgroundImage: "url(phonepe.svg)",
                        }}
                    ></div>
                    <div
                        className="w-[94.34px] h-[20px] bg-center bg-contain"
                        style={{
                            backgroundImage: "url(razorpay.svg)",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
const NewsletterSignup = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 md:p-6 w-full bg-gradient-to-b from-[#D30031] to-[#db1d49] text-white max-w-full">
            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-bold text-center">
                Signup to Newsletter
            </h2>

            {/* Subtitle */}
            <p className="text-center mt-2 text-sm md:text-base">
                You will receive every news and recent update on your email!!!
            </p>

            {/* Input Form */}
            <div className="mt-6 flex w-full max-w-md">
                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter your email address here"
                    className="bg-gray-200 flex-1 px-4 py-2 rounded-l-lg border-none focus:outline-none text-black"
                />
                {/* Subscribe Button */}
                <button className="px-4 py-2 bg-[#101C36] text-white rounded-r-lg hover:bg-[#0c162a]">
                    SUBSCRIBE
                </button>
            </div>
        </div>
    );
};
