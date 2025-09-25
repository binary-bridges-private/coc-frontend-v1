import React, { useState, useEffect } from 'react';

interface CertificateData {
    // Deductor Details (TDS Certificate Issuer)
    deductorTAN: string;
    deductorName: string;
    deductorAddress: string;
    deductorCity: string;
    deductorState: string;
    deductorPincode: string;
    
    // Deductee Details (TDS Certificate Recipient)
    deducteePAN: string;
    deducteeName: string;
    deducteeAddress: string;
    deducteeCity: string;
    deducteeState: string;
    deducteePincode: string;
    
    // Payment Details
    paymentDate: string;
    paymentAmount: string;
    natureOfPayment: string;
    sectionCode: string;
    
    // Tax Details
    taxDeducted: string;
    taxDeposited: string;
    depositDate: string;
    challanNumber: string;
    bankName: string;
    
    // Certificate Details
    certificateNumber: string;
    certificateDate: string;
    assessmentYear: string;
    quarter: string;
    
    // Additional Details
    remarks: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: CertificateData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const CertificateDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [certificateData, setCertificateData] = useState<CertificateData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setCertificateData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: CertificateData = {
            // Deductor Details
            deductorTAN: '',
            deductorName: '',
            deductorAddress: '',
            deductorCity: '',
            deductorState: '',
            deductorPincode: '',
            
            // Deductee Details
            deducteePAN: '',
            deducteeName: '',
            deducteeAddress: '',
            deducteeCity: '',
            deducteeState: '',
            deducteePincode: '',
            
            // Payment Details
            paymentDate: new Date().toISOString().split('T')[0],
            paymentAmount: '',
            natureOfPayment: '',
            sectionCode: '',
            
            // Tax Details
            taxDeducted: '',
            taxDeposited: '',
            depositDate: new Date().toISOString().split('T')[0],
            challanNumber: '',
            bankName: '',
            
            // Certificate Details
            certificateNumber: `CERT-${Date.now()}`,
            certificateDate: new Date().toISOString().split('T')[0],
            assessmentYear: period?.financialYear || '',
            quarter: period?.quarter || '',
            
            // Additional Details
            remarks: ''
        };
        setCertificateData([...certificateData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = certificateData.filter((_, i) => i !== index);
        setCertificateData(newData);
        updateFormState('certificates', newData);
    };

    const updateRow = (index: number, field: keyof CertificateData, value: any) => {
        const newData = [...certificateData];
        newData[index] = { ...newData[index], [field]: value };
        setCertificateData(newData);
        updateFormState('certificates', newData);
    };

    const validateRow = (index: number) => {
        const row = certificateData[index];
        const rowErrors: Record<string, string> = {};

        // Deductor validation
        if (!row.deductorTAN.trim()) rowErrors.deductorTAN = 'Deductor TAN is required';
        if (!row.deductorName.trim()) rowErrors.deductorName = 'Deductor Name is required';
        if (!row.deductorAddress.trim()) rowErrors.deductorAddress = 'Deductor Address is required';
        
        // Deductee validation
        if (!row.deducteePAN.trim()) rowErrors.deducteePAN = 'Deductee PAN is required';
        if (!row.deducteeName.trim()) rowErrors.deducteeName = 'Deductee Name is required';
        if (!row.deducteeAddress.trim()) rowErrors.deducteeAddress = 'Deductee Address is required';
        
        // Payment validation
        if (!row.paymentDate.trim()) rowErrors.paymentDate = 'Payment Date is required';
        if (!row.paymentAmount.trim()) rowErrors.paymentAmount = 'Payment Amount is required';
        if (!row.natureOfPayment.trim()) rowErrors.natureOfPayment = 'Nature of Payment is required';
        if (!row.sectionCode.trim()) rowErrors.sectionCode = 'Section Code is required';
        
        // Tax validation
        if (!row.taxDeducted.trim()) rowErrors.taxDeducted = 'Tax Deducted is required';
        if (!row.taxDeposited.trim()) rowErrors.taxDeposited = 'Tax Deposited is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        certificateData.forEach((_, index) => {
            const row = certificateData[index];
            const rowErrors: Record<string, string> = {};

            // Deductor validation
            if (!row.deductorTAN.trim()) rowErrors.deductorTAN = 'Deductor TAN is required';
            if (!row.deductorName.trim()) rowErrors.deductorName = 'Deductor Name is required';
            if (!row.deductorAddress.trim()) rowErrors.deductorAddress = 'Deductor Address is required';
            
            // Deductee validation
            if (!row.deducteePAN.trim()) rowErrors.deducteePAN = 'Deductee PAN is required';
            if (!row.deducteeName.trim()) rowErrors.deducteeName = 'Deductee Name is required';
            if (!row.deducteeAddress.trim()) rowErrors.deducteeAddress = 'Deductee Address is required';
            
            // Payment validation
            if (!row.paymentDate.trim()) rowErrors.paymentDate = 'Payment Date is required';
            if (!row.paymentAmount.trim()) rowErrors.paymentAmount = 'Payment Amount is required';
            if (!row.natureOfPayment.trim()) rowErrors.natureOfPayment = 'Nature of Payment is required';
            if (!row.sectionCode.trim()) rowErrors.sectionCode = 'Section Code is required';
            
            // Tax validation
            if (!row.taxDeducted.trim()) rowErrors.taxDeducted = 'Tax Deducted is required';
            if (!row.taxDeposited.trim()) rowErrors.taxDeposited = 'Tax Deposited is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('certificates', certificateData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate Details</h2>
                <p className="text-gray-600">Details for TDS certificates (Form 16A)</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Certificate
                </button>
            </div>

            <div className="space-y-6">
                {certificateData.map((row, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Certificate #{index + 1}</h3>
                            {!viewMode && (
                                <button
                                    onClick={() => removeRow(index)}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Deductor Details */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-700 border-b pb-2">Deductor Details (TDS Certificate Issuer)</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">TAN *</label>
                                    <input
                                        type="text"
                                        value={row.deductorTAN}
                                        onChange={(e) => updateRow(index, 'deductorTAN', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deductorTAN ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="ABCD12345E"
                                        maxLength={10}
                                    />
                                    {errors[index]?.deductorTAN && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deductorTAN}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        value={row.deductorName}
                                        onChange={(e) => updateRow(index, 'deductorName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deductorName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Deductor Name"
                                    />
                                    {errors[index]?.deductorName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deductorName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <textarea
                                        value={row.deductorAddress}
                                        onChange={(e) => updateRow(index, 'deductorAddress', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deductorAddress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Deductor Address"
                                        rows={2}
                                    />
                                    {errors[index]?.deductorAddress && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deductorAddress}</p>
                                    )}
                                </div>
                            </div>

                            {/* Deductee Details */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-700 border-b pb-2">Deductee Details (TDS Certificate Recipient)</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN *</label>
                                    <input
                                        type="text"
                                        value={row.deducteePAN}
                                        onChange={(e) => updateRow(index, 'deducteePAN', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteePAN ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                    />
                                    {errors[index]?.deducteePAN && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteePAN}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
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
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <textarea
                                        value={row.deducteeAddress}
                                        onChange={(e) => updateRow(index, 'deducteeAddress', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.deducteeAddress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Deductee Address"
                                        rows={2}
                                    />
                                    {errors[index]?.deducteeAddress && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].deducteeAddress}</p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-700 border-b pb-2">Payment Details</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                                    <input
                                        type="date"
                                        value={row.paymentDate}
                                        onChange={(e) => updateRow(index, 'paymentDate', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.paymentDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors[index]?.paymentDate && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].paymentDate}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount *</label>
                                    <input
                                        type="number"
                                        value={row.paymentAmount}
                                        onChange={(e) => updateRow(index, 'paymentAmount', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.paymentAmount ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.paymentAmount && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].paymentAmount}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nature of Payment *</label>
                                    <select
                                        value={row.natureOfPayment}
                                        onChange={(e) => updateRow(index, 'natureOfPayment', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.natureOfPayment ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Nature of Payment</option>
                                        <option value="Interest">Interest</option>
                                        <option value="Commission">Commission</option>
                                        <option value="Professional Fees">Professional Fees</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Contractor">Contractor</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors[index]?.natureOfPayment && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].natureOfPayment}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Section Code *</label>
                                    <input
                                        type="text"
                                        value={row.sectionCode}
                                        onChange={(e) => updateRow(index, 'sectionCode', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.sectionCode ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="e.g., 194A, 194C, 194J"
                                    />
                                    {errors[index]?.sectionCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].sectionCode}</p>
                                    )}
                                </div>
                            </div>

                            {/* Tax Details */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-700 border-b pb-2">Tax Details</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Deducted *</label>
                                    <input
                                        type="number"
                                        value={row.taxDeducted}
                                        onChange={(e) => updateRow(index, 'taxDeducted', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.taxDeducted ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.taxDeducted && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].taxDeducted}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tax Deposited *</label>
                                    <input
                                        type="number"
                                        value={row.taxDeposited}
                                        onChange={(e) => updateRow(index, 'taxDeposited', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.taxDeposited ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.taxDeposited && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].taxDeposited}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Date</label>
                                    <input
                                        type="date"
                                        value={row.depositDate}
                                        onChange={(e) => updateRow(index, 'depositDate', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Challan Number</label>
                                    <input
                                        type="text"
                                        value={row.challanNumber}
                                        onChange={(e) => updateRow(index, 'challanNumber', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Challan Number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        value={row.bankName}
                                        onChange={(e) => updateRow(index, 'bankName', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Bank Name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {certificateData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No certificates added yet. Click "Add New Certificate" to get started.
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

export default CertificateDetails;
