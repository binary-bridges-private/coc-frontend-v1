import React from "react";
import { UseFormReturn } from "react-hook-form";

interface SchedulePTProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const SchedulePT: React.FC<SchedulePTProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const investmentCount = watch("pt_investment_count") || 1;
  const investments = Array.from({ length: Math.min(investmentCount, 5) });

  const incomeHeads = [
    { id: "i_a", label: "House property" },
    { id: "i_b", label: "Capital Gains" },
    { id: "ii_a", label: "Short term" },
    { id: "ii_b", label: "Section 112A" },
    { id: "ii_c", label: "Others" },
    { id: "iii", label: "Other Sources" },
    { id: "iv_a", label: "Dividend" },
    { id: "iv_b", label: "Others" },
  ];

  const calculateTotals = () => {
    let totalCurrentYearIncome = 0;
    let totalNetLoss = 0;
    let totalTDS = 0;

    investments.forEach((_, idx) => {
      const current = parseFloat(watch(`pt_current_income_${idx}`) || 0) || 0;
      const loss = parseFloat(watch(`pt_net_loss_${idx}`) || 0) || 0;
      const tds = parseFloat(watch(`pt_tds_${idx}`) || 0) || 0;

      totalCurrentYearIncome += current;
      totalNetLoss += loss;
      totalTDS += tds;
    });

    return { totalCurrentYearIncome, totalNetLoss, totalTDS };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-teal-900 mb-2">
            Schedule PT: Pass Through Income from Business Trust/Investment Fund
          </h1>
          <p className="text-teal-700">
            Pass Through Income details from business trust or investment fund as per Section 115U, 115UA and 115UB
          </p>
        </div>

        {/* Number of Investments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-teal-500">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Investments (Max 5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              {...register("pt_investment_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Investment Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-teal-600">
          <h2 className="text-xl font-bold text-teal-800 mb-4">
            Pass Through Income Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-teal-100">
                  <th className="border border-gray-300 px-2 py-2 text-left w-8">SNo</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Investment Section 115U/115UA/115UB</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">Name of Business Trust/Fund</th>
                  <th className="border border-gray-300 px-2 py-2 text-left">PAN</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">Head of Income</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">Current Year Income (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">Net Loss Distribution (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-center">TDS on Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((_, idx) => (
                  <tr key={idx} className="hover:bg-teal-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-teal-700">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`pt_section_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="115u">Section 115U</option>
                        <option value="115ua">Section 115UA</option>
                        <option value="115ub">Section 115UB</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="Trust/Fund name"
                        {...register(`pt_trust_name_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="PAN"
                        {...register(`pt_pan_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`pt_income_head_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        {incomeHeads.map((head) => (
                          <option key={head.id} value={head.id}>
                            {head.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`pt_current_income_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`pt_net_loss_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`pt_tds_${idx}`)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-teal-400 focus:border-transparent text-right"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-teal-100 font-bold">
                  <td colSpan={5} className="border border-gray-300 px-2 py-2">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-teal-700">
                    ₹ {totals.totalCurrentYearIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-teal-700">
                    ₹ {totals.totalNetLoss.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-teal-700">
                    ₹ {totals.totalTDS.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Current Year Income</p>
              <p className="text-2xl font-bold">₹ {totals.totalCurrentYearIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Loss Distribution</p>
              <p className="text-2xl font-bold">₹ {totals.totalNetLoss.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total TDS Deducted</p>
              <p className="text-2xl font-bold">₹ {totals.totalTDS.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
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
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchedulePT;
