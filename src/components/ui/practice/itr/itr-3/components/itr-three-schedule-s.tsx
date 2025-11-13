import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== ZIRP TYPE DEFINITIONS ====================

export interface ScheduleSFormData {
  employerName?: string;
  employerTIN?: string;
  employerAddress?: string;
  employerCity?: string;
  employerState?: string;
  employerPinCode?: string;
  
  // Salary Details (1a)
  grossSalary?: string;
  
  // Deductions
  salaryU17?: string;           // (a) - Section 17(1)
  perquisitesU17?: string;      // (b) - Section 17(2)
  profitInLieuU17?: string;     // (c) - Section 17(3)
  retirementBenefitAccount?: string; // (d) - Section 10(12A)
  retirementBenefitCountry?: string; // (e) - Section 10(12A) other country
  incomeTaxableOtherYear?: string;   // (f) - Earlier year income
  
  totalGrossSalary?: string;    // (2) Auto-calculated
  incomeClaimedRelief?: string; // (2a) - Section 89(1) relief
  lessAllowances?: string;      // (3) - Less allowances exempted u/s 10
  netSalary?: string;           // (4) - Net salary
  deductionU16?: string;        // (5a) - Standard deduction u/s 16(ia)
  entertainmentU16?: string;    // (5b) - Entertainment allowance u/s 16(ii)
  professionalU16?: string;     // (5c) - Professional tax u/s 16(iii)
  incomeChargeableHeadSalary?: string; // (6) - Income chargeable under Salaries
}

