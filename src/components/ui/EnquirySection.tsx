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
                {/* <div className="relative h-[58px] w-[58px] bg-[#FF0000] rounded-lg flex justify-center items-center hover:h-[64px] hover:w-[64px]">
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
                </div> */}
            
            <div className="group ml-1 relative h-12 w-12 bg-[#FF0000] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/30">
                    <FaYoutube className="text-3xl text-white" />
                    <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                        YouTube
                    </span>
                </div>
                
                {/* Facebook */}
                <div className="group ml-1 relative h-12 w-12 bg-[#1877F2] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/30">
                    <FaFacebook className="text-3xl text-white" />
                    <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                        Facebook
                    </span>
                </div>
                
                {/* WhatsApp */}
                <div className="group ml-1 relative h-12 w-12 bg-[#25D366] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/30">
                    <FaWhatsapp className="text-3xl text-white" />
                    <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                        WhatsApp
                    </span>
                </div>
                
                {/* Telegram */}
                <div className="group ml-1 relative h-12 w-12 bg-[#0088CC] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0088CC]/30">
                    <FaTelegram className="text-3xl text-white" />
                    <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                        Telegram
                    </span>
                </div>
                
                {/* Instagram */}
                <div className="group ml-1 relative h-12 w-12 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-lg flex justify-center items-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#DD2A7B]/30">
                    <FaInstagram className="text-3xl text-white" />
                    <span className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity bg-black rounded opacity-0 left-full group-hover:opacity-100 whitespace-nowrap">
                        Instagram
                    </span>
                </div>
            </div>
            {/* <div className="flex items-center justify-center w-full col-span-1 md:col-span-2">
                <EnquiryForm />
            </div> */}
        </div>
    );
};

export default EnquirySection;