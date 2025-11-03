import React from 'react';

interface InvestmentDetail {
  investmentDescription: string;
  investmentType: string;
  investmentAmount: number;
  investmentDate: string;
  maturityDate: string;
  interestRate: number;
  interestAmount: number;
  totalValue: number;
  issuerName: string;
  issuerPAN: string;
  issuerAddress: string;
  investmentCategory: string;
  isRedeemed: boolean;
  redemptionDate: string;
  redemptionAmount: number;
  profitLoss: number;
  remarks: string;
}

interface ItrSevenScheduleJProps {
  investmentDetails: InvestmentDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof InvestmentDetail, value: string | number | boolean) => void;
}

const ItrSevenScheduleJ: React.FC<ItrSevenScheduleJProps> = ({
  investmentDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const investmentTypes = [
    'Fixed Deposit',
    'Recurring Deposit',
    'Savings Account',
    'Current Account',
    'Government Securities',
    'Corporate Bonds',
    'Debentures',
    'Mutual Funds',
    'Equity Shares',
    'Preference Shares',
    'Units of UTI',
    'NSC',
    'PPF',
    'EPF',
    'Other'
  ];

  const investmentCategories = [
    'Bank Deposits',
    'Government Securities',
    'Corporate Securities',
    'Mutual Funds',
    'Equity Investments',
    'Debt Instruments',
    'Other'
  ];

  const calculateTotalValue = (detail: InvestmentDetail) => {
    return detail.investmentAmount + detail.interestAmount;
  };

  const calculateProfitLoss = (detail: InvestmentDetail) => {
    if (detail.isRedeemed) {
      return detail.redemptionAmount - detail.investmentAmount;
    }
    return 0;
  };

  const calculateInterestAmount = (detail: InvestmentDetail) => {
    if (detail.investmentDate && detail.maturityDate) {
      const startDate = new Date(detail.investmentDate);
      const endDate = new Date(detail.maturityDate);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = diffDays / 365;
      return (detail.investmentAmount * detail.interestRate * years) / 100;
    }
    return 0;
  };

  const getDefaultInterestRate = (investmentType: string) => {
    switch (investmentType) {
      case 'Fixed Deposit':
        return 7.5;
      case 'Recurring Deposit':
        return 7.0;
      case 'Savings Account':
        return 4.0;
      case 'Current Account':
        return 0;
      case 'Government Securities':
        return 6.5;
      case 'Corporate Bonds':
        return 8.0;
      case 'Debentures':
        return 8.5;
      case 'Mutual Funds':
        return 12.0;
      case 'Equity Shares':
        return 15.0;
      case 'Preference Shares':
        return 9.0;
      case 'Units of UTI':
        return 10.0;
      case 'NSC':
        return 7.0;
      case 'PPF':
        return 7.1;
      case 'EPF':
        return 8.5;
      default:
        return 7.0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-cyan-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-cyan-800 mb-2">Schedule J</h2>
        <p className="text-sm text-cyan-700">
          Details Of Investment Of Funds
        </p>
      </div>

      <div className="space-y-4">
        {investmentDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Investment Detail {index + 1}</h3>
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
                  Investment Description *
                </label>
                <input
                  type="text"
                  value={detail.investmentDescription}
                  onChange={(e) => onUpdateDetail(index, 'investmentDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter investment description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Type *
                </label>
                <select
                  value={detail.investmentType}
                  onChange={(e) => {
                    onUpdateDetail(index, 'investmentType', e.target.value);
                    onUpdateDetail(index, 'interestRate', getDefaultInterestRate(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Investment Type</option>
                  {investmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Category
                </label>
                <select
                  value={detail.investmentCategory}
                  onChange={(e) => onUpdateDetail(index, 'investmentCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Investment Category</option>
                  {investmentCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.investmentAmount}
                  onChange={(e) => onUpdateDetail(index, 'investmentAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter investment amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Date *
                </label>
                <input
                  type="date"
                  value={detail.investmentDate}
                  onChange={(e) => onUpdateDetail(index, 'investmentDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maturity Date
                </label>
                <input
                  type="date"
                  value={detail.maturityDate}
                  onChange={(e) => onUpdateDetail(index, 'maturityDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={detail.interestRate}
                  onChange={(e) => onUpdateDetail(index, 'interestRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interest rate"
                  step="0.01"
                  min="0"
                  max="100"
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
                  Total Value (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalValue(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer Name
                </label>
                <input
                  type="text"
                  value={detail.issuerName}
                  onChange={(e) => onUpdateDetail(index, 'issuerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter issuer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer PAN
                </label>
                <input
                  type="text"
                  value={detail.issuerPAN}
                  onChange={(e) => onUpdateDetail(index, 'issuerPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer Address
                </label>
                <textarea
                  value={detail.issuerAddress}
                  onChange={(e) => onUpdateDetail(index, 'issuerAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter issuer address"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Redeemed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isRedeemed}
                    onChange={(e) => onUpdateDetail(index, 'isRedeemed', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Redeemed</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Redemption Date
                </label>
                <input
                  type="date"
                  value={detail.redemptionDate}
                  onChange={(e) => onUpdateDetail(index, 'redemptionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Redemption Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.redemptionAmount}
                  onChange={(e) => onUpdateDetail(index, 'redemptionAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter redemption amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profit/Loss (₹)
                </label>
                <input
                  type="number"
                  value={calculateProfitLoss(detail)}
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
                  rows={3}
                />
              </div>
            </div>

            {/* Schedule J Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Schedule J Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Investment Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.investmentAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Interest Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.interestAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Value:</span>
                  <span className="ml-2 font-medium">₹{calculateTotalValue(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Profit/Loss:</span>
                  <span className={`ml-2 font-medium ${calculateProfitLoss(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{calculateProfitLoss(detail).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
        >
          Add Investment Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule J Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Investments</div>
            <div className="text-lg font-bold text-cyan-600">{investmentDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Investment Amount</div>
            <div className="text-lg font-bold text-cyan-600">
              ₹{investmentDetails.reduce((sum, detail) => sum + detail.investmentAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Interest</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{investmentDetails.reduce((sum, detail) => sum + detail.interestAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Value</div>
            <div className="text-lg font-bold text-green-600">
              ₹{investmentDetails.reduce((sum, detail) => sum + calculateTotalValue(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Investment Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Investment Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {investmentTypes.map(type => {
                const count = investmentDetails.filter(detail => detail.investmentType === type).length;
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
            <h4 className="text-md font-semibold text-gray-700 mb-3">Investment Category Distribution</h4>
            <div className="space-y-2 text-sm">
              {investmentCategories.map(category => {
                const count = investmentDetails.filter(detail => detail.investmentCategory === category).length;
                if (count > 0) {
                  return (
                    <div key={category} className="flex justify-between">
                      <span className="text-gray-600">{category}:</span>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule J Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Schedule J:</strong> Details Of Investment Of Funds</p>
          <p><strong>Investment Types:</strong> Various types of investments made by the trust/institution</p>
          <p><strong>Interest Income:</strong> Interest earned on investments</p>
          <p><strong>Redemption:</strong> Redemption of investments and profit/loss thereon</p>
          <p><strong>Compliance:</strong> Ensure compliance with investment guidelines</p>
          <p><strong>Documentation:</strong> Keep investment certificates and statements</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSevenScheduleJ;
