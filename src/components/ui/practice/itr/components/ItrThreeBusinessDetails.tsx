import React from 'react';
import { ItrThreeFormData, ItrThreeFormErrors } from '../types/ItrThreeTypes.ts';
import { ITR_THREE_OPTIONS } from '../constants/ItrThreeConstants.ts';

interface ItrThreeBusinessDetailsProps {
  formData: ItrThreeFormData;
  errors: ItrThreeFormErrors;
  handleInputChange: (field: keyof ItrThreeFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrThreeFormData, index: number, subField: string, value: string | boolean) => void;
  addArrayItem: (field: keyof ItrThreeFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrThreeFormData, index: number) => void;
}

const ItrThreeBusinessDetails: React.FC<ItrThreeBusinessDetailsProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Business/Profession Details</h2>
      
      <div className="space-y-4">
        {formData.businessProfessionDetails.map((business, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={business.businessName}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={business.businessType}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Business Type</option>
                  {ITR_THREE_OPTIONS.businessType.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nature of Business
                </label>
                <select
                  value={business.natureOfBusiness}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'natureOfBusiness', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Nature of Business</option>
                  {ITR_THREE_OPTIONS.natureOfBusiness.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business PAN
                </label>
                <input
                  type="text"
                  value={business.businessPAN}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'businessPAN', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter business PAN"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={business.registrationNumber}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'registrationNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Date
                </label>
                <input
                  type="text"
                  value={business.registrationDate}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'registrationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commencement Date
                </label>
                <input
                  type="text"
                  value={business.commencementDate}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'commencementDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closure Date
                </label>
                <input
                  type="text"
                  value={business.closureDate}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'closureDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={business.isActive}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'isActive', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Is Active
                </label>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address
                </label>
                <textarea
                  value={business.businessAddress}
                  onChange={(e) => handleArrayFieldChange('businessProfessionDetails', index, 'businessAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete business address"
                  rows={3}
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('businessProfessionDetails', index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove Business
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('businessProfessionDetails', {
            businessName: '',
            businessAddress: '',
            businessPAN: '',
            businessType: '',
            natureOfBusiness: '',
            registrationNumber: '',
            registrationDate: '',
            commencementDate: '',
            closureDate: '',
            isActive: true
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Business/Profession
        </button>
      </div>
    </div>
  );
};

export default ItrThreeBusinessDetails;
