"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleAMTCSchema = z
  .object({
    // Tax under section 115JC in assessment year 2025-26
    taxU115JC: z.string().default("0"),

    // Tax under other provisions of the Act in assessment year 2025-26
    taxOtherProvisions: z.string().default("0"),

    // Difference (Tax to be paid as AMT)
    amtTaxDifference: z.string().default("0"),

    // AMT Credit Utilization Table (6 years)
    ay201415: z.string().default("0"),
    ay201516: z.string().default("0"),
    ay201617: z.string().default("0"),
    ay201718: z.string().default("0"),
    ay201819: z.string().default("0"),
    ay201920: z.string().default("0"),

    // Current year entry
    currentYearEntry: z.string().default("0"),

    // Total tax credit utilized
    totalTaxCreditUtilized: z.string().default("0"),

    // Amount of AMT liability available for credit in subsequent years
    amtLiabilityAvailable: z.string().default("0"),
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

    const fields = [
      "taxU115JC",
      "taxOtherProvisions",
      "amtTaxDifference",
      "ay201415",
      "ay201516",
      "ay201617",
      "ay201718",
      "ay201819",
      "ay201920",
      "currentYearEntry",
      "totalTaxCreditUtilized",
      "amtLiabilityAvailable",
    ];

    fields.forEach((field) => {
      validateNumeric(data[field as keyof typeof data] as string, field, [field]);
    });

    console.log("Schedule AMTC - AMT Credit Computation", data);
  });

export type ScheduleAMTCFormData = z.infer<typeof ScheduleAMTCSchema>;

