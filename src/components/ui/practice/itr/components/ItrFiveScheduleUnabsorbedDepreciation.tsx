import React from 'react';

interface UnabsorbedDepreciationDetail {
  assetDescription: string;
  assetCode: string;
  assessmentYear: string;
  depreciationAmount: number;
  utilizedAmount: number;
  balanceAmount: number;
  assetCategory: string;
  assetType: string;
  purchaseDate: string;
  purchaseCost: number;
  depreciationRate: number;
  methodOfDepreciation: string;
  blockOfAssets: string;
  returnFiled: boolean;
  returnDate: string;
  acknowledgmentNumber: string;
  isAllowed: boolean;
  allowedAmount: number;
  disallowedAmount: number;
  disallowanceReason: string;
  utilizationDetails: string;
  remarks: string;
}

interface ItrFiveScheduleUnabsorbedDepreciationProps {
  unabsorbedDepreciationDetails: UnabsorbedDepreciationDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof UnabsorbedDepreciationDetail, value: string | number | boolean) => void;
}

const ItrFiveScheduleUnabsorbedDepreciation: React.FC<ItrFiveScheduleUnabsorbedDepreciationProps> = ({
  unabsorbedDepreciationDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const assetCategories = [
    'Building',
    'Machinery',
    'Plant',
    'Furniture',
    'Motor Vehicle',
    'Computer',
    'Software',
    'Office Equipment',
    'Other Assets'
  ];

  const assetTypes = [
    'Tangible Assets',
    'Intangible Assets',
    'Leasehold Improvements',
    'Computer Software',
    'Other'
  ];

  const depreciationMethods = [
    'Straight Line Method (SLM)',
    'Written Down Value Method (WDV)',
    'Unit of Production Method',
    'Sum of Years Digits Method',
    'Other'
  ];

  const blocksOfAssets = [
    'Building (5%)',
    'Building (10%)',
    'Building (20%)',
    'Furniture (10%)',
    'Furniture (15%)',
    'Motor Vehicle (15%)',
    'Motor Vehicle (30%)',
    'Computer (40%)',
    'Computer (60%)',
    'Software (60%)',
    'Machinery (15%)',
    'Machinery (30%)',
    'Plant (15%)',
    'Plant (30%)',
    'Other Assets'
  ];

  const calculateBalanceAmount = (detail: UnabsorbedDepreciationDetail) => {
    return detail.depreciationAmount - detail.utilizedAmount;
  };

  const calculateDisallowedAmount = (detail: UnabsorbedDepreciationDetail) => {
    return detail.depreciationAmount - detail.allowedAmount;
  };

  const calculateDepreciationRate = (block: string) => {
    const match = block.match(/\((\d+)%\)/);
    return match ? parseInt(match[1]) : 0;
  };

  const getDefaultDepreciationRate = (assetCategory: string) => {
    switch (assetCategory) {
      case 'Building':
        return 10;
      case 'Machinery':
        return 15;
      case 'Plant':
        return 15;
      case 'Furniture':
        return 10;
      case 'Motor Vehicle':
        return 15;
      case 'Computer':
        return 40;
      case 'Software':
        return 60;
      case 'Office Equipment':
        return 15;
      default:
        return 15;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-orange-800 mb-2">Schedule Unabsorbed Depreciation</h2>
        <p className="text-sm text-orange-700">
          Unabsorbed Depreciation from Previous Years
        </p>
      </div>

      <div className="space-y-4">
        {unabsorbedDepreciationDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Depreciation Detail {index + 1}</h3>
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
                  Asset Code
                </label>
                <input
                  type="text"
                  value={detail.assetCode}
                  onChange={(e) => onUpdateDetail(index, 'assetCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter asset code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Category *
                </label>
                <select
                  value={detail.assetCategory}
                  onChange={(e) => {
                    onUpdateDetail(index, 'assetCategory', e.target.value);
                    onUpdateDetail(index, 'depreciationRate', getDefaultDepreciationRate(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Asset Category</option>
                  {assetCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Type
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
                  Assessment Year *
                </label>
                <input
                  type="text"
                  value={detail.assessmentYear}
                  onChange={(e) => onUpdateDetail(index, 'assessmentYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2023-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={detail.purchaseDate}
                  onChange={(e) => onUpdateDetail(index, 'purchaseDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Cost (₹)
                </label>
                <input
                  type="number"
                  value={detail.purchaseCost}
                  onChange={(e) => onUpdateDetail(index, 'purchaseCost', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter purchase cost"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depreciation Rate (%)
                </label>
                <input
                  type="number"
                  value={detail.depreciationRate}
                  onChange={(e) => onUpdateDetail(index, 'depreciationRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter depreciation rate"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Method of Depreciation
                </label>
                <select
                  value={detail.methodOfDepreciation}
                  onChange={(e) => onUpdateDetail(index, 'methodOfDepreciation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Method</option>
                  {depreciationMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block of Assets
                </label>
                <select
                  value={detail.blockOfAssets}
                  onChange={(e) => {
                    onUpdateDetail(index, 'blockOfAssets', e.target.value);
                    onUpdateDetail(index, 'depreciationRate', calculateDepreciationRate(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Block of Assets</option>
                  {blocksOfAssets.map(block => (
                    <option key={block} value={block}>{block}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depreciation Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.depreciationAmount}
                  onChange={(e) => onUpdateDetail(index, 'depreciationAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter depreciation amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Utilized Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.utilizedAmount}
                  onChange={(e) => onUpdateDetail(index, 'utilizedAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter utilized amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateBalanceAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allowed Amount (₹)
                </label>
                <input
                  type="number"
                  value={detail.allowedAmount}
                  onChange={(e) => onUpdateDetail(index, 'allowedAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter allowed amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disallowed Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateDisallowedAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Filed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.returnFiled}
                    onChange={(e) => onUpdateDetail(index, 'returnFiled', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Return Filed</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={detail.returnDate}
                  onChange={(e) => onUpdateDetail(index, 'returnDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Acknowledgment Number
                </label>
                <input
                  type="text"
                  value={detail.acknowledgmentNumber}
                  onChange={(e) => onUpdateDetail(index, 'acknowledgmentNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter acknowledgment number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Allowed
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isAllowed}
                    onChange={(e) => onUpdateDetail(index, 'isAllowed', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Allowed</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disallowance Reason
                </label>
                <input
                  type="text"
                  value={detail.disallowanceReason}
                  onChange={(e) => onUpdateDetail(index, 'disallowanceReason', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter disallowance reason"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Utilization Details
                </label>
                <textarea
                  value={detail.utilizationDetails}
                  onChange={(e) => onUpdateDetail(index, 'utilizationDetails', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter utilization details"
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
                  placeholder="Enter any remarks"
                  rows={3}
                />
              </div>
            </div>

            {/* Unabsorbed Depreciation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Unabsorbed Depreciation Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Depreciation Amount:</span>
                  <span className="ml-2 font-medium">₹{detail.depreciationAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Utilized:</span>
                  <span className="ml-2 font-medium">₹{detail.utilizedAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Disallowed:</span>
                  <span className="ml-2 font-medium">₹{calculateDisallowedAmount(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Balance:</span>
                  <span className="ml-2 font-medium">₹{calculateBalanceAmount(detail).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Add Unabsorbed Depreciation Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Unabsorbed Depreciation Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Depreciation Entries</div>
            <div className="text-lg font-bold text-orange-600">{unabsorbedDepreciationDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Depreciation Amount</div>
            <div className="text-lg font-bold text-orange-600">
              ₹{unabsorbedDepreciationDetails.reduce((sum, detail) => sum + detail.depreciationAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Utilized</div>
            <div className="text-lg font-bold text-green-600">
              ₹{unabsorbedDepreciationDetails.reduce((sum, detail) => sum + detail.utilizedAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Balance</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{unabsorbedDepreciationDetails.reduce((sum, detail) => sum + calculateBalanceAmount(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Asset Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Asset Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Asset Category Distribution</h4>
            <div className="space-y-2 text-sm">
              {assetCategories.map(category => {
                const count = unabsorbedDepreciationDetails.filter(detail => detail.assetCategory === category).length;
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
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Depreciation Method Distribution</h4>
            <div className="space-y-2 text-sm">
              {depreciationMethods.map(method => {
                const count = unabsorbedDepreciationDetails.filter(detail => detail.methodOfDepreciation === method).length;
                if (count > 0) {
                  return (
                    <div key={method} className="flex justify-between">
                      <span className="text-gray-600">{method}:</span>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Unabsorbed Depreciation Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Unabsorbed Depreciation:</strong> Depreciation that could not be set off against income</p>
          <p><strong>Carry Forward:</strong> Can be carried forward indefinitely</p>
          <p><strong>Set Off:</strong> Can be set off against any income except salary</p>
          <p><strong>Priority:</strong> Depreciation has priority over business loss</p>
          <p><strong>Block of Assets:</strong> Assets grouped together for depreciation purposes</p>
          <p><strong>Depreciation Methods:</strong> SLM, WDV, Unit of Production, etc.</p>
          <p><strong>Rates:</strong> Different rates for different types of assets</p>
          <p><strong>Documentation:</strong> Keep asset purchase documents and depreciation calculations</p>
          <p><strong>Compliance:</strong> Ensure proper disclosure in tax returns</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleUnabsorbedDepreciation;
