import React from 'react';

interface CapitalGainDetail {
  assetDescription: string;
  assetType: string;
  dateOfPurchase: string;
  dateOfSale: string;
  purchasePrice: number;
  salePrice: number;
  expensesOnTransfer: number;
  indexedCostOfAcquisition: number;
  indexedCostOfImprovement: number;
  capitalGain: number;
  capitalLoss: number;
  holdingPeriod: string;
  isLongTerm: boolean;
  taxRate: number;
  taxAmount: number;
}

interface ItrFiveScheduleCGProps {
  capitalGainDetails: CapitalGainDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof CapitalGainDetail, value: string | number | boolean) => void;
}

const ItrFiveScheduleCG: React.FC<ItrFiveScheduleCGProps> = ({
  capitalGainDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const assetTypes = [
    'Land',
    'Building',
    'House Property',
    'Shares',
    'Mutual Funds',
    'Bonds',
    'Gold',
    'Silver',
    'Jewellery',
    'Art',
    'Antiques',
    'Other'
  ];

  const holdingPeriods = [
    'Less than 12 months',
    '12 months or more',
    '24 months or more',
    '36 months or more'
  ];

  const calculateHoldingPeriod = (purchaseDate: string, saleDate: string) => {
    const purchase = new Date(purchaseDate);
    const sale = new Date(saleDate);
    const diffTime = Math.abs(sale.getTime() - purchase.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateIsLongTerm = (purchaseDate: string, saleDate: string, assetType: string) => {
    const days = calculateHoldingPeriod(purchaseDate, saleDate);
    if (assetType === 'Land' || assetType === 'Building' || assetType === 'House Property') {
      return days >= 730; // 24 months for immovable property
    } else {
      return days >= 365; // 12 months for other assets
    }
  };

  const calculateCapitalGain = (detail: CapitalGainDetail) => {
    const netSaleConsideration = detail.salePrice - detail.expensesOnTransfer;
    const totalCost = detail.indexedCostOfAcquisition + detail.indexedCostOfImprovement;
    return netSaleConsideration - totalCost;
  };

  const calculateTaxRate = (detail: CapitalGainDetail) => {
    if (detail.isLongTerm) {
      if (detail.assetType === 'Land' || detail.assetType === 'Building' || detail.assetType === 'House Property') {
        return 20; // 20% for long-term capital gains on immovable property
      } else {
        return 10; // 10% for long-term capital gains on other assets
      }
    } else {
      return 15; // 15% for short-term capital gains
    }
  };

  const calculateTaxAmount = (detail: CapitalGainDetail) => {
    const gain = calculateCapitalGain(detail);
    if (gain > 0) {
      return (gain * detail.taxRate) / 100;
    }
    return 0;
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-indigo-800 mb-2">Schedule CG</h2>
        <p className="text-sm text-indigo-700">
          Details of Income from Capital Gains
        </p>
      </div>

      <div className="space-y-4">
        {capitalGainDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Capital Gain {index + 1}</h3>
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
                  Asset Description *
                </label>
                <input
                  type="text"
                  value={detail.assetDescription}
                  onChange={(e) => onUpdateDetail(index, 'assetDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter asset description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Type *
                </label>
                <select
                  value={detail.assetType}
                  onChange={(e) => onUpdateDetail(index, 'assetType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Asset Type</option>
                  {assetTypes.map(type => (
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
                  Purchase Price (₹) *
                </label>
                <input
                  type="number"
                  value={detail.purchasePrice}
                  onChange={(e) => onUpdateDetail(index, 'purchasePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter purchase price"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price (₹) *
                </label>
                <input
                  type="number"
                  value={detail.salePrice}
                  onChange={(e) => onUpdateDetail(index, 'salePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sale price"
                  step="0.01"
                  min="0"
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
                  checked={calculateIsLongTerm(detail.dateOfPurchase, detail.dateOfSale, detail.assetType)}
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

            {/* Capital Gain Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Capital Gain Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Sale Price:</span>
                  <span className="ml-2 font-medium">₹{detail.salePrice.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Transfer Expenses:</span>
                  <span className="ml-2 font-medium">₹{detail.expensesOnTransfer.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Net Sale Consideration:</span>
                  <span className="ml-2 font-medium">₹{(detail.salePrice - detail.expensesOnTransfer).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="ml-2 font-medium">₹{(detail.indexedCostOfAcquisition + detail.indexedCostOfImprovement).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Capital Gain/Loss:</span>
                  <span className={`text-sm font-bold ${calculateCapitalGain(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{calculateCapitalGain(detail).toLocaleString()}
                  </span>
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
          Add Capital Gain Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule CG Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Transactions</div>
            <div className="text-lg font-bold text-indigo-600">{capitalGainDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Sale Value</div>
            <div className="text-lg font-bold text-green-600">
              ₹{capitalGainDetails.reduce((sum, detail) => sum + detail.salePrice, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Capital Gains</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{capitalGainDetails.reduce((sum, detail) => sum + Math.max(0, calculateCapitalGain(detail)), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Tax Amount</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{capitalGainDetails.reduce((sum, detail) => sum + calculateTaxAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule CG Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Capital Gains:</strong> Gains from sale of capital assets</p>
          <p><strong>Long-term Capital Gains:</strong> Gains from assets held for more than 12/24 months</p>
          <p><strong>Short-term Capital Gains:</strong> Gains from assets held for less than 12/24 months</p>
          <p><strong>Indexation:</strong> Cost inflation index adjustment for long-term gains</p>
          <p><strong>Tax Rates:</strong> 20% for LTCG on immovable property, 10% for LTCG on other assets, 15% for STCG</p>
          <p><strong>Exemptions:</strong> Various exemptions available under sections 54, 54B, 54D, 54EC, 54F</p>
          <p><strong>Holding Period:</strong> 12 months for shares, mutual funds; 24 months for immovable property</p>
          <p><strong>Expenses:</strong> Expenses on transfer are deductible</p>
          <p><strong>Documentation:</strong> Keep purchase/sale documents and improvement receipts</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleCG;
