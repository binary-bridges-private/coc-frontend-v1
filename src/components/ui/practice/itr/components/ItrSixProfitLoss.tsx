import React from 'react';

interface ProfitLossItem {
  item: string;
  category: string;
  currentYear: number;
  previousYear: number;
  change: number;
  percentageChange: number;
  notes: string;
}

interface ItrSixProfitLossProps {
  incomeItems: ProfitLossItem[];
  expenseItems: ProfitLossItem[];
  onAddIncome: () => void;
  onAddExpense: () => void;
  onRemoveIncome: (index: number) => void;
  onRemoveExpense: (index: number) => void;
  onUpdateIncome: (index: number, field: keyof ProfitLossItem, value: string | number) => void;
  onUpdateExpense: (index: number, field: keyof ProfitLossItem, value: string | number) => void;
}

const ItrSixProfitLoss: React.FC<ItrSixProfitLossProps> = ({
  incomeItems,
  expenseItems,
  onAddIncome,
  onAddExpense,
  onRemoveIncome,
  onRemoveExpense,
  onUpdateIncome,
  onUpdateExpense
}) => {
  const incomeCategories = [
    'Sales/Turnover',
    'Other Income',
    'Interest Income',
    'Rental Income',
    'Commission Income',
    'Professional Income',
    'Export Income',
    'Domestic Income',
    'Service Income',
    'Trading Income',
    'Manufacturing Income',
    'Other Business Income',
    'Dividend Income',
    'Capital Gains',
    'Foreign Exchange Gains',
    'Other Operating Income'
  ];

  const expenseCategories = [
    'Cost of Goods Sold',
    'Raw Materials',
    'Direct Expenses',
    'Indirect Expenses',
    'Administrative Expenses',
    'Selling Expenses',
    'Financial Expenses',
    'Depreciation',
    'Interest Expenses',
    'Rent Expenses',
    'Salary and Wages',
    'Other Expenses',
    'Employee Benefits',
    'Marketing Expenses',
    'Research and Development',
    'Legal and Professional',
    'Insurance Expenses',
    'Repairs and Maintenance',
    'Travel Expenses',
    'Communication Expenses',
    'Utilities',
    'Other Operating Expenses'
  ];

  const calculateChange = (current: number, previous: number) => {
    return current - previous;
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const calculateTotalIncome = () => {
    return incomeItems.reduce((sum, item) => sum + item.currentYear, 0);
  };

  const calculateTotalExpenses = () => {
    return expenseItems.reduce((sum, item) => sum + item.currentYear, 0);
  };

  const calculateNetProfit = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  const calculateEBITDA = () => {
    const totalIncome = calculateTotalIncome();
    const operatingExpenses = expenseItems
      .filter(item => !item.category.includes('Interest') && !item.category.includes('Depreciation'))
      .reduce((sum, item) => sum + item.currentYear, 0);
    return totalIncome - operatingExpenses;
  };

  const calculateOperatingProfit = () => {
    const totalIncome = calculateTotalIncome();
    const operatingExpenses = expenseItems
      .filter(item => !item.category.includes('Interest'))
      .reduce((sum, item) => sum + item.currentYear, 0);
    return totalIncome - operatingExpenses;
  };

  const calculateProfitBeforeTax = () => {
    return calculateOperatingProfit() - expenseItems
      .filter(item => item.category.includes('Interest'))
      .reduce((sum, item) => sum + item.currentYear, 0);
  };

  return (
    <div className="space-y-8">
      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-purple-800 mb-2">PROFIT LOSS</h2>
        <p className="text-sm text-purple-700">
          Profit and Loss Account information for Financial Year 2022-23
        </p>
      </div>

      {/* Income Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Income</h3>
          <button
            type="button"
            onClick={onAddIncome}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Income Item
          </button>
        </div>

        {incomeItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Income {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveIncome(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Item *
                </label>
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => onUpdateIncome(index, 'item', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter income item"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={item.category}
                  onChange={(e) => onUpdateIncome(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {incomeCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Year (₹) *
                </label>
                <input
                  type="number"
                  value={item.currentYear}
                  onChange={(e) => onUpdateIncome(index, 'currentYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Year (₹) *
                </label>
                <input
                  type="number"
                  value={item.previousYear}
                  onChange={(e) => onUpdateIncome(index, 'previousYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter previous year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change (₹)
                </label>
                <input
                  type="number"
                  value={calculateChange(item.currentYear, item.previousYear)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % Change
                </label>
                <input
                  type="number"
                  value={calculatePercentageChange(item.currentYear, item.previousYear).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={item.notes}
                  onChange={(e) => onUpdateIncome(index, 'notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any notes or comments"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expenses Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Expenses</h3>
          <button
            type="button"
            onClick={onAddExpense}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Add Expense Item
          </button>
        </div>

        {expenseItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Expense {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveExpense(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Item *
                </label>
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => onUpdateExpense(index, 'item', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter expense item"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={item.category}
                  onChange={(e) => onUpdateExpense(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Year (₹) *
                </label>
                <input
                  type="number"
                  value={item.currentYear}
                  onChange={(e) => onUpdateExpense(index, 'currentYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Year (₹) *
                </label>
                <input
                  type="number"
                  value={item.previousYear}
                  onChange={(e) => onUpdateExpense(index, 'previousYear', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter previous year amount"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change (₹)
                </label>
                <input
                  type="number"
                  value={calculateChange(item.currentYear, item.previousYear)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  % Change
                </label>
                <input
                  type="number"
                  value={calculatePercentageChange(item.currentYear, item.previousYear).toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={item.notes}
                  onChange={(e) => onUpdateExpense(index, 'notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any notes or comments"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profit & Loss Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Profit & Loss Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Income</span>
            <span className="font-medium text-green-600">₹{calculateTotalIncome().toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Expenses</span>
            <span className="font-medium text-red-600">₹{calculateTotalExpenses().toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">EBITDA</span>
            <span className="font-medium text-blue-600">₹{calculateEBITDA().toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Operating Profit</span>
            <span className="font-medium text-indigo-600">₹{calculateOperatingProfit().toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Profit Before Tax</span>
            <span className="font-medium text-purple-600">₹{calculateProfitBeforeTax().toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b-2 border-gray-300">
            <span className="font-semibold text-gray-700">Net Profit/Loss</span>
            <span className={`font-bold ${calculateNetProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{calculateNetProfit().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Financial Ratios</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Profit Margin</div>
            <div className="text-lg font-bold text-blue-600">
              {calculateTotalIncome() > 0 ? ((calculateNetProfit() / calculateTotalIncome()) * 100).toFixed(2) : '0.00'}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Expense Ratio</div>
            <div className="text-lg font-bold text-red-600">
              {calculateTotalIncome() > 0 ? ((calculateTotalExpenses() / calculateTotalIncome()) * 100).toFixed(2) : '0.00'}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">EBITDA Margin</div>
            <div className="text-lg font-bold text-green-600">
              {calculateTotalIncome() > 0 ? ((calculateEBITDA() / calculateTotalIncome()) * 100).toFixed(2) : '0.00'}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Operating Margin</div>
            <div className="text-lg font-bold text-purple-600">
              {calculateTotalIncome() > 0 ? ((calculateOperatingProfit() / calculateTotalIncome()) * 100).toFixed(2) : '0.00'}%
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Breakdown */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-green-800 mb-3">Income Breakdown</h4>
          <div className="space-y-2 text-sm">
            {incomeCategories.map(category => {
              const categoryTotal = incomeItems
                .filter(item => item.category === category)
                .reduce((sum, item) => sum + item.currentYear, 0);
              return (
                <div key={category} className="flex justify-between">
                  <span className="text-green-700">{category}:</span>
                  <span className="font-medium">₹{categoryTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expenses Breakdown */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-red-800 mb-3">Expenses Breakdown</h4>
          <div className="space-y-2 text-sm">
            {expenseCategories.map(category => {
              const categoryTotal = expenseItems
                .filter(item => item.category === category)
                .reduce((sum, item) => sum + item.currentYear, 0);
              return (
                <div key={category} className="flex justify-between">
                  <span className="text-red-700">{category}:</span>
                  <span className="font-medium">₹{categoryTotal.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Profit & Loss Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Period:</strong> For the financial year 2022-23</p>
          <p><strong>Income:</strong> All income earned during the year</p>
          <p><strong>Expenses:</strong> All expenses incurred during the year</p>
          <p><strong>EBITDA:</strong> Earnings Before Interest, Taxes, Depreciation, and Amortization</p>
          <p><strong>Operating Profit:</strong> Profit from core business operations</p>
          <p><strong>Profit Before Tax:</strong> Profit before tax and other charges</p>
          <p><strong>Net Profit/Loss:</strong> Final profit or loss after all expenses</p>
          <p><strong>Current Year:</strong> Values for the year 2022-23</p>
          <p><strong>Previous Year:</strong> Values for the year 2021-22</p>
          <p><strong>Change Analysis:</strong> Year-on-year comparison of income and expenses</p>
          <p><strong>Financial Ratios:</strong> Key ratios for financial analysis</p>
          <p><strong>Documentation:</strong> Keep supporting documents for all income and expense items</p>
          <p><strong>Compliance:</strong> Ensure compliance with Companies Act and accounting standards</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixProfitLoss;
