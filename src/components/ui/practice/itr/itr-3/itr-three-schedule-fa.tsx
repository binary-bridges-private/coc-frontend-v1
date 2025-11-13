"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleFASchema = z
  .object({
    // Foreign Depository Accounts
    depAcctCountryCode: z.string().default(""),
    depAcctName: z.string().default(""),
    depAcctNameOfInstitution: z.string().default(""),
    depAcctAddressZip: z.string().default(""),
    depAcctStatus: z.string().default(""),
    depAcctOpeningDate: z.string().default(""),
    depAcctPeakBalance: z.string().default("0"),
    depAcctClosingBalance: z.string().default("0"),
    depAcctInterestAccrued: z.string().default("0"),

    // Foreign Custodial Accounts
    custAcctCountryCode: z.string().default(""),
    custAcctName: z.string().default(""),
    custAcctNameOfInstitution: z.string().default(""),
    custAcctAddressZip: z.string().default(""),
    custAcctStatus: z.string().default(""),
    custAcctOpeningDate: z.string().default(""),
    custAcctPeakBalance: z.string().default("0"),
    custAcctClosingBalance: z.string().default("0"),
    custAcctGrossAmount: z.string().default("0"),

    // Foreign Equity and Debt Interest
    equityCountryCode: z.string().default(""),
    equityName: z.string().default(""),
    equityAddressZip: z.string().default(""),
    equityNature: z.string().default(""),
    equityDateOfAcquisition: z.string().default(""),
    equityInitialValue: z.string().default("0"),
    equityPeakValue: z.string().default("0"),
    equityCloseValue: z.string().default("0"),
    equityGrossAmount: z.string().default("0"),

    // Foreign Immovable Property
    immovCountryCode: z.string().default(""),
    immovPropertyType: z.string().default(""),
    immovDateOfAcquisition: z.string().default(""),
    immovTotalInvestment: z.string().default("0"),
    immovNatureOfDerived: z.string().default(""),
    immovIncome: z.string().default("0"),
    immovAmount: z.string().default("0"),

    // Other Capital Assets
    otherAssetCountryCode: z.string().default(""),
    otherAssetDescription: z.string().default(""),
    otherAssetDateOfAcquisition: z.string().default(""),
    otherAssetTotalInvestment: z.string().default("0"),
    otherAssetNatureOfDerived: z.string().default(""),
    otherAssetIncome: z.string().default("0"),
    otherAssetAmount: z.string().default("0"),

    totalForeignAssets: z.string().default("0"),
    totalForeignIncome: z.string().default("0"),
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
      "depAcctPeakBalance",
      "depAcctClosingBalance",
      "depAcctInterestAccrued",
      "custAcctPeakBalance",
      "custAcctClosingBalance",
      "custAcctGrossAmount",
      "equityInitialValue",
      "equityPeakValue",
      "equityCloseValue",
      "equityGrossAmount",
      "immovTotalInvestment",
      "immovIncome",
      "immovAmount",
      "otherAssetTotalInvestment",
      "otherAssetIncome",
      "otherAssetAmount",
      "totalForeignAssets",
      "totalForeignIncome",
    ];

    numericFields.forEach((field) => {
      validateNumeric(
        data[field as keyof typeof data] as string,
        field,
        [field]
      );
    });

    console.log("Schedule FA - Foreign Assets and Income", data);
  });

export type ScheduleFAFormData = z.infer<typeof ScheduleFASchema>;

