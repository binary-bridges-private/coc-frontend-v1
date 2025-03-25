import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Practice = () => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState<string | null>(null);

    const options = [{ name: "GST", slug: "gst" }, { name: "ITR", slug: "itr" }, { name: "TDS", slug: "tds" }, { name: "ROC Filing", slug: "roc-filing" }, { name: "PF ESI", slug: "pf-esi" }];

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-[500px]">
            <div className="p-10 bg-white border border-gray-200 shadow-lg rounded-2xl w-296">
                <h2 className="mb-4 text-xl font-semibold text-center">Select an option to practice :</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={`btn btn-outline w-32 ${selected === option.name ? "btn-primary text-white" : "btn-neutral"
                                }`}
                            onClick={() => { setSelected(option.name); navigate(`/practice/${option.slug}`) }}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Practice;
