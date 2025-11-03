import React, { useState, useEffect } from 'react';

interface FinancialDataProps {
    setOpen: (value: number) => void;
    formData?: any;
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const FinancialData: React.FC<FinancialDataProps> = ({ setOpen, formData = {}, updateFormState, period, viewMode = false }) => {
    const [financialData, setFinancialData] = useState({
        // Company Details
        companyName: '',
        cin: '',
        financialYear: period?.financialYear || '',
        reportingDate: '',
        
        // Revenue from Operations
        revenueFromOperations: '',
        otherIncome: '',
        totalRevenue: '',
        
        // Cost of Materials and Operations
        costOfMaterialsConsumed: '',
        purchasesOfStockInTrade: '',
        changesInInventories: '',
        employeeBenefitsExpense: '',
        financeCosts: '',
        depreciationAndAmortisationExpense: '',
        otherExpenses: '',
        totalExpenses: '',
        
        // Profit and Loss
        profitBeforeTax: '',
        taxExpense: '',
        profitAfterTax: '',
        otherComprehensiveIncome: '',
        totalComprehensiveIncome: '',
        
        // Balance Sheet - Equity
        shareCapital: '',
        otherEquity: '',
        totalEquity: '',
        
        // Balance Sheet - Liabilities
        nonCurrentLiabilities: '',
        currentLiabilities: '',
        totalLiabilities: '',
        
        // Balance Sheet - Assets
        nonCurrentAssets: '',
        currentAssets: '',
        totalAssets: '',
        
        // Auditor Details
        auditorName: '',
        auditorFirm: '',
        auditorReportDate: '',
        auditorReportType: '',
        
        // Additional Information
        notesToAccounts: '',
        boardResolutionDate: '',
        filingDate: '',
        ...formData
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            setFinancialData({ ...financialData, ...formData });
        }
    }, [formData]);

    const updateField = (field: string, value: string) => {
        setFinancialData(prev => ({ ...prev, [field]: value }));
        updateFormState('financialData', { ...financialData, [field]: value });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Company Details validation
        if (!financialData.companyName.trim()) newErrors.companyName = 'Company Name is required';
        if (!financialData.cin.trim()) newErrors.cin = 'CIN is required';
        if (!financialData.reportingDate.trim()) newErrors.reportingDate = 'Reporting Date is required';
        
        // Revenue validation
        if (!financialData.revenueFromOperations.trim()) newErrors.revenueFromOperations = 'Revenue from Operations is required';
        if (!financialData.totalRevenue.trim()) newErrors.totalRevenue = 'Total Revenue is required';
        
        // Expenses validation
        if (!financialData.totalExpenses.trim()) newErrors.totalExpenses = 'Total Expenses is required';
        
        // Profit validation
        if (!financialData.profitBeforeTax.trim()) newErrors.profitBeforeTax = 'Profit Before Tax is required';
        if (!financialData.profitAfterTax.trim()) newErrors.profitAfterTax = 'Profit After Tax is required';
        
        // Balance Sheet validation
        if (!financialData.totalEquity.trim()) newErrors.totalEquity = 'Total Equity is required';
        if (!financialData.totalLiabilities.trim()) newErrors.totalLiabilities = 'Total Liabilities is required';
        if (!financialData.totalAssets.trim()) newErrors.totalAssets = 'Total Assets is required';
        
        // Auditor validation
        if (!financialData.auditorName.trim()) newErrors.auditorName = 'Auditor Name is required';
        if (!financialData.auditorFirm.trim()) newErrors.auditorFirm = 'Auditor Firm is required';
        if (!financialData.auditorReportDate.trim()) newErrors.auditorReportDate = 'Auditor Report Date is required';
        if (!financialData.auditorReportType.trim()) newErrors.auditorReportType = 'Auditor Report Type is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            updateFormState('financialData', financialData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Data</h2>
                <p className="text-gray-600">Basic financial information for AOC-4</p>
            </div>

            {/* Company Details Section */}
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                        <input
                            type="text"
                            value={financialData.companyName}
                            onChange={(e) => updateField('companyName', e.target.value)}
                            disabled={viewMode}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.companyName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Company Name"
                        />
                        {errors.companyName && (
                            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CIN *</label>
                        <input
                            type="text"
                            value={financialData.cin}
                            onChange={(e) => updateField('cin', e.target.value)}
                            disabled={viewMode}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.cin ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="L12345AB1234PLC123456"
                            maxLength={21}
                        />
                        {errors.cin && (
                            <p className="text-red-500 text-xs mt-1">{errors.cin}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Financial Year</label>
                        <input
                            type="text"
                            value={financialData.financialYear}
                            onChange={(e) => updateField('financialYear', e.target.value)}
                            disabled={viewMode}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="2023-24"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Date *</label>
                        <input
                            type="date"
                            value={financialData.reportingDate}
                            onChange={(e) => updateField('reportingDate', e.target.value)}
                            disabled={viewMode}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.reportingDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.reportingDate && (
                            <p className="text-red-500 text-xs mt-1">{errors.reportingDate}</p>
                        )}
                    </div>
                </div>
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
                                value={financialData.revenueFromOperations}
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
                                value={financialData.otherIncome}
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
                                value={financialData.totalRevenue}
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
                                value={financialData.costOfMaterialsConsumed}
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
                                value={financialData.employeeBenefitsExpense}
                                onChange={(e) => updateField('employeeBenefitsExpense', e.target.value)}
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
                                value={financialData.totalExpenses}
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
                                value={financialData.profitBeforeTax}
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
                                value={financialData.taxExpense}
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
                                value={financialData.profitAfterTax}
                                onChange={(e) => updateField('profitAfterTax', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* Auditor Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Auditor Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Auditor Name *</label>
                            <input
                                type="text"
                                value={financialData.auditorName}
                                onChange={(e) => updateField('auditorName', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.auditorName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Auditor Name"
                            />
                            {errors.auditorName && (
                                <p className="text-red-500 text-xs mt-1">{errors.auditorName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Auditor Firm *</label>
                            <input
                                type="text"
                                value={financialData.auditorFirm}
                                onChange={(e) => updateField('auditorFirm', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.auditorFirm ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Auditor Firm Name"
                            />
                            {errors.auditorFirm && (
                                <p className="text-red-500 text-xs mt-1">{errors.auditorFirm}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Auditor Report Date *</label>
                            <input
                                type="date"
                                value={financialData.auditorReportDate}
                                onChange={(e) => updateField('auditorReportDate', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.auditorReportDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.auditorReportDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.auditorReportDate}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Auditor Report Type *</label>
                            <select
                                value={financialData.auditorReportType}
                                onChange={(e) => updateField('auditorReportType', e.target.value)}
                                disabled={viewMode}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.auditorReportType ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Report Type</option>
                                <option value="Unqualified">Unqualified</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Adverse">Adverse</option>
                                <option value="Disclaimer">Disclaimer</option>
                            </select>
                            {errors.auditorReportType && (
                                <p className="text-red-500 text-xs mt-1">{errors.auditorReportType}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes to Accounts</label>
                            <textarea
                                value={financialData.notesToAccounts}
                                onChange={(e) => updateField('notesToAccounts', e.target.value)}
                                disabled={viewMode}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Additional notes..."
                            />
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

export default FinancialData;
