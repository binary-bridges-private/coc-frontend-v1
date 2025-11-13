"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleSASchema = z
  .object({
    // Spouse Information
    spouseName: z.string().default(""),
    spousePAN: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
        message: "PAN must be 10 alphanumeric characters",
      }),
    spouseAadhar: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[2-9][0-9]{11}$/.test(val), {
        message: "Aadhaar must be 12 digits starting with 2-9",
      }),

    // Spouse Account Audit Status
    spouseAccountAudited: z.string().default(""),
    otherActsApplicable: z.string().default(""),
    firmPartnershipsDetails: z.string().default(""),

    // Income Apportionment
    headHousePropertyTotal: z.string().default("0"),
    headHousePropertyApportioned: z.string().default("0"),

    headBusinessTotal: z.string().default("0"),
    headBusinessApportioned: z.string().default("0"),

    headCapitalGainsTotal: z.string().default("0"),
    headCapitalGainsApportioned: z.string().default("0"),

    headOtherSourcesTotal: z.string().default("0"),
    headOtherSourcesApportioned: z.string().default("0"),

    totalIncomeBeforeApportionment: z.string().default("0"),
    totalIncomeApportioned: z.string().default("0"),

    // TDS Information
    tdsDeductedAtSourceHouseProperty: z.string().default("0"),
    tdsDeductedAtSourceBusiness: z.string().default("0"),
    tdsDeductedAtSourceCapitalGains: z.string().default("0"),
    tdsDeductedAtSourceOtherSources: z.string().default("0"),
    totalTDSDeducted: z.string().default("0"),

    // Additional Info
    additionalNotes: z.string().default(""),
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
      "headHousePropertyTotal",
      "headHousePropertyApportioned",
      "headBusinessTotal",
      "headBusinessApportioned",
      "headCapitalGainsTotal",
      "headCapitalGainsApportioned",
      "headOtherSourcesTotal",
      "headOtherSourcesApportioned",
      "totalIncomeBeforeApportionment",
      "totalIncomeApportioned",
      "tdsDeductedAtSourceHouseProperty",
      "tdsDeductedAtSourceBusiness",
      "tdsDeductedAtSourceCapitalGains",
      "tdsDeductedAtSourceOtherSources",
      "totalTDSDeducted",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule SA - Apportionment of Income Between Spouses", data);
  });

export type ScheduleSAFormData = z.infer<typeof ScheduleSASchema>;

