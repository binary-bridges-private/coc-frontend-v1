import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleVIAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleVIA: React.FC<ScheduleVIAProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;

  const total80g = (watch("chap6_80g" as any) || 0);
  const total80ggb = (watch("chap6_80ggb" as any) || 0);
  const total80gga = (watch("chap6_80gga" as any) || 0);
  const total80ggc = (watch("chap6_80ggc" as any) || 0);
  const total80ia = (watch("chap6_80ia" as any) || 0);
  const total80iab = (watch("chap6_80iab" as any) || 0);
  const total80ib = (watch("chap6_80ib" as any) || 0);
  const total80ie = (watch("chap6_80ie" as any) || 0);
  const total80jja = (watch("chap6_80jja" as any) || 0);
  const total80lla = (watch("chap6_80lla" as any) || 0);
  const total80pa = (watch("chap6_80pa" as any) || 0);

  const partBTotal = total80g + total80ggb + total80gga + total80ggc;

  const partCTotal =
    total80ia +
    total80iab +
    total80ib +
    total80ie +
    total80jja +
    total80lla +
    total80pa;

  const grandTotal = partBTotal + partCTotal;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule VI-A</h2>
      <p className="text-gray-600 mb-6">Deductions under Chapter VI-A</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide summary of all deductions under Chapter VI-A of the Income Tax Act.
          </p>
        </div>

        {/* Part B: Deductions in respect of certain payments */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
            Part B: Deduction in respect of certain payments
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                a) 80G - Donations
              </label>
              <input
                type="number"
                {...register("chap6_80g" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                b) 80GGB - Donations to Political Parties
              </label>
              <input
                type="number"
                {...register("chap6_80ggb" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                c) 80GGA - Donations for Research
              </label>
              <input
                type="number"
                {...register("chap6_80gga" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                d) 80GGC - Donations to Research
              </label>
              <input
                type="number"
                {...register("chap6_80ggc" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <div className="text-lg font-bold text-gray-800">
              Total Deduction under Part B (a + b + c + d):
              <span className="text-blue-600 ml-2">{partBTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Part C: Deductions in respect of certain incomes */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
            Part C: Deduction in respect of certain incomes
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                e) 80-IA - Infrastructure Deduction
              </label>
              <input
                type="number"
                {...register("chap6_80ia" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                f) 80-IAB - Infrastructure/Housing
              </label>
              <input
                type="number"
                {...register("chap6_80iab" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                g) 80-IB - Housing Project Deduction
              </label>
              <input
                type="number"
                {...register("chap6_80ib" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                h) 80-IE - North-East Region Deduction
              </label>
              <input
                type="number"
                {...register("chap6_80ie" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                k) 80JJA - IFSC Banking Unit
              </label>
              <input
                type="number"
                {...register("chap6_80jja" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                l) 80LLA - NPS Annuity Plan
              </label>
              <input
                type="number"
                {...register("chap6_80lla" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                m) 80-PA - Dividend Income
              </label>
              <input
                type="number"
                {...register("chap6_80pa" as any, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <div className="text-lg font-bold text-gray-800">
              Total Deduction under Part C (e of Schedule 80-IA):
              <span className="text-blue-600 ml-2">{partCTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-6">
          <div className="text-xl font-bold text-blue-900">
            Total deductions under Chapter VI-A (1 + 2):
            <span className="text-blue-600 ml-2 text-2xl">{grandTotal.toLocaleString()}</span>
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

export default ScheduleVIA;
