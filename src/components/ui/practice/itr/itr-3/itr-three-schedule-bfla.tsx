"use client";

import { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleBFLASchema = z
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

    // Row 1 (parent) - Salaries
    bfla1IncomeAfterSetOff: z.string().default("0"),
    bfla1BroughtForwardLossSetOff: z.string().default("0"),
    bfla1BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla1BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla1CurrentYearIncomeRemaining: z.string().default("0"),

    // Row 2-18 (children)
    bfla2IncomeAfterSetOff: z.string().default("0"),
    bfla2BroughtForwardLossSetOff: z.string().default("0"),
    bfla2BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla2BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla2CurrentYearIncomeRemaining: z.string().default("0"),

    bfla3IncomeAfterSetOff: z.string().default("0"),
    bfla3BroughtForwardLossSetOff: z.string().default("0"),
    bfla3BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla3BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla3CurrentYearIncomeRemaining: z.string().default("0"),

    bfla4IncomeAfterSetOff: z.string().default("0"),
    bfla4BroughtForwardLossSetOff: z.string().default("0"),
    bfla4BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla4BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla4CurrentYearIncomeRemaining: z.string().default("0"),

    bfla5IncomeAfterSetOff: z.string().default("0"),
    bfla5BroughtForwardLossSetOff: z.string().default("0"),
    bfla5BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla5BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla5CurrentYearIncomeRemaining: z.string().default("0"),

    bfla6IncomeAfterSetOff: z.string().default("0"),
    bfla6BroughtForwardLossSetOff: z.string().default("0"),
    bfla6BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla6BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla6CurrentYearIncomeRemaining: z.string().default("0"),

    bfla7IncomeAfterSetOff: z.string().default("0"),
    bfla7BroughtForwardLossSetOff: z.string().default("0"),
    bfla7BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla7BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla7CurrentYearIncomeRemaining: z.string().default("0"),

    bfla8IncomeAfterSetOff: z.string().default("0"),
    bfla8BroughtForwardLossSetOff: z.string().default("0"),
    bfla8BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla8BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla8CurrentYearIncomeRemaining: z.string().default("0"),

    bfla9IncomeAfterSetOff: z.string().default("0"),
    bfla9BroughtForwardLossSetOff: z.string().default("0"),
    bfla9BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla9BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla9CurrentYearIncomeRemaining: z.string().default("0"),

    bfla10IncomeAfterSetOff: z.string().default("0"),
    bfla10BroughtForwardLossSetOff: z.string().default("0"),
    bfla10BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla10BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla10CurrentYearIncomeRemaining: z.string().default("0"),

    bfla11IncomeAfterSetOff: z.string().default("0"),
    bfla11BroughtForwardLossSetOff: z.string().default("0"),
    bfla11BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla11BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla11CurrentYearIncomeRemaining: z.string().default("0"),

    bfla12IncomeAfterSetOff: z.string().default("0"),
    bfla12BroughtForwardLossSetOff: z.string().default("0"),
    bfla12BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla12BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla12CurrentYearIncomeRemaining: z.string().default("0"),

    bfla13IncomeAfterSetOff: z.string().default("0"),
    bfla13BroughtForwardLossSetOff: z.string().default("0"),
    bfla13BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla13BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla13CurrentYearIncomeRemaining: z.string().default("0"),

    bfla14IncomeAfterSetOff: z.string().default("0"),
    bfla14BroughtForwardLossSetOff: z.string().default("0"),
    bfla14BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla14BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla14CurrentYearIncomeRemaining: z.string().default("0"),

    bfla15IncomeAfterSetOff: z.string().default("0"),
    bfla15BroughtForwardLossSetOff: z.string().default("0"),
    bfla15BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla15BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla15CurrentYearIncomeRemaining: z.string().default("0"),

    bfla16IncomeAfterSetOff: z.string().default("0"),
    bfla16BroughtForwardLossSetOff: z.string().default("0"),
    bfla16BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla16BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla16CurrentYearIncomeRemaining: z.string().default("0"),

    bfla17IncomeAfterSetOff: z.string().default("0"),
    bfla17BroughtForwardLossSetOff: z.string().default("0"),
    bfla17BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla17BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla17CurrentYearIncomeRemaining: z.string().default("0"),

    bfla18IncomeAfterSetOff: z.string().default("0"),
    bfla18BroughtForwardLossSetOff: z.string().default("0"),
    bfla18BroughtForwardDepreciationSetOff: z.string().default("0"),
    bfla18BroughtForwardAllowance35_4SetOff: z.string().default("0"),
    bfla18CurrentYearIncomeRemaining: z.string().default("0"),

    // Totals
    bflaTotalBroughtForwardLossSetOff: z.string().default("0"),
    bflaTotalDepreciationSetOff: z.string().default("0"),
    bflaTotalAllowance35_4SetOff: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    // If parent row (row 1) not selected (all zero) then skip child validation
    const isParentSelected =
      parseFloat(data.bfla1IncomeAfterSetOff || "0") > 0 ||
      parseFloat(data.bfla1BroughtForwardLossSetOff || "0") > 0 ||
      parseFloat(data.bfla1BroughtForwardDepreciationSetOff || "0") > 0 ||
      parseFloat(data.bfla1BroughtForwardAllowance35_4SetOff || "0") > 0 ||
      parseFloat(data.bfla1CurrentYearIncomeRemaining || "0") > 0;

    if (!isParentSelected) return;

    // Validate numeric fields
    const numericFields: (keyof ScheduleBFLAFormData)[] = [
      "bfla1IncomeAfterSetOff",
      "bfla1BroughtForwardLossSetOff",
      "bfla1BroughtForwardDepreciationSetOff",
      "bfla1BroughtForwardAllowance35_4SetOff",
      "bfla1CurrentYearIncomeRemaining",
      "bfla2IncomeAfterSetOff",
      "bfla2BroughtForwardLossSetOff",
      "bfla2BroughtForwardDepreciationSetOff",
      "bfla2BroughtForwardAllowance35_4SetOff",
      "bfla2CurrentYearIncomeRemaining",
      "bfla3IncomeAfterSetOff",
      "bfla3BroughtForwardLossSetOff",
      "bfla3BroughtForwardDepreciationSetOff",
      "bfla3BroughtForwardAllowance35_4SetOff",
      "bfla3CurrentYearIncomeRemaining",
      "bfla4IncomeAfterSetOff",
      "bfla4BroughtForwardLossSetOff",
      "bfla4BroughtForwardDepreciationSetOff",
      "bfla4BroughtForwardAllowance35_4SetOff",
      "bfla4CurrentYearIncomeRemaining",
      "bfla5IncomeAfterSetOff",
      "bfla5BroughtForwardLossSetOff",
      "bfla5BroughtForwardDepreciationSetOff",
      "bfla5BroughtForwardAllowance35_4SetOff",
      "bfla5CurrentYearIncomeRemaining",
      "bfla6IncomeAfterSetOff",
      "bfla6BroughtForwardLossSetOff",
      "bfla6BroughtForwardDepreciationSetOff",
      "bfla6BroughtForwardAllowance35_4SetOff",
      "bfla6CurrentYearIncomeRemaining",
      "bfla7IncomeAfterSetOff",
      "bfla7BroughtForwardLossSetOff",
      "bfla7BroughtForwardDepreciationSetOff",
      "bfla7BroughtForwardAllowance35_4SetOff",
      "bfla7CurrentYearIncomeRemaining",
      "bfla8IncomeAfterSetOff",
      "bfla8BroughtForwardLossSetOff",
      "bfla8BroughtForwardDepreciationSetOff",
      "bfla8BroughtForwardAllowance35_4SetOff",
      "bfla8CurrentYearIncomeRemaining",
      "bfla9IncomeAfterSetOff",
      "bfla9BroughtForwardLossSetOff",
      "bfla9BroughtForwardDepreciationSetOff",
      "bfla9BroughtForwardAllowance35_4SetOff",
      "bfla9CurrentYearIncomeRemaining",
      "bfla10IncomeAfterSetOff",
      "bfla10BroughtForwardLossSetOff",
      "bfla10BroughtForwardDepreciationSetOff",
      "bfla10BroughtForwardAllowance35_4SetOff",
      "bfla10CurrentYearIncomeRemaining",
      "bfla11IncomeAfterSetOff",
      "bfla11BroughtForwardLossSetOff",
      "bfla11BroughtForwardDepreciationSetOff",
      "bfla11BroughtForwardAllowance35_4SetOff",
      "bfla11CurrentYearIncomeRemaining",
      "bfla12IncomeAfterSetOff",
      "bfla12BroughtForwardLossSetOff",
      "bfla12BroughtForwardDepreciationSetOff",
      "bfla12BroughtForwardAllowance35_4SetOff",
      "bfla12CurrentYearIncomeRemaining",
      "bfla13IncomeAfterSetOff",
      "bfla13BroughtForwardLossSetOff",
      "bfla13BroughtForwardDepreciationSetOff",
      "bfla13BroughtForwardAllowance35_4SetOff",
      "bfla13CurrentYearIncomeRemaining",
      "bfla14IncomeAfterSetOff",
      "bfla14BroughtForwardLossSetOff",
      "bfla14BroughtForwardDepreciationSetOff",
      "bfla14BroughtForwardAllowance35_4SetOff",
      "bfla14CurrentYearIncomeRemaining",
      "bfla15IncomeAfterSetOff",
      "bfla15BroughtForwardLossSetOff",
      "bfla15BroughtForwardDepreciationSetOff",
      "bfla15BroughtForwardAllowance35_4SetOff",
      "bfla15CurrentYearIncomeRemaining",
      "bfla16IncomeAfterSetOff",
      "bfla16BroughtForwardLossSetOff",
      "bfla16BroughtForwardDepreciationSetOff",
      "bfla16BroughtForwardAllowance35_4SetOff",
      "bfla16CurrentYearIncomeRemaining",
      "bfla17IncomeAfterSetOff",
      "bfla17BroughtForwardLossSetOff",
      "bfla17BroughtForwardDepreciationSetOff",
      "bfla17BroughtForwardAllowance35_4SetOff",
      "bfla17CurrentYearIncomeRemaining",
      "bfla18IncomeAfterSetOff",
      "bfla18BroughtForwardLossSetOff",
      "bfla18BroughtForwardDepreciationSetOff",
      "bfla18BroughtForwardAllowance35_4SetOff",
      "bfla18CurrentYearIncomeRemaining",
      "bflaTotalBroughtForwardLossSetOff",
      "bflaTotalDepreciationSetOff",
      "bflaTotalAllowance35_4SetOff",
    ];

    numericFields.forEach((field) => {
      const value = data[field] as string | undefined;
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: "Must be a valid non-negative number",
          });
        }
      }
    });
  });

