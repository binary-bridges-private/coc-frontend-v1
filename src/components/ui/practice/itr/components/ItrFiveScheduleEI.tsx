import React from 'react';

interface ExemptIncomeDetail {
  section: string;
  description: string;
  amount: number;
  exemptionType: string;
  remarks: string;
}

interface ItrFiveScheduleEIProps {
  exemptIncomeDetails: ExemptIncomeDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof ExemptIncomeDetail, value: string | number) => void;
}

const ItrFiveScheduleEI: React.FC<ItrFiveScheduleEIProps> = ({
  exemptIncomeDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const exemptionTypes = [
    'Agricultural Income',
    'Dividend Income',
    'Long-term Capital Gains',
    'Interest on PPF',
    'Interest on NSC',
    'Interest on Tax-free Bonds',
    'Scholarship',
    'Pension',
    'Gratuity',
    'Leave Encashment',
    'Other Exempt Income'
  ];

  const commonSections = [
    '10(1) - Agricultural Income',
    '10(10) - Gratuity',
    '10(10AA) - Leave Encashment',
    '10(11) - Interest on PPF',
    '10(12) - Interest on NSC',
    '10(15) - Interest on Tax-free Bonds',
    '10(16) - Scholarship',
    '10(17) - Allowances',
    '10(26) - Income of Scheduled Tribes',
    '54 - Capital Gains Exemption',
    '54B - Capital Gains Exemption',
    '54D - Capital Gains Exemption',
    '54EC - Capital Gains Exemption',
    '54F - Capital Gains Exemption',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Schedule EI</h2>
        <p className="text-sm text-emerald-700">
          Details of Exempt Income
        </p>
      </div>

      <div className="space-y-4">
        {exemptIncomeDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Exempt Income {index + 1}</h3>
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
                  Section *
                </label>
                <select
                  value={detail.section}
                  onChange={(e) => onUpdateDetail(index, 'section', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  {commonSections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption Type *
                </label>
                <select
                  value={detail.exemptionType}
                  onChange={(e) => onUpdateDetail(index, 'exemptionType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Exemption Type</option>
                  {exemptionTypes.map(type => (
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
                  placeholder="Enter exempt amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={detail.description}
                  onChange={(e) => onUpdateDetail(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter detailed description of exempt income"
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
                  placeholder="Enter any additional remarks"
                  rows={2}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Exempt Income Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Section:</span>
                  <span className="ml-2 font-medium">{detail.section}</span>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{detail.exemptionType}</span>
                </div>
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="ml-2 font-medium text-green-600">₹{detail.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Add Exempt Income Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Exempt Income Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Exempt Incomes</div>
            <div className="text-lg font-bold text-emerald-600">{exemptIncomeDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Exempt Amount</div>
            <div className="text-lg font-bold text-green-600">
              ₹{exemptIncomeDetails.reduce((sum, detail) => sum + detail.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Average Amount</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{exemptIncomeDetails.length > 0 ? 
                (exemptIncomeDetails.reduce((sum, detail) => sum + detail.amount, 0) / exemptIncomeDetails.length).toLocaleString() : 
                '0'}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Exemption Types</div>
            <div className="text-lg font-bold text-purple-600">
              {new Set(exemptIncomeDetails.map(detail => detail.exemptionType)).size}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule EI Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Agricultural Income:</strong> Income from agricultural operations is exempt under section 10(1)</p>
          <p><strong>Dividend Income:</strong> Dividend income is exempt up to ₹10 lakhs under section 10(34)</p>
          <p><strong>Long-term Capital Gains:</strong> LTCG on equity shares exempt up to ₹1 lakh under section 112A</p>
          <p><strong>PPF Interest:</strong> Interest on Public Provident Fund is exempt under section 10(11)</p>
          <p><strong>NSC Interest:</strong> Interest on National Savings Certificate is exempt under section 10(12)</p>
          <p><strong>Tax-free Bonds:</strong> Interest on specified tax-free bonds is exempt under section 10(15)</p>
          <p><strong>Scholarship:</strong> Scholarship income is exempt under section 10(16)</p>
          <p><strong>Gratuity:</strong> Gratuity received is exempt up to specified limits under section 10(10)</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleEI;
