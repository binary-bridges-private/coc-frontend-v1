"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule80DDSchema = z
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

    // Dependent person with disability rows
    dependentRows: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nature: z.string().default(""), // Dependent/Person with disability
          typeOfDependent: z.string().default(""), // Spouse, Son, Daughter, etc.
          panDependent: z.string().optional(),
          aadharDependent: z.string().optional(),
          dateOfBirth: z.string().default(""),
          ackNo: z.string().optional(),
          ackNoDate: z.string().optional(),
          uidNumber: z.string().optional(),
          amount: z.string().default("0"),
        })
      )
      .default([
        {
          id: "1",
          sNo: "1",
          nature: "Dependent person with disability",
          typeOfDependent: "",
          panDependent: "",
          aadharDependent: "",
          dateOfBirth: "",
          ackNo: "",
          ackNoDate: "",
          uidNumber: "",
          amount: "0",
        },
        {
          id: "2",
          sNo: "2",
          nature: "Dependent person with disability",
          typeOfDependent: "",
          panDependent: "",
          aadharDependent: "",
          dateOfBirth: "",
          ackNo: "",
          ackNoDate: "",
          uidNumber: "",
          amount: "0",
        },
      ]),

    totalDeduction: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    data.dependentRows?.forEach((row, idx) => {
      // Validate Aadhaar if provided
      if (row.aadharDependent && row.aadharDependent.trim() !== "") {
        if (!/^[2-9][0-9]{11}$/.test(row.aadharDependent)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["dependentRows", idx, "aadharDependent"],
            message: "Aadhaar must be 12 digits starting with 2-9",
          });
        }
      }

      // Validate amount
      if (row.amount !== undefined && row.amount !== "") {
        const val = parseFloat(row.amount);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["dependentRows", idx, "amount"],
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

    console.log("Schedule 80DD - Deduction for maintenance of dependent with disability", data);
  });

export type Schedule80DDFormData = z.infer<typeof Schedule80DDSchema>;

interface Schedule80DDProps {
  initialData?: Partial<Schedule80DDFormData>;
  onSave: (data: Schedule80DDFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80DD({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80DDProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80DDFormData>({
    resolver: zodResolver(Schedule80DDSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total = (watched.dependentRows || []).reduce(
      (sum, row) => sum + parseVal(row.amount),
      0
    );

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80DDFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-teal-900">
          Schedule 80DD - Deduction for Maintenance of Dependent with Disability
        </h1>
        <p className="mt-1 text-sm text-teal-700">
          Deduction u/s 80DD for maintenance including medical treatment of dependents with disability
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
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

        {/* Dependent Details Table */}
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-lg font-bold text-teal-900 mb-6">
            Details of Deduction for Maintenance of Dependent with Disability
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-teal-300 bg-white text-xs">
              <thead className="bg-teal-200">
                <tr>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">Nature of Disability</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">Type of Dependent</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">PAN</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">Aadhaar</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">Date of Birth</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">Ack No.</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">Ack Date</th>
                  <th className="border border-teal-300 px-2 py-2 text-left font-semibold">UIDD Number</th>
                  <th className="border border-teal-300 px-2 py-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(watched.dependentRows || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-teal-50">
                    <td className="border border-teal-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-teal-300 px-2 py-2">
                      <span className="text-xs font-medium">{row.nature}</span>
                    </td>
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.typeOfDependent`}
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-2 py-1 border rounded text-xs"
                          >
                            <option value="">Select</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="HUF Member">HUF Member</option>
                          </select>
                        )}
                      />
                    </td>
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.panDependent`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="PAN"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.aadharDependent`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-xs ${
                                errors?.dependentRows?.[idx]?.aadharDependent
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Aadhaar"
                            />
                            {errors?.dependentRows?.[idx]?.aadharDependent && (
                              <p className="text-xs text-red-600 mt-0.5">
                                {errors.dependentRows[idx].aadharDependent?.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.dateOfBirth`}
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
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.ackNo`}
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
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.ackNoDate`}
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
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.uidNumber`}
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
                    <td className="border border-teal-300 px-2 py-2">
                      <Controller
                        name={`dependentRows.${idx}.amount`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-xs text-right ${
                                errors?.dependentRows?.[idx]?.amount
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="0.00"
                            />
                            {errors?.dependentRows?.[idx]?.amount && (
                              <p className="text-xs text-red-600 mt-0.5">
                                {errors.dependentRows[idx].amount?.message}
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
        <div className="rounded-xl border-2 border-teal-900 bg-teal-100 p-6">
          <h3 className="text-lg font-bold text-teal-900 mb-4">Total Deduction u/s 80DD</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-teal-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Deduction Amount:</p>
            <p className="text-3xl font-bold text-teal-700">₹{calculations.total.toFixed(2)}</p>
            <p className="text-xs text-gray-600 mt-4">
              Maximum deduction: ₹75,000 for dependent with 40-79% disability, ₹125,000 for 80%+ disability
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
          className="flex-1 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
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
