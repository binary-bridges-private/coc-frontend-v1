"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleIPSchema = z
  .object({
    // Assessee Details
    assesseePhone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
        message: "Phone number must be 10 digits starting with 6-9",
      }),

    assesseePAN: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
        message: "PAN must be 10 alphanumeric characters",
      }),

    // Partnership Firms (max 4)
    // Firm 1
    firm1Name: z.string().default(""),
    firm1PAN: z.string().default(""),
    firm1IsLiableForAudit: z.string().default(""),
    firm1AuditReportFile: z.string().default(""),
    firm1PercentageShare: z.string().default("0"),
    firm1ShareInProfit: z.string().default("0"),
    firm1CapitalBalance: z.string().default("0"),

    // Firm 2
    firm2Name: z.string().default(""),
    firm2PAN: z.string().default(""),
    firm2IsLiableForAudit: z.string().default(""),
    firm2AuditReportFile: z.string().default(""),
    firm2PercentageShare: z.string().default("0"),
    firm2ShareInProfit: z.string().default("0"),
    firm2CapitalBalance: z.string().default("0"),

    // Firm 3
    firm3Name: z.string().default(""),
    firm3PAN: z.string().default(""),
    firm3IsLiableForAudit: z.string().default(""),
    firm3AuditReportFile: z.string().default(""),
    firm3PercentageShare: z.string().default("0"),
    firm3ShareInProfit: z.string().default("0"),
    firm3CapitalBalance: z.string().default("0"),

    // Firm 4
    firm4Name: z.string().default(""),
    firm4PAN: z.string().default(""),
    firm4IsLiableForAudit: z.string().default(""),
    firm4AuditReportFile: z.string().default(""),
    firm4PercentageShare: z.string().default("0"),
    firm4ShareInProfit: z.string().default("0"),
    firm4CapitalBalance: z.string().default("0"),

    totalPercentageShare: z.string().default("0"),
    totalShareInProfit: z.string().default("0"),
    totalCapitalBalance: z.string().default("0"),
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

    const validatePAN = (value: string | undefined, fieldName: string, path: (string | number)[]) => {
      if (value && value !== "" && value.trim() !== "") {
        if (!/^[A-Z0-9]{10}$/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: "PAN must be 10 alphanumeric characters",
          });
        }
      }
    };

    // Validate all firms - use type assertion to handle dynamic keys
    const firms = [1, 2, 3, 4] as const;
    firms.forEach((i) => {
      const panField = `firm${i}PAN` as keyof ScheduleIPFormData;
      const shareField = `firm${i}PercentageShare` as keyof ScheduleIPFormData;
      const profitField = `firm${i}ShareInProfit` as keyof ScheduleIPFormData;
      const capitalField = `firm${i}CapitalBalance` as keyof ScheduleIPFormData;

      validatePAN(data[panField] as string, panField as string, [panField]);
      validateNumeric(data[shareField] as string, shareField as string, [shareField]);
      validateNumeric(data[profitField] as string, profitField as string, [profitField]);
      validateNumeric(data[capitalField] as string, capitalField as string, [capitalField]);
    });

    validateNumeric(data.assesseePAN as string, "assesseePAN", ["assesseePAN"]);
    validateNumeric(data.totalPercentageShare as string, "totalPercentageShare", ["totalPercentageShare"]);
    validateNumeric(data.totalShareInProfit as string, "totalShareInProfit", ["totalShareInProfit"]);
    validateNumeric(data.totalCapitalBalance as string, "totalCapitalBalance", ["totalCapitalBalance"]);

    console.log("Schedule IP - Partnership Firms Information", data);
  });

export type ScheduleIPFormData = z.infer<typeof ScheduleIPSchema>;

