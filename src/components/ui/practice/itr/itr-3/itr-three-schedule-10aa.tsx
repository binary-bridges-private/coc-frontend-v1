"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule10AASchema = z
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

    // Undertaking a
    undertakingAName: z.string().default(""),
    undertakingAAssessmentYearOfCommencement: z.string().default(""),
    undertakingAAmountOfDeduction: z.string().default("0"),

    // Undertaking b
    undertakingBName: z.string().default(""),
    undertakingBAssessmentYearOfCommencement: z.string().default(""),
    undertakingBAmountOfDeduction: z.string().default("0"),

    // Total
    totalDeductionUnderSection10AA: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    // Validate numeric fields
    const numericFields: (keyof Schedule10AAFormData)[] = [
      "undertakingAAmountOfDeduction",
      "undertakingBAmountOfDeduction",
      "totalDeductionUnderSection10AA",
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

export type Schedule10AAFormData = z.infer<typeof Schedule10AASchema>;

interface Schedule10AAProps {
  initialData?: Partial<Schedule10AAFormData>;
  onSave: (data: Schedule10AAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule10AA({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule10AAProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule10AAFormData>({
    resolver: zodResolver(Schedule10AASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch() as Schedule10AAFormData;

  const onSubmit: SubmitHandler<Schedule10AAFormData> = (data) => {
    onSave(data);
  };

  const calculations = useMemo(() => {
    const undertakingAAmount = parseFloat(watched.undertakingAAmountOfDeduction || "0") || 0;
    const undertakingBAmount = parseFloat(watched.undertakingBAmountOfDeduction || "0") || 0;
    const totalDeduction = undertakingAAmount + undertakingBAmount;

    return { totalDeduction };
  }, [watched]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-green-900">Schedule 10AA - Deduction u/s 10AA</h1>
        <p className="mt-1 text-sm text-green-700">Deductions in respect of units located in Special Economic Zone (SEZ)</p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {/* Assessee Details */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">Assessee Details</h2>
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

        {/* Undertakings Table */}
        <div className="overflow-x-auto bg-white border rounded-xl">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-green-100 sticky top-0">
              <tr>
                <th className="border border-green-300 px-4 py-2 text-center font-semibold">S. No.</th>
                <th className="border border-green-300 px-4 py-2 text-left font-semibold">Undertaking</th>
                <th className="border border-green-300 px-4 py-2 text-left font-semibold">Assessment Year in which unit began to manufacture</th>
                <th className="border border-green-300 px-4 py-2 text-center font-semibold min-w-32">Amount of Deduction</th>
              </tr>
            </thead>
            <tbody>
              {/* Undertaking a */}
              <tr className="hover:bg-green-50">
                <td className="border border-green-300 px-4 py-2 text-center font-semibold">a</td>
                <td className="border border-green-300 px-4 py-2">
                  <Controller
                    name="undertakingAName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-2 py-1 text-sm border rounded border-green-200"
                        placeholder="Undertaking Name"
                      />
                    )}
                  />
                </td>
                <td className="border border-green-300 px-4 py-2">
                  <Controller
                    name="undertakingAAssessmentYearOfCommencement"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-2 py-1 text-sm border rounded border-green-200"
                        placeholder="e.g., 2023-24"
                      />
                    )}
                  />
                </td>
                <td className="border border-green-300 px-4 py-2">
                  <Controller
                    name="undertakingAAmountOfDeduction"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`w-full px-2 py-1 text-sm border rounded ${
                            errors.undertakingAAmountOfDeduction ? "border-red-500" : "border-green-200"
                          }`}
                          placeholder="0.00"
                        />
                        {errors.undertakingAAmountOfDeduction && (
                          <p className="mt-0.5 text-xs text-red-600">{(errors.undertakingAAmountOfDeduction as any)?.message}</p>
                        )}
                      </>
                    )}
                  />
                </td>
              </tr>

              {/* Undertaking b */}
              <tr className="hover:bg-green-50">
                <td className="border border-green-300 px-4 py-2 text-center font-semibold">b</td>
                <td className="border border-green-300 px-4 py-2">
                  <Controller
                    name="undertakingBName"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-2 py-1 text-sm border rounded border-green-200"
                        placeholder="Undertaking Name"
                      />
                    )}
                  />
                </td>
                <td className="border border-green-300 px-4 py-2">
                  <Controller
                    name="undertakingBAssessmentYearOfCommencement"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-2 py-1 text-sm border rounded border-green-200"
                        placeholder="e.g., 2023-24"
                      />
                    )}
                  />
                </td>
                <td className="border border-green-300 px-4 py-2">
                  <Controller
                    name="undertakingBAmountOfDeduction"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`w-full px-2 py-1 text-sm border rounded ${
                            errors.undertakingBAmountOfDeduction ? "border-red-500" : "border-green-200"
                          }`}
                          placeholder="0.00"
                        />
                        {errors.undertakingBAmountOfDeduction && (
                          <p className="mt-0.5 text-xs text-red-600">{(errors.undertakingBAmountOfDeduction as any)?.message}</p>
                        )}
                      </>
                    )}
                  />
                </td>
              </tr>

              {/* Total Row */}
              <tr className="bg-green-100 font-bold">
                <td colSpan={3} className="border border-green-300 px-4 py-2 text-right">
                  Total deduction under section 10AA
                </td>
                <td className="border border-purple-300 px-2 py-2 text-center">
                  <input
                    type="text"
                    className="w-full px-2 py-1 font-bold text-lg border rounded bg-white"
                    value={calculations.totalDeduction.toFixed(2)}
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Information Section */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h3 className="text-base font-semibold text-green-900 mb-3">Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Enter details of undertakings engaged in manufacture/production/processing of articles/services in Special Economic Zone</li>
            <li>Deduction available for first 15 years from the commencement of manufacture</li>
            <li>Amount should be in accordance with Form 56F/Undertaking filed with the Commissioner</li>
            <li>Reference: Income Tax Act Section 10AA</li>
          </ul>
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
          className="flex-1 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
