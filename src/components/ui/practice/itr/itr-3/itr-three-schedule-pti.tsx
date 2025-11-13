"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SchedulePTISchema = z
  .object({
    // Pass Through Income Details - Max 2 entries
    // Entry 1
    entry1InvestmentEntityCovered: z.string().default(""),
    entry1NameOfBusiness: z.string().default(""),
    entry1PAN: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
        message: "PAN must be 10 alphanumeric characters",
      }),
    entry1SlNo: z.string().default(""),
    entry1HeadOfIncome: z.string().default(""),

    // Capital Gains Sub-entries (max 3 types)
    entry1CapGainShortTermSection111A: z.string().default("0"),
    entry1CapGainLongTermSection112A: z.string().default("0"),
    entry1CapGainOtherSections: z.string().default("0"),

    entry1OtherSourcesDividend: z.string().default("0"),
    entry1OtherSourcesOthers: z.string().default("0"),

    entry1IncomeclaimedExemptA: z.string().default("0"),
    entry1IncomeclaimedExemptB: z.string().default("0"),
    entry1IncomeclaimedExemptC: z.string().default("0"),

    entry1NetIncome: z.string().default("0"),
    entry1TLSOnSuchIncome: z.string().default("0"),

    // Entry 2
    entry2InvestmentEntityCovered: z.string().default(""),
    entry2NameOfBusiness: z.string().default(""),
    entry2PAN: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
        message: "PAN must be 10 alphanumeric characters",
      }),
    entry2SlNo: z.string().default(""),
    entry2HeadOfIncome: z.string().default(""),

    entry2CapGainShortTermSection111A: z.string().default("0"),
    entry2CapGainLongTermSection112A: z.string().default("0"),
    entry2CapGainOtherSections: z.string().default("0"),

    entry2OtherSourcesDividend: z.string().default("0"),
    entry2OtherSourcesOthers: z.string().default("0"),

    entry2IncomeclaimedExemptA: z.string().default("0"),
    entry2IncomeclaimedExemptB: z.string().default("0"),
    entry2IncomeclaimedExemptC: z.string().default("0"),

    entry2NetIncome: z.string().default("0"),
    entry2TLSOnSuchIncome: z.string().default("0"),

    totalIncome: z.string().default("0"),
    totalTLS: z.string().default("0"),
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
      "entry1CapGainShortTermSection111A",
      "entry1CapGainLongTermSection112A",
      "entry1CapGainOtherSections",
      "entry1OtherSourcesDividend",
      "entry1OtherSourcesOthers",
      "entry1IncomeclaimedExemptA",
      "entry1IncomeclaimedExemptB",
      "entry1IncomeclaimedExemptC",
      "entry1NetIncome",
      "entry1TLSOnSuchIncome",
      "entry2CapGainShortTermSection111A",
      "entry2CapGainLongTermSection112A",
      "entry2CapGainOtherSections",
      "entry2OtherSourcesDividend",
      "entry2OtherSourcesOthers",
      "entry2IncomeclaimedExemptA",
      "entry2IncomeclaimedExemptB",
      "entry2IncomeclaimedExemptC",
      "entry2NetIncome",
      "entry2TLSOnSuchIncome",
      "totalIncome",
      "totalTLS",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule PTI - Pass Through Income", data);
  });

export type SchedulePTIFormData = z.infer<typeof SchedulePTISchema>;

