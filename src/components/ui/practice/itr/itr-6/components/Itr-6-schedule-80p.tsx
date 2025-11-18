import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80PProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Schedule80P: React.FC<Schedule80PProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const deductionTypes = [
    { id: "a", code: "80P(2)(a)(i)", desc: "Banking/Credit Facilities to its members" },
    { id: "b", code: "80P(2)(a)(ii)", desc: "Cottage Industry" },
    { id: "c", code: "80P(2)(a)(iii)", desc: "Marketing of Agricultural produce grown by its members" },
    { id: "d", code: "80P(2)(a)(iv)", desc: "Purchase of Agricultural inputs, seeds, stock or other agricultural produce for resale" },
    { id: "e", code: "80P(2)(a)(v)", desc: "Processing - value addition of agricultural produce of its members" },
    { id: "f", code: "80P(2)(a)(vi)", desc: "Collective disposal of Labour of its members" },
    { id: "g", code: "80P(2)(a)(vii)", desc: "Fishing or allied activities for the purpose of supplying to its members" },
    { id: "h", code: "80P(2)(c)(i)", desc: "Primary cooperative society engaged in supplying Milk, oilseeds, fruits or vegetables" },
    { id: "i", code: "80P(2)(c)(ii)", desc: "Consumer Cooperative Society Other than specified in 80P(2a) or 80P(2b)" },
    { id: "j", code: "80P(2)(c)(iii)", desc: "Cooperative Society engaged in activities Other than specified in 80P(2a) or 80P(2b)" },
    { id: "k", code: "80P(2)(d)", desc: "Interest/Dividend from Investment in other co-operative society" },
    { id: "l", code: "80P(2)(e)", desc: "Warehousing / cold storage, processing / facilitating the marketing of commodities" },
    { id: "m", code: "80P(2)(f)", desc: "Others" },
  ];

  const calculateTotals = () => {
    let totalIncome = 0;
    deductionTypes.forEach((type) => {
      const amount = parseFloat(watch(`80p_amount_${type.id}`) || 0) || 0;
      totalIncome += amount;
    });
    return totalIncome;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violet-900 mb-2">
            Schedule 80-P: Deductions under Section 80P
          </h1>
          <p className="text-violet-700">
            Income of Cooperative Societies - Deductions for cooperative society businesses
          </p>
        </div>

        {/* Part A: Cooperative Society Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-500">
          <h2 className="text-xl font-bold text-violet-800 mb-4">
            Part A: Cooperative Society Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cooperative Society Name
              </label>
              <input
                type="text"
                placeholder="Enter society name"
                {...register("80p_society_name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                placeholder="Registration #"
                {...register("80p_registration")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration State
              </label>
              <input
                type="text"
                placeholder="State of registration"
                {...register("80p_state")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year of Registration
              </label>
              <input
                type="text"
                placeholder="YYYY"
                {...register("80p_year")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part B: Income Details by Category */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-600">
          <h2 className="text-xl font-bold text-violet-800 mb-4">
            Part B: Income from Cooperative Activities
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-violet-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">S.No</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Section</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nature of Business Activity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Income (₹)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Deduction %</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Amount for Deduction (₹)</th>
                </tr>
              </thead>
              <tbody>
                {deductionTypes.map((type, idx) => {
                  const income = parseFloat(watch(`80p_amount_${type.id}`) || 0) || 0;
                  const percentage = parseFloat(watch(`80p_percentage_${type.id}`) || 100) || 100;
                  const deductionAmount = (income * percentage) / 100;

                  return (
                    <tr key={type.id} className="hover:bg-violet-50">
                      <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-violet-700">
                        {type.code}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="text-xs text-gray-600 mb-1">{type.desc}</div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`80p_amount_${type.id}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          {...register(`80p_percentage_${type.id}`)}
                          className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                        >
                          <option value="100">100%</option>
                          <option value="90">90%</option>
                          <option value="85">85%</option>
                          <option value="80">80%</option>
                          <option value="50">50%</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-violet-50 font-semibold">
                        ₹ {deductionAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-violet-900 mb-3">Eligibility Requirements</h3>
          <ul className="space-y-2 text-sm text-violet-800">
            <li className="flex items-start">
              <span className="text-violet-600 font-bold mr-3">•</span>
              <span>Cooperative society registered under Cooperative Societies Act</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 font-bold mr-3">•</span>
              <span>100% deduction available on specified income categories</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 font-bold mr-3">•</span>
              <span>Primary agricultural credit societies eligible for full deduction</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 font-bold mr-3">•</span>
              <span>Cooperative engaged in stated business purpose</span>
            </li>
            <li className="flex items-start">
              <span className="text-violet-600 font-bold mr-3">•</span>
              <span>Applicable from AY 1997-98 onwards</span>
            </li>
          </ul>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Cooperative Income</p>
              <p className="text-2xl font-bold">₹ {calculateTotals().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Deduction Available</p>
              <p className="text-2xl font-bold">₹ {calculateTotals().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule80P;
