import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface Itr7SchedulePTIProps {
  register: UseFormRegister<ITR7FormData>;
  watch: UseFormWatch<ITR7FormData>;
}

export const Itr7SchedulePTI: React.FC<Itr7SchedulePTIProps> = ({ register, watch }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Schedule PTI - Pass Through Income Details</h2>
      <p className="text-gray-600 mb-4 italic">
        Pass Through Income details from business trust or investment fund as per section 115U, 115UA and 115UB
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Section 115U/115UA/115UB</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Name of business trust/ investment fund</th>
              <th className="border border-gray-300 px-2 py-2 text-left font-semibold">PAN of the business trust/ investment fund</th>
              <th className="border border-gray-300 px-2 py-2 text-center font-semibold">Sl. No.</th>
              <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Current Year Income</th>
              <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Prior Year Income/Loss (9-7-8)</th>
              <th className="border border-gray-300 px-2 py-2 text-center font-semibold" colSpan={10}>Income Category (Drop down to be provided in e-filing utility)</th>
            </tr>
            <tr className="bg-gray-50">
              <th colSpan={6} className="border border-gray-300 px-2 py-1" />
              <th className="border border-gray-300 px-2 py-1 text-center font-semibold text-xs">I. House property</th>
              <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center font-semibold text-xs">II. Capital Gains</th>
              <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center font-semibold text-xs">A. Short Term</th>
              <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center font-semibold text-xs">B. Long Term</th>
              <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center font-semibold text-xs">III. Other Sources</th>
              <th className="border border-gray-300 px-2 py-1 text-center font-semibold text-xs">IV. Income Exempt</th>
            </tr>
            <tr className="bg-gray-50">
              <th colSpan={6} className="border border-gray-300 px-2 py-1" />
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">i</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">ii-A</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">ii-AI (Sec 111A)</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">ii-AII (Others)</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">iii-B</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">iii-BI (Sec 112A)</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">iii-BII (Other)</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">A. Dividend</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">B. Others</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-xs">u/s 10(23FB)</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((rowNum) => (
              <tr key={rowNum} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">
                  <input type="text" {...register(`pti_row_${rowNum}_section` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="Section" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="text" {...register(`pti_row_${rowNum}_name` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="Fund name" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="text" {...register(`pti_row_${rowNum}_pan` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="PAN" />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <input type="text" {...register(`pti_row_${rowNum}_sl_no` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs text-center" placeholder={rowNum.toString()} />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_current_year_income` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_prior_year_income` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_house_property` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_st_capital_gain` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_st_capital_section_111a` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_st_capital_others` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_lt_capital_gain` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_lt_capital_section_112a` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_lt_capital_section_other` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_other_sources_dividend` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_other_sources_others` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input type="number" {...register(`pti_row_${rowNum}_income_exempt` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                </td>
              </tr>
            ))}

            {/* Total Row */}
            <tr className="bg-gray-200 font-bold">
              <td colSpan={4} className="border border-gray-300 px-2 py-2 text-right">
                TOTAL
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_current_year_income" as any) || 0) +
                  (watch("pti_row_2_current_year_income" as any) || 0) +
                  (watch("pti_row_3_current_year_income" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_prior_year_income" as any) || 0) +
                  (watch("pti_row_2_prior_year_income" as any) || 0) +
                  (watch("pti_row_3_prior_year_income" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_house_property" as any) || 0) +
                  (watch("pti_row_2_house_property" as any) || 0) +
                  (watch("pti_row_3_house_property" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_st_capital_gain" as any) || 0) +
                  (watch("pti_row_2_st_capital_gain" as any) || 0) +
                  (watch("pti_row_3_st_capital_gain" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_st_capital_section_111a" as any) || 0) +
                  (watch("pti_row_2_st_capital_section_111a" as any) || 0) +
                  (watch("pti_row_3_st_capital_section_111a" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_st_capital_others" as any) || 0) +
                  (watch("pti_row_2_st_capital_others" as any) || 0) +
                  (watch("pti_row_3_st_capital_others" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_lt_capital_gain" as any) || 0) +
                  (watch("pti_row_2_lt_capital_gain" as any) || 0) +
                  (watch("pti_row_3_lt_capital_gain" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_lt_capital_section_112a" as any) || 0) +
                  (watch("pti_row_2_lt_capital_section_112a" as any) || 0) +
                  (watch("pti_row_3_lt_capital_section_112a" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_lt_capital_section_other" as any) || 0) +
                  (watch("pti_row_2_lt_capital_section_other" as any) || 0) +
                  (watch("pti_row_3_lt_capital_section_other" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_other_sources_dividend" as any) || 0) +
                  (watch("pti_row_2_other_sources_dividend" as any) || 0) +
                  (watch("pti_row_3_other_sources_dividend" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_other_sources_others" as any) || 0) +
                  (watch("pti_row_2_other_sources_others" as any) || 0) +
                  (watch("pti_row_3_other_sources_others" as any) || 0)
                ).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                {(
                  (watch("pti_row_1_income_exempt" as any) || 0) +
                  (watch("pti_row_2_income_exempt" as any) || 0) +
                  (watch("pti_row_3_income_exempt" as any) || 0)
                ).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-600">
        <p className="font-semibold">NOTE: Please refer to the instructions for filling out this schedule.</p>
      </div>
    </div>
  );
};
