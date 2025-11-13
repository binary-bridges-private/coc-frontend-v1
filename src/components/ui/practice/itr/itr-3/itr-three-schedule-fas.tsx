"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleFASSchema = z
  .object({
    // Foreign Depository Accounts
    depAcctCount: z.string().default("0"),
    depAcctPeakBalance: z.string().default("0"),
    depAcctClosingBalance: z.string().default("0"),
    depAcctInterestEarned: z.string().default("0"),

    // Foreign Custodial Accounts
    custAcctCount: z.string().default("0"),
    custAcctGrossAmount: z.string().default("0"),

    // Foreign Equity & Debt
    equityInterestCount: z.string().default("0"),
    equityInterestValue: z.string().default("0"),

    // Foreign Immovable Property
    immovableCount: z.string().default("0"),
    immovableValue: z.string().default("0"),

    // Other Capital Assets
    otherAssetCount: z.string().default("0"),
    otherAssetValue: z.string().default("0"),

    // Foreign Sources Income
    foreignIncome: z.string().default("0"),

    // Foreign Assets Total
    totalForeignAssets: z.string().default("0"),

    // Reporting Details
    reportingYearStartDate: z.string().default(""),
    reportingYearEndDate: z.string().default(""),
    reportingMethodology: z.string().default(""),
    exchangeRateUsed: z.string().default(""),
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
      "depAcctCount",
      "depAcctPeakBalance",
      "depAcctClosingBalance",
      "depAcctInterestEarned",
      "custAcctCount",
      "custAcctGrossAmount",
      "equityInterestCount",
      "equityInterestValue",
      "immovableCount",
      "immovableValue",
      "otherAssetCount",
      "otherAssetValue",
      "foreignIncome",
      "totalForeignAssets",
      "exchangeRateUsed",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule FAS - Foreign Assets Summary", data);
  });

export type ScheduleFASFormData = z.infer<typeof ScheduleFASSchema>;