interface ScheduleFAProps {
  initialData?: Partial<ScheduleFAFormData>;
  onSave: (data: ScheduleFAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleFA({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleFAProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFAFormData>({
    resolver: zodResolver(ScheduleFASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const depAcctTotal = parseVal(watched.depAcctPeakBalance);
    const custAcctTotal = parseVal(watched.custAcctGrossAmount);
    const equityTotal = parseVal(watched.equityGrossAmount);
    const immovTotal = parseVal(watched.immovAmount);
    const otherTotal = parseVal(watched.otherAssetAmount);

    const totalAssets =
      depAcctTotal + custAcctTotal + equityTotal + immovTotal + otherTotal;

    const incomeAssets =
      parseVal(watched.depAcctInterestAccrued) +
      parseVal(watched.immovIncome) +
      parseVal(watched.otherAssetIncome);

    return { depAcctTotal, custAcctTotal, equityTotal, immovTotal, otherTotal, totalAssets, incomeAssets };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleFAFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-teal-900">
          Schedule FA - Foreign Assets and Income from any source outside India
        </h1>
        <p className="mt-1 text-sm text-teal-700">
          Details of foreign depository, custodial accounts, equity, property, and other capital assets
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Foreign Depository Accounts */}
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-lg font-bold text-teal-900 mb-4">
            A1. Details of Foreign Depository Accounts
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Code
              </label>
              <Controller
                name="depAcctCountryCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g., US, UK"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <Controller
                name="depAcctName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of Financial Institution
              </label>
              <Controller
                name="depAcctNameOfInstitution"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Bank/Institution name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address and ZIP Code
              </label>
              <Controller
                name="depAcctAddressZip"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Address, ZIP"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <Controller
                name="depAcctStatus"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Opening Date
              </label>
              <Controller
                name="depAcctOpeningDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="DD/MM/YYYY"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peak Balance (₹)
              </label>
              <Controller
                name="depAcctPeakBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        errors.depAcctPeakBalance
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.depAcctPeakBalance && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctPeakBalance.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Balance (₹)
              </label>
              <Controller
                name="depAcctClosingBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        errors.depAcctClosingBalance
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.depAcctClosingBalance && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctClosingBalance.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Accrued (₹)
              </label>
              <Controller
                name="depAcctInterestAccrued"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        errors.depAcctInterestAccrued
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.depAcctInterestAccrued && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.depAcctInterestAccrued.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Foreign Custodial Accounts */}
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6">
          <h2 className="text-lg font-bold text-cyan-900 mb-4">
            A2. Details of Foreign Custodial Accounts
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Code
              </label>
              <Controller
                name="custAcctCountryCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g., US, UK"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <Controller
                name="custAcctName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of Financial Institution
              </label>
              <Controller
                name="custAcctNameOfInstitution"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Bank/Institution name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address and ZIP Code
              </label>
              <Controller
                name="custAcctAddressZip"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Address, ZIP"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peak Balance (₹)
              </label>
              <Controller
                name="custAcctPeakBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.custAcctPeakBalance
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.custAcctPeakBalance && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.custAcctPeakBalance.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Balance (₹)
              </label>
              <Controller
                name="custAcctClosingBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.custAcctClosingBalance
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.custAcctClosingBalance && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.custAcctClosingBalance.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Amount (₹)
              </label>
              <Controller
                name="custAcctGrossAmount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        errors.custAcctGrossAmount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.custAcctGrossAmount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.custAcctGrossAmount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Foreign Equity and Debt */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            A3. Details of Foreign Equity and Debt Interest
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country Code
              </label>
              <Controller
                name="equityCountryCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., US, UK"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entity Name
              </label>
              <Controller
                name="equityName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entity name"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address and ZIP Code
              </label>
              <Controller
                name="equityAddressZip"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Address, ZIP"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nature of Equity/Debt
              </label>
              <Controller
                name="equityNature"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Equity">Equity</option>
                    <option value="Debt">Debt</option>
                    <option value="Bond">Bond</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Acquisition
              </label>
              <Controller
                name="equityDateOfAcquisition"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="DD/MM/YYYY"
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Value (₹)
              </label>
              <Controller
                name="equityInitialValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.equityInitialValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.equityInitialValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.equityInitialValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peak Value (₹)
              </label>
              <Controller
                name="equityPeakValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.equityPeakValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.equityPeakValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.equityPeakValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Value (₹)
              </label>
              <Controller
                name="equityCloseValue"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.equityCloseValue
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.equityCloseValue && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.equityCloseValue.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gross Amount (₹)
              </label>
              <Controller
                name="equityGrossAmount"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.equityGrossAmount
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.equityGrossAmount && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.equityGrossAmount.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-teal-900 bg-teal-100 p-6">
          <h3 className="text-lg font-bold text-teal-900 mb-4">
            Summary of Foreign Assets
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-teal-300 space-y-3">
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Depository Accounts:</p>
              <p className="font-bold text-teal-700">₹{calculations.depAcctTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Custodial Accounts:</p>
              <p className="font-bold text-teal-700">₹{calculations.custAcctTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <p className="font-semibold text-gray-700">Total Equity/Debt Value:</p>
              <p className="font-bold text-teal-700">₹{calculations.equityTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-teal-50 p-3 rounded font-bold">
              <p className="text-gray-800">Total Foreign Assets Value:</p>
              <p className="text-lg text-teal-700">₹{calculations.totalAssets.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 bg-teal-50 p-3 rounded font-bold">
              <p className="text-gray-800">Total Income from Foreign Assets:</p>
              <p className="text-lg text-teal-700">₹{calculations.incomeAssets.toFixed(2)}</p>
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
          className="flex-1 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
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
