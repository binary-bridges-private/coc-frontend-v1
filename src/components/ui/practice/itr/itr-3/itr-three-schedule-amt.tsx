"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleAMTSchema = z
  .object({
    // Assessee Details
    assesseePhone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
        message: "Phone number must be 10 digits starting with 6-9",
      }),

    // Part 1: Computation of AMT Liability
    totalIncomePartATI: z.string().default("0"),
    deductionChapter6: z.string().default("0"),
    deductionChapter10AA: z.string().default("0"),
    deductionChapter80IA80IB: z.string().default("0"),
    totalAdjustment: z.string().default("0"),
    adjustedTotalIncomeU115C: z.string().default("0"),
    amtLiabilityAmount: z.string().default("0"),
    taxPayableU115C: z.string().default("0"),

    // Part 2: AMT Credit Utilization (Historical Data)
    // Assessment years and AMT credit brought forward
    ay201314: z.string().default("0"),
    ay201415: z.string().default("0"),
    ay201516: z.string().default("0"),
    ay201617: z.string().default("0"),
    ay201718: z.string().default("0"),
    ay201819: z.string().default("0"),
    ay201920: z.string().default("0"),
    ay202021: z.string().default("0"),
    ay202122: z.string().default("0"),
    ay202223: z.string().default("0"),
    ay202324: z.string().default("0"),
    ay202425: z.string().default("0"),

    // Credit Utilized during current year
    creditUtilizedCurrentYear: z.string().default("0"),
    
    // Remaining balance
    creditBalanceCarriedForward: z.string().default("0"),

    // Part 3: Tax Credit Computation
    taxCreditUtilized: z.string().default("0"),
    amtCreditUtilized: z.string().default("0"),
    totalCreditUtilized: z.string().default("0"),

    // Part 4: AMT Liability Available for Credit
    amtLiabilityAvailableForCredit: z.string().default("0"),
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

    const numericFields = [
      "totalIncomePartATI",
      "deductionChapter6",
      "deductionChapter10AA",
      "deductionChapter80IA80IB",
      "totalAdjustment",
      "adjustedTotalIncomeU115C",
      "amtLiabilityAmount",
      "taxPayableU115C",
      "ay201314", "ay201415", "ay201516", "ay201617", "ay201718", "ay201819",
      "ay201920", "ay202021", "ay202122", "ay202223", "ay202324", "ay202425",
      "creditUtilizedCurrentYear",
      "creditBalanceCarriedForward",
      "taxCreditUtilized",
      "amtCreditUtilized",
      "totalCreditUtilized",
      "amtLiabilityAvailableForCredit",
    ];

    numericFields.forEach((field) => {
      validateNumeric(data[field as keyof typeof data] as string, field, [field]);
    });

    console.log("Schedule AMT - Alternate Minimum Tax", data);
  });

export type ScheduleAMTFormData = z.infer<typeof ScheduleAMTSchema>;

