import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80JACProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80JAC: React.FC<Schedule80JACProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80JAC</h2>
      <p className="text-gray-600 mb-6">
        Deduction in respect of eligible start-up under section 80JAC
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Eligible start-ups can
            claim deduction of profit or loss from eligible business. Fill
            details of date of incorporation, nature of business, and deduction
            amount.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold w-8">
                  Sl. No.
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Date of incorporation of startup
                </th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  Nature of business
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Certificate obtained from Inter-Ministerial Board or DSIR
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  First A.Y. in which deduction was claimed
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Amount of deduction claimed for current A.Y.
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 text-center font-semibold">
                    {i}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="date"
                      {...register(`startup_80jac_date_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`startup_80jac_nature_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nature of business"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      {...register(`startup_80jac_cert_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`startup_80jac_first_ay_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="A.Y. YYYY-YY"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`startup_80jac_deduction_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 border-b border-gray-300">
                <td
                  colSpan={5}
                  className="border border-gray-300 p-2 font-semibold"
                >
                  Total deduction under section 80JAC
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("startup_80jac_total" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="0"
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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

export default Schedule80JAC;
