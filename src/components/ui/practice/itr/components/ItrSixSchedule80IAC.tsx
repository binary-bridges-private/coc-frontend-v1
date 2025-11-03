import React from 'react';

interface StartupDeductionDetail {
  startupName: string;
  startupAddress: string;
  incorporationDate: string;
  recognitionDate: string;
  recognitionNumber: string;
  businessActivity: string;
  eligiblePeriod: string;
  eligibleAmount: number;
  claimedAmount: number;
  balanceAmount: number;
  investment: number;
  employment: number;
  turnover: number;
  isFirstYear: boolean;
  isLastYear: boolean;
}

interface ItrSixSchedule80IACProps {
  startupDeductionDetails: StartupDeductionDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof StartupDeductionDetail, value: string | number | boolean) => void;
}

const ItrSixSchedule80IAC: React.FC<ItrSixSchedule80IACProps> = ({
  startupDeductionDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const businessActivities = [
    'Innovation',
    'Development',
    'Deployment',
    'Commercialization',
    'New Products',
    'New Services',
    'New Processes',
    'Scalable Business Model',
    'High Potential',
    'Wealth Creation',
    'Employment Generation'
  ];

  const calculateBalanceAmount = (detail: StartupDeductionDetail) => {
    return detail.eligibleAmount - detail.claimedAmount;
  };

  const calculateRemainingPeriod = (detail: StartupDeductionDetail) => {
    // Assuming 3-year period for start-up deduction
    const totalPeriod = 3;
    const currentYear = new Date().getFullYear();
    const incorporationYear = new Date(detail.incorporationDate).getFullYear();
    const yearsElapsed = currentYear - incorporationYear;
    return Math.max(0, totalPeriod - yearsElapsed);
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">Schedule 80IAC</h2>
        <p className="text-sm text-emerald-700">
          Deduction in respect of eligible start-up
        </p>
      </div>

      <div className="space-y-4">
        {startupDeductionDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Start-up {index + 1}</h3>
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
                  Start-up Name *
                </label>
                <input
                  type="text"
                  value={detail.startupName}
                  onChange={(e) => onUpdateDetail(index, 'startupName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter start-up name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recognition Number *
                </label>
                <input
                  type="text"
                  value={detail.recognitionNumber}
                  onChange={(e) => onUpdateDetail(index, 'recognitionNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recognition number"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start-up Address *
                </label>
                <textarea
                  value={detail.startupAddress}
                  onChange={(e) => onUpdateDetail(index, 'startupAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete start-up address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incorporation Date *
                </label>
                <input
                  type="date"
                  value={detail.incorporationDate}
                  onChange={(e) => onUpdateDetail(index, 'incorporationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recognition Date *
                </label>
                <input
                  type="date"
                  value={detail.recognitionDate}
                  onChange={(e) => onUpdateDetail(index, 'recognitionDate', e.target.value)}
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
                  placeholder="e.g., 3 years"
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
                  Turnover (₹) *
                </label>
                <input
                  type="number"
                  value={detail.turnover}
                  onChange={(e) => onUpdateDetail(index, 'turnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter turnover"
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
                  Remaining Period (Years)
                </label>
                <input
                  type="number"
                  value={calculateRemainingPeriod(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="md:col-span-3">
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={detail.isFirstYear}
                      onChange={(e) => onUpdateDetail(index, 'isFirstYear', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Is First Year</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={detail.isLastYear}
                      onChange={(e) => onUpdateDetail(index, 'isLastYear', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Is Last Year</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Start-up Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Start-up Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Recognition Number:</span>
                  <span className="ml-2 font-medium">{detail.recognitionNumber}</span>
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
                  <span className="text-gray-600">Remaining Period:</span>
                  <span className="ml-2 font-medium">{calculateRemainingPeriod(detail)} years</span>
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
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Add Start-up Deduction Detail
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Start-up Deduction Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Start-ups</div>
            <div className="text-lg font-bold text-emerald-600">{startupDeductionDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Investment</div>
            <div className="text-lg font-bold text-green-600">
              ₹{startupDeductionDetails.reduce((sum, detail) => sum + detail.investment, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Employment</div>
            <div className="text-lg font-bold text-blue-600">
              {startupDeductionDetails.reduce((sum, detail) => sum + detail.employment, 0)} employees
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Claimed</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{startupDeductionDetails.reduce((sum, detail) => sum + detail.claimedAmount, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule 80IAC Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Eligibility:</strong> Start-up recognized by DPIIT (Department for Promotion of Industry and Internal Trade)</p>
          <p><strong>Period:</strong> Deduction available for 3 consecutive years out of 7 years from incorporation</p>
          <p><strong>Rate:</strong> 100% of profits and gains from eligible business</p>
          <p><strong>Conditions:</strong> Start-up should be incorporated on or after April 1, 2016</p>
          <p><strong>Turnover Limit:</strong> Turnover should not exceed ₹100 crores in any previous year</p>
          <p><strong>Business Activity:</strong> Should be engaged in innovation, development, or commercialization</p>
          <p><strong>Investment:</strong> Should have significant investment in innovation and development</p>
          <p><strong>Employment:</strong> Should generate employment opportunities</p>
          <p><strong>Documentation:</strong> Recognition certificate from DPIIT required</p>
          <p><strong>Compliance:</strong> Various compliance requirements need to be fulfilled</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixSchedule80IAC;
