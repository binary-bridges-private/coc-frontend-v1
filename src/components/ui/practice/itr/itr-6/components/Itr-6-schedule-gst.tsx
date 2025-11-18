import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleGSTProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleGST: React.FC<ScheduleGSTProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  const gstinCount = watch("gst_gstin_count") || 1;
  const gstins = Array.from({ length: Math.min(gstinCount, 15) });

  const calculateTotals = () => {
    let totalTurnover = 0;

    gstins.forEach((_, idx) => {
      const turnover = parseFloat(watch(`gst_turnover_${idx}`) || 0) || 0;
      totalTurnover += turnover;
    });

    return { totalTurnover };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-900 mb-2">
            Schedule GST: Turnover/Gross Receipt Information
          </h1>
          <p className="text-yellow-700">
            Information regarding turnover/gross receipt reported for GST purposes
          </p>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-bold">NOTE:</span> Please furnish the information for each GSTIN No. separately. This schedule requires annual value of outward supplies as per the GST return(s) filed.
          </p>
        </div>

        {/* GSTIN Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">
            Information Regarding Turnover/Gross Receipt Reported for GST
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of GSTINs (Max 15)
            </label>
            <input
              type="number"
              min="1"
              max="15"
              {...register("gst_gstin_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* GSTIN Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="border border-gray-300 px-3 py-2 text-left w-8">SNo</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">GSTIN No(s).</th>
                  <th className="border border-gray-300 px-3 py-2 text-right w-40">Annual value of outward supplies as per the GST return(s) filed (₹)</th>
                </tr>
              </thead>
              <tbody>
                {gstins.map((_, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50">
                    <td className="border border-gray-300 px-3 py-2 font-bold text-yellow-700">{idx + 1}</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        placeholder="GSTIN (15 digits)"
                        maxLength={15}
                        {...register(`gst_gstin_${idx}`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm font-mono"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`gst_turnover_${idx}`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-right"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={2} className="border border-gray-300 px-3 py-2">Total Turnover/Gross Receipt</td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-yellow-700">
                    ₹ {totals.totalTurnover.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-amber-500">
          <h2 className="text-lg font-bold text-amber-800 mb-4">
            Additional GST Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GST Registration Status
              </label>
              <select
                {...register("gst_registration_status")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="regular">Regular</option>
                <option value="composition">Composition</option>
                <option value="exempted">Exempted</option>
                <option value="not_applicable">Not Applicable</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of GST Registration (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  {...register("gst_registration_date")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of GST Cancellation (if any) (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY (if applicable)"
                  {...register("gst_cancellation_date")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Remarks (if any)
              </label>
              <textarea
                placeholder="Additional remarks about GST compliance..."
                rows={3}
                {...register("gst_remarks")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-4">GST Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Number of GSTINs</p>
              <p className="text-2xl font-bold">{gstins.length}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Turnover/Gross Receipt</p>
              <p className="text-2xl font-bold">₹ {totals.totalTurnover.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Average per GSTIN</p>
              <p className="text-2xl font-bold">₹ {(gstins.length > 0 ? totals.totalTurnover / gstins.length : 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-2">Important Notes:</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• GSTIN is a 15-digit unique identification number for GST registration</li>
            <li>• Report the annual value of outward supplies as per GSTR-1 filed for the financial year</li>
            <li>• Multiple GSTINs can be reported if you have multiple registrations (e.g., different states or businesses)</li>
            <li>• Outward supplies include all taxable and exempt supplies, net of ITC reversals</li>
            <li>• Ensure consistency between GST returns filed and data reported in income tax return</li>
            <li>• Report figures in Indian Rupees (₹)</li>
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
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleGST;