interface ScheduleAMTCProps {
  initialData?: Partial<ScheduleAMTCFormData>;
  onSave: (data: ScheduleAMTCFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleAMTC({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleAMTCProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleAMTCFormData>({
    resolver: zodResolver(ScheduleAMTCSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const totalAYCredit =
      parseVal(watched.ay201415) +
      parseVal(watched.ay201516) +
      parseVal(watched.ay201617) +
      parseVal(watched.ay201718) +
      parseVal(watched.ay201819) +
      parseVal(watched.ay201920);

    return { totalAYCredit };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleAMTCFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-fuchsia-50 to-pink-50 border-b border-fuchsia-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-fuchsia-900">
          Schedule AMTC - Computation of Tax Credit u/s 115JD
        </h1>
        <p className="mt-1 text-sm text-fuchsia-700">
          Tax credit computation and AMT credit utilization
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-8">
        
        {/* Part 1: Tax Computation */}
        <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-6">
          <h2 className="text-lg font-bold text-fuchsia-900 mb-6">
            Tax Liability Comparison
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1. Tax u/s 115JC in Assessment Year 2025-26 (1 of Part-B-ITI)
                </label>
                <Controller
                  name="taxU115JC"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-right ${
                          errors.taxU115JC ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.taxU115JC && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.taxU115JC.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (1)
                </label>
                <p className="text-sm text-gray-500 pt-2">Reference: Part B-ITI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t-2 border-fuchsia-300 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2. Tax u/s other provisions of the Act in AY 2025-26 (2 of Part-B-ITI)
                </label>
                <Controller
                  name="taxOtherProvisions"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right ${
                          errors.taxOtherProvisions ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.taxOtherProvisions && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.taxOtherProvisions.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (2)
                </label>
                <p className="text-sm text-gray-500 pt-2">Reference: Part B-ITI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t-2 border-fuchsia-300 pt-4 bg-fuchsia-100 p-4 rounded">
              <div>
                <label className="block text-sm font-bold text-fuchsia-900 mb-2">
                  3. Difference (2 - 1) [Amount to be paid as AMT if positive, otherwise enter 0]
                </label>
                <Controller
                  name="amtTaxDifference"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      className={`w-full px-3 py-2 border rounded-lg text-right font-bold ${
                        errors.amtTaxDifference ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-fuchsia-900 mb-2">
                  Amount (3)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: AMT Credit Utilization */}
        <div className="rounded-xl border border-pink-200 bg-pink-50 p-6">
          <h2 className="text-lg font-bold text-pink-900 mb-6">
            Utilization of AMT Credit Available (Sum of AMT credit utilized during current year is subject to maximum of amount mentioned in 3 above and cannot exceed sum of AMT Credit Brought Forward)
          </h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-pink-300 bg-white text-sm">
              <thead className="bg-pink-200">
                <tr>
                  <th className="border border-pink-300 px-3 py-2 text-left">
                    Assessment Year (A)
                  </th>
                  <th className="border border-pink-300 px-3 py-2 text-right">
                    Gross (B1)
                  </th>
                  <th className="border border-pink-300 px-3 py-2 text-right">
                    Set-off in earlier assessment
                  </th>
                  <th className="border border-pink-300 px-3 py-2 text-right">
                    Balance brought forward to current assessment (B3)=(B1)-(B2)
                  </th>
                  <th className="border border-pink-300 px-3 py-2 text-right">
                    Utilized during the Current Year (C)
                  </th>
                  <th className="border border-pink-300 px-3 py-2 text-right">
                    Balance Carried Forward (D)=(B3)-(C)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "2014-15", field: "ay201415" },
                  { label: "2015-16", field: "ay201516" },
                  { label: "2016-17", field: "ay201617" },
                  { label: "2017-18", field: "ay201718" },
                  { label: "2018-19", field: "ay201819" },
                  { label: "2019-20", field: "ay201920" },
                ].map(({ label, field }) => (
                  <tr key={field} className="hover:bg-pink-50">
                    <td className="border border-pink-300 px-3 py-2 font-medium">
                      {label}
                    </td>
                    <td className="border border-pink-300 px-3 py-2" colSpan={5}>
                      <div className="grid grid-cols-5 gap-2">
                        <input
                          type="text"
                          disabled
                          className="px-2 py-1 border rounded bg-gray-100 text-xs"
                          placeholder="B1"
                        />
                        <input
                          type="text"
                          disabled
                          className="px-2 py-1 border rounded bg-gray-100 text-xs"
                          placeholder="B2"
                        />
                        <input
                          type="text"
                          disabled
                          className="px-2 py-1 border rounded bg-gray-100 text-xs"
                          placeholder="B3"
                        />
                        <Controller
                          name={field as keyof ScheduleAMTCFormData}
                          control={control}
                          render={({ field: inputField }) => (
                            <input
                              {...inputField}
                              type="text"
                              value={inputField.value || ""}
                              className={`px-2 py-1 border rounded text-xs text-right ${
                                errors[field as keyof ScheduleAMTCFormData]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="C"
                            />
                          )}
                        />
                        <input
                          type="text"
                          disabled
                          className="px-2 py-1 border rounded bg-gray-100 text-xs"
                          placeholder="D"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current AY (enter i = if i &gt; 2 else enter 0)
              </label>
              <Controller
                name="currentYearEntry"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className={`w-full px-3 py-2 border rounded-lg text-right ${
                      errors.currentYearEntry ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t-2 border-pink-300 pt-4 mt-4">
            <div>
              <label className="block text-sm font-bold text-pink-900 mb-2">
                5. Amount of tax-credit under section 115JD utilized during the year [total of item no 4]
              </label>
              <Controller
                name="totalTaxCreditUtilized"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className={`w-full px-3 py-2 border rounded-lg text-right font-bold ${
                      errors.totalTaxCreditUtilized ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                )}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-pink-900 pt-10">5</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t-2 border-pink-300 pt-4 mt-4 bg-pink-100 p-4 rounded">
            <div>
              <label className="block text-sm font-bold text-pink-900 mb-2">
                6. Amount of AMT liability available for credit in subsequent assessment years [total of 4 (D)]
              </label>
              <Controller
                name="amtLiabilityAvailable"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className={`w-full px-3 py-2 border rounded-lg text-right font-bold ${
                      errors.amtLiabilityAvailable ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                )}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-pink-900 pt-10">6</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-fuchsia-900 bg-fuchsia-100 p-6">
          <h3 className="text-lg font-bold text-fuchsia-900 mb-4">
            Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-fuchsia-300 space-y-3">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">AMT Tax Difference:</p>
              <p className="text-lg font-bold text-fuchsia-700">
                ₹{parseFloat(watched.amtTaxDifference || "0").toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Tax Credit Utilized:</p>
              <p className="text-lg font-bold text-pink-700">
                ₹{parseFloat(watched.totalTaxCreditUtilized || "0").toFixed(2)}
              </p>
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
          className="flex-1 rounded-lg bg-fuchsia-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fuchsia-700"
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