export type ScheduleBFLAFormData = z.infer<typeof ScheduleBFLASchema>;

interface ScheduleBFLAProps {
  initialData?: Partial<ScheduleBFLAFormData>;
  onSave: (data: ScheduleBFLAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleBFLA({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleBFLAProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleBFLAFormData>({
    resolver: zodResolver(ScheduleBFLASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch() as ScheduleBFLAFormData;

  const onSubmit: SubmitHandler<ScheduleBFLAFormData> = (data) => {
    onSave(data);
  };

  const INCOME_HEADS = [
    "Salaries",
    "House property",
    "Business (excluding speculation)",
    "Speculation income",
    "Specified business income",
    "STCG @ 15%",
    "STCG @ 20%",
    "STCG @ 30%",
    "STCG at applicable rates",
    "STCG - special DTAA",
    "LTCG @ 10%",
    "LTCG @ 12.5%",
    "LTCG @ 20%",
    "LTCG - special DTAA",
    "Net income from other sources",
    "Profit from race horses",
    "Income from other sources special",
    "Miscellaneous",
  ];

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    let totalBFLoss = 0;
    let totalDepreciation = 0;
    let totalAllowance = 0;

    for (let i = 1; i <= 18; i++) {
      const idx = i as any;
      totalBFLoss += parseVal(watched[`bfla${idx}BroughtForwardLossSetOff` as keyof ScheduleBFLAFormData]);
      totalDepreciation += parseVal(
        watched[`bfla${idx}BroughtForwardDepreciationSetOff` as keyof ScheduleBFLAFormData]
      );
      totalAllowance += parseVal(
        watched[`bfla${idx}BroughtForwardAllowance35_4SetOff` as keyof ScheduleBFLAFormData]
      );
    }

    return { totalBFLoss, totalDepreciation, totalAllowance };
  }, [watched]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-amber-900">Schedule BFL(A) - Brought Forward Losses</h1>
        <p className="mt-1 text-sm text-amber-700">Details of losses set off from previous years and remaining current year income</p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {/* Assessee Details */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4">Assessee Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Controller
                name="assesseePhone"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.assesseePhone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10 digits starting 6-9"
                    />
                    {errors.assesseePhone && (
                      <p className="mt-1 text-xs text-red-600">{errors.assesseePhone.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
              <Controller
                name="assesseeAadhaar"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg ${
                        errors.assesseeAadhaar ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="12 digits starting 2-9"
                    />
                    {errors.assesseeAadhaar && (
                      <p className="mt-1 text-xs text-red-600">{errors.assesseeAadhaar.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto bg-white border rounded-xl">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-amber-100 sticky top-0">
              <tr>
                <th className="border border-amber-300 px-2 py-2 text-center font-semibold">S. No.</th>
                <th className="border border-amber-300 px-2 py-2 text-left font-semibold">Head / Source of Income</th>
                <th className="border border-amber-300 px-2 py-2 text-center font-semibold min-w-28">Income after set off</th>
                <th className="border border-amber-300 px-2 py-2 text-center font-semibold min-w-28">B/F loss set off</th>
                <th className="border border-amber-300 px-2 py-2 text-center font-semibold min-w-28">B/F depreciation set off</th>
                <th className="border border-amber-300 px-2 py-2 text-center font-semibold min-w-28">B/F allowance u/s 35(4) set off</th>
                <th className="border border-amber-300 px-2 py-2 text-center font-semibold min-w-28">Current year income remaining</th>
              </tr>
            </thead>
            <tbody>
              {INCOME_HEADS.map((head, i) => {
                const idx = (i + 1) as any;
                const baseField = `bfla${idx}` as keyof ScheduleBFLAFormData;
                const incomeField = `${baseField}IncomeAfterSetOff` as keyof ScheduleBFLAFormData;
                const lossField = `${baseField}BroughtForwardLossSetOff` as keyof ScheduleBFLAFormData;
                const depField = `${baseField}BroughtForwardDepreciationSetOff` as keyof ScheduleBFLAFormData;
                const allowField = `${baseField}BroughtForwardAllowance35_4SetOff` as keyof ScheduleBFLAFormData;
                const remainingField = `${baseField}CurrentYearIncomeRemaining` as keyof ScheduleBFLAFormData;

                return (
                  <tr key={idx} className="hover:bg-amber-50">
                    <td className="border border-amber-300 px-2 py-2 text-center font-medium">{idx}</td>
                    <td className="border border-amber-300 px-2 py-2 text-sm">{head}</td>
                    <td className="border border-amber-300 px-2 py-1">
                      <Controller
                        name={incomeField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[incomeField] ? "border-red-500" : "border-amber-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[incomeField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[incomeField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-amber-300 px-2 py-1">
                      <Controller
                        name={lossField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[lossField] ? "border-red-500" : "border-amber-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[lossField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[lossField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-amber-300 px-2 py-1">
                      <Controller
                        name={depField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[depField] ? "border-red-500" : "border-amber-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[depField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[depField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-amber-300 px-2 py-1">
                      <Controller
                        name={allowField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[allowField] ? "border-red-500" : "border-amber-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[allowField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[allowField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                    <td className="border border-amber-300 px-2 py-1">
                      <Controller
                        name={remainingField}
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              className={`w-full px-2 py-1 text-sm border rounded ${
                                errors[remainingField] ? "border-red-500" : "border-amber-200"
                              }`}
                              placeholder="0.00"
                            />
                            {errors[remainingField] && (
                              <p className="mt-0.5 text-xs text-red-600">{(errors[remainingField] as any)?.message}</p>
                            )}
                          </>
                        )}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-white border-2 border-amber-300 p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total B/F loss set off</label>
            <Controller
              name="bflaTotalBroughtForwardLossSetOff"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded font-bold text-lg ${
                      errors.bflaTotalBroughtForwardLossSetOff ? "border-red-500" : "border-amber-300"
                    }`}
                    value={calculations.totalBFLoss.toFixed(2)}
                    readOnly
                  />
                </>
              )}
            />
          </div>
          <div className="rounded-lg bg-white border-2 border-amber-300 p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total depreciation set off</label>
            <Controller
              name="bflaTotalDepreciationSetOff"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded font-bold text-lg ${
                      errors.bflaTotalDepreciationSetOff ? "border-red-500" : "border-amber-300"
                    }`}
                    value={calculations.totalDepreciation.toFixed(2)}
                    readOnly
                  />
                </>
              )}
            />
          </div>
          <div className="rounded-lg bg-white border-2 border-amber-300 p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total allowance u/s 35(4) set off</label>
            <Controller
              name="bflaTotalAllowance35_4SetOff"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded font-bold text-lg ${
                      errors.bflaTotalAllowance35_4SetOff ? "border-red-500" : "border-amber-300"
                    }`}
                    value={calculations.totalAllowance.toFixed(2)}
                    readOnly
                  />
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-lg rounded-b-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
