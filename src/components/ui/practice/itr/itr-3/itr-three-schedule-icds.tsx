"use client";

import { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleICDSSchema = z
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

    // 11 ICDS Items (i-xi)
    icdsiAccountingPoliciesIncreaseProfit: z.string().default("0"),
    icdsiAccountingPoliciesDecreaseProfit: z.string().default("0"),

    icdsiValuationOfInventoriesIncreaseProfit: z.string().default("0"),
    icdsiValuationOfInventoriesDecreaseProfit: z.string().default("0"),

    icdsiiiVariationOfMethodOfValuationIncreaseProfit: z.string().default("0"),
    icdsiiiVariationOfMethodOfValuationDecreaseProfit: z.string().default("0"),

    icdsvConstructionContractsIncreaseProfit: z.string().default("0"),
    icdsvConstructionContractsDecreaseProfit: z.string().default("0"),

    icdsvRevenueRecognitionIncreaseProfit: z.string().default("0"),
    icdsvRevenueRecognitionDecreaseProfit: z.string().default("0"),

    icdsviBorrowingCostsIncreaseProfit: z.string().default("0"),
    icdsviBorrowingCostsDecreaseProfit: z.string().default("0"),

    icdsviiGovernmentGrantsIncreaseProfit: z.string().default("0"),
    icdsviiGovernmentGrantsDecreaseProfit: z.string().default("0"),

    icdsviiSecuritiesIncreaseProfit: z.string().default("0"),
    icdsviiSecuritiesDecreaseProfit: z.string().default("0"),

    icdsviiExposureIncreaseProfit: z.string().default("0"),
    icdsviiExposureDecreaseProfit: z.string().default("0"),

    icdsxProvisionLiabilitiesIncreaseProfit: z.string().default("0"),
    icdsxProvisionLiabilitiesDecreaseProfit: z.string().default("0"),

    icdsxiDisclosureIncreaseProfit: z.string().default("0"),
    icdsxiDisclosureDecreaseProfit: z.string().default("0"),

    // Total
    icdsTotalIncreaseProfit: z.string().default("0"),
    icdsTotalDecreaseProfit: z.string().default("0"),
    icdsTotalNetEffect: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    // Validate numeric fields
    const numericFields: (keyof ScheduleICDSFormData)[] = [
      "icdsiAccountingPoliciesIncreaseProfit",
      "icdsiAccountingPoliciesDecreaseProfit",
      "icdsiValuationOfInventoriesIncreaseProfit",
      "icdsiValuationOfInventoriesDecreaseProfit",
      "icdsiiiVariationOfMethodOfValuationIncreaseProfit",
      "icdsiiiVariationOfMethodOfValuationDecreaseProfit",
      "icdsvConstructionContractsIncreaseProfit",
      "icdsvConstructionContractsDecreaseProfit",
      "icdsvRevenueRecognitionIncreaseProfit",
      "icdsvRevenueRecognitionDecreaseProfit",
      "icdsviBorrowingCostsIncreaseProfit",
      "icdsviBorrowingCostsDecreaseProfit",
      "icdsviiGovernmentGrantsIncreaseProfit",
      "icdsviiGovernmentGrantsDecreaseProfit",
      "icdsviiSecuritiesIncreaseProfit",
      "icdsviiSecuritiesDecreaseProfit",
      "icdsviiExposureIncreaseProfit",
      "icdsviiExposureDecreaseProfit",
      "icdsxProvisionLiabilitiesIncreaseProfit",
      "icdsxProvisionLiabilitiesDecreaseProfit",
      "icdsxiDisclosureIncreaseProfit",
      "icdsxiDisclosureDecreaseProfit",
      "icdsTotalIncreaseProfit",
      "icdsTotalDecreaseProfit",
      "icdsTotalNetEffect",
    ];

    numericFields.forEach((field) => {
      const value = data[field] as string | undefined;
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: "Must be a valid number",
          });
        }
      }
    });
  });

export type ScheduleICDSFormData = z.infer<typeof ScheduleICDSSchema>;

