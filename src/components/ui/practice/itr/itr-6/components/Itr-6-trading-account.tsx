import React from "react";
import { UseFormReturn } from "react-hook-form";

interface TradingAccountProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const TradingAccount: React.FC<TradingAccountProps> = ({
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
            Step 4
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Trading Account</h2>
          <p className="text-sm text-gray-600">
            Trading Account for the financial year 2024-25
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
              Trading Account Instructions
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>Note:</strong> Fill items 4 to 12 in a case where regular books of account are maintained, otherwise fill items 62 to 66 as applicable.
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Revenue from operations including sales and receipts</li>
                <li>Gross receipts from profession and other operating revenues</li>
                <li>All totals will be auto-calculated</li>
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
          const relevantErrors = Object.entries(errors).filter(([fieldName]) => {
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
            4. Revenue from Operations
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. Gross receipts of business (net of returns and refunds and duty or tax, if any)
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Revenue from Operations
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="i. Sale of goods"
                      name="saleOfGoods"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.saleOfGoods?.message}
                    />
                    <InputField
                      label="ii. Sale of services"
                      name="saleOfServices"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.saleOfServices?.message}
                    />
                    <InputField
                      label="iii. Other operating revenues (specify nature and amount)"
                      name="otherOperatingRevenues"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherOperatingRevenues?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        iv. Total (iiia + iiib + iiic) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            [
                              "saleOfGoods",
                              "saleOfServices",
                              "otherOperatingRevenues",
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
                B. Gross receipts from Profession
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Duties and taxes not receivable in respect of goods and services sold or supplied
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="i. Custom Excise duties"
                      name="customExciseDuties"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.customExciseDuties?.message}
                    />
                    <InputField
                      label="ii. Service tax"
                      name="serviceTax"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.serviceTax?.message}
                    />
                    <InputField
                      label="iii. VAT Sales tax"
                      name="vatSalesTax"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.vatSalesTax?.message}
                    />
                    <InputField
                      label="iv. Central Goods & Service Tax (CGST)"
                      name="cgst"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.cgst?.message}
                    />
                    <InputField
                      label="v. State Goods & Services Tax (SGST)"
                      name="sgst"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.sgst?.message}
                    />
                    <InputField
                      label="vi. Integrated Goods & Services Tax (IGST)"
                      name="igst"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.igst?.message}
                    />
                    <InputField
                      label="vii. Union Territory Goods & Services Tax (UTGST)"
                      name="utgst"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.utgst?.message}
                    />
                    <InputField
                      label="viii. Any other duty, tax and cess"
                      name="otherDutiesAndTax"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherDutiesAndTax?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        ix. Total (i + ii + iii + iv + v + vi+vii+viii) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            [
                              "customExciseDuties",
                              "serviceTax",
                              "vatSalesTax",
                              "cgst",
                              "sgst",
                              "igst",
                              "utgst",
                              "otherDutiesAndTax",
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

            <div className="rounded-md bg-green-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                B. Total (i + ii + iii + iv + v + vi+vii+viii+ix) =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    [
                      "saleOfGoods",
                      "saleOfServices",
                      "otherOperatingRevenues",
                      "customExciseDuties",
                      "serviceTax",
                      "vatSalesTax",
                      "cgst",
                      "sgst",
                      "igst",
                      "utgst",
                      "otherDutiesAndTax",
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
            5. Other Operating Revenues & Deductions
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Total Revenue from operations (Aiv + B + C)
              </h4>
              <div className="space-y-2">
                <InputField
                  label="D. Total revenue from operations"
                  name="totalRevenueFromOperations"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.totalRevenueFromOperations?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Closing Stock of Finished Goods
              </h4>
              <div className="space-y-2">
                <InputField
                  label="E. Closing stock of finished goods"
                  name="closingStockFinishedGoods"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.closingStockFinishedGoods?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                F. Total of Credits (D + E)
              </h4>
              <div className="rounded-md bg-blue-50 p-2">
                <div className="text-sm font-medium text-gray-800">
                  F. Total of Credits =
                  <span className="ml-2 font-semibold text-blue-600">
                    {calculateTotal(
                      ["totalRevenueFromOperations", "closingStockFinishedGoods"],
                      watch
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                G. Opening Stock of Finished Goods
              </h4>
              <div className="space-y-2">
                <InputField
                  label="G. Opening stock of finished goods"
                  name="openingStockFinishedGoods"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.openingStockFinishedGoods?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                H. Purchases (net of refunds and duty or tax, if any)
              </h4>
              <div className="space-y-2">
                <InputField
                  label="H. Purchases (net of refunds and duty or tax, if any)"
                  name="purchases"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.purchases?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                I. Direct Expenses (ii + iii + IIii)
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Direct Expenses Details
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="i. Carriage inward"
                      name="carriageInward"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.carriageInward?.message}
                    />
                    <InputField
                      label="ii. Power and fuel"
                      name="powerAndFuel"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.powerAndFuel?.message}
                    />
                    <InputField
                      label="iii. Other direct expenses (specify nature and amount)"
                      name="otherDirectExpenses"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherDirectExpenses?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        I. Total (i + ii + iii) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            ["carriageInward", "powerAndFuel", "otherDirectExpenses"],
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
                J. Duties and taxes payable, in respect of goods and services purchased
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Duties and Taxes Payable
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="i. Custom duty"
                      name="customDuty"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.customDuty?.message}
                    />
                    <InputField
                      label="ii. Countervailing duty"
                      name="countervailingDuty"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.countervailingDuty?.message}
                    />
                    <InputField
                      label="iii. Special additional duty"
                      name="specialAdditionalDuty"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.specialAdditionalDuty?.message}
                    />
                    <InputField
                      label="iv. Union excise duty"
                      name="unionExciseDuty"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.unionExciseDuty?.message}
                    />
                    <InputField
                      label="v. Service tax"
                      name="serviceTaxPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.serviceTaxPayable?.message}
                    />
                    <InputField
                      label="vi. VAT Sales tax"
                      name="vatSalesTaxPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.vatSalesTaxPayable?.message}
                    />
                    <InputField
                      label="vii. Central Goods & Service Tax (CGST)"
                      name="cgstPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.cgstPayable?.message}
                    />
                    <InputField
                      label="viii. State Goods & Services Tax (SGST)"
                      name="sgstPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.sgstPayable?.message}
                    />
                    <InputField
                      label="ix. Integrated Goods & Services Tax (IGST)"
                      name="igstPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.igstPayable?.message}
                    />
                    <InputField
                      label="x. Union Territory Goods & Services Tax (UTGST)"
                      name="utgstPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.utgstPayable?.message}
                    />
                    <InputField
                      label="xi. Any other tax, paid or payable"
                      name="otherTaxPayable"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherTaxPayable?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        xii. Total (i to xi) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            [
                              "customDuty",
                              "countervailingDuty",
                              "specialAdditionalDuty",
                              "unionExciseDuty",
                              "serviceTaxPayable",
                              "vatSalesTaxPayable",
                              "cgstPayable",
                              "sgstPayable",
                              "igstPayable",
                              "utgstPayable",
                              "otherTaxPayable",
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

            <div className="rounded-md bg-green-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                K. Total (10i + 10ii + 10iii + 10iv + 10v + 10vi + 10vii + 10viii + 10ix + 10x + 10xi + 10xii) =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    [
                      "openingStockFinishedGoods",
                      "purchases",
                      "carriageInward",
                      "powerAndFuel",
                      "otherDirectExpenses",
                      "customDuty",
                      "countervailingDuty",
                      "specialAdditionalDuty",
                      "unionExciseDuty",
                      "serviceTaxPayable",
                      "vatSalesTaxPayable",
                      "cgstPayable",
                      "sgstPayable",
                      "igstPayable",
                      "utgstPayable",
                      "otherTaxPayable",
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
            6. Summary Calculations
          </h3>

          <div className="space-y-4">
            <div className="rounded-md bg-yellow-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                11. Cost of goods produced - Transferred from Manufacturing Account =
                <span className="ml-2 font-semibold text-yellow-600">
                  {watch("costOfGoodsProduced") || 0}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <InputField
                label="11. Cost of goods produced - Transferred from Manufacturing Account"
                name="costOfGoodsProduced"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.costOfGoodsProduced?.message}
              />
            </div>

            <div className="rounded-md bg-yellow-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                12. Gross Profit from Business Profession - transferred to Profit and Loss account (F - K - 11) =
                <span className="ml-2 font-semibold text-yellow-600">
                  {(() => {
                    const totalCredits = calculateTotal(
                      ["totalRevenueFromOperations", "closingStockFinishedGoods"],
                      watch
                    );
                    const totalDebits = calculateTotal(
                      [
                        "openingStockFinishedGoods",
                        "purchases",
                        "carriageInward",
                        "powerAndFuel",
                        "otherDirectExpenses",
                        "customDuty",
                        "countervailingDuty",
                        "specialAdditionalDuty",
                        "unionExciseDuty",
                        "serviceTaxPayable",
                        "vatSalesTaxPayable",
                        "cgstPayable",
                        "sgstPayable",
                        "igstPayable",
                        "utgstPayable",
                        "otherTaxPayable",
                      ],
                      watch
                    );
                    const cogs = parseFloat(watch("costOfGoodsProduced") || 0);
                    return totalCredits - totalDebits - cogs;
                  })()}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-yellow-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                12b. Income from Intraday Trading - transferred to Profit and Loss account =
                <span className="ml-2 font-semibold text-yellow-600">
                  {watch("incomeFromIntradayTrading") || 0}
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <InputField
                label="12b. Income from Intraday Trading - transferred to Profit and Loss account"
                name="incomeFromIntradayTrading"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.incomeFromIntradayTrading?.message}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            7. Profit and Loss Account (Items 13-60)
          </h3>

          <div className="space-y-4">
            {/* Income Section */}
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">A. Income</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    13. Gross profit (transferred from Trading Account)
                  </label>
                  <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                    {(() => {
                      const totalCredits = calculateTotal(["totalRevenueFromOperations", "closingStockFinishedGoods"], watch);
                      const totalDebits = calculateTotal(
                        ["openingStockFinishedGoods", "purchases", "carriageInward", "powerAndFuel", "otherDirectExpenses", "customDuty", "countervailingDuty", "specialAdditionalDuty", "unionExciseDuty", "serviceTaxPayable", "vatSalesTaxPayable", "cgstPayable", "sgstPayable", "igstPayable", "utgstPayable", "otherTaxPayable"],
                        watch
                      );
                      const cogs = parseFloat(watch("costOfGoodsProduced") || 0);
                      return totalCredits - totalDebits - cogs;
                    })()}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <label className="text-sm font-medium text-gray-600">Other Income</label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField label="14. Rent" name="rent" type="number" placeholder="Amount" register={register} error={errors.rent?.message} />
                    <InputField label="15. Commission" name="commission" type="number" placeholder="Amount" register={register} error={errors.commission?.message} />
                    <InputField label="16. Dividend income" name="dividendIncome" type="number" placeholder="Amount" register={register} error={errors.dividendIncome?.message} />
                    <InputField label="17. Interest income" name="interestIncome" type="number" placeholder="Amount" register={register} error={errors.interestIncome?.message} />
                    <InputField label="18. Profit on sale of fixed assets" name="profitOnSaleFixedAssets" type="number" placeholder="Amount" register={register} error={errors.profitOnSaleFixedAssets?.message} />
                    <InputField label="19. Profit on sale of investment securities (Securities Transaction Tax STT)" name="profitOnSaleSecurities" type="number" placeholder="Amount" register={register} error={errors.profitOnSaleSecurities?.message} />
                    <InputField label="20. Profit on sale of other investment" name="profitOnSaleInvestment" type="number" placeholder="Amount" register={register} error={errors.profitOnSaleInvestment?.message} />
                    <InputField label="21. Profit on sale of foreign currency (s.43 A.A)" name="profitForeignCurrency" type="number" placeholder="Amount" register={register} error={errors.profitForeignCurrency?.message} />
                    <InputField label="22. Profit on conversion of inventory into capital asset u/s 43(A) (FMV of inventory as on the date of conversion)" name="profitConversionInventory" type="number" placeholder="Amount" register={register} error={errors.profitConversionInventory?.message} />
                    <InputField label="23. Agricultural income" name="agriculturalIncome" type="number" placeholder="Amount" register={register} error={errors.agriculturalIncome?.message} />
                    <InputField label="24. Any other income (specify nature and amount)" name="anyOtherIncomeSpec" type="number" placeholder="Amount" register={register} error={errors.anyOtherIncomeSpec?.message} />
                    <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                      Total Other Income (i+ii+iii+iv+v+vi+vii+viii+ix+x+xi) =
                      <span className="ml-2 font-semibold text-blue-600">
                        {calculateTotal(["rent", "commission", "dividendIncome", "interestIncome", "profitOnSaleFixedAssets", "profitOnSaleSecurities", "profitOnSaleInvestment", "profitForeignCurrency", "profitConversionInventory", "agriculturalIncome", "anyOtherIncomeSpec"], watch)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Income */}
            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              Total income (13 + 14 to 24) =
              <span className="ml-2 font-semibold text-green-600">
                {(() => {
                  const totalCredits = calculateTotal(["totalRevenueFromOperations", "closingStockFinishedGoods"], watch);
                  const totalDebits = calculateTotal(["openingStockFinishedGoods", "purchases", "carriageInward", "powerAndFuel", "otherDirectExpenses", "customDuty", "countervailingDuty", "specialAdditionalDuty", "unionExciseDuty", "serviceTaxPayable", "vatSalesTaxPayable", "cgstPayable", "sgstPayable", "igstPayable", "utgstPayable", "otherTaxPayable"], watch);
                  const cogs = parseFloat(watch("costOfGoodsProduced") || 0);
                  const grossProfit = totalCredits - totalDebits - cogs;
                  const otherIncome = calculateTotal(["rent", "commission", "dividendIncome", "interestIncome", "profitOnSaleFixedAssets", "profitOnSaleSecurities", "profitOnSaleInvestment", "profitForeignCurrency", "profitConversionInventory", "agriculturalIncome", "anyOtherIncomeSpec"], watch);
                  return grossProfit + otherIncome;
                })()}
              </span>
            </div>

            {/* Deductions Section */}
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">B. Deductions</h4>
              <div className="space-y-2">
                <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                  <InputField label="25. Freight outward" name="freightOutward" type="number" placeholder="Amount" register={register} error={errors.freightOutward?.message} />
                  <InputField label="26. Consumption of stores and spare parts" name="consumptionStores" type="number" placeholder="Amount" register={register} error={errors.consumptionStores?.message} />
                  <InputField label="27. Power and fuel" name="powerAndFuelExp" type="number" placeholder="Amount" register={register} error={errors.powerAndFuelExp?.message} />
                  <InputField label="28. Rents" name="rents" type="number" placeholder="Amount" register={register} error={errors.rents?.message} />
                  <InputField label="29. Repairs in building" name="repairsBuilding" type="number" placeholder="Amount" register={register} error={errors.repairsBuilding?.message} />
                  <InputField label="30. Repairs in machinery" name="repairsMachinery" type="number" placeholder="Amount" register={register} error={errors.repairsMachinery?.message} />
                  <InputField label="31. Compensation to employees" name="compensationEmployees" type="number" placeholder="Amount" register={register} error={errors.compensationEmployees?.message} />
                  
                  <div className="border-t border-gray-200 pt-2">
                    <label className="text-sm font-medium text-gray-600">Compensation to employees (22i - 22vi)</label>
                    <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                      <InputField label="i. Salaries and wages" name="salariesWages" type="number" placeholder="Amount" register={register} error={errors.salariesWages?.message} />
                      <InputField label="ii. Bonus" name="bonus" type="number" placeholder="Amount" register={register} error={errors.bonus?.message} />
                      <InputField label="iii. Reimbursement of medical expenses" name="medicalReimbursement" type="number" placeholder="Amount" register={register} error={errors.medicalReimbursement?.message} />
                      <InputField label="iv. Leave encashment" name="leaveEncashment" type="number" placeholder="Amount" register={register} error={errors.leaveEncashment?.message} />
                      <InputField label="v. Leave travel benefits" name="leaveTravelBenefits" type="number" placeholder="Amount" register={register} error={errors.leaveTravelBenefits?.message} />
                      <InputField label="vi. Contribution to approved superannuation fund" name="superannuationFund" type="number" placeholder="Amount" register={register} error={errors.superannuationFund?.message} />
                      <InputField label="vii. Contribution to recognized provident fund" name="providentFund" type="number" placeholder="Amount" register={register} error={errors.providentFund?.message} />
                      <InputField label="viii. Contribution to recognized gratuity fund" name="gratuityFund" type="number" placeholder="Amount" register={register} error={errors.gratuityFund?.message} />
                      <InputField label="ix. Contribution to any other fund" name="otherFund" type="number" placeholder="Amount" register={register} error={errors.otherFund?.message} />
                      <InputField label="x. Any other benefit to employees in respect of which an expenditure has been incurred" name="otherEmployeeBenefits" type="number" placeholder="Amount" register={register} error={errors.otherEmployeeBenefits?.message} />
                      <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                        Total compensation (i to x) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(["salariesWages", "bonus", "medicalReimbursement", "leaveEncashment", "leaveTravelBenefits", "superannuationFund", "providentFund", "gratuityFund", "otherFund", "otherEmployeeBenefits"], watch)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <InputField label="32. Insurance" name="insurance" type="number" placeholder="Amount" register={register} error={errors.insurance?.message} />
                  <InputField label="33. Workers and staff welfare expenses" name="workersWelfare" type="number" placeholder="Amount" register={register} error={errors.workersWelfare?.message} />
                  <InputField label="34. Entertainment" name="entertainment" type="number" placeholder="Amount" register={register} error={errors.entertainment?.message} />
                  <InputField label="35. Hospitality" name="hospitality" type="number" placeholder="Amount" register={register} error={errors.hospitality?.message} />
                  <InputField label="36. Conference" name="conference" type="number" placeholder="Amount" register={register} error={errors.conference?.message} />
                  <InputField label="37. Sales promotion including publicity (other than advertisement)" name="salesPromotion" type="number" placeholder="Amount" register={register} error={errors.salesPromotion?.message} />
                  <InputField label="38. Advertisement" name="advertisement" type="number" placeholder="Amount" register={register} error={errors.advertisement?.message} />
                  <InputField label="39. Commission" name="commissionExp" type="number" placeholder="Amount" register={register} error={errors.commissionExp?.message} />
                  <InputField label="40. Royalty" name="royalty" type="number" placeholder="Amount" register={register} error={errors.royalty?.message} />
                  
                  <div className="border-t border-gray-200 pt-2">
                    <label className="text-sm font-medium text-gray-600">41. Rates and taxes, paid or payable to Government or any local body</label>
                    <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                      <InputField label="i. Union excise duty" name="unionExciseDutyExp" type="number" placeholder="Amount" register={register} error={errors.unionExciseDutyExp?.message} />
                      <InputField label="ii. Service tax" name="serviceTaxExp" type="number" placeholder="Amount" register={register} error={errors.serviceTaxExp?.message} />
                      <InputField label="iii. VAT/Sales tax" name="vatSalesTaxExp" type="number" placeholder="Amount" register={register} error={errors.vatSalesTaxExp?.message} />
                      <InputField label="iv. Cess" name="cess" type="number" placeholder="Amount" register={register} error={errors.cess?.message} />
                      <InputField label="v. Central Goods & Service Tax (CGST)" name="cgstExp" type="number" placeholder="Amount" register={register} error={errors.cgstExp?.message} />
                      <InputField label="vi. State Goods & Services Tax (SGST)" name="sgstExp" type="number" placeholder="Amount" register={register} error={errors.sgstExp?.message} />
                      <InputField label="vii. Integrated Goods & Services Tax (IGST)" name="igstExp" type="number" placeholder="Amount" register={register} error={errors.igstExp?.message} />
                      <InputField label="viii. Union Territory Goods & Services Tax (UTGST)" name="utgstExp" type="number" placeholder="Amount" register={register} error={errors.utgstExp?.message} />
                      <InputField label="ix. Any other rate, tax, duty or cess (not STT and CTT)" name="otherTaxExp" type="number" placeholder="Amount" register={register} error={errors.otherTaxExp?.message} />
                      <div className="rounded-md bg-blue-50 p-2 text-xs font-medium text-gray-800">
                        Total (i to ix) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(["unionExciseDutyExp", "serviceTaxExp", "vatSalesTaxExp", "cess", "cgstExp", "sgstExp", "igstExp", "utgstExp", "otherTaxExp"], watch)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <InputField label="42. Professional / Consultancy fees / Fee for technical services" name="professionalFees" type="number" placeholder="Amount" register={register} error={errors.professionalFees?.message} />
                  <InputField label="43. Hotel, boarding and Lodging" name="hotelBoarding" type="number" placeholder="Amount" register={register} error={errors.hotelBoarding?.message} />
                  <InputField label="44. Travelling expenses (other than foreign travelling)" name="travellingExpenses" type="number" placeholder="Amount" register={register} error={errors.travellingExpenses?.message} />
                  <InputField label="45. Foreign travelling expenses" name="foreignTravellingExp" type="number" placeholder="Amount" register={register} error={errors.foreignTravellingExp?.message} />
                  <InputField label="46. Conveyance" name="conveyance" type="number" placeholder="Amount" register={register} error={errors.conveyance?.message} />
                  <InputField label="47. Telephone expenses" name="telephoneExp" type="number" placeholder="Amount" register={register} error={errors.telephoneExp?.message} />
                  <InputField label="48. Guest House expenses" name="guestHouseExp" type="number" placeholder="Amount" register={register} error={errors.guestHouseExp?.message} />
                  <InputField label="49. Club expenses" name="clubExp" type="number" placeholder="Amount" register={register} error={errors.clubExp?.message} />
                  <InputField label="50. Festival celebration expenses" name="festivalExp" type="number" placeholder="Amount" register={register} error={errors.festivalExp?.message} />
                  <InputField label="51. Scholarship" name="scholarship" type="number" placeholder="Amount" register={register} error={errors.scholarship?.message} />
                  <InputField label="52. Gift" name="gift" type="number" placeholder="Amount" register={register} error={errors.gift?.message} />
                  <InputField label="53. Donation" name="donation" type="number" placeholder="Amount" register={register} error={errors.donation?.message} />
                  <InputField label="54. Audit fee" name="auditFee" type="number" placeholder="Amount" register={register} error={errors.auditFee?.message} />
                  <InputField label="55. Salary/Remuneration paid to Partners of the firm" name="salaryPartners" type="number" placeholder="Amount" register={register} error={errors.salaryPartners?.message} />
                  <InputField label="56. Other expenses (specify nature and amount)" name="otherExpenses" type="number" placeholder="Amount" register={register} error={errors.otherExpenses?.message} />
                  
                  <div className="border-t border-gray-200 pt-2">
                    <label className="text-sm font-medium text-gray-600">Other Deductions</label>
                    <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                      <InputField label="i. Amount (specify)" name="deductionAmount" type="number" placeholder="Amount" register={register} error={errors.deductionAmount?.message} />
                      <InputField label="ii. Amount (specify)" name="deductionAmount2" type="number" placeholder="Amount" register={register} error={errors.deductionAmount2?.message} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bad Debts and Provisions */}
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">57. Bad debts (specify PAN Aadhaar No. of the persons of available, for whose bad Debt for amount of its H(i))</h4>
              <InputField label="57. Bad debts amount" name="badDebts" type="number" placeholder="Amount" register={register} error={errors.badDebts?.message} />
            </div>

            {/* Depreciation */}
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">58. Provision for bad and doubtful debts</h4>
              <InputField label="58. Provision amount" name="provisionBadDebts" type="number" placeholder="Amount" register={register} error={errors.provisionBadDebts?.message} />
            </div>

            {/* Other Provisions */}
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">59. Other provisions</h4>
              <InputField label="59. Other provisions - Profit before interest, depreciation and taxes (15 - 18 to 21 + 22a - 23 - 24 to 29 - 30iii)" name="otherProvisions" type="number" placeholder="Amount" register={register} error={errors.otherProvisions?.message} />
            </div>

            {/* Depreciation */}
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">60. Depreciation and losses - (15 - 18 to 21 + 22a - 23 - 24 to 29 - 30ii)</h4>
              <InputField label="60. Depreciation amount" name="depreciation" type="number" placeholder="Amount" register={register} error={errors.depreciation?.message} />
            </div>

            {/* Profit Calculations */}
            <div className="space-y-2">
              <div className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-gray-800">
                Total Deductions =
                <span className="ml-2 font-semibold text-yellow-600">
                  {calculateTotal(["freightOutward", "consumptionStores", "powerAndFuelExp", "rents", "repairsBuilding", "repairsMachinery", "compensationEmployees", "salariesWages", "bonus", "medicalReimbursement", "leaveEncashment", "leaveTravelBenefits", "superannuationFund", "providentFund", "gratuityFund", "otherFund", "otherEmployeeBenefits", "insurance", "workersWelfare", "entertainment", "hospitality", "conference", "salesPromotion", "advertisement", "commissionExp", "royalty", "unionExciseDutyExp", "serviceTaxExp", "vatSalesTaxExp", "cess", "cgstExp", "sgstExp", "igstExp", "utgstExp", "otherTaxExp", "professionalFees", "hotelBoarding", "travellingExpenses", "foreignTravellingExp", "conveyance", "telephoneExp", "guestHouseExp", "clubExp", "festivalExp", "scholarship", "gift", "donation", "auditFee", "salaryPartners", "otherExpenses", "deductionAmount", "deductionAmount2", "badDebts", "provisionBadDebts", "otherProvisions", "depreciation"], watch)}
                </span>
              </div>

              <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
                Net profit/loss (Total income - Total deductions) =
                <span className="ml-2 font-semibold text-green-600">
                  {(() => {
                    const totalCredits = calculateTotal(["totalRevenueFromOperations", "closingStockFinishedGoods"], watch);
                    const totalDebits = calculateTotal(["openingStockFinishedGoods", "purchases", "carriageInward", "powerAndFuel", "otherDirectExpenses", "customDuty", "countervailingDuty", "specialAdditionalDuty", "unionExciseDuty", "serviceTaxPayable", "vatSalesTaxPayable", "cgstPayable", "sgstPayable", "igstPayable", "utgstPayable", "otherTaxPayable"], watch);
                    const cogs = parseFloat(watch("costOfGoodsProduced") || 0);
                    const grossProfit = totalCredits - totalDebits - cogs;
                    const otherIncome = calculateTotal(["rent", "commission", "dividendIncome", "interestIncome", "profitOnSaleFixedAssets", "profitOnSaleSecurities", "profitOnSaleInvestment", "profitForeignCurrency", "profitConversionInventory", "agriculturalIncome", "anyOtherIncomeSpec"], watch);
                    const totalIncome = grossProfit + otherIncome;
                    const totalDeductions = calculateTotal(["freightOutward", "consumptionStores", "powerAndFuelExp", "rents", "repairsBuilding", "repairsMachinery", "compensationEmployees", "salariesWages", "bonus", "medicalReimbursement", "leaveEncashment", "leaveTravelBenefits", "superannuationFund", "providentFund", "gratuityFund", "otherFund", "otherEmployeeBenefits", "insurance", "workersWelfare", "entertainment", "hospitality", "conference", "salesPromotion", "advertisement", "commissionExp", "royalty", "unionExciseDutyExp", "serviceTaxExp", "vatSalesTaxExp", "cess", "cgstExp", "sgstExp", "igstExp", "utgstExp", "otherTaxExp", "professionalFees", "hotelBoarding", "travellingExpenses", "foreignTravellingExp", "conveyance", "telephoneExp", "guestHouseExp", "clubExp", "festivalExp", "scholarship", "gift", "donation", "auditFee", "salaryPartners", "otherExpenses", "deductionAmount", "deductionAmount2", "badDebts", "provisionBadDebts", "otherProvisions", "depreciation"], watch);
                    return totalIncome - totalDeductions;
                  })()}
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

export default TradingAccount;
