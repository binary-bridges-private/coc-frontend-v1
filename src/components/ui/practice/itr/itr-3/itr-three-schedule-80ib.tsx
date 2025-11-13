"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule80IBSchema = z
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

    // Section (a) - Industrial Undertakings (Referred in IT Rule 4A)
    undertakingA1Deduction: z.string().default("0"),
    undertakingA2Deduction: z.string().default("0"),

    // Section (b) - Undertakings Engaged in Infrastructure Development (Referred in IT Rule 4AB)
    undertakingB1Deduction: z.string().default("0"),
    undertakingB2Deduction: z.string().default("0"),

    // Section (c) - Undertakings Engaged in Processing of Mineral Oil (Referred in IT Rule 4AC)
    undertakingC1Deduction: z.string().default("0"),
    undertakingC2Deduction: z.string().default("0"),

    // Section (ca) - Undertakings Engaged in Processing Agricultural Products (Referred in IT Rule 4ACA)
    undertakingCA1Deduction: z.string().default("0"),
    undertakingCA2Deduction: z.string().default("0"),

    // Section (d) - Undertakings in Special Economic Zone
    undertakingD1Deduction: z.string().default("0"),
    undertakingD2Deduction: z.string().default("0"),

    // Section (e) - Undertakings Engaged in Grain Handling (Referred in IT Rule 4AD)
    undertakingE1Deduction: z.string().default("0"),
    undertakingE2Deduction: z.string().default("0"),

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

    validateNumeric(data.undertakingA1Deduction, "undertakingA1Deduction", ["undertakingA1Deduction"]);
    validateNumeric(data.undertakingA2Deduction, "undertakingA2Deduction", ["undertakingA2Deduction"]);
    validateNumeric(data.undertakingB1Deduction, "undertakingB1Deduction", ["undertakingB1Deduction"]);
    validateNumeric(data.undertakingB2Deduction, "undertakingB2Deduction", ["undertakingB2Deduction"]);
    validateNumeric(data.undertakingC1Deduction, "undertakingC1Deduction", ["undertakingC1Deduction"]);
    validateNumeric(data.undertakingC2Deduction, "undertakingC2Deduction", ["undertakingC2Deduction"]);
    validateNumeric(data.undertakingCA1Deduction, "undertakingCA1Deduction", ["undertakingCA1Deduction"]);
    validateNumeric(data.undertakingCA2Deduction, "undertakingCA2Deduction", ["undertakingCA2Deduction"]);
    validateNumeric(data.undertakingD1Deduction, "undertakingD1Deduction", ["undertakingD1Deduction"]);
    validateNumeric(data.undertakingD2Deduction, "undertakingD2Deduction", ["undertakingD2Deduction"]);
    validateNumeric(data.undertakingE1Deduction, "undertakingE1Deduction", ["undertakingE1Deduction"]);
    validateNumeric(data.undertakingE2Deduction, "undertakingE2Deduction", ["undertakingE2Deduction"]);
    validateNumeric(data.totalDeduction, "totalDeduction", ["totalDeduction"]);

    console.log("Schedule 80-IB - Section 80-IB deductions", data);
  });

export type Schedule80IBFormData = z.infer<typeof Schedule80IBSchema>;

