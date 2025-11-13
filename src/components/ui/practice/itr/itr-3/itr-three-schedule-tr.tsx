"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleTRSchema = z
  .object({
    // Tax Relief Summary - Max 2 entries
    // Entry 1
    entry1TaxpayerIdNumber: z.string().default(""),
    entry1CountryCode: z.string().default(""),
    entry1SlNo: z.string().default("1"),
    entry1TotalTaxRelief: z.string().default("0"),
    entry1CountryDTAA: z.string().default(""),
    entry1SectionDTAA: z.string().default(""),

    // Entry 2
    entry2TaxpayerIdNumber: z.string().default(""),
    entry2CountryCode: z.string().default(""),
    entry2SlNo: z.string().default("2"),
    entry2TotalTaxRelief: z.string().default("0"),
    entry2CountryDTAA: z.string().default(""),
    entry2SectionDTAA: z.string().default(""),

    // Additional Info
    totalTaxReliefEntry1: z.string().default("0"),
    totalTaxReliefEntry2: z.string().default("0"),
    totalTaxReliefCountry: z.string().default("0"),
    totalTaxReliefDTAA: z.string().default("0"),

    // Refund Details
    amountRefunded: z.string().default("0"),
    amountAllowedAsDeduction: z.string().default("0"),
    assessmentYearRefunded: z.string().default(""),
    dateOfRefund: z.string().default(""),

    // Additional Notes
    additionalNotes: z.string().default(""),
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

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (
      data.dateOfRefund &&
      data.dateOfRefund !== "" &&
      !dateRegex.test(data.dateOfRefund)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dateOfRefund"],
        message: "Date format must be DD/MM/YYYY",
      });
    }

    const numericFields = [
      "entry1TotalTaxRelief",
      "entry2TotalTaxRelief",
      "totalTaxReliefEntry1",
      "totalTaxReliefEntry2",
      "totalTaxReliefCountry",
      "totalTaxReliefDTAA",
      "amountRefunded",
      "amountAllowedAsDeduction",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule TR - Tax Relief Summary", data);
  });

export type ScheduleTRFormData = z.infer<typeof ScheduleTRSchema>;

interface ScheduleTRProps {
  initialData?: Partial<ScheduleTRFormData>;
  onSave: (data: ScheduleTRFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleTR({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleTRProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleTRFormData>({
    resolver: zodResolver(ScheduleTRSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const entry1Relief = parseVal(watched.entry1TotalTaxRelief);
    const entry2Relief = parseVal(watched.entry2TotalTaxRelief);
    const totalRelief = entry1Relief + entry2Relief;

    return { entry1Relief, entry2Relief, totalRelief };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleTRFormData> = (data) => {
    onSave(data);
  };

  const renderEntry = (entryNum: 1 | 2) => {
    const prefix = `entry${entryNum}` as const;
    const idField = `${prefix}TaxpayerIdNumber` as const;
    const countryField = `${prefix}CountryCode` as const;
    const slField = `${prefix}SlNo` as const;
    const reliefField = `${prefix}TotalTaxRelief` as const;
    const dtaaCountryField = `${prefix}CountryDTAA` as const;
    const dtaaSectionField = `${prefix}SectionDTAA` as const;

    return (
      <div
        key={entryNum}
        className="rounded-xl border border-red-200 bg-red-50 p-6"
      >
        <h3 className="text-lg font-bold text-red-900 mb-4">
          Details of Tax Relief Claimed - Entry {entryNum}
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxpayer ID Number
            </label>
            <Controller
              name={idField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="ID number"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Code
            </label>
            <Controller
              name={countryField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., US, UK"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sl. No.
            </label>
            <Controller
              name={slField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-lg border border-red-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Taxes Paid Outside India as per DTI (₹)
            </label>
            <Controller
              name={reliefField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      errors[reliefField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[reliefField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[reliefField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax Relief Available in Respect of Each Country (₹)
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-lg bg-red-100 font-bold">
              ₹{(entryNum === 1 ? calculations.entry1Relief : calculations.entry2Relief).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-red-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax Relief Available in Respect of Country where DTAA is Applicable
            </label>
            <Controller
              name={dtaaCountryField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Amount"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section under which Relief Claimed (Specify 90, 90A or 91)
            </label>
            <Controller
              name={dtaaSectionField}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select</option>
                  <option value="90">Section 90</option>
                  <option value="90A">Section 90A</option>
                  <option value="91">Section 91</option>
                </select>
              )}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-red-900">
          Schedule TR - Summary of Tax Relief Claimed
        </h1>
        <p className="mt-1 text-sm text-red-700">
          For taxes paid outside India (available only in case of resident)
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Entry Details */}
        {renderEntry(1)}
        {renderEntry(2)}

        {/* Summary Section */}
        <div className="rounded-xl border-2 border-red-900 bg-red-100 p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">
            Tax Relief Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-red-300 space-y-3">
            <div className="flex justify-between pb-2 border-b border-red-200">
              <p className="font-semibold text-gray-700">Total Tax Relief Entry 1:</p>
              <p className="font-bold text-red-700">
                ₹{calculations.entry1Relief.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between pb-2 border-b border-red-200">
              <p className="font-semibold text-gray-700">Total Tax Relief Entry 2:</p>
              <p className="font-bold text-red-700">
                ₹{calculations.entry2Relief.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between pt-2 bg-red-50 p-3 rounded font-bold">
              <p className="text-gray-800">Total Tax Relief Claimed:</p>
              <p className="text-lg text-red-700">
                ₹{calculations.totalRelief.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Refund/Adjustment Details */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-6">
            Refund / Adjustment Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Refunded (₹)
              </label>
              <Controller
                name="amountRefunded"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.amountRefunded
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.amountRefunded && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.amountRefunded.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Year in which Refunded / Allowed as Deduction
              </label>
              <Controller
                name="assessmentYearRefunded"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="AY 2023-24"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Allowed as Deduction (₹)
              </label>
              <Controller
                name="amountAllowedAsDeduction"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.amountAllowedAsDeduction
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.amountAllowedAsDeduction && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.amountAllowedAsDeduction.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Refund (DD/MM/YYYY)
              </label>
              <Controller
                name="dateOfRefund"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.dateOfRefund
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="DD/MM/YYYY"
                    />
                    {errors.dateOfRefund && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.dateOfRefund.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes or Comments
          </label>
          <Controller
            name="additionalNotes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                value={field.value || ""}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Any additional information or notes..."
              />
            )}
          />
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
          className="flex-1 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
