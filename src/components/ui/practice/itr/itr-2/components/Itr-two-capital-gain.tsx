import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  capitalGainsSectionASchema,
  CapitalGainsSectionAFormData,
} from "../itr-two.validation.ts";

interface ItrTwoCapitalGainProps {
  onComplete: (data: CapitalGainsSectionAFormData) => void;
  initialData?: Partial<CapitalGainsSectionAFormData>;
}

const ItrTwoCapitalGain: React.FC<ItrTwoCapitalGainProps> = ({
  onComplete,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CapitalGainsSectionAFormData>({
    resolver: zodResolver(capitalGainsSectionASchema) as any,
    defaultValues: initialData || {
      landBuildingSales: [],
      equityMfSales: {},
      nonResidentShares: {},
      nonResidentFII: {},
      otherAssetsSales: {},
      amountDeemedSTCG: 0,
      passeThroughIncome: {},
      stcgNotChargeableOrSpecialRates: [],
      totalSTCGNotChargeable: 0,
      totalSTCGSpecialRates: 0,
      capitalLossBuyBack: 0,
      totalShortTermCapitalGain: 0,
    },
  });

  const {
    fields: landBuildingFields,
    append: appendLandBuilding,
    remove: removeLandBuilding,
  } = useFieldArray({
    control,
    name: "landBuildingSales",
  });

  const watchAll = watch();

  // Calculate total deductions for land/building sales
  useEffect(() => {
    watchAll.landBuildingSales?.forEach((sale, index) => {
      const total =
        (sale.costAcquisitionWithoutIndexation || 0) +
        (sale.costImprovementWithoutIndexation || 0) +
        (sale.expenditureOnTransfer || 0);
      setValue(`landBuildingSales.${index}.totalDeductions`, total);
    });
  }, [watchAll.landBuildingSales, setValue]);

  // Calculate balance for land/building sales
  useEffect(() => {
    watchAll.landBuildingSales?.forEach((sale, index) => {
      const balance =
        (sale.fullValueAdopted || 0) - (sale.totalDeductions || 0);
      setValue(`landBuildingSales.${index}.balance`, balance);
    });
  }, [watchAll.landBuildingSales, setValue]);

  // Calculate short-term capital gain for land/building
  useEffect(() => {
    watchAll.landBuildingSales?.forEach((sale, index) => {
      const stcg = (sale.balance || 0) - (sale.deductionSection54B || 0);
      setValue(`landBuildingSales.${index}.shortTermCapitalGain`, stcg);
    });
  }, [watchAll.landBuildingSales, setValue]);

  // Calculate total short-term capital gain
  useEffect(() => {
    let total = 0;

    // Add land/building sales
    watchAll.landBuildingSales?.forEach((sale) => {
      total += sale.shortTermCapitalGain || 0;
    });

    // Add equity MF sales
    if (watchAll.equityMfSales) {
      total += watchAll.equityMfSales.transferBefore23July?.balance || 0;
      total += watchAll.equityMfSales.transferOnAfter23July?.balance || 0;
      total += watchAll.equityMfSales.stcgOtherShares || 0;
    }

    // Add non-resident shares
    if (watchAll.nonResidentShares) {
      total += watchAll.nonResidentShares.transferBefore23July || 0;
      total += watchAll.nonResidentShares.transferOnAfter23July || 0;
      total += watchAll.nonResidentShares.stcgOtherShares || 0;
      total += watchAll.nonResidentShares.stcgSection111A || 0;
    }

    // Add non-resident FII
    if (watchAll.nonResidentFII) {
      total += watchAll.nonResidentFII.shortTermCapitalGain || 0;
    }

    // Add other assets
    if (watchAll.otherAssetsSales) {
      total += watchAll.otherAssetsSales.shortTermCapitalGain || 0;
    }

    // Add deemed STCG
    total += watchAll.amountDeemedSTCG || 0;

    // Add pass through income
    if (watchAll.passeThroughIncome) {
      total += watchAll.passeThroughIncome.at15Percent || 0;
      total += watchAll.passeThroughIncome.at30Percent || 0;
      total += watchAll.passeThroughIncome.at30PercentB || 0;
      total += watchAll.passeThroughIncome.atApplicableRates || 0;
    }

    // Subtract amounts not chargeable or at special rates
    total -= watchAll.totalSTCGNotChargeable || 0;

    // Subtract capital loss on buy back
    total -= watchAll.capitalLossBuyBack || 0;

    setValue("totalShortTermCapitalGain", total);
  }, [watchAll, setValue]);

  const onSubmit = (data: CapitalGainsSectionAFormData) => {
    console.log("Capital Gains Section A submitted:", data);
    onComplete(data);
  };

  const onError = (errors: any) => {
    console.error("Capital Gains Section A validation errors:", errors);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="rounded-lg p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Schedule CG - Capital Gains
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Section A - Short-term Capital Gains (STCG)
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <div className="space-y-4 rounded-lg border-2 border-gray-300 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                1. From sale of land or building or both
              </h3>
              <button
                type="button"
                onClick={() =>
                  appendLandBuilding({
                    purchaseDate: "",
                    saleDate: "",
                    fullValueConsideration: 0,
                    stampDutyValue: 0,
                    fullValueAdopted: 0,
                    costAcquisitionWithoutIndexation: 0,
                    costImprovementWithoutIndexation: 0,
                    expenditureOnTransfer: 0,
                    totalDeductions: 0,
                    balance: 0,
                    deductionSection54B: 0,
                    shortTermCapitalGain: 0,
                  })
                }
                className="rounded-lg border-2 border-dashed border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:border-gray-400"
              >
                + Add Property
              </button>
            </div>

            {landBuildingFields.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-500">
                No properties added. Click "Add Property" to start.
              </p>
            ) : (
              <div className="space-y-6">
                {landBuildingFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-lg border-2 border-gray-200 p-6"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        Property {index + 1}
                      </h4>
                      {landBuildingFields.length > 0 && (
                        <button
                          type="button"
                          onClick={() => removeLandBuilding(index)}
                          className="rounded border border-red-500 px-3 py-1 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Date of purchase/acquisition (DD/MM/YYYY)
                        </label>
                        <input
                          {...register(
                            `landBuildingSales.${index}.purchaseDate`
                          )}
                          type="text"
                          placeholder="DD/MM/YYYY"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.landBuildingSales?.[index]?.purchaseDate && (
                          <p className="mt-1 text-xs text-red-500">
                            {
                              errors.landBuildingSales[index]?.purchaseDate
                                ?.message
                            }
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Date of sale/transfer (DD/MM/YYYY)
                        </label>
                        <input
                          {...register(`landBuildingSales.${index}.saleDate`)}
                          type="text"
                          placeholder="DD/MM/YYYY"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.landBuildingSales?.[index]?.saleDate && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.landBuildingSales[index]?.saleDate?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          a.i. Full value of consideration received/receivable
                        </label>
                        <input
                          {...register(
                            `landBuildingSales.${index}.fullValueConsideration`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          a.ii. Value of property as per stamp valuation
                          authority
                        </label>
                        <input
                          {...register(
                            `landBuildingSales.${index}.stampDutyValue`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          a.iii. Full value of consideration adopted as per
                          section 50C
                        </label>
                        <input
                          {...register(
                            `landBuildingSales.${index}.fullValueAdopted`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="mb-4 font-medium text-gray-700">
                        b. Deductions under section 48
                      </h5>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            b.i. Cost of acquisition without indexation
                          </label>
                          <input
                            {...register(
                              `landBuildingSales.${index}.costAcquisitionWithoutIndexation`,
                              { valueAsNumber: true }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            b.ii. Cost of improvement without indexation
                          </label>
                          <input
                            {...register(
                              `landBuildingSales.${index}.costImprovementWithoutIndexation`,
                              { valueAsNumber: true }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            b.iii. Expenditure wholly and exclusively in
                            connection with transfer
                          </label>
                          <input
                            {...register(
                              `landBuildingSales.${index}.expenditureOnTransfer`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            b.iv. Total (b.i + b.ii + b.iii)
                          </label>
                          <input
                            {...register(
                              `landBuildingSales.${index}.totalDeductions`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            readOnly
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            c. Balance (a.iii - b.iv)
                          </label>
                          <input
                            {...register(`landBuildingSales.${index}.balance`, {
                              valueAsNumber: true,
                            })}
                            type="number"
                            readOnly
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            d. Deduction under section 54B
                          </label>
                          <input
                            {...register(
                              `landBuildingSales.${index}.deductionSection54B`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div className="rounded-lg border-2 border-gray-300 p-3 md:col-span-2">
                          <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                            e. Short-term Capital Gains on Immovable property
                            (1c - 1d)
                          </label>
                          <input
                            {...register(
                              `landBuildingSales.${index}.shortTermCapitalGain`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            readOnly
                            className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-sm font-bold text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 rounded-lg border-2 border-gray-300 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              2. From sale of equity share or unit of equity oriented Mutual
              Fund (MF) or unit of a business trust
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-300 p-4">
                <h4 className="mb-3 font-medium text-gray-700">
                  i. Where the transfer was before 23rd July 2024
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-sm text-gray-700">
                      Full value of consideration
                    </label>
                    <input
                      {...register(
                        "equityMfSales.transferBefore23July.fullValueConsideration",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-300 p-4">
                <h4 className="mb-3 font-medium text-gray-700">
                  ii. Where the transfer was on or after 23rd July 2024
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-sm text-gray-700">
                      Full value of consideration
                    </label>
                    <input
                      {...register(
                        "equityMfSales.transferOnAfter23July.fullValueConsideration",
                        { valueAsNumber: true }
                      )}
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  b. STCG from sale of shares not covered in a1 or a2 or sale of
                  debentures
                </label>
                <input
                  {...register("equityMfSales.stcgOtherShares", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-gray-300 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              6. Amount deemed to be short term capital gains
            </h3>
            <input
              {...register("amountDeemedSTCG", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-4 rounded-lg border-2 border-gray-300 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              7. Pass Through Income/Loss in the nature of Short Term Capital
              Gain
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  a.i. Pass Through Income @ 15%
                </label>
                <input
                  {...register("passeThroughIncome.at15Percent", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  a.ii. Pass Through Income @ 30%
                </label>
                <input
                  {...register("passeThroughIncome.at30Percent", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  b. Pass Through Income @ 30%
                </label>
                <input
                  {...register("passeThroughIncome.at30PercentB", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  c. Pass Through Income @ applicable rates
                </label>
                <input
                  {...register("passeThroughIncome.atApplicableRates", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border-2 border-gray-300 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              8. Amount of STCG included in A1 - A7 but claimed as not
              chargeable to tax or chargeable at special rates in India as per
              DTAA
            </h3>

            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  a. Total amount of STCG claimed as not chargeable to tax in
                  India as per DTAA
                </label>
                <input
                  {...register("totalSTCGNotChargeable", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  b. Total amount of STCG claimed as chargeable to tax at
                  special rates in India as per DTAA
                </label>
                <input
                  {...register("totalSTCGSpecialRates", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-gray-300 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Capital Loss on buy back of shares on or after 01st October 2024
            </h3>
            <input
              {...register("capitalLossBuyBack", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="rounded-lg border-2 border-gray-300 p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              9. Total Short-term Capital Gain (A1e + A2e + A3a+ A3b+ A4e+ A5e +
              A6 + A7 - A8a + A(A))
            </h3>
            <input
              {...register("totalShortTermCapitalGain", {
                valueAsNumber: true,
              })}
              type="number"
              readOnly
              className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg font-bold text-gray-900"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:border-blue-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrTwoCapitalGain;
