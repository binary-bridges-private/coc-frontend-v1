import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleESRProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleESR: React.FC<ScheduleESRProps> = ({
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

  // Research expenditure items
  const researchItems = [
    {
      code: "35(1)(i)",
      label: "35(1)(i)",
      description: "Section 35(1)(i)",
    },
    {
      code: "35(1)(ii)",
      label: "35(1)(ii)",
      description: "Section 35(1)(ii)",
    },
    {
      code: "35(1)(iia)",
      label: "35(1)(iia)",
      description: "Section 35(1)(iia)",
    },
    {
      code: "35(1)(iii)",
      label: "35(1)(iii)",
      description: "Section 35(1)(iii)",
    },
    {
      code: "35(1)(iv)",
      label: "35(1)(iv)",
      description: "Section 35(1)(iv)",
    },
    {
      code: "35(2AA)",
      label: "35(2AA)",
      description: "Section 35(2AA)",
    },
    {
      code: "35(2AB)",
      label: "35(2AB)",
      description: "Section 35(2AB)",
    },
    {
      code: "35CCC",
      label: "35CCC",
      description: "Section 35CCC",
    },
    {
      code: "35CCD",
      label: "35CCD",
      description: "Section 35CCD",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Schedule ESR
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Expenditure on Scientific Research etc.
          </h2>
          <p className="text-sm text-gray-600">
            Expenditure on Scientific Research etc. (Deduction under section 35 or 35CCC or 35CCD)
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

        {/* Research Expenditure Items */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-blue-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Sl No
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Expenditure of the nature referred in the section
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount, if any, deleted in profit and loss account
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount of deduction allowable
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount of deduction in excess of the amount debited to profit and loss
                </th>
              </tr>
            </thead>
            <tbody>
              {researchItems.map((item, index) => (
                <tr key={item.code} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">
                    {String.fromCharCode(96 + index + 1).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-600">{item.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register(`esr_${item.code}_deleted` as any)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      {...register(`esr_${item.code}_allowable` as any)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-600">
                      {(
                        (parseFloat(watch(`esr_${item.code}_allowable`) || 0) -
                          parseFloat(watch(`esr_${item.code}_deleted`) || 0))
                      ).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="border-t-2 bg-yellow-50">
                <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-900">
                  X. Total
                </td>
                <td className="px-4 py-3">
                  <div className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-600">
                    {(() => {
                      let total = 0;
                      researchItems.forEach((item) => {
                        total += parseFloat(
                          watch(`esr_${item.code}_deleted`) || 0
                        );
                      });
                      return total.toFixed(2);
                    })()}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-600">
                    {(() => {
                      let total = 0;
                      researchItems.forEach((item) => {
                        total += parseFloat(
                          watch(`esr_${item.code}_allowable`) || 0
                        );
                      });
                      return total.toFixed(2);
                    })()}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="rounded-md bg-yellow-100 px-2 py-1 text-sm font-bold text-yellow-600">
                    {(() => {
                      let total = 0;
                      researchItems.forEach((item) => {
                        total +=
                          parseFloat(
                            watch(`esr_${item.code}_allowable`) || 0
                          ) -
                          parseFloat(
                            watch(`esr_${item.code}_deleted`) || 0
                          );
                      });
                      return total.toFixed(2);
                    })()}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note Section */}
        <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-blue-900">NOTE:</h4>
          <p className="text-sm text-blue-800">
            In case any deduction is claimed under sections 35(1)(ii) or 35(1)(iii) or 35(1)(iii) or 35(2AA), please provide the details as per Schedule RA.
          </p>
        </div>

        {/* Additional Fields for Schedule RA Reference */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Schedule RA Reference (if applicable)
          </h3>

          <div className="space-y-4">
            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Details for Section 35(1)(ii) or 35(1)(iii) or 35(2AA) deductions
              </h4>
              <textarea
                placeholder="Provide details as per Schedule RA if claiming deductions under the specified sections"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                rows={4}
                {...register("scheduleRADetails" as any)}
              />
              {errors.scheduleRADetails && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.scheduleRADetails.message}
                </p>
              )}
            </div>

            <div className="rounded-md border border-gray-300 bg-white p-4">
              <h4 className="mb-3 font-medium text-gray-800">
                Reference to Schedule RA (if applicable)
              </h4>
              <InputField
                label=""
                name="scheduleRAReference"
                type="text"
                placeholder="Schedule RA reference number/link"
                register={register}
                error={errors.scheduleRAReference?.message}
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="rounded-lg border-2 border-green-300 bg-green-50 p-5">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Summary
          </h3>

          <div className="space-y-3">
            <div className="rounded-md bg-green-100 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total Deleted in Profit and Loss:</span>
                <span className="font-semibold text-green-600">
                  {(() => {
                    let total = 0;
                    researchItems.forEach((item) => {
                      total += parseFloat(
                        watch(`esr_${item.code}_deleted`) || 0
                      );
                    });
                    return total.toFixed(2);
                  })()}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-green-100 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total Deduction Allowable:</span>
                <span className="font-semibold text-green-600">
                  {(() => {
                    let total = 0;
                    researchItems.forEach((item) => {
                      total += parseFloat(
                        watch(`esr_${item.code}_allowable`) || 0
                      );
                    });
                    return total.toFixed(2);
                  })()}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-blue-100 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total Deduction in Excess:</span>
                <span className="font-semibold text-blue-600">
                  {(() => {
                    let total = 0;
                    researchItems.forEach((item) => {
                      total +=
                        parseFloat(
                          watch(`esr_${item.code}_allowable`) || 0
                        ) -
                        parseFloat(
                          watch(`esr_${item.code}_deleted`) || 0
                        );
                    });
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

export default ScheduleESR;
