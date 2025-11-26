import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleDPMProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleDPM: React.FC<ScheduleDPMProps> = ({
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
            Schedule DPM
          </h1>
          <p className="text-slate-600 text-lg">
            Depreciation on Plant and Machinery (Other than assets on which full capital expenditure is allowable as deduction under any section)
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
                  <th className="border border-slate-300 p-3">15%</th>
                  <th className="border border-slate-300 p-3">30%</th>
                  <th className="border border-slate-300 p-3">40%</th>
                  <th className="border border-slate-300 p-3">45%</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-slate-300 p-3">1</td>
                  <td className="border border-slate-300 p-3 font-semibold">Block of assets</td>
                  <td className="border border-slate-300 p-3">(i)</td>
                  <td className="border border-slate-300 p-3">(ii)</td>
                  <td className="border border-slate-300 p-3">(iii)</td>
                  <td className="border border-slate-300 p-3">(iv)</td>
                </tr>
                {/* Row 2 - Rate */}
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-3">2</td>
                  <td className="border border-slate-300 p-3 font-semibold">Rate (%)</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">15</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">30</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">40</td>
                  <td className="border border-slate-300 p-3 text-center font-bold">45</td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border border-slate-300 p-3">3</td>
                  <td className="border border-slate-300 p-3">Written down value on the first day of previous year</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_3_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_3_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_3_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_3_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td className="border border-slate-300 p-3">4</td>
                  <td className="border border-slate-300 p-3">Additions for a period of 180 days or more in the previous year</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_180_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_180_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_180_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_180_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td className="border border-slate-300 p-3">5</td>
                  <td className="border border-slate-300 p-3">Consideration or other realization during the previous year out of 3 or 4</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_5_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_5_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_5_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_5_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 6 */}
                <tr>
                  <td className="border border-slate-300 p-3">6</td>
                  <td className="border border-slate-300 p-3">Amount on which depreciation at full rate to be allowed (3+4-5)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_full_6_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_full_6_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_full_6_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_full_6_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 7 */}
                <tr>
                  <td className="border border-slate-300 p-3">7</td>
                  <td className="border border-slate-300 p-3">Additions for a period of less than 180 days in the previous year</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_less180_7_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_less180_7_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_less180_7_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_less180_7_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 8 */}
                <tr>
                  <td className="border border-slate-300 p-3">8</td>
                  <td className="border border-slate-300 p-3">Consideration or other realizations during the year out of 7</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_8_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_8_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_8_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_cons_8_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 9 */}
                <tr>
                  <td className="border border-slate-300 p-3">9</td>
                  <td className="border border-slate-300 p-3">Amount on which depreciation at half rate to be allowed (7-8)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_half_9_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_half_9_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_half_9_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_amt_half_9_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 10 */}
                <tr>
                  <td className="border border-slate-300 p-3">10</td>
                  <td className="border border-slate-300 p-3">Depreciation on 6 at full rate</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_full_10_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_full_10_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_full_10_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_full_10_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 11 */}
                <tr>
                  <td className="border border-slate-300 p-3">11</td>
                  <td className="border border-slate-300 p-3">Depreciation on 9 at half rate</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_half_11_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_half_11_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_half_11_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_depr_half_11_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 12 */}
                <tr>
                  <td className="border border-slate-300 p-3">12</td>
                  <td className="border border-slate-300 p-3">Additional depreciation, if any, on 4</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_12_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_12_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_12_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_12_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 13 */}
                <tr>
                  <td className="border border-slate-300 p-3">13</td>
                  <td className="border border-slate-300 p-3">Additional depreciation, if any, on 7</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_13_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_13_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_13_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_13_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 14 */}
                <tr>
                  <td className="border border-slate-300 p-3">14</td>
                  <td className="border border-slate-300 p-3">Additional depreciation relating to immediately preceding year on asset put to use for less than 180 days</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_14_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_14_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_14_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_add_depr_14_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 15 */}
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 p-3 font-bold">15</td>
                  <td className="border border-slate-300 p-3 font-bold">Total depreciation (10+11+12+13+14)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_total_depr_15_15")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_total_depr_15_30")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_total_depr_15_40")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_total_depr_15_45")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>
                {/* Row 16 */}
                <tr>
                  <td className="border border-slate-300 p-3">16</td>
                  <td className="border border-slate-300 p-3">Depreciation disallowed under section 38(2) of the I.T. Act</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_disallowed_16_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_disallowed_16_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_disallowed_16_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_disallowed_16_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 17 */}
                <tr className="bg-green-50">
                  <td className="border border-slate-300 p-3 font-bold">17</td>
                  <td className="border border-slate-300 p-3 font-bold">Net aggregate depreciation (15-16)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_net_depr_17_15")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_net_depr_17_30")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_net_depr_17_40")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_net_depr_17_45")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>
                {/* Row 18 */}
                <tr>
                  <td className="border border-slate-300 p-3">18</td>
                  <td className="border border-slate-300 p-3">Proportionate aggregate depreciation allowable in the event of succession, amalgamation, demerger etc.</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_prorata_18_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_prorata_18_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_prorata_18_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_prorata_18_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 19 */}
                <tr>
                  <td className="border border-slate-300 p-3">19</td>
                  <td className="border border-slate-300 p-3">Expenditure incurred in connection with transfer of asset/assets</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_exp_transfer_19_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_exp_transfer_19_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_exp_transfer_19_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_exp_transfer_19_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 20 */}
                <tr>
                  <td className="border border-slate-300 p-3">20</td>
                  <td className="border border-slate-300 p-3">Capital gains/loss under section 50 (5+8-3-4-7-19)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_capital_gains_20_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_capital_gains_20_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_capital_gains_20_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_capital_gains_20_45")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                {/* Row 21 */}
                <tr>
                  <td className="border border-slate-300 p-3">21</td>
                  <td className="border border-slate-300 p-3">Written down value on the last day of previous year* (6+9-15)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_last_21_15")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_last_21_30")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_last_21_40")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dpm_wdv_last_21_45")} className="w-full px-2 py-1 border rounded" /></td>
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

export default ScheduleDPM;
