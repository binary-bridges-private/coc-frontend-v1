import React from "react";
import { UseFormReturn } from "react-hook-form";

interface TaxDeductionProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: any;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  fieldCode?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  maxLength,
  required,
  disabled,
  fieldCode,
}) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
    )}
    <div className="flex items-center gap-2">
      {fieldCode && (
        <span className="flex h-10 w-12 flex-shrink-0 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">
          {fieldCode}
        </span>
      )}
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        } disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const TaxDeduction: React.FC<TaxDeductionProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const toNumber = (val: any) => {
    if (typeof val === "number") return val;
    const parsed = parseFloat(val || "0");
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  // Calculate Gross Total Income from Gross Income sections (B1 + B2 + B3)
  const salaryValues = watch([
    "salarySection17_1",
    "perquisitesSection17_2",
    "profitSection17_3",
    "retirementBenefitNotified",
    "retirementBenefitOther",
    "exemptAllowances",
    "reliefFromTaxation89A",
    "standardDeduction16",
    "entertainmentAllowance",
    "professionalTax",
  ]);

  const calculateNetSalary = () => {
    const salary = toNumber(salaryValues[0]);
    const perquisites = toNumber(salaryValues[1]);
    const profits = toNumber(salaryValues[2]);
    const retirementNotified = toNumber(salaryValues[3]);
    const retirementOther = toNumber(salaryValues[4]);
    const exemptAllowances = toNumber(salaryValues[5]);
    const relief89A = toNumber(salaryValues[6]);
    const stdDeduction = toNumber(salaryValues[7]);
    const entertainment = toNumber(salaryValues[8]);
    const profTax = toNumber(salaryValues[9]);

    const grossSalary =
      salary + perquisites + profits + retirementNotified + retirementOther;
    const netSalaryBeforeDeductions =
      grossSalary - exemptAllowances - relief89A;
    const totalDeductions = stdDeduction + entertainment + profTax;
    const netSalary = netSalaryBeforeDeductions - totalDeductions;

    return netSalary;
  };

  const housePropertyValues = watch([
    "annualValue",
    "standardDeduction30Percent",
    "interestBorrowedCapital",
    "arrearsUnrealisedRent",
  ]);

  const calculateHousePropertyIncome = () => {
    const annualValue = toNumber(housePropertyValues[0]);
    const deduction30 = toNumber(housePropertyValues[1]);
    const interest = toNumber(housePropertyValues[2]);
    const arrears = toNumber(housePropertyValues[3]);

    return annualValue - deduction30 - interest + arrears;
  };

  const otherSourcesValues = watch([
    "otherSource1Amount",
    "otherSource2Amount",
    "otherSource3Amount",
    "otherSource4Amount",
    "retirementBenefitNonNotifiedCountry",
    "retirementBenefitUSA",
    "retirementBenefitUK",
    "retirementBenefitCanada",
    "dividendQ1",
    "dividendQ2",
    "dividendQ3",
    "dividendQ4",
    "dividendQ5",
    "reliefFromTaxation89AOtherSources",
    "deduction57iia",
  ]);

  const calculateOtherSourcesIncome = () => {
    const source1 = toNumber(otherSourcesValues[0]);
    const source2 = toNumber(otherSourcesValues[1]);
    const source3 = toNumber(otherSourcesValues[2]);
    const source4 = toNumber(otherSourcesValues[3]);
    const retirementNonNotified = toNumber(otherSourcesValues[4]);
    const retirementUSA = toNumber(otherSourcesValues[5]);
    const retirementUK = toNumber(otherSourcesValues[6]);
    const retirementCanada = toNumber(otherSourcesValues[7]);
    const div1 = toNumber(otherSourcesValues[8]);
    const div2 = toNumber(otherSourcesValues[9]);
    const div3 = toNumber(otherSourcesValues[10]);
    const div4 = toNumber(otherSourcesValues[11]);
    const div5 = toNumber(otherSourcesValues[12]);
    const relief89A = toNumber(otherSourcesValues[13]);
    const deduction57 = toNumber(otherSourcesValues[14]);

    const totalRetirement =
      retirementNonNotified + retirementUSA + retirementUK + retirementCanada;
    const totalDividends = div1 + div2 + div3 + div4 + div5;
    const totalOtherSources = source1 + source2 + source3 + source4;

    return (
      totalOtherSources +
      totalRetirement +
      totalDividends -
      relief89A -
      deduction57
    );
  };

  const netSalary = calculateNetSalary();
  const housePropertyIncome = calculateHousePropertyIncome();
  const otherSourcesIncome = calculateOtherSourcesIncome();

  // B4 - Gross Total Income (B1 + B2 + B3)
  const grossTotalIncome = netSalary + housePropertyIncome + otherSourcesIncome;

  // Watch all deduction fields for calculations
  const deductions = {
    section80C: toNumber(watch("section80C")),
    section80CCC: toNumber(watch("section80CCC")),
    section80CCD1: toNumber(watch("section80CCD1")),
    section80CCD1B: toNumber(watch("section80CCD1B")),
    section80CCD2: toNumber(watch("section80CCD2")),
    section80D: toNumber(watch("section80D")),
    section80DD: toNumber(watch("section80DD")),
    section80DDB: toNumber(watch("section80DDB")),
    section80E: toNumber(watch("section80E")),
    section80EE: toNumber(watch("section80EE")),
    section80EEA: toNumber(watch("section80EEA")),
    section80EEB: toNumber(watch("section80EEB")),
    section80G: toNumber(watch("section80G")),
    section80GG: toNumber(watch("section80GG")),
    section80GGA: toNumber(watch("section80GGA")),
    section80GGC: toNumber(watch("section80GGC")),
    section80TTA: toNumber(watch("section80TTA")),
    section80TTB: toNumber(watch("section80TTB")),
    section80U: toNumber(watch("section80U")),
    section80CCH: toNumber(watch("section80CCH")),
    anyOther: toNumber(watch("anyOtherDeductions")),
  };

  const totalDeductions = Object.values(deductions).reduce(
    (sum, val) => sum + val,
    0
  );
  const totalIncome = grossTotalIncome - totalDeductions;

  // Tax calculation based on new tax regime (default for ITR-1)
  const calculateTaxOnIncome = (income: number): number => {
    if (income <= 0) return 0;
    
    let tax = 0;
    // New Tax Regime slabs for AY 2025-26
    if (income > 300000 && income <= 700000) {
      tax += (income - 300000) * 0.05; // 5% on 3L-7L
    } else if (income > 700000 && income <= 1000000) {
      tax += 400000 * 0.05; // 5% on 3L-7L
      tax += (income - 700000) * 0.10; // 10% on 7L-10L
    } else if (income > 1000000 && income <= 1200000) {
      tax += 400000 * 0.05;
      tax += 300000 * 0.10;
      tax += (income - 1000000) * 0.15; // 15% on 10L-12L
    } else if (income > 1200000 && income <= 1500000) {
      tax += 400000 * 0.05;
      tax += 300000 * 0.10;
      tax += 200000 * 0.15;
      tax += (income - 1200000) * 0.20; // 20% on 12L-15L
    } else if (income > 1500000) {
      tax += 400000 * 0.05;
      tax += 300000 * 0.10;
      tax += 200000 * 0.15;
      tax += 300000 * 0.20;
      tax += (income - 1500000) * 0.30; // 30% above 15L
    }
    
    return Math.round(tax);
  };

  // Calculate tax components
  const taxPayableOnTotalIncome = calculateTaxOnIncome(totalIncome);
  
  // Rebate u/s 87A - up to ₹25,000 if income <= ₹7,00,000
  const rebate87A = totalIncome <= 700000 ? Math.min(taxPayableOnTotalIncome, 25000) : 0;
  
  const taxPayableAfterRebate = taxPayableOnTotalIncome - rebate87A;
  
  // Health and Education Cess @4%
  const healthEducationCess = Math.round(taxPayableAfterRebate * 0.04);
  
  const totalTaxAndCess = taxPayableAfterRebate + healthEducationCess;
  
  // Relief u/s 89 (if any, from form data)
  const relief89 = toNumber(watch('relief89'));
  
  const balanceTaxAfterRelief = totalTaxAndCess - relief89;

  // Interest u/s 234 and Fee u/s 234F (user inputs)
  const interest234A = toNumber(watch('interest234A'));
  const interest234B = toNumber(watch('interest234B'));
  const interest234C = toNumber(watch('interest234C'));
  const fee234F = toNumber(watch('fee234F'));
  
  const totalInterestAndFee = interest234A + interest234B + interest234C + fee234F;
  const totalTaxFeeAndInterest = balanceTaxAfterRelief + totalInterestAndFee;

  // Exempt Income
  const exemptIncome1 = toNumber(watch('exemptIncome1'));
  const exemptIncome2 = toNumber(watch('exemptIncome2'));
  const totalExemptIncome = exemptIncome1 + exemptIncome2;

  const ltcgSaleConsideration = toNumber(watch('ltcgSaleConsideration112A'));
  const ltcgCostOfAcquisition = toNumber(watch('ltcgCostOfAcquisition112A'));
  const ltcgCapitalGains112A = ltcgSaleConsideration - ltcgCostOfAcquisition;

  return (
    <section className="space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 "
      >
        <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-700">
            <strong>💡 Helpful Tip:</strong> Ensure you have supporting
            documents for all deduction claims as per Income Tax Act provisions
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80C & 80CCC - Investment Deductions
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="80C - Life insurance, provident fund, etc."
              name="section80C"
              type="number"
              placeholder="Enter amount (Max: ₹1,50,000)"
              register={register}
              error={errors.section80C?.message}
              fieldCode="5a"
            />
            <InputField
              label="80CCC - Payment in respect Pension Fund"
              name="section80CCC"
              type="number"
              placeholder="Enter amount (Max: ₹1,50,000)"
              register={register}
              error={errors.section80CCC?.message}
              fieldCode="5b"
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80CCD - Pension Scheme Contributions
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <div className="font-medium text-gray-800">
                  80CCD(1) - Contribution to pension scheme of Central
                  Government
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Part of overall 80C limit
                </p>
              </div>
              <InputField
                label=""
                name="section80CCD1"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80CCD1?.message}
                fieldCode="5c"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <div className="font-medium text-gray-800">
                  80CCD(1B) - Additional contribution to pension scheme
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Max limit: ₹50,000 (Over and above 80C)
                </p>
              </div>
              <InputField
                label=""
                name="section80CCD1B"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80CCD1B?.message}
                fieldCode="5d"
              />
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 ">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              PRAN of the taxpayer
            </label>
            <input
              type="text"
              {...register("pranTaxpayer")}
              placeholder="Enter 12-digit PRAN number"
              className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div className="mt-4 space-y-2">
            <div className="rounded-md bg-white p-3 text-sm ">
              <div className="font-medium text-gray-800">
                80CCD(2) - Employer's contribution to pension scheme
              </div>
              <p className="mt-1 text-xs text-gray-500">
                No upper limit (14% of salary)
              </p>
            </div>
            <InputField
              label=""
              name="section80CCD2"
              type="number"
              placeholder="Enter amount"
              register={register}
              error={errors.section80CCD2?.message}
              fieldCode="5e"
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Health & Medical Deductions
          </h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80D - Deduction in respect of Health Insurance premia
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Please fill 80D Schedule. Max limit: ₹1,00,000
                </p>
              </div>
              <InputField
                label=""
                name="section80D"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80D?.message}
                fieldCode="5f"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80DD - Maintenance including medical treatment of a dependent
                  who is a person with disability
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Please fill 80DD Schedule. Max limit: ₹1,25,000
                </p>
              </div>
              <InputField
                label=""
                name="section80DD"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80DD?.message}
                fieldCode="5g"
              />
            </div>
          </div>
        </div>

        {/*Section 80DDB - Medical treatment */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80DDB - Specified Disease Treatment
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4  md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category of Disease
                </label>
                <select
                  {...register("specifiedDiseaseName")}
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-amber-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                >
                  <option value="">(Select disease category)</option>
                  <option>Neurological Diseases</option>
                  <option>Cancer</option>
                  <option>AIDS</option>
                  <option>Chronic Renal Failure</option>
                  <option>Hemophilia</option>
                  <option>Thalassaemia</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Specific Disease Name
                </label>
                <select className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-amber-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200">
                  <option>(Select specific disease)</option>
                </select>
              </div>
            </div>
            <div className="rounded-md bg-white p-3 text-sm ">
              <div className="font-medium text-gray-800">Deduction Amount</div>
              <p className="mt-1 text-xs text-gray-500">Max limit: ₹1,00,000</p>
            </div>
            <InputField
              label=""
              name="section80DDB"
              type="number"
              placeholder="Enter amount"
              register={register}
              error={errors.section80DDB?.message}
              fieldCode="5h"
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80E, 80EE, 80EEA, 80EEB - Loan Interest Deductions
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80E - Interest on loan taken for higher education
                </a>
                <p className="mt-1 text-xs text-gray-500">No upper limit</p>
              </div>
              <InputField
                label=""
                name="section80E"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80E?.message}
                fieldCode="5i"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80EE - Interest on loan taken for residential house property
                </a>
                <p className="mt-1 text-xs text-gray-500">Max limit: ₹50,000</p>
              </div>
              <InputField
                label=""
                name="section80EE"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80EE?.message}
                fieldCode="5j"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80EEA - Interest on loan taken for certain house property
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Max limit: ₹1,50,000
                </p>
              </div>
              <InputField
                label=""
                name="section80EEA"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80EEA?.message}
                fieldCode="5k"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80EEB - Deduction in respect of purchase of electric vehicle
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Max limit: ₹1,50,000
                </p>
              </div>
              <InputField
                label=""
                name="section80EEB"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80EEB?.message}
                fieldCode="5l"
              />
            </div>
          </div>
        </div>

        {/*Section 80G & 80GG - Donations & Rent */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80G & 80GG - Donations & Rent
          </h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80G - Donations to certain funds, charitable institutions,
                  etc.
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Please fill 80G Schedule. This field is auto-populated from
                  schedule 80G.
                </p>
              </div>
              <InputField
                label=""
                name="section80G"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80G?.message}
                fieldCode="5m"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <div className="font-medium text-gray-800">
                  80GG - Rent paid (Please submit form 10BA to claim deduction)
                </div>
                <p className="mt-1 text-xs text-gray-500">Max limit: ₹60,000</p>
              </div>
              <div className="rounded-lg border-2 border-rose-200 bg-white p-4 ">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Acknowledgement number of Form 10BA
                </label>
                <input
                  type="text"
                  {...register("form10BAAckNumber")}
                  placeholder="Enter acknowledgement number"
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-rose-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
              </div>
              <InputField
                label=""
                name="section80GG"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80GG?.message}
                fieldCode="5n"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80GGA & 80GGC - Research & Political Donations
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80GGA - Donations for scientific research or rural development
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Please fill 80GGA Schedule. Auto-populated from schedule.
                </p>
              </div>
              <InputField
                label=""
                name="section80GGA"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80GGA?.message}
                fieldCode="5o"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80GGC - Contribution to Political party
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Please fill 80GGC Schedule. Auto-populated from schedule.
                </p>
              </div>
              <InputField
                label=""
                name="section80GGC"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80GGC?.message}
                fieldCode="5p"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80TTA & 80TTB - Interest Income Deductions
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <div className="font-medium text-gray-800">
                  80TTA - Interest on saving bank Accounts (Non-Senior Citizens)
                </div>
                <p className="mt-1 text-xs text-gray-500">Max limit: ₹10,000</p>
              </div>
              <InputField
                label=""
                name="section80TTA"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80TTA?.message}
                fieldCode="5q"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <div className="font-medium text-gray-800">
                  80TTB - Interest on deposits (Resident Senior Citizens)
                </div>
                <p className="mt-1 text-xs text-gray-500">Max limit: ₹50,000</p>
              </div>
              <InputField
                label=""
                name="section80TTB"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80TTB?.message}
                fieldCode="5r"
              />
            </div>
          </div>
        </div>

        {/*Section 80U & 80CCH */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Section 80U & 80CCH - Other Deductions
          </h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  80U - In case of a person with disability
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Please fill 80U Schedule. Max limit: ₹1,25,000
                </p>
              </div>
              <InputField
                label=""
                name="section80U"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80U?.message}
                fieldCode="5s"
              />
            </div>

            <div className="space-y-2">
              <div className="rounded-md bg-white p-3 text-sm ">
                <div className="font-medium text-gray-800">
                  80CCH - Contribution to Agnipath Scheme
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  As per applicable provisions
                </p>
              </div>
              <InputField
                label=""
                name="section80CCH"
                type="number"
                placeholder="Enter amount"
                register={register}
                error={errors.section80CCH?.message}
                fieldCode="5t"
              />
            </div>
          </div>
        </div>

        {/*Any Other Deductions */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">
            Any Other Deductions
          </h4>
          <div className="space-y-2">
            <div className="rounded-md bg-white p-3 text-sm ">
              <div className="font-medium text-gray-800">
                Other deductions not covered above
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Specify any additional deductions
              </p>
            </div>
            <InputField
              label=""
              name="anyOtherDeductions"
              type="number"
              placeholder="Enter amount"
              register={register}
              error={errors.anyOtherDeductions?.message}
              fieldCode="5u"
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Summary - Total Deductions & Income
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-blue-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-sm font-semibold text-blue-700">
                  B4
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Gross Total Income (from Gross Income section)
                </span>
              </div>
              <div className="text-lg font-semibold text-blue-700">
                ₹{grossTotalIncome.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  6
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Total Deductions (Total of 5a to 5t)
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                ₹{totalDeductions.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-green-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-sm font-semibold text-green-700">
                  7
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Total Income (B4 - Total Deductions)
                </span>
              </div>
              <div className="text-lg font-bold text-green-700">
                ₹{totalIncome.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Exempt Income: For reporting purpose and Income on which no tax is
            payable
          </h3>

          <div className="space-y-3">
            <div className="rounded-lg bg-gray-50 p-3 text-sm border border-gray-200">
              <strong className="text-gray-900">Note:</strong>{" "}
              <span className="text-gray-700">
                Drop down to be provided in e-filing utility mentioning nature
                of exempt income, relevant clause and section
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 w-20">
                      Sl.No.
                    </th>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">
                      Nature of Income
                    </th>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">
                      Description (If 'Any Other' selected)
                    </th>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 w-48">
                      Amount (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-center text-sm font-medium text-gray-700">
                      1
                    </td>
                    <td className="border border-gray-300 p-3">
                      <select 
                        {...register('exemptIncomeNature1')}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">(Select nature of income)</option>
                        <option value="agricultural">Agricultural Income</option>
                        <option value="dividend">Dividend Income</option>
                        <option value="interest">Interest Income</option>
                        <option value="other">Any Other</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        {...register('exemptIncomeDescription1')}
                        placeholder="Description (if any)"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="number"
                        {...register('exemptIncome1')}
                        placeholder="0"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 text-center text-sm font-medium text-gray-700">
                      2
                    </td>
                    <td className="border border-gray-300 p-3">
                      <select 
                        {...register('exemptIncomeNature2')}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="">(Select nature of income)</option>
                        <option value="agricultural">Agricultural Income</option>
                        <option value="dividend">Dividend Income</option>
                        <option value="interest">Interest Income</option>
                        <option value="other">Any Other</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="text"
                        {...register('exemptIncomeDescription2')}
                        placeholder="Description (if any)"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">
                      <input
                        type="number"
                        {...register('exemptIncome2')}
                        placeholder="0"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="rounded-lg border-2 border-green-300 bg-green-50 px-6 py-3 shadow-md">
                <span className="text-sm font-bold text-gray-900">
                  Total Exempt Income:{" "}
                </span>
                <span className="text-xl font-bold text-green-700">₹{totalExemptIncome.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            7a. Long Term Capital Gains u/s 112A (Not chargeable to Income-tax)
          </h3>
          
          <div className="mb-3 rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm">
            <p className="text-blue-900">
              <strong>ℹ️ Note:</strong> This section is for LTCG on equity shares/equity-oriented mutual funds. 
              LTCG up to ₹1,00,000 is exempt from tax. Gains above ₹1L are taxed at 10% (without indexation).
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  i
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Total sale consideration <span className="text-xs text-gray-500">(Full value of consideration)</span>
                </span>
              </div>
              <input
                type="number"
                {...register('ltcgSaleConsideration112A')}
                placeholder="0"
                className="w-48 rounded border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  ii
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Total cost of acquisition <span className="text-xs text-gray-500">(Purchase price + expenses)</span>
                </span>
              </div>
              <input
                type="number"
                {...register('ltcgCostOfAcquisition112A')}
                placeholder="0"
                className="w-48 rounded border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-purple-300 bg-purple-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-200 text-sm font-semibold text-purple-700">
                  iii
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  Long term capital gains as per sec 112A (i - ii)
                </span>
              </div>
              <div className="text-lg font-bold text-purple-700">
                ₹{ltcgCapitalGains112A.toLocaleString('en-IN')}
              </div>
            </div>
            
            {ltcgCapitalGains112A > 0 && (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm">
                <p className="text-yellow-900">
                  <strong>💡 Tax Implication:</strong>
                  {ltcgCapitalGains112A <= 100000 ? (
                    <> This gain of ₹{ltcgCapitalGains112A.toLocaleString('en-IN')} is fully exempt from tax (up to ₹1,00,000).</>
                  ) : (
                    <> LTCG up to ₹1,00,000 is exempt. The amount above ₹1,00,000 (i.e., ₹{(ltcgCapitalGains112A - 100000).toLocaleString('en-IN')}) will be taxed at 10%.</>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Tax Calculation Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  8
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Tax Payable on Total Income
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹{taxPayableOnTotalIncome.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  9
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Rebate u/s 87A
                </span>
              </div>
              <div className="text-sm font-medium text-green-600">-₹{rebate87A.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  10
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Tax payable after Rebate
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹{taxPayableAfterRebate.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  11
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Health and Education Cess @4% on (10)
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹{healthEducationCess.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  12
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Total Tax and Cess
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-900">₹{totalTaxAndCess.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                  13
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Relief u/s 89{" "}
                  <span className="text-xs text-gray-600">
                    (Submit Form 10E to claim)
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  {...register('relief89')}
                  placeholder="0"
                  className="w-32 rounded border border-gray-300 px-2 py-1 text-sm text-right"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-orange-300 bg-orange-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-200 text-sm font-semibold text-orange-700">
                  14
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  Balance Tax after Relief (12-13)
                </span>
              </div>
              <div className="text-lg font-bold text-orange-700">₹{balanceTaxAfterRelief.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            15. Interest u/s 234 & Fee
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">
                  15a
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Interest u/s 234 A <span className="text-xs text-gray-500">(Default/late filing)</span>
                </span>
              </div>
              <input
                type="number"
                {...register('interest234A')}
                placeholder="0"
                className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">
                  15b
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Interest u/s 234 B <span className="text-xs text-gray-500">(Delay in advance tax)</span>
                </span>
              </div>
              <input
                type="number"
                {...register('interest234B')}
                placeholder="0"
                className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">
                  15c
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Interest u/s 234 C <span className="text-xs text-gray-500">(Deferment of advance tax)</span>
                </span>
              </div>
              <input
                type="number"
                {...register('interest234C')}
                placeholder="0"
                className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">
                  15d
                </span>
                <span className="text-sm font-medium text-gray-900">
                  Fee u/s 234F <span className="text-xs text-gray-500">(Late filing fee)</span>
                </span>
              </div>
              <input
                type="number"
                {...register('fee234F')}
                placeholder="0"
                className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-gray-300 bg-gray-100 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-700">
                  16
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  Total Interest & Fee Payable (15a + 15b + 15c + 15d)
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-900">₹{totalInterestAndFee.toLocaleString('en-IN')}</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-red-300 bg-red-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-200 text-sm font-semibold text-red-700">
                  17
                </span>
                <span className="text-sm font-bold text-gray-900">
                  Total Tax, Fee and Interest (14 + 16)
                </span>
              </div>
              <div className="text-xl font-bold text-red-700">₹{totalTaxFeeAndInterest.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        {/* Summary Card Before Submit */}
        <div className="rounded-xl">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="text-2xl">📊</span>
            Tax Computation Summary
          </h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-3 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-medium text-gray-600">Gross Total Income (B4)</span>
                <span className="text-sm font-semibold text-gray-900">₹{grossTotalIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-medium text-gray-600">Total Deductions (Item 6)</span>
                <span className="text-sm font-semibold text-green-600">-₹{totalDeductions.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-semibold text-gray-700">Total Income (Item 7)</span>
                <span className="text-sm font-bold text-gray-900">₹{totalIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Tax on Total Income</span>
                <span className="text-sm font-semibold text-orange-600">₹{taxPayableOnTotalIncome.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-medium text-gray-600">Rebate u/s 87A</span>
                <span className="text-sm font-semibold text-green-600">-₹{rebate87A.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-medium text-gray-600">Health & Education Cess</span>
                <span className="text-sm font-semibold text-gray-900">₹{healthEducationCess.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="text-sm font-medium text-gray-600">Interest & Fee (Items 15-16)</span>
                <span className="text-sm font-semibold text-red-600">₹{totalInterestAndFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-red-100 to-orange-100 p-2">
                <span className="text-sm font-bold text-gray-900">💰 Final Tax Payable</span>
                <span className="text-lg font-bold text-red-700">₹{totalTaxFeeAndInterest.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs text-blue-900">
              <strong>ℹ️ Important:</strong> Please review all entries carefully before proceeding. 
              {totalExemptIncome > 0 && (
                <> You have declared exempt income of ₹{totalExemptIncome.toLocaleString('en-IN')} (for reporting purposes only).</>
              )}
              {ltcgCapitalGains112A > 0 && (
                <> LTCG u/s 112A of ₹{ltcgCapitalGains112A.toLocaleString('en-IN')} has been reported.</>
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t-2 border-gray-200 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <span>←</span>
            Back to Summary
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Next: TDS & Tax Payments</p>
              <p className="text-sm font-semibold text-gray-900">Complete Chapter VI-A Deductions</p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
            >
              Save & Continue
              <span>→</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TaxDeduction;