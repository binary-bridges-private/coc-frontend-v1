import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80RAProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Schedule80RA: React.FC<Schedule80RAProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const entryCount = watch("80ra_entry_count") || 1;
  const entries = Array.from({ length: Math.min(entryCount, 5) });

  const calculateTotals = () => {
    let totalContribution = 0;
    let totalEligible = 0;
    entries.forEach((_, idx) => {
      const contribution = parseFloat(watch(`80ra_contribution_${idx}`) || 0) || 0;
      const eligible = parseFloat(watch(`80ra_eligible_${idx}`) || 0) || 0;
      totalContribution += contribution;
      totalEligible += eligible;
    });
    return { totalContribution, totalEligible };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            Schedule 80-RA: Deductions under Section 80-RA
          </h1>
          <p className="text-emerald-700">
            Contributions to research associations and scheme for intellectual property development
          </p>
        </div>

        {/* Part A: Contribution Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-emerald-500">
          <h2 className="text-xl font-bold text-emerald-800 mb-4">
            Part A: Research Association/IPD Scheme Details
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Research Associations (Max 5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              {...register("80ra_entry_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name of Association/Scheme
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Registration Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Type
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Approval Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((_, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Association/Scheme name"
                        {...register(`80ra_association_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Registration #"
                        {...register(`80ra_registration_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`80ra_type_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="research_association">Research Association</option>
                        <option value="ipd_scheme">IPD Scheme</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="YYYY"
                        {...register(`80ra_approval_year_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part B: Contribution Amount */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-emerald-600">
          <h2 className="text-xl font-bold text-emerald-800 mb-4">
            Part B: Contribution Details
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Association/Scheme
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Mode of Contribution
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Amount Contributed (₹)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    % Eligible (1-100%)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Eligible Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((_, idx) => {
                  const contribution = parseFloat(watch(`80ra_contribution_${idx}`) || 0) || 0;
                  const percentage = parseFloat(watch(`80ra_percentage_${idx}`) || 100) || 100;
                  const eligible = (contribution * percentage) / 100;

                  return (
                    <tr key={idx} className="hover:bg-emerald-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {idx + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          placeholder="Name"
                          {...register(`80ra_ded_name_${idx}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          {...register(`80ra_mode_${idx}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="cash">Cash</option>
                          <option value="cheque">Cheque/DD</option>
                          <option value="transfer">Bank Transfer</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`80ra_contribution_${idx}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          placeholder="100"
                          min="0"
                          max="100"
                          step="0.01"
                          {...register(`80ra_percentage_${idx}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-emerald-50 font-semibold">
                        ₹ {eligible.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Contributed</p>
              <p className="text-2xl font-bold">₹ {totals.totalContribution.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Eligible</p>
              <p className="text-2xl font-bold">₹ {totals.totalEligible.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Deduction Available</p>
              <p className="text-2xl font-bold">₹ {totals.totalEligible.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80RA;
