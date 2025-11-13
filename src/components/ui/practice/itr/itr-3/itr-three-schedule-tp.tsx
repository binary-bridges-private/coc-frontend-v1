"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleTPSchema = z
  .object({
    // Section 15 - TRP Details
    trpPreparedReturn: z.string().default("No"),
    trpIdNumber: z.string().default(""),
    trpName: z.string().default(""),
    trpCounterSignature: z.string().default(""),
    trpReimbursementEntitled: z.string().default("No"),
    trpReimbursementAmount: z.string().default("0"),

    // Section 16 A - Advance Tax Payments
    advTaxRow1BSR: z.string().default(""),
    advTaxRow1Date: z.string().default(""),
    advTaxRow1Challan: z.string().default(""),
    advTaxRow1Amount: z.string().default("0"),
    advTaxRow2BSR: z.string().default(""),
    advTaxRow2Date: z.string().default(""),
    advTaxRow2Challan: z.string().default(""),
    advTaxRow2Amount: z.string().default("0"),
    advTaxRow3BSR: z.string().default(""),
    advTaxRow3Date: z.string().default(""),
    advTaxRow3Challan: z.string().default(""),
    advTaxRow3Amount: z.string().default("0"),
    advTaxRow4BSR: z.string().default(""),
    advTaxRow4Date: z.string().default(""),
    advTaxRow4Challan: z.string().default(""),
    advTaxRow4Amount: z.string().default("0"),
    advTaxTotal: z.string().default("0"),

    // Section 16 B - TDS from Salary
    tdsRow1SalaryEmpName: z.string().default(""),
    tdsRow1SalaryTAN: z.string().default(""),
    tdsRow1SalaryIncome: z.string().default("0"),
    tdsRow1SalaryDeducted: z.string().default("0"),
    tdsRow1SalaryTotal: z.string().default("0"),
    tdsRow2SalaryEmpName: z.string().default(""),
    tdsRow2SalaryTAN: z.string().default(""),
    tdsRow2SalaryIncome: z.string().default("0"),
    tdsRow2SalaryDeducted: z.string().default("0"),
    tdsRow2SalaryTotal: z.string().default("0"),

    // Section 16 C - TDS at Source (Form 16 A)
    tdsSourceRow1PAN: z.string().default(""),
    tdsSourceRow1Aadhaar: z.string().default(""),
    tdsSourceRow1TAN: z.string().default(""),
    tdsSourceRow1Section: z.string().default(""),
    tdsSourceRow1Unclaimed: z.string().default("0"),
    tdsSourceRow1ForwardFY: z.string().default("0"),
    tdsSourceRow1Current: z.string().default("0"),
    tdsSourceRow1Claimed: z.string().default("0"),
    tdsSourceRow1Forward: z.string().default("0"),

    // Section 16 D - TCS (Form 27D)
    tcsRow1TCSCreditNo: z.string().default(""),
    tcsRow1TAN: z.string().default(""),
    tcsRow1PAN: z.string().default(""),
    tcsRow1Unclaimed: z.string().default("0"),
    tcsRow1ForwardFY: z.string().default("0"),
    tcsRow1Current: z.string().default("0"),
    tcsRow1Claimed: z.string().default("0"),
    tcsRow1Forward: z.string().default("0"),
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
      "trpReimbursementAmount",
      "advTaxRow1Amount",
      "advTaxRow2Amount",
      "advTaxRow3Amount",
      "advTaxRow4Amount",
      "advTaxTotal",
      "tdsRow1SalaryIncome",
      "tdsRow1SalaryDeducted",
      "tdsRow1SalaryTotal",
      "tdsRow2SalaryIncome",
      "tdsRow2SalaryDeducted",
      "tdsRow2SalaryTotal",
      "tdsSourceRow1Unclaimed",
      "tdsSourceRow1ForwardFY",
      "tdsSourceRow1Current",
      "tdsSourceRow1Claimed",
      "tdsSourceRow1Forward",
      "tcsRow1Unclaimed",
      "tcsRow1ForwardFY",
      "tcsRow1Current",
      "tcsRow1Claimed",
      "tcsRow1Forward",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule TP - Tax Payments", data);
  });

export type ScheduleTPFormData = z.infer<typeof ScheduleTPSchema>;

interface ScheduleTPProps {
  initialData?: Partial<ScheduleTPFormData>;
  onSave: (data: ScheduleTPFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleTP({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleTPProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleTPFormData>({
    resolver: zodResolver(ScheduleTPSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const advTaxTotal =
      parseVal(watched.advTaxRow1Amount) +
      parseVal(watched.advTaxRow2Amount) +
      parseVal(watched.advTaxRow3Amount) +
      parseVal(watched.advTaxRow4Amount);

    return { advTaxTotal };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleTPFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-green-900">
          Schedule TP - Tax Payments & TDS/TCS Details
        </h1>
        <p className="mt-1 text-sm text-green-800">
          Details of advance tax payments, TDS deducted at source, and TCS collected
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Section 15 - TRP */}
        <div className="rounded-xl border border-green-300 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">
            Section 15 - Tax Return Preparer (TRP) Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return prepared by Tax Return Preparer (TRP)?
              </label>
              <Controller
                name="trpPreparedReturn"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || "No"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TRP Identification Number
              </label>
              <Controller
                name="trpIdNumber"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="TRP ID..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of TRP
              </label>
              <Controller
                name="trpName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="TRP name..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Counter Signature of TRP
              </label>
              <Controller
                name="trpCounterSignature"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Signature..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TRP Entitled for Reimbursement from Government?
              </label>
              <Controller
                name="trpReimbursementEntitled"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || "No"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reimbursement Amount (₹)
              </label>
              <Controller
                name="trpReimbursementAmount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.trpReimbursementAmount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.trpReimbursementAmount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.trpReimbursementAmount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Section 16 A - Advance Tax */}
        <div className="rounded-xl border border-blue-300 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            Section 16 A - Details of Advance Tax and Self-Assessment Tax Payments
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-300 bg-white text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-300 px-3 py-2 text-left font-semibold">SL No</th>
                  <th className="border border-blue-300 px-3 py-2 text-left font-semibold">BSR Code</th>
                  <th className="border border-blue-300 px-3 py-2 text-left font-semibold">Date (DD/MM/YYYY)</th>
                  <th className="border border-blue-300 px-3 py-2 text-left font-semibold">Challan No</th>
                  <th className="border border-blue-300 px-3 py-2 text-left font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((idx) => (
                  <tr key={idx}>
                    <td className="border border-blue-300 px-3 py-2 text-center">{idx}</td>
                    <td className="border border-blue-300 px-3 py-2">
                      <Controller
                        name={`advTaxRow${idx}BSR` as any}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            value={field.value || ""}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="BSR"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-3 py-2">
                      <Controller
                        name={`advTaxRow${idx}Date` as any}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            value={field.value || ""}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="DD/MM/YYYY"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-3 py-2">
                      <Controller
                        name={`advTaxRow${idx}Challan` as any}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            value={field.value || ""}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            placeholder="Challan"
                          />
                        )}
                      />
                    </td>
                    <td className="border border-blue-300 px-3 py-2">
                      <Controller
                        name={`advTaxRow${idx}Amount` as any}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            value={typeof field.value === "string" ? field.value : ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            className={`w-full px-2 py-1 border rounded text-xs ${
                              (errors as any)[`advTaxRow${idx}Amount`]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                        )}
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-100 font-bold">
                  <td colSpan={4} className="border border-blue-300 px-3 py-2 text-right">
                    Total Advance Tax:
                  </td>
                  <td className="border border-blue-300 px-3 py-2">
                    ₹{calculations.advTaxTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-900">
            <strong>Note:</strong> Enter details of all advance tax and self-assessment tax payments made during the financial year.
          </p>
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
          className="flex-1 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
