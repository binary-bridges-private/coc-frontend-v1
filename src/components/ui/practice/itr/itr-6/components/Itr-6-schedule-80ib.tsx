import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80IBProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Schedule80IB: React.FC<Schedule80IBProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const undertakingCount = watch("80ib_undertaking_count") || 1;
  const undertakings = Array.from({ length: Math.min(undertakingCount, 8) });

  const calculateTotals = () => {
    let totalDeduction = 0;
    undertakings.forEach((_, idx) => {
      const deduction = parseFloat(watch(`80ib_deduction_${idx}`) || 0) || 0;
      totalDeduction += deduction;
    });
    return totalDeduction;
  };

  const undertakingTypes = [
    "Infrastructure undertaking - Industrial Park",
    "Infrastructure undertaking - Power",
    "Infrastructure undertaking - Telecommunications",
    "Infrastructure undertaking - Roads & Bridges",
    "Infrastructure undertaking - Waterways",
    "Infrastructure undertaking - Ports",
    "Enterprise in J&K/Ladakh - Manufacturing",
    "Enterprise in J&K/Ladakh - Processing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-900 mb-2">
            Schedule 80-IB: Deductions under Section 80-IB
          </h1>
          <p className="text-cyan-700">
            Infrastructure undertakings and enterprises in J&K/Ladakh
          </p>
        </div>

        {/* Part A: Undertaking Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-cyan-500">
          <h2 className="text-xl font-bold text-cyan-800 mb-4">
            Part A: Undertaking Details
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Undertakings (Max 8)
            </label>
            <input
              type="number"
              min="1"
              max="8"
              {...register("80ib_undertaking_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cyan-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Undertaking Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    CIN/Registration
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Undertaking Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Commencement Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {undertakings.map((_, idx) => (
                  <tr key={idx} className="hover:bg-cyan-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Enter name"
                        {...register(`80ib_undertaking_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="CIN/Reg"
                        {...register(`80ib_undertaking_cin_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`80ib_type_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        {undertakingTypes.map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        {...register(`80ib_commencement_date_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part B: Deduction Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-cyan-600">
          <h2 className="text-xl font-bold text-cyan-800 mb-4">
            Part B: Deduction Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-cyan-50 rounded">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Undertaking Registered Under (Item Number)
              </label>
              <select
                {...register("80ib_item_number")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="a1">Item a1 - Industrial Park</option>
                <option value="a2">Item a2 - Power</option>
                <option value="b">Item b - Infrastructure</option>
                <option value="c">Item c - J&K/Ladakh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deduction Rate
              </label>
              <select
                {...register("80ib_deduction_rate")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="100">100% (First 10 years)</option>
                <option value="50">50% (Next 5 years)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cyan-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Undertaking
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    AY
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Profit (₹)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Deduction (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {undertakings.map((_, idx) => (
                  <tr key={idx} className="hover:bg-cyan-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Undertaking"
                        {...register(`80ib_ded_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="AY"
                        {...register(`80ib_ded_ay_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`80ib_profit_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`80ib_deduction_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Deduction</p>
              <p className="text-2xl font-bold">₹ {calculateTotals().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Eligibility Period</p>
              <p className="text-lg">10-15 years from commencement</p>
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
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80IB;
