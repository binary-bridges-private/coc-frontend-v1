import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleUDProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleUD: React.FC<ScheduleUDProps> = ({ form, onCancel, onSubmit }) => {
  const { register } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule UD</h2>
      <p className="text-gray-600 mb-6">Unabsorbed depreciation and allowance under section 35(4)</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> This schedule shows unabsorbed depreciation and allowance under section 35(4) 
            that can be carried forward to future years. Track amounts brought forward, adjusted, depreciation for current year, and balances.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold w-20">Sl.No</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Assessment Year</th>
                <th colSpan={4} className="border border-gray-300 p-2 text-center font-semibold">Depreciation</th>
                <th colSpan={4} className="border border-gray-300 p-2 text-center font-semibold">Allowance under section 35(4)</th>
              </tr>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold">(1)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold">(2)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Amount of brought forward unabsorbed depreciation (3)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Amount as adjusted on account of Section 115B A of IT Act 1961 & rules framed therein (3a)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Amount of depreciation set-off against business income earned during year (4)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Balance carried forward to next year (5)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Amount of brought forward unabsorbed allowances (6)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Amount of allowance set-off against business income earned during year (7)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Amount carried forward unabsorbed to next year (8)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">Balance carried forward to next year (8)</th>
              </tr>
            </thead>
            <tbody>
              
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">i</td>
                <td className="border border-gray-300 p-2">Current Assessment Year</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_dep_bf_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_dep_adjusted_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_dep_setoff_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_dep_balance_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_allow_bf_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_allow_setoff_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_allow_unabsorbed_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_allow_balance_current", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
              </tr>

              {["ii", "iii", "iv"].map((rowLabel) => (
                <tr key={rowLabel} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 text-center font-semibold">{rowLabel}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`ud_assessment_year_${rowLabel}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="A.Y. YYYY-YY"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_dep_bf_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_dep_adjusted_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_dep_setoff_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_dep_balance_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_allow_bf_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_allow_setoff_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_allow_unabsorbed_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`ud_allow_balance_${rowLabel}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}

              <tr className="bg-blue-50 border-b border-gray-300">
                <td colSpan={2} className="border border-gray-300 p-2 font-semibold">Total</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_dep_bf", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_dep_adjusted", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_dep_setoff", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_dep_balance", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_allow_bf", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_allow_setoff", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_allow_unabsorbed", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("ud_total_allow_balance", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 justify-end pt-6 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleUD;
