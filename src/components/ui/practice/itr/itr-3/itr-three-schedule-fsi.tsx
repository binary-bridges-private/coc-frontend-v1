"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleFSISchema = z
  .object({
    // Foreign Source Income - Max 2 entries
    // Entry 1
    entry1CountryCode: z.string().default(""),
    entry1TaxpayerIdNumber: z.string().default(""),
    entry1SlNo: z.string().default("1"),
    entry1HeadOfIncome: z.string().default(""),

    entry1IncomeSalary: z.string().default("0"),
    entry1IncomeHouseProperty: z.string().default("0"),
    entry1IncomeProfession: z.string().default("0"),
    entry1IncomeCapitalGains: z.string().default("0"),
    entry1IncomeOtherSources: z.string().default("0"),
    entry1IncomeTotal: z.string().default("0"),

    entry1TaxPaidAbroad: z.string().default("0"),
    entry1TaxPayableInIndia: z.string().default("0"),
    entry1TaxReliefAvailable: z.string().default("0"),
    entry1RelevantArticle: z.string().default(""),

    // Entry 2
    entry2CountryCode: z.string().default(""),
    entry2TaxpayerIdNumber: z.string().default(""),
    entry2SlNo: z.string().default("2"),
    entry2HeadOfIncome: z.string().default(""),

    entry2IncomeSalary: z.string().default("0"),
    entry2IncomeHouseProperty: z.string().default("0"),
    entry2IncomeProfession: z.string().default("0"),
    entry2IncomeCapitalGains: z.string().default("0"),
    entry2IncomeOtherSources: z.string().default("0"),
    entry2IncomeTotal: z.string().default("0"),

    entry2TaxPaidAbroad: z.string().default("0"),
    entry2TaxPayableInIndia: z.string().default("0"),
    entry2TaxReliefAvailable: z.string().default("0"),
    entry2RelevantArticle: z.string().default(""),

    totalIncomeFromAbroad: z.string().default("0"),
    totalTaxPaidAbroad: z.string().default("0"),
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
      "entry1IncomeSalary",
      "entry1IncomeHouseProperty",
      "entry1IncomeProfession",
      "entry1IncomeCapitalGains",
      "entry1IncomeOtherSources",
      "entry1IncomeTotal",
      "entry1TaxPaidAbroad",
      "entry1TaxPayableInIndia",
      "entry1TaxReliefAvailable",
      "entry2IncomeSalary",
      "entry2IncomeHouseProperty",
      "entry2IncomeProfession",
      "entry2IncomeCapitalGains",
      "entry2IncomeOtherSources",
      "entry2IncomeTotal",
      "entry2TaxPaidAbroad",
      "entry2TaxPayableInIndia",
      "entry2TaxReliefAvailable",
      "totalIncomeFromAbroad",
      "totalTaxPaidAbroad",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule FSI - Foreign Source Income", data);
  });

export type ScheduleFSIFormData = z.infer<typeof ScheduleFSISchema>;

