import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8PartBTtiProps {
  form: UseFormReturn<ITR8FormData>;
}

/**
 * Part B-TTI - Computation of Tax Liability on Total Income
 * Tax computation, credits, relief, interest, and final tax payable/refund
 */
export const Itr8PartBTti: React.FC<Itr8PartBTtiProps> = ({ form }) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg">
      <div className="bg-red-50 border-l-4 border-red-600 p-4">
        <h2 className="text-lg font-bold text-red-900">Part B-TTI - Computation of Tax Liability on Total Income</h2>
      </div>

      <div className="space-y-6">
        {/* 1. Tax Payable on deemed total Income under section 115JB */}
        <div className="border rounded-lg p-4 bg-amber-50">
          <h3 className="font-semibold text-gray-800 mb-4">1. Tax Payable on deemed total Income under section 115JB</h3>
          
          <div className="space-y-3 ml-4">
            {/* 1a */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                a. Tax Payable on deemed total Income under section 115JB
                <span className="text-xs text-gray-500 block mt-1">(10 of Schedule MAT)</span>
              </label>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_tax_115jb', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 1b */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                b. Surcharge on (a) above
                <span className="text-xs text-gray-500 block mt-1">(if applicable)</span>
              </label>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_surcharge_115jb', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 1c */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                c. Health and Education Cess @ 4% on (1a+1b) above
              </label>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_health_edu_cess_115jb', { valueAsNumber: true })}
                />
              </div>
            </div>

            {/* 1d */}
            <div className="flex items-center justify-between bg-amber-100 p-3 rounded">
              <label className="font-semibold text-gray-800 flex-1">
                d. Total Tax Payable u/s 115JB (1a+1b+1c)
              </label>
              <div className="w-64 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 font-semibold"
                  {...form.register('tti_total_tax_115jb', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Tax payable on total income */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">2. Tax payable on total income</h3>
          
          <div className="space-y-3 ml-4">
            {/* 2a */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                a. Tax at normal rates on 15 of Part B-TI
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_tax_normal_rates', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">2a</div>
            </div>

            {/* 2b */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                b. Tax at special rates
                <span className="text-xs text-gray-500 block mt-1">(total of col. (ii) of Schedule SI)</span>
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_tax_special_rates', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">2b</div>
            </div>

            {/* 2c */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <label className="font-semibold text-gray-800 flex-1">
                c. Tax Payable on Total Income (2a + 2b)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  {...form.register('tti_tax_total_income', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">2c</div>
            </div>

            {/* 2d - Surcharge */}
            <div className="border-t pt-3 mt-3">
              <label className="font-medium text-gray-700 block mb-3">d. Surcharge</label>
              
              <div className="space-y-2 ml-4">
                {/* 2di */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 flex-1">
                    i. 25% of 16(ii) of Schedule SI
                  </label>
                  <div className="w-48 ml-4">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-3 py-2"
                      {...form.register('tti_surcharge_16ii', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="w-16 text-center text-gray-500">2di</div>
                </div>

                {/* 2g(ii) label */}
                <div className="flex items-center justify-between">
                  <div className="flex-1"></div>
                  <div className="w-48 ml-4"></div>
                  <div className="w-16 text-center text-gray-500">2g(ii)</div>
                </div>

                {/* 2dii */}
                <div className="flex items-center justify-between">
                  <label className="text-gray-700 flex-1">
                    ii. On [(2c) – (16(ii) of Schedule SI)]
                  </label>
                  <div className="w-48 ml-4">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-3 py-2"
                      {...form.register('tti_surcharge_16iii', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="w-16 text-center text-gray-500">2dii</div>
                </div>

                {/* 2diii */}
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <label className="font-medium text-gray-800 flex-1">
                    iii. Total (i + ii)
                  </label>
                  <div className="w-48 ml-4">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-3 py-2 bg-gray-100"
                      {...form.register('tti_surcharge_total', { valueAsNumber: true })}
                    />
                  </div>
                  <div className="w-16 text-center text-gray-500">2diii</div>
                </div>
              </div>
            </div>

            {/* 2e */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                e. Health and Education Cess @ 4% on (2c+2diii+2e)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_health_edu_cess', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">2e</div>
            </div>

            {/* 2f */}
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
              <label className="font-bold text-blue-900 flex-1">
                f. Gross tax liability (2c+2diii+2e)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border-2 border-blue-500 rounded px-3 py-2 font-semibold"
                  {...form.register('tti_gross_tax_liability', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">2f</div>
            </div>
          </div>
        </div>

        {/* 3. Gross tax payable */}
        <div className="border-2 border-purple-500 rounded-lg p-4 bg-purple-50">
          <div className="flex items-center justify-between">
            <label className="font-bold text-purple-900 flex-1">
              3. Gross tax payable (higher of 1d and 2f)
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-purple-500 rounded px-3 py-2 font-semibold"
                {...form.register('tti_gross_tax_payable', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 4. Credit under section 115JAA */}
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-800 flex-1">
              4. Credit under section 115JAA of tax paid in earlier years (if 2f is more than 1d)
              <span className="text-xs text-gray-500 block mt-1">(5 of Schedule MATC)</span>
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('tti_credit_115jaa', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 5. Tax payable after credit */}
        <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <label className="font-bold text-blue-900 flex-1">
              5. Tax payable after credit under section 115JAA [(3 - 4)]
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-blue-600 rounded px-3 py-2 font-semibold"
                {...form.register('tti_tax_after_credit', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 6. Tax relief */}
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-4">6. Tax relief</h3>
          
          <div className="space-y-3 ml-4">
            {/* 6a */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                a. Section 90/90A(2 of Schedule TR)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_relief_90_90a', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">6a</div>
            </div>

            {/* 6b */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                b. Section 91(3 of Schedule TR)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_relief_91', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">6b</div>
            </div>

            {/* 6c */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <label className="font-semibold text-gray-800 flex-1">
                c. Total (6a + 6b)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  {...form.register('tti_total_relief', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">6c</div>
            </div>
          </div>
        </div>

        {/* 7. Net tax liability */}
        <div className="border-2 border-green-600 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <label className="font-bold text-green-900 text-lg flex-1">
              7. Net tax liability (5 – 6c)
              <span className="text-xs text-gray-600 block mt-1">(enter zero if negative)</span>
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-green-600 rounded px-3 py-2 font-semibold"
                {...form.register('tti_net_tax_liability', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 8. Interest and fee payable */}
        <div className="border rounded-lg p-4 bg-red-50">
          <h3 className="font-semibold text-gray-800 mb-4">8. Interest and fee payable</h3>
          
          <div className="space-y-3 ml-4">
            {/* 8a */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                a. Interest for default in furnishing the return (section 234A)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_interest_234a', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">8a</div>
            </div>

            {/* 8b */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                b. Interest for default in payment of advance tax (section 234B)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_interest_234b', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">8b</div>
            </div>

            {/* 8c */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                c. Interest for deferment of advance tax (section 234C)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_interest_234c', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">8c</div>
            </div>

            {/* 8d */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                d. Fee for default in furnishing return of income (section 234F)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_fee_234f', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">8d</div>
            </div>

            {/* 8e */}
            <div className="flex items-center justify-between bg-red-100 p-3 rounded">
              <label className="font-semibold text-gray-800 flex-1">
                e. Total Interest and Fee Payable (8a+8b+8c+8d)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 font-semibold"
                  {...form.register('tti_total_interest_fee', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">8e</div>
            </div>
          </div>
        </div>

        {/* 9. Aggregate liability */}
        <div className="border-4 border-red-700 rounded-lg p-5 bg-gradient-to-r from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <label className="font-bold text-red-900 text-xl flex-1">
              9. Aggregate liability (7 + 8e)
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-4 border-red-700 rounded px-4 py-3 font-bold text-lg"
                {...form.register('tti_aggregate_liability', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 10. Taxes Paid */}
        <div className="border rounded-lg p-4 bg-green-50">
          <h3 className="font-semibold text-gray-800 mb-4">10. Taxes Paid</h3>
          
          <div className="space-y-3 ml-4">
            {/* 10a */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                a. Advance Tax
                <span className="text-xs text-gray-500 block mt-1">(from column 5 of 15A)</span>
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_advance_tax', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">10a</div>
            </div>

            {/* 10b */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                b. TDS
                <span className="text-xs text-gray-500 block mt-1">(total of column 9 of 15B)</span>
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_tds', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">10b</div>
            </div>

            {/* 10c */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                c. TCS
                <span className="text-xs text-gray-500 block mt-1">(total of column 7 of 15C)</span>
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_tcs', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">10c</div>
            </div>

            {/* 10d */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 flex-1">
                d. Self-Assessment Tax
                <span className="text-xs text-gray-500 block mt-1">(from column 5 of 15A)</span>
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('tti_self_assessment_tax', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">10d</div>
            </div>

            {/* 10e */}
            <div className="flex items-center justify-between bg-green-100 p-3 rounded">
              <label className="font-semibold text-gray-800 flex-1">
                e. Total Taxes Paid (10a+10b+10c + 10d)
              </label>
              <div className="w-48 ml-4">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 font-semibold"
                  {...form.register('tti_total_taxes_paid', { valueAsNumber: true })}
                />
              </div>
              <div className="w-16 text-center text-gray-500">10e</div>
            </div>
          </div>
        </div>

        {/* 11. Amount payable */}
        <div className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
          <div className="flex items-center justify-between">
            <label className="font-bold text-red-900 text-lg flex-1">
              11. Amount payable (9 - 10e)
              <span className="text-xs text-gray-600 block mt-1">(Enter if 9 is greater than 10e, else enter 0)</span>
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-red-600 rounded px-3 py-2 font-semibold"
                {...form.register('tti_amount_payable', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 12. Refund */}
        <div className="border-2 border-green-600 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <label className="font-bold text-green-900 text-lg flex-1">
              12. Refund
              <span className="text-xs text-gray-600 block mt-1">(If 10e is greater than 9)</span>
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-green-600 rounded px-3 py-2 font-semibold"
                {...form.register('tti_refund', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 13. Net tax payable on 115TD */}
        <div className="border rounded-lg p-4 bg-purple-50">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-800 flex-1">
              13. Net tax payable on 115TD income including interest u/s 115TE
              <span className="text-xs text-gray-500 block mt-1">(Sr.no. 12 of Schedule 115TD)</span>
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('tti_net_tax_115td', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 14. Tax payable u/s 115TD after adjustment */}
        <div className="border rounded-lg p-4 bg-purple-50">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-800 flex-1">
              14. Tax payable u/s 115TD after adjustment of refund at Sl. No. 12 (13-12)
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded px-3 py-2"
                {...form.register('tti_tax_115td_adjusted', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* 15. Net refund after adjustment */}
        <div className="border-2 border-green-700 rounded-lg p-4 bg-green-100">
          <div className="flex items-center justify-between">
            <label className="font-bold text-green-900 text-lg flex-1">
              15. Net refund after adjustment as per Sl. No. 14 (12-13)
              <span className="text-xs text-gray-600 block mt-1">(refund, if any, will be directly credited into the bank account)</span>
            </label>
            <div className="w-64">
              <input
                type="number"
                placeholder="0"
                className="w-full border-2 border-green-700 rounded px-3 py-2 font-semibold"
                {...form.register('tti_net_refund_adjusted', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
