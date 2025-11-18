import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

const ComprehensiveIncomeStatement: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "profit",
    "provisions",
    "appropriations",
    "other-comprehensive",
    "total-comprehensive",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Watch profit-related fields
  const profitBeforeTax =
    (watch("ci_profit_before_interest_depreciation") || 0) -
    (watch("ci_finance_costs") || 0) -
    (watch("ci_depreciation_amortization") || 0);

  const totalProvisions =
    (watch("ci_provision_bad_doubtful_debts") || 0) +
    (watch("ci_provision_current_tax") || 0) +
    (watch("ci_provision_deferred_tax") || 0);

  const profitAfterTax = profitBeforeTax - totalProvisions;

  // Watch appropriations
  const totalAppropriations =
    (watch("ci_transfer_reserves_surplus") || 0) +
    (watch("ci_proposed_dividend") || 0) +
    (watch("ci_tax_on_dividend") || 0) +
    (watch("ci_csr_appropriation") || 0) +
    (watch("ci_other_appropriation") || 0);

  // Watch other comprehensive income items
  const itemsNotReclassified =
    (watch("ci_remeasurement_pension_changes") || 0) +
    (watch("ci_remeasurement_deferred_benefit") || 0) +
    (watch("ci_equity_instruments_changes") || 0) +
    (watch("ci_own_credit_risk_changes") || 0) +
    (watch("ci_share_other_comprehensive_income") || 0) +
    (watch("ci_other_not_reclassified_nature") || 0);

  const itemsReclassifiable =
    (watch("ci_exchange_differences_translation") || 0) +
    (watch("ci_effective_portion_cash_flow_hedge") || 0) +
    (watch("ci_gains_losses_hedging_instruments") || 0) +
    (watch("ci_oci_associates_joint_ventures") || 0) +
    (watch("ci_other_reclassified_nature") || 0);

  const totalOtherComprehensiveIncome = itemsNotReclassified + itemsReclassifiable;

  const totalComprehensiveIncome = profitAfterTax + totalOtherComprehensiveIncome;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Statement of Changes in Equity & Comprehensive Income
      </h2>

      {/* Profit Calculation */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("profit")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("profit") ? "▼" : "▶"} A. Profit Before & After Tax
        </button>

        {expandedSections.includes("profit") && (
          <div className="p-4 bg-white border-t border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profit before interest, depreciation and taxes (EBITDA)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_profit_before_interest_depreciation", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_profit_before_interest_depreciation ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Less: Finance Costs
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_finance_costs", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_finance_costs ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Less: Depreciation and Amortization
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_depreciation_amortization", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_depreciation_amortization ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="bg-blue-100 p-3 rounded mb-4">
              <p className="font-semibold text-sm text-blue-700">
                Profit Before Tax (PBT): {profitBeforeTax.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Provisions and Tax */}
      <div className="mb-6 border-l-4 border-red-500">
        <button
          onClick={() => toggleSection("provisions")}
          className="w-full bg-red-50 hover:bg-red-100 px-4 py-3 font-semibold text-left text-red-700 rounded transition"
        >
          {expandedSections.includes("provisions") ? "▼" : "▶"} B. Provisions & Tax Expenses
        </button>

        {expandedSections.includes("provisions") && (
          <div className="p-4 bg-white border-t border-red-200">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Bad Debts & Doubtful Debts:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN/Aadhaar No. of Person (Bad Debts &gt; Rs. 1 Lakh):
                    </label>
                    <input
                      type="text"
                      {...register("ci_bad_debts_pan")}
                      placeholder="Enter PAN/Aadhaar"
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.ci_bad_debts_pan ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Bad Debts Written Off
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("ci_bad_debts_total", { valueAsNumber: true })}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.ci_bad_debts_total ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bad Debts (Others - less than Rs. 1 Lakh)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("ci_bad_debts_others", { valueAsNumber: true })}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.ci_bad_debts_others ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Provisions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provision for Bad and Doubtful Debts
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("ci_provision_bad_doubtful_debts", { valueAsNumber: true })}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.ci_provision_bad_doubtful_debts ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provision for Current Tax
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("ci_provision_current_tax", { valueAsNumber: true })}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.ci_provision_current_tax ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Provision for Deferred Tax
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("ci_provision_deferred_tax", { valueAsNumber: true })}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.ci_provision_deferred_tax ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-red-100 p-3 rounded">
                <p className="font-semibold text-sm text-red-700">
                  Total Provisions & Taxes: {totalProvisions.toFixed(2)}
                </p>
              </div>

              <div className="bg-red-200 p-3 rounded">
                <p className="font-bold text-lg text-red-800">
                  Profit After Tax (PAT): {profitAfterTax.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appropriations */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("appropriations")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("appropriations") ? "▼" : "▶"} C. Appropriations
        </button>

        {expandedSections.includes("appropriations") && (
          <div className="p-4 bg-white border-t border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transfer to Reserves and Surplus
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_transfer_reserves_surplus", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_transfer_reserves_surplus ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed/Interim Dividend
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_proposed_dividend", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_proposed_dividend ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax on Dividend / Tax for Earlier Years
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_tax_on_dividend", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_tax_on_dividend ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appropriation towards Corporate Social Responsibility (CSR)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_csr_appropriation", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_csr_appropriation ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Any Other Appropriation (Specify)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_other_appropriation", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_other_appropriation ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="bg-purple-100 p-3 rounded mt-4">
              <p className="font-semibold text-sm text-purple-700">
                Total Appropriations: {totalAppropriations.toFixed(2)}
              </p>
            </div>

            <div className="bg-purple-200 p-3 rounded mt-2">
              <p className="font-bold text-lg text-purple-800">
                Balance Carried to Balance Sheet: {(profitAfterTax - totalAppropriations).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Other Comprehensive Income */}
      <div className="mb-6 border-l-4 border-green-500">
        <button
          onClick={() => toggleSection("other-comprehensive")}
          className="w-full bg-green-50 hover:bg-green-100 px-4 py-3 font-semibold text-left text-green-700 rounded transition"
        >
          {expandedSections.includes("other-comprehensive") ? "▼" : "▶"} D. Other Comprehensive Income (OCI)
        </button>

        {expandedSections.includes("other-comprehensive") && (
          <div className="p-4 bg-white border-t border-green-200">
            <h4 className="font-semibold text-sm text-gray-700 mb-4">A. Items that will NOT be reclassified to P&L:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ml-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Changes relating to Remeasurement of defined benefit plans
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_remeasurement_pension_changes", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_remeasurement_pension_changes ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Re-measurements of the deferred benefit plans
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_remeasurement_deferred_benefit", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_remeasurement_deferred_benefit ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equity instruments through OCI
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_equity_instruments_changes", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_equity_instruments_changes ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fair value: Changes relating to own credit risk of financial liabilities (FVTPL)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_own_credit_risk_changes", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_own_credit_risk_changes ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Share of Other Comprehensive Income in associates and joint ventures
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_share_other_comprehensive_income", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_share_other_comprehensive_income ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Others (Specify nature)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_other_not_reclassified_nature", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_other_not_reclassified_nature ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="bg-green-100 p-3 rounded mb-4">
              <p className="font-semibold text-sm text-green-700">
                Total Items Not Reclassified: {itemsNotReclassified.toFixed(2)}
              </p>
            </div>

            <h4 className="font-semibold text-sm text-gray-700 mb-4">B. Items that will be reclassified to P&L:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exchange differences in translating the financial statements of a foreign operation
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_exchange_differences_translation", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_exchange_differences_translation ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  The effective portion of gains and losses on hedging instruments in a cash flow hedge
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_effective_portion_cash_flow_hedge", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_effective_portion_cash_flow_hedge ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gains and losses on hedging instruments in a cash flow hedge
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_gains_losses_hedging_instruments", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_gains_losses_hedging_instruments ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Share of OCI in associates and joint ventures to the extent to be reclassified to P&L
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_oci_associates_joint_ventures", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_oci_associates_joint_ventures ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Others (Specify nature)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("ci_other_reclassified_nature", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.ci_other_reclassified_nature ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="bg-green-100 p-3 rounded mt-4">
              <p className="font-semibold text-sm text-green-700">
                Total Items Reclassifiable: {itemsReclassifiable.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Total Comprehensive Income */}
      <div className="mb-6 border-l-4 border-indigo-600">
        <button
          onClick={() => toggleSection("total-comprehensive")}
          className="w-full bg-indigo-50 hover:bg-indigo-100 px-4 py-3 font-semibold text-left text-indigo-700 rounded transition"
        >
          {expandedSections.includes("total-comprehensive") ? "▼" : "▶"} E. Total Comprehensive Income
        </button>

        {expandedSections.includes("total-comprehensive") && (
          <div className="p-4 bg-white border-t border-indigo-200">
            <div className="space-y-3">
              <div className="bg-blue-100 p-3 rounded">
                <p className="font-semibold text-sm text-blue-700">
                  Profit After Tax (PAT): {profitAfterTax.toFixed(2)}
                </p>
              </div>

              <div className="bg-green-100 p-3 rounded">
                <p className="font-semibold text-sm text-green-700">
                  Other Comprehensive Income (OCI): {totalOtherComprehensiveIncome.toFixed(2)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  (Items not reclassified: {itemsNotReclassified.toFixed(2)} + Items reclassifiable: {itemsReclassifiable.toFixed(2)})
                </p>
              </div>

              <div className="bg-indigo-200 p-4 rounded border-2 border-indigo-600">
                <p className="font-bold text-lg text-indigo-900">
                  Total Comprehensive Income: {totalComprehensiveIncome.toFixed(2)}
                </p>
              </div>
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

export default ComprehensiveIncomeStatement;
