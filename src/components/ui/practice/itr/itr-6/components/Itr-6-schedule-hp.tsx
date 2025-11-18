import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleHPProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleHP: React.FC<ScheduleHPProps> = ({
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

  const numProperties = watch("numProperties") || 1;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Schedule HP
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Income from House Property
          </h2>
          <p className="text-sm text-gray-600">
            Details of income from house property (Please refer instructions)
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
              Schedule HP Instructions
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>Note:</strong> Furnishing of PAN/Aadhaar No. of tenant is mandatory if tax is deducted under section 194 IB.
                Furnishing of PAN/Aadhaar No. of owner is mandatory if tax is deducted under section 194 I.
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Enter details of all properties (owned/co-owned/leased)</li>
                <li>Co-owner percentage share must be provided</li>
                <li>Provide tenant details if TDS credit is claimed</li>
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
                    ⚠️ Please fix the following errors (
                    {relevantErrors.length} field
                    {relevantErrors.length > 1 ? "s" : ""})
                  </h3>
                  <ul className="space-y-1 text-sm text-red-800">
                    {relevantErrors.map(([fieldName, error]: [string, any]) => {
                      const message = error?.message || "This field is required";
                      return (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">
                              {fieldName
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                              :
                            </strong>{" "}
                            {message}
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

        {/* Number of Properties */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Property Count
          </h3>

          <div className="rounded-md border border-gray-300 bg-white p-4">
            <InputField
              label="Number of properties"
              name="numProperties"
              type="number"
              placeholder="Enter number of properties"
              register={register}
              error={errors.numProperties?.message}
            />
          </div>
        </div>

        {/* Properties Details */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Property Details
          </h3>

          {Array.from({ length: Math.min(numProperties, 5) }).map(
            (_, index) => (
              <div
                key={index}
                className="space-y-4 rounded-lg border border-gray-300 bg-white p-4"
              >
                <h4 className="font-medium text-gray-800">
                  Property {index + 1}
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InputField
                    label="Address of property"
                    name={`property_${index}_address`}
                    type="text"
                    placeholder="Enter property address"
                    register={register}
                    error={errors[`property_${index}_address`]?.message}
                  />

                  <InputField
                    label="Town/City"
                    name={`property_${index}_city`}
                    type="text"
                    placeholder="Town or City"
                    register={register}
                    error={errors[`property_${index}_city`]?.message}
                  />

                  <InputField
                    label="County/Province"
                    name={`property_${index}_province`}
                    type="text"
                    placeholder="County or Province"
                    register={register}
                    error={errors[`property_${index}_province`]?.message}
                  />

                  <InputField
                    label="Country"
                    name={`property_${index}_country`}
                    type="text"
                    placeholder="Country"
                    register={register}
                    error={errors[`property_${index}_country`]?.message}
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h5 className="mb-3 font-medium text-gray-700">
                    Ownership Details
                  </h5>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register(`property_${index}_ownership`)}
                          value="owned"
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">Owned</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register(`property_${index}_ownership`)}
                          value="coOwned"
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">Co-owned</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register(`property_${index}_ownership`)}
                          value="leased"
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">Leased</span>
                      </label>
                    </div>

                    {watch(`property_${index}_ownership`) === "coOwned" && (
                      <>
                        <InputField
                          label="Assessees percentage of share in the property %"
                          name={`property_${index}_assesseeShare`}
                          type="number"
                          placeholder="0-100"
                          register={register}
                          error={
                            errors[`property_${index}_assesseeShare`]?.message
                          }
                        />

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Co-owner Details
                          </label>
                          <div className="space-y-2">
                            <InputField
                              label="Name of other Co-owner(s)"
                              name={`property_${index}_coOwnerName`}
                              type="text"
                              placeholder="Enter co-owner name"
                              register={register}
                              error={
                                errors[`property_${index}_coOwnerName`]?.message
                              }
                            />
                            <InputField
                              label="PAN/Aadhaar No. of Co-owner"
                              name={`property_${index}_coOwnerPAN`}
                              type="text"
                              placeholder="PAN or Aadhaar No."
                              register={register}
                              error={
                                errors[`property_${index}_coOwnerPAN`]?.message
                              }
                            />
                            <InputField
                              label="Percentage Share in Property (%)"
                              name={`property_${index}_coOwnerShare`}
                              type="number"
                              placeholder="0-100"
                              register={register}
                              error={
                                errors[`property_${index}_coOwnerShare`]?.message
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Tenant Details */}
                <div className="border-t border-gray-200 pt-4">
                  <h5 className="mb-3 font-medium text-gray-700">
                    Tenant Details (If applicable)
                  </h5>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register(`property_${index}_tenantStatus`)}
                          value="let"
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">Let out</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          {...register(`property_${index}_tenantStatus`)}
                          value="deemedLetOut"
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-gray-700">
                          Deemed let out
                        </span>
                      </label>
                    </div>

                    {(watch(`property_${index}_tenantStatus`) === "let" ||
                      watch(`property_${index}_tenantStatus`) ===
                        "deemedLetOut") && (
                      <>
                        <InputField
                          label="Name of Tenant(s) (if let out)"
                          name={`property_${index}_tenantName`}
                          type="text"
                          placeholder="Tenant name"
                          register={register}
                          error={
                            errors[`property_${index}_tenantName`]?.message
                          }
                        />
                        <InputField
                          label="PAN/Aadhaar No. of Tenant(s)"
                          name={`property_${index}_tenantPAN`}
                          type="text"
                          placeholder="PAN or Aadhaar No."
                          register={register}
                          error={
                            errors[`property_${index}_tenantPAN`]?.message
                          }
                        />
                        <p className="text-xs text-gray-500">
                          (Please note if TDS credit is claimed)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Income Calculation - Property 1 */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Income Calculation Section
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                A. Gross rent received or receivable and rent not due
              </h4>
              <div className="space-y-2">
                <div className="rounded-md bg-blue-50 p-2 text-xs text-gray-700">
                  Higher of the rent of the year, lower of the two if let out in the part of the year
                </div>
                <InputField
                  label="1a. Gross rent received or receivable and rent not due"
                  name="grossRent"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.grossRent?.message}
                />
              </div>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                B. Rent which cannot be realized
              </h4>
              <InputField
                label="1b. Rent which cannot be realized"
                name="rentUnrealized"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.rentUnrealized?.message}
              />
            </div>

            <div className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-gray-800">
              C. Total (1b + 1c) =
              <span className="ml-2 font-semibold text-yellow-600">
                {calculateTotal(["grossRent", "rentUnrealized"], watch)}
              </span>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                D. Tax paid to local authorities
              </h4>
              <InputField
                label="1d. Tax paid to local authorities"
                name="taxLocalAuthorities"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.taxLocalAuthorities?.message}
              />
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm font-medium text-gray-800">
              E. Total (1b + 1c) =
              <span className="ml-2 font-semibold text-blue-600">
                {calculateTotal(["grossRent", "rentUnrealized"], watch)}
              </span>
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1f. Annual value (1a - 1d)
              </h4>
              <InputField
                label="1f. Annual value (1a - 1d)"
                name="annualValue"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.annualValue?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1g. Annual value of the property owned (gross percentage share x 1e)
              </h4>
              <InputField
                label="1g. Annual value of the property owned"
                name="annualValuePercentage"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.annualValuePercentage?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1g*. 30% of 1f
              </h4>
              <InputField
                label="1g*. 30% of 1f"
                name="thirtyPercentOf1f"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.thirtyPercentOf1f?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1h. Interest payable on borrowed capital
              </h4>
              <div className="space-y-2">
                <div className="rounded-md bg-blue-50 p-2 text-xs text-gray-700">
                  (Details are to be filled in the drop down to be provided in e-Filing utility)
                </div>
                <InputField
                  label="1h. Interest payable on borrowed capital"
                  name="interestBorrowedCapital"
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors.interestBorrowedCapital?.message}
                />
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm font-medium text-gray-800">
              1i. Total (1g + 1h) =
              <span className="ml-2 font-semibold text-blue-600">
                {calculateTotal(
                  ["thirtyPercentOf1f", "interestBorrowedCapital"],
                  watch
                )}
              </span>
            </div>

            <div className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-gray-800">
              1j. Arrears/Unrealised rent received during the year less 30% =
              <span className="ml-2 font-semibold text-yellow-600">
                {(() => {
                  const unrealized = parseFloat(watch("rentUnrealized") || 0);
                  return unrealized * 0.7;
                })()}
              </span>
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              1k. Income from house property 1 (if - 1i + 1j) =
              <span className="ml-2 font-semibold text-green-600">
                {(() => {
                  const annualVal = parseFloat(watch("annualValue") || 0);
                  const deductions = calculateTotal(
                    ["thirtyPercentOf1f", "interestBorrowedCapital"],
                    watch
                  );
                  const arrears =
                    (parseFloat(watch("rentUnrealized") || 0) * 0.7) || 0;
                  return annualVal - deductions + arrears;
                })()}
              </span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            2. Summary
          </h3>

          <div className="space-y-4">
            <div className="rounded-md bg-blue-50 p-3 text-sm text-gray-800">
              Pass through Income Loss if any *
            </div>

            <InputField
              label="2. Income loss"
              name="incomeLoss"
              type="number"
              placeholder="Amount"
              register={register}
              error={errors.incomeLoss?.message}
            />

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Income under the head "Income from House property" (2 IK + 2)
              </h4>
              <div className="rounded-md bg-yellow-50 p-2 text-sm font-medium text-gray-800">
                3. Income under the head "Income from house property" (2 IK + Z)
                <span className="ml-2 font-semibold text-yellow-600">
                  {(() => {
                    const annualVal = parseFloat(watch("annualValue") || 0);
                    const deductions = calculateTotal(
                      ["thirtyPercentOf1f", "interestBorrowedCapital"],
                      watch
                    );
                    const arrears =
                      (parseFloat(watch("rentUnrealized") || 0) * 0.7) || 0;
                    const incomeLoss1k = annualVal - deductions + arrears;
                    const loss = parseFloat(watch("incomeLoss") || 0);
                    return incomeLoss1k + loss;
                  })()}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-gray-100 p-3 text-xs text-gray-600">
              (Fill up details separately for each property)
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

export default ScheduleHP;
