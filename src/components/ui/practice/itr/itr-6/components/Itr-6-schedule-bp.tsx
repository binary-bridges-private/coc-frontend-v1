import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleBPProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleBP: React.FC<ScheduleBPProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const {
    register: registerBase,
    handleSubmit,
    formState: { errors: errorsBase, isSubmitting },
    watch,
  } = form;

  const register = registerBase as any;
  const errors = errorsBase as any;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Schedule BP
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Computation of Income from Business or Profession
          </h2>
          <p className="text-sm text-gray-600">
            Details of income from business or profession (Please refer instructions)
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to summary
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {(() => {
          const relevantErrors = Object.entries(errors).filter(([fieldName]) => {
            return true;
          });

          if (relevantErrors.length === 0) return null;

          return (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-red-900">
                    ⚠️ Please fix the following errors (
                    {relevantErrors.length} field
                    {relevantErrors.length > 1 ? "s" : ""})
                  </h3>
                  <ul className="space-y-1 text-sm text-red-800">
                    {relevantErrors.map(([fieldName, error]: [string, any]) => {
                      const message = error?.message || "This field is required";
                      return (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">
                              {fieldName
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                              :
                            </strong>{" "}
                            {message}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Part A - Income from Business/Profession */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Part A: Income from Business or Profession
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A1. Profit before tax as per profit and loss account (Item 54, 6(2d), 6(3d), 6(4)(iv), 6(5)(iii) & item 9, P&L)
              </h4>
              <InputField
                label="A1. Profit before tax"
                name="profitBeforeTax"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.profitBeforeTax?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A2. Add: profit or loss from sources included in 1 (other -ve sign in case of Trading in FIIs, -ve sign in case of loss)
              </h4>
              <InputField
                label="A2. Adjustments for profits/losses"
                name="adjustmentProfitLoss"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.adjustmentProfitLoss?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A3. Add: Net profit or Loss from Specified Business u/s 35AD (included in 1) (Enter -ve sign in case of loss)
              </h4>
              <InputField
                label="A3. Net profit/loss from Specified Business"
                name="specifiedBusinessProfit"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.specifiedBusinessProfit?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A4. Income receipts credited to profit and loss account considered under other heads of income or chargeable u/s 115BBD or chargeable u/s 115BBDH or chargeable u/s 115BBDH
              </h4>
              <div className="space-y-2">
                <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                  <InputField
                    label="i. Dividend"
                    name="incomeReceipt_dividend"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.incomeReceipt_dividend?.message}
                  />
                  <InputField
                    label="ii. Other than dividend"
                    name="incomeReceipt_otherDividend"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.incomeReceipt_otherDividend?.message}
                  />
                  <InputField
                    label="iii. u/s 115BBDH (sec of Compute)"
                    name="incomeReceipt_115BBDH"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.incomeReceipt_115BBDH?.message}
                  />
                  <InputField
                    label="iv. u/s 115BBDH"
                    name="incomeReceipt_115BBDHsec"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.incomeReceipt_115BBDHsec?.message}
                  />
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    Total A4 income receipts =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        [
                          "incomeReceipt_dividend",
                          "incomeReceipt_otherDividend",
                          "incomeReceipt_115BBDH",
                          "incomeReceipt_115BBDHsec",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. Profit or loss included in 1, which is referred to in section 44AD/44ADA/44AE/44B/44BB/44BBA/44BBC/44DA (If such schedule of income tax Act/further than profit from life insurance business or deemed to be provided)
              </h4>
              <InputField
                label="B. Profit or loss for special schemes"
                name="specialSchemeProfit"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.specialSchemeProfit?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                C. Profit and gains from life insurance business referred to in section 115B
              </h4>
              <InputField
                label="C. Life insurance business profit"
                name="lifeInsuranceProfit"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.lifeInsuranceProfit?.message}
              />
            </div>
          </div>
        </div>

        {/* Part B - Income from Activities Covered under Rule 7, 7A, 7B(1) */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Part B: Income from Activities Covered under Rule 7, 7A, 7B(1), 7B(1A) and 8
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1a. Income credited to profit and loss account (included in 1) which is exempt
              </h4>
              <InputField
                label="1a. Exempt income"
                name="exemptIncome"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.exemptIncome?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1b. Share of income from AOP/BOI
              </h4>
              <InputField
                label="1b. Share of income from AOP/BOI"
                name="shareIncomeAOP"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.shareIncomeAOP?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1c. Share of income from AOP/BOI (specify nature and amount)
              </h4>
              <InputField
                label="1c. Share of income (specified)"
                name="shareIncomeAOPSpecified"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.shareIncomeAOPSpecified?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1d. Total (c1 + c1i)
              </h4>
              <div className="rounded-md bg-blue-50 p-2 text-sm font-medium text-gray-800">
                Total =
                <span className="ml-2 font-semibold text-blue-600">
                  {calculateTotal(
                    ["shareIncomeAOP", "shareIncomeAOPSpecified"],
                    watch
                  )}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1e. Total exempt income (1a + 1b + 1c)
              </h4>
              <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                Total exempt =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    ["exemptIncome", "shareIncomeAOP", "shareIncomeAOPSpecified"],
                    watch
                  )}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                2. Expenses debited to profit and loss account under other heads of income considered chargeable u/s 115BBD or u/s 115BBDH
              </h4>
              <div className="space-y-2">
                <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                  <InputField
                    label="i. Property"
                    name="expenses_property"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.expenses_property?.message}
                  />
                  <InputField
                    label="ii. Capital gains"
                    name="expenses_capitalGains"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.expenses_capitalGains?.message}
                  />
                  <InputField
                    label="iii. Other"
                    name="expenses_other"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.expenses_other?.message}
                  />
                  <InputField
                    label="iv. u/s 115BBDH"
                    name="expenses_115BBDH"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.expenses_115BBDH?.message}
                  />
                  <InputField
                    label="v. u/s 115BBDH"
                    name="expenses_115BBDHsec"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.expenses_115BBDHsec?.message}
                  />
                  <InputField
                    label="vi. Other than (iv+v)"
                    name="expenses_other115BBDH"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.expenses_other115BBDH?.message}
                  />
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    Total expenses =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        [
                          "expenses_property",
                          "expenses_capitalGains",
                          "expenses_other",
                          "expenses_115BBDH",
                          "expenses_115BBDHsec",
                          "expenses_other115BBDH",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                3. Expenses debited to profit and loss account which relate to exempt income
              </h4>
              <InputField
                label="3. Expenses relating to exempt income"
                name="expensesExemptIncome"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.expensesExemptIncome?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                4. Expenses debited to profit and loss account which relate to exempt income and disallowed u/s 14A (16 of Part A-OI)
              </h4>
              <InputField
                label="4. Expenses disallowed under section 14A"
                name="expensesDisallowed14A"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.expensesDisallowed14A?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                5. Total (7a + 7b + 7c + 7d + 7e + 7e + 8av + 8ax + 8ay) [Items No. 27-20+30+31+32]
              </h4>
              <div className="rounded-md bg-yellow-50 p-2 text-sm font-medium text-gray-800">
                Total =
                <span className="ml-2 font-semibold text-yellow-600">
                  {calculateTotal(
                    [
                      "expensesExemptIncome",
                      "expensesDisallowed14A",
                    ],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part C - Deductions under Section 37 */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Part C: Deductions & Adjustments
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                20. Increase in profit or decrease in loss on account of ICDS adjustments and deviation in method of valuation of stock (Columns 3a + 4d of Part A-OI)
              </h4>
              <InputField
                label="20. ICDS adjustments"
                name="icdsAdjustments"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.icdsAdjustments?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                21. Total (14 + 15 + 16 + 17 + 18 + 19 + 20 – 21 = 22 - 23 - 24 + 25)
              </h4>
              <div className="rounded-md bg-blue-50 p-2 text-sm font-medium text-gray-800">
                Total =
                <span className="ml-2 font-semibold text-blue-600">
                  {watch("icdsAdjustments") || 0}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                22. Deduction under section 35 (CCC or section 35 CCVD) or HCCG or section 35 CCVD (amount deducted under section 35 or 35CCC or 35CCVD in the previous year deducted in P&L account, it will go to line 23)
              </h4>
              <InputField
                label="22. Deduction under section 35"
                name="deductionSection35"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionSection35?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                23. Any other item of additions under section 28 to 44DB
              </h4>
              <InputField
                label="23. Other additions"
                name="otherAdditions"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.otherAdditions?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                24. Deemed income under section 41
              </h4>
              <InputField
                label="24. Deemed income under section 41"
                name="deemedIncomeSection41"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deemedIncomeSection41?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                25. Amount of deduction under section 35 CCCC or section 35CCVD or section 35 CCVD (Item No. A of Schedule CCVD)
              </h4>
              <InputField
                label="25. Deduction under sections 35CCCC/35CCVD"
                name="deductionSection35CCVD"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionSection35CCVD?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                26. Any amount disallowed under section 36 (Item of Schedule CCVD if amount disallowable under section 35 or 35CCC or 35CCVD in the same amount deferred in P&L account, it will go to Line 23)
              </h4>
              <InputField
                label="26. Deduction under section 36"
                name="deductionSection36"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionSection36?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                27. Deductions in accordance with section 28 to 44DB
              </h4>
              <InputField
                label="27. Total deductions"
                name="totalDeductions"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.totalDeductions?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                28. Deductions in accordance with section 28 to 44DB (other than deduction under section 35AD and section 35 CCVD) (Item no 10 of income 10(2) which covers the specified business, do be included from line 2)
              </h4>
              <InputField
                label="28. Deductions (other than 35AD/35CCVD)"
                name="deductionsOther"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionsOther?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                29. Computation of income from specified business under section 35AD
              </h4>
              <InputField
                label="29. Specified business computation"
                name="specifiedBusinessComputation"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.specifiedBusinessComputation?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                30. Net profit or loss from specified business as per profit or loss account
              </h4>
              <InputField
                label="30. Net profit/loss from specified business"
                name="netProfitSpecifiedBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.netProfitSpecifiedBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                31. Additions in accordance with section 28 to 44DB
              </h4>
              <InputField
                label="31. Additions to specified business"
                name="additionsSpecifiedBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.additionsSpecifiedBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                32. Deductions in accordance with section 35AD(1)
              </h4>
              <InputField
                label="32. Deductions under section 35AD(1)"
                name="deductionsSection35AD"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionsSection35AD?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                33. Income from Specified Business (48 + 47 - from applying Rule 7, 7A, 7B(1), 7B(1A) and Rule 8 for the purpose of aggregation of income as per Finance Act 2016) (Item 17A)
              </h4>
              <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                Income from Specified Business =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    ["netProfitSpecifiedBusiness", "additionsSpecifiedBusiness"],
                    watch
                  ) - (parseFloat(watch("deductionsSection35AD") || 0))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part D - Final Computation */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Part D: Final Computation
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                34. Deemed income under section 41
              </h4>
              <InputField
                label="34. Deemed income"
                name="finalDeemedIncome"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.finalDeemedIncome?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                35. Profits and gains of business or profession deemed to be under section
              </h4>
              <div className="space-y-2">
                <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                  <InputField
                    label="i. Section 44AD (83(i) of schedule)"
                    name="deemedUnder_44AD"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44AD?.message}
                  />
                  <InputField
                    label="ii. Section 44ADA (83(ii) of schedule)"
                    name="deemedUnder_44ADA"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44ADA?.message}
                  />
                  <InputField
                    label="iii. Section 44AE (84(iv) of schedule)"
                    name="deemedUnder_44AE"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44AE?.message}
                  />
                  <InputField
                    label="iv. Section 44B"
                    name="deemedUnder_44B"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44B?.message}
                  />
                  <InputField
                    label="v. Section 44BB"
                    name="deemedUnder_44BB"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44BB?.message}
                  />
                  <InputField
                    label="vi. Section 44BBA"
                    name="deemedUnder_44BBA"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44BBA?.message}
                  />
                  <InputField
                    label="vii. Section 44BBC"
                    name="deemedUnder_44BBC"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44BBC?.message}
                  />
                  <InputField
                    label="viii. Section 44BDA"
                    name="deemedUnder_44BDA"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedUnder_44BDA?.message}
                  />
                  <InputField
                    label="ix. First Schedule of Income-tax Act (other than in section 8)"
                    name="deemedFirstSchedule"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.deemedFirstSchedule?.message}
                  />
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    Total (35i to 35viii) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        [
                          "deemedUnder_44AD",
                          "deemedUnder_44ADA",
                          "deemedUnder_44AE",
                          "deemedUnder_44B",
                          "deemedUnder_44BB",
                          "deemedUnder_44BBA",
                          "deemedUnder_44BBC",
                          "deemedUnder_44BDA",
                          "deemedFirstSchedule",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                36. Profits and gains of business or profession other than speculative and specified business
              </h4>
              <InputField
                label="36. Profits/gains (other than speculative/specified)"
                name="profitsOtherBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.profitsOtherBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                37. Not Profit or loss from business or profession other than speculative business and specified business after applying rule 7, 7A if applicable; other same figure as on 8(i) if loss; the figure is 2 of item 37=37a - 37b +
              </h4>
              <InputField
                label="37. Net profit/loss (other than speculative/specified)"
                name="netProfitOtherBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.netProfitOtherBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                38. Income chargeable under Rule 7
              </h4>
              <InputField
                label="38. Income under Rule 7"
                name="incomeUnderRule7"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.incomeUnderRule7?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                39. Net profit or loss from speculative business as per profit or loss account
              </h4>
              <InputField
                label="39. Net profit/loss from speculative business"
                name="netProfitSpeculativeBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.netProfitSpeculativeBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                40. Additions in accordance with section 28 to 44DB
              </h4>
              <InputField
                label="40. Additions to speculative business"
                name="additionsSpeculativeBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.additionsSpeculativeBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                41. Deductions in accordance with section 28 to 44DB
              </h4>
              <InputField
                label="41. Deductions from speculative business"
                name="deductionsSpeculativeBusiness"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionsSpeculativeBusiness?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                42. Income from speculative business (39 + 40 - 41)
              </h4>
              <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                Income from speculative =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    ["netProfitSpeculativeBusiness", "additionsSpeculativeBusiness"],
                    watch
                  ) - (parseFloat(watch("deductionsSpeculativeBusiness") || 0))}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                43. Balance (Loss) if any (Item No. i = 6)
              </h4>
              <InputField
                label="43. Loss balance"
                name="lossBalance"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.lossBalance?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Income chargeable under the head "Profits and gains from business or profession" (Item 18B cat all+ 34)
              </h4>
              <div className="rounded-md bg-yellow-50 p-2 text-sm font-medium text-gray-800">
                Total Income chargeable =
                <span className="ml-2 font-semibold text-yellow-600">
                  {calculateTotal(
                    ["netProfitOtherBusiness", "finalDeemedIncome"],
                    watch
                  )}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Intra-head set off of business loss of current year
              </h4>
              <InputField
                label="E. Intra-head set off"
                name="intraHeadSetOff"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.intraHeadSetOff?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Type of Business Income / Speculative / Loss set off in this row (only if figure in column (2) is Loss or Speculative Income)
              </h4>
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    <div className="font-semibold">(1)</div>
                    Loss to be set off (if) this row only if figure in
                  </div>
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    <div className="font-semibold">(2)</div>
                    Income from speculative business (C48)
                  </div>
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    <div className="font-semibold">(3) = (1) - (2)</div>
                    Business Loss set off
                  </div>
                </div>

                <div className="space-y-2">
                  <InputField
                    label="i. Loss to be set off (if) this row only if figure in"
                    name="lossToBeSetOff"
                    type="number"
                    placeholder="Amount (A37)"
                    register={register}
                    error={errors.lossToBeSetOff?.message}
                  />
                  <InputField
                    label="ii. Income from speculative business (C48)"
                    name="incomeSpeculativeSetOff"
                    type="number"
                    placeholder="Amount (C48)"
                    register={register}
                    error={errors.incomeSpeculativeSetOff?.message}
                  />
                  <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                    iii. Business Loss set off (i - ii) =
                    <span className="ml-2 font-semibold text-green-600">
                      {Math.max(0, (parseFloat(watch("lossToBeSetOff") || 0) - parseFloat(watch("incomeSpeculativeSetOff") || 0)))}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <InputField
                    label="iv. Income from life insurance business (C49)"
                    name="incomeLifeInsuranceSetOff"
                    type="number"
                    placeholder="Amount (C49)"
                    register={register}
                    error={errors.incomeLifeInsuranceSetOff?.message}
                  />
                  <div className="rounded-md bg-blue-50 p-2 text-sm font-medium text-gray-800">
                    Total loss set off (iii + iv - v) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {Math.max(0, (parseFloat(watch("lossToBeSetOff") || 0) - parseFloat(watch("incomeSpeculativeSetOff") || 0) + parseFloat(watch("incomeLifeInsuranceSetOff") || 0)))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part E - Deductions under Section 37 and Deemed Income */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Part E: Deductions & Deemed Income Details
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                44. Additions in accordance with section 28 to 44DB
              </h4>
              <InputField
                label="44. Total additions"
                name="totalAdditions44"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.totalAdditions44?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                45. Deductions in accordance with section 28 to 44DB
              </h4>
              <InputField
                label="45. Total deductions"
                name="totalDeductions45"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.totalDeductions45?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                46. Profit or loss included in 1, which is referred to in section 44AD/44ADA/44AE/44B/44BB/44BBA/44BBC/44DA (If such schedule of income tax Act/further than profit from life insurance business or deemed to be provided)
              </h4>
              <InputField
                label="46. Profit/loss under special schemes"
                name="profitLossSpecialScheme46"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.profitLossSpecialScheme46?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                47. Net profit or loss from business or profession other than speculative business (Section 73: -36 + 37a - 37b)
              </h4>
              <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                Net profit/loss (other than speculative) =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(["netProfitOtherBusiness"], watch) - (parseFloat(watch("deductionsSpeculativeBusiness") || 0))}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                48. Income from speculative business as per profit or loss account
              </h4>
              <InputField
                label="48. Speculative business income"
                name="speculativeBusinessIncome48"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.speculativeBusinessIncome48?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                49. Income from life insurance business as per profit or loss account
              </h4>
              <InputField
                label="49. Life insurance business income"
                name="lifeInsuranceBusinessIncome49"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.lifeInsuranceBusinessIncome49?.message}
              />
            </div>
          </div>
        </div>

        {/* Part F - Deductions & Relief Adjustments */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Part F: Deductions & Relief Adjustments
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                50. Deductions in accordance with section 28 to 44DB (other than deduction under section 35AD and section 35CCVD) (Item no 10 of income 10(2) which covers the specified business, do be included from line 2)
              </h4>
              <InputField
                label="50. Deductions (excl. section 35AD/35CCVD)"
                name="deductionsExcl35AD"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionsExcl35AD?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                51. Deductions in accordance with section 35AD(1)
              </h4>
              <InputField
                label="51. Deductions under section 35AD(1)"
                name="deductionsUnder35AD1"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionsUnder35AD1?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                52. Income chargeable under the head "Profits and gains from business or profession" (Item 18B cat all+ 34)
              </h4>
              <div className="rounded-md bg-yellow-50 p-2 text-sm font-medium text-gray-800">
                Total income chargeable =
                <span className="ml-2 font-semibold text-yellow-600">
                  {calculateTotal(
                    ["netProfitOtherBusiness", "finalDeemedIncome", "speculativeBusinessIncome48"],
                    watch
                  )}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                53. Decrease in profit or decrease in loss on account of ICDS adjustments and deviation in method of valuation of stock (Columns 3a + 4d of Part A-OI)
              </h4>
              <InputField
                label="53. Decrease in profit/loss (ICDS)"
                name="decreaseProfitICDS"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.decreaseProfitICDS?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                54. Total (14 + 15 + 16 + 17 + 18 + 19 + 20 – 21 = 22 - 23 - 24 + 25)
              </h4>
              <div className="rounded-md bg-blue-50 p-2 text-sm font-medium text-gray-800">
                Total adjustments =
                <span className="ml-2 font-semibold text-blue-600">
                  {calculateTotal(
                    ["totalAdditions44", "decreaseProfitICDS"],
                    watch
                  ) - (parseFloat(watch("totalDeductions45") || 0))}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                55. Deduction under section 35 (CCC or section 35 CCVD) or HCCG or section 35 CCVD (amount deducted under section 35 or 35CCC or 35CCVD in the previous year deducted in P&L account, it will go to line 23)
              </h4>
              <InputField
                label="55. Deduction under section 35"
                name="deductionUnderSection35"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionUnderSection35?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                56. Any other item of additions under section 28 to 44DB
              </h4>
              <InputField
                label="56. Other additions"
                name="otherAdditions56"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.otherAdditions56?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                57. Deemed income under section 41
              </h4>
              <InputField
                label="57. Deemed income"
                name="deemedIncomeSection41Final"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deemedIncomeSection41Final?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                58. Amount of deduction under section 35CCCC or section 35CCVD or section 35CCVD (Item No. A of Schedule CCVD)
              </h4>
              <InputField
                label="58. Deduction under sections 35CCCC/35CCVD"
                name="deductionUnderSection35CCVD58"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionUnderSection35CCVD58?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                59. Any amount disallowed under section 36 (Item of Schedule CCVD if amount disallowable under section 35 or 35CCC or 35CCVD in the same amount deferred in P&L account, it will go to Line 23)
              </h4>
              <InputField
                label="59. Deduction under section 36"
                name="deductionUnderSection36"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deductionUnderSection36?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                60. Adjusted profit or loss (60-B)
              </h4>
              <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                Adjusted profit/loss =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    ["speculativeBusinessIncome48", "lifeInsuranceBusinessIncome49"],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </section>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  placeholder,
  type = "text",
  maxLength,
  helperText,
}) => {
  if (!label) {
    return (
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name as any)}
      />
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name as any)}
      />
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

// Helper function to calculate totals
function calculateTotal(fieldNames: string[], watch: any): number {
  return fieldNames.reduce((sum, fieldName) => {
    const value = parseFloat(watch(fieldName) || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
}

export default ScheduleBP;
