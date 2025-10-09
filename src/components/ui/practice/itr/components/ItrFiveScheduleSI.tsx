import React from 'react';

interface SpecialIncomeDetail {
  section: string;
  description: string;
  grossAmount: number;
  taxRate: number;
  taxAmount: number;
  tdsDeducted: number;
  netAmount: number;
  payerName: string;
  payerPAN: string;
  paymentDate: string;
}

interface ItrFiveScheduleSIProps {
  specialIncomeDetails: SpecialIncomeDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof SpecialIncomeDetail, value: string | number) => void;
}

const ItrFiveScheduleSI: React.FC<ItrFiveScheduleSIProps> = ({
  specialIncomeDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const specialRateSections = [
    '194A - Interest other than interest on securities',
    '194B - Winnings from lottery or crossword puzzle',
    '194BB - Winnings from horse race',
    '194C - Payment to contractors',
    '194D - Insurance commission',
    '194E - Payment to non-resident sportsmen',
    '194F - Repurchase of units by Mutual Fund',
    '194G - Commission on sale of lottery tickets',
    '194H - Commission or brokerage',
    '194I - Rent',
    '194IA - Transfer of immovable property',
    '194IB - Rent by individual or HUF',
    '194IC - Payment under Joint Development Agreement',
    '194J - Fees for professional or technical services',
    '194K - Income from units',
    '194L - Payment of compensation on acquisition of capital asset',
    '194LA - Payment of compensation on acquisition of certain immovable property',
    '194LB - Income by way of interest from infrastructure debt fund',
    '194LC - Income by way of interest from Indian company',
    '194LD - Income by way of interest from infrastructure company',
    '194LBA - Income from units of business trust',
    '194LBB - Income from units of investment fund',
    '194LBC - Income from investment in securitisation trust',
    '194M - Payment to resident contractor or professional',
    '194N - Cash withdrawal',
    '194O - Payment for goods or services by e-commerce operator',
    '194P - Payment of salary to senior citizen',
    '194Q - Purchase of goods',
    '194R - Benefit or perquisite',
    '194S - Transfer of virtual digital asset',
    '194T - Commission or remuneration',
    '194U - Payment for goods or services',
    '194V - Payment for goods or services',
    '194W - Payment for goods or services',
    '194X - Payment for goods or services',
    '194Y - Payment for goods or services',
    '194Z - Payment for goods or services',
    'Other'
  ];

  const calculateTaxAmount = (detail: SpecialIncomeDetail) => {
    return (detail.grossAmount * detail.taxRate) / 100;
  };

  const calculateNetAmount = (detail: SpecialIncomeDetail) => {
    return detail.grossAmount - detail.taxAmount - detail.tdsDeducted;
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-amber-800 mb-2">Schedule SI</h2>
        <p className="text-sm text-amber-700">
          Income chargeable to Income tax at special rates
        </p>
      </div>

      <div className="space-y-4">
        {specialIncomeDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Special Income {index + 1}</h3>
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
                  {specialRateSections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={detail.description}
                  onChange={(e) => onUpdateDetail(index, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.grossAmount}
                  onChange={(e) => onUpdateDetail(index, 'grossAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter gross amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%) *
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
                  value={calculateTaxAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TDS Deducted (₹)
                </label>
                <input
                  type="number"
                  value={detail.tdsDeducted}
                  onChange={(e) => onUpdateDetail(index, 'tdsDeducted', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter TDS deducted"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateNetAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payer Name *
                </label>
                <input
                  type="text"
                  value={detail.payerName}
                  onChange={(e) => onUpdateDetail(index, 'payerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter payer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payer PAN *
                </label>
                <input
                  type="text"
                  value={detail.payerPAN}
                  onChange={(e) => onUpdateDetail(index, 'payerPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Date *
                </label>
                <input
                  type="date"
                  value={detail.paymentDate}
                  onChange={(e) => onUpdateDetail(index, 'paymentDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Special Income Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Gross Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.grossAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Tax Rate:</span>
                  <span className="ml-2 font-medium">{detail.taxRate}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Tax Amount:</span>
                  <span className="ml-2 font-medium">₹{calculateTaxAmount(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">TDS Deducted:</span>
                  <span className="ml-2 font-medium">₹{detail.tdsDeducted.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Net Amount:</span>
                  <span className="text-sm font-bold text-green-600">
                    ₹{calculateNetAmount(detail).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Add Special Income Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Special Income Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Special Incomes</div>
            <div className="text-lg font-bold text-amber-600">{specialIncomeDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Gross Amount</div>
            <div className="text-lg font-bold text-green-600">
              ₹{specialIncomeDetails.reduce((sum, detail) => sum + detail.grossAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Tax Amount</div>
            <div className="text-lg font-bold text-red-600">
              ₹{specialIncomeDetails.reduce((sum, detail) => sum + calculateTaxAmount(detail), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total TDS Deducted</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{specialIncomeDetails.reduce((sum, detail) => sum + detail.tdsDeducted, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule SI Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Special Rates:</strong> Income taxed at rates different from normal tax rates</p>
          <p><strong>TDS Sections:</strong> Various sections under which TDS is deducted</p>
          <p><strong>Form 16A:</strong> TDS certificate should be obtained from the deductor</p>
          <p><strong>Tax Credit:</strong> TDS deducted can be claimed as tax credit</p>
          <p><strong>Higher Rate:</strong> Some incomes are taxed at higher rates</p>
          <p><strong>Lower Rate:</strong> Some incomes are taxed at lower rates</p>
          <p><strong>Exemption Limit:</strong> Some sections have exemption limits</p>
          <p><strong>Documentation:</strong> Keep all TDS certificates and payment receipts</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleSI;
