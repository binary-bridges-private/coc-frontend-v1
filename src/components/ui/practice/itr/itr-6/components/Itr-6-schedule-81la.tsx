import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule81LAProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const Schedule81LA: React.FC<Schedule81LAProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit } = form;
  const watchValues = watch();

  // Calculate totals
  const calculateRowTotal = (idx: number) => {
    const bank = parseFloat(watchValues[`bank_${idx}`]) || 0;
    const bank2 = parseFloat(watchValues[`bank2_${idx}`]) || 0;
    const bank3 = parseFloat(watchValues[`bank3_${idx}`]) || 0;
    return bank + bank2 + bank3;
  };

  const totalDeduction = [1, 2, 3, 4].reduce((sum, idx) => sum + calculateRowTotal(idx), 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule 81LA</h2>
        <p className="text-gray-600">Deduction in respect of offshore banking unit or IFSC</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section Information */}
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded">
          <h3 className="text-sm font-semibold text-teal-800 mb-3">Sub-section in which deduction is claimed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Sub-section under Section 80LA
              </label>
              <select
                {...register("subsection_81la")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Sub-section</option>
                <option value="81la_1">80LA(1) - OBU</option>
                <option value="81la_2">80LA(2) - IFSC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deduction Details Table */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-teal-100 px-4 py-2 font-semibold text-gray-800">
            Deduction in respect of Offshore Banking Unit or IFSC
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-teal-200 sticky top-0">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Sl No</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Type of Entity</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Type of Income of the unit</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Authority granting registration</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Date of registration</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Registration number</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold">First AY during which deduction was claimed</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold">Amount of deduction claimed for current AY (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{idx}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`entity_type_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      >
                        <option value="">Select</option>
                        <option value="OBU">OBU</option>
                        <option value="IFSC">IFSC</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`income_type_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      >
                        <option value="">Select</option>
                        <option value="banking">Banking business</option>
                        <option value="insurance">Insurance business</option>
                        <option value="financial">Financial services</option>
                        <option value="other">Other financial activities</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="IFSCA/RBI/SEBI"
                        {...register(`authority_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="date"
                        {...register(`reg_date_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="Reg number"
                        {...register(`reg_number_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        placeholder="AY"
                        {...register(`first_ay_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`deduction_amount_${idx}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-right"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={7} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right text-green-800">
                    {totalDeduction.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Eligibility Notes */}
        <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded">
          <h3 className="text-sm font-semibold text-teal-800 mb-3">Important Notes:</h3>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Section 80LA provides deduction for OBU (Offshore Banking Unit) or IFSC units</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>OBU: Banking unit licensed and regulated by RBI under FEMA</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>IFSC: International Financial Services Centre unit under IFSCA regulation</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Deduction is 100% of profits derived from eligible business activities</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Applicable for 10 years from commencement of business or first profitable year</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Unit must be registered with appropriate regulatory authority</span>
            </li>
          </ul>
        </div>

        {/* Summary */}
        <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Total Deduction Summary</h3>
          <p className="text-lg font-bold text-green-800">
            Total Deduction u/s 81LA: ₹ {totalDeduction.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
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

export default Schedule81LA;
