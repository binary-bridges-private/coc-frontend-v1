import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoTaxLiabilityProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
}

const ItrTwoTaxLiability: React.FC<ItrTwoTaxLiabilityProps> = ({
  formData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Part B-TTI - Tax Liability on Total Income</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax Computation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax on Total Income
            </label>
            <input
              type="text"
              value={formData.taxOnTotalIncome}
              onChange={(e) => handleInputChange('taxOnTotalIncome', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rebate under section 87A
            </label>
            <input
              type="text"
              value={formData.rebateUnder87A}
              onChange={(e) => handleInputChange('rebateUnder87A', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax after Rebate
            </label>
            <input
              type="text"
              value={formData.taxAfterRebate}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health and Education Cess
            </label>
            <input
              type="text"
              value={formData.healthAndEducationCess}
              onChange={(e) => handleInputChange('healthAndEducationCess', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax and Cess
            </label>
            <input
              type="text"
              value={formData.totalTaxAndCess}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Tax Relief</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relief under section 89
            </label>
            <input
              type="text"
              value={formData.reliefUnder89}
              onChange={(e) => handleInputChange('reliefUnder89', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relief under section 90
            </label>
            <input
              type="text"
              value={formData.reliefUnder90}
              onChange={(e) => handleInputChange('reliefUnder90', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relief under section 90A
            </label>
            <input
              type="text"
              value={formData.reliefUnder90A}
              onChange={(e) => handleInputChange('reliefUnder90A', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relief under section 91
            </label>
            <input
              type="text"
              value={formData.reliefUnder91}
              onChange={(e) => handleInputChange('reliefUnder91', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Relief
            </label>
            <input
              type="text"
              value={formData.totalRelief}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balance Tax after Relief
            </label>
            <input
              type="text"
              value={formData.balanceTaxAfterRelief}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Interest and Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest under section 234A
            </label>
            <input
              type="text"
              value={formData.interestUnder234A}
              onChange={(e) => handleInputChange('interestUnder234A', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest under section 234B
            </label>
            <input
              type="text"
              value={formData.interestUnder234B}
              onChange={(e) => handleInputChange('interestUnder234B', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest under section 234C
            </label>
            <input
              type="text"
              value={formData.interestUnder234C}
              onChange={(e) => handleInputChange('interestUnder234C', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fee under section 234F
            </label>
            <input
              type="text"
              value={formData.interestUnder234F}
              onChange={(e) => handleInputChange('interestUnder234F', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Interest and Fee
            </label>
            <input
              type="text"
              value={formData.totalInterestAndFee}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax, Fee and Interest
            </label>
            <input
              type="text"
              value={formData.totalTaxFeeInterest}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Final Computation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax Paid
            </label>
            <input
              type="text"
              value={formData.totalTaxPaid}
              onChange={(e) => handleInputChange('totalTaxPaid', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Due
            </label>
            <input
              type="text"
              value={formData.refundDue}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balance Payable
            </label>
            <input
              type="text"
              value={formData.balancePayable}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrTwoTaxLiability;
