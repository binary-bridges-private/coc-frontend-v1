import React from 'react';

interface PartnershipFirmDetail {
  firmName: string;
  firmPAN: string;
  firmAddress: string;
  partnershipDeedDate: string;
  registrationNumber: string;
  partnerName: string;
  partnerPAN: string;
  partnerShare: number;
  partnerRemuneration: number;
  partnerInterest: number;
  firmIncome: number;
  shareOfIncome: number;
  taxDeducted: number;
}

interface ItrFiveScheduleIFProps {
  partnershipFirmDetails: PartnershipFirmDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof PartnershipFirmDetail, value: string | number) => void;
}

const ItrFiveScheduleIF: React.FC<ItrFiveScheduleIFProps> = ({
  partnershipFirmDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const calculateShareOfIncome = (detail: PartnershipFirmDetail) => {
    return (detail.firmIncome * detail.partnerShare) / 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-violet-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-violet-800 mb-2">Schedule IF</h2>
        <p className="text-sm text-violet-700">
          Information regarding partnership firms in which you are partner
        </p>
      </div>

      <div className="space-y-4">
        {partnershipFirmDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Partnership Firm {index + 1}</h3>
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
                  Firm Name *
                </label>
                <input
                  type="text"
                  value={detail.firmName}
                  onChange={(e) => onUpdateDetail(index, 'firmName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter firm name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firm PAN *
                </label>
                <input
                  type="text"
                  value={detail.firmPAN}
                  onChange={(e) => onUpdateDetail(index, 'firmPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firm Address *
                </label>
                <textarea
                  value={detail.firmAddress}
                  onChange={(e) => onUpdateDetail(index, 'firmAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete firm address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Deed Date *
                </label>
                <input
                  type="date"
                  value={detail.partnershipDeedDate}
                  onChange={(e) => onUpdateDetail(index, 'partnershipDeedDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={detail.registrationNumber}
                  onChange={(e) => onUpdateDetail(index, 'registrationNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={detail.partnerName}
                  onChange={(e) => onUpdateDetail(index, 'partnerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter partner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner PAN *
                </label>
                <input
                  type="text"
                  value={detail.partnerPAN}
                  onChange={(e) => onUpdateDetail(index, 'partnerPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Share (%) *
                </label>
                <input
                  type="number"
                  value={detail.partnerShare}
                  onChange={(e) => onUpdateDetail(index, 'partnerShare', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter share percentage"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Remuneration (₹)
                </label>
                <input
                  type="number"
                  value={detail.partnerRemuneration}
                  onChange={(e) => onUpdateDetail(index, 'partnerRemuneration', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter remuneration"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Interest (₹)
                </label>
                <input
                  type="number"
                  value={detail.partnerInterest}
                  onChange={(e) => onUpdateDetail(index, 'partnerInterest', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interest"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firm Income (₹) *
                </label>
                <input
                  type="number"
                  value={detail.firmIncome}
                  onChange={(e) => onUpdateDetail(index, 'firmIncome', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter firm income"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share of Income (₹)
                </label>
                <input
                  type="number"
                  value={calculateShareOfIncome(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Deducted (₹)
                </label>
                <input
                  type="number"
                  value={detail.taxDeducted}
                  onChange={(e) => onUpdateDetail(index, 'taxDeducted', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tax deducted"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Partnership Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Partner Share:</span>
                  <span className="ml-2 font-medium">{detail.partnerShare}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Firm Income:</span>
                  <span className="ml-2 font-medium">₹{detail.firmIncome.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Share of Income:</span>
                  <span className="ml-2 font-medium">₹{calculateShareOfIncome(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Tax Deducted:</span>
                  <span className="ml-2 font-medium">₹{detail.taxDeducted.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Net Share of Income:</span>
                  <span className="text-sm font-bold text-green-600">
                    ₹{(calculateShareOfIncome(detail) - detail.taxDeducted).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
        >
          Add Partnership Firm Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Partnership Firm Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Firms</div>
            <div className="text-lg font-bold text-violet-600">{partnershipFirmDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Firm Income</div>
            <div className="text-lg font-bold text-green-600">
              ₹{partnershipFirmDetails.reduce((sum, detail) => sum + detail.firmIncome, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Share of Income</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{partnershipFirmDetails.reduce((sum, detail) => sum + calculateShareOfIncome(detail), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Tax Deducted</div>
            <div className="text-lg font-bold text-red-600">
              ₹{partnershipFirmDetails.reduce((sum, detail) => sum + detail.taxDeducted, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule IF Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Partnership Deed:</strong> Partnership deed should be registered and dated</p>
          <p><strong>Partner Share:</strong> Share percentage in the partnership firm</p>
          <p><strong>Remuneration:</strong> Salary/remuneration received as partner</p>
          <p><strong>Interest:</strong> Interest on capital contribution to the firm</p>
          <p><strong>Share of Income:</strong> Partner's share in the firm's profit/loss</p>
          <p><strong>Tax Deduction:</strong> TDS deducted by the firm on partner's income</p>
          <p><strong>Form 16A:</strong> TDS certificate should be obtained from the firm</p>
          <p><strong>Firm Return:</strong> Firm should file its return of income</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleIF;
