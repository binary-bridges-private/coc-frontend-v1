import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleAMTProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleAMT: React.FC<ScheduleAMTProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const totalIncome = parseFloat(watch("amt_total_income") || 0) || 0;
  const deductionUnderVIA = parseFloat(watch("amt_deduction_via") || 0) || 0;
  const deductionUnder80IA = parseFloat(watch("amt_deduction_80ia") || 0) || 0;
  const totalDeductions = deductionUnderVIA + deductionUnder80IA;
  const adjustedTotalIncome = totalIncome - totalDeductions;
  const depreciation = parseFloat(watch("amt_depreciation") || 0) || 0;
  const amtIncome = adjustedTotalIncome + depreciation;
  const amtRate = parseFloat(watch("amt_rate") || 18.5) || 18.5;
  const amtCalculated = (amtIncome * amtRate) / 100;
  const normalTax = parseFloat(watch("amt_normal_tax") || 0) || 0;
  const amtPayable = Math.max(amtCalculated - normalTax, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Schedule AMT: Computation of Alternate Minimum Tax
          </h1>
          <p className="text-slate-700">
            Alternate Minimum Tax (AMT) under Section 115JC
          </p>
        </div>

        {/* Part A: Total Income Computation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-slate-500">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Part A: Total Income as per ITR13(C)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Income as per ITR Part B TT (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("amt_total_income")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assessment Year
              </label>
              <input
                type="text"
                placeholder="YYYY-YY"
                {...register("amt_assessment_year")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part B: Adjustments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-slate-600">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Part B: Adjustments as per Section 115JC(2)
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deduction Claimed under Chapter VI-A (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("amt_deduction_via")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deduction Claimed u/s 80IA/80IB/80IE (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("amt_deduction_80ia")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Depreciation Claimed u/s 32 (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("amt_depreciation")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  AMT Rate (%)
                </label>
                <input
                  type="number"
                  placeholder="18.5"
                  step="0.01"
                  {...register("amt_rate")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Part C: Computation of AMT */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Part C: Computation of AMT Payable
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-sm font-semibold text-gray-700">
                1. Total Income as per ITR (Item 1)
              </span>
              <span className="text-lg font-bold text-slate-700">
                ₹ {totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-sm font-semibold text-gray-700">
                2. Less: Total Deductions (2a + 2b)
              </span>
              <span className="text-lg font-bold text-slate-700">
                ₹ {totalDeductions.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-sm font-semibold text-gray-700">
                3. Adjusted Total Income (1 - 2)
              </span>
              <span className="text-lg font-bold text-slate-700">
                ₹ {adjustedTotalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-sm font-semibold text-gray-700">
                4. Add: Depreciation Claimed (2a)
              </span>
              <span className="text-lg font-bold text-slate-700">
                ₹ {depreciation.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded border border-yellow-200">
              <span className="text-sm font-semibold text-gray-700">
                5. AMT Income (3 + 4)
              </span>
              <span className="text-lg font-bold text-yellow-700">
                ₹ {amtIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded border border-yellow-200">
              <span className="text-sm font-semibold text-gray-700">
                6. AMT @ {amtRate}% of Item 5
              </span>
              <span className="text-lg font-bold text-yellow-700">
                ₹ {amtCalculated.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-200">
              <label className="text-sm font-semibold text-gray-700">
                7. Normal Tax Liability (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("amt_normal_tax")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-slate-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded text-white">
              <span className="text-base font-bold">
                8. AMT Payable (Greater of Items 6 and 7 - 7)
              </span>
              <span className="text-2xl font-bold">
                ₹ {amtPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            About Alternate Minimum Tax (AMT)
          </h3>
          <ul className="space-y-2 text-sm text-slate-800">
            <li className="flex items-start">
              <span className="text-slate-600 font-bold mr-3">•</span>
              <span>Applicable when normal tax is less than AMT computed at 18.5%</span>
            </li>
            <li className="flex items-start">
              <span className="text-slate-600 font-bold mr-3">•</span>
              <span>AMT credit can be carried forward for 15 assessment years</span>
            </li>
            <li className="flex items-start">
              <span className="text-slate-600 font-bold mr-3">•</span>
              <span>Applies to individuals, HUF, and companies</span>
            </li>
            <li className="flex items-start">
              <span className="text-slate-600 font-bold mr-3">•</span>
              <span>Deductions u/s 80-IA, 80-IB, 80-IE allowed as AMT adjustments</span>
            </li>
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
            className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAMT;
