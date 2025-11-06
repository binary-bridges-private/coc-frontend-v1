import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schedule115ADSchema,
  Schedule115ADFormData,
  Schedule115ADRowData,
} from "../itr-two.validation.ts";

interface ItrTwo115ADProps {
  onSubmit: (data: Schedule115ADFormData) => void;
  onBack: () => void;
  initialData?: Schedule115ADFormData;
}

const ItrTwo115AD: React.FC<ItrTwo115ADProps> = ({
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
  } = useForm<Schedule115ADFormData>({
    resolver: zodResolver(schedule115ADSchema) as any,
    defaultValues: initialData || {
      rows: [createEmptyRow(1)],
      totalCol14BeforeTransfer: 0,
      totalCol14OnOrAfterTransfer: 0,
      totalLTCG115AD: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  const rows = watch("rows");

  // Combined useEffect for row calculations and totals
  useEffect(() => {
    let totalBefore = 0;
    let totalAfter = 0;
    
    rows.forEach((row, index) => {
      const numberOfShares = Number(row.numberOfShares) || 0;
      const salePrice = Number(row.salePrice) || 0;
      const costWithIndexation =
        Number(row.costOfAcquisitionWithIndexation) || 0;
      const costWithoutIndexation =
        Number(row.costOfAcquisitionWithoutIndexation) || 0;
      const fairMarketValue = Number(row.fairMarketValue) || 0;
      const expenditure = Number(row.expenditureWhollyExclusively) || 0;

      const fullValueConsideration = numberOfShares * salePrice;
      if (row.fullValueConsideration !== fullValueConsideration) {
        setValue(
          `rows.${index}.fullValueConsideration`,
          fullValueConsideration
        );
      }

      const totalFairMarketValue = numberOfShares * fairMarketValue;
      if (row.totalFairMarketValue !== totalFairMarketValue) {
        setValue(`rows.${index}.totalFairMarketValue`, totalFairMarketValue);
      }

      const lowerOf6And11 = Math.min(
        fullValueConsideration,
        totalFairMarketValue
      );
      if (row.ifLowerOf6And11 !== lowerOf6And11) {
        setValue(`rows.${index}.ifLowerOf6And11`, lowerOf6And11);
      }

      const totalDeduction =
        costWithIndexation + costWithoutIndexation + expenditure;
      if (row.totalDeduction !== totalDeduction) {
        setValue(`rows.${index}.totalDeduction`, totalDeduction);
      }

      const balanceCapitalGains = fullValueConsideration - totalDeduction;
      if (row.balanceCapitalGains !== balanceCapitalGains) {
        setValue(`rows.${index}.balanceCapitalGains`, balanceCapitalGains);
      }

      if (row.ltcgScheduleOf115AD !== balanceCapitalGains) {
        setValue(`rows.${index}.ltcgScheduleOf115AD`, balanceCapitalGains);
      }

      // Calculate totals based on transfer date
      const transferDate = row.shareUnitTransferred;
      if (transferDate) {
        const parts = transferDate.split("/");
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          const transferDateObj = new Date(year, month - 1, day);
          const cutoffDate = new Date(2024, 6, 23); // July 23, 2024

          if (transferDateObj < cutoffDate) {
            totalBefore += balanceCapitalGains;
          } else {
            totalAfter += balanceCapitalGains;
          }
        }
      }
    });

    const totalLTCG = totalBefore + totalAfter;

    // Update summary totals
    setValue("totalCol14BeforeTransfer", totalBefore);
    setValue("totalCol14OnOrAfterTransfer", totalAfter);
    setValue("totalLTCG115AD", totalLTCG);
  }, [rows, setValue]);

  const handleAddRow = () => {
    append(createEmptyRow(fields.length + 1));
  };

  const handleRemoveRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const totalCol14Before = watch("totalCol14BeforeTransfer");
  const totalCol14After = watch("totalCol14OnOrAfterTransfer");
  const totalLTCG = watch("totalLTCG115AD");

  const calculateRow = (index: number) => {
    const row = rows[index];
    if (!row) return;

    const numberOfShares = Number(row.numberOfShares) || 0;
    const salePrice = Number(row.salePrice) || 0;
    const costWithIndexation = Number(row.costOfAcquisitionWithIndexation) || 0;
    const costWithoutIndexation =
      Number(row.costOfAcquisitionWithoutIndexation) || 0;
    const fairMarketValue = Number(row.fairMarketValue) || 0;
    const expenditure = Number(row.expenditureWhollyExclusively) || 0;

    const fullValueConsideration = numberOfShares * salePrice;
    setValue(`rows.${index}.fullValueConsideration`, fullValueConsideration);

    const totalFairMarketValue = numberOfShares * fairMarketValue;
    setValue(`rows.${index}.totalFairMarketValue`, totalFairMarketValue);

    const lowerOf6And11 = Math.min(
      fullValueConsideration,
      totalFairMarketValue
    );
    setValue(`rows.${index}.ifLowerOf6And11`, lowerOf6And11);

    const totalDeduction =
      costWithIndexation + costWithoutIndexation + expenditure;
    setValue(`rows.${index}.totalDeduction`, totalDeduction);

    const balanceCapitalGains = fullValueConsideration - totalDeduction;
    setValue(`rows.${index}.balanceCapitalGains`, balanceCapitalGains);

    setValue(`rows.${index}.ltcgScheduleOf115AD`, balanceCapitalGains);
  };

  const calculateAllTotals = () => {
    let totalBefore = 0;
    let totalAfter = 0;

    rows.forEach((row) => {
      const balanceCapitalGains = Number(row.balanceCapitalGains) || 0;
      const transferDate = row.shareUnitTransferred;

      if (transferDate) {
        const parts = transferDate.split("/");
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          const transferDateObj = new Date(year, month - 1, day);
          const cutoffDate = new Date(2024, 6, 23); // July 23, 2024

          if (transferDateObj < cutoffDate) {
            totalBefore += balanceCapitalGains;
          } else {
            totalAfter += balanceCapitalGains;
          }
        }
      }
    });

    const totalLTCG = totalBefore + totalAfter;

    setValue("totalCol14BeforeTransfer", totalBefore);
    setValue("totalCol14OnOrAfterTransfer", totalAfter);
    setValue("totalLTCG115AD", totalLTCG);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule 115AD(1)(b)(iii) Proviso
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              For NON-RESIDENTS - From sale of equity share in a company or unit
              of equity-oriented fund or unit of a business trust on which STT
              is paid under section 112A rws 115AD(1)(b)(iii) proviso
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
                  Share/Unit must be{" "}
                  <strong>acquired on or before 31st January 2018</strong>
                </li>
                <li>
                  STT (Securities Transaction Tax) must have been paid on
                  acquisition and transfer
                </li>
                <li>
                  Full Value of Consideration = Number of Shares × Sale Price
                </li>
                <li>
                  If transfer date is before 23rd July 2024, it goes to section
                  (i), otherwise section (ii)
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
                    Share/Unit Acquired (On or before 31st Jan 2018)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Share/Unit Transferred (Before/on/after 23rd July 2024)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    ISIN Code
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Name of Share
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    No. of Shares
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Sale Price
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Full Value (Col 6)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Cost (With Index)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Cost (Without Index)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    If Lower (Col 9)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Fair Market Value
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Total Fair Value (Col 11)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Expenditure
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Total Deduction (Col 13)
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Balance (Col 14)
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
                        {...register(`rows.${index}.shareUnitAcquired`)}
                        className={`w-32 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.shareUnitAcquired
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.shareUnitAcquired && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.shareUnitAcquired?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        {...register(`rows.${index}.shareUnitTransferred`)}
                        className={`w-32 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.shareUnitTransferred
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.shareUnitTransferred && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.shareUnitTransferred?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="text"
                        placeholder="INE002A01018"
                        maxLength={12}
                        {...register(`rows.${index}.isinCode`)}
                        className={`w-32 rounded border px-2 py-1 text-sm uppercase ${
                          errors.rows?.[index]?.isinCode
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.isinCode && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.isinCode?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="text"
                        placeholder="Share name"
                        {...register(`rows.${index}.nameOfShare`)}
                        className={`w-40 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.nameOfShare
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.nameOfShare && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.nameOfShare?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        min="1"
                        {...register(`rows.${index}.numberOfShares`, {
                          valueAsNumber: true,
                        })}
                        className={`w-24 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.numberOfShares
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.numberOfShares && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.numberOfShares?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`rows.${index}.salePrice`, {
                          valueAsNumber: true,
                        })}
                        className={`w-28 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.salePrice
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.rows?.[index]?.salePrice && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.rows[index]?.salePrice?.message}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        readOnly
                        {...register(`rows.${index}.fullValueConsideration`, {
                          valueAsNumber: true,
                        })}
                        className="w-28 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-sm text-gray-600"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(
                          `rows.${index}.costOfAcquisitionWithIndexation`,
                          {
                            valueAsNumber: true,
                          }
                        )}
                        className={`w-28 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.costOfAcquisitionWithIndexation
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(
                          `rows.${index}.costOfAcquisitionWithoutIndexation`,
                          {
                            valueAsNumber: true,
                          }
                        )}
                        className={`w-28 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]
                            ?.costOfAcquisitionWithoutIndexation
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        readOnly
                        {...register(`rows.${index}.ifLowerOf6And11`, {
                          valueAsNumber: true,
                        })}
                        className="w-28 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-sm text-gray-600"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`rows.${index}.fairMarketValue`, {
                          valueAsNumber: true,
                        })}
                        className={`w-28 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.fairMarketValue
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        readOnly
                        {...register(`rows.${index}.totalFairMarketValue`, {
                          valueAsNumber: true,
                        })}
                        className="w-28 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-sm text-gray-600"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(
                          `rows.${index}.expenditureWhollyExclusively`,
                          {
                            valueAsNumber: true,
                          }
                        )}
                        className={`w-28 rounded border px-2 py-1 text-sm ${
                          errors.rows?.[index]?.expenditureWhollyExclusively
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        readOnly
                        {...register(`rows.${index}.totalDeduction`, {
                          valueAsNumber: true,
                        })}
                        className="w-28 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-sm text-gray-600"
                      />
                    </td>

                    <td className="px-3 py-4">
                      <input
                        type="number"
                        readOnly
                        {...register(`rows.${index}.balanceCapitalGains`, {
                          valueAsNumber: true,
                        })}
                        className="w-28 rounded border border-gray-300 bg-gray-50 px-2 py-1 text-sm font-semibold text-gray-900"
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
              + Add Row
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Summary
              </h3>
              <button
                type="button"
                onClick={calculateAllTotals}
                className="rounded-lg border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Calculate Totals
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm font-medium text-gray-700">
                  (i) Total of Col 14 where transfer was before 23rd July 2024
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{" "}
                  {totalCol14Before.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm font-medium text-gray-700">
                  (ii) Total of Col 14 where transfer was on or after 23rd July
                  2024
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{" "}
                  {totalCol14After.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between border-t-2 border-gray-300 bg-gray-50 p-4 rounded-lg">
                <span className="text-base font-bold text-gray-900">
                  Total of LTCG u/s 112A rws 115AD(1)(b)(iii) proviso
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{" "}
                  {totalLTCG.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
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

function createEmptyRow(slNo: number): Schedule115ADRowData {
  return {
    slNo,
    shareUnitAcquired: "",
    shareUnitTransferred: "",
    isinCode: "",
    nameOfShare: "",
    numberOfShares: 0,
    salePrice: 0,
    fullValueConsideration: 0,
    costOfAcquisitionWithIndexation: 0,
    costOfAcquisitionWithoutIndexation: 0,
    ifLowerOf6And11: 0,
    fairMarketValue: 0,
    totalFairMarketValue: 0,
    expenditureWhollyExclusively: 0,
    totalDeduction: 0,
    balanceCapitalGains: 0,
    ltcgScheduleOf115AD: 0,
  };
}

export default ItrTwo115AD;
