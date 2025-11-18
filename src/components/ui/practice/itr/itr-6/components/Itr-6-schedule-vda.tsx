import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleVDAProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleVDA: React.FC<ScheduleVDAProps> = ({
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
            Schedule VDA
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Virtual Digital Assets
          </h2>
          <p className="text-sm text-gray-600">
            Income from transfer of Virtual Digital Assets (enter in case of 'transfer' is a transaction)
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
          const relevantErrors = Object.entries(errors).filter(([]) => true);
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
                    ⚠️ Please fix the following errors ({relevantErrors.length}{" "}
                    field{relevantErrors.length > 1 ? "s" : ""})
                  </h3>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Virtual Digital Asset Transactions */}
        <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="text-lg font-bold text-blue-900">
            Virtual Digital Asset Transaction Details
          </h3>

          {/* Row 1-5 for up to 5 transactions */}
          {[1, 2, 3, 4, 5].map((rowNum) => (
            <div key={rowNum} className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
              <h4 className="font-semibold text-gray-900">Transaction {rowNum}</h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Sl. No. (Col 1)"
                  name={`row${rowNum}SlNo`}
                  type="number"
                  placeholder={rowNum.toString()}
                  register={register}
                />
                <InputField
                  label="Share/unit acquired (Col 1a)"
                  name={`row${rowNum}ShareUnitAcquired`}
                  type="text"
                  placeholder="Enter share/unit details"
                  register={register}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Date of Acquisition (DD/MM/YYYY) (Col 2)"
                  name={`row${rowNum}DateOfAcquisition`}
                  type="text"
                  placeholder="DD/MM/YYYY"
                  register={register}
                />
                <InputField
                  label="Date of Transfer (DD/MM/YYYY) (Col 3)"
                  name={`row${rowNum}DateOfTransfer`}
                  type="text"
                  placeholder="DD/MM/YYYY"
                  register={register}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="Head under which Taxable Income is to be offered (Business/Capital Gains) (Col 4)"
                  name={`row${rowNum}HeadTaxableIncome`}
                  type="text"
                  placeholder="e.g., Business, Capital Gains"
                  register={register}
                />
                <InputField
                  label="Cost of Acquisition (Col 5)"
                  name={`row${rowNum}CostOfAcquisition`}
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="Full value of consideration issued (in case of gift). Enter the amount on which tax is paid s/56(2)(x) if any. In any other case, cost to previous owner (Col 6)"
                  name={`row${rowNum}FullValueConsideration`}
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Consideration Received (Col 7)"
                  name={`row${rowNum}ConsiderationReceived`}
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="Income from transfer of Virtual Digital Assets (enter in full in case of loss) (Col 8 - Col 5)"
                  name={`row${rowNum}IncomeFromTransfer`}
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>
          ))}

          {/* Summary Section */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">Summary Calculations</div>
            
            <div className="rounded-md bg-yellow-100 p-3 space-y-2">
              <div className="flex justify-between font-semibold text-yellow-900">
                <span>Add Rows</span>
                <span>-</span>
              </div>
            </div>

            <div className="rounded-md bg-purple-100 p-3 space-y-2">
              <div className="flex justify-between font-semibold text-purple-900">
                <span>A. Total (Sum of all Positive Incomes of Business Income in Col 7)</span>
                <span className="font-bold">(Item No. 3 of Schedule BP)</span>
              </div>
              <div className="flex justify-between font-semibold text-purple-900">
                <span>B. Total (Sum of all Negative Incomes of Capital Gain in Col. 7)</span>
                <span className="font-bold">(Item No. C2 of Schedule CG)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
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

export default ScheduleVDA;
