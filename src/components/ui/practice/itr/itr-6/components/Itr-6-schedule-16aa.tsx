import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule16AAProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const Schedule16AA: React.FC<Schedule16AAProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const watchValues = watch();
  const [activeBlock, setActiveBlock] = useState(1);

  // Calculate totals
  const totalDeductionUndertak1 = parseFloat(watchValues[`deduction_undertak1_${activeBlock}`]) || 0;
  const totalDeductionUndertak2 = parseFloat(watchValues[`deduction_undertak2_${activeBlock}`]) || 0;
  const totalDeduction = totalDeductionUndertak1 + totalDeductionUndertak2;

  const assessmentYears = [
    { id: "I", year: "Current Year", label: "Current Assessment Year" },
    { id: "II", year: "AY 2023-24", label: "Assessment Year 2023-24" },
    { id: "III", year: "AY 2022-23", label: "Assessment Year 2022-23" },
    { id: "IV", year: "AY 2021-22", label: "Assessment Year 2021-22" },
    { id: "V", year: "AY 2020-21", label: "Assessment Year 2020-21" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule 16AA</h2>
        <p className="text-gray-600">Deduction under section 16AA for Units Located in Special Economic Zone</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Block Selection */}
        <div className="mb-6 p-4 bg-green-50 rounded border border-green-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Block/Undertaking:</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((block) => (
              <button
                key={block}
                type="button"
                onClick={() => setActiveBlock(block)}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  activeBlock === block
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-600 border border-green-600 hover:bg-green-50"
                }`}
              >
                Block {block}
              </button>
            ))}
          </div>
        </div>

        {/* Part A: Undertaking Information */}
        <div className="mb-6 p-4 border-l-4 border-purple-500 bg-purple-50">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Part A: Undertaking Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name of Undertaking
              </label>
              <input
                type="text"
                placeholder="Enter undertaking name"
                {...register(`undertak_name_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Assessment Year in which Unit began to manufacture/produce/provide services
              </label>
              <input
                type="text"
                placeholder="e.g., 2018-19"
                {...register(`undertak_ay_began_${activeBlock}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Part B: Deduction Computation */}
        <div className="mb-6 overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-green-100 sticky top-0">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Sl No</th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Assessment Year</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Amount of Deduction u/s 16AA for Undertaking 1 (₹)</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Amount of Deduction u/s 16AA for Undertaking 2 (₹)</th>
                <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Total Deduction u/s 16AA (₹)</th>
              </tr>
            </thead>
            <tbody>
              {assessmentYears.map((year, idx) => {
                const undertak1 = parseFloat(watchValues[`deduction_undertak1_${idx + 1}`]) || 0;
                const undertak2 = parseFloat(watchValues[`deduction_undertak2_${idx + 1}`]) || 0;
                const total = undertak1 + undertak2;

                return (
                  <tr key={year.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-3 py-3 font-semibold text-center bg-gray-100">
                      {year.id}
                    </td>
                    <td className="border border-gray-300 px-3 py-3">
                      <p className="font-semibold text-gray-800">{year.label}</p>
                    </td>
                    <td className="border border-gray-300 px-3 py-3">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`deduction_undertak1_${idx + 1}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-3">
                      <input
                        type="number"
                        placeholder="0"
                        {...register(`deduction_undertak2_${idx + 1}`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-3 text-right font-semibold bg-yellow-50">
                      {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary of Deduction */}
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <h3 className="text-sm font-semibold text-green-800 mb-3">Summary of Deduction u/s 16AA</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white border border-green-200 rounded">
              <p className="text-xs text-gray-600">Deduction - Undertaking 1</p>
              <p className="text-lg font-bold text-green-700">
                ₹ {totalDeductionUndertak1.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-white border border-green-200 rounded">
              <p className="text-xs text-gray-600">Deduction - Undertaking 2</p>
              <p className="text-lg font-bold text-green-700">
                ₹ {totalDeductionUndertak2.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
              <p className="text-xs text-gray-600">Total Deduction u/s 16AA</p>
              <p className="text-lg font-bold text-green-800">
                ₹ {totalDeduction.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Part C: Eligibility Criteria */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">Eligibility Criteria for Section 16AA</h3>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Unit must be located in a Special Economic Zone (SEZ)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Unit must be engaged in manufacturing, services, or IT services</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Deduction is available for 10 years from the year of commencement of production</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Deduction is equal to 100% of profits derived from unit for first 5 years, then 50% for next 5 years</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Unit must be approved by the Board of Approvals under the SEZ Act</span>
            </li>
          </ul>
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

export default Schedule16AA;