interface ScheduleFSIProps {
  initialData?: Partial<ScheduleFSIFormData>;
  onSave: (data: ScheduleFSIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleFSI({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleFSIProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFSIFormData>({
    resolver: zodResolver(ScheduleFSISchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const entry1Total =
      parseVal(watched.entry1IncomeSalary) +
      parseVal(watched.entry1IncomeHouseProperty) +
      parseVal(watched.entry1IncomeProfession) +
      parseVal(watched.entry1IncomeCapitalGains) +
      parseVal(watched.entry1IncomeOtherSources);

    const entry2Total =
      parseVal(watched.entry2IncomeSalary) +
      parseVal(watched.entry2IncomeHouseProperty) +
      parseVal(watched.entry2IncomeProfession) +
      parseVal(watched.entry2IncomeCapitalGains) +
      parseVal(watched.entry2IncomeOtherSources);

    const totalIncome = entry1Total + entry2Total;
    const totalTax =
      parseVal(watched.entry1TaxPaidAbroad) +
      parseVal(watched.entry2TaxPaidAbroad);

    return { entry1Total, entry2Total, totalIncome, totalTax };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleFSIFormData> = (data) => {
    onSave(data);
  };

  const renderEntry = (entryNum: 1 | 2) => {
    const prefix = `entry${entryNum}` as const;
    const countryField = `${prefix}CountryCode` as const;
    const taxpayerField = `${prefix}TaxpayerIdNumber` as const;
    const slField = `${prefix}SlNo` as const;
    const headField = `${prefix}HeadOfIncome` as const;

    const salaryField = `${prefix}IncomeSalary` as const;
    const houseField = `${prefix}IncomeHouseProperty` as const;
    const profField = `${prefix}IncomeProfession` as const;
    const capField = `${prefix}IncomeCapitalGains` as const;
    const otherField = `${prefix}IncomeOtherSources` as const;
    const totalField = `${prefix}IncomeTotal` as const;

    const taxAbroadField = `${prefix}TaxPaidAbroad` as const;
    const taxIndiaField = `${prefix}TaxPayableInIndia` as const;
    const reliefField = `${prefix}TaxReliefAvailable` as const;
    const articleField = `${prefix}RelevantArticle` as const;

    return (
      <div
        key={entryNum}
        className="rounded-xl border border-indigo-200 bg-indigo-50 p-6"
      >
        <h3 className="text-lg font-bold text-indigo-900 mb-4">Entry {entryNum}</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., US, UK"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxpayer ID Number
            </label>
            <Controller
              name={taxpayerField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ID number"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Head of Income
            </label>
            <Controller
              name={headField}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Salary">Salary</option>
                  <option value="House Property">House Property</option>
                  <option value="Profession">Profession</option>
                  <option value="Capital Gains">Capital Gains</option>
                  <option value="Other Sources">Other Sources</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-white rounded-lg border border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-4">Income by Type</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary (₹)
              </label>
              <Controller
                name={salaryField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[salaryField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[salaryField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[salaryField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House Property (₹)
              </label>
              <Controller
                name={houseField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[houseField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[houseField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[houseField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profession (₹)
              </label>
              <Controller
                name={profField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[profField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[profField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[profField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capital Gains (₹)
              </label>
              <Controller
                name={capField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[capField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[capField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[capField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Sources (₹)
              </label>
              <Controller
                name={otherField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[otherField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[otherField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[otherField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total (₹)
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-indigo-100 font-bold">
                ₹
                {entryNum === 1
                  ? calculations.entry1Total.toFixed(2)
                  : calculations.entry2Total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-indigo-200">
          <h4 className="font-bold text-indigo-900 mb-4">Tax Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Paid Outside India (₹)
              </label>
              <Controller
                name={taxAbroadField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[taxAbroadField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[taxAbroadField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[taxAbroadField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Payable in India (₹)
              </label>
              <Controller
                name={taxIndiaField}
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors[taxIndiaField]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors[taxIndiaField] && (
                      <p className="mt-1 text-xs text-red-600">
                        {(errors[taxIndiaField] as any)?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Relief Available (₹)
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
                Relevant Article
              </label>
              <Controller
                name={articleField}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Article 13"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-900">
          Schedule FSI - Details of Income from Outside India and Tax Relief
        </h1>
        <p className="mt-1 text-sm text-indigo-700">
          Available only in case of resident taxpayers
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {renderEntry(1)}
        {renderEntry(2)}

        {/* Summary */}
        <div className="rounded-xl border-2 border-indigo-900 bg-indigo-100 p-6">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">
            Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-indigo-300 space-y-3">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Income from Abroad:</p>
              <p className="text-lg font-bold text-indigo-700">
                ₹{calculations.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Tax Paid Abroad:</p>
              <p className="text-lg font-bold text-indigo-700">
                ₹{calculations.totalTax.toFixed(2)}
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
          className="flex-1 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
