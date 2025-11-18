import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80IEProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Schedule80IE: React.FC<Schedule80IEProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const undertakingCount = watch("80ie_undertaking_count") || 1;
  const undertakings = Array.from({ length: Math.min(undertakingCount, 6) });

  const calculateTotals = () => {
    let totalDeduction = 0;
    undertakings.forEach((_, idx) => {
      const deduction = parseFloat(watch(`80ie_deduction_${idx}`) || 0) || 0;
      totalDeduction += deduction;
    });
    return totalDeduction;
  };

  const greenTechCategories = [
    "Renewable Energy - Solar",
    "Renewable Energy - Wind",
    "Renewable Energy - Hydro",
    "Energy Efficiency - Industrial",
    "Pollution Control - Water Treatment",
    "Pollution Control - Air Quality",
    "Green Building - LEED Certified",
    "Electric Vehicle Infrastructure",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-lime-900 mb-2">
            Schedule 80-IE: Deductions under Section 80-IE
          </h1>
          <p className="text-lime-700">
            Green Technology Undertakings - Renewable Energy, Energy Efficiency & Environmental Protection
          </p>
        </div>

        {/* Part A: Undertaking Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-lime-500">
          <h2 className="text-xl font-bold text-lime-800 mb-4">
            Part A: Green Technology Undertaking Details
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Green Technology Units (Max 6)
            </label>
            <input
              type="number"
              min="1"
              max="6"
              {...register("80ie_undertaking_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lime-100">
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
                    Green Tech Category
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Commencement Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {undertakings.map((_, idx) => (
                  <tr key={idx} className="hover:bg-lime-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Undertaking name"
                        {...register(`80ie_undertaking_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="CIN/Registration"
                        {...register(`80ie_undertaking_cin_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`80ie_category_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {greenTechCategories.map((cat, i) => (
                          <option key={i} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        {...register(`80ie_commencement_date_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part B: Certification & Compliance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-lime-500">
          <h2 className="text-xl font-bold text-lime-800 mb-4">
            Part B: Certification & Compliance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Certifying Authority
              </label>
              <select
                {...register("80ie_certifying_authority")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="dnre">DNRE (Department of Non-Renewable Energy)</option>
                <option value="mopwr">MOPWR (Ministry of Power)</option>
                <option value="cpcb">CPCB (Central Pollution Control Board)</option>
                <option value="state_pollution">State Pollution Board</option>
                <option value="nrdc">NRDC (National Resource Development Council)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Certification Date
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                {...register("80ie_certification_date")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part C: Deduction Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-lime-600">
          <h2 className="text-xl font-bold text-lime-800 mb-4">
            Part C: Deduction Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-lime-100">
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
                    Eligible Profit (₹)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Deduction Rate
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Deduction (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {undertakings.map((_, idx) => (
                  <tr key={idx} className="hover:bg-lime-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Undertaking"
                        {...register(`80ie_ded_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="AY"
                        {...register(`80ie_ded_ay_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`80ie_profit_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`80ie_rate_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="100">100% (First 10 years)</option>
                        <option value="50">50% (Years 11-15)</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`80ie_deduction_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-lime-50 border border-lime-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-lime-900 mb-3">
            Eligibility Criteria
          </h3>
          <ul className="space-y-2 text-sm text-lime-800">
            <li className="flex items-start">
              <span className="text-lime-600 font-bold mr-3">•</span>
              <span>100% deduction for first 10 years from commencement</span>
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 font-bold mr-3">•</span>
              <span>50% deduction for next 5 years (Years 11-15)</span>
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 font-bold mr-3">•</span>
              <span>Undertaking must be certified by designated authority</span>
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 font-bold mr-3">•</span>
              <span>Only profit from green technology activity qualifies</span>
            </li>
            <li className="flex items-start">
              <span className="text-lime-600 font-bold mr-3">•</span>
              <span>Technology must meet prescribed efficiency standards</span>
            </li>
          </ul>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-lime-500 to-green-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Deduction</p>
              <p className="text-2xl font-bold">₹ {calculateTotals().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Eligible Period</p>
              <p className="text-lg">15 years from commencement</p>
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
            className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80IE;
