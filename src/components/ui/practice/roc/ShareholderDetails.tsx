import React, { useState, useEffect } from 'react';

interface ShareholderData {
    shareholderPan: string;
    shareholderName: string;
    shareholderAddress: string;
    shareholderState: string;
    shareholderPincode: string;
    shareholderMobile: string;
    shareholderEmail: string;
    shareholderDob: string;
    shareholderGender: string;
    shareholderFatherName: string;
    shareholderShares: string;
    shareholderPercentage: string;
    shareholderValue: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: ShareholderData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const ShareholderDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [shareholderData, setShareholderData] = useState<ShareholderData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setShareholderData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: ShareholderData = {
            shareholderPan: '',
            shareholderName: '',
            shareholderAddress: '',
            shareholderState: '',
            shareholderPincode: '',
            shareholderMobile: '',
            shareholderEmail: '',
            shareholderDob: '',
            shareholderGender: '',
            shareholderFatherName: '',
            shareholderShares: '',
            shareholderPercentage: '',
            shareholderValue: ''
        };
        setShareholderData([...shareholderData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = shareholderData.filter((_, i) => i !== index);
        setShareholderData(newData);
        updateFormState('shareholders', newData);
    };

    const updateRow = (index: number, field: keyof ShareholderData, value: any) => {
        const newData = [...shareholderData];
        newData[index] = { ...newData[index], [field]: value };
        setShareholderData(newData);
        updateFormState('shareholders', newData);
    };

    const validateRow = (index: number) => {
        const row = shareholderData[index];
        const rowErrors: Record<string, string> = {};

        if (!row.shareholderPan.trim()) rowErrors.shareholderPan = 'Shareholder PAN is required';
        if (!row.shareholderName.trim()) rowErrors.shareholderName = 'Shareholder Name is required';
        if (!row.shareholderAddress.trim()) rowErrors.shareholderAddress = 'Shareholder Address is required';
        if (!row.shareholderState.trim()) rowErrors.shareholderState = 'Shareholder State is required';
        if (!row.shareholderPincode.trim()) rowErrors.shareholderPincode = 'Shareholder Pincode is required';
        if (!row.shareholderMobile.trim()) rowErrors.shareholderMobile = 'Shareholder Mobile is required';
        if (!row.shareholderEmail.trim()) rowErrors.shareholderEmail = 'Shareholder Email is required';
        if (!row.shareholderDob.trim()) rowErrors.shareholderDob = 'Shareholder DOB is required';
        if (!row.shareholderGender.trim()) rowErrors.shareholderGender = 'Shareholder Gender is required';
        if (!row.shareholderShares.trim()) rowErrors.shareholderShares = 'Shareholder Shares is required';
        if (!row.shareholderPercentage.trim()) rowErrors.shareholderPercentage = 'Shareholder Percentage is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        shareholderData.forEach((_, index) => {
            const row = shareholderData[index];
            const rowErrors: Record<string, string> = {};

            if (!row.shareholderPan.trim()) rowErrors.shareholderPan = 'Shareholder PAN is required';
            if (!row.shareholderName.trim()) rowErrors.shareholderName = 'Shareholder Name is required';
            if (!row.shareholderAddress.trim()) rowErrors.shareholderAddress = 'Shareholder Address is required';
            if (!row.shareholderState.trim()) rowErrors.shareholderState = 'Shareholder State is required';
            if (!row.shareholderPincode.trim()) rowErrors.shareholderPincode = 'Shareholder Pincode is required';
            if (!row.shareholderMobile.trim()) rowErrors.shareholderMobile = 'Shareholder Mobile is required';
            if (!row.shareholderEmail.trim()) rowErrors.shareholderEmail = 'Shareholder Email is required';
            if (!row.shareholderDob.trim()) rowErrors.shareholderDob = 'Shareholder DOB is required';
            if (!row.shareholderGender.trim()) rowErrors.shareholderGender = 'Shareholder Gender is required';
            if (!row.shareholderShares.trim()) rowErrors.shareholderShares = 'Shareholder Shares is required';
            if (!row.shareholderPercentage.trim()) rowErrors.shareholderPercentage = 'Shareholder Percentage is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('shareholders', shareholderData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Shareholder Details</h2>
                <p className="text-gray-600">Details of company shareholders for MGT-7</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Shareholder
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {shareholderData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.shareholderPan}
                                        onChange={(e) => updateRow(index, 'shareholderPan', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.shareholderPan ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                    />
                                    {errors[index]?.shareholderPan && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].shareholderPan}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.shareholderName}
                                        onChange={(e) => updateRow(index, 'shareholderName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.shareholderName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Shareholder Name"
                                    />
                                    {errors[index]?.shareholderName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].shareholderName}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={row.shareholderState}
                                        onChange={(e) => updateRow(index, 'shareholderState', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.shareholderState ? 'border-red-500' : 'border-gray-300'
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
                                    {errors[index]?.shareholderState && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].shareholderState}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.shareholderShares}
                                        onChange={(e) => updateRow(index, 'shareholderShares', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.shareholderShares ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0"
                                        step="1"
                                    />
                                    {errors[index]?.shareholderShares && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].shareholderShares}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.shareholderPercentage}
                                        onChange={(e) => updateRow(index, 'shareholderPercentage', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.shareholderPercentage ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                    />
                                    {errors[index]?.shareholderPercentage && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].shareholderPercentage}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.shareholderValue}
                                        onChange={(e) => updateRow(index, 'shareholderValue', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {shareholderData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No shareholders added yet. Click "Add New Shareholder" to get started.
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

export default ShareholderDetails;
