import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleCYLProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleCYL: React.FC<ScheduleCYLProps> = ({
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
            Schedule CYL
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Details of Income after Set off of current year losses
          </h2>
          <p className="text-sm text-gray-600">
            Details of income from different sources after set off of current year losses
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

        {/* Income Details Table */}
        <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="text-lg font-bold text-blue-900">
            Income after Set off of Current Year Losses
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-sm font-semibold text-left">
                    Sl.No.
                  </th>
                  <th className="border border-gray-300 p-3 text-sm font-semibold text-left">
                    Head/Source of Income
                  </th>
                  <th className="border border-gray-300 p-3 text-sm font-semibold text-center">
                    Income or (loss) (Fill this column only if income is zero or positive)
                  </th>
                  <th className="border border-gray-300 p-3 text-sm font-semibold text-center">
                    Head/Source of set off current year set off
                  </th>
                  <th className="border border-gray-300 p-3 text-sm font-semibold text-center">
                    Amount other than speculation or chargeable at special rates
                  </th>
                  <th className="border border-gray-300 p-3 text-sm font-semibold text-center">
                    Current Year Income
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row I: Loss to be set off */}
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 p-3 font-semibold">I</td>
                  <td className="border border-gray-300 p-3">
                    Loss to be set off (Fill this row only, if computed figure is negative)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("lossToBeSetOff" as any)}
                    />
                  </td>
                  <td colSpan={3} className="border border-gray-300 p-3 text-center text-gray-500">
                    -
                  </td>
                </tr>

                {/* Row II: House property */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">II</td>
                  <td className="border border-gray-300 p-3">House property</td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("housePropertyIncome" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (3 of Schedule HP)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("housePropertySetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("housePropertyCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row III: Business */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">III</td>
                  <td className="border border-gray-300 p-3">
                    Business (excluding income from life insurance business u/s 113B, speculation income and income from specified business)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("businessIncome" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (A27 of Schedule BP)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("businessSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("businessCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row IV: Speculation business */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">IV</td>
                  <td className="border border-gray-300 p-3">
                    Income from speculation business u/s 115B
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("speculationIncome" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (3iv of Sch. BP)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("speculationSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("speculationCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row V: Specified business income */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">V</td>
                  <td className="border border-gray-300 p-3">
                    Income from specified business u/s 115BA
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("specifiedBusinessIncome" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (3iv of Sch. BP)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("specifiedBusinessSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("specifiedBusinessCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row VI: Speculation income */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">VI</td>
                  <td className="border border-gray-300 p-3">
                    Speculation income u/s 115BA, item E
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("speculationBussIncome" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (3iv of E of Sch. BP)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("speculationBussSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("speculationBussCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row VII: Short term capital gain @ 15% */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">VII</td>
                  <td className="border border-gray-300 p-3">
                    Short term capital gain taxable @ 15%
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt15Percent" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1i of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt15PercentSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt15PercentCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row VIII: Short term capital gain @ 20% */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">VIII</td>
                  <td className="border border-gray-300 p-3">
                    Short term capital gain taxable @ 20%
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt20Percent" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1ii of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt20PercentSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt20PercentCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row IX: Short term capital gain @ 30% */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">IX</td>
                  <td className="border border-gray-300 p-3">
                    Short term capital gain taxable @ 30%
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt30Percent" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1iv of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt30PercentSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgAt30PercentCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row X: Short term capital gain applicable rates */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">X</td>
                  <td className="border border-gray-300 p-3">
                    Short term capital gain taxable at applicable rates
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgApplicableRates" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1v of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgApplicableRatesSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgApplicableRatesCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XI: Short term capital gain special rates DTAA */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">XI</td>
                  <td className="border border-gray-300 p-3">
                    Short term capital gain taxable at special rates in India as per DTAA
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgDTAASpecialRates" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1d of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgDTAASpecialRatesSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("stcgDTAASpecialRatesCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XII: Long term capital gain @ 12.5% */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">XII</td>
                  <td className="border border-gray-300 p-3">
                    Long term capital gain taxable @ 12.5%
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgAt12_5Percent" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1vi of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgAt12_5PercentSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgAt12_5PercentCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XIII: Long term capital gain @ 20% */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">XIII</td>
                  <td className="border border-gray-300 p-3">
                    Long term capital gain taxable @ 20%
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgAt20Percent" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1vii of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgAt20PercentSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgAt20PercentCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XIV: Long term capital gain special rates DTAA */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">XIV</td>
                  <td className="border border-gray-300 p-3">
                    Long term capital gains taxable at special rates in DTAA
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgDTAASpecialRates" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (I1s of item E of Schedule CG)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgDTAASpecialRatesSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("ltcgDTAASpecialRatesCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XV: Net income from other sources */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">XV</td>
                  <td className="border border-gray-300 p-3">
                    Net income from other sources, chargeable at normal applicable rates
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("otherSourcesNormalRates" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (6 of Schedule OS)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("otherSourcesNormalRatesSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("otherSourcesNormalRatesCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XVI: Profit from race horses */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">XVI</td>
                  <td className="border border-gray-300 p-3">
                    Profit from the activity of owning and maintaining race horses
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("raceHorsesProfit" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (8e of Schedule OS)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("raceHorsesProfitSetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("raceHorsesProfitCurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XVII: Income from other sources taxable at special rates */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">XVII</td>
                  <td className="border border-gray-300 p-3">
                    Income from other sources taxable at special rates in India as per DTAA
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("otherSourcesSpecialRatesDTAA" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3 text-center text-sm text-gray-600">
                    (2e of Schedule OS)
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("otherSourcesSpecialRatesDTAASetOff" as any)}
                    />
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded"
                      {...register("otherSourcesSpecialRatesDTAACurrent" as any)}
                    />
                  </td>
                </tr>

                {/* Row XVIII: Total loss set off */}
                <tr className="bg-blue-100 border-t-2 border-blue-300">
                  <td colSpan={2} className="border border-gray-300 p-3 font-bold text-blue-900">
                    XVII. Total loss set off
                  </td>
                  <td className="border border-gray-300 p-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded font-bold bg-blue-100"
                      {...register("totalLossSetOff" as any)}
                    />
                  </td>
                  <td colSpan={3} className="border border-gray-300 p-3 bg-blue-100"></td>
                </tr>
              </tbody>
            </table>
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

export default ScheduleCYL;
