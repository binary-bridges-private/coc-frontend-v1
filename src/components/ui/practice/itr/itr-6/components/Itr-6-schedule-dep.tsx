import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleDEPProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleDEP: React.FC<ScheduleDEPProps> = ({
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
            Schedule DEP
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Summary of Depreciation on Assets
          </h2>
          <p className="text-sm text-gray-600">
            Summary of depreciation on assets (Other than assets on which full capital expenditure is allowable as deduction under any other section)
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

        {/* Plant and Machinery Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            1. Plant and Machinery
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1a. Block entitled for depreciation @ 15 per cent (Schedule DPM - 17(i) or 18 as applicable)
              </h4>
              <InputField
                label=""
                name="plantMachinery15Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.plantMachinery15Percent?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1b. Block entitled for depreciation @ 30 per cent (Schedule DPM - 17(i) or 18(i) as applicable)
              </h4>
              <InputField
                label=""
                name="plantMachinery30Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.plantMachinery30Percent?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1c. Block entitled for depreciation @ 40 per cent (Schedule DPM - 17(i) or 18(i))
              </h4>
              <InputField
                label=""
                name="plantMachinery40Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.plantMachinery40Percent?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                1d. Block entitled for depreciation @ 45 per cent (Schedule DPM - 17(i) or 18(i) as applicable)
              </h4>
              <InputField
                label=""
                name="plantMachinery45Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.plantMachinery45Percent?.message}
              />
            </div>

            <div className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>1d. Total depreciation on plant and machinery (1a + 1b + 1c + 1d)</span>
                <span className="font-semibold text-yellow-600">
                  {calculateTotal(
                    [
                      "plantMachinery15Percent",
                      "plantMachinery30Percent",
                      "plantMachinery40Percent",
                      "plantMachinery45Percent",
                    ],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Building Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            2. Building (not including land)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                2a. Block entitled for depreciation @ 5 per cent (Schedule DOA - 14(i) or 15(i) as applicable)
              </h4>
              <InputField
                label=""
                name="building5Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.building5Percent?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                2b. Block entitled for depreciation @ 10 per cent (Schedule DOA - 14(i) or 15(i) as applicable)
              </h4>
              <InputField
                label=""
                name="building10Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.building10Percent?.message}
              />
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                2c. Block entitled for depreciation @ 40 per cent (Schedule DOA - 14(i) or 15(i) as applicable)
              </h4>
              <InputField
                label=""
                name="building40Percent"
                type="number"
                placeholder="Amount"
                register={register}
                error={errors.building40Percent?.message}
              />
            </div>

            <div className="rounded-md bg-yellow-50 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>2d. Total depreciation on building (total of 2a + 2b + 2c)</span>
                <span className="font-semibold text-yellow-600">
                  {calculateTotal(
                    ["building5Percent", "building10Percent", "building40Percent"],
                    watch
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Furniture and Fittings Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            3. Furniture and Fittings (Schedule DOA - 14(i) or 15(i) as applicable)
          </h3>

          <div className="rounded-md border border-gray-300 bg-white p-4">
            <InputField
              label=""
              name="furnitureAndFittings"
              type="number"
              placeholder="Amount"
              register={register}
              error={errors.furnitureAndFittings?.message}
            />
          </div>
        </div>

        {/* Intangible Assets Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            4. Intangible assets (Schedule DOA - 14(i) or 15(i) as applicable)
          </h3>

          <div className="rounded-md border border-gray-300 bg-white p-4">
            <InputField
              label=""
              name="intangibleAssets"
              type="number"
              placeholder="Amount"
              register={register}
              error={errors.intangibleAssets?.message}
            />
          </div>
        </div>

        {/* Ships Section */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            5. Ships (Schedule DOA - 14(i) or 15(i) as applicable)
          </h3>

          <div className="rounded-md border border-gray-300 bg-white p-4">
            <InputField
              label=""
              name="ships"
              type="number"
              placeholder="Amount"
              register={register}
              error={errors.ships?.message}
            />
          </div>
        </div>

        {/* Total Depreciation Section */}
        <div className="rounded-lg border-2 border-green-300 bg-green-50 p-5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            6. Total Depreciation (1c+2d+3+4+5)
          </h3>

          <div className="rounded-md bg-green-100 p-3 text-lg font-bold text-gray-800">
            <div className="flex justify-between">
              <span>Total Depreciation:</span>
              <span className="text-green-600">
                {calculateTotal(
                  [
                    "plantMachinery15Percent",
                    "plantMachinery30Percent",
                    "plantMachinery40Percent",
                    "plantMachinery45Percent",
                    "building5Percent",
                    "building10Percent",
                    "building40Percent",
                    "furnitureAndFittings",
                    "intangibleAssets",
                    "ships",
                  ],
                  watch
                )}
              </span>
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

export default ScheduleDEP;
