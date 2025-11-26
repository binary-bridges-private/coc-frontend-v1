import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80IEProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80IE: React.FC<Schedule80IEProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80-IE</h2>
      <p className="text-gray-600 mb-6">Deductions under section 80-IE (North-East Region Deduction)</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of profits from undertakings located in North-East states.
          </p>
        </div>

        {/* North-East States Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking No. 1</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking No. 2</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Assam", prefix: "assam" },
                { label: "Arunachal Pradesh", prefix: "arunachal" },
                { label: "Manipur", prefix: "manipur" },
                { label: "Mizoram", prefix: "mizoram" },
                { label: "Meghalaya", prefix: "meghalaya" },
                { label: "Nagaland", prefix: "nagaland" },
                { label: "Tripura", prefix: "tripura" },
                { label: "Sikkim", prefix: "sikkim" },
              ].map((state) => (
                <tr key={state.prefix} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{state.label}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`northeast_80ie_${state.prefix}_1` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Undertaking no."
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`northeast_80ie_${state.prefix}_2` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Undertaking no."
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Total deduction for undertakings located in North-East (total of all above)</td>
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-bold">
                  <input
                    type="number"
                    {...register("northeast_80ie_total" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Deduction Summary */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-bold text-yellow-900 mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Total Deduction under section 80-IE (a+i): (a)
              </label>
              <input
                type="number"
                {...register("northeast_80ie_final_total" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Total Deduction under section 80-IE: (b)
              </label>
              <input
                type="number"
                {...register("northeast_80ie_summary_total" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80IE;