const scheduleSSchema = z.object({
  employerName: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || val.length >= 2, {
      message: "Employer name must be at least 2 characters",
    }),

  employerTIN: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[A-Z0-9]{10,15}$/.test(val), {
      message: "Employer TIN must be 10-15 alphanumeric characters",
    }),

  employerAddress: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || val.length >= 5, {
      message: "Employer address must be at least 5 characters",
    }),

  employerCity: z.string().optional().or(z.literal("")),
  employerState: z.string().optional().or(z.literal("")),
  employerPinCode: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[0-9]{6}$/.test(val), {
      message: "PIN code must be 6 digits",
    }),

  // Salary amounts with validation
  grossSalary: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  salaryU17: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  perquisitesU17: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  profitInLieuU17: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  retirementBenefitAccount: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  retirementBenefitCountry: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  incomeTaxableOtherYear: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  lessAllowances: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  netSalary: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  deductionU16: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  entertainmentU16: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  professionalU16: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  totalGrossSalary: z.string().optional().or(z.literal("")),
  incomeClaimedRelief: z.string().optional().or(z.literal("")),
  incomeChargeableHeadSalary: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  // Auto-calculate total gross salary
  const gross = parseFloat(data.grossSalary || "0") || 0;
  const sal17 = parseFloat(data.salaryU17 || "0") || 0;
  const perq17 = parseFloat(data.perquisitesU17 || "0") || 0;
  const profit17 = parseFloat(data.profitInLieuU17 || "0") || 0;
  const retireAcc = parseFloat(data.retirementBenefitAccount || "0") || 0;
  const retireCountry = parseFloat(data.retirementBenefitCountry || "0") || 0;
  const otherYear = parseFloat(data.incomeTaxableOtherYear || "0") || 0;

  const totalGross =
    gross + sal17 + perq17 + profit17 + retireAcc + retireCountry + otherYear;

  // Validate that deductions don't exceed net salary
  const lessAllow = parseFloat(data.lessAllowances || "0") || 0;
  if (lessAllow > totalGross) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["lessAllowances"],
      message: `Less allowances (₹${lessAllow}) cannot exceed Total Gross Salary (₹${totalGross})`,
    });
  }

  const netSal = totalGross - lessAllow;
  const deduct16 = parseFloat(data.deductionU16 || "0") || 0;
  const entertain16 = parseFloat(data.entertainmentU16 || "0") || 0;
  const prof16 = parseFloat(data.professionalU16 || "0") || 0;

  const totalDeductions = deduct16 + entertain16 + prof16;

  // Validate that total deductions don't exceed net salary
  if (totalDeductions > netSal) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Total deductions (₹${totalDeductions}) cannot exceed Net Salary (₹${netSal})`,
    });
  }

  // Calculate final income chargeable
  const incomeChargeable = Math.max(0, netSal - totalDeductions);

  // Reasonableness checks
  if (totalGross > 0 && lessAllow / totalGross > 0.5) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["lessAllowances"],
      message: "Less allowances seem unusually high (>50% of gross salary)",
    });
  }

  console.log("🔍 Schedule S Validation Details:", {
    grossSalary: gross,
    totalGrossSalary: totalGross,
    lessAllowances: lessAllow,
    netSalary: netSal,
    totalDeductions: totalDeductions,
    incomeChargeableHeadSalary: incomeChargeable,
  });
});

type ScheduleSFormType = z.infer<typeof scheduleSSchema>;

// ==================== REACT COMPONENT ====================

interface ScheduleSProps {
  initialData?: ScheduleSFormData;
  onSave: (data: ScheduleSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleS({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleSProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ScheduleSFormType>({
    resolver: zodResolver(scheduleSSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const formValues = watch();

  // Calculate totals
  const calculations = useMemo(() => {
    const gross = parseFloat(formValues.grossSalary || "0") || 0;
    const sal17 = parseFloat(formValues.salaryU17 || "0") || 0;
    const perq17 = parseFloat(formValues.perquisitesU17 || "0") || 0;
    const profit17 = parseFloat(formValues.profitInLieuU17 || "0") || 0;
    const retireAcc = parseFloat(formValues.retirementBenefitAccount || "0") || 0;
    const retireCountry =
      parseFloat(formValues.retirementBenefitCountry || "0") || 0;
    const otherYear = parseFloat(formValues.incomeTaxableOtherYear || "0") || 0;

    const totalGross =
      gross + sal17 + perq17 + profit17 + retireAcc + retireCountry + otherYear;

    const lessAllow = parseFloat(formValues.lessAllowances || "0") || 0;
    const netSal = totalGross - lessAllow;

    const deduct16 = parseFloat(formValues.deductionU16 || "0") || 0;
    const entertain16 = parseFloat(formValues.entertainmentU16 || "0") || 0;
    const prof16 = parseFloat(formValues.professionalU16 || "0") || 0;

    const totalDeductions = deduct16 + entertain16 + prof16;
    const incomeChargeable = Math.max(0, netSal - totalDeductions);

    return {
      totalGross: totalGross.toFixed(2),
      netSal: netSal.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      incomeChargeable: incomeChargeable.toFixed(2),
    };
  }, [formValues]);

  // Collect all errors
  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ScheduleSFormType) => {
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Schedule S - Income from Salary
          </h1>
          <p className="text-blue-700">
            Provide details of income from salary for FY 2024-25
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

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Employer Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Employer Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Employer
                </label>
                <input
                  {...register("employerName")}
                  type="text"
                  placeholder="Enter employer name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.employerName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.employerName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employerName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TIN (Tax ID Number)
                </label>
                <input
                  {...register("employerTIN")}
                  type="text"
                  placeholder="Enter TIN"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.employerTIN
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.employerTIN && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employerTIN.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  {...register("employerAddress")}
                  type="text"
                  placeholder="Enter address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.employerAddress
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.employerAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employerAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town/City
                </label>
                <input
                  {...register("employerCity")}
                  type="text"
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  {...register("employerState")}
                  type="text"
                  placeholder="Enter state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  {...register("employerPinCode")}
                  type="text"
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.employerPinCode
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.employerPinCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employerPinCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Salary Components */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Salary Components
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gross Salary (1a) = 1a + 1b + 1c + 1d + 1e + 1f
                </label>
                <input
                  {...register("grossSalary")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.grossSalary
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.grossSalary && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.grossSalary.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (a) Salary u/s 17(1)
                  </label>
                  <input
                    {...register("salaryU17")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.salaryU17
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.salaryU17 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salaryU17.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (b) Perquisites u/s 17(2)
                  </label>
                  <input
                    {...register("perquisitesU17")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.perquisitesU17
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.perquisitesU17 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.perquisitesU17.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (c) Profit in lieu u/s 17(3)
                  </label>
                  <input
                    {...register("profitInLieuU17")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.profitInLieuU17
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.profitInLieuU17 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profitInLieuU17.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (d) Retirement benefit u/s 10(12A)
                  </label>
                  <input
                    {...register("retirementBenefitAccount")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.retirementBenefitAccount
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.retirementBenefitAccount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.retirementBenefitAccount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (e) Retirement benefit (other country) u/s 10(12A)
                  </label>
                  <input
                    {...register("retirementBenefitCountry")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.retirementBenefitCountry
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.retirementBenefitCountry && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.retirementBenefitCountry.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (f) Income taxable in previous year
                  </label>
                  <input
                    {...register("incomeTaxableOtherYear")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.incomeTaxableOtherYear
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.incomeTaxableOtherYear && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.incomeTaxableOtherYear.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Totals and Deductions */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              Calculations & Totals
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">Total Gross Salary (2)</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{parseFloat(calculations.totalGross).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-sm text-gray-600">Net Salary</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{parseFloat(calculations.netSal).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <p className="text-sm text-gray-600">Total Deductions</p>
                <p className="text-2xl font-bold text-orange-900">
                  ₹{parseFloat(calculations.totalDeductions).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-sm text-gray-600">Income Chargeable</p>
                <p className="text-2xl font-bold text-green-900">
                  ₹{parseFloat(calculations.incomeChargeable).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* Deductions Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-900">Deductions u/s 16</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (5a) Standard deduction u/s 16(ia)
                  </label>
                  <input
                    {...register("deductionU16")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.deductionU16
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.deductionU16 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.deductionU16.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (5b) Entertainment allowance u/s 16(ii)
                  </label>
                  <input
                    {...register("entertainmentU16")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.entertainmentU16
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.entertainmentU16 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.entertainmentU16.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (5c) Professional tax u/s 16(iii)
                  </label>
                  <input
                    {...register("professionalU16")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.professionalU16
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.professionalU16 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.professionalU16.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (3) Less allowances u/s 10
                  </label>
                  <input
                    {...register("lessAllowances")}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lessAllowances
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.lessAllowances && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lessAllowances.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Relief and Final Income */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Relief and Final Income
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (2a) Income claimed for relief u/s 89(1)
                </label>
                <input
                  {...register("incomeClaimedRelief")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  (4) Net Salary (2 - 2a - 3)
                </label>
                <input
                  {...register("netSalary")}
                  type="number"
                  step="0.01"
                  placeholder="Auto-calculated"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
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
                  ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
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
