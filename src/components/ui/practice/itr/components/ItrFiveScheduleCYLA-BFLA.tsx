import React from 'react';

interface LossDetail {
  assessmentYear: string;
  lossType: string;
  lossAmount: number;
  setOffAmount: number;
  balanceLoss: number;
  sourceOfLoss: string;
}

interface ItrFiveScheduleCYLA-BFLAProps {
  currentYearLosses: LossDetail[];
  broughtForwardLosses: LossDetail[];
  onAddCurrentYearLoss: () => void;
  onAddBroughtForwardLoss: () => void;
  onRemoveCurrentYearLoss: (index: number) => void;
  onRemoveBroughtForwardLoss: (index: number) => void;
  onUpdateCurrentYearLoss: (index: number, field: keyof LossDetail, value: string | number) => void;
  onUpdateBroughtForwardLoss: (index: number, field: keyof LossDetail, value: string | number) => void;
}

const ItrFiveScheduleCYLA-BFLA: React.FC<ItrFiveScheduleCYLA-BFLAProps> = ({
  currentYearLosses,
  broughtForwardLosses,
  onAddCurrentYearLoss,
  onAddBroughtForwardLoss,
  onRemoveCurrentYearLoss,
  onRemoveBroughtForwardLoss,
  onUpdateCurrentYearLoss,
  onUpdateBroughtForwardLoss
}) => {
  const lossTypes = [
    'Business Loss',
    'Speculation Loss',
    'Capital Loss (Short-term)',
    'Capital Loss (Long-term)',
    'House Property Loss',
    'Other Sources Loss'
  ];

  const sourcesOfLoss = [
    'Business/Profession',
    'Speculation Business',
    'Short-term Capital Gains',
    'Long-term Capital Gains',
    'House Property',
    'Other Sources'
  ];

  const calculateBalanceLoss = (loss: LossDetail) => {
    return loss.lossAmount - loss.setOffAmount;
  };

  return (
    <div className="space-y-8">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-orange-800 mb-2">Schedule CYLA-BFLA</h2>
        <p className="text-sm text-orange-700">
          Details of Income after Set off of Current year losses & Brought Forward Losses of earlier years
        </p>
      </div>

      {/* Current Year Losses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Current Year Losses</h3>
          <button
            type="button"
            onClick={onAddCurrentYearLoss}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Current Year Loss
          </button>
        </div>

        {currentYearLosses.map((loss, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Loss {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveCurrentYearLoss(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Year *
                </label>
                <input
                  type="text"
                  value={loss.assessmentYear}
                  onChange={(e) => onUpdateCurrentYearLoss(index, 'assessmentYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2024-25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Type *
                </label>
                <select
                  value={loss.lossType}
                  onChange={(e) => onUpdateCurrentYearLoss(index, 'lossType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Loss Type</option>
                  {lossTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source of Loss *
                </label>
                <select
                  value={loss.sourceOfLoss}
                  onChange={(e) => onUpdateCurrentYearLoss(index, 'sourceOfLoss', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Source</option>
                  {sourcesOfLoss.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Amount (₹) *
                </label>
                <input
                  type="number"
                  value={loss.lossAmount}
                  onChange={(e) => onUpdateCurrentYearLoss(index, 'lossAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter loss amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Off Amount (₹)
                </label>
                <input
                  type="number"
                  value={loss.setOffAmount}
                  onChange={(e) => onUpdateCurrentYearLoss(index, 'setOffAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter set off amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Loss (₹)
                </label>
                <input
                  type="number"
                  value={calculateBalanceLoss(loss)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Brought Forward Losses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Brought Forward Losses</h3>
          <button
            type="button"
            onClick={onAddBroughtForwardLoss}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Brought Forward Loss
          </button>
        </div>

        {broughtForwardLosses.map((loss, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Loss {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveBroughtForwardLoss(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Year *
                </label>
                <input
                  type="text"
                  value={loss.assessmentYear}
                  onChange={(e) => onUpdateBroughtForwardLoss(index, 'assessmentYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2023-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Type *
                </label>
                <select
                  value={loss.lossType}
                  onChange={(e) => onUpdateBroughtForwardLoss(index, 'lossType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Loss Type</option>
                  {lossTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source of Loss *
                </label>
                <select
                  value={loss.sourceOfLoss}
                  onChange={(e) => onUpdateBroughtForwardLoss(index, 'sourceOfLoss', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Source</option>
                  {sourcesOfLoss.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loss Amount (₹) *
                </label>
                <input
                  type="number"
                  value={loss.lossAmount}
                  onChange={(e) => onUpdateBroughtForwardLoss(index, 'lossAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter loss amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Off Amount (₹)
                </label>
                <input
                  type="number"
                  value={loss.setOffAmount}
                  onChange={(e) => onUpdateBroughtForwardLoss(index, 'setOffAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter set off amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Loss (₹)
                </label>
                <input
                  type="number"
                  value={calculateBalanceLoss(loss)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Loss Set-off Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Current Year Losses</div>
            <div className="text-lg font-bold text-red-600">
              ₹{currentYearLosses.reduce((sum, loss) => sum + loss.lossAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Brought Forward Losses</div>
            <div className="text-lg font-bold text-red-600">
              ₹{broughtForwardLosses.reduce((sum, loss) => sum + loss.lossAmount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Set-off Amount</div>
            <div className="text-lg font-bold text-green-600">
              ₹{(currentYearLosses.reduce((sum, loss) => sum + loss.setOffAmount, 0) + 
                  broughtForwardLosses.reduce((sum, loss) => sum + loss.setOffAmount, 0)).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Balance Losses</div>
            <div className="text-lg font-bold text-orange-600">
              ₹{(currentYearLosses.reduce((sum, loss) => sum + calculateBalanceLoss(loss), 0) + 
                  broughtForwardLosses.reduce((sum, loss) => sum + calculateBalanceLoss(loss), 0)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule CYLA-BFLA Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Current Year Losses:</strong> Losses incurred in the current assessment year</p>
          <p><strong>Brought Forward Losses:</strong> Unabsorbed losses from previous assessment years</p>
          <p><strong>Set-off Rules:</strong> Business losses can be set off against any income in the same year</p>
          <p><strong>Speculation Losses:</strong> Can only be set off against speculation gains</p>
          <p><strong>Capital Losses:</strong> Short-term can be set off against any gains, long-term only against long-term gains</p>
          <p><strong>Carry Forward:</strong> Unabsorbed losses can be carried forward for 8 years (business) or indefinitely (capital)</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleCYLA-BFLA;
