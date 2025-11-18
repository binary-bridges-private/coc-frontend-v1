import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

const OtherInformation: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "accounting",
    "deviations",
    "amounts-not-credited",
    "deductions",
    "disallowances",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
        Part A-OI: Other Information
      </h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Mandatory if liable for audit under section 44AB or other IT (if applicable)
      </p>

      {/* Accounting Methods */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("accounting")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("accounting") ? "▼" : "▶"} Section 1: Accounting Methods
        </button>

        {expandedSections.includes("accounting") && (
          <div className="p-4 bg-white border-t border-blue-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1. Method of accounting employed in the previous year (Tds) ⊞
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" {...register("oi_accounting_method_prev")} value="mercantile" className="mr-2" />
                  <label className="text-sm text-gray-600">Mercantile</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" {...register("oi_accounting_method_prev")} value="cash" className="mr-2" />
                  <label className="text-sm text-gray-600">Cash</label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. Is there any change in method of accounting? (Tds) ⊞
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" {...register("oi_accounting_method_change")} value="yes" className="mr-2" />
                  <label className="text-sm text-gray-600">Yes</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" {...register("oi_accounting_method_change")} value="no" className="mr-2" />
                  <label className="text-sm text-gray-600">No</label>
                </div>
              </div>
              {watch("oi_accounting_method_change") === "yes" && (
                <textarea
                  {...register("oi_accounting_change_details")}
                  placeholder="Details of method change"
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-2"
                  rows={2}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. Method of valuation of closing stock employed in the previous year (optional in case of professionals)
              </label>
              <select
                {...register("oi_stock_valuation_method")}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Select method</option>
                <option value="fifo">FIFO (First In First Out)</option>
                <option value="lifo">LIFO (Last In First Out)</option>
                <option value="weighted-avg">Weighted Average</option>
                <option value="standard-cost">Standard Cost</option>
                <option value="market-value">Market Value</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4. Finished goods (if cost or market rate whichever is less write 1, if at cost write 2, if at market rate write 3)
              </label>
              <input
                type="number"
                {...register("oi_finished_goods_method", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                min="1"
                max="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                5. Is there any change in stock valuation method? (Tds) ⊞
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" {...register("oi_stock_valuation_change")} value="yes" className="mr-2" />
                  <label className="text-sm text-gray-600">Yes</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" {...register("oi_stock_valuation_change")} value="no" className="mr-2" />
                  <label className="text-sm text-gray-600">No</label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deviations & Profit Changes */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("deviations")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("deviations") ? "▼" : "▶"} Section 2: Deviations & Profit Changes
        </button>

        {expandedSections.includes("deviations") && (
          <div className="p-4 bg-white border-t border-purple-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3a. Increase in profit or decrease is loss because of deviation, if any, as per Income Computation & Disclosure Standards
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_profit_increase_icds", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3b. Decrease in profit or increase in loss because of deviation, if any, from the method of valuation
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_profit_decrease_valuation", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4. Method of valuation of closing stock employed in the previous year (optional in case of professionals)
              </label>
              <textarea
                {...register("oi_closing_stock_valuation")}
                placeholder="Describe valuation method"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>
          </div>
        )}
      </div>

      {/* Amounts Not Credited */}
      <div className="mb-6 border-l-4 border-green-500">
        <button
          onClick={() => toggleSection("amounts-not-credited")}
          className="w-full bg-green-50 hover:bg-green-100 px-4 py-3 font-semibold text-left text-green-700 rounded transition"
        >
          {expandedSections.includes("amounts-not-credited") ? "▼" : "▶"} Section 3: Amounts Not Credited to P&L
        </button>

        {expandedSections.includes("amounts-not-credited") && (
          <div className="p-4 bg-white border-t border-green-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                a. Hive items falling within the scope of section 28
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_items_section_28", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                b. The proforma credits, drawbacks, refund of duty of customs or excise or service tax, or refund of sales tax or VAT
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_proforma_credits", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                c. Escalation claims accepted during the previous year
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_escalation_claims", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                d. Any other item of income
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_other_income_item", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                e. Capital receipt, if any
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_capital_receipt", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Deductions & Allowances */}
      <div className="mb-6 border-l-4 border-red-500">
        <button
          onClick={() => toggleSection("deductions")}
          className="w-full bg-red-50 hover:bg-red-100 px-4 py-3 font-semibold text-left text-red-700 rounded transition"
        >
          {expandedSections.includes("deductions") ? "▼" : "▶"} Section 4-11: Deductions & Allowances
        </button>

        {expandedSections.includes("deductions") && (
          <div className="p-4 bg-white border-t border-red-200 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6a. Premium paid for insurance against risk of damage
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_insurance_premium", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6b. Premium paid for insurance on the health of employees
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_health_insurance_premium", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6c. Amount paid to an employee as bonus or commission
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_employee_bonus_commission", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6d. Amount of interest paid on borrowed capital
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_interest_borrowed_capital", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6e. Amount of contribution to recognized provident fund
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_provident_fund_contribution", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6f. Amount of contribution to pension scheme deferred u/s 80CCD
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_pension_contribution", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6g. Amount of contribution to approved gratuity fund
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_gratuity_fund_contribution", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6h. Amount of contribution to any other fund
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_other_fund_contribution", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6i. Amount of bad and doubtful debts
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_bad_debts_allowance", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6j. Provision for bad and doubtful debts
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_bad_debts_provision", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6k. Amount transferred to special reserve
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_special_reserve_transfer", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  6l. Expenditure for purposes of promoting family planning
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("oi_family_planning_expenditure", { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disallowances */}
      <div className="mb-6 border-l-4 border-orange-500">
        <button
          onClick={() => toggleSection("disallowances")}
          className="w-full bg-orange-50 hover:bg-orange-100 px-4 py-3 font-semibold text-left text-orange-700 rounded transition"
        >
          {expandedSections.includes("disallowances") ? "▼" : "▶"} Section 7-11: Disallowances & Section 40
        </button>

        {expandedSections.includes("disallowances") && (
          <div className="p-4 bg-white border-t border-orange-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7a. Expenditure of capital nature (17(1))
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_capital_expenditure_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7b. Expenditure of personal nature (17(1))
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_personal_expenditure_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7c. Expenditure laid out or expanded wholly and exclusively NPL
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_npl_expenditure_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7d. Expenditure by way of penalty or fine for violation of law
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_penalty_fine_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7e. Any amount incurred in respect of any purpose for which is an offence
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_offence_purpose_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7f. Expenditure incurred on corporate social responsibility (CSR)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_csr_expenditure_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7g. Amount of any liability of contingent nature
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_contingent_liability_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                7h. Any other disallowable under section 3
              </label>
              <input
                type="number"
                step="0.01"
                {...register("oi_other_disallow", { valueAsNumber: true })}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtherInformation;
