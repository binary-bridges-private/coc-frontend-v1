import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleBPProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleBP: React.FC<ScheduleBPProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch, setValue, handleSubmit, formState: { errors } } = form;

  // Watch fields for calculations
  const profitBeforeTax = watch("bp_profit_before_tax") || 0;
  const speculativeProfitIncluded = watch("bp_speculative_profit_included") || 0;
  const specifiedBusinessProfitIncluded = watch("bp_specified_business_profit_included") || 0;
  
  // Income credited to P&L considered under other heads
  const housePropertyIncome = watch("bp_house_property_income") || 0;
  const capitalGainsIncome = watch("bp_capital_gains_income") || 0;
  const otherSourcesIncome = watch("bp_other_sources_income") || 0;
  const dividendIncome = watch("bp_dividend_income") || 0;
  const otherThanDividendIncome = watch("bp_other_than_dividend_income") || 0;
  const income115BBF = watch("bp_115bbf_income") || 0;
  const income115BBG = watch("bp_115bbg_income") || 0;
  const income115BBH = watch("bp_115bbh_income") || 0;
  const costAcquisition115BBH = watch("bp_115bbh_cost_acquisition") || 0;

  // Profit included in 1 referred to in section 44B etc
  const profit44B = watch("bp_profit_44b_etc") || 0;
  const profitLifeInsurance = watch("bp_profit_life_insurance_115b") || 0;
  const profitRule7 = watch("bp_profit_rule_7_etc") || 0;
  const profitRawDiamonds = watch("bp_profit_raw_diamonds") || 0;

  // Exempt income
  const shareIncomeFirm = watch("bp_share_income_firm") || 0;
  const shareIncomeAOP = watch("bp_share_income_aop_boi") || 0;
  const otherExemptIncome = watch("bp_other_exempt_income_amount") || 0;

  // Calculate Item 6: Balance
  useEffect(() => {
    const totalDeductionsFromProfit = 
      Number(speculativeProfitIncluded) + 
      Number(specifiedBusinessProfitIncluded) + 
      Number(housePropertyIncome) + 
      Number(capitalGainsIncome) + 
      Number(otherSourcesIncome) + 
      Number(dividendIncome) + 
      Number(otherThanDividendIncome) + 
      Number(income115BBF) + 
      Number(income115BBG) + 
      (Number(income115BBH) - Number(costAcquisition115BBH)) +
      Number(profit44B) + 
      Number(profitLifeInsurance) + 
      Number(profitRule7) + 
      Number(profitRawDiamonds) + 
      Number(shareIncomeFirm) + 
      Number(shareIncomeAOP) + 
      Number(otherExemptIncome);

    const balance = Number(profitBeforeTax) - totalDeductionsFromProfit;
    setValue("bp_balance_6", balance);
  }, [
    profitBeforeTax, speculativeProfitIncluded, specifiedBusinessProfitIncluded,
    housePropertyIncome, capitalGainsIncome, otherSourcesIncome, dividendIncome,
    otherThanDividendIncome, income115BBF, income115BBG, income115BBH, costAcquisition115BBH,
    profit44B, profitLifeInsurance, profitRule7, profitRawDiamonds,
    shareIncomeFirm, shareIncomeAOP, otherExemptIncome, setValue
  ]);

  const balance6 = watch("bp_balance_6") || 0;

  // Expenses debited to P&L
  const expHouseProperty = watch("bp_exp_house_property") || 0;
  const expCapitalGains = watch("bp_exp_capital_gains") || 0;
  const expOtherSources = watch("bp_exp_other_sources") || 0;
  const exp115BBF = watch("bp_exp_115bbf") || 0;
  const exp115BBG = watch("bp_exp_115bbg") || 0;
  const exp115BBH = watch("bp_exp_115bbh") || 0;
  const expExemptIncome = watch("bp_exp_exempt_income") || 0;
  const expExemptIncomeDisallowed = watch("bp_exp_exempt_income_disallowed_14a") || 0;

  // Calculate Item 9: Total Expenses
  useEffect(() => {
    const totalExpenses = 
      Number(expHouseProperty) + 
      Number(expCapitalGains) + 
      Number(expOtherSources) + 
      Number(exp115BBF) + 
      Number(exp115BBG) + 
      Number(exp115BBH) + 
      Number(expExemptIncome) + 
      Number(expExemptIncomeDisallowed);
    
    setValue("bp_total_7_8", totalExpenses);
  }, [
    expHouseProperty, expCapitalGains, expOtherSources, exp115BBF, exp115BBG, exp115BBH,
    expExemptIncome, expExemptIncomeDisallowed, setValue
  ]);

  const totalExpenses9 = watch("bp_total_7_8") || 0;

  // Calculate Item 10: Adjusted Profit or Loss
  useEffect(() => {
    setValue("bp_adjusted_profit_loss_10", Number(balance6) + Number(totalExpenses9));
  }, [balance6, totalExpenses9, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule BP
          </h1>
          <p className="text-slate-600 text-lg">
            Computation of income from business or profession
          </p>
        </div>

        {/* Part A: From business or profession other than speculative business and specified business */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Part A: From business or profession other than speculative business and specified business
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  1. Profit before tax as per profit and loss account
                </label>
                <input
                  type="number"
                  {...register("bp_profit_before_tax")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  2a. Net profit or loss from speculative business included in 1
                </label>
                <input
                  type="number"
                  {...register("bp_speculative_profit_included")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  2b. Net profit or Loss from Specified Business u/s 35AD included in 1
                </label>
                <input
                  type="number"
                  {...register("bp_specified_business_profit_included")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                3. Income/ receipts credited to profit and loss account considered under other heads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3a. House property</label>
                  <input type="number" {...register("bp_house_property_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3b. Capital gains</label>
                  <input type="number" {...register("bp_capital_gains_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3c. Other sources</label>
                  <input type="number" {...register("bp_other_sources_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3ci. Dividend</label>
                  <input type="number" {...register("bp_dividend_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3cii. Other than Dividend</label>
                  <input type="number" {...register("bp_other_than_dividend_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3d. u/s 115BBF</label>
                  <input type="number" {...register("bp_115bbf_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3e. u/s 115BBG</label>
                  <input type="number" {...register("bp_115bbg_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">3f. u/s 115BBH (Net of Cost)</label>
                  <div className="flex gap-2">
                    <input placeholder="Income" type="number" {...register("bp_115bbh_income")} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                    <input placeholder="Cost" type="number" {...register("bp_115bbh_cost_acquisition")} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                4. Profit or loss included in 1, referred to in specific sections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">4a. Section 44B/44BB/44BBA etc.</label>
                  <input type="number" {...register("bp_profit_44b_etc")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">4b. Life insurance business (115B)</label>
                  <input type="number" {...register("bp_profit_life_insurance_115b")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">4c. Activities under rule 7, 7A, 7B, 8</label>
                  <input type="number" {...register("bp_profit_rule_7_etc")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">4d. Selling raw diamonds</label>
                  <input type="number" {...register("bp_profit_raw_diamonds")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                5. Income credited to P&L account (included in 1) which is exempt
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">5a. Share of income from firm(s)</label>
                  <input type="number" {...register("bp_share_income_firm")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">5b. Share of income from AOP/ BOI</label>
                  <input type="number" {...register("bp_share_income_aop_boi")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">5c. Any other exempt income</label>
                  <div className="flex gap-2">
                    <input placeholder="Nature" type="text" {...register("bp_other_exempt_income_nature")} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                    <input placeholder="Amount" type="number" {...register("bp_other_exempt_income_amount")} className="w-1/2 px-3 py-2 border border-slate-300 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-md mt-4">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-800">6. Balance (1-2a-2b-3a-3b-3c-3d-3e-3f-4-5d)</label>
                <input
                  type="number"
                  readOnly
                  {...register("bp_balance_6")}
                  className="w-1/3 px-3 py-2 border border-slate-300 rounded-md bg-slate-200 font-bold text-right"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                7. Expenses debited to profit and loss account considered under other heads
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">7a. House property</label>
                  <input type="number" {...register("bp_exp_house_property")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">7b. Capital gains</label>
                  <input type="number" {...register("bp_exp_capital_gains")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">7c. Other sources</label>
                  <input type="number" {...register("bp_exp_other_sources")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">7d. u/s 115BBF</label>
                  <input type="number" {...register("bp_exp_115bbf")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">7e. u/s 115BBG</label>
                  <input type="number" {...register("bp_exp_115bbg")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">7f. u/s 115BBH</label>
                  <input type="number" {...register("bp_exp_115bbh")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                8. Expenses debited to profit and loss account which relate to exempt income
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">8a. Expenses related to exempt income</label>
                  <input type="number" {...register("bp_exp_exempt_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">8b. Disallowed u/s 14A</label>
                  <input type="number" {...register("bp_exp_exempt_income_disallowed_14a")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-md mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-slate-800">9. Total (7a to 7f + 8a + 8b)</label>
                <input
                  type="number"
                  readOnly
                  {...register("bp_total_7_8")}
                  className="w-1/3 px-3 py-2 border border-slate-300 rounded-md bg-slate-200 font-bold text-right"
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-800">10. Adjusted profit or loss (6+9)</label>
                <input
                  type="number"
                  readOnly
                  {...register("bp_adjusted_profit_loss_10")}
                  className="w-1/3 px-3 py-2 border border-slate-300 rounded-md bg-slate-200 font-bold text-right"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                11-12. Depreciation and Amortization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">11. Depreciation and amortization debited to P&L</label>
                  <input type="number" {...register("bp_depreciation_debited")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">12i. Depreciation u/s 32(1)(ii)</label>
                  <input type="number" {...register("bp_depreciation_allowable_32_1_ii")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">12ii. Depreciation u/s 32(1)(i)</label>
                  <input type="number" {...register("bp_depreciation_allowable_32_1_i")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                13. Profit or loss after adjustment for depreciation
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">13. (10+11-12ii)</label>
                <input type="number" {...register("bp_profit_loss_after_depreciation_13")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                14-23. Disallowances and Additions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">14. u/s 36 (1)(ia)</label>
                  <input type="number" {...register("bp_disallowance_36")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">15. u/s 37</label>
                  <input type="number" {...register("bp_disallowance_37")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">16. u/s 40(a)</label>
                  <input type="number" {...register("bp_disallowance_40")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">17. u/s 40A(9)</label>
                  <input type="number" {...register("bp_disallowance_40a")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">18. u/s 43B</label>
                  <input type="number" {...register("bp_disallowance_43b")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">19. MSME Interest u/s 23</label>
                  <input type="number" {...register("bp_disallowance_23_msme")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">20. Deemed income u/s 41</label>
                  <input type="number" {...register("bp_deemed_income_41")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">21. u/s 32AC/33AB/33ABA etc.</label>
                  <input type="number" {...register("bp_deemed_income_32ac_etc")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">22. u/s 43CA</label>
                  <input type="number" {...register("bp_deemed_income_43ca")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">23. Other additions u/s 28-44DB</label>
                  <input type="number" {...register("bp_other_additions_28_to_44db")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                24-32. Deductions and Other Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">24. Other income not in P&L/any other expense</label>
                  <input type="number" {...register("bp_other_income_not_included")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">25. ICDS adjustments increase</label>
                  <input type="number" {...register("bp_icds_adjustments_increase")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">26. Total (14+15+16+17+18+19+20+21+22+23+24+25)</label>
                  <input type="number" {...register("bp_total_additions")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                27-34. Deductions from Total
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">27. Deduction u/s 32(1)(iii)</label>
                  <input type="number" {...register("bp_deduction_32_1_iii")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">28. Amount u/s 32AC</label>
                  <input type="number" {...register("bp_deduction_32ac")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">29. Amount u/s 35/35CCD in excess</label>
                  <input type="number" {...register("bp_deduction_35_excess")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">30. Any amount disallowed u/s 40</label>
                  <input type="number" {...register("bp_disallowed_40_allowable")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">31. Any amount disallowed u/s 43B</label>
                  <input type="number" {...register("bp_disallowed_43b_allowable")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">32. Any other allowable deduction</label>
                  <input type="number" {...register("bp_other_deductions_allowable")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">33. ICDS adjustments decrease</label>
                  <input type="number" {...register("bp_icds_adjustments_decrease")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">34. Total (27+28+29+30+31+32+33)</label>
                  <input type="number" {...register("bp_total_deductions")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-md mt-4">
              <label className="font-bold text-slate-800">35. Income (13+26-34)</label>
              <input type="number" {...register("bp_income_business_profession_35")} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-200 font-bold text-right" />
            </div>
          </div>
        </div>

        {/* Part D: Deemed Profit Sections */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            Part D: Profits and gains deemed to be business income
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36i. u/s 44AE(1)(i) - Schedule P&L</label>
                <input type="number" {...register("bp_deemed_profit_44ae")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36ii. u/s 44B</label>
                <input type="number" {...register("bp_deemed_profit_44b")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36iii. u/s 44BB</label>
                <input type="number" {...register("bp_deemed_profit_44bb")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36iv. u/s 44BBA</label>
                <input type="number" {...register("bp_deemed_profit_44bba")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36va. u/s 44BBB</label>
                <input type="number" {...register("bp_deemed_profit_44bbb")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36vb. u/s 44BBC</label>
                <input type="number" {...register("bp_deemed_profit_44bbc")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36vi. u/s 44D</label>
                <input type="number" {...register("bp_deemed_profit_44d")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36vii. u/s 44DA</label>
                <input type="number" {...register("bp_deemed_profit_44da")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36viii. u/s XII-G (tonnage)</label>
                <input type="number" {...register("bp_deemed_profit_chapter_xii_g")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">36ix. First Schedule of Income-tax Act</label>
                <input type="number" {...register("bp_deemed_profit_first_schedule")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>
            <div className="bg-slate-100 p-4 rounded-md mt-4">
              <label className="font-bold text-slate-800">Total Deemed Profit (36i to 36ix)</label>
              <input type="number" {...register("bp_total_deemed_profit")} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-200 font-bold" />
            </div>
          </div>
        </div>

        {/* Part E: Net Profit and Deemed Income */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold text-orange-900 mb-6">
            Part E: Net Profit and Deemed Income Computation
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">37. Net profit or loss from business or profession other than speculative/specified</label>
                <input type="number" {...register("bp_net_profit_business_profession_37")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38. Net Profit/Loss after applying Rule 7, 7A, 7B, or 8</label>
                <input type="number" {...register("bp_net_profit_business_profession_38")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38a. Income chargeable under Rule 7</label>
                <input type="number" {...register("bp_income_chargeable_rule_7")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38b. Deemed income chargeable under Rule 7A</label>
                <input type="number" {...register("bp_deemed_income_rule_7a")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38c. Deemed income chargeable under Rule 7B(1)</label>
                <input type="number" {...register("bp_deemed_income_rule_7b1")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38d. Deemed income chargeable under Rule 7B(1A)</label>
                <input type="number" {...register("bp_deemed_income_rule_7b1a")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38e. Deemed income chargeable under Rule 8</label>
                <input type="number" {...register("bp_deemed_income_rule_8")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">38f. Income other than Rule 7,7A,7B,8</label>
                <input type="number" {...register("bp_income_other_than_rule_7_8")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">39. Balance of income deemed to be agriculture</label>
                <input type="number" {...register("bp_balance_income_deemed_agriculture")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Part F: Intra head set off of business loss */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">
            Part F: Intra head set off of business loss of current year
          </h2>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-300 p-2 text-left">Type of Business Income</th>
                    <th className="border border-slate-300 p-2 text-center">Income of current year</th>
                    <th className="border border-slate-300 p-2 text-center">Business loss set off</th>
                    <th className="border border-slate-300 p-2 text-center">Income remaining after set off</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2">Loss to be set off</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_loss_to_be_set_off")} className="w-full px-2 py-1 border rounded" /></td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">Income from speculative business</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_income_speculative_set_off")} className="w-full px-2 py-1 border rounded" /></td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">Income from specified business</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_income_specified_set_off")} className="w-full px-2 py-1 border rounded" /></td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">Income from Life Insurance business u/s</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_income_life_insurance_set_off")} className="w-full px-2 py-1 border rounded" /></td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2">Income from Foreign Company from eligible business</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_income_foreign_company_set_off")} className="w-full px-2 py-1 border rounded" /></td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                  </tr>
                  <tr className="bg-slate-100">
                    <td className="border border-slate-300 p-2 font-bold">Total loss set off</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_total_loss_set_off")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                  </tr>
                  <tr className="bg-slate-100">
                    <td className="border border-slate-300 p-2 font-bold">Loss remaining after set off (i - v)</td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2">-</td>
                    <td className="border border-slate-300 p-2"><input type="number" {...register("bp_loss_remaining")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Part B: Computation of income from speculative business
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">40. Net profit or loss from speculative business</label>
                <input type="number" {...register("bp_speculative_net_profit")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">41. Additions (sec 28 to 44DB)</label>
                <input type="number" {...register("bp_speculative_additions")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">42. Deductions (sec 28 to 44DB)</label>
                <input type="number" {...register("bp_speculative_deductions")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">43. Income from speculative business</label>
                <input type="number" {...register("bp_speculative_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Part C: Computation of income from specified business under section 35AD */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Part C: Computation of income from specified business under section 35AD
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">44. Net profit or loss from specified business</label>
                <input type="number" {...register("bp_specified_net_profit")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">45. Additions (sec 28 to 44DB)</label>
                <input type="number" {...register("bp_specified_additions")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">46. Deductions (sec 28 to 44DB)</label>
                <input type="number" {...register("bp_specified_deductions")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">47. Profit or loss from specified business</label>
                <input type="number" {...register("bp_specified_profit_loss")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">48. Deductions u/s 35AD(1)</label>
                <input type="number" {...register("bp_specified_deductions_35ad")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">49. Income from Specified Business</label>
                <input type="number" {...register("bp_specified_income")} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>
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

export default ScheduleBP;
