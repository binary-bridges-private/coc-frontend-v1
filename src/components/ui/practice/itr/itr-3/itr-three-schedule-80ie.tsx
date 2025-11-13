"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule80IESchema = z
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

    // North-East States: Assam, Arunachal Pradesh, Manipur, Mizoram, Meghalaya, Nagaland, Tripura, Sikkim
    // Each state has max 2 undertakings

    // Assam
    assamUndertak1: z.string().default(""),
    assamUndertak1Deduction: z.string().default("0"),
    assamUndertak2: z.string().default(""),
    assamUndertak2Deduction: z.string().default("0"),

    // Arunachal Pradesh
    arunachalUndertak1: z.string().default(""),
    arunachalUndertak1Deduction: z.string().default("0"),
    arunachalUndertak2: z.string().default(""),
    arunachalUndertak2Deduction: z.string().default("0"),

    // Manipur
    manipurUndertak1: z.string().default(""),
    manipurUndertak1Deduction: z.string().default("0"),
    manipurUndertak2: z.string().default(""),
    manipurUndertak2Deduction: z.string().default("0"),

    // Mizoram
    mizoramUndertak1: z.string().default(""),
    mizoramUndertak1Deduction: z.string().default("0"),
    mizoramUndertak2: z.string().default(""),
    mizoramUndertak2Deduction: z.string().default("0"),

    // Meghalaya
    meghalayaUndertak1: z.string().default(""),
    meghalayaUndertak1Deduction: z.string().default("0"),
    meghalayaUndertak2: z.string().default(""),
    meghalayaUndertak2Deduction: z.string().default("0"),

    // Nagaland
    nagalandUndertak1: z.string().default(""),
    nagalandUndertak1Deduction: z.string().default("0"),
    nagalandUndertak2: z.string().default(""),
    nagalandUndertak2Deduction: z.string().default("0"),

    // Tripura
    tripuraUndertak1: z.string().default(""),
    tripuraUndertak1Deduction: z.string().default("0"),
    tripuraUndertak2: z.string().default(""),
    tripuraUndertak2Deduction: z.string().default("0"),

    // Sikkim
    sikkimUndertak1: z.string().default(""),
    sikkimUndertak1Deduction: z.string().default("0"),
    sikkimUndertak2: z.string().default(""),
    sikkimUndertak2Deduction: z.string().default("0"),

    totalDeduction: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    const validateNumeric = (value: string | undefined, path: (string | number)[]) => {
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

    // Validate all deduction amounts
    [
      "assamUndertak1Deduction",
      "assamUndertak2Deduction",
      "arunachalUndertak1Deduction",
      "arunachalUndertak2Deduction",
      "manipurUndertak1Deduction",
      "manipurUndertak2Deduction",
      "mizoramUndertak1Deduction",
      "mizoramUndertak2Deduction",
      "meghalayaUndertak1Deduction",
      "meghalayaUndertak2Deduction",
      "nagalandUndertak1Deduction",
      "nagalandUndertak2Deduction",
      "tripuraUndertak1Deduction",
      "tripuraUndertak2Deduction",
      "sikkimUndertak1Deduction",
      "sikkimUndertak2Deduction",
    ].forEach((field) => {
      validateNumeric(data[field as keyof typeof data] as string, [field]);
    });

    console.log("Schedule 80-IE - Deductions for North-East undertakings", data);
  });

export type Schedule80IEFormData = z.infer<typeof Schedule80IESchema>;

