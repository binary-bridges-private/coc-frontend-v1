import React from 'react';

interface IndustrialDeductionDetail {
  section: string;
  unitName: string;
  unitAddress: string;
  commencementDate: string;
  eligiblePeriod: string;
  eligibleAmount: number;
  claimedAmount: number;
  balanceAmount: number;
  businessActivity: string;
  location: string;
  investment: number;
  employment: number;
  exportTurnover: number;
  totalTurnover: number;
}

interface ItrSixSchedule80IAProps {
  industrialDeductionDetails: IndustrialDeductionDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof IndustrialDeductionDetail, value: string | number) => void;
}

const ItrSixSchedule80IA: React.FC<ItrSixSchedule80IAProps> = ({
  industrialDeductionDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const sections = [
    '80-IA - Infrastructure Development',
    '80-IB - Industrial Undertakings',
    '80-IC - Special Category States',
    '80-IE - North Eastern States'
  ];

  const businessActivities = [
    'Infrastructure Development',
    'Industrial Undertaking',
    'Telecommunications',
    'Power Generation',
    'Mineral Oil',
    'Cold Chain Facility',
    'Warehousing Facility',
    'Undertaking in Special Category States',
    'Undertaking in North Eastern States',
    'Other Eligible Activity'
  ];

  const locations = [
    'Special Economic Zone (SEZ)',
    'Special Category States',
    'North Eastern States',
    'Backward Areas',
    'Other Specified Areas'
  ];

  const calculateBalanceAmount = (detail: IndustrialDeductionDetail) => {
    return detail.eligibleAmount - detail.claimedAmount;
  };

  const calculateExportPercentage = (detail: IndustrialDeductionDetail) => {
    if (detail.totalTurnover === 0) return 0;
    return (detail.exportTurnover / detail.totalTurnover) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-orange-800 mb-2">Schedule 80-IA/IB/IC/IE</h2>
        <p className="text-sm text-orange-700">
          Deductions under section 80-IA, 80-IB, 80-IC or 80-IE
        </p>
      </div>

      <div className="space-y-4">
        {industrialDeductionDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Unit {index + 1}</h3>
              <button
                type="button"
                onClick={() => onRemoveDetail(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section *
                </label>
                <select
                  value={detail.section}
                  onChange={(e) => onUpdateDetail(index, 'section', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>

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

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Address *
                </label>
                <textarea
                  value={detail.unitAddress}
                  onChange={(e) => onUpdateDetail(index, 'unitAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete unit address"
                  rows={3}
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
                  Eligible Period *
                </label>
                <input
                  type="text"
                  value={detail.eligiblePeriod}
                  onChange={(e) => onUpdateDetail(index, 'eligiblePeriod', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10 years, 15 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Activity *
                </label>
                <select
                  value={detail.businessActivity}
                  onChange={(e) => onUpdateDetail(index, 'businessActivity', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Activity</option>
                  {businessActivities.map(activity => (
                    <option key={activity} value={activity}>{activity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  value={detail.location}
                  onChange={(e) => onUpdateDetail(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment (₹) *
                </label>
                <input
                  type="number"
                  value={detail.investment}
                  onChange={(e) => onUpdateDetail(index, 'investment', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter investment amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment (Number of Employees) *
                </label>
                <input
                  type="number"
                  value={detail.employment}
                  onChange={(e) => onUpdateDetail(index, 'employment', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of employees"
                  min="0"
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
                  Total Turnover (₹) *
                </label>
                <input
                  type="number"
                  value={detail.totalTurnover}
                  onChange={(e) => onUpdateDetail(index, 'totalTurnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligible Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.eligibleAmount}
                  onChange={(e) => onUpdateDetail(index, 'eligibleAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter eligible amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claimed Amount (₹) *
                </label>
                <input
                  type="number"
                  value={detail.claimedAmount}
                  onChange={(e) => onUpdateDetail(index, 'claimedAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter claimed amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Amount (₹)
                </label>
                <input
                  type="number"
                  value={calculateBalanceAmount(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Percentage (%)
                </label>
                <input
                  type="number"
                  value={calculateExportPercentage(detail).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Unit Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Unit Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Section:</span>
                  <span className="ml-2 font-medium">{detail.section}</span>
                </div>
                <div>
                  <span className="text-gray-600">Investment:</span>
                  <span className="ml-2 font-medium">₹{detail.investment.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Employment:</span>
                  <span className="ml-2 font-medium">{detail.employment} employees</span>
                </div>
                <div>
                  <span className="text-gray-600">Export %:</span>
                  <span className="ml-2 font-medium">{calculateExportPercentage(detail).toFixed(2)}%</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Balance Amount:</span>
                  <span className="text-sm font-bold text-green-600">
                    ₹{calculateBalanceAmount(detail).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Add Industrial Deduction Unit
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Industrial Deduction Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Units</div>
            <div className="text-lg font-bold text-orange-600">{industrialDeductionDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Investment</div>
            <div className="text-lg font-bold text-green-600">
              ₹{industrialDeductionDetails.reduce((sum, detail) => sum + detail.investment, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Employment</div>
            <div className="text-lg font-bold text-blue-600">
              {industrialDeductionDetails.reduce((sum, detail) => sum + detail.employment, 0)} employees
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Claimed</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{industrialDeductionDetails.reduce((sum, detail) => sum + detail.claimedAmount, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule 80-IA/IB/IC/IE Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Section 80-IA:</strong> Deduction for infrastructure development undertakings</p>
          <p><strong>Section 80-IB:</strong> Deduction for industrial undertakings</p>
          <p><strong>Section 80-IC:</strong> Deduction for undertakings in special category states</p>
          <p><strong>Section 80-IE:</strong> Deduction for undertakings in north eastern states</p>
          <p><strong>Eligible Period:</strong> Varies from 5 to 15 years depending on the section</p>
          <p><strong>Investment:</strong> Minimum investment requirements as per section</p>
          <p><strong>Employment:</strong> Minimum employment generation requirements</p>
          <p><strong>Export:</strong> Export turnover requirements for certain sections</p>
          <p><strong>Conditions:</strong> Various conditions need to be fulfilled for claiming deduction</p>
          <p><strong>Documentation:</strong> Proper documentation required for claiming deduction</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixSchedule80IA;
