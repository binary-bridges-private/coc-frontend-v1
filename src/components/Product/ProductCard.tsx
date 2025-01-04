import React from "react";

const ProductCard = () => {
    return (
        <div className="box-border flex flex-col items-start p-4 gap-6 w-[370px] h-[500px] bg-white border border-[#DBDBDB] rounded-lg">
            {/* Client Info Item */}
            <div className="flex flex-col justify-center items-center gap-4 w-full h-full isolate">
                {/* Image */}
                <div
                    className="w-[350px] h-[400px] rounded-md"
                    style={{
                        backgroundImage: "url('course-example.png')",
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                    }}
                ></div>

                {/* Person Details */}
                <div className="flex flex-col items-start gap-1.5 w-[338px] h-[101px]">
                    {/* Title */}
                    <h3 className="w-[338px] h-[54px] font-sans font-semibold text-[21px] leading-[130%] text-[#111827]">
                        CMA Inter Group-2 Full Course (Combo)
                    </h3>

                    {/* Subtitle */}
                    <p className="w-[338px] h-[41px] font-mulish font-normal text-[16px] leading-[20px] text-[#374151]">
                        By : CA/CMA Santosh Kumar, CA/CS Amit Bachhawat, CMA
                        Sumit Rastogi, CA Satish Jalan
                    </p>
                </div>
            </div>

            {/* Price Tag */}
            <div className="relative w-[150px] left-3 top-[-180px] bg-red-600 rounded-md z-10 flex items-center justify-center">
                <p className="h-full flex items-center justify-center font-sans font-bold text-md leading-[20px] text-white">
                    ₹22500 - ₹31000
                </p>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-row items-center gap-6 w-[338px] h-[44px]">
                {/* YouTube Icon */}
                <div className="w-11 h-11 bg-red-600 flex justify-center items-center rounded-full">
                    <div className="w-[35.75px] h-[27.5px] bg-white"></div>
                </div>

                {/* WhatsApp Icon */}
                <div
                    className="w-11 h-11 flex justify-center items-center rounded-full"
                    style={{
                        background: "linear-gradient(0deg, #1FAF38, #60D669)",
                    }}
                >
                    <div className="w-[38.5px] h-[38.67px] bg-white"></div>
                </div>

                {/* Call Icon */}
                <div className="w-11 h-11 flex justify-center items-center rounded-full bg-blue-500">
                    <div className="w-[25.86px] h-[24.75px] bg-white"></div>
                </div>
            </div>

            {/* Button */}
            <div className="flex flex-row justify-center items-center gap-2.5 p-2 w-[135px] h-11 border border-[#101C36] rounded-md">
                <span className="font-sans font-medium text-[16px] text-[#101C36]">
                    View Details
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
