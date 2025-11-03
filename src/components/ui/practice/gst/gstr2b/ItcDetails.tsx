import React, { useState, useEffect } from 'react';

interface ITCData {
    // Supplier Details
    supplierGSTIN: string;
    supplierName: string;
    supplierAddress: string;
    supplierState: string;
    supplierPincode: string;
    
    // Invoice Details
    invoiceNumber: string;
    invoiceDate: string;
    invoiceValue: string;
    invoiceType: string; // Regular/SEZ/Export/Import
    documentType: string; // Invoice/Credit Note/Debit Note
    
    // Supply Details
    placeOfSupply: string;
    reverseCharge: boolean;
    ecommerceGSTIN: string;
    ecommerceOperatorName: string;
    
    // ITC Details
    itcEligible: string;
    itcAvailable: string;
    itcReversed: string;
    itcUtilized: string;
    itcBalance: string;
    itcIneligible: string;
    itcBlocked: string;
    
    // Taxable Values
    taxableValueCGST: string;
    taxableValueSGST: string;
    taxableValueIGST: string;
    taxableValueCess: string;
    totalTaxableValue: string;
    
    // Tax Amounts
    cgstRate: string;
    cgstAmount: string;
    sgstRate: string;
    sgstAmount: string;
    igstRate: string;
    igstAmount: string;
    cessRate: string;
    cessAmount: string;
    totalTaxAmount: string;
    
    // Additional Details
    hsnCode: string;
    itemDescription: string;
    quantity: string;
    unitOfMeasure: string;
    unitPrice: string;
    
