import React from 'react';

interface GSTDetail {
  gstin: string;
  registrationType: string;
  turnover: number;
  grossReceipts: number;
  taxableTurnover: number;
  exemptTurnover: number;
  nilRatedTurnover: number;
  nonGSTSupply: number;
}

interface ItrFiveScheduleGSTProps {
  gstDetails: GSTDetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof GSTDetail, value: string | number) => void;
}

const ItrFiveScheduleGST: React.FC<ItrFiveScheduleGSTProps> = ({
  gstDetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const registrationTypes = [
    'Regular',
    'Composition',
    'Input Service Distributor',
    'Casual Taxable Person',
    'Non-Resident Taxable Person',
    'SEZ Unit',
    'SEZ Developer'
  ];

  const calculateTotalTurnover = (detail: GSTDetail) => {
    return detail.taxableTurnover + detail.exemptTurnover + detail.nilRatedTurnover + detail.nonGSTSupply;
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-indigo-800 mb-2">Schedule GST</h2>
        <p className="text-sm text-indigo-700">
          Information regarding turnover/gross receipt reported for GST
        </p>
      </div>

      <div className="space-y-4">
        {gstDetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">GST Registration {index + 1}</h3>
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
                  GSTIN *
                </label>
                <input
                  type="text"
                  value={detail.gstin}
                  onChange={(e) => onUpdateDetail(index, 'gstin', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="22ABCDE1234F1Z5"
                  maxLength={15}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Type *
                </label>
                <select
                  value={detail.registrationType}
                  onChange={(e) => onUpdateDetail(index, 'registrationType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Registration Type</option>
                  {registrationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Turnover (₹) *
                </label>
                <input
                  type="number"
                  value={detail.turnover}
                  onChange={(e) => onUpdateDetail(index, 'turnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Receipts (₹) *
                </label>
                <input
                  type="number"
                  value={detail.grossReceipts}
                  onChange={(e) => onUpdateDetail(index, 'grossReceipts', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter gross receipts"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxable Turnover (₹)
                </label>
                <input
                  type="number"
                  value={detail.taxableTurnover}
                  onChange={(e) => onUpdateDetail(index, 'taxableTurnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter taxable turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exempt Turnover (₹)
                </label>
                <input
                  type="number"
                  value={detail.exemptTurnover}
                  onChange={(e) => onUpdateDetail(index, 'exemptTurnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter exempt turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nil Rated Turnover (₹)
                </label>
                <input
                  type="number"
                  value={detail.nilRatedTurnover}
                  onChange={(e) => onUpdateDetail(index, 'nilRatedTurnover', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter nil rated turnover"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Non-GST Supply (₹)
                </label>
                <input
                  type="number"
                  value={detail.nonGSTSupply}
                  onChange={(e) => onUpdateDetail(index, 'nonGSTSupply', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter non-GST supply"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Turnover (Calculated) (₹)
                </label>
                <input
                  type="number"
                  value={calculateTotalTurnover(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Turnover Breakdown</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Taxable Turnover:</span>
                  <span className="ml-2 font-medium">₹{detail.taxableTurnover.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Exempt Turnover:</span>
                  <span className="ml-2 font-medium">₹{detail.exemptTurnover.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Nil Rated Turnover:</span>
                  <span className="ml-2 font-medium">₹{detail.nilRatedTurnover.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Non-GST Supply:</span>
                  <span className="ml-2 font-medium">₹{detail.nonGSTSupply.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Total Turnover:</span>
                  <span className="text-sm font-bold text-blue-600">
                    ₹{calculateTotalTurnover(detail).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add GST Registration
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">GST Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Registrations</div>
            <div className="text-lg font-bold text-indigo-600">{gstDetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Turnover</div>
            <div className="text-lg font-bold text-green-600">
              ₹{gstDetails.reduce((sum, detail) => sum + detail.turnover, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Gross Receipts</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{gstDetails.reduce((sum, detail) => sum + detail.grossReceipts, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Taxable Turnover</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{gstDetails.reduce((sum, detail) => sum + detail.taxableTurnover, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Schedule GST Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>GSTIN:</strong> 15-character alphanumeric code identifying the taxpayer</p>
          <p><strong>Turnover:</strong> Total value of all taxable supplies made during the year</p>
          <p><strong>Gross Receipts:</strong> Total receipts from all sources including exempt supplies</p>
          <p><strong>Taxable Turnover:</strong> Turnover on which GST is applicable</p>
          <p><strong>Exempt Turnover:</strong> Turnover exempt from GST under various provisions</p>
          <p><strong>Nil Rated Turnover:</strong> Turnover taxed at 0% GST rate</p>
          <p><strong>Non-GST Supply:</strong> Supplies not covered under GST law</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveScheduleGST;
