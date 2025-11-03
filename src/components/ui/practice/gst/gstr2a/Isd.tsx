import React, { useState, useEffect } from 'react';

interface ISDData {
    supplierGstin: string;
    supplierName: string;
    documentNo: string;
    documentDate: string;
    documentType: string;
    documentValue: string;
    placeOfSupply: string;
    taxableValue: Record<string, string>;
    cessValues: Record<string, string>;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: ISDData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const Isd: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [isdData, setIsdData] = useState<ISDData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setIsdData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: ISDData = {
            supplierGstin: '',
            supplierName: '',
            documentNo: '',
            documentDate: '',
            documentType: '',
            documentValue: '',
            placeOfSupply: '',
            taxableValue: {},
            cessValues: {}
        };
        setIsdData([...isdData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = isdData.filter((_, i) => i !== index);
        setIsdData(newData);
        updateFormState('isd', newData);
    };

    const updateRow = (index: number, field: keyof ISDData, value: any) => {
        const newData = [...isdData];
        newData[index] = { ...newData[index], [field]: value };
        setIsdData(newData);
        updateFormState('isd', newData);
    };

    const validateRow = (index: number) => {
        const row = isdData[index];
        const rowErrors: Record<string, string> = {};

        if (!row.supplierGstin.trim()) rowErrors.supplierGstin = 'Supplier GSTIN is required';
        if (!row.supplierName.trim()) rowErrors.supplierName = 'Supplier Name is required';
        if (!row.documentNo.trim()) rowErrors.documentNo = 'Document No is required';
        if (!row.documentDate.trim()) rowErrors.documentDate = 'Document Date is required';
        if (!row.documentType.trim()) rowErrors.documentType = 'Document Type is required';
        if (!row.documentValue.trim()) rowErrors.documentValue = 'Document Value is required';
        if (!row.placeOfSupply.trim()) rowErrors.placeOfSupply = 'Place of Supply is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        isdData.forEach((_, index) => {
            const row = isdData[index];
            const rowErrors: Record<string, string> = {};

            if (!row.supplierGstin.trim()) rowErrors.supplierGstin = 'Supplier GSTIN is required';
            if (!row.supplierName.trim()) rowErrors.supplierName = 'Supplier Name is required';
            if (!row.documentNo.trim()) rowErrors.documentNo = 'Document No is required';
            if (!row.documentDate.trim()) rowErrors.documentDate = 'Document Date is required';
            if (!row.documentType.trim()) rowErrors.documentType = 'Document Type is required';
            if (!row.documentValue.trim()) rowErrors.documentValue = 'Document Value is required';
            if (!row.placeOfSupply.trim()) rowErrors.placeOfSupply = 'Place of Supply is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('isd', isdData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">ISD Invoices</h2>
                <p className="text-gray-600">Details of input service distributor invoices</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Document
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier GSTIN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document No</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Value</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Place of Supply</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isdData.map((row, index) => (
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
                                        value={row.documentNo}
                                        onChange={(e) => updateRow(index, 'documentNo', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.documentNo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Document Number"
                                    />
                                    {errors[index]?.documentNo && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].documentNo}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="date"
                                        value={row.documentDate}
                                        onChange={(e) => updateRow(index, 'documentDate', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.documentDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors[index]?.documentDate && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].documentDate}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={row.documentType}
                                        onChange={(e) => updateRow(index, 'documentType', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.documentType ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="I">Invoice</option>
                                        <option value="C">Credit Note</option>
                                        <option value="D">Debit Note</option>
                                    </select>
                                    {errors[index]?.documentType && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].documentType}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.documentValue}
                                        onChange={(e) => updateRow(index, 'documentValue', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.documentValue ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.documentValue && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].documentValue}</p>
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

            {isdData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No ISD documents added yet. Click "Add New Document" to get started.
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

export default Isd;
