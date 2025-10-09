import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';
import { ITR_TWO_OPTIONS } from '../constants/ItrTwoConstants.ts';

interface ItrTwoCapitalGainsProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
  handleArrayFieldChange: (field: keyof ItrTwoFormData, index: number, subField: string, value: string | number | boolean) => void;
  addArrayItem: (field: keyof ItrTwoFormData, newItem: any) => void;
  removeArrayItem: (field: keyof ItrTwoFormData, index: number) => void;
}

const ItrTwoCapitalGains: React.FC<ItrTwoCapitalGainsProps> = ({
  formData,
  errors,
  handleInputChange,
  handleArrayFieldChange,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule CG - Capital Gains</h2>
      
      {/* Capital Gains Schedule */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Capital Gains Details</h3>
        {formData.capitalGainsSchedule.map((gain, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capital Asset Type
                </label>
                <select
                  value={gain.capitalAssetType}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'capitalAssetType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Asset Type</option>
                  {ITR_TWO_OPTIONS.capitalAssetType.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Long Term?
                </label>
                <select
                  value={gain.isLongTerm.toString()}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'isLongTerm', e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Value Consideration
                </label>
                <input
                  type="number"
                  value={gain.fullValueConsideration}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'fullValueConsideration', parseFloat(e.target.value) || 0)}
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
                  value={gain.costOfAcquisition}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'costOfAcquisition', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost of Improvement
                </label>
                <input
                  type="number"
                  value={gain.costOfImprovement}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'costOfImprovement', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expenses on Transfer
                </label>
                <input
                  type="number"
                  value={gain.expensesOnTransfer}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'expensesOnTransfer', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indexed Cost
                </label>
                <input
                  type="number"
                  value={gain.indexedCost}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'indexedCost', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemptions Claimed
                </label>
                <input
                  type="number"
                  value={gain.exemptionsClaimed}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'exemptionsClaimed', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Capital Gain
                </label>
                <input
                  type="number"
                  value={gain.netCapitalGain}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foreign Capital Assets?
                </label>
                <select
                  value={gain.foreignCapitalAssets.toString()}
                  onChange={(e) => handleArrayFieldChange('capitalGainsSchedule', index, 'foreignCapitalAssets', e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeArrayItem('capitalGainsSchedule', index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove Capital Gain
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => addArrayItem('capitalGainsSchedule', {
            capitalAssetType: '',
            isLongTerm: false,
            fullValueConsideration: 0,
            costOfAcquisition: 0,
            costOfImprovement: 0,
            expensesOnTransfer: 0,
            indexedCost: 0,
            exemptionsClaimed: 0,
            netCapitalGain: 0,
            foreignCapitalAssets: false
          })}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Capital Gain
        </button>
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Capital Gains Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Term Gains
            </label>
            <input
              type="text"
              value={formData.shortTermGains}
              onChange={(e) => handleInputChange('shortTermGains', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Term Gains
            </label>
            <input
              type="text"
              value={formData.longTermGains}
              onChange={(e) => handleInputChange('longTermGains', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exemption u/s 54
            </label>
            <input
              type="text"
              value={formData.exemptionSection54}
              onChange={(e) => handleInputChange('exemptionSection54', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exemption u/s 54EC
            </label>
            <input
              type="text"
              value={formData.exemptionSection54EC}
              onChange={(e) => handleInputChange('exemptionSection54EC', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exemption u/s 54F
            </label>
            <input
              type="text"
              value={formData.exemptionSection54F}
              onChange={(e) => handleInputChange('exemptionSection54F', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrTwoCapitalGains;
