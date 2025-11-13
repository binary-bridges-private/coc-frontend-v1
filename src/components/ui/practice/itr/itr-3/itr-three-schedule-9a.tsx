"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schedule9ASchema = z
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

    // Donation rows
    donationRows: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          relevantClause: z.string().default(""),
          nameAddressDonee: z.string().default(""),
          panDonee: z.string().optional(),
          donationCash: z.string().default("0"),
          donationOtherMode: z.string().default("0"),
          totalDonation: z.string().default("0"),
          eligibleAmount: z.string().default("0"),
        })
      )
      .default([
        {
          id: "1",
          sNo: "i",
          relevantClause: "",
          nameAddressDonee: "",
          panDonee: "",
          donationCash: "0",
          donationOtherMode: "0",
          totalDonation: "0",
          eligibleAmount: "0",
        },
        {
          id: "2",
          sNo: "ii",
          relevantClause: "",
          nameAddressDonee: "",
          panDonee: "",
          donationCash: "0",
          donationOtherMode: "0",
          totalDonation: "0",
          eligibleAmount: "0",
        },
        {
          id: "3",
          sNo: "Total donation",
          relevantClause: "",
          nameAddressDonee: "",
          panDonee: "",
          donationCash: "0",
          donationOtherMode: "0",
          totalDonation: "0",
          eligibleAmount: "0",
        },
      ]),
  })
  .superRefine((data, ctx) => {
    data.donationRows?.forEach((row, idx) => {
      const validateNumeric = (value: string | undefined, fieldName: string) => {
        if (value !== undefined && value !== "") {
          const val = parseFloat(value);
          if (isNaN(val) || val < 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["donationRows", idx, fieldName],
              message: "Must be a valid non-negative number",
            });
          }
        }
      };

      validateNumeric(row.donationCash, "donationCash");
      validateNumeric(row.donationOtherMode, "donationOtherMode");
    });

    console.log("Schedule 9A - Details of donations to research associations", data);
  });

export type Schedule9AFormData = z.infer<typeof Schedule9ASchema>;

interface Schedule9AProps {
  initialData?: Partial<Schedule9AFormData>;
  onSave: (data: Schedule9AFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule9A({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule9AProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule9AFormData>({
    resolver: zodResolver(Schedule9ASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const totalCash = (watched.donationRows || []).reduce((sum, row) => sum + parseVal(row.donationCash), 0);
    const totalOther = (watched.donationRows || []).reduce((sum, row) => sum + parseVal(row.donationOtherMode), 0);
    const totalDonation = (watched.donationRows || []).reduce((sum, row) => sum + parseVal(row.totalDonation), 0);
    const totalEligible = (watched.donationRows || []).reduce((sum, row) => sum + parseVal(row.eligibleAmount), 0);

    return {
      totalCash,
      totalOther,
      totalDonation,
      totalEligible,
    };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule9AFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-violet-900">
          Schedule 9A - Details of Donations to Research Associations
        </h1>
        <p className="mt-1 text-sm text-violet-700">
          Donations for deduction u/s 35(1)(ii) or 35(1)(iia) or 35(1)(iii) or 35(2AA)
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${
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

        {/* Donation Details Table */}
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-6">
          <h2 className="text-lg font-bold text-violet-900 mb-6">
            Details of Donations to Research Associations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-violet-300 bg-white text-xs">
              <thead className="bg-violet-200">
                <tr>
                  <th className="border border-violet-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-violet-300 px-2 py-2 text-left font-semibold">Relevant Clause</th>
                  <th className="border border-violet-300 px-2 py-2 text-left font-semibold">Name & Address of Donee</th>
                  <th className="border border-violet-300 px-2 py-2 text-left font-semibold">PAN of Donee</th>
                  <th className="border border-violet-300 px-2 py-2 text-center font-semibold">Donation in Cash</th>
                  <th className="border border-violet-300 px-2 py-2 text-center font-semibold">Donation in Other Mode</th>
                  <th className="border border-violet-300 px-2 py-2 text-center font-semibold">Total Donation</th>
                  <th className="border border-violet-300 px-2 py-2 text-center font-semibold">Eligible Amount</th>
                </tr>
              </thead>
              <tbody>
                {(watched.donationRows || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-violet-50">
                    <td className="border border-violet-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.relevantClause`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="e.g., Section 35(1)(ii)"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.nameAddressDonee`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="Name & address"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.panDonee`}
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
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.donationCash`}
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
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.donationOtherMode`}
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
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.totalDonation`}
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
                    <td className="border border-violet-300 px-2 py-2">
                      <Controller
                        name={`donationRows.${idx}.eligibleAmount`}
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
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-violet-100 font-bold">
                <tr>
                  <td colSpan={4} className="border border-violet-300 px-2 py-2">
                    Total Donation
                  </td>
                  <td className="border border-violet-300 px-2 py-2 text-right">
                    ₹{calculations.totalCash.toFixed(2)}
                  </td>
                  <td className="border border-violet-300 px-2 py-2 text-right">
                    ₹{calculations.totalOther.toFixed(2)}
                  </td>
                  <td className="border border-violet-300 px-2 py-2 text-right">
                    ₹{calculations.totalDonation.toFixed(2)}
                  </td>
                  <td className="border border-violet-300 px-2 py-2 text-right">
                    ₹{calculations.totalEligible.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-violet-900 bg-violet-100 p-6">
          <h3 className="text-lg font-bold text-violet-900 mb-4">Total Eligible Donation</h3>
          <div className="bg-white p-6 rounded-lg border-2 border-violet-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">Total Eligible Amount:</p>
            <p className="text-3xl font-bold text-violet-700">₹{calculations.totalEligible.toFixed(2)}</p>
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
          className="flex-1 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
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
