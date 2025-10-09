import React from 'react';
import { ItrThreeFormData, ItrThreeFormErrors } from '../types/ItrThreeTypes';

interface ItrThreeTradingAccountProps {
  formData: ItrThreeFormData;
  errors: ItrThreeFormErrors;
  handleInputChange: (field: keyof ItrThreeFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrThreeFormData, index: number, subField: string, value: number) => void;
  addArrayItem: (field: keyof ItrThreeFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrThreeFormData, index: number) => void;
}

const ItrThreeTradingAccount: React.FC<ItrThreeTradingAccountProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Trading Account</h2>
      
      <div className="space-y-4">
        {formData.tradingAccountDetails.map((trading, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Stock
                </label>
                <input
                  type="number"
                  value={trading.openingStock}
                  onChange={(e) => handleArrayFieldChange('tradingAccountDetails', index, 'openingStock', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchases
                </label>
                <input
                  type="number"
                  value={trading.purchases}
                  onChange={(e) => handleArrayFieldChange('tradingAccountDetails', index, 'purchases', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direct Expenses
                </label>
                <input
                  type="number"
                  value={trading.directExpenses}
                  onChange={(e) => handleArrayFieldChange('tradingAccountDetails', index, 'directExpenses', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Stock
                </label>
                <input
                  type="number"
                  value={trading.closingStock}
                  onChange={(e) => handleArrayFieldChange('tradingAccountDetails', index, 'closingStock', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sales
                </label>
                <input
                  type="number"
                  value={trading.sales}
                  onChange={(e) => handleArrayFieldChange('tradingAccountDetails', index, 'sales', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Profit
                </label>
                <input
                  type="number"
                  value={trading.grossProfit}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Loss
                </label>
                <input
                  type="number"
                  value={trading.grossLoss}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('tradingAccountDetails', index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove Trading Account
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('tradingAccountDetails', {
            openingStock: 0,
            purchases: 0,
            directExpenses: 0,
            closingStock: 0,
            sales: 0,
            grossProfit: 0,
            grossLoss: 0
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Trading Account
        </button>
      </div>
    </div>
  );
};

export default ItrThreeTradingAccount;
