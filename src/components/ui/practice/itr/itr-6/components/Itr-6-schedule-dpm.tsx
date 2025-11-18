import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleDPMProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleDPM: React.FC<ScheduleDPMProps> = ({
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

  // Watch for number of asset blocks (max 20)
  const assetCount = Math.min(parseInt(watch("assetBlockCount") || "1"), 20);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Schedule DPM
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Depreciation on Plant and Machinery
          </h2>
          <p className="text-sm text-gray-600">
            Depreciation on Plant and Machinery (Other than assets on which full capital expenditure is allowable as deduction under any other section)
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

        {/* Asset Block Count Selector */}
        <div className="rounded-lg border border-gray-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Asset Blocks Configuration
          </h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              How many asset blocks do you want to add? (Max 20)
            </label>
            <select
              {...register("assetBlockCount", {
                required: "Please select number of asset blocks",
              })}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select...</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {errors.assetBlockCount && (
              <p className="text-sm text-red-500">
                {errors.assetBlockCount.message}
              </p>
            )}
          </div>
        </div>

        {/* Asset Blocks */}
        {Array.from({ length: assetCount }).map((_, blockIndex) => (
          <div
            key={blockIndex}
            className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Asset Block {blockIndex + 1}
            </h3>

            <div className="space-y-4">
              {/* Block of Assets */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  1. Block of assets
                </h4>
                <select
                  {...register(`block_${blockIndex}_blockOfAssets` as any, {
                    required: "Please select block of assets",
                  })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select block of assets</option>
                  <option value="A">A - Building</option>
                  <option value="B">B - Plant and Machinery</option>
                  <option value="C">C - Furniture and Fittings</option>
                  <option value="D">D - Motor Vehicles</option>
                  <option value="E">E - Other Assets</option>
                </select>
                {errors[`block_${blockIndex}_blockOfAssets`] && (
                  <p className="text-sm text-red-500">
                    {errors[`block_${blockIndex}_blockOfAssets`]?.message}
                  </p>
                )}
              </div>

              {/* Rate (%) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">2. Rate (%)</h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_rate`}
                  type="number"
                  placeholder="Enter rate (%)"
                  register={register}
                  error={errors[`block_${blockIndex}_rate`]?.message}
                />
              </div>

              {/* Written Down Value on the first day of previous year */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  3a. Written down value on the first day of previous year
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_wdvFirstDay`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors[`block_${blockIndex}_wdvFirstDay`]?.message}
                />
              </div>

              {/* Addition at cost of previous year */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  3b. Addition at cost of previous year
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_additionCost`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors[`block_${blockIndex}_additionCost`]?.message}
                />
              </div>

              {/* Adjustment as per second proviso to sub-section (1) of section 43BA */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  3c. Adjustment as per second proviso to sub-section (1) of section 43BA (Refer to rule 3)
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_adjustment43BA`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_adjustment43BA`]?.message
                  }
                />
              </div>

              {/* Total 3a + 3b */}
              <div className="rounded-md bg-blue-50 p-2 text-sm font-medium text-gray-800">
                Total (3a + 3b) =
                <span className="ml-2 font-semibold text-blue-600">
                  {calculateTotal(
                    [
                      `block_${blockIndex}_wdvFirstDay`,
                      `block_${blockIndex}_additionCost`,
                    ],
                    watch
                  )}
                </span>
              </div>

              {/* Additions for a period of 180 days or more in the previous year */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  4. Additions for a period of 180 days or more in the previous year
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_additions180Days`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_additions180Days`]?.message
                  }
                />
              </div>

              {/* Consideration or other realization during the previous year out of 3 (a) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  5. Consideration or other realization during the previous year out of 3 (a)
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_considerationRealization`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_considerationRealization`]
                      ?.message
                  }
                />
              </div>

              {/* Amount on which depreciation at half rate to be allowed (3 + 4 - 5) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  6. Amount on which depreciation at half rate to be allowed (3 + 4 - 5)
                  <span className="text-xs text-gray-600 block mt-1">If result is negative, enter 0</span>
                </h4>
                <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                  Amount =
                  <span className="ml-2 font-semibold text-green-600">
                    {Math.max(
                      0,
                      calculateTotal(
                        [
                          `block_${blockIndex}_wdvFirstDay`,
                          `block_${blockIndex}_additionCost`,
                          `block_${blockIndex}_additions180Days`,
                        ],
                        watch
                      ) - (parseFloat(watch(`block_${blockIndex}_considerationRealization`) || 0))
                    )}
                  </span>
                </div>
              </div>

              {/* Consideration or other realization during the year out of 3 */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  7. Consideration or other realizations during the year out of 3 (other than 5)
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_considerationOther`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_considerationOther`]?.message
                  }
                />
              </div>

              {/* Amount on which depreciation at half rate to be allowed (7 - 8) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  8. Amount on which depreciation at half rate to be allowed (7 - 8)
                  <span className="text-xs text-gray-600 block mt-1">If result is negative, enter 0</span>
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_halfRateAmount`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={errors[`block_${blockIndex}_halfRateAmount`]?.message}
                />
              </div>

              {/* Depreciation on 9 at half rate */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  9. Depreciation on 9 at half rate
                </h4>
                <div className="rounded-md bg-yellow-50 p-2 text-sm font-medium text-gray-800">
                  Depreciation (9 × rate ÷ 2 ÷ 100) =
                  <span className="ml-2 font-semibold text-yellow-600">
                    {(
                      (parseFloat(watch(`block_${blockIndex}_halfRateAmount`) || 0) *
                        parseFloat(watch(`block_${blockIndex}_rate`) || 0) /
                        2 /
                        100)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Additional depreciation, if any, on */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  10. Additional depreciation, if any, on
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_additionalDepreciation`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_additionalDepreciation`]
                      ?.message
                  }
                />
              </div>

              {/* Additional depreciation, if any, on B */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  11. Additional depreciation, if any, on B
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_additionalDepreciationB`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_additionalDepreciationB`]
                      ?.message
                  }
                />
              </div>

              {/* Additional depreciation relating to immediately preceding year on asset put to use for less than 180 days */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  12. Additional depreciation relating to immediately preceding year on asset put to use for less than 180 days
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_addDepreciation180Days`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_addDepreciation180Days`]
                      ?.message
                  }
                />
              </div>

              {/* Total depreciation (10 + 11 + 12 + 13 + 14) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  13. Total depreciation
                  (10 + 11 + 12 + 13 + 14)
                </h4>
                <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                  Total depreciation =
                  <span className="ml-2 font-semibold text-green-600">
                    {calculateTotal(
                      [
                        `block_${blockIndex}_additionalDepreciation`,
                        `block_${blockIndex}_additionalDepreciationB`,
                        `block_${blockIndex}_addDepreciation180Days`,
                      ],
                      watch
                    )}
                  </span>
                </div>
              </div>

              {/* Depreciation disallowed under section 32 as per second proviso to sub-section 1 (as per column 15) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  14. Depreciation disallowed under section 32 as per second proviso to sub-section 1 (as per column 15)
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_depreciationDisallowed`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_depreciationDisallowed`]
                      ?.message
                  }
                />
              </div>

              {/* Net aggregate depreciation allowable to the extent not deferred under section 32(1)(iv) of I.T. Act (out of column 17) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  15. Net aggregate depreciation allowable to the extent not deferred under section 32(1)(iv) of I.T. Act (out of column 17)
                </h4>
                <div className="rounded-md bg-blue-50 p-2 text-sm font-medium text-gray-800">
                  Net aggregate depreciation =
                  <span className="ml-2 font-semibold text-blue-600">
                    {calculateTotal(
                      [`block_${blockIndex}_additionalDepreciation`],
                      watch
                    ) - (parseFloat(watch(`block_${blockIndex}_depreciationDisallowed`) || 0))}
                  </span>
                </div>
              </div>

              {/* Expenditure incurred in connection with transfer of asset/ rights */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  16. Expenditure incurred in connection with transfer of asset/ rights
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_transferExpenditure`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_transferExpenditure`]?.message
                  }
                />
              </div>

              {/* Capital gain/ loss under section 50 (a-b-4.7-8) (enter negative if loss) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  17. Capital gain/ loss under section 50
                  <span className="text-xs text-gray-600 block mt-1">(a - b - 4.7 - 8) (enter negative if loss)</span>
                </h4>
                <InputField
                  label=""
                  name={`block_${blockIndex}_capitalGainLoss`}
                  type="number"
                  placeholder="Amount"
                  register={register}
                  error={
                    errors[`block_${blockIndex}_capitalGainLoss`]?.message
                  }
                />
              </div>

              {/* Written down value on the last day of previous year (6 + 9 - if result is negative) */}
              <div className="rounded-md border border-gray-300 bg-white p-4">
                <h4 className="mb-3 font-medium text-gray-800">
                  18. Written down value on the last day of previous year
                  <span className="text-xs text-gray-600 block mt-1">(6 + 9 - if result is negative)</span>
                </h4>
                <div className="rounded-md bg-green-50 p-2 text-sm font-medium text-gray-800">
                  WDV =
                  <span className="ml-2 font-semibold text-green-600">
                    {Math.max(
                      0,
                      Math.max(
                        0,
                        calculateTotal(
                          [
                            `block_${blockIndex}_wdvFirstDay`,
                            `block_${blockIndex}_additionCost`,
                            `block_${blockIndex}_additions180Days`,
                          ],
                          watch
                        ) - (parseFloat(watch(`block_${blockIndex}_considerationRealization`) || 0))
                      ) +
                        (parseFloat(watch(`block_${blockIndex}_halfRateAmount`) || 0) *
                          parseFloat(watch(`block_${blockIndex}_rate`) || 0) /
                          2 /
                          100)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Summary Section */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Summary - Total Depreciation
          </h3>

          <div className="space-y-3">
            <div className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total Depreciation (All Blocks):</span>
                <span className="font-semibold text-yellow-600">
                  {(() => {
                    let total = 0;
                    for (let i = 0; i < assetCount; i++) {
                      total += calculateTotal(
                        [`block_${i}_additionalDepreciation`],
                        watch
                      );
                    }
                    return total.toFixed(2);
                  })()}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total Depreciation Disallowed:</span>
                <span className="font-semibold text-blue-600">
                  {(() => {
                    let total = 0;
                    for (let i = 0; i < assetCount; i++) {
                      total += parseFloat(
                        watch(`block_${i}_depreciationDisallowed`) || 0
                      );
                    }
                    return total.toFixed(2);
                  })()}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-green-50 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Net Allowable Depreciation:</span>
                <span className="font-semibold text-green-600">
                  {(() => {
                    let total = 0;
                    for (let i = 0; i < assetCount; i++) {
                      const depreciation = calculateTotal(
                        [`block_${i}_additionalDepreciation`],
                        watch
                      );
                      const disallowed = parseFloat(
                        watch(`block_${i}_depreciationDisallowed`) || 0
                      );
                      total += depreciation - disallowed;
                    }
                    return total.toFixed(2);
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

export default ScheduleDPM;
