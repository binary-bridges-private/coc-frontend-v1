import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== TYPE DEFINITIONS ====================

export interface ScheduleBPFormData {
  // Section A: Profit before tax
  profitBeforeTaxPAL?: string;         // 1 - From P&L account
  specNetProfitLoss?: string;          // 2a - Net profit/loss from speculative business
  specNetProfitLossU35AD?: string;     // 2b - Net profit/loss u/s 35AD

  // Section B: Income/receipts credited to profit and loss
  salariesIncome?: string;              // 3a
  housePropertyIncome?: string;         // 3b
  capitalGains?: string;                // 3c
  otherSources?: string;                // 3d
  dividendIncome?: string;              // 3di
  otherDividendIncome?: string;         // 3dii
  u115BBGIncome?: string;               // 3f - u/s 115BBG
  u115BBGNetCost?: string;              // 3g - u/s 115BBG (net of cost acquisition)

  // Section C: Profit/loss included
  profitLossU44ADA?: string;            // 4a - u/s 44AD/44ADA/44AE/44AF/44B
  profitActivityCovered?: string;       // 4b - Activities u/s 7A, 7B(1), 7B(1A), 8

  // Section D: Income exempt
  shareOfIncome?: string;               // 5a - Share of income
  shareOfIncomePercentage?: string;     // 5b - Share %

  // Section E: Exempt income details
  anyOtherExemptIncome?: string;        // c1
  anyOtherExemptIncome2?: string;       // c2
  totalExemptIncome?: string;           // Total (c1 + c2)
  totalExemptIncomePct?: string;        // c3 - Total exempt income %

  // Section F: Balance calculation
  balanceCalculation?: string;          // k - Balance (1-2a-2b-3a-3b-3c-3d-3e-3f-3g-4a-4b-5a-5b)

  // Section G: Expenses debited
  expensesDebited?: string;             // 8a - Expenses debited to profit and loss
  expensesDebitedExempt?: string;       // 8b - Expenses debited relating to exempt income
  totalExpenses?: string;               // 9 - Total (7a + 7b + 7c + 7d + 7e + 7f + 7g + 8a + 8b)

  // Section H: Adjusted profit/loss
  adjustedProfitLoss?: string;          // 10 - Adjusted profit or loss (6+9)

  // Section I: Depreciation
  depreciationAllowable?: string;       // 11 - Depreciation and amortization
  depreciationUnderIncomeTax?: string;  // 12i - u/s 32(1)(ii) and 32(1)(iia)
  depreciationAllowableITA?: string;    // 12ii - u/s 32(1)(ii) ITA
  totalDepreciationCalc?: string;       // 12iii - Make own computation

  // Section J: Profit/loss after depreciation
  profitAfterDepreciation?: string;     // 13 - Profit or loss after adjustment

  // Section K: Disallowed amounts
  amountsDisallowedU16?: string;        // 14 - u/s 26(6) of Part A-II
  amountsDisallowedU37?: string;        // 15 - u/s 37 of Part A-II
  amountsDisallowedU40?: string;        // 16 - u/s 40 of Part A-II
  amountsDisallowedU40A?: string;       // 17 - u/s 40A of Part A-II
  amountsPreviousYear?: string;         // 18 - Previous year disallowed under 43B
  interestDisallowable?: string;        // 19 - Interest disallowable u/s 23 (Micro, Small and Medium)

  // Section L: Deemed income
  deemedU41?: string;                   // 20 - u/s 41
  deemedU32?: string;                   // 21 - u/s 32AD 33AB/33AC/35RA/35AB/40(a)(ia) etc
  deemedU43CA?: string;                 // 22 - u/s 43CA
  otherAdditionU28?: string;            // 23 - u/s 28 to 44DA

  // Section M: Reconciliation
  reconciliationProfit?: string;        // 25 - Reconciliation of profit
  totalAdditions?: string;              // 26 - Total (15+16+17+18+19+20+21+22+23+24+25+26)

  // Section N: Income calculation
  incomeBusinessProfit?: string;        // 27 - Income from business/profession
  totalIncome?: string;                 // 27 - Total Income (26+27+28)

  // Section O: Loss set-off
  currentYearLoss?: string;             // (437) - Income of current year (FIll if positive)
  specLossSetOff?: string;              // (437) - Speculative business loss set off
  otherSpecLossSetOff?: string;         // (437) - Other specified business loss set off
  totalLossSetOff?: string;             // Loss set off total
  remainingLoss?: string;               // Remaining loss to be carried forward
}

