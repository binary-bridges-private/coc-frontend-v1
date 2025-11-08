import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  capitalGainsSectionASchema,
  CapitalGainsSectionAFormData,
  capitalGainsSectionBSchema,
  CapitalGainsSectionBFormData,
} from "../itr-two.validation.ts";

import { PersonalInfoFormData } from "../itr-two.validation.ts";

interface ItrTwoCapitalGainProps {
  onComplete: (data: {
    sectionA: CapitalGainsSectionAFormData;
    sectionB: CapitalGainsSectionBFormData;
  }) => void;
  initialData?: {
    sectionA?: Partial<CapitalGainsSectionAFormData>;
    sectionB?: Partial<CapitalGainsSectionBFormData>;
  };
  personalInfo?: PersonalInfoFormData;
}

const ItrTwoCapitalGain: React.FC<ItrTwoCapitalGainProps> = ({
  onComplete,
  initialData,
  personalInfo,
}) => {
  const [showImportantNotes, setShowImportantNotes] = useState(false);

  const sectionAForm = useForm<CapitalGainsSectionAFormData>({
    resolver: zodResolver(capitalGainsSectionASchema) as any,
    defaultValues: initialData?.sectionA || {
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

  const sectionBForm = useForm<CapitalGainsSectionBFormData>({
    resolver: zodResolver(capitalGainsSectionBSchema) as any,
    defaultValues: initialData?.sectionB || {
      ltcgLandBuildingSales: [],
      unlistedBondsSales: [],
      listedSecuritiesSales: [],
      equitySharesSales: [],
      otherAssetsSales: [],
      totalLTCGChargeable: 0,
      totalCapitalIncome: 0,
      virtualDigitalAssetIncome: 0,
      totalCapitalGainsIncome: 0,
      totalDeductionClaimed: 0,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = sectionAForm;

  const [visibleCalculations, setVisibleCalculations] = useState<
    Record<string, boolean>
  >({});
  const [visibleLTCGCalculations, setVisibleLTCGCalculations] = useState<
    Record<string, boolean>
  >({});

  const {
    fields: landBuildingFields,
    append: appendLandBuilding,
    remove: removeLandBuilding,
  } = useFieldArray({
    control,
    name: "landBuildingSales",
  });

  const watchAll = watch();

  const computeLandBuildingValues = (
    sale: CapitalGainsSectionAFormData["landBuildingSales"][number],
    index: number
  ) => {
    const totalDeductions =
      (sale.costAcquisitionWithoutIndexation || 0) +
      (sale.costImprovementWithoutIndexation || 0) +
      (sale.expenditureOnTransfer || 0);
    const balance = (sale.fullValueAdopted || 0) - totalDeductions;
    const shortTermGain = balance - (sale.deductionSection54B || 0);

    setValue(`landBuildingSales.${index}.totalDeductions`, totalDeductions);
    setValue(`landBuildingSales.${index}.balance`, balance);
    setValue(`landBuildingSales.${index}.shortTermCapitalGain`, shortTermGain);
  };

  useEffect(() => {
    watchAll.landBuildingSales?.forEach((sale, index) => {
      const fieldId = landBuildingFields[index]?.id;
      if (!fieldId || !visibleCalculations[fieldId]) {
        return;
      }
      computeLandBuildingValues(sale, index);
    });
  }, [
    watchAll.landBuildingSales,
    landBuildingFields,
    visibleCalculations,
    setValue,
  ]);

  useEffect(() => {
    let total = 0;

    watchAll.landBuildingSales?.forEach((sale) => {
      total += sale.shortTermCapitalGain || 0;
    });

    if (watchAll.equityMfSales) {
      total += watchAll.equityMfSales.transferBefore23July?.balance || 0;
      total += watchAll.equityMfSales.transferOnAfter23July?.balance || 0;
      total += watchAll.equityMfSales.stcgOtherShares || 0;
    }

    if (watchAll.nonResidentShares) {
      total += watchAll.nonResidentShares.transferBefore23July || 0;
      total += watchAll.nonResidentShares.transferOnAfter23July || 0;
      total += watchAll.nonResidentShares.stcgOtherShares || 0;
      total += watchAll.nonResidentShares.stcgSection111A || 0;
    }

    if (watchAll.nonResidentFII) {
      total += watchAll.nonResidentFII.shortTermCapitalGain || 0;
    }

    if (watchAll.otherAssetsSales) {
      total += watchAll.otherAssetsSales.shortTermCapitalGain || 0;
    }

    total += watchAll.amountDeemedSTCG || 0;

    if (watchAll.passeThroughIncome) {
      total += watchAll.passeThroughIncome.at15Percent || 0;
      total += watchAll.passeThroughIncome.at30Percent || 0;
      total += watchAll.passeThroughIncome.at30PercentB || 0;
      total += watchAll.passeThroughIncome.atApplicableRates || 0;
    }

    total -= watchAll.totalSTCGNotChargeable || 0;

    total -= watchAll.capitalLossBuyBack || 0;

    setValue("totalShortTermCapitalGain", total);
  }, [watchAll, setValue]);

  const handleShowCalculations = (fieldId: string, index: number) => {
    setVisibleCalculations((prev) => ({ ...prev, [fieldId]: true }));
    const sale = watchAll.landBuildingSales?.[index];
    if (sale) {
      computeLandBuildingValues(sale, index);
    }
  };

  const handleRemoveLandBuilding = (fieldId: string, index: number) => {
    setVisibleCalculations((prev) => {
      if (!prev[fieldId]) {
        return prev;
      }
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
    removeLandBuilding(index);
  };

  // Manual calculation for B13: Total LTCG
  const calculateTotalLTCG = () => {
    const sectionBData = sectionBForm.getValues();
    let total = 0;

    // Sum from all LTCG land/building sales
    sectionBData.ltcgLandBuildingSales?.forEach((sale) => {
      total += sale.longTermCapitalGain || 0;
    });

    // Sum from unlisted bonds
    sectionBData.unlistedBondsSales?.forEach((sale) => {
      total += sale.ltcgOnBonds || 0;
    });

    // Sum from listed securities
    sectionBData.listedSecuritiesSales?.forEach((sale) => {
      total += sale.ltcgOnSecurities || 0;
    });

    // Sum from equity shares
    sectionBData.equitySharesSales?.forEach((sale) => {
      total += sale.ltcgOnAssets || 0;
    });

    // Sum from other assets
    sectionBData.otherAssetsSales?.forEach((sale) => {
      total += sale.ltcgOnAssets || 0;
    });

    sectionBForm.setValue("totalLTCGChargeable", total);
  };

  // Manual calculation for C3: Total Capital Gains Income
  const calculateTotalCapitalGainsIncome = () => {
    const sectionAData = sectionAForm.getValues();
    const sectionBData = sectionBForm.getValues();

    // C1 = A9 + B13
    const totalSTCG = sectionAData.totalShortTermCapitalGain || 0;
    const totalLTCG = sectionBData.totalLTCGChargeable || 0;
    const c1 = totalSTCG + totalLTCG;
    sectionBForm.setValue("totalCapitalIncome", c1);

    // C3 = C1 + C2
    const c2 = sectionBData.virtualDigitalAssetIncome || 0;
    const c3 = c1 + c2;
    sectionBForm.setValue("totalCapitalGainsIncome", c3);
  };

  const onSubmitBothSections = () => {
    const sectionAData = sectionAForm.getValues();
    const sectionBData = sectionBForm.getValues();

    console.log("Capital Gains Section A submitted:", sectionAData);
    console.log("Capital Gains Section B submitted:", sectionBData);

    onComplete({
      sectionA: sectionAData,
      sectionB: sectionBData,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setShowImportantNotes(!showImportantNotes)}
          className="flex w-full items-center justify-between text-left"
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Important Notes & Instructions
          </h3>
          <svg
            className={`h-5 w-5 transform text-gray-700 transition-transform ${
              showImportantNotes ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showImportantNotes && (
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 font-semibold text-gray-900">
                📌 Sub-sections 5, 6, 7 & 8 are not applicable for residents
              </p>
              <p className="text-xs text-gray-600">
                These sections relate to specific scenarios for non-residents,
                FIIs, and foreign exchange assets.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 font-semibold text-gray-900">
                📅 Significance of July 23, 2024
              </p>
              <p className="text-xs text-gray-600">
                For residents, from sale of unlisted bonds or unlisted
                debentures (other than capital indexed bonds issued by
                Government) applicable only where transfer was before 23rd July
                2024. For computational purposes under second proviso to section
                112(1)(a) where acquisition is before and transfer is on or
                after 23rd July 2024, applicable for residents.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 font-semibold text-gray-900">🔢 Indexation Benefit</p>
              <p className="text-xs text-gray-600">
                (A) For transfers before 23rd July 2024, OR (B) Residents for
                computational purposes under second proviso to section 112(1)(a)
                where acquisition is before and transfer is on or after 23rd
                July 2024. Only for the purpose of computing ciB (biia = bi +
                biii).
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 font-semibold text-gray-900">
                🏦 Capital Gains Account Scheme
              </p>
              <p className="text-xs text-gray-600">
                For claiming deduction under section 54/54B/54EC/54F/54GB, you
                can deposit unutilized capital gains in Capital Gains Accounts
                Scheme within the date for furnishing the return u/s 139(1).
                Provide details below in item D.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 font-semibold text-gray-900">📄 Furnishing of PAN/Aadhaar</p>
              <p className="text-xs text-gray-600">
                Furnishing of PAN/Aadhaar No. is mandatory, if the tax is
                deducted under section 194-IA or is quoted by buyer in the
                documents. In case of more than one buyer, please indicate the
                respective percentage share and amount.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 font-semibold text-gray-900">⚖️ DTAA Provisions</p>
              <p className="text-xs text-gray-600">
                For partial taxability under chapter XII-A, break up of income
                based on date of transfer is not required. Note: The figures of
                STCG in this table (A1e* etc.) are the amounts of STCG, computed
                in respective column (A1-A7) either such similar securities and
                as reduced by the amount of STCG not chargeable to tax or
                chargeable at special rates as per DTAA, which is included
                therein, if any.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">
          Schedule CG - Capital Gains
        </h2>
        <p className="mb-4 text-sm font-medium text-gray-700">
          Section A - Short-term Capital Gains (STCG)
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitBothSections();
          }}
          className="space-y-8"
        >
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
                  } as any)
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
                {landBuildingFields.map((field, index) => {
                  const fieldId = field.id;
                  const showCalculations = !!visibleCalculations[fieldId];

                  return (
                    <div
                      key={field.id}
                      className="rounded-lg border-2 border-gray-200 p-6"
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                        <h4 className="font-semibold text-gray-900">
                          Property {index + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleShowCalculations(fieldId, index)
                            }
                            className="rounded border border-blue-500 px-3 py-1 text-xs font-semibold text-blue-600 transition-colors hover:border-blue-600 hover:text-blue-700"
                          >
                            {showCalculations
                              ? "Recalculate"
                              : "Show Calculations"}
                          </button>
                          {landBuildingFields.length > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveLandBuilding(fieldId, index)
                              }
                              className="rounded border border-red-500 px-3 py-1 text-sm text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      {!showCalculations && (
                        <p className="mb-4 text-xs text-gray-500">
                          Calculated fields stay blank until you click "Show
                          Calculations".
                        </p>
                      )}
                      {showCalculations && (
                        <p className="mb-4 text-xs font-medium text-blue-600">
                          Calculations are up to date. Edit values and press
                          "Recalculate" if needed.
                        </p>
                      )}

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
                              {
                                errors.landBuildingSales[index]?.saleDate
                                  ?.message
                              }
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

                          <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
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
                              placeholder="Auto-calculated"
                              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                            />
                          </div>

                          <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                              c. Balance (a.iii - b.iv)
                            </label>
                            <input
                              {...register(
                                `landBuildingSales.${index}.balance`,
                                {
                                  valueAsNumber: true,
                                }
                              )}
                              type="number"
                              readOnly
                              placeholder="Auto-calculated"
                              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
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

                          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-3 md:col-span-2">
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
                              placeholder="Auto-calculated"
                              className="w-full rounded-lg border-2 border-blue-300 bg-blue-50 px-3 py-2 text-sm font-bold text-gray-900 placeholder:text-gray-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

          <div className="rounded-lg border-2 border-gray-300  p-6">
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
              placeholder="Auto-calculated"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Section B - Long-Term Capital Gains */}
          <div className="border-t-4 border-purple-300 pt-8">
            <h2 className="mb-6 text-2xl font-bold text-purple-900">
              Section B - Long-term Capital Gains (LTCG)
            </h2>

            <LTCGSectionB
              form={sectionBForm}
              visibleCalculations={visibleLTCGCalculations}
              setVisibleCalculations={setVisibleLTCGCalculations}
              calculateTotalLTCG={calculateTotalLTCG}
              calculateTotalCapitalGainsIncome={calculateTotalCapitalGainsIncome}
              sectionAForm={sectionAForm}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface LTCGSectionBProps {
  form: ReturnType<typeof useForm<CapitalGainsSectionBFormData>>;
  visibleCalculations: Record<string, boolean>;
  setVisibleCalculations: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  calculateTotalLTCG: () => void;
  calculateTotalCapitalGainsIncome: () => void;
  sectionAForm: ReturnType<typeof useForm<CapitalGainsSectionAFormData>>;
}

const LTCGSectionB: React.FC<LTCGSectionBProps> = ({
  form,
  visibleCalculations,
  setVisibleCalculations,
  calculateTotalLTCG,
  calculateTotalCapitalGainsIncome,
  sectionAForm,
}) => {
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form;

  const {
    fields: ltcgLandBuildingFields,
    append: appendLTCGLandBuilding,
    remove: removeLTCGLandBuilding,
  } = useFieldArray({
    control,
    name: "ltcgLandBuildingSales",
  });

  const watchAll = watch();

  const computeLTCGPropertyValues = (
    sale: CapitalGainsSectionBFormData["ltcgLandBuildingSales"][number],
    index: number
  ) => {
    const balance =
      (sale.fullValueAdopted || 0) -
      ((sale.costAcquisitionWithIndexation ||
        sale.costAcquisitionWithoutIndexation ||
        0) +
        (sale.costImprovementWithIndexation ||
          sale.costImprovementWithoutIndexation ||
          0) +
        (sale.expenditureOnTransfer || 0));

    const ltcg = balance - (sale.deductionSection54 || 0);

    setValue(`ltcgLandBuildingSales.${index}.balance`, balance);
    setValue(`ltcgLandBuildingSales.${index}.longTermCapitalGain`, ltcg);
  };

  const handleShowLTCGCalculations = (fieldId: string, index: number) => {
    setVisibleCalculations((prev) => ({ ...prev, [fieldId]: true }));
    const sale = watchAll.ltcgLandBuildingSales?.[index];
    if (sale) {
      computeLTCGPropertyValues(sale, index);
    }
  };

  const handleRemoveLTCGProperty = (fieldId: string, index: number) => {
    setVisibleCalculations((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
    removeLTCGLandBuilding(index);
  };

  return (
    <div className="space-y-8">
      {/* B1: From sale of land or building or both */}
      <div className="space-y-4 rounded-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-purple-900">
            B1. From sale of land or building or both
          </h3>
          <button
            type="button"
            onClick={() =>
              appendLTCGLandBuilding({
                purchaseDate: "",
                saleDate: "",
              } as any)
            }
            className="rounded-lg border-2 border-dashed border-purple-400 px-3 py-1 text-sm font-medium text-purple-700 hover:border-purple-500"
          >
            + Add Property
          </button>
        </div>

        {ltcgLandBuildingFields.length === 0 ? (
          <p className="py-4 text-center text-sm text-purple-600">
            No properties added. Click "Add Property" to start.
          </p>
        ) : (
          <div className="space-y-6">
            {ltcgLandBuildingFields.map((field, index) => {
              const fieldId = field.id;
              const showCalculations = !!visibleCalculations[fieldId];

              return (
                <div
                  key={field.id}
                  className="rounded-lg border-2 border-purple-200 bg-white p-6"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-semibold text-purple-900">
                      Property {index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleShowLTCGCalculations(fieldId, index)
                        }
                        className="rounded border border-purple-500 px-3 py-1 text-xs font-semibold text-purple-600 transition-colors hover:border-purple-600 hover:text-purple-700"
                      >
                        {showCalculations ? "Recalculate" : "Show Calculations"}
                      </button>
                      {ltcgLandBuildingFields.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveLTCGProperty(fieldId, index)
                          }
                          className="rounded border border-red-500 px-3 py-1 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {!showCalculations && (
                    <p className="mb-4 text-xs text-purple-600">
                      Calculated fields stay blank until you click "Show
                      Calculations".
                    </p>
                  )}
                  {showCalculations && (
                    <p className="mb-4 text-xs font-medium text-purple-700">
                      Calculations are up to date. Edit values and press
                      "Recalculate" if needed.
                    </p>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Date of purchase/acquisition (DD/MM/YYYY)
                      </label>
                      <input
                        {...register(
                          `ltcgLandBuildingSales.${index}.purchaseDate`
                        )}
                        type="text"
                        placeholder="DD/MM/YYYY"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Date of sale/transfer (DD/MM/YYYY)
                      </label>
                      <input
                        {...register(`ltcgLandBuildingSales.${index}.saleDate`)}
                        type="text"
                        placeholder="DD/MM/YYYY"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        a.i. Full value of consideration received/receivable
                      </label>
                      <input
                        {...register(
                          `ltcgLandBuildingSales.${index}.fullValueConsideration`,
                          { valueAsNumber: true }
                        )}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        a.ii. Value of property as per stamp valuation authority
                      </label>
                      <input
                        {...register(
                          `ltcgLandBuildingSales.${index}.stampDutyValue`,
                          { valueAsNumber: true }
                        )}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                          `ltcgLandBuildingSales.${index}.fullValueAdopted`,
                          { valueAsNumber: true }
                        )}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                            `ltcgLandBuildingSales.${index}.costAcquisitionWithoutIndexation`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          b.ia. Cost of acquisition with indexation
                        </label>
                        <input
                          {...register(
                            `ltcgLandBuildingSales.${index}.costAcquisitionWithIndexation`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          b.ii. Cost of improvement without indexation
                        </label>
                        <input
                          {...register(
                            `ltcgLandBuildingSales.${index}.costImprovementWithoutIndexation`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          b.iia. Cost of improvement with indexation
                        </label>
                        <input
                          {...register(
                            `ltcgLandBuildingSales.${index}.costImprovementWithIndexation`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                            `ltcgLandBuildingSales.${index}.expenditureOnTransfer`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="rounded-lg md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-purple-700">
                          c. Balance (a.iii - total deductions)
                        </label>
                        <input
                          {...register(
                            `ltcgLandBuildingSales.${index}.balance`,
                            {
                              valueAsNumber: true,
                            }
                          )}
                          type="number"
                          readOnly
                          placeholder="Click 'Show Calculations'"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          d. Deduction under section 54/54B/54D/54F/54GB
                        </label>
                        <input
                          {...register(
                            `ltcgLandBuildingSales.${index}.deductionSection54`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="0.00"
                        />
                      </div>

                      <div className="rounded-lg border-2 border-purple-400 p-3">
                        <label className="mb-1.5 block text-sm font-semibold text-purple-900">
                          e. Long-term Capital Gains on Immovable property (c -
                          d)
                        </label>
                        <input
                          {...register(
                            `ltcgLandBuildingSales.${index}.longTermCapitalGain`,
                            { valueAsNumber: true }
                          )}
                          type="number"
                          readOnly
                          placeholder="Click 'Show Calculations'"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* B13: Total LTCG */}
      <div className="rounded-lg ">
        <h3 className="mb-4 text-lg font-semibold text-purple-900">
          B13. Total long-term capital gain chargeable under I.T. Act
        </h3>
        <div className="flex gap-3">
          <input
            {...register("totalLTCGChargeable", {
              valueAsNumber: true,
            })}
            type="number"
            readOnly
            placeholder="Auto-calculated"
            className="flex-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={calculateTotalLTCG}
            className="rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Calculate total LTCG from all assets"
          >
            Calculate
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Click "Calculate" to sum all long-term capital gains from B1 through B12
        </p>
      </div>

      {/* C1-C3: Total Capital Income */}
      <div className="space-y-4 rounded-lg">
        <h3 className="text-lg font-semibold text-indigo-900">
          Summary - Total Capital Income
        </h3>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            C1. Sum of Capital Incomes (A9 + B13)
          </label>
          <input
            {...register("totalCapitalIncome", {
              valueAsNumber: true,
            })}
            type="number"
            readOnly
            placeholder="Auto-calculated"
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            C2. Income from transfer of Virtual Digital Assets (Col. 7 of
            schedule VDA)
          </label>
          <input
            {...register("virtualDigitalAssetIncome", {
              valueAsNumber: true,
            })}
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-4">
          <label className="mb-1.5 block text-sm font-semibold text-indigo-900">
            C3. Income chargeable under the head "CAPITAL GAINS" (C1 + C2)
          </label>
          <div className="flex gap-3">
            <input
              {...register("totalCapitalGainsIncome", {
                valueAsNumber: true,
              })}
              type="number"
              readOnly
              placeholder="Auto-calculated"
              className="flex-1 rounded-lg border-2 border-indigo-400 bg-gray-100 px-4 py-3 text-lg font-bold text-indigo-900 placeholder:text-indigo-400"
            />
            <button
              type="button"
              onClick={calculateTotalCapitalGainsIncome}
              className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              title="Calculate total capital gains income (C1 + C2)"
            >
              Calculate
            </button>
          </div>
          <p className="mt-2 text-xs text-indigo-700">
            Click "Calculate" to compute: (A9 + B13) + C2 = Total Capital Gains Income
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItrTwoCapitalGain;
