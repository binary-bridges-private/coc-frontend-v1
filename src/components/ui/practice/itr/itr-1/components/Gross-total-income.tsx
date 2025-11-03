import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { grossTotalIncomeSchema } from "../itr-1.validation.ts";

interface GrossTotalIncomeProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

type IncomeSection = "salary" | "houseProperty" | "otherSources";

const GrossTotalIncome: React.FC<GrossTotalIncomeProps> = ({ form, onSubmit, onCancel }) => {
  const [activeSection, setActiveSection] = useState<IncomeSection | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const handleFormSubmit = async (values: any) => {
    try {
      // Validate using Zod schema
      const validatedData = await grossTotalIncomeSchema.parseAsync(values);
      setValidationErrors({});
      onSubmit(validatedData);
    } catch (error: any) {
      if (error.errors) {
        const errorMap: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path) {
            errorMap[err.path.join(".")] = err.message;
          }
        });
        setValidationErrors(errorMap);
      }
    }
  };

  const salaryValues = watch([
    "salarySection17_1",
    "perquisitesSection17_2",
    "profitSection17_3",
    "houseRentAllowance",
    "standardDeduction16",
    "professionalTax",
  ]);

  const calculateNetSalary = () => {
    const toNumber = (val: any) => {
      if (typeof val === "number") return val;
      const parsed = parseFloat(val || "0");
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    const salary = toNumber(salaryValues[0]);
    const perquisites = toNumber(salaryValues[1]);
    const profits = toNumber(salaryValues[2]);
    const hra = toNumber(salaryValues[3]);
    const stdDeduction = toNumber(salaryValues[4]);
    const profTax = toNumber(salaryValues[5]);

    const grossSalary = salary + perquisites + profits - hra;
    const netSalary = grossSalary - stdDeduction - profTax;
    return { grossSalary, netSalary };
  };

  const { grossSalary, netSalary } = calculateNetSalary();

  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    salary: false,
    houseProperty: false,
    otherSources: false,
  });

  const handleSectionComplete = (section: IncomeSection) => {
    setCompletedSections(prev => ({ ...prev, [section]: true }));
    // Move to next section automatically
    if (section === "salary") {
      setActiveSection("houseProperty");
    } else if (section === "houseProperty") {
      setActiveSection("otherSources");
    } else {
      setActiveSection(null);
    }
  };

  const renderSummary = () => (
    <div className="space-y-4">
      <div className="border border-gray-300 bg-white">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 p-3 font-medium">
                <div className="flex items-center justify-between">
                  <span>B1 - Salary Income</span>
                  {completedSections.salary && <span className="text-green-600">✓</span>}
                </div>
              </td>
              <td className="p-3 text-right">₹{netSalary.toLocaleString("en-IN")}</td>
              <td className="border-l border-gray-300 p-3 text-center">
                <button
                  type="button"
                  onClick={() => setActiveSection("salary")}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {completedSections.salary ? "Edit" : "Fill"}
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 p-3 font-medium">
                <div className="flex items-center justify-between">
                  <span>B2 - House Property</span>
                  {completedSections.houseProperty && <span className="text-green-600">✓</span>}
                </div>
              </td>
              <td className="p-3 text-right">₹0</td>
              <td className="border-l border-gray-300 p-3 text-center">
                <button
                  type="button"
                  onClick={() => setActiveSection("houseProperty")}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {completedSections.houseProperty ? "Edit" : "Fill"}
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="border-r border-gray-300 p-3 font-medium">
                <div className="flex items-center justify-between">
                  <span>B3 - Other Sources</span>
                  {completedSections.otherSources && <span className="text-green-600">✓</span>}
                </div>
              </td>
              <td className="p-3 text-right">₹0</td>
              <td className="border-l border-gray-300 p-3 text-center">
                <button
                  type="button"
                  onClick={() => setActiveSection("otherSources")}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {completedSections.otherSources ? "Edit" : "Fill"}
                </button>
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border-r border-gray-300 p-3 font-bold">B4 - Gross Total Income (B1+B2+B3)</td>
              <td className="p-3 text-right font-bold">₹{netSalary.toLocaleString("en-IN")}</td>
              <td className="border-l border-gray-300 p-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border border-gray-300 bg-yellow-50 p-3 text-sm">
        <strong>Note:</strong> (If loss, put the figure in negative). To avail the benefit of carry forward and set of loss, please use ITR-2
      </div>
    </div>
  );

  const renderSalarySection = () => (
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

      <div className="border border-gray-300 bg-white p-4">
        <div className="mb-3 bg-gray-100 p-2 font-semibold">
          i. Gross Salary (ia + ib + ic + id + ie)
        </div>

        {/* 2 columns layout for main salary components */}
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

        {/* 3 columns for additional components */}
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
          <strong>Gross Salary (ia + ib + ic + id + ie):</strong> ₹{grossSalary.toLocaleString("en-IN")}
        </div>

        {/* ii. Less allowances to the extent exempt u/s 10 */}
        <div className="mb-4">
          <div className="mb-2 font-medium text-gray-900">
            ii. Less allowances to the extent exempt u/s 10 <span className="text-sm italic text-gray-600">(drop down to be provided in e-filing utility)</span>
          </div>
          <div className="mb-2 rounded border border-blue-300 bg-blue-50 p-2 text-xs italic text-gray-700">
            (Ensure that it is included in salary income u/s 17(1)/17(2)/17(3))
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

        {/* iia. Less: Income claimed for relief from taxation u/s 89A */}
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

        <div className="border-t border-gray-300 pt-2 mb-4 bg-gray-50 p-2">
          <strong>iii. Net Salary (i - ii - iia):</strong> ₹{netSalary.toLocaleString("en-IN")}
        </div>

        <div className="mb-3 bg-gray-100 p-2 font-semibold">
          iv. Deductions u/s 16 (iva + ivb + ivc)
        </div>

        {/* 3 columns for deductions under section 16 */}
        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="a. Standard deduction (iva)"
            name="standardDeduction16"
            type="number"
            placeholder="50000"
            register={register}
            error={errors.standardDeduction16?.message || validationErrors.standardDeduction16}
          />

          <InputField
            label="b. Entertainment allowance (ivb)"
            name="entertainmentAllowance"
            type="number"
            placeholder="0"
            register={register}
            error={errors.entertainmentAllowance?.message}
          />

          <InputField
            label="c. Professional tax (ivc)"
            name="professionalTax"
            type="number"
            placeholder="0"
            register={register}
            error={errors.professionalTax?.message || validationErrors.professionalTax}
          />
        </div>

        <div className="mt-4 border border-gray-400 bg-yellow-50 p-3">
          <strong>v. Income chargeable under the head 'Salaries' (iii - iv) [B1]:</strong> ₹{netSalary.toLocaleString("en-IN")}
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

  const renderHousePropertySection = () => (
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

      <div className="border border-gray-300 bg-white p-4">
        <div className="mb-3">
          <label className="mb-2 block font-medium">Tick applicable option</label>
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

        {/* 2 columns for main property values */}
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

        {/* 3 columns for calculated values and deductions */}
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

        {/* Single column for arrears */}
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
          <strong>vii. Income chargeable under the head 'House Property' (iii - iv - v) + vi [B2]</strong>
          <p className="mt-1 text-sm">(If loss, put the figure in negative)</p>
          <p className="mt-1 text-xs text-red-700">
            <strong>Note:</strong> Maximum loss from House Property that can be set-off is INR 2,00,000. To avail the benefit of carry forward and set of loss, please use ITR-2
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

  const renderOtherSourcesSection = () => {
    const toNumber = (val: any) => {
      if (typeof val === "number") return val;
      const parsed = parseFloat(val || "0");
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    // Watch all other source fields
    const otherSourcesData = [
      {
        id: 1,
        nature: watch("otherSource1Nature") || '',
        description: watch("otherSource1Description") || '',
        amount: watch("otherSource1Amount") || '',
      },
      {
        id: 2,
        nature: watch("otherSource2Nature") || '',
        description: watch("otherSource2Description") || '',
        amount: watch("otherSource2Amount") || '',
      },
      {
        id: 3,
        nature: watch("otherSource3Nature") || '',
        description: watch("otherSource3Description") || '',
        amount: watch("otherSource3Amount") || '',
      },
      {
        id: 4,
        nature: watch("otherSource4Nature") || '',
        description: watch("otherSource4Description") || '',
        amount: watch("otherSource4Amount") || '',
      },
    ];

    // Calculate totals
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

      <div className="border border-gray-300 bg-white p-4">
        <div className="mb-4 border border-blue-300 bg-blue-50 p-2 text-xs italic">
          <strong>Income from Other Sources</strong> (drop down like interest from saving account, deposit etc. to be provided in e-filing utility specifying nature of income and in case of dividend income and Income from retirement benefit account maintained in a notified country u/s 89A, please mention quarterly breakup for allowing applicable relief from section 234C)
        </div>

        {/* Income from Other Sources - Table with multiple rows */}
        <div className="mb-4">
          <div className="mb-2 font-medium text-gray-900">Income from Other Sources</div>
          <table className="w-full border-2 border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900 w-12">Sl.No.</th>
                <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900">Nature of Income</th>
                <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900">Description (If 'Any Other' selected)</th>
                <th className="border border-gray-400 p-2 text-left text-sm font-semibold text-gray-900 w-40">Amount</th>
              </tr>
            </thead>
            <tbody>
              {otherSourcesData.map((row) => {
                const isAnyOther = row.nature === 'Any Other';
                const hasSelection = row.nature && row.nature !== '';
                const fieldPrefix = `otherSource${row.id}`;
                const descriptionError = validationErrors[`${fieldPrefix}Description`];
                
                return (
                  <tr key={row.id} className={hasSelection ? "bg-green-100" : "bg-white"}>
                    <td className="border border-gray-400 p-2 text-center font-medium text-gray-900">{row.id}</td>
                    <td className="border border-gray-400 p-2">
                      <select 
                        {...register(`${fieldPrefix}Nature` as any)}
                        className={`w-full border-0 bg-transparent p-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          hasSelection ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        <option value="">(Select)</option>
                        <option value="Interest from Savings Account">Interest from Savings Account</option>
                        <option value="Interest from Fixed Deposit">Interest from Fixed Deposit</option>
                        <option value="Interest from Company Deposit">Interest from Company Deposit</option>
                        <option value="Interest from Other Deposit">Interest from Other Deposit</option>
                        <option value="Dividend Income">Dividend Income</option>
                        <option value="Any Other">Any Other</option>
                      </select>
                    </td>
                    <td className={`border border-gray-400 p-2 ${isAnyOther ? 'bg-yellow-50' : 'bg-gray-100'}`}>
                      {isAnyOther ? (
                        <div>
                          <input
                            type="text"
                            {...register(`${fieldPrefix}Description` as any)}
                            placeholder="Enter description..."
                            className={`w-full border ${descriptionError ? 'border-red-500' : 'border-gray-300'} bg-white p-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          {descriptionError && (
                            <div className="mt-1 text-xs text-red-600">{descriptionError}</div>
                          )}
                        </div>
                      ) : null}
                    </td>
                    <td className={`border border-gray-400 p-2 ${hasSelection ? 'bg-green-200' : 'bg-gray-100'}`}>
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
            * Select nature of income to enable amount entry. For "Any Other", description is mandatory.
          </div>
        </div>

        {/* Retirement benefit - non-notified country */}
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

        {/* Retirement benefit - notified countries */}
        <div className="mb-4">
          <div className="mb-2 font-medium">
            Income from retirement benefit account maintained in a notified country u/s 89A (1 + 2 + 3)
          </div>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Country</th>
                <th className="border border-gray-300 p-2 text-left w-48">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">1. United States of America</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitUSA")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">2. United Kingdom of Great Britain and Northern Ireland</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitUK")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">3. Canada</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitCanada")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-1 text-sm font-medium">Total: ₹{retirementBenefitNotified.toLocaleString("en-IN")}</div>
        </div>

        {/* Quarterly breakup for retirement benefit */}
        <div className="mb-4">
          <div className="mb-2 font-medium">
            Income from retirement benefit account maintained in a notified country u/s 89A (Quarterly breakup of Taxable Portion)
          </div>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">i. Upto 15-Jun-2024</td>
                <td className="border border-gray-300 bg-green-100 p-2 w-48">
                  <input
                    type="number"
                    {...register("retirementBenefitQ1")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 p-2">ii. From 16-Jun-2024 to 15-Sep-2024</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitQ2")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">iii. From 16-Sep-2024 to 15-Dec-2024</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitQ3")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">iv. From 16-Dec-2024 to 15-Mar-2025</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitQ4")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">v. From 16-Mar-2025 to 31-Mar-2025</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("retirementBenefitQ5")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dividend quarterly breakup */}
        <div className="mb-4">
          <div className="mb-2 font-medium">Dividend (i+ii+iii+iv+v)</div>
          <table className="w-full border border-gray-300">
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">i. Upto 15-Jun-2024</td>
                <td className="border border-gray-300 bg-green-100 p-2 w-48">
                  <input
                    type="number"
                    {...register("dividendQ1")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">ii. From 16-Jun-2024 to 15-Sep-2024</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("dividendQ2")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">iii. From 16-Sep-2024 to 15-Dec-2024</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("dividendQ3")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">iv. From 16-Dec-2024 to 15-Mar-2025</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("dividendQ4")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 p-2">v. From 16-Mar-2025 to 31-Mar-2025</td>
                <td className="border border-gray-300 bg-green-100 p-2">
                  <input
                    type="number"
                    {...register("dividendQ5")}
                    className="w-full border-0 bg-transparent p-1"
                    placeholder="0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-1 text-sm font-medium">Total Dividend: ₹{totalDividend.toLocaleString("en-IN")}</div>
        </div>

        {/* Deductions */}
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
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-gray-400 pb-2">
        <div>
          <h2 className="text-xl font-bold">PART B - GROSS TOTAL INCOME</h2>
          <p className="text-sm text-gray-600">Whole-Rupee (₹) only</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          Back to summary
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {!activeSection && renderSummary()}
        {activeSection === "salary" && renderSalarySection()}
        {activeSection === "houseProperty" && renderHousePropertySection()}
        {activeSection === "otherSources" && renderOtherSourcesSection()}

        {!activeSection && completedSections.salary && completedSections.houseProperty && completedSections.otherSources && (
          <div className="mt-4 flex justify-end border-t border-gray-300 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 px-8 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit & Continue"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

// Reusable Components
interface SectionCardProps {
  title: string;
  description: string;
  amount: number;
  icon: string;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, amount, icon, onClick }) => (
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
      <p className="text-xs text-gray-500">Income</p>
      <p className="text-lg font-bold text-gray-900">₹{amount.toLocaleString("en-IN")}</p>
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

interface SelectFieldProps {
  label: string;
  name: string;
  register: any;
  error?: string | any;
  options: Array<{ label: string; value: string }>;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, register, error, options }) => {
  const errorMessage = typeof error === "string" ? error : error?.message;
  
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          errorMessage ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default GrossTotalIncome;