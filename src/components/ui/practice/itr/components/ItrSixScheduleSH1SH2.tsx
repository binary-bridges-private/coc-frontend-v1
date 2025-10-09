import React from 'react';

interface ShareholderDetail {
  shareholderName: string;
  shareholderPAN: string;
  shareholderAddress: string;
  shareholdingPercent: number;
  numberOfShares: number;
  faceValue: number;
  paidUpValue: number;
  shareholderType: string;
  isPromoter: boolean;
  isDirector: boolean;
  votingRights: number;
  dividendRights: number;
}

interface ItrSixScheduleSH1-SH2Props {
  shareholderDetails: ShareholderDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof ShareholderDetail, value: string | number | boolean) => void;
  companyType: string;
  onUpdateCompanyType: (type: string) => void;
}

const ItrSixScheduleSH1-SH2: React.FC<ItrSixScheduleSH1-SH2Props> = ({
  shareholderDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail,
  companyType,
  onUpdateCompanyType
}) => {
  const shareholderTypes = [
    'Individual',
    'HUF',
    'Company',
    'Partnership Firm',
    'LLP',
    'Trust',
    'Society',
    'Foreign Company',
    'Foreign Individual',
    'Other'
  ];

  const companyTypes = [
    'Unlisted Company (Other than Start-up)',
    'Start-up Company'
  ];

  const calculateTotalShareholding = () => {
    return shareholderDetails.reduce((sum, detail) => sum + detail.shareholdingPercent, 0);
  };

  const calculateTotalShares = () => {
    return shareholderDetails.reduce((sum, detail) => sum + detail.numberOfShares, 0);
  };

  const calculateTotalPaidUpValue = () => {
    return shareholderDetails.reduce((sum, detail) => sum + (detail.numberOfShares * detail.paidUpValue), 0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-indigo-800 mb-2">Schedule SH1-SH2</h2>
        <p className="text-sm text-indigo-700">
          Shareholding of unlisted company (other than a start-up for which Schedule SH-2 is to be filled up)
        </p>
      </div>

      {/* Company Type Selection */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyTypes.map(type => (
            <label key={type} className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="companyType"
                value={type}
                checked={companyType === type}
                onChange={(e) => onUpdateCompanyType(e.target.value)}
                className="mr-3"
              />
              <span className="text-sm font-medium text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {shareholderDetails.map((shareholder, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Shareholder {index + 1}</h3>
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
                  Shareholder Name *
                </label>
                <input
                  type="text"
                  value={shareholder.shareholderName}
                  onChange={(e) => onUpdateDetail(index, 'shareholderName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter shareholder name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholder PAN *
                </label>
                <input
                  type="text"
                  value={shareholder.shareholderPAN}
                  onChange={(e) => onUpdateDetail(index, 'shareholderPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholder Address *
                </label>
                <textarea
                  value={shareholder.shareholderAddress}
                  onChange={(e) => onUpdateDetail(index, 'shareholderAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholder Type *
                </label>
                <select
                  value={shareholder.shareholderType}
                  onChange={(e) => onUpdateDetail(index, 'shareholderType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {shareholderTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholding Percentage (%) *
                </label>
                <input
                  type="number"
                  value={shareholder.shareholdingPercent}
                  onChange={(e) => onUpdateDetail(index, 'shareholdingPercent', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter percentage"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Shares *
                </label>
                <input
                  type="number"
                  value={shareholder.numberOfShares}
                  onChange={(e) => onUpdateDetail(index, 'numberOfShares', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of shares"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Face Value per Share (₹) *
                </label>
                <input
                  type="number"
                  value={shareholder.faceValue}
                  onChange={(e) => onUpdateDetail(index, 'faceValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter face value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paid Up Value per Share (₹) *
                </label>
                <input
                  type="number"
                  value={shareholder.paidUpValue}
                  onChange={(e) => onUpdateDetail(index, 'paidUpValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter paid up value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voting Rights (%)
                </label>
                <input
                  type="number"
                  value={shareholder.votingRights}
                  onChange={(e) => onUpdateDetail(index, 'votingRights', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter voting rights"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dividend Rights (%)
                </label>
                <input
                  type="number"
                  value={shareholder.dividendRights}
                  onChange={(e) => onUpdateDetail(index, 'dividendRights', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter dividend rights"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div className="md:col-span-3">
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isPromoter}
                      onChange={(e) => onUpdateDetail(index, 'isPromoter', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Is Promoter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isDirector}
                      onChange={(e) => onUpdateDetail(index, 'isDirector', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Is Director</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Shareholder Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Shareholder Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Shareholding:</span>
                  <span className="ml-2 font-medium">{shareholder.shareholdingPercent}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Number of Shares:</span>
                  <span className="ml-2 font-medium">{shareholder.numberOfShares.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Paid Up Value:</span>
                  <span className="ml-2 font-medium">₹{(shareholder.numberOfShares * shareholder.paidUpValue).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Voting Rights:</span>
                  <span className="ml-2 font-medium">{shareholder.votingRights}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Shareholder Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Shareholding Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Shareholders</div>
            <div className="text-lg font-bold text-indigo-600">{shareholderDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Shareholding</div>
            <div className="text-lg font-bold text-green-600">{calculateTotalShareholding().toFixed(2)}%</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Shares</div>
            <div className="text-lg font-bold text-blue-600">{calculateTotalShares().toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Paid Up Value</div>
            <div className="text-lg font-bold text-purple-600">₹{calculateTotalPaidUpValue().toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule SH1-SH2 Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Schedule SH1:</strong> For unlisted companies other than start-ups</p>
          <p><strong>Schedule SH2:</strong> For start-up companies</p>
          <p><strong>Shareholding Pattern:</strong> Details of all shareholders holding shares in the company</p>
          <p><strong>Promoter Shareholding:</strong> Shares held by promoters of the company</p>
          <p><strong>Public Shareholding:</strong> Shares held by public shareholders</p>
          <p><strong>Voting Rights:</strong> Percentage of voting rights held by each shareholder</p>
          <p><strong>Dividend Rights:</strong> Rights to receive dividends</p>
          <p><strong>Face Value:</strong> Nominal value of shares as per Memorandum of Association</p>
          <p><strong>Paid Up Value:</strong> Amount actually paid by shareholders</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixScheduleSH1-SH2;
