import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';
import { ITR_TWO_OPTIONS } from '../constants/ItrTwoConstants.ts';

interface ItrTwoHousePropertyProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrTwoFormData, index: number, subField: string, value: string) => void;
  addArrayItem: (field: keyof ItrTwoFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrTwoFormData, index: number) => void;
}

const ItrTwoHouseProperty: React.FC<ItrTwoHousePropertyProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule HP - Income from House Property</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Property Type</option>
            {ITR_TWO_OPTIONS.propertyType.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ownership Share (%)
          </label>
          <input
            type="text"
            value={formData.ownershipShare}
            onChange={(e) => handleInputChange('ownershipShare', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ownership percentage"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Address
          </label>
          <textarea
            value={formData.propertyAddress}
            onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complete property address"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is Property Co-owned?
          </label>
          <select
            value={formData.isCoOwned}
            onChange={(e) => handleInputChange('isCoOwned', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Option</option>
            {ITR_TWO_OPTIONS.yesNoOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenant Name
          </label>
          <input
            type="text"
            value={formData.tenantName}
            onChange={(e) => handleInputChange('tenantName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tenant name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenant PAN
          </label>
          <input
            type="text"
            value={formData.tenantPAN}
            onChange={(e) => handleInputChange('tenantPAN', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tenant PAN"
            maxLength={10}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gross Rent Received
          </label>
          <input
            type="text"
            value={formData.grossRentReceived}
            onChange={(e) => handleInputChange('grossRentReceived', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unrealized Rent
          </label>
          <input
            type="text"
            value={formData.unrealizedRent}
            onChange={(e) => handleInputChange('unrealizedRent', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Local Taxes Paid
          </label>
          <input
            type="text"
            value={formData.localTaxesPaid}
            onChange={(e) => handleInputChange('localTaxesPaid', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Value
          </label>
          <input
            type="text"
            value={formData.annualValue}
            onChange={(e) => handleInputChange('annualValue', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest on Borrowed Capital
          </label>
          <input
            type="text"
            value={formData.interestOnBorrowedCapital}
            onChange={(e) => handleInputChange('interestOnBorrowedCapital', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Pre-construction
          </label>
          <input
            type="text"
            value={formData.interestPreConstruction}
            onChange={(e) => handleInputChange('interestPreConstruction', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arrears Received
          </label>
          <input
            type="text"
            value={formData.arrearsReceived}
            onChange={(e) => handleInputChange('arrearsReceived', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Net Income from Property
          </label>
          <input
            type="text"
            value={formData.netIncomeFromProperty}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Auto-calculated"
          />
        </div>
      </div>

      {/* Co-owner Details Section */}
      {formData.isCoOwned === 'Yes' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Co-owner Details</h3>
          <div className="space-y-4">
            {formData.coOwnerDetails.map((coOwner, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Co-owner Name
                    </label>
                    <input
                      type="text"
                      value={coOwner.name}
                      onChange={(e) => handleArrayFieldChange('coOwnerDetails', index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter co-owner name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Co-owner PAN
                    </label>
                    <input
                      type="text"
                      value={coOwner.pan}
                      onChange={(e) => handleArrayFieldChange('coOwnerDetails', index, 'pan', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter PAN"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Share Percentage
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coOwner.sharePercentage.toString()}
                        onChange={(e) => handleArrayFieldChange('coOwnerDetails', index, 'sharePercentage', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter percentage"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('coOwnerDetails', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('coOwnerDetails', { name: '', pan: '', sharePercentage: 0 })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Co-owner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItrTwoHouseProperty;