const scheduleBPSchema = z.object({
  profitBeforeTaxPAL: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),

  specNetProfitLoss: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),

  specNetProfitLossU35AD: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),

  // Income/receipts credited
  salariesIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  housePropertyIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  capitalGains: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),

  otherSources: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  dividendIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  otherDividendIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  u115BBGIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  u115BBGNetCost: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  profitLossU44ADA: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),

  profitActivityCovered: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),

  shareOfIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  shareOfIncomePercentage: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, "Must be between 0 and 100"),

  anyOtherExemptIncome: z.string().optional().or(z.literal("")),
  anyOtherExemptIncome2: z.string().optional().or(z.literal("")),
  totalExemptIncome: z.string().optional().or(z.literal("")),
  totalExemptIncomePct: z.string().optional().or(z.literal("")),
  balanceCalculation: z.string().optional().or(z.literal("")),
  expensesDebited: z.string().optional().or(z.literal("")),
  expensesDebitedExempt: z.string().optional().or(z.literal("")),
  totalExpenses: z.string().optional().or(z.literal("")),
  adjustedProfitLoss: z.string().optional().or(z.literal("")),
  depreciationAllowable: z.string().optional().or(z.literal("")),
  depreciationUnderIncomeTax: z.string().optional().or(z.literal("")),
  depreciationAllowableITA: z.string().optional().or(z.literal("")),
  totalDepreciationCalc: z.string().optional().or(z.literal("")),
  profitAfterDepreciation: z.string().optional().or(z.literal("")),
  amountsDisallowedU16: z.string().optional().or(z.literal("")),
  amountsDisallowedU37: z.string().optional().or(z.literal("")),
  amountsDisallowedU40: z.string().optional().or(z.literal("")),
  amountsDisallowedU40A: z.string().optional().or(z.literal("")),
  amountsPreviousYear: z.string().optional().or(z.literal("")),
  interestDisallowable: z.string().optional().or(z.literal("")),
  deemedU41: z.string().optional().or(z.literal("")),
  deemedU32: z.string().optional().or(z.literal("")),
  deemedU43CA: z.string().optional().or(z.literal("")),
  otherAdditionU28: z.string().optional().or(z.literal("")),
  reconciliationProfit: z.string().optional().or(z.literal("")),
  totalAdditions: z.string().optional().or(z.literal("")),
  incomeBusinessProfit: z.string().optional().or(z.literal("")),
  totalIncome: z.string().optional().or(z.literal("")),
  currentYearLoss: z.string().optional().or(z.literal("")),
  specLossSetOff: z.string().optional().or(z.literal("")),
  otherSpecLossSetOff: z.string().optional().or(z.literal("")),
  totalLossSetOff: z.string().optional().or(z.literal("")),
  remainingLoss: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  // Calculate balance (Section F)
  const pal = parseFloat(data.profitBeforeTaxPAL || "0") || 0;
  const spec2a = parseFloat(data.specNetProfitLoss || "0") || 0;
  const spec2b = parseFloat(data.specNetProfitLossU35AD || "0") || 0;
  const income3a = parseFloat(data.salariesIncome || "0") || 0;
  const income3b = parseFloat(data.housePropertyIncome || "0") || 0;
  const income3c = parseFloat(data.capitalGains || "0") || 0;
  const income3d = parseFloat(data.otherSources || "0") || 0;
  const income3di = parseFloat(data.dividendIncome || "0") || 0;
  const income3dii = parseFloat(data.otherDividendIncome || "0") || 0;
  const income3f = parseFloat(data.u115BBGIncome || "0") || 0;
  const income3g = parseFloat(data.u115BBGNetCost || "0") || 0;
  const profit4a = parseFloat(data.profitLossU44ADA || "0") || 0;
  const profit4b = parseFloat(data.profitActivityCovered || "0") || 0;
  const share5a = parseFloat(data.shareOfIncome || "0") || 0;

  // Total income credited
  const totalIncomeCredited =
    income3a +
    income3b +
    income3c +
    income3d +
    income3di +
    income3dii +
    income3f +
    income3g +
    profit4a +
    profit4b +
    share5a;

  // Balance = PAL - spec losses - income credited
  const balance = pal - spec2a - spec2b - totalIncomeCredited;

  // Profit from business = balance + expenses
  const expenses = parseFloat(data.totalExpenses || "0") || 0;
  const profitFromBusiness = Math.max(0, balance + expenses);

  // Total additions
  const additions = parseFloat(data.totalAdditions || "0") || 0;

  // Final income = profit + additions
  const finalIncome = profitFromBusiness + additions;

  console.log("📊 Schedule BP Calculation Details:", {
    profitBeforeTaxPAL: pal,
    totalIncomeCredited: totalIncomeCredited,
    balance: balance,
    expenses: expenses,
    profitFromBusiness: profitFromBusiness,
    totalAdditions: additions,
    finalIncome: finalIncome,
  });
});

