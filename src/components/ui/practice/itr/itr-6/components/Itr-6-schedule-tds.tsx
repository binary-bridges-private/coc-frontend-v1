import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTDSProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleTDS: React.FC<ScheduleTDSProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  // Part A: TDS on Income
  const tdsEntries = Array.from({ length: 5 }, (_, i) => ({
    slNo: i + 1,
    tdsSl: watch(`tds_a_sl_${i + 1}`),
    creditId: watch(`tds_a_credit_id_${i + 1}`),
    pan: watch(`tds_a_pan_${i + 1}`),
    deductorType: watch(`tds_a_deductor_type_${i + 1}`),
    incomeType: watch(`tds_a_income_type_${i + 1}`),
    unclaimed: parseFloat(watch(`tds_a_unclaimed_${i + 1}`) || 0) || 0,
    bfTDS: parseFloat(watch(`tds_a_bf_tds_${i + 1}`) || 0) || 0,
    currentYear: parseFloat(watch(`tds_a_current_year_${i + 1}`) || 0) || 0,
    deductedHands: parseFloat(watch(`tds_a_deducted_hands_${i + 1}`) || 0) || 0,
    claimedHands: parseFloat(watch(`tds_a_claimed_hands_${i + 1}`) || 0) || 0,
    claimedOther: parseFloat(watch(`tds_a_claimed_other_${i + 1}`) || 0) || 0,
  }));

  // Calculate totals for TDS
  const tdsTotals = {
    unclaimed: tdsEntries.reduce((sum, e) => sum + e.unclaimed, 0),
    bfTDS: tdsEntries.reduce((sum, e) => sum + e.bfTDS, 0),
    currentYear: tdsEntries.reduce((sum, e) => sum + e.currentYear, 0),
    deductedHands: tdsEntries.reduce((sum, e) => sum + e.deductedHands, 0),
    claimedHands: tdsEntries.reduce((sum, e) => sum + e.claimedHands, 0),
    claimedOther: tdsEntries.reduce((sum, e) => sum + e.claimedOther, 0),
  };

  // Part C: TCS Details
  const tcsEntries = Array.from({ length: 2 }, (_, i) => ({
    slNo: i + 1,
    tcsSl: watch(`tcs_sl_${i + 1}`),
    collectorType: watch(`tcs_collector_type_${i + 1}`),
    pan: watch(`tcs_pan_${i + 1}`),
    collectorName: watch(`tcs_collector_name_${i + 1}`),
    tcsCredited: parseFloat(watch(`tcs_credited_${i + 1}`) || 0) || 0,
    unclaimed: parseFloat(watch(`tcs_unclaimed_${i + 1}`) || 0) || 0,
    year: watch(`tcs_year_${i + 1}`),
    collectedAmount: parseFloat(watch(`tcs_collected_amount_${i + 1}`) || 0) || 0,
    collectedHands: parseFloat(watch(`tcs_collected_hands_${i + 1}`) || 0) || 0,
    claimedHands: parseFloat(watch(`tcs_claimed_hands_${i + 1}`) || 0) || 0,
    claimedOtherHands: parseFloat(watch(`tcs_claimed_other_${i + 1}`) || 0) || 0,
  }));

  // Calculate totals for TCS
  const tcsTotals = {
    tcsCredited: tcsEntries.reduce((sum, e) => sum + e.tcsCredited, 0),
    unclaimed: tcsEntries.reduce((sum, e) => sum + e.unclaimed, 0),
    collectedAmount: tcsEntries.reduce((sum, e) => sum + e.collectedAmount, 0),
    collectedHands: tcsEntries.reduce((sum, e) => sum + e.collectedHands, 0),
    claimedHands: tcsEntries.reduce((sum, e) => sum + e.claimedHands, 0),
    claimedOtherHands: tcsEntries.reduce((sum, e) => sum + e.claimedOtherHands, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Details of TDS and TCS
          </h1>
          <p className="text-amber-700">
            Tax Deducted at Source (TDS) and Tax Collected at Source (TCS) information
          </p>
        </div>

        {/* Part B: TDS Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-amber-800 mb-4 pb-3 border-b-2 border-amber-300">
            Part B: Details of Tax Deducted at Source (TDS) on Income
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-amber-100">
                  <th className="border border-amber-300 px-2 py-2 text-left font-bold">Sl</th>
                  <th className="border border-amber-300 px-2 py-2 text-left font-bold">TDS SL</th>
                  <th className="border border-amber-300 px-2 py-2 text-left font-bold">Credit ID</th>
                  <th className="border border-amber-300 px-2 py-2 text-left font-bold">PAN/Aadhar</th>
                  <th className="border border-amber-300 px-2 py-2 text-left font-bold">Type</th>
                  <th className="border border-amber-300 px-2 py-2 text-left font-bold">Income Type</th>
                  <th className="border border-amber-300 px-2 py-2 text-right font-bold">Unclaimed (₹)</th>
                  <th className="border border-amber-300 px-2 py-2 text-right font-bold">B/F TDS (₹)</th>
                  <th className="border border-amber-300 px-2 py-2 text-right font-bold">Current Year (₹)</th>
                  <th className="border border-amber-300 px-2 py-2 text-right font-bold">Deducted Hands (₹)</th>
                  <th className="border border-amber-300 px-2 py-2 text-right font-bold">Claimed Hands (₹)</th>
                  <th className="border border-amber-300 px-2 py-2 text-right font-bold">Claimed Other (₹)</th>
                </tr>
              </thead>
              <tbody>
                {tdsEntries.map((entry) => (
                  <tr key={entry.slNo} className="hover:bg-amber-50">
                    <td className="border border-amber-300 px-2 py-2 text-center font-semibold">{entry.slNo}</td>
                    <td className="border border-amber-300 px-2 py-2">
                      <input type="text" {...register(`tds_a_sl_${entry.slNo}`)} maxLength={5} className="w-full px-1 py-1 border border-amber-200 rounded text-xs" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2">
                      <input type="text" {...register(`tds_a_credit_id_${entry.slNo}`)} maxLength={30} className="w-full px-1 py-1 border border-amber-200 rounded text-xs" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2">
                      <input type="text" {...register(`tds_a_pan_${entry.slNo}`)} maxLength={20} className="w-full px-1 py-1 border border-amber-200 rounded text-xs" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2">
                      <select {...register(`tds_a_deductor_type_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs">
                        <option value="">Select</option>
                        <option value="Individual">Individual</option>
                        <option value="HUF">HUF</option>
                        <option value="Company">Company</option>
                        <option value="Partnership">Partnership</option>
                      </select>
                    </td>
                    <td className="border border-amber-300 px-2 py-2">
                      <select {...register(`tds_a_income_type_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs">
                        <option value="">Select</option>
                        <option value="HP">House Property</option>
                        <option value="BP">Business</option>
                        <option value="CG">Capital Gains</option>
                        <option value="OS">Other Sources</option>
                      </select>
                    </td>
                    <td className="border border-amber-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tds_a_unclaimed_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tds_a_bf_tds_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tds_a_current_year_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tds_a_deducted_hands_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tds_a_claimed_hands_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-amber-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tds_a_claimed_other_${entry.slNo}`)} className="w-full px-1 py-1 border border-amber-200 rounded text-xs text-right" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TDS Totals */}
          <div className="bg-amber-100 rounded-lg p-3 mb-4">
            <p className="text-xs font-bold text-amber-900 mb-2">TDS Totals:</p>
            <div className="grid grid-cols-6 gap-2 text-xs">
              <div>
                <p className="text-amber-700">Unclaimed: ₹{tdsTotals.unclaimed.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-amber-700">B/F TDS: ₹{tdsTotals.bfTDS.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-amber-700">Current Year: ₹{tdsTotals.currentYear.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-amber-700">Deducted Hands: ₹{tdsTotals.deductedHands.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-amber-700">Claimed Hands: ₹{tdsTotals.claimedHands.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-amber-700">Claimed Other: ₹{tdsTotals.claimedOther.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mb-4">
            <p className="text-xs text-blue-900 font-semibold">NOTE:</p>
            <p className="text-xs text-blue-800">
              Please enter total of column 9 in 10c of Part B-TTI
            </p>
          </div>
        </div>

        {/* Part C: TCS Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-amber-800 mb-4 pb-3 border-b-2 border-amber-300">
            Part C: Details of Tax Collected at Source (TCS)
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-orange-100">
                  <th className="border border-orange-300 px-2 py-2 text-left font-bold">Sl</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-bold">TCS SL</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-bold">Type</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-bold">PAN/Aadhar</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-bold">Collector Name</th>
                  <th className="border border-orange-300 px-2 py-2 text-right font-bold">TCS Credited (₹)</th>
                  <th className="border border-orange-300 px-2 py-2 text-right font-bold">Unclaimed (₹)</th>
                  <th className="border border-orange-300 px-2 py-2 text-left font-bold">Fin Year</th>
                  <th className="border border-orange-300 px-2 py-2 text-right font-bold">Amount Collected (₹)</th>
                  <th className="border border-orange-300 px-2 py-2 text-right font-bold">Collected Hands (₹)</th>
                  <th className="border border-orange-300 px-2 py-2 text-right font-bold">Claimed Hands (₹)</th>
                  <th className="border border-orange-300 px-2 py-2 text-right font-bold">Claimed Other (₹)</th>
                </tr>
              </thead>
              <tbody>
                {tcsEntries.map((entry) => (
                  <tr key={entry.slNo} className="hover:bg-orange-50">
                    <td className="border border-orange-300 px-2 py-2 text-center font-semibold">{entry.slNo}</td>
                    <td className="border border-orange-300 px-2 py-2">
                      <input type="text" {...register(`tcs_sl_${entry.slNo}`)} maxLength={5} className="w-full px-1 py-1 border border-orange-200 rounded text-xs" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2">
                      <select {...register(`tcs_collector_type_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs">
                        <option value="">Select</option>
                        <option value="Importer">Importer</option>
                        <option value="Agent">Agent</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td className="border border-orange-300 px-2 py-2">
                      <input type="text" {...register(`tcs_pan_${entry.slNo}`)} maxLength={20} className="w-full px-1 py-1 border border-orange-200 rounded text-xs" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2">
                      <input type="text" {...register(`tcs_collector_name_${entry.slNo}`)} maxLength={50} className="w-full px-1 py-1 border border-orange-200 rounded text-xs" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tcs_credited_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tcs_unclaimed_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2">
                      <input type="text" {...register(`tcs_year_${entry.slNo}`)} placeholder="YYYY-YY" className="w-full px-1 py-1 border border-orange-200 rounded text-xs" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tcs_collected_amount_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tcs_collected_hands_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tcs_claimed_hands_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs text-right" />
                    </td>
                    <td className="border border-orange-300 px-2 py-2 text-right">
                      <input type="number" step="0.01" {...register(`tcs_claimed_other_${entry.slNo}`)} className="w-full px-1 py-1 border border-orange-200 rounded text-xs text-right" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TCS Totals */}
          <div className="bg-orange-100 rounded-lg p-3">
            <p className="text-xs font-bold text-orange-900 mb-2">TCS Totals:</p>
            <div className="grid grid-cols-6 gap-2 text-xs">
              <div>
                <p className="text-orange-700">TCS Credited: ₹{tcsTotals.tcsCredited.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-orange-700">Unclaimed: ₹{tcsTotals.unclaimed.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-orange-700">Collected Amount: ₹{tcsTotals.collectedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-orange-700">Collected Hands: ₹{tcsTotals.collectedHands.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-orange-700">Claimed Hands: ₹{tcsTotals.claimedHands.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-orange-700">Claimed Other: ₹{tcsTotals.claimedOtherHands.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded mt-4">
            <p className="text-xs text-blue-900 font-semibold">NOTE:</p>
            <p className="text-xs text-blue-800">
              Please enter total of column (7) in 10c of Part B-TTI
            </p>
          </div>
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
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTDS;
