import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleTRProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleTR: React.FC<ScheduleTRProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch } = form;
  const [rows, setRows] = useState(2);

  const addRow = () => setRows(rows + 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule TR</h2>
      <p className="text-gray-600 mb-6">
        Summary of tax relief claimed for taxes paid outside India (available only in case of resident)
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide summary of tax relief claimed under section 91 or provisions of Double Taxation Avoidance Agreement (DTAA) for taxes paid outside India. Include details of total tax relief available and claimed from Schedule FSI.
          </p>
        </div>

        {/* Summary Details */}
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Tax Relief Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-center">Sl. No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Country Code</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Taxpayer Identification Number</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total taxes paid outside India (Total of (e) of Schedule FSI in foreign currency)</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total tax relief available (Total of (e) of Schedule FSI in INR)</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Section under which relief claimed (91/ITA)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{idx + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        {...register(`tr_country_code_${idx}` as any)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Country Code"
                        maxLength={2}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        {...register(`tr_tin_${idx}` as any)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="TIN"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        {...register(`tr_total_tax_paid_${idx}` as any, { valueAsNumber: true })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        {...register(`tr_total_relief_available_${idx}` as any, { valueAsNumber: true })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`tr_relief_section_${idx}` as any)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Section 91">Section 91</option>
                        <option value="DTAA Article">DTAA Article</option>
                        <option value="Both">Both 91 & DTAA</option>
                      </select>
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100">
                  <td colSpan={6} className="border border-gray-300 px-4 py-2">
                    <button
                      type="button"
                      onClick={addRow}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + Add Country
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-200 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right">
                    Total
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: rows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`tr_total_tax_paid_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: rows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`tr_total_relief_available_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Relief Computation */}
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Relief Computation</h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold w-2/3">
                  1. Total tax relief available in respect of country where DTAA is applicable (section 90/90A) [from above]
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tr_dtaa_relief_available" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  2. Total tax relief available in respect of country where DTAA is not applicable (section 91) [from above]
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tr_section91_relief_available" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  3. Whether any tax paid outside India on which tax relief was claimed in India, has been subsequently refunded or credited in the country of jurisdiction. [If yes, specify Amount and Country]
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select {...register("tr_refund_claimed" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  4. Amount of tax refunded/credited
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tr_refund_amount" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  5. Country in which tax is refunded/credited
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tr_refund_country" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Country name"
                  />
                </td>
              </tr>

              <tr className="bg-gray-100 font-semibold hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  6. Total tax relief allowed u/s 91 or as per DTAA (1 + 2)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("tr_dtaa_relief_available" as any) || 0) +
                    (watch("tr_section91_relief_available" as any) || 0)
                  ).toLocaleString()}
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

export default ScheduleTR;