type ScheduleBPFormType = z.infer<typeof scheduleBPSchema>;

// ==================== REACT COMPONENT ====================

interface ScheduleBPProps {
  initialData?: ScheduleBPFormData;
  onSave: (data: ScheduleBPFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleBP({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleBPProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ScheduleBPFormType>({
    resolver: zodResolver(scheduleBPSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const formValues = watch();

  // Calculate all derived values
  const calculations = useMemo(() => {
    const pal = parseFloat(formValues.profitBeforeTaxPAL || "0") || 0;
    const spec2a = parseFloat(formValues.specNetProfitLoss || "0") || 0;
    const spec2b = parseFloat(formValues.specNetProfitLossU35AD || "0") || 0;

    const income3a = parseFloat(formValues.salariesIncome || "0") || 0;
    const income3b = parseFloat(formValues.housePropertyIncome || "0") || 0;
    const income3c = parseFloat(formValues.capitalGains || "0") || 0;
    const income3d = parseFloat(formValues.otherSources || "0") || 0;
    const income3di = parseFloat(formValues.dividendIncome || "0") || 0;
    const income3dii = parseFloat(formValues.otherDividendIncome || "0") || 0;
    const income3f = parseFloat(formValues.u115BBGIncome || "0") || 0;
    const income3g = parseFloat(formValues.u115BBGNetCost || "0") || 0;

    const profit4a = parseFloat(formValues.profitLossU44ADA || "0") || 0;
    const profit4b = parseFloat(formValues.profitActivityCovered || "0") || 0;
    const share5a = parseFloat(formValues.shareOfIncome || "0") || 0;

    const totalIncomeCredited =
      income3a +
      income3b +
      income3c +
      income3d +
      income3di +
      income3dii +
      income3f +
      income3g +
      profit4a +
      profit4b +
      share5a;

    const balance = pal - spec2a - spec2b - totalIncomeCredited;

    const expenses = parseFloat(formValues.totalExpenses || "0") || 0;
    const depreciation = parseFloat(formValues.totalDepreciationCalc || "0") || 0;
    const profitFromBusiness = Math.max(0, balance + expenses + depreciation);

    const additions = parseFloat(formValues.totalAdditions || "0") || 0;
    const finalIncome = profitFromBusiness + additions;

    return {
      totalIncomeCredited: totalIncomeCredited.toFixed(2),
      balance: balance.toFixed(2),
      expenses: expenses.toFixed(2),
      depreciation: depreciation.toFixed(2),
      profitFromBusiness: profitFromBusiness.toFixed(2),
      additions: additions.toFixed(2),
      finalIncome: finalIncome.toFixed(2),
    };
  }, [formValues]);

  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ScheduleBPFormType) => {
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            Schedule BP - Computation of Income from Business or Profession
          </h1>
          <p className="text-red-700">
            Compute total business income including adjustments and deductions
          </p>
        </div>

        {/* Error Banner */}
        {allErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="text-red-900 font-bold mb-2">
              ⚠️ Please correct {allErrors.length} error(s):
            </h3>
            <ul className="text-red-800 text-sm space-y-1 max-h-32 overflow-y-auto">
              {allErrors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section A: Profit before Tax */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-red-900 mb-4">
              Section A: Profit Before Tax
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (1) Profit before tax as per profit and loss account (PAL)
                </label>
                <input
                  {...register("profitBeforeTaxPAL")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.profitBeforeTaxPAL
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
                />
                {errors.profitBeforeTaxPAL && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.profitBeforeTaxPAL.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (2a) Net profit/loss from speculative business u/s 73(1)
                </label>
                <input
                  {...register("specNetProfitLoss")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.specNetProfitLoss
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
                />
                {errors.specNetProfitLoss && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specNetProfitLoss.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (2b) Net profit/loss from specified business u/s 35AD
                </label>
                <input
                  {...register("specNetProfitLossU35AD")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.specNetProfitLossU35AD
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-red-500"
                  }`}
                />
                {errors.specNetProfitLossU35AD && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specNetProfitLossU35AD.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section B: Income/Receipts Credited */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Section B: Income/Receipts Credited to Profit and Loss
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3a) Salaries
                  </label>
                  <input
                    {...register("salariesIncome")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.salariesIncome
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.salariesIncome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salariesIncome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3b) House Property
                  </label>
                  <input
                    {...register("housePropertyIncome")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.housePropertyIncome
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.housePropertyIncome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.housePropertyIncome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3c) Capital Gains
                  </label>
                  <input
                    {...register("capitalGains")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.capitalGains
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.capitalGains && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.capitalGains.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3d) Other Sources
                  </label>
                  <input
                    {...register("otherSources")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.otherSources
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.otherSources && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otherSources.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3di) Dividend Income
                  </label>
                  <input
                    {...register("dividendIncome")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.dividendIncome
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.dividendIncome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dividendIncome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3dii) Other Dividend Income
                  </label>
                  <input
                    {...register("otherDividendIncome")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.otherDividendIncome
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.otherDividendIncome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.otherDividendIncome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3f) u/s 115BBG
                  </label>
                  <input
                    {...register("u115BBGIncome")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.u115BBGIncome
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.u115BBGIncome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.u115BBGIncome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3g) u/s 115BBG (net of cost)
                  </label>
                  <input
                    {...register("u115BBGNetCost")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.u115BBGNetCost
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.u115BBGNetCost && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.u115BBGNetCost.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (4a) Profit/loss u/s 44AD/44ADA/44AE/44AF/44B
                  </label>
                  <input
                    {...register("profitLossU44ADA")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.profitLossU44ADA
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.profitLossU44ADA && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profitLossU44ADA.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (4b) Activities covered u/s 7A, 7B(1), 7B(1A), 8
                  </label>
                  <input
                    {...register("profitActivityCovered")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.profitActivityCovered
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.profitActivityCovered && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profitActivityCovered.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (5a) Share of Income
                  </label>
                  <input
                    {...register("shareOfIncome")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.shareOfIncome
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.shareOfIncome && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.shareOfIncome.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (5b) Share of Income %
                  </label>
                  <input
                    {...register("shareOfIncomePercentage")}
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.shareOfIncomePercentage
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.shareOfIncomePercentage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.shareOfIncomePercentage.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Key Calculations Display */}
          <div className="bg-gradient-to-r from-red-50 to-rose-100 rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h3 className="text-lg font-bold text-red-900 mb-4">
              Key Calculations
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">Total Income Credited</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{parseFloat(calculations.totalIncomeCredited).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{parseFloat(calculations.balance).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <p className="text-sm text-gray-600">Profit from Business</p>
                <p className="text-2xl font-bold text-orange-900">
                  ₹{parseFloat(calculations.profitFromBusiness).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-sm text-gray-600">Final Income</p>
                <p className="text-2xl font-bold text-green-900">
                  ₹{parseFloat(calculations.finalIncome).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Section D: Expenses and Depreciation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Section D: Expenses & Depreciation
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (8a) Expenses debited to profit and loss
                </label>
                <input
                  {...register("expensesDebited")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (8b) Expenses relating to exempt income
                </label>
                <input
                  {...register("expensesDebitedExempt")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (9) Total Expenses
                </label>
                <input
                  {...register("totalExpenses")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (11) Depreciation Allowable
                </label>
                <input
                  {...register("depreciationAllowable")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (12iii) Total Depreciation Calculation
                </label>
                <input
                  {...register("totalDepreciationCalc")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Section E: Disallowed Amounts */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-bold text-orange-900 mb-4">
              Section E: Disallowed & Other Amounts
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (14) Amounts disallowed u/s 26(6)
                </label>
                <input
                  {...register("amountsDisallowedU16")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (15) Amounts disallowed u/s 37
                </label>
                <input
                  {...register("amountsDisallowedU37")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (16) Amounts disallowed u/s 40
                </label>
                <input
                  {...register("amountsDisallowedU40")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (17) Amounts disallowed u/s 40A
                </label>
                <input
                  {...register("amountsDisallowedU40A")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (18) Previous year disallowed u/s 43B
                </label>
                <input
                  {...register("amountsPreviousYear")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (19) Interest disallowable u/s 23
                </label>
                <input
                  {...register("interestDisallowable")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (20) Deemed income u/s 41
                </label>
                <input
                  {...register("deemedU41")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (26) Total Additions
                </label>
                <input
                  {...register("totalAdditions")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
