import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  scheduleVDASchema,
  ScheduleVDAFormData,
  ScheduleVDARowData,
} from "../itr-two.validation.ts";

interface ItrTwoVdaProps {
  onSubmit: (data: ScheduleVDAFormData) => void;
  onBack: () => void;
  initialData?: ScheduleVDAFormData;
}

const ItrTwoVda: React.FC<ItrTwoVdaProps> = ({
  onSubmit,
  onBack,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ScheduleVDAFormData>({
    resolver: zodResolver(scheduleVDASchema) as any,
    defaultValues: initialData || {
      rows: [createEmptyRow(1)],
      totalIncomeFromVDA: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const rows = watch("rows");

  // Calculate income for each row and total
  useEffect(() => {
    let total = 0;

    rows.forEach((row, index) => {
      const considerationReceived = Number(row.considerationReceived) || 0;
      const costOfAcquisition = Number(row.costOfAcquisition) || 0;

      // Calculate Income from Transfer of VDA (Col 7) = Col 6 - Col 5
      const incomeFromTransfer = considerationReceived - costOfAcquisition;

      if (row.incomeFromTransferOfVDA !== incomeFromTransfer) {
        setValue(`rows.${index}.incomeFromTransferOfVDA`, incomeFromTransfer);
      }

      total += incomeFromTransfer;
    });

    // Update total
    setValue("totalIncomeFromVDA", total);
  }, [rows, setValue]);

  const handleAddRow = () => {
    append(createEmptyRow(fields.length + 1));
  };

  const handleRemoveRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  // Manual calculate function for a specific row
  const calculateRow = (index: number) => {
    const row = rows[index];
    if (!row) return;

    const considerationReceived = Number(row.considerationReceived) || 0;
    const costOfAcquisition = Number(row.costOfAcquisition) || 0;

    const incomeFromTransfer = considerationReceived - costOfAcquisition;
    setValue(`rows.${index}.incomeFromTransferOfVDA`, incomeFromTransfer);
  };

  // Calculate all totals
  const calculateAllTotals = () => {
    let total = 0;

    rows.forEach((row) => {
      const incomeFromTransfer = Number(row.incomeFromTransferOfVDA) || 0;
      total += incomeFromTransfer;
    });

    setValue("totalIncomeFromVDA", total);
  };

  const totalIncome = watch("totalIncomeFromVDA");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule VDA - Virtual Digital Assets
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Income from transfer of Virtual Digital Assets (Note: Details of
              every transaction are to be filled, wherein every 'transfer' is a
              transaction)
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 text-sm text-gray-700">
              <p className="font-semibold">Important Notes:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  Virtual Digital Assets (VDA) include cryptocurrencies, NFTs,
                  and other digital assets
                </li>
                <li>
                  Each transfer/sale of VDA must be reported as a separate
                  transaction
                </li>
                <li>
                  <strong>Cost of Acquisition (Col 5):</strong> In case of
                  gift, enter the amount on which tax is paid u/s 56(2)(x) if
                  any. In any other case, enter the cost to previous owner
                </li>
                <li>
                  <strong>Income from Transfer (Col 7):</strong> Automatically
                  calculated as Consideration Received (Col 6) - Cost of
                  Acquisition (Col 5)
                </li>
                <li>
                  No deduction is allowed under any provision of Income Tax Act
                  while computing income from VDA
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Sl. No.
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Date of Acquisition (Col 2)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Date of Transfer (Col 3)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Head under which income to be taxed (Capital Gain) (Col 4)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Cost of Acquisition (Col 5)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Consideration Received (Col 6)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Income from transfer of VDA (Col 7)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        {...register(`rows.${index}.dateOfAcquisition`)}
                        className={`w-32 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.dateOfAcquisition
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.dateOfAcquisition && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.dateOfAcquisition?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        {...register(`rows.${index}.dateOfTransfer`)}
                        className={`w-32 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.dateOfTransfer
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.dateOfTransfer && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.dateOfTransfer?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <select
                        {...register(
                          `rows.${index}.headUnderWhichIncomeToBeTaxed`
                        )}
                        className={`w-48 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.headUnderWhichIncomeToBeTaxed
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Head</option>
                        <option value="Capital Gain">Capital Gain</option>
                        <option value="Short Term Capital Gain">
                          Short Term Capital Gain
                        </option>
                        <option value="Long Term Capital Gain">
                          Long Term Capital Gain
                        </option>
                      </select>
                      {errors.rows?.[index]?.headUnderWhichIncomeToBeTaxed && (
                        <p className="mt-1 text-xs text-red-500">
                          {
                            errors.rows[index]?.headUnderWhichIncomeToBeTaxed
                              ?.message
                          }
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...register(`rows.${index}.costOfAcquisition`, {
                          valueAsNumber: true,
                        })}
                        className={`w-32 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.costOfAcquisition
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.costOfAcquisition && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.costOfAcquisition?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...register(`rows.${index}.considerationReceived`, {
                          valueAsNumber: true,
                        })}
                        className={`w-32 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.considerationReceived
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.considerationReceived && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.considerationReceived?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        readOnly
                        {...register(`rows.${index}.incomeFromTransferOfVDA`, {
                          valueAsNumber: true,
                        })}
                        className="w-32 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-semibold text-gray-900"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => calculateRow(index)}
                          className="rounded border border-gray-900 bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-gray-800"
                        >
                          Calculate
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          disabled={fields.length === 1}
                          className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAddRow}
              className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            >
              + Add Transaction
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              <button
                type="button"
                onClick={calculateAllTotals}
                className="rounded-lg border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Calculate Total
              </button>
            </div>
            <div className="flex items-center justify-between border-t-2 border-gray-300 bg-gray-50 p-4 rounded-lg">
              <span className="text-base font-bold text-gray-900">
                Total Income from Transfer of Virtual Digital Assets
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{" "}
                {totalIncome.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper function to create empty row
function createEmptyRow(slNo: number): ScheduleVDARowData {
  return {
    slNo,
    dateOfAcquisition: "",
    dateOfTransfer: "",
    headUnderWhichIncomeToBeTaxed: "",
    costOfAcquisition: 0,
    considerationReceived: 0,
    incomeFromTransferOfVDA: 0,
  };
}

export default ItrTwoVda;
