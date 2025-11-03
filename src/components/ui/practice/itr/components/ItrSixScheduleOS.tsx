import React from 'react';

interface OtherSourceDetail {
  sourceDescription: string;
  sourceType: string;
  incomeAmount: number;
  taxDeducted: number;
  netAmount: number;
  payerName: string;
  payerPAN: string;
  paymentDate: string;
  isExempt: boolean;
  exemptionAmount: number;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  sourceCategory: string;
  incomeNature: string;
  paymentMode: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  chequeNumber: string;
  chequeDate: string;
  transactionId: string;
  referenceNumber: string;
  remarks: string;
}

interface ItrSixScheduleOSProps {
  otherSourceDetails: OtherSourceDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof OtherSourceDetail, value: string | number | boolean) => void;
}

const ItrSixScheduleOS: React.FC<ItrSixScheduleOSProps> = ({
  otherSourceDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const sourceTypes = [
    'Interest on Bank Deposits',
    'Interest on Fixed Deposits',
    'Interest on Recurring Deposits',
    'Interest on Savings Account',
    'Interest on Bonds',
    'Interest on Debentures',
    'Interest on Government Securities',
    'Interest on Company Deposits',
    'Interest on Post Office Deposits',
    'Interest on NSC',
    'Interest on PPF',
    'Interest on EPF',
    'Interest on Other Deposits',
    'Dividend Income',
    'Dividend from Mutual Funds',
    'Dividend from Shares',
    'Dividend from Units',
    'Rental Income',
    'Rental from Machinery',
    'Rental from Equipment',
    'Rental from Vehicles',
    'Rental from Other Assets',
    'Winnings from Lottery',
    'Winnings from Crossword Puzzles',
    'Winnings from Card Games',
    'Winnings from Other Games',
    'Winnings from Horse Races',
    'Winnings from Other Races',
    'Gifts Received',
    'Gifts from Relatives',
    'Gifts from Non-Relatives',
    'Gifts from Employers',
    'Gifts from Others',
    'Family Pension',
    'Pension from Government',
    'Pension from Private Sector',
    'Pension from Others',
    'Scholarship',
    'Scholarship from Government',
    'Scholarship from Private',
    'Scholarship from Others',
    'Awards and Prizes',
    'Awards from Government',
    'Awards from Private',
    'Awards from Others',
    'Other Income',
    'Other Receipts',
    'Miscellaneous Income'
  ];

  const sourceCategories = [
    'Interest Income',
    'Dividend Income',
    'Rental Income',
    'Winnings',
    'Gifts',
    'Pension',
    'Scholarship',
    'Awards',
    'Other Income',
    'Miscellaneous'
  ];

  const incomeNatures = [
    'Regular',
    'One Time',
    'Recurring',
    'Accrued',
    'Received',
    'Deferred',
    'Advance',
    'Other'
  ];

  const paymentModes = [
    'Cash',
    'Cheque',
    'Demand Draft',
    'NEFT',
    'RTGS',
    'IMPS',
    'UPI',
    'Credit Card',
    'Debit Card',
    'Net Banking',
    'Other'
  ];

  const calculateNetAmount = (detail: OtherSourceDetail) => {
    return detail.incomeAmount - detail.taxDeducted;
  };

  const calculateTaxableAmount = (detail: OtherSourceDetail) => {
    if (detail.isExempt) {
      return Math.max(0, detail.incomeAmount - detail.exemptionAmount);
    }
    return detail.incomeAmount;
  };

  const calculateTaxAmount = (detail: OtherSourceDetail) => {
    const taxableAmount = calculateTaxableAmount(detail);
    return (taxableAmount * detail.taxRate) / 100;
  };

  const getDefaultTaxRate = (sourceType: string) => {
    if (sourceType.includes('Interest')) {
      return 10; // 10% for interest income
    } else if (sourceType.includes('Dividend')) {
      return 10; // 10% for dividend income
    } else if (sourceType.includes('Winnings')) {
      return 30; // 30% for winnings
    } else if (sourceType.includes('Gifts')) {
      return 30; // 30% for gifts
    } else if (sourceType.includes('Pension')) {
      return 10; // 10% for pension
    } else {
      return 10; // Default 10%
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-pink-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-pink-800 mb-2">Schedule OS</h2>
        <p className="text-sm text-pink-700">
          Details of Income from Other Sources
        </p>
      </div>

      <div className="space-y-4">
        {otherSourceDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Other Source {index + 1}</h3>
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
                  Source Description *
                </label>
                <input
                  type="text"
                  value={detail.sourceDescription}
                  onChange={(e) => onUpdateDetail(index, 'sourceDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter source description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Type *
                </label>
                <select
                  value={detail.sourceType}
                  onChange={(e) => {
                    onUpdateDetail(index, 'sourceType', e.target.value);
                    onUpdateDetail(index, 'taxRate', getDefaultTaxRate(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Source Type</option>
                  {sourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source Category
                </label>
                <select
                  value={detail.sourceCategory}
                  onChange={(e) => onUpdateDetail(index, 'sourceCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Source Category</option>
                  {sourceCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Nature
                </label>
                <select
                  value={detail.incomeNature}
                  onChange={(e) => onUpdateDetail(index, 'incomeNature', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Income Nature</option>
                  {incomeNatures.map(nature => (
                    <option key={nature} value={nature}>{nature}</option>
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
                  Payer Name
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
                  Payer PAN
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
                  Payment Mode
                </label>
                <select
                  value={detail.paymentMode}
                  onChange={(e) => onUpdateDetail(index, 'paymentMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Payment Mode</option>
                  {paymentModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
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
                  Account Number
                </label>
                <input
                  type="text"
                  value={detail.accountNumber}
                  onChange={(e) => onUpdateDetail(index, 'accountNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={detail.ifscCode}
                  onChange={(e) => onUpdateDetail(index, 'ifscCode', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter IFSC code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cheque Number
                </label>
                <input
                  type="text"
                  value={detail.chequeNumber}
                  onChange={(e) => onUpdateDetail(index, 'chequeNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter cheque number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cheque Date
                </label>
                <input
                  type="date"
                  value={detail.chequeDate}
                  onChange={(e) => onUpdateDetail(index, 'chequeDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={detail.transactionId}
                  onChange={(e) => onUpdateDetail(index, 'transactionId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter transaction ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={detail.referenceNumber}
                  onChange={(e) => onUpdateDetail(index, 'referenceNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reference number"
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

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  value={detail.remarks}
                  onChange={(e) => onUpdateDetail(index, 'remarks', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any remarks or comments"
                  rows={3}
                />
              </div>
            </div>

            {/* Exemption Status */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Exemption Status</h4>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isExempt}
                    onChange={(e) => onUpdateDetail(index, 'isExempt', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Exempt Income</span>
                </label>
              </div>
            </div>

            {/* Other Source Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Other Source Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Income Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.incomeAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Tax Deducted:</span>
                  <span className="ml-2 font-medium">₹{detail.taxDeducted.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Exemption:</span>
                  <span className="ml-2 font-medium">₹{detail.exemptionAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Taxable Amount:</span>
                  <span className="ml-2 font-medium">₹{calculateTaxableAmount(detail).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Net Income from Other Sources:</span>
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
          className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Add Other Source Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule OS Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Sources</div>
            <div className="text-lg font-bold text-pink-600">{otherSourceDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Income</div>
            <div className="text-lg font-bold text-green-600">
              ₹{otherSourceDetails.reduce((sum, detail) => sum + detail.incomeAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Tax Deducted</div>
            <div className="text-lg font-bold text-red-600">
              ₹{otherSourceDetails.reduce((sum, detail) => sum + detail.taxDeducted, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Taxable Amount</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{otherSourceDetails.reduce((sum, detail) => sum + calculateTaxableAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Source Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Source Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Source Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {sourceTypes.map(type => {
                const count = otherSourceDetails.filter(detail => detail.sourceType === type).length;
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
            <h4 className="text-md font-semibold text-gray-700 mb-3">Payment Mode Distribution</h4>
            <div className="space-y-2 text-sm">
              {paymentModes.map(mode => {
                const count = otherSourceDetails.filter(detail => detail.paymentMode === mode).length;
                if (count > 0) {
                  return (
                    <div key={mode} className="flex justify-between">
                      <span className="text-gray-600">{mode}:</span>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule OS Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Other Sources:</strong> Income from sources other than salary, business, house property, and capital gains</p>
          <p><strong>Interest Income:</strong> Interest from bank deposits, fixed deposits, bonds, etc.</p>
          <p><strong>Dividend Income:</strong> Dividends from shares, mutual funds, and other investments</p>
          <p><strong>Rental Income:</strong> Income from renting out machinery, equipment, vehicles, etc.</p>
          <p><strong>Winnings:</strong> Winnings from lottery, crossword puzzles, card games, horse races, etc.</p>
          <p><strong>Gifts:</strong> Gifts received from relatives and non-relatives</p>
          <p><strong>Pension:</strong> Family pension and other pension income</p>
          <p><strong>Exemptions:</strong> Various exemptions available under different sections</p>
          <p><strong>Tax Rates:</strong> Different tax rates apply to different types of income</p>
          <p><strong>Payment Details:</strong> Complete payment information including bank details</p>
          <p><strong>Documentation:</strong> Keep certificates, receipts, and other supporting documents</p>
          <p><strong>Compliance:</strong> Ensure compliance with Companies Act and Income Tax Act</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixScheduleOS;
