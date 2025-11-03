import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IncorporationFormData {
    // Company Details
    companyName: string;
    companyType: string;
    businessActivity: string;
    registeredOffice: string;
    state: string;
    district: string;
    pincode: string;
    
    // Authorized Capital
    authorizedCapital: string;
    paidUpCapital: string;
    
    // Director Details
    directors: Array<{
        name: string;
        din: string;
        pan: string;
        address: string;
        phone: string;
        email: string;
        designation: string;
    }>;
    
    // Shareholder Details
    shareholders: Array<{
        name: string;
        pan: string;
        address: string;
        shares: string;
        amount: string;
    }>;
    
    // Documents
    memorandumOfAssociation: File | null;
    articlesOfAssociation: File | null;
    formINC1: File | null;
    formINC2: File | null;
    formINC3: File | null;
    formINC7: File | null;
    formINC9: File | null;
    formINC22: File | null;
    formDIR2: File | null;
}

const Incorporation = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<IncorporationFormData>({
        companyName: "",
        companyType: "",
        businessActivity: "",
        registeredOffice: "",
        state: "",
        district: "",
        pincode: "",
        authorizedCapital: "",
        paidUpCapital: "",
        directors: [{ name: "", din: "", pan: "", address: "", phone: "", email: "", designation: "" }],
        shareholders: [{ name: "", pan: "", address: "", shares: "", amount: "" }],
        memorandumOfAssociation: null,
        articlesOfAssociation: null,
        formINC1: null,
        formINC2: null,
        formINC3: null,
        formINC7: null,
        formINC9: null,
        formINC22: null,
        formDIR2: null,
    });

    const companyTypes = [
        "Private Limited Company",
        "Public Limited Company",
        "One Person Company",
        "Limited Liability Partnership"
    ];

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh"
    ];

    const designations = [
        "Managing Director",
        "Director",
        "Whole-time Director",
        "Independent Director",
        "Nominee Director"
    ];

    const validateField = (name: string, value: any): string => {
        switch (name) {
            case "companyName":
                return value.length < 3 ? "Company name must be at least 3 characters" : "";
            case "pincode":
                return !/^\d{6}$/.test(value) ? "Pincode must be 6 digits" : "";
            case "authorizedCapital":
            case "paidUpCapital":
                return !/^\d+$/.test(value) ? "Capital must be a valid number" : "";
            case "din":
                return !/^\d{8}$/.test(value) ? "DIN must be 8 digits" : "";
            case "pan":
                return !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? "Invalid PAN format" : "";
            case "phone":
                return !/^\d{10}$/.test(value) ? "Phone must be 10 digits" : "";
            case "email":
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : "";
            default:
                return value.length < 2 ? "This field is required" : "";
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDirectorChange = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            directors: prev.directors.map((director, i) => 
                i === index ? { ...director, [field]: value } : director
            )
        }));
    };

    const addDirector = () => {
        setFormData(prev => ({
            ...prev,
            directors: [...prev.directors, { name: "", din: "", pan: "", address: "", phone: "", email: "", designation: "" }]
        }));
    };

    const removeDirector = (index: number) => {
        if (formData.directors.length > 1) {
            setFormData(prev => ({
                ...prev,
                directors: prev.directors.filter((_, i) => i !== index)
            }));
        }
    };

    const handleShareholderChange = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            shareholders: prev.shareholders.map((shareholder, i) => 
                i === index ? { ...shareholder, [field]: value } : shareholder
            )
        }));
    };

    const addShareholder = () => {
        setFormData(prev => ({
            ...prev,
            shareholders: [...prev.shareholders, { name: "", pan: "", address: "", shares: "", amount: "" }]
        }));
    };

    const removeShareholder = (index: number) => {
        if (formData.shareholders.length > 1) {
            setFormData(prev => ({
                ...prev,
                shareholders: prev.shareholders.filter((_, i) => i !== index)
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            [name]: file
        }));
    };

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Incorporation Form Data:", formData);
        alert("Incorporation form submitted successfully!");
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Company Details</h3>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Company Name *</label>
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Company Type *</label>
                <select
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Company Type</option>
                    {companyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Business Activity *</label>
                <textarea
                    name="businessActivity"
                    value={formData.businessActivity}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Registered Office Address *</label>
                <textarea
                    name="registeredOffice"
                    value={formData.registeredOffice}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">State *</label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">District *</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode *</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Capital Details</h3>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Authorized Capital (₹) *</label>
                <input
                    type="text"
                    name="authorizedCapital"
                    value={formData.authorizedCapital}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Paid-up Capital (₹) *</label>
                <input
                    type="text"
                    name="paidUpCapital"
                    value={formData.paidUpCapital}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Director Details</h3>
                <button
                    type="button"
                    onClick={addDirector}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Add Director
                </button>
            </div>

            {formData.directors.map((director, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Director {index + 1}</h4>
                        {formData.directors.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeDirector(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input
                                type="text"
                                value={director.name}
                                onChange={(e) => handleDirectorChange(index, "name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DIN *</label>
                            <input
                                type="text"
                                value={director.din}
                                onChange={(e) => handleDirectorChange(index, "din", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">PAN *</label>
                            <input
                                type="text"
                                value={director.pan}
                                onChange={(e) => handleDirectorChange(index, "pan", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation *</label>
                            <select
                                value={director.designation}
                                onChange={(e) => handleDirectorChange(index, "designation", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Designation</option>
                                {designations.map(designation => (
                                    <option key={designation} value={designation}>{designation}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone *</label>
                            <input
                                type="text"
                                value={director.phone}
                                onChange={(e) => handleDirectorChange(index, "phone", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email *</label>
                            <input
                                type="email"
                                value={director.email}
                                onChange={(e) => handleDirectorChange(index, "email", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address *</label>
                        <textarea
                            value={director.address}
                            onChange={(e) => handleDirectorChange(index, "address", e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Shareholder Details</h3>
                <button
                    type="button"
                    onClick={addShareholder}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Add Shareholder
                </button>
            </div>

            {formData.shareholders.map((shareholder, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Shareholder {index + 1}</h4>
                        {formData.shareholders.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeShareholder(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                            <input
                                type="text"
                                value={shareholder.name}
                                onChange={(e) => handleShareholderChange(index, "name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">PAN *</label>
                            <input
                                type="text"
                                value={shareholder.pan}
                                onChange={(e) => handleShareholderChange(index, "pan", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Number of Shares *</label>
                            <input
                                type="text"
                                value={shareholder.shares}
                                onChange={(e) => handleShareholderChange(index, "shares", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount (₹) *</label>
                            <input
                                type="text"
                                value={shareholder.amount}
                                onChange={(e) => handleShareholderChange(index, "amount", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address *</label>
                        <textarea
                            value={shareholder.address}
                            onChange={(e) => handleShareholderChange(index, "address", e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
            ))}
        </div>
    );

    const renderStep5 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Required Documents</h3>
            <p className="text-sm text-gray-600">Please upload the following documents:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { name: "memorandumOfAssociation", label: "Memorandum of Association" },
                    { name: "articlesOfAssociation", label: "Articles of Association" },
                    { name: "formINC1", label: "Form INC-1 (Name Reservation)" },
                    { name: "formINC2", label: "Form INC-2 (One Person Company)" },
                    { name: "formINC3", label: "Form INC-3 (Change in Promoters)" },
                    { name: "formINC7", label: "Form INC-7 (Incorporation)" },
                    { name: "formINC9", label: "Form INC-9 (Affidavit)" },
                    { name: "formINC22", label: "Form INC-22 (Registered Office)" },
                    { name: "formDIR2", label: "Form DIR-2 (Consent to Act as Director)" }
                ].map(({ name, label }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                            type="file"
                            name={name}
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept=".pdf,.doc,.docx"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            case 5: return renderStep5();
            default: return renderStep1();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Incorporation</h1>
                        <p className="text-gray-600">Register your company with the Registrar of Companies</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 5</span>
                            <span className="text-sm text-gray-500">{Math.round((currentStep / 5) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step Content */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderStepContent()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-6 py-2 rounded-md ${
                                    currentStep === 1
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-600 text-white hover:bg-gray-700"
                                }`}
                            >
                                Previous
                            </button>

                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Back to Services */}
                    <div className="mt-8 pt-6 border-t">
                        <button
                            onClick={() => navigate("/practice/roc-filing")}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to ROC Filing Services
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Incorporation;
