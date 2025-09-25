import React, { useState, useEffect } from 'react';

interface BalanceSheetDataProps {
    setOpen: (value: number) => void;
    formData?: any;
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const BalanceSheetData: React.FC<BalanceSheetDataProps> = ({ setOpen, formData = {}, updateFormState, period, viewMode = false }) => {
    const [balanceSheetData, setBalanceSheetData] = useState({
        shareCapital: '',
        otherEquity: '',
        totalEquity: '',
        nonCurrentLiabilities: '',
        currentLiabilities: '',
        totalLiabilities: '',
        nonCurrentAssets: '',
        currentAssets: '',
        totalAssets: '',
        ...formData
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            setBalanceSheetData({ ...balanceSheetData, ...formData });
        }
    }, [formData]);

    const updateField = (field: string, value: string) => {
        setBalanceSheetData(prev => ({ ...prev, [field]: value }));
        updateFormState('balanceSheetData', { ...balanceSheetData, [field]: value });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!balanceSheetData.shareCapital.trim()) newErrors.shareCapital = 'Share Capital is required';
        if (!balanceSheetData.totalEquity.trim()) newErrors.totalEquity = 'Total Equity is required';
        if (!balanceSheetData.totalLiabilities.trim()) newErrors.totalLiabilities = 'Total Liabilities is required';
        if (!balanceSheetData.totalAssets.trim()) newErrors.totalAssets = 'Total Assets is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            updateFormState('balanceSheetData', balanceSheetData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Balance Sheet Data</h2>
                <p className="text-gray-600">Balance sheet information for AOC-4</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Equity Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Equity</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Share Capital</label>
                            <input
                                type="number"
                                value={balanceSheetData.shareCapital}
                                onChange={(e) => updateField('shareCapital', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.shareCapital ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.shareCapital && (
                                <p className="text-red-500 text-xs mt-1">{errors.shareCapital}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Other Equity</label>
                            <input
                                type="number"
                                value={balanceSheetData.otherEquity}
                                onChange={(e) => updateField('otherEquity', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Equity</label>
                            <input
                                type="number"
                                value={balanceSheetData.totalEquity}
                                onChange={(e) => updateField('totalEquity', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.totalEquity ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.totalEquity && (
                                <p className="text-red-500 text-xs mt-1">{errors.totalEquity}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Liabilities Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Liabilities</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Non-Current Liabilities</label>
                            <input
                                type="number"
                                value={balanceSheetData.nonCurrentLiabilities}
                                onChange={(e) => updateField('nonCurrentLiabilities', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Liabilities</label>
                            <input
                                type="number"
                                value={balanceSheetData.currentLiabilities}
                                onChange={(e) => updateField('currentLiabilities', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Liabilities</label>
                            <input
                                type="number"
                                value={balanceSheetData.totalLiabilities}
                                onChange={(e) => updateField('totalLiabilities', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.totalLiabilities ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.totalLiabilities && (
                                <p className="text-red-500 text-xs mt-1">{errors.totalLiabilities}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Assets Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Assets</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Non-Current Assets</label>
                            <input
                                type="number"
                                value={balanceSheetData.nonCurrentAssets}
                                onChange={(e) => updateField('nonCurrentAssets', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Assets</label>
                            <input
                                type="number"
                                value={balanceSheetData.currentAssets}
                                onChange={(e) => updateField('currentAssets', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Assets</label>
                            <input
                                type="number"
                                value={balanceSheetData.totalAssets}
                                onChange={(e) => updateField('totalAssets', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.totalAssets ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.totalAssets && (
                                <p className="text-red-500 text-xs mt-1">{errors.totalAssets}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Sheet Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Total Equity:</span>
                            <span className="font-mono">₹{balanceSheetData.totalEquity || '0.00'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total Liabilities:</span>
                            <span className="font-mono">₹{balanceSheetData.totalLiabilities || '0.00'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total Assets:</span>
                            <span className="font-mono">₹{balanceSheetData.totalAssets || '0.00'}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                            <span>Balance:</span>
                            <span className={`font-mono ${
                                parseFloat(balanceSheetData.totalAssets || '0') === 
                                (parseFloat(balanceSheetData.totalEquity || '0') + parseFloat(balanceSheetData.totalLiabilities || '0'))
                                ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {parseFloat(balanceSheetData.totalAssets || '0') === 
                                (parseFloat(balanceSheetData.totalEquity || '0') + parseFloat(balanceSheetData.totalLiabilities || '0'))
                                ? 'Balanced' : 'Not Balanced'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

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

export default BalanceSheetData;
