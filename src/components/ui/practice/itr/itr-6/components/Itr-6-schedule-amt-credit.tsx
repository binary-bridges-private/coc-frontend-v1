import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleAMTCreditProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleAMTCredit: React.FC<ScheduleAMTCreditProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const assessmentYears = [
    { ay: "2011-12", num: "I" },
    { ay: "2012-13", num: "II" },
    { ay: "2013-14", num: "III" },
    { ay: "2014-15", num: "IV" },
    { ay: "2015-16", num: "V" },
    { ay: "2016-17", num: "VI" },
    { ay: "2017-18", num: "VII" },
    { ay: "2018-19", num: "VIII" },
    { ay: "2019-20", num: "IX" },
    { ay: "2020-21", num: "X" },
    { ay: "2021-22", num: "XI" },
    { ay: "2022-23", num: "XII" },
    { ay: "2023-24", num: "XIII" },
    { ay: "2024-25", num: "XIV" },
    { ay: "Current AY", num: "XV" },
  ];

  const calculateTotals = () => {
    let totalGross = 0;
    let totalSetOff = 0;
    let totalBalance = 0;

    assessmentYears.forEach((year) => {
      const gross = parseFloat(watch(`amtcredit_gross_${year.num}`) || 0) || 0;
      const setOff = parseFloat(watch(`amtcredit_setoff_${year.num}`) || 0) || 0;
      const balance = gross - setOff;

      totalGross += gross;
      totalSetOff += setOff;
      totalBalance += balance;
    });

    return { totalGross, totalSetOff, totalBalance };
  };

  const totals = calculateTotals();
  const amtCreditUtilized = parseFloat(watch("amtcredit_utilized_current") || 0) || 0;
  const amtLiabilityAvailable = parseFloat(watch("amtcredit_liability_available") || 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-zinc-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Schedule AMT Credit: Computation of Tax Credit under Section 115JD
          </h1>
          <p className="text-gray-700">
            Computation and utilization of Alternate Minimum Tax (AMT) Credit
          </p>
        </div>

        {/* Part A: Tax Reconciliation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-gray-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Part A: Tax Reconciliation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tax Under Section 115JC(1) - AMT (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("amtcredit_tax_115jc")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Normal Tax Payable (Regular ITR)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("amtcredit_normal_tax")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              AMT Credit Generated (if Tax 115JC &gt; Normal Tax)
            </p>
            <input
              type="number"
              placeholder="0"
              step="0.01"
              {...register("amtcredit_generated_current")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold"
            />
          </div>
        </div>

        {/* Part B: AMT Credit Carried Forward */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-gray-600">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Part B: AMT Credit Carry Forward (15 Years)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left w-20">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Assessment Year
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Gross AMT Credit (B1)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Set-off in Earlier AY (B2)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Balance Brought Forward (B3 = B1 - B2)
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessmentYears.map((year) => {
                  const gross = parseFloat(watch(`amtcredit_gross_${year.num}`) || 0) || 0;
                  const setOff = parseFloat(watch(`amtcredit_setoff_${year.num}`) || 0) || 0;
                  const balance = gross - setOff;

                  return (
                    <tr key={year.num} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-bold text-gray-700">
                        {year.num}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        {year.ay}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`amtcredit_gross_${year.num}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`amtcredit_setoff_${year.num}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold">
                        ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={2} className="border border-gray-300 px-4 py-2">
                    Total
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    ₹ {totals.totalGross.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    ₹ {totals.totalSetOff.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 bg-yellow-100 text-gray-700">
                    ₹ {totals.totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Part C: Current AY Credit Utilization */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Part C: AMT Credit Utilization in Current AY
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                1. AMT Credit Utilised during the Current AY
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("amtcredit_utilized_current")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                2. Tax credit under Section 115JD available
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("amtcredit_liability_available")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded text-white">
              <span className="text-base font-bold">
                3. Amount of AMT Liability Available for Credit
              </span>
              <span className="text-2xl font-bold">
                ₹ {amtLiabilityAvailable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>AMT credit can be carried forward for 15 assessment years</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>AMT credit can be set-off only against AMT liability in subsequent years</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Unused AMT credit cannot be carried forward beyond 15 years</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>AMT credit is personal to the individual (not transferable)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Available against tax liability under Section 115JC only</span>
            </li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleAMTCredit;
