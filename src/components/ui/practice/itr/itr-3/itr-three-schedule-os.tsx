"use client";

import React, { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validatePAN = (value: string) =>
  /^[A-Z0-9]{10}$/.test(value.toUpperCase());

const ScheduleOSSchema = z
  .object({
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

    dividendGross: z.string().default("0"),
    dividendOtherThanIiIii: z.string().default("0"),
    dividendSection222c: z.string().default("0"),
    dividendSection222f: z.string().default("0"),

    interestGross: z.string().default("0"),
    interestSavingsBank: z.string().default("0"),
    interestDeposits: z.string().default("0"),
    interestIncomeRefund: z.string().default("0"),
    interestPassThrough: z.string().default("0"),
    interestAccrualProv10First: z.string().default("0"),
    interestAccrualProv10Second: z.string().default("0"),
    interestAccrualProv12First: z.string().default("0"),
    interestAccrualProv12Second: z.string().default("0"),
    interestOthers: z.string().default("0"),

    rentalIncomeGross: z.string().default("0"),

    incomeSection56Nature: z.string().default(""),
    incomeSection56AggregateValue: z.string().default("0"),
    incomeSection56ImmovableWithout: z.string().default("0"),
    incomeSection56ImmovableInadequate: z.string().default("0"),
    incomeSection56OtherProperty: z.string().default("0"),

    otherIncomeRowsTable: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          nature: z.string().default(""),
          panNumber: z.string().optional(),
          amount: z.string().default("0"),
        })
      )
      .default([
        {
          id: "1",
          sNo: "1",
          nature: "Family Pension",
          panNumber: "",
          amount: "0",
        },
        {
          id: "2",
          sNo: "2",
          nature:
            "Income from retirement benefit account maintained in a notified country u/s 89A",
          panNumber: "",
          amount: "0",
        },
        {
          id: "3",
          sNo: "3",
          nature:
            "Income from retirement benefit account maintained in a country other than notified country u/s 89A",
          panNumber: "",
          amount: "0",
        },
        {
          id: "4",
          sNo: "4",
          nature:
            "Income taxable during the previous year on which relief u/s 89A is claimed in any earlier previous year",
          panNumber: "",
          amount: "0",
        },
        {
          id: "5",
          sNo: "5",
          nature:
            "Any specified sum received by a unit holder from a business trust during the previous year referred to in section 56(2)(xii)",
          panNumber: "",
          amount: "0",
        },
        {
          id: "6",
          sNo: "6",
          nature:
            "Any sum is received, including the amount allocated by way of profit, at any time during a previous year, under a life insurance policy referred to in section 56(2)(x)(iii)",
          panNumber: "",
          amount: "0",
        },
      ]),

    winningsLotteries: z.string().default("0"),
    winningsOnlineGames: z.string().default("0"),

    // Section 2: Additional dividend income breakdowns (rows from form)
    dividendReferredSLNo1aI: z.string().default("0"),
    dividendReferredSLNo1aII: z.string().default("0"),
    dividendSection115A1aI: z.string().default("0"),
    dividendSection115A1aA: z.string().default("0"),
    dividendSection115AC: z.string().default("0"),
    dividendSection115ACA: z.string().default("0"),
    dividendSection115AB: z.string().default("0"),
    dividendSection115ABIII: z.string().default("0"),
    dividendRetirementBenefit89A: z.string().default("0"),
    dividendDTAA: z.string().default("0"),

    income115BBJ: z.string().default("0"),
    income115BBJCashCredits: z.string().default("0"),
    income115BBJUnexplainedInv69: z.string().default("0"),
    income115BBJUndisclosed69J: z.string().default("0"),
    income115BBJUnexplainedExp69J: z.string().default("0"),
    income115BBJBorrowedRepaid69D: z.string().default("0"),

    providentFundRows: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          assessmentYear: z.string().default(""),
          incomeBenefit: z.string().default("0"),
          taxBenefit: z.string().default("0"),
        })
      )
      .default([]),

    income2d_di_dividendNonResidentNotBeingCompany: z.string().default("0"),

    income2d_dii_interestForeignCurrencyDebts: z.string().default("0"),

    income2d_diii_interestInfrastructureDebtFund: z.string().default("0"),

    income2d_div_interestSection194LC: z.string().default("0"),

    income2d_dv_interestSection194LD: z.string().default("0"),

    income2d_dvi_distributedInterestSection194LBA: z.string().default("0"),

    income2d_dvii_incomeMutualFunds: z.string().default("0"),

    income2d_dviii_royaltyFeesTechnicalServices: z.string().default("0"),

    income2d_dix_interestBondsForeignCurrency: z.string().default("0"),

    income2d_dx_dividendCDRsForeignCurrency: z.string().default("0"),

    income2d_dxi_dividendGDRsForeignCurrency: z.string().default("0"),

    income2d_dxii_incomeFFISecurities: z.string().default("0"),

    income2d_dxiii_interestFFIBonds: z.string().default("0"),

    income2d_dxiv_incomeSportsmen: z.string().default("0"),

    // Additional special rate items from top of form (xv-xx)
    income2d_dxv_anonymousDonations115BBC: z.string().default("0"),
    income2d_dxvi_interest10_4C_Section115A: z.string().default("0"),
    income2d_dxvii_royaltyPatent115BBF: z.string().default("0"),
    income2d_dxviii_carbonCredits115BBG: z.string().default("0"),
    income2d_dxix_dividendFII115AD: z.string().default("0"),
    income2d_dxx_investmentIncomeNRI115E: z.string().default("0"),

    specialRatesAmount: z.string().default("0"),
    specialRatesTable: z
      .array(
        z.object({
          id: z.string(),
          itemNo: z.string().default(""),
          rowType1d2In: z.string().default(""),
          country: z.string().default(""),
          rateAsPerITAct: z.string().default("0"),
          sectionOffered: z.string().default(""),
          rateAsPerDTAA: z.string().default("0"),
          applicableRate: z.string().default("0"),
          itAtApplicableRate: z.string().default("0"),
          itOrLimit90_90A: z.string().default("0"),
        })
      )
      .default([]),

    deductionsExpenses: z.string().default("0"),

    deductionsFamilyPension: z.string().default("0"),

    deductionsOtherFamilyPension: z.string().default("0"),

    depreciation: z.string().default("0"),

    interestExpenditureDividend: z.string().default("0"),

    interestExpenditureOther: z.string().default("0"),

    eligibleInterestExpenditure: z.string().default("0"),

    totalDeductions: z.string().default("0"),

    amountsNotDeductible: z.string().default("0"),

    profitsChargeableTax: z.string().default("0"),

    incomeReliefTaxation: z.string().default("0"),

    netIncomeOtherSources: z.string().default("0"),

    incomeOtherSourcesExcludingRaceHorses: z.string().default("0"),

    raceHorsesReceipts: z.string().default("0"),
    raceHorsesDeductions57: z.string().default("0"),
    raceHorsesAmountsNotDeductible: z.string().default("0"),
    raceHorsesProfitsChargeable: z.string().default("0"),
    raceHorsesBalance: z.string().default("0"),

    totalIncomeUnderHead: z.string().default("0"),

    accrualReceiptTable: z
      .array(
        z.object({
          id: z.string(),
          sNo: z.string().default(""),
          otherSourceIncome: z.string().default(""),
          priorYear: z.string().default("0"),
          receiptYear169To15: z.string().default("0"),
          receiptYear1516To1516: z.string().default("0"),
          receiptYear1516To15: z.string().default("0"),
          receiptYear163To313: z.string().default("0"),
        })
      )
      .default([]),
  })
  .superRefine((data, ctx) => {
    const numericFields = [
      "dividendGross",
      "dividendOtherThanIiIii",
      "dividendSection222c",
      "dividendSection222f",
      "interestGross",
      "interestSavingsBank",
      "interestDeposits",
      "interestIncomeRefund",
      "interestPassThrough",
      "interestAccrualProv10First",
      "interestAccrualProv10Second",
      "interestAccrualProv12First",
      "interestAccrualProv12Second",
      "interestOthers",
      "rentalIncomeGross",
      "incomeSection56AggregateValue",
      "incomeSection56ImmovableWithout",
      "incomeSection56ImmovableInadequate",
      "incomeSection56OtherProperty",
      "winningsLotteries",
      "winningsOnlineGames",
      "dividendReferredSLNo1aI",
      "dividendReferredSLNo1aII",
      "dividendSection115A1aI",
      "dividendSection115A1aA",
      "dividendSection115AC",
      "dividendSection115ACA",
      "dividendSection115AB",
      "dividendSection115ABIII",
      "dividendRetirementBenefit89A",
      "dividendDTAA",
      "income115BBJ",
      "income115BBJCashCredits",
      "income115BBJUnexplainedInv69",
      "income115BBJUndisclosed69J",
      "income115BBJUnexplainedExp69J",
      "income115BBJBorrowedRepaid69D",
      "income2d_di_dividendNonResidentNotBeingCompany",
      "income2d_dii_interestForeignCurrencyDebts",
      "income2d_diii_interestInfrastructureDebtFund",
      "income2d_div_interestSection194LC",
      "income2d_dv_interestSection194LD",
      "income2d_dvi_distributedInterestSection194LBA",
      "income2d_dvii_incomeMutualFunds",
      "income2d_dviii_royaltyFeesTechnicalServices",
      "income2d_dix_interestBondsForeignCurrency",
      "income2d_dx_dividendCDRsForeignCurrency",
      "income2d_dxi_dividendGDRsForeignCurrency",
      "income2d_dxii_incomeFFISecurities",
      "income2d_dxiii_interestFFIBonds",
      "income2d_dxiv_incomeSportsmen",
      "income2d_dxv_anonymousDonations115BBC",
      "income2d_dxvi_interest10_4C_Section115A",
      "income2d_dxvii_royaltyPatent115BBF",
      "income2d_dxviii_carbonCredits115BBG",
      "income2d_dxix_dividendFII115AD",
      "income2d_dxx_investmentIncomeNRI115E",
      "specialRatesAmount",
      "deductionsExpenses",
      "deductionsFamilyPension",
      "deductionsOtherFamilyPension",
      "depreciation",
      "interestExpenditureDividend",
      "interestExpenditureOther",
      "eligibleInterestExpenditure",
      "totalDeductions",
      "amountsNotDeductible",
      "profitsChargeableTax",
      "incomeReliefTaxation",
      "netIncomeOtherSources",
      "incomeOtherSourcesExcludingRaceHorses",
      "raceHorsesReceipts",
      "raceHorsesDeductions57",
      "raceHorsesAmountsNotDeductible",
      "raceHorsesProfitsChargeable",
      "raceHorsesBalance",
      "totalIncomeUnderHead",
    ] as const;

    numericFields.forEach((field) => {
      const value = data[field as keyof typeof data] as string | undefined;
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `Must be a valid non-negative number`,
          });
        }
      }
    });

    if (data.otherIncomeRowsTable && Array.isArray(data.otherIncomeRowsTable)) {
      data.otherIncomeRowsTable.forEach((row, idx) => {
        if (row.panNumber && row.panNumber.trim() !== "") {
          if (!validatePAN(row.panNumber)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["otherIncomeRowsTable", idx, "panNumber"],
              message:
                "PAN must be 10 alphanumeric characters (e.g., AAAAA1234A)",
            });
          }
        }

        if (row.amount && row.amount !== "") {
          const val = parseFloat(row.amount);
          if (isNaN(val) || val < 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["otherIncomeRowsTable", idx, "amount"],
              message: "Amount must be a valid non-negative number",
            });
          }
        }
      });
    }

    if (
      data.incomeSection56AggregateValue &&
      parseFloat(data.incomeSection56AggregateValue) > 0 &&
      !data.incomeSection56Nature
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["incomeSection56Nature"],
        message: "Nature of income is required when amount is entered",
      });
    }

    console.log("Schedule OS - Complete Income from Other Sources Data", data);
  });

