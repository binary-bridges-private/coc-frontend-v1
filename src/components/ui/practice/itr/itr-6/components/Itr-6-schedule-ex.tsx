import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleEXProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleEX: React.FC<ScheduleEXProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const exemptIncomeTypes = [
    {
      id: "1",
      section: "Interest income",
      code: "1",
      note: "1",
    },
    {
      id: "2i",
      section: "Gross Agricultural receipts (other than income to be excluded under rule 7A, 7B or 8 of I.T. Rules)",
      code: "2i",
      note: "II",
    },
    {
      id: "2ii",
      section: "Expenditure incurred on agriculture",
      code: "2ii",
      note: "II",
    },
    {
      id: "3",
      section: "Unabsorbed agricultural loss of previous eight assessment years (Sec. 71, 72(2))",
      code: "3",
      note: "II",
    },
    {
      id: "4",
      section: "Agricultural income portion relating to Rule 7, 7A, 7B(1), 7B(3) and from Sl. No. 28 of Sch. BP",
      code: "4",
      note: "IV",
    },
    {
      id: "5",
      section: "Net agricultural income for the year (II - III + IV + V) (enter nil if loss)",
      code: "5",
      note: "2",
    },
    {
      id: "6",
      section: "If taxable agricultural income does not exceed Rs.5 lakhs, please furnish the following details (Fill up details separately for each agricultural land)",
      subsections: [
        { id: "6a", label: "Name of district along with pin code in which agricultural land is located" },
        { id: "6b", label: "Measurement of agricultural land in Acre" },
        { id: "6c", label: "Whether the agricultural land is owned or held on lease (drop down to be provided)" },
        { id: "6d", label: "Whether the agricultural land is irrigated or rain fed (drop down to be provided)" },
      ],
      code: "6",
      note: "3",
    },
    {
      id: "7",
      section: "Other exempt income (please specify) (2a-3b)",
      code: "7",
      note: "3",
    },
    {
      id: "8",
      section: "Income u/s 10(23FB) or 10(23FBA) or 10 (23FC) or 10(23FCA) or 10(23FE) or 10(23FI) or 10(4D) (Please provide details of Acknowledgement Number and Date of Form Filed if 10(23F) and 10(4D) is claimed)",
      code: "8",
      note: "3a",
    },
    {
      id: "9",
      section: "Any other Income (Specify nature) - Add row option with free text to enter the nature of income to be provided in utility for each section separately",
      code: "9",
      note: "3b",
    },
  ];

  const calculateTotals = () => {
    let totalExemptIncome = 0;

    exemptIncomeTypes.forEach((type) => {
      const amount = parseFloat(watch(`ex_amount_${type.id}`) || 0) || 0;
      totalExemptIncome += amount;
    });

    return totalExemptIncome;
  };

  const totalExempt = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">
            Schedule EX: Details of Exempt Income
          </h1>
          <p className="text-orange-700">
            Income not to be included in Total Income or not chargeable to tax
          </p>
        </div>

        {/* Part 1: Agricultural Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-500">
          <h2 className="text-xl font-bold text-orange-800 mb-4">
            Part 1: Agricultural Income
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Interest income
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_1")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Gross Agricultural receipts (other than income to be excluded)
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_2i")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Expenditure incurred on agriculture
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_2ii")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Unabsorbed agricultural loss (previous 8 assessment years)
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_3")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Agricultural income portion relating to Rule 7, 7A, 7B(1), 7B(3)
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_4")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded border border-yellow-200 font-bold">
              <span className="text-gray-700">
                Net Agricultural Income (to be calculated)
              </span>
              <span className="text-lg text-yellow-700">
                ₹ {calculateTotals().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Part 2: Agricultural Land Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-500">
          <h2 className="text-xl font-bold text-orange-800 mb-4">
            Part 2: Agricultural Land Details (if income ≤ Rs. 5 lakhs)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District Name with Pin Code
              </label>
              <input
                type="text"
                placeholder="Enter district and pin code"
                {...register("ex_district_pincode")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Measurement of Agricultural Land (in Acre)
              </label>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_land_acre")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ownership Status
              </label>
              <select
                {...register("ex_ownership")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="owned">Owned</option>
                <option value="leased">Held on lease</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Irrigation Status
              </label>
              <select
                {...register("ex_irrigation")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="irrigated">Irrigated</option>
                <option value="rainfed">Rain fed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Part 3: Other Exempt Income */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-600">
          <h2 className="text-xl font-bold text-orange-800 mb-4">
            Part 3: Other Exempt Income
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Other exempt income (please specify)
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_7")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div className="flex justify-between items-center p-3 bg-orange-50 rounded border border-orange-200">
              <span className="text-sm font-semibold text-gray-700">
                Income u/s 10(23FB/FBA/FC/FCA/FE/FI/4D)
              </span>
              <input
                type="number"
                placeholder="0"
                step="0.01"
                {...register("ex_amount_8")}
                className="w-32 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Any other Income (Specify nature)
              </label>
              <textarea
                placeholder="Specify nature and amount"
                {...register("ex_amount_9")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Exempt Income</p>
              <p className="text-2xl font-bold">₹ {totalExempt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Amount Excluded from Total Income</p>
              <p className="text-2xl font-bold">₹ {totalExempt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-orange-900 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-orange-800">
            <li className="flex items-start">
              <span className="text-orange-600 font-bold mr-3">•</span>
              <span>These income items are exempt from tax and should not be included in total income</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 font-bold mr-3">•</span>
              <span>Agricultural income u/s 10(1) is exempt if it does not exceed Rs. 5 lakhs</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 font-bold mr-3">•</span>
              <span>Proper supporting documents must be maintained for all exempt income claims</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 font-bold mr-3">•</span>
              <span>Income u/s 10(23FB) etc. requires specific acknowledgement number and date</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 font-bold mr-3">•</span>
              <span>Deduction of exempt income from gross total income reduces tax liability</span>
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
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleEX;
