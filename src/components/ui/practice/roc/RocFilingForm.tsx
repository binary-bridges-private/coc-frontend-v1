import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RocFilingFormData {
    // Basic Details
    companyName: string;
    cin: string;
    financialYear: string;
    filingType: string;
    dueDate: string;
    
    // Form Details
    formType: string;
    formNumber: string;
    formDescription: string;
    
    // Filing Period
    fromDate: string;
    toDate: string;
    
    // Fee Details
    normalFee: string;
    additionalFee: string;
    totalFee: string;
    
    // Documents
    requiredDocuments: Array<{
        name: string;
        uploaded: boolean;
        file: File | null;
    }>;
    
    // Additional Information
    remarks: string;
    authorizedSignatory: string;
    designation: string;
    date: string;
}

const RocFilingForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RocFilingFormData>({
        companyName: "",
        cin: "",
        financialYear: "",
        filingType: "",
        dueDate: "",
        formType: "",
        formNumber: "",
        formDescription: "",
        fromDate: "",
        toDate: "",
        normalFee: "",
        additionalFee: "",
        totalFee: "",
        requiredDocuments: [
            { name: "Annual Return", uploaded: false, file: null },
            { name: "Balance Sheet", uploaded: false, file: null },
            { name: "Profit & Loss Account", uploaded: false, file: null },
            { name: "Auditor's Report", uploaded: false, file: null },
            { name: "Board Resolution", uploaded: false, file: null },
            { name: "Digital Signature Certificate", uploaded: false, file: null }
        ],
        remarks: "",
        authorizedSignatory: "",
        designation: "",
        date: new Date().toISOString().split('T')[0]
    });

    const filingTypes = [
        "Annual Filing",
        "Event-based Filing",
        "Compliance Filing",
        "Amendment Filing"
    ];

    const formTypes = [
        "MGT-7 (Annual Return)",
        "AOC-4 (Financial Statement)",
        "ADT-1 (Appointment of Auditor)",
        "MR-1 (Return of Allotment)",
        "MR-2 (Return of Allotment)",
        "SH-7 (Notice of Increase in Share Capital)",
        "PAS-3 (Return of Allotment)",
        "CHG-1 (Charge Creation)",
        "CHG-4 (Charge Satisfaction)",
        "CHG-6 (Charge Modification)"
    ];

    const financialYears = [
        "2023-24",
        "2022-23",
        "2021-22",
        "2020-21",
        "2019-20"
    ];

    const validateField = (name: string, value: any): string => {
        switch (name) {
            case "cin":
                return !/^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/.test(value) ? "Invalid CIN format" : "";
            case "companyName":
                return value.length < 3 ? "Company name must be at least 3 characters" : "";
            case "normalFee":
            case "additionalFee":
            case "totalFee":
                return !/^\d+(\.\d{2})?$/.test(value) ? "Invalid fee amount" : "";
            case "fromDate":
            case "toDate":
            case "dueDate":
                return !value ? "Date is required" : "";
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

        // Auto-calculate total fee
        if (name === "normalFee" || name === "additionalFee") {
            const normal = parseFloat(name === "normalFee" ? value : prev.normalFee) || 0;
            const additional = parseFloat(name === "additionalFee" ? value : prev.additionalFee) || 0;
            setFormData(prev => ({
                ...prev,
                totalFee: (normal + additional).toFixed(2)
            }));
        }
    };

    const handleDocumentUpload = (index: number, file: File | null) => {
        setFormData(prev => ({
            ...prev,
            requiredDocuments: prev.requiredDocuments.map((doc, i) => 
                i === index ? { ...doc, file, uploaded: !!file } : doc
            )
        }));
    };

    const nextStep = () => {
        if (currentStep < 4) {
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
        console.log("ROC Filing Form Data:", formData);
        alert("ROC Filing form submitted successfully!");
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Company Information</h3>
            
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
                <label className="block text-sm font-medium text-gray-700">CIN (Corporate Identity Number) *</label>
                <input
                    type="text"
                    name="cin"
                    value={formData.cin}
                    onChange={handleInputChange}
                    placeholder="e.g., L12345AB1234ABC123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <p className="text-sm text-gray-500 mt-1">Format: 1 Letter + 5 Digits + 2 Letters + 4 Digits + 3 Letters + 6 Digits</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Financial Year *</label>
                    <select
                        name="financialYear"
                        value={formData.financialYear}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Financial Year</option>
                        {financialYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Filing Type *</label>
                    <select
                        name="filingType"
                        value={formData.filingType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Filing Type</option>
                        {filingTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Form Details</h3>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Form Type *</label>
                <select
                    name="formType"
                    value={formData.formType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Form Type</option>
                    {formTypes.map(form => (
                        <option key={form} value={form}>{form}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Form Number</label>
                <input
                    type="text"
                    name="formNumber"
                    value={formData.formNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Form Description</label>
                <textarea
                    name="formDescription"
                    value={formData.formDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">From Date *</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">To Date *</label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Due Date *</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Fee Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Normal Fee (₹) *</label>
                    <input
                        type="number"
                        step="0.01"
                        name="normalFee"
                        value={formData.normalFee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Fee (₹)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="additionalFee"
                        value={formData.additionalFee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Total Fee (₹)</label>
                    <input
                        type="text"
                        name="totalFee"
                        value={formData.totalFee}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Fee Structure</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Normal filing fee as per Companies Act, 2013</li>
                    <li>• Additional fee for late filing (₹100 per day)</li>
                    <li>• Penalty for non-compliance (as applicable)</li>
                    <li>• Service charges may apply</li>
                </ul>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Document Upload</h3>
            <p className="text-sm text-gray-600">Please upload all required documents:</p>

            <div className="space-y-4">
                {formData.requiredDocuments.map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-700">{doc.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                                doc.uploaded 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                            }`}>
                                {doc.uploaded ? "Uploaded" : "Pending"}
                            </span>
                        </div>
                        <input
                            type="file"
                            onChange={(e) => handleDocumentUpload(index, e.target.files?.[0] || null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Authorized Signatory *</label>
                    <input
                        type="text"
                        name="authorizedSignatory"
                        value={formData.authorizedSignatory}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Designation *</label>
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            default: return renderStep1();
        }
    };

    const uploadedDocsCount = formData.requiredDocuments.filter(doc => doc.uploaded).length;
    const totalDocsCount = formData.requiredDocuments.length;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">ROC Filing</h1>
                        <p className="text-gray-600">Submit your company compliance filings with the Registrar of Companies</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
                            <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 4) * 100}%` }}
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

                            {currentStep < 4 ? (
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
                                    Submit Filing
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Document Upload Status */}
                    {currentStep === 4 && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">
                                    Documents Uploaded: {uploadedDocsCount}/{totalDocsCount}
                                </span>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(uploadedDocsCount / totalDocsCount) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}

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

export default RocFilingForm;