interface ScheduleSAProps {
  initialData?: Partial<ScheduleSAFormData>;
  onSave: (data: ScheduleSAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleSA({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleSAProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleSAFormData>({
    resolver: zodResolver(ScheduleSASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const housePropertyTotal = parseVal(watched.headHousePropertyTotal);
    const businessTotal = parseVal(watched.headBusinessTotal);
    const capitalGainsTotal = parseVal(watched.headCapitalGainsTotal);
    const otherSourcesTotal = parseVal(watched.headOtherSourcesTotal);

    const totalBefore =
      housePropertyTotal +
      businessTotal +
      capitalGainsTotal +
      otherSourcesTotal;

    const housePropertyApp = parseVal(watched.headHousePropertyApportioned);
    const businessApp = parseVal(watched.headBusinessApportioned);
    const capitalGainsApp = parseVal(watched.headCapitalGainsApportioned);
    const otherSourcesApp = parseVal(watched.headOtherSourcesApportioned);

    const totalApp =
      housePropertyApp + businessApp + capitalGainsApp + otherSourcesApp;

    const tdsTotal =
      parseVal(watched.tdsDeductedAtSourceHouseProperty) +
      parseVal(watched.tdsDeductedAtSourceBusiness) +
      parseVal(watched.tdsDeductedAtSourceCapitalGains) +
      parseVal(watched.tdsDeductedAtSourceOtherSources);

    return {
      housePropertyTotal,
      businessTotal,
      capitalGainsTotal,
      otherSourcesTotal,
      totalBefore,
      housePropertyApp,
      businessApp,
      capitalGainsApp,
      otherSourcesApp,
      totalApp,
      tdsTotal,
    };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleSAFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-amber-900">
          Schedule SA - Information regarding Apportionment of Income between Spouses
        </h1>
        <p className="mt-1 text-sm text-amber-700">
          Governed by Portuguese Civil Code
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Spouse Information */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4">
            Spouse Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of Spouse
              </label>
              <Controller
                name="spouseName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Spouse name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN of Spouse
              </label>
              <Controller
                name="spousePAN"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.spousePAN ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10 chars"
                    />
                    {errors.spousePAN && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.spousePAN.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar of Spouse
              </label>
              <Controller
                name="spouseAadhar"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.spouseAadhar ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="12 digits"
                    />
                    {errors.spouseAadhar && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.spouseAadhar.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Whether Books of Spouse are Audited u/s 44AB
              </label>
              <Controller
                name="spouseAccountAudited"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Whether Other Acts Applicable
              </label>
              <Controller
                name="otherActsApplicable"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Income Apportionment Table */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 overflow-x-auto">
          <h2 className="text-lg font-bold text-amber-900 mb-4">
            Income Apportionment by Head
          </h2>
          <table className="w-full border border-amber-300 bg-white text-sm">
            <thead className="bg-amber-200">
              <tr>
                <th className="border border-amber-300 px-3 py-2 text-left font-semibold">
                  Head of Income
                </th>
                <th className="border border-amber-300 px-3 py-2 text-right font-semibold">
                  Total Income (₹)
                </th>
                <th className="border border-amber-300 px-3 py-2 text-right font-semibold">
                  Apportioned Amount (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-amber-50">
                <td className="border border-amber-300 px-3 py-2">
                  House Property
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headHousePropertyTotal"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headHousePropertyTotal
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headHousePropertyApportioned"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headHousePropertyApportioned
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
              </tr>
              <tr className="hover:bg-amber-50">
                <td className="border border-amber-300 px-3 py-2">
                  Business or Profession
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headBusinessTotal"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headBusinessTotal
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headBusinessApportioned"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headBusinessApportioned
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
              </tr>
              <tr className="hover:bg-amber-50">
                <td className="border border-amber-300 px-3 py-2">
                  Capital Gains
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headCapitalGainsTotal"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headCapitalGainsTotal
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headCapitalGainsApportioned"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headCapitalGainsApportioned
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
              </tr>
              <tr className="hover:bg-amber-50">
                <td className="border border-amber-300 px-3 py-2">
                  Other Sources
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headOtherSourcesTotal"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headOtherSourcesTotal
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
                <td className="border border-amber-300 px-3 py-2">
                  <Controller
                    name="headOtherSourcesApportioned"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={typeof field.value === "string" ? field.value : ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className={`w-full px-2 py-1 border rounded text-sm text-right ${
                          errors.headOtherSourcesApportioned
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                    )}
                  />
                </td>
              </tr>
              <tr className="bg-amber-100 font-bold">
                <td className="border border-amber-300 px-3 py-2">
                  Total
                </td>
                <td className="border border-amber-300 px-3 py-2 text-right">
                  ₹{calculations.totalBefore.toFixed(2)}
                </td>
                <td className="border border-amber-300 px-3 py-2 text-right">
                  ₹{calculations.totalApp.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TDS Deducted */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900 mb-4">
            TDS Deducted at Source
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                House Property (₹)
              </label>
              <Controller
                name="tdsDeductedAtSourceHouseProperty"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.tdsDeductedAtSourceHouseProperty
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.tdsDeductedAtSourceHouseProperty && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.tdsDeductedAtSourceHouseProperty.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business (₹)
              </label>
              <Controller
                name="tdsDeductedAtSourceBusiness"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.tdsDeductedAtSourceBusiness
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.tdsDeductedAtSourceBusiness && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.tdsDeductedAtSourceBusiness.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capital Gains (₹)
              </label>
              <Controller
                name="tdsDeductedAtSourceCapitalGains"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.tdsDeductedAtSourceCapitalGains
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.tdsDeductedAtSourceCapitalGains && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.tdsDeductedAtSourceCapitalGains.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Sources (₹)
              </label>
              <Controller
                name="tdsDeductedAtSourceOtherSources"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        errors.tdsDeductedAtSourceOtherSources
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.tdsDeductedAtSourceOtherSources && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.tdsDeductedAtSourceOtherSources.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-amber-900 bg-amber-100 p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-4">
            Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-amber-300 space-y-3">
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total TDS Deducted:</p>
              <p className="font-bold text-amber-700">₹{calculations.tdsTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-amber-50 p-3 rounded font-bold">
              <p className="text-gray-800">Total Income Apportioned:</p>
              <p className="text-lg text-amber-700">₹{calculations.totalApp.toFixed(2)}</p>
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
          className="flex-1 rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
