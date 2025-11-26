import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80IAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80IA: React.FC<Schedule80IAProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80-IA</h2>
      <p className="text-gray-600 mb-6">Deductions under section 80-IA (Infrastructure Development)</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of profits from infrastructure development activities eligible for deduction.
          </p>
        </div>

        {/* Section A: Undertaking Details */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking Details</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking No. 1</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking No. 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Undertaking Name</td>
                <td className="border border-gray-300 px-4 py-2">
                  <textarea
                    {...register("infra_80ia_name_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    rows={2}
                    placeholder="Undertaking name"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <textarea
                    {...register("infra_80ia_name_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    rows={2}
                    placeholder="Undertaking name"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Nature of Business</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("infra_80ia_nature_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="e.g., Road, Airport, Port"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("infra_80ia_nature_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="e.g., Road, Airport, Port"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">First Assessment Year of Deduction</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("infra_80ia_first_ay_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="e.g., AY 2023-24"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("infra_80ia_first_ay_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="e.g., AY 2023-24"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Profits from Infrastructure (in INR)</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("infra_80ia_profits_1" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("infra_80ia_profits_2" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border border-gray-300 px-4 py-2 font-bold">Total Deduction under section 80-IA</td>
                <td colSpan={2} className="border border-gray-300 px-4 py-2 font-bold">
                  {(
                    (watch("infra_80ia_profits_1" as any) || 0) +
                    (watch("infra_80ia_profits_2" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
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

export default Schedule80IA;
