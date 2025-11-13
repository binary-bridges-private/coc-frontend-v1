"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleSISchema = z
  .object({
    assesseePhone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
        message: "Phone number must be 10 digits starting with 6-9",
      }),

    item1Checkbox: z.boolean().default(false),
    item1Amount: z.string().default("0"),
    item1TaxRate: z.string().default("0"),

    item2aCheckbox: z.boolean().default(false),
    item2aSpecialRate: z.string().default("15"),
    item2aAmount: z.string().default("0"),

    item2bCheckbox: z.boolean().default(false),
    item2bSpecialRate: z.string().default("20"),
    item2bAmount: z.string().default("0"),

    item3Checkbox: z.boolean().default(false),
    item3SpecialRate: z.string().default("30"),
    item3Amount: z.string().default("0"),

    item4aCheckbox: z.boolean().default(false),
    item4aSpecialRate: z.string().default("20"),
    item4aAmount: z.string().default("0"),

    item4bCheckbox: z.boolean().default(false),
    item4bSpecialRate: z.string().default("12.5"),
    item4bAmount: z.string().default("0"),

    item5aCheckbox: z.boolean().default(false),
    item5aSpecialRate: z.string().default("10"),
    item5aAmount: z.string().default("0"),

    item5bCheckbox: z.boolean().default(false),
    item5bSpecialRate: z.string().default("12.5"),
    item5bAmount: z.string().default("0"),

    item6aCheckbox: z.boolean().default(false),
    item6aSpecialRate: z.string().default("10"),
    item6aAmount: z.string().default("0"),

    item6bCheckbox: z.boolean().default(false),
    item6bSpecialRate: z.string().default("12.5"),
    item6bAmount: z.string().default("0"),

    item7aCheckbox: z.boolean().default(false),
    item7aSpecialRate: z.string().default("10"),
    item7aAmount: z.string().default("0"),

    item7bCheckbox: z.boolean().default(false),
    item7bSpecialRate: z.string().default("10"),
    item7bAmount: z.string().default("0"),

    totalAmount: z.string().default("0"),
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

    const amountFields = [
      "item1Amount",
      "item2aAmount",
      "item2bAmount",
      "item3Amount",
      "item4aAmount",
      "item4bAmount",
      "item5aAmount",
      "item5bAmount",
      "item6aAmount",
      "item6bAmount",
      "item7aAmount",
      "item7bAmount",
      "totalAmount",
    ];

    amountFields.forEach((field) => {
      validateNumeric(data[field as keyof typeof data] as string, field, [
        field,
      ]);
    });

    console.log("Schedule SI - Special Income", data);
  });

export type ScheduleSIFormData = z.infer<typeof ScheduleSISchema>;

interface ScheduleSIProps {
  initialData?: Partial<ScheduleSIFormData>;
  onSave: (data: ScheduleSIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleSI({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleSIProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleSIFormData>({
    resolver: zodResolver(ScheduleSISchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total =
      parseVal(watched.item1Amount) +
      parseVal(watched.item2aAmount) +
      parseVal(watched.item2bAmount) +
      parseVal(watched.item3Amount) +
      parseVal(watched.item4aAmount) +
      parseVal(watched.item4bAmount) +
      parseVal(watched.item5aAmount) +
      parseVal(watched.item5bAmount) +
      parseVal(watched.item6aAmount) +
      parseVal(watched.item6bAmount) +
      parseVal(watched.item7aAmount) +
      parseVal(watched.item7bAmount);

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleSIFormData> = (data) => {
    onSave(data);
  };

  const renderIncomeRow = (
    slNo: string,
    section: string,
    specialRate: string,
    checkboxField: keyof ScheduleSIFormData,
    amountField: keyof ScheduleSIFormData,
    taxIncluded: string
  ) => (
    <tr className="hover:bg-orange-50">
      <td className="border border-orange-300 px-3 py-2 text-center font-semibold text-sm">
        {slNo}
      </td>
      <td className="border border-orange-300 px-3 py-2 text-sm">{section}</td>
      <td className="border border-orange-300 px-3 py-2 text-center">
        <Controller
          name={checkboxField}
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value as boolean}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              className="w-4 h-4"
            />
          )}
        />
      </td>
      <td className="border border-orange-300 px-3 py-2 text-center text-sm font-medium">
        {specialRate}
      </td>
      <td className="border border-orange-300 px-3 py-2">
        <Controller
          name={amountField}
          control={control}
          render={({ field }) => (
            <>
              <input
                type="text"
                value={typeof field.value === "string" ? field.value : ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className={`w-full px-2 py-1 border rounded text-sm text-right ${
                  errors[amountField] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors[amountField] && (
                <p className="text-xs text-red-600 mt-0.5">
                  {(errors[amountField] as any)?.message}
                </p>
              )}
            </>
          )}
        />
      </td>
      <td className="border border-orange-300 px-3 py-2 text-xs text-gray-600">
        {taxIncluded}
      </td>
    </tr>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-orange-900">
          Schedule SI - Special Income (Chargeable to Special Rates)
        </h1>
        <p className="mt-1 text-sm text-orange-700">
          Income chargeable to special rates under various provisions
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
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
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
          </div>
        </div>

        {/* Special Income Table */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900 mb-6">
            Income Chargeable at Special Rates
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-orange-300 bg-white text-xs">
              <thead className="bg-orange-200">
                <tr>
                  <th className="border border-orange-300 px-3 py-2 text-center font-semibold">
                    Sl No
                  </th>
                  <th className="border border-orange-300 px-3 py-2 text-left font-semibold">
                    Section
                  </th>
                  <th className="border border-orange-300 px-3 py-2 text-center font-semibold">
                    ✓
                  </th>
                  <th className="border border-orange-300 px-3 py-2 text-center font-semibold">
                    Special rate (%)
                  </th>
                  <th className="border border-orange-300 px-3 py-2 text-right font-semibold">
                    Income(₹)
                  </th>
                  <th className="border border-orange-300 px-3 py-2 text-left font-semibold">
                    Tax Inserted
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderIncomeRow(
                  "1",
                  "111- Accumulated balance of recognized provident for prior years",
                  "0",
                  "item1Checkbox",
                  "item1Amount",
                  "(Part of Sch OS)"
                )}
                {renderIncomeRow(
                  "2a",
                  "111A or Section 115A(1)(b)(i)-(i)- Provide (STCG on shares units on which where STT paid) [where transfer was before 23rd July 2024 as applicable]",
                  "15",
                  "item2aCheckbox",
                  "item2aAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "2b",
                  "111A or section 115A(1)(b)(ii)- Provide (STCG on shares units on which STT paid) [where transfer was on or after 23rd July 2024 as applicable]",
                  "20",
                  "item2bCheckbox",
                  "item2bAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "3",
                  "115AD/STCG for FIIs on securities where STT not paid",
                  "30",
                  "item3Checkbox",
                  "item3Amount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "4a",
                  "Proviso to 112(1) (LTCC on listed securities/ units with indexation) [where transfer was before 23rd July 2024 as applicable and tax thereon after taking into account Sl. no. B1(j)(d) of Schedule CG, if any]",
                  "20 (as reduced by Sl no.)",
                  "item4aCheckbox",
                  "item4aAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "4b",
                  "112(1) (LTCC on listed securities/ units) [where transfer was on or after 23rd July 2024 as applicable]",
                  "12.5",
                  "item4bCheckbox",
                  "item4bAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "5a",
                  "112(1)(cg) (LTCC for non-resident on unlisted securities or other than Listed securities) [where transfer was before 23rd July 2024 as applicable]",
                  "10",
                  "item5aCheckbox",
                  "item5aAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "5b",
                  "112(1)(cgg) (LTCC for non-resident on unlisted securities) [where transfer was on or after 23rd July 2024 as applicable]",
                  "12.5",
                  "item5bCheckbox",
                  "item5bAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "6a",
                  "115AC (LTCC for non-resident on bonds/GDR) [where transfer was before 23rd July 2024 as applicable]",
                  "10",
                  "item6aCheckbox",
                  "item6aAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "6b",
                  "115AC (LTCC for non-resident on bonds/GDR) [where transfer was on or after 23rd July 2024 as applicable]",
                  "12.5",
                  "item6bCheckbox",
                  "item6bAmount",
                  "(Part of Sch BFL(A))"
                )}
                {renderIncomeRow(
                  "7a",
                  "115AC (Income by way of interest received by non-resident on bonds purchased in foreign currency)",
                  "10",
                  "item7aCheckbox",
                  "item7aAmount",
                  "(Part of Sch OS)"
                )}
                {renderIncomeRow(
                  "7b",
                  "115AC (Income by way of Dividend received by non-resident from GDR purchased in foreign currency)",
                  "10",
                  "item7bCheckbox",
                  "item7bAmount",
                  "(Part of Sch OS)"
                )}
              </tbody>
              <tfoot className="bg-orange-100 font-bold">
                <tr>
                  <td
                    colSpan={4}
                    className="border border-orange-300 px-3 py-2"
                  >
                    Total
                  </td>
                  <td className="border border-orange-300 px-3 py-2 text-right">
                    ₹{calculations.total.toFixed(2)}
                  </td>
                  <td className="border border-orange-300 px-3 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-orange-900 bg-orange-100 p-6">
          <h3 className="text-lg font-bold text-orange-900 mb-4">
            Total Special Income
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-orange-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Total Amount:
            </p>
            <p className="text-3xl font-bold text-orange-700">
              ₹{calculations.total.toFixed(2)}
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
          className="flex-1 rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
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
