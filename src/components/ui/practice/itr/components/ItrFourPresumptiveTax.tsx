import React from 'react';
import { ItrFourFormData, ItrFourFormErrors } from '../types/ItrFourTypes';
import { ITR_FOUR_OPTIONS } from '../constants/ItrFourConstants.ts';

interface ItrFourPresumptiveTaxProps {
  formData: ItrFourFormData;
  errors: ItrFourFormErrors;
  handleInputChange: (field: keyof ItrFourFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrFourFormData, index: number, subField: string, value: string | number | boolean) => void;
  addArrayItem: (field: keyof ItrFourFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrFourFormData, index: number) => void;
}

const ItrFourPresumptiveTax: React.FC<ItrFourPresumptiveTaxProps> = ({
  formData,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Presumptive Tax Details</h2>
      <p className="text-sm text-gray-600">Presumptive taxation under sections 44AD, 44ADA, 44AE</p>
      
      <div className="space-y-4">
        {formData.presumptiveTaxDetails.map((presumptive, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  value={presumptive.section}
                  onChange={(e) => handleArrayFieldChange('presumptiveTaxDetails', index, 'section', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  {ITR_FOUR_OPTIONS.presumptiveSections.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Receipts/Turnover
                </label>
                <input
                  type="number"
                  value={presumptive.grossReceipts}
                  onChange={(e) => handleArrayFieldChange('presumptiveTaxDetails', index, 'grossReceipts', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presumptive Rate (%)
                </label>
                <input
                  type="number"
                  value={presumptive.presumptiveRate}
                  onChange={(e) => handleArrayFieldChange('presumptiveTaxDetails', index, 'presumptiveRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rate"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presumptive Income
                </label>
                <input
                  type="number"
                  value={presumptive.presumptiveIncome}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Income
                </label>
                <input
                  type="number"
                  value={presumptive.actualIncome}
                  onChange={(e) => handleArrayFieldChange('presumptiveTaxDetails', index, 'actualIncome', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter actual income"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={presumptive.optedForPresumptive}
                  onChange={(e) => handleArrayFieldChange('presumptiveTaxDetails', index, 'optedForPresumptive', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Opted for Presumptive Taxation
                </label>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('presumptiveTaxDetails', index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove Presumptive Tax
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('presumptiveTaxDetails', {
            section: '',
            grossReceipts: 0,
            presumptiveRate: 0,
            presumptiveIncome: 0,
            actualIncome: 0,
            optedForPresumptive: false
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Presumptive Tax Detail
        </button>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Presumptive Taxation Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Section 44AD:</strong> For business with gross receipts up to ₹2 crores - 8% of gross receipts (6% for digital receipts)</p>
          <p><strong>Section 44ADA:</strong> For specified professions with gross receipts up to ₹50 lakhs - 50% of gross receipts</p>
          <p><strong>Section 44AE:</strong> For goods carriage business - ₹7,500 per month per heavy vehicle, ₹4,500 per month per other vehicle</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFourPresumptiveTax;

