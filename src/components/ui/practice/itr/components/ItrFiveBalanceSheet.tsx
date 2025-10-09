import React from 'react';

interface BalanceSheetItem {
  item: string;
  category: string;
  currentYear: number;
  previousYear: number;
  change: number;
  percentageChange: number;
}

interface ItrFiveBalanceSheetProps {
  assets: BalanceSheetItem[];
  liabilities: BalanceSheetItem[];
  onAddAsset: () => void;
  onAddLiability: () => void;
  onRemoveAsset: (index: number) => void;
  onRemoveLiability: (index: number) => void;
  onUpdateAsset: (index: number, field: keyof BalanceSheetItem, value: string | number) => void;
  onUpdateLiability: (index: number, field: keyof BalanceSheetItem, value: string | number) => void;
}

const ItrFiveBalanceSheet: React.FC<ItrFiveBalanceSheetProps> = ({
  assets,
  liabilities,
  onAddAsset,
  onAddLiability,
  onRemoveAsset,
  onRemoveLiability,
  onUpdateAsset,
  onUpdateLiability
}) => {
  const assetCategories = [
    'Fixed Assets',
    'Current Assets',
    'Investments',
    'Loans and Advances',
    'Other Assets',
    'Intangible Assets',
    'Non-Current Assets'
  ];

  const liabilityCategories = [
    'Share Capital',
    'Reserves and Surplus',
    'Secured Loans',
    'Unsecured Loans',
    'Current Liabilities',
    'Provisions',
    'Other Liabilities',
    'Non-Current Liabilities'
  ];

  const calculateChange = (current: number, previous: number) => {
    return current - previous;
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const calculateTotalAssets = () => {
    return assets.reduce((sum, asset) => sum + asset.currentYear, 0);
  };

  const calculateTotalLiabilities = () => {
    return liabilities.reduce((sum, liability) => sum + liability.currentYear, 0);
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-800 mb-2">BALANCE_SHEET</h2>
        <p className="text-sm text-green-700">
          Balance sheet as on 31st day of March, 2025 or date of dissolution
        </p>
      </div>

      {/* Assets Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Assets</h3>
          <button
            type="button"
            onClick={onAddAsset}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Asset Item
          </button>
        </div>

        {assets.map((asset, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Asset {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveAsset(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Item *
                </label>
                <input
                  type="text"
                  value={asset.item}
                  onChange={(e) => onUpdateAsset(index, 'item', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter asset item"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={asset.category}
                  onChange={(e) => onUpdateAsset(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {assetCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Year (₹) *
                </label>
                <input
                  type="number"
                  value={asset.currentYear}
                  onChange={(e) => onUpdateAsset(index, 'currentYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Year (₹) *
                </label>
                <input
                  type="number"
                  value={asset.previousYear}
                  onChange={(e) => onUpdateAsset(index, 'previousYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter previous year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change (₹)
                </label>
                <input
                  type="number"
                  value={calculateChange(asset.currentYear, asset.previousYear)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % Change
                </label>
                <input
                  type="number"
                  value={calculatePercentageChange(asset.currentYear, asset.previousYear).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Liabilities Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Liabilities</h3>
          <button
            type="button"
            onClick={onAddLiability}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Liability Item
          </button>
        </div>

        {liabilities.map((liability, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Liability {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveLiability(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liability Item *
                </label>
                <input
                  type="text"
                  value={liability.item}
                  onChange={(e) => onUpdateLiability(index, 'item', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter liability item"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={liability.category}
                  onChange={(e) => onUpdateLiability(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {liabilityCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Year (₹) *
                </label>
                <input
                  type="number"
                  value={liability.currentYear}
                  onChange={(e) => onUpdateLiability(index, 'currentYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Year (₹) *
                </label>
                <input
                  type="number"
                  value={liability.previousYear}
                  onChange={(e) => onUpdateLiability(index, 'previousYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter previous year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change (₹)
                </label>
                <input
                  type="number"
                  value={calculateChange(liability.currentYear, liability.previousYear)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % Change
                </label>
                <input
                  type="number"
                  value={calculatePercentageChange(liability.currentYear, liability.previousYear).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Balance Sheet Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Balance Sheet Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Assets</div>
            <div className="text-lg font-bold text-green-600">₹{calculateTotalAssets().toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Liabilities</div>
            <div className="text-lg font-bold text-blue-600">₹{calculateTotalLiabilities().toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Net Worth</div>
            <div className="text-lg font-bold text-purple-600">₹{(calculateTotalAssets() - calculateTotalLiabilities()).toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Balance Check</div>
            <div className={`text-lg font-bold ${Math.abs(calculateTotalAssets() - calculateTotalLiabilities()) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(calculateTotalAssets() - calculateTotalLiabilities()) < 0.01 ? 'Balanced' : 'Not Balanced'}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assets Breakdown */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-green-800 mb-3">Assets Breakdown</h4>
          <div className="space-y-2 text-sm">
            {assetCategories.map(category => {
              const categoryTotal = assets
                .filter(asset => asset.category === category)
                .reduce((sum, asset) => sum + asset.currentYear, 0);
              return (
                <div key={category} className="flex justify-between">
                  <span className="text-green-700">{category}:</span>
                  <span className="font-medium">₹{categoryTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Liabilities Breakdown */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-blue-800 mb-3">Liabilities Breakdown</h4>
          <div className="space-y-2 text-sm">
            {liabilityCategories.map(category => {
              const categoryTotal = liabilities
                .filter(liability => liability.category === category)
                .reduce((sum, liability) => sum + liability.currentYear, 0);
              return (
                <div key={category} className="flex justify-between">
                  <span className="text-blue-700">{category}:</span>
                  <span className="font-medium">₹{categoryTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Balance Sheet Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Balance Sheet Date:</strong> As on 31st day of March, 2025 or date of dissolution</p>
          <p><strong>Assets:</strong> All assets owned by the firm/partnership</p>
          <p><strong>Liabilities:</strong> All liabilities owed by the firm/partnership</p>
          <p><strong>Balance Check:</strong> Total assets should equal total liabilities</p>
          <p><strong>Current Year:</strong> Values as on 31st March, 2025</p>
          <p><strong>Previous Year:</strong> Values as on 31st March, 2024</p>
          <p><strong>Change Analysis:</strong> Year-on-year comparison of assets and liabilities</p>
          <p><strong>Categories:</strong> Assets and liabilities are categorized for better analysis</p>
          <p><strong>Documentation:</strong> Keep supporting documents for all balance sheet items</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveBalanceSheet;
