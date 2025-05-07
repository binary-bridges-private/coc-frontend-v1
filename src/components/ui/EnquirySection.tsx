import React from "react";
import EnquiryForm from "./EnquiryForm.tsx";
import {
    FaFacebook,
    FaInstagram,
    FaTelegram,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";
const EnquirySection = () => {
    return (
        <div className="w-full h-auto md:h-[664px]">
            <div
                className="flex-col justify-center hidden h-full gap-8 bg-center bg-cover md:flex opacity-90"
                style={{
                    backgroundImage: "url('woman-working-in-office.jpg')",
                }}
            >
                <div className="relative h-[58px] w-[58px] bg-[#FF0000] rounded-lg flex justify-center items-center hover:h-[64px] hover:w-[64px]">
                    <FaYoutube className="text-5xl text-white" />
                </div>
                <div className="h-[58px] w-[58px] bg-[#1877F2] flex justify-center rounded-lg items-center hover:h-[64px] hover:w-[64px]">
                    <FaFacebook className="text-5xl text-white" />
                </div>
                <div className="h-[58px] w-[58px] bg-[#60D669] flex justify-center rounded-lg items-center hover:h-[64px] hover:w-[64px]">
                    <FaWhatsapp className="text-5xl text-white" />
                </div>
                <div className="h-[58px] w-[58px] bg-[#2AABEE] flex justify-center rounded-lg items-center hover:h-[64px] hover:w-[64px]">
                    <FaTelegram className="text-5xl text-white" />
                </div>
                <div className="h-[58px] w-[58px] bg-[#FFAB4D] flex justify-center rounded-lg items-center hover:h-[64px] hover:w-[64px]">
                    <FaInstagram className="text-5xl text-white" />
                </div>
            </div>
            {/* <div className="flex items-center justify-center w-full col-span-1 md:col-span-2">
                <EnquiryForm />
            </div> */}
        </div>
    );
};

export default EnquirySection;
