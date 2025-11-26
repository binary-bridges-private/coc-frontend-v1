import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleRAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleRA: React.FC<ScheduleRAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch } = form;

  const donation1 = watch("donation_ra_total_1" as any);
  const donation2 = watch("donation_ra_total_2" as any);
  const donation3 = watch("donation_ra_total_3" as any);

  const totalDonations = (donation1 || 0) + (donation2 || 0) + (donation3 || 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule RA</h2>
      <p className="text-gray-600 mb-6">
        Details of donations to research associations [Deduction under sections
        35(1)(ii), 35(1)(iia), or 35(1)(iii) or 35(2AA)]
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of
            donations made to approved research associations for scientific
            research or developmental activities.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  S.No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name and Address of Donee
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  PAN of Donee
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Donation in Cash
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Donation in Other Mode
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Total Donation
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Eligible Amount of Donation
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {idx}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <textarea
                      {...register(`donation_ra_name_${idx}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                      placeholder="Name and address"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`donation_ra_pan_${idx}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="PAN"
                      maxLength={10}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`donation_ra_cash_${idx}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`donation_ra_other_${idx}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">
                    {(
                      (watch(`donation_ra_cash_${idx}` as any) || 0) +
                      (watch(`donation_ra_other_${idx}` as any) || 0)
                    ).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`donation_ra_eligible_${idx}` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td colSpan={2} className="border border-gray-300 px-4 py-2">
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2" />
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("donation_ra_cash_1" as any) || 0) +
                    (watch("donation_ra_cash_2" as any) || 0) +
                    (watch("donation_ra_cash_3" as any) || 0)
                  ).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("donation_ra_other_1" as any) || 0) +
                    (watch("donation_ra_other_2" as any) || 0) +
                    (watch("donation_ra_other_3" as any) || 0)
                  ).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {totalDonations.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("donation_ra_eligible_1" as any) || 0) +
                    (watch("donation_ra_eligible_2" as any) || 0) +
                    (watch("donation_ra_eligible_3" as any) || 0)
                  ).toLocaleString()}
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

export default ScheduleRA;
