import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleLSFProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleLSF: React.FC<ScheduleLSFProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);

  const watchValues = watch();

  const toggleRow = (rowIndex: number) => {
    setExpandedRows((prev) =>
      prev.includes(rowIndex) ? prev.filter((r) => r !== rowIndex) : [...prev, rowIndex]
    );
  };

  // Calculate totals
  const calculateTotal = (fieldPrefix: string) => {
    let total = 0;
    for (let i = 1; i <= 20; i++) {
      total += parseFloat(watchValues[`${fieldPrefix}_${i}`]) || 0;
    }
    return total;
  };

  const totalBusinessLoss = calculateTotal("loss_business");
  const totalCapitalLoss = calculateTotal("loss_capital");
  const totalSpeculativeLoss = calculateTotal("loss_speculative");
  const totalLossUnderSection115BAD = calculateTotal("loss_115bad");
  const totalLossFromHouseProperty = calculateTotal("loss_hp");
  const totalLossAvailableForSet = calculateTotal("loss_available_set");
  const totalLossFromDepreciation = calculateTotal("loss_depreciation");
  const totalLossFromDepreciationNotAllowed = calculateTotal("loss_depreciation_not");
  const totalShortTermCapitalLoss = calculateTotal("loss_stcg");
  const totalLongTermCapitalLoss = calculateTotal("loss_ltcg");
  const totalLossCarriedForward = calculateTotal("loss_carried_forward");

  const years = [
    { row: "I", year: "2010-11", label: "2010-11" },
    { row: "II", year: "2011-12", label: "2011-12" },
    { row: "III", year: "2012-13", label: "2012-13" },
    { row: "IV", year: "2013-14", label: "2013-14" },
    { row: "V", year: "2014-15", label: "2014-15" },
    { row: "VI", year: "2015-16", label: "2015-16" },
    { row: "VII", year: "2016-17", label: "2016-17" },
    { row: "VIII", year: "2017-18", label: "2017-18" },
    { row: "IX", year: "2018-19", label: "2018-19" },
    { row: "X", year: "2019-20", label: "2019-20" },
    { row: "XI", year: "2020-21", label: "2020-21" },
    { row: "XII", year: "2021-22", label: "2021-22" },
    { row: "XIII", year: "2022-23", label: "2022-23" },
    { row: "XIV", year: "2023-24", label: "2023-24" },
    { row: "XV", year: "2024-25", label: "2024-25" },
  ];

  const columns = [
    { id: "sl_no", label: "S.l.", width: "40px" },
    { id: "assessment_year", label: "Assessment Year", width: "100px" },
    { id: "loss_date", label: "Date of Filing of Return (DD/MM/YYYY)", width: "130px" },
    { id: "home_provided", label: "Home Provided (Yes/No)", width: "110px" },
    { id: "loss_business", label: "Loss from business other than loss from speculative business and loss under section 115BAD or 115BAC(1A)", width: "100px" },
    { id: "loss_speculative", label: "Loss from Speculative Business", width: "100px" },
    { id: "loss_115bad", label: "Loss under section 115BAD or 115BAC(1)(A)", width: "100px" },
    { id: "loss_available_set", label: "Loss Available for Set off or Carried Forward to the year", width: "100px" },
    { id: "loss_hp", label: "Loss from House Property", width: "100px" },
    { id: "loss_depreciation", label: "Loss from Depreciation", width: "100px" },
    { id: "loss_depreciation_not", label: "Loss from Depreciation (S. 1135)", width: "100px" },
    { id: "loss_stcg", label: "Short term capital loss", width: "100px" },
    { id: "loss_ltcg", label: "Long-term capital loss", width: "100px" },
    { id: "loss_carried_forward", label: "Loss carried forward (8 of Schedule BFLA)", width: "100px" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule LSF</h2>
        <p className="text-gray-600">Details of Losses to be carried forward to future years</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Summary Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-xs">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-400 px-2 py-2 text-left font-semibold">Loss Category</th>
                <th className="border border-gray-400 px-2 py-2 text-right font-semibold">Total Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-2 py-2 font-semibold text-gray-700">Business Loss (including loss under 115BAD/115BAC)</td>
                <td className="border border-gray-400 px-2 py-2 text-right font-semibold text-blue-700">
                  {totalBusinessLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-2 py-2 font-semibold text-gray-700">Capital Loss (Short-term & Long-term)</td>
                <td className="border border-gray-400 px-2 py-2 text-right font-semibold text-blue-700">
                  {(totalShortTermCapitalLoss + totalLongTermCapitalLoss).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-400 px-2 py-2 font-semibold text-gray-700">Loss from House Property</td>
                <td className="border border-gray-400 px-2 py-2 text-right font-semibold text-blue-700">
                  {totalLossFromHouseProperty.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border border-gray-400 px-2 py-2 font-bold text-gray-800">Total Loss Carried Forward</td>
                <td className="border border-gray-400 px-2 py-2 text-right font-bold text-green-700 text-sm">
                  {totalLossCarriedForward.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Detailed Loss Entries */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-indigo-100 p-4 font-semibold text-gray-800">
            Loss Details by Assessment Year
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-8">Sl.</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-20">AY</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-24">Return Date</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-16">Home (Y/N)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Business Loss</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Speculative Loss</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Loss u/s 115BAD</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Available Set-off</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">HP Loss</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Depreciation Loss</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Depr. S.1135</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">STCG Loss</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">LTCG Loss</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold min-w-fit">Carried Forward</th>
                </tr>
              </thead>
              <tbody>
                {years.map((yearData, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
                    onClick={() => toggleRow(idx + 1)}
                  >
                    <td className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700">
                      {yearData.row}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-700">
                      {yearData.label}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="date"
                        {...register(`loss_date_${idx + 1}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`home_provided_${idx + 1}`)}
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_business_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_speculative_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_115bad_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_available_set_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_hp_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_depreciation_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_depreciation_not_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_stcg_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        {...register(`loss_ltcg_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2 bg-yellow-50 font-semibold">
                      <input
                        type="number"
                        {...register(`loss_carried_forward_${idx + 1}`)}
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Important Notes:</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Business loss (other than speculation) can be carried forward for 8 years</li>
            <li>• Speculative loss can be carried forward for 4 years</li>
            <li>• Loss from house property can be carried forward for 4 years</li>
            <li>• Capital loss can be carried forward for 8 years (LTCG loss up to 4 years)</li>
            <li>• Loss under section 115BAD can be carried forward for 4 years</li>
            <li>• All loss entries should have corresponding schedule references</li>
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

export default ScheduleLSF;
