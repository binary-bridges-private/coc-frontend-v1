import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTIProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleTI: React.FC<ScheduleTIProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  // Line 1: House Property Income
  const housePropertyIncome = parseFloat(watch("ti_house_property") || 0) || 0;

  // Line 2: Business & Profession Income
  const businessNormalProfits = parseFloat(watch("ti_business_normal_profits") || 0) || 0;
  const businessSpeculativeProfits = parseFloat(watch("ti_business_speculative_profits") || 0) || 0;
  const businessSpecifiedProfits = parseFloat(watch("ti_business_specified_profits") || 0) || 0;
  const businessSpecialRate = parseFloat(watch("ti_business_special_rate") || 0) || 0;
  const totalBusinessIncome = businessNormalProfits + businessSpeculativeProfits + businessSpecifiedProfits + businessSpecialRate;

  // Line 3: Capital Gains
  const stcg15 = parseFloat(watch("ti_stcg_15") || 0) || 0;
  const stcg20 = parseFloat(watch("ti_stcg_20") || 0) || 0;
  const stcg30 = parseFloat(watch("ti_stcg_30") || 0) || 0;
  const stcgSpecialRate = parseFloat(watch("ti_stcg_special_rate") || 0) || 0;
  const totalSTCG = stcg15 + stcg20 + stcg30 + stcgSpecialRate;

  const ltcg10 = parseFloat(watch("ti_ltcg_10") || 0) || 0;
  const ltcg12 = parseFloat(watch("ti_ltcg_12") || 0) || 0;
  const ltcg20 = parseFloat(watch("ti_ltcg_20") || 0) || 0;
  const ltcgSpecialRate = parseFloat(watch("ti_ltcg_special_rate") || 0) || 0;
  const totalLTCG = ltcg10 + ltcg12 + ltcg20 + ltcgSpecialRate;

  const sumSTLT = totalSTCG + totalLTCG;
  const capitalGainChargeable = parseFloat(watch("ti_capital_gain_chargeable") || 0) || sumSTLT;
  const totalCapitalGains = capitalGainChargeable;

  // Line 4: Income from Other Sources
  const otherSourcesNormal = parseFloat(watch("ti_other_sources_normal") || 0) || 0;
  const otherSourcesSpecial = parseFloat(watch("ti_other_sources_special") || 0) || 0;
  const raceHorsesIncome = parseFloat(watch("ti_race_horses") || 0) || 0;
  const totalOtherSources = otherSourcesNormal + otherSourcesSpecial + raceHorsesIncome;

  // Line 5: Total of 1+2+3+4
  const totalLine5 = housePropertyIncome + totalBusinessIncome + totalCapitalGains + totalOtherSources;

  // Line 6: Losses
  const currentYearLosses = parseFloat(watch("ti_current_year_losses") || 0) || 0;
  const currentYearLossesInfo = watch("ti_current_year_losses_info") || "";

  // Line 7: Balance After Set Off
  const balanceAfterSetoff = Math.max(0, totalLine5 - currentYearLosses);

  // Line 8: Forward Losses
  const forwardLossesSetoff = parseFloat(watch("ti_forward_losses_setoff") || 0) || 0;
  const forwardLossesInfo = watch("ti_forward_losses_info") || "";

  // Line 9: Gross Total Income
  const grossTotalIncome = Math.max(0, balanceAfterSetoff - forwardLossesSetoff);

  // Line 10: Deductions Chapter VI-A
  const chapter6ADeductions = parseFloat(watch("ti_chapter6a_deductions") || 0) || 0;
  const chapter6ALimitUpTo = parseFloat(watch("ti_chapter6a_limit") || 0) || 0;

  // Line 11: Deduction u/s 80AA
  const deduction80AA = parseFloat(watch("ti_deduction_80aa") || 0) || 0;

  // Line 12: Total Income Before Special Rate
  const totalIncomeBeforeSpecial = Math.max(0, grossTotalIncome - chapter6ADeductions - deduction80AA);

  // Line 13: Special Rate Income
  const specialRateIncome = parseFloat(watch("ti_special_rate_income") || 0) || 0;

  // Line 14: Net Agricultural Income
  const netAgriculturalIncome = parseFloat(watch("ti_net_agricultural_income") || 0) || 0;

  // Line 15: Other Income for Rate Purpose
  const otherIncomeRatePurpose = parseFloat(watch("ti_other_income_rate_purpose") || 0) || 0;

  // Line 16: Loss Current Year
  const lossCurrentYear = parseFloat(watch("ti_loss_current_year_cf") || 0) || 0;

  // Line 17: Loss Forward
  const lossForwardCF = parseFloat(watch("ti_loss_forward_cf") || 0) || 0;

  // Line 18: Deemed Total Income
  const deemedTotalIncome = parseFloat(watch("ti_deemed_total_income") || 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lime-900 mb-2">
            Part B-H: Computation of Total Income
          </h1>
          <p className="text-lime-700">
            Comprehensive calculation of total income from all sources with all deductions and adjustments
          </p>
        </div>

        {/* Line 1: House Property Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-lime-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1. Income from house property (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ti_house_property")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent text-right"
              />
            </div>
            <div className="bg-lime-100 rounded-lg p-3 flex items-center">
              <span className="text-sm text-gray-700">Line 1:</span>
              <span className="text-lg font-bold text-lime-700 ml-2">₹ {housePropertyIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Line 2: Business & Profession */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-green-500">
          <h2 className="text-lg font-bold text-green-800 mb-4">2. Profits and gains from business or profession</h2>
          
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">i. Normal Business (Schedule BP) (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_business_normal_profits")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">ii. Speculative Business (Schedule BP) (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_business_speculative_profits")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">iii. Specified Business (Schedule BP) (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_business_specified_profits")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">iv. Income at Special Rate (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_business_special_rate")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-green-100 rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Line 2 (Total Business Income):</span>
            <span className="text-lg font-bold text-green-700">₹ {totalBusinessIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Line 3: Capital Gains */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-emerald-500">
          <h2 className="text-lg font-bold text-emerald-800 mb-4">3. Capital gains</h2>
          
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Short-term Capital Gains (Schedule CG):</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">@ 15% (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_stcg_15")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">@ 20% (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_stcg_20")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">@ 30% (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_stcg_30")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Special Rate (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_stcg_special_rate")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
            </div>
            <div className="bg-emerald-50 rounded p-2 mb-3">
              <span className="text-xs text-gray-700">Total STCG:</span>
              <span className="text-sm font-bold text-emerald-700 ml-2">₹ {totalSTCG.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Long-term Capital Gains (Schedule CG):</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">@ 10% (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_ltcg_10")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">@ 12.5% (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_ltcg_12")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">@ 20% (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_ltcg_20")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Special Rate (₹)</label>
                <input type="number" placeholder="0" step="0.01" {...register("ti_ltcg_special_rate")} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right text-xs" />
              </div>
            </div>
            <div className="bg-emerald-50 rounded p-2 mb-3">
              <span className="text-xs text-gray-700">Total LTCG:</span>
              <span className="text-sm font-bold text-emerald-700 ml-2">₹ {totalLTCG.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="bg-emerald-100 rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Line 3 (Total Capital Gains):</span>
            <span className="text-lg font-bold text-emerald-700">₹ {totalCapitalGains.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Line 4: Other Sources */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-teal-500">
          <h2 className="text-lg font-bold text-teal-800 mb-4">4. Income from other sources</h2>
          
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">a. Normal Income (₹)</label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_other_sources_normal")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">b. Special Rate Income (₹)</label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_other_sources_special")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">c. Race Horses Income (₹)</label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_race_horses")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent text-right" />
            </div>
          </div>

          <div className="bg-teal-100 rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Line 4 (Total Other Sources):</span>
            <span className="text-lg font-bold text-teal-700">₹ {totalOtherSources.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Line 5: Total 1+2+3+4 */}
        <div className="bg-gradient-to-r from-lime-500 to-green-500 rounded-lg shadow-md p-6 mb-4 text-white">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">5. Total (1 + 2 + 3 + 4):</span>
            <span className="text-2xl font-bold">₹ {totalLine5.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Line 6-7: Loss Set Off */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-orange-500">
          <h2 className="text-lg font-bold text-orange-800 mb-4">Loss Set Off</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                6. Losses of current year (Schedule 2, 3vi, 4vii) (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ti_current_year_losses")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right"
              />
              {currentYearLossesInfo && (
                <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-orange-700 border border-orange-200">
                  <p className="font-semibold">Info:</p>
                  <p>{currentYearLossesInfo}</p>
                </div>
              )}
            </div>
            <div className="bg-orange-100 rounded-lg p-4 flex flex-col justify-center">
              <p className="text-sm text-gray-700 mb-2">7. Balance after set off (5 - 6):</p>
              <p className="text-2xl font-bold text-orange-700">₹ {balanceAfterSetoff.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Line 8-9: Forward Losses & Gross Total */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-red-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                8. Forward losses to be set off (Schedule CFL, 4F, 2i) (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ti_forward_losses_setoff")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-right"
              />
              {forwardLossesInfo && (
                <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700 border border-red-200">
                  <p className="font-semibold">Info:</p>
                  <p>{forwardLossesInfo}</p>
                </div>
              )}
            </div>
            <div className="bg-red-100 rounded-lg p-4 flex flex-col justify-center">
              <p className="text-sm text-gray-700 mb-2">9. Gross Total Income (7 - 8):</p>
              <p className="text-2xl font-bold text-red-700">₹ {grossTotalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-purple-500">
          <h2 className="text-lg font-bold text-purple-800 mb-4">Deductions from Gross Total Income</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                10. Deductions u/s Chapter VI-A (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ti_chapter6a_deductions")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
              />
              {chapter6ALimitUpTo > 0 && (
                <div className="mt-2 p-2 bg-purple-50 rounded text-xs text-purple-700 border border-purple-200">
                  <p className="font-semibold">Limited upto (9/10): ₹{chapter6ALimitUpTo.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                11. Deduction u/s 80AA (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ti_deduction_80aa")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
              />
            </div>
          </div>

          <div className="bg-purple-100 rounded-lg p-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">12. Total Income (9 - 10 - 11):</span>
            <span className="text-lg font-bold text-purple-700">₹ {totalIncomeBeforeSpecial.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Special Income Categories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-indigo-500">
          <h2 className="text-lg font-bold text-indigo-800 mb-4">Special Income Categories</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                13. Income chargeable at special rate (Schedule SI) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_special_rate_income")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                14. Net agricultural income / any other for rate purpose (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_net_agricultural_income")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                15. Other income (rate purpose) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_other_income_rate_purpose")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right" />
            </div>
          </div>
        </div>

        {/* Carry Forward */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-rose-500">
          <h2 className="text-lg font-bold text-rose-800 mb-4">Loss Carry Forward</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                16. Loss of current year to be carried forward (Schedule CF1) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_loss_current_year_cf")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                17. Loss forward to be carried forward (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("ti_loss_forward_cf")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-right" />
            </div>
          </div>
        </div>

        {/* Deemed Total Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-cyan-500">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            18. Deemed total income u/s 115JC (Schedule AMT) (₹)
          </label>
          <input
            type="number"
            placeholder="0"
            step="0.01"
            {...register("ti_deemed_total_income")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-right"
          />
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
            className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTI;
