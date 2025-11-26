import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule80LProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule80L: React.FC<Schedule80LProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 80L</h2>
      <p className="text-gray-600 mb-6">
        Deduction in respect of commitment to contribute to National Pension
        System (NPS)
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Corporate bodies can
            claim deduction for committed contribution to NPS. Provide
            contribution details and amount.
          </p>
        </div>

        <div className="bg-white border border-gray-300 rounded p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Committed contribution amount (Rs.)
              </label>
              <input
                type="number"
                {...register("nps_80l_committed_amount" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount actually contributed (Rs.)
              </label>
              <input
                type="number"
                {...register("nps_80l_actual_amount" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Details of NPS contribution scheme and tier
            </label>
            <textarea
              {...register("nps_80l_details" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter details of tier, scheme name, etc."
            />
          </div>

          <div className="mt-4 bg-blue-50 p-3 rounded">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Eligible deduction amount (Rs.)
            </label>
            <input
              type="number"
              {...register("nps_80l_eligible_deduction" as any, {
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              placeholder="0"
              readOnly
            />
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Important:</span> The deduction is
            limited to the lesser of committed amount or amount actually
            contributed during the year, subject to 10% of book profit or
            maximum as specified.
          </p>
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

export default Schedule80L;
