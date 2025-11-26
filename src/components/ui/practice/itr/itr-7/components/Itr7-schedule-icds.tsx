import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleICDSProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleICDS: React.FC<ScheduleICDSProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { watch, setValue, register } = form;

  const icds_rows = [
    { id: 1, label: "Accounting Policies" },
    {
      id: 2,
      label:
        "Valuation of Inventories/Change in method of valuation u/s 145(a)",
    },
    { id: 3, label: "Construction Contracts" },
    { id: 4, label: "Revenue Recognition" },
    { id: 5, label: "Tangible Fixed Assets" },
    { id: 6, label: "Changes in Foreign Exchange Rates" },
    { id: 7, label: "Government Grants" },
    {
      id: 8,
      label:
        "Securities (other than effect of change in method of valuation u/s 145(a))",
    },
    { id: 9, label: "Borrowing Costs" },
    {
      id: 10,
      label: "Provisions, Contingent Liabilities and Contingent Assets",
    },
    { id: 11, label: "Total effect of ICDS adjustments on profit" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule ICDS</h2>
      <p className="text-gray-600 mb-6">
        Effect of Income Computation Disclosure Standards on profit
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Disclose the impact of
            ICDS adjustments on taxable profit. Enter both increase and decrease
            amounts.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold w-8">
                  Sl. No.
                </th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  ICDS
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-32">
                  Increase in Profit (Rs.)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-32">
                  Decrease in profit (Rs.)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-32">
                  Net Effect (Rs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {icds_rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 text-center font-semibold">
                    {row.id}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {row.label}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`icds_increase_${row.id}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`icds_decrease_${row.id}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 bg-gray-50">
                    <input
                      type="number"
                      {...register(`icds_net_effect_${row.id}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      placeholder="0"
                      readOnly
                    />
                  </td>
                </tr>
              ))}
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

export default ScheduleICDS;
