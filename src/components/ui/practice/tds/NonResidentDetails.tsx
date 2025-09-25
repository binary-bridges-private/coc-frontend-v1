import React, { useState, useEffect } from 'react';

interface NonResidentData {
    // Non-Resident Personal Details
    deducteePAN: string;
    deducteeName: string;
    deducteeAddress: string;
    deducteeCountry: string;
    deducteeCity: string;
    deducteeState: string;
    deducteePincode: string;
    deducteeMobile: string;
    deducteeEmail: string;
    deducteeDOB: string;
    deducteeGender: string;
    deducteeFatherName: string;
    
    // Tax Treaty Details
    taxTreatyCountry: string;
    taxTreatyArticle: string;
    taxTreatyRate: string;
    taxTreatyCertificateNumber: string;
    taxTreatyCertificateDate: string;
    
    // Payment Details
    paymentDate: string;
    paymentAmount: string;
    paymentCurrency: string;
    exchangeRate: string;
    paymentAmountINR: string;
    natureOfPayment: string;
    sectionCode: string;
    
    // Tax Details
    taxDeducted: string;
    surcharge: string;
    healthAndEducationCess: string;
    totalTaxDeducted: string;
    taxDeposited: string;
    depositDate: string;
    challanNumber: string;
    
    // Assessment Details
    assessmentYear: string;
    quarter: string;
    tdsCertificateNumber: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: NonResidentData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const NonResidentDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [nonResidentData, setNonResidentData] = useState<NonResidentData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setNonResidentData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: NonResidentData = {
            // Non-Resident Personal Details
            deducteePAN: '',
            deducteeName: '',
            deducteeAddress: '',
            deducteeCountry: '',
            deducteeCity: '',
            deducteeState: '',
            deducteePincode: '',
            deducteeMobile: '',
            deducteeEmail: '',
            deducteeDOB: '',
            deducteeGender: '',
            deducteeFatherName: '',
            
            // Tax Treaty Details
            taxTreatyCountry: '',
            taxTreatyArticle: '',
            taxTreatyRate: '',
            taxTreatyCertificateNumber: '',
            taxTreatyCertificateDate: '',
            
            // Payment Details
            paymentDate: new Date().toISOString().split('T')[0],
            paymentAmount: '',
            paymentCurrency: 'USD',
            exchangeRate: '',
            paymentAmountINR: '',
            natureOfPayment: '',
            sectionCode: '',
            
            // Tax Details
            taxDeducted: '',
            surcharge: '',
            healthAndEducationCess: '',
            totalTaxDeducted: '',
            taxDeposited: '',
            depositDate: new Date().toISOString().split('T')[0],
            challanNumber: '',
            
            // Assessment Details
            assessmentYear: period?.financialYear || '',
            quarter: period?.quarter || '',
            tdsCertificateNumber: `TDS-NR-${Date.now()}`
        };
        setNonResidentData([...nonResidentData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = nonResidentData.filter((_, i) => i !== index);
        setNonResidentData(newData);
        updateFormState('nonResidents', newData);
    };

    const updateRow = (index: number, field: keyof NonResidentData, value: any) => {
        const newData = [...nonResidentData];
        newData[index] = { ...newData[index], [field]: value };
        setNonResidentData(newData);
        updateFormState('nonResidents', newData);
    };

    const validateRow = (index: number) => {
        const row = nonResidentData[index];
        const rowErrors: Record<string, string> = {};

        // Personal Details validation
        if (!row.deducteePAN.trim()) rowErrors.deducteePAN = 'Deductee PAN is required';
        if (!row.deducteeName.trim()) rowErrors.deducteeName = 'Deductee Name is required';
        if (!row.deducteeAddress.trim()) rowErrors.deducteeAddress = 'Deductee Address is required';
        if (!row.deducteeCountry.trim()) rowErrors.deducteeCountry = 'Deductee Country is required';
        if (!row.deducteeDOB.trim()) rowErrors.deducteeDOB = 'Deductee DOB is required';
        if (!row.deducteeGender.trim()) rowErrors.deducteeGender = 'Deductee Gender is required';
        
        // Payment Details validation
        if (!row.paymentDate.trim()) rowErrors.paymentDate = 'Payment Date is required';
        if (!row.paymentAmount.trim()) rowErrors.paymentAmount = 'Payment Amount is required';
        if (!row.natureOfPayment.trim()) rowErrors.natureOfPayment = 'Nature of Payment is required';
        if (!row.sectionCode.trim()) rowErrors.sectionCode = 'Section Code is required';
        
        // Tax validation
        if (!row.taxDeducted.trim()) rowErrors.taxDeducted = 'Tax Deducted is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        nonResidentData.forEach((_, index) => {
            const row = nonResidentData[index];
            const rowErrors: Record<string, string> = {};

            // Personal Details validation
            if (!row.deducteePAN.trim()) rowErrors.deducteePAN = 'Deductee PAN is required';
            if (!row.deducteeName.trim()) rowErrors.deducteeName = 'Deductee Name is required';
            if (!row.deducteeAddress.trim()) rowErrors.deducteeAddress = 'Deductee Address is required';
            if (!row.deducteeCountry.trim()) rowErrors.deducteeCountry = 'Deductee Country is required';
            if (!row.deducteeDOB.trim()) rowErrors.deducteeDOB = 'Deductee DOB is required';
            if (!row.deducteeGender.trim()) rowErrors.deducteeGender = 'Deductee Gender is required';
            
            // Payment Details validation
            if (!row.paymentDate.trim()) rowErrors.paymentDate = 'Payment Date is required';
            if (!row.paymentAmount.trim()) rowErrors.paymentAmount = 'Payment Amount is required';
            if (!row.natureOfPayment.trim()) rowErrors.natureOfPayment = 'Nature of Payment is required';
            if (!row.sectionCode.trim()) rowErrors.sectionCode = 'Section Code is required';
            
            // Tax validation
            if (!row.taxDeducted.trim()) rowErrors.taxDeducted = 'Tax Deducted is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('nonResidents', nonResidentData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Non-Resident Details</h2>
                <p className="text-gray-600">Details of non-resident individuals for TDS</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Non-Resident
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TDS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remittance</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {nonResidentData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.deducteePan}
                                        onChange={(e) => updateRow(index, 'deducteePan', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteePan ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                    />
                                    {errors[index]?.deducteePan && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteePan}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.deducteeName}
                                        onChange={(e) => updateRow(index, 'deducteeName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Deductee Name"
                                    />
                                    {errors[index]?.deducteeName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteeName}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={row.deducteeCountry}
                                        onChange={(e) => updateRow(index, 'deducteeCountry', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeCountry ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                        <option value="AU">Australia</option>
                                        <option value="DE">Germany</option>
                                        <option value="FR">France</option>
                                        <option value="JP">Japan</option>
                                        <option value="SG">Singapore</option>
                                        <option value="AE">UAE</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    {errors[index]?.deducteeCountry && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteeCountry}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.deducteeDesignation}
                                        onChange={(e) => updateRow(index, 'deducteeDesignation', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeDesignation ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Designation"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.deducteeSalary}
                                        onChange={(e) => updateRow(index, 'deducteeSalary', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeSalary ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.deducteeSalary && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteeSalary}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.deducteeTaxRate}
                                        onChange={(e) => updateRow(index, 'deducteeTaxRate', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeTaxRate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                    />
                                    {errors[index]?.deducteeTaxRate && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteeTaxRate}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.deducteeTds}
                                        onChange={(e) => updateRow(index, 'deducteeTds', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeTds ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.deducteeRemittanceAmount}
                                        onChange={(e) => updateRow(index, 'deducteeRemittanceAmount', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeRemittanceAmount ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.deducteeRemittanceAmount && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteeRemittanceAmount}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {!viewMode && (
                                        <button
                                            onClick={() => removeRow(index)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {nonResidentData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No non-residents added yet. Click "Add New Non-Resident" to get started.
                </div>
            )}

            <div className="mt-6 flex justify-between">
                <button
                    onClick={() => setOpen(0)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Back
                </button>
                {!viewMode && (
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Save & Continue
                    </button>
                )}
            </div>
        </div>
    );
};

export default NonResidentDetails;
