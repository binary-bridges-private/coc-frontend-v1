import React from 'react';
import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

interface ItrTwoAssetsLiabilitiesProps {
  formData: ItrTwoFormData;
  errors: ItrTwoFormErrors;
  handleInputChange: (field: keyof ItrTwoFormData, value: string) => void;
}

const ItrTwoAssetsLiabilities: React.FC<ItrTwoAssetsLiabilitiesProps> = ({
  formData,
  errors,
  handleInputChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Schedule AL - Assets and Liabilities</h2>
      <p className="text-sm text-gray-600">(To be filled if total income exceeds ₹50 lakhs)</p>
      
      {/* Summary Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Assets
            </label>
            <input
              type="text"
              value={formData.totalAssets}
              onChange={(e) => handleInputChange('totalAssets', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total assets"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Liabilities
            </label>
            <input
              type="text"
              value={formData.totalLiabilities}
              onChange={(e) => handleInputChange('totalLiabilities', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total liabilities"
            />
          </div>
        </div>
      </div>

      {/* Immovable Assets */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Immovable Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land and Buildings
            </label>
            <input
              type="text"
              value={formData.immovableAssetsDetails.landBuildings}
              onChange={(e) => handleInputChange('immovableAssetsDetails', JSON.stringify({
                ...formData.immovableAssetsDetails,
                landBuildings: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Immovable Assets
            </label>
            <input
              type="text"
              value={formData.immovableAssetsDetails.otherImmovable}
              onChange={(e) => handleInputChange('immovableAssetsDetails', JSON.stringify({
                ...formData.immovableAssetsDetails,
                otherImmovable: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter details"
            />
          </div>
        </div>
      </div>

      {/* Movable Assets */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Movable Assets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cash in Hand
            </label>
            <input
              type="text"
              value={formData.movableAssetsDetails.cashInHand}
              onChange={(e) => handleInputChange('movableAssetsDetails', JSON.stringify({
                ...formData.movableAssetsDetails,
                cashInHand: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jewelry and Bullion
            </label>
            <input
              type="text"
              value={formData.movableAssetsDetails.jewelryBullion}
              onChange={(e) => handleInputChange('movableAssetsDetails', JSON.stringify({
                ...formData.movableAssetsDetails,
                jewelryBullion: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicles
            </label>
            <input
              type="text"
              value={formData.movableAssetsDetails.vehicles}
              onChange={(e) => handleInputChange('movableAssetsDetails', JSON.stringify({
                ...formData.movableAssetsDetails,
                vehicles: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Deposits
            </label>
            <input
              type="text"
              value={formData.movableAssetsDetails.bankDeposits}
              onChange={(e) => handleInputChange('movableAssetsDetails', JSON.stringify({
                ...formData.movableAssetsDetails,
                bankDeposits: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shares and Securities
            </label>
            <input
              type="text"
              value={formData.movableAssetsDetails.sharesSecurities}
              onChange={(e) => handleInputChange('movableAssetsDetails', JSON.stringify({
                ...formData.movableAssetsDetails,
                sharesSecurities: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Movable Assets
            </label>
            <input
              type="text"
              value={formData.movableAssetsDetails.otherMovable}
              onChange={(e) => handleInputChange('movableAssetsDetails', JSON.stringify({
                ...formData.movableAssetsDetails,
                otherMovable: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>

      {/* Liabilities */}
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Liabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secured Loans
            </label>
            <input
              type="text"
              value={formData.liabilitiesDetails.securedLoans}
              onChange={(e) => handleInputChange('liabilitiesDetails', JSON.stringify({
                ...formData.liabilitiesDetails,
                securedLoans: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unsecured Loans
            </label>
            <input
              type="text"
              value={formData.liabilitiesDetails.unsecuredLoans}
              onChange={(e) => handleInputChange('liabilitiesDetails', JSON.stringify({
                ...formData.liabilitiesDetails,
                unsecuredLoans: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Liabilities
            </label>
            <input
              type="text"
              value={formData.liabilitiesDetails.otherLiabilities}
              onChange={(e) => handleInputChange('liabilitiesDetails', JSON.stringify({
                ...formData.liabilitiesDetails,
                otherLiabilities: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrTwoAssetsLiabilities;
