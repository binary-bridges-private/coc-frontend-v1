import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';
import { ITR_TWO_OPTIONS } from '../constants/ItrTwoConstants.ts';

interface ItrTwoSalaryProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
}

const ItrTwoSalary: React.FC<ItrTwoSalaryProps> = ({
  formData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule S - Income from Salary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer Name
          </label>
          <input
            type="text"
            value={formData.employerName}
            onChange={(e) => handleInputChange('employerName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employer name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer Category
          </label>
          <select
            value={formData.employerCategory}
            onChange={(e) => handleInputChange('employerCategory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {ITR_TWO_OPTIONS.employerCategory.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer TAN
          </label>
          <input
            type="text"
            value={formData.employerTAN}
            onChange={(e) => handleInputChange('employerTAN', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter TAN"
            maxLength={10}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer Address
          </label>
          <textarea
            value={formData.employerAddress}
            onChange={(e) => handleInputChange('employerAddress', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employer address"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary under section 17(1)
          </label>
          <input
            type="text"
            value={formData.salaryUnder17_1}
            onChange={(e) => handleInputChange('salaryUnder17_1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Perquisites under section 17(2)
          </label>
          <input
            type="text"
            value={formData.perquisitesUnder17_2}
            onChange={(e) => handleInputChange('perquisitesUnder17_2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profits in lieu of salary under section 17(3)
          </label>
          <input
            type="text"
            value={formData.profitsInLieuUnder17_3}
            onChange={(e) => handleInputChange('profitsInLieuUnder17_3', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retirement income u/s 89A
          </label>
          <input
            type="text"
            value={formData.retirementIncome89A}
            onChange={(e) => handleInputChange('retirementIncome89A', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relief claimed u/s 89A
          </label>
          <input
            type="text"
            value={formData.reliefClaimed89A}
            onChange={(e) => handleInputChange('reliefClaimed89A', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allowances under section 10
          </label>
          <input
            type="text"
            value={formData.allowancesUnderSection10}
            onChange={(e) => handleInputChange('allowancesUnderSection10', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Standard Deduction
          </label>
          <input
            type="text"
            value={formData.standardDeduction}
            onChange={(e) => handleInputChange('standardDeduction', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entertainment Allowance
          </label>
          <input
            type="text"
            value={formData.entertainmentAllowance}
            onChange={(e) => handleInputChange('entertainmentAllowance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Tax
          </label>
          <input
            type="text"
            value={formData.professionalTax}
            onChange={(e) => handleInputChange('professionalTax', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );
};

export default ItrTwoSalary;
