import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80GGCCProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80GGCC: React.FC<Schedule80GGCCProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80GGCC</h2>
      <p className="text-gray-600 mb-6">
        Details of contributions made to political parties
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Contributions to
            political parties are deductible in full from gross total income
            under section 80GGC. Provide details of contributions made.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold w-8">
                  S. No.
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Date
                </th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  Name of Political Party
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Contribution in cash
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Contribution in other mode
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Total Contribution
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Eligible amount of contribution
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Transaction Reference number (UPI/transfer or Cheque
                  number/NEFT/RTGS)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  IFS code of Bank
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
                      {...register(`political_80ggcc_date_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`political_80ggcc_party_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Party name"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`political_80ggcc_cash_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`political_80ggcc_other_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 bg-gray-50">
                    <input
                      type="number"
                      {...register(`political_80ggcc_total_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      placeholder="0"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 p-2 bg-blue-50">
                    <input
                      type="number"
                      {...register(`political_80ggcc_eligible_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`political_80ggcc_txref_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ref number"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`political_80ggcc_ifs_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="IFS code"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 border-b border-gray-300">
                <td
                  colSpan={5}
                  className="border border-gray-300 p-2 font-semibold"
                >
                  Total contribution
                </td>
                <td className="border border-gray-300 p-2 bg-blue-50">
                  <input
                    type="number"
                    {...register("political_80ggcc_total_all" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="0"
                    readOnly
                  />
                </td>
                <td
                  colSpan={3}
                  className="border border-gray-300 p-2 bg-blue-50"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600">
          Add additional rows as needed for more contributions.
        </p>

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

export default Schedule80GGCC;
