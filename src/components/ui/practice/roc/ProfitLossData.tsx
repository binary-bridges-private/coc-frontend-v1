import React, { useState, useEffect } from 'react';

interface ProfitLossDataProps {
    setOpen: (value: number) => void;
    formData?: any;
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const ProfitLossData: React.FC<ProfitLossDataProps> = ({ setOpen, formData = {}, updateFormState, period, viewMode = false }) => {
    const [profitLossData, setProfitLossData] = useState({
        revenueFromOperations: '',
        otherIncome: '',
        totalRevenue: '',
        costOfMaterialsConsumed: '',
        purchasesOfStockInTrade: '',
        changesInInventories: '',
        employeeBenefitsExpense: '',
        financeCosts: '',
        depreciationAndAmortisationExpense: '',
        otherExpenses: '',
        totalExpenses: '',
        profitBeforeTax: '',
        taxExpense: '',
        profitAfterTax: '',
        otherComprehensiveIncome: '',
        totalComprehensiveIncome: '',
        ...formData
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            setProfitLossData({ ...profitLossData, ...formData });
        }
    }, [formData]);

    const updateField = (field: string, value: string) => {
        setProfitLossData(prev => ({ ...prev, [field]: value }));
        updateFormState('profitLossData', { ...profitLossData, [field]: value });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!profitLossData.revenueFromOperations.trim()) newErrors.revenueFromOperations = 'Revenue from Operations is required';
        if (!profitLossData.totalRevenue.trim()) newErrors.totalRevenue = 'Total Revenue is required';
        if (!profitLossData.totalExpenses.trim()) newErrors.totalExpenses = 'Total Expenses is required';
        if (!profitLossData.profitBeforeTax.trim()) newErrors.profitBeforeTax = 'Profit Before Tax is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            updateFormState('profitLossData', profitLossData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Profit & Loss Data</h2>
                <p className="text-gray-600">Profit and loss statement information for AOC-4</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Revenue from Operations</label>
                            <input
                                type="number"
                                value={profitLossData.revenueFromOperations}
                                onChange={(e) => updateField('revenueFromOperations', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.revenueFromOperations ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.revenueFromOperations && (
                                <p className="text-red-500 text-xs mt-1">{errors.revenueFromOperations}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Other Income</label>
                            <input
                                type="number"
                                value={profitLossData.otherIncome}
                                onChange={(e) => updateField('otherIncome', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Revenue</label>
                            <input
                                type="number"
                                value={profitLossData.totalRevenue}
                                onChange={(e) => updateField('totalRevenue', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.totalRevenue ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.totalRevenue && (
                                <p className="text-red-500 text-xs mt-1">{errors.totalRevenue}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Expenses Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Expenses</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cost of Materials Consumed</label>
                            <input
                                type="number"
                                value={profitLossData.costOfMaterialsConsumed}
                                onChange={(e) => updateField('costOfMaterialsConsumed', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Benefits Expense</label>
                            <input
                                type="number"
                                value={profitLossData.employeeBenefitsExpense}
                                onChange={(e) => updateField('employeeBenefitsExpense', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Finance Costs</label>
                            <input
                                type="number"
                                value={profitLossData.financeCosts}
                                onChange={(e) => updateField('financeCosts', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Depreciation & Amortisation</label>
                            <input
                                type="number"
                                value={profitLossData.depreciationAndAmortisationExpense}
                                onChange={(e) => updateField('depreciationAndAmortisationExpense', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Other Expenses</label>
                            <input
                                type="number"
                                value={profitLossData.otherExpenses}
                                onChange={(e) => updateField('otherExpenses', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Expenses</label>
                            <input
                                type="number"
                                value={profitLossData.totalExpenses}
                                onChange={(e) => updateField('totalExpenses', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.totalExpenses ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.totalExpenses && (
                                <p className="text-red-500 text-xs mt-1">{errors.totalExpenses}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profit Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit & Loss</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profit Before Tax</label>
                            <input
                                type="number"
                                value={profitLossData.profitBeforeTax}
                                onChange={(e) => updateField('profitBeforeTax', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.profitBeforeTax ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                                step="0.01"
                            />
                            {errors.profitBeforeTax && (
                                <p className="text-red-500 text-xs mt-1">{errors.profitBeforeTax}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Expense</label>
                            <input
                                type="number"
                                value={profitLossData.taxExpense}
                                onChange={(e) => updateField('taxExpense', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profit After Tax</label>
                            <input
                                type="number"
                                value={profitLossData.profitAfterTax}
                                onChange={(e) => updateField('profitAfterTax', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">P&L Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Total Revenue:</span>
                            <span className="font-mono">₹{profitLossData.totalRevenue || '0.00'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total Expenses:</span>
                            <span className="font-mono">₹{profitLossData.totalExpenses || '0.00'}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                            <span className="font-medium">Profit Before Tax:</span>
                            <span className="font-mono">₹{profitLossData.profitBeforeTax || '0.00'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Tax Expense:</span>
                            <span className="font-mono">₹{profitLossData.taxExpense || '0.00'}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                            <span>Profit After Tax:</span>
                            <span className={`font-mono ${
                                parseFloat(profitLossData.profitAfterTax || '0') >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                ₹{profitLossData.profitAfterTax || '0.00'}
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

export default ProfitLossData;
