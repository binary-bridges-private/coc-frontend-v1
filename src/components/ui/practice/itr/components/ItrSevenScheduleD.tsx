import React from 'react';

interface DeemedApplicationDetail {
  description: string;
  amount: number;
  applicationType: string;
  applicationDate: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  beneficiaryPAN: string;
  purpose: string;
  isDeemedApplication: boolean;
  deemedApplicationReason: string;
  actualApplicationDate: string;
  actualApplicationAmount: number;
  differenceAmount: number;
  approvalDate: string;
  approvalAuthority: string;
  remarks: string;
}

interface ItrSevenScheduleDProps {
  deemedApplicationDetails: DeemedApplicationDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof DeemedApplicationDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleD: React.FC<ItrSevenScheduleDProps> = ({
  deemedApplicationDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const applicationTypes = [
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

  const purposes = [
    'Donation',
    'Grant',
    'Scholarship',
    'Medical Aid',
    'Relief Work',
    'Construction',
    'Equipment Purchase',
    'Research',
    'Training',
    'Other'
  ];

  const deemedApplicationReasons = [
    'Not Applied Within Time Limit',
    'Applied for Non-Charitable Purpose',
    'Applied Outside India',
    'Applied for Private Benefit',
    'Applied Without Approval',
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

  const calculateDifferenceAmount = (detail: DeemedApplicationDetail) => {
    return detail.amount - detail.actualApplicationAmount;
  };

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-teal-800 mb-2">Schedule D</h2>
        <p className="text-sm text-teal-700">
          Details of deemed application of income under clause (2) of Explanation 1 to sub-section (1) of section 11
        </p>
      </div>

      <div className="space-y-4">
        {deemedApplicationDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Deemed Application Detail {index + 1}</h3>
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
                  placeholder="Enter description of deemed application"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Type *
                </label>
                <select
                  value={detail.applicationType}
                  onChange={(e) => onUpdateDetail(index, 'applicationType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Application Type</option>
                  {applicationTypes.map(type => (
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Date *
                </label>
                <input
                  type="date"
                  value={detail.applicationDate}
                  onChange={(e) => onUpdateDetail(index, 'applicationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose
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
                  Is Deemed Application
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isDeemedApplication}
                    onChange={(e) => onUpdateDetail(index, 'isDeemedApplication', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Deemed Application</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  value={detail.beneficiaryName}
                  onChange={(e) => onUpdateDetail(index, 'beneficiaryName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter beneficiary name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beneficiary Address
                </label>
                <textarea
                  value={detail.beneficiaryAddress}
                  onChange={(e) => onUpdateDetail(index, 'beneficiaryAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter beneficiary address"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beneficiary PAN
                </label>
                <input
                  type="text"
                  value={detail.beneficiaryPAN}
                  onChange={(e) => onUpdateDetail(index, 'beneficiaryPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deemed Application Reason
                </label>
                <select
                  value={detail.deemedApplicationReason}
                  onChange={(e) => onUpdateDetail(index, 'deemedApplicationReason', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Reason</option>
                  {deemedApplicationReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Application Date
                </label>
                <input
                  type="date"
                  value={detail.actualApplicationDate}
                  onChange={(e) => onUpdateDetail(index, 'actualApplicationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Application Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.actualApplicationAmount}
                  onChange={(e) => onUpdateDetail(index, 'actualApplicationAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter actual application amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difference Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateDifferenceAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
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

            {/* Schedule D Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Schedule D Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.amount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Actual Application:</span>
                  <span className="ml-2 font-medium">₹{detail.actualApplicationAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Difference:</span>
                  <span className="ml-2 font-medium">₹{calculateDifferenceAmount(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Deemed Application:</span>
                  <span className="ml-2 font-medium">{detail.isDeemedApplication ? 'Yes' : 'No'}</span>
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
          Add Deemed Application Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule D Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Entries</div>
            <div className="text-lg font-bold text-teal-600">{deemedApplicationDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Amount</div>
            <div className="text-lg font-bold text-teal-600">
              ₹{deemedApplicationDetails.reduce((sum, detail) => sum + detail.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Actual Application</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{deemedApplicationDetails.reduce((sum, detail) => sum + detail.actualApplicationAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Difference</div>
            <div className="text-lg font-bold text-red-600">
              ₹{deemedApplicationDetails.reduce((sum, detail) => sum + calculateDifferenceAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Application Type Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Application Type Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Application Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {applicationTypes.map(type => {
                const count = deemedApplicationDetails.filter(detail => detail.applicationType === type).length;
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
            <h4 className="text-md font-semibold text-gray-700 mb-3">Purpose Distribution</h4>
            <div className="space-y-2 text-sm">
              {purposes.map(purpose => {
                const count = deemedApplicationDetails.filter(detail => detail.purpose === purpose).length;
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
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule D Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Schedule D:</strong> Details of deemed application of income under clause (2) of Explanation 1 to sub-section (1) of section 11</p>
          <p><strong>Deemed Application:</strong> Income deemed to be applied for charitable purposes</p>
          <p><strong>Time Limit:</strong> Income must be applied within specified time limit</p>
          <p><strong>Charitable Purpose:</strong> Must be applied for charitable or religious purposes</p>
          <p><strong>Approval:</strong> Approval from competent authority may be required</p>
          <p><strong>Compliance:</strong> Ensure compliance with section 11(1) of Income Tax Act</p>
          <p><strong>Documentation:</strong> Keep application details and approval letters</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSevenScheduleD;
