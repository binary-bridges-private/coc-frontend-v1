import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { grossTotalIncomeSchema } from "../itr-1.validation.ts";

interface GrossTotalIncomeProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

type IncomeSection = "salary" | "houseProperty" | "otherSources";

const GrossTotalIncome: React.FC<GrossTotalIncomeProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const [activeSection, setActiveSection] = useState<IncomeSection | null>(
    null
  );
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const handleFormSubmit = async (values: any) => {
    try {
      const validatedData = await grossTotalIncomeSchema.parseAsync(values);
      setValidationErrors({});
      onSubmit(validatedData);
    } catch (error: any) {
      console.error("Form validation error:", error);
      if (error.errors) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            errorMap[err.path.join(".")] = err.message;
          }
        });
        setValidationErrors(errorMap);

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const toNumber = (val: any) => {
    if (typeof val === "number") return val;
    const parsed = parseFloat(val || "0");
    return Number.isNaN(parsed) ? 0 : parsed;
  };

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

    return { grossSalary, netSalaryBeforeDeductions, netSalary };
  };

  const { grossSalary, netSalaryBeforeDeductions, netSalary } =
    calculateNetSalary();

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

  const housePropertyIncome = calculateHousePropertyIncome();

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

    const totalOtherSources = source1 + source2 + source3 + source4;
    const totalRetirement =
      retirementNonNotified + retirementUSA + retirementUK + retirementCanada;
    const totalDividend = div1 + div2 + div3 + div4 + div5;

    return (
      totalOtherSources +
      totalRetirement +
      totalDividend -
      relief89A -
      deduction57
    );
  };

  const otherSourcesIncome = calculateOtherSourcesIncome();

  const [completedSections, setCompletedSections] = useState<
    Record<string, boolean>
  >({
    salary: false,
    houseProperty: false,
    otherSources: false,
  });

  const validateSection = async (section: IncomeSection, values: any) => {
    try {
      await grossTotalIncomeSchema.parseAsync(values);
      return { valid: true, errors: {} };
    } catch (error: any) {
      if (error.errors) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            const fieldName = err.path.join(".");
            errorMap[fieldName] = err.message;
          }
        });
        return { valid: false, errors: errorMap };
      }
      return { valid: false, errors: {} };
    }
  };

  const validateSectionFields = (
    section: IncomeSection,
    values: any
  ): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (section === "salary") {
      const professionalTax = toNumber(values.professionalTax);
      if (professionalTax > 2500) {
        errors.professionalTax =
          "Professional tax cannot exceed ₹2,500 per year";
      }

      if (
        !values.salarySection17_1 &&
        !values.perquisitesSection17_2 &&
        !values.profitSection17_3
      ) {
        errors.salarySection17_1 = "At least one salary component is required";
      }
    } else if (section === "houseProperty") {
    } else if (section === "otherSources") {
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSectionComplete = (section: IncomeSection) => {
    const currentValues = form.getValues();
    console.log(`Validating ${section} section with values:`, currentValues);

    const validation = validateSectionFields(section, currentValues);

    if (!validation.valid) {
      console.error(`Validation failed for ${section}:`, validation.errors);
      setValidationErrors(validation.errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    console.log(`Section ${section} validated and completed`);
    setValidationErrors({});
    setCompletedSections((prev) => ({ ...prev, [section]: true }));

    if (section === "salary") {
      setActiveSection("houseProperty");
    } else if (section === "houseProperty") {
      setActiveSection("otherSources");
    } else {
      setActiveSection(null);
    }
  };

  const renderSummary = () => {
    const allSectionsCompleted =
      completedSections.salary &&
      completedSections.houseProperty &&
      completedSections.otherSources;

    return (
      <div className="space-y-6">
        {!allSectionsCompleted && (
          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h3 className="mb-1 font-bold text-blue-900">
                  Complete All Sections
                </h3>
                <p className="text-sm text-blue-800">
                  Please fill all three sections (B1, B2, B3) before submitting.
                  Click <span className="font-semibold">"Fill Now"</span> or{" "}
                  <span className="font-semibold">"Edit"</span> buttons to
                  complete each section.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-lg border-2 border-gray-300 bg-white shadow-md">
          <div className="bg-gray-100 border-b-2 border-gray-300 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-900">
              Part B - Gross Total Income Summary
            </h3>
            <p className="text-sm text-gray-600">Whole-Rupee (₹) only</p>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Section
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Amount (₹)
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr
                className={`transition-colors ${
                  !completedSections.salary
                    ? ""
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      B1 - Salary Income
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                  ₹{netSalary.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 text-center">
                  {completedSections.salary ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <span className="text-sm">✓</span> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      PENDING
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveSection("salary")}
                    className={`rounded px-4 py-2 font-medium transition-colors ${
                      completedSections.salary
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {completedSections.salary ? "Edit" : "Fill Now"}
                  </button>
                </td>
              </tr>
              <tr
                className={`transition-colors ${
                  !completedSections.houseProperty
                    ? ""
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      B2 - House Property
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                  ₹{housePropertyIncome.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 text-center">
                  {completedSections.houseProperty ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <span className="text-sm">✓</span> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      PENDING
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveSection("houseProperty")}
                    className={`rounded px-4 py-2 font-medium transition-colors ${
                      completedSections.houseProperty
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {completedSections.houseProperty ? "Edit" : "Fill Now"}
                  </button>
                </td>
              </tr>
              <tr
                className={`transition-colors ${
                  !completedSections.otherSources ? "" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">B3 - Other Sources</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                  ₹{otherSourcesIncome.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 text-center">
                  {completedSections.otherSources ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <span className="text-sm">✓</span> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      PENDING
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveSection("otherSources")}
                    className={`rounded px-4 py-2 font-medium transition-colors ${
                      completedSections.otherSources
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {completedSections.otherSources ? "Edit" : "Fill Now"}
                  </button>
                </td>
              </tr>
              
              {/* Total Row */}
              <tr className="border-t-2 ">
                <td colSpan={4} className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      B4 - Gross Total Income (B1+B2+B3)
                    </span>
                    <span className="text-2xl font-bold text-blue-700">
                      ₹{(
                        netSalary +
                        housePropertyIncome +
                        otherSourcesIncome
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note Banner */}
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl">�</span>
            <div>
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> If loss, put the figure in negative. To avail the benefit of carry
                forward and set off of losses, please use ITR-2.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSalarySection = () => {
    const sectionErrors = Object.entries({
      ...errors,
      ...validationErrors,
    }).filter(
      ([key]) =>
        key.includes("salary") ||
        key.includes("Section17") ||
        key.includes("perquisites") ||
        key.includes("profit") ||
        key.includes("retirement") ||
        key.includes("allowance") ||
        key.includes("standard") ||
        key.includes("professional") ||
        key.includes("entertainment")
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h3 className="text-lg font-bold">B1 - Salary Income</h3>
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Back to Summary
          </button>
        </div>

        {sectionErrors.length > 0 && (
          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 flex-shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h4 className="mb-2 text-sm font-bold text-red-900">
                  ⚠️ Please fix the following errors ({sectionErrors.length})
                </h4>
                <ul className="space-y-1 text-sm text-red-800">
                  {sectionErrors.map(([fieldName, error]: [string, any]) => (
                    <li key={fieldName} className="flex items-start gap-2">
                      <span className="font-medium">•</span>
                      <span>
                        <strong className="capitalize">
                          {fieldName.replace(/([A-Z])/g, " $1").trim()}:
                        </strong>{" "}
                        {error?.message || error}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="border border-gray-300 bg-white p-4">
          <div className="mb-3 bg-gray-100 p-2 font-semibold">
            i. Gross Salary (ia + ib + ic + id + ie)
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField
              label="a. Salary as per section 17(1) (ia)"
              name="salarySection17_1"
              type="number"
              placeholder="0"
              register={register}
              error={errors.salarySection17_1?.message}
            />

            <InputField
              label="b. Value of perquisites u/s 17(2) (ib)"
              name="perquisitesSection17_2"
              type="number"
              placeholder="0"
              register={register}
              error={errors.perquisitesSection17_2?.message}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <InputField
              label="c. Profit in lieu of salary u/s 17(3) (ic)"
              name="profitSection17_3"
              type="number"
              placeholder="0"
              register={register}
              error={errors.profitSection17_3?.message}
            />

            <InputField
              label="d. Retirement benefit (notified) (id)"
              name="retirementBenefitNotified"
              type="number"
              placeholder="0"
              register={register}
              error={errors.retirementBenefitNotified?.message}
            />

            <InputField
              label="e. Retirement benefit (other) (ie)"
              name="retirementBenefitOther"
              type="number"
              placeholder="0"
              register={register}
              error={errors.retirementBenefitOther?.message}
            />
          </div>
          <div className="border-t border-gray-300 pt-2 mb-4 bg-gray-50 p-2">
            <strong>Gross Salary (ia + ib + ic + id + ie):</strong> ₹
            {grossSalary.toLocaleString("en-IN")}
          </div>
          <div className="mb-4">
            <div className="mb-2 font-medium text-gray-900">
              ii. Less allowances to the extent exempt u/s 10{" "}
              <span className="text-sm italic text-gray-600">
                (drop down to be provided in e-filing utility)
              </span>
            </div>
            <div className="mb-2 rounded border border-blue-300 bg-blue-50 p-2 text-xs italic text-gray-700">
              (Ensure that it is included in salary income u/s
              17(1)/17(2)/17(3))
            </div>
            <InputField
              label="Total Allowances Exempt u/s 10"
              name="exemptAllowances"
              type="number"
              placeholder="0"
              register={register}
              error={errors.exemptAllowances?.message}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="iia. Less: Income claimed for relief from taxation u/s 89A"
              name="reliefFromTaxation89A"
              type="number"
              placeholder="0"
              register={register}
              error={errors.reliefFromTaxation89A?.message}
            />
          </div>
          <div className="border-t border-gray-300 pt-2 mb-4 bg-blue-50 p-3">
            <strong className="text-blue-900">
              iii. Net Salary (i - ii - iia):
            </strong>{" "}
            <span className="text-lg font-bold text-blue-700">
              ₹{netSalaryBeforeDeductions.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="mb-3 bg-gray-100 p-2 font-semibold">
            iv. Deductions u/s 16 (iva + ivb + ivc)
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="a. Standard deduction (iva)"
              name="standardDeduction16"
              type="number"
              placeholder="50000"
              register={register}
              error={
                errors.standardDeduction16?.message ||
                validationErrors.standardDeduction16
              }
            />

            <InputField
              label="b. Entertainment allowance (ivb)"
              name="entertainmentAllowance"
              type="number"
              placeholder="0"
              register={register}
              error={errors.entertainmentAllowance?.message}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="professionalTax"
                className="text-sm font-medium text-gray-700"
              >
                c. Professional tax (ivc){" "}
                <span className="text-red-500">*</span>
                <span className="ml-2 text-xs font-normal text-orange-600">
                  Max: ₹2,500
                </span>
              </label>
              <input
                id="professionalTax"
                type="number"
                placeholder="0"
                max={2500}
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.professionalTax?.message ||
                  validationErrors.professionalTax
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                {...register("professionalTax")}
              />
              {(errors.professionalTax?.message ||
                validationErrors.professionalTax) && (
                <p className="text-sm text-red-500">
                  {(errors.professionalTax?.message as string) ||
                    validationErrors.professionalTax}
                </p>
              )}
              <p className="text-xs text-gray-500">
                ⚠️ Professional tax is limited to ₹2,500 per year as per Income
                Tax Act
              </p>
            </div>
          </div>{" "}
          <div className="mt-4 border border-gray-400 bg-yellow-50 p-3">
            <strong>
              v. Income chargeable under the head 'Salaries' (iii - iv) [B1]:
            </strong>{" "}
            ₹{netSalary.toLocaleString("en-IN")}
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveSection(null)}
              className="border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSectionComplete("salary")}
              className="bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Save & Continue to B2
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHousePropertySection = () => {
    const sectionErrors = Object.entries({
      ...errors,
      ...validationErrors,
    }).filter(
      ([key]) =>
        key.includes("annual") ||
        key.includes("deduction") ||
        key.includes("interest") ||
        key.includes("arrears") ||
        key.includes("house") ||
        key.includes("property")
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h3 className="text-lg font-bold">B2 - House Property</h3>
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Back to Summary
          </button>
        </div>

        {sectionErrors.length > 0 && (
          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 flex-shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h4 className="mb-2 text-sm font-bold text-red-900">
                  ⚠️ Please fix the following errors ({sectionErrors.length})
                </h4>
                <ul className="space-y-1 text-sm text-red-800">
                  {sectionErrors.map(([fieldName, error]: [string, any]) => (
                    <li key={fieldName} className="flex items-start gap-2">
                      <span className="font-medium">•</span>
                      <span>
                        <strong className="capitalize">
                          {fieldName.replace(/([A-Z])/g, " $1").trim()}:
                        </strong>{" "}
                        {error?.message || error}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="border border-gray-300 bg-white p-4">
          <div className="mb-3">
            <label className="mb-2 block font-medium">
              Tick applicable option
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("propertySelfOccupied")}
                  className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>Self-Occupied</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("propertyLetOut")}
                  className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>Let Out</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("propertyDeemedLetOut")}
                  className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>Deemed Let Out</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField
              label="i. Gross rent received/receivable/lettable value"
              name="grossRent"
              type="number"
              placeholder="0"
              register={register}
              error={errors.grossRent?.message}
            />

            <InputField
              label="ii. Tax paid to local authorities"
              name="localTaxPaid"
              type="number"
              placeholder="0"
              register={register}
              error={errors.localTaxPaid?.message}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <InputField
              label="iii. Annual Value (i - ii)"
              name="annualValue"
              type="number"
              placeholder="0"
              register={register}
              error={errors.annualValue?.message}
            />

            <InputField
              label="iv. 30% of Annual Value"
              name="standardDeduction30Percent"
              type="number"
              placeholder="0"
              register={register}
              error={errors.standardDeduction30Percent?.message}
            />

            <InputField
              label="v. Interest on borrowed capital"
              name="interestBorrowedCapital"
              type="number"
              placeholder="0"
              register={register}
              error={errors.interestBorrowedCapital?.message}
            />
          </div>

          <div className="mb-4">
            <InputField
              label="vi. Arrears/Unrealised rent received during the year less 30%"
              name="arrearsUnrealisedRent"
              type="number"
              placeholder="0"
              register={register}
              error={errors.arrearsUnrealisedRent?.message}
            />
          </div>

          <div className="mt-4 border border-gray-400 bg-yellow-50 p-3">
            <strong>
              vii. Income chargeable under the head 'House Property' (iii - iv -
              v) + vi [B2]
            </strong>
            <p className="mt-1 text-sm">
              (If loss, put the figure in negative)
            </p>
            <p className="mt-1 text-xs text-red-700">
              <strong>Note:</strong> Maximum loss from House Property that can
              be set-off is INR 2,00,000. To avail the benefit of carry forward
              and set of loss, please use ITR-2
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveSection("salary")}
              className="border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => handleSectionComplete("houseProperty")}
              className="bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Save & Continue to B3
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderOtherSourcesSection = () => {
    const toNumber = (val: any) => {
      if (typeof val === "number") return val;
      const parsed = parseFloat(val || "0");
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    const sectionErrors = Object.entries({
      ...errors,
      ...validationErrors,
    }).filter(
      ([key]) =>
        key.includes("otherSource") ||
        key.includes("retirement") ||
        key.includes("dividend") ||
        key.includes("relief") ||
        key.includes("deduction57")
    );

    const otherSourcesData = [
      {
        id: 1,
        nature: watch("otherSource1Nature") || "",
        description: watch("otherSource1Description") || "",
        amount: watch("otherSource1Amount") || "",
      },
      {
        id: 2,
        nature: watch("otherSource2Nature") || "",
        description: watch("otherSource2Description") || "",
        amount: watch("otherSource2Amount") || "",
      },
      {
        id: 3,
        nature: watch("otherSource3Nature") || "",
        description: watch("otherSource3Description") || "",
        amount: watch("otherSource3Amount") || "",
      },
      {
        id: 4,
        nature: watch("otherSource4Nature") || "",
        description: watch("otherSource4Description") || "",
        amount: watch("otherSource4Amount") || "",
      },
    ];

    const retirementBenefitNotified =
      toNumber(watch("retirementBenefitUSA")) +
      toNumber(watch("retirementBenefitUK")) +
      toNumber(watch("retirementBenefitCanada"));

    const totalDividend =
      toNumber(watch("dividendQ1")) +
      toNumber(watch("dividendQ2")) +
      toNumber(watch("dividendQ3")) +
      toNumber(watch("dividendQ4")) +
      toNumber(watch("dividendQ5"));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h3 className="text-lg font-bold">B3 - Income from Other Sources</h3>
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Back to Summary
          </button>
        </div>

        {sectionErrors.length > 0 && (
          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-6 w-6 flex-shrink-0 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h4 className="mb-2 text-sm font-bold text-red-900">
                  ⚠️ Please fix the following errors ({sectionErrors.length})
                </h4>
                <ul className="space-y-1 text-sm text-red-800">
                  {sectionErrors.map(([fieldName, error]: [string, any]) => (
                    <li key={fieldName} className="flex items-start gap-2">
                      <span className="font-medium">•</span>
                      <span>
                        <strong className="capitalize">
                          {fieldName.replace(/([A-Z])/g, " $1").trim()}:
                        </strong>{" "}
                        {error?.message || error}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="border border-gray-300 bg-white p-4">
          <div className="mb-4 border border-blue-300 bg-blue-50 p-2 text-xs italic">
            <strong>Income from Other Sources</strong> (drop down like interest
            from saving account, deposit etc. to be provided in e-filing utility
            specifying nature of income and in case of dividend income and
            Income from retirement benefit account maintained in a notified
            country u/s 89A, please mention quarterly breakup for allowing
            applicable relief from section 234C)
          </div>

          <div className="mb-4">
            <div className="mb-2 font-medium text-gray-900">
              Income from Other Sources
            </div>
            <table className="w-full border-2 border-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900 w-12">
                    Sl.No.
                  </th>
                  <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900">
                    Nature of Income
                  </th>
                  <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900">
                    Description (If 'Any Other' selected)
                  </th>
                  <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900 w-40">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherSourcesData.map((row) => {
                  const isAnyOther = row.nature === "Any Other";
                  const hasSelection = row.nature && row.nature !== "";
                  const fieldPrefix = `otherSource${row.id}`;
                  const descriptionError =
                    validationErrors[`${fieldPrefix}Description`];

                  return (
                    <tr
                      key={row.id}
                      className={hasSelection ? "bg-green-100" : "bg-white"}
                    >
                      <td className="border border-gray-400 p-2 text-center font-medium text-gray-900">
                        {row.id}
                      </td>
                      <td className="border border-gray-400 p-2">
                        <select
                          {...register(`${fieldPrefix}Nature` as any)}
                          className={`w-full border-0 bg-transparent p-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            hasSelection ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          <option value="">(Select)</option>
                          <option value="Interest from Savings Account">
                            Interest from Savings Account
                          </option>
                          <option value="Interest from Fixed Deposit">
                            Interest from Fixed Deposit
                          </option>
                          <option value="Interest from Company Deposit">
                            Interest from Company Deposit
                          </option>
                          <option value="Interest from Other Deposit">
                            Interest from Other Deposit
                          </option>
                          <option value="Dividend Income">
                            Dividend Income
                          </option>
                          <option value="Any Other">Any Other</option>
                        </select>
                      </td>
                      <td
                        className={`border border-gray-400 p-2 ${
                          isAnyOther ? "bg-yellow-50" : "bg-gray-100"
                        }`}
                      >
                        {isAnyOther ? (
                          <div>
                            <input
                              type="text"
                              {...register(`${fieldPrefix}Description` as any)}
                              placeholder="Enter description..."
                              className={`w-full border ${
                                descriptionError
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } bg-white p-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {descriptionError && (
                              <div className="mt-1 text-xs text-red-600">
                                {descriptionError}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </td>
                      <td
                        className={`border border-gray-400 p-2 ${
                          hasSelection ? "bg-green-200" : "bg-gray-100"
                        }`}
                      >
                        {hasSelection ? (
                          <input
                            type="number"
                            {...register(`${fieldPrefix}Amount` as any)}
                            placeholder="0"
                            className="w-full border border-gray-300 bg-white p-1 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-2 text-xs text-gray-600 italic">
              * Select nature of income to enable amount entry. For "Any Other",
              description is mandatory.
            </div>
          </div>

          <div className="mb-4">
            <InputField
              label="Income from retirement benefit account maintained in a country other than notified country u/s 89A"
              name="retirementBenefitNonNotifiedCountry"
              type="number"
              placeholder="0"
              register={register}
              error={errors.retirementBenefitNonNotifiedCountry?.message}
            />
          </div>

          <div className="mb-4">
            <div className="mb-3 font-medium text-gray-900">
              Income from retirement benefit account maintained in a notified
              country u/s 89A (1 + 2 + 3)
            </div>
            <table className="w-full border-2 border-gray-300 shadow-sm">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border-r border-gray-500 p-3 text-left font-semibold">
                    Country
                  </th>
                  <th className="p-3 text-left font-semibold w-64">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    1. United States of America
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitUSA")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    2. United Kingdom of Great Britain and Northern Ireland
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitUK")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-r border-gray-300 p-3 text-gray-800">
                    3. Canada
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitCanada")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 rounded bg-blue-50 p-3 text-right">
              <span className="text-sm font-semibold text-gray-700">
                Total:{" "}
              </span>
              <span className="text-lg font-bold text-blue-700">
                ₹{retirementBenefitNotified.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-3 font-medium text-gray-900">
              Income from retirement benefit account maintained in a notified
              country u/s 89A (Quarterly breakup of Taxable Portion)
            </div>
            <table className="w-full border-2 border-gray-300 shadow-sm">
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    i. Upto 15-Jun-2024
                  </td>
                  <td className="border-b border-gray-300 p-2 w-64">
                    <input
                      type="number"
                      {...register("retirementBenefitQ1")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    ii. From 16-Jun-2024 to 15-Sep-2024
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitQ2")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    iii. From 16-Sep-2024 to 15-Dec-2024
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitQ3")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    iv. From 16-Dec-2024 to 15-Mar-2025
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitQ4")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-r border-gray-300 p-3 text-gray-800">
                    v. From 16-Mar-2025 to 31-Mar-2025
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      {...register("retirementBenefitQ5")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <div className="mb-3 font-medium text-gray-900">
              Dividend (i+ii+iii+iv+v)
            </div>
            <table className="w-full border-2 border-gray-300 shadow-sm">
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    i. Upto 15-Jun-2024
                  </td>
                  <td className="border-b border-gray-300 p-2 w-64">
                    <input
                      type="number"
                      {...register("dividendQ1")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    ii. From 16-Jun-2024 to 15-Sep-2024
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("dividendQ2")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    iii. From 16-Sep-2024 to 15-Dec-2024
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("dividendQ3")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-b border-r border-gray-300 p-3 text-gray-800">
                    iv. From 16-Dec-2024 to 15-Mar-2025
                  </td>
                  <td className="border-b border-gray-300 p-2">
                    <input
                      type="number"
                      {...register("dividendQ4")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border-r border-gray-300 p-3 text-gray-800">
                    v. From 16-Mar-2025 to 31-Mar-2025
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      {...register("dividendQ5")}
                      className="w-full rounded border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter amount"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 rounded bg-blue-50 p-3 text-right">
              <span className="text-sm font-semibold text-gray-700">
                Total Dividend:{" "}
              </span>
              <span className="text-lg font-bold text-blue-700">
                ₹{totalDividend.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField
              label="Less: Income claimed for relief from taxation u/s 89A"
              name="reliefFromTaxation89AOtherSources"
              type="number"
              placeholder="0"
              register={register}
              error={errors.reliefFromTaxation89AOtherSources?.message}
            />

            <InputField
              label="Less: Deduction u/s 57(iia) (In case of family pension only)"
              name="deduction57iia"
              type="number"
              placeholder="0"
              register={register}
              error={errors.deduction57iia?.message}
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveSection("houseProperty")}
              className="border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => handleSectionComplete("otherSources")}
              className="bg-green-600 px-6 py-2 text-white hover:bg-green-700"
            >
              Complete & Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                B
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Gross Total Income</h2>
            </div>
            <p className="text-sm text-gray-600">
              Part B - Complete all income sections (Salary, House Property, Other Sources). All amounts in whole rupees (₹) only.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back to summary
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {(Object.keys(errors).length > 0 ||
          Object.keys(validationErrors).length > 0) &&
          !activeSection && (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-red-900">
                    ⚠️ Please fix the following errors before submitting
                  </h3>
                  <ul className="space-y-1 text-sm text-red-800">
                    {Object.entries(errors).map(
                      ([fieldName, error]: [string, any]) => (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">
                              {fieldName.replace(/([A-Z])/g, " $1").trim()}:
                            </strong>{" "}
                            {error?.message || "This field has an error"}
                          </span>
                        </li>
                      )
                    )}
                    {Object.entries(validationErrors).map(
                      ([fieldName, message]) => (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">
                              {fieldName
                                .replace(/\./g, " ")
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                              :
                            </strong>{" "}
                            {message}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

        {!activeSection && renderSummary()}
        {activeSection === "salary" && renderSalarySection()}
        {activeSection === "houseProperty" && renderHousePropertySection()}
        {activeSection === "otherSources" && renderOtherSourcesSection()}

        {!activeSection &&
          completedSections.salary &&
          completedSections.houseProperty &&
          completedSections.otherSources && (
            <div className="mt-6 flex justify-end gap-3 rounded-xl border-t border-gray-200 bg-gray-50 p-4">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-green-600 px-8 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Submit & Continue"}
              </button>
            </div>
          )}
      </form>
    </section>
  );
};

interface SectionCardProps {
  title: string;
  description: string;
  amount: number;
  icon: string;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  amount,
  icon,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex flex-col gap-3 rounded-xl border-2 border-gray-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-md"
  >
    <div className="flex items-start justify-between">
      <span className="text-3xl">{icon}</span>
      <svg
        className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-500">Income</p>
      <p className="text-lg font-bold text-gray-900">
        ₹{amount.toLocaleString("en-IN")}
      </p>
    </div>
  </button>
);

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  error?: string | any;
  placeholder?: string;
  type?: string;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
  helpText,
}) => {
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          errorMessage ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name)}
      />
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default GrossTotalIncome;
