import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleITAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleITA: React.FC<ScheduleITAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule ITA
          </h1>
          <p className="text-slate-600 text-lg">
            From sale of equity share in a company or unit of equity oriented fund or unit of a business trust on which STT is paid
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-slate-700 border-collapse border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">S. No (a)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Share/Unit or ISIN (b)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Shareholder transactions/ transfers (c)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">IS (d)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Name of the Share/Unit (e)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">No. of Shares/Units (f)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Sale price per Share/Unit (g)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Full Value of Consideration received if shares are acquired on or before 31.01.2018 (Total Sale Value) (h)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Cost of acquisition (i)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">If long term capital asset transferred on or after 01.02.2018 and before 31.03.2018, Fair Market Value per unit as on 31.01.2018 (j)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Fair Mark Value as per ESC2 (k)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Expenditure for collection (l)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Balance = (h-i) or (h-k) or (h-j) (m)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">If Loss and what ITR section (n)</th>
                  <th className="border border-slate-300 px-2 py-2 font-semibold">Total add on LT CG (o)</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-slate-300 px-2 py-2 text-center">1</td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_1_isin")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_1_trans")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_1_is")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_1_name")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_no_shares")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_sale_price")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_fvoc")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_cost")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_fmv_31jan")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_fmv_esc")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_expenditure")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_balance")} className="w-full px-1 py-0.5 border rounded text-xs font-bold bg-yellow-100" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_1_loss_itr_section")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_1_total_add_ltcg")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="border border-slate-300 px-2 py-2 text-center">2</td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_2_isin")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_2_trans")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_2_is")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_2_name")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_no_shares")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_sale_price")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_fvoc")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_cost")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_fmv_31jan")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_fmv_esc")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_expenditure")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_balance")} className="w-full px-1 py-0.5 border rounded text-xs font-bold bg-yellow-100" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="text" {...register("ita_2_loss_itr_section")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                  <td className="border border-slate-300 px-2 py-2">
                    <input type="number" {...register("ita_2_total_add_ltcg")} className="w-full px-1 py-0.5 border rounded text-xs" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-4 rounded mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border border-blue-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Item 1: Total of Column 14 where transfer was before 23rd July 2024 (Add rows)
                </label>
                <input
                  type="number"
                  {...register("ita_item1_total_before_23jul")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md font-bold bg-yellow-100"
                />
              </div>
              <div className="bg-white p-4 rounded border border-blue-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Item 2: Total of Column 14 where transfer was on or after 23rd July 2024 (Add rows)
                </label>
                <input
                  type="number"
                  {...register("ita_item2_total_on_after_23jul")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md font-bold bg-yellow-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Item III: Total of LTCG u/s 112A
                </label>
                <input
                  type="number"
                  {...register("ita_item3_total_ltcg_112a")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md font-bold bg-yellow-100"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 bg-slate-50 p-4 rounded">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Add rows</h3>
            <p className="text-xs text-slate-600 mb-3">
              Enter details separately for each transaction. For each row:
            </p>
            <ul className="text-xs text-slate-600 space-y-1 ml-4">
              <li>• Column (h): Enter full value of consideration received</li>
              <li>• Column (i): Enter cost of acquisition</li>
              <li>• Column (j): Enter FMV if transferred between 01.02.2018 and 31.03.2018</li>
              <li>• Column (m): Auto-calculated as Balance = (h-i) or (h-j) or (h-k)</li>
              <li>• Column (o): Total add-on for Long Term Capital Gain</li>
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

export default ScheduleITA;
