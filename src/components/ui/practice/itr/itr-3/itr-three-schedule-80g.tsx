"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validatePAN = (value: string) =>
  /^[A-Z0-9]{10}$/.test(value.toUpperCase());

const Schedule80GSchema = z
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

    // Section A: 100% Deduction without qualifying limit
    sectionADonations: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nameAddressDonee: z.string().default(""),
          panDonee: z.string().optional(),
          donationCash: z.string().default("0"),
          donationOtherMode: z.string().default("0"),
          totalDonation: z.string().default("0"),
          eligibleAmount: z.string().default("0"),
        })
      )
      .default([
        { id: "1", sNo: "i", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "2", sNo: "ii", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "3", sNo: "iii (Total)", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
      ]),

    // Section B: 50% deduction without qualifying limit
    sectionBDonations: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nameAddressDonee: z.string().default(""),
          panDonee: z.string().optional(),
          donationCash: z.string().default("0"),
          donationOtherMode: z.string().default("0"),
          totalDonation: z.string().default("0"),
          eligibleAmount: z.string().default("0"),
        })
      )
      .default([
        { id: "1", sNo: "i", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "2", sNo: "ii", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "3", sNo: "iii (Total)", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
      ]),

    // Section C: 100% deduction subject to qualifying limit
    sectionCDonations: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nameAddressDonee: z.string().default(""),
          panDonee: z.string().optional(),
          donationCash: z.string().default("0"),
          donationOtherMode: z.string().default("0"),
          totalDonation: z.string().default("0"),
          eligibleAmount: z.string().default("0"),
        })
      )
      .default([
        { id: "1", sNo: "i", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "2", sNo: "ii", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "3", sNo: "iii (Total)", nameAddressDonee: "", panDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
      ]),

    // Section D: 50% deduction subject to qualifying limit
    sectionDDonations: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nameAddressDonee: z.string().default(""),
          panDonee: z.string().optional(),
          arnDonee: z.string().optional(),
          donationCash: z.string().default("0"),
          donationOtherMode: z.string().default("0"),
          totalDonation: z.string().default("0"),
          eligibleAmount: z.string().default("0"),
        })
      )
      .default([
        { id: "1", sNo: "i", nameAddressDonee: "", panDonee: "", arnDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
        { id: "2", sNo: "ii", nameAddressDonee: "", panDonee: "", arnDonee: "", donationCash: "0", donationOtherMode: "0", totalDonation: "0", eligibleAmount: "0" },
      ]),
  })
  .superRefine((data, ctx) => {
    // Validate all numeric fields
    const validateNumericField = (value: string | undefined, path: (string | number)[]): boolean => {
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: "Must be a valid non-negative number",
          });
          return false;
        }
      }
      return true;
    };

    // Validate Section A
    data.sectionADonations?.forEach((row, idx) => {
      if (row.panDonee && row.panDonee.trim() !== "") {
        if (!validatePAN(row.panDonee)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["sectionADonations", idx, "panDonee"],
            message: "PAN must be 10 alphanumeric characters",
          });
        }
      }
      validateNumericField(row.donationCash, ["sectionADonations", idx, "donationCash"]);
      validateNumericField(row.donationOtherMode, ["sectionADonations", idx, "donationOtherMode"]);
    });

    // Validate Section B
    data.sectionBDonations?.forEach((row, idx) => {
      if (row.panDonee && row.panDonee.trim() !== "") {
        if (!validatePAN(row.panDonee)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["sectionBDonations", idx, "panDonee"],
            message: "PAN must be 10 alphanumeric characters",
          });
        }
      }
      validateNumericField(row.donationCash, ["sectionBDonations", idx, "donationCash"]);
      validateNumericField(row.donationOtherMode, ["sectionBDonations", idx, "donationOtherMode"]);
    });

    // Validate Section C
    data.sectionCDonations?.forEach((row, idx) => {
      if (row.panDonee && row.panDonee.trim() !== "") {
        if (!validatePAN(row.panDonee)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["sectionCDonations", idx, "panDonee"],
            message: "PAN must be 10 alphanumeric characters",
          });
        }
      }
      validateNumericField(row.donationCash, ["sectionCDonations", idx, "donationCash"]);
      validateNumericField(row.donationOtherMode, ["sectionCDonations", idx, "donationOtherMode"]);
    });

    // Validate Section D
    data.sectionDDonations?.forEach((row, idx) => {
      if (row.panDonee && row.panDonee.trim() !== "") {
        if (!validatePAN(row.panDonee)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["sectionDDonations", idx, "panDonee"],
            message: "PAN must be 10 alphanumeric characters",
          });
        }
      }
      validateNumericField(row.donationCash, ["sectionDDonations", idx, "donationCash"]);
      validateNumericField(row.donationOtherMode, ["sectionDDonations", idx, "donationOtherMode"]);
    });

    console.log("Schedule 80G - Details of donations for deduction u/s 80G", data);
  });

