import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80GGAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80GGA: React.FC<Schedule80GGAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80GGA</h2>
      <p className="text-gray-600 mb-6">
        Details of donations for scientific research or rural development
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Claim deduction for
            donations to approved scientific research or rural development
            institutions under section 80GGA.
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
                  Percentage reduction for which deduction is claimed
                </th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  Name and address of donee
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-20">
                  PAN of Donee
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Donation in cash
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Donation in other mode
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Total Donation
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Eligible Amount of Donation
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
                    <select
                      {...register(`donation_80gga_reduction_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      <option value="100">100%</option>
                      <option value="50">50%</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`donation_80gga_name_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Donee name"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`donation_80gga_pan_${i}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="PAN"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`donation_80gga_cash_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(`donation_80gga_other_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 bg-gray-50">
                    <input
                      type="number"
                      {...register(`donation_80gga_total_${i}` as any, {
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
                      {...register(`donation_80gga_eligible_${i}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 border-b border-gray-300">
                <td
                  colSpan={7}
                  className="border border-gray-300 p-2 font-semibold"
                >
                  Total Donation
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("donation_80gga_total_all" as any, {
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

export default Schedule80GGA;