interface Schedule80IEProps {
  initialData?: Partial<Schedule80IEFormData>;
  onSave: (data: Schedule80IEFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80IE({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80IEProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80IEFormData>({
    resolver: zodResolver(Schedule80IESchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total =
      parseVal(watched.assamUndertak1Deduction) +
      parseVal(watched.assamUndertak2Deduction) +
      parseVal(watched.arunachalUndertak1Deduction) +
      parseVal(watched.arunachalUndertak2Deduction) +
      parseVal(watched.manipurUndertak1Deduction) +
      parseVal(watched.manipurUndertak2Deduction) +
      parseVal(watched.mizoramUndertak1Deduction) +
      parseVal(watched.mizoramUndertak2Deduction) +
      parseVal(watched.meghalayaUndertak1Deduction) +
      parseVal(watched.meghalayaUndertak2Deduction) +
      parseVal(watched.nagalandUndertak1Deduction) +
      parseVal(watched.nagalandUndertak2Deduction) +
      parseVal(watched.tripuraUndertak1Deduction) +
      parseVal(watched.tripuraUndertak2Deduction) +
      parseVal(watched.sikkimUndertak1Deduction) +
      parseVal(watched.sikkimUndertak2Deduction);

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80IEFormData> = (data) => {
    onSave(data);
  };

  const renderStateRow = (
    stateCode: string,
    stateName: string,
    subRow: "1" | "2",
    undertakingField: keyof Schedule80IEFormData,
    deductionField: keyof Schedule80IEFormData
  ) => (
    <tr className="hover:bg-indigo-50">
      <td className="border border-indigo-300 px-3 py-2 text-sm font-semibold">
        {stateCode}
      </td>
      <td className="border border-indigo-300 px-3 py-2 text-sm">
        {stateName}
      </td>
      <td className="border border-indigo-300 px-3 py-2 text-sm">
        {subRow === "1" ? "aa" : "ab"}
      </td>
      <td className="border border-indigo-300 px-3 py-2 text-sm">
        Undertaking no. {subRow}
      </td>
      <td className="border border-indigo-300 px-3 py-2 text-sm">
        <Controller
          name={undertakingField}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              value={field.value || ""}
              className="w-full px-2 py-1 border rounded text-xs"
              placeholder="Form 10CCB Ref"
            />
          )}
        />
      </td>
      <td className="border border-indigo-300 px-3 py-2 text-sm">
        <Controller
          name={deductionField}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className={`w-full px-2 py-1 border rounded text-sm text-right ${
                  errors[deductionField] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors[deductionField] && (
                <p className="text-xs text-red-600 mt-0.5">
                  {(errors[deductionField] as any)?.message}
                </p>
              )}
            </>
          )}
        />
      </td>
    </tr>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-900">
          Schedule 80-IE - Deductions for North-East Undertakings
        </h1>
        <p className="mt-1 text-sm text-indigo-700">
          Deduction in respect of undertaking located in North-East
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.assesseePhone ? "border-red-500" : "border-gray-300"
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.assesseeAadhaar ? "border-red-500" : "border-gray-300"
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

        {/* North-East Undertakings Table */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-6">
            Deduction in Respect of Undertaking Located in North-East
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-indigo-300 bg-white text-xs">
              <thead className="bg-indigo-200">
                <tr>
                  <th className="border border-indigo-300 px-3 py-2 text-left font-semibold">
                    State Code
                  </th>
                  <th className="border border-indigo-300 px-3 py-2 text-left font-semibold">
                    State
                  </th>
                  <th className="border border-indigo-300 px-3 py-2 text-center font-semibold">
                    Sub
                  </th>
                  <th className="border border-indigo-300 px-3 py-2 text-left font-semibold">
                    Description
                  </th>
                  <th className="border border-indigo-300 px-3 py-2 text-left font-semibold">
                    Form 10CCB Reference
                  </th>
                  <th className="border border-indigo-300 px-3 py-2 text-right font-semibold">
                    Deduction Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderStateRow("aa", "Assam", "1", "assamUndertak1", "assamUndertak1Deduction")}
                {renderStateRow("aa", "", "2", "assamUndertak2", "assamUndertak2Deduction")}
                {renderStateRow("ab", "Arunachal Pradesh", "1", "arunachalUndertak1", "arunachalUndertak1Deduction")}
                {renderStateRow("ab", "", "2", "arunachalUndertak2", "arunachalUndertak2Deduction")}
                {renderStateRow("ac", "Manipur", "1", "manipurUndertak1", "manipurUndertak1Deduction")}
                {renderStateRow("ac", "", "2", "manipurUndertak2", "manipurUndertak2Deduction")}
                {renderStateRow("ad", "Mizoram", "1", "mizoramUndertak1", "mizoramUndertak1Deduction")}
                {renderStateRow("ad", "", "2", "mizoramUndertak2", "mizoramUndertak2Deduction")}
                {renderStateRow("ae", "Meghalaya", "1", "meghalayaUndertak1", "meghalayaUndertak1Deduction")}
                {renderStateRow("ae", "", "2", "meghalayaUndertak2", "meghalayaUndertak2Deduction")}
                {renderStateRow("af", "Nagaland", "1", "nagalandUndertak1", "nagalandUndertak1Deduction")}
                {renderStateRow("af", "", "2", "nagalandUndertak2", "nagalandUndertak2Deduction")}
                {renderStateRow("ag", "Tripura", "1", "tripuraUndertak1", "tripuraUndertak1Deduction")}
                {renderStateRow("ag", "", "2", "tripuraUndertak2", "tripuraUndertak2Deduction")}
                {renderStateRow("ah", "Sikkim", "1", "sikkimUndertak1", "sikkimUndertak1Deduction")}
                {renderStateRow("ah", "", "2", "sikkimUndertak2", "sikkimUndertak2Deduction")}
              </tbody>
              <tfoot className="bg-indigo-100 font-bold">
                <tr>
                  <td colSpan={5} className="border border-indigo-300 px-3 py-2">
                    ai. Total deduction u/s 80-IE
                  </td>
                  <td className="border border-indigo-300 px-3 py-2 text-right">
                    ₹{calculations.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-indigo-900 bg-indigo-100 p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">
            Total Deduction u/s 80-IE
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-indigo-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Total Deduction Amount:
            </p>
            <p className="text-3xl font-bold text-indigo-700">
              ₹{calculations.total.toFixed(2)}
            </p>
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
          className="flex-1 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
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
