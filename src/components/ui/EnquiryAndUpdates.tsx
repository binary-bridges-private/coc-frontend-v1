import React from "react";
import EnquiryForm from "./EnquiryForm.tsx";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTelegram,
    FaWhatsapp,
    FaYoutube,
} from "react-icons/fa";

const EnquiryAndUpdates = () => {
    return (
        <div className="w-full h-[664px] grid grid-cols-3">
            <div
                className="h-full col-span-2 bg-cover bg-center opacity-90 flex flex-col justify-center gap-8"
                style={{
                    backgroundImage: "url('woman-working-in-office.jpg')",
                }}
            >
                <div className="relative h-[68px] w-[68px] bg-[#FF0000] flex justify-center items-center">
                    <FaYoutube className="text-white text-5xl" />
                </div>
                <div className="h-[68px] w-[68px] bg-[#1877F2] flex justify-center items-center">
                    <FaFacebook className="text-white text-5xl" />
                </div>
                <div className="h-[68px] w-[68px] bg-[#60D669] flex justify-center items-center">
                    <FaWhatsapp className="text-white text-5xl" />
                </div>
                <div className="h-[68px] w-[68px] bg-[#2AABEE] flex justify-center items-center">
                    <FaTelegram className="text-white text-5xl" />
                </div>
                <div className="h-[68px] w-[68px] bg-[#FFAB4D] flex justify-center items-center">
                    <FaInstagram className="text-white text-5xl" />
                </div>
            </div>
            <div className="h-full col-span-1">
                <EnquiryForm />
            </div>
        </div>
    );
};

export default EnquiryAndUpdates;
