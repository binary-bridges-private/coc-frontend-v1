import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoForeignAssetsProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrTwoFormData, index: number, subField: string, value: string | number) => void;
  addArrayItem: (field: keyof ItrTwoFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrTwoFormData, index: number) => void;
}

const ItrTwoForeignAssets: React.FC<ItrTwoForeignAssetsProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule FA - Foreign Assets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foreign Bank Accounts
          </label>
          <input
            type="text"
            value={formData.foreignBankAccounts}
            onChange={(e) => handleInputChange('foreignBankAccounts', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foreign Deposits
          </label>
          <input
            type="text"
            value={formData.foreignDeposits}
            onChange={(e) => handleInputChange('foreignDeposits', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foreign Immovable Property
          </label>
          <input
            type="text"
            value={formData.foreignImmovableProperty}
            onChange={(e) => handleInputChange('foreignImmovableProperty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foreign Trusts
          </label>
          <input
            type="text"
            value={formData.foreignTrusts}
            onChange={(e) => handleInputChange('foreignTrusts', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter details"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foreign Tax Paid
          </label>
          <input
            type="text"
            value={formData.foreignTaxPaid}
            onChange={(e) => handleInputChange('foreignTaxPaid', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>

      {/* Foreign Bank Account Details */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Foreign Bank Account Details</h3>
        <div className="space-y-4">
          {formData.foreignBankAccountDetails.map((account, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={account.accountNumber}
                    onChange={(e) => handleArrayFieldChange('foreignBankAccountDetails', index, 'accountNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={account.bankName}
                    onChange={(e) => handleArrayFieldChange('foreignBankAccountDetails', index, 'bankName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={account.country}
                    onChange={(e) => handleArrayFieldChange('foreignBankAccountDetails', index, 'country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Balance
                  </label>
                  <input
                    type="number"
                    value={account.maxBalance}
                    onChange={(e) => handleArrayFieldChange('foreignBankAccountDetails', index, 'maxBalance', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Earned
                  </label>
                  <input
                    type="number"
                    value={account.interestEarned}
                    onChange={(e) => handleArrayFieldChange('foreignBankAccountDetails', index, 'interestEarned', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('foreignBankAccountDetails', index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('foreignBankAccountDetails', {
              accountNumber: '',
              bankName: '',
              country: '',
              maxBalance: 0,
              interestEarned: 0
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Foreign Bank Account
          </button>
        </div>
      </div>

      {/* Foreign Immovable Property Details */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Foreign Immovable Property Details</h3>
        <div className="space-y-4">
          {formData.foreignImmovablePropertyDetails.map((property, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={property.address}
                    onChange={(e) => handleArrayFieldChange('foreignImmovablePropertyDetails', index, 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter property address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={property.country}
                    onChange={(e) => handleArrayFieldChange('foreignImmovablePropertyDetails', index, 'country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="number"
                    value={property.value}
                    onChange={(e) => handleArrayFieldChange('foreignImmovablePropertyDetails', index, 'value', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Income
                  </label>
                  <input
                    type="number"
                    value={property.income}
                    onChange={(e) => handleArrayFieldChange('foreignImmovablePropertyDetails', index, 'income', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter income"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeArrayItem('foreignImmovablePropertyDetails', index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('foreignImmovablePropertyDetails', {
              address: '',
              country: '',
              value: 0,
              income: 0
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Foreign Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItrTwoForeignAssets;
