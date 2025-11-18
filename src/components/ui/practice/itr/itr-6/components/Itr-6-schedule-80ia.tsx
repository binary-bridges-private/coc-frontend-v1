import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80IAProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Schedule80IA: React.FC<Schedule80IAProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const undertakingCount = watch("80ia_undertaking_count") || 1;
  const undertakings = Array.from({ length: Math.min(undertakingCount, 5) });

  const calculateTotals = () => {
    let totalDeduction = 0;
    undertakings.forEach((_, idx) => {
      const deduction = parseFloat(watch(`80ia_deduction_${idx}`) || 0) || 0;
      totalDeduction += deduction;
    });
    return totalDeduction;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">
            Schedule 80-IA: Deductions under Section 80-IA
          </h1>
          <p className="text-orange-700">
            Deductions in respect of profits of an industrial undertaking
          </p>
        </div>

        {/* Part A: Undertaking Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-500">
          <h2 className="text-xl font-bold text-orange-800 mb-4">
            Part A: Undertaking Details
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Undertakings (Max 5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              {...register("80ia_undertaking_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Undertaking Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Registration/CIN
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    CommenCement AY
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {undertakings.map((_, idx) => (
                  <tr key={idx} className="hover:bg-orange-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Enter undertaking name"
                        {...register(`80ia_undertaking_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="CIN/Registration"
                        {...register(`80ia_undertaking_cin_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="e.g., 2015-16"
                        {...register(`80ia_commencement_ay_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`80ia_type_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="100_percent">100% (Eligible AY)</option>
                        <option value="50_percent">50% (Later AY)</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part B: Deduction Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-600">
          <h2 className="text-xl font-bold text-orange-800 mb-4">
            Part B: Deduction Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Undertaking Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    AY of Commencement
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Profit for AY (₹)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Deduction @ % (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {undertakings.map((_, idx) => (
                  <tr key={idx} className="hover:bg-orange-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Undertaking"
                        {...register(`80ia_ded_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="AY"
                        {...register(`80ia_ded_ay_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`80ia_profit_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`80ia_deduction_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Deduction</p>
              <p className="text-2xl font-bold">₹ {calculateTotals().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">10-Year Period</p>
              <p className="text-lg">From commencement AY for 10 years</p>
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
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80IA;