export type ScheduleOSFormData = z.infer<typeof ScheduleOSSchema>;

interface NumberInputProps {
  label: string;
  fieldName: keyof ScheduleOSFormData;
  control: any;
  errors: any;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  fieldName,
  control,
  errors,
  placeholder = "0.00",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <>
          <input
            {...field}
            type="text"
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              errors[fieldName] ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={placeholder}
          />
          {errors[fieldName] && (
            <p className="mt-1 text-xs text-red-600">
              {errors[fieldName].message}
            </p>
          )}
        </>
      )}
    />
  </div>
);

interface ScheduleOSProps {
  initialData?: Partial<ScheduleOSFormData>;
  onSave: (data: ScheduleOSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleOS({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleOSProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleOSFormData>({
    resolver: zodResolver(ScheduleOSSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watchedValues = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const section1a = parseVal(watchedValues.dividendGross);
    const section1b =
      parseVal(watchedValues.interestGross) +
      parseVal(watchedValues.interestSavingsBank) +
      parseVal(watchedValues.interestDeposits) +
      parseVal(watchedValues.interestIncomeRefund) +
      parseVal(watchedValues.interestPassThrough) +
      parseVal(watchedValues.interestAccrualProv10First) +
      parseVal(watchedValues.interestAccrualProv10Second) +
      parseVal(watchedValues.interestAccrualProv12First) +
      parseVal(watchedValues.interestAccrualProv12Second) +
      parseVal(watchedValues.interestOthers);
    const section1c = parseVal(watchedValues.rentalIncomeGross);
    const section1d =
      parseVal(watchedValues.incomeSection56AggregateValue) +
      parseVal(watchedValues.incomeSection56ImmovableWithout) +
      parseVal(watchedValues.incomeSection56ImmovableInadequate) +
      parseVal(watchedValues.incomeSection56OtherProperty);
    const section1e = (
      (watchedValues.otherIncomeRowsTable as any[]) || []
    ).reduce((sum, row) => sum + parseVal(row.amount), 0);
    const section1Total =
      section1a + section1b + section1c + section1d + section1e;

    const section2a =
      parseVal(watchedValues.winningsLotteries) +
      parseVal(watchedValues.winningsOnlineGames) +
      parseVal(watchedValues.dividendReferredSLNo1aI) +
      parseVal(watchedValues.dividendReferredSLNo1aII) +
      parseVal(watchedValues.dividendSection115A1aI) +
      parseVal(watchedValues.dividendSection115A1aA) +
      parseVal(watchedValues.dividendSection115AC) +
      parseVal(watchedValues.dividendSection115ACA) +
      parseVal(watchedValues.dividendSection115AB) +
      parseVal(watchedValues.dividendSection115ABIII) +
      parseVal(watchedValues.dividendRetirementBenefit89A) +
      parseVal(watchedValues.dividendDTAA);
    const section2b =
      parseVal(watchedValues.income115BBJ) +
      parseVal(watchedValues.income115BBJCashCredits) +
      parseVal(watchedValues.income115BBJUnexplainedInv69) +
      parseVal(watchedValues.income115BBJUndisclosed69J) +
      parseVal(watchedValues.income115BBJUnexplainedExp69J) +
      parseVal(watchedValues.income115BBJBorrowedRepaid69D);

    const section2d =
      parseVal(watchedValues.income2d_di_dividendNonResidentNotBeingCompany) +
      parseVal(watchedValues.income2d_dii_interestForeignCurrencyDebts) +
      parseVal(watchedValues.income2d_diii_interestInfrastructureDebtFund) +
      parseVal(watchedValues.income2d_div_interestSection194LC) +
      parseVal(watchedValues.income2d_dv_interestSection194LD) +
      parseVal(watchedValues.income2d_dvi_distributedInterestSection194LBA) +
      parseVal(watchedValues.income2d_dvii_incomeMutualFunds) +
      parseVal(watchedValues.income2d_dviii_royaltyFeesTechnicalServices) +
      parseVal(watchedValues.income2d_dix_interestBondsForeignCurrency) +
      parseVal(watchedValues.income2d_dx_dividendCDRsForeignCurrency) +
      parseVal(watchedValues.income2d_dxi_dividendGDRsForeignCurrency) +
      parseVal(watchedValues.income2d_dxii_incomeFFISecurities) +
      parseVal(watchedValues.income2d_dxiii_interestFFIBonds) +
      parseVal(watchedValues.income2d_dxiv_incomeSportsmen) +
      parseVal(watchedValues.income2d_dxv_anonymousDonations115BBC) +
      parseVal(watchedValues.income2d_dxvi_interest10_4C_Section115A) +
      parseVal(watchedValues.income2d_dxvii_royaltyPatent115BBF) +
      parseVal(watchedValues.income2d_dxviii_carbonCredits115BBG) +
      parseVal(watchedValues.income2d_dxix_dividendFII115AD) +
      parseVal(watchedValues.income2d_dxx_investmentIncomeNRI115E);

    const section2Total = section2a + section2b + section2d;

    const totalDeductionsCalc =
      parseVal(watchedValues.deductionsExpenses) +
      parseVal(watchedValues.deductionsFamilyPension) +
      parseVal(watchedValues.deductionsOtherFamilyPension) +
      parseVal(watchedValues.depreciation) +
      parseVal(watchedValues.interestExpenditureDividend) +
      parseVal(watchedValues.interestExpenditureOther) +
      parseVal(watchedValues.eligibleInterestExpenditure);

    const grossIncome = section1Total + section2Total;
    const netIncomeCalc = grossIncome - totalDeductionsCalc;

    return {
      section1a,
      section1b,
      section1c,
      section1d,
      section1e,
      section1Total,
      section2a,
      section2b,
      section2d,
      section2Total,
      totalDeductionsCalc,
      grossIncome,
      netIncomeCalc,
    };
  }, [watchedValues]);

  const onSubmit: SubmitHandler<ScheduleOSFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-emerald-900">
          Schedule OS - Income from Other Sources
        </h1>
        <p className="mt-1 text-sm text-emerald-700">
          Complete income chargeable at normal and special rates (All sections
          1-10)
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

        {/* ===== SECTION 1: INCOME AT NORMAL RATES ===== */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-lg font-bold text-emerald-900 mb-6">
            Section 1: Gross income chargeable to tax at normal rates
          </h2>

          {/* 1a: Dividend Income */}
          <div className="space-y-4 mb-8 pb-6 border-b border-emerald-200">
            <h3 className="text-base font-semibold text-emerald-800">
              1a. Dividend Income (Gross) (i + ii + iii + iv)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Dividend income, Gross (all+iii)"
                fieldName="dividendGross"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Dividend income other than ii and iii"
                fieldName="dividendOtherThanIiIii"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Dividend income u/s 2(22)(c), Gross"
                fieldName="dividendSection222c"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Dividend income u/s 2(22)(f), Gross"
                fieldName="dividendSection222f"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* 1b: Interest Income */}
          <div className="space-y-4 mb-8 pb-6 border-b border-emerald-200">
            <h3 className="text-base font-semibold text-emerald-800">
              1b. Interest, Gross (bi + bii + biii + biv + bv + bvi + bvii +
              bviii + bix)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Interest, Gross"
                fieldName="interestGross"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="From Savings Bank (bii)"
                fieldName="interestSavingsBank"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="From Deposits - Bank/Post Office/Cooperative (biii)"
                fieldName="interestDeposits"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="From Income-tax Refund (biv)"
                fieldName="interestIncomeRefund"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="In the nature of Pass-through income/Loss (bv)"
                fieldName="interestPassThrough"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Interest accrued - Section 10(11) First proviso (bvi)"
                fieldName="interestAccrualProv10First"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Interest accrued - Section 10(11) Second proviso (bvii)"
                fieldName="interestAccrualProv10Second"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Interest accrued - Section 10(12) First proviso (bviii)"
                fieldName="interestAccrualProv12First"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Interest accrued - Section 10(12) Second proviso (bviii)"
                fieldName="interestAccrualProv12Second"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Others (bix)"
                fieldName="interestOthers"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* 1c: Rental Income */}
          <div className="space-y-4 mb-8 pb-6 border-b border-emerald-200">
            <h3 className="text-base font-semibold text-emerald-800">
              1c. Rental income from machinery, plants, buildings, etc., Gross
            </h3>
            <NumberInput
              label="Amount (1c)"
              fieldName="rentalIncomeGross"
              control={control}
              errors={errors}
            />
          </div>

          {/* 1d: Income u/s 56(2)(x) */}
          <div className="space-y-4 mb-8 pb-6 border-b border-emerald-200">
            <h3 className="text-base font-semibold text-emerald-800">
              1d. Income u/s 56(2)(x) chargeable to tax (di + dii + diii + div +
              dv)
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nature of income
              </label>
              <Controller
                name="incomeSection56Nature"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.incomeSection56Nature
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter nature"
                    />
                    {errors.incomeSection56Nature && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.incomeSection56Nature.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Aggregate value of sum of money (di)"
                fieldName="incomeSection56AggregateValue"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Immovable property without consideration (dii)"
                fieldName="incomeSection56ImmovableWithout"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Immovable property for inadequate consideration (diii)"
                fieldName="incomeSection56ImmovableInadequate"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Other property for inadequate consideration (dvi)"
                fieldName="incomeSection56OtherProperty"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* 1e: Any other income - ROWS TABLE */}
          <div className="space-y-4 mb-8">
            <h3 className="text-base font-semibold text-emerald-800">
              1e. Any other income (please specify nature)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-emerald-300 bg-white">
                <thead className="bg-emerald-100">
                  <tr>
                    <th className="border border-emerald-300 px-2 py-2 text-xs font-semibold text-left">
                      S. No.
                    </th>
                    <th className="border border-emerald-300 px-2 py-2 text-xs font-semibold text-left">
                      Nature of Income
                    </th>
                    <th className="border border-emerald-300 px-2 py-2 text-xs font-semibold text-left">
                      PAN (if applicable)
                    </th>
                    <th className="border border-emerald-300 px-2 py-2 text-xs font-semibold text-left">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {((watchedValues.otherIncomeRowsTable as any[]) || []).map(
                    (row, idx) => (
                      <tr key={row.id} className="hover:bg-emerald-50">
                        <td className="border border-emerald-300 px-2 py-2 text-xs">
                          {row.sNo}
                        </td>
                        <td className="border border-emerald-300 px-2 py-2">
                          <div>
                            <span className="text-xs font-medium text-gray-700">
                              {row.nature}
                            </span>
                          </div>
                        </td>
                        <td className="border border-emerald-300 px-2 py-2">
                          <Controller
                            name={`otherIncomeRowsTable.${idx}.panNumber`}
                            control={control}
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className={`w-full px-2 py-1 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                    errors?.otherIncomeRowsTable?.[idx]
                                      ?.panNumber
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="e.g., AAAAA1234A"
                                />
                                {errors?.otherIncomeRowsTable?.[idx]
                                  ?.panNumber && (
                                  <p className="mt-0.5 text-xs text-red-600">
                                    {
                                      errors.otherIncomeRowsTable[idx].panNumber
                                        ?.message
                                    }
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </td>
                        <td className="border border-emerald-300 px-2 py-2">
                          <Controller
                            name={`otherIncomeRowsTable.${idx}.amount`}
                            control={control}
                            render={({ field }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className={`w-full px-2 py-1 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                    errors?.otherIncomeRowsTable?.[idx]?.amount
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
                                  placeholder="0.00"
                                />
                                {errors?.otherIncomeRowsTable?.[idx]
                                  ?.amount && (
                                  <p className="mt-0.5 text-xs text-red-600">
                                    {
                                      errors.otherIncomeRowsTable[idx].amount
                                        ?.message
                                    }
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 1 Summary */}
          <div className="rounded-lg bg-white p-4 border-2 border-emerald-300">
            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">1a Total:</span>
                <span className="block font-bold text-emerald-600">
                  ₹{calculations.section1a.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">1b Total:</span>
                <span className="block font-bold text-emerald-600">
                  ₹{calculations.section1b.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">1c Total:</span>
                <span className="block font-bold text-emerald-600">
                  ₹{calculations.section1c.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="border-t pt-3">
              <span className="font-bold text-gray-900">
                Section 1 Total Income (at normal rates):
              </span>
              <span className="block text-xl font-bold text-emerald-700">
                ₹{calculations.section1Total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ===== SECTION 2: INCOME AT SPECIAL RATES ===== */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-6">
            Section 2: Income chargeable at special rates (2 = 2a + 2b + 2c + 2d
            + 2e + 2f)
          </h2>

          {/* 2a: Winnings */}
          <div className="space-y-4 mb-8 pb-6 border-b border-blue-200">
            <h3 className="text-base font-semibold text-blue-800">
              2a. Winnings from lotteries, crossword puzzles, races, games,
              gambling, betting (2a i + ii)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Income from lotteries/crossword/races/games (u/s 2(24)(ix))"
                fieldName="winningsLotteries"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Income from winnings from online games u/s 115BBJ"
                fieldName="winningsOnlineGames"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* 2a(iii): Additional Dividend Income Breakdowns */}
          <div className="space-y-4 mb-8 pb-6 border-b border-blue-200">
            <h3 className="text-base font-semibold text-blue-800">
              2a(iii). Additional Dividend Income by Type
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(1) Dividend income referred in SL No. 1a(i)"
                fieldName="dividendReferredSLNo1aI"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(2) Dividend income referred in SL No. 1a(ii)"
                fieldName="dividendReferredSLNo1aII"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(3a) Dividend income u/s 115A(1)(a)(i) @ 20% (incl. PTI)"
                fieldName="dividendSection115A1aI"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(3b) Dividend income u/s 115A(1)(a)(A) @ 10% (incl. PTI)"
                fieldName="dividendSection115A1aA"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(4) Dividend income u/s 115AC @ 10% (incl. PTI)"
                fieldName="dividendSection115AC"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(7) Dividend income u/s 115ACA (1)(a) @ 10% (incl. PTI)"
                fieldName="dividendSection115ACA"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(6) Dividend income u/s 115ACB @ 20% (incl. PTI)"
                fieldName="dividendSection115AB"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(8) Dividend income (other than units) u/s 115AB u/s 115AD(i) @ 20% (incl. PTI)"
                fieldName="dividendSection115ABIII"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(9) Income from retirement benefit account u/s 89A (but not claimed for relief)"
                fieldName="dividendRetirementBenefit89A"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(10) Dividend income chargeable at DTAA rates"
                fieldName="dividendDTAA"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* 2b: Income u/s 115BBJ */}
          <div className="space-y-4 mb-8 pb-6 border-b border-blue-200">
            <h3 className="text-base font-semibold text-blue-800">
              2b. Income chargeable u/s 115BBJ (bi + bii + biii + biv + bv +
              bvi)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Undisclosed income (bi)"
                fieldName="income115BBJ"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Cash credits u/s 68 (bii)"
                fieldName="income115BBJCashCredits"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Unexplained investments u/s 69 (biii)"
                fieldName="income115BBJUnexplainedInv69"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Undisclosed investments u/s 69J (biv)"
                fieldName="income115BBJUndisclosed69J"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Unexplained expenditure u/s 69J (bv)"
                fieldName="income115BBJUnexplainedExp69J"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="Amount borrowed or repaid u/s 69D (bvi)"
                fieldName="income115BBJBorrowedRepaid69D"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* 2d: Dividend/Income from non-resident/foreign company - ALL SUB-ITEMS (di-dxx) */}
          <div className="space-y-4 mb-8 pb-6 border-b border-blue-200">
            <h3 className="text-base font-semibold text-blue-800">
              2d. Any other income chargeable at special rates (di + dii + ... +
              dxx)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(di) Dividend income chargeable at special rate - non-resident"
                fieldName="income2d_di_dividendNonResidentNotBeingCompany"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dii) Interest on foreign currency debts from Govt/Indian concern"
                fieldName="income2d_dii_interestForeignCurrencyDebts"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(diii) Interest from Infrastructure Debt Fund u/s 115AC(IA)"
                fieldName="income2d_diii_interestInfrastructureDebtFund"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(div) Interest referred to in section 194LC (i)"
                fieldName="income2d_div_interestSection194LC"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dv) Interest referred to in section 194LD"
                fieldName="income2d_dv_interestSection194LD"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dvi) Distributed interest u/s 194LBA"
                fieldName="income2d_dvi_distributedInterestSection194LBA"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dvii) Income from units of UTI/Mutual Funds"
                fieldName="income2d_dvii_incomeMutualFunds"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dviii) Royalty/fees for technical services from Govt/Indian concern"
                fieldName="income2d_dviii_royaltyFeesTechnicalServices"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dix) Interest on bonds purchased in foreign currency by non-residents"
                fieldName="income2d_dix_interestBondsForeignCurrency"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dx) Dividend on CDRs in foreign currency by non-residents"
                fieldName="income2d_dx_dividendCDRsForeignCurrency"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dxi) Dividend from GDRs in foreign currency by non-residents"
                fieldName="income2d_dxi_dividendGDRsForeignCurrency"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dxii) Income (other than dividend) by FII in respect of securities"
                fieldName="income2d_dxii_incomeFFISecurities"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dxiii) Interest received by FII on bonds/Government securities"
                fieldName="income2d_dxiii_interestFFIBonds"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dxiv) Income received by non-resident sportsmen/sports associations"
                fieldName="income2d_dxiv_incomeSportsmen"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dxv) Anonymous Donations u/s 115BBC"
                fieldName="income2d_dxv_anonymousDonations115BBC"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dxvi) Interest referred to in Proviso to section 10(4)(C) chargeable u/s 115A(1)(a)(iiia)@25%"
                fieldName="income2d_dxvi_interest10_4C_Section115A"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dxvii) Income by way of royalty from patent developed and registered in India u/s 115BBF"
                fieldName="income2d_dxvii_royaltyPatent115BBF"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dxviii) Income by way of transfer of carbon credits u/s 115BBG"
                fieldName="income2d_dxviii_carbonCredits115BBG"
                control={control}
                errors={errors}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="(dxix) Income being dividend received by FII u/s 115AD(1)(i)"
                fieldName="income2d_dxix_dividendFII115AD"
                control={control}
                errors={errors}
              />
              <NumberInput
                label="(dxx) Investment Income of Non-Resident Indian u/s 115E"
                fieldName="income2d_dxx_investmentIncomeNRI115E"
                control={control}
                errors={errors}
              />
            </div>
          </div>

          {/* Section 2 Summary */}
          <div className="rounded-lg bg-white p-4 border-2 border-blue-300">
            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">2a Total:</span>
                <span className="block font-bold text-blue-600">
                  ₹{calculations.section2a.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">2b Total:</span>
                <span className="block font-bold text-blue-600">
                  ₹{calculations.section2b.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">2d Total:</span>
                <span className="block font-bold text-blue-600">
                  ₹{calculations.section2d.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="border-t pt-3">
              <span className="font-bold text-gray-900">
                Section 2 Total Income (at special rates):
              </span>
              <span className="block text-xl font-bold text-blue-700">
                ₹{calculations.section2Total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ===== SECTION 3: DEDUCTIONS ===== */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-bold text-orange-900 mb-6">
            Section 3: Deductions (3 = 3a + 3b + 3c + 3d + 3e + 3f)
          </h2>
          <div className="space-y-4">
            <NumberInput
              label="Expenses / Deductions other than entered (3a)"
              fieldName="deductionsExpenses"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Deduction u/s 57(i)(a) family pension (3b)"
              fieldName="deductionsFamilyPension"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Deduction u/s 57(i)(a) other family pension (3c)"
              fieldName="deductionsOtherFamilyPension"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Depreciation (3d)"
              fieldName="depreciation"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Interest expenditure on dividend u/s 57(1)(ii) (3e)"
              fieldName="interestExpenditureDividend"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Interest expenditure on other u/s 57(1)(ii) (3f)"
              fieldName="interestExpenditureOther"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Eligible Interest Expenditure u/s 57(1) - computed (3g)"
              fieldName="eligibleInterestExpenditure"
              control={control}
              errors={errors}
            />
            <div className="mt-6 rounded-lg bg-white p-4 border-2 border-orange-300">
              <span className="font-bold text-gray-900">Total Deductions:</span>
              <span className="block text-xl font-bold text-orange-700">
                ₹{calculations.totalDeductionsCalc.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* ===== SECTIONS 4-10: SUMMARY ===== */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-6">
            Sections 4-10: Summary & Final Calculations
          </h2>
          <div className="space-y-4">
            <NumberInput
              label="Section 4: Amounts not deductible u/s 58"
              fieldName="amountsNotDeductible"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Section 5: Profits chargeable to tax u/s 59"
              fieldName="profitsChargeableTax"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Section 5a: Income claimed for relief u/s 89A"
              fieldName="incomeReliefTaxation"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Section 6: Net Income from other sources"
              fieldName="netIncomeOtherSources"
              control={control}
              errors={errors}
            />
            <NumberInput
              label="Section 7: Income excluding race horses"
              fieldName="incomeOtherSourcesExcludingRaceHorses"
              control={control}
              errors={errors}
            />

            <div className="border-t-2 border-purple-300 pt-6 mt-6">
              <h4 className="text-base font-semibold text-purple-800 mb-4">
                Section 8: Race Horses Income
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  label="Receipts from race horses (8a)"
                  fieldName="raceHorsesReceipts"
                  control={control}
                  errors={errors}
                />
                <NumberInput
                  label="Deductions u/s 57 (8b)"
                  fieldName="raceHorsesDeductions57"
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  label="Amounts not deductible u/s 58 (8c)"
                  fieldName="raceHorsesAmountsNotDeductible"
                  control={control}
                  errors={errors}
                />
                <NumberInput
                  label="Profits chargeable u/s 59 (8d)"
                  fieldName="raceHorsesProfitsChargeable"
                  control={control}
                  errors={errors}
                />
              </div>
              <NumberInput
                label="Balance (8e)"
                fieldName="raceHorsesBalance"
                control={control}
                errors={errors}
              />
            </div>

            <div className="border-t-2 border-purple-300 pt-6 mt-6">
              <NumberInput
                label="Section 9: Total Income under head Other Sources (7+8)"
                fieldName="totalIncomeUnderHead"
                control={control}
                errors={errors}
              />
            </div>

            <div className="border-t-2 border-purple-300 pt-6 mt-6 rounded-lg bg-white p-4">
              <div className="mb-3">
                <span className="font-semibold text-gray-700">
                  Gross Income (Section 1 + Section 2):
                </span>
                <span className="block text-lg font-bold text-purple-600">
                  ₹{calculations.grossIncome.toFixed(2)}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">
                  Less: Total Deductions (Section 3):
                </span>
                <span className="block text-lg font-bold text-orange-600">
                  ₹{calculations.totalDeductionsCalc.toFixed(2)}
                </span>
              </div>
              <div className="border-t-2 border-purple-300 pt-3">
                <span className="font-bold text-gray-900">
                  Net Income from Other Sources:
                </span>
                <span className="block text-2xl font-bold text-purple-700">
                  ₹{calculations.netIncomeCalc.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STICKY FOOTER ===== */}
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
          className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
