import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Official TDS Return Form Structure
interface TDSReturnFormData {
    // Basic Details
    tanNumber: string;
    returnType: "24Q" | "26Q" | "27Q" | "27EQ";
    quarter: "Q1" | "Q2" | "Q3" | "Q4";
    financialYear: string;
    
    // Deductor Details
    deductorName: string;
    deductorAddress: string;
    deductorCity: string;
    deductorState: string;
    deductorPincode: string;
    deductorEmail: string;
    deductorPhone: string;
    
    // Return Details
    totalTaxDeducted: string;
    totalTaxDeposited: string;
    totalChallans: string;
    totalChallanAmount: string;
    
    // Employee/Deductee Details (for 24Q)
    employeeDetails: Array<{
        panOfDeductee: string;
        nameOfDeductee: string;
        totalAmountPaid: string;
        taxDeducted: string;
        taxDeposited: string;
    }>;
    
    // Non-Salary Details (for 26Q)
    deducteeDetails: Array<{
        panOfDeductee: string;
        nameOfDeductee: string;
        sectionCode: string;
        totalAmountPaid: string;
        taxDeducted: string;
        taxDeposited: string;
    }>;
}

// Official validation functions
const validateTAN = (tan: string): boolean => {
    const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
    return tanRegex.test(tan);
};

const validatePAN = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
};

const TdsReturn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TDSReturnFormData>({
        tanNumber: "",
        returnType: "24Q",
        quarter: "Q1",
        financialYear: new Date().getFullYear().toString(),
        deductorName: "",
        deductorAddress: "",
        deductorCity: "",
        deductorState: "",
        deductorPincode: "",
        deductorEmail: "",
        deductorPhone: "",
        totalTaxDeducted: "",
        totalTaxDeposited: "",
        totalChallans: "",
        totalChallanAmount: "",
        employeeDetails: [],
        deducteeDetails: [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.tanNumber) {
            newErrors.tanNumber = 'TAN Number is required';
        } else if (!validateTAN(formData.tanNumber)) {
            newErrors.tanNumber = 'Invalid TAN format (10 characters: 4+5+1)';
        }
        
        if (!formData.deductorName) {
            newErrors.deductorName = 'Deductor Name is required';
        }
        
        if (!formData.deductorEmail) {
            newErrors.deductorEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.deductorEmail)) {
            newErrors.deductorEmail = 'Invalid email format';
        }
        
        if (!formData.deductorPhone) {
            newErrors.deductorPhone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(formData.deductorPhone)) {
            newErrors.deductorPhone = 'Invalid phone number format';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Handle TDS return submission logic here
        console.log("TDS Return submitted:", formData);
        alert('TDS Return submitted successfully!');
        navigate('/practice/tds');
    };

    return (
        <div className="flex items-center justify-center p-4 mt-20 mb-20">
            <div className="w-full max-w-2xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">File TDS Return</h1>
                    <p className="text-gray-500">Submit your TDS return online</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Details Section */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Basic Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="tanNumber" className="block mb-2 text-sm font-medium text-gray-700">
                                    TAN Number *
                                </label>
                                <input
                                    type="text"
                                    id="tanNumber"
                                    value={formData.tanNumber}
                                    onChange={(e) => setFormData({ ...formData, tanNumber: e.target.value.toUpperCase() })}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.tanNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your TAN number"
                                    maxLength={10}
                                    required
                                />
                                {errors.tanNumber && (
                                    <p className="mt-1 text-sm text-red-500">{errors.tanNumber}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="deductorName" className="block mb-2 text-sm font-medium text-gray-700">
                                    Deductor Name *
                                </label>
                                <input
                                    type="text"
                                    id="deductorName"
                                    value={formData.deductorName}
                                    onChange={(e) => setFormData({ ...formData, deductorName: e.target.value })}
                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.deductorName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter deductor name"
                                    required
                                />
                                {errors.deductorName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.deductorName}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Return Details Section */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Return Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="returnType" className="block mb-2 text-sm font-medium text-gray-700">
                                    Return Type *
                                </label>
                                <select
                                    id="returnType"
                                    value={formData.returnType}
                                    onChange={(e) => setFormData({ ...formData, returnType: e.target.value as any })}
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
                                    Quarter *
                                </label>
                                <select
                                    id="quarter"
                                    value={formData.quarter}
                                    onChange={(e) => setFormData({ ...formData, quarter: e.target.value as any })}
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
                                    Financial Year *
                                </label>
                                <input
                                    type="text"
                                    id="financialYear"
                                    value={formData.financialYear}
                                    onChange={(e) => setFormData({ ...formData, financialYear: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 2023-24"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="totalTaxDeducted" className="block mb-2 text-sm font-medium text-gray-700">
                                    Total Tax Deducted (₹)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="totalTaxDeducted"
                                    value={formData.totalTaxDeducted}
                                    onChange={(e) => setFormData({ ...formData, totalTaxDeducted: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
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