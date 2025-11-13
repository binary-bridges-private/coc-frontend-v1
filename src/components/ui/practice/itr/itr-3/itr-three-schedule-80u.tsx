"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule80USchema = z
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

    // Self with disability rows
    disabilityRows: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nature: z.string().default(""), // Self with disability, Self with severe disability
          dateOfFilingForm10IA: z.string().default(""),
          ackNoForm10IA: z.string().optional(),
          ackNoPerRule11AQDI: z.string().optional(),
          uidNumber: z.string().optional(),
          amount: z.string().default("0"),
        })
      )
      .default([
        {
          id: "1",
          sNo: "1",
          nature: "Self with disability",
          dateOfFilingForm10IA: "",
          ackNoForm10IA: "",
          ackNoPerRule11AQDI: "",
          uidNumber: "",
          amount: "0",
        },
        {
          id: "2",
          sNo: "2",
          nature: "Self with severe disability",
          dateOfFilingForm10IA: "",
          ackNoForm10IA: "",
          ackNoPerRule11AQDI: "",
          uidNumber: "",
          amount: "0",
        },
      ]),

    totalDeduction: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    data.disabilityRows?.forEach((row, idx) => {
      // Validate amount
      if (row.amount !== undefined && row.amount !== "") {
        const val = parseFloat(row.amount);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["disabilityRows", idx, "amount"],
            message: "Must be a valid non-negative number",
          });
        }
      }
    });

    // Validate total deduction
    if (data.totalDeduction !== undefined && data.totalDeduction !== "") {
      const val = parseFloat(data.totalDeduction);
      if (isNaN(val) || val < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["totalDeduction"],
          message: "Must be a valid non-negative number",
        });
      }
    }

    console.log("Schedule 80U - Deduction in case of person with disability", data);
  });

export type Schedule80UFormData = z.infer<typeof Schedule80USchema>;

interface Schedule80UProps {
  initialData?: Partial<Schedule80UFormData>;
  onSave: (data: Schedule80UFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80U({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80UProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80UFormData>({
    resolver: zodResolver(Schedule80USchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total = (watched.disabilityRows || []).reduce(
      (sum, row) => sum + parseVal(row.amount),
      0
    );

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80UFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-cyan-900">
          Schedule 80U - Deduction in Case of Person with Disability
        </h1>
        <p className="mt-1 text-sm text-cyan-700">
          Deduction u/s 80U for self with disability or severe disability
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
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

        {/* Disability Details Table */}
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6">
          <h2 className="text-lg font-bold text-cyan-900 mb-6">
            Details of Deduction in Case of Person with Disability
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-cyan-300 bg-white text-xs">
              <thead className="bg-cyan-200">
                <tr>
                  <th className="border border-cyan-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-cyan-300 px-2 py-2 text-left font-semibold">Nature of Disability</th>
                  <th className="border border-cyan-300 px-2 py-2 text-left font-semibold">Date of Filing Form 10IA</th>
                  <th className="border border-cyan-300 px-2 py-2 text-left font-semibold">Ack. No. Form 10IA</th>
                  <th className="border border-cyan-300 px-2 py-2 text-left font-semibold">Ack No. Per Rule 11A(2)(i)</th>
                  <th className="border border-cyan-300 px-2 py-2 text-left font-semibold">UIDD Number</th>
                  <th className="border border-cyan-300 px-2 py-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(watched.disabilityRows || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-cyan-50">
                    <td className="border border-cyan-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-cyan-300 px-2 py-2">
                      <span className="text-xs font-medium">{row.nature}</span>
                    </td>
                    <td className="border border-cyan-300 px-2 py-2">
                      <Controller
                        name={`disabilityRows.${idx}.dateOfFilingForm10IA`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="DD/MM/YYYY"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-cyan-300 px-2 py-2">
                      <Controller
                        name={`disabilityRows.${idx}.ackNoForm10IA`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="Ack No."
                          />
                        )}
                      />
                    </td>
                    <td className="border border-cyan-300 px-2 py-2">
                      <Controller
                        name={`disabilityRows.${idx}.ackNoPerRule11AQDI`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="Ack No."
                          />
                        )}
                      />
                    </td>
                    <td className="border border-cyan-300 px-2 py-2">
                      <Controller
                        name={`disabilityRows.${idx}.uidNumber`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="UIDD"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-cyan-300 px-2 py-2">
                      <Controller
                        name={`disabilityRows.${idx}.amount`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-xs text-right ${
                                errors?.disabilityRows?.[idx]?.amount
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="0.00"
                            />
                            {errors?.disabilityRows?.[idx]?.amount && (
                              <p className="text-xs text-red-600 mt-0.5">
                                {errors.disabilityRows[idx].amount?.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-cyan-900 bg-cyan-100 p-6">
          <h3 className="text-lg font-bold text-cyan-900 mb-4">Total Deduction u/s 80U</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-cyan-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Deduction Amount:</p>
            <p className="text-3xl font-bold text-cyan-700">₹{calculations.total.toFixed(2)}</p>
            <p className="text-xs text-gray-600 mt-4">
              Maximum deduction: ₹75,000 for 40-79% disability, ₹125,000 for 80%+ disability
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
          className="flex-1 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
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
