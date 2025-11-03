import React from 'react';

interface AccumulatedAmountDetail {
  description: string;
  amountAccumulated: number;
  amountSetApart: number;
  totalAmount: number;
  purpose: string;
  timeLimit: string;
  approvalDate: string;
  approvalAuthority: string;
  utilizationDate: string;
  utilizedAmount: number;
  balanceAmount: number;
  isUtilized: boolean;
  utilizationDetails: string;
  remarks: string;
}

interface ItrSevenScheduleIProps {
  accumulatedAmountDetails: AccumulatedAmountDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof AccumulatedAmountDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleI: React.FC<ItrSevenScheduleIProps> = ({
  accumulatedAmountDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const purposes = [
    'Charitable Purpose',
    'Religious Purpose',
    'Educational Purpose',
    'Medical Relief',
    'Relief of the Poor',
    'Social Welfare',
    'Environmental Protection',
    'Scientific Research',
    'Rural Development',
    'Other'
  ];

  const timeLimits = [
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '10 Years',
    '15 Years',
    '20 Years',
    'Indefinite',
    'Other'
  ];

  const approvalAuthorities = [
    'Commissioner of Income Tax',
    'Chief Commissioner of Income Tax',
    'Director General of Income Tax',
    'CBDT',
    'State Government',
    'Central Government',
    'Other'
  ];

  const calculateTotalAmount = (detail: AccumulatedAmountDetail) => {
    return detail.amountAccumulated + detail.amountSetApart;
  };

  const calculateBalanceAmount = (detail: AccumulatedAmountDetail) => {
    return calculateTotalAmount(detail) - detail.utilizedAmount;
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-purple-800 mb-2">Schedule I</h2>
        <p className="text-sm text-purple-700">
          Details of amounts accumulated / set apart within the meaning of section 11(2)
        </p>
      </div>

      <div className="space-y-4">
        {accumulatedAmountDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Accumulated Amount Detail {index + 1}</h3>
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
                  Description *
                </label>
                <input
                  type="text"
                  value={detail.description}
                  onChange={(e) => onUpdateDetail(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description of accumulated amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose *
                </label>
                <select
                  value={detail.purpose}
                  onChange={(e) => onUpdateDetail(index, 'purpose', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Purpose</option>
                  {purposes.map(purpose => (
                    <option key={purpose} value={purpose}>{purpose}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Accumulated (₹) *
                </label>
                <input
                  type="number"
                  value={detail.amountAccumulated}
                  onChange={(e) => onUpdateDetail(index, 'amountAccumulated', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount accumulated"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Set Apart (₹) *
                </label>
                <input
                  type="number"
                  value={detail.amountSetApart}
                  onChange={(e) => onUpdateDetail(index, 'amountSetApart', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount set apart"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit
                </label>
                <select
                  value={detail.timeLimit}
                  onChange={(e) => onUpdateDetail(index, 'timeLimit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Time Limit</option>
                  {timeLimits.map(limit => (
                    <option key={limit} value={limit}>{limit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Date
                </label>
                <input
                  type="date"
                  value={detail.approvalDate}
                  onChange={(e) => onUpdateDetail(index, 'approvalDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Authority
                </label>
                <select
                  value={detail.approvalAuthority}
                  onChange={(e) => onUpdateDetail(index, 'approvalAuthority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Approval Authority</option>
                  {approvalAuthorities.map(authority => (
                    <option key={authority} value={authority}>{authority}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Utilization Date
                </label>
                <input
                  type="date"
                  value={detail.utilizationDate}
                  onChange={(e) => onUpdateDetail(index, 'utilizationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  Is Utilized
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isUtilized}
                    onChange={(e) => onUpdateDetail(index, 'isUtilized', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Utilized</span>
                </div>
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

            {/* Schedule I Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Schedule I Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Amount Accumulated:</span>
                  <span className="ml-2 font-medium">₹{detail.amountAccumulated.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Amount Set Apart:</span>
                  <span className="ml-2 font-medium">₹{detail.amountSetApart.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="ml-2 font-medium">₹{calculateTotalAmount(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Balance Amount:</span>
                  <span className="ml-2 font-medium">₹{calculateBalanceAmount(detail).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add Accumulated Amount Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule I Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Entries</div>
            <div className="text-lg font-bold text-purple-600">{accumulatedAmountDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Accumulated</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{accumulatedAmountDetails.reduce((sum, detail) => sum + detail.amountAccumulated, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Set Apart</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{accumulatedAmountDetails.reduce((sum, detail) => sum + detail.amountSetApart, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Balance</div>
            <div className="text-lg font-bold text-green-600">
              ₹{accumulatedAmountDetails.reduce((sum, detail) => sum + calculateBalanceAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Purpose Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Purpose Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Purpose Distribution</h4>
            <div className="space-y-2 text-sm">
              {purposes.map(purpose => {
                const count = accumulatedAmountDetails.filter(detail => detail.purpose === purpose).length;
                if (count > 0) {
                  return (
                    <div key={purpose} className="flex justify-between">
                      <span className="text-gray-600">{purpose}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Time Limit Distribution</h4>
            <div className="space-y-2 text-sm">
              {timeLimits.map(limit => {
                const count = accumulatedAmountDetails.filter(detail => detail.timeLimit === limit).length;
                if (count > 0) {
                  return (
                    <div key={limit} className="flex justify-between">
                      <span className="text-gray-600">{limit}:</span>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule I Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Schedule I:</strong> Details of amounts accumulated / set apart within the meaning of section 11(2)</p>
          <p><strong>Accumulation:</strong> Income accumulated for specific charitable or religious purposes</p>
          <p><strong>Set Apart:</strong> Income set apart for specific charitable or religious purposes</p>
          <p><strong>Time Limit:</strong> Maximum period for which accumulation is allowed</p>
          <p><strong>Approval:</strong> Approval from competent authority required</p>
          <p><strong>Utilization:</strong> Amounts must be utilized for approved purposes</p>
          <p><strong>Compliance:</strong> Ensure compliance with section 11(2) of Income Tax Act</p>
          <p><strong>Documentation:</strong> Keep approval letters and utilization certificates</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSevenScheduleI;
