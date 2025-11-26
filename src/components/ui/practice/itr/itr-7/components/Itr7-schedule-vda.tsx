import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleVDAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleVDA: React.FC<ScheduleVDAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule VDA
          </h1>
          <p className="text-slate-600 text-lg">
            Income from transfer of Virtual Digital Assets
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Note: Details of every transaction are to be filled, wherein every "transfer" is a transaction
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-slate-700 border-collapse border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">S. No. (Col. 1)</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">Date of Acquisition (Col. 2)</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">Date of Transfer (Col. 3)</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">Head under which income to be taxed (Business/Capital Gain) (Col. 4)</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">Cost of Acquisition (in case of gift; a. Enter the amount on which tax is paid u/s 56(2)(x) if any; b. In any other case cost to previous owner) (Col. 5)</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">Consideration Received (Col. 6)</th>
                  <th className="border border-slate-300 px-3 py-2 font-semibold text-center">Income from transfer of Virtual Digital Assets (enter nil in case of loss) (Col. 6 - Col. 5) (Col. 7)</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-slate-300 px-3 py-2 text-center font-semibold">1</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="date"
                      {...register("vda_1_date_acquisition")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="date"
                      {...register("vda_1_date_transfer")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <select
                      {...register("vda_1_income_head")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">Select</option>
                      <option value="business">Business Income</option>
                      <option value="capital_gain">Capital Gain</option>
                    </select>
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="number"
                      {...register("vda_1_cost_acquisition")}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="number"
                      {...register("vda_1_consideration_received")}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="number"
                      value={Math.max(
                        0,
                        (Number(watch("vda_1_consideration_received") || 0) -
                          Number(watch("vda_1_cost_acquisition") || 0))
                      )}
                      readOnly
                      className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                    />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border border-slate-300 px-3 py-2 text-center font-semibold">2</td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="date"
                      {...register("vda_2_date_acquisition")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="date"
                      {...register("vda_2_date_transfer")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <select
                      {...register("vda_2_income_head")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value="">Select</option>
                      <option value="business">Business Income</option>
                      <option value="capital_gain">Capital Gain</option>
                    </select>
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="number"
                      {...register("vda_2_cost_acquisition")}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="number"
                      {...register("vda_2_consideration_received")}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-slate-300 px-3 py-2">
                    <input
                      type="number"
                      value={Math.max(
                        0,
                        (Number(watch("vda_2_consideration_received") || 0) -
                          Number(watch("vda_2_cost_acquisition") || 0))
                      )}
                      readOnly
                      className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                    />
                  </td>
                </tr>

                {/* Add rows row */}
                <tr>
                  <td colSpan={7} className="border border-slate-300 px-3 py-2 text-center text-sm font-semibold">
                    Add Rows
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-semibold text-slate-800 mb-3">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Total Income from VDA (Business Income)
                </label>
                <input
                  type="number"
                  {...register("vda_total_business_income")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md font-bold bg-yellow-100"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Total Income from VDA (Capital Gain)
                </label>
                <input
                  type="number"
                  {...register("vda_total_capital_gain")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md font-bold bg-yellow-100"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded text-sm text-slate-700">
            <h4 className="font-semibold mb-2">Instructions:</h4>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Enter date of acquisition and transfer in DD/MM/YYYY format</li>
              <li>Select whether income should be categorized as Business Income or Capital Gain</li>
              <li>Enter cost of acquisition (or amount on which tax was paid if gift)</li>
              <li>Enter consideration received for the transfer</li>
              <li>Column 7 calculates automatically: Col. 6 - Col. 5 (or nil if loss)</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleVDA;
