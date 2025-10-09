import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoTotalIncomeProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
}

const ItrTwoTotalIncome: React.FC<ItrTwoTotalIncomeProps> = ({
  formData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Part B - Total Income Computation</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Income Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gross Total Income
            </label>
            <input
              type="text"
              value={formData.grossTotalIncome}
              onChange={(e) => handleInputChange('grossTotalIncome', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Deductions under Chapter VI-A
            </label>
            <input
              type="text"
              value={formData.totalDeductionsUnderVI_A}
              onChange={(e) => handleInputChange('totalDeductionsUnderVI_A', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Income
            </label>
            <input
              type="text"
              value={formData.totalIncome}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agricultural Income
            </label>
            <input
              type="text"
              value={formData.agriculturalIncome}
              onChange={(e) => handleInputChange('agriculturalIncome', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrTwoTotalIncome;