interface ScheduleIPProps {
  initialData?: Partial<ScheduleIPFormData>;
  onSave: (data: ScheduleIPFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleIP({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleIPProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleIPFormData>({
    resolver: zodResolver(ScheduleIPSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const totalShare =
      parseVal(watched.firm1PercentageShare) +
      parseVal(watched.firm2PercentageShare) +
      parseVal(watched.firm3PercentageShare) +
      parseVal(watched.firm4PercentageShare);

    const totalProfit =
      parseVal(watched.firm1ShareInProfit) +
      parseVal(watched.firm2ShareInProfit) +
      parseVal(watched.firm3ShareInProfit) +
      parseVal(watched.firm4ShareInProfit);

    const totalCapital =
      parseVal(watched.firm1CapitalBalance) +
      parseVal(watched.firm2CapitalBalance) +
      parseVal(watched.firm3CapitalBalance) +
      parseVal(watched.firm4CapitalBalance);

    return { totalShare, totalProfit, totalCapital };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleIPFormData> = (data) => {
    onSave(data);
  };

  const renderFirmRow = (firmNum: 1 | 2 | 3 | 4) => {
    const nameField = `firm${firmNum}Name` as const;
    const panField = `firm${firmNum}PAN` as const;
    const auditField = `firm${firmNum}IsLiableForAudit` as const;
    const fileField = `firm${firmNum}AuditReportFile` as const;
    const shareField = `firm${firmNum}PercentageShare` as const;
    const profitField = `firm${firmNum}ShareInProfit` as const;
    const capitalField = `firm${firmNum}CapitalBalance` as const;

    return (
      <tr key={firmNum} className="hover:bg-green-50">
        <td className="border border-green-300 px-3 py-2 font-semibold text-center">
          {firmNum}
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={nameField}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Firm name"
              />
            )}
          />
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={panField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm ${
                    errors[panField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="PAN"
                />
                {errors[panField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[panField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={auditField}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value || ""}
                className="w-full px-2 py-1 border rounded text-sm"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            )}
          />
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={fileField}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Audit report file"
              />
            )}
          />
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={shareField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm text-right ${
                    errors[shareField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors[shareField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[shareField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={profitField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm text-right ${
                    errors[profitField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors[profitField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[profitField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
        <td className="border border-green-300 px-3 py-2">
          <Controller
            name={capitalField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm text-right ${
                    errors[capitalField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors[capitalField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[capitalField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
      </tr>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-green-900">
          Schedule IP - Information Regarding Partnership Firms
        </h1>
        <p className="mt-1 text-sm text-green-700">
          Details of partnership firms in which you are a partner
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
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
                PAN (10 characters)
              </label>
              <Controller
                name="assesseePAN"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.assesseePAN ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., AAAPB1234C"
                    />
                    {errors.assesseePAN && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.assesseePAN.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Partnership Firms Table */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-6">
            Partnership Firms Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-green-300 bg-white text-xs">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-green-300 px-3 py-2 text-center font-semibold">
                    Sl. No.
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-left font-semibold">
                    Name of the Firm
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-left font-semibold">
                    PAN of the firm
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-left font-semibold">
                    Whether the firm is liable for audit (Yes/No)
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-left font-semibold">
                    Whether Audit report filing
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-right font-semibold">
                    Percentage Share
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-right font-semibold">
                    Amount of share in the profit
                  </th>
                  <th className="border border-green-300 px-3 py-2 text-right font-semibold">
                    Capital balance 31st March
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderFirmRow(1)}
                {renderFirmRow(2)}
                {renderFirmRow(3)}
                {renderFirmRow(4)}
              </tbody>
              <tfoot className="bg-green-100 font-bold">
                <tr>
                  <td colSpan={5} className="border border-green-300 px-3 py-2">
                    Total
                  </td>
                  <td className="border border-green-300 px-3 py-2 text-right">
                    {calculations.totalShare.toFixed(2)}
                  </td>
                  <td className="border border-green-300 px-3 py-2 text-right">
                    ₹{calculations.totalProfit.toFixed(2)}
                  </td>
                  <td className="border border-green-300 px-3 py-2 text-right">
                    ₹{calculations.totalCapital.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-green-900 bg-green-100 p-6">
          <h3 className="text-lg font-bold text-green-900 mb-4">
            Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-green-300 space-y-3">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Percentage Share:</p>
              <p className="text-lg font-bold text-green-700">
                {calculations.totalShare.toFixed(2)}%
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Share in Profit:</p>
              <p className="text-lg font-bold text-green-700">
                ₹{calculations.totalProfit.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Capital Balance:</p>
              <p className="text-lg font-bold text-green-700">
                ₹{calculations.totalCapital.toFixed(2)}
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
          className="flex-1 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
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
