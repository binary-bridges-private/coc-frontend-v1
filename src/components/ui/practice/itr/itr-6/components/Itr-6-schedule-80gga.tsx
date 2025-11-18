import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80GGAProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const Schedule80GGA: React.FC<Schedule80GGAProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit } = form;
  const watchValues = watch();

  // Calculate totals
  const calculateTotal = (fieldPrefix: string) => {
    let total = 0;
    for (let i = 1; i <= 2; i++) {
      const cash = parseFloat(watchValues[`${fieldPrefix}_cash_${i}`]) || 0;
      const other = parseFloat(watchValues[`${fieldPrefix}_other_${i}`]) || 0;
      total += cash + other;
    }
    return total;
  };

  const totalDonationCash = calculateTotal("donation_cash");
  const totalDonationOther = calculateTotal("donation_other");
  const totalDonation = totalDonationCash + totalDonationOther;
  const eligibleAmount = totalDonation; // 100% eligible

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule 80GGA</h2>
        <p className="text-gray-600">Details of donations for scientific research or rural development</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Donation Details Table */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-blue-100 px-4 py-2 font-semibold text-gray-800">
            Donations for Scientific Research or Rural Development
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-8">Sl No</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Category in which deduction is claimed (Specify where provision provided)</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-32">Name and address of donee</th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold w-20">PAN of Donee</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Donation in cash (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Donation in other mode (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Total Donation (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold w-24">Eligible Amount of donation (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((idx) => {
                  const cash = parseFloat(watchValues[`donation_cash_${idx}`]) || 0;
                  const other = parseFloat(watchValues[`donation_other_${idx}`]) || 0;
                  const total = cash + other;

                  return (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{idx}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          placeholder="Scientific research or rural development"
                          {...register(`donation_category_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          placeholder="Donee name & address"
                          {...register(`donation_name_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          placeholder="PAN"
                          {...register(`donation_pan_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`donation_cash_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          {...register(`donation_other_${idx}`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold bg-yellow-50">
                        {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold bg-yellow-100">
                        {total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={4} className="border border-gray-300 px-3 py-2 text-right">Total donation</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {totalDonationCash.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {totalDonationOther.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {totalDonation.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-green-800">
                    {eligibleAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">Deduction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-blue-200 rounded">
              <p className="text-xs text-gray-600">Total Donation</p>
              <p className="text-lg font-bold text-blue-700">₹ {totalDonation.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded">
              <p className="text-xs text-gray-600">Eligible Amount (100%)</p>
              <p className="text-lg font-bold text-green-800">₹ {eligibleAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
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

export default Schedule80GGA;
