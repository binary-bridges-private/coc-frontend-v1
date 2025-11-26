import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80IBProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80IB: React.FC<Schedule80IBProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80-IB</h2>
      <p className="text-gray-600 mb-6">Deductions under section 80-IB (Building Housing Project)</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of profits from construction of residential buildings.
          </p>
        </div>

        {/* Undertakings Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking No. 1</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Undertaking No. 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-50 hover:bg-yellow-100">
                <td className="border border-gray-300 px-4 py-2 font-bold">a) Commercial/Refining Project</td>
                <td colSpan={2} className="border border-gray-300 px-4 py-2 italic text-gray-600">Refer to Item 50 of Form 10CCB</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Undertaking no. a1</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_a1_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_a1_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Undertaking no. a2</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_a2_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_a2_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
              </tr>

              <tr className="bg-yellow-50 hover:bg-yellow-100">
                <td className="border border-gray-300 px-4 py-2 font-bold">b) Development/Building Housing Project</td>
                <td colSpan={2} className="border border-gray-300 px-4 py-2 italic text-gray-600">Refer to Item 50 of Form 10CCB</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Undertaking no. b1</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_b1_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_b1_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Undertaking no. b2</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_b2_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("housing_80ib_b2_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Undertaking no."
                  />
                </td>
              </tr>

              <tr className="bg-gray-200 font-bold">
                <td className="border border-gray-300 px-4 py-2">Total deduction under section 80-IB</td>
                <td colSpan={2} className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("housing_80ib_total" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
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

export default Schedule80IB;
