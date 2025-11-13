"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SchedulePartBSchema = z
  .object({
    // Part B: Deduction in respect of certain payments
    // Section (a) - Medical Insurance Premium (80CC(1))
    medicalInsurancePremium: z.string().default("0"),

    // Section (b) - Senior Citizen Health Insurance (80CCD(1))
    seniorCitizenHealthInsurance: z.string().default("0"),

    // Section (c) - Life Insurance Premium (80CCD(1A))
    lifeInsurancePremium: z.string().default("0"),

    // Section (d) - Education Loan Interest (80CCD(1B))
    educationLoanInterest: z.string().default("0"),

    // Section (e) - Contribution to NPS (80CCD(2))
    npsContribution: z.string().default("0"),

    // Section (f) - Interest on Education Loan (80EE)
    educationLoanInterestEE: z.string().default("0"),

    // Section (g) - Interest on Home Loan (80EEA)
    homeLoanInterestEEA: z.string().default("0"),

    // Section (h) - Reinvestment of Withdrawal from RRB (80EEB)
    rrbWithdrawalReinvestment: z.string().default("0"),

    // Section (i) - Employer Contribution to NPS (80F)
    employerNPSContribution: z.string().default("0"),

    // Section (j) - Investment in Equity Shares (80F)
    equitySharesInvestment: z.string().default("0"),

    // Section (k) - Investment in Notified Bonds (80CCF)
    notifiedBondsInvestment: z.string().default("0"),

    // Section (l) - Medical Equipment (80C)
    medicalEquipmentDeduction: z.string().default("0"),

    // Section (m) - Interest on Micro Finance Loan (80CC)
    microFinanceLoanInterest: z.string().default("0"),

    // Section (n) - Other Approved Deductions
    otherApprovedDeductions: z.string().default("0"),

    totalDeductionPartB: z.string().default("0"),
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

    const fields = [
      "medicalInsurancePremium",
      "seniorCitizenHealthInsurance",
      "lifeInsurancePremium",
      "educationLoanInterest",
      "npsContribution",
      "educationLoanInterestEE",
      "homeLoanInterestEEA",
      "rrbWithdrawalReinvestment",
      "employerNPSContribution",
      "equitySharesInvestment",
      "notifiedBondsInvestment",
      "medicalEquipmentDeduction",
      "microFinanceLoanInterest",
      "otherApprovedDeductions",
      "totalDeductionPartB",
    ];

    fields.forEach((field) => {
      validateNumeric(data[field as keyof typeof data] as string, field, [field]);
    });

    console.log("Schedule Part B - Deduction in respect of certain payments", data);
  });

export type SchedulePartBFormData = z.infer<typeof SchedulePartBSchema>;

interface SchedulePartBProps {
  initialData?: Partial<SchedulePartBFormData>;
  onSave: (data: SchedulePartBFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeSchedulePartB({
  initialData,
  onSave,
  onNext,
  onBack,
}: SchedulePartBProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SchedulePartBFormData>({
    resolver: zodResolver(SchedulePartBSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total =
      parseVal(watched.medicalInsurancePremium) +
      parseVal(watched.seniorCitizenHealthInsurance) +
      parseVal(watched.lifeInsurancePremium) +
      parseVal(watched.educationLoanInterest) +
      parseVal(watched.npsContribution) +
      parseVal(watched.educationLoanInterestEE) +
      parseVal(watched.homeLoanInterestEEA) +
      parseVal(watched.rrbWithdrawalReinvestment) +
      parseVal(watched.employerNPSContribution) +
      parseVal(watched.equitySharesInvestment) +
      parseVal(watched.notifiedBondsInvestment) +
      parseVal(watched.medicalEquipmentDeduction) +
      parseVal(watched.microFinanceLoanInterest) +
      parseVal(watched.otherApprovedDeductions);

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<SchedulePartBFormData> = (data) => {
    onSave(data);
  };

  const renderDeductionRow = (
    sectionCode: string,
    description: string,
    fieldName: keyof SchedulePartBFormData
  ) => (
    <tr className="hover:bg-rose-50">
      <td className="border border-rose-300 px-4 py-3 font-semibold">{sectionCode}</td>
      <td className="border border-rose-300 px-4 py-3">{description}</td>
      <td className="border border-rose-300 px-4 py-3">
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className={`w-full px-3 py-2 border rounded text-right ${
                  errors[fieldName] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="0.00"
              />
              {errors[fieldName] && (
                <p className="text-xs text-red-600 mt-0.5">
                  {(errors[fieldName] as any)?.message}
                </p>
              )}
            </>
          )}
        />
      </td>
    </tr>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-rose-900">
          Part B - Deduction in Respect of Certain Payments
        </h1>
        <p className="mt-1 text-sm text-rose-700">
          Details of various deductions under Chapter VI-A
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-8">
        
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
          <h2 className="text-lg font-bold text-rose-900 mb-6">
            Deduction in Respect of Certain Payments
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-rose-300 bg-white text-sm">
              <thead className="bg-rose-200">
                <tr>
                  <th className="border border-rose-300 px-4 py-3 text-left font-semibold" style={{ width: "80px" }}>
                    Section
                  </th>
                  <th className="border border-rose-300 px-4 py-3 text-left font-semibold">
                    Description of Deduction
                  </th>
                  <th className="border border-rose-300 px-4 py-3 text-right font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderDeductionRow("a", "80CC(1) - Medical Insurance Premium (u/s 80C)", "medicalInsurancePremium")}
                {renderDeductionRow("b", "80CCD(1) - Senior Citizen Health Insurance", "seniorCitizenHealthInsurance")}
                {renderDeductionRow("c", "80CCD(1A) - Life Insurance Premium", "lifeInsurancePremium")}
                {renderDeductionRow("d", "80CCD(1B) - Education Loan Interest", "educationLoanInterest")}
                {renderDeductionRow("e", "80CCD(2) - Contribution to NPS", "npsContribution")}
                {renderDeductionRow("f", "80EE - Interest on Education Loan", "educationLoanInterestEE")}
                {renderDeductionRow("g", "80EEA - Interest on Home Loan", "homeLoanInterestEEA")}
                {renderDeductionRow("h", "80EEB - Reinvestment of RRB Withdrawal", "rrbWithdrawalReinvestment")}
                {renderDeductionRow("i", "80F - Employer Contribution to NPS", "employerNPSContribution")}
                {renderDeductionRow("j", "80F - Investment in Equity Shares", "equitySharesInvestment")}
                {renderDeductionRow("k", "80CCF - Notified Bonds Investment", "notifiedBondsInvestment")}
                {renderDeductionRow("l", "80C - Medical Equipment Deduction", "medicalEquipmentDeduction")}
                {renderDeductionRow("m", "80C - Micro Finance Loan Interest", "microFinanceLoanInterest")}
                {renderDeductionRow("n", "Other Approved Deductions", "otherApprovedDeductions")}
              </tbody>
              <tfoot className="bg-rose-100 font-bold">
                <tr>
                  <td colSpan={2} className="border border-rose-300 px-4 py-3">
                    Total Deduction under Part B
                  </td>
                  <td className="border border-rose-300 px-4 py-3 text-right">
                    ₹{calculations.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-rose-900 bg-rose-100 p-6">
          <h3 className="text-lg font-bold text-rose-900 mb-4">
            Total Deduction Summary
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-rose-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Total Deduction Amount:
            </p>
            <p className="text-3xl font-bold text-rose-700">
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
          className="flex-1 rounded-lg bg-rose-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
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
