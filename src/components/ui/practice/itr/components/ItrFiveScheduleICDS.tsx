import React from 'react';

interface ICDSDetail {
  icdsNumber: string;
  icdsTitle: string;
  profitAsPerBooks: number;
  profitAsPerICDS: number;
  difference: number;
  adjustmentType: string;
  description: string;
}

interface ItrFiveScheduleICDSProps {
  icdsDetails: ICDSDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof ICDSDetail, value: string | number) => void;
}

const ItrFiveScheduleICDS: React.FC<ItrFiveScheduleICDSProps> = ({
  icdsDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const icdsStandards = [
    'ICDS I - Accounting Policies',
    'ICDS II - Valuation of Inventories',
    'ICDS III - Construction Contracts',
    'ICDS IV - Revenue Recognition',
    'ICDS V - Tangible Fixed Assets',
    'ICDS VI - Effects of Changes in Foreign Exchange Rates',
    'ICDS VII - Government Grants',
    'ICDS VIII - Securities',
    'ICDS IX - Borrowing Costs',
    'ICDS X - Provisions, Contingent Liabilities and Contingent Assets'
  ];

  const adjustmentTypes = [
    'Positive Adjustment',
    'Negative Adjustment',
    'No Adjustment'
  ];

  const calculateDifference = (detail: ICDSDetail) => {
    return detail.profitAsPerICDS - detail.profitAsPerBooks;
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Schedule ICDS</h2>
        <p className="text-sm text-slate-700">
          Effect of Income Computation Disclosure Standards on profit
        </p>
      </div>

      <div className="space-y-4">
        {icdsDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">ICDS {index + 1}</h3>
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
                  ICDS Number *
                </label>
                <select
                  value={detail.icdsNumber}
                  onChange={(e) => onUpdateDetail(index, 'icdsNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select ICDS</option>
                  {icdsStandards.map(icds => (
                    <option key={icds} value={icds}>{icds}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ICDS Title *
                </label>
                <input
                  type="text"
                  value={detail.icdsTitle}
                  onChange={(e) => onUpdateDetail(index, 'icdsTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ICDS title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profit as per Books (₹) *
                </label>
                <input
                  type="number"
                  value={detail.profitAsPerBooks}
                  onChange={(e) => onUpdateDetail(index, 'profitAsPerBooks', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter profit as per books"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profit as per ICDS (₹) *
                </label>
                <input
                  type="number"
                  value={detail.profitAsPerICDS}
                  onChange={(e) => onUpdateDetail(index, 'profitAsPerICDS', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter profit as per ICDS"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difference (₹)
                </label>
                <input
                  type="number"
                  value={calculateDifference(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
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
                  <option value="">Select Adjustment Type</option>
                  {adjustmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={detail.description}
                  onChange={(e) => onUpdateDetail(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter detailed description of ICDS adjustment"
                  rows={3}
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">ICDS Adjustment Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Profit as per Books:</span>
                  <span className="ml-2 font-medium">₹{detail.profitAsPerBooks.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Profit as per ICDS:</span>
                  <span className="ml-2 font-medium">₹{detail.profitAsPerICDS.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Difference:</span>
                  <span className={`ml-2 font-medium ${calculateDifference(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{calculateDifference(detail).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Adjustment Type:</span>
                  <span className="ml-2 font-medium">{detail.adjustmentType}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
        >
          Add ICDS Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">ICDS Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total ICDS Adjustments</div>
            <div className="text-lg font-bold text-slate-600">{icdsDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Profit as per Books</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{icdsDetails.reduce((sum, detail) => sum + detail.profitAsPerBooks, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Profit as per ICDS</div>
            <div className="text-lg font-bold text-green-600">
              ₹{icdsDetails.reduce((sum, detail) => sum + detail.profitAsPerICDS, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Net ICDS Adjustment</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{icdsDetails.reduce((sum, detail) => sum + calculateDifference(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule ICDS Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>ICDS:</strong> Income Computation Disclosure Standards for computation of income</p>
          <p><strong>Applicability:</strong> Applicable to business and profession income</p>
          <p><strong>Purpose:</strong> To ensure consistency in income computation</p>
          <p><strong>ICDS I:</strong> Accounting Policies - Selection and application of accounting policies</p>
          <p><strong>ICDS II:</strong> Valuation of Inventories - Methods of inventory valuation</p>
          <p><strong>ICDS III:</strong> Construction Contracts - Revenue recognition for construction contracts</p>
          <p><strong>ICDS IV:</strong> Revenue Recognition - When and how to recognize revenue</p>
          <p><strong>ICDS V:</strong> Tangible Fixed Assets - Treatment of fixed assets</p>
          <p><strong>ICDS VI:</strong> Foreign Exchange - Treatment of foreign exchange differences</p>
          <p><strong>ICDS VII:</strong> Government Grants - Treatment of government grants</p>
          <p><strong>ICDS VIII:</strong> Securities - Treatment of securities</p>
          <p><strong>ICDS IX:</strong> Borrowing Costs - Treatment of borrowing costs</p>
          <p><strong>ICDS X:</strong> Provisions - Treatment of provisions and contingencies</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleICDS;
