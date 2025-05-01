import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks.ts";

const Gst = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);

    const isGstin = useAppSelector((state) => state.gstAuth.isGstAuthenticated);

    console.log(isGstin);
    
    const gstOptions = [
        { name: "Registration", slug: "registration", description: "Apply for GST registration" },
        {
            name: isGstin ? "Dashboard" : "Login",
            slug: isGstin ? "dashboard" : "login",
            description: isGstin ? "Go to your dashboard" : "Login to continue"
        },
    ];

    return (
        <div className="flex items-center justify-center p-4 mt-20 mb-20">
            <div className="w-full max-w-4xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Select a GST Service:</h1>
                    <p className="text-gray-500">Choose one of the services below to proceed</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {gstOptions.map((option) => (
                        <div
                            key={option.slug}
                            className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border-2
                                ${selected === option.name
                                    ? "border-blue-500 bg-blue-50 scale-105 shadow-md"
                                    : hovered === option.name
                                        ? "border-blue-300 bg-blue-50 scale-[1.02]"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                            onClick={() => {
                                setSelected(option.name);
                                navigate(
                                    // option.slug === "dashboard"
                                        // ? "/dashboard"
                                    `/practice/gst/${option.slug}`
                                );
                            }}
                            onMouseEnter={() => setHovered(option.name)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="flex flex-col items-center text-center">
                                <h3 className="mb-2 text-xl font-semibold text-gray-800">{option.name}</h3>
                                <p className="text-gray-500">{option.description}</p>
                                <button className="px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate("/practice")}
                        className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
                    >
                        ⬅ Back to Services
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Gst;
