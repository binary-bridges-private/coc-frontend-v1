import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleFIProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleFI: React.FC<ScheduleFIProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const [activeBlock, setActiveBlock] = useState(1);

  const watchValues = watch();

  // Revenue Calculation
  const grossRevenue = parseFloat(watchValues[`revenue_gross_${activeBlock}`]) || 0;
  const otherIncome = parseFloat(watchValues[`revenue_other_${activeBlock}`]) || 0;
  const totalRevenue = grossRevenue + otherIncome;

  // Expenses Calculation
  const materialCost = parseFloat(watchValues[`expense_material_${activeBlock}`]) || 0;
  const personelCost = parseFloat(watchValues[`expense_personel_${activeBlock}`]) || 0;
  const depreciationCost = parseFloat(watchValues[`expense_depreciation_${activeBlock}`]) || 0;
  const otherExpense = parseFloat(watchValues[`expense_other_${activeBlock}`]) || 0;
  const totalExpense = materialCost + personelCost + depreciationCost + otherExpense;

  // Profit Calculation
  const grossProfit = totalRevenue - totalExpense;
  const financialCharges = parseFloat(watchValues[`financial_charges_${activeBlock}`]) || 0;
  const extraordinaryItems = parseFloat(watchValues[`extraordinary_items_${activeBlock}`]) || 0;
  const profitBeforeTax = grossProfit - financialCharges + extraordinaryItems;
  const taxProvision = parseFloat(watchValues[`tax_provision_${activeBlock}`]) || 0;
  const netProfit = profitBeforeTax - taxProvision;

  // Balance Sheet Items
  const currentAssets = parseFloat(watchValues[`current_assets_${activeBlock}`]) || 0;
  const currentLiabilities = parseFloat(watchValues[`current_liabilities_${activeBlock}`]) || 0;
  const workingCapital = currentAssets - currentLiabilities;

  const fixedAssets = parseFloat(watchValues[`fixed_assets_${activeBlock}`]) || 0;
  const reserves = parseFloat(watchValues[`reserves_${activeBlock}`]) || 0;
  const debt = parseFloat(watchValues[`debt_${activeBlock}`]) || 0;
  const totalAssets = fixedAssets + currentAssets;
  const totalLiabilities = reserves + debt + currentLiabilities;

  const returnOnAssets = totalAssets > 0 ? ((netProfit / totalAssets) * 100).toFixed(2) : "0.00";
  const returnOnEquity = reserves > 0 ? ((netProfit / reserves) * 100).toFixed(2) : "0.00";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule FI</h2>
        <p className="text-gray-600">Financial Information - Revenue, Expenses & Balance Sheet Details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Block Selection */}
        <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Block:</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((block) => (
              <button
                key={block}
                type="button"
                onClick={() => setActiveBlock(block)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeBlock === block
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                }`}
              >
                Block {block}
              </button>
            ))}
          </div>
        </div>

        {/* Part A: Revenue Details */}
        <div className="mb-6 p-4 border-l-4 border-purple-500 bg-purple-50">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Part A: Revenue Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gross Revenue from Operations
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`revenue_gross_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Other Income
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`revenue_other_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p><strong>Total Revenue:</strong> ₹ {totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Part B: Expenses Details */}
        <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50">
          <h3 className="text-lg font-bold text-blue-700 mb-4">Part B: Expenses Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cost of Material Consumed
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`expense_material_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Personnel Cost
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`expense_personel_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Depreciation
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`expense_depreciation_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Other Expenses
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`expense_other_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p><strong>Total Expenses:</strong> ₹ {totalExpense.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Part C: Profit & Loss Statement */}
        <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-50">
          <h3 className="text-lg font-bold text-green-700 mb-4">Part C: Profit & Loss Statement</h3>

          <div className="p-3 bg-gray-100 border border-gray-300 rounded text-sm mb-4">
            <p><strong>Gross Profit (Revenue - Expenses):</strong> ₹ {grossProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Financial Charges (Interest, Fees)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`financial_charges_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extraordinary Items/Gains
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`extraordinary_items_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tax Provision
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`tax_provision_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p><strong>Profit Before Tax:</strong> ₹ {profitBeforeTax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            <p><strong>Net Profit After Tax:</strong> ₹ {netProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Part D: Balance Sheet - Assets */}
        <div className="mb-6 p-4 border-l-4 border-orange-500 bg-orange-50">
          <h3 className="text-lg font-bold text-orange-700 mb-4">Part D: Balance Sheet - Assets</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fixed Assets (Gross)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`fixed_assets_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Assets
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`current_assets_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p><strong>Total Assets:</strong> ₹ {totalAssets.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Part E: Balance Sheet - Liabilities */}
        <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50">
          <h3 className="text-lg font-bold text-red-700 mb-4">Part E: Balance Sheet - Liabilities & Equity</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reserves & Surplus (Equity)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`reserves_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Long-term Debt
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`debt_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Liabilities
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`current_liabilities_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm mb-4">
            <p><strong>Total Liabilities & Equity:</strong> ₹ {totalLiabilities.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            <p><strong>Working Capital (Current Assets - Current Liabilities):</strong> ₹ {workingCapital.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Part F: Financial Ratios */}
        <div className="mb-6 p-4 border-l-4 border-indigo-500 bg-indigo-50">
          <h3 className="text-lg font-bold text-indigo-700 mb-4">Part F: Key Financial Ratios</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-600">Return on Assets (ROA)</p>
              <p className="text-lg font-bold text-indigo-700">{returnOnAssets}%</p>
            </div>
            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-600">Return on Equity (ROE)</p>
              <p className="text-lg font-bold text-indigo-700">{returnOnEquity}%</p>
            </div>
            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-600">Debt-to-Equity Ratio</p>
              <p className="text-lg font-bold text-indigo-700">{reserves > 0 ? (debt / reserves).toFixed(2) : "0.00"}</p>
            </div>
            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-sm text-gray-600">Current Ratio</p>
              <p className="text-lg font-bold text-indigo-700">{currentLiabilities > 0 ? (currentAssets / currentLiabilities).toFixed(2) : "0.00"}</p>
            </div>
          </div>
        </div>

        {/* Part G: Quarterly Breakdown */}
        <div className="mb-6 p-4 border-l-4 border-teal-500 bg-teal-50">
          <h3 className="text-lg font-bold text-teal-700 mb-4">Part G: Quarterly Revenue Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Revenue: Upto 15th June
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`quarterly_q1_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Revenue: 16th June to 15th September
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`quarterly_q2_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Revenue: 16th September to 15th December
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`quarterly_q3_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Revenue: 16th December to 31st March
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`quarterly_q4_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p>
              <strong>Total (Q1+Q2+Q3+Q4):</strong> ₹{" "}
              {(
                (parseFloat(watchValues[`quarterly_q1_${activeBlock}`]) || 0) +
                (parseFloat(watchValues[`quarterly_q2_${activeBlock}`]) || 0) +
                (parseFloat(watchValues[`quarterly_q3_${activeBlock}`]) || 0) +
                (parseFloat(watchValues[`quarterly_q4_${activeBlock}`]) || 0)
              ).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Part H: Additional Income Sources */}
        <div className="mb-6 p-4 border-l-4 border-pink-500 bg-pink-50">
          <h3 className="text-lg font-bold text-pink-700 mb-4">Part H: Additional Income Sources (from Schedule OS)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                XIV. Profit from activity of owning and maintaining race horses (ref: Schedule OS)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`race_horses_profit_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                XV. Income from other sources attributable at normal applicable rates (ref: Schedule OS)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`other_income_normal_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                XVI. Profit from the activity of owning and maintaining race horses
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`race_horses_final_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                XVII. Income from other sources attributable at normal applicable rates as per DTAA
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`dtaa_income_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Part I: Loss Set-off Details */}
        <div className="mb-6 p-4 border-l-4 border-rose-500 bg-rose-50">
          <h3 className="text-lg font-bold text-rose-700 mb-4">Part I: Loss Set-off Computation</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                XVIII. Total loss set off
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`total_loss_set_off_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                XIX. Loss remaining after set off (i - xvii)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                {...register(`loss_remaining_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
            <p><strong>Computation Notes:</strong></p>
            <p className="text-xs mt-1">Loss Remaining = [Previous Year Loss (i) - Total Loss Set Off (xviii)]</p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between gap-4 mt-8 p-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Confirm & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleFI;
