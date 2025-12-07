import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { grossTotalIncomeSchema } from "../itr-1.validation.ts";
import { PropertyType, TaxRegime } from "../itr-1.types.ts";

interface GrossTotalIncomeProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  taxRegime?: string;
}

type IncomeSection = "salary" | "houseProperty" | "otherSources";

const GrossTotalIncome: React.FC<GrossTotalIncomeProps> = ({
  form,
  onSubmit,
  onCancel,
  taxRegime,
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
    setValue,
  } = form;

  const topRef = React.useRef<HTMLDivElement>(null);

  // Scroll to top when active section changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    if (taxRegime === TaxRegime.New115BAC) {
      setValue("standardDeduction16", 75000);
    } else {
      setValue("standardDeduction16", 50000);
    }
  }, [taxRegime, setValue]);

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
    "grossRent",
    "localTaxPaid",
    "annualValue",
    "standardDeduction30Percent",
    "interestBorrowedCapital",
    "arrearsUnrealisedRent",
    "propertyType",
  ]);

  // Auto-calculation for Annual Value and Standard Deduction
  useEffect(() => {
    const grossRent = toNumber(housePropertyValues[0]);
    const localTax = toNumber(housePropertyValues[1]);
    const propertyType = housePropertyValues[6];

    let newAnnualValue = 0;
    if (propertyType === PropertyType.SelfOccupied) {
      newAnnualValue = 0;
    } else {
      newAnnualValue = grossRent - localTax;
    }

    // Only update if value changed to avoid infinite loop
    if (toNumber(housePropertyValues[2]) !== newAnnualValue) {
      setValue("annualValue", newAnnualValue, { shouldValidate: true });
    }

    // Standard Deduction 30%
    const deduction = Math.round(newAnnualValue * 0.3);
    if (toNumber(housePropertyValues[3]) !== deduction) {
      setValue("standardDeduction30Percent", deduction, {
        shouldValidate: true,
      });
    }
  }, [
    housePropertyValues[0], // grossRent
    housePropertyValues[1], // localTaxPaid
    housePropertyValues[6], // propertyType
    setValue,
  ]);

  const calculateHousePropertyIncome = () => {
    const annualValue = toNumber(housePropertyValues[2]); // Watch annualValue from form state
    const deduction30 = toNumber(housePropertyValues[3]); // Watch deduction from form state
    const interest = toNumber(housePropertyValues[4]);
    const arrears = toNumber(housePropertyValues[5]);

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

    return totalOtherSources + totalRetirement - relief89A - deduction57;
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

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-900">
              Part B - Gross Total Income Summary
            </h3>
            <p className="text-sm text-gray-500">Whole-Rupee (₹) only</p>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Section
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Amount (₹)
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr
                className={`transition-colors ${
                  !completedSections.salary ? "" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <span className="text-xs font-bold">B1</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      Salary Income
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  ₹{netSalary.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 text-center">
                  {completedSections.salary ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveSection("salary")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      completedSections.salary
                        ? "text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    }`}
                  >
                    {completedSections.salary ? "Edit Details" : "Fill Now"}
                  </button>
                </td>
              </tr>
              <tr
                className={`transition-colors ${
                  !completedSections.houseProperty ? "" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <span className="text-xs font-bold">B2</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      House Property
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  ₹{housePropertyIncome.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 text-center">
                  {completedSections.houseProperty ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveSection("houseProperty")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      completedSections.houseProperty
                        ? "text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    }`}
                  >
                    {completedSections.houseProperty
                      ? "Edit Details"
                      : "Fill Now"}
                  </button>
                </td>
              </tr>
              <tr
                className={`transition-colors ${
                  !completedSections.otherSources ? "" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                      <span className="text-xs font-bold">B3</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      Other Sources
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  ₹{otherSourcesIncome.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 text-center">
                  {completedSections.otherSources ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveSection("otherSources")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      completedSections.otherSources
                        ? "text-blue-600 hover:bg-blue-50"
                        : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    }`}
                  >
                    {completedSections.otherSources
                      ? "Edit Details"
                      : "Fill Now"}
                  </button>
                </td>
              </tr>

              {/* Total Row */}
              <tr className="bg-gray-50/80">
                <td colSpan={4} className="px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md">
                        <span className="text-sm font-bold">B4</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        Gross Total Income (B1+B2+B3)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-indigo-700">
                        ₹
                        {(
                          netSalary +
                          housePropertyIncome +
                          otherSourcesIncome
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note Banner */}
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> If loss, put the figure in negative. To
                avail the benefit of carry forward and set off of losses, please
                use ITR-2.
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
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <span className="font-bold">B1</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Salary Income</h3>
              <p className="text-sm text-gray-500">
                Provide details of your salary components
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel & Go Back
          </button>
        </div>

        {sectionErrors.length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <h4 className="mb-2 text-sm font-bold text-red-900">
                  Please fix the following errors ({sectionErrors.length})
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

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              i. Gross Salary (ia + ib + ic + id + ie)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Gross Salary (ia + ib + ic + id + ie)
              </span>
              <span className="text-lg font-bold text-gray-900">
                ₹{grossSalary.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="mb-6 pt-6 border-t border-gray-100">
            <div className="mb-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                ii. Less allowances to the extent exempt u/s 10
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                (Ensure that it is included in salary income u/s
                17(1)/17(2)/17(3))
              </p>
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

          <div className="mb-8">
            <InputField
              label="iia. Less: Income claimed for relief from taxation u/s 89A"
              name="reliefFromTaxation89A"
              type="number"
              placeholder="0"
              register={register}
              error={errors.reliefFromTaxation89A?.message}
            />
          </div>

          <div className="mb-8 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-indigo-900">
                iii. Net Salary (i - ii - iia)
              </span>
              <span className="text-xl font-bold text-indigo-700">
                ₹{netSalaryBeforeDeductions.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="mb-6 pt-6 border-t border-gray-100">
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                iv. Deductions u/s 16 (iva + ivb + ivc)
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-xs text-gray-500">Max ₹2,500/year</p>
              {(errors.professionalTax?.message ||
                validationErrors.professionalTax) && (
                <p className="text-sm text-red-500">
                  {(errors.professionalTax?.message as string) ||
                    validationErrors.professionalTax}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-bold text-indigo-900">
                Income chargeable under the head 'Salaries'
              </h4>
              <p className="text-sm text-indigo-700">(iii - iv) [B1]</p>
            </div>

            <span className="text-3xl font-bold text-indigo-700">
              ₹{netSalary.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setActiveSection(null)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSectionComplete("salary")}
              className="rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save & Continue
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
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <span className="font-bold">B2</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                House Property
              </h3>
              <p className="text-sm text-gray-500">
                Details of income from house property
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel & Go Back
          </button>
        </div>

        {sectionErrors.length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <h4 className="mb-2 text-sm font-bold text-red-900">
                  Please fix the following errors ({sectionErrors.length})
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

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-8 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Type of House Property
            </label>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={PropertyType.SelfOccupied}
                  {...register("propertyType")}
                  className="h-5 w-5 border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-900">Self-Occupied</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={PropertyType.LetOut}
                  {...register("propertyType")}
                  className="h-5 w-5 border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-900">Let Out</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={PropertyType.DeemedLetOut}
                  {...register("propertyType")}
                  className="h-5 w-5 border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-900">Deemed Let Out</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InputField
              label="iii. Annual Value (i - ii)"
              name="annualValue"
              type="number"
              placeholder="Auto-calculated"
              register={register}
              error={errors.annualValue?.message}
              readOnly={true}
            />

            <InputField
              label="iv. 30% of Annual Value"
              name="standardDeduction30Percent"
              type="number"
              placeholder="Auto-calculated"
              register={register}
              error={errors.standardDeduction30Percent?.message}
              readOnly={true}
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

          <div className="mb-8">
            <InputField
              label="vi. Arrears/Unrealised rent received during the year less 30%"
              name="arrearsUnrealisedRent"
              type="number"
              placeholder="0"
              register={register}
              error={errors.arrearsUnrealisedRent?.message}
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-bold text-indigo-900">
                Income chargeable under the head 'House Property'
              </h4>
              <p className="text-sm text-indigo-700">
                (iii - iv - v) + vi [B2]
              </p>
              <p className="mt-2 text-xs text-red-600 font-medium">
                Note: Maximum loss up to ₹2,00,000 can be set-off. For carry
                forward, use ITR-2.
              </p>
            </div>

            <span className="text-3xl font-bold text-indigo-700">
              ₹{housePropertyIncome.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setActiveSection("salary")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSectionComplete("houseProperty")}
              className="rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Save & Continue
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

    const handleRemoveOtherSource = (id: number) => {
      const fieldPrefix = `otherSource${id}`;
      setValue(`${fieldPrefix}Nature` as any, "");
      setValue(`${fieldPrefix}Description` as any, "");
      setValue(`${fieldPrefix}Amount` as any, "");
    };

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
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
              <span className="font-bold">B3</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Income from Other Sources
              </h3>
              <p className="text-sm text-gray-500">
                Interest, dividends, and other income details
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel & Go Back
          </button>
        </div>

        {sectionErrors.length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <h4 className="mb-2 text-sm font-bold text-red-900">
                  Please fix the following errors ({sectionErrors.length})
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

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">ℹ️</span>
              <div className="text-sm text-blue-900">
                <strong>Instructions:</strong> Select nature of income (e.g.,
                Interest from Savings, Dividend) to provide details. For
                retirement benefits from notified countries u/s 89A, provide
                quarterly breakup.
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Income Details
            </h4>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 w-16">
                      Sl.No.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Nature of Income
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Description (If 'Any Other')
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 w-48">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {otherSourcesData.map((row) => {
                    const isAnyOther = row.nature === "Any Other";
                    const hasSelection = row.nature && row.nature !== "";
                    const fieldPrefix = `otherSource${row.id}`;
                    const descriptionError =
                      validationErrors[`${fieldPrefix}Description`];

                    return (
                      <tr
                        key={row.id}
                        className={hasSelection ? "bg-green-50/50" : "bg-white"}
                      >
                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                          {row.id}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            {...register(`${fieldPrefix}Nature` as any)}
                            className={`w-full rounded-md border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                              hasSelection ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            <option value="">Select Nature of Income</option>
                            <option value="Interest from Savings Account">
                              Interest from Savings Account (u/s 80TTA/TTB
                              eligible)
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
                        <td className="px-4 py-3">
                          {isAnyOther && (
                            <div>
                              <input
                                type="text"
                                {...register(
                                  `${fieldPrefix}Description` as any
                                )}
                                placeholder="Specify nature of income"
                                className={`w-full rounded-md border ${
                                  descriptionError
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                                } px-3 py-1.5 text-sm shadow-sm transition-colors focus:ring-2`}
                              />
                              {descriptionError && (
                                <div className="mt-1 text-xs text-red-600">
                                  {descriptionError}
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {hasSelection && (
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                ₹
                              </span>
                              <input
                                type="number"
                                {...register(`${fieldPrefix}Amount` as any)}
                                placeholder="0"
                                className="w-full rounded-md border-gray-300 pl-7 pr-3 py-1.5 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {hasSelection && (
                            <button
                              type="button"
                              onClick={() => handleRemoveOtherSource(row.id)}
                              className="p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                              title="Remove"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <InputField
              label="Income from retirement benefit account maintained in a country other than notified country u/s 89A"
              name="retirementBenefitNonNotifiedCountry"
              type="number"
              placeholder="0"
              register={register}
              error={errors.retirementBenefitNonNotifiedCountry?.message}
            />
          </div>

          <div className="mb-8 p-4 rounded-xl border border-gray-200 bg-gray-50">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
              Retirement Benefits (Notified Country u/s 89A)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="1. USA"
                name="retirementBenefitUSA"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="2. UK"
                name="retirementBenefitUK"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="3. Canada"
                name="retirementBenefitCanada"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <div className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                Total: ₹{retirementBenefitNotified.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Quarterly Breakup (For Interest Calculation)
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Retirement Benefit Breakup */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h5 className="mb-3 font-semibold text-gray-700 border-b pb-2">
                  Retirement Benefit u/s 89A
                </h5>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">Upto 15-Jun</label>
                    <input
                      type="number"
                      {...register("retirementBenefitQ1")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Jun to 15-Sep
                    </label>
                    <input
                      type="number"
                      {...register("retirementBenefitQ2")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Sep to 15-Dec
                    </label>
                    <input
                      type="number"
                      {...register("retirementBenefitQ3")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Dec to 15-Mar
                    </label>
                    <input
                      type="number"
                      {...register("retirementBenefitQ4")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Mar to 31-Mar
                    </label>
                    <input
                      type="number"
                      {...register("retirementBenefitQ5")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Dividend Breakup */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                  <h5 className="font-semibold text-gray-700">
                    Dividend Income
                  </h5>
                  <span className="text-xs font-bold text-blue-600">
                    Total: ₹{totalDividend.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">Upto 15-Jun</label>
                    <input
                      type="number"
                      {...register("dividendQ1")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Jun to 15-Sep
                    </label>
                    <input
                      type="number"
                      {...register("dividendQ2")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Sep to 15-Dec
                    </label>
                    <input
                      type="number"
                      {...register("dividendQ3")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Dec to 15-Mar
                    </label>
                    <input
                      type="number"
                      {...register("dividendQ4")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <label className="text-xs text-gray-600">
                      16-Mar to 31-Mar
                    </label>
                    <input
                      type="number"
                      {...register("dividendQ5")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-bold text-indigo-900">
                Income chargeable under the head 'Income from Other Sources'
              </h4>
              <p className="text-sm text-indigo-700">
                (iii + iv + v + ... - deductions) [B3]
              </p>
            </div>

            <span className="text-3xl font-bold text-indigo-700">
              ₹{otherSourcesIncome.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setActiveSection("houseProperty")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSectionComplete("otherSources")}
              className="rounded-lg bg-green-600 px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Complete & Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={topRef} className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">
                B
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                Gross Total Income
              </h2>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <strong>Part B:</strong> Provide details of Salary, House
                Property, and Other Sources income.
              </p>
              <p className="text-xs text-gray-500">
                Status of all sections must be 'Completed' to proceed.
              </p>
            </div>
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
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
  helpText,
  readOnly,
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
        readOnly={readOnly}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        } ${errorMessage ? "border-red-400" : "border-gray-300"}`}
        {...register(name)}
      />
      {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default GrossTotalIncome;