interface ScheduleFASProps {
  initialData?: Partial<ScheduleFASFormData>;
  onSave: (data: ScheduleFASFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleFAS({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleFASProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFASFormData>({
    resolver: zodResolver(ScheduleFASSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const depAcctTotal = parseVal(watched.depAcctPeakBalance);
    const custAcctTotal = parseVal(watched.custAcctGrossAmount);
    const equityTotal = parseVal(watched.equityInterestValue);
    const immovTotal = parseVal(watched.immovableValue);
    const otherTotal = parseVal(watched.otherAssetValue);

    const totalAssets =
      depAcctTotal + custAcctTotal + equityTotal + immovTotal + otherTotal;
    const incomeAssets = parseVal(watched.foreignIncome);

    return {
      depAcctTotal,
      custAcctTotal,
      equityTotal,
      immovTotal,
      otherTotal,
      totalAssets,
      incomeAssets,
    };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleFASFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-cyan-900">
          Schedule FAS - Summary of Foreign Assets
        </h1>
        <p className="mt-1 text-sm text-cyan-800">
          Summary of foreign assets, accounts, and income from Schedule FA
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Depository Accounts Summary */}
        <div className="rounded-xl border border-cyan-300 bg-cyan-50 p-6">
          <h2 className="text-lg font-bold text-cyan-900 mb-4">
            A. Foreign Depository Accounts Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Accounts
              </label>
              <Controller
                name="depAcctCount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.depAcctCount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                    {errors.depAcctCount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctCount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peak Balance (₹)
              </label>
              <Controller
                name="depAcctPeakBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.depAcctPeakBalance
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.depAcctPeakBalance && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctPeakBalance.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Balance (₹)
              </label>
              <Controller
                name="depAcctClosingBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.depAcctClosingBalance
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.depAcctClosingBalance && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctClosingBalance.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Earned (₹)
              </label>
              <Controller
                name="depAcctInterestEarned"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.depAcctInterestEarned
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.depAcctInterestEarned && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctInterestEarned.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Custodial Accounts Summary */}
        <div className="rounded-xl border border-blue-300 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            B. Foreign Custodial Accounts Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Accounts
              </label>
              <Controller
                name="custAcctCount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.custAcctCount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                    {errors.custAcctCount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.custAcctCount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Amount (₹)
              </label>
              <Controller
                name="custAcctGrossAmount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.custAcctGrossAmount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.custAcctGrossAmount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.custAcctGrossAmount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Equity & Debt Summary */}
        <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-4">
            C. Foreign Equity & Debt Holdings Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Holdings
              </label>
              <Controller
                name="equityInterestCount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.equityInterestCount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                    {errors.equityInterestCount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.equityInterestCount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Value (₹)
              </label>
              <Controller
                name="equityInterestValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.equityInterestValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.equityInterestValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.equityInterestValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Immovable Property Summary */}
        <div className="rounded-xl border border-purple-300 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            D. Foreign Immovable Property Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Properties
              </label>
              <Controller
                name="immovableCount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        errors.immovableCount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                    {errors.immovableCount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.immovableCount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Value (₹)
              </label>
              <Controller
                name="immovableValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        errors.immovableValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.immovableValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.immovableValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Other Assets Summary */}
        <div className="rounded-xl border border-pink-300 bg-pink-50 p-6">
          <h2 className="text-lg font-bold text-pink-900 mb-4">
            E. Other Foreign Capital Assets Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Assets
              </label>
              <Controller
                name="otherAssetCount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                        errors.otherAssetCount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0"
                    />
                    {errors.otherAssetCount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.otherAssetCount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Value (₹)
              </label>
              <Controller
                name="otherAssetValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                        errors.otherAssetValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.otherAssetValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.otherAssetValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Foreign Source Income */}
        <div className="rounded-xl border border-green-300 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">
            F. Foreign Source Income
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Foreign Income (₹)
              </label>
              <Controller
                name="foreignIncome"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.foreignIncome
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.foreignIncome && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.foreignIncome.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Reporting Methodology */}
        <div className="rounded-xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            G. Reporting Methodology & Details
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Year Start Date (DD/MM/YYYY)
              </label>
              <Controller
                name="reportingYearStartDate"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="DD/MM/YYYY"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Year End Date (DD/MM/YYYY)
              </label>
              <Controller
                name="reportingYearEndDate"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="DD/MM/YYYY"
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Methodology
            </label>
            <Controller
              name="reportingMethodology"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <option value="">Select methodology...</option>
                  <option value="accrual">Accrual Basis</option>
                  <option value="cash">Cash Basis</option>
                  <option value="fair-value">Fair Value</option>
                  <option value="other">Other (Specify)</option>
                </select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exchange Rate Used (if applicable)
            </label>
            <Controller
              name="exchangeRateUsed"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                      errors.exchangeRateUsed
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00 (e.g., 1 USD = 83.25 INR)"
                  />
                  {errors.exchangeRateUsed && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.exchangeRateUsed.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-slate-900 bg-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Total Foreign Assets Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-slate-300 space-y-3">
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Depository Accounts:</p>
              <p className="font-bold text-slate-700">₹{calculations.depAcctTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Custodial Accounts:</p>
              <p className="font-bold text-slate-700">₹{calculations.custAcctTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Equity & Debt:</p>
              <p className="font-bold text-slate-700">₹{calculations.equityTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Immovable Property:</p>
              <p className="font-bold text-slate-700">₹{calculations.immovTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Other Assets:</p>
              <p className="font-bold text-slate-700">₹{calculations.otherTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-slate-50 p-3 rounded font-bold border-t">
              <p className="text-gray-800">Total Foreign Assets:</p>
              <p className="text-lg text-slate-700">₹{calculations.totalAssets.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-green-50 p-3 rounded font-bold border-t">
              <p className="text-gray-800">Foreign Income:</p>
              <p className="text-lg text-green-700">₹{calculations.incomeAssets.toFixed(2)}</p>
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
          className="flex-1 rounded-lg bg-slate-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-stone-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
