import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface Itr7ScheduleMATProps {
  register: UseFormRegister<ITR7FormData>;
  watch: UseFormWatch<ITR7FormData>;
}

export const Itr7ScheduleMAT: React.FC<Itr7ScheduleMATProps> = ({ register, watch }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Schedule MAT - Computation of Minimum Alternate Tax u/s 115JB</h2>

      <div className="overflow-x-auto space-y-6">
        {/* Section 1: Qualifications */}
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold w-12">1</td>
              <td className="border border-gray-300 px-4 py-2">
                Whether the Profit and Loss Account is prepared in accordance with the provisions of Parts II of Schedule III to the Companies Act, 2013 (If yes, write 'Y'; if no write 'N')
              </td>
              <td className="border border-gray-300 px-4 py-2 w-32">
                <select {...register("mat_profit_loss_prepared" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>Select</option>
                  <option>Y</option>
                  <option>N</option>
                </select>
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">2</td>
              <td className="border border-gray-300 px-4 py-2">
                If 1 is no, whether profit and loss account is prepared in accordance with the provisions of the Act governing such company (If yes, write 'Y'; if no write 'N')
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select {...register("mat_pla_prepared" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>Select</option>
                  <option>Y</option>
                  <option>N</option>
                </select>
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">3</td>
              <td className="border border-gray-300 px-4 py-2">
                Whether, for the Profit and Loss Account referred to in item 1 above, the same accounting policies, accounting standards and same method and rates for calculating depreciation have been followed as have been applied for preparing accounts laid before the company at its annual general body meeting? (If yes, write 'Y', if no write 'N')
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select {...register("mat_accounting_policies" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>Select</option>
                  <option>Y</option>
                  <option>N</option>
                </select>
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">4</td>
              <td className="border border-gray-300 px-4 py-2">
                Profit after tax as shown in the Profit and Loss Account (enter item 5 of Part A-P&L) (enter item 5 of Part A - P&L, if required)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input type="number" {...register("mat_profit_after_tax" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Section A: Additions */}
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-left">Additions (if debited in profit and loss account)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "a", desc: "Income-tax paid or payable or its provision including the amount of deferred tax and the provision thereof", field: "mat_income_tax_paid" },
              { label: "b", desc: "Reserve (except reserve under section 33AC)", field: "mat_reserve_33ac" },
              { label: "c", desc: "Provisions for unascertained liability", field: "mat_provisions_liability" },
              { label: "d", desc: "Provisions for losses of subsidiary companies", field: "mat_subsidiary_losses" },
              { label: "e", desc: "Dividend paid or proposed", field: "mat_dividend_paid" },
              { label: "f", desc: "Expenditure related to exempt income under sections 10, 11 or 12 (exempt income excludes income exempt under section 10(23N))", field: "mat_exempt_income_exp" },
              { label: "g", desc: "Expenditure related to share in income of AOP/ BOI on which no income-tax is payable as per section 86", field: "mat_aop_boi_exp" },
              { label: "h", desc: "Expenditure in case of foreign company referred to in clause (b) of explanation 1 to section 115JB", field: "mat_foreign_company_exp" },
              { label: "i", desc: "Notional loss on transfer of certain capital assets or units referred to in clause (c) of explanation 1 to section 115JB", field: "mat_notional_loss_capital" },
              { label: "j", desc: "Expenditure relatable to income by way of royalty in respect of patent chargeable to tax u/s 115BBHF", field: "mat_royalty_expenditure" },
              { label: "k", desc: "Depreciation attributable to revaluation of assets", field: "mat_depreciation_revaluation" },
              { label: "l", desc: "Gain on transfer of units referred to in clause (k) of explanation 1 to section 115JB", field: "mat_transfer_units_gain" },
              { label: "m", desc: "Others (including residual unadjusted items and provision for diminution in the value of any asset)", field: "mat_others_additions" },
            ].map((item) => (
              <tr key={item.field} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold w-12">{item.label}</td>
                <td className="border border-gray-300 px-4 py-2">{item.desc}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register(item.field as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
              </tr>
            ))}

            <tr className="bg-gray-200 font-bold">
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                n. Total additions (5a+5b+5c+5d+5e+5f+5g+5h+5i+5j+5k+5l+5m)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(
                  (watch("mat_income_tax_paid" as any) || 0) +
                  (watch("mat_reserve_33ac" as any) || 0) +
                  (watch("mat_provisions_liability" as any) || 0) +
                  (watch("mat_subsidiary_losses" as any) || 0) +
                  (watch("mat_dividend_paid" as any) || 0) +
                  (watch("mat_exempt_income_exp" as any) || 0) +
                  (watch("mat_aop_boi_exp" as any) || 0) +
                  (watch("mat_foreign_company_exp" as any) || 0) +
                  (watch("mat_notional_loss_capital" as any) || 0) +
                  (watch("mat_royalty_expenditure" as any) || 0) +
                  (watch("mat_depreciation_revaluation" as any) || 0) +
                  (watch("mat_transfer_units_gain" as any) || 0) +
                  (watch("mat_others_additions" as any) || 0)
                ).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Section B: Deductions */}
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold text-left">Deductions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "a", desc: "Amount withdrawn from reserve or provisions if credited to Profit and Loss account", field: "mat_reserve_withdrawal" },
              { label: "b", desc: "Income exempt under sections 10, 11 or 12 (exempt income excludes income exempt under section 10(23N))", field: "mat_income_exempt_10_11_12" },
              { label: "c", desc: "Amount withdrawn from revaluation reserve and credited to profit and loss account to the extent it does not exceed the amount of depreciation attributable to revaluation of assets", field: "mat_revaluation_withdrawal" },
              { label: "d", desc: "Share in income of AOP/ BOI on which no income-tax is payable as per section 86 credited to Profit and Loss account", field: "mat_aop_boi_share" },
              { label: "e", desc: "Income in case of foreign company referred to in clause (iid) of explanation 1 to section 115JB", field: "mat_foreign_company_income" },
              { label: "f", desc: "Notional gain on transfer of certain capital assets or units referred to in clause (iie) of explanation 1 to section 115JB", field: "mat_notional_gain_capital" },
              { label: "g", desc: "Loss on transfer of units referred to in clause (iif) of explanation 1 to section 115JB", field: "mat_transfer_units_loss" },
              { label: "h", desc: "Income by way of royalty referred to in clause (iig) of explanation 1 to section 115JB", field: "mat_royalty_income" },
              { label: "i", desc: "Loss brought forward or unabsorbed depreciation whichever is less or both as may be applicable", field: "mat_depreciation_loss" },
              { label: "j", desc: "Profit of sick industrial company till net worth is equal to or exceeds accumulated losses", field: "mat_industrial_profit" },
              { label: "k", desc: "Others (including residual unadjusted items and the amount of deferred tax credited to P&L i.e.)", field: "mat_others_deductions" },
            ].map((item) => (
              <tr key={item.field} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold w-12">{item.label}</td>
                <td className="border border-gray-300 px-4 py-2">{item.desc}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register(item.field as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
              </tr>
            ))}

            <tr className="bg-gray-200 font-bold">
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                Total deductions (6a+6b+6c+6d+6e+6f+6g+6h+6i+6j+6k)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(
                  (watch("mat_reserve_withdrawal" as any) || 0) +
                  (watch("mat_income_exempt_10_11_12" as any) || 0) +
                  (watch("mat_revaluation_withdrawal" as any) || 0) +
                  (watch("mat_aop_boi_share" as any) || 0) +
                  (watch("mat_foreign_company_income" as any) || 0) +
                  (watch("mat_notional_gain_capital" as any) || 0) +
                  (watch("mat_transfer_units_loss" as any) || 0) +
                  (watch("mat_royalty_income" as any) || 0) +
                  (watch("mat_depreciation_loss" as any) || 0) +
                  (watch("mat_industrial_profit" as any) || 0) +
                  (watch("mat_others_deductions" as any) || 0)
                ).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Section 7: Book Profit */}
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr className="bg-gray-100">
              <td colSpan={3} className="border border-gray-300 px-4 py-2 font-semibold">
                7. Book profit under section 115JB (4+ 5n - 6)
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <input type="number" {...register("mat_book_profit_115jb" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
              </td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">7</td>
              <td className="border border-gray-300 px-4 py-2"></td>
            </tr>
          </tbody>
        </table>

        {/* Section 8: IAS Compliance */}
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr className="hover:bg-gray-50">
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                Whether the financial statements of the company are drawn up in compliance with the Indian Accounting Standards (Ind-AS) specified in Annexure to the Companies (Indian Accounting Standards) Rules, 2015. If yes, whether the following:
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <select {...register("mat_financial_statements_ias" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Section 9: Adjustments u/s 115JB(2) */}
        <div className="border border-gray-300 p-4">
          <h3 className="font-semibold mb-4 text-base">A. Additions to book profit under sub-sections (2A) to (2C) of section 115JB</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">a. Amounts credited to other comprehensive income in statement of profit & loss under the head "items that will not be reclassified to profit & loss"</label>
              <input type="number" {...register("mat_add_comprehensive_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8a" />
            </div>
            <div>
              <label className="block text-sm font-medium">b. Amounts debited to the statement of profit & loss on distribution of non-cash assets to shareholders in a demerger</label>
              <input type="number" {...register("mat_add_distribution_non_cash" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8b" />
            </div>
            <div>
              <label className="block text-sm font-medium">c. One fifth of the transition amount as referred to in section 115JB (2C) (if applicable)</label>
              <input type="number" {...register("mat_add_transition_amount" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8c" />
            </div>
            <div>
              <label className="block text-sm font-medium">d. Others (including residual adjustment)</label>
              <input type="number" {...register("mat_add_others" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8d" />
            </div>
            <div className="border-t pt-3 mt-3">
              <label className="block text-sm font-semibold">e. Total additions (8a + 8b + 8c + 8d)</label>
              <input type="number" {...register("mat_add_total" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50" placeholder="8e" readOnly />
            </div>
          </div>
        </div>

        {/* Section 10: Deductions u/s 115JB(2) */}
        <div className="border border-gray-300 p-4">
          <h3 className="font-semibold mb-4 text-base">B. Deductions from book profit under sub-sections (2A) to (2C) of section 115JB</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">f. Amounts debited to other comprehensive income in statement of profit & loss under the head "items that will not be reclassified to profit & loss"</label>
              <input type="number" {...register("mat_ded_comprehensive_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8f" />
            </div>
            <div>
              <label className="block text-sm font-medium">g. Amounts credited in the statement of profit & loss on distribution of non-cash assets to shareholders in a demerger</label>
              <input type="number" {...register("mat_ded_credited_distribution" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8g" />
            </div>
            <div>
              <label className="block text-sm font-medium">h. One fifth of the transition amount as referred to in section 115JB (2C) (if applicable)</label>
              <input type="number" {...register("mat_ded_transition_amount" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8h" />
            </div>
            <div>
              <label className="block text-sm font-medium">i. Others (including residual adjustment)</label>
              <input type="number" {...register("mat_ded_others" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="8i" />
            </div>
            <div className="border-t pt-3 mt-3">
              <label className="block text-sm font-semibold">j. Total deductions (8f + 8g + 8h + 8i)</label>
              <input type="number" {...register("mat_ded_total" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50" placeholder="8j" readOnly />
            </div>
          </div>
        </div>

        {/* Final Calculations */}
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr className="bg-blue-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">9</td>
              <td className="border border-gray-300 px-4 py-2">Deemed total income under section 115JB (7 + 8c - 8j)</td>
              <td className="border border-gray-300 px-4 py-2">
                <input type="number" {...register("mat_deemed_total_income_115jb" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                <span className="font-semibold">9a</span>. Deemed total income u/s 115JB from Units located in IFSC, if any
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input type="number" {...register("mat_deemed_income_ifsc_unit" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                <span className="font-semibold">9b</span>. Deemed total income u/s 115JB from other Units (₹-Pa)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input type="number" {...register("mat_deemed_income_other_unit" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
              </td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">10</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Tax payable under section 115JB [9% of (9a) + 15% of (9b)]</td>
              <td className="border border-gray-300 px-4 py-2 font-bold">
                {(
                  ((watch("mat_deemed_income_ifsc_unit" as any) || 0) * 0.09) +
                  ((watch("mat_deemed_income_other_unit" as any) || 0) * 0.15)
                ).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
