import React from 'react';

interface VDADetail {
  assetType: string;
  assetName: string;
  dateOfPurchase: string;
  dateOfSale: string;
  purchasePrice: number;
  salePrice: number;
  expensesOnTransfer: number;
  capitalGain: number;
  capitalLoss: number;
}

interface ItrFiveScheduleVDAProps {
  vdaDetails: VDADetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof VDADetail, value: string | number) => void;
}

const ItrFiveScheduleVDA: React.FC<ItrFiveScheduleVDAProps> = ({
  vdaDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const assetTypes = [
    'Cryptocurrency',
    'NFT (Non-Fungible Token)',
    'Digital Token',
    'Virtual Currency',
    'Other Virtual Digital Asset'
  ];

  const calculateCapitalGain = (detail: VDADetail) => {
    const netGain = detail.salePrice - detail.purchasePrice - detail.expensesOnTransfer;
    return netGain;
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-purple-800 mb-2">Schedule VDA</h2>
        <p className="text-sm text-purple-700">
          Income from transfer of Virtual Digital Assets
        </p>
      </div>

      <div className="space-y-4">
        {vdaDetails.map((detail, index) => (
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Name/Description *
                </label>
                <input
                  type="text"
                  value={detail.assetName}
                  onChange={(e) => onUpdateDetail(index, 'assetName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bitcoin, Ethereum, NFT #1234"
                />
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
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Calculation Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Sale Price:</span>
                  <span className="ml-2 font-medium">₹{detail.salePrice.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Purchase Price:</span>
                  <span className="ml-2 font-medium">₹{detail.purchasePrice.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Transfer Expenses:</span>
                  <span className="ml-2 font-medium">₹{detail.expensesOnTransfer.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Net Gain/Loss:</span>
                  <span className={`ml-2 font-medium ${calculateCapitalGain(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add VDA Transaction
        </button>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-red-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Schedule VDA Information</h3>
        <div className="space-y-2 text-sm text-red-700">
          <p><strong>Tax Rate:</strong> 30% on capital gains from VDA transfers</p>
          <p><strong>No Indexation:</strong> Indexation benefit is not available for VDA</p>
          <p><strong>No Exemption:</strong> No exemption limit for VDA gains</p>
          <p><strong>TDS:</strong> 1% TDS applicable on VDA transfers above ₹50,000</p>
          <p><strong>Definition:</strong> VDA includes cryptocurrency, NFT, digital tokens, and other virtual digital assets</p>
          <p><strong>Effective Date:</strong> Applicable from April 1, 2022</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleVDA;
