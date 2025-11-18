import React from "react";
import { UseFormReturn } from "react-hook-form";

interface BalanceSheetProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({
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
            Step 2
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Balance Sheet</h2>
          <p className="text-sm text-gray-600">
            Balance Sheet as on 31st day of March, 2025 or date of dissolution
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

      <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-blue-900">
              Balance Sheet Instructions
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>Note:</strong> Part A-BS requires disclosure of balance
                sheet items as per ITR-6 form requirements.
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Fill items marked with codes (Ia, Ib, IIa, etc.)</li>
                <li>All amounts should be in same currency</li>
                <li>Totals will be auto-calculated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {(() => {
          // Filter errors to only show relevant ones based on conditional visibility
          // Currently, all balance sheet fields are visible, so all errors are shown
          // This structure allows easy addition of conditional validation later
          const relevantErrors = Object.entries(errors).filter(([fieldName]) => {
            // Placeholder for future conditional logic
            // For now, all errors are displayed
            return true;
          });

          if (relevantErrors.length === 0) return null;

          return (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-red-900">
                    ⚠️ Please fix the following errors ({relevantErrors.length} field{relevantErrors.length > 1 ? 's' : ''})
                  </h3>
                  <ul className="space-y-1 text-sm text-red-800">
                    {relevantErrors.map(([fieldName, error]: [string, any]) => {
                      const message = error?.message || 'This field is required';
                      return (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1').trim()}:</strong> {message}
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

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            A. Sources of Funds
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1. Partners' / Members' Fund
              </h4>
              <div className="space-y-2">
                <InputField
                  label="A. Partners'/Members' Capital"
                  name="partnersCapital"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.partnersCapital?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. Reserves and Surplus
              </h4>
              <div className="space-y-2">
                <InputField
                  label="i. Revaluation Reserve"
                  name="revaluationReserve"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.revaluationReserve?.message}
                />
                <InputField
                  label="ii. Capital Reserve"
                  name="capitalReserve"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.capitalReserve?.message}
                />
                <InputField
                  label="iii. Statutory Reserve"
                  name="statutoryReserve"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.statutoryReserve?.message}
                />
                <InputField
                  label="iv. Any Other Reserve"
                  name="otherReserve"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.otherReserve?.message}
                />
                <InputField
                  label="v. Credit balance of Profit and loss account"
                  name="creditBalancePL"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.creditBalancePL?.message}
                />
                <div className="rounded-md bg-blue-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    vi. Total (i + ii + iii + iv + v) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        [
                          "revaluationReserve",
                          "capitalReserve",
                          "statutoryReserve",
                          "otherReserve",
                          "creditBalancePL",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-green-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                C. Total partners'/members' fund (a + b) =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    [
                      "partnersCapital",
                      "revaluationReserve",
                      "capitalReserve",
                      "statutoryReserve",
                      "otherReserve",
                      "creditBalancePL",
                    ],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">2. Loan Funds</h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. Secured loans
              </h4>
              <div className="space-y-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    i. Foreign Currency Loans
                  </label>
                  <InputField
                    label=""
                    name="securedLoansForex"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.securedLoansForex?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ii. Rupee Loans
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="A. From Banks"
                      name="rupeeLoansFromBanks"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.rupeeLoansFromBanks?.message}
                    />
                    <InputField
                      label="B. From Others"
                      name="rupeeLoansFromOthers"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.rupeeLoansFromOthers?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-3">
                      <div className="text-sm font-medium text-gray-800">
                        C. Total (IIA + IIB) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            ["rupeeLoansFromBanks", "rupeeLoansFromOthers"],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-green-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    iii. Total secured loans (ai + aii) =
                    <span className="ml-2 font-semibold text-green-600">
                      {calculateTotal(
                        [
                          "securedLoansForex",
                          "rupeeLoansFromBanks",
                          "rupeeLoansFromOthers",
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
                B. Unsecured loans (including deposits)
              </h4>
              <div className="space-y-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    i. Foreign Currency Loans
                  </label>
                  <InputField
                    label=""
                    name="unsecuredLoansForex"
                    type="number"
                    placeholder="Amount"
                    register={register}
                    error={errors.unsecuredLoansForex?.message}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ii. Rupee Loans
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="A. From Banks"
                      name="unsecuredRupeeFromBanks"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.unsecuredRupeeFromBanks?.message}
                    />
                    <InputField
                      label="B. From persons specified in section 40A(2)(b) of the I.T. Act"
                      name="unsecuredRupeeFromSpecified"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.unsecuredRupeeFromSpecified?.message}
                    />
                    <InputField
                      label="C. From Others"
                      name="unsecuredRupeeFromOthers"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.unsecuredRupeeFromOthers?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-3">
                      <div className="text-sm font-medium text-gray-800">
                        D. Total Rupee Loans (IIA + IIB + IIC) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            [
                              "unsecuredRupeeFromBanks",
                              "unsecuredRupeeFromSpecified",
                              "unsecuredRupeeFromOthers",
                            ],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-green-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    iii. Total unsecured loans (bi + bii) =
                    <span className="ml-2 font-semibold text-green-600">
                      {calculateTotal(
                        [
                          "unsecuredLoansForex",
                          "unsecuredRupeeFromBanks",
                          "unsecuredRupeeFromSpecified",
                          "unsecuredRupeeFromOthers",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-yellow-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                C. Total Loan Funds (aiii + biii) =
                <span className="ml-2 font-semibold text-yellow-600">
                  {calculateTotal(
                    [
                      "securedLoansForex",
                      "rupeeLoansFromBanks",
                      "rupeeLoansFromOthers",
                      "unsecuredLoansForex",
                      "unsecuredRupeeFromBanks",
                      "unsecuredRupeeFromSpecified",
                      "unsecuredRupeeFromOthers",
                    ],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            3. Deferred tax liability
          </h3>
          <InputField
            label="Deferred Tax Liability"
            name="deferredTaxLiability"
            type="number"
            placeholder="Amount"
            register={register}
            error={errors.deferredTaxLiability?.message}
          />
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">4. Advances</h3>
          <div className="space-y-2">
            <InputField
              label="i. From persons specified in section 40A(2)(b) of the I.T. Act"
              name="advancesFromSpecified"
              type="number"
              placeholder="Amount"
              register={register}
              error={errors.advancesFromSpecified?.message}
            />
            <InputField
              label="ii. From Others"
              name="advancesFromOthers"
              type="number"
              placeholder="Amount"
              register={register}
              error={errors.advancesFromOthers?.message}
            />
            <div className="rounded-md bg-blue-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                iii. Total Advances (i + ii) =
                <span className="ml-2 font-semibold text-blue-600">
                  {calculateTotal(
                    ["advancesFromSpecified", "advancesFromOthers"],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            B. Application of Funds
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1. Fixed assets
              </h4>
              <div className="space-y-2">
                <InputField
                  label="A. Gross Block"
                  name="grossBlock"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.grossBlock?.message}
                />
                <InputField
                  label="B. Depreciation"
                  name="depreciation"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.depreciation?.message}
                />
                <InputField
                  label="C. Net Block (a - b)"
                  name="netBlock"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.netBlock?.message}
                />
                <InputField
                  label="D. Capital work in progress"
                  name="capitalWIP"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.capitalWIP?.message}
                />
                <div className="rounded-md bg-blue-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    E. Total (1c + 1d) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(["netBlock", "capitalWIP"], watch)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">2. Investments</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    A. Long-term Investments
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        i. Equity Instruments
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="A. Listed equities"
                          name="listedEquities"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.listedEquities?.message}
                        />
                        <InputField
                          label="B. Unlisted equities"
                          name="unlistedEquities"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.unlistedEquities?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            C. Total (A + B) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                ["listedEquities", "unlistedEquities"],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <InputField
                      label="ii. Preference shares"
                      name="preferenceShares"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.preferenceShares?.message}
                    />
                    <InputField
                      label="iii. Government or trust securities"
                      name="govSecurities"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.govSecurities?.message}
                    />
                    <InputField
                      label="iv. Debenture or bonds"
                      name="debentureBonds"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.debentureBonds?.message}
                    />
                    <InputField
                      label="v. Mutual funds"
                      name="mutualFunds"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.mutualFunds?.message}
                    />
                    <InputField
                      label="vi. Others"
                      name="otherLTInvestments"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherLTInvestments?.message}
                    />
                    <div className="rounded-md bg-green-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        viii. Total Long-term investments (i + ii + iii + iv + v
                        + vi + vii) =
                        <span className="ml-2 font-semibold text-green-600">
                          {calculateTotal(
                            [
                              "listedEquities",
                              "unlistedEquities",
                              "preferenceShares",
                              "govSecurities",
                              "debentureBonds",
                              "mutualFunds",
                              "otherLTInvestments",
                            ],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    B. Short-term Investments
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        i. Equity Instruments
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="A. Listed equities"
                          name="stListedEquities"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.stListedEquities?.message}
                        />
                        <InputField
                          label="B. Unlisted equities"
                          name="stUnlistedEquities"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.stUnlistedEquities?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            C. Total (A + B) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                ["stListedEquities", "stUnlistedEquities"],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <InputField
                      label="ii. Preference shares"
                      name="stPreferenceShares"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.stPreferenceShares?.message}
                    />
                    <InputField
                      label="iii. Government or trust securities"
                      name="stGovSecurities"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.stGovSecurities?.message}
                    />
                    <InputField
                      label="iv. Debenture or bonds"
                      name="stDebentureBonds"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.stDebentureBonds?.message}
                    />
                    <InputField
                      label="v. Mutual funds"
                      name="stMutualFunds"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.stMutualFunds?.message}
                    />
                    <InputField
                      label="vi. Others"
                      name="otherSTInvestments"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherSTInvestments?.message}
                    />
                    <div className="rounded-md bg-green-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        vii. Total Short-term investments (IC + ii + iii + iv +
                        v + vi) =
                        <span className="ml-2 font-semibold text-green-600">
                          {calculateTotal(
                            [
                              "stListedEquities",
                              "stUnlistedEquities",
                              "stPreferenceShares",
                              "stGovSecurities",
                              "stDebentureBonds",
                              "stMutualFunds",
                              "otherSTInvestments",
                            ],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-yellow-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    C. Total investments (aviii + bvii) =
                    <span className="ml-2 font-semibold text-yellow-600">
                      {calculateTotal(
                        [
                          "listedEquities",
                          "unlistedEquities",
                          "preferenceShares",
                          "govSecurities",
                          "debentureBonds",
                          "mutualFunds",
                          "otherLTInvestments",
                          "stListedEquities",
                          "stUnlistedEquities",
                          "stPreferenceShares",
                          "stGovSecurities",
                          "stDebentureBonds",
                          "stMutualFunds",
                          "otherSTInvestments",
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
                3. Current assets, loans and advances
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    A. Current Assets
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        i. Inventories
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="A. Raw materials"
                          name="rawMaterials"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.rawMaterials?.message}
                        />
                        <InputField
                          label="B. Work-in-progress"
                          name="workInProgress"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.workInProgress?.message}
                        />
                        <InputField
                          label="C. Finished goods"
                          name="finishedGoods"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.finishedGoods?.message}
                        />
                        <InputField
                          label="D. Stock-in-trade (in respect of goods held for sale)"
                          name="stockInTrade"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.stockInTrade?.message}
                        />
                        <InputField
                          label="E. Stores/consumables including packing material"
                          name="storesConsumables"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.storesConsumables?.message}
                        />
                        <InputField
                          label="F. Loose tools"
                          name="looseTools"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.looseTools?.message}
                        />
                        <InputField
                          label="G. Others"
                          name="otherInventories"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.otherInventories?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            H. Total (IA + IB + IC + ID + IE + IF + IG) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                [
                                  "rawMaterials",
                                  "workInProgress",
                                  "finishedGoods",
                                  "stockInTrade",
                                  "storesConsumables",
                                  "looseTools",
                                  "otherInventories",
                                ],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        ii. Sundry Debtors
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="A. Outstanding for more than one year"
                          name="sundryd1Year"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.sundryd1Year?.message}
                        />
                        <InputField
                          label="B. Others"
                          name="sundryOthers"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.sundryOthers?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            C. Total Sundry Debtors (IIA + IIB) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                ["sundryd1Year", "sundryOthers"],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        iii. Cash and bank balances
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="A. Balance with banks"
                          name="balanceWithBanks"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.balanceWithBanks?.message}
                        />
                        <InputField
                          label="B. Cash in hand"
                          name="cashInHand"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.cashInHand?.message}
                        />
                        <InputField
                          label="C. Others"
                          name="otherCashBalances"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.otherCashBalances?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            D. Total Cash and cash equivalents (IIIA + IIIB +
                            IIIC) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                [
                                  "balanceWithBanks",
                                  "cashInHand",
                                  "otherCashBalances",
                                ],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <InputField
                      label="iv. Other Current Assets"
                      name="otherCurrentAssets"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherCurrentAssets?.message}
                    />

                    <div className="rounded-md bg-green-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        v. Total current assets (IH + IIC + IIID + aiv) =
                        <span className="ml-2 font-semibold text-green-600">
                          {calculateTotal(
                            [
                              "rawMaterials",
                              "workInProgress",
                              "finishedGoods",
                              "stockInTrade",
                              "storesConsumables",
                              "looseTools",
                              "otherInventories",
                              "sundryd1Year",
                              "sundryOthers",
                              "balanceWithBanks",
                              "cashInHand",
                              "otherCashBalances",
                              "otherCurrentAssets",
                            ],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    B. Loans and Advances
                  </label>
                  <div className="ml-4 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="i. Advances recoverable in cash or in kind or for value to be received"
                      name="advancesRecoverable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.advancesRecoverable?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    C. Deposits, loans and advances to corporate and others
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="ii. Deposits, loans and advances to corporate and others"
                      name="depositsToCorpAndOthers"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.depositsToCorpAndOthers?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    D. Balance with Revenue Authorities
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="iii. Balance with Revenue Authorities"
                      name="balanceWithRevenueAuth"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.balanceWithRevenueAuth?.message}
                    />
                  </div>
                </div>

                <div className="rounded-md bg-yellow-50 p-2">
                  <div className="text-sm font-medium text-gray-800">
                    iv. Total (id + bii + biii) =
                    <span className="ml-2 font-semibold text-yellow-600">
                      {calculateTotal(
                        [
                          "advancesRecoverable",
                          "depositsToCorpAndOthers",
                          "balanceWithRevenueAuth",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    E. Loans and advances
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        v. Loans and advances
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="a. for the purpose of business or profession"
                          name="loansForBusiness"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.loansForBusiness?.message}
                        />
                        <InputField
                          label="b. not for the purpose of business or profession"
                          name="loansNotForBusiness"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.loansNotForBusiness?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            c. Total (av + biv) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                ["loansForBusiness", "loansNotForBusiness"],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Current liabilities and provisions
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    i. Current Liabilities
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        A. Sundry Creditors
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="1. Outstanding for more than one year"
                          name="sundryCred1Year"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.sundryCred1Year?.message}
                        />
                        <InputField
                          label="2. Others"
                          name="sundryCred1YearOthers"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.sundryCred1YearOthers?.message}
                        />
                        <div className="rounded-md bg-blue-50 p-2">
                          <div className="text-xs font-medium text-gray-800">
                            3. Total (1 + 2) =
                            <span className="ml-2 font-semibold text-blue-600">
                              {calculateTotal(
                                ["sundryCred1Year", "sundryCred1YearOthers"],
                                watch
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <InputField
                      label="B. Liability for leased assets"
                      name="liabilityForLeased"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.liabilityForLeased?.message}
                    />

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        C. Interest Accrued and due on borrowings
                      </label>
                      <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                        <InputField
                          label="i. Interest accrued and due on borrowings"
                          name="interestAccrued"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.interestAccrued?.message}
                        />
                        <InputField
                          label="ii. Interest accrued but not due on borrowings"
                          name="interestNotDue"
                          type="number"
                          placeholder="Amount"
                          register={register}
                          error={errors.interestNotDue?.message}
                        />
                      </div>
                    </div>

                    <InputField
                      label="D. Income received in advance"
                      name="incomeReceivedAdvance"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.incomeReceivedAdvance?.message}
                    />

                    <InputField
                      label="E. Other payables"
                      name="otherPayables"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherPayables?.message}
                    />

                    <div className="rounded-md bg-green-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        F. Total (A3 + B + C + D + E + IF) =
                        <span className="ml-2 font-semibold text-green-600">
                          {calculateTotal(
                            [
                              "sundryCred1Year",
                              "sundryCred1YearOthers",
                              "liabilityForLeased",
                              "interestAccrued",
                              "interestNotDue",
                              "incomeReceivedAdvance",
                              "otherPayables",
                            ],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    ii. Provisions
                  </label>
                  <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                    <InputField
                      label="A. Provision for Income Tax"
                      name="provisionIncomeTax"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.provisionIncomeTax?.message}
                    />
                    <InputField
                      label="B. Provision for encashment/Superannuation/Gratuity"
                      name="provisionEncashment"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.provisionEncashment?.message}
                    />
                    <InputField
                      label="C. Other Provisions"
                      name="provisionOthers"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.provisionOthers?.message}
                    />
                    <div className="rounded-md bg-green-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        II. Total (IIA + IIB + IIC) =
                        <span className="ml-2 font-semibold text-green-600">
                          {calculateTotal(
                            [
                              "provisionIncomeTax",
                              "provisionEncashment",
                              "provisionOthers",
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

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Net current assets (3c - diii)
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    i. Miscellaneous expenditure not written off or adjusted
                  </label>
                  <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                    <InputField
                      label="A. Miscellaneous expenditure not written off or adjusted"
                      name="miscExpenditureNotWritten"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.miscExpenditureNotWritten?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    ii. Deferred tax asset
                  </label>
                  <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                    <InputField
                      label="B. Deferred tax asset"
                      name="deferredTaxAsset"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.deferredTaxAsset?.message}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    iii. Debit balance to Profit and loss account/ accumulated balance
                  </label>
                  <div className="ml-4 space-y-2 border-l border-gray-300 pl-4">
                    <InputField
                      label="C. Debit balance to Profit and loss account/ accumulated balance"
                      name="debitBalancePL"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.debitBalancePL?.message}
                    />
                  </div>
                </div>

                <div className="rounded-md bg-yellow-50 p-3">
                  <div className="text-sm font-medium text-gray-800">
                    III. Total (4a + 4b + 4c) =
                    <span className="ml-2 font-semibold text-yellow-600">
                      {calculateTotal(
                        [
                          "miscExpenditureNotWritten",
                          "deferredTaxAsset",
                          "debitBalancePL",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border-2 border-orange-400 bg-orange-50 p-4">
              <h4 className="mb-3 font-bold text-orange-900">
                Total, application of funds (1e + 2c + 3e + 4d)
              </h4>
              <div className="rounded-md bg-orange-100 p-3">
                <div className="text-lg font-bold text-orange-700">
                  Grand Total = 
                  <span className="ml-2">
                    {calculateTotal(
                      [
                        // Fixed Assets
                        "grossBlock",
                        "netBlock",
                        "capitalWIP",
                        // Investments
                        "listedEquities",
                        "unlistedEquities",
                        "preferenceShares",
                        "govSecurities",
                        "debentureBonds",
                        "mutualFunds",
                        "otherLTInvestments",
                        "stListedEquities",
                        "stUnlistedEquities",
                        "stPreferenceShares",
                        "stGovSecurities",
                        "stDebentureBonds",
                        "stMutualFunds",
                        "otherSTInvestments",
                        // Current Assets
                        "rawMaterials",
                        "workInProgress",
                        "finishedGoods",
                        "stockInTrade",
                        "storesConsumables",
                        "looseTools",
                        "otherInventories",
                        "sundryd1Year",
                        "sundryOthers",
                        "balanceWithBanks",
                        "cashInHand",
                        "otherCashBalances",
                        "otherCurrentAssets",
                        "advancesRecoverable",
                        "depositsToCorpAndOthers",
                        "balanceWithRevenueAuth",
                        "loansForBusiness",
                        "loansNotForBusiness",
                        // Other items
                        "miscExpenditureNotWritten",
                        "deferredTaxAsset",
                        "debitBalancePL",
                      ],
                      watch
                    )}
                  </span>
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

type RegisterFn = BalanceSheetProps["form"]["register"];

interface InputFieldProps {
  label: string;
  name: string;
  register: RegisterFn;
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
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
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

export default BalanceSheet;
