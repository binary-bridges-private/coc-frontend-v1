import React from 'react';

interface ForeignIncomeDetail {
  country: string;
  incomeType: string;
  grossIncome: number;
  taxPaid: number;
  netIncome: number;
  exchangeRate: number;
  incomeInINR: number;
  taxReliefClaimed: number;
}

interface ItrFiveScheduleFSIProps {
  foreignIncomeDetails: ForeignIncomeDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof ForeignIncomeDetail, value: string | number) => void;
}

const ItrFiveScheduleFSI: React.FC<ItrFiveScheduleFSIProps> = ({
  foreignIncomeDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const incomeTypes = [
    'Salary',
    'Business Income',
    'Professional Income',
    'Capital Gains',
    'Interest',
    'Dividend',
    'Royalty',
    'Other Income'
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Singapore',
    'UAE',
    'Other'
  ];

  const calculateIncomeInINR = (detail: ForeignIncomeDetail) => {
    return detail.netIncome * detail.exchangeRate;
  };

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-teal-800 mb-2">Schedule FSI</h2>
        <p className="text-sm text-teal-700">
          Details of Income from outside India and tax relief
        </p>
      </div>

      <div className="space-y-4">
        {foreignIncomeDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Foreign Income {index + 1}</h3>
              <button
                type="button"
                onClick={() => onRemoveDetail(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  value={detail.country}
                  onChange={(e) => onUpdateDetail(index, 'country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Type *
                </label>
                <select
                  value={detail.incomeType}
                  onChange={(e) => onUpdateDetail(index, 'incomeType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Income Type</option>
                  {incomeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exchange Rate *
                </label>
                <input
                  type="number"
                  value={detail.exchangeRate}
                  onChange={(e) => onUpdateDetail(index, 'exchangeRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter exchange rate"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Income (Foreign Currency) *
                </label>
                <input
                  type="number"
                  value={detail.grossIncome}
                  onChange={(e) => onUpdateDetail(index, 'grossIncome', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter gross income"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Paid Abroad (Foreign Currency) *
                </label>
                <input
                  type="number"
                  value={detail.taxPaid}
                  onChange={(e) => onUpdateDetail(index, 'taxPaid', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax paid"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Income (Foreign Currency) *
                </label>
                <input
                  type="number"
                  value={detail.netIncome}
                  onChange={(e) => onUpdateDetail(index, 'netIncome', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter net income"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income in INR (₹)
                </label>
                <input
                  type="number"
                  value={calculateIncomeInINR(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Relief Claimed (₹)
                </label>
                <input
                  type="number"
                  value={detail.taxReliefClaimed}
                  onChange={(e) => onUpdateDetail(index, 'taxReliefClaimed', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax relief claimed"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Foreign Income Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Gross Income:</span>
                  <span className="ml-2 font-medium">{detail.grossIncome.toLocaleString()} FC</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Tax Paid:</span>
                  <span className="ml-2 font-medium">{detail.taxPaid.toLocaleString()} FC</span>
                </div>
                <div>
                  <span className="text-gray-600">Net Income:</span>
                  <span className="ml-2 font-medium">{detail.netIncome.toLocaleString()} FC</span>
                </div>
                <div>
                  <span className="text-gray-600">Income in INR:</span>
                  <span className="ml-2 font-medium">₹{calculateIncomeInINR(detail).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Tax Relief Claimed:</span>
                  <span className="text-sm font-bold text-green-600">
                    ₹{detail.taxReliefClaimed.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add Foreign Income Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Foreign Income Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Foreign Incomes</div>
            <div className="text-lg font-bold text-teal-600">{foreignIncomeDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Income in INR</div>
            <div className="text-lg font-bold text-green-600">
              ₹{foreignIncomeDetails.reduce((sum, detail) => sum + calculateIncomeInINR(detail), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Tax Relief</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{foreignIncomeDetails.reduce((sum, detail) => sum + detail.taxReliefClaimed, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Countries</div>
            <div className="text-lg font-bold text-purple-600">
              {new Set(foreignIncomeDetails.map(detail => detail.country)).size}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule FSI Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Tax Relief:</strong> Relief under section 90, 90A, or 91 for taxes paid abroad</p>
          <p><strong>Exchange Rate:</strong> Use the exchange rate as on the date of receipt of income</p>
          <p><strong>Double Taxation:</strong> Avoid double taxation through DTAA provisions</p>
          <p><strong>Documentation:</strong> Keep tax certificates and exchange rate certificates</p>
          <p><strong>Section 90:</strong> Relief under Double Taxation Avoidance Agreement</p>
          <p><strong>Section 91:</strong> Relief for taxes paid in countries without DTAA</p>
          <p><strong>Foreign Tax Credit:</strong> Credit for taxes paid abroad against Indian tax liability</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleFSI;
