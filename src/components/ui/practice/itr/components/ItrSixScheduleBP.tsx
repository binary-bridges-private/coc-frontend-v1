import React from 'react';

interface BusinessIncomeDetail {
  businessName: string;
  businessAddress: string;
  businessType: string;
  businessCode: string;
  grossReceipts: number;
  grossProfit: number;
  netProfit: number;
  depreciation: number;
  interest: number;
  rent: number;
  salary: number;
  otherExpenses: number;
  totalExpenses: number;
  taxableIncome: number;
  businessSegment: string;
  marketSegment: string;
  customerType: string;
  revenueRecognition: string;
  costStructure: string;
  operatingMargin: number;
  netMargin: number;
}

interface ItrSixScheduleBPProps {
  businessIncomeDetails: BusinessIncomeDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof BusinessIncomeDetail, value: string | number) => void;
}

const ItrSixScheduleBP: React.FC<ItrSixScheduleBPProps> = ({
  businessIncomeDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const businessTypes = [
    'Manufacturing',
    'Trading',
    'Service',
    'Professional',
    'Construction',
    'Transport',
    'Hospitality',
    'Education',
    'Healthcare',
    'Technology',
    'Consulting',
    'Banking',
    'Insurance',
    'Real Estate',
    'Agriculture',
    'Mining',
    'Other'
  ];

  const businessSegments = [
    'Primary',
    'Secondary',
    'Tertiary',
    'Quaternary',
    'Domestic',
    'Export',
    'Import',
    'B2B',
    'B2C',
    'B2G',
    'Other'
  ];

  const marketSegments = [
    'Local',
    'Regional',
    'National',
    'International',
    'Urban',
    'Rural',
    'Semi-Urban',
    'Metro',
    'Tier 1',
    'Tier 2',
    'Tier 3',
    'Other'
  ];

  const customerTypes = [
    'Individual',
    'Corporate',
    'Government',
    'Institutional',
    'Retail',
    'Wholesale',
    'Bulk',
    'Small Business',
    'Enterprise',
    'Other'
  ];

  const revenueRecognitionMethods = [
    'Point of Sale',
    'Delivery',
    'Completion',
    'Percentage of Completion',
    'Milestone',
    'Subscription',
    'Usage Based',
    'Time Based',
    'Other'
  ];

  const costStructures = [
    'Fixed Cost',
    'Variable Cost',
    'Mixed Cost',
    'Step Cost',
    'Semi-Variable Cost',
    'Direct Cost',
    'Indirect Cost',
    'Other'
  ];

  const calculateTotalExpenses = (detail: BusinessIncomeDetail) => {
    return detail.depreciation + detail.interest + detail.rent + detail.salary + detail.otherExpenses;
  };

  const calculateTaxableIncome = (detail: BusinessIncomeDetail) => {
    return detail.grossProfit - calculateTotalExpenses(detail);
  };

  const calculateNetProfitRate = (detail: BusinessIncomeDetail) => {
    return detail.grossReceipts > 0 ? (detail.netProfit / detail.grossReceipts) * 100 : 0;
  };

  const calculateGrossProfitRate = (detail: BusinessIncomeDetail) => {
    return detail.grossReceipts > 0 ? (detail.grossProfit / detail.grossReceipts) * 100 : 0;
  };

  const calculateOperatingMargin = (detail: BusinessIncomeDetail) => {
    const operatingExpenses = detail.depreciation + detail.rent + detail.salary + detail.otherExpenses;
    const operatingProfit = detail.grossProfit - operatingExpenses;
    return detail.grossReceipts > 0 ? (operatingProfit / detail.grossReceipts) * 100 : 0;
  };

  const calculateNetMargin = (detail: BusinessIncomeDetail) => {
    return detail.grossReceipts > 0 ? (detail.netProfit / detail.grossReceipts) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-orange-800 mb-2">Schedule BP</h2>
        <p className="text-sm text-orange-700">
          Computation of income from business or profession
        </p>
      </div>

      <div className="space-y-4">
        {businessIncomeDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Business {index + 1}</h3>
              <button
                type="button"
                onClick={() => onRemoveDetail(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={detail.businessName}
                  onChange={(e) => onUpdateDetail(index, 'businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  value={detail.businessType}
                  onChange={(e) => onUpdateDetail(index, 'businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Business Type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address *
                </label>
                <textarea
                  value={detail.businessAddress}
                  onChange={(e) => onUpdateDetail(index, 'businessAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete business address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Code
                </label>
                <input
                  type="text"
                  value={detail.businessCode}
                  onChange={(e) => onUpdateDetail(index, 'businessCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter business code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Segment
                </label>
                <select
                  value={detail.businessSegment}
                  onChange={(e) => onUpdateDetail(index, 'businessSegment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Business Segment</option>
                  {businessSegments.map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Market Segment
                </label>
                <select
                  value={detail.marketSegment}
                  onChange={(e) => onUpdateDetail(index, 'marketSegment', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Market Segment</option>
                  {marketSegments.map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Type
                </label>
                <select
                  value={detail.customerType}
                  onChange={(e) => onUpdateDetail(index, 'customerType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Customer Type</option>
                  {customerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Recognition
                </label>
                <select
                  value={detail.revenueRecognition}
                  onChange={(e) => onUpdateDetail(index, 'revenueRecognition', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Revenue Recognition</option>
                  {revenueRecognitionMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Structure
                </label>
                <select
                  value={detail.costStructure}
                  onChange={(e) => onUpdateDetail(index, 'costStructure', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Cost Structure</option>
                  {costStructures.map(structure => (
                    <option key={structure} value={structure}>{structure}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Receipts (₹) *
                </label>
                <input
                  type="number"
                  value={detail.grossReceipts}
                  onChange={(e) => onUpdateDetail(index, 'grossReceipts', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter gross receipts"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Profit (₹) *
                </label>
                <input
                  type="number"
                  value={detail.grossProfit}
                  onChange={(e) => onUpdateDetail(index, 'grossProfit', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter gross profit"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depreciation (₹)
                </label>
                <input
                  type="number"
                  value={detail.depreciation}
                  onChange={(e) => onUpdateDetail(index, 'depreciation', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter depreciation"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest (₹)
                </label>
                <input
                  type="number"
                  value={detail.interest}
                  onChange={(e) => onUpdateDetail(index, 'interest', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interest"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent (₹)
                </label>
                <input
                  type="number"
                  value={detail.rent}
                  onChange={(e) => onUpdateDetail(index, 'rent', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rent"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary (₹)
                </label>
                <input
                  type="number"
                  value={detail.salary}
                  onChange={(e) => onUpdateDetail(index, 'salary', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter salary"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Expenses (₹)
                </label>
                <input
                  type="number"
                  value={detail.otherExpenses}
                  onChange={(e) => onUpdateDetail(index, 'otherExpenses', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter other expenses"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Expenses (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalExpenses(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Profit (₹)
                </label>
                <input
                  type="number"
                  value={detail.netProfit}
                  onChange={(e) => onUpdateDetail(index, 'netProfit', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter net profit"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxable Income (₹)
                </label>
                <input
                  type="number"
                  value={calculateTaxableIncome(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Margin (%)
                </label>
                <input
                  type="number"
                  value={calculateOperatingMargin(detail).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Margin (%)
                </label>
                <input
                  type="number"
                  value={calculateNetMargin(detail).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Business Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Business Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Gross Receipts:</span>
                  <span className="ml-2 font-medium">₹{detail.grossReceipts.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Gross Profit:</span>
                  <span className="ml-2 font-medium">₹{detail.grossProfit.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Expenses:</span>
                  <span className="ml-2 font-medium">₹{calculateTotalExpenses(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Taxable Income:</span>
                  <span className="ml-2 font-medium">₹{calculateTaxableIncome(detail).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Gross Profit Rate:</span>
                    <span className="ml-2 font-medium">{calculateGrossProfitRate(detail).toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Net Profit Rate:</span>
                    <span className="ml-2 font-medium">{calculateNetProfitRate(detail).toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Operating Margin:</span>
                    <span className="ml-2 font-medium">{calculateOperatingMargin(detail).toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Business Type:</span>
                    <span className="ml-2 font-medium">{detail.businessType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Add Business Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule BP Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Businesses</div>
            <div className="text-lg font-bold text-orange-600">{businessIncomeDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Gross Receipts</div>
            <div className="text-lg font-bold text-green-600">
              ₹{businessIncomeDetails.reduce((sum, detail) => sum + detail.grossReceipts, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Gross Profit</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{businessIncomeDetails.reduce((sum, detail) => sum + detail.grossProfit, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Taxable Income</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{businessIncomeDetails.reduce((sum, detail) => sum + calculateTaxableIncome(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Business Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Business Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Business Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {businessTypes.map(type => {
                const count = businessIncomeDetails.filter(detail => detail.businessType === type).length;
                if (count > 0) {
                  return (
                    <div key={type} className="flex justify-between">
                      <span className="text-gray-600">{type}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Market Segment Distribution</h4>
            <div className="space-y-2 text-sm">
              {marketSegments.map(segment => {
                const count = businessIncomeDetails.filter(detail => detail.marketSegment === segment).length;
                if (count > 0) {
                  return (
                    <div key={segment} className="flex justify-between">
                      <span className="text-gray-600">{segment}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule BP Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Business Income:</strong> Income from business or profession activities</p>
          <p><strong>Gross Receipts:</strong> Total receipts from business operations</p>
          <p><strong>Gross Profit:</strong> Receipts minus cost of goods sold</p>
          <p><strong>Expenses:</strong> All allowable business expenses</p>
          <p><strong>Depreciation:</strong> Depreciation on business assets</p>
          <p><strong>Interest:</strong> Interest paid on business loans</p>
          <p><strong>Rent:</strong> Rent paid for business premises</p>
          <p><strong>Salary:</strong> Salary paid to employees</p>
          <p><strong>Other Expenses:</strong> Other business expenses</p>
          <p><strong>Taxable Income:</strong> Gross profit minus total expenses</p>
          <p><strong>Business Segments:</strong> Different business segments or divisions</p>
          <p><strong>Market Analysis:</strong> Market segment and customer type analysis</p>
          <p><strong>Financial Ratios:</strong> Operating margin, net margin, and other ratios</p>
          <p><strong>Documentation:</strong> Keep supporting documents for all business transactions</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixScheduleBP;
