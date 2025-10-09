import React from 'react';

interface AMTDetail {
  description: string;
  amount: number;
  adjustmentType: string;
}

interface ItrFiveScheduleAMTProps {
  amtDetails: AMTDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof AMTDetail, value: string | number) => void;
  totalIncome: number;
  deductions: number;
  onUpdateTotals: (field: string, value: number) => void;
}

const ItrFiveScheduleAMT: React.FC<ItrFiveScheduleAMTProps> = ({
  amtDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail,
  totalIncome,
  deductions,
  onUpdateTotals
}) => {
  const adjustmentTypes = [
    'Depreciation',
    'Development Expenditure',
    'Scientific Research Expenditure',
    'Amortization',
    'Other Adjustments'
  ];

  const calculateAMT = () => {
    const totalAdjustments = amtDetails.reduce((sum, detail) => sum + detail.amount, 0);
    const adjustedTotalIncome = totalIncome + totalAdjustments;
    const amtRate = 0.18; // 18% AMT rate
    const amtPayable = adjustedTotalIncome * amtRate;
    return { totalAdjustments, adjustedTotalIncome, amtPayable };
  };

  const { totalAdjustments, adjustedTotalIncome, amtPayable } = calculateAMT();

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">Schedule AMT</h2>
        <p className="text-sm text-red-700">
          Computation of Alternate Minimum Tax payable under section 115JC
        </p>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deductions under Chapter VI-A (₹) *
          </label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => onUpdateTotals('deductions', parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter deductions"
            step="0.01"
            min="0"
          />
        </div>
      </div>

      {/* Adjustments */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Adjustments to Total Income</h3>
          <button
            type="button"
            onClick={onAddDetail}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Adjustment
          </button>
        </div>

        {amtDetails.map((detail, index) => (
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
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AMT Calculation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">AMT Calculation</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Income as per Normal Provisions</span>
            <span className="font-medium">₹{totalIncome.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Add: Adjustments to Total Income</span>
            <span className="font-medium">₹{totalAdjustments.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Less: Deductions under Chapter VI-A</span>
            <span className="font-medium">₹{deductions.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b-2 border-gray-300">
            <span className="font-semibold text-gray-700">Adjusted Total Income</span>
            <span className="font-bold text-blue-600">₹{adjustedTotalIncome.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">AMT Rate (18%)</span>
            <span className="font-medium">18%</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="font-semibold text-gray-700">AMT Payable</span>
            <span className="font-bold text-red-600">₹{amtPayable.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Schedule AMT Information</h3>
        <div className="space-y-2 text-sm text-yellow-700">
          <p><strong>Applicability:</strong> AMT applies to non-corporate taxpayers with total income above ₹20 lakhs</p>
          <p><strong>Rate:</strong> 18% of adjusted total income</p>
          <p><strong>Adjustments:</strong> Various deductions and allowances are added back for AMT calculation</p>
          <p><strong>Credit:</strong> AMT credit can be carried forward for 15 years</p>
          <p><strong>Minimum Tax:</strong> Higher of normal tax or AMT is payable</p>
          <p><strong>Exemptions:</strong> Certain exemptions and deductions are not available under AMT</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleAMT;
