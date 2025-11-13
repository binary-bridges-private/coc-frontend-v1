"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule80IASchema = z
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

    // Undertaking rows (max 2)
    undertakingA1: z.string().default(""),
    undertakingA1DeductionAmount: z.string().default("0"),
    undertakingA2: z.string().default(""),
    undertakingA2DeductionAmount: z.string().default("0"),

    totalDeduction: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    const validateNumeric = (value: string | undefined, fieldName: string, path: (string | number)[]) => {
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: "Must be a valid non-negative number",
          });
        }
      }
    };

    validateNumeric(data.undertakingA1DeductionAmount, "undertakingA1DeductionAmount", ["undertakingA1DeductionAmount"]);
    validateNumeric(data.undertakingA2DeductionAmount, "undertakingA2DeductionAmount", ["undertakingA2DeductionAmount"]);
    validateNumeric(data.totalDeduction, "totalDeduction", ["totalDeduction"]);

    console.log("Schedule 80-IA - Deduction in respect of profits of undertaking", data);
  });

export type Schedule80IAFormData = z.infer<typeof Schedule80IASchema>;

interface Schedule80IAProps {
  initialData?: Partial<Schedule80IAFormData>;
  onSave: (data: Schedule80IAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80IA({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80IAProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80IAFormData>({
    resolver: zodResolver(Schedule80IASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total = parseVal(watched.undertakingA1DeductionAmount) + parseVal(watched.undertakingA2DeductionAmount);

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80IAFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-sky-50 to-blue-50 border-b border-sky-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-sky-900">
          Schedule 80-IA - Deduction in Respect of Profits of Undertaking
        </h1>
        <p className="mt-1 text-sm text-sky-700">
          Deduction u/s 80-IA(4)(iv) [Power]
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-8">
        
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Assessee Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (10 digits)
              </label>
              <Controller
                name="assesseePhone"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.assesseePhone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g., 9876543210"
                    />
                    {errors.assesseePhone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.assesseePhone.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number (12 digits)
              </label>
              <Controller
                name="assesseeAadhaar"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.assesseeAadhaar
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g., 123456789012"
                    />
                    {errors.assesseeAadhaar && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.assesseeAadhaar.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Undertakings Table */}
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-6">
          <h2 className="text-lg font-bold text-sky-900 mb-6">
            Deduction in Respect of Profits of Undertakings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-sky-300 bg-white text-sm">
              <thead className="bg-sky-200">
                <tr>
                  <th className="border border-sky-300 px-4 py-3 text-left font-semibold">Undertaking No.</th>
                  <th className="border border-sky-300 px-4 py-3 text-left font-semibold">Form 10CCB Reference</th>
                  <th className="border border-sky-300 px-4 py-3 text-right font-semibold">Deduction Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-sky-50">
                  <td className="border border-sky-300 px-4 py-3 font-semibold">a1</td>
                  <td className="border border-sky-300 px-4 py-3">
                    <Controller
                      name="undertakingA1"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="(If of Form 10CCB of the undertaking)"
                        />
                      )}
                    />
                  </td>
                  <td className="border border-sky-300 px-4 py-3">
                    <Controller
                      name="undertakingA1DeductionAmount"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 border rounded text-sm text-right ${
                              errors.undertakingA1DeductionAmount
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                          {errors.undertakingA1DeductionAmount && (
                            <p className="text-xs text-red-600 mt-0.5">
                              {errors.undertakingA1DeductionAmount.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </td>
                </tr>
                <tr className="hover:bg-sky-50">
                  <td className="border border-sky-300 px-4 py-3 font-semibold">a2</td>
                  <td className="border border-sky-300 px-4 py-3">
                    <Controller
                      name="undertakingA2"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="(If of Form 10CCB of the undertaking)"
                        />
                      )}
                    />
                  </td>
                  <td className="border border-sky-300 px-4 py-3">
                    <Controller
                      name="undertakingA2DeductionAmount"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 border rounded text-sm text-right ${
                              errors.undertakingA2DeductionAmount
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                          {errors.undertakingA2DeductionAmount && (
                            <p className="text-xs text-red-600 mt-0.5">
                              {errors.undertakingA2DeductionAmount.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-sky-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-sky-300 px-4 py-3">
                    b. Total Deductions u/s 80-IA (a1 + a2)
                  </td>
                  <td className="border border-sky-300 px-4 py-3 text-right">
                    ₹{calculations.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-sky-900 bg-sky-100 p-6">
          <h3 className="text-lg font-bold text-sky-900 mb-4">Total Deduction u/s 80-IA</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-sky-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Deduction Amount:</p>
            <p className="text-3xl font-bold text-sky-700">₹{calculations.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-lg rounded-b-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back to Summary
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
