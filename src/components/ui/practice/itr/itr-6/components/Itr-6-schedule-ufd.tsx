import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleUFDProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleUFD: React.FC<ScheduleUFDProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const watchValues = watch();

  // Calculate totals
  const calculateTotal = (fieldPrefix: string) => {
    let total = 0;
    for (let i = 1; i <= 4; i++) {
      total += parseFloat(watchValues[`${fieldPrefix}_${i}`]) || 0;
    }
    return total;
  };

  const totalBroughtForward = calculateTotal("ufd_brought_forward");
  const totalAdjusted = calculateTotal("ufd_adjusted");
  const totalDepreciationSet = calculateTotal("ufd_depreciation_set");
  const totalCarriedForward = calculateTotal("ufd_carried_forward");
  const totalAllowanceSet = calculateTotal("ufd_allowance_set");
  const totalAllowanceCarriedForward = calculateTotal("ufd_allowance_carried");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule UFD</h2>
        <p className="text-gray-600">Unabsorbed Depreciation and Allowance under section 32(2)</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Part A: Depreciation */}
        <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50">
          <h3 className="text-lg font-bold text-blue-700 mb-4">Part A: Unabsorbed Depreciation</h3>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-400 text-sm">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-gray-400 px-3 py-2 text-left font-semibold">Sl No</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-semibold">Assessment Year</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Amount of Unabsorbed Depreciation Brought Forward (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Amount Adjusted on Account of Current Year Depreciation u/s 32(1) or 115BAD or 115BAC(1)(A) (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Unabsorbed Depreciation Set off against the Income of the year (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Unabsorbed Depreciation Carried Forward to next year (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-400 px-3 py-2 text-center font-semibold">{idx}</td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="text"
                        placeholder="AY"
                        {...register(`ufd_ay_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_brought_forward_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_adjusted_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_depreciation_set_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2 bg-yellow-50">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_carried_forward_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={2} className="border border-gray-400 px-3 py-2 text-right">Total</td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {totalBroughtForward.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {totalAdjusted.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {totalDepreciationSet.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {totalCarriedForward.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part B: Allowance */}
        <div className="mb-6 p-4 border-l-4 border-green-500 bg-green-50">
          <h3 className="text-lg font-bold text-green-700 mb-4">Part B: Unabsorbed Allowance under section 32(2)</h3>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-400 text-sm">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-gray-400 px-3 py-2 text-left font-semibold">Sl No</th>
                  <th className="border border-gray-400 px-3 py-2 text-left font-semibold">Assessment Year</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Amount of Allowance Brought Forward (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Allowance Set off against the income of the year (₹)</th>
                  <th className="border border-gray-400 px-3 py-2 text-right font-semibold">Balance Allowance Carried Forward to next year (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-400 px-3 py-2 text-center font-semibold">{idx}</td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="text"
                        placeholder="AY"
                        {...register(`ufd_allowance_ay_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_allowance_brought_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_allowance_set_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-400 px-3 py-2 bg-yellow-50">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`ufd_allowance_carried_${idx}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-right"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={2} className="border border-gray-400 px-3 py-2 text-right">Total</td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {calculateTotal("ufd_allowance_brought").toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {totalAllowanceSet.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 px-3 py-2 text-right">
                    {totalAllowanceCarriedForward.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
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

export default ScheduleUFD;
