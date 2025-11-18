import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule81ACProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const Schedule81AC: React.FC<Schedule81ACProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit } = form;
  const watchValues = watch();

  // Calculate deduction
  const investmentAmount = parseFloat(watchValues.investment_amount) || 0;
  const maxDeduction = Math.min(investmentAmount, 50000000); // ₹5 crore limit
  const deductionPercentage = 50; // 50% of investment
  const eligibleDeduction = (maxDeduction * deductionPercentage) / 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule 81AC</h2>
        <p className="text-gray-600">Deduction in respect of eligible start-up</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Startup Investment Details */}
        <div className="mb-6 p-4 border-l-4 border-purple-500 bg-purple-50">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Investment Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name of Start-up
              </label>
              <input
                type="text"
                placeholder="Enter startup name"
                {...register("startup_name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Number / DIN
              </label>
              <input
                type="text"
                placeholder="Registration number"
                {...register("startup_registration")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount of Investment (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("investment_amount")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Investment
              </label>
              <input
                type="date"
                {...register("investment_date")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Certification Letter Reference
              </label>
              <input
                type="text"
                placeholder="DSIR/DPIIT certification reference"
                {...register("certification_reference")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category of Start-up
              </label>
              <select
                {...register("startup_category")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology/IT Startup</option>
                <option value="biotech">Biotech Startup</option>
                <option value="agriculture">Agriculture Technology</option>
                <option value="food">Food Processing</option>
                <option value="renewable">Renewable Energy</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deduction Calculation */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-green-100 px-4 py-2 font-semibold text-gray-800">
            Deduction Calculation (Section 81AC)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-right font-semibold">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Amount Invested in Start-up</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                    {investmentAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">Maximum Limit (₹5 Crore)</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                    {maxDeduction.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-2">Deduction @ 50% (Maximum)</td>
                  <td className="border border-gray-300 px-4 py-2 text-right font-bold text-blue-800">
                    {eligibleDeduction.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded">
          <h3 className="text-sm font-semibold text-purple-800 mb-3">Eligibility Criteria for Section 81AC:</h3>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Investment must be in eligible start-up as per DSIR/DPIIT certification</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Maximum investment limit: ₹5 crore per financial year</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Deduction available at 50% of investment amount</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Applicable for individuals only (not for HUF or companies)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Deduction available for AY 2016-17 to AY 2025-26 (as per current provisions)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Investment must be made within 6 months from date of commencement of business by start-up</span>
            </li>
          </ul>
        </div>

        {/* Summary */}
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Deduction Summary</h3>
          <p className="text-lg font-bold text-green-800">
            Eligible Deduction u/s 81AC: ₹ {eligibleDeduction.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </p>
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

export default Schedule81AC;
