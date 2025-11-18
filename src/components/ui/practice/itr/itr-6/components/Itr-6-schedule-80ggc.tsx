import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80GGCProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const Schedule80GGC: React.FC<Schedule80GGCProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit } = form;
  const watchValues = watch();

  // Calculate totals
  const calculateTotal = (fieldPrefix: string) => {
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      const cash = parseFloat(watchValues[`${fieldPrefix}_cash_${i}`]) || 0;
      const other = parseFloat(watchValues[`${fieldPrefix}_other_${i}`]) || 0;
      total += cash + other;
    }
    return total;
  };

  const totalCash = calculateTotal("contrib_cash");
  const totalOther = calculateTotal("contrib_other");
  const totalContribution = totalCash + totalOther;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule 80GGC</h2>
        <p className="text-gray-600">Details of contributions made to political parties</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Contribution Details Table */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-orange-100 px-4 py-2 font-semibold text-gray-800">
            Political Contributions under Section 80GGC
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-orange-200">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-8">Sl No</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-20">Date</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Contribution in cash (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Contribution in other mode (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Total Contribution (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-32">Name and number of Party</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-20">IFS code of Bank</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((idx) => {
                  const cash = parseFloat(watchValues[`contrib_cash_${idx}`]) || 0;
                  const other = parseFloat(watchValues[`contrib_other_${idx}`]) || 0;
                  const total = cash + other;

                  return (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{idx}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="date"
                          {...register(`contrib_date_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`contrib_cash_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`contrib_other_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold bg-yellow-50">
                        {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          placeholder="Party name"
                          {...register(`contrib_party_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          placeholder="IFSC Code"
                          {...register(`contrib_ifsc_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={2} className="border border-gray-300 px-3 py-2 text-right">Total contribution</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {totalCash.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {totalOther.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-green-800">
                    {totalContribution.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td colSpan={2} className="border border-gray-300 px-3 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
          <h3 className="text-sm font-semibold text-orange-800 mb-3">Deduction Summary</h3>
          <p className="text-sm text-gray-700 mb-3">
            Total deduction under section 80GGC is equal to the total amount of contribution made to political parties.
          </p>
          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
            <p className="text-xs text-gray-600">Total Eligible Deduction (100%)</p>
            <p className="text-lg font-bold text-green-800">₹ {totalContribution.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between gap-4 mt-8 p-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Confirm & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80GGC;
