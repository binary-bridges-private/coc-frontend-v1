import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schedule112ASchema,
  Schedule112AFormData,
} from "../itr-two.validation.ts";

interface ItrTwoSchedule112AProps {
  onSubmit: (data: Schedule112AFormData) => void;
  onCancel: () => void;
  initialData?: Schedule112AFormData;
}

const ItrTwoSchedule112A: React.FC<ItrTwoSchedule112AProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schedule112ASchema) as any,
    defaultValues: initialData || {
      equityShares: [],
      totals: {
        totalCol14BeforeJuly2024: 0,
        totalCol14AfterJuly2024: 0,
        totalCol14Overall: 0,
        totalLTCGUs112A: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "equityShares",
  });

  const equityShares = watch("equityShares");

  // Add new equity share row
  const addEquityShare = () => {
    append({
      shareOrUnit: "Share",
      shareTransferred: "",
      isinCode: "",
      nameOfCompany: "",
      numberOfSharesAcquired: 0,
      dateOfAcquisition: "",
      dateOfSale: "",
      acquiredBefore: undefined,
      fullValueOfConsideration: 0,
      costOfAcquisitionWithIndexation: 0,
      costOfAcquisition: 0,
      fairMarketValuePerShare: 0,
      totalMarketValue: 0,
      capitalGainsBeforeExemption: 0,
      capitalGainsUnder112ABeforeJan2018: 0,
      ltcgUnder112ABeforeLowRateOf6And11: 0,
      exemptionWholeOrAnyPortionTransferred: 0,
      totalDeduction: 0,
      balance: 0,
    });
  };

  // Calculate capital gains for a specific row
  const calculateCapitalGains = (index: number) => {
    const share = equityShares[index];
    if (!share) return;

    const fullValue = Number(share.fullValueOfConsideration) || 0;
    const costOfAcquisition = Number(share.costOfAcquisition) || 0;
    const fairMarketValue = Number(share.fairMarketValuePerShare) || 0;
    const numberOfShares = Number(share.numberOfSharesAcquired) || 0;

    // Calculate total market value
    const totalMarketValue = fairMarketValue * numberOfShares;
    setValue(`equityShares.${index}.totalMarketValue`, totalMarketValue);

    // Determine cost basis (higher of cost or FMV for shares acquired before Jan 31, 2018)
    let effectiveCost = costOfAcquisition;
    if (share.acquiredBefore === "Before 31.01.2018") {
      effectiveCost = Math.max(costOfAcquisition, totalMarketValue);
    }

    // Calculate capital gains before exemption
    const capitalGains = fullValue - effectiveCost;
    setValue(`equityShares.${index}.capitalGainsBeforeExemption`, capitalGains);

    // Calculate LTCG u/s 112A based on acquisition date
    let ltcgUnder112A = 0;
    let ltcgBeforeLowRate = 0;

    if (share.acquiredBefore === "Before 31.01.2018") {
      // For shares acquired before 31.01.2018, use lower of capital gains or (Full Value - FMV)
      const alternateCalculation = fullValue - totalMarketValue;
      ltcgUnder112A = Math.min(capitalGains, alternateCalculation);
      setValue(
        `equityShares.${index}.capitalGainsUnder112ABeforeJan2018`,
        ltcgUnder112A
      );
    } else {
      ltcgUnder112A = capitalGains;
    }

    // Set LTCG rates based on July 23, 2024 date
    if (share.acquiredBefore === "After 23rd July 2024") {
      // New rate applies (e.g., 12.5%)
      ltcgBeforeLowRate = ltcgUnder112A;
      setValue(
        `equityShares.${index}.ltcgUnder112ABeforeLowRateOf6And11`,
        ltcgBeforeLowRate
      );
    }

    // Calculate exemptions and deductions
    const exemption = Number(share.exemptionWholeOrAnyPortionTransferred) || 0;
    const totalDeduction = exemption;
    setValue(`equityShares.${index}.totalDeduction`, totalDeduction);

    // Calculate balance
    const balance = capitalGains - totalDeduction;
    setValue(`equityShares.${index}.balance`, balance);

    // Recalculate totals
    calculateTotals();
  };

  // Calculate all totals
  const calculateTotals = () => {
    let totalBeforeJuly = 0;
    let totalAfterJuly = 0;
    let totalOverall = 0;

    equityShares.forEach((share) => {
      const balance = Number(share.balance) || 0;
      totalOverall += balance;

      if (share.acquiredBefore === "After 23rd July 2024") {
        totalAfterJuly += balance;
      } else {
        totalBeforeJuly += balance;
      }
    });

    setValue("totals.totalCol14BeforeJuly2024", totalBeforeJuly);
    setValue("totals.totalCol14AfterJuly2024", totalAfterJuly);
    setValue("totals.totalCol14Overall", totalOverall);
    setValue("totals.totalLTCGUs112A", totalOverall);
  };

  const handleFormSubmit = (data: Schedule112AFormData) => {
    onSubmit(data);
  };

  return (
    <section className="space-y-6">
      
      {/* Important Notes Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className="flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-semibold text-gray-900">
              Important Notes & Instructions
            </span>
          </div>
          <svg
            className={`h-5 w-5 text-gray-700 transition-transform ${
              showNotes ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showNotes && (
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="font-semibold text-gray-900">
                  🔑 Key Points for Section 112A:
                </p>
                <ul className="ml-4 mt-2 list-disc space-y-1 text-gray-700">
                  <li>
                    Applicable to equity shares where STT has been paid on both
                    acquisition and transfer
                  </li>
                  <li>
                    For shares acquired before January 31, 2018: Use higher of
                    actual cost or Fair Market Value as on January 31, 2018
                  </li>
                  <li>
                    For shares transferred on or after July 23, 2024: Different
                    tax rates apply (12.5% without indexation)
                  </li>
                  <li>
                    For shares transferred before July 23, 2024: Tax rate of 10%
                    on gains exceeding ₹1 lakh (without indexation benefit)
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="font-semibold text-gray-900">
                  📊 Fair Market Value (FMV) Guidelines:
                </p>
                <ul className="ml-4 mt-2 list-disc space-y-1 text-gray-700">
                  <li>
                    FMV as on January 31, 2018 = Higher of average price on
                    January 31, 2018 OR highest price on January 31, 2018
                  </li>
                  <li>
                    For unlisted shares: FMV to be determined as per Rule 11UA
                  </li>
                  <li>
                    Total gains = Sale consideration - (Cost of acquisition OR
                    FMV, whichever is higher)
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <p className="font-semibold text-gray-900">
                  💰 Exemption under Section 54F:
                </p>
                <ul className="ml-4 mt-2 list-disc space-y-1 text-gray-700">
                  <li>
                    Available if capital gains are invested in residential
                    property
                  </li>
                  <li>
                    Investment must be made within specified time limits (1 year
                    before or 2 years after transfer)
                  </li>
                  <li>
                    Or deposit in Capital Gains Account Scheme before due date
                    of filing return
                  </li>
                </ul>
              </div>
            </div>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Equity Shares Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Equity Share Transactions
              </h3>
              <button
                type="button"
                onClick={addEquityShare}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Share Transaction
              </button>
            </div>
          </div>

          {fields.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No Share Transactions Added
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Click "Add Share Transaction" to add equity share sale details
              </p>
              <button
                type="button"
                onClick={addEquityShare}
                className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Add First Transaction
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {fields.map((field, index) => (
                <div key={field.id} className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-base font-semibold text-gray-900">
                      Share Transaction #{index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => calculateCapitalGains(index)}
                        className="rounded-lg border border-gray-900 bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                      >
                        Calculate
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Share or Unit */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Share/Unit Type
                      </label>
                      <select
                        {...register(`equityShares.${index}.shareOrUnit`)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="Share">Share</option>
                        <option value="Unit">Unit</option>
                      </select>
                    </div>

                    {/* ISIN Code */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        ISIN Code
                      </label>
                      <input
                        type="text"
                        {...register(`equityShares.${index}.isinCode`)}
                        maxLength={12}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="INE123456789"
                      />
                    </div>

                    {/* Name of Company */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name of Company/Fund
                      </label>
                      <input
                        type="text"
                        {...register(`equityShares.${index}.nameOfCompany`)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="Company Name"
                      />
                    </div>

                    {/* Number of Shares */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Number of Shares/Units
                      </label>
                      <input
                        type="number"
                        {...register(`equityShares.${index}.numberOfSharesAcquired`, {
                          valueAsNumber: true,
                        })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="100"
                      />
                    </div>

                    {/* Date of Acquisition */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Date of Acquisition
                      </label>
                      <input
                        type="text"
                        {...register(`equityShares.${index}.dateOfAcquisition`)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    {/* Date of Sale */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Date of Sale
                      </label>
                      <input
                        type="text"
                        {...register(`equityShares.${index}.dateOfSale`)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    {/* Acquired Before */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Acquisition Period
                      </label>
                      <select
                        {...register(`equityShares.${index}.acquiredBefore`)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      >
                        <option value="">Select Period</option>
                        <option value="Before 31.01.2018">
                          Before 31.01.2018
                        </option>
                        <option value="On or after 31.01.2018">
                          On or after 31.01.2018
                        </option>
                        <option value="After 23rd July 2024">
                          After 23rd July 2024
                        </option>
                      </select>
                    </div>

                    {/* Full Value of Consideration */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Full Value of Consideration (₹)
                      </label>
                      <input
                        type="number"
                        {...register(
                          `equityShares.${index}.fullValueOfConsideration`,
                          { valueAsNumber: true }
                        )}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="0"
                      />
                    </div>

                    {/* Cost of Acquisition */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Cost of Acquisition (₹)
                      </label>
                      <input
                        type="number"
                        {...register(`equityShares.${index}.costOfAcquisition`, {
                          valueAsNumber: true,
                        })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="0"
                      />
                    </div>

                    {/* Fair Market Value per Share */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        FMV per Share on 31.01.2018 (₹)
                      </label>
                      <input
                        type="number"
                        {...register(
                          `equityShares.${index}.fairMarketValuePerShare`,
                          { valueAsNumber: true }
                        )}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="0"
                      />
                    </div>

                    {/* Total Market Value (Calculated) */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Total Market Value (₹)
                      </label>
                      <input
                        type="number"
                        {...register(`equityShares.${index}.totalMarketValue`, {
                          valueAsNumber: true,
                        })}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      />
                    </div>

                    {/* Capital Gains Before Exemption (Calculated) */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Capital Gains Before Exemption (₹)
                      </label>
                      <input
                        type="number"
                        {...register(
                          `equityShares.${index}.capitalGainsBeforeExemption`,
                          { valueAsNumber: true }
                        )}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      />
                    </div>

                    {/* Exemption */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Exemption u/s 54F (₹)
                      </label>
                      <input
                        type="number"
                        {...register(
                          `equityShares.${index}.exemptionWholeOrAnyPortionTransferred`,
                          { valueAsNumber: true }
                        )}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        placeholder="0"
                      />
                    </div>

                    {/* Total Deduction (Calculated) */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Total Deduction (₹)
                      </label>
                      <input
                        type="number"
                        {...register(`equityShares.${index}.totalDeduction`, {
                          valueAsNumber: true,
                        })}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2"
                        readOnly
                      />
                    </div>

                    {/* Balance (Calculated) */}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Balance (₹)
                      </label>
                      <input
                        type="number"
                        {...register(`equityShares.${index}.balance`, {
                          valueAsNumber: true,
                        })}
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 font-semibold text-gray-900"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Totals */}
        {fields.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Summary of LTCG u/s 112A
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-600">
                  Total (Before 23rd July 2024)
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹
                  {watch("totals.totalCol14BeforeJuly2024")?.toLocaleString(
                    "en-IN"
                  ) || "0"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-600">
                  Total (On or after 23rd July 2024)
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹
                  {watch("totals.totalCol14AfterJuly2024")?.toLocaleString(
                    "en-IN"
                  ) || "0"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-600">
                  Total (Col 14) Overall
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹
                  {watch("totals.totalCol14Overall")?.toLocaleString("en-IN") ||
                    "0"}
                </p>
              </div>
              <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-600">
                  Total LTCG u/s 112A
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹
                  {watch("totals.totalLTCGUs112A")?.toLocaleString("en-IN") ||
                    "0"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ItrTwoSchedule112A;