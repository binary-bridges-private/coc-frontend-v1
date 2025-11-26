import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule115A1CAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule115A1CA: React.FC<Schedule115A1CAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Schedule 115A1CA
      </h2>
      <p className="text-gray-600 mb-6">
        Details of tax on distributable income adjustments as per section
        115A(1)(2A) as per the schedule provided in e-filing utility
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of
            adjustments to tax on distributable income as per section
            115A(1)(2A). Include all prescribed adjustments and calculations.
          </p>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            A. Primary Adjustments
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold w-1/2">
                  Amount of primary adjustments on which option u/s 115A(1)(2A)
                  is exercised
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_primary_adj" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Tax rate applicable
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_tax_rate" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                    step="0.01"
                  />
                  <span className="text-xs text-gray-500">%</span>
                </td>
              </tr>
              <tr className="bg-gray-200 font-bold hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">
                  Total tax on primary adjustments
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    ((watch("sched_115a1ca_primary_adj" as any) || 0) *
                      (watch("sched_115a1ca_tax_rate" as any) || 0)) /
                    100
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">B. Surcharge</h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Surcharge @ 12% on "a"
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_surcharge_12" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Health & Education cess on (a+b)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_cess_health" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 font-bold hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">
                  Total Additional tax payable (a+b+c)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("sched_115a1ca_surcharge_12" as any) || 0) +
                    (watch("sched_115a1ca_cess_health" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            C. Taxes Paid Details
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 1 (DD/MM/YYYY)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 2 (DD/MM/YYYY)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 3 (DD/MM/YYYY)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 4 (DD/MM/YYYY)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 5 (DD/MM/YYYY)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 6 (DD/MM/YYYY)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Date of deposit
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_deposit_date_1" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_deposit_date_2" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_deposit_date_3" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_deposit_date_4" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_deposit_date_5" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_deposit_date_6" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  BSR/Challan Reference
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_bsr_1" as any)}
                    placeholder="BSR"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_bsr_2" as any)}
                    placeholder="BSR"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_bsr_3" as any)}
                    placeholder="BSR"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_bsr_4" as any)}
                    placeholder="BSR"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_bsr_5" as any)}
                    placeholder="BSR"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115a1ca_bsr_6" as any)}
                    placeholder="BSR"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Amount
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_amount_1" as any, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_amount_2" as any, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_amount_3" as any, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_amount_4" as any, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_amount_5" as any, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115a1ca_amount_6" as any, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 font-bold">
                <td className="border border-gray-300 px-4 py-2">
                  Total Tax Paid
                </td>
                <td colSpan={6} className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("sched_115a1ca_amount_1" as any) || 0) +
                    (watch("sched_115a1ca_amount_2" as any) || 0) +
                    (watch("sched_115a1ca_amount_3" as any) || 0) +
                    (watch("sched_115a1ca_amount_4" as any) || 0) +
                    (watch("sched_115a1ca_amount_5" as any) || 0) +
                    (watch("sched_115a1ca_amount_6" as any) || 0)
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

export default Schedule115A1CA;
