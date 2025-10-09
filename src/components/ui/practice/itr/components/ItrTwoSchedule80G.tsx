import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoSchedule80GProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrTwoFormData, index: number, subField: string, value: string | number) => void;
  addArrayItem: (field: keyof ItrTwoFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrTwoFormData, index: number) => void;
}

const ItrTwoSchedule80G: React.FC<ItrTwoSchedule80GProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule 80G & 80GGA - Donations</h2>
      
      {/* Schedule 80G - Donations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Schedule 80G - Donations to Charity</h3>
        {formData.schedule80GDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee Name
                </label>
                <input
                  type="text"
                  value={detail.doneeName}
                  onChange={(e) => handleArrayFieldChange('schedule80GDetails', index, 'doneeName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee Address
                </label>
                <input
                  type="text"
                  value={detail.doneeAddress}
                  onChange={(e) => handleArrayFieldChange('schedule80GDetails', index, 'doneeAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donee address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee PAN
                </label>
                <input
                  type="text"
                  value={detail.doneePAN}
                  onChange={(e) => handleArrayFieldChange('schedule80GDetails', index, 'doneePAN', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter PAN"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <input
                  type="number"
                  value={detail.donationAmount}
                  onChange={(e) => handleArrayFieldChange('schedule80GDetails', index, 'donationAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligible Deduction
                </label>
                <input
                  type="number"
                  value={detail.eligibleDeduction}
                  onChange={(e) => handleArrayFieldChange('schedule80GDetails', index, 'eligibleDeduction', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  value={detail.section}
                  onChange={(e) => handleArrayFieldChange('schedule80GDetails', index, 'section', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  <option value="80G">80G</option>
                  <option value="80G(2)(a)">80G(2)(a)</option>
                  <option value="80G(2)(b)">80G(2)(b)</option>
                </select>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('schedule80GDetails', index)}
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
          onClick={() => addArrayItem('schedule80GDetails', {
            doneeName: '',
            doneeAddress: '',
            doneePAN: '',
            donationAmount: 0,
            eligibleDeduction: 0,
            section: ''
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add 80G Donation
        </button>
      </div>

      {/* Schedule 80GGA - Donations for Scientific Research */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Schedule 80GGA - Donations for Scientific Research</h3>
        {formData.schedule80GGADetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee Name
                </label>
                <input
                  type="text"
                  value={detail.doneeName}
                  onChange={(e) => handleArrayFieldChange('schedule80GGADetails', index, 'doneeName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donee name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee Address
                </label>
                <input
                  type="text"
                  value={detail.doneeAddress}
                  onChange={(e) => handleArrayFieldChange('schedule80GGADetails', index, 'doneeAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donee address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee PAN
                </label>
                <input
                  type="text"
                  value={detail.doneePAN}
                  onChange={(e) => handleArrayFieldChange('schedule80GGADetails', index, 'doneePAN', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter PAN"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <input
                  type="number"
                  value={detail.donationAmount}
                  onChange={(e) => handleArrayFieldChange('schedule80GGADetails', index, 'donationAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligible Deduction
                </label>
                <input
                  type="number"
                  value={detail.eligibleDeduction}
                  onChange={(e) => handleArrayFieldChange('schedule80GGADetails', index, 'eligibleDeduction', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('schedule80GGADetails', index)}
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
          onClick={() => addArrayItem('schedule80GGADetails', {
            doneeName: '',
            doneeAddress: '',
            doneePAN: '',
            donationAmount: 0,
            eligibleDeduction: 0
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add 80GGA Donation
        </button>
      </div>
    </div>
  );
};

export default ItrTwoSchedule80G;
