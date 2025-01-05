import React from "react";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";

const ProductCard = ({ name, byline, photo, priceRange }) => {
    return (
        <div className="flex items-center justify-center w-full mt-6 mb-6">
            <div className="flex flex-col items-start p-2 gap-2 shadow-lg w-[330px] bg-white border border-[#DBDBDB] rounded-lg">
                {/* Client Info Item */}
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    {/* Image */}
                    <div
                        className="w-[310px] h-[335px] rounded-md"
                        style={{
                            backgroundImage: `url('${photo}')`,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    {/* Person Details */}
                    <div className="flex flex-col items-start gap-1.5 w-[300px]">
                        {/* Title */}
                        <h3 className="w-[300px] h-[54px] font-sans font-semibold text-[21px] leading-[130%] text-[#111827]">
                            {name}
                        </h3>

                        {/* Subtitle */}
                        <p className="w-[300px] h-[70px] font-mulish font-normal text-n2 leading-[20px] text-[#374151]">
                            By: {byline}
                        </p>
                    </div>
                </div>

                {/* Price Tag */}
                <div className="z-10 flex items-center justify-center w-full h-10 bg-green-700 rounded-md">
                    <p className="h-full flex items-center justify-center font-sans font-bold text-xl leading-[20px] text-white">
                        {priceRange}
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-row items-center gap-6 w-[310px] h-[44px]">
                    {/* YouTube Icon */}
                    <FaYoutube className="text-5xl text-red-600" />

                    {/* WhatsApp Icon */}
                    <FaWhatsapp className="text-5xl text-green-600" />

                    {/* Phone Icon */}
                    <MdPhoneInTalk className="text-5xl text-blue-500" />
                    <button className="flex active:scale-80 active:bg-[#101C36] text-[#101C36] active:text-white flex-row justify-center items-center gap-2.5 p-2 w-[135px] h-11 border border-[#101C36] rounded-md">
                        <span className="font-sans font-medium text-[16px]">
                            View Details
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
