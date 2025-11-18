import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleTPProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleTP: React.FC<ScheduleTPProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;

  // Watch all payment entries
  const paymentEntries = Array.from({ length: 3 }, (_, i) => ({
    slNo: i + 1,
    bsrCode: watch(`tp_payment_${i + 1}_bsr_code`),
    depositDate: watch(`tp_payment_${i + 1}_deposit_date`),
    serialNumber: watch(`tp_payment_${i + 1}_serial_number`),
    amount: parseFloat(watch(`tp_payment_${i + 1}_amount`) || 0) || 0,
  }));

  // Calculate total payments
  const totalPayments = paymentEntries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            18. Tax Payments
          </h1>
          <p className="text-slate-700">
            Details of payments of Advance Tax and Self Assessment Tax
          </p>
        </div>

        {/* Section A: Advance Tax and Self Assessment Tax */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 pb-3 border-b-2 border-slate-300">
            Details of payments of Advance Tax and Self Assessment Tax
          </h2>

          {/* Table Header */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold text-slate-700">
                    Sl No
                  </th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold text-slate-700">
                    BSR Code
                  </th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold text-slate-700">
                    Date of Deposit (DD/MM/YYYY)
                  </th>
                  <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold text-slate-700">
                    Serial Number of Challan
                  </th>
                  <th className="border border-slate-300 px-3 py-2 text-right text-xs font-bold text-slate-700">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="border border-slate-300 px-3 py-3 text-center font-semibold text-slate-700">
                      {idx}
                    </td>
                    <td className="border border-slate-300 px-3 py-3">
                      <input
                        type="text"
                        placeholder="BSR Code"
                        {...register(`tp_payment_${idx}_bsr_code`)}
                        maxLength={7}
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-slate-300 px-3 py-3">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        {...register(`tp_payment_${idx}_deposit_date`)}
                        maxLength={10}
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-slate-300 px-3 py-3">
                      <input
                        type="text"
                        placeholder="Serial Number"
                        {...register(`tp_payment_${idx}_serial_number`)}
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-slate-300 px-3 py-3">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`tp_payment_${idx}_amount`)}
                        className="w-full px-2 py-1 border border-slate-200 rounded text-xs text-right focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="bg-slate-100 rounded-lg p-4 mb-4">
            <div className="flex justify-end items-center gap-4">
              <span className="text-sm font-bold text-slate-700">Total Amount Paid:</span>
              <span className="text-2xl font-bold text-slate-900">
                ₹ {totalPayments.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-xs text-blue-900 font-semibold mb-1">NOTE:</p>
            <p className="text-xs text-blue-800">
              Enter the totals of Advance tax and Self-Assessment tax in Sl Nos 10c & 10d of Part B-TTI
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
            className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTP;
