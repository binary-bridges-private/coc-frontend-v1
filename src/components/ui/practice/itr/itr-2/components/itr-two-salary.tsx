import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  salaryIncomeSchema,
  SalaryIncomeFormData,
} from "../itr-two.validation.ts";
import { PersonalInfoFormData } from "../itr-two.validation.ts";

interface ItrTwoSalaryProps {
  onComplete: (data: SalaryIncomeFormData) => void;
  initialData?: Partial<SalaryIncomeFormData>;
  personalInfo?: PersonalInfoFormData; // 👈 NEW: Accept personal info from previous section
}

const ItrTwoSalary: React.FC<ItrTwoSalaryProps> = ({
  onComplete,
  initialData,
  personalInfo, // 👈 NEW: Destructure personal info
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<SalaryIncomeFormData>({
    resolver: zodResolver(salaryIncomeSchema) as any,
    defaultValues: initialData || {
      employers: [
        {
          employerName: "",
          natureOfEmployer: "",
          employerTAN: "",
          addressOfEmployer: "",
          townCity: "",
          state: "",
          pinCode: "",
          salaryAsPerSection17_1: 0,
          valueOfPerquisites: 0,
          profitInLieuOfSalary: 0,
          incomeFromRetirementBenefit89A: 0,
          incomeFromRetirementBenefitOther: 0,
          incomeTaxableReliefClaimed89A: 0,
        },
      ],
      totalGrossSalary: 0,
      lessAllowancesExempt: 0,
      incomeClaimedRelief89A: 0,
      netSalary: 0,
      standardDeduction: 0,
      entertainmentAllowance: 0,
      professionalTax: 0,
      totalDeductionSection16: 0,
      incomeChargeableSalaries: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employers",
  });

  const watchEmployers = watch("employers");
  const watchLessAllowances = watch("lessAllowancesExempt");
  const watchIncomeClaimedRelief = watch("incomeClaimedRelief89A");
  const watchStandardDeduction = watch("standardDeduction");
  const watchEntertainment = watch("entertainmentAllowance");
  const watchProfessionalTax = watch("professionalTax");

  useEffect(() => {
    const total = watchEmployers.reduce((sum, employer) => {
      const employerGross =
        (employer.salaryAsPerSection17_1 || 0) +
        (employer.valueOfPerquisites || 0) +
        (employer.profitInLieuOfSalary || 0) +
        (employer.incomeFromRetirementBenefit89A || 0) +
        (employer.incomeFromRetirementBenefitOther || 0) +
        (employer.incomeTaxableReliefClaimed89A || 0);
      return sum + employerGross;
    }, 0);
    setValue("totalGrossSalary", total);
  }, [watchEmployers, setValue]);

  // Calculate Net Salary (2 - 3 - 3a)
  useEffect(() => {
    const totalGross = watch("totalGrossSalary");
    const netSalary =
      totalGross - (watchLessAllowances || 0) - (watchIncomeClaimedRelief || 0);
    setValue("netSalary", netSalary);
  }, [
    watch("totalGrossSalary"),
    watchLessAllowances,
    watchIncomeClaimedRelief,
    setValue,
    watch,
  ]);

  // Calculate Total Deduction u/s 16 (5a + 5b + 5c)
  useEffect(() => {
    const totalDeduction =
      (watchStandardDeduction || 0) +
      (watchEntertainment || 0) +
      (watchProfessionalTax || 0);
    setValue("totalDeductionSection16", totalDeduction);
  }, [
    watchStandardDeduction,
    watchEntertainment,
    watchProfessionalTax,
    setValue,
  ]);

  // Calculate Income chargeable under the head 'Salaries' (4 - 5)
  useEffect(() => {
    const netSalary = watch("netSalary");
    const totalDeduction = watch("totalDeductionSection16");
    const incomeChargeable = netSalary - totalDeduction;
    setValue("incomeChargeableSalaries", incomeChargeable);
  }, [watch("netSalary"), watch("totalDeductionSection16"), setValue, watch]);

  const onSubmit = (data: SalaryIncomeFormData) => {
    onComplete(data);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 ">
      {personalInfo && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Personal Information from Part A
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
            <div>
              <span className="font-medium text-blue-700">Name:</span>
              <p className="text-blue-900">{personalInfo.firstName} {personalInfo.lastName}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">PAN:</span>
              <p className="text-blue-900">{personalInfo.pan}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">State:</span>
              <p className="text-blue-900">{personalInfo.state}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Status:</span>
              <p className="text-blue-900">{personalInfo.filingStatus}</p>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-lg ">
        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Employer {index + 1}
                  </h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Remove Employer
                    </button>
                  )}
                </div>

                <div className="mb-6 rounded-lg border border-gray-300 bg-white p-4">
                  <h4 className="mb-4 font-semibold text-gray-700">
                    Employer Details
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Name of Employer <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register(`employers.${index}.employerName`)}
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter employer name"
                      />
                      {errors.employers?.[index]?.employerName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.employers[index]?.employerName?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Nature of Employer{" "}
                        <span className="text-red-500">*</span>
                        <span className="ml-1 text-xs text-gray-500">
                          (Tick ☑ drop down to be provided)
                        </span>
                      </label>
                      <select
                        {...register(`employers.${index}.natureOfEmployer`)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select nature of employer</option>
                        <option value="Government">Government</option>
                        <option value="PSU">
                          PSU (Public Sector Undertaking)
                        </option>
                        <option value="Private">Private Sector</option>
                        <option value="Pensioner">
                          Pensioner - Government
                        </option>
                        <option value="Pensioner-PSU">Pensioner - PSU</option>
                        <option value="Pensioner-Private">
                          Pensioner - Private
                        </option>
                        <option value="Others">Others</option>
                      </select>
                      {errors.employers?.[index]?.natureOfEmployer && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.employers[index]?.natureOfEmployer?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        TAN of Employer{" "}
                        <span className="text-xs text-gray-500">
                          (mandatory if tax is deducted)
                        </span>
                      </label>
                      <input
                        {...register(`employers.${index}.employerTAN`)}
                        type="text"
                        maxLength={10}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="ABCD12345E"
                      />
                      {errors.employers?.[index]?.employerTAN && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.employers[index]?.employerTAN?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Town/City
                      </label>
                      <input
                        {...register(`employers.${index}.townCity`)}
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter town/city"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        {...register(`employers.${index}.state`)}
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter state"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        PIN code / ZIP code
                      </label>
                      <input
                        {...register(`employers.${index}.pinCode`)}
                        type="text"
                        maxLength={6}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="123456"
                      />
                      {errors.employers?.[index]?.pinCode && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.employers[index]?.pinCode?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Address of Employer
                    </label>
                    <textarea
                      {...register(`employers.${index}.addressOfEmployer`)}
                      rows={2}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter complete address"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-gray-300 bg-white p-4">
                  <h4 className="mb-4 font-semibold text-gray-700">
                    1. Gross Salary (1a + 1b + 1c + 1d + 1e + 1f)
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          1a. Salary as per section 17(1){" "}
                          <span className="text-xs text-gray-500">
                            (drop down to be provided)
                          </span>
                        </label>
                        <input
                          {...register(
                            `employers.${index}.salaryAsPerSection17_1`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                        {errors.employers?.[index]?.salaryAsPerSection17_1 && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.employers[index]?.salaryAsPerSection17_1
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          1b. Value of perquisites as per section 17(2){" "}
                          <span className="text-xs text-gray-500">
                            (drop down to be provided)
                          </span>
                        </label>
                        <input
                          {...register(
                            `employers.${index}.valueOfPerquisites`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                        {errors.employers?.[index]?.valueOfPerquisites && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.employers[index]?.valueOfPerquisites
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          1c. Profit in lieu of salary as per section 17(3){" "}
                          <span className="text-xs text-gray-500">
                            (drop down to be provided)
                          </span>
                        </label>
                        <input
                          {...register(
                            `employers.${index}.profitInLieuOfSalary`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                        {errors.employers?.[index]?.profitInLieuOfSalary && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.employers[index]?.profitInLieuOfSalary
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          1d. Income from retirement benefit account maintained
                          in a notified country u/s 89A{" "}
                          <span className="text-xs text-gray-500">
                            (choose country from drop down menu)
                          </span>
                        </label>
                        <input
                          {...register(
                            `employers.${index}.incomeFromRetirementBenefit89A`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                        {errors.employers?.[index]
                          ?.incomeFromRetirementBenefit89A && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.employers[index]
                                ?.incomeFromRetirementBenefit89A?.message
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          1e. Income from retirement benefit account maintained
                          in a country "other than notified country u/s 89A"
                        </label>
                        <input
                          {...register(
                            `employers.${index}.incomeFromRetirementBenefitOther`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                        {errors.employers?.[index]
                          ?.incomeFromRetirementBenefitOther && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.employers[index]
                                ?.incomeFromRetirementBenefitOther?.message
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          1f. Income taxable during the previous year on which
                          relief u/s 89A was claimed in any earlier previous
                          year
                        </label>
                        <input
                          {...register(
                            `employers.${index}.incomeTaxableReliefClaimed89A`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                        {errors.employers?.[index]
                          ?.incomeTaxableReliefClaimed89A && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.employers[index]
                                ?.incomeTaxableReliefClaimed89A?.message
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 rounded bg-blue-50 p-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">
                          Gross Salary for this employer:
                        </span>{" "}
                        ₹
                        {(
                          (watchEmployers[index]?.salaryAsPerSection17_1 || 0) +
                          (watchEmployers[index]?.valueOfPerquisites || 0) +
                          (watchEmployers[index]?.profitInLieuOfSalary || 0) +
                          (watchEmployers[index]
                            ?.incomeFromRetirementBenefit89A || 0) +
                          (watchEmployers[index]
                            ?.incomeFromRetirementBenefitOther || 0) +
                          (watchEmployers[index]
                            ?.incomeTaxableReliefClaimed89A || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs italic text-gray-500">
                  (Add multiple rows for Gross Salary in case of more than one
                  employer)
                </p>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                append({
                  employerName: "",
                  natureOfEmployer: "",
                  employerTAN: "",
                  addressOfEmployer: "",
                  townCity: "",
                  state: "",
                  pinCode: "",
                  salaryAsPerSection17_1: 0,
                  valueOfPerquisites: 0,
                  profitInLieuOfSalary: 0,
                  incomeFromRetirementBenefit89A: 0,
                  incomeFromRetirementBenefitOther: 0,
                  incomeTaxableReliefClaimed89A: 0,
                })
              }
              className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              + Add Another Employer
            </button>
          </div>

          <div className="space-y-4 rounded-lg border-2 border-gray-300 bg-white p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg p-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  2. Total Gross Salary{" "}
                  <span className="text-xs text-gray-500">
                    (from all employers)
                  </span>
                </label>
                <input
                  {...register("totalGrossSalary", { valueAsNumber: true })}
                  type="number"
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  3. Less allowances to the extent exempt u/s 10{" "}
                  <span className="text-xs text-gray-500">
                    (drop down to be provided in e-filing utility) (please refer
                    instructions)
                  </span>
                </label>
                <input
                  {...register("lessAllowancesExempt", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                <p className="mt-1 text-xs italic text-gray-500">
                  (Note: Ensure that in Total Gross salary in (2) above)
                </p>
                {errors.lessAllowancesExempt && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lessAllowancesExempt.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  3(a) Less: Income claimed for relief from taxation u/s 89A
                </label>
                <input
                  {...register("incomeClaimedRelief89A", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {errors.incomeClaimedRelief89A && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.incomeClaimedRelief89A.message}
                  </p>
                )}
              </div>

              <div className="rounded-lg p-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  4. Net Salary (2 - 3 - 3a)
                </label>
                <input
                  {...register("netSalary", { valueAsNumber: true })}
                  type="number"
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border-2 border-gray-300 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              5. Deduction u/s 16 (5a + 5b + 5c)
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  5a. Standard deduction u/s 16(ia)
                </label>
                <input
                  {...register("standardDeduction", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {errors.standardDeduction && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.standardDeduction.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  5b. Entertainment allowance u/s 16(ii)
                </label>
                <input
                  {...register("entertainmentAllowance", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {errors.entertainmentAllowance && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.entertainmentAllowance.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  5c. Professional tax u/s 16(iii)
                </label>
                <input
                  {...register("professionalTax", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {errors.professionalTax && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.professionalTax.message}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Total Deduction u/s 16
              </label>
              <input
                {...register("totalDeductionSection16", {
                  valueAsNumber: true,
                })}
                type="number"
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="rounded-lg p-4">
            <label className="mb-1.5 block text-lg font-semibold text-gray-900">
              6. Income chargeable under the head 'Salaries' (4 - 5)
            </label>
            <input
              {...register("incomeChargeableSalaries", { valueAsNumber: true })}
              type="number"
              readOnly
              className="w-full rounded-lg bg-white px-4 py-3 text-lg font-bold text-gray-900"
              placeholder="0.00"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrTwoSalary;
