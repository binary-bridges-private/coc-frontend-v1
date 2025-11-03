import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoSchedule112AProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrTwoFormData, index: number, subField: string, value: string | number) => void;
  addArrayItem: (field: keyof ItrTwoFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrTwoFormData, index: number) => void;
}

const ItrTwoSchedule112A: React.FC<ItrTwoSchedule112AProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule 112A - Long-term Capital Gains on Equity Shares</h2>
      <p className="text-sm text-gray-600">Details of long-term capital gains on equity shares or units of equity-oriented funds</p>
      
      <div className="space-y-4">
        {formData.schedule112ADetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Company
                </label>
                <input
                  type="text"
                  value={detail.nameOfCompany}
                  onChange={(e) => handleArrayFieldChange('schedule112ADetails', index, 'nameOfCompany', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISIN
                </label>
                <input
                  type="text"
                  value={detail.isin}
                  onChange={(e) => handleArrayFieldChange('schedule112ADetails', index, 'isin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ISIN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Transfer
                </label>
                <input
                  type="text"
                  value={detail.dateOfTransfer}
                  onChange={(e) => handleArrayFieldChange('schedule112ADetails', index, 'dateOfTransfer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Consideration
                </label>
                <input
                  type="number"
                  value={detail.saleConsideration}
                  onChange={(e) => handleArrayFieldChange('schedule112ADetails', index, 'saleConsideration', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost of Acquisition
                </label>
                <input
                  type="number"
                  value={detail.costOfAcquisition}
                  onChange={(e) => handleArrayFieldChange('schedule112ADetails', index, 'costOfAcquisition', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long-term Capital Gain
                </label>
                <input
                  type="number"
                  value={detail.longTermCapitalGain}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Payable
                </label>
                <input
                  type="number"
                  value={detail.taxPayable}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('schedule112ADetails', index)}
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
          onClick={() => addArrayItem('schedule112ADetails', {
            nameOfCompany: '',
            isin: '',
            dateOfTransfer: '',
            saleConsideration: 0,
            costOfAcquisition: 0,
            longTermCapitalGain: 0,
            taxPayable: 0
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Equity Share Detail
        </button>
      </div>
    </div>
  );
};

export default ItrTwoSchedule112A;
