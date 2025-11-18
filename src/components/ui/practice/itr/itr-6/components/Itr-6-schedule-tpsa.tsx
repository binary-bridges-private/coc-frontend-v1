import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTPSAProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleTPSA: React.FC<ScheduleTPSAProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  const adjustmentCount = watch("tpsa_adjustment_count") || 1;
  const adjustments = Array.from({ length: Math.min(adjustmentCount, 6) });

  const calculateTotals = () => {
    let totalPrimaryAdjustment = 0;
    let totalAdditionalIncome = 0;
    let totalTaxPayable = 0;

    adjustments.forEach((_, idx) => {
      const primary = parseFloat(watch(`tpsa_primary_adj_${idx}`) || 0) || 0;
      const additional = parseFloat(watch(`tpsa_additional_income_${idx}`) || 0) || 0;
      const tax = parseFloat(watch(`tpsa_tax_payable_${idx}`) || 0) || 0;

      totalPrimaryAdjustment += primary;
      totalAdditionalIncome += additional;
      totalTaxPayable += tax;
    });

    return { totalPrimaryAdjustment, totalAdditionalIncome, totalTaxPayable };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violet-900 mb-2">
            Schedule TPSA: Tax on Secondary Adjustments
          </h1>
          <p className="text-violet-700">
            Details of Tax on secondary adjustments as per Section 92CE(2A) as per the schedule provided in e-filing utility
          </p>
        </div>

        {/* Number of Adjustments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-500">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Secondary Adjustments (Max 6)
            </label>
            <input
              type="number"
              min="1"
              max="6"
              {...register("tpsa_adjustment_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Part A: Primary Adjustments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-600">
          <h2 className="text-xl font-bold text-violet-800 mb-4">
            Part A: Amount of Primary Adjustments
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Amount of primary adjustments on which option u/s 92CE(2A) is exercised or such excess amount has not been notified within the prescribed period
          </p>

          <div className="space-y-4">
            {adjustments.map((_, idx) => (
              <div key={idx} className="bg-violet-50 rounded-lg p-4 border border-violet-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Adjustment {idx + 1}: Description
                    </label>
                    <input
                      type="text"
                      placeholder="Describe the primary adjustment"
                      {...register(`tpsa_primary_desc_${idx}`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Primary Adjustment Amount (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register(`tpsa_primary_adj_${idx}`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm text-right"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part B: Additional Income Tax */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-600">
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            Part B: Tax on Secondary Adjustments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 px-2 py-2 text-left w-8">SNo</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">Primary Adjustment (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">Additional Income Tax Payable (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">Total Tax Payable (₹)</th>
                </tr>
              </thead>
              <tbody>
                {adjustments.map((_, idx) => {
                  const primary = parseFloat(watch(`tpsa_primary_adj_${idx}`) || 0) || 0;
                  const additional = parseFloat(watch(`tpsa_additional_income_${idx}`) || 0) || 0;
                  const tax = parseFloat(watch(`tpsa_tax_payable_${idx}`) || 0) || 0;

                  return (
                    <tr key={idx} className="hover:bg-purple-50">
                      <td className="border border-gray-300 px-2 py-2 font-bold text-purple-700">{idx + 1}</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          placeholder="Description"
                          {...register(`tpsa_desc_${idx}`)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-right">
                        {primary.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`tpsa_additional_income_${idx}`)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-right">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`tpsa_tax_payable_${idx}`)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-purple-100 font-bold">
                  <td colSpan={2} className="border border-gray-300 px-2 py-2">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-purple-700">
                    ₹ {totals.totalPrimaryAdjustment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-purple-700">
                    ₹ {totals.totalAdditionalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-purple-700">
                    ₹ {totals.totalTaxPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Part C: Tax Payment Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-600">
          <h2 className="text-xl font-bold text-violet-800 mb-4">
            Part C: Tax Payment Details
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Net Tax Payable under Section 92CE(2A)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("tpsa_net_tax_payable")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Deposit (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  {...register("tpsa_deposit_date")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name of Bank and Branch
                </label>
                <input
                  type="text"
                  placeholder="Bank details"
                  {...register("tpsa_bank_name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  BSR Code
                </label>
                <input
                  type="text"
                  placeholder="BSR Code"
                  {...register("tpsa_bsr_code")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Serial Number
                </label>
                <input
                  type="text"
                  placeholder="Serial number"
                  {...register("tpsa_serial_number")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount Deposited (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("tpsa_amount_deposited")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-right"
              />
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-3">Tax Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Primary Adjustment</p>
              <p className="text-xl font-bold">₹ {totals.totalPrimaryAdjustment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Additional Income Tax</p>
              <p className="text-xl font-bold">₹ {totals.totalAdditionalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Tax Payable</p>
              <p className="text-xl font-bold">₹ {totals.totalTaxPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
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
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTPSA;
