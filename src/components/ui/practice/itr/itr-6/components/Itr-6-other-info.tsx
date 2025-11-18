import React from "react";
import { UseFormReturn } from "react-hook-form";

interface OtherInfoProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const OtherInfo: React.FC<OtherInfoProps> = ({
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
            Part A - Other Information
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Other Information & Deductions
          </h2>
          <p className="text-sm text-gray-600">
            Additional information for ITR-6 filing
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

        {/* Accounting Methods Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            1. Accounting Methods & Changes
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Method of accounting followed
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("methodOfAccounting")}
                      value="cash"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Cash Method</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("methodOfAccounting")}
                      value="accrual"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Accrual Method</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Is there any change in method of accounting?
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("changeInAccounting")}
                      value="yes"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("changeInAccounting")}
                      value="no"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Increase in the profit or decrease in the business of business - ITR-1
              </h4>
              <InputField
                label="Amount of increase/decrease"
                name="increaseDecreaseAmount"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.increaseDecreaseAmount?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Income Computation Disclosure Standards unlifted under section 143(i) (column 3(a) of the Annexure I(3))
              </h4>
              <InputField
                label="ICDS amount"
                name="icdsAmount"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.icdsAmount?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Decrease in profit or increase in loss or increase in profit or decrease in loss because of deviation, if any, as per Income Computation Disclosure Standards unlifted under section 114(5) (column 3(b) of Schedule IIC(3))
              </h4>
              <InputField
                label="Deviation amount"
                name="deviationAmount"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.deviationAmount?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Method of valuation of closing stock employed in the previous year
              </h4>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("stockValuationMethod")}
                      value="fifo"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                      FIFO (First In First Out)
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("stockValuationMethod")}
                      value="lifo"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                      LIFO (Last In First Out)
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("stockValuationMethod")}
                      value="weighted"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">
                      Weighted Average Cost
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("stockValuationMethod")}
                      value="other"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Other</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Valuation Changes */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            2. Stock Valuation Changes
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Is there any change in stock valuation method?
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("changeInStockValuation")}
                      value="yes"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register("changeInStockValuation")}
                      value="no"
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Increase in the profit or decrease in the loss because of change in method of valuation specified under section 145 A
              </h4>
              <InputField
                label="Amount"
                name="stockValuationImpact"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.stockValuationImpact?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Decrease in the profit or increase in loss because of Deviation, if any, from the method of valuation specified under section 145 A
              </h4>
              <InputField
                label="Amount"
                name="valuationDeviationImpact"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.valuationDeviationImpact?.message}
              />
            </div>
          </div>
        </div>

        {/* Amounts Not Credited */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            3. Amounts Not Credited to Profit & Loss Account
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. The items falling within the scope of section 28
              </h4>
              <InputField
                label="Amount"
                name="section28Items"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.section28Items?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. The preference credits, drawbacks, refund of duty of customs or excise or service tax refund or sales tax or value added tax, or refund of GST, where such credits, drawbacks or refunds are not adjusted in the profit and loss account concerned
              </h4>
              <InputField
                label="Amount"
                name="taxCredits"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.taxCredits?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                C. Valuation claims accepted during the previous year
              </h4>
              <InputField
                label="Amount"
                name="valuationClaims"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.valuationClaims?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Any other item of income
              </h4>
              <InputField
                label="Amount"
                name="otherIncomeItems"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.otherIncomeItems?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Capital receipt, if any
              </h4>
              <InputField
                label="Amount"
                name="capitalReceipt"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.capitalReceipt?.message}
              />
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm font-medium text-gray-800">
              F. Total of amounts not credited (G + H + I + J + K + L + M + N + O + P) =
              <span className="ml-2 font-semibold text-blue-600">
                {calculateTotal(
                  [
                    "section28Items",
                    "taxCredits",
                    "valuationClaims",
                    "otherIncomeItems",
                    "capitalReceipt",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section 37 Deductions */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            4. Amounts Debited to P&L (Section 37 Deductions)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. Expenditure of capital nature (s7(1))
              </h4>
              <InputField
                label="Amount"
                name="capitalExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.capitalExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. Expenditure of personal nature (s7(2))
              </h4>
              <InputField
                label="Amount"
                name="personalExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.personalExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                C. Expenditure laid out or expended wholly and exclusively NOT for the purpose of business
              </h4>
              <InputField
                label="Amount"
                name="nonBusinessExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.nonBusinessExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Expenditure in respect of any land, building, plant, machinery, structures, brochure, tract, pamphlet or the like, published by a political party
              </h4>
              <InputField
                label="Amount"
                name="politicalPartyExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.politicalPartyExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Expenditure incurred in respect on or after the date on which the notification was first issued under section 7(3) or the date for filing returns in the prescribed manner, whichever is later, in pursuance of the order for violation of any law for the time being in force
              </h4>
              <InputField
                label="Amount"
                name="violationLawExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.violationLawExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                F. Expenditure incurred for any purpose which is in offense or which is prohibited by law
              </h4>
              <InputField
                label="Amount"
                name="offenseExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.offenseExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                G. Amount of any liability of a contingent nature
              </h4>
              <InputField
                label="Amount"
                name="contingentLiability"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.contingentLiability?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                H. Any other amount not allowable under section 37
              </h4>
              <InputField
                label="Amount"
                name="otherNonAllowableAmount"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.otherNonAllowableAmount?.message}
              />
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              I. Total amount disallowable under section 37 (total of 7a to 7h) =
              <span className="ml-2 font-semibold text-green-600">
                {calculateTotal(
                  [
                    "capitalExpenditure",
                    "personalExpenditure",
                    "nonBusinessExpenditure",
                    "politicalPartyExpenditure",
                    "violationLawExpenditure",
                    "offenseExpenditure",
                    "contingentLiability",
                    "otherNonAllowableAmount",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section 43B - Tax Payments */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            5. Tax Payments Outstanding (Section 43B)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Amount of credits to profit and loss account under section 43B (total of 12a to 12i)
              </h4>
              <div className="space-y-2">
                <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                  <InputField
                    label="12a. Union Excise Duty"
                    name="unionExciseDutyPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.unionExciseDutyPay?.message}
                  />
                  <InputField
                    label="12b. Service tax"
                    name="serviceTaxPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.serviceTaxPay?.message}
                  />
                  <InputField
                    label="12c. VAT/sales tax"
                    name="vatSalesTaxPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.vatSalesTaxPay?.message}
                  />
                  <InputField
                    label="12d. CGST"
                    name="cgstPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.cgstPay?.message}
                  />
                  <InputField
                    label="12e. SGST"
                    name="sgstPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.sgstPay?.message}
                  />
                  <InputField
                    label="12f. IGST"
                    name="igstPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.igstPay?.message}
                  />
                  <InputField
                    label="12g. UTGST"
                    name="utgstPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.utgstPay?.message}
                  />
                  <InputField
                    label="12h. Any other tax"
                    name="otherTaxPay"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.otherTaxPay?.message}
                  />
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    Total amount outstanding (total of 12a to 12h) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        [
                          "unionExciseDutyPay",
                          "serviceTaxPay",
                          "vatSalesTaxPay",
                          "cgstPay",
                          "sgstPay",
                          "igstPay",
                          "utgstPay",
                          "otherTaxPay",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 43BA - Disallowances */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            5A. Amount Disallowable under Section 43BA (Items 13a to 13l)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13a. Amount of discount on a zero-coupon bond
              </h4>
              <InputField
                label="Amount"
                name="zeroCouponBondDiscount"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.zeroCouponBondDiscount?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13b. Amount of contributions to a recognized provident fund (262(2)(ii))
              </h4>
              <InputField
                label="Amount"
                name="providentFundContribution"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.providentFundContribution?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13c. Amount of contributions to an approved superannuation fund (262(2)(ii))
              </h4>
              <InputField
                label="Amount"
                name="superannuationFundContribution"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.superannuationFundContribution?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13d. Amount of contributions to an approved gratuity fund (262(2)(ii))
              </h4>
              <InputField
                label="Amount"
                name="gratuityFundContribution"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.gratuityFundContribution?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13e. Amount of contributions to any fund set up under Chapter VI A of the LIT under section 263
              </h4>
              <InputField
                label="Amount"
                name="chapter6AFund"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.chapter6AFund?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13f. Any sum received from employees as contribution to superannuation fund or any fund set up under Chapter VI A of the LIT Act or any other fund for the welfare of employees to the extent not credited to the employees account on or before the due date
              </h4>
              <InputField
                label="Amount"
                name="employeeContributionNotCredited"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.employeeContributionNotCredited?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13g. Amount of bad and doubtful debts (263(1)(i))
              </h4>
              <InputField
                label="Amount"
                name="badDoubtfulDebts"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.badDoubtfulDebts?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13h. Provision for bad and doubtful debts (262(2)(ii))
              </h4>
              <InputField
                label="Amount"
                name="provisionBadDoubtfulDebts"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.provisionBadDoubtfulDebts?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13i. Amount transferred to any special reserve
              </h4>
              <InputField
                label="Amount"
                name="specialReserveTransfer"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.specialReserveTransfer?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13j. Expenditure for the purposes of promoting family planning amongst employees (263(1)(ii))
              </h4>
              <InputField
                label="Amount"
                name="familyPlanningExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.familyPlanningExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13k. Expenditure of, on or relating to the transaction in securities if such income is not included in business income (263(1)(iii))
              </h4>
              <InputField
                label="Amount"
                name="securitiesTransactionExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.securitiesTransactionExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13l. Marked in market loss or other expected loss as computed in accordance with the ICDS, where such loss is not carried forward or set off in the current year
              </h4>
              <InputField
                label="Amount"
                name="marketLossICDS"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.marketLossICDS?.message}
              />
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              Total amount disallowable under section 43BA (total of 13a to 13l) =
              <span className="ml-2 font-semibold text-green-600">
                {calculateTotal(
                  [
                    "zeroCouponBondDiscount",
                    "providentFundContribution",
                    "superannuationFundContribution",
                    "gratuityFundContribution",
                    "chapter6AFund",
                    "employeeContributionNotCredited",
                    "badDoubtfulDebts",
                    "provisionBadDoubtfulDebts",
                    "specialReserveTransfer",
                    "familyPlanningExpenditure",
                    "securitiesTransactionExpenditure",
                    "marketLossICDS",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section 43CA - Surrogacy Expenditure */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            5B. Expenditure for Purchase of Sugarcane (Section 43CA)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                14. Expenditure for purchase of sugarcane in excess of the government approved price (262(2)(vi))
              </h4>
              <InputField
                label="Amount"
                name="sugarcaneExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.sugarcaneExpenditure?.message}
              />
            </div>
          </div>
        </div>

        {/* Other Disallowances */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            5C. Other Disallowances
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                15. Any other disallowance
              </h4>
              <InputField
                label="Amount"
                name="otherDisallowance"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.otherDisallowance?.message}
              />
            </div>
          </div>
        </div>

        {/* Employees Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            6. Employees Information
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                16. Total number of employees employed by the company - mandatory in case request for Exemption File (optional Provision Fund)
              </h4>
              <InputField
                label="Total employees"
                name="totalEmployees"
                type="number"
                placeholder="Number"
                register={register}
                error={errors.totalEmployees?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                i. Deployed outside India
              </h4>
              <InputField
                label="Number"
                name="employeesOutsideIndia"
                type="number"
                placeholder="Number"
                register={register}
                error={errors.employeesOutsideIndia?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                ii. Total
              </h4>
              <InputField
                label="Total"
                name="employeesTotal"
                type="number"
                placeholder="Number"
                register={register}
                error={errors.employeesTotal?.message}
              />
            </div>
          </div>
        </div>

        {/* Section 37 Extended */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            7. Amounts Debited under Section 37
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. Expenditure of capital nature (s7(1))
              </h4>
              <InputField
                label="Amount"
                name="s37_capitalExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_capitalExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. Expenditure of personal nature (s7(2))
              </h4>
              <InputField
                label="Amount"
                name="s37_personalExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_personalExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                C. Expenditure laid out or expended wholly and exclusively NOT for the purpose of business
              </h4>
              <InputField
                label="Amount"
                name="s37_nonBusinessExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_nonBusinessExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Expenditure in respect of any land, building, plant, machinery, structures, brochure, tract, pamphlet or the like, published by a political party
              </h4>
              <InputField
                label="Amount"
                name="s37_politicalPartyExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_politicalPartyExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Expenditure incurred in respect on or after the date on which the notification was first issued under section 7(3) or the date for filing returns in the prescribed manner, whichever is later, in pursuance of the order for violation of any law for the time being in force
              </h4>
              <InputField
                label="Amount"
                name="s37_violationLawExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_violationLawExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                F. Expenditure incurred for any purpose which is in offense or which is prohibited by law
              </h4>
              <InputField
                label="Amount"
                name="s37_offenseExpenditure"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_offenseExpenditure?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                G. Amount of any liability of a contingent nature
              </h4>
              <InputField
                label="Amount"
                name="s37_contingentLiability"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_contingentLiability?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                H. Any other amount not allowable under section 37
              </h4>
              <InputField
                label="Amount"
                name="s37_otherNonAllowableAmount"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s37_otherNonAllowableAmount?.message}
              />
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              I. Total amount disallowable under section 37 (total of 7a to 7h) =
              <span className="ml-2 font-semibold text-green-600">
                {calculateTotal(
                  [
                    "s37_capitalExpenditure",
                    "s37_personalExpenditure",
                    "s37_nonBusinessExpenditure",
                    "s37_politicalPartyExpenditure",
                    "s37_violationLawExpenditure",
                    "s37_offenseExpenditure",
                    "s37_contingentLiability",
                    "s37_otherNonAllowableAmount",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section 43B Extended - Interest and Other */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            8. Interest and Disallowances (Section 43B Extended)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                8a. Amount of tax or rate levied or assessed on the basis of profits (262(1)(i))
              </h4>
              <InputField
                label="Amount"
                name="taxOnProfits"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.taxOnProfits?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                8b. Amount paid as wealth tax (145a(1)(aa))
              </h4>
              <InputField
                label="Amount"
                name="wealthTaxPaid"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.wealthTaxPaid?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                8c. Amount paid by way of royalty, license fee, as per section 40(a)(ib)
              </h4>
              <InputField
                label="Amount"
                name="royaltyLicenseFee"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.royaltyLicenseFee?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                8d. Amount of interest, salary, bonus or commission paid to partner or member (40(b))
              </h4>
              <InputField
                label="Amount"
                name="partnerCommission"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.partnerCommission?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                8e. Any other disallowance
              </h4>
              <InputField
                label="Amount"
                name="otherDisallowance2"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.otherDisallowance2?.message}
              />
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              Total amount disallowable under section 43B (total of 8a to 8e) =
              <span className="ml-2 font-semibold text-green-600">
                {calculateTotal(
                  [
                    "taxOnProfits",
                    "wealthTaxPaid",
                    "royaltyLicenseFee",
                    "partnerCommission",
                    "otherDisallowance2",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section 80 - Disallowances */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            9. Amount Disallowable under Section 80 (Items 9a to 9j)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                9a. Amounts paid to persons specified in section 40A
              </h4>
              <InputField
                label="Amount"
                name="s40APayments"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s40APayments?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                9b. Any sum paid by the assessee as an employee for setting up or as contribution to any company, AOP, BOI or society or any other institution (40a(3))
              </h4>
              <InputField
                label="Amount"
                name="employeeContributionPayments"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.employeeContributionPayments?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                9c. Any deduction or allowance except as allowable u/s 36(1)(viii) (40a(13))
              </h4>
              <InputField
                label="Amount"
                name="exceptAllowable36"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.exceptAllowable36?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                9d. Any other disallowance
              </h4>
              <InputField
                label="Amount"
                name="s80OtherDisallowance"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.s80OtherDisallowance?.message}
              />
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              Total amount disallowable under section 80 (total of 9a to 9d) =
              <span className="ml-2 font-semibold text-green-600">
                {calculateTotal(
                  [
                    "s40APayments",
                    "employeeContributionPayments",
                    "exceptAllowable36",
                    "s80OtherDisallowance",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Section 40(a)(ia) - Cash Payments */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            10. Cash Payments Limit (Section 40(a)(ia) - Items 10a to 10i)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10a. Any sum in the nature of tax, duty, cess or fee under any law
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentTax"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentTax?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10b. Any sum payable by way of contribution to any provident fund or superannuation fund or gratuity fund or any other fund for the welfare of employees
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentWelfareContribution"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentWelfareContribution?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10c. Any sum payable to an employee as bonus or commission for services rendered
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentBonusCommission"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentBonusCommission?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10d. Any sum payable as interest on any loan or borrowing from any public financial institution, a State financial corporation or a State Industrial Investment Corporation
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentInterestLoan"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentInterestLoan?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10e. Any sum payable as interest on any loan or borrowing from such class of non-banking financial companies as may be notified by the Central Government, in accordance with the terms and conditions of the agreement governing the rate and manner of recovery
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentInterestNBFC"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentInterestNBFC?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10f. Any sum payable as interest on any loan or borrowing from a scheduled bank or a co-operative bank or a credit society or a primary co-operative agricultural and rural development bank
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentInterestBank"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentInterestBank?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10g. Any sum payable towards leave encashment
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentLeaveEncashment"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentLeaveEncashment?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10h. Any sum payable to the Indian Railways for the use of railway assets
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentRailways"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentRailways?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                10i. Any sum payable to a micro or small enterprise as prescribed u/s 10(ic) of the Micro, Small and Medium Enterprises Development Act, 2006
              </h4>
              <InputField
                label="Amount"
                name="cashPaymentMSME"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.cashPaymentMSME?.message}
              />
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              Total amount disallowable under Section 40(a)(ia) (total of 10a to 10i) =
              <span className="ml-2 font-semibold text-green-600">
                {calculateTotal(
                  [
                    "cashPaymentTax",
                    "cashPaymentWelfareContribution",
                    "cashPaymentBonusCommission",
                    "cashPaymentInterestLoan",
                    "cashPaymentInterestNBFC",
                    "cashPaymentInterestBank",
                    "cashPaymentLeaveEncashment",
                    "cashPaymentRailways",
                    "cashPaymentMSME",
                  ],
                  watch
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Adjustments Final */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            11. Additional Adjustments
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                11. Amount of income or expenditure of prior period credited or debited to the profit and loss account
              </h4>
              <InputField
                label="Amount"
                name="finalPriorPeriodAdjustment"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.finalPriorPeriodAdjustment?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                12. Amount of expenditure disallowed u/s 11AA
              </h4>
              <InputField
                label="Amount"
                name="finalExpenditureDisallowed11AA"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.finalExpenditureDisallowed11AA?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                13. Tick if Yes - If yes, please fill schedule TPSA
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("finalTickIfYes")}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">Yes, fill Schedule TPSA</span>
                  </label>
                </div>
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

export default OtherInfo;
