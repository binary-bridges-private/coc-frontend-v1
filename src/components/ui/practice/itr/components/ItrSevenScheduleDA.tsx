import React from 'react';

interface AccumulatedIncomeTaxedDetail {
  assessmentYear: string;
  incomeAmount: number;
  taxRate: number;
  taxAmount: number;
  penaltyAmount: number;
  interestAmount: number;
  totalAmount: number;
  paymentDate: string;
  challanNumber: string;
  bankName: string;
  branchName: string;
  isPaid: boolean;
  outstandingAmount: number;
  demandNoticeNumber: string;
  demandDate: string;
  appealFiled: boolean;
  appealDate: string;
  appealStatus: string;
  remarks: string;
}

interface ItrSevenScheduleDAProps {
  accumulatedIncomeTaxedDetails: AccumulatedIncomeTaxedDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof AccumulatedIncomeTaxedDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleDA: React.FC<ItrSevenScheduleDAProps> = ({
  accumulatedIncomeTaxedDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const appealStatuses = [
    'Pending',
    'Allowed',
    'Dismissed',
    'Partially Allowed',
    'Withdrawn',
    'Other'
  ];

  const calculateTotalAmount = (detail: AccumulatedIncomeTaxedDetail) => {
    return detail.taxAmount + detail.penaltyAmount + detail.interestAmount;
  };

  const calculateOutstandingAmount = (detail: AccumulatedIncomeTaxedDetail) => {
    return calculateTotalAmount(detail) - (detail.isPaid ? calculateTotalAmount(detail) : 0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-purple-800 mb-2">Schedule DA</h2>
        <p className="text-sm text-purple-700">
          Details of accumulated income taxed in earlier assessment years as per section 11 (1B)
        </p>
      </div>

      <div className="space-y-4">
        {accumulatedIncomeTaxedDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Taxed Income Detail {index + 1}</h3>
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
                  Income Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.incomeAmount}
                  onChange={(e) => onUpdateDetail(index, 'incomeAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter income amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={detail.taxRate}
                  onChange={(e) => onUpdateDetail(index, 'taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax rate"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.taxAmount}
                  onChange={(e) => onUpdateDetail(index, 'taxAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penalty Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.penaltyAmount}
                  onChange={(e) => onUpdateDetail(index, 'penaltyAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter penalty amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.interestAmount}
                  onChange={(e) => onUpdateDetail(index, 'interestAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interest amount"
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
                  Payment Date
                </label>
                <input
                  type="date"
                  value={detail.paymentDate}
                  onChange={(e) => onUpdateDetail(index, 'paymentDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challan Number
                </label>
                <input
                  type="text"
                  value={detail.challanNumber}
                  onChange={(e) => onUpdateDetail(index, 'challanNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter challan number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={detail.bankName}
                  onChange={(e) => onUpdateDetail(index, 'bankName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={detail.branchName}
                  onChange={(e) => onUpdateDetail(index, 'branchName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter branch name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Paid
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isPaid}
                    onChange={(e) => onUpdateDetail(index, 'isPaid', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Paid</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outstanding Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateOutstandingAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demand Notice Number
                </label>
                <input
                  type="text"
                  value={detail.demandNoticeNumber}
                  onChange={(e) => onUpdateDetail(index, 'demandNoticeNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter demand notice number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demand Date
                </label>
                <input
                  type="date"
                  value={detail.demandDate}
                  onChange={(e) => onUpdateDetail(index, 'demandDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appeal Filed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.appealFiled}
                    onChange={(e) => onUpdateDetail(index, 'appealFiled', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Appeal Filed</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appeal Date
                </label>
                <input
                  type="date"
                  value={detail.appealDate}
                  onChange={(e) => onUpdateDetail(index, 'appealDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appeal Status
                </label>
                <select
                  value={detail.appealStatus}
                  onChange={(e) => onUpdateDetail(index, 'appealStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Appeal Status</option>
                  {appealStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
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
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add Accumulated Income Taxed Detail
        </button>
      </div>
    </div>
  );
};

export default ItrSevenScheduleDA;
