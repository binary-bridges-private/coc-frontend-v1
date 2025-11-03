import React from 'react';

interface CarriedForwardLossDetail {
  lossType: string;
  assessmentYear: string;
  lossAmount: number;
  utilizedAmount: number;
  balanceAmount: number;
  lossSource: string;
  lossDescription: string;
  lossDate: string;
  returnFiled: boolean;
  returnDate: string;
  acknowledgmentNumber: string;
  isAllowed: boolean;
  allowedAmount: number;
  disallowedAmount: number;
  disallowanceReason: string;
  carryForwardPeriod: number;
  expiryDate: string;
  utilizationDetails: string;
  remarks: string;
}

interface ItrFiveScheduleCFLProps {
  carriedForwardLossDetails: CarriedForwardLossDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof CarriedForwardLossDetail, value: string | number | boolean) => void;
}

const ItrFiveScheduleCFL: React.FC<ItrFiveScheduleCFLProps> = ({
  carriedForwardLossDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const lossTypes = [
    'Business Loss',
    'Speculative Business Loss',
    'Capital Loss',
    'House Property Loss',
    'Other Sources Loss',
    'Unabsorbed Depreciation',
    'Unabsorbed Family Pension',
    'Other Losses'
  ];

  const lossSources = [
    'Business Income',
    'Speculative Business',
    'Capital Gains',
    'House Property',
    'Other Sources',
    'Depreciation',
    'Family Pension',
    'Other'
  ];

  const calculateBalanceAmount = (detail: CarriedForwardLossDetail) => {
    return detail.lossAmount - detail.utilizedAmount;
  };

  const calculateDisallowedAmount = (detail: CarriedForwardLossDetail) => {
    return detail.lossAmount - detail.allowedAmount;
  };

  const calculateExpiryDate = (lossDate: string, carryForwardPeriod: number) => {
    const date = new Date(lossDate);
    date.setFullYear(date.getFullYear() + carryForwardPeriod);
    return date.toISOString().split('T')[0];
  };

  const getDefaultCarryForwardPeriod = (lossType: string) => {
    switch (lossType) {
      case 'Business Loss':
        return 8; // 8 years
      case 'Speculative Business Loss':
        return 4; // 4 years
      case 'Capital Loss':
        return 8; // 8 years
      case 'House Property Loss':
        return 8; // 8 years
      case 'Other Sources Loss':
        return 8; // 8 years
      case 'Unabsorbed Depreciation':
        return 8; // 8 years
      default:
        return 8;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2">Schedule CFL</h2>
        <p className="text-sm text-red-700">
          Carried Forward Losses
        </p>
      </div>

      <div className="space-y-4">
        {carriedForwardLossDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Loss Detail {index + 1}</h3>
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
                  Loss Type *
                </label>
                <select
                  value={detail.lossType}
                  onChange={(e) => {
                    onUpdateDetail(index, 'lossType', e.target.value);
                    onUpdateDetail(index, 'carryForwardPeriod', getDefaultCarryForwardPeriod(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Loss Type</option>
                  {lossTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Source
                </label>
                <select
                  value={detail.lossSource}
                  onChange={(e) => onUpdateDetail(index, 'lossSource', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Loss Source</option>
                  {lossSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Year *
                </label>
                <input
                  type="text"
                  value={detail.assessmentYear}
                  onChange={(e) => onUpdateDetail(index, 'assessmentYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2023-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Date *
                </label>
                <input
                  type="date"
                  value={detail.lossDate}
                  onChange={(e) => onUpdateDetail(index, 'lossDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.lossAmount}
                  onChange={(e) => onUpdateDetail(index, 'lossAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter loss amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Utilized Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.utilizedAmount}
                  onChange={(e) => onUpdateDetail(index, 'utilizedAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter utilized amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateBalanceAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.allowedAmount}
                  onChange={(e) => onUpdateDetail(index, 'allowedAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter allowed amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disallowed Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateDisallowedAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carry Forward Period (Years)
                </label>
                <input
                  type="number"
                  value={detail.carryForwardPeriod}
                  onChange={(e) => onUpdateDetail(index, 'carryForwardPeriod', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter carry forward period"
                  min="0"
                  max="8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={calculateExpiryDate(detail.lossDate, detail.carryForwardPeriod)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Description
                </label>
                <input
                  type="text"
                  value={detail.lossDescription}
                  onChange={(e) => onUpdateDetail(index, 'lossDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter loss description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Filed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.returnFiled}
                    onChange={(e) => onUpdateDetail(index, 'returnFiled', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Return Filed</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={detail.returnDate}
                  onChange={(e) => onUpdateDetail(index, 'returnDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Acknowledgment Number
                </label>
                <input
                  type="text"
                  value={detail.acknowledgmentNumber}
                  onChange={(e) => onUpdateDetail(index, 'acknowledgmentNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter acknowledgment number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Allowed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isAllowed}
                    onChange={(e) => onUpdateDetail(index, 'isAllowed', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Allowed</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disallowance Reason
                </label>
                <input
                  type="text"
                  value={detail.disallowanceReason}
                  onChange={(e) => onUpdateDetail(index, 'disallowanceReason', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter disallowance reason"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Utilization Details
                </label>
                <textarea
                  value={detail.utilizationDetails}
                  onChange={(e) => onUpdateDetail(index, 'utilizationDetails', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter utilization details"
                  rows={3}
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  value={detail.remarks}
                  onChange={(e) => onUpdateDetail(index, 'remarks', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any remarks"
                  rows={3}
                />
              </div>
            </div>

            {/* CFL Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">CFL Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Loss Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.lossAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Utilized:</span>
                  <span className="ml-2 font-medium">₹{detail.utilizedAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Disallowed:</span>
                  <span className="ml-2 font-medium">₹{calculateDisallowedAmount(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Balance:</span>
                  <span className="ml-2 font-medium">₹{calculateBalanceAmount(detail).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Add Carried Forward Loss Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule CFL Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Loss Entries</div>
            <div className="text-lg font-bold text-red-600">{carriedForwardLossDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Loss Amount</div>
            <div className="text-lg font-bold text-red-600">
              ₹{carriedForwardLossDetails.reduce((sum, detail) => sum + detail.lossAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Utilized</div>
            <div className="text-lg font-bold text-green-600">
              ₹{carriedForwardLossDetails.reduce((sum, detail) => sum + detail.utilizedAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Balance</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{carriedForwardLossDetails.reduce((sum, detail) => sum + calculateBalanceAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Loss Type Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Loss Type Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Loss Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {lossTypes.map(type => {
                const count = carriedForwardLossDetails.filter(detail => detail.lossType === type).length;
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
            <h4 className="text-md font-semibold text-gray-700 mb-3">Loss Source Distribution</h4>
            <div className="space-y-2 text-sm">
              {lossSources.map(source => {
                const count = carriedForwardLossDetails.filter(detail => detail.lossSource === source).length;
                if (count > 0) {
                  return (
                    <div key={source} className="flex justify-between">
                      <span className="text-gray-600">{source}:</span>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule CFL Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Carried Forward Losses:</strong> Losses from previous years that can be carried forward</p>
          <p><strong>Business Loss:</strong> Can be carried forward for 8 years</p>
          <p><strong>Speculative Business Loss:</strong> Can be carried forward for 4 years</p>
          <p><strong>Capital Loss:</strong> Can be carried forward for 8 years</p>
          <p><strong>House Property Loss:</strong> Can be carried forward for 8 years</p>
          <p><strong>Unabsorbed Depreciation:</strong> Can be carried forward indefinitely</p>
          <p><strong>Utilization:</strong> Losses can be set off against income of subsequent years</p>
          <p><strong>Priority:</strong> Business loss has priority over depreciation</p>
          <p><strong>Documentation:</strong> Keep assessment orders and return acknowledgments</p>
          <p><strong>Compliance:</strong> Ensure proper disclosure in tax returns</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleCFL;
