import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleICDSProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleICDS: React.FC<ScheduleICDSProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const watchValues = watch();

  // Calculate net effect
  const increaseInProfit = parseFloat(watchValues.icds_increase_profit) || 0;
  const decreaseInProfit = parseFloat(watchValues.icds_decrease_profit) || 0;
  const netEffect = increaseInProfit - decreaseInProfit;

  const icdsItems = [
    { id: "I", name: "Accounting Policies", description: "Changes in accounting methods or policies" },
    { id: "II", name: "Valuation of Inventories", description: "Change in method of valuation (e.g. FIFO, LIFO, WAC)" },
    { id: "III", name: "Construction Contracts", description: "Recognition of revenue from construction contracts" },
    { id: "IV", name: "Revenue Recognition", description: "Timing and recognition of income" },
    { id: "V", name: "Tangible Fixed Assets", description: "Capitalization and depreciation of assets" },
    { id: "VI", name: "Changes in Foreign Exchange Rates", description: "Effect of foreign exchange fluctuations" },
    { id: "VII", name: "Government Grants", description: "Treatment of government subsidies and grants" },
    { id: "VIII", name: "Securities", description: "Valuation of securities and investments" },
    { id: "IX", name: "Borrowing Costs", description: "Capitalization of interest and borrowing costs" },
    { id: "X", name: "Provisions, Contingent Liabilities and Contingent Assets", description: "Recognition and measurement of provisions" },
    { id: "XI", name: "Total effect of ICDS adjustments", description: "(I+II+III+IV+V+VI+VII+VIII+IX+X)" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule ICDS</h2>
        <p className="text-gray-600">Effect of Income Computation Disclosure Standards on profit</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Disclosure Information */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">ICDS Applicability & Disclosure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ITR applicable (If ICDS applicable, whether disclosure made in Profit & Loss Account)
              </label>
              <select
                {...register("icds_itr_applicable")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Whether disclosure made in books of accounts
              </label>
              <select
                {...register("icds_disclosure_books")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Separate disclosure made in ITR
              </label>
              <select
                {...register("icds_separate_disclosure")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* ICDS Items Details */}
        <div className="mb-6 overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-indigo-100 sticky top-0">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-20">Sl No</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">ICDS Items</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Increase in profit (₹)</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Decrease in profit (₹)</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Net effect (₹)</th>
              </tr>
            </thead>
            <tbody>
              {icdsItems.map((item, idx) => (
                <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-3 py-3 font-semibold text-center bg-gray-100">{item.id}</td>
                  <td className="border border-gray-300 px-3 py-3">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  </td>
                  {item.id === "XI" ? (
                    <>
                      <td className="border border-gray-300 px-3 py-3 text-right font-bold bg-yellow-50">
                        {increaseInProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-right font-bold bg-yellow-50">
                        {decreaseInProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-right font-bold bg-yellow-100">
                        {netEffect.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 px-3 py-3">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`icds_increase_${item.id}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-3">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`icds_decrease_${item.id}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-right text-gray-600">
                        {(
                          (parseFloat(watchValues[`icds_increase_${item.id}`]) || 0) -
                          (parseFloat(watchValues[`icds_decrease_${item.id}`]) || 0)
                        ).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary of ICDS Adjustments */}
        <div className="mb-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded">
          <h3 className="text-sm font-semibold text-indigo-800 mb-3">Summary of ICDS Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-xs text-gray-600">Total Increase in Profit</p>
              <p className="text-lg font-bold text-indigo-700">
                ₹ {increaseInProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-white border border-indigo-200 rounded">
              <p className="text-xs text-gray-600">Total Decrease in Profit</p>
              <p className="text-lg font-bold text-red-700">
                ₹ {decreaseInProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
              <p className="text-xs text-gray-600">Net ICDS Effect</p>
              <p className={`text-lg font-bold ${netEffect >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                ₹ {netEffect.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
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

export default ScheduleICDS;
