"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleEISchema = z
  .object({
    // Exempt Income Section
    interestIncome: z.string().default("0"),
    agriculturalReceipts: z.string().default("0"),
    agriculturalLossPrior: z.string().default("0"),
    agriculturalIncomeU4: z.string().default("0"),
    section10Details: z.string().default(""),

    // Agricultural Income Details
    agricDistrictName: z.string().default(""),
    agricPinCode: z.string().default(""),
    agricOwnedOrLeased: z.string().default(""),
    agricIrrigated: z.string().default(""),
    agricLandAcres: z.string().default("0"),

    // Agricultural Land Details
    agricLandLocationDetails: z.string().default(""),
    agricLandOwnedLeased: z.string().default(""),
    agricLandArea: z.string().default("0"),

    // Other Exempt Income
    otherExemptIncome: z.string().default("0"),
    otherExemptDescription: z.string().default(""),

    totalExemptIncome: z.string().default("0"),
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
      "interestIncome",
      "agriculturalReceipts",
      "agriculturalLossPrior",
      "agriculturalIncomeU4",
      "agricLandAcres",
      "agricLandArea",
      "otherExemptIncome",
      "totalExemptIncome",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    const pinCode = data.agricPinCode as string;
    if (pinCode && pinCode !== "" && !/^\d{6}$/.test(pinCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["agricPinCode"],
        message: "Pin code must be 6 digits",
      });
    }

    console.log("Schedule EI - Exempt Income", data);
  });

export type ScheduleEIFormData = z.infer<typeof ScheduleEISchema>;

interface ScheduleEIProps {
  initialData?: Partial<ScheduleEIFormData>;
  onSave: (data: ScheduleEIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleEI({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleEIProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleEIFormData>({
    resolver: zodResolver(ScheduleEISchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total =
      parseVal(watched.interestIncome) +
      parseVal(watched.agriculturalReceipts) +
      parseVal(watched.agriculturalLossPrior) +
      parseVal(watched.agriculturalIncomeU4) +
      parseVal(watched.otherExemptIncome);

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleEIFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-blue-900">
          Schedule EI - Details of Exempt Income
        </h1>
        <p className="mt-1 text-sm text-blue-700">
          Income not to be included in total income or not chargeable to tax
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-8">
        
        {/* Exempt Income Summary */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            Exempt Income Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Income (₹)
              </label>
              <Controller
                name="interestIncome"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.interestIncome ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.interestIncome && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.interestIncome.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Agricultural Receipts (₹)
              </label>
              <Controller
                name="agriculturalReceipts"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.agriculturalReceipts ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.agriculturalReceipts && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.agriculturalReceipts.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unabsorbed Agricultural Loss of Previous 8 Years (₹)
              </label>
              <Controller
                name="agriculturalLossPrior"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.agriculturalLossPrior ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.agriculturalLossPrior && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.agriculturalLossPrior.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agricultural Income u/s 4 (₹)
              </label>
              <Controller
                name="agriculturalIncomeU4"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.agriculturalIncomeU4 ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.agriculturalIncomeU4 && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.agriculturalIncomeU4.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Section 10 Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details of other income covered u/s 10 (if any)
          </label>
          <Controller
            name="section10Details"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                value={field.value || ""}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe other exempt income under Section 10..."
              />
            )}
          />
        </div>

        {/* Agricultural Land Details */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            Agricultural Land Details (Fill up details separately for each agricultural land)
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of District
              </label>
              <Controller
                name="agricDistrictName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="District name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Code (6 digits)
              </label>
              <Controller
                name="agricPinCode"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.agricPinCode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="000000"
                    />
                    {errors.agricPinCode && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.agricPinCode.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agricultural Land Owned or Leased
              </label>
              <Controller
                name="agricOwnedOrLeased"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agricultural Land Irrigated/Rainfed
              </label>
              <Controller
                name="agricIrrigated"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Irrigated">Irrigated</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area in Acres
              </label>
              <Controller
                name="agricLandAcres"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.agricLandAcres ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.agricLandAcres && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.agricLandAcres.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Agricultural Land Details Continued */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Details (Fill up details separately for each agricultural land)
            </label>
            <Controller
              name="agricLandLocationDetails"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  value={field.value || ""}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Location details..."
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Whether Agricultural Land is Owned or Held on Lease (Drop down to be provided)
            </label>
            <Controller
              name="agricLandOwnedLeased"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Owned">Owned</option>
                  <option value="Leased">Leased</option>
                </select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area in Acres
            </label>
            <Controller
              name="agricLandArea"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.agricLandArea ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.agricLandArea && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.agricLandArea.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* Other Exempt Income */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            Other Exempt Income (please specify)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <Controller
                name="otherExemptIncome"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.otherExemptIncome ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.otherExemptIncome && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.otherExemptIncome.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Controller
                name="otherExemptDescription"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe..."
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="rounded-xl border-2 border-blue-900 bg-blue-100 p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            Total Exempt Income
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-blue-300">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">Total Exempt Income:</p>
              <p className="text-2xl font-bold text-blue-700">
                ₹{calculations.total.toFixed(2)}
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
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
