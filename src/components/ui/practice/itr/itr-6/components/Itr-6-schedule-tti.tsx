import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTTIProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleTTI: React.FC<ScheduleTTIProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  // Part A: Tax on Deemed Total Income
  const deemedTotalIncome = parseFloat(watch("tti_deemed_total_income") || 0) || 0;
  const taxOnDeemedTotalIncome = parseFloat(watch("tti_tax_on_deemed") || 0) || 0;

  // Part B: Surcharge and Health/Education Cess
  const surchargeOnA = parseFloat(watch("tti_surcharge_on_a") || 0) || 0;
  const hAndECessA = parseFloat(watch("tti_h_e_cess_a") || 0) || 0;
  const totalTaxOnDeemedIncome = taxOnDeemedTotalIncome + surchargeOnA + hAndECessA;

  // Part B-2: Tax payable on total income
  // Part A: Tax on total income
  const taxOnTotalIncome = parseFloat(watch("tti_tax_on_total_income") || 0) || 0;

  // Part B: Tax at special rates
  const taxSpecialRates = parseFloat(watch("tti_tax_special_rates") || 0) || 0;

  // Part C: Rebate on agricultural income
  const rebateAgriculturalIncome = parseFloat(watch("tti_rebate_agricultural_income") || 0) || 0;
  const agriculturalMaxAmount = parseFloat(watch("tti_agricultural_max_amount") || 0) || 0;

  // Part D: Tax Payable on total income
  const partDTaxPayable = Math.max(0, taxOnTotalIncome + taxSpecialRates - rebateAgriculturalIncome);

  // Part E: Surcharge (after marginal relief)
  const surchargeBeforeMarginalRelief = parseFloat(watch("tti_surcharge_before_marginal") || 0) || 0;
  const surchargeAfterMarginalRelief = parseFloat(watch("tti_surcharge_after_marginal") || 0) || 0;
  const surchargeComputed = surchargeAfterMarginalRelief || surchargeBeforeMarginalRelief;

  // Part F: Surcharge Computation
  const surcharge65OfScheduleSI = parseFloat(watch("tti_surcharge_65_si") || 0) || 0;
  const surcharge10Or15Percent = parseFloat(watch("tti_surcharge_10_15") || 0) || 0;
  const surchargeNoteBeforeMarginal = parseFloat(watch("tti_surcharge_note_before_marginal") || 0) || 0;

  // Total Before Marginal Relief
  const surchargeBeforeMarginalRelief2 = surcharge65OfScheduleSI + surcharge10Or15Percent;

  // Health and Education Cess
  const healthEducationCess = parseFloat(watch("tti_health_education_cess") || 0) || 0;

  // Rebate u/s 87A
  const rebate87A = parseFloat(watch("tti_rebate_87a") || 0) || 0;

  // Gross Tax Liability
  const grossTaxLiability = Math.max(
    0,
    partDTaxPayable + surchargeComputed + healthEducationCess - rebate87A
  );

  // Credit for tax paid
  const creditAdvanceTax = parseFloat(watch("tti_credit_advance_tax") || 0) || 0;
  const creditTDS = parseFloat(watch("tti_credit_tds") || 0) || 0;
  const creditTCS = parseFloat(watch("tti_credit_tcs") || 0) || 0;
  const creditSelfAssessmentTax = parseFloat(watch("tti_credit_self_assessment_tax") || 0) || 0;
  const totalTaxesPaid = creditAdvanceTax + creditTDS + creditTCS + creditSelfAssessmentTax;

  // Amount payable
  const amountPayable = Math.max(0, grossTaxLiability - totalTaxesPaid);

  // Tax Relief
  const relief90A = parseFloat(watch("tti_relief_90a") || 0) || 0;
  const relief91 = parseFloat(watch("tti_relief_91") || 0) || 0;
  const totalTaxRelief = relief90A + relief91;

  // Bank Account Information
  const bankAccountYesNo = watch("tti_bank_account_yes_no");
  const previousYearBankBalance = watch("tti_previous_year_bank_balance");
  const bankName1 = watch("tti_bank_name_1");
  const accountNumber1 = watch("tti_account_number_1");
  const accountType1 = watch("tti_account_type_1");
  const refundCreditChoice1 = watch("tti_refund_credit_choice_1");
  const bankName2 = watch("tti_bank_name_2");
  const accountNumber2 = watch("tti_account_number_2");
  const accountType2 = watch("tti_account_type_2");
  const refundCreditChoice2 = watch("tti_refund_credit_choice_2");

  // Foreign Assets Declaration
  const foreignAssetsYesNo = watch("tti_foreign_assets_yes_no");
  const foreignAssetsDetails = watch("tti_foreign_assets_details");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Part B-TTI: Computation of Tax Liability on Total Income
          </h1>
          <p className="text-indigo-700">
            Complete tax computation including surcharge, cess, rebates, tax relief, and payment details
          </p>
        </div>

        {/* Part A: Tax on Deemed Total Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-indigo-500">
          <h2 className="text-lg font-bold text-indigo-800 mb-4">Part A: Tax on Deemed Total Income u/s 115JC</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deemed Total Income (₹)
              </label>
              <div className="w-full px-4 py-2 bg-indigo-50 border border-indigo-300 rounded-lg text-lg font-bold text-indigo-700">
                ₹ {deemedTotalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1a. Tax Payable on Deemed Total Income (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("tti_tax_on_deemed")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
              />
            </div>
          </div>
        </div>

        {/* Part B: Surcharge and Health/Education Cess on Deemed Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-purple-500">
          <h2 className="text-lg font-bold text-purple-800 mb-4">Part B: Surcharge & Cess on Deemed Income</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1b. Surcharge on (a) above (if applicable) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_surcharge_on_a")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1c. Health and Education Cess @ 4% on 1a + 1b above (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_h_e_cess_a")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right" />
            </div>
            <div className="bg-purple-100 rounded-lg p-3 flex flex-col justify-center">
              <p className="text-xs text-gray-700">1d. Total Tax on Deemed Income:</p>
              <p className="text-lg font-bold text-purple-700">₹ {totalTaxOnDeemedIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Part 2: Tax Payable on Total Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500">
          <h2 className="text-lg font-bold text-blue-800 mb-4">Part 2: Tax Payable on Total Income</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2a. Tax on Total Income (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_tax_on_total_income")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2b. Tax at special rates (total of (i), (ii) of Schedule SI) (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_tax_special_rates")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2c. Rebate on agricultural income (applicable if (13) of Part II is exceeds maximum amount) (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_rebate_agricultural_income")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Max Amount
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_agricultural_max_amount")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right text-xs" />
            </div>
          </div>

          <div className="bg-blue-100 rounded-lg p-4 mt-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">2d. Tax Payable on Total Income (2a+2b-2c):</span>
            <span className="text-lg font-bold text-blue-700">₹ {partDTaxPayable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Part E & F: Surcharge Computation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-cyan-500">
          <h2 className="text-lg font-bold text-cyan-800 mb-4">Part E & F: Surcharge Computation</h2>
          
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Part E - Surcharge (after marginal relief):</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Surcharge Computed Before Marginal Relief (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_surcharge_before_marginal")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Surcharge After Marginal Relief (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_surcharge_after_marginal")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right text-xs" />
              </div>
              <div className="bg-cyan-100 rounded p-2 flex items-center">
                <span className="text-xs text-gray-700">Surcharge:</span>
                <span className="text-sm font-bold text-cyan-700 ml-2">₹ {surchargeComputed.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Part F - Surcharge Calculation:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  i. 65% of 17(iii) of Schedule SI (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_surcharge_65_si")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ii. 10% or 15 %, as applicable (₹)
                </label>
                <input type="number" placeholder="0" step="0.01" {...register("tti_surcharge_10_15")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right text-xs" />
              </div>
              <div className="bg-cyan-50 rounded p-2 flex items-center">
                <span className="text-xs text-gray-700">Total (before marginal relief):</span>
                {surchargeNoteBeforeMarginal > 0 ? (
                  <span className="text-sm font-bold text-cyan-600 ml-2">₹ {surchargeNoteBeforeMarginal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                ) : (
                  <span className="text-sm font-bold text-cyan-600 ml-2">Calculated above</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Health & Education Cess and Rebate */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-teal-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                3. Health and Education Cess @ 4% on (2d + Surcharge) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_health_education_cess")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                4. Gross tax liability (2d + Surcharge + 3)
              </label>
              <div className="bg-teal-100 rounded-lg p-3 flex items-center">
                <span className="text-lg font-bold text-teal-700">₹ {grossTaxLiability.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              5. Rebate u/s 87A (if applicable) (₹)
            </label>
            <input type="number" placeholder="0" step="0.01" {...register("tti_rebate_87a")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-right" />
          </div>
        </div>

        {/* Tax Paid & Relief */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-green-500">
          <h2 className="text-lg font-bold text-green-800 mb-4">Tax Relief and Credit for Taxes Paid</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                10a. Advance Tax (from Column 5 of ITR-1) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_credit_advance_tax")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                10b. TDS (total of column 9 of ISB) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_credit_tds")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                10c. TCS (total of column 7 of TCS) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_credit_tcs")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                10d. Self Assessment Tax (from column 5 of ISA) (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_credit_self_assessment_tax")} className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right text-xs" />
            </div>
          </div>

          <div className="bg-green-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">10e. Total Taxes Paid (10a+10b+10c+10d):</span>
              <span className="text-lg font-bold text-green-700">₹ {totalTaxesPaid.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-sm text-gray-700">11. Amount Payable (if 4 is greater than 10e) / Refund (if 10e is greater than 4):</span>
              <span className={amountPayable >= 0 ? "text-green-700" : "text-red-700"}>
                ₹ {Math.abs(amountPayable).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                6a. Section 90/90A (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_relief_90a")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                6b. Section 91 (₹)
              </label>
              <input type="number" placeholder="0" step="0.01" {...register("tti_relief_91")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 mt-3 flex justify-between items-center">
            <span className="text-sm text-gray-700">Total Tax Relief (6a + 6b):</span>
            <span className="text-sm font-bold text-green-600">₹ {totalTaxRelief.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Bank Account Summary */}
        {bankAccountYesNo === "yes" && (bankName1 || bankName2) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-300">
            <h3 className="text-sm font-bold text-orange-800 mb-3">Bank Accounts Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {bankName1 && (
                <div className="p-2 bg-orange-50 rounded border border-orange-200">
                  <p><span className="font-semibold text-orange-700">Account 1:</span> {bankName1}</p>
                  <p><span className="font-semibold text-orange-700">Number:</span> {accountNumber1}</p>
                  <p><span className="font-semibold text-orange-700">Type:</span> {accountType1}</p>
                  {refundCreditChoice1 && <p className="text-orange-600">✓ Selected for refund/credit</p>}
                </div>
              )}
              {bankName2 && (
                <div className="p-2 bg-orange-50 rounded border border-orange-200">
                  <p><span className="font-semibold text-orange-700">Account 2:</span> {bankName2}</p>
                  <p><span className="font-semibold text-orange-700">Number:</span> {accountNumber2}</p>
                  <p><span className="font-semibold text-orange-700">Type:</span> {accountType2}</p>
                  {refundCreditChoice2 && <p className="text-orange-600">✓ Selected for refund/credit</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bank Account Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-orange-500">
          <h2 className="text-lg font-bold text-orange-800 mb-4">Bank Account Information</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Do you have a bank account in India? (Non-Residents claiming refund with no bank account in India may select No)
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" value="yes" {...register("tti_bank_account_yes_no")} className="w-4 h-4" />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="no" {...register("tti_bank_account_yes_no")} className="w-4 h-4" />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>

          {bankAccountYesNo === "yes" && (
            <div className="mb-4 p-4 bg-orange-50 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Details of all Bank Accounts held in India at any time during the previous year (excluding dormant accounts)
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Note: If accounts are selected, the refund will be credited to one of the validated accounts. If no account is selected, select at least one account below.
                </p>
              </div>

              {/* Account 1 */}
              <div className="border-l-4 border-orange-400 bg-white p-3 mb-3 rounded">
                <h3 className="text-sm font-bold text-orange-700 mb-3">Account 1</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
                      <input type="text" placeholder="Name of the Bank" {...register("tti_bank_name_1")} className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Account Number</label>
                      <input type="text" placeholder="Account Number" {...register("tti_account_number_1")} className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Account Type</label>
                      <select {...register("tti_account_type_1")} className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                        <option value="">Select</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Refund/Credit Choice</label>
                      <input type="checkbox" {...register("tti_refund_credit_choice_1")} className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account 2 */}
              <div className="border-l-4 border-orange-400 bg-white p-3 rounded">
                <h3 className="text-sm font-bold text-orange-700 mb-3">Account 2</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
                      <input type="text" placeholder="Name of the Bank" {...register("tti_bank_name_2")} className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Account Number</label>
                      <input type="text" placeholder="Account Number" {...register("tti_account_number_2")} className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Account Type</label>
                      <select {...register("tti_account_type_2")} className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                        <option value="">Select</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Refund/Credit Choice</label>
                      <input type="checkbox" {...register("tti_refund_credit_choice_2")} className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Details of Bank Accounts held in India at any time during previous year (excluding dormant accounts)
            </label>
            <input type="text" placeholder="Held at bank..." {...register("tti_previous_year_bank_balance")} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
        </div>

        {/* Foreign Assets Declaration */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-rose-500">
          <h2 className="text-lg font-bold text-rose-800 mb-4">Foreign Assets Declaration</h2>
          
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Do you have a bank account in India (Non-Residents claiming refund with no bank account in India may select No) [Applicable only in case of a resident] (Ensure Schedule FA is filled up if the answer is Yes)
          </label>
          
          <div className="flex gap-6 mb-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="yes" {...register("tti_foreign_assets_yes_no")} className="w-4 h-4" />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="no" {...register("tti_foreign_assets_yes_no")} className="w-4 h-4" />
              <span className="text-sm">No</span>
            </label>
          </div>

          {foreignAssetsYesNo === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Details of Foreign Assets
              </label>
              <textarea
                rows={4}
                placeholder="Provide details of foreign assets..."
                {...register("tti_foreign_assets_details")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
              />
              {foreignAssetsDetails && (
                <div className="mt-2 p-3 bg-rose-50 rounded text-xs text-rose-700 border border-rose-200 max-h-32 overflow-y-auto">
                  <p className="font-semibold">Recorded:</p>
                  <p className="whitespace-pre-wrap">{foreignAssetsDetails}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTTI;
