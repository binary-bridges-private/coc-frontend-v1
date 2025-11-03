import React from 'react';
import { ItrFourFormData, ItrFourFormErrors } from '../types/ItrFourTypes';
import { ITR_FOUR_OPTIONS } from '../constants/ItrFourConstants.ts';

interface ItrFourHousePropertyProps {
  formData: ItrFourFormData;
  errors: ItrFourFormErrors;
  handleInputChange: (field: keyof ItrFourFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrFourFormData, index: number, subField: string, value: string | number | boolean) => void;
  addArrayItem: (field: keyof ItrFourFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrFourFormData, index: number) => void;
}

const ItrFourHouseProperty: React.FC<ItrFourHousePropertyProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule HP - House Property</h2>
      <p className="text-sm text-gray-600">Income from house property</p>
      
      <div className="space-y-4">
        {formData.housePropertyDetails.map((property, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Property {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeArrayItem('housePropertyDetails', index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove Property
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address *
                </label>
                <textarea
                  value={property.propertyAddress}
                  onChange={(e) => handleArrayFieldChange('housePropertyDetails', index, 'propertyAddress', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[`housePropertyDetails_${index}_propertyAddress`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter complete property address"
                  rows={3}
                />
                {errors[`housePropertyDetails_${index}_propertyAddress`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`housePropertyDetails_${index}_propertyAddress`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  value={property.propertyType}
                  onChange={(e) => handleArrayFieldChange('housePropertyDetails', index, 'propertyType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[`housePropertyDetails_${index}_propertyType`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Property Type</option>
                  {ITR_FOUR_OPTIONS.propertyType.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors[`housePropertyDetails_${index}_propertyType`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`housePropertyDetails_${index}_propertyType`]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Value (₹)
                </label>
                <input
                  type="number"
                  value={property.annualValue}
                  onChange={(e) => handleArrayFieldChange('housePropertyDetails', index, 'annualValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter annual value"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipal Taxes Paid (₹)
                </label>
                <input
                  type="number"
                  value={property.municipalTaxes}
                  onChange={(e) => handleArrayFieldChange('housePropertyDetails', index, 'municipalTaxes', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter municipal taxes"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Deduction (₹)
                </label>
                <input
                  type="number"
                  value={property.standardDeduction}
                  onChange={(e) => handleArrayFieldChange('housePropertyDetails', index, 'standardDeduction', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter standard deduction"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest on Borrowed Capital (₹)
                </label>
                <input
                  type="number"
                  value={property.interestOnBorrowedCapital}
                  onChange={(e) => handleArrayFieldChange('housePropertyDetails', index, 'interestOnBorrowedCapital', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interest amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Income (₹)
                </label>
                <input
                  type="number"
                  value={property.netIncome || (property.annualValue - property.municipalTaxes - property.standardDeduction - property.interestOnBorrowedCapital)}
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
                  <span className="text-gray-600">Annual Value:</span>
                  <span className="ml-2 font-medium">₹{property.annualValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Municipal Taxes:</span>
                  <span className="ml-2 font-medium">₹{property.municipalTaxes.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Standard Deduction:</span>
                  <span className="ml-2 font-medium">₹{property.standardDeduction.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Interest:</span>
                  <span className="ml-2 font-medium">₹{property.interestOnBorrowedCapital.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Net Income:</span>
                  <span className="text-sm font-bold text-blue-600">
                    ₹{(property.netIncome || (property.annualValue - property.municipalTaxes - property.standardDeduction - property.interestOnBorrowedCapital)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('housePropertyDetails', {
            propertyAddress: '',
            propertyType: '',
            annualValue: 0,
            municipalTaxes: 0,
            standardDeduction: 0,
            interestOnBorrowedCapital: 0,
            netIncome: 0
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add House Property
        </button>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">House Property Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Self Occupied:</strong> No income is charged to tax. Interest on borrowed capital is deductible up to ₹2,00,000.</p>
          <p><strong>Let Out:</strong> Income is computed as Annual Value minus Municipal Taxes, Standard Deduction (30%), and Interest on Borrowed Capital.</p>
          <p><strong>Deemed Let Out:</strong> If you own more than one house property, one is treated as self-occupied and others as deemed let out.</p>
          <p><strong>Standard Deduction:</strong> 30% of Annual Value (after deducting Municipal Taxes) is allowed as standard deduction.</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFourHouseProperty;
