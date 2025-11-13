"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleTDSSchema = z
  .object({
    // Assessment Year 2021-22
    ay1: z.string().default(""),
    slNo1: z.string().default(""),
    equityShares1: z.string().default(""),
    dateAcquired1: z.string().default(""),
    amountDeferredTax1: z.string().default("0"),
    ceasedToBeEmployee1: z.string().default("No"),
    ceasedDate1: z.string().default(""),
    fortyEightMonths1: z.string().default("No"),
    specifyDateAllowed1: z.string().default(""),
    amountTaxPayable1: z.string().default("0"),
    balanceDeferredTo1: z.string().default("0"),

    // Assessment Year 2022-23
    ay2: z.string().default(""),
    slNo2: z.string().default(""),
    equityShares2: z.string().default(""),
    dateAcquired2: z.string().default(""),
    amountDeferredTax2: z.string().default("0"),
    ceasedToBeEmployee2: z.string().default("No"),
    ceasedDate2: z.string().default(""),
    fortyEightMonths2: z.string().default("No"),
    specifyDateAllowed2: z.string().default(""),
    amountTaxPayable2: z.string().default("0"),
    balanceDeferredTo2: z.string().default("0"),

    // Assessment Year 2023-24
    ay3: z.string().default(""),
    slNo3: z.string().default(""),
    equityShares3: z.string().default(""),
    dateAcquired3: z.string().default(""),
    amountDeferredTax3: z.string().default("0"),
    ceasedToBeEmployee3: z.string().default("No"),
    ceasedDate3: z.string().default(""),
    fortyEightMonths3: z.string().default("No"),
    specifyDateAllowed3: z.string().default(""),
    amountTaxPayable3: z.string().default("0"),
    balanceDeferredTo3: z.string().default("0"),

    // Assessment Year 2024-25
    ay4: z.string().default(""),
    slNo4: z.string().default(""),
    equityShares4: z.string().default(""),
    dateAcquired4: z.string().default(""),
    amountDeferredTax4: z.string().default("0"),
    ceasedToBeEmployee4: z.string().default("No"),
    ceasedDate4: z.string().default(""),
    fortyEightMonths4: z.string().default("No"),
    specifyDateAllowed4: z.string().default(""),
    amountTaxPayable4: z.string().default("0"),
    balanceDeferredTo4: z.string().default("0"),
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
      "amountDeferredTax1",
      "amountTaxPayable1",
      "balanceDeferredTo1",
      "amountDeferredTax2",
      "amountTaxPayable2",
      "balanceDeferredTo2",
      "amountDeferredTax3",
      "amountTaxPayable3",
      "balanceDeferredTo3",
      "amountDeferredTax4",
      "amountTaxPayable4",
      "balanceDeferredTo4",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule TDS - Tax Deferred ESOP", data);
  });

export type ScheduleTDSFormData = z.infer<typeof ScheduleTDSSchema>;

interface ScheduleTDSProps {
  initialData?: Partial<ScheduleTDSFormData>;
  onSave: (data: ScheduleTDSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ESOpRow = ({
  year,
  index,
  control,
  errors,
  watch,
}: {
  year: string;
  index: string;
  control: any;
  errors: any;
  watch: any;
}) => {
  const watched = watch();
  const suffix = index;

  return (
    <div className="mb-6 rounded-lg border border-blue-300 bg-blue-50 p-4">
      <h3 className="mb-4 font-semibold text-blue-900">Assessment Year {year}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SL. No.
          </label>
          <Controller
            name={`slNo${suffix}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1"
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equity Shares Specified (ESOP/RSU)
          </label>
          <Controller
            name={`equityShares${suffix}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Details..."
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Acquired/Allotted (DD/MM/YYYY)
          </label>
          <Controller
            name={`dateAcquired${suffix}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DD/MM/YYYY"
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount of Tax Deferred Brought Forward (₹)
          </label>
          <Controller
            name={`amountDeferredTax${suffix}` as any}
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    (errors as any)[`amountDeferredTax${suffix}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {(errors as any)[`amountDeferredTax${suffix}`] && (
                  <p className="mt-1 text-xs text-red-600">
                    {(errors as any)[`amountDeferredTax${suffix}`]?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ceased to be Employee?
          </label>
          <Controller
            name={`ceasedToBeEmployee${suffix}` as any}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value || "No"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Ceased (if Yes) (DD/MM/YYYY)
          </label>
          <Controller
            name={`ceasedDate${suffix}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DD/MM/YYYY"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forty-Eight Months Elapsed?
          </label>
          <Controller
            name={`fortyEightMonths${suffix}` as any}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value || "No"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specify Date Allowed (if Yes) (DD/MM/YYYY)
          </label>
          <Controller
            name={`specifyDateAllowed${suffix}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DD/MM/YYYY"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount of Tax Payable in Current Year (₹)
          </label>
          <Controller
            name={`amountTaxPayable${suffix}` as any}
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    (errors as any)[`amountTaxPayable${suffix}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {(errors as any)[`amountTaxPayable${suffix}`] && (
                  <p className="mt-1 text-xs text-red-600">
                    {(errors as any)[`amountTaxPayable${suffix}`]?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Balance Deferred (to be Carried Forward) (₹)
          </label>
          <Controller
            name={`balanceDeferredTo${suffix}` as any}
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    (errors as any)[`balanceDeferredTo${suffix}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {(errors as any)[`balanceDeferredTo${suffix}`] && (
                  <p className="mt-1 text-xs text-red-600">
                    {(errors as any)[`balanceDeferredTo${suffix}`]?.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default function ItrThreeScheduleTDS({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleTDSProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleTDSFormData>({
    resolver: zodResolver(ScheduleTDSSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const onSubmit: SubmitHandler<ScheduleTDSFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-blue-900">
          Schedule TDS - Tax Deferred ESOP
        </h1>
        <p className="mt-1 text-sm text-blue-800">
          Information related to tax deferred - relatable to income on perquisites referred in section 17(2)(vi)
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Received from employer, being an eligible start-up referred to in section 80-IAC (3-b)
          </p>
        </div>

        {/* Assessment Year Rows */}
        <ESOpRow
          year="2021-22"
          index="1"
          control={control}
          errors={errors}
          watch={watch}
        />
        <ESOpRow
          year="2022-23"
          index="2"
          control={control}
          errors={errors}
          watch={watch}
        />
        <ESOpRow
          year="2023-24"
          index="3"
          control={control}
          errors={errors}
          watch={watch}
        />
        <ESOpRow
          year="2024-25"
          index="4"
          control={control}
          errors={errors}
          watch={watch}
        />
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
          className="flex-1 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
