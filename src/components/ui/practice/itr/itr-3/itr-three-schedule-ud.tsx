"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleUDSchema = z
  .object({
    // Assessee Details
    assesseePhone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
        message: "Phone number must be 10 digits starting with 6-9",
      }),

    assesseeAadhaar: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[2-9][0-9]{11}$/.test(val), {
        message: "Aadhaar must be 12 digits starting with 2-9",
      }),

    // Row 1 - Current Assessment Year
    ud1AmountBroughtForwardUnabsorbedDepreciation: z.string().default("0"),
    ud1AmountAdjustedOnAccountOfNoticeForCurrentYear: z.string().default("0"),
    ud1AmountOfDepreciationSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud1BalanceCarriedForwardToNextYear: z.string().default("0"),
    ud1AmountOfUnabsorbedAllowanceCarriedForward: z.string().default("0"),
    ud1AmountOfAllowanceSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud1BalanceCarriedForwardToNextYearAllowance: z.string().default("0"),

    // Row 2 - Previous Year II
    ud2AmountBroughtForwardUnabsorbedDepreciation: z.string().default("0"),
    ud2AmountAdjustedOnAccountOfNoticeForCurrentYear: z.string().default("0"),
    ud2AmountOfDepreciationSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud2BalanceCarriedForwardToNextYear: z.string().default("0"),
    ud2AmountOfUnabsorbedAllowanceCarriedForward: z.string().default("0"),
    ud2AmountOfAllowanceSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud2BalanceCarriedForwardToNextYearAllowance: z.string().default("0"),

    // Row 3 - Previous Year III
    ud3AmountBroughtForwardUnabsorbedDepreciation: z.string().default("0"),
    ud3AmountAdjustedOnAccountOfNoticeForCurrentYear: z.string().default("0"),
    ud3AmountOfDepreciationSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud3BalanceCarriedForwardToNextYear: z.string().default("0"),
    ud3AmountOfUnabsorbedAllowanceCarriedForward: z.string().default("0"),
    ud3AmountOfAllowanceSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud3BalanceCarriedForwardToNextYearAllowance: z.string().default("0"),

    // Row 4 - Previous Year IV
    ud4AmountBroughtForwardUnabsorbedDepreciation: z.string().default("0"),
    ud4AmountAdjustedOnAccountOfNoticeForCurrentYear: z.string().default("0"),
    ud4AmountOfDepreciationSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud4BalanceCarriedForwardToNextYear: z.string().default("0"),
    ud4AmountOfUnabsorbedAllowanceCarriedForward: z.string().default("0"),
    ud4AmountOfAllowanceSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud4BalanceCarriedForwardToNextYearAllowance: z.string().default("0"),

    // Row 5 - Total
    ud5TotalAmountBroughtForwardUnabsorbedDepreciation: z.string().default("0"),
    ud5TotalAmountAdjustedOnAccountOfNoticeForCurrentYear: z.string().default("0"),
    ud5TotalAmountOfDepreciationSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud5TotalBalanceCarriedForwardToNextYear: z.string().default("0"),
    ud5TotalAmountOfUnabsorbedAllowanceCarriedForward: z.string().default("0"),
    ud5TotalAmountOfAllowanceSetOffAgainstCurrentYearIncome: z.string().default("0"),
    ud5TotalBalanceCarriedForwardToNextYearAllowance: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    // Validate numeric fields only
    const numericFields: (keyof ScheduleUDFormData)[] = [
      "ud1AmountBroughtForwardUnabsorbedDepreciation",
      "ud1AmountAdjustedOnAccountOfNoticeForCurrentYear",
      "ud1AmountOfDepreciationSetOffAgainstCurrentYearIncome",
      "ud1BalanceCarriedForwardToNextYear",
      "ud1AmountOfUnabsorbedAllowanceCarriedForward",
      "ud1AmountOfAllowanceSetOffAgainstCurrentYearIncome",
      "ud1BalanceCarriedForwardToNextYearAllowance",
      "ud2AmountBroughtForwardUnabsorbedDepreciation",
      "ud2AmountAdjustedOnAccountOfNoticeForCurrentYear",
      "ud2AmountOfDepreciationSetOffAgainstCurrentYearIncome",
      "ud2BalanceCarriedForwardToNextYear",
      "ud2AmountOfUnabsorbedAllowanceCarriedForward",
      "ud2AmountOfAllowanceSetOffAgainstCurrentYearIncome",
      "ud2BalanceCarriedForwardToNextYearAllowance",
      "ud3AmountBroughtForwardUnabsorbedDepreciation",
      "ud3AmountAdjustedOnAccountOfNoticeForCurrentYear",
      "ud3AmountOfDepreciationSetOffAgainstCurrentYearIncome",
      "ud3BalanceCarriedForwardToNextYear",
      "ud3AmountOfUnabsorbedAllowanceCarriedForward",
      "ud3AmountOfAllowanceSetOffAgainstCurrentYearIncome",
      "ud3BalanceCarriedForwardToNextYearAllowance",
      "ud4AmountBroughtForwardUnabsorbedDepreciation",
      "ud4AmountAdjustedOnAccountOfNoticeForCurrentYear",
      "ud4AmountOfDepreciationSetOffAgainstCurrentYearIncome",
      "ud4BalanceCarriedForwardToNextYear",
      "ud4AmountOfUnabsorbedAllowanceCarriedForward",
      "ud4AmountOfAllowanceSetOffAgainstCurrentYearIncome",
      "ud4BalanceCarriedForwardToNextYearAllowance",
      "ud5TotalAmountBroughtForwardUnabsorbedDepreciation",
      "ud5TotalAmountAdjustedOnAccountOfNoticeForCurrentYear",
      "ud5TotalAmountOfDepreciationSetOffAgainstCurrentYearIncome",
      "ud5TotalBalanceCarriedForwardToNextYear",
      "ud5TotalAmountOfUnabsorbedAllowanceCarriedForward",
      "ud5TotalAmountOfAllowanceSetOffAgainstCurrentYearIncome",
      "ud5TotalBalanceCarriedForwardToNextYearAllowance",
    ];

    numericFields.forEach((field) => {
      const value = data[field] as string | undefined;
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: "Must be a valid non-negative number",
          });
        }
      }
    });
  });