export type Schedule80GFormData = z.infer<typeof Schedule80GSchema>;

interface Schedule80GProps {
  initialData?: Partial<Schedule80GFormData>;
  onSave: (data: Schedule80GFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedule80G({
  initialData,
  onSave,
  onNext,
  onBack,
}: Schedule80GProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule80GFormData>({
    resolver: zodResolver(Schedule80GSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const sectionATotals = {
      cash: (watched.sectionADonations || []).reduce((sum, row) => sum + parseVal(row.donationCash), 0),
      other: (watched.sectionADonations || []).reduce((sum, row) => sum + parseVal(row.donationOtherMode), 0),
      total: (watched.sectionADonations || []).reduce((sum, row) => sum + parseVal(row.totalDonation), 0),
      eligible: (watched.sectionADonations || []).reduce((sum, row) => sum + parseVal(row.eligibleAmount), 0),
    };

    const sectionBTotals = {
      cash: (watched.sectionBDonations || []).reduce((sum, row) => sum + parseVal(row.donationCash), 0),
      other: (watched.sectionBDonations || []).reduce((sum, row) => sum + parseVal(row.donationOtherMode), 0),
      total: (watched.sectionBDonations || []).reduce((sum, row) => sum + parseVal(row.totalDonation), 0),
      eligible: (watched.sectionBDonations || []).reduce((sum, row) => sum + parseVal(row.eligibleAmount), 0),
    };

    const sectionCTotals = {
      cash: (watched.sectionCDonations || []).reduce((sum, row) => sum + parseVal(row.donationCash), 0),
      other: (watched.sectionCDonations || []).reduce((sum, row) => sum + parseVal(row.donationOtherMode), 0),
      total: (watched.sectionCDonations || []).reduce((sum, row) => sum + parseVal(row.totalDonation), 0),
      eligible: (watched.sectionCDonations || []).reduce((sum, row) => sum + parseVal(row.eligibleAmount), 0),
    };

    const sectionDTotals = {
      cash: (watched.sectionDDonations || []).reduce((sum, row) => sum + parseVal(row.donationCash), 0),
      other: (watched.sectionDDonations || []).reduce((sum, row) => sum + parseVal(row.donationOtherMode), 0),
      total: (watched.sectionDDonations || []).reduce((sum, row) => sum + parseVal(row.totalDonation), 0),
      eligible: (watched.sectionDDonations || []).reduce((sum, row) => sum + parseVal(row.eligibleAmount), 0),
    };

    return {
      sectionATotals,
      sectionBTotals,
      sectionCTotals,
      sectionDTotals,
      grandTotal: sectionATotals.eligible + sectionBTotals.eligible + sectionCTotals.eligible + sectionDTotals.eligible,
    };
  }, [watched]);

  const onSubmit: SubmitHandler<Schedule80GFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-blue-900">
          Schedule 80G - Details of Donations for Deduction u/s 80G
        </h1>
        <p className="mt-1 text-sm text-blue-700">
          Donations entitled for 100% or 50% deduction with/without qualifying limit
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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

        {/* Section A: 100% Deduction without qualifying limit */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-6">
            Section A: Donations for 100% deduction without qualifying limit
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-green-300 bg-white text-xs">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-green-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-green-300 px-2 py-2 text-left font-semibold">Name & Address of Donee</th>
                  <th className="border border-green-300 px-2 py-2 text-left font-semibold">PAN of Donee</th>
                  <th className="border border-green-300 px-2 py-2 text-center font-semibold">Donation in Cash</th>
                  <th className="border border-green-300 px-2 py-2 text-center font-semibold">Donation in Other Mode</th>
                  <th className="border border-green-300 px-2 py-2 text-center font-semibold">Total Donation</th>
                  <th className="border border-green-300 px-2 py-2 text-center font-semibold">Eligible Amount</th>
                </tr>
              </thead>
              <tbody>
                {(watched.sectionADonations || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-green-50">
                    <td className="border border-green-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-green-300 px-2 py-2">
                      <Controller
                        name={`sectionADonations.${idx}.nameAddressDonee`}
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
                    <td className="border border-green-300 px-2 py-2">
                      <Controller
                        name={`sectionADonations.${idx}.panDonee`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-xs ${
                                errors?.sectionADonations?.[idx]?.panDonee
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="PAN"
                            />
                            {errors?.sectionADonations?.[idx]?.panDonee && (
                              <p className="text-xs text-red-600 mt-0.5">
                                {errors.sectionADonations[idx].panDonee?.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-green-300 px-2 py-2">
                      <Controller
                        name={`sectionADonations.${idx}.donationCash`}
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
                    <td className="border border-green-300 px-2 py-2">
                      <Controller
                        name={`sectionADonations.${idx}.donationOtherMode`}
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
                    <td className="border border-green-300 px-2 py-2">
                      <Controller
                        name={`sectionADonations.${idx}.totalDonation`}
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
                    <td className="border border-green-300 px-2 py-2">
                      <Controller
                        name={`sectionADonations.${idx}.eligibleAmount`}
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
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-green-100 font-bold">
                <tr>
                  <td colSpan={3} className="border border-green-300 px-2 py-2">
                    Section A Total
                  </td>
                  <td className="border border-green-300 px-2 py-2 text-right">
                    ₹{calculations.sectionATotals.cash.toFixed(2)}
                  </td>
                  <td className="border border-green-300 px-2 py-2 text-right">
                    ₹{calculations.sectionATotals.other.toFixed(2)}
                  </td>
                  <td className="border border-green-300 px-2 py-2 text-right">
                    ₹{calculations.sectionATotals.total.toFixed(2)}
                  </td>
                  <td className="border border-green-300 px-2 py-2 text-right">
                    ₹{calculations.sectionATotals.eligible.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section B: 50% deduction without qualifying limit */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            Section B: Donations for 50% deduction without qualifying limit
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-300 bg-white text-xs">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">Name & Address of Donee</th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">PAN of Donee</th>
                  <th className="border border-blue-300 px-2 py-2 text-center font-semibold">Donation in Cash</th>
                  <th className="border border-blue-300 px-2 py-2 text-center font-semibold">Donation in Other Mode</th>
                  <th className="border border-blue-300 px-2 py-2 text-center font-semibold">Total Donation</th>
                  <th className="border border-blue-300 px-2 py-2 text-center font-semibold">Eligible Amount (50%)</th>
                </tr>
              </thead>
              <tbody>
                {(watched.sectionBDonations || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-blue-50">
                    <td className="border border-blue-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-blue-300 px-2 py-2">
                      <Controller
                        name={`sectionBDonations.${idx}.nameAddressDonee`}
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
                    <td className="border border-blue-300 px-2 py-2">
                      <Controller
                        name={`sectionBDonations.${idx}.panDonee`}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 border rounded text-xs ${
                                errors?.sectionBDonations?.[idx]?.panDonee
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="PAN"
                            />
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-2 py-2">
                      <Controller
                        name={`sectionBDonations.${idx}.donationCash`}
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
                    <td className="border border-blue-300 px-2 py-2">
                      <Controller
                        name={`sectionBDonations.${idx}.donationOtherMode`}
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
                    <td className="border border-blue-300 px-2 py-2">
                      <Controller
                        name={`sectionBDonations.${idx}.totalDonation`}
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
                    <td className="border border-blue-300 px-2 py-2">
                      <Controller
                        name={`sectionBDonations.${idx}.eligibleAmount`}
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
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-blue-100 font-bold">
                <tr>
                  <td colSpan={3} className="border border-blue-300 px-2 py-2">
                    Section B Total (50% eligible)
                  </td>
                  <td className="border border-blue-300 px-2 py-2 text-right">
                    ₹{calculations.sectionBTotals.cash.toFixed(2)}
                  </td>
                  <td className="border border-blue-300 px-2 py-2 text-right">
                    ₹{calculations.sectionBTotals.other.toFixed(2)}
                  </td>
                  <td className="border border-blue-300 px-2 py-2 text-right">
                    ₹{calculations.sectionBTotals.total.toFixed(2)}
                  </td>
                  <td className="border border-blue-300 px-2 py-2 text-right">
                    ₹{calculations.sectionBTotals.eligible.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section C: 100% deduction subject to qualifying limit */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-6">
            Section C: Donations for 100% deduction subject to qualifying limit
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-purple-300 bg-white text-xs">
              <thead className="bg-purple-200">
                <tr>
                  <th className="border border-purple-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-purple-300 px-2 py-2 text-left font-semibold">Name & Address of Donee</th>
                  <th className="border border-purple-300 px-2 py-2 text-left font-semibold">PAN of Donee</th>
                  <th className="border border-purple-300 px-2 py-2 text-center font-semibold">Donation in Cash</th>
                  <th className="border border-purple-300 px-2 py-2 text-center font-semibold">Donation in Other Mode</th>
                  <th className="border border-purple-300 px-2 py-2 text-center font-semibold">Total Donation</th>
                  <th className="border border-purple-300 px-2 py-2 text-center font-semibold">Eligible Amount</th>
                </tr>
              </thead>
              <tbody>
                {(watched.sectionCDonations || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-purple-50">
                    <td className="border border-purple-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-purple-300 px-2 py-2">
                      <Controller
                        name={`sectionCDonations.${idx}.nameAddressDonee`}
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
                    <td className="border border-purple-300 px-2 py-2">
                      <Controller
                        name={`sectionCDonations.${idx}.panDonee`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 border rounded text-xs ${
                              errors?.sectionCDonations?.[idx]?.panDonee
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="PAN"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-purple-300 px-2 py-2">
                      <Controller
                        name={`sectionCDonations.${idx}.donationCash`}
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
                    <td className="border border-purple-300 px-2 py-2">
                      <Controller
                        name={`sectionCDonations.${idx}.donationOtherMode`}
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
                    <td className="border border-purple-300 px-2 py-2">
                      <Controller
                        name={`sectionCDonations.${idx}.totalDonation`}
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
                    <td className="border border-purple-300 px-2 py-2">
                      <Controller
                        name={`sectionCDonations.${idx}.eligibleAmount`}
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
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-purple-100 font-bold">
                <tr>
                  <td colSpan={3} className="border border-purple-300 px-2 py-2">
                    Section C Total
                  </td>
                  <td className="border border-purple-300 px-2 py-2 text-right">
                    ₹{calculations.sectionCTotals.cash.toFixed(2)}
                  </td>
                  <td className="border border-purple-300 px-2 py-2 text-right">
                    ₹{calculations.sectionCTotals.other.toFixed(2)}
                  </td>
                  <td className="border border-purple-300 px-2 py-2 text-right">
                    ₹{calculations.sectionCTotals.total.toFixed(2)}
                  </td>
                  <td className="border border-purple-300 px-2 py-2 text-right">
                    ₹{calculations.sectionCTotals.eligible.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section D: 50% deduction subject to qualifying limit */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900 mb-6">
            Section D: Donations for 50% deduction subject to qualifying limit
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-orange-300 bg-white text-xs">
              <thead className="bg-orange-200">
                <tr>
                  <th className="border border-orange-300 px-2 py-2 text-left font-semibold">S.No</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-semibold">Name & Address of Donee</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-semibold">PAN of Donee</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-semibold">ARN (Donation Ref. No.)</th>
                  <th className="border border-orange-300 px-2 py-2 text-center font-semibold">Donation in Cash</th>
                  <th className="border border-orange-300 px-2 py-2 text-center font-semibold">Donation in Other Mode</th>
                  <th className="border border-orange-300 px-2 py-2 text-center font-semibold">Total Donation</th>
                  <th className="border border-orange-300 px-2 py-2 text-center font-semibold">Eligible Amount (50%)</th>
                </tr>
              </thead>
              <tbody>
                {(watched.sectionDDonations || []).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-orange-50">
                    <td className="border border-orange-300 px-2 py-2">{row.sNo}</td>
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.nameAddressDonee`}
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
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.panDonee`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-2 py-1 border rounded text-xs ${
                              errors?.sectionDDonations?.[idx]?.panDonee
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="PAN"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.arnDonee`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-2 py-1 border rounded text-xs"
                            placeholder="ARN"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.donationCash`}
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
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.donationOtherMode`}
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
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.totalDonation`}
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
                    <td className="border border-orange-300 px-2 py-2">
                      <Controller
                        name={`sectionDDonations.${idx}.eligibleAmount`}
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
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-orange-100 font-bold">
                <tr>
                  <td colSpan={4} className="border border-orange-300 px-2 py-2">
                    Section D Total (50% eligible)
                  </td>
                  <td className="border border-orange-300 px-2 py-2 text-right">
                    ₹{calculations.sectionDTotals.cash.toFixed(2)}
                  </td>
                  <td className="border border-orange-300 px-2 py-2 text-right">
                    ₹{calculations.sectionDTotals.other.toFixed(2)}
                  </td>
                  <td className="border border-orange-300 px-2 py-2 text-right">
                    ₹{calculations.sectionDTotals.total.toFixed(2)}
                  </td>
                  <td className="border border-orange-300 px-2 py-2 text-right">
                    ₹{calculations.sectionDTotals.eligible.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Grand Summary */}
        <div className="rounded-xl border-2 border-gray-900 bg-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Total Eligible Deduction u/s 80G</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-green-300">
              <p className="text-sm text-gray-600 mb-1">Section A (100% no limit)</p>
              <p className="text-xl font-bold text-green-700">₹{calculations.sectionATotals.eligible.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
              <p className="text-sm text-gray-600 mb-1">Section B (50% no limit)</p>
              <p className="text-xl font-bold text-blue-700">₹{calculations.sectionBTotals.eligible.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
              <p className="text-sm text-gray-600 mb-1">Section C (100% with limit)</p>
              <p className="text-xl font-bold text-purple-700">₹{calculations.sectionCTotals.eligible.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
              <p className="text-sm text-gray-600 mb-1">Section D (50% with limit)</p>
              <p className="text-xl font-bold text-orange-700">₹{calculations.sectionDTotals.eligible.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 rounded-lg border-4 border-gray-900">
            <p className="text-lg font-bold text-gray-900">Grand Total Eligible Deduction:</p>
            <p className="text-3xl font-bold text-emerald-700">₹{calculations.grandTotal.toFixed(2)}</p>
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
          className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
