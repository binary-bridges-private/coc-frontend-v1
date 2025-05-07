import React from "react";
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
// TODO: add links to important navigation
const Footer = () => {
    return (
        <div className="">
            <NewsletterSignup />
            <footer className="flex flex-col items-start justify-between w-full gap-4 px-5 py-10 bg-white lg:px-20 md:px-20 md:flex-row ">
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
                            <p className="font-semibold leading-6 text-gray-800 lg:text-pm md:text-pm text-ps ">
                                COC Education Pvt. Ltd. Office No-132 Ithum
                                Tower-B Sector-62, Noida, Uttar Pradesh
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col items-start gap-4">
                        {/* Section */}
                        <div className="flex flex-col">
                            <h4 className="font-semibold text-gray-800 lg:text-pm md:text-pm text-ps">
                                For Purchase Related
                            </h4>
                            <p className="text-base leading-7 text-gray-600 text-n">
                                Call/WhatsApp: 9999631597 / 8448322142 /
                                7303445575 / 7011668629
                                <br />
                                E-mail: enquiry.coceducation@gmail.com
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-semibold text-gray-800 lg:text-pm md:text-pm text-ps">
                                For Technical Support
                            </h4>
                            <p className="text-base leading-7 text-gray-600 text-n">
                                Call/WhatsApp: 9811455109, 9311281468
                                <br />
                                E-mail: coceducation.technical@gmail.com
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-semibold text-gray-800 lg:text-pm md:text-pm text-ps">
                                For Courier Related Enquiry
                            </h4>
                            <p className="text-base leading-7 text-gray-600 text-n">
                                Call/WhatsApp: 8595539968, 7042664033
                                <br />
                                E-mail: coceducation.logistics@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <div className="flex flex-col items-start justify-between w-full gap-8 md:flex-row md:w-auto">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4">
                        <h5 className="font-semibold text-blue-900 lg:text-pl md:text-pm text-ps">
                            Important
                        </h5>
                        <ul className="flex flex-col gap-4 text-base text-gray-800 text-n">
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
                <div className="flex flex-col items-start justify-between w-full h-full md:flex-row md:w-auto">
                    {/* Navigation Links */}
                    <div className="flex flex-col w-full gap-4">
                        <h5 className="font-semibold text-blue-900 lg:text-pl md:text-pm text-ps">
                            Follow Us
                        </h5>
                        <div className="flex space-x-4">
                        <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full">
                            <FaFacebook className="text-xl" />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 text-white bg-pink-600 rounded-full">
                            <FaInstagram className="text-xl" />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <FaTelegram className="text-xl" />
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full">
                            <FaYoutube className="text-xl" />
                        </button>
                    </div>
                        <YouTube />
                    </div>
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

const NewsletterSignup = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 md:p-6 w-full bg-gradient-to-b from-[#D30031] to-[#db1d49] text-white max-w-full">
            {/* Title */}
            <h2 className="font-semibold text-center lg:text-hl md:text-hm text-hs">
                Signup to Newsletter
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-center lg:text-pl md:text-pm text-ps">
                You will receive every news and recent update on your email!!!
            </p>

            {/* Input Form */}
            <div className="flex w-full max-w-md mt-6">
                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Enter your email address here"
                    className="flex-1 px-4 py-2 text-black bg-gray-200 border-none rounded-l-lg focus:outline-none"
                />
                {/* Subscribe Button */}
                <button className="px-4 py-2 bg-[#101C36] text-white rounded-r-lg hover:bg-[#0c162a]">
                    SUBSCRIBE
                </button>
            </div>
        </div>
    );
};

// import React from "react";
// import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";

// const Footer = () => {
//     return (
//         <div className="bg-white">
//             <NewsletterSignup />
//             <footer className="grid grid-cols-1 gap-8 px-5 py-10 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
//                 {/* Company Info */}
//                 <div className="space-y-6">
//                     <img
//                         src={"icon-wide.svg"}
//                         alt="COC Logo"
//                         className="w-[271px] h-[93px]"
//                     />
//                     <p className="text-base font-semibold leading-6 text-gray-800">
//                         COC Education Pvt. Ltd. Office No-132 Ithum Tower-B Sector-62, 
//                         Noida, Uttar Pradesh
//                     </p>
                    
//                     {/* Social Media */}
                    // <div className="flex space-x-4">
                    //     <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full">
                    //         <FaFacebook className="text-xl" />
                    //     </button>
                    //     <button className="flex items-center justify-center w-10 h-10 text-white bg-pink-600 rounded-full">
                    //         <FaInstagram className="text-xl" />
                    //     </button>
                    //     <button className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                    //         <FaTelegram className="text-xl" />
                    //     </button>
                    //     <button className="flex items-center justify-center w-10 h-10 text-white bg-red-600 rounded-full">
                    //         <FaYoutube className="text-xl" />
                    //     </button>
                    // </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="space-y-6">
//                     <h3 className="text-base font-semibold text-blue-900">Contact Information</h3>
                    
//                     <div className="space-y-4">
//                         <div>
//                             <h4 className="text-base font-semibold text-gray-800">For Purchase Related</h4>
//                             <p className="mt-1 text-base leading-7 text-gray-600">
//                                 Call/WhatsApp: 9999631597 / 8448322142 / 7303445575 / 7011668629
//                                 <br />
//                                 E-mail: enquiry.coceducation@gmail.com
//                             </p>
//                         </div>
                        
//                         <div>
//                             <h4 className="text-base font-semibold text-gray-800">For Technical Support</h4>
//                             <p className="mt-1 text-base leading-7 text-gray-600">
//                                 Call/WhatsApp: 9811455109, 9311281468
//                                 <br />
//                                 E-mail: coceducation.technical@gmail.com
//                             </p>
//                         </div>
                        
//                         <div>
//                             <h4 className="text-base font-semibold text-gray-800">For Courier Related Enquiry</h4>
//                             <p className="mt-1 text-base leading-7 text-gray-600">
//                                 Call/WhatsApp: 8595539968, 7042664033
//                                 <br />
//                                 E-mail: coceducation.logistics@gmail.com
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Quick Links */}
//                 <div className="space-y-6">
//                     <h3 className="text-base font-semibold text-blue-900">Quick Links</h3>
//                     <ul className="space-y-3">
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">Home</a></li>
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">About us</a></li>
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">Video Lectures</a></li>
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">Faculties</a></li>
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">Quiz</a></li>
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">Blogs</a></li>
//                         <li><a href="#" className="text-base text-gray-800 hover:text-blue-600">FAQs</a></li>
//                     </ul>
//                 </div>