    // Assessment Details
    financialYear: string;
    taxPeriod: string;
    returnPeriod: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: ITCData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const ItcDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [itcData, setItcData] = useState<ITCData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setItcData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: ITCData = {
            // Supplier Details
            supplierGSTIN: '',
            supplierName: '',
            supplierAddress: '',
            supplierState: '',
            supplierPincode: '',
            
            // Invoice Details
            invoiceNumber: '',
            invoiceDate: new Date().toISOString().split('T')[0],
            invoiceValue: '',
            invoiceType: 'Regular',
            documentType: 'Invoice',
            
            // Supply Details
            placeOfSupply: '',
            reverseCharge: false,
            ecommerceGSTIN: '',
            ecommerceOperatorName: '',
            
            // ITC Details
            itcEligible: '',
            itcAvailable: '',
            itcReversed: '',
            itcUtilized: '',
            itcBalance: '',
            itcIneligible: '',
            itcBlocked: '',
            
            // Taxable Values
            taxableValueCGST: '',
            taxableValueSGST: '',
            taxableValueIGST: '',
            taxableValueCess: '',
            totalTaxableValue: '',
            
            // Tax Amounts
            cgstRate: '',
            cgstAmount: '',
            sgstRate: '',
            sgstAmount: '',
            igstRate: '',
            igstAmount: '',
            cessRate: '',
            cessAmount: '',
            totalTaxAmount: '',
            
            // Additional Details
            hsnCode: '',
            itemDescription: '',
            quantity: '',
            unitOfMeasure: '',
            unitPrice: '',
            
            // Assessment Details
            financialYear: period?.financialYear || '',
            taxPeriod: period?.quarter || '',
            returnPeriod: period?.quarter || ''
        };
        setItcData([...itcData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = itcData.filter((_, i) => i !== index);
        setItcData(newData);
        updateFormState('itc', newData);
    };

    const updateRow = (index: number, field: keyof ITCData, value: any) => {
        const newData = [...itcData];
        newData[index] = { ...newData[index], [field]: value };
        setItcData(newData);
        updateFormState('itc', newData);
    };

    const validateRow = (index: number) => {
        const row = itcData[index];
        const rowErrors: Record<string, string> = {};

        // Supplier Details validation
        if (!row.supplierGSTIN.trim()) rowErrors.supplierGSTIN = 'Supplier GSTIN is required';
        if (!row.supplierName.trim()) rowErrors.supplierName = 'Supplier Name is required';
        if (!row.supplierAddress.trim()) rowErrors.supplierAddress = 'Supplier Address is required';
        
        // Invoice Details validation
        if (!row.invoiceNumber.trim()) rowErrors.invoiceNumber = 'Invoice Number is required';
        if (!row.invoiceDate.trim()) rowErrors.invoiceDate = 'Invoice Date is required';
        if (!row.invoiceValue.trim()) rowErrors.invoiceValue = 'Invoice Value is required';
        if (!row.invoiceType.trim()) rowErrors.invoiceType = 'Invoice Type is required';
        if (!row.documentType.trim()) rowErrors.documentType = 'Document Type is required';
        
        // Supply Details validation
        if (!row.placeOfSupply.trim()) rowErrors.placeOfSupply = 'Place of Supply is required';
        
        // ITC Details validation
        if (!row.itcEligible.trim()) rowErrors.itcEligible = 'ITC Eligible is required';
        if (!row.itcAvailable.trim()) rowErrors.itcAvailable = 'ITC Available is required';
        if (!row.itcUtilized.trim()) rowErrors.itcUtilized = 'ITC Utilized is required';
        
        // Taxable Values validation
        if (!row.totalTaxableValue.trim()) rowErrors.totalTaxableValue = 'Total Taxable Value is required';
        
        // Tax Amounts validation
        if (!row.totalTaxAmount.trim()) rowErrors.totalTaxAmount = 'Total Tax Amount is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        itcData.forEach((_, index) => {
            const row = itcData[index];
            const rowErrors: Record<string, string> = {};

            // Supplier Details validation
            if (!row.supplierGSTIN.trim()) rowErrors.supplierGSTIN = 'Supplier GSTIN is required';
            if (!row.supplierName.trim()) rowErrors.supplierName = 'Supplier Name is required';
            if (!row.supplierAddress.trim()) rowErrors.supplierAddress = 'Supplier Address is required';
            
            // Invoice Details validation
            if (!row.invoiceNumber.trim()) rowErrors.invoiceNumber = 'Invoice Number is required';
            if (!row.invoiceDate.trim()) rowErrors.invoiceDate = 'Invoice Date is required';
            if (!row.invoiceValue.trim()) rowErrors.invoiceValue = 'Invoice Value is required';
            if (!row.invoiceType.trim()) rowErrors.invoiceType = 'Invoice Type is required';
            if (!row.documentType.trim()) rowErrors.documentType = 'Document Type is required';
            
            // Supply Details validation
            if (!row.placeOfSupply.trim()) rowErrors.placeOfSupply = 'Place of Supply is required';
            
            // ITC Details validation
            if (!row.itcEligible.trim()) rowErrors.itcEligible = 'ITC Eligible is required';
            if (!row.itcAvailable.trim()) rowErrors.itcAvailable = 'ITC Available is required';
            if (!row.itcUtilized.trim()) rowErrors.itcUtilized = 'ITC Utilized is required';
            
            // Taxable Values validation
            if (!row.totalTaxableValue.trim()) rowErrors.totalTaxableValue = 'Total Taxable Value is required';
            
            // Tax Amounts validation
            if (!row.totalTaxAmount.trim()) rowErrors.totalTaxAmount = 'Total Tax Amount is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('itc', itcData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">ITC Details</h2>
                <p className="text-gray-600">Input Tax Credit details from auto-drafted returns</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New ITC Entry
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier GSTIN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Value</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITC Eligible</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITC Available</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITC Reversed</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ITC Utilized</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {itcData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.supplierGstin}
                                        onChange={(e) => updateRow(index, 'supplierGstin', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.supplierGstin ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="15-digit GSTIN"
                                    />
                                    {errors[index]?.supplierGstin && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].supplierGstin}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.supplierName}
                                        onChange={(e) => updateRow(index, 'supplierName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.supplierName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Supplier Name"
                                    />
                                    {errors[index]?.supplierName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].supplierName}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.invoiceNo}
                                        onChange={(e) => updateRow(index, 'invoiceNo', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.invoiceNo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Invoice Number"
                                    />
                                    {errors[index]?.invoiceNo && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].invoiceNo}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="date"
                                        value={row.invoiceDate}
                                        onChange={(e) => updateRow(index, 'invoiceDate', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.invoiceDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors[index]?.invoiceDate && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].invoiceDate}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.invoiceValue}
                                        onChange={(e) => updateRow(index, 'invoiceValue', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.invoiceValue ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.invoiceValue && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].invoiceValue}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.itcEligible}
                                        onChange={(e) => updateRow(index, 'itcEligible', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.itcEligible ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.itcEligible && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].itcEligible}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.itcAvailable}
                                        onChange={(e) => updateRow(index, 'itcAvailable', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.itcAvailable ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.itcAvailable && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].itcAvailable}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.itcReversed}
                                        onChange={(e) => updateRow(index, 'itcReversed', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.itcReversed ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.itcUtilized}
                                        onChange={(e) => updateRow(index, 'itcUtilized', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.itcUtilized ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
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

            {itcData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No ITC entries added yet. Click "Add New ITC Entry" to get started.
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

export default ItcDetails;
