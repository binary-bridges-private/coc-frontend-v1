import React from 'react';

interface AggregateIncomeDetail {
  incomeDescription: string;
  incomeType: string;
  incomeAmount: number;
  incomeDate: string;
  sourceName: string;
  sourcePAN: string;
  sourceAddress: string;
  isExempt: boolean;
  exemptionSection: string;
  exemptionAmount: number;
  taxableAmount: number;
  remarks: string;
}

interface ItrSevenScheduleAIProps {
  aggregateIncomeDetails: AggregateIncomeDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof AggregateIncomeDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleAI: React.FC<ItrSevenScheduleAIProps> = ({
  aggregateIncomeDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const incomeTypes = [
    'Interest Income',
    'Dividend Income',
    'Rental Income',
    'Capital Gains',
    'Business Income',
    'Professional Income',
    'Other Income'
  ];

  const exemptionSections = [
    'Section 10(1)',
    'Section 10(2)',
    'Section 10(3)',
    'Section 10(4)',
    'Section 10(5)',
    'Section 10(6)',
    'Section 10(7)',
    'Section 10(8)',
    'Section 10(9)',
    'Section 10(10)',
    'Section 10(11)',
    'Section 10(12)',
    'Section 10(13)',
    'Section 10(14)',
    'Section 10(15)',
    'Section 10(16)',
    'Section 10(17)',
    'Section 10(18)',
    'Section 10(19)',
    'Section 10(20)',
    'Section 10(21)',
    'Section 10(22)',
    'Section 10(23)',
    'Section 10(24)',
    'Section 10(25)',
    'Section 10(26)',
    'Section 10(27)',
    'Section 10(28)',
    'Section 10(29)',
    'Section 10(30)',
    'Section 10(31)',
    'Section 10(32)',
    'Section 10(33)',
    'Section 10(34)',
    'Section 10(35)',
    'Section 10(36)',
    'Section 10(37)',
    'Section 10(38)',
    'Section 10(39)',
    'Section 10(40)',
    'Section 10(41)',
    'Section 10(42)',
    'Section 10(43)',
    'Section 10(44)',
    'Section 10(45)',
    'Section 10(46)',
    'Section 10(47)',
    'Section 10(48)',
    'Section 10(49)',
    'Section 10(50)',
    'Other'
  ];

  const calculateTaxableAmount = (detail: AggregateIncomeDetail) => {
    if (detail.isExempt) {
      return Math.max(0, detail.incomeAmount - detail.exemptionAmount);
    }
    return detail.incomeAmount;
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Schedule AI</h2>
        <p className="text-sm text-blue-700">
          Aggregate of income referred to in section u/s 11 and 12 derived during the previous year excluding Voluntary contribution forming part of corpus as per section 11(1)(d) and voluntary contributions
        </p>
      </div>

      <div className="space-y-4">
        {aggregateIncomeDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Income Detail {index + 1}</h3>
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
                  Income Description *
                </label>
                <input
                  type="text"
                  value={detail.incomeDescription}
                  onChange={(e) => onUpdateDetail(index, 'incomeDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter income description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Type *
                </label>
                <select
                  value={detail.incomeType}
                  onChange={(e) => onUpdateDetail(index, 'incomeType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Income Type</option>
                  {incomeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                  Income Date *
                </label>
                <input
                  type="date"
                  value={detail.incomeDate}
                  onChange={(e) => onUpdateDetail(index, 'incomeDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Name
                </label>
                <input
                  type="text"
                  value={detail.sourceName}
                  onChange={(e) => onUpdateDetail(index, 'sourceName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter source name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source PAN
                </label>
                <input
                  type="text"
                  value={detail.sourcePAN}
                  onChange={(e) => onUpdateDetail(index, 'sourcePAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Address
                </label>
                <textarea
                  value={detail.sourceAddress}
                  onChange={(e) => onUpdateDetail(index, 'sourceAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter source address"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Exempt
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isExempt}
                    onChange={(e) => onUpdateDetail(index, 'isExempt', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Exempt</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption Section
                </label>
                <select
                  value={detail.exemptionSection}
                  onChange={(e) => onUpdateDetail(index, 'exemptionSection', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Exemption Section</option>
                  {exemptionSections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.exemptionAmount}
                  onChange={(e) => onUpdateDetail(index, 'exemptionAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter exemption amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxable Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateTaxableAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Income Detail
        </button>
      </div>
    </div>
  );
};

export default ItrSevenScheduleAI;
