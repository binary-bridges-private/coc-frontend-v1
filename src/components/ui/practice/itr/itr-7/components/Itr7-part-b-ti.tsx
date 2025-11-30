import React, { useEffect } from 'react';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7PartBTIData } from './itr-7-part-b-ti.types';

interface Itr7PartBTIProps {
  form: UseFormReturn<ITR7PartBTIData>;
}

const Itr7PartBTI: React.FC<Itr7PartBTIProps> = ({ form }) => {
  const { register, control, setValue } = form;
  const values = useWatch({ control });

  // Helper to safely get number values
  const getVal = (path: string): number => {
    const val = path.split('.').reduce((obj: any, key) => obj?.[key], values);
    return Number(val) || 0;
  };

  // Calculations
  useEffect(() => {
    // 2v. Total Business Income
    const businessTotal = 
      getVal('partBTI.profits_gains_business_profession.business_other_than_speculative') +
      getVal('partBTI.profits_gains_business_profession.foreign_company_selling_diamonds') +
      getVal('partBTI.profits_gains_business_profession.speculative_business') +
      getVal('partBTI.profits_gains_business_profession.specified_business') +
      getVal('partBTI.profits_gains_business_profession.income_chargeable_special_rates');
    setValue('partBTI.profits_gains_business_profession.total_business_income', businessTotal);

    // 3av. Total Short Term
    const stTotal = 
      getVal('partBTI.capital_gains.short_term.chargeable_15_percent') +
      getVal('partBTI.capital_gains.short_term.chargeable_20_percent') +
      getVal('partBTI.capital_gains.short_term.chargeable_30_percent') +
      getVal('partBTI.capital_gains.short_term.chargeable_applicable_rate') +
      getVal('partBTI.capital_gains.short_term.chargeable_special_rates_dtaa');
    setValue('partBTI.capital_gains.short_term.total_short_term', stTotal);

    // 3biv. Total Long Term
    const ltTotal = 
      getVal('partBTI.capital_gains.long_term.chargeable_10_percent') +
      getVal('partBTI.capital_gains.long_term.chargeable_12_5_percent') +
      getVal('partBTI.capital_gains.long_term.chargeable_20_percent') +
      getVal('partBTI.capital_gains.long_term.chargeable_special_rates_dtaa');
    setValue('partBTI.capital_gains.long_term.total_long_term', ltTotal);

    // 3c. Sum of Short Term and Long Term
    const sumSTLT = stTotal + ltTotal;
    setValue('partBTI.capital_gains.sum_short_term_long_term', sumSTLT);

    // 3e. Total Capital Gains
    const totalCG = sumSTLT + getVal('partBTI.capital_gains.capital_gain_chargeable_30_percent_115bbh');
    setValue('partBTI.capital_gains.total_capital_gains', totalCG);

    // 4d. Total Other Sources
    const totalOS = 
      getVal('partBTI.income_other_sources.net_income_normal_rates') +
      getVal('partBTI.income_other_sources.chargeable_special_rate') +
      getVal('partBTI.income_other_sources.owning_maintaining_race_horses');
    setValue('partBTI.income_other_sources.total_other_sources', totalOS);

    // 5. Total of head wise income
    const totalHeadWise = 
      getVal('partBTI.income_house_property') +
      businessTotal +
      totalCG +
      totalOS;
    setValue('partBTI.total_head_wise_income', totalHeadWise);

    // 7. Balance after set off
    const balanceAfterSetOff = totalHeadWise - getVal('partBTI.losses_current_year_set_off');
    setValue('partBTI.balance_after_set_off_current_year_losses', balanceAfterSetOff);

    // 9. Gross Total Income
    const gti = balanceAfterSetOff - getVal('partBTI.brought_forward_losses_set_off');
    setValue('partBTI.gross_total_income', gti);

    // 11c. Total Deductions
    const totalDeductions = 
      getVal('partBTI.deductions_chapter_vi_a.part_b') +
      getVal('partBTI.deductions_chapter_vi_a.part_c');
    setValue('partBTI.deductions_chapter_vi_a.total_deductions', totalDeductions);

    // 13. Total Income
    const totalIncome = gti - totalDeductions - getVal('partBTI.deduction_10aa');
    setValue('partBTI.total_income', totalIncome);

    // 15. Income chargeable at normal rates
    const normalRatesIncome = totalIncome - getVal('partBTI.income_chargeable_special_rates');
    setValue('partBTI.income_chargeable_normal_rates', normalRatesIncome);

  }, [values, setValue]);

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Part B - TI</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          Computation of total income
        </span>
      </div>

      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <tbody>
          {/* 1. House Property */}
          <tr className="bg-gray-50">
            <td className="border p-2 font-semibold w-10">1</td>
            <td className="border p-2" colSpan={2}>Income from house property (3 of Schedule-HP) (enter nil if loss)</td>
            <td className="border p-2 w-32">
              <input type="number" {...register("partBTI.income_house_property")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>

          {/* 2. Business or Profession */}
          <tr>
            <td className="border p-2 font-semibold">2</td>
            <td className="border p-2" colSpan={3}>Profits and gains from business or profession</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 w-10">i</td>
            <td className="border p-2">Profits and gains from business other than speculative business and specified business (A 38 of Schedule BP) (enter nil if loss)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.profits_gains_business_profession.business_other_than_speculative")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">ia</td>
            <td className="border p-2">Income of Foreign company from eligible business of selling raw diamonds (refer rule 10TIA) (3iva of Table E of Schedule BP)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.profits_gains_business_profession.foreign_company_selling_diamonds")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">ii</td>
            <td className="border p-2">Profits and gains from speculative business (3(ii) of Table E of Schedule BP) (enter nil if loss and take the figure to schedule CFL)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.profits_gains_business_profession.speculative_business")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">iii</td>
            <td className="border p-2">Profits and gains from specified business (3(iii) of Table E Schedule BP)(enter nil if loss and take the figure to schedule CFL)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.profits_gains_business_profession.specified_business")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">iv</td>
            <td className="border p-2">Income chargeable to tax at special rates (3d, 3e, 3f & 3b of Table E of Schedule BP)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.profits_gains_business_profession.income_chargeable_special_rates")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2 font-semibold">v</td>
            <td className="border p-2" colSpan={2}>Total (2i + 2ia + 2ii + 2iii + 2iv)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.profits_gains_business_profession.total_business_income")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          {/* 3. Capital Gains */}
          <tr>
            <td className="border p-2 font-semibold">3</td>
            <td className="border p-2" colSpan={3}>Capital gains</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">a</td>
            <td className="border p-2 font-semibold" colSpan={2}>Short term</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ia</td>
            <td className="border p-2">Short-term chargeable @ 15% (11ii of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.short_term.chargeable_15_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ib</td>
            <td className="border p-2">Short-term chargeable @ 20% (11iii of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.short_term.chargeable_20_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ii</td>
            <td className="border p-2">Short-term chargeable @ 30% (11iv of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.short_term.chargeable_30_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">iii</td>
            <td className="border p-2">Short-term chargeable at applicable rate (11v of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.short_term.chargeable_applicable_rate")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">iv</td>
            <td className="border p-2">Short-term chargeable at special rates in India as per DTAA (11vi of item E of Schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.short_term.chargeable_special_rates_dtaa")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 pl-6 font-semibold">v</td>
            <td className="border p-2">Total Short-term (aia + aib + aii + aiii + aiv) (enter nil if loss)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.short_term.total_short_term")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">b</td>
            <td className="border p-2 font-semibold" colSpan={2}>Long-term</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ia</td>
            <td className="border p-2">Long-term chargeable @ 10% (11vii of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.long_term.chargeable_10_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ib</td>
            <td className="border p-2">Long-term chargeable @ 12.5% (11viii of item E of Schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.long_term.chargeable_12_5_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ii</td>
            <td className="border p-2">Long-term chargeable @ 20% (11ix of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.long_term.chargeable_20_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">iii</td>
            <td className="border p-2">Long-term chargeable at special rates in India as per DTAA (11x of item E of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.long_term.chargeable_special_rates_dtaa")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 pl-6 font-semibold">iv</td>
            <td className="border p-2">Total Long-term (bia + bib + bii + biii) (enter nil if loss)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.long_term.total_long_term")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">c</td>
            <td className="border p-2">Sum of Short-term/Long-term capital gains (3av + 3biv) (enter nil if loss)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.sum_short_term_long_term")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">d</td>
            <td className="border p-2">Capital gain chargeable @ 30% u/s 115BBH (C2 of schedule CG)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.capital_gain_chargeable_30_percent_115bbh")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">e</td>
            <td className="border p-2">Total capital gains (3c + 3d)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.capital_gains.total_capital_gains")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          {/* 4. Income from other sources */}
          <tr>
            <td className="border p-2 font-semibold">4</td>
            <td className="border p-2" colSpan={3}>Income from other sources</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">a</td>
            <td className="border p-2">Net income from other sources chargeable to tax at normal applicable rates (6 of Schedule OS) (enter nil if loss)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_other_sources.net_income_normal_rates")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">Income chargeable to tax at special rate (2 of Schedule OS)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_other_sources.chargeable_special_rate")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">c</td>
            <td className="border p-2">Income from the activity of owning and maintaining race horses (8e of Schedule OS) (enter nil if loss)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_other_sources.owning_maintaining_race_horses")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">d</td>
            <td className="border p-2">Total (4a + 4b + 4c)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_other_sources.total_other_sources")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          {/* 5-18 Summary */}
          <tr className="bg-gray-100 font-semibold">
            <td className="border p-2">5</td>
            <td className="border p-2" colSpan={2}>Total of head wise income (1 + 2v + 3e + 4d)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.total_head_wise_income")} className="w-full p-1 border rounded text-right bg-gray-200" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2">6</td>
            <td className="border p-2" colSpan={2}>Losses of current year to be set off against 5 (total of 2xvii, 3xvii and 4xvii of Schedule CYLA)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.losses_current_year_set_off")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">7</td>
            <td className="border p-2" colSpan={2}>Balance after set off current year losses (5 – 6) (Also total of (ii, iii, v to xvi of column 5of Schedule CYLA+4b+2iv)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.balance_after_set_off_current_year_losses")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2">8</td>
            <td className="border p-2" colSpan={2}>Brought forward losses to be set off against 7 (total of 2xvi, 3xvi and 4xvi of Schedule BFLA)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.brought_forward_losses_set_off")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-100 font-semibold">
            <td className="border p-2">9</td>
            <td className="border p-2" colSpan={2}>Gross Total income (7 – 8) (Also total of (i, ii, iv to xiv of column 5 of schedule BFLA+4b+2iv)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.gross_total_income")} className="w-full p-1 border rounded text-right bg-gray-200" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2">10</td>
            <td className="border p-2" colSpan={2}>Income chargeable to tax at special rate under section 111A, 112, 112A etc. included in 9</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_chargeable_special_rate_included_in_9")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          
          <tr>
            <td className="border p-2 font-semibold">11</td>
            <td className="border p-2" colSpan={3}>Deductions under Chapter VI-A</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">a</td>
            <td className="border p-2">Part-B of Chapter VI-A [1 of Schedule VI-A and limited upto total of (i, ii, iv, v, viii, xiii, xiv) of column 5 of Schedule BFLA]</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.deductions_chapter_vi_a.part_b")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">Part-C of Chapter VI-A [2 of Schedule VI-A]</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.deductions_chapter_vi_a.part_c")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">c</td>
            <td className="border p-2">Total (11a + 11b) [limited upto (9-10)]</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.deductions_chapter_vi_a.total_deductions")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          <tr>
            <td className="border p-2">12</td>
            <td className="border p-2" colSpan={2}>Deduction u/s 10AA (Total Sch. 10AA)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.deduction_10aa")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-100 font-semibold">
            <td className="border p-2">13</td>
            <td className="border p-2" colSpan={2}>Total income (9 - 11c - 12)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.total_income")} className="w-full p-1 border rounded text-right bg-gray-200" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2">14</td>
            <td className="border p-2" colSpan={2}>Income chargeable to tax at special rates (total of (i) of Schedule SI)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_chargeable_special_rates")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">15</td>
            <td className="border p-2" colSpan={2}>Income chargeable to tax at normal rates (13 - 14)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.income_chargeable_normal_rates")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2">16</td>
            <td className="border p-2" colSpan={2}>Net agricultural income( 2v of Schedule EI)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.net_agricultural_income")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">17</td>
            <td className="border p-2" colSpan={2}>Losses of current year to be carried forward (total of xx of Schedule CFL)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.losses_current_year_carried_forward")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2">18</td>
            <td className="border p-2" colSpan={2}>Deemed total income under section 115JB (9 of Schedule MAT)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTI.deemed_total_income_115jb")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Itr7PartBTI;
