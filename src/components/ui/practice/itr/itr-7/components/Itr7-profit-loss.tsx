import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface ProfitLossAccountProps {
  onCancel: () => void;
}

const ProfitLossAccount: React.FC<ProfitLossAccountProps> = ({
  onCancel,
}) => {
  const { register, watch } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "other_income",
    "operating_expenses",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Watch values for calculations
  const grossProfit = watch("pl_gross_profit") || 0;
  const rent = watch("pl_rent") || 0;
  const commission = watch("pl_commission") || 0;
  const dividendIncome = watch("pl_dividend_income") || 0;
  const interestIncome = watch("pl_interest_income") || 0;
  const profitSaleFixedAssets = watch("pl_profit_sale_fixed_assets") || 0;
  const profitSecuritiesTransaction = watch("pl_profit_securities_transaction") || 0;
  const profitOtherInvestment = watch("pl_profit_other_investment") || 0;
  const gainForeignExchange = watch("pl_gain_foreign_exchange") || 0;
  const profitInventoryConversion = watch("pl_profit_inventory_conversion") || 0;
  const agriculturalIncome = watch("pl_agricultural_income") || 0;
  const otherIncomeA = watch("pl_other_income_a") || 0;
  const otherIncomeB = watch("pl_other_income_b") || 0;
  const otherIncomeC = watch("pl_other_income_c") || 0;

  const freightOutward = watch("pl_freight_outward") || 0;
  const consumptionStores = watch("pl_consumption_stores") || 0;
  const powerFuel = watch("pl_power_fuel") || 0;
  const rents = watch("pl_rents") || 0;
  const repairsBuilding = watch("pl_repairs_building") || 0;
  const repairsmachinery = watch("pl_repairs_machinery") || 0;
  const compensationEmployees = watch("pl_compensation_employees") || 0;

  const salariesWages = watch("pl_salaries_wages") || 0;
  const bonus = watch("pl_bonus") || 0;
  const medicalExpenses = watch("pl_medical_expenses") || 0;
  const leaveEncashment = watch("pl_leave_encashment") || 0;
  const leaveTravel = watch("pl_leave_travel") || 0;
  const approvedWelfare = watch("pl_approved_welfare") || 0;
  const recognisedProvident = watch("pl_recognised_provident") || 0;
  const recognisedGratuity = watch("pl_recognised_gratuity") || 0;
  const contributionOtherFund = watch("pl_contribution_other_fund") || 0;
  const otherBenefitEmployees = watch("pl_other_benefit_employees") || 0;

  const medicalInsurance = watch("pl_medical_insurance") || 0;
  const lifeInsurance = watch("pl_life_insurance") || 0;
  const keymanInsurance = watch("pl_keyman_insurance") || 0;
  const otherInsurance = watch("pl_other_insurance") || 0;

  const workmenStaff = watch("pl_workmen_staff") || 0;
  const entertainment = watch("pl_entertainment") || 0;
  const hospitality = watch("pl_hospitality") || 0;
  const conference = watch("pl_conference") || 0;
  const salesPromotion = watch("pl_sales_promotion") || 0;
  const advertisement = watch("pl_advertisement") || 0;

  const commissionPaidI = watch("pl_commission_paid_i") || 0;
  const commissionPaidII = watch("pl_commission_paid_ii") || 0;
  const royaltyPaidI = watch("pl_royalty_paid_i") || 0;
  const royaltyPaidII = watch("pl_royalty_paid_ii") || 0;
  const professionalFeesI = watch("pl_professional_fees_i") || 0;
  const professionalFeesII = watch("pl_professional_fees_ii") || 0;

  const hotelBoarding = watch("pl_hotel_boarding") || 0;
  const travellingExpenses = watch("pl_travelling_expenses") || 0;
  const foreignTravelling = watch("pl_foreign_travelling") || 0;
  const conveyanceExpenses = watch("pl_conveyance_expenses") || 0;
  const telephoneExpenses = watch("pl_telephone_expenses") || 0;
  const guestHouseExpenses = watch("pl_guest_house_expenses") || 0;
  const clubExpenses = watch("pl_club_expenses") || 0;
  const festivalCelebration = watch("pl_festival_celebration") || 0;
  const scholarship = watch("pl_scholarship") || 0;
  const gift = watch("pl_gift") || 0;
  const donation = watch("pl_donation") || 0;

  const unionExciseDuty = watch("pl_union_excise_duty") || 0;
  const servicesTax = watch("pl_services_tax") || 0;
  const vatSalesTax = watch("pl_vat_sales_tax") || 0;
  const cgst = watch("pl_cgst") || 0;
  const sgst = watch("pl_sgst") || 0;
  const igst = watch("pl_igst") || 0;
  const utgst = watch("pl_utgst") || 0;
  const otherTax = watch("pl_other_tax") || 0;

  const auditFee = watch("pl_audit_fee") || 0;
  const otherExpensesI = watch("pl_other_expenses_i") || 0;
  const otherExpensesII = watch("pl_other_expenses_ii") || 0;

  // Calculations
  const totalOtherIncome =
    rent +
    commission +
    dividendIncome +
    interestIncome +
    profitSaleFixedAssets +
    profitSecuritiesTransaction +
    profitOtherInvestment +
    gainForeignExchange +
    profitInventoryConversion +
    agriculturalIncome +
    otherIncomeA +
    otherIncomeB +
    otherIncomeC;

  const totalCompensation = salariesWages + bonus + medicalExpenses + leaveEncashment + leaveTravel + approvedWelfare + recognisedProvident + recognisedGratuity + contributionOtherFund + otherBenefitEmployees;

  const totalInsurance = medicalInsurance + lifeInsurance + keymanInsurance + otherInsurance;

  const totalOperatingExpenses =
    freightOutward +
    consumptionStores +
    powerFuel +
    rents +
    repairsBuilding +
    repairsmachinery +
    compensationEmployees +
    totalCompensation +
    totalInsurance +
    workmenStaff +
    entertainment +
    hospitality +
    conference +
    salesPromotion +
    advertisement +
    commissionPaidI +
    commissionPaidII +
    royaltyPaidI +
    royaltyPaidII +
    professionalFeesI +
    professionalFeesII +
    hotelBoarding +
    travellingExpenses +
    foreignTravelling +
    conveyanceExpenses +
    telephoneExpenses +
    guestHouseExpenses +
    clubExpenses +
    festivalCelebration +
    scholarship +
    gift +
    donation +
    unionExciseDuty +
    servicesTax +
    vatSalesTax +
    cgst +
    sgst +
    igst +
    utgst +
    otherTax +
    auditFee +
    otherExpensesI +
    otherExpensesII;

  const profitAfterOperatingExpenses = grossProfit + totalOtherIncome - totalOperatingExpenses;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form onSubmit={(e) => e.preventDefault()} className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            PART A-P&L: PROFIT AND LOSS ACCOUNT
          </h1>
          <p className="text-gray-600 text-sm">
            For the financial year 2024-25 (Fill items 13 to 60 in a case where regular books of account are maintained, otherwise fill items 6i to 62 as applicable)
          </p>
        </div>

        {/* Gross Profit from Trading Account */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            13. GROSS PROFIT TRANSFERRED FROM TRADING ACCOUNT
          </h2>
          <div className="bg-purple-50 p-4 rounded">
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("pl_gross_profit")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* OTHER INCOME */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            14. OTHER INCOME
          </h2>

          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("other_income")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-semibold text-blue-900"
            >
              <span>Other Income Details (i to xi)</span>
              <span className="text-xl">
                {expandedSections.includes("other_income") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("other_income") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Rent
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_rent")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Commission
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_commission")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Dividend income
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_dividend_income")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. Interest income
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_interest_income")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      v. Profit on sale of fixed assets
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_profit_sale_fixed_assets")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vi. Profit on sale of investment
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_profit_securities_transaction")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vii. Profit on sale of other investment
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_profit_other_investment")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      viii. Gain (loss) on account of foreign exchange fluctuation u/s 43AA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_gain_foreign_exchange")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ix. Profit on conversion of inventory into capital asset
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_profit_inventory_conversion")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      x. Agricultural income
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_agricultural_income")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      xi. Any other income (specify nature and amount)
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
                      {...register("pl_other_income_a")}
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
                      {...register("pl_other_income_b")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      &nbsp;&nbsp;c.
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("pl_other_income_c")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 bg-blue-50 p-4 rounded">
                    <label className="block text-sm font-semibold text-blue-900">
                      xii. Total of other income (i + ii + iii + iv + v + vi + vii + viii + ix + x + xia + xib + xic)
                    </label>
                    <p className="text-lg font-bold text-blue-700 mt-2">
                      ₹ {totalOtherIncome.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OPERATING EXPENSES */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            15 TO 46. OPERATING AND OTHER EXPENSES
          </h2>

          <div className="space-y-4">
            {/* Line 15 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                15. Total of credits to profit and loss account (13+14)
              </label>
              <p className="text-lg font-bold text-green-700">
                ₹ {(grossProfit + totalOtherIncome).toFixed(2)}
              </p>
            </div>

            {/* Line 16 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                16. Freight outward
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_freight_outward")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 17 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                17. Consumption of stores and spare parts
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_consumption_stores")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 18 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                18. Power and fuel
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_power_fuel")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 19 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                19. Rents
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_rents")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 20 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                20. Repairs to building
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_repairs_building")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 21 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                21. Repairs to machinery
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_repairs_machinery")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 22 - Compensation to employees */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                22. Compensation to employees
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-4 border-l-2 border-gray-300">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    i. Salaries and wages
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_salaries_wages")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ii. Bonus
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_bonus")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    iii. Reimbursement of medical expenses
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_medical_expenses")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    iv. Leave encashment
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_leave_encashment")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    v. Leave travel benefits
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_leave_travel")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    vi. Contribution to approved welfare fund
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_approved_welfare")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    vii. Contribution to recognised provident fund
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_recognised_provident")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    viii. Contribution to recognised gratuity fund
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_recognised_gratuity")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ix. Contribution to any other fund
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_contribution_other_fund")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    x. Any other benefit to employees
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_other_benefit_employees")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 bg-green-50 p-3 rounded">
                  <label className="block text-sm font-semibold text-green-900">
                    xi. Total compensation to employees
                  </label>
                  <p className="text-lg font-bold text-green-700 mt-1">
                    ₹ {totalCompensation.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Line 23 - Insurance */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                23. Insurance
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-4 border-l-2 border-gray-300">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    i. Medical Insurance
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_medical_insurance")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ii. Life Insurance
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_life_insurance")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    iii. Keyman's Insurance
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_keyman_insurance")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    iv. Other Insurance including factory, office, car, goods, etc.
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_other_insurance")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2 bg-green-50 p-3 rounded">
                  <label className="block text-sm font-semibold text-green-900">
                    v. Total expenditure on insurance
                  </label>
                  <p className="text-lg font-bold text-green-700 mt-1">
                    ₹ {totalInsurance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Lines 24-30 */}
            <div className="grid grid-cols-1 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  24. Workmen and staff welfare expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_workmen_staff")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  25. Entertainment
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_entertainment")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  26. Hospitality
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_hospitality")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  27. Conference
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_conference")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  28. Sales promotion including publicity (other than advertisement)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_sales_promotion")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  29. Advertisement
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_advertisement")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Line 30 - Commission, Royalty, Professional Fees - collapsed for now */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                30. Commission (Paid outside India / To others)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    i. Paid outside India
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_commission_paid_i")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    ii. To others
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_commission_paid_ii")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Line 31 - Royalty */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                31. Royalty
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    i. Paid outside India
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_royalty_paid_i")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    ii. To others
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_royalty_paid_ii")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Line 32 - Professional Fees */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                32. Professional / Consultancy fees / Fee for technical services
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    i. Paid outside India
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_professional_fees_i")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    ii. To others
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_professional_fees_ii")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Lines 33-43 - Other Expenses */}
            <div className="grid grid-cols-1 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  33. Hotel, boarding and Lodging
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_hotel_boarding")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  34. Traveling expenses other than on foreign traveling
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_travelling_expenses")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  35. Foreign travelling expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_foreign_travelling")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  36. Conveyance expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_conveyance_expenses")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  37. Telephone expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_telephone_expenses")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  38. Guest House expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_guest_house_expenses")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  39. Club expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_club_expenses")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  40. Festival celebration expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_festival_celebration")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  41. Scholarship
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_scholarship")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  42. Gift
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_gift")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  43. Donation
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("pl_donation")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Line 44 - Rates and taxes */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                44. Rates and taxes, paid or payable to Government or any local body (excluding taxes on income)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-4 border-l-2 border-gray-300">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    i. Union excise duty
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_union_excise_duty")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    ii. Service tax
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_services_tax")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    iii. VAT/ Sales tax
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_vat_sales_tax")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    iv. CGST
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_cgst")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    v. SGST
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_sgst")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    vi. IGST
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_igst")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    vii. UTGST
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_utgst")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    viii. Any other rate, tax, duty or cess
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_other_tax")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Line 45 - Audit fee */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                45. Audit fee
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("pl_audit_fee")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Line 46 - Other expenses */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                46. Other expenses (specify nature and amount)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    i.
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_other_expenses_i")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    ii.
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("pl_other_expenses_ii")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Total Operating Expenses Summary */}
          <div className="mt-8 border-2 border-green-300 rounded-lg bg-green-50 p-6">
            <label className="block text-sm font-semibold text-green-900 mb-2">
              Total Operating Expenses (16 to 46)
            </label>
            <p className="text-2xl font-bold text-green-900">
              ₹ {totalOperatingExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* PROFIT AFTER OPERATING EXPENSES */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            PROFIT / LOSS AFTER OPERATING EXPENSES
          </h2>
          <div className="bg-red-50 p-6 rounded">
            <p className="text-2xl font-bold text-red-900">
              ₹ {profitAfterOperatingExpenses.toFixed(2)}
            </p>
            <p className="text-sm text-red-700 mt-2">
              (Gross Profit + Other Income - Operating Expenses)
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
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfitLossAccount;
