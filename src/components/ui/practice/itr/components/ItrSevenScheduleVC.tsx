import React from 'react';

interface VoluntaryContributionDetail {
  contributorName: string;
  contributorPAN: string;
  contributorAddress: string;
  contributionAmount: number;
  contributionDate: string;
  contributionMode: string;
  contributionType: string;
  isCorpus: boolean;
  purpose: string;
  remarks: string;
}

interface ItrSevenScheduleVCProps {
  voluntaryContributionDetails: VoluntaryContributionDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof VoluntaryContributionDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleVC: React.FC<ItrSevenScheduleVCProps> = ({
  voluntaryContributionDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const contributionModes = [
    'Cash',
    'Cheque',
    'Demand Draft',
    'NEFT',
    'RTGS',
    'IMPS',
    'UPI',
    'Other'
  ];

  const contributionTypes = [
    'Donation',
    'Grant',
    'Subscription',
    'Membership Fee',
    'Other'
  ];

  const purposes = [
    'Charitable Purpose',
    'Religious Purpose',
    'Educational Purpose',
    'Medical Relief',
    'Relief of the Poor',
    'Social Welfare',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-800 mb-2">Schedule VC</h2>
        <p className="text-sm text-green-700">
          Voluntary Contributions
        </p>
      </div>

      <div className="space-y-4">
        {voluntaryContributionDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Contribution {index + 1}</h3>
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
                  Contributor Name *
                </label>
                <input
                  type="text"
                  value={detail.contributorName}
                  onChange={(e) => onUpdateDetail(index, 'contributorName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contributor name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contributor PAN
                </label>
                <input
                  type="text"
                  value={detail.contributorPAN}
                  onChange={(e) => onUpdateDetail(index, 'contributorPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.contributionAmount}
                  onChange={(e) => onUpdateDetail(index, 'contributionAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contribution amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Date *
                </label>
                <input
                  type="date"
                  value={detail.contributionDate}
                  onChange={(e) => onUpdateDetail(index, 'contributionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Mode
                </label>
                <select
                  value={detail.contributionMode}
                  onChange={(e) => onUpdateDetail(index, 'contributionMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Mode</option>
                  {contributionModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Type
                </label>
                <select
                  value={detail.contributionType}
                  onChange={(e) => onUpdateDetail(index, 'contributionType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {contributionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Corpus
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isCorpus}
                    onChange={(e) => onUpdateDetail(index, 'isCorpus', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Corpus</span>
                </div>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contributor Address
                </label>
                <textarea
                  value={detail.contributorAddress}
                  onChange={(e) => onUpdateDetail(index, 'contributorAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contributor address"
                  rows={2}
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
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Voluntary Contribution
        </button>
      </div>
    </div>
  );
};

export default ItrSevenScheduleVC;
