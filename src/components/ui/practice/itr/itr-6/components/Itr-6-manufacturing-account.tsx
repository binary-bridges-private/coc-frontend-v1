import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ManufacturingAccountProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ManufacturingAccount: React.FC<ManufacturingAccountProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const {
    register: registerBase,
    handleSubmit,
    formState: { errors: errorsBase, isSubmitting },
    watch,
  } = form;

  const register = registerBase as any;
  const errors = errorsBase as any;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 3
          </p>
          <h2 className="text-xl font-semibold text-gray-900">Manufacturing Account</h2>
          <p className="text-sm text-gray-600">
            Manufacturing Account for the financial year 2024-25
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to summary
        </button>
      </div>

      <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-blue-900">
              Manufacturing Account Instructions
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>Note:</strong> Fill all items 1 to 3 in a case where regular books of account of business or profession are maintained, otherwise fill items 62 to 66 as applicable.
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Opening and closing inventory details required</li>
                <li>All manufacturing expenses to be included</li>
                <li>Totals will be auto-calculated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {(() => {
          const relevantErrors = Object.entries(errors).filter(([fieldName]) => {
            return true;
          });

          if (relevantErrors.length === 0) return null;

          return (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-red-900">
                    ⚠️ Please fix the following errors ({relevantErrors.length} field{relevantErrors.length > 1 ? 's' : ''})
                  </h3>
                  <ul className="space-y-1 text-sm text-red-800">
                    {relevantErrors.map(([fieldName, error]: [string, any]) => {
                      const message = error?.message || 'This field is required';
                      return (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1').trim()}:</strong> {message}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            1. Debits to Manufacturing Account
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. Opening Inventory
              </h4>
              <div className="space-y-2">
                <InputField
                  label="i. Opening stock of raw material"
                  name="openingRawMaterial"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.openingRawMaterial?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. Opening Stock of Work in progress
              </h4>
              <div className="space-y-2">
                <InputField
                  label="ii. Opening stock of Work in progress"
                  name="openingWorkInProgress"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.openingWorkInProgress?.message}
                />
                <div className="rounded-md bg-blue-50 p-2">
                  <div className="text-xs font-medium text-gray-800">
                    iii. Total (i + ii) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        ["openingRawMaterial", "openingWorkInProgress"],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                C. Purchases
              </h4>
              <div className="space-y-2">
                <InputField
                  label="B. Purchases (net of refunds and duty or tax, if any)"
                  name="purchases"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.purchases?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Direct Wages
              </h4>
              <div className="space-y-2">
                <InputField
                  label="C. Direct wages"
                  name="directWages"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.directWages?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                E. Direct Expenses
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    D. Direct expenses (Di + Dii + Diii)
                  </label>
                  <div className="ml-4 space-y-2 border-l-2 border-gray-300 pl-4">
                    <InputField
                      label="i. Carriage inward"
                      name="carriageInward"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.carriageInward?.message}
                    />
                    <InputField
                      label="ii. Power and fuel"
                      name="powerAndFuel"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.powerAndFuel?.message}
                    />
                    <InputField
                      label="iii. Other direct expenses"
                      name="otherDirectExpenses"
                      type="number"
                      placeholder="Amount"
                      register={register}
                      error={errors.otherDirectExpenses?.message}
                    />
                    <div className="rounded-md bg-blue-50 p-2">
                      <div className="text-xs font-medium text-gray-800">
                        Total (i + ii + iii) =
                        <span className="ml-2 font-semibold text-blue-600">
                          {calculateTotal(
                            [
                              "carriageInward",
                              "powerAndFuel",
                              "otherDirectExpenses",
                            ],
                            watch
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                F. Factory Overheads
              </h4>
              <div className="space-y-2">
                <InputField
                  label="i. Indirect wages"
                  name="indirectWages"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.indirectWages?.message}
                />
                <InputField
                  label="ii. Factory rent and rates"
                  name="factoryRent"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.factoryRent?.message}
                />
                <InputField
                  label="iii. Factory Insurance"
                  name="factoryInsurance"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.factoryInsurance?.message}
                />
                <InputField
                  label="iv. Factory fuel and power"
                  name="factoryFuelPower"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.factoryFuelPower?.message}
                />
                <InputField
                  label="v. Factory general expenses"
                  name="factoryGeneralExpenses"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.factoryGeneralExpenses?.message}
                />
                <InputField
                  label="vi. Depreciation of factory machinery"
                  name="factoryDepreciation"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.factoryDepreciation?.message}
                />
                <div className="rounded-md bg-blue-50 p-2">
                  <div className="text-xs font-medium text-gray-800">
                    vii. Total (i+ii+iii+iv+v+vi) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        [
                          "indirectWages",
                          "factoryRent",
                          "factoryInsurance",
                          "factoryFuelPower",
                          "factoryGeneralExpenses",
                          "factoryDepreciation",
                        ],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-green-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                F. Total of Debits to Manufacturing Account (Aiii+B+C+D+E+Fvii) =
                <span className="ml-2 font-semibold text-green-600">
                  {calculateTotal(
                    [
                      "openingRawMaterial",
                      "openingWorkInProgress",
                      "purchases",
                      "directWages",
                      "carriageInward",
                      "powerAndFuel",
                      "otherDirectExpenses",
                      "indirectWages",
                      "factoryRent",
                      "factoryInsurance",
                      "factoryFuelPower",
                      "factoryGeneralExpenses",
                      "factoryDepreciation",
                    ],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            2. Closing Stock
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <div className="space-y-2">
                <InputField
                  label="i. Raw material"
                  name="closingRawMaterial"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.closingRawMaterial?.message}
                />
                <InputField
                  label="ii. Work in progress"
                  name="closingWorkInProgress"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.closingWorkInProgress?.message}
                />
                <div className="rounded-md bg-blue-50 p-2">
                  <div className="text-xs font-medium text-gray-800">
                    Total (2i + 2ii) =
                    <span className="ml-2 font-semibold text-blue-600">
                      {calculateTotal(
                        ["closingRawMaterial", "closingWorkInProgress"],
                        watch
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-green-50 p-3">
              <div className="text-sm font-medium text-gray-800">
                3. Cost of Goods Produced - transferred to Trading Account (IF-2) =
                <span className="ml-2 font-semibold text-green-600">
                  {(() => {
                    const totalDebits = calculateTotal(
                      [
                        "openingRawMaterial",
                        "openingWorkInProgress",
                        "purchases",
                        "directWages",
                        "carriageInward",
                        "powerAndFuel",
                        "otherDirectExpenses",
                        "indirectWages",
                        "factoryRent",
                        "factoryInsurance",
                        "factoryFuelPower",
                        "factoryGeneralExpenses",
                        "factoryDepreciation",
                      ],
                      watch
                    );
                    const totalClosing = calculateTotal(
                      ["closingRawMaterial", "closingWorkInProgress"],
                      watch
                    );
                    return totalDebits - totalClosing;
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </section>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  placeholder,
  type = "text",
  maxLength,
  helperText,
}) => {
  if (!label) {
    return (
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name as any)}
      />
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name as any)}
      />
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

// Helper function to calculate totals
function calculateTotal(fieldNames: string[], watch: any): number {
  return fieldNames.reduce((sum, fieldName) => {
    const value = parseFloat(watch(fieldName) || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
}

export default ManufacturingAccount;
