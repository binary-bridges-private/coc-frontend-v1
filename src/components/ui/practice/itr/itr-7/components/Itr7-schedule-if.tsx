import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleIFProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleIF: React.FC<ScheduleIFProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;
  const [rows, setRows] = useState(3);

  const addRow = () => {
    setRows(rows + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule IF</h2>
      <p className="text-gray-600 mb-6">
        Information regarding investment in unincorporated entities
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of investments held in unincorporated entities such as partnerships and trusts.
          </p>
        </div>

        {/* Investment Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-center">SL No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name of the entity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type of entity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">PAN of the entity</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Whether the entity is liable for audit? (Yes/No)</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Whether section 92E is applicable? (Yes/No)</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Percentage Share in the profit of the entity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount of share in the profit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Capital balance as on 31st March in the entity</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center font-semibold">{idx + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <textarea
                      {...register(`investment_if_entity_name_${idx + 1}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      rows={2}
                      placeholder="Entity name"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      {...register(`investment_if_entity_type_${idx + 1}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="">Select</option>
                      <option value="partnership">Partnership Firm</option>
                      <option value="trust">Trust</option>
                      <option value="llp">LLP</option>
                      <option value="other">Other</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`investment_if_pan_${idx + 1}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="PAN"
                      maxLength={10}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      {...register(`investment_if_liable_audit_${idx + 1}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      {...register(`investment_if_section_92e_${idx + 1}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`investment_if_percentage_share_${idx + 1}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`investment_if_amount_share_${idx + 1}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`investment_if_capital_balance_${idx + 1}` as any, { valueAsNumber: true })}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100">
                <td colSpan={9} className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    type="button"
                    onClick={addRow}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium text-sm"
                  >
                    + Add Investment Entry
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td colSpan={7} className="border border-gray-300 px-4 py-2 font-bold text-right">
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  {(Array.from({ length: rows }).reduce((sum: number, _, idx) => {
                    return sum + ((watch(`investment_if_amount_share_${idx + 1}` as any) as number) || 0);
                  }, 0) as number).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  {(Array.from({ length: rows }).reduce((sum: number, _, idx) => {
                    return sum + ((watch(`investment_if_capital_balance_${idx + 1}` as any) as number) || 0);
                  }, 0) as number).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-2 gap-4 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Number of Entities
            </label>
            <input
              type="number"
              {...register("investment_if_total_entities" as any, { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Share in Profits
            </label>
            <input
              type="number"
              {...register("investment_if_total_profits" as any, { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
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

export default ScheduleIF;