//                 {/* YouTube Channel */}
//                 <div className="space-y-6">
//                     <h3 className="text-base font-semibold text-blue-900">Our YouTube Channel</h3>
//                     <YouTube />
//                 </div>
//             </footer>
            
//             {/* Copyright */}
//             <div className="py-4 bg-gray-100">
//                 <div className="px-5 mx-auto text-base text-center text-gray-500 max-w-7xl">
//                     © {new Date().getFullYear()} COC Education Pvt. Ltd. All rights reserved.
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Footer;

// const YouTube = () => {
//     return (
//         <div className="flex items-center gap-4 w-[308px]">
//             <img
//                 src={"santosh.svg"}
//                 alt="Youtube"
//                 className="w-[66px] h-[66px] rounded-[2px]"
//             />

//             <div className="flex flex-col gap-3">
//                 <div className="text-sm font-medium text-gray-800">
//                     Santosh Kumar - COC Education
//                 </div>

//                 <div className="flex">
//                     <div className="bg-[#FF0000] px-2 py-1 rounded-l-[2px] flex items-center">
//                         <img
//                             src={"youtube.svg"}
//                             alt="Youtube Logo"
//                             className="w-[73px] h-[16px]"
//                         />
//                     </div>
//                     <div className="bg-white px-2 py-1 rounded-r-[2px] border-l border-gray-200 flex items-center">
//                         <span className="text-sm text-gray-600">329K</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const NewsletterSignup = () => {
//     return (
//         <div className="bg-gradient-to-b from-[#D30031] to-[#db1d49] text-white w-full py-6 px-5">
//             <div className="mx-auto text-center max-w-7xl">
//                 <h2 className="mb-2 text-xl font-semibold">
//                     Signup to Newsletter
//                 </h2>
//                 <p className="mb-6 text-base">
//                     You will receive every news and recent update on your email!!!
//                 </p>

//                 <div className="flex flex-col max-w-md gap-2 mx-auto sm:flex-row">
//                     <input
//                         type="email"
//                         placeholder="Enter your email address here"
//                         className="flex-1 px-4 py-2 text-gray-900 rounded sm:rounded-r-none focus:outline-none"
//                     />
//                     <button className="px-4 py-2 bg-[#101C36] rounded sm:rounded-l-none font-semibold">
//                         SUBSCRIBE
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
// const PaymentPartnersSection = () => {
//     return (
//         <div className="bg-[#EDEDED] w-full">
//             {/* Main Container */}
//             <div className="flex flex-row justify-between items-center px-6 md:px-18 lg:px-24 py-4 mx-auto max-w-[1440px]">
//                 {/* Payment Partners Title */}
//                 <h2 className="text-[#101C36] font-semibold text-lg md:text-xl lg:text-2xl">
//                     Payment Partners
//                 </h2>

//                 {/* Partner Logos Container */}
//                 <div className="flex flex-wrap justify-start gap-5">
//                     {/* Individual Logo Items */}
//                     <div
//                         className="w-[75.61px] h-[20px] bg-center bg-contain"
//                         style={{
//                             backgroundImage: "url(paypal.svg)",
//                         }}
//                     ></div>
//                     <div
//                         className="w-[88.58px] h-[20px] bg-center bg-contain"
//                         style={{
//                             backgroundImage: "url(payu.svg)",
//                         }}
//                     ></div>
//                     <div
//                         className="w-[40.38px] h-[13px] bg-center bg-contain"
//                         style={{
//                             backgroundImage: "url(paytm.svg)",
//                         }}
//                     ></div>
//                     <div
//                         className="w-[49.56px] h-[20px] bg-center bg-contain"
//                         style={{
//                             backgroundImage: "url(googlepay.svg)",
//                         }}
//                     ></div>
//                     <div
//                         className="w-[73.62px] h-[20px] bg-center bg-contain"
//                         style={{
//                             backgroundImage: "url(phonepe.svg)",
//                         }}
//                     ></div>
//                     <div
//                         className="w-[94.34px] h-[20px] bg-center bg-contain"
//                         style={{
//                             backgroundImage: "url(razorpay.svg)",
//                         }}
//                     ></div>
//                 </div>
//             </div>
//         </div>
//     );
// };