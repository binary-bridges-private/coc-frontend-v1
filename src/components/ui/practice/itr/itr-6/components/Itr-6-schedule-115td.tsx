import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule115TDProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Schedule115TD: React.FC<Schedule115TDProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  // Basic calculations
  const fmvTotalAssets = parseFloat(watch("s115td_fmv_total_assets") || 0) || 0;
  const totalLiability = parseFloat(watch("s115td_total_liability") || 0) || 0;
  const netValueAssets = fmvTotalAssets - totalLiability;

  const fmvAcquiredOutOfIncome = parseFloat(watch("s115td_fmv_acquired_out_income") || 0) || 0;
  const fmvAcquiredDuringPeriod = parseFloat(watch("s115td_fmv_acquired_during") || 0) || 0;
  const fmvTransferredThirdProviso = parseFloat(watch("s115td_fmv_transferred_third") || 0) || 0;

  const totalAdjustments = fmvAcquiredOutOfIncome + fmvAcquiredDuringPeriod + fmvTransferredThirdProviso;
  const accruedincome1 = netValueAssets - totalAdjustments;

  const liabilityAssets = parseFloat(watch("s115td_liability_assets") || 0) || 0;
  const accruedincome2 = accruedincome1 - liabilityAssets;

  const accruedIncomeMaxRate = accruedincome2 * 0.20; // Maximum marginal rate
  const accruedIncomeAtMaxRate = parseFloat(watch("s115td_accrued_income_max_rate") || accruedIncomeMaxRate) || 0;

  const interestPayable = parseFloat(watch("s115td_interest_payable") || 0) || 0;
  const totalTaxInterest = accruedIncomeAtMaxRate + interestPayable;

  const specifiedDate = watch("s115td_specified_date") || "";
  const additionalTaxInterest = parseFloat(watch("s115td_additional_tax_interest") || 0) || 0;
  const taxInterestPaid = parseFloat(watch("s115td_tax_interest_paid") || 0) || 0;
  const netPayable = totalTaxInterest + additionalTaxInterest - taxInterestPaid;

  const depositDates = [
    watch("s115td_deposit_date_1"),
    watch("s115td_deposit_date_2"),
    watch("s115td_deposit_date_3"),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Schedule 115TD: Accrued Income
          </h1>
          <p className="text-indigo-700">
            Complete accrued income computation under section 115TD for specified persons
          </p>
        </div>

        {/* Item 1-3: Basic Asset & Liability Calculation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">Items 1-3: Asset & Liability Calculation</h2>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border border-gray-300 px-3 py-2 text-left w-8">Item</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-right w-32">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-indigo-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">1</td>
                  <td className="border border-gray-300 px-3 py-2">Aggregate Fair Market Value (FMV) of total assets of specified person</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("s115td_fmv_total_assets")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-indigo-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">2</td>
                  <td className="border border-gray-300 px-3 py-2">Less: Total liability of specified person</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("s115td_total_liability")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="bg-indigo-100 font-bold">
                  <td className="border border-gray-300 px-3 py-2">3</td>
                  <td className="border border-gray-300 px-3 py-2">Net value of assets (1 - 2)</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {netValueAssets.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Item 4: Assets Acquired & Transferred */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Item 4: Assets Acquired & Transferred Details</h2>

          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4(i) FMV of assets directly acquired out of income referred to in section 10(1) (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("s115td_fmv_acquired_out_income")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4(ii) FMV of assets acquired during period from creation/establishment to registration u/s 12AB (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("s115td_fmv_acquired_during")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                4(iii) FMV of assets transferred in accordance with third proviso to section 115TD(2) (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("s115td_fmv_transferred_third")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
              />
            </div>
          </div>

          <div className="bg-blue-100 rounded-lg p-3 border border-blue-300">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-blue-900">4(iv) Total (4(i) + 4(ii) + 4(iii)) =</span>
              <span className="text-lg font-bold text-blue-700">
                ₹ {totalAdjustments.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Item 5-6: Liability & Accrued Income Calculation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-600">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">Items 5-6: Liability & Accrued Income Computation</h2>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border border-gray-300 px-3 py-2 text-left w-8">Item</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-right w-32">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-indigo-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">5</td>
                  <td className="border border-gray-300 px-3 py-2">Liability in respect of assets at 4 above</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("s115td_liability_assets")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="bg-indigo-100 font-bold">
                  <td className="border border-gray-300 px-3 py-2">6</td>
                  <td className="border border-gray-300 px-3 py-2">Accrued income as per section 115TD [3 - (4(iv) - 5)]</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-indigo-700">
                    {accruedincome2.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Item 7-10: Tax Computation at Maximum Marginal Rate */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-500">
          <h2 className="text-xl font-bold text-purple-800 mb-4">Items 7-10: Tax & Interest Computation</h2>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 px-3 py-2 text-left w-8">Item</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-right w-32">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">7</td>
                  <td className="border border-gray-300 px-3 py-2">Additional income-tax payable u/s 115TD at maximum marginal rate</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("s115td_accrued_income_max_rate")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">8</td>
                  <td className="border border-gray-300 px-3 py-2">Interest payable u/s 115TE</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("s115td_interest_payable")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">9</td>
                  <td className="border border-gray-300 px-3 py-2">Specified date u/s 115TD</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      {...register("s115td_specified_date")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-purple-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">10</td>
                  <td className="border border-gray-300 px-3 py-2">Additional income-tax and interest payable</td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-bold text-purple-700">
                    {totalTaxInterest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Item 11-13: Payment Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-500">
          <h2 className="text-xl font-bold text-violet-800 mb-4">Items 11-13: Payment Details</h2>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-violet-100">
                  <th className="border border-gray-300 px-3 py-2 text-left w-8">Item</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-right w-32">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-violet-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">11</td>
                  <td className="border border-gray-300 px-3 py-2">Tax and interest paid</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("s115td_tax_interest_paid")}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="bg-violet-100 font-bold">
                  <td className="border border-gray-300 px-3 py-2">12</td>
                  <td className="border border-gray-300 px-3 py-2">Net payable (10 - 11) (if negative, enter 0)</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-violet-700">
                    {Math.max(0, totalTaxInterest - taxInterestPaid).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              13. Date(s) of deposit of tax on accrued income (DD/MM/YYYY)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[1, 2, 3].map((idx) => (
                <div key={idx}>
                  <input
                    type="text"
                    placeholder={`Date ${idx}`}
                    {...register(`s115td_deposit_date_${idx}`)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-center"
                  />
                  <p className="text-xs text-gray-600 mt-1 text-center">Date {idx}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Item 14-17: Bank & Deposit Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-sky-500">
          <h2 className="text-xl font-bold text-sky-800 mb-4">Items 14-17: Bank & Deposit Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                14. Name of Bank and Branch
              </label>
              <input
                type="text"
                placeholder="Bank name and branch"
                {...register("s115td_bank_name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  15. BSR Code
                </label>
                <input
                  type="text"
                  placeholder="BSR Code"
                  {...register("s115td_bsr_code")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  16. Serial number of challan
                </label>
                <input
                  type="text"
                  placeholder="Challan serial number"
                  {...register("s115td_challan_serial")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                17. Amount deposited (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("s115td_amount_deposited")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-right"
              />
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-4">Accrued Income Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Net Value of Assets</p>
              <p className="text-lg font-bold">₹ {netValueAssets.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Adjustments</p>
              <p className="text-lg font-bold">₹ {totalAdjustments.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Accrued Income</p>
              <p className="text-lg font-bold">₹ {accruedincome2.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Net Payable</p>
              <p className="text-lg font-bold">₹ {Math.max(0, totalTaxInterest - taxInterestPaid).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2">Important Notes:</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Schedule 115TD applies to specified persons as defined in section 115TD</li>
            <li>• Additional income-tax is payable at the maximum marginal rate (20% as per current rates)</li>
            <li>• Interest u/s 115TE is payable from the specified date until actual payment</li>
            <li>• All amounts should be in Indian Rupees (₹)</li>
            <li>• Multiple deposit dates can be entered if payment was made in installments</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule115TD;
