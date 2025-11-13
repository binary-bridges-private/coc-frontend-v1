"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleISSchema = z
  .object({
    // Interest for default
    interestDefaultFurnishing: z.string().default("0"),
    interestDefaultPayment234H: z.string().default("0"),

    // Interest for deferment
    interestDefermentAdvanceTax: z.string().default("0"),
    interestDefermentAdvanceTax234C: z.string().default("0"),

    // Fee
    feeDefaultFurnishing234F: z.string().default("0"),

    // Totals
    totalInterest: z.string().default("0"),
    totalFeePayable: z.string().default("0"),
    aggregateLiability: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    const validateNumeric = (
      value: string | undefined,
      fieldName: string,
      path: (string | number)[]
    ) => {
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

    const numericFields = [
      "interestDefaultFurnishing",
      "interestDefaultPayment234H",
      "interestDefermentAdvanceTax",
      "interestDefermentAdvanceTax234C",
      "feeDefaultFurnishing234F",
      "totalInterest",
      "totalFeePayable",
      "aggregateLiability",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule IS - Interest and Fee Payable", data);
  });

export type ScheduleISFormData = z.infer<typeof ScheduleISSchema>;

interface ScheduleISProps {
  initialData?: Partial<ScheduleISFormData>;
  onSave: (data: ScheduleISFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleIS({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleISProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleISFormData>({
    resolver: zodResolver(ScheduleISSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const interest =
      parseVal(watched.interestDefaultFurnishing) +
      parseVal(watched.interestDefaultPayment234H) +
      parseVal(watched.interestDefermentAdvanceTax) +
      parseVal(watched.interestDefermentAdvanceTax234C);

    const fee = parseVal(watched.feeDefaultFurnishing234F);
    const aggregate = interest + fee;

    return { interest, fee, aggregate };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleISFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-amber-900">
          Schedule IS - Interest and Fee Payable
        </h1>
        <p className="mt-1 text-sm text-amber-800">
          Computation of interest and fees for non-compliance
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {/* Interest for Default */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4">
            A. Interest for Default in Furnishing Return (Section 234A)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest for default in furnishing return (₹)
              </label>
              <Controller
                name="interestDefaultFurnishing"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.interestDefaultFurnishing
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.interestDefaultFurnishing && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.interestDefaultFurnishing.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest for default in payment of advance tax section 234H (₹)
              </label>
              <Controller
                name="interestDefaultPayment234H"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.interestDefaultPayment234H
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.interestDefaultPayment234H && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.interestDefaultPayment234H.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Interest for Deferment */}
        <div className="rounded-xl border border-orange-300 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900 mb-4">
            B. Interest for Deferment of Advance Tax (Section 234C)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest for deferment of advance tax (section 234C) (₹)
              </label>
              <Controller
                name="interestDefermentAdvanceTax"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.interestDefermentAdvanceTax
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.interestDefermentAdvanceTax && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.interestDefermentAdvanceTax.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest for deferment of advance tax (section 234C) (₹) - Additional
              </label>
              <Controller
                name="interestDefermentAdvanceTax234C"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.interestDefermentAdvanceTax234C
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.interestDefermentAdvanceTax234C && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.interestDefermentAdvanceTax234C.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Fee for Default */}
        <div className="rounded-xl border border-red-300 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-4">
            C. Fee for Default in Furnishing Return (Section 234F)
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fee for default in furnishing return (section 234F) (₹)
              </label>
              <Controller
                name="feeDefaultFurnishing234F"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.feeDefaultFurnishing234F
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.feeDefaultFurnishing234F && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.feeDefaultFurnishing234F.message}
                      </p>
                    )}
                  </>
                )}
              />
              <p className="mt-2 text-xs text-gray-600">
                <strong>Note:</strong> Rs. 5,000 if ITR filed after 31st December (if gross total income ≤ Rs. 5 Lakhs), otherwise Rs. 10,000
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-slate-900 bg-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Interest & Fee Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-slate-300 space-y-3">
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Interest:</p>
              <p className="font-bold text-slate-700">₹{calculations.interest.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Fee Payable:</p>
              <p className="font-bold text-slate-700">₹{calculations.fee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-red-50 p-3 rounded font-bold border-t">
              <p className="text-gray-800">Aggregate Liability (Interest + Fee):</p>
              <p className="text-lg text-red-700">₹{calculations.aggregate.toFixed(2)}</p>
            </div>
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
          className="flex-1 rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
