import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8PartBTiProps {
  form: UseFormReturn<ITR8FormData>;
}

/**
 * Part B-TI - Computation of Total Income
 * Main section for computing total income from all sources
 * Includes income heads, capital gains, deductions, and final tax computation
 */
export const Itr8PartBTi: React.FC<Itr8PartBTiProps> = ({ form }) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
        <h2 className="text-lg font-bold text-blue-900">Part B-TI - Computation of Total Income</h2>
        <p className="text-sm text-blue-800 mt-1">
          Income computation from all heads and sources
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Income from House Property */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-700">
                1. Income from house property <span className="text-sm text-gray-500">(3 of Schedule-HP)</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">(enter nil if loss)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_house_property', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 2. Profits and gains from business or profession */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">2. Profits and gains from business or profession</h3>
          
          <div className="space-y-3 ml-4">
            {/* 2i - Speculative business */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  i. Profits and gains from business other than speculative business and specified business
                </label>
                <p className="text-xs text-gray-500 mt-1">(4 3S of Schedule BP) (enter nil if loss)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_business_speculative', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 2ia - Foreign company diamonds */}
            <div className="flex items-start justify-between ml-6">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  ia. Income of Foreign company from eligible business of selling raw diamonds
                </label>
                <p className="text-xs text-gray-500 mt-1">(refer rule 10TTA) (5iva of Table E of Schedule BP)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_foreign_company_diamonds', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 2ii - Speculative business */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  ii. Profits and gains from speculative business
                </label>
                <p className="text-xs text-gray-500 mt-1">(5(a) of Table E of Schedule BP) (enter nil if loss and take the figure to schedule CFL)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_business_other_speculative', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 2iii - Specified business */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  iii. Profits and gains from specified business
                </label>
                <p className="text-xs text-gray-500 mt-1">(3(iii) of Table E Schedule BP)(enter nil if loss and take the figure to schedule CFL)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_business_specified', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 2iv - Special rates */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  iv. Income chargeable to tax at special rates
                </label>
                <p className="text-xs text-gray-500 mt-1">(3d, 3e, 3f & 3h of Table E of Schedule BP)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_business_special_rates', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 2v - Total */}
            <div className="flex items-start justify-between bg-gray-50 p-3 rounded">
              <div className="flex-1">
                <label className="font-semibold text-gray-800">
                  v. Total (2i + 2ia + 2ii + 2iii + 2iv)
                </label>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  {...form.register('ti_business_total', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Capital gains */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">3. Capital gains</h3>
          
          {/* 3a - Short term */}
          <div className="ml-4 mb-4">
            <h4 className="font-medium text-gray-700 mb-3">a. Short term</h4>
            <div className="space-y-3 ml-4">
              {/* Short term @ 15% */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    i. Short-term chargeable @ 15%
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIIa of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_short_term_15', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Short term @ 20% */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    ib. Short-term chargeable @ 20%
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIIa of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_short_term_20', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Short term @ 30% */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    ii. Short-term chargeable @ 30%
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIIv of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_short_term_30', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Short term at applicable rate */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    iii. Short-term chargeable at applicable rate
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIv of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_short_term_applicable', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Short term special rates DTAA */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    iv. Short-term chargeable at special rates in India as per DTAA
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIvi of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_short_term_special_dtaa', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Total short-term */}
              <div className="flex items-start justify-between bg-gray-50 p-3 rounded">
                <div className="flex-1">
                  <label className="font-medium text-gray-800">
                    v. Total Short-term (aia + aib + aii + aiii + aiv)
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(enter nil if loss)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    {...form.register('ti_cg_short_term_total', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3b - Long term */}
          <div className="ml-4 mb-4">
            <h4 className="font-medium text-gray-700 mb-3">b. Long-term</h4>
            <div className="space-y-3 ml-4">
              {/* Long term @ 10% */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    ia. Long-term chargeable @ 10%
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIvii of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_long_term_10', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Long term @ 12.5% */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    ib. Long-term chargeable @ 12.5%
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIviii of item E of Schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_long_term_12_5', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Long term @ 20% */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    ii. Long-term chargeable @ 20%
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIIx of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_long_term_20', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Long term special rates DTAA */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-gray-700">
                    iii. Long-term chargeable at special rates in India as per DTAA
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(IIxi of item E of schedule CG)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2"
                    {...form.register('ti_cg_long_term_special_dtaa', { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Total long-term */}
              <div className="flex items-start justify-between bg-gray-50 p-3 rounded">
                <div className="flex-1">
                  <label className="font-medium text-gray-800">
                    iv. Total Long-term (bia + bib + bii + biii)
                  </label>
                  <p className="text-xs text-gray-500 mt-1">(enter nil if loss)</p>
                </div>
                <div className="w-64 ml-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-3 py-2 bg-gray-100"
                    {...form.register('ti_cg_long_term_total', { valueAsNumber: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3c - Sum of short/long term */}
          <div className="flex items-start justify-between bg-gray-100 p-3 rounded ml-4 mb-3">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                c. Sum of Short-term/Long-term capital gains (3av + 3biv)
              </label>
              <p className="text-xs text-gray-500 mt-1">(enter nil if loss)</p>
            </div>
            <div className="w-64 ml-4">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_cg_total_short_long', { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* 3d - Capital gain @ 30% u/s 115BBH */}
          <div className="flex items-start justify-between ml-4 mb-3">
            <div className="flex-1">
              <label className="font-medium text-gray-700">
                d. Capital gain chargeable @ 30% u/s 115BBH
              </label>
              <p className="text-xs text-gray-500 mt-1">(C2 of schedule CG)</p>
            </div>
            <div className="w-64 ml-4">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_cg_30_115bbh', { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* 3e - Total capital gains */}
          <div className="flex items-start justify-between bg-blue-50 p-4 rounded ml-4">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                e. Total capital gains (3c + 3d)
              </label>
            </div>
            <div className="w-64 ml-4">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2 bg-white"
                {...form.register('ti_cg_total', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 4. Income from other sources */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">4. Income from other sources</h3>
          
          <div className="space-y-3 ml-4">
            {/* 4a - Normal rates */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  a. Net income from other sources chargeable to tax at normal applicable rates
                </label>
                <p className="text-xs text-gray-500 mt-1">(6 of Schedule OS) (enter nil if loss)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_other_sources_normal', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 4b - Special rate */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  b. Income chargeable to tax at special rate
                </label>
                <p className="text-xs text-gray-500 mt-1">(2 of Schedule OS)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_other_sources_special', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 4c - Race horses */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  c. Income from the activity of owning and maintaining race horses
                </label>
                <p className="text-xs text-gray-500 mt-1">(8e of Schedule OS) (enter nil if loss)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_other_sources_race_horses', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 4d - Total */}
            <div className="flex items-start justify-between bg-gray-50 p-3 rounded">
              <div className="flex-1">
                <label className="font-semibold text-gray-800">
                  d. Total (4a + 4b + 4c)
                </label>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  {...form.register('ti_other_sources_total', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Total of head wise income */}
        <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-bold text-blue-900 text-lg">
                5. Total of head wise income (1 + 2v + 3e + 4d)
              </label>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-blue-500 rounded px-3 py-2 font-semibold"
                {...form.register('ti_total_head_wise', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 6. Losses of current year */}
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                6. Losses of current year to be set off against 5
              </label>
              <p className="text-xs text-gray-500 mt-1">(total of 2xvi, 3xviii and 4xvii of Schedule CYLA)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_losses_current_year', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 7. Balance after set off */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                7. Balance after set off of current year losses (5 - 6)
              </label>
              <p className="text-xs text-gray-500 mt-1">(total of (ii, iii, v to xvi of column 5of Schedule CYLA) +4b +2iv)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_balance_after_setoff', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 8. Brought forward losses */}
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                8. Brought forward losses to be set off against 7
              </label>
              <p className="text-xs text-gray-500 mt-1">(total of 2xvi, 3xviii and 4xvii of Schedule BFLA)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_brought_forward_losses', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 9. Gross total income */}
        <div className="border-2 border-green-600 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-bold text-green-900 text-lg">
                9. Gross total income (7 - 8)
              </label>
              <p className="text-xs text-gray-600 mt-1">(total of (i, ii, iv to xvi of column 5 of schedule BFLA)+4b +2iv)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-green-600 rounded px-3 py-2 font-semibold"
                {...form.register('ti_gross_total_income', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 10. Income chargeable at special rates */}
        <div className="border rounded-lg p-4 bg-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                10. Income chargeable to tax at special rate under section 111A, 112, 112A etc. included in 9
              </label>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_income_special_rates', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 11. Deductions under Chapter VI-A */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">11. Deductions under Chapter VI-A</h3>
          
          <div className="space-y-3 ml-4">
            {/* 11a - Part B */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  a. Part-B of Chapter VI-A
                </label>
                <p className="text-xs text-gray-500 mt-1">(1 of Schedule VI-A and limited upto total of (i, ii, iv, viii, xiii, xiv) of column 5 of Schedule BFLA)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_deduction_part_b', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 11b - Part C */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="font-medium text-gray-700">
                  b. Part-C of Chapter VI-A
                </label>
                <p className="text-xs text-gray-500 mt-1">(2 of Schedule VI-A)</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('ti_deduction_part_c', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 11c - Total */}
            <div className="flex items-start justify-between bg-gray-50 p-3 rounded">
              <div className="flex-1">
                <label className="font-semibold text-gray-800">
                  c. Total (11a + 11b)
                </label>
                <p className="text-xs text-gray-500 mt-1">(limited upto (9-10))</p>
              </div>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  {...form.register('ti_deduction_total', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 12. Deduction u/s 10AA */}
        <div className="border rounded-lg p-4 bg-orange-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                12. Deduction u/s 10AA
              </label>
              <p className="text-xs text-gray-500 mt-1">(Total Sch. 10AA)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_deduction_10aa', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 13. Total income */}
        <div className="border-4 border-blue-700 rounded-lg p-5 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-bold text-blue-900 text-xl">
                13. Total income (9 - 11c - 12)
              </label>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-4 border-blue-700 rounded px-4 py-3 font-bold text-lg"
                {...form.register('ti_total_income', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 14. Income chargeable to tax at special rates */}
        <div className="border rounded-lg p-4 bg-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                14. Income chargeable to tax at special rates
              </label>
              <p className="text-xs text-gray-500 mt-1">(total of (i) of Schedule SI)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_income_special_rates_14', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 15. Income chargeable to tax at normal rates */}
        <div className="border-2 border-indigo-500 rounded-lg p-4 bg-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-bold text-indigo-900 text-lg">
                15. Income chargeable to tax at normal rates (13 - 14)
              </label>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-indigo-500 rounded px-3 py-2 font-semibold"
                {...form.register('ti_income_normal_rates', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 16. Net agricultural income */}
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                16. Net agricultural income
              </label>
              <p className="text-xs text-gray-500 mt-1">(2v of Schedule EI)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_net_agricultural_income', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 17. Losses of current year to be carried forward */}
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-semibold text-gray-800">
                17. Losses of current year to be carried forward
              </label>
              <p className="text-xs text-gray-500 mt-1">(total of xx of Schedule CFL)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('ti_losses_carried_forward', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 18. Deemed total income under section 115JB */}
        <div className="border-2 border-amber-600 rounded-lg p-4 bg-amber-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="font-bold text-amber-900">
                18. Deemed total income under section 115JB
              </label>
              <p className="text-xs text-gray-600 mt-1">(9 of Schedule MAT)</p>
            </div>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-amber-600 rounded px-3 py-2 font-semibold"
                {...form.register('ti_deemed_income_115jb', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
