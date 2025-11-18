import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface TradingAccountProps {
  onCancel: () => void;
}

const TradingAccountComponent: React.FC<TradingAccountProps> = ({
  onCancel,
}) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "revenue_from_operations",
    "duties_taxes",
    "cost_of_goods",
    "profit_calculation",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Watch values for calculations
  const saleOfGoods = watch("trd_sale_of_goods") || 0;
  const saleOfServices = watch("trd_sale_of_services") || 0;
  const otherOperatingRevenues_a = watch("trd_other_operating_revenues_a") || 0;
  const otherOperatingRevenues_b = watch("trd_other_operating_revenues_b") || 0;

  const grossReceiptsProfession = watch("trd_gross_receipts_profession") || 0;

  const customDuty = watch("trd_custom_duty") || 0;
  const counterVellingDuty = watch("trd_counter_velling_duty") || 0;
  const servicesTax = watch("trd_services_tax") || 0;
  const vat_sales_tax = watch("trd_vat_sales_tax") || 0;
  const cgst = watch("trd_cgst") || 0;
  const sgst = watch("trd_sgst") || 0;
  const igst = watch("trd_igst") || 0;
  const utgst = watch("trd_utgst") || 0;

  const closingStockFinishedGoods = watch("trd_closing_stock_finished_goods") || 0;
  const creditsToTrading = watch("trd_total_credits_trading_account") || 0;
  const openingStockFinishedGoods = watch("trd_opening_stock_finished_goods") || 0;
  const purchasesNetOfRefunds = watch("trd_purchases_net_of_refunds") || 0;
  const carriageInwardTrading = watch("trd_carriage_inward_trading") || 0;
  const powerFuelTrading = watch("trd_power_and_fuel_trading") || 0;
  const otherDirectExpensesTrading = watch("trd_other_direct_expenses_trading") || 0;

  // Calculations
  const totalOtherOperatingRevenues = otherOperatingRevenues_a + otherOperatingRevenues_b;

  const totalRevenueFromOperations = saleOfGoods + saleOfServices + totalOtherOperatingRevenues;

  const totalTaxesOnGoods = customDuty + counterVellingDuty + servicesTax + vat_sales_tax;

  const totalTaxesOnServices = cgst + sgst + igst + utgst;

  const totalTaxesDuties = totalTaxesOnGoods + totalTaxesOnServices;

  const totalRevenueFromOperationsLine = totalRevenueFromOperations + grossReceiptsProfession - totalTaxesDuties;

  const costOfGoodsExempt = totalRevenueFromOperations + closingStockFinishedGoods - creditsToTrading;

  const totalCostOfGoods = openingStockFinishedGoods + purchasesNetOfRefunds + carriageInwardTrading + powerFuelTrading + otherDirectExpensesTrading;

  const grossProfit = totalRevenueFromOperationsLine - totalCostOfGoods;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form onSubmit={(e) => e.preventDefault()} className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            PART A - TRADING ACCOUNT
          </h1>
          <p className="text-gray-600 text-sm">
            For the financial year 2024-25 (Fill items 4 to 12 in a case where regular books of account are maintained, otherwise fill items 6i to 62 as applicable)
          </p>
        </div>

        {/* REVENUE FROM OPERATIONS */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            4A. REVENUE FROM OPERATIONS
          </h2>

          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("revenue_from_operations")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-semibold text-blue-900"
            >
              <span>Sales / Gross receipts of business (net of returns and refunds and duty or tax, if any)</span>
              <span className="text-xl">
                {expandedSections.includes("revenue_from_operations") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("revenue_from_operations") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Sale of goods
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_sale_of_goods")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Sale of services
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_sale_of_services")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Other operating revenues (specify nature and amount)
                    </label>
                  </div>
                  <div></div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      &nbsp;&nbsp;a.
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_other_operating_revenues_a")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      &nbsp;&nbsp;b.
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_other_operating_revenues_b")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 bg-blue-50 p-4 rounded">
                    <label className="block text-sm font-semibold text-blue-900">
                      c. Total (iii a + iiib)
                    </label>
                    <p className="text-lg font-bold text-blue-700 mt-2">
                      ₹ {totalOtherOperatingRevenues.toFixed(2)}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. Total (i + ii + iiic) = AIV
                    </label>
                    <p className="text-lg font-bold text-blue-900 bg-blue-100 p-3 rounded">
                      ₹ {totalRevenueFromOperations.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* B. Gross receipts from Profession */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("profession_receipts")}
              className="w-full px-6 py-4 bg-cyan-50 hover:bg-cyan-100 transition-colors flex items-center justify-between font-semibold text-cyan-900"
            >
              <span>B. Gross receipts from Profession</span>
              <span className="text-xl">
                {expandedSections.includes("profession_receipts") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("profession_receipts") && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gross receipts from Profession = B
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("trd_gross_receipts_profession")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* C. Duties, taxes and cess */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("duties_taxes")}
              className="w-full px-6 py-4 bg-teal-50 hover:bg-teal-100 transition-colors flex items-center justify-between font-semibold text-teal-900"
            >
              <span>C. Duties, taxes and cess received or receivable in respect of goods and services sold or supplied</span>
              <span className="text-xl">
                {expandedSections.includes("duties_taxes") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("duties_taxes") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Union Excise duties
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_custom_duty")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Counter velling duty
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_counter_velling_duty")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Service tax
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_services_tax")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. VAT/ Sales tax
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_vat_sales_tax")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      v. CGST
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_cgst")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vi. SGST
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_sgst")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vii. IGST
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_igst")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      viii. UTGST
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("trd_utgst")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 bg-teal-50 p-4 rounded">
                    <label className="block text-sm font-semibold text-teal-900">
                      ix. Total (i+ii+iii+iv+v+vi+vii+viii) = C:ix
                    </label>
                    <p className="text-lg font-bold text-teal-700 mt-2">
                      ₹ {totalTaxesDuties.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* D. Total Revenue from operations */}
          <div className="mb-8 border-2 border-blue-300 rounded-lg bg-blue-50 p-6">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              D. Total Revenue from operations (AIv + B - C:ix)
            </label>
            <p className="text-2xl font-bold text-blue-900">
              ₹ {totalRevenueFromOperationsLine.toFixed(2)}
            </p>
          </div>
        </div>

        {/* COST OF GOODS SOLD */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            COST OF GOODS SOLD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                5. Closing Stock of Finished Goods
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_closing_stock_finished_goods")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                6. Total of credits to Trading Account (4D - 5)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_total_credits_trading_account")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                7. Opening Stock of Finished Goods
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_opening_stock_finished_goods")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                8. Purchases (net of refunds and duty or tax, if any)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_purchases_net_of_refunds")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                9. Direct Expenses (Di + Dii + Diii)
              </label>
            </div>
            <div></div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                &nbsp;&nbsp;i. Carriage inward
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_carriage_inward_trading")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                &nbsp;&nbsp;ii. Power and fuel
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_power_and_fuel_trading")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                &nbsp;&nbsp;iii. Other direct expenses (specify)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("trd_other_direct_expenses_trading")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded mb-6">
            <label className="block text-sm font-semibold text-green-900 mb-2">
              Total Cost of Goods
            </label>
            <p className="text-xl font-bold text-green-700">
              ₹ {totalCostOfGoods.toFixed(2)}
            </p>
          </div>
        </div>

        {/* GROSS PROFIT */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            12. GROSS PROFIT FROM BUSINESS/PROFESSION - transferred to Profit and Loss account
          </h2>

          <div className="bg-red-50 p-6 rounded">
            <p className="text-2xl font-bold text-red-900">
              ₹ {grossProfit.toFixed(2)}
            </p>
            <p className="text-sm text-red-700 mt-2">
              (Total Revenue from Operations - Total Cost of Goods)
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end mb-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradingAccountComponent;
