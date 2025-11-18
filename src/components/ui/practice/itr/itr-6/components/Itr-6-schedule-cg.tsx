import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleCGProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleCG: React.FC<ScheduleCGProps> = ({
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
            Schedule CG
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Capital Gains
          </h2>
          <p className="text-sm text-gray-600">
            Short-term and Long-term Capital Gains computation
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

        {/* Part A: Short-term Capital Gains (STCG) */}
        <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="text-lg font-bold text-blue-900">
            Part A: Short-term Capital Gains (STCG)
          </h3>
          <p className="text-sm text-blue-800">
            (Sub-items 1 & 5 are not applicable for residents)
          </p>

          {/* STCG Item 1: From sale of land or building */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              1. From sale of land or building (With or without co-ownership, enter your share of capital gain)
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of purchase/acquisition (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("stcgLandBuildingDatePurchase" as any)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of sale/transfer (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("stcgLandBuildingDateSale" as any)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="1.i - Full value of consideration received/receivable"
                  name="stcgLandBuildingConsideration"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.ii - Value of property as per stamp valuation authority"
                  name="stcgLandBuildingStampValue"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.iii - Full value of consideration as per section 50C (or specify)"
                  name="stcgLandBuildingSection50C"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="1.b - Reduction as per clause (iii) of section 48"
                  name="stcgLandBuildingReduction48"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.b.i - Cost of acquisition without indexation"
                  name="stcgLandBuildingCostNoIndex"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.b.ii - Cost of improvement without indexation"
                  name="stcgLandBuildingImprovementNoIndex"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="1.b.iii - Expenditure wholly and exclusively in connection with transfer"
                  name="stcgLandBuildingExpenditure"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.c - Balance (a-i - b) - Short-term Capital Gain"
                  name="stcgLandBuildingGain"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* STCG Item 2: From slump sale */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              2. From slump sale
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="2.a.i - Fair market value as per Rule 11UAE(2)"
                  name="stcgSlumpFairMarket1"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.a.ii - Fair market value as per Rule 11UAE(3)"
                  name="stcgSlumpFairMarket2"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.a.iii - Full value of consideration (higher of all or all)"
                  name="stcgSlumpConsideration"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="2.b - Net worth of the undertaking or division"
                  name="stcgSlumpNetWorth"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.c - Short term capital gains from slump sale (2Aiii-2B)"
                  name="stcgSlumpGain"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="2.d - Reduction as per clause (i) of section 48"
                  name="stcgSlumpReduction48"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.e - Cost of acquisition with indexation"
                  name="stcgSlumpCostIndex"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* STCG Item 3: From sale of equity shares/MF */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              3. From sale of equity share or unit of equity oriented Mutual Fund (MF) or unit of a business trust on which STT is paid under section 111A
            </h4>
            <p className="text-sm text-gray-600">
              (Where applicable, Dividend income u/s 2(22)(d) is offered) Short Term Capital Loss
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Where transferred before 23rd July 2024 (if) (Amount)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("stcgEquityBefore23July" as any)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Where transferred on or after 23rd July 2024 (ii) (Amount)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("stcgEquityOn23July" as any)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STCG Item 4: From sale of debentures */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              4. For NON-RESIDENT STCG (not being an FII): from sale of shares or debentures of an Indian company
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    4A(i - STCG on transaction covered u/s 111A (A4ai-A4aii)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("stcgNonResident4Ai" as any)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    4A(ii - (Where transfer was before 23rd July 2024
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("stcgNonResident4Aii" as any)}
                  />
                </div>
              </div>
              <InputField
                label="4A(iii - (Where transfer was on or after 23rd July 2024"
                name="stcgNonResident4Aiii"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="4B - STCG from sale of debentures"
                name="stcgNonResident4B"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>

          {/* STCG Item 5: From sale of other capital assets */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              5. From sale of other capital assets (other than those covered above)
            </h4>
            <InputField
              label="5 - Amount"
              name="stcgOtherAssets"
              type="number"
              placeholder="0"
              register={register}
            />
          </div>

          {/* STCG Total */}
          <div className="rounded-md bg-yellow-100 p-4 text-sm font-bold text-yellow-600">
            <div className="flex justify-between">
              <span>Total Short-term Capital Gains (1+2+3+4+5):</span>
              <span>
                {(
                  parseFloat(watch("stcgLandBuildingConsideration") || 0) -
                    parseFloat(watch("stcgLandBuildingDeductions") || 0) +
                    parseFloat(watch("stcgSlumpGain") || 0) +
                    parseFloat(watch("stcgEquityBefore31July") || 0) +
                    parseFloat(watch("stcgEquityAfter1August") || 0) +
                    parseFloat(watch("stcgNonResident4Ai") || 0) +
                    parseFloat(watch("stcgNonResident4Aii") || 0) +
                    parseFloat(watch("stcgNonResident4Aiii") || 0) +
                    parseFloat(watch("stcgNonResident4B") || 0) +
                    parseFloat(watch("stcgOtherAssets") || 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Part B: Long-term Capital Gains (LTCG) */}
        <div className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="text-lg font-bold text-green-900">
            Part B: Long-term Capital Gains (LTCG)
          </h3>
          <p className="text-sm text-green-800">
            (Sub-items 6, 7& 8 are not applicable for residents)
          </p>

          {/* LTCG Item 1: From sale of land or building */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              1. From sale of land or building (With or without co-ownership, enter your share of Capital Gain)
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of purchase/acquisition (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("ltcgLandBuildingDatePurchase" as any)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of sale/transfer (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    {...register("ltcgLandBuildingDateSale" as any)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="A.i - Full value of consideration received/receivable"
                  name="ltcgLandBuildingConsideration"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="A.ii - Value of property as per stamp valuation authority"
                  name="ltcgLandBuildingStampValue"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="A.iii - Full value of consideration as per section 50C"
                  name="ltcgLandBuildingSection50C"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="B - Reduction as per clause (iii) of section 48 of the Act"
                  name="ltcgLandBuildingReduction48"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="B.i - Cost of acquisition without indexation"
                  name="ltcgLandBuildingCostNoIndex"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="B.ia - Cost of acquisition with indexation (applicable for transfers before 23rd July 2024)"
                  name="ltcgLandBuildingCostIndexBefore23"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="B.ib - Cost of acquisition with indexation (applicable only for transfers on or after 23rd July 2024)"
                  name="ltcgLandBuildingCostIndexAfter23"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="B.ii - Cost of improvement without indexation"
                  name="ltcgLandBuildingImprovementNoIndex"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="B.iia - Cost of improvement with indexation (transfer before 23rd July 2024)"
                  name="ltcgLandBuildingImprovementIndexBefore23"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="B.iib - Cost of improvement with indexation (transfer on or after 23rd July 2024)"
                  name="ltcgLandBuildingImprovementIndexAfter23"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="B.iii - Expenditure wholly and exclusively in connection with transfer"
                  name="ltcgLandBuildingExpenditure"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.c - Balance (a-i - b) or (a-i - bii) where transfer before 23rd July 2024 [bi + bii + biii - biia]"
                  name="ltcgLandBuildingBalance"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="B.1 - Deductions under section 54/54EC/54EE"
                  name="ltcgLandBuildingDeductions54"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="1.d - Long-term Capital Gains on Immovable property (1c - 1d)"
                  name="ltcgLandBuildingGain"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* LTCG Item 2: From slump sale */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              2. From slump sale
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="2.a.i - Fair market value as per Rule 11UAE(2)"
                  name="ltcgSlumpFairMarket1"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.a.ii - Fair market value as per Rule 11UAE(3)"
                  name="ltcgSlumpFairMarket2"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.a.iii - Full value of consideration"
                  name="ltcgSlumpConsideration"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="2.b - Net worth of undertaking"
                  name="ltcgSlumpNetWorth"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.c - Long term capital gains from slump sale (2a-2b)"
                  name="ltcgSlumpGain"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="2.d - Deduction u/s 54EC"
                  name="ltcgSlumpDeduction54EC"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* LTCG Item 3: From residents from sale of unlisted bonds */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              3. From residents from sale of unlisted bonds on indexed debenture (Applicable only where transfer was before 23rd July 2024)
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="3.a - Full value of consideration"
                  name="ltcgResidentBondsConsideration"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="3.b - Deductions under section 48"
                  name="ltcgResidentBondsDeductions"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>
          </div>

          {/* LTCG Item 4: From sale of listed securities */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              4. From sale of listed securities (other than a unit) or zero coupon bonds
            </h4>
            <InputField
              label="4.a - Full value of consideration"
              name="ltcgListedSecuritiesConsideration"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="4.b - Deductions under section 48"
              name="ltcgListedSecuritiesDeductions"
              type="number"
              placeholder="0"
              register={register}
            />
          </div>

          {/* LTCG Item 5: From NON-RESIDENTS */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              5. For NON-RESIDENTS: From sale of (i) unlisted securities (other than those at A3 above) by an FII as per section 115AD
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InputField
                  label="A.i - Full value of consideration in respect of unquoted shares"
                  name="ltcgNonResUnquotedConsideration"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="A.ii - Fair market value of unquoted shares"
                  name="ltcgNonResUnquotedFairMarket"
                  type="number"
                  placeholder="0"
                  register={register}
                />
                <InputField
                  label="A.iii - Full value of consideration as per section 50CA"
                  name="ltcgNonResUnquotedSection50CA"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
              <InputField
                label="A.iii - Full value of consideration in respect of assets other than unquoted shares"
                name="ltcgNonResOtherAssets"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="B - Deductions under section 48"
                name="ltcgNonResDeductions"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>
          <div className="rounded-md bg-yellow-100 p-4 text-sm font-bold text-yellow-600">
            <div className="flex justify-between">
              <span>Total Long-term Capital Gains (1+2+3+4+5):</span>
              <span>
                {(
                  parseFloat(watch("ltcgLandBuildingGain") || 0) +
                    parseFloat(watch("ltcgSlumpGain") || 0) +
                    parseFloat(watch("ltcgResidentBondsConsideration") || 0) -
                    parseFloat(watch("ltcgResidentBondsDeductions") || 0) +
                    parseFloat(watch("ltcgListedSecuritiesConsideration") || 0) -
                    parseFloat(watch("ltcgListedSecuritiesDeductions") || 0) +
                    parseFloat(watch("ltcgNonResUnquotedConsideration") || 0) -
                    parseFloat(watch("ltcgNonResDeductions") || 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border-2 border-purple-300 bg-purple-50 p-5">
          <h3 className="text-lg font-bold text-purple-900">Summary</h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-blue-100 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total STCG:</span>
                <span className="font-bold text-blue-600">
                  {(
                    parseFloat(watch("stcgLandBuildingGain") || 0) +
                      parseFloat(watch("stcgSlumpGain") || 0) +
                      parseFloat(watch("stcgEquityBefore23July") || 0) +
                      parseFloat(watch("stcgEquityOn23July") || 0) +
                      parseFloat(watch("stcgNonResident4Ai") || 0) +
                      parseFloat(watch("stcgNonResident4Aii") || 0) +
                      parseFloat(watch("stcgNonResident4Aiii") || 0) +
                      parseFloat(watch("stcgNonResident4B") || 0) +
                      parseFloat(watch("stcgOtherAssets") || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="rounded-md bg-green-100 p-3 text-sm font-medium text-gray-800">
              <div className="flex justify-between">
                <span>Total LTCG:</span>
                <span className="font-bold text-green-600">
                  {(
                    parseFloat(watch("ltcgLandBuildingGain") || 0) +
                      parseFloat(watch("ltcgSlumpGain") || 0) +
                      parseFloat(watch("ltcgResidentBondsConsideration") || 0) -
                      parseFloat(watch("ltcgResidentBondsDeductions") || 0) +
                      parseFloat(watch("ltcgListedSecuritiesConsideration") || 0) -
                      parseFloat(watch("ltcgListedSecuritiesDeductions") || 0) +
                      parseFloat(watch("ltcgNonResUnquotedConsideration") || 0) -
                      parseFloat(watch("ltcgNonResDeductions") || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-purple-100 p-3 text-sm font-bold text-purple-700">
            <div className="flex justify-between">
              <span>Total Capital Gains (STCG + LTCG):</span>
              <span>
                {(
                  parseFloat(watch("stcgLandBuildingGain") || 0) +
                    parseFloat(watch("stcgSlumpGain") || 0) +
                    parseFloat(watch("stcgEquityBefore23July") || 0) +
                    parseFloat(watch("stcgEquityOn23July") || 0) +
                    parseFloat(watch("stcgNonResident4Ai") || 0) +
                    parseFloat(watch("stcgNonResident4Aii") || 0) +
                    parseFloat(watch("stcgNonResident4Aiii") || 0) +
                    parseFloat(watch("stcgNonResident4B") || 0) +
                    parseFloat(watch("stcgOtherAssets") || 0) +
                    parseFloat(watch("ltcgLandBuildingGain") || 0) +
                    parseFloat(watch("ltcgSlumpGain") || 0) +
                    parseFloat(watch("ltcgResidentBondsConsideration") || 0) -
                    parseFloat(watch("ltcgResidentBondsDeductions") || 0) +
                    parseFloat(watch("ltcgListedSecuritiesConsideration") || 0) -
                    parseFloat(watch("ltcgListedSecuritiesDeductions") || 0) +
                    parseFloat(watch("ltcgNonResUnquotedConsideration") || 0) -
                    parseFloat(watch("ltcgNonResDeductions") || 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Section D: Information about deduction claimed against Capital Gains */}
          <div className="space-y-4 rounded-md border border-gray-300 bg-white p-4">
            <h4 className="font-semibold text-gray-900">
              D. Information about deduction claimed against Capital Gains
            </h4>
            
            {/* D.I: Deduction u/s 54D/54EC/54ECA */}
            <div className="space-y-3">
              <div className="font-semibold text-gray-800">D.I - Deduction u/s 54D/54EC/54CA/54GA</div>
              
              {/* D.I.a: Deduction u/s 54D */}
              <div className="rounded-md bg-gray-50 p-3 space-y-3 border border-gray-200">
                <div className="font-medium text-gray-700">a) Deduction u/s 54D</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of acquisition of original asset (DD/MM/YYYY)"
                    name="d54dDateAcquisition"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Cost of purchase/construction of new asset"
                    name="d54dCostNew"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of purchase/construction of new asset (DD/MM/YYYY)"
                    name="d54dDateNewAsset"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Amount deposited in Capital Gains Accounts Scheme"
                    name="d54dAmountDeposited"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <InputField
                  label="Amount of deduction claimed u/s 54D"
                  name="d54dDeductionClaimed"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>

              {/* D.I.b: Deduction u/s 54EC */}
              <div className="rounded-md bg-gray-50 p-3 space-y-3 border border-gray-200">
                <div className="font-medium text-gray-700">b) Deduction u/s 54EC</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of transfer of original asset (DD/MM/YYYY)"
                    name="d54ecDateTransfer"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Amount invested in specified/notified bonds (not exceeding 50 lac rupees)"
                    name="d54ecAmountInvested"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of investment (DD/MM/YYYY)"
                    name="d54ecDateInvestment"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Amount of deduction claimed u/s 54EC"
                    name="d54ecDeductionClaimed"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
              </div>

              {/* D.I.c: Deduction u/s 54CA */}
              <div className="rounded-md bg-gray-50 p-3 space-y-3 border border-gray-200">
                <div className="font-medium text-gray-700">c) Deduction u/s 54CA</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of transfer of original asset (DD/MM/YYYY)"
                    name="d54caDateTransfer"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Cost and expenses incurred for purchase or construction of new asset"
                    name="d54caCostExpenses"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of purchase/construction of new asset in an area other than SEZ (DD/MM/YYYY)"
                    name="d54caDateNewAsset"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Amount deposited in Capital Gains Accounts Scheme"
                    name="d54caAmountDeposited"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <InputField
                  label="Amount of deduction claimed u/s 54CA"
                  name="d54caDeductionClaimed"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>

              {/* D.I.d: Deduction u/s 54GA */}
              <div className="rounded-md bg-gray-50 p-3 space-y-3 border border-gray-200">
                <div className="font-medium text-gray-700">d) Deduction u/s 54GA</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of transfer of original asset from urban area (DD/MM/YYYY)"
                    name="d54gaDateTransfer"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Cost and expenses incurred for purchase or construction of new asset in SEZ"
                    name="d54gaCostExpenses"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Date of purchase/construction of new asset in SEZ (DD/MM/YYYY)"
                    name="d54gaDateNewAsset"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    register={register}
                  />
                  <InputField
                    label="Amount deposited in Capital Gains Accounts Scheme"
                    name="d54gaAmountDeposited"
                    type="number"
                    placeholder="0"
                    register={register}
                  />
                </div>
                <InputField
                  label="Amount of deduction claimed u/s 54GA"
                  name="d54gaDeductionClaimed"
                  type="number"
                  placeholder="0"
                  register={register}
                />
              </div>
            </div>

            {/* Total deduction */}
            <div className="rounded-md bg-yellow-100 p-3 font-bold text-yellow-800">
              <div className="flex justify-between">
                <span>Total deduction claimed (Ia + Ib + Ic + Id)</span>
                <span>
                  {(
                    (parseFloat(watch("d54dDeductionClaimed") || 0)) +
                    (parseFloat(watch("d54ecDeductionClaimed") || 0)) +
                    (parseFloat(watch("d54caDeductionClaimed") || 0)) +
                    (parseFloat(watch("d54gaDeductionClaimed") || 0))
                  ).toFixed(2)}
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

export default ScheduleCG;
