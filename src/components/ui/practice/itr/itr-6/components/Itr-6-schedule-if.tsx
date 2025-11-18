import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleIFProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleIF: React.FC<ScheduleIFProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const firmCount = watch("if_firm_count") || 1;
  const firms = Array.from({ length: Math.min(firmCount, 10) });

  const calculateTotals = () => {
    let totalShare = 0;
    let totalCapital = 0;

    firms.forEach((_, idx) => {
      const share = parseFloat(watch(`if_percentage_${idx}`) || 0) || 0;
      const capital = parseFloat(watch(`if_capital_${idx}`) || 0) || 0;
      totalShare += share;
      totalCapital += capital;
    });

    return { totalShare, totalCapital };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">
            Schedule IF: Partnership Firm Details
          </h1>
          <p className="text-purple-700">
            Information regarding partnership firms in which you are a partner
          </p>
        </div>

        {/* Number of Firms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-500">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Partnership Firms (Max 10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("if_firm_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Partnership Firms Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-600">
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            Partnership Firm Information
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 px-4 py-2 text-left w-8">
                    S.No
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name of Firm
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    PAN of Firm
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Nature of Firm
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Auditable (Y/N)
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Sec 139(1) Partner
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    % Share in Profit
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Capital Balance (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {firms.map((_, idx) => (
                  <tr key={idx} className="hover:bg-purple-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-purple-700">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="Enter firm name"
                        {...register(`if_firm_name_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        placeholder="AABCT1234A"
                        {...register(`if_firm_pan_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        {...register(`if_firm_nature_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="trading">Trading</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="service">Service</option>
                        <option value="professional">Professional</option>
                        <option value="other">Other</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <select
                        {...register(`if_auditable_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <select
                        {...register(`if_sec_139_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        min="0"
                        max="100"
                        {...register(`if_percentage_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-center"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`if_capital_${idx}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-purple-50 font-bold">
                  <td colSpan={6} className="border border-gray-300 px-4 py-2 text-right">
                    Total
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-purple-700">
                    {totals.totalShare.toFixed(2)}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-purple-700">
                    ₹ {totals.totalCapital.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-purple-900 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Provide details of all partnership firms where you are a partner</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Capital balance should be as on 31st March of the relevant AY</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Percentage share should be as per partnership deed</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>PAN of firm is mandatory for filing</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">•</span>
              <span>Update Section 139(1) partner status as per firm's filing obligation</span>
            </li>
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
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleIF;
