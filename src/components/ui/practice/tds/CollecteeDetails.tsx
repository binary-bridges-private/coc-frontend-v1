import React, { useState, useEffect } from 'react';

interface CollecteeData {
    // Collectee Personal Details
    collecteePAN: string;
    collecteeName: string;
    collecteeAddress: string;
    collecteeCity: string;
    collecteeState: string;
    collecteePincode: string;
    collecteeMobile: string;
    collecteeEmail: string;
    collecteeDOB: string;
    collecteeGender: string;
    collecteeFatherName: string;
    
    // Business Details
    businessType: string;
    businessCategory: string;
    businessRegistrationNumber: string;
    businessRegistrationDate: string;
    
    // Goods/Services Details
    goodsDescription: string;
    goodsCategory: string;
    goodsHSNCode: string;
    goodsQuantity: string;
    goodsUnit: string;
    goodsValue: string;
    
    // Collection Details
    collectionDate: string;
    collectionAmount: string;
    collectionMode: string;
    collectionReference: string;
    
    // TCS Details
    tcsRate: string;
    tcsAmount: string;
    surcharge: string;
    healthAndEducationCess: string;
    totalTCSAmount: string;
    tcsDeposited: string;
    depositDate: string;
    challanNumber: string;
    
    // Assessment Details
    assessmentYear: string;
    quarter: string;
    tcsCertificateNumber: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: CollecteeData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const CollecteeDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [collecteeData, setCollecteeData] = useState<CollecteeData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setCollecteeData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: CollecteeData = {
            // Collectee Personal Details
            collecteePAN: '',
            collecteeName: '',
            collecteeAddress: '',
            collecteeCity: '',
            collecteeState: '',
            collecteePincode: '',
            collecteeMobile: '',
            collecteeEmail: '',
            collecteeDOB: '',
            collecteeGender: '',
            collecteeFatherName: '',
            
            // Business Details
            businessType: '',
            businessCategory: '',
            businessRegistrationNumber: '',
            businessRegistrationDate: '',
            
            // Goods/Services Details
            goodsDescription: '',
            goodsCategory: '',
            goodsHSNCode: '',
            goodsQuantity: '',
            goodsUnit: '',
            goodsValue: '',
            
            // Collection Details
            collectionDate: new Date().toISOString().split('T')[0],
            collectionAmount: '',
            collectionMode: '',
            collectionReference: '',
            
            // TCS Details
            tcsRate: '',
            tcsAmount: '',
            surcharge: '',
            healthAndEducationCess: '',
            totalTCSAmount: '',
            tcsDeposited: '',
            depositDate: new Date().toISOString().split('T')[0],
            challanNumber: '',
            
            // Assessment Details
            assessmentYear: period?.financialYear || '',
            quarter: period?.quarter || '',
            tcsCertificateNumber: `TCS-${Date.now()}`
        };
        setCollecteeData([...collecteeData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = collecteeData.filter((_, i) => i !== index);
        setCollecteeData(newData);
        updateFormState('collectees', newData);
    };

    const updateRow = (index: number, field: keyof CollecteeData, value: any) => {
        const newData = [...collecteeData];
        newData[index] = { ...newData[index], [field]: value };
        setCollecteeData(newData);
        updateFormState('collectees', newData);
    };

    const validateRow = (index: number) => {
        const row = collecteeData[index];
        const rowErrors: Record<string, string> = {};

        // Personal Details validation
        if (!row.collecteePAN.trim()) rowErrors.collecteePAN = 'Collectee PAN is required';
        if (!row.collecteeName.trim()) rowErrors.collecteeName = 'Collectee Name is required';
        if (!row.collecteeAddress.trim()) rowErrors.collecteeAddress = 'Collectee Address is required';
        if (!row.collecteeDOB.trim()) rowErrors.collecteeDOB = 'Collectee DOB is required';
        if (!row.collecteeGender.trim()) rowErrors.collecteeGender = 'Collectee Gender is required';
        
        // Goods/Services validation
        if (!row.goodsDescription.trim()) rowErrors.goodsDescription = 'Goods Description is required';
        if (!row.goodsValue.trim()) rowErrors.goodsValue = 'Goods Value is required';
        
        // Collection validation
        if (!row.collectionDate.trim()) rowErrors.collectionDate = 'Collection Date is required';
        if (!row.collectionAmount.trim()) rowErrors.collectionAmount = 'Collection Amount is required';
        
        // TCS validation
        if (!row.tcsRate.trim()) rowErrors.tcsRate = 'TCS Rate is required';
        if (!row.tcsAmount.trim()) rowErrors.tcsAmount = 'TCS Amount is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        collecteeData.forEach((_, index) => {
            const row = collecteeData[index];
            const rowErrors: Record<string, string> = {};

            // Personal Details validation
            if (!row.collecteePAN.trim()) rowErrors.collecteePAN = 'Collectee PAN is required';
            if (!row.collecteeName.trim()) rowErrors.collecteeName = 'Collectee Name is required';
            if (!row.collecteeAddress.trim()) rowErrors.collecteeAddress = 'Collectee Address is required';
            if (!row.collecteeDOB.trim()) rowErrors.collecteeDOB = 'Collectee DOB is required';
            if (!row.collecteeGender.trim()) rowErrors.collecteeGender = 'Collectee Gender is required';
            
            // Goods/Services validation
            if (!row.goodsDescription.trim()) rowErrors.goodsDescription = 'Goods Description is required';
            if (!row.goodsValue.trim()) rowErrors.goodsValue = 'Goods Value is required';
            
            // Collection validation
            if (!row.collectionDate.trim()) rowErrors.collectionDate = 'Collection Date is required';
            if (!row.collectionAmount.trim()) rowErrors.collectionAmount = 'Collection Amount is required';
            
            // TCS validation
            if (!row.tcsRate.trim()) rowErrors.tcsRate = 'TCS Rate is required';
            if (!row.tcsAmount.trim()) rowErrors.tcsAmount = 'TCS Amount is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('collectees', collecteeData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Collectee Details</h2>
                <p className="text-gray-600">Details of collectees for TCS</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Collectee
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TCS Rate</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TCS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {collecteeData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.collecteePan}
                                        onChange={(e) => updateRow(index, 'collecteePan', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteePan ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                    />
                                    {errors[index]?.collecteePan && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].collecteePan}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.collecteeName}
                                        onChange={(e) => updateRow(index, 'collecteeName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteeName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Collectee Name"
                                    />
                                    {errors[index]?.collecteeName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].collecteeName}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={row.collecteeState}
                                        onChange={(e) => updateRow(index, 'collecteeState', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteeState ? 'border-red-500' : 'border-gray-300'
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
                                    {errors[index]?.collecteeState && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].collecteeState}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.collecteeAmount}
                                        onChange={(e) => updateRow(index, 'collecteeAmount', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteeAmount ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.collecteeAmount && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].collecteeAmount}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.collecteeTcsRate}
                                        onChange={(e) => updateRow(index, 'collecteeTcsRate', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteeTcsRate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                    />
                                    {errors[index]?.collecteeTcsRate && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].collecteeTcsRate}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.collecteeTcs}
                                        onChange={(e) => updateRow(index, 'collecteeTcs', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteeTcs ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="date"
                                        value={row.collecteeCollectionDate}
                                        onChange={(e) => updateRow(index, 'collecteeCollectionDate', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.collecteeCollectionDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors[index]?.collecteeCollectionDate && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].collecteeCollectionDate}</p>
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

            {collecteeData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No collectees added yet. Click "Add New Collectee" to get started.
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

export default CollecteeDetails;
