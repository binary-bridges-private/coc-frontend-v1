import React from 'react';

interface Schedule112ADetail {
  companyName: string;
  sharesQuantity: number;
  dateOfPurchase: string;
  dateOfSale: string;
  purchasePrice: number;
  salePrice: number;
  expensesOnTransfer: number;
  sttPaid: number;
  capitalGain: number;
  capitalLoss: number;
}

interface ItrSixSchedule112AProps {
  schedule112ADetails: Schedule112ADetail[];
  onAddDetail: () => void;
  onRemoveDetail: (index: number) => void;
  onUpdateDetail: (index: number, field: keyof Schedule112ADetail, value: string | number) => void;
}

const ItrSixSchedule112A: React.FC<ItrSixSchedule112AProps> = ({
  schedule112ADetails,
  onAddDetail,
  onRemoveDetail,
  onUpdateDetail
}) => {
  const calculateCapitalGain = (detail: Schedule112ADetail) => {
    const totalSaleConsideration = detail.salePrice * detail.sharesQuantity;
    const totalPurchaseCost = detail.purchasePrice * detail.sharesQuantity;
    const netGain = totalSaleConsideration - totalPurchaseCost - detail.expensesOnTransfer;
    return netGain;
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Schedule 112A</h2>
        <p className="text-sm text-blue-700">
          From sale of equity share in a company or unit of equity oriented fund or unit of a business trust 
          on which STT is paid under section 112A
        </p>
      </div>

      <div className="space-y-4">
        {schedule112ADetails.map((detail, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Transaction {index + 1}</h3>
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
                  Company/Fund/Trust Name *
                </label>
                <input
                  type="text"
                  value={detail.companyName}
                  onChange={(e) => onUpdateDetail(index, 'companyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company/fund/trust name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Shares/Units *
                </label>
                <input
                  type="number"
                  value={detail.sharesQuantity}
                  onChange={(e) => onUpdateDetail(index, 'sharesQuantity', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Purchase *
                </label>
                <input
                  type="date"
                  value={detail.dateOfPurchase}
                  onChange={(e) => onUpdateDetail(index, 'dateOfPurchase', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Sale *
                </label>
                <input
                  type="date"
                  value={detail.dateOfSale}
                  onChange={(e) => onUpdateDetail(index, 'dateOfSale', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price per Share/Unit (₹) *
                </label>
                <input
                  type="number"
                  value={detail.purchasePrice}
                  onChange={(e) => onUpdateDetail(index, 'purchasePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price per share"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price per Share/Unit (₹) *
                </label>
                <input
                  type="number"
                  value={detail.salePrice}
                  onChange={(e) => onUpdateDetail(index, 'salePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sale price per share"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expenses on Transfer (₹)
                </label>
                <input
                  type="number"
                  value={detail.expensesOnTransfer}
                  onChange={(e) => onUpdateDetail(index, 'expensesOnTransfer', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter transfer expenses"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  STT Paid (₹) *
                </label>
                <input
                  type="number"
                  value={detail.sttPaid}
                  onChange={(e) => onUpdateDetail(index, 'sttPaid', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter STT amount"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capital Gain/Loss (₹)
                </label>
                <input
                  type="number"
                  value={calculateCapitalGain(detail)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Calculation Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Total Sale Consideration:</span>
                  <span className="ml-2 font-medium">₹{(detail.salePrice * detail.sharesQuantity).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Purchase Cost:</span>
                  <span className="ml-2 font-medium">₹{(detail.purchasePrice * detail.sharesQuantity).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: Transfer Expenses:</span>
                  <span className="ml-2 font-medium">₹{detail.expensesOnTransfer.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Less: STT Paid:</span>
                  <span className="ml-2 font-medium">₹{detail.sttPaid.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-gray-700">Net Capital Gain/Loss:</span>
                  <span className={`text-sm font-bold ${calculateCapitalGain(detail) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{calculateCapitalGain(detail).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAddDetail}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Schedule 112A Transaction
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule 112A Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Transactions</div>
            <div className="text-lg font-bold text-blue-600">{schedule112ADetails.length}</div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Sale Value</div>
            <div className="text-lg font-bold text-green-600">
              ₹{schedule112ADetails.reduce((sum, detail) => sum + (detail.salePrice * detail.sharesQuantity), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Purchase Value</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{schedule112ADetails.reduce((sum, detail) => sum + (detail.purchasePrice * detail.sharesQuantity), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Net Capital Gain/Loss</div>
            <div className="text-lg font-bold text-purple-600">
              ₹{schedule112ADetails.reduce((sum, detail) => sum + calculateCapitalGain(detail), 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Schedule 112A Information</h3>
        <div className="space-y-2 text-sm text-yellow-700">
          <p><strong>Applicable for:</strong> Sale of equity shares in a company or units of equity-oriented fund or units of a business trust</p>
          <p><strong>STT Requirement:</strong> Securities Transaction Tax (STT) must be paid on the transaction</p>
          <p><strong>Tax Rate:</strong> Long-term capital gains are taxed at 10% without indexation benefit</p>
          <p><strong>Exemption:</strong> Gains up to ₹1,00,000 are exempt from tax</p>
          <p><strong>Holding Period:</strong> Shares must be held for more than 12 months to qualify as long-term</p>
          <p><strong>Company Specific:</strong> Companies need to maintain proper records of share transactions</p>
          <p><strong>Audit Requirement:</strong> May require audit if turnover exceeds specified limits</p>
          <p><strong>Documentation:</strong> Keep all purchase/sale documents and STT payment receipts</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixSchedule112A;