interface ScheduleAMTProps {
  initialData?: Partial<ScheduleAMTFormData>;
  onSave: (data: ScheduleAMTFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleAMT({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleAMTProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleAMTFormData>({
    resolver: zodResolver(ScheduleAMTSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const totalAYCredit =
      parseVal(watched.ay201314) +
      parseVal(watched.ay201415) +
      parseVal(watched.ay201516) +
      parseVal(watched.ay201617) +
      parseVal(watched.ay201718) +
      parseVal(watched.ay201819) +
      parseVal(watched.ay201920) +
      parseVal(watched.ay202021) +
      parseVal(watched.ay202122) +
      parseVal(watched.ay202223) +
      parseVal(watched.ay202324) +
      parseVal(watched.ay202425);

    return { totalAYCredit };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleAMTFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-violet-900">
          Schedule AMT - Computation of Alternate Minimum Tax u/s 115JC
        </h1>
        <p className="mt-1 text-sm text-violet-700">
          Computation of AMT liability and credit utilization
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-8">
        
        {/* Part 1: AMT Computation */}
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-6">
          <h2 className="text-lg font-bold text-violet-900 mb-6">
            Part 1: Computation of AMT Liability
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Income (as per Part A-I) u/s 14 of Part IA-I
                </label>
                <Controller
                  name="totalIncomePartATI"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-right ${
                          errors.totalIncomePartATI
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.totalIncomePartATI && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.totalIncomePartATI.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="pt-6">
                <p className="text-right text-lg font-semibold text-violet-700">1</p>
              </div>
            </div>

            <div className="border-t-2 border-violet-300 pt-4">
              <h3 className="font-semibold text-violet-900 mb-4">
                Adjustments as per section 115JC(2):
              </h3>
              
              <div className="grid grid-cols-2 gap-4 ml-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2a. Deduction claimed under any section included in Chapter VI-A
                  </label>
                  <Controller
                    name="deductionChapter6"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right ${
                          errors.deductionChapter6 ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2b. Deduction claimed u/s 10AA
                  </label>
                  <Controller
                    name="deductionChapter10AA"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right ${
                          errors.deductionChapter10AA ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2c. Deduction claimed u/s 80-IA or 80-IB
                  </label>
                  <Controller
                    name="deductionChapter80IA80IB"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right ${
                          errors.deductionChapter80IA80IB ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-violet-300 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2d. Total Adjustment (2a + 2b + 2c)
                  </label>
                  <Controller
                    name="totalAdjustment"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right ${
                          errors.totalAdjustment ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-violet-300 pt-4 mt-4 bg-violet-100 p-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-violet-900 mb-2">
                    3. Adjusted Total Income u/s 115C(1)-(1-2d) = 1-2d
                  </label>
                  <Controller
                    name="adjustedTotalIncomeU115C"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right font-bold ${
                          errors.adjustedTotalIncomeU115C ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-violet-300 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    4. Tax payable u/s 115JC (20% of 3) (if 3 is greater than Rs 20 lakh)
                  </label>
                  <Controller
                    name="amtLiabilityAmount"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value || ""}
                        className={`w-full px-3 py-2 border rounded-lg text-right ${
                          errors.amtLiabilityAmount ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: AMT Credit Utilization */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-6">
            Part 2: AMT Credit Computation
          </h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-purple-900 mb-4">
              AMT Credit Brought Forward (from previous assessment years)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-purple-300 bg-white text-sm">
                <thead className="bg-purple-200">
                  <tr>
                    <th className="border border-purple-300 px-3 py-2 text-left">Assessment Year</th>
                    <th className="border border-purple-300 px-3 py-2 text-right">AMT Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: "2013-14", field: "ay201314" },
                    { year: "2014-15", field: "ay201415" },
                    { year: "2015-16", field: "ay201516" },
                    { year: "2016-17", field: "ay201617" },
                    { year: "2017-18", field: "ay201718" },
                    { year: "2018-19", field: "ay201819" },
                    { year: "2019-20", field: "ay201920" },
                    { year: "2020-21", field: "ay202021" },
                    { year: "2021-22", field: "ay202122" },
                    { year: "2022-23", field: "ay202223" },
                    { year: "2023-24", field: "ay202324" },
                    { year: "2024-25", field: "ay202425" },
                  ].map(({ year, field }) => (
                    <tr key={field} className="hover:bg-purple-50">
                      <td className="border border-purple-300 px-3 py-2">{year}</td>
                      <td className="border border-purple-300 px-3 py-2">
                        <Controller
                          name={field as keyof ScheduleAMTFormData}
                          control={control}
                          render={({ field: inputField }) => (
                            <input
                              {...inputField}
                              type="text"
                              value={inputField.value || ""}
                              className={`w-full px-2 py-1 border rounded text-right text-xs ${
                                errors[field as keyof ScheduleAMTFormData] ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="0"
                            />
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-purple-100 font-bold">
                  <tr>
                    <td className="border border-purple-300 px-3 py-2">Total Brought Forward</td>
                    <td className="border border-purple-300 px-3 py-2 text-right">
                      ₹{calculations.totalAYCredit.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                5. Current Year AMT Credit Utilized
              </label>
              <Controller
                name="creditUtilizedCurrentYear"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className={`w-full px-3 py-2 border rounded-lg text-right ${
                      errors.creditUtilizedCurrentYear ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                6. AMT Credit Balance Carried Forward
              </label>
              <Controller
                name="creditBalanceCarriedForward"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className={`w-full px-3 py-2 border rounded-lg text-right ${
                      errors.creditBalanceCarriedForward ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-violet-900 bg-violet-100 p-6">
          <h3 className="text-lg font-bold text-violet-900 mb-4">
            AMT Liability Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-violet-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">AMT Liability:</p>
                <p className="text-2xl font-bold text-violet-700">
                  ₹{parseFloat(watched.amtLiabilityAmount || "0").toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Adjusted Income:</p>
                <p className="text-2xl font-bold text-purple-700">
                  ₹{parseFloat(watched.adjustedTotalIncomeU115C || "0").toFixed(2)}
                </p>
              </div>
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
