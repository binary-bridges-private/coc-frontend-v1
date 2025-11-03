// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Practice = () => {
//     const navigate = useNavigate();
//     const [hovered, setHovered] = useState<string | null>(null);
//     const [selected, setSelected] = useState<string | null>(null);

//     const options = [
//         { name: "GST", slug: "gst"},
//         { name: "ITR", slug: "itr"},
//         { name: "TDS", slug: "tds"},
//         { name: "ROC Filing", slug: "roc-filing"},
//         { name: "PF ESI", slug: "pf-esi"}
//     ];

//     return (
//         <div className="flex items-center justify-center p-4 mt-20 mb-20">
//             <div className="w-full max-w-4xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
//                 <div className="mb-10 text-center">
//                     <h1 className="mb-2 text-3xl font-bold text-gray-800">Select an option to practice :</h1>
//                 </div>
                
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {options.map((option) => (
//                         <div 
//                             key={option.slug}
//                             className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer border-2
//                                 ${selected === option.name 
//                                     ? "border-blue-500 bg-blue-50 scale-105 shadow-md" 
//                                     : hovered === option.name 
//                                         ? "border-blue-300 bg-blue-50 scale-[1.02]" 
//                                         : "border-gray-200 hover:border-gray-300 bg-white"
//                                 }`}
//                             onClick={() => {
//                                 setSelected(option.name);
//                                 navigate(`/practice/${option.slug}`);
//                             }}
//                             onMouseEnter={() => setHovered(option.name)}
//                             onMouseLeave={() => setHovered(null)}
//                         >
//                             <div className="flex flex-col items-center text-center">
//                                 <h3 className="mb-2 text-xl font-semibold text-gray-800">{option.name}</h3>
//                                 <p className="text-gray-500">
//                                     {option.name === "GST" && "Goods & Services Tax"}
//                                     {option.name === "ITR" && "Income Tax Return"}
//                                     {option.name === "TDS" && "Tax Deducted at Source"}
//                                     {option.name === "ROC Filing" && "Registrar of Companies"}
//                                     {option.name === "PF ESI" && "Provident Fund & ESIC"}
//                                 </p>
//                                 <button className="px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
//                                     Practice Now
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Practice;


import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi"; // Import an alert icon

const Practice = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
        { name: "GST", slug: "gst"},
        { name: "ITR", slug: "itr"},
        { name: "TDS", slug: "tds"},
        { name: "ROC Filing", slug: "roc-filing"},
        { name: "PF ESI", slug: "pf-esi"}
    ];

    return (
        <div className="flex items-center justify-center p-4 mt-20 mb-20">
            <div className="w-full max-w-4xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                {/* Improved warning banner */}
                <div className="flex items-center justify-center p-4 mb-8 text-orange-800 bg-orange-100 border-l-4 border-orange-500 rounded-lg">
                    <FiAlertTriangle className="mr-3 text-xl shrink-0" />
                    <div>
                        <p className="font-medium">Educational Use Only</p>
                        <p className="text-sm">This simulation is for learning purposes only and not official tax/financial advice</p>
                    </div>
                </div>
                
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Select an option to practice :</h1>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {options.map((option) => (
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
                                navigate(`/practice/${option.slug}`);
                            }}
                            onMouseEnter={() => setHovered(option.name)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="flex flex-col items-center text-center">
                                <h3 className="mb-2 text-xl font-semibold text-gray-800">{option.name}</h3>
                                <p className="text-gray-500">
                                    {option.name === "GST" && "Goods & Services Tax"}
                                    {option.name === "ITR" && "Income Tax Return"}
                                    {option.name === "TDS" && "Tax Deducted at Source"}
                                    {option.name === "ROC Filing" && "Registrar of Companies"}
                                    {option.name === "PF ESI" && "Provident Fund & ESIC"}
                                </p>
                                <button className="px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                                    Practice Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Practice;