interface SchedulePTIProps {
  initialData?: Partial<SchedulePTIFormData>;
  onSave: (data: SchedulePTIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedulePTI({
  initialData,
  onSave,
  onNext,
  onBack,
}: SchedulePTIProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SchedulePTIFormData>({
    resolver: zodResolver(SchedulePTISchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const entry1Total =
      parseVal(watched.entry1CapGainShortTermSection111A) +
      parseVal(watched.entry1CapGainLongTermSection112A) +
      parseVal(watched.entry1CapGainOtherSections) +
      parseVal(watched.entry1OtherSourcesDividend) +
      parseVal(watched.entry1OtherSourcesOthers);

    const entry2Total =
      parseVal(watched.entry2CapGainShortTermSection111A) +
      parseVal(watched.entry2CapGainLongTermSection112A) +
      parseVal(watched.entry2CapGainOtherSections) +
      parseVal(watched.entry2OtherSourcesDividend) +
      parseVal(watched.entry2OtherSourcesOthers);

    const total =
      parseVal(watched.entry1NetIncome) + parseVal(watched.entry2NetIncome);
    const totalTls =
      parseVal(watched.entry1TLSOnSuchIncome) +
      parseVal(watched.entry2TLSOnSuchIncome);

    return { entry1Total, entry2Total, total, totalTls };
  }, [watched]);

  const onSubmit: SubmitHandler<SchedulePTIFormData> = (data) => {
    onSave(data);
  };

  const renderEntryFields = (entryNum: 1 | 2) => {
    const prefix = `entry${entryNum}` as const;
    const entityField = `${prefix}InvestmentEntityCovered` as const;
    const businessField = `${prefix}NameOfBusiness` as const;
    const panField = `${prefix}PAN` as const;
    const slField = `${prefix}SlNo` as const;
    const headField = `${prefix}HeadOfIncome` as const;

    const shortTermField = `${prefix}CapGainShortTermSection111A` as const;
    const longTermField = `${prefix}CapGainLongTermSection112A` as const;
    const otherCapField = `${prefix}CapGainOtherSections` as const;

    const dividendField = `${prefix}OtherSourcesDividend` as const;
    const otherSourcesField = `${prefix}OtherSourcesOthers` as const;

    const exemptAField = `${prefix}IncomeclaimedExemptA` as const;
    const exemptBField = `${prefix}IncomeclaimedExemptB` as const;
    const exemptCField = `${prefix}IncomeclaimedExemptC` as const;

    const netField = `${prefix}NetIncome` as const;
    const tlsField = `${prefix}TLSOnSuchIncome` as const;

    return (
      <div key={entryNum} className="border border-purple-200 rounded-lg p-6 bg-purple-50">
        <h3 className="text-lg font-bold text-purple-900 mb-4">
          Entry {entryNum}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment entity covered by reporting
            </label>
            <Controller
              name={entityField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Fund/Trust type"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Business
            </label>
            <Controller
              name={businessField}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Business name"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN
            </label>
            <Controller
              name={panField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[panField] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="10 chars"
                  />
                  {errors[panField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[panField] as any)?.message}
                    </p>
                  )}
                </>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Serial number"
                />
              )}
            />
          </div>
          <div className="col-span-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select</option>
                  <option value="House Property">House Property</option>
                  <option value="Capital Gains">Capital Gains</option>
                  <option value="Other Sources">Other Sources</option>
                </select>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capital Gains - Short term (Section 111A) (₹)
            </label>
            <Controller
              name={shortTermField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[shortTermField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[shortTermField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[shortTermField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capital Gains - Long term (Section 112A) (₹)
            </label>
            <Controller
              name={longTermField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[longTermField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[longTermField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[longTermField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capital Gains - Other sections (₹)
            </label>
            <Controller
              name={otherCapField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[otherCapField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[otherCapField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[otherCapField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Sources - Dividend (₹)
            </label>
            <Controller
              name={dividendField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[dividendField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[dividendField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[dividendField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Sources - Others (₹)
            </label>
            <Controller
              name={otherSourcesField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[otherSourcesField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[otherSourcesField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[otherSourcesField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income claimed to be exempt - A (₹)
            </label>
            <Controller
              name={exemptAField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[exemptAField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[exemptAField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[exemptAField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income claimed to be exempt - B (₹)
            </label>
            <Controller
              name={exemptBField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[exemptBField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[exemptBField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[exemptBField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income claimed to be exempt - C (₹)
            </label>
            <Controller
              name={exemptCField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[exemptCField]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[exemptCField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[exemptCField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Income (₹)
            </label>
            <Controller
              name={netField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[netField] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[netField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[netField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TLS on such income (₹)
            </label>
            <Controller
              name={tlsField}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors[tlsField] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                  {errors[tlsField] && (
                    <p className="mt-1 text-xs text-red-600">
                      {(errors[tlsField] as any)?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>
    );
  };

  const onSubmit2: SubmitHandler<SchedulePTIFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit2)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-purple-900">
          Schedule PTI - Pass Through Income Details from Business Trust or Investment Fund
        </h1>
        <p className="mt-1 text-sm text-purple-700">
          As per section 115U, 115UA and 115UB
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {renderEntryFields(1)}
        {renderEntryFields(2)}

        {/* Summary */}
        <div className="rounded-xl border-2 border-purple-900 bg-purple-100 p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-4">
            Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-purple-300 space-y-3">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Net Income:</p>
              <p className="text-lg font-bold text-purple-700">
                ₹{calculations.total.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total TLS on Income:</p>
              <p className="text-lg font-bold text-purple-700">
                ₹{calculations.totalTls.toFixed(2)}
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
          className="flex-1 rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-pink-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
