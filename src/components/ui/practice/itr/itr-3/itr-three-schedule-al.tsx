"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleALSchema = z
  .object({
    // Assets - Immovable Assets
    immovablePropertyDescription: z.string().default(""),
    immovablePropertyValue: z.string().default("0"),

    // Assets - Movable Assets
    jewelryBullionDescription: z.string().default(""),
    jewelryBullionValue: z.string().default("0"),

    archaeologicalDescription: z.string().default(""),
    archaeologicalValue: z.string().default("0"),

    vehiclesDescription: z.string().default(""),
    vehiclesValue: z.string().default("0"),

    // Assets - Financial Assets
    bankDepositsDescription: z.string().default(""),
    bankDepositsValue: z.string().default("0"),

    sharesSecuritiesDescription: z.string().default(""),
    sharesSecuritiesValue: z.string().default("0"),

    insurancePoliciesDescription: z.string().default(""),
    insurancePoliciesValue: z.string().default("0"),

    loansAdvancesDescription: z.string().default(""),
    loansAdvancesValue: z.string().default("0"),

    cashInHandDescription: z.string().default(""),
    cashInHandValue: z.string().default("0"),

    // Assets - Other Assets
    otherAssetsDescription: z.string().default(""),
    otherAssetsValue: z.string().default("0"),

    totalAssets: z.string().default("0"),

    // Liabilities
    liabilityDescription: z.string().default(""),
    liabilityAmount: z.string().default("0"),

    totalLiabilities: z.string().default("0"),

    // Net Worth
    netWorth: z.string().default("0"),
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
      "immovablePropertyValue",
      "jewelryBullionValue",
      "archaeologicalValue",
      "vehiclesValue",
      "bankDepositsValue",
      "sharesSecuritiesValue",
      "insurancePoliciesValue",
      "loansAdvancesValue",
      "cashInHandValue",
      "otherAssetsValue",
      "totalAssets",
      "liabilityAmount",
      "totalLiabilities",
      "netWorth",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule AL - Assets and Liabilities", data);
  });

export type ScheduleALFormData = z.infer<typeof ScheduleALSchema>;

interface ScheduleALProps {
  initialData?: Partial<ScheduleALFormData>;
  onSave: (data: ScheduleALFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleAL({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleALProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleALFormData>({
    resolver: zodResolver(ScheduleALSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const assets =
      parseVal(watched.immovablePropertyValue) +
      parseVal(watched.jewelryBullionValue) +
      parseVal(watched.archaeologicalValue) +
      parseVal(watched.vehiclesValue) +
      parseVal(watched.bankDepositsValue) +
      parseVal(watched.sharesSecuritiesValue) +
      parseVal(watched.insurancePoliciesValue) +
      parseVal(watched.loansAdvancesValue) +
      parseVal(watched.cashInHandValue) +
      parseVal(watched.otherAssetsValue);

    const liabilities = parseVal(watched.totalLiabilities);
    const netWorth = assets - liabilities;

    return { assets, liabilities, netWorth };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleALFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-slate-50 to-stone-50 border-b border-slate-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Schedule AL - Assets and Liabilities (Other than those included in Part A - BS)
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Applicable if gross total income exceeds Rs. 1 crore
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* ASSETS Section */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            A. DETAILS OF IMMOVABLE ASSETS
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Controller
                  name="immovablePropertyDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      value={field.value || ""}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="Property details..."
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <Controller
                  name="immovablePropertyValue"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.immovablePropertyValue
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.immovablePropertyValue && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.immovablePropertyValue.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Movable Assets */}
        <div className="rounded-xl border border-slate-200 bg-stone-50 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            B. DETAILS OF MOVABLE ASSETS
          </h2>

          {/* Jewelry, Bullion etc. */}
          <div className="mb-4 pb-4 border-b">
            <h3 className="font-semibold text-slate-800 mb-3">
              (i) Jewelry, bullion etc.
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Controller
                  name="jewelryBullionDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      value={field.value || ""}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="Details..."
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <Controller
                  name="jewelryBullionValue"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.jewelryBullionValue
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.jewelryBullionValue && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.jewelryBullionValue.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Archaeological, Collections etc. */}
          <div className="mb-4 pb-4 border-b">
            <h3 className="font-semibold text-slate-800 mb-3">
              (ii) Archaeological collections, drawings, paintings, sculpture or any work
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Controller
                  name="archaeologicalDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      value={field.value || ""}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="Details..."
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <Controller
                  name="archaeologicalValue"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.archaeologicalValue
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.archaeologicalValue && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.archaeologicalValue.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Vehicles, Yachts, Boats and Aircrafts */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">
              (iii) Vehicles, yachts, boats and aircrafts
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Controller
                  name="vehiclesDescription"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      value={field.value || ""}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="Details..."
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <Controller
                  name="vehiclesValue"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                          errors.vehiclesValue
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.vehiclesValue && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.vehiclesValue.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Assets */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            C. DETAILS OF FINANCIAL ASSETS
          </h2>

          <div className="space-y-4">
            {[
              { name: "bankDepositsDescription" as const, value: "bankDepositsValue" as const, label: "(i) Bank (including all deposits)" },
              { name: "sharesSecuritiesDescription" as const, value: "sharesSecuritiesValue" as const, label: "(ii) Shares and securities" },
              { name: "insurancePoliciesDescription" as const, value: "insurancePoliciesValue" as const, label: "(iii) Insurance policies" },
              { name: "loansAdvancesDescription" as const, value: "loansAdvancesValue" as const, label: "(iv) Loans and advances given" },
              { name: "cashInHandDescription" as const, value: "cashInHandValue" as const, label: "(v) Cash in hand" },
            ].map((item, idx) => (
              <div key={idx} className="pb-4 border-b last:border-b-0">
                <h3 className="font-semibold text-slate-800 mb-3">{item.label}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Controller
                      name={item.name}
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          value={field.value || ""}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                          placeholder="Details..."
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₹)
                    </label>
                    <Controller
                      name={item.value}
                      control={control}
                      render={({ field }) => {
                        const hasError = !!(errors as any)[item.value];
                        return (
                          <>
                            <input
                              type="text"
                              value={typeof field.value === "string" ? field.value : ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                                hasError
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="0.00"
                            />
                            {hasError && (
                              <p className="mt-1 text-xs text-red-600">
                                {((errors as any)[item.value] as any)?.message}
                              </p>
                            )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Assets */}
        <div className="rounded-xl border border-slate-200 bg-stone-50 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            D. OTHER ASSETS
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Controller
                name="otherAssetsDescription"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    value={field.value || ""}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Details..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <Controller
                name="otherAssetsValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                        errors.otherAssetsValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.otherAssetsValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.otherAssetsValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* LIABILITIES */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-4">
            D. LIABILITIES IN RELATION TO ASSETS (A + B + C)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Controller
                name="liabilityDescription"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    value={field.value || ""}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Details..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <Controller
                name="totalLiabilities"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.totalLiabilities
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.totalLiabilities && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.totalLiabilities.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-slate-900 bg-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Net Worth Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-slate-300 space-y-3">
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Assets:</p>
              <p className="font-bold text-slate-700">₹{calculations.assets.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Liabilities:</p>
              <p className="font-bold text-slate-700">₹{calculations.liabilities.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-slate-50 p-3 rounded font-bold">
              <p className="text-gray-800">Net Worth:</p>
              <p className="text-lg text-slate-700">₹{calculations.netWorth.toFixed(2)}</p>
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
