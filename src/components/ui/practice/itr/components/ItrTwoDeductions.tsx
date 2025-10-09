import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoDeductionsProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
}

const ItrTwoDeductions: React.FC<ItrTwoDeductionsProps> = ({
  formData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule VI-A - Deductions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80C - Life insurance, PPF, etc.
          </label>
          <input
            type="text"
            value={formData.section80C}
            onChange={(e) => handleInputChange('section80C', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCC - Pension fund contributions
          </label>
          <input
            type="text"
            value={formData.section80CCC}
            onChange={(e) => handleInputChange('section80CCC', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCD - NPS contributions
          </label>
          <input
            type="text"
            value={formData.section80CCD}
            onChange={(e) => handleInputChange('section80CCD', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80D - Health insurance premiums
          </label>
          <input
            type="text"
            value={formData.section80D}
            onChange={(e) => handleInputChange('section80D', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80DD - Maintenance for handicapped dependent
          </label>
          <input
            type="text"
            value={formData.section80DD}
            onChange={(e) => handleInputChange('section80DD', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80DDB - Medical treatment for specified diseases
          </label>
          <input
            type="text"
            value={formData.section80DDB}
            onChange={(e) => handleInputChange('section80DDB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80E - Interest on education loan
          </label>
          <input
            type="text"
            value={formData.section80E}
            onChange={(e) => handleInputChange('section80E', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80EE - Interest on home loan for first-time buyer
          </label>
          <input
            type="text"
            value={formData.section80EE}
            onChange={(e) => handleInputChange('section80EE', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80G - Donations to charity
          </label>
          <input
            type="text"
            value={formData.section80G}
            onChange={(e) => handleInputChange('section80G', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80GGA - Donations for scientific/social research
          </label>
          <input
            type="text"
            value={formData.section80GGA}
            onChange={(e) => handleInputChange('section80GGA', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80TTA - Savings interest (non-senior citizens)
          </label>
          <input
            type="text"
            value={formData.section80TTA}
            onChange={(e) => handleInputChange('section80TTA', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80TTB - Interest (senior citizens)
          </label>
          <input
            type="text"
            value={formData.section80TTB}
            onChange={(e) => handleInputChange('section80TTB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80U - Disability of self
          </label>
          <input
            type="text"
            value={formData.section80U}
            onChange={(e) => handleInputChange('section80U', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Deductions
          </label>
          <input
            type="text"
            value={formData.otherDeductions}
            onChange={(e) => handleInputChange('otherDeductions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );
};

export default ItrTwoDeductions;