interface ScheduleICDSProps {
  initialData?: Partial<ScheduleICDSFormData>;
  onSave: (data: ScheduleICDSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleICDS({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleICDSProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleICDSFormData>({
    resolver: zodResolver(ScheduleICDSSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch() as ScheduleICDSFormData;

  const onSubmit: SubmitHandler<ScheduleICDSFormData> = (data) => {
    onSave(data);
  };

  const ICDS_ITEMS = [
    { label: "Accounting Policies", key: "icdsiAccountingPolicies" },
    { label: "Valuation of Inventories", key: "icdsiValuationOfInventories" },
    { label: "Variation of Method of Valuation", key: "icdsiiiVariationOfMethodOfValuation" },
    { label: "Construction Contracts", key: "icdsvConstructionContracts" },
    { label: "Revenue Recognition", key: "icdsvRevenueRecognition" },
    { label: "Borrowing Costs", key: "icdsviBorrowingCosts" },
    { label: "Government Grants", key: "icdsviiGovernmentGrants" },
    { label: "Securities", key: "icdsviiSecurities" },
    { label: "Foreign Exchange Exposure", key: "icdsviiExposure" },
    { label: "Provisions, Contingent Liabilities and Contingent Assets", key: "icdsxProvisionLiabilities" },
    { label: "Disclosure of Long-term Construction Contracts", key: "icdsxiDisclosure" },
  ];

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number => parseFloat(val || "0") || 0;

    let totalIncrease = 0;
    let totalDecrease = 0;

    ICDS_ITEMS.forEach((item) => {
      totalIncrease += parseVal(watched[`${item.key}IncreaseProfit` as keyof ScheduleICDSFormData]);
      totalDecrease += parseVal(watched[`${item.key}DecreaseProfit` as keyof ScheduleICDSFormData]);
    });

    const netEffect = totalIncrease - totalDecrease;

    return { totalIncrease, totalDecrease, netEffect };
  }, [watched]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-purple-900">Schedule ICDS - Effect of Income Computation Disclosure Standards</h1>
        <p className="mt-1 text-sm text-purple-700">Adjustments for changes in accounting methods per ICDS on profit</p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {/* Assessee Details */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-4">Assessee Details</h2>
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
            <thead className="bg-purple-100 sticky top-0">
              <tr>
                <th className="border border-purple-300 px-2 py-2 text-center font-semibold">S. No.</th>
                <th className="border border-purple-300 px-2 py-2 text-left font-semibold">ICDS Item</th>
                <th className="border border-purple-300 px-2 py-2 text-center font-semibold min-w-24">Increase in Profit (Rs.)</th>
                <th className="border border-purple-300 px-2 py-2 text-center font-semibold min-w-24">Decrease in Profit (Rs.)</th>
                <th className="border border-purple-300 px-2 py-2 text-center font-semibold min-w-24">Net Effect (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {ICDS_ITEMS.map((item, idx) => {
                const increaseField = `${item.key}IncreaseProfit` as keyof ScheduleICDSFormData;
                const decreaseField = `${item.key}DecreaseProfit` as keyof ScheduleICDSFormData;
                const increase = parseFloat(watched[increaseField] || "0") || 0;
                const decrease = parseFloat(watched[decreaseField] || "0") || 0;
                const netEffect = increase - decrease;

                return (
                  <tr key={idx} className="hover:bg-purple-50">
                    <td className="border border-purple-300 px-2 py-2 text-center font-medium">{idx + 1}</td>
                    <td className="border border-purple-300 px-2 py-2 text-sm">{item.label}</td>
                    <td className="border border-purple-300 px-2 py-1">
                      <Controller
                        name={increaseField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[increaseField] ? "border-red-500" : "border-purple-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[increaseField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[increaseField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-purple-300 px-2 py-1">
                      <Controller
                        name={decreaseField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[decreaseField] ? "border-red-500" : "border-purple-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[decreaseField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[decreaseField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-purple-300 px-2 py-2 text-sm font-semibold text-center">
                      {netEffect.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              {/* Total Row */}
              <tr className="bg-purple-100 font-bold">
                <td colSpan={2} className="border border-purple-300 px-2 py-2 text-sm">
                  Total effect of ICDS adjustments
                </td>
                <td className="border border-purple-300 px-2 py-2 text-center">
                  <input
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded bg-white"
                    value={calculations.totalIncrease.toFixed(2)}
                    readOnly
                  />
                </td>
                <td className="border border-purple-300 px-2 py-2 text-center">
                  <input
                    type="text"
                    className="w-full px-2 py-1 text-sm border rounded bg-white"
                    value={calculations.totalDecrease.toFixed(2)}
                    readOnly
                  />
                </td>
                <td className="border border-purple-300 px-2 py-2 text-center">
                  <input
                    type="text"
                    className="w-full px-2 py-1 font-bold text-lg border rounded bg-white"
                    value={calculations.netEffect.toFixed(2)}
                    readOnly
                  />
                </td>
              </tr>
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
          className="flex-1 rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-pink-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