export type ScheduleUDFormData = z.infer<typeof ScheduleUDSchema>;

interface ScheduleUDProps {
  initialData?: Partial<ScheduleUDFormData>;
  onSave: (data: ScheduleUDFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleUD({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleUDProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleUDFormData>({
    resolver: zodResolver(ScheduleUDSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch() as ScheduleUDFormData;

  const onSubmit: SubmitHandler<ScheduleUDFormData> = (data) => {
    onSave(data);
  };

  const ASSESSMENT_YEARS = [
    "Current Assessment Year",
    "Previous Year II",
    "Previous Year III",
    "Previous Year IV",
    "Total",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-blue-900">Schedule UD - Unabsorbed Depreciation and Allowance u/s 35(4)</h1>
        <p className="mt-1 text-sm text-blue-700">Details of unabsorbed depreciation and allowance carried forward from previous years</p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {/* Assessee Details */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Assessee Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Controller
                name="assesseePhone"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.assesseePhone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10 digits starting 6-9"
                    />
                    {errors.assesseePhone && (
                      <p className="mt-1 text-xs text-red-600">{errors.assesseePhone.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
              <Controller
                name="assesseeAadhaar"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.assesseeAadhaar ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="12 digits starting 2-9"
                    />
                    {errors.assesseeAadhaar && (
                      <p className="mt-1 text-xs text-red-600">{errors.assesseeAadhaar.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto bg-white border rounded-xl">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-blue-100 sticky top-0">
              <tr>
                <th className="border border-blue-300 px-2 py-2 text-center font-semibold">S. No.</th>
                <th className="border border-blue-300 px-2 py-2 text-left font-semibold">Assessment Year</th>
                <th colSpan={4} className="border border-blue-300 px-2 py-2 text-center font-semibold">Unabsorbed Depreciation</th>
                <th colSpan={3} className="border border-blue-300 px-2 py-2 text-center font-semibold">Unabsorbed Allowance u/s 35(4)</th>
              </tr>
              <tr>
                <th className="border border-blue-300 px-2 py-1"></th>
                <th className="border border-blue-300 px-2 py-1"></th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(2) B/F</th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(3) Adjusted</th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(4) Set-off</th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(5) B/F Next</th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(6) B/F</th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(7) Set-off</th>
                <th className="border border-blue-300 px-2 py-1 text-center font-semibold text-xs min-w-24">(8) B/F Next</th>
              </tr>
            </thead>
            <tbody>
              {ASSESSMENT_YEARS.map((year, i) => {
                const idx = (i + 1);
                const isTotal = idx === 5;

                const getFieldName = (suffix: string) => {
                  return `ud${idx}${suffix}` as keyof ScheduleUDFormData;
                };

                return (
                  <tr key={idx} className={isTotal ? "bg-blue-50 font-bold" : "hover:bg-blue-50"}>
                    <td className="border border-blue-300 px-2 py-2 text-center">{isTotal ? "V" : idx}</td>
                    <td className="border border-blue-300 px-2 py-2 text-sm font-medium">{year}</td>

                    {/* Depreciation Columns */}
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("AmountBroughtForwardUnabsorbedDepreciation")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("AmountBroughtForwardUnabsorbedDepreciation")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("AmountAdjustedOnAccountOfNoticeForCurrentYear")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("AmountAdjustedOnAccountOfNoticeForCurrentYear")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("AmountOfDepreciationSetOffAgainstCurrentYearIncome")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("AmountOfDepreciationSetOffAgainstCurrentYearIncome")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("BalanceCarriedForwardToNextYear")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("BalanceCarriedForwardToNextYear")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>

                    {/* Allowance Columns */}
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("AmountOfUnabsorbedAllowanceCarriedForward")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("AmountOfUnabsorbedAllowanceCarriedForward")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("AmountOfAllowanceSetOffAgainstCurrentYearIncome")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("AmountOfAllowanceSetOffAgainstCurrentYearIncome")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-1 py-1">
                      <Controller
                        name={getFieldName("BalanceCarriedForwardToNextYearAllowance")}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 text-sm border rounded ${
                              errors[getFieldName("BalanceCarriedForwardToNextYearAllowance")]
                                ? "border-red-500"
                                : "border-blue-200"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-lg rounded-b-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-cyan-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
