import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule115DProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule115D: React.FC<Schedule115DProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 115D</h2>
      <p className="text-gray-600 mb-6">
        Taxable income under section 115D - Unexplained Income (Details of
        Income under sections 68, 69, 69A, 69B, 69C or 69D)
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of
            unexplained income assessed under section 68 (cash credits), 69
            (investments), 69A (expenditure), 69B (money/bullion/jewellery), 69C
            (investments without considering sources), or 69D (unexplained money
            in banks/FDR). Include aggregate Fair Market Value (FMV) of real
            assets and assessments as per section 115D.
          </p>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            1. Aggregate Fair Market Value (FMV) of real assets of specified
            person
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Aggregate FMV of real assets
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_fmv_real_assets" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Less: Total liability of specified person
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_total_liability" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-gray-200 font-bold hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">
                  Net value (1 - 2)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("sched_115d_fmv_real_assets" as any) || 0) -
                    (watch("sched_115d_total_liability" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            2. Details of Unexplained Income Assessment
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  (a) FMV of assets directly acquired out of income referred to
                  in section 68(1)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_fmv_section68" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  (b) FMV of assets acquired during the period from the date of
                  creation or establishment to the effective date of notice u/s
                  143(2) or from date of transfer to the person assessed
                  (benefit vs 11 and 12 not claimed during the said assessment
                  year)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_fmv_section69" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  (c) FMV of assets transferred in accordance with third
                  direction in section 115D(2)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_fmv_transferred" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="bg-gray-100 font-semibold hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  Add: Aggregate of (a), (b) & (c)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("sched_115d_fmv_section68" as any) || 0) +
                    (watch("sched_115d_fmv_section69" as any) || 0) +
                    (watch("sched_115d_fmv_transferred" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Less: Liability in respect of assets at 4 above
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_liability_assets" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="bg-gray-200 font-bold hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">
                  Deemed Income as per section 115D(1) = (4a - 5)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("sched_115d_fmv_section68" as any) || 0) +
                    (watch("sched_115d_fmv_section69" as any) || 0) +
                    (watch("sched_115d_fmv_transferred" as any) || 0) -
                    (watch("sched_115d_liability_assets" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            3. Tax on Deemed Income
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Deemed income u/s 115D(1) = (4a - 5) [from above]
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_deemed_income" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Additional income-tax payable u/s 115D at maximum marginal
                  rate
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_addl_tax" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Income-tax payable u/s 115D
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_income_tax_payable" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Specified due u/s 115D
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_specified_due" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Additional income-tax and interest payable
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_interest_payable" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="bg-gray-200 font-bold hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">
                  Tax and Interest Payable (7 + 8)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("sched_115d_income_tax_payable" as any) || 0) +
                    (watch("sched_115d_interest_payable" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            4. Deposit Details
          </h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 1
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 2
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Date 3
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Date(s) of deposit of tax on accrued income (DD/MM/YYYY)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_deposit_date_1" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_deposit_date_2" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_deposit_date_3" as any)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Name of Bank and Branch
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_bank_name_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_bank_name_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_bank_name_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  BSR Code
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_bsr_code_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_bsr_code_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_bsr_code_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Serial number of challan
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_challan_serial_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_challan_serial_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("sched_115d_challan_serial_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Amount deposited
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_amount_deposit_1" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_amount_deposit_2" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("sched_115d_amount_deposit_3" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
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

export default Schedule115D;
