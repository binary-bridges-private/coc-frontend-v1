import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TdsReturn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tanNumber: "",
        returnType: "24Q",
        quarter: "Q1",
        financialYear: new Date().getFullYear().toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle TDS return submission logic here
        console.log("TDS Return submitted:", formData);
    };

    return (
        <div className="flex items-center justify-center p-4 mt-20 mb-20">
            <div className="w-full max-w-2xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">File TDS Return</h1>
                    <p className="text-gray-500">Submit your TDS return online</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="tanNumber" className="block mb-2 text-sm font-medium text-gray-700">
                            TAN Number
                        </label>
                        <input
                            type="text"
                            id="tanNumber"
                            value={formData.tanNumber}
                            onChange={(e) => setFormData({ ...formData, tanNumber: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your TAN number"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="returnType" className="block mb-2 text-sm font-medium text-gray-700">
                            Return Type
                        </label>
                        <select
                            id="returnType"
                            value={formData.returnType}
                            onChange={(e) => setFormData({ ...formData, returnType: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="24Q">24Q - Salary</option>
                            <option value="26Q">26Q - Non-Salary</option>
                            <option value="27Q">27Q - TCS</option>
                            <option value="27EQ">27EQ - TCS on Sale of Scrap</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="quarter" className="block mb-2 text-sm font-medium text-gray-700">
                            Quarter
                        </label>
                        <select
                            id="quarter"
                            value={formData.quarter}
                            onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Q1">Q1 (Apr-Jun)</option>
                            <option value="Q2">Q2 (Jul-Sep)</option>
                            <option value="Q3">Q3 (Oct-Dec)</option>
                            <option value="Q4">Q4 (Jan-Mar)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="financialYear" className="block mb-2 text-sm font-medium text-gray-700">
                            Financial Year
                        </label>
                        <input
                            type="text"
                            id="financialYear"
                            value={formData.financialYear}
                            onChange={(e) => setFormData({ ...formData, financialYear: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter financial year"
                            required
                        />
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/practice/tds")}
                            className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
                        >
                            ⬅ Back
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Submit Return
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TdsReturn; 