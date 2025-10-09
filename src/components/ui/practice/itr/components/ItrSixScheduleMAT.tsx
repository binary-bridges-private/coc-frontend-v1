import React from 'react';

interface MATDetail {
  description: string;
  amount: number;
  adjustmentType: string;
}

interface ItrSixScheduleMATProps {
  matDetails: MATDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof MATDetail, value: string | number) => void;
  bookProfit: number;
  totalIncome: number;
  onUpdateTotals: (field: string, value: number) => void;
}

const ItrSixScheduleMAT: React.FC<ItrSixScheduleMATProps> = ({
  matDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail,
  bookProfit,
  totalIncome,
  onUpdateTotals
}) => {
  const adjustmentTypes = [
    'Depreciation',
    'Development Expenditure',
    'Scientific Research Expenditure',
    'Amortization',
    'Provision for Bad Debts',
    'Provision for Doubtful Debts',
    'Provision for Contingencies',
    'Provision for Employee Benefits',
    'Provision for Warranty',
    'Provision for Restructuring',
    'Other Provisions',
    'Other Adjustments'
  ];

  const calculateMAT = () => {
    const totalAdjustments = matDetails.reduce((sum, detail) => sum + detail.amount, 0);
    const adjustedBookProfit = bookProfit + totalAdjustments;
    const matRate = 0.15; // 15% MAT rate for companies
    const matPayable = adjustedBookProfit * matRate;
    return { totalAdjustments, adjustedBookProfit, matPayable };
  };

  const { totalAdjustments, adjustedBookProfit, matPayable } = calculateMAT();

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">Schedule MAT</h2>
        <p className="text-sm text-red-700">
          Computation of Minimum Alternate Tax payable under section 115JB
        </p>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Book Profit as per P&L Account (₹) *
          </label>
          <input
            type="number"
            value={bookProfit}
            onChange={(e) => onUpdateTotals('bookProfit', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book profit"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Income as per Normal Provisions (₹) *
          </label>
          <input
            type="number"
            value={totalIncome}
            onChange={(e) => onUpdateTotals('totalIncome', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter total income"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      {/* Adjustments */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Adjustments to Book Profit</h3>
          <button
            type="button"
            onClick={onAddDetail}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Adjustment
          </button>
        </div>

        {matDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Adjustment {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveDetail(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={detail.description}
                  onChange={(e) => onUpdateDetail(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adjustment Type *
                </label>
                <select
                  value={detail.adjustmentType}
                  onChange={(e) => onUpdateDetail(index, 'adjustmentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {adjustmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.amount}
                  onChange={(e) => onUpdateDetail(index, 'amount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MAT Calculation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">MAT Calculation</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Book Profit as per P&L Account</span>
            <span className="font-medium">₹{bookProfit.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Add: Adjustments to Book Profit</span>
            <span className="font-medium">₹{totalAdjustments.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b-2 border-gray-300">
            <span className="font-semibold text-gray-700">Adjusted Book Profit</span>
            <span className="font-bold text-blue-600">₹{adjustedBookProfit.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">MAT Rate (15%)</span>
            <span className="font-medium">15%</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="font-semibold text-gray-700">MAT Payable</span>
            <span className="font-bold text-red-600">₹{matPayable.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Comparison with Normal Tax */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">Tax Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md">
            <h4 className="font-semibold text-gray-700 mb-2">Normal Tax</h4>
            <p className="text-sm text-gray-600">Tax on Total Income as per Normal Provisions</p>
            <p className="text-lg font-bold text-blue-600">₹{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="font-semibold text-gray-700 mb-2">MAT Payable</h4>
            <p className="text-sm text-gray-600">15% of Adjusted Book Profit</p>
            <p className="text-lg font-bold text-red-600">₹{matPayable.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Higher of Normal Tax or MAT is payable. 
            MAT credit can be carried forward for 15 years.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">MAT Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Adjustments</div>
            <div className="text-lg font-bold text-red-600">{matDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Book Profit</div>
            <div className="text-lg font-bold text-blue-600">₹{bookProfit.toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Adjusted Book Profit</div>
            <div className="text-lg font-bold text-green-600">₹{adjustedBookProfit.toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">MAT Payable</div>
            <div className="text-lg font-bold text-purple-600">₹{matPayable.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Schedule MAT Information</h3>
        <div className="space-y-2 text-sm text-yellow-700">
          <p><strong>Applicability:</strong> MAT applies to companies with book profit above ₹1 crore</p>
          <p><strong>Rate:</strong> 15% of adjusted book profit (plus surcharge and cess)</p>
          <p><strong>Adjustments:</strong> Various provisions and allowances are added back for MAT calculation</p>
          <p><strong>Credit:</strong> MAT credit can be carried forward for 15 years</p>
          <p><strong>Minimum Tax:</strong> Higher of normal tax or MAT is payable</p>
          <p><strong>Exemptions:</strong> Certain exemptions and deductions are not available under MAT</p>
          <p><strong>Section 115JB:</strong> Provisions for MAT calculation</p>
          <p><strong>Audit Requirement:</strong> Companies liable for MAT need to maintain proper books</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixScheduleMAT;
