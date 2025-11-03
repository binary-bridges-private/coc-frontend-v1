import React from 'react';

interface CharitableApplicationDetail {
  applicationDescription: string;
  applicationType: string;
  applicationAmount: number;
  applicationDate: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  beneficiaryPAN: string;
  purpose: string;
  isRevenueApplication: boolean;
  approvalDate: string;
  approvalAuthority: string;
  remarks: string;
}

interface ItrSevenScheduleERProps {
  charitableApplicationDetails: CharitableApplicationDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof CharitableApplicationDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleER: React.FC<ItrSevenScheduleERProps> = ({
  charitableApplicationDetails,
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

  const approvalAuthorities = [
    'Commissioner of Income Tax',
    'Chief Commissioner of Income Tax',
    'Director General of Income Tax',
    'CBDT',
    'State Government',
    'Central Government',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-orange-800 mb-2">Schedule ER</h2>
        <p className="text-sm text-orange-700">
          Amount applied to charitable or religious purposes in India during the previous year - Revenue Account
        </p>
      </div>

      <div className="space-y-4">
        {charitableApplicationDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Application Detail {index + 1}</h3>
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
                  Application Description *
                </label>
                <input
                  type="text"
                  value={detail.applicationDescription}
                  onChange={(e) => onUpdateDetail(index, 'applicationDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter application description"
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
                  Application Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.applicationAmount}
                  onChange={(e) => onUpdateDetail(index, 'applicationAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter application amount"
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
                  Is Revenue Application
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isRevenueApplication}
                    onChange={(e) => onUpdateDetail(index, 'isRevenueApplication', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Revenue Application</span>
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
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Add Charitable Application Detail
        </button>
      </div>
    </div>
  );
};

export default ItrSevenScheduleER;
