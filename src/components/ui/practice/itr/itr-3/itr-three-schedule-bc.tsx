"use client";

import React, { useState, useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleBCSchema = z
  .object({
    // Bank Account Details (India) - up to 5 accounts
    bankSelectRefund: z.string().default(""),
    bankNameIndia1: z.string().default(""),
    accountNumberIndia1: z.string().default(""),
    accountTypeIndia1: z.string().default(""),
    selectAccountRefund1: z.string().default("No"),
    bankNameIndia2: z.string().default(""),
    accountNumberIndia2: z.string().default(""),
    accountTypeIndia2: z.string().default(""),
    selectAccountRefund2: z.string().default("No"),
    bankNameIndia3: z.string().default(""),
    accountNumberIndia3: z.string().default(""),
    accountTypeIndia3: z.string().default(""),
    selectAccountRefund3: z.string().default("No"),
    bankNameIndia4: z.string().default(""),
    accountNumberIndia4: z.string().default(""),
    accountTypeIndia4: z.string().default(""),
    selectAccountRefund4: z.string().default("No"),
    bankNameIndia5: z.string().default(""),
    accountNumberIndia5: z.string().default(""),
    accountTypeIndia5: z.string().default(""),
    selectAccountRefund5: z.string().default("No"),

    // Non-resident foreign bank account details - up to 2 accounts
    swiftCode1: z.string().default(""),
    bankNameForeign1: z.string().default(""),
    countryLocation1: z.string().default(""),
    ibanNumber1: z.string().default(""),
    swiftCode2: z.string().default(""),
    bankNameForeign2: z.string().default(""),
    countryLocation2: z.string().default(""),
    ibanNumber2: z.string().default(""),

    // Cash in hand
    cashInHand: z.string().default("0"),
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

    validateNumeric(data.cashInHand, "cashInHand", ["cashInHand"]);

    console.log("Schedule BC - Bank Accounts and Cash", data);
  });

export type ScheduleBCFormData = z.infer<typeof ScheduleBCSchema>;

interface ScheduleBCProps {
  initialData?: Partial<ScheduleBCFormData>;
  onSave: (data: ScheduleBCFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const BankAccountRow = ({
  index,
  control,
  errors,
  label,
}: {
  index: number;
  control: any;
  errors: any;
  label: string;
}) => {
  return (
    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
      <h4 className="mb-3 font-semibold text-blue-900">{label}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of the Bank
          </label>
          <Controller
            name={`bankNameIndia${index}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bank name..."
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <Controller
            name={`accountNumberIndia${index}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Account number..."
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Account
          </label>
          <Controller
            name={`accountTypeIndia${index}` as any}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Recurring">Recurring</option>
                <option value="Fixed">Fixed Deposit</option>
                <option value="Other">Other</option>
              </select>
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Account for Refund Credit (Rice or Refund)
          </label>
          <Controller
            name={`selectAccountRefund${index}` as any}
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
      </div>
    </div>
  );
};

const ForeignBankRow = ({
  index,
  control,
  errors,
  label,
}: {
  index: number;
  control: any;
  errors: any;
  label: string;
}) => {
  return (
    <div className="mb-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
      <h4 className="mb-3 font-semibold text-purple-900">{label}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SWIFT Code
          </label>
          <Controller
            name={`swiftCode${index}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="SWIFT code..."
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of the Bank
          </label>
          <Controller
            name={`bankNameForeign${index}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Bank name..."
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country of Location
          </label>
          <Controller
            name={`countryLocation${index}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Country..."
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IBAN Number
          </label>
          <Controller
            name={`ibanNumber${index}` as any}
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                value={field.value || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="IBAN number..."
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default function ItrThreeScheduleBC({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleBCProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleBCFormData>({
    resolver: zodResolver(ScheduleBCSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const onSubmit: SubmitHandler<ScheduleBCFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Schedule BC - Bank Accounts and Cash
        </h1>
        <p className="mt-1 text-sm text-slate-700">
          Details of bank accounts held in India and foreign bank accounts for non-residents
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* India Bank Accounts */}
        <div className="rounded-xl border border-slate-300 bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            A. Details of Bank Accounts held in India
          </h2>
          <div className="mb-4 rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> All bank accounts held at any time are to be reported, except dormant A/c. In case, multiple accounts are selected, the refund will be credited to one of the validated accounts after processing the return.
            </p>
          </div>

          {[1, 2, 3, 4, 5].map((idx) => (
            <BankAccountRow
              key={idx}
              index={idx}
              control={control}
              errors={errors}
              label={`Account ${idx}`}
            />
          ))}
        </div>

        {/* Foreign Bank Accounts */}
        <div className="rounded-xl border border-purple-300 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            B. Non-residents, not having bank account in India may, at their option, furnish the details of foreign bank account
          </h2>
          <div className="mb-4 rounded-lg bg-purple-100 p-3">
            <p className="text-sm text-purple-900">
              <strong>Note:</strong> Non-residents without Indian bank accounts may provide foreign bank details for refund purposes.
            </p>
          </div>

          {[1, 2].map((idx) => (
            <ForeignBankRow
              key={idx}
              index={idx}
              control={control}
              errors={errors}
              label={`Foreign Account ${idx}`}
            />
          ))}
        </div>

        {/* Cash in Hand */}
        <div className="rounded-xl border border-green-300 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">
            C. Cash in Hand
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount of Cash in Hand (₹)
              </label>
              <Controller
                name="cashInHand"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="text"
                      value={typeof field.value === "string" ? field.value : ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.cashInHand
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.cashInHand && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.cashInHand.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details
              </label>
              <div className="px-3 py-2 bg-green-100 rounded-lg text-sm text-green-900">
                Cash and other liquid cash assets
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="rounded-xl border-2 border-slate-300 bg-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>All active and dormant bank accounts during the financial year must be reported</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Select at least one account for receiving tax refunds</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>For non-residents, foreign bank account details are optional but recommended</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Cash in hand should include all physical currency held</span>
            </li>
          </ul>
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
          className="flex-1 rounded-lg bg-slate-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-gray-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
