import React from 'react';

interface HousePropertyDetail {
  propertyAddress: string;
  propertyType: string;
  ownershipType: string;
  annualValue: number;
  municipalTaxes: number;
  standardDeduction: number;
  interestOnBorrowedCapital: number;
  preConstructionInterest: number;
  netIncome: number;
  isSelfOccupied: boolean;
  isLetOut: boolean;
  isDeemedLetOut: boolean;
  rentReceived: number;
  unrealizedRent: number;
  vacancyPeriod: number;
  municipalTaxesPaid: number;
  repairsAndMaintenance: number;
  insurancePremium: number;
  otherDeductions: number;
  propertyStatus: string;
  constructionYear: string;
  area: number;
  builtUpArea: number;
  carpetArea: number;
  floorNumber: string;
  totalFloors: string;
  propertyAge: number;
  marketValue: number;
  stampDutyValue: number;
  registrationValue: number;
  propertyTax: number;
  waterCharges: number;
  electricityCharges: number;
  societyCharges: number;
  maintenanceCharges: number;
  otherCharges: number;
}

interface ItrSixScheduleHPProps {
  housePropertyDetails: HousePropertyDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof HousePropertyDetail, value: string | number | boolean) => void;
}

const ItrSixScheduleHP: React.FC<ItrSixScheduleHPProps> = ({
  housePropertyDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const propertyTypes = [
    'Residential House',
    'Commercial Property',
    'Industrial Property',
    'Agricultural Land',
    'Plot',
    'Shop',
    'Office',
    'Warehouse',
    'Factory',
    'Showroom',
    'Restaurant',
    'Hotel',
    'Other'
  ];

  const ownershipTypes = [
    'Individual',
    'Joint',
    'HUF',
    'Partnership',
    'Company',
    'Trust',
    'Society',
    'Cooperative',
    'Other'
  ];

  const propertyStatuses = [
    'Under Construction',
    'Completed',
    'Renovated',
    'Demolished',
    'Converted',
    'Leased',
    'Mortgaged',
    'Other'
  ];

  const calculateStandardDeduction = (annualValue: number) => {
    return Math.min(annualValue * 0.3, 150000); // 30% of annual value or ₹1,50,000 whichever is less
  };

  const calculateNetIncome = (detail: HousePropertyDetail) => {
    if (detail.isSelfOccupied) {
      // For self-occupied property, only interest on borrowed capital is deductible
      return Math.min(detail.interestOnBorrowedCapital, 200000); // Maximum ₹2,00,000
    } else {
      // For let-out property, calculate as per formula
      const grossAnnualValue = detail.annualValue;
      const municipalTaxes = detail.municipalTaxesPaid;
      const netAnnualValue = grossAnnualValue - municipalTaxes;
      const standardDeduction = calculateStandardDeduction(netAnnualValue);
      const interestOnBorrowedCapital = detail.interestOnBorrowedCapital;
      const preConstructionInterest = detail.preConstructionInterest;
      
      return netAnnualValue - standardDeduction - interestOnBorrowedCapital - preConstructionInterest;
    }
  };

  const calculateTotalDeductions = (detail: HousePropertyDetail) => {
    if (detail.isSelfOccupied) {
      return Math.min(detail.interestOnBorrowedCapital, 200000);
    } else {
      const municipalTaxes = detail.municipalTaxesPaid;
      const standardDeduction = calculateStandardDeduction(detail.annualValue - municipalTaxes);
      const interestOnBorrowedCapital = detail.interestOnBorrowedCapital;
      const preConstructionInterest = detail.preConstructionInterest;
      
      return municipalTaxes + standardDeduction + interestOnBorrowedCapital + preConstructionInterest;
    }
  };

  const calculateTotalCharges = (detail: HousePropertyDetail) => {
    return detail.propertyTax + detail.waterCharges + detail.electricityCharges + 
           detail.societyCharges + detail.maintenanceCharges + detail.otherCharges;
  };

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-teal-800 mb-2">Schedule HP</h2>
        <p className="text-sm text-teal-700">
          Details of Income from House Property
        </p>
      </div>

      <div className="space-y-4">
        {housePropertyDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">House Property {index + 1}</h3>
              <button
                type="button"
                onClick={() => onRemoveDetail(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address *
                </label>
                <textarea
                  value={detail.propertyAddress}
                  onChange={(e) => onUpdateDetail(index, 'propertyAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete property address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  value={detail.propertyType}
                  onChange={(e) => onUpdateDetail(index, 'propertyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ownership Type *
                </label>
                <select
                  value={detail.ownershipType}
                  onChange={(e) => onUpdateDetail(index, 'ownershipType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Ownership Type</option>
                  {ownershipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Status
                </label>
                <select
                  value={detail.propertyStatus}
                  onChange={(e) => onUpdateDetail(index, 'propertyStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Property Status</option>
                  {propertyStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Construction Year
                </label>
                <input
                  type="text"
                  value={detail.constructionYear}
                  onChange={(e) => onUpdateDetail(index, 'constructionYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter construction year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (Sq. Ft.)
                </label>
                <input
                  type="number"
                  value={detail.area}
                  onChange={(e) => onUpdateDetail(index, 'area', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter area"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Built Up Area (Sq. Ft.)
                </label>
                <input
                  type="number"
                  value={detail.builtUpArea}
                  onChange={(e) => onUpdateDetail(index, 'builtUpArea', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter built up area"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carpet Area (Sq. Ft.)
                </label>
                <input
                  type="number"
                  value={detail.carpetArea}
                  onChange={(e) => onUpdateDetail(index, 'carpetArea', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter carpet area"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor Number
                </label>
                <input
                  type="text"
                  value={detail.floorNumber}
                  onChange={(e) => onUpdateDetail(index, 'floorNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter floor number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Floors
                </label>
                <input
                  type="text"
                  value={detail.totalFloors}
                  onChange={(e) => onUpdateDetail(index, 'totalFloors', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total floors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Age (Years)
                </label>
                <input
                  type="number"
                  value={detail.propertyAge}
                  onChange={(e) => onUpdateDetail(index, 'propertyAge', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter property age"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Market Value (₹)
                </label>
                <input
                  type="number"
                  value={detail.marketValue}
                  onChange={(e) => onUpdateDetail(index, 'marketValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter market value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stamp Duty Value (₹)
                </label>
                <input
                  type="number"
                  value={detail.stampDutyValue}
                  onChange={(e) => onUpdateDetail(index, 'stampDutyValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stamp duty value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Value (₹)
                </label>
                <input
                  type="number"
                  value={detail.registrationValue}
                  onChange={(e) => onUpdateDetail(index, 'registrationValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Value (₹) *
                </label>
                <input
                  type="number"
                  value={detail.annualValue}
                  onChange={(e) => onUpdateDetail(index, 'annualValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter annual value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipal Taxes (₹)
                </label>
                <input
                  type="number"
                  value={detail.municipalTaxes}
                  onChange={(e) => onUpdateDetail(index, 'municipalTaxes', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter municipal taxes"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standard Deduction (₹)
                </label>
                <input
                  type="number"
                  value={calculateStandardDeduction(detail.annualValue - detail.municipalTaxes)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest on Borrowed Capital (₹)
                </label>
                <input
                  type="number"
                  value={detail.interestOnBorrowedCapital}
                  onChange={(e) => onUpdateDetail(index, 'interestOnBorrowedCapital', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter interest on borrowed capital"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pre-Construction Interest (₹)
                </label>
                <input
                  type="number"
                  value={detail.preConstructionInterest}
                  onChange={(e) => onUpdateDetail(index, 'preConstructionInterest', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter pre-construction interest"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Received (₹)
                </label>
                <input
                  type="number"
                  value={detail.rentReceived}
                  onChange={(e) => onUpdateDetail(index, 'rentReceived', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rent received"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unrealized Rent (₹)
                </label>
                <input
                  type="number"
                  value={detail.unrealizedRent}
                  onChange={(e) => onUpdateDetail(index, 'unrealizedRent', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter unrealized rent"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vacancy Period (Months)
                </label>
                <input
                  type="number"
                  value={detail.vacancyPeriod}
                  onChange={(e) => onUpdateDetail(index, 'vacancyPeriod', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vacancy period"
                  min="0"
                  max="12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Municipal Taxes Paid (₹)
                </label>
                <input
                  type="number"
                  value={detail.municipalTaxesPaid}
                  onChange={(e) => onUpdateDetail(index, 'municipalTaxesPaid', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter municipal taxes paid"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repairs and Maintenance (₹)
                </label>
                <input
                  type="number"
                  value={detail.repairsAndMaintenance}
                  onChange={(e) => onUpdateDetail(index, 'repairsAndMaintenance', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter repairs and maintenance"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Premium (₹)
                </label>
                <input
                  type="number"
                  value={detail.insurancePremium}
                  onChange={(e) => onUpdateDetail(index, 'insurancePremium', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter insurance premium"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Deductions (₹)
                </label>
                <input
                  type="number"
                  value={detail.otherDeductions}
                  onChange={(e) => onUpdateDetail(index, 'otherDeductions', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter other deductions"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Tax (₹)
                </label>
                <input
                  type="number"
                  value={detail.propertyTax}
                  onChange={(e) => onUpdateDetail(index, 'propertyTax', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter property tax"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Water Charges (₹)
                </label>
                <input
                  type="number"
                  value={detail.waterCharges}
                  onChange={(e) => onUpdateDetail(index, 'waterCharges', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter water charges"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Electricity Charges (₹)
                </label>
                <input
                  type="number"
                  value={detail.electricityCharges}
                  onChange={(e) => onUpdateDetail(index, 'electricityCharges', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter electricity charges"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Society Charges (₹)
                </label>
                <input
                  type="number"
                  value={detail.societyCharges}
                  onChange={(e) => onUpdateDetail(index, 'societyCharges', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter society charges"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maintenance Charges (₹)
                </label>
                <input
                  type="number"
                  value={detail.maintenanceCharges}
                  onChange={(e) => onUpdateDetail(index, 'maintenanceCharges', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter maintenance charges"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Charges (₹)
                </label>
                <input
                  type="number"
                  value={detail.otherCharges}
                  onChange={(e) => onUpdateDetail(index, 'otherCharges', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter other charges"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Net Income (₹)
                </label>
                <input
                  type="number"
                  value={calculateNetIncome(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Property Status */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Property Status</h4>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isSelfOccupied}
                    onChange={(e) => onUpdateDetail(index, 'isSelfOccupied', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Self Occupied</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isLetOut}
                    onChange={(e) => onUpdateDetail(index, 'isLetOut', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Let Out</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isDeemedLetOut}
                    onChange={(e) => onUpdateDetail(index, 'isDeemedLetOut', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Deemed Let Out</span>
                </label>
              </div>
            </div>

            {/* House Property Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">House Property Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Annual Value:</span>
                  <span className="ml-2 font-medium">₹{detail.annualValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Municipal Taxes:</span>
                  <span className="ml-2 font-medium">₹{detail.municipalTaxesPaid.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Standard Deduction:</span>
                  <span className="ml-2 font-medium">₹{calculateStandardDeduction(detail.annualValue - detail.municipalTaxesPaid).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Interest on Borrowed Capital:</span>
                  <span className="ml-2 font-medium">₹{detail.interestOnBorrowedCapital.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Net Income from House Property:</span>
                  <span className={`text-sm font-bold ${calculateNetIncome(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{calculateNetIncome(detail).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add House Property
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule HP Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Properties</div>
            <div className="text-lg font-bold text-teal-600">{housePropertyDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Annual Value</div>
            <div className="text-lg font-bold text-green-600">
              ₹{housePropertyDetails.reduce((sum, detail) => sum + detail.annualValue, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Deductions</div>
            <div className="text-lg font-bold text-red-600">
              ₹{housePropertyDetails.reduce((sum, detail) => sum + calculateTotalDeductions(detail), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Net Income</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{housePropertyDetails.reduce((sum, detail) => sum + calculateNetIncome(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Property Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Property Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Property Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {propertyTypes.map(type => {
                const count = housePropertyDetails.filter(detail => detail.propertyType === type).length;
                if (count > 0) {
                  return (
                    <div key={type} className="flex justify-between">
                      <span className="text-gray-600">{type}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Ownership Type Distribution</h4>
            <div className="space-y-2 text-sm">
              {ownershipTypes.map(type => {
                const count = housePropertyDetails.filter(detail => detail.ownershipType === type).length;
                if (count > 0) {
                  return (
                    <div key={type} className="flex justify-between">
                      <span className="text-gray-600">{type}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule HP Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>House Property Income:</strong> Income from house property owned by the company</p>
          <p><strong>Self-Occupied Property:</strong> Property used for company's own business</p>
          <p><strong>Let-Out Property:</strong> Property given on rent</p>
          <p><strong>Deemed Let-Out Property:</strong> Property not used for own business</p>
          <p><strong>Annual Value:</strong> Expected rent or actual rent whichever is higher</p>
          <p><strong>Standard Deduction:</strong> 30% of net annual value or ₹1,50,000 whichever is less</p>
          <p><strong>Interest Deduction:</strong> Interest on borrowed capital for construction/purchase</p>
          <p><strong>Pre-Construction Interest:</strong> Interest paid before construction completion</p>
          <p><strong>Municipal Taxes:</strong> Taxes paid to local authority</p>
          <p><strong>Property Details:</strong> Complete property information including area, age, etc.</p>
          <p><strong>Charges:</strong> Various charges like property tax, water charges, etc.</p>
          <p><strong>Documentation:</strong> Keep property documents, rent receipts, and interest certificates</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixScheduleHP;
