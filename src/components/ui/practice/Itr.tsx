import { useNavigate } from "react-router-dom";
import React from "react";


const Itr = () => {
    const navigate = useNavigate();
    const itrOptions = [
        { name: "Registration", slug: "registration" },
        { name: "ITR-1", slug: "itr-1" },
        { name: "ITR-2", slug: "itr-2" },
        { name: "ITR-3", slug: "itr-3" },
        { name: "ITR-4", slug: "itr-4" },
        { name: "ITR-5", slug: "itr-5" },
        { name: "ITR-6", slug: "itr-6" },
        { name: "ITR-7", slug: "itr-7" },
      ];
      
    return (
        <div className="flex flex-col items-center px-10 py-20">
            {/* Hero Section */}
            <div className="w-full py-10 hero">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">ITR</h1>
                    <p className="mt-2 text-lg">Select a service to proceed</p>
                </div>
            </div>

            {/* Options Section */}
            <div className="flex flex-wrap justify-center gap-3">
                {itrOptions.map((option, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px]"
                    >
                        <span className="text-lg font-semibold text-gray-700">{option.name}</span>
                        <button onClick={() => navigate(`/practice/itr/${option.slug}`)} className="flex items-center m-5 text-gray-700 bg-white border border-gray-400 btn hover:bg-gray-100">
                            Select <span className="ml-2">→</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <button onClick={() => navigate("/practice")} className="mt-6 btn btn-outline">
                ⬅ Back to Services
            </button>
        </div>
    );
};

export default Itr;
