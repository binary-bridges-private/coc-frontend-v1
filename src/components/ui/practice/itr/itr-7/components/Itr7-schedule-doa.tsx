import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleDOAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleDOA: React.FC<ScheduleDOAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule DOA
          </h1>
          <p className="text-slate-600 text-lg">
            Depreciation on other assets (Other than assets on which full capital expenditure is allowable as deduction)
          </p>
        </div>

        {/* Block of Assets Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead className="bg-slate-200">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Sl. No.</th>
                  <th className="border border-slate-300 p-3">Block of assets</th>
                  <th className="border border-slate-300 p-3">Land</th>
                  <th className="border border-slate-300 p-3">Building</th>
                  <th className="border border-slate-300 p-3">Furniture</th>
                  <th className="border border-slate-300 p-3">Intangible</th>
                  <th className="border border-slate-300 p-3">Ships</th>
                </tr>
                <tr className="bg-slate-100">
                  <td className="border border-slate-300 p-3" colSpan={2}></td>
                  <td className="border border-slate-300 p-3 text-center text-sm font-semibold">(i) Nil</td>
                  <td className="border border-slate-300 p-3 text-center text-sm font-semibold">(ii) 5%</td>
                  <td className="border border-slate-300 p-3 text-center text-sm font-semibold">(iii) 10%</td>
                  <td className="border border-slate-300 p-3 text-center text-sm font-semibold">(iv) 40%</td>
                  <td className="border border-slate-300 p-3 text-center text-sm font-semibold">(v) 20%</td>
                </tr>
              </thead>
              <tbody>
                {/* Row 2 - Rates */}
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-3">2</td>
                  <td className="border border-slate-300 p-3 font-semibold">Rate (%)</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">Nil</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">5</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">10</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">40</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">20</td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border border-slate-300 p-3">3</td>
                  <td className="border border-slate-300 p-3">Written down value on the first day of previous year</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_3_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_3_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_3_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_3_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_3_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="border border-slate-300 p-3">4</td>
                  <td className="border border-slate-300 p-3">Additions for a period of 180 days or more in the previous year</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_180_4_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_180_4_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_180_4_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_180_4_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_180_4_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="border border-slate-300 p-3">5</td>
                  <td className="border border-slate-300 p-3">Consideration or other realization during the previous year out of 3 or 4</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_5_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_5_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_5_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_5_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_5_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 6 */}
                <tr>
                  <td className="border border-slate-300 p-3">6</td>
                  <td className="border border-slate-300 p-3">Amount on which depreciation at full rate to be allowed (3+4-5)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_full_6_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_full_6_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_full_6_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_full_6_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_full_6_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 7 */}
                <tr>
                  <td className="border border-slate-300 p-3">7</td>
                  <td className="border border-slate-300 p-3">Additions for a period of less than 180 days in the previous year</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_less180_7_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_less180_7_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_less180_7_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_less180_7_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_add_less180_7_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 8 */}
                <tr>
                  <td className="border border-slate-300 p-3">8</td>
                  <td className="border border-slate-300 p-3">Consideration or other realizations during the year out of 7</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_8_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_8_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_8_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_8_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_cons_8_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 9 */}
                <tr>
                  <td className="border border-slate-300 p-3">9</td>
                  <td className="border border-slate-300 p-3">Amount on which depreciation at half rate to be allowed (7-8)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_half_9_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_half_9_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_half_9_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_half_9_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_amt_half_9_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 10 */}
                <tr>
                  <td className="border border-slate-300 p-3">10</td>
                  <td className="border border-slate-300 p-3">Depreciation on 6 at full rate</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_full_10_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_full_10_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_full_10_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_full_10_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_full_10_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 11 */}
                <tr>
                  <td className="border border-slate-300 p-3">11</td>
                  <td className="border border-slate-300 p-3">Depreciation on 9 at half rate</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_half_11_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_half_11_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_half_11_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_half_11_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_depr_half_11_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 12 */}
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 p-3 font-bold">12</td>
                  <td className="border border-slate-300 p-3 font-bold">Total depreciation (10+11)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_total_depr_12_land")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_total_depr_12_bldg")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_total_depr_12_furn")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_total_depr_12_intang")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_total_depr_12_ships")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>
                {/* Row 13 */}
                <tr>
                  <td className="border border-slate-300 p-3">13</td>
                  <td className="border border-slate-300 p-3">Depreciation disallowed under section 38(2) of the I.T. Act</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_disallowed_13_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_disallowed_13_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_disallowed_13_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_disallowed_13_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_disallowed_13_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 14 */}
                <tr className="bg-green-50">
                  <td className="border border-slate-300 p-3 font-bold">14</td>
                  <td className="border border-slate-300 p-3 font-bold">Net aggregate depreciation (12-13)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_net_depr_14_land")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_net_depr_14_bldg")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_net_depr_14_furn")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_net_depr_14_intang")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_net_depr_14_ships")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>
                {/* Row 15 */}
                <tr>
                  <td className="border border-slate-300 p-3">15</td>
                  <td className="border border-slate-300 p-3">Proportionate aggregate depreciation allowable in the event of succession, amalgamation, demerger etc.</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_prorata_15_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_prorata_15_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_prorata_15_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_prorata_15_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_prorata_15_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 16 */}
                <tr>
                  <td className="border border-slate-300 p-3">16</td>
                  <td className="border border-slate-300 p-3">Expenditure incurred in connection with transfer of asset/assets</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_exp_transfer_16_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_exp_transfer_16_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_exp_transfer_16_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_exp_transfer_16_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_exp_transfer_16_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 17 */}
                <tr>
                  <td className="border border-slate-300 p-3">17</td>
                  <td className="border border-slate-300 p-3">Capital gains/loss under section 50 (5+8-3-4-7-16)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_capital_gains_17_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_capital_gains_17_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_capital_gains_17_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_capital_gains_17_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_capital_gains_17_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 18 */}
                <tr>
                  <td className="border border-slate-300 p-3">18</td>
                  <td className="border border-slate-300 p-3">Written down value on the last day of previous year* (6+9-12)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_last_18_land")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_last_18_bldg")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_last_18_furn")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_last_18_intang")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("doa_wdv_last_18_ships")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleDOA;
