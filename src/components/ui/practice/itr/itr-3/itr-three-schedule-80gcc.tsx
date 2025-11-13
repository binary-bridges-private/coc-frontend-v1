"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule80GCCSchema = z
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

    // Contributions rows
    contributions: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          date: z.string().default(""),
          contributionCash: z.string().default("0"),
          contributionOtherMode: z.string().default("0"),
          totalContribution: z.string().default("0"),
          eligibleAmount: z.string().default("0"),
          transactionRefNo: z.string().optional(),
          bankCode: z.string().optional(),
        })
      )
      .default([
        { id: "1", sNo: "i", date: "", contributionCash: "0", contributionOtherMode: "0", totalContribution: "0", eligibleAmount: "0", transactionRefNo: "", bankCode: "" },
        { id: "2", sNo: "ii", date: "", contributionCash: "0", contributionOtherMode: "0", totalContribution: "0", eligibleAmount: "0", transactionRefNo: "", bankCode: "" },
        { id: "3", sNo: "(add rows)", date: "", contributionCash: "0", contributionOtherMode: "0", totalContribution: "0", eligibleAmount: "0", transactionRefNo: "", bankCode: "" },
        { id: "4", sNo: "Total contribution", date: "", contributionCash: "0", contributionOtherMode: "0", totalContribution: "0", eligibleAmount: "0", transactionRefNo: "", bankCode: "" },
      ]),
  })
  .superRefine((data, ctx) => {
    // Validate all numeric fields
    data.contributions?.forEach((row, idx) => {
      const validateNumeric = (value: string | undefined, fieldName: string) => {
        if (value !== undefined && value !== "") {
          const val = parseFloat(value);
          if (isNaN(val) || val < 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["contributions", idx, fieldName],
              message: "Must be a valid non-negative number",
            });
          }
        }
      };

      // Validate date format (YYYY-MM-DD or DD/MM/YYYY)
      if (row.date && row.date.trim() !== "") {
        const dateRegex = /^(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/;
        if (!dateRegex.test(row.date)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["contributions", idx, "date"],
            message: "Date must be in YYYY-MM-DD or DD/MM/YYYY format",
          });
        }
      }

      validateNumeric(row.contributionCash, "contributionCash");
      validateNumeric(row.contributionOtherMode, "contributionOtherMode");
    });

    console.log("Schedule 80GCC - Details of contributions to political parties", data);
  });

export type Schedule80GCCFormData = z.infer<typeof Schedule80GCCSchema>;

interface Schedule80GCCProps {
  initialData?: Partial<Schedule80GCCFormData>;
  onSave: (data: Schedule80GCCFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80GCC({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80GCCProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80GCCFormData>({
    resolver: zodResolver(Schedule80GCCSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const totalCash = (watched.contributions || []).reduce((sum, row) => sum + parseVal(row.contributionCash), 0);
    const totalOther = (watched.contributions || []).reduce((sum, row) => sum + parseVal(row.contributionOtherMode), 0);
    const totalContribution = (watched.contributions || []).reduce((sum, row) => sum + parseVal(row.totalContribution), 0);
    const totalEligible = (watched.contributions || []).reduce((sum, row) => sum + parseVal(row.eligibleAmount), 0);

    return {
      totalCash,
      totalOther,
      totalContribution,
      totalEligible,
    };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80GCCFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-red-50 to-rose-50 border-b border-red-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-red-900">
          Schedule 80GCC - Details of Contributions Made to Political Parties
        </h1>
        <p className="mt-1 text-sm text-red-700">
          Deduction u/s 80GCC for contributions to registered political parties
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
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

        {/* Contributions Table */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-bold text-red-900 mb-6">
            Details of Contributions Made to Political Parties
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-red-300 bg-white text-xs">
              <thead className="bg-red-200">
                <tr>
                  <th className="border border-red-300 px-2 py-2 text-left font-semibold">S. No.</th>
                  <th className="border border-red-300 px-2 py-2 text-left font-semibold">Date</th>
                  <th className="border border-red-300 px-2 py-2 text-center font-semibold">Contribution in Cash</th>
                  <th className="border border-red-300 px-2 py-2 text-center font-semibold">Contribution in Other Mode</th>
                  <th className="border border-red-300 px-2 py-2 text-center font-semibold">Total Contribution</th>
                  <th className="border border-red-300 px-2 py-2 text-center font-semibold">Eligible Amount of Contribution</th>
                  <th className="border border-red-300 px-2 py-2 text-left font-semibold">Transaction Reference No. / UPI ID / NEFT/RTGS Ref.</th>
                  <th className="border border-red-300 px-2 py-2 text-left font-semibold">IFSC Code of Bank</th>
                </tr>
              </thead>
              <tbody>
                {(watched.contributions || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-red-50">
                    <td className="border border-red-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.date`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-xs ${
                                errors?.contributions?.[idx]?.date
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="DD/MM/YYYY"
                            />
                            {errors?.contributions?.[idx]?.date && (
                              <p className="text-xs text-red-600 mt-0.5">
                                {errors.contributions[idx].date?.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.contributionCash`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs text-right"
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.contributionOtherMode`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs text-right"
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.totalContribution`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs text-right bg-gray-100"
                            readOnly
                            placeholder="Auto"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.eligibleAmount`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs text-right bg-gray-100 font-bold"
                            readOnly
                            placeholder="Auto"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.transactionRefNo`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="Ref. No."
                          />
                        )}
                      />
                    </td>
                    <td className="border border-red-300 px-2 py-2">
                      <Controller
                        name={`contributions.${idx}.bankCode`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="IFSC"
                          />
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-red-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-red-300 px-2 py-2">
                    Total
                  </td>
                  <td className="border border-red-300 px-2 py-2 text-right">
                    ₹{calculations.totalCash.toFixed(2)}
                  </td>
                  <td className="border border-red-300 px-2 py-2 text-right">
                    ₹{calculations.totalOther.toFixed(2)}
                  </td>
                  <td className="border border-red-300 px-2 py-2 text-right">
                    ₹{calculations.totalContribution.toFixed(2)}
                  </td>
                  <td className="border border-red-300 px-2 py-2 text-right">
                    ₹{calculations.totalEligible.toFixed(2)}
                  </td>
                  <td colSpan={2} className="border border-red-300 px-2 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-red-900 bg-red-100 p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">Total Eligible Deduction u/s 80GCC</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-red-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Eligible Amount:</p>
            <p className="text-3xl font-bold text-red-700">₹{calculations.totalEligible.toFixed(2)}</p>
            <p className="text-xs text-gray-600 mt-4">Maximum deduction under 80GCC is limited to contribution amount</p>
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
          className="flex-1 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
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
