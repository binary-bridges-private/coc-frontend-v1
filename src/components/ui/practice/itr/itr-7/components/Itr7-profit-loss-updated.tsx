import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

const UpdatedProfitLossStatement: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "gross-profit",
    "other-income",
    "operating-expenses",
    "financing-tax",
    "provisions",
    "appropriations",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Line 13: Gross Profit
  const grossProfit = watch("pl_new_gross_profit") || 0;

  // Line 14: Other Income (13 items)
  const totalOtherIncome =
    (watch("pl_new_rent") || 0) +
    (watch("pl_new_commission") || 0) +
    (watch("pl_new_dividend_income") || 0) +
    (watch("pl_new_interest_income") || 0) +
    (watch("pl_new_profit_fixed_assets") || 0) +
    (watch("pl_new_profit_securities") || 0) +
    (watch("pl_new_profit_other_investment") || 0) +
    (watch("pl_new_foreign_exchange_gain") || 0) +
    (watch("pl_new_inventory_conversion") || 0) +
    (watch("pl_new_agricultural_income") || 0) +
    (watch("pl_new_other_income_a") || 0) +
    (watch("pl_new_other_income_b") || 0) +
    (watch("pl_new_other_income_c") || 0);

  // Line 15: Total of credits to P&L
  const totalCredits = grossProfit + totalOtherIncome;

  // Line 16-46: Operating Expenses (consolidated)
  const totalOperatingExpenses =
    (watch("pl_new_freight_outward") || 0) +
    (watch("pl_new_consumption_stores") || 0) +
    (watch("pl_new_power_fuel") || 0) +
    (watch("pl_new_rents") || 0) +
    (watch("pl_new_repairs_building") || 0) +
    (watch("pl_new_repairs_machinery") || 0) +
    (watch("pl_new_compensation_employees") || 0) +
    (watch("pl_new_medical_insurance") || 0) +
    (watch("pl_new_workmen_welfare") || 0) +
    (watch("pl_new_entertainment") || 0) +
    (watch("pl_new_hospitality") || 0) +
    (watch("pl_new_conference") || 0) +
    (watch("pl_new_sales_promotion") || 0) +
    (watch("pl_new_advertisement") || 0) +
    (watch("pl_new_commission") || 0) +
    (watch("pl_new_royalty") || 0) +
    (watch("pl_new_professional_fees") || 0) +
    (watch("pl_new_hotel_boarding") || 0) +
    (watch("pl_new_travelling_expenses") || 0) +
    (watch("pl_new_foreign_travelling") || 0) +
    (watch("pl_new_conveyance") || 0) +
    (watch("pl_new_telephone") || 0) +
    (watch("pl_new_guest_house") || 0) +
    (watch("pl_new_club_expenses") || 0) +
    (watch("pl_new_festival_celebration") || 0) +
    (watch("pl_new_scholarship") || 0) +
    (watch("pl_new_gift") || 0) +
    (watch("pl_new_donation") || 0) +
    (watch("pl_new_rates_taxes") || 0) +
    (watch("pl_new_audit_fee") || 0) +
    (watch("pl_new_other_expenses") || 0);

  // Line 47: Bad Debts
  const totalBadDebts =
    (watch("pl_new_bad_debts_over_1lakh") || 0) +
    (watch("pl_new_bad_debts_under_1lakh") || 0);

  // Line 48: Provision for bad and doubtful debts
  const badDebtProvision = watch("pl_new_provision_bad_debts") || 0;

  // Line 49: Other provisions
  const otherProvisions = watch("pl_new_other_provisions") || 0;

  // Line 50: Profit before interest, depreciation and taxes
  const profitBeforeIDT = totalCredits - totalOperatingExpenses - totalBadDebts - badDebtProvision - otherProvisions;

  // Line 51: Interest (with sub-items)
  const totalInterest =
    (watch("pl_new_interest_outside") || 0) +
    (watch("pl_new_interest_others") || 0);

  // Line 52: Depreciation and amortization
  const depreciation = watch("pl_new_depreciation_amortization") || 0;

  // Line 53: Net profit before taxes
  const profitBeforeTax = profitBeforeIDT - totalInterest - depreciation;

  // Line 54-55: Provisions
  const currentTaxProvision = watch("pl_new_current_tax_provision") || 0;
  const deferredTaxProvision = watch("pl_new_deferred_tax_provision") || 0;

  // Line 56: Profit after tax
  const profitAfterTax = profitBeforeTax - currentTaxProvision - deferredTaxProvision;

  // Line 57: Balance brought forward
  const balanceBroughtForward = watch("pl_new_balance_previous_year") || 0;

  // Line 58: Amount available for appropriation
  const availableForAppropriation = profitAfterTax + balanceBroughtForward;

  // Line 59: Appropriations
  const totalAppropriations =
    (watch("pl_new_transfer_reserves") || 0) +
    (watch("pl_new_dividend") || 0) +
    (watch("pl_new_tax_dividend") || 0) +
    (watch("pl_new_csr_appropriation") || 0) +
    (watch("pl_new_other_appropriation") || 0);

  // Line 60: Balance carried to balance sheet
  const balanceCarriedForward = availableForAppropriation - totalAppropriations;

  // Lines 61-62: Other Comprehensive Income
  const itemsNotReclassified =
    (watch("pl_new_remeasurement_changes") || 0) +
    (watch("pl_new_equity_changes") || 0);

  const itemsReclassifiable =
    (watch("pl_new_exchange_differences") || 0) +
    (watch("pl_new_hedging_gains") || 0);

  const totalOCI = itemsNotReclassified + itemsReclassifiable;

  // Line 62: Total Comprehensive Income
  const totalComprehensiveIncome = profitAfterTax + totalOCI;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
        Part A-P&L & I Ind-AS: Profit and Loss Account
      </h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        For the financial year 2024-25
      </p>

      {/* Gross Profit */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("gross-profit")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("gross-profit") ? "▼" : "▶"} Section 13: Gross Profit Transferred from Trading Account
        </button>

        {expandedSections.includes("gross-profit") && (
          <div className="p-4 bg-white border-t border-purple-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Profit transferred from Trading Account (12-12b)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("pl_new_gross_profit", { valueAsNumber: true })}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.pl_new_gross_profit ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Other Income */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("other-income")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("other-income") ? "▼" : "▶"} Section 14: Other Income (13 items)
        </button>

        {expandedSections.includes("other-income") && (
          <div className="p-4 bg-white border-t border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">i. Rent</label>
                <input type="number" step="0.01" {...register("pl_new_rent", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">ii. Commission</label>
                <input type="number" step="0.01" {...register("pl_new_commission", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">iii. Dividend income</label>
                <input type="number" step="0.01" {...register("pl_new_dividend_income", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">iv. Interest income</label>
                <input type="number" step="0.01" {...register("pl_new_interest_income", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">v. Profit on sale of fixed assets</label>
                <input type="number" step="0.01" {...register("pl_new_profit_fixed_assets", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">vi. Profit on sale of securities</label>
                <input type="number" step="0.01" {...register("pl_new_profit_securities", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">vii. Profit on other investment</label>
                <input type="number" step="0.01" {...register("pl_new_profit_other_investment", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">viii. Foreign exchange gain</label>
                <input type="number" step="0.01" {...register("pl_new_foreign_exchange_gain", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">ix. Inventory conversion profit</label>
                <input type="number" step="0.01" {...register("pl_new_inventory_conversion", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">x. Agricultural income</label>
                <input type="number" step="0.01" {...register("pl_new_agricultural_income", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">xi(a). Other income - a</label>
                <input type="number" step="0.01" {...register("pl_new_other_income_a", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">xi(b). Other income - b</label>
                <input type="number" step="0.01" {...register("pl_new_other_income_b", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">xi(c). Other income - c</label>
                <input type="number" step="0.01" {...register("pl_new_other_income_c", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
            </div>
            <div className="bg-blue-100 p-2 rounded mt-3">
              <p className="font-semibold text-sm text-blue-700">xii. Total other income: {totalOtherIncome.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Line 15: Total Credits */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded mb-6 border-2 border-purple-400">
        <p className="font-semibold text-sm text-purple-900">
          Line 15: Total of credits to P&L (13+14): {totalCredits.toFixed(2)}
        </p>
      </div>

      {/* Operating Expenses */}
      <div className="mb-6 border-l-4 border-green-500">
        <button
          onClick={() => toggleSection("operating-expenses")}
          className="w-full bg-green-50 hover:bg-green-100 px-4 py-3 font-semibold text-left text-green-700 rounded transition"
        >
          {expandedSections.includes("operating-expenses") ? "▼" : "▶"} Sections 16-46: Operating & Other Expenses
        </button>

        {expandedSections.includes("operating-expenses") && (
          <div className="p-4 bg-white border-t border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">16. Freight outward</label>
                <input type="number" step="0.01" {...register("pl_new_freight_outward", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">17. Consumption of stores</label>
                <input type="number" step="0.01" {...register("pl_new_consumption_stores", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">18. Power and fuel</label>
                <input type="number" step="0.01" {...register("pl_new_power_fuel", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">19. Rents</label>
                <input type="number" step="0.01" {...register("pl_new_rents", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">20. Repairs to building</label>
                <input type="number" step="0.01" {...register("pl_new_repairs_building", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">21. Repairs to machinery</label>
                <input type="number" step="0.01" {...register("pl_new_repairs_machinery", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">22. Compensation to employees</label>
                <input type="number" step="0.01" {...register("pl_new_compensation_employees", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">23. Insurance</label>
                <input type="number" step="0.01" {...register("pl_new_medical_insurance", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">24. Workmen & staff welfare</label>
                <input type="number" step="0.01" {...register("pl_new_workmen_welfare", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">25. Entertainment</label>
                <input type="number" step="0.01" {...register("pl_new_entertainment", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">26. Hospitality</label>
                <input type="number" step="0.01" {...register("pl_new_hospitality", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">27. Conference</label>
                <input type="number" step="0.01" {...register("pl_new_conference", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">28. Sales promotion</label>
                <input type="number" step="0.01" {...register("pl_new_sales_promotion", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">29. Advertisement</label>
                <input type="number" step="0.01" {...register("pl_new_advertisement", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">30. Commission</label>
                <input type="number" step="0.01" {...register("pl_new_commission", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">31. Royalty</label>
                <input type="number" step="0.01" {...register("pl_new_royalty", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">32. Professional fees</label>
                <input type="number" step="0.01" {...register("pl_new_professional_fees", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">33. Hotel & boarding</label>
                <input type="number" step="0.01" {...register("pl_new_hotel_boarding", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">34. Travelling expenses</label>
                <input type="number" step="0.01" {...register("pl_new_travelling_expenses", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">35. Foreign travelling</label>
                <input type="number" step="0.01" {...register("pl_new_foreign_travelling", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">36. Conveyance</label>
                <input type="number" step="0.01" {...register("pl_new_conveyance", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">37. Telephone</label>
                <input type="number" step="0.01" {...register("pl_new_telephone", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">38. Guest house</label>
                <input type="number" step="0.01" {...register("pl_new_guest_house", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">39. Club expenses</label>
                <input type="number" step="0.01" {...register("pl_new_club_expenses", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">40. Festival celebration</label>
                <input type="number" step="0.01" {...register("pl_new_festival_celebration", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">41. Scholarship</label>
                <input type="number" step="0.01" {...register("pl_new_scholarship", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">42. Gift</label>
                <input type="number" step="0.01" {...register("pl_new_gift", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">43. Donation</label>
                <input type="number" step="0.01" {...register("pl_new_donation", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">44. Rates & taxes</label>
                <input type="number" step="0.01" {...register("pl_new_rates_taxes", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">45. Audit fee</label>
                <input type="number" step="0.01" {...register("pl_new_audit_fee", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">46. Other expenses</label>
                <input type="number" step="0.01" {...register("pl_new_other_expenses", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
              </div>
            </div>
            <div className="bg-green-100 p-2 rounded mt-3">
              <p className="font-semibold text-sm text-green-700">Total Operating Expenses: {totalOperatingExpenses.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bad Debts & Provisions */}
      <div className="mb-6 border-l-4 border-red-500">
        <button
          onClick={() => toggleSection("financing-tax")}
          className="w-full bg-red-50 hover:bg-red-100 px-4 py-3 font-semibold text-left text-red-700 rounded transition"
        >
          {expandedSections.includes("financing-tax") ? "▼" : "▶"} Sections 47-55: Bad Debts, Provisions & Tax
        </button>

        {expandedSections.includes("financing-tax") && (
          <div className="p-4 bg-white border-t border-red-200">
            <div className="space-y-4">
              {/* Line 47: Bad Debts */}
              <div className="border-b pb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Line 47: Bad Debts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">i. Over Rs. 1 Lakh (with PAN)</label>
                    <input type="number" step="0.01" {...register("pl_new_bad_debts_over_1lakh", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ii. Under Rs. 1 Lakh</label>
                    <input type="number" step="0.01" {...register("pl_new_bad_debts_under_1lakh", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded mt-2 text-sm">
                  <p className="font-semibold text-red-700">Total Bad Debts: {totalBadDebts.toFixed(2)}</p>
                </div>
              </div>

              {/* Line 48: Provision for bad & doubtful debts */}
              <div className="border-b pb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Line 48: Provision for Bad & Doubtful Debts</label>
                <input type="number" step="0.01" {...register("pl_new_provision_bad_debts", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded" />
              </div>

              {/* Line 49: Other provisions */}
              <div className="border-b pb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Line 49: Other Provisions</label>
                <input type="number" step="0.01" {...register("pl_new_other_provisions", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded" />
              </div>

              {/* Line 50 Summary */}
              <div className="bg-red-100 p-3 rounded">
                <p className="font-semibold text-sm text-red-700">Line 50: Profit before interest, depreciation & taxes: {profitBeforeIDT.toFixed(2)}</p>
              </div>

              {/* Line 51: Interest */}
              <div className="border-b pb-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Line 51: Interest</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">i. Outside India</label>
                    <input type="number" step="0.01" {...register("pl_new_interest_outside", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ii. To others</label>
                    <input type="number" step="0.01" {...register("pl_new_interest_others", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                </div>
                <div className="bg-red-100 p-2 rounded mt-2 text-sm">
                  <p className="font-semibold text-red-700">Total Interest: {totalInterest.toFixed(2)}</p>
                </div>
              </div>

              {/* Line 52: Depreciation */}
              <div className="border-b pb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Line 52: Depreciation & Amortization</label>
                <input type="number" step="0.01" {...register("pl_new_depreciation_amortization", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded" />
              </div>

              {/* Line 53: Net profit before taxes */}
              <div className="bg-red-200 p-3 rounded">
                <p className="font-bold text-sm text-red-800">Line 53: Net profit before taxes (50-51-52): {profitBeforeTax.toFixed(2)}</p>
              </div>

              {/* Line 54-55: Tax Provisions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 54: Current Tax Provision</label>
                  <input type="number" step="0.01" {...register("pl_new_current_tax_provision", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line 55: Deferred Tax Provision</label>
                  <input type="number" step="0.01" {...register("pl_new_deferred_tax_provision", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded" />
                </div>
              </div>

              {/* Line 56: Profit after tax */}
              <div className="bg-red-300 p-3 rounded border-2 border-red-600">
                <p className="font-bold text-lg text-red-900">Line 56: Profit After Tax (53-54-55): {profitAfterTax.toFixed(2)}</p>
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
          {expandedSections.includes("appropriations") ? "▼" : "▶"} Sections 57-60: Balance & Appropriations
        </button>

        {expandedSections.includes("appropriations") && (
          <div className="p-4 bg-white border-t border-purple-200">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Line 57: Balance brought forward from previous year</label>
                <input type="number" step="0.01" {...register("pl_new_balance_previous_year", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded" />
              </div>

              <div className="bg-purple-100 p-2 rounded">
                <p className="font-semibold text-sm text-purple-700">Line 58: Amount available for appropriation (56+57): {availableForAppropriation.toFixed(2)}</p>
              </div>

              <div className="border-t pt-3">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Line 59: Appropriations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">i. Transfer to reserves & surplus</label>
                    <input type="number" step="0.01" {...register("pl_new_transfer_reserves", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">ii. Dividend</label>
                    <input type="number" step="0.01" {...register("pl_new_dividend", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">iii. Tax on dividend</label>
                    <input type="number" step="0.01" {...register("pl_new_tax_dividend", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">iv. CSR appropriation</label>
                    <input type="number" step="0.01" {...register("pl_new_csr_appropriation", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">v. Other appropriation</label>
                    <input type="number" step="0.01" {...register("pl_new_other_appropriation", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                </div>
                <div className="bg-purple-100 p-2 rounded mt-2 text-sm">
                  <p className="font-semibold text-purple-700">Total Appropriations: {totalAppropriations.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-purple-300 p-3 rounded border-2 border-purple-600">
                <p className="font-bold text-lg text-purple-900">Line 60: Balance carried to balance sheet (58-59): {balanceCarriedForward.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comprehensive Income */}
      <div className="mb-6 border-l-4 border-indigo-500">
        <button
          onClick={() => toggleSection("comprehensive")}
          className="w-full bg-indigo-50 hover:bg-indigo-100 px-4 py-3 font-semibold text-left text-indigo-700 rounded transition"
        >
          {expandedSections.includes("comprehensive") ? "▼" : "▶"} Sections 61-62: Comprehensive Income
        </button>

        {expandedSections.includes("comprehensive") && (
          <div className="p-4 bg-white border-t border-indigo-200">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Line 61(A): Items NOT reclassified to P&L</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Remeasurement of pension plans</label>
                    <input type="number" step="0.01" {...register("pl_new_remeasurement_changes", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Equity instruments changes</label>
                    <input type="number" step="0.01" {...register("pl_new_equity_changes", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Line 61(B): Items RECLASSIFIABLE to P&L</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Exchange differences in translation</label>
                    <input type="number" step="0.01" {...register("pl_new_exchange_differences", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Gains on hedging instruments</label>
                    <input type="number" step="0.01" {...register("pl_new_hedging_gains", { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-indigo-100 p-3 rounded">
                <p className="font-semibold text-sm text-indigo-700">Total OCI (61A + 61B): {totalOCI.toFixed(2)}</p>
              </div>

              <div className="bg-indigo-300 p-3 rounded border-2 border-indigo-600">
                <p className="font-bold text-lg text-indigo-900">Line 62: Total Comprehensive Income (56+OCI): {totalComprehensiveIncome.toFixed(2)}</p>
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

export default UpdatedProfitLossStatement;