interface Schedule80IBProps {
  initialData?: Partial<Schedule80IBFormData>;
  onSave: (data: Schedule80IBFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80IB({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80IBProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80IBFormData>({
    resolver: zodResolver(Schedule80IBSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const totalA = parseVal(watched.undertakingA1Deduction) + parseVal(watched.undertakingA2Deduction);
    const totalB = parseVal(watched.undertakingB1Deduction) + parseVal(watched.undertakingB2Deduction);
    const totalC = parseVal(watched.undertakingC1Deduction) + parseVal(watched.undertakingC2Deduction);
    const totalCA = parseVal(watched.undertakingCA1Deduction) + parseVal(watched.undertakingCA2Deduction);
    const totalD = parseVal(watched.undertakingD1Deduction) + parseVal(watched.undertakingD2Deduction);
    const totalE = parseVal(watched.undertakingE1Deduction) + parseVal(watched.undertakingE2Deduction);
    const grandTotal = totalA + totalB + totalC + totalCA + totalD + totalE;

    return { totalA, totalB, totalC, totalCA, totalD, totalE, grandTotal };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80IBFormData> = (data) => {
    onSave(data);
  };

  const renderUndertakingRow = (
    section: string,
    label1: string,
    label2: string,
    field1: keyof Schedule80IBFormData,
    field2: keyof Schedule80IBFormData,
    sectionColor: string
  ) => (
    <tr className={`hover:${sectionColor.replace("bg-", "bg-")}50`}>
      <td className={`border border-${sectionColor.split("-")[1]}-300 px-4 py-3 font-semibold`}>
        {section}
      </td>
      <td className={`border border-${sectionColor.split("-")[1]}-300 px-4 py-3`}>{label1}</td>
      <td className={`border border-${sectionColor.split("-")[1]}-300 px-4 py-3`}>
        <Controller
          name={field1}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                className={`w-full px-2 py-1 border rounded text-sm text-right ${
                  errors[field1]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors[field1] && (
                <p className="text-xs text-red-600 mt-0.5">
                  {(errors[field1] as any)?.message}
                </p>
              )}
            </>
          )}
        />
      </td>
      <td className={`border border-${sectionColor.split("-")[1]}-300 px-4 py-3`}>{label2}</td>
      <td className={`border border-${sectionColor.split("-")[1]}-300 px-4 py-3`}>
        <Controller
          name={field2}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                className={`w-full px-2 py-1 border rounded text-sm text-right ${
                  errors[field2]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors[field2] && (
                <p className="text-xs text-red-600 mt-0.5">
                  {(errors[field2] as any)?.message}
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
      <div className="sticky top-0 z-40 bg-gradient-to-r from-lime-50 to-green-50 border-b border-lime-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-lime-900">
          Schedule 80-IB - Section 80-IB Deductions
        </h1>
        <p className="mt-1 text-sm text-lime-700">
          Deduction in respect of profits and gains from undertakings
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 ${
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

        {/* Section (a) */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            Section (a): Industrial Undertakings (IT Rule 4A)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-300 bg-white text-sm">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-blue-300 px-4 py-3 text-left font-semibold">Item</th>
                  <th className="border border-blue-300 px-4 py-3 text-left font-semibold">Description</th>
                  <th className="border border-blue-300 px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderUndertakingRow("a1", "First undertaking", "", "undertakingA1Deduction", "undertakingA1Deduction", "blue")}
                {renderUndertakingRow("a2", "Second undertaking", "", "undertakingA2Deduction", "undertakingA2Deduction", "blue")}
              </tbody>
              <tfoot className="bg-blue-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-blue-300 px-4 py-3">Total (a)</td>
                  <td className="border border-blue-300 px-4 py-3 text-right">₹{calculations.totalA.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section (b) */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-6">
            Section (b): Infrastructure Development (IT Rule 4AB)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-purple-300 bg-white text-sm">
              <thead className="bg-purple-200">
                <tr>
                  <th className="border border-purple-300 px-4 py-3 text-left font-semibold">Item</th>
                  <th className="border border-purple-300 px-4 py-3 text-left font-semibold">Description</th>
                  <th className="border border-purple-300 px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderUndertakingRow("b1", "First undertaking", "", "undertakingB1Deduction", "undertakingB1Deduction", "purple")}
                {renderUndertakingRow("b2", "Second undertaking", "", "undertakingB2Deduction", "undertakingB2Deduction", "purple")}
              </tbody>
              <tfoot className="bg-purple-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-purple-300 px-4 py-3">Total (b)</td>
                  <td className="border border-purple-300 px-4 py-3 text-right">₹{calculations.totalB.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section (c) */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-6">
            Section (c): Mineral Oil Processing (IT Rule 4AC)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-amber-300 bg-white text-sm">
              <thead className="bg-amber-200">
                <tr>
                  <th className="border border-amber-300 px-4 py-3 text-left font-semibold">Item</th>
                  <th className="border border-amber-300 px-4 py-3 text-left font-semibold">Description</th>
                  <th className="border border-amber-300 px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderUndertakingRow("c1", "First undertaking", "", "undertakingC1Deduction", "undertakingC1Deduction", "amber")}
                {renderUndertakingRow("c2", "Second undertaking", "", "undertakingC2Deduction", "undertakingC2Deduction", "amber")}
              </tbody>
              <tfoot className="bg-amber-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-amber-300 px-4 py-3">Total (c)</td>
                  <td className="border border-amber-300 px-4 py-3 text-right">₹{calculations.totalC.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section (ca) */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900 mb-6">
            Section (ca): Agricultural Products (IT Rule 4ACA)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-orange-300 bg-white text-sm">
              <thead className="bg-orange-200">
                <tr>
                  <th className="border border-orange-300 px-4 py-3 text-left font-semibold">Item</th>
                  <th className="border border-orange-300 px-4 py-3 text-left font-semibold">Description</th>
                  <th className="border border-orange-300 px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderUndertakingRow("ca1", "First undertaking", "", "undertakingCA1Deduction", "undertakingCA1Deduction", "orange")}
                {renderUndertakingRow("ca2", "Second undertaking", "", "undertakingCA2Deduction", "undertakingCA2Deduction", "orange")}
              </tbody>
              <tfoot className="bg-orange-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-orange-300 px-4 py-3">Total (ca)</td>
                  <td className="border border-orange-300 px-4 py-3 text-right">₹{calculations.totalCA.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section (d) */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-6">
            Section (d): Special Economic Zone
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-red-300 bg-white text-sm">
              <thead className="bg-red-200">
                <tr>
                  <th className="border border-red-300 px-4 py-3 text-left font-semibold">Item</th>
                  <th className="border border-red-300 px-4 py-3 text-left font-semibold">Description</th>
                  <th className="border border-red-300 px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderUndertakingRow("d1", "First undertaking", "", "undertakingD1Deduction", "undertakingD1Deduction", "red")}
                {renderUndertakingRow("d2", "Second undertaking", "", "undertakingD2Deduction", "undertakingD2Deduction", "red")}
              </tbody>
              <tfoot className="bg-red-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-red-300 px-4 py-3">Total (d)</td>
                  <td className="border border-red-300 px-4 py-3 text-right">₹{calculations.totalD.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section (e) */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-6">
            Section (e): Grain Handling (IT Rule 4AD)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-green-300 bg-white text-sm">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-green-300 px-4 py-3 text-left font-semibold">Item</th>
                  <th className="border border-green-300 px-4 py-3 text-left font-semibold">Description</th>
                  <th className="border border-green-300 px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderUndertakingRow("e1", "First undertaking", "", "undertakingE1Deduction", "undertakingE1Deduction", "green")}
                {renderUndertakingRow("e2", "Second undertaking", "", "undertakingE2Deduction", "undertakingE2Deduction", "green")}
              </tbody>
              <tfoot className="bg-green-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-green-300 px-4 py-3">Total (e)</td>
                  <td className="border border-green-300 px-4 py-3 text-right">₹{calculations.totalE.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Grand Total */}
        <div className="rounded-xl border-2 border-lime-900 bg-lime-100 p-6">
          <h3 className="text-lg font-bold text-lime-900 mb-4">Total Deduction u/s 80-IB</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-lime-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Total Deduction (a + b + c + ca + d + e):
            </p>
            <p className="text-3xl font-bold text-lime-700">₹{calculations.grandTotal.toFixed(2)}</p>
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
          className="flex-1 rounded-lg bg-lime-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-lime-700"
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
