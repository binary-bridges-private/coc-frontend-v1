import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleFSIProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleFSI: React.FC<ScheduleFSIProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch } = form;
  const [residentialRows, setResidentialRows] = useState(2);
  const [nonResidentialRows, setNonResidentialRows] = useState(2);

  const addResidentialRow = () => setResidentialRows(residentialRows + 1);
  const addNonResidentialRow = () => setNonResidentialRows(nonResidentialRows + 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule FSI</h2>
      <p className="text-gray-600 mb-6">
        Details of Income from outside India and tax relief (available only in case of resident)
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of foreign income including business profits, salary, capital gains, and other income. Include information on tax paid abroad and applicable DTAA relief.
          </p>
        </div>

        {/* Residential Income Section */}
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">A. For Resident Individuals</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-center">Sl.</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Country</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Nature of Income</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Period from (DD/MM/YYYY)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Head of Income</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Income from outside India (B-ST)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Tax paid outside India</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Tax paid u/s 160/161 of ITA</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Relief u/s 91 or chapter VIA</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: residentialRows }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="text" {...register(`fsi_res_country_${idx}` as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="Country" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select {...register(`fsi_res_nature_${idx}` as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-xs">
                        <option value="">Select</option>
                        <option value="Business/Profession">Business/Profession</option>
                        <option value="Salary">Salary</option>
                        <option value="Capital Gains">Capital Gains</option>
                        <option value="House Property">House Property</option>
                        <option value="Other Sources">Other Sources</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="text" {...register(`fsi_res_period_${idx}` as any)} placeholder="DD/MM/YYYY" className="w-full px-2 py-1 border border-gray-300 rounded text-xs" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="text" {...register(`fsi_res_head_${idx}` as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="Head" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_res_income_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_res_tax_paid_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_res_tax_160161_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_res_relief_91_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100">
                  <td colSpan={9} className="border border-gray-300 px-2 py-2">
                    <button
                      type="button"
                      onClick={addResidentialRow}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + Add Row
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-200 font-bold">
                  <td colSpan={5} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: residentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_res_income_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: residentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_res_tax_paid_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: residentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_res_tax_160161_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: residentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_res_relief_91_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-Residential Income Section */}
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">B. For Residential Individuals (Separate Section)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-center">Sl.</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Country</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Nature of Income</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Period to (DD/MM/YYYY)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Head of Income</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Income from outside India</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Tax paid u/s 160/161</th>
                  <th className="border border-gray-300 px-2 py-2 text-right">Relief u/s 91</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: nonResidentialRows }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="text" {...register(`fsi_nonres_country_${idx}` as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="Country" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select {...register(`fsi_nonres_nature_${idx}` as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-xs">
                        <option value="">Select</option>
                        <option value="Business/Profession">Business/Profession</option>
                        <option value="Salary">Salary</option>
                        <option value="Capital Gains">Capital Gains</option>
                        <option value="House Property">House Property</option>
                        <option value="Other Sources">Other Sources</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="text" {...register(`fsi_nonres_period_${idx}` as any)} placeholder="DD/MM/YYYY" className="w-full px-2 py-1 border border-gray-300 rounded text-xs" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="text" {...register(`fsi_nonres_head_${idx}` as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="Head" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_nonres_income_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_nonres_tax_160161_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input type="number" {...register(`fsi_nonres_relief_91_${idx}` as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" placeholder="0" />
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100">
                  <td colSpan={8} className="border border-gray-300 px-2 py-2">
                    <button
                      type="button"
                      onClick={addNonResidentialRow}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + Add Row
                    </button>
                  </td>
                </tr>
                <tr className="bg-gray-200 font-bold">
                  <td colSpan={5} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: nonResidentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_nonres_income_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: nonResidentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_nonres_tax_160161_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {(Array.from({ length: nonResidentialRows }) as unknown[])
                      .reduce((sum: number, _, idx) => sum + (Number(watch(`fsi_nonres_relief_91_${idx}` as any)) || 0), 0 as number)
                      .toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
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

export default ScheduleFSI;
