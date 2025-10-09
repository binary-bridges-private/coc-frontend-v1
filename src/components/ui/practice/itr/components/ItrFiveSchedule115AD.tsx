import React from 'react';

interface Schedule115ADDetail {
  shareDescription: string;
  companyName: string;
  isin: string;
  dateOfPurchase: string;
  dateOfSale: string;
  purchasePrice: number;
  salePrice: number;
  quantity: number;
  expensesOnTransfer: number;
  indexedCostOfAcquisition: number;
  indexedCostOfImprovement: number;
  capitalGain: number;
  capitalLoss: number;
  holdingPeriod: string;
  isLongTerm: boolean;
  taxRate: number;
  taxAmount: number;
  exchangeName: string;
  brokerName: string;
  brokerPAN: string;
  dematAccount: string;
  dpId: string;
  clientId: string;
  transactionType: string;
  settlementDate: string;
  sttPaid: number;
  otherCharges: number;
}

interface ItrFiveSchedule115ADProps {
  schedule115ADDetails: Schedule115ADDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof Schedule115ADDetail, value: string | number | boolean) => void;
}

const ItrFiveSchedule115AD: React.FC<ItrFiveSchedule115ADProps> = ({
  schedule115ADDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const exchanges = [
    'BSE',
    'NSE',
    'BSE SME',
    'NSE SME',
    'Other'
  ];

  const transactionTypes = [
    'Buy',
    'Sell',
    'Transfer',
    'Gift',
    'Inheritance',
    'Other'
  ];

  const calculateHoldingPeriod = (purchaseDate: string, saleDate: string) => {
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const diffTime = Math.abs(sale.getTime() - purchase.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateIsLongTerm = (purchaseDate: string, saleDate: string) => {
    const days = calculateHoldingPeriod(purchaseDate, saleDate);
    return days >= 365; // 12 months for equity shares
  };

  const calculateCapitalGain = (detail: Schedule115ADDetail) => {
    const netSaleConsideration = detail.salePrice - detail.expensesOnTransfer;
    const totalCost = detail.indexedCostOfAcquisition + detail.indexedCostOfImprovement;
    return netSaleConsideration - totalCost;
  };

  const calculateTaxRate = (detail: Schedule115ADDetail) => {
    if (detail.isLongTerm) {
      return 10; // 10% for long-term capital gains on equity shares
    } else {
      return 15; // 15% for short-term capital gains
    }
  };

  const calculateTaxAmount = (detail: Schedule115ADDetail) => {
    const gain = calculateCapitalGain(detail);
    if (gain > 0) {
      return (gain * detail.taxRate) / 100;
    }
    return 0;
  };

  const calculateTotalCharges = (detail: Schedule115ADDetail) => {
    return detail.sttPaid + detail.otherCharges;
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-indigo-800 mb-2">Schedule 115AD(1)(iii)(p)</h2>
        <p className="text-sm text-indigo-700">
          For NON-RESIDENTS - From sale of equity share in a company or unit of equity oriented fund or unit of a business trust on which STT is paid under section 112A
        </p>
      </div>

      <div className="space-y-4">
        {schedule115ADDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Transaction {index + 1}</h3>
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
                  Share Description *
                </label>
                <input
                  type="text"
                  value={detail.shareDescription}
                  onChange={(e) => onUpdateDetail(index, 'shareDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter share description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={detail.companyName}
                  onChange={(e) => onUpdateDetail(index, 'companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISIN *
                </label>
                <input
                  type="text"
                  value={detail.isin}
                  onChange={(e) => onUpdateDetail(index, 'isin', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ISIN"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exchange Name
                </label>
                <select
                  value={detail.exchangeName}
                  onChange={(e) => onUpdateDetail(index, 'exchangeName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Exchange</option>
                  {exchanges.map(exchange => (
                    <option key={exchange} value={exchange}>{exchange}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Type
                </label>
                <select
                  value={detail.transactionType}
                  onChange={(e) => onUpdateDetail(index, 'transactionType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Transaction Type</option>
                  {transactionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Purchase *
                </label>
                <input
                  type="date"
                  value={detail.dateOfPurchase}
                  onChange={(e) => onUpdateDetail(index, 'dateOfPurchase', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Sale *
                </label>
                <input
                  type="date"
                  value={detail.dateOfSale}
                  onChange={(e) => onUpdateDetail(index, 'dateOfSale', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Settlement Date
                </label>
                <input
                  type="date"
                  value={detail.settlementDate}
                  onChange={(e) => onUpdateDetail(index, 'settlementDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  value={detail.quantity}
                  onChange={(e) => onUpdateDetail(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price per Share (₹) *
                </label>
                <input
                  type="number"
                  value={detail.purchasePrice}
                  onChange={(e) => onUpdateDetail(index, 'purchasePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter purchase price per share"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price per Share (₹) *
                </label>
                <input
                  type="number"
                  value={detail.salePrice}
                  onChange={(e) => onUpdateDetail(index, 'salePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sale price per share"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Purchase Value (₹)
                </label>
                <input
                  type="number"
                  value={detail.purchasePrice * detail.quantity}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Sale Value (₹)
                </label>
                <input
                  type="number"
                  value={detail.salePrice * detail.quantity}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expenses on Transfer (₹)
                </label>
                <input
                  type="number"
                  value={detail.expensesOnTransfer}
                  onChange={(e) => onUpdateDetail(index, 'expensesOnTransfer', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter transfer expenses"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  STT Paid (₹)
                </label>
                <input
                  type="number"
                  value={detail.sttPaid}
                  onChange={(e) => onUpdateDetail(index, 'sttPaid', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter STT paid"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Charges (₹)
                </label>
                <input
                  type="number"
                  value={detail.otherCharges}
                  onChange={(e) => onUpdateDetail(index, 'otherCharges', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter other charges"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indexed Cost of Acquisition (₹)
                </label>
                <input
                  type="number"
                  value={detail.indexedCostOfAcquisition}
                  onChange={(e) => onUpdateDetail(index, 'indexedCostOfAcquisition', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter indexed cost"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indexed Cost of Improvement (₹)
                </label>
                <input
                  type="number"
                  value={detail.indexedCostOfImprovement}
                  onChange={(e) => onUpdateDetail(index, 'indexedCostOfImprovement', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter indexed improvement cost"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Broker Name
                </label>
                <input
                  type="text"
                  value={detail.brokerName}
                  onChange={(e) => onUpdateDetail(index, 'brokerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter broker name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Broker PAN
                </label>
                <input
                  type="text"
                  value={detail.brokerPAN}
                  onChange={(e) => onUpdateDetail(index, 'brokerPAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Demat Account
                </label>
                <input
                  type="text"
                  value={detail.dematAccount}
                  onChange={(e) => onUpdateDetail(index, 'dematAccount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter demat account"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DP ID
                </label>
                <input
                  type="text"
                  value={detail.dpId}
                  onChange={(e) => onUpdateDetail(index, 'dpId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter DP ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  value={detail.clientId}
                  onChange={(e) => onUpdateDetail(index, 'clientId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Holding Period (Days)
                </label>
                <input
                  type="number"
                  value={calculateHoldingPeriod(detail.dateOfPurchase, detail.dateOfSale)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Long Term
                </label>
                <input
                  type="checkbox"
                  checked={calculateIsLongTerm(detail.dateOfPurchase, detail.dateOfSale)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={calculateTaxRate(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capital Gain/Loss (₹)
                </label>
                <input
                  type="number"
                  value={calculateCapitalGain(detail)}
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
            </div>

            {/* Schedule 115AD Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Schedule 115AD Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Sale Value:</span>
                  <span className="ml-2 font-medium">₹{(detail.salePrice * detail.quantity).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Transfer Expenses:</span>
                  <span className="ml-2 font-medium">₹{detail.expensesOnTransfer.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: STT Paid:</span>
                  <span className="ml-2 font-medium">₹{detail.sttPaid.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Other Charges:</span>
                  <span className="ml-2 font-medium">₹{detail.otherCharges.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Net Sale Consideration:</span>
                    <span className="ml-2 font-medium">₹{((detail.salePrice * detail.quantity) - detail.expensesOnTransfer - calculateTotalCharges(detail)).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="ml-2 font-medium">₹{(detail.indexedCostOfAcquisition + detail.indexedCostOfImprovement).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Capital Gain/Loss:</span>
                    <span className={`ml-2 font-bold ${calculateCapitalGain(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{calculateCapitalGain(detail).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tax Amount:</span>
                    <span className="ml-2 font-medium">₹{calculateTaxAmount(detail).toLocaleString()}</span>
                  </div>
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
          Add Schedule 115AD Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule 115AD Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Transactions</div>
            <div className="text-lg font-bold text-indigo-600">{schedule115ADDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Sale Value</div>
            <div className="text-lg font-bold text-green-600">
              ₹{schedule115ADDetails.reduce((sum, detail) => sum + (detail.salePrice * detail.quantity), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Capital Gains</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{schedule115ADDetails.reduce((sum, detail) => sum + Math.max(0, calculateCapitalGain(detail)), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Tax Amount</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{schedule115ADDetails.reduce((sum, detail) => sum + calculateTaxAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Exchange Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Exchange Distribution</h4>
            <div className="space-y-2 text-sm">
              {exchanges.map(exchange => {
                const count = schedule115ADDetails.filter(detail => detail.exchangeName === exchange).length;
                if (count > 0) {
                  return (
                    <div key={exchange} className="flex justify-between">
                      <span className="text-gray-600">{exchange}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Transaction Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {transactionTypes.map(type => {
                const count = schedule115ADDetails.filter(detail => detail.transactionType === type).length;
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
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule 115AD Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Schedule 115AD:</strong> For NON-RESIDENTS - From sale of equity share in a company or unit of equity oriented fund or unit of a business trust on which STT is paid under section 112A</p>
          <p><strong>Long-term Capital Gains:</strong> Gains from equity shares held for more than 12 months</p>
          <p><strong>Short-term Capital Gains:</strong> Gains from equity shares held for less than 12 months</p>
          <p><strong>Tax Rates:</strong> 10% for LTCG, 15% for STCG on equity shares</p>
          <p><strong>STT:</strong> Securities Transaction Tax paid on transactions</p>
          <p><strong>Indexation:</strong> Cost inflation index adjustment for long-term gains</p>
          <p><strong>Exemptions:</strong> Various exemptions available under sections 54, 54B, 54D, 54EC, 54F</p>
          <p><strong>Holding Period:</strong> 12 months for equity shares</p>
          <p><strong>Expenses:</strong> Expenses on transfer are deductible</p>
          <p><strong>Demat Account:</strong> Dematerialized account details</p>
          <p><strong>Broker Information:</strong> Broker name and PAN details</p>
          <p><strong>Documentation:</strong> Keep purchase/sale documents and broker statements</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveSchedule115AD;
