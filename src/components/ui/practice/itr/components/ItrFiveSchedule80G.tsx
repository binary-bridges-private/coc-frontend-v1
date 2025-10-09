import React from 'react';

interface DonationDetail {
  doneeName: string;
  doneeAddress: string;
  doneePAN: string;
  doneeRegistrationNumber: string;
  donationAmount: number;
  eligibleAmount: number;
  donationDate: string;
  donationMode: string;
  section80G: string;
  certificateNumber: string;
  certificateDate: string;
}

interface ItrFiveSchedule80GProps {
  donationDetails: DonationDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof DonationDetail, value: string | number) => void;
}

const ItrFiveSchedule80G: React.FC<ItrFiveSchedule80GProps> = ({
  donationDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const section80GOptions = [
    '80G(2)(a) - Government Funds',
    '80G(2)(b) - Prime Minister Relief Fund',
    '80G(2)(c) - National Defence Fund',
    '80G(2)(d) - National Foundation for Communal Harmony',
    '80G(2)(e) - Approved Charitable Institutions',
    '80G(2)(f) - Approved Religious Institutions',
    '80G(2)(g) - Approved Educational Institutions',
    '80G(2)(h) - Approved Medical Institutions',
    '80G(2)(i) - Other Approved Institutions'
  ];

  const donationModes = [
    'Cash',
    'Cheque',
    'Demand Draft',
    'Online Transfer',
    'UPI',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-800 mb-2">Schedule 80G</h2>
        <p className="text-sm text-green-700">
          Details of donations entitled for deduction under section 80G
        </p>
      </div>

      <div className="space-y-4">
        {donationDetails.map((donation, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Donation {index + 1}</h3>
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
                  Donee Name/Institution *
                </label>
                <input
                  type="text"
                  value={donation.doneeName}
                  onChange={(e) => onUpdateDetail(index, 'doneeName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donee name/institution"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section 80G *
                </label>
                <select
                  value={donation.section80G}
                  onChange={(e) => onUpdateDetail(index, 'section80G', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  {section80GOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee Address *
                </label>
                <textarea
                  value={donation.doneeAddress}
                  onChange={(e) => onUpdateDetail(index, 'doneeAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donee PAN *
                </label>
                <input
                  type="text"
                  value={donation.doneePAN}
                  onChange={(e) => onUpdateDetail(index, 'doneePAN', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={donation.doneeRegistrationNumber}
                  onChange={(e) => onUpdateDetail(index, 'doneeRegistrationNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Date *
                </label>
                <input
                  type="date"
                  value={donation.donationDate}
                  onChange={(e) => onUpdateDetail(index, 'donationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Mode *
                </label>
                <select
                  value={donation.donationMode}
                  onChange={(e) => onUpdateDetail(index, 'donationMode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Mode</option>
                  {donationModes.map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (₹) *
                </label>
                <input
                  type="number"
                  value={donation.donationAmount}
                  onChange={(e) => onUpdateDetail(index, 'donationAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donation amount"
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
                  value={donation.eligibleAmount}
                  onChange={(e) => onUpdateDetail(index, 'eligibleAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter eligible amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Number
                </label>
                <input
                  type="text"
                  value={donation.certificateNumber}
                  onChange={(e) => onUpdateDetail(index, 'certificateNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter certificate number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Date
                </label>
                <input
                  type="date"
                  value={donation.certificateDate}
                  onChange={(e) => onUpdateDetail(index, 'certificateDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Donation Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="ml-2 font-medium">₹{donation.donationAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Eligible Amount:</span>
                  <span className="ml-2 font-medium">₹{donation.eligibleAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Deduction Available:</span>
                  <span className="ml-2 font-medium text-green-600">₹{donation.eligibleAmount.toLocaleString()}</span>
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
          Add Donation Detail
        </button>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule 80G Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Deduction Limit:</strong> 50% or 100% of donation amount depending on the institution</p>
          <p><strong>Maximum Limit:</strong> 10% of adjusted gross total income</p>
          <p><strong>Cash Donations:</strong> Only donations up to ₹2,000 in cash are eligible</p>
          <p><strong>Certificate Required:</strong> Donation certificate from the donee institution</p>
          <p><strong>Approved Institutions:</strong> Donee must be approved under section 80G</p>
          <p><strong>Government Funds:</strong> 100% deduction available for donations to government funds</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveSchedule80G;
