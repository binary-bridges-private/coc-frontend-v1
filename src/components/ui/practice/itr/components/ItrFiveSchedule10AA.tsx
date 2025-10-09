import React from 'react';

interface Schedule10AADetail {
  unitName: string;
  unitAddress: string;
  sezName: string;
  sezLocation: string;
  approvalDate: string;
  commencementDate: string;
  businessActivity: string;
  natureOfBusiness: string;
  investmentInPlant: number;
  investmentInBuilding: number;
  investmentInFurniture: number;
  totalInvestment: number;
  exportTurnover: number;
  domesticTurnover: number;
  totalTurnover: number;
  exportProfit: number;
  domesticProfit: number;
  totalProfit: number;
  deductionClaimed: number;
  deductionAllowed: number;
  deductionDisallowed: number;
  disallowanceReason: string;
  exemptionPeriod: string;
  exemptionStartDate: string;
  exemptionEndDate: string;
  isExemptionAvailable: boolean;
  exemptionPercentage: number;
  remarks: string;
}

interface ItrFiveSchedule10AAProps {
  schedule10AADetails: Schedule10AADetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof Schedule10AADetail, value: string | number | boolean) => void;
}

const ItrFiveSchedule10AA: React.FC<ItrFiveSchedule10AAProps> = ({
  schedule10AADetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const businessActivities = [
    'Manufacturing',
    'Trading',
    'Services',
    'Software Development',
    'BPO/KPO',
    'Research and Development',
    'Export Trading',
    'Other'
  ];

  const natureOfBusinessOptions = [
    '100% Export Oriented Unit',
    'Domestic Tariff Area Unit',
    'Both Export and Domestic',
    'Other'
  ];

  const exemptionPeriods = [
    '5 Years',
    '10 Years',
    '15 Years',
    '20 Years',
    'Other'
  ];

  const calculateTotalInvestment = (detail: Schedule10AADetail) => {
    return detail.investmentInPlant + detail.investmentInBuilding + detail.investmentInFurniture;
  };

  const calculateTotalTurnover = (detail: Schedule10AADetail) => {
    return detail.exportTurnover + detail.domesticTurnover;
  };

  const calculateTotalProfit = (detail: Schedule10AADetail) => {
    return detail.exportProfit + detail.domesticProfit;
  };

  const calculateDeductionDisallowed = (detail: Schedule10AADetail) => {
    return detail.deductionClaimed - detail.deductionAllowed;
  };

  const calculateExemptionEndDate = (startDate: string, period: string) => {
    const start = new Date(startDate);
    const years = parseInt(period.replace(' Years', ''));
    start.setFullYear(start.getFullYear() + years);
    return start.toISOString().split('T')[0];
  };

  const getDefaultExemptionPercentage = (businessActivity: string) => {
    switch (businessActivity) {
      case 'Manufacturing':
        return 100;
      case 'Software Development':
        return 100;
      case 'BPO/KPO':
        return 100;
      case 'Research and Development':
        return 100;
      case 'Trading':
        return 50;
      case 'Services':
        return 50;
      default:
        return 100;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-800 mb-2">Schedule 10AA</h2>
        <p className="text-sm text-green-700">
          Special Economic Zone (SEZ) Unit Details
        </p>
      </div>

      <div className="space-y-4">
        {schedule10AADetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">SEZ Unit {index + 1}</h3>
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
                  Unit Name *
                </label>
                <input
                  type="text"
                  value={detail.unitName}
                  onChange={(e) => onUpdateDetail(index, 'unitName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter unit name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEZ Name *
                </label>
                <input
                  type="text"
                  value={detail.sezName}
                  onChange={(e) => onUpdateDetail(index, 'sezName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter SEZ name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Address *
                </label>
                <textarea
                  value={detail.unitAddress}
                  onChange={(e) => onUpdateDetail(index, 'unitAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter unit address"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEZ Location
                </label>
                <input
                  type="text"
                  value={detail.sezLocation}
                  onChange={(e) => onUpdateDetail(index, 'sezLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter SEZ location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Approval Date *
                </label>
                <input
                  type="date"
                  value={detail.approvalDate}
                  onChange={(e) => onUpdateDetail(index, 'approvalDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commencement Date *
                </label>
                <input
                  type="date"
                  value={detail.commencementDate}
                  onChange={(e) => onUpdateDetail(index, 'commencementDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Activity *
                </label>
                <select
                  value={detail.businessActivity}
                  onChange={(e) => {
                    onUpdateDetail(index, 'businessActivity', e.target.value);
                    onUpdateDetail(index, 'exemptionPercentage', getDefaultExemptionPercentage(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Business Activity</option>
                  {businessActivities.map(activity => (
                    <option key={activity} value={activity}>{activity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nature of Business
                </label>
                <select
                  value={detail.natureOfBusiness}
                  onChange={(e) => onUpdateDetail(index, 'natureOfBusiness', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Nature of Business</option>
                  {natureOfBusinessOptions.map(nature => (
                    <option key={nature} value={nature}>{nature}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment in Plant (₹)
                </label>
                <input
                  type="number"
                  value={detail.investmentInPlant}
                  onChange={(e) => onUpdateDetail(index, 'investmentInPlant', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter investment in plant"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment in Building (₹)
                </label>
                <input
                  type="number"
                  value={detail.investmentInBuilding}
                  onChange={(e) => onUpdateDetail(index, 'investmentInBuilding', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter investment in building"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment in Furniture (₹)
                </label>
                <input
                  type="number"
                  value={detail.investmentInFurniture}
                  onChange={(e) => onUpdateDetail(index, 'investmentInFurniture', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter investment in furniture"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Investment (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalInvestment(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Turnover (₹)
                </label>
                <input
                  type="number"
                  value={detail.exportTurnover}
                  onChange={(e) => onUpdateDetail(index, 'exportTurnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter export turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domestic Turnover (₹)
                </label>
                <input
                  type="number"
                  value={detail.domesticTurnover}
                  onChange={(e) => onUpdateDetail(index, 'domesticTurnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter domestic turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Turnover (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalTurnover(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Profit (₹)
                </label>
                <input
                  type="number"
                  value={detail.exportProfit}
                  onChange={(e) => onUpdateDetail(index, 'exportProfit', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter export profit"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domestic Profit (₹)
                </label>
                <input
                  type="number"
                  value={detail.domesticProfit}
                  onChange={(e) => onUpdateDetail(index, 'domesticProfit', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter domestic profit"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Profit (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalProfit(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deduction Claimed (₹)
                </label>
                <input
                  type="number"
                  value={detail.deductionClaimed}
                  onChange={(e) => onUpdateDetail(index, 'deductionClaimed', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter deduction claimed"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deduction Allowed (₹)
                </label>
                <input
                  type="number"
                  value={detail.deductionAllowed}
                  onChange={(e) => onUpdateDetail(index, 'deductionAllowed', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter deduction allowed"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deduction Disallowed (₹)
                </label>
                <input
                  type="number"
                  value={calculateDeductionDisallowed(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption Period
                </label>
                <select
                  value={detail.exemptionPeriod}
                  onChange={(e) => {
                    onUpdateDetail(index, 'exemptionPeriod', e.target.value);
                    onUpdateDetail(index, 'exemptionEndDate', calculateExemptionEndDate(detail.exemptionStartDate, e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Exemption Period</option>
                  {exemptionPeriods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption Start Date
                </label>
                <input
                  type="date"
                  value={detail.exemptionStartDate}
                  onChange={(e) => onUpdateDetail(index, 'exemptionStartDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption End Date
                </label>
                <input
                  type="date"
                  value={detail.exemptionEndDate}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemption Percentage (%)
                </label>
                <input
                  type="number"
                  value={detail.exemptionPercentage}
                  onChange={(e) => onUpdateDetail(index, 'exemptionPercentage', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter exemption percentage"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Exemption Available
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={detail.isExemptionAvailable}
                    onChange={(e) => onUpdateDetail(index, 'isExemptionAvailable', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Is Exemption Available</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disallowance Reason
                </label>
                <input
                  type="text"
                  value={detail.disallowanceReason}
                  onChange={(e) => onUpdateDetail(index, 'disallowanceReason', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter disallowance reason"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  value={detail.remarks}
                  onChange={(e) => onUpdateDetail(index, 'remarks', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any remarks"
                  rows={3}
                />
              </div>
            </div>

            {/* Schedule 10AA Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Schedule 10AA Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Investment:</span>
                  <span className="ml-2 font-medium">₹{calculateTotalInvestment(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Turnover:</span>
                  <span className="ml-2 font-medium">₹{calculateTotalTurnover(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Profit:</span>
                  <span className="ml-2 font-medium">₹{calculateTotalProfit(detail).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Deduction Allowed:</span>
                  <span className="ml-2 font-medium">₹{detail.deductionAllowed.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Schedule 10AA Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule 10AA Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total SEZ Units</div>
            <div className="text-lg font-bold text-green-600">{schedule10AADetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Investment</div>
            <div className="text-lg font-bold text-green-600">
              ₹{schedule10AADetails.reduce((sum, detail) => sum + calculateTotalInvestment(detail), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Turnover</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{schedule10AADetails.reduce((sum, detail) => sum + calculateTotalTurnover(detail), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Deduction Allowed</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{schedule10AADetails.reduce((sum, detail) => sum + detail.deductionAllowed, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Business Activity Analysis */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Business Activity Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Business Activity Distribution</h4>
            <div className="space-y-2 text-sm">
              {businessActivities.map(activity => {
                const count = schedule10AADetails.filter(detail => detail.businessActivity === activity).length;
                if (count > 0) {
                  return (
                    <div key={activity} className="flex justify-between">
                      <span className="text-gray-600">{activity}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Nature of Business Distribution</h4>
            <div className="space-y-2 text-sm">
              {natureOfBusinessOptions.map(nature => {
                const count = schedule10AADetails.filter(detail => detail.natureOfBusiness === nature).length;
                if (count > 0) {
                  return (
                    <div key={nature} className="flex justify-between">
                      <span className="text-gray-600">{nature}:</span>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule 10AA Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Schedule 10AA:</strong> Special Economic Zone (SEZ) unit details</p>
          <p><strong>Exemption:</strong> 100% exemption for first 5 years, 50% for next 5 years</p>
          <p><strong>Business Activities:</strong> Manufacturing, trading, services, software development</p>
          <p><strong>Investment:</strong> Minimum investment requirements for SEZ units</p>
          <p><strong>Export Obligation:</strong> Minimum export requirements</p>
          <p><strong>Approval:</strong> SEZ approval from Development Commissioner</p>
          <p><strong>Compliance:</strong> Compliance with SEZ Act and Rules</p>
          <p><strong>Documentation:</strong> Keep SEZ approval letters and compliance certificates</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveSchedule10AA;
