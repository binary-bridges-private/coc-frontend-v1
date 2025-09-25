import React, { useState, useEffect } from 'react';

interface B2BData {
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
    formData?: B2BData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const B2b: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [b2bData, setB2bData] = useState<B2BData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setB2bData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: B2BData = {
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
        setB2bData([...b2bData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = b2bData.filter((_, i) => i !== index);
        setB2bData(newData);
        updateFormState('b2b', newData);
    };

    const updateRow = (index: number, field: keyof B2BData, value: any) => {
        const newData = [...b2bData];
        newData[index] = { ...newData[index], [field]: value };
        setB2bData(newData);
        updateFormState('b2b', newData);
    };

    const validateRow = (index: number) => {
        const row = b2bData[index];
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

        b2bData.forEach((_, index) => {
            const row = b2bData[index];
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
            updateFormState('b2b', b2bData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">B2B Invoices</h2>
                <p className="text-gray-600">Details of inward supplies from registered persons</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Invoice
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
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place of Supply</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reverse Charge</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {b2bData.map((row, index) => (
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
                                    <select
                                        value={row.placeOfSupply}
                                        onChange={(e) => updateRow(index, 'placeOfSupply', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.placeOfSupply ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select State</option>
                                        <option value="01">Jammu and Kashmir</option>
                                        <option value="02">Himachal Pradesh</option>
                                        <option value="03">Punjab</option>
                                        <option value="04">Chandigarh</option>
                                        <option value="05">Uttarakhand</option>
                                        <option value="06">Haryana</option>
                                        <option value="07">Delhi</option>
                                        <option value="08">Rajasthan</option>
                                        <option value="09">Uttar Pradesh</option>
                                        <option value="10">Bihar</option>
                                        <option value="11">Sikkim</option>
                                        <option value="12">Arunachal Pradesh</option>
                                        <option value="13">Nagaland</option>
                                        <option value="14">Manipur</option>
                                        <option value="15">Mizoram</option>
                                        <option value="16">Tripura</option>
                                        <option value="17">Meghalaya</option>
                                        <option value="18">Assam</option>
                                        <option value="19">West Bengal</option>
                                        <option value="20">Jharkhand</option>
                                        <option value="21">Odisha</option>
                                        <option value="22">Chhattisgarh</option>
                                        <option value="23">Madhya Pradesh</option>
                                        <option value="24">Gujarat</option>
                                        <option value="25">Daman and Diu</option>
                                        <option value="26">Dadra and Nagar Haveli</option>
                                        <option value="27">Maharashtra</option>
                                        <option value="28">Andhra Pradesh</option>
                                        <option value="29">Karnataka</option>
                                        <option value="30">Goa</option>
                                        <option value="31">Lakshadweep</option>
                                        <option value="32">Kerala</option>
                                        <option value="33">Tamil Nadu</option>
                                        <option value="34">Puducherry</option>
                                        <option value="35">Andaman and Nicobar Islands</option>
                                        <option value="36">Telangana</option>
                                        <option value="37">Andhra Pradesh</option>
                                        <option value="38">Ladakh</option>
                                    </select>
                                    {errors[index]?.placeOfSupply && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].placeOfSupply}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={row.reverseCharge}
                                        onChange={(e) => updateRow(index, 'reverseCharge', e.target.checked)}
                                        disabled={viewMode}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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

            {b2bData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No B2B invoices added yet. Click "Add New Invoice" to get started.
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

export default B2b;
