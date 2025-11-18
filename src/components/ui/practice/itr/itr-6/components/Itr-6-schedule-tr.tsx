import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTRProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleTR: React.FC<ScheduleTRProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  const reliefClaimCount = watch("tr_relief_claim_count") || 1;
  const reliefClaims = Array.from({ length: Math.min(reliefClaimCount, 10) });

  const calculateTotals = () => {
    let totalTaxesPaidOutside = 0;
    let totalReliefAvailable = 0;

    reliefClaims.forEach((_, idx) => {
      const taxesPaid = parseFloat(watch(`tr_taxes_paid_${idx}`) || 0) || 0;
      const relief = parseFloat(watch(`tr_relief_available_${idx}`) || 0) || 0;

      totalTaxesPaidOutside += taxesPaid;
      totalReliefAvailable += relief;
    });

    return { totalTaxesPaidOutside, totalReliefAvailable };
  };

  const totals = calculateTotals();

  const dtaaApplicableRelief = parseFloat(watch("tr_dtaa_applicable_relief") || 0) || 0;
  const dtaaNotApplicableRelief = parseFloat(watch("tr_dtaa_not_applicable_relief") || 0) || 0;

  const refundedAmount = parseFloat(watch("tr_refunded_amount") || 0) || 0;
  const assessmentYearRefunded = watch("tr_assessment_year_refunded") || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rose-900 mb-2">
            Schedule TR: Tax Relief Summary
          </h1>
          <p className="text-rose-700">
            Details summary of tax relief claimed for taxes paid outside India (available only in case of resident)
          </p>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-bold">NOTE:</span> This schedule provides a summary of tax relief claimed under sections 90/90A and applicable Double Taxation Avoidance Agreements (DTAA).
          </p>
        </div>

        {/* Part 1: Details of Tax Relief Claimed */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-rose-500">
          <h2 className="text-xl font-bold text-rose-800 mb-4">
            Part 1: Details of Tax Relief Claimed
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Countries (Max 10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("tr_relief_claim_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs border border-gray-300">
              <thead>
                <tr className="bg-rose-100">
                  <th className="border border-gray-300 px-2 py-2 text-left w-8">SNo</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Country Code</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Taxpayer Identification Number</th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-32">Total Taxes Paid Outside India (₹) [Col (c) of Schedule FSI]</th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-32">Total Tax Relief Available [Total of (o) of Schedule FSI]</th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-32">Section under which relief claimed (Specify 90, 90A or 91)</th>
                </tr>
              </thead>
              <tbody>
                {reliefClaims.map((_, idx) => (
                  <tr key={idx} className="hover:bg-rose-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-rose-700">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="Country code"
                        {...register(`tr_country_code_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="TIN"
                        {...register(`tr_tin_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`tr_taxes_paid_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-rose-400 focus:border-transparent text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`tr_relief_available_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-rose-400 focus:border-transparent text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`tr_section_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="90">Section 90</option>
                        <option value="90a">Section 90A</option>
                        <option value="91">Section 91</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-rose-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-rose-700">
                    {totals.totalTaxesPaidOutside.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-rose-700">
                    {totals.totalReliefAvailable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Part 2: DTAA Relief Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-pink-500">
          <h2 className="text-xl font-bold text-pink-800 mb-4">
            Part 2: Total Tax Relief Available Summary
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-pink-100">
                  <th className="border border-gray-300 px-3 py-2 text-left w-8">Item</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-right w-32">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-pink-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">2</td>
                  <td className="border border-gray-300 px-3 py-2">
                    Total Tax relief available in respect of country where DTAA is applicable (section 90/90A)
                    <p className="text-xs text-gray-600 mt-1">(Part of total of 1(d))</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("tr_dtaa_applicable_relief")}
                      className="w-full px-3 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
                <tr className="hover:bg-pink-50">
                  <td className="border border-gray-300 px-3 py-2 font-bold">3</td>
                  <td className="border border-gray-300 px-3 py-2">
                    Total Tax relief available in respect of country where DTAA is not applicable (section 91)
                    <p className="text-xs text-gray-600 mt-1">(Part of total of 1(d))</p>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      {...register("tr_dtaa_not_applicable_relief")}
                      className="w-full px-3 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-pink-400 focus:border-transparent text-right"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part 3: Tax Refund/Credit Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-rose-600">
          <h2 className="text-xl font-bold text-rose-800 mb-4">
            Part 3: Tax Refund/Credit Details
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4. Whether any tax paid outside India, on which tax relief was allowed in India, has been refunded/credited by the foreign tax authority during the year?
                </label>
                <select
                  {...register("tr_refund_credited")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4(a) Amount of tax refunded (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  step="0.01"
                  {...register("tr_refunded_amount")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                4(b) Assessment year in which tax relief was allowed in India
              </label>
              <input
                type="text"
                placeholder="e.g., 2024-25"
                {...register("tr_assessment_year_refunded")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-4">Tax Relief Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Taxes Paid Outside India</p>
              <p className="text-lg font-bold">₹ {totals.totalTaxesPaidOutside.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Tax Relief Available</p>
              <p className="text-lg font-bold">₹ {(dtaaApplicableRelief + dtaaNotApplicableRelief).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Tax Refunded/Credited {assessmentYearRefunded ? `(AY ${assessmentYearRefunded})` : ''}</p>
              <p className="text-lg font-bold">₹ {refundedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2">Important Notes:</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• This schedule is applicable only for residents of India</li>
            <li>• Tax relief is available under Section 90 (DTAA), Section 90A (DTAA), or Section 91 (without DTAA)</li>
            <li>• Relief under Section 90/90A can be claimed through Schedule FSI</li>
            <li>• Relief under Section 91 is limited to the tax payable on such income in India</li>
            <li>• Any refund/credit received from foreign tax authority should be reported in the assessment year of receipt</li>
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
            className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTR;
