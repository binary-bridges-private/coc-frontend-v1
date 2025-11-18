import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Schedule80GProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const Schedule80G: React.FC<Schedule80GProps> = ({ form, onSubmit, onCancel }) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const watchValues = watch();

  // Calculate totals for each part
  const calculatePartTotal = (fieldPrefix: string) => {
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      const donated = parseFloat(watchValues[`${fieldPrefix}_donated_${i}`]) || 0;
      const inOther = parseFloat(watchValues[`${fieldPrefix}_in_other_${i}`]) || 0;
      total += donated + inOther;
    }
    return total;
  };

  const calculateEligibleTotal = (fieldPrefix: string) => {
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      total += parseFloat(watchValues[`${fieldPrefix}_eligible_${i}`]) || 0;
    }
    return total;
  };

  // Part A: 100% deduction
  const partADonated = calculatePartTotal("partA");
  const partAEligible = calculateEligibleTotal("partA");

  // Part B: 50% deduction
  const partBDonated = calculatePartTotal("partB");
  const partBEligible = calculateEligibleTotal("partB");

  // Part C: 100% deduction with qualifying limit
  const partCDonated = calculatePartTotal("partC");
  const partCEligible = calculateEligibleTotal("partC");

  // Part D: 50% deduction with qualifying limit
  const partDDonated = calculatePartTotal("partD");
  const partDEligible = calculateEligibleTotal("partD");

  // Part E: Total donations
  const totalDonations = partADonated + partBDonated + partCDonated + partDDonated;
  const totalEligible = partAEligible + partBEligible + partCEligible + partDEligible;

  const DonationRow = ({ idx, part }: { idx: number; part: string }) => (
    <tr className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
      <td className="border border-gray-300 px-2 py-2 text-center font-semibold">{idx}</td>
      <td className="border border-gray-300 px-2 py-2">
        <input
          type="text"
          placeholder="Donor name and address"
          {...register(`${part}_donor_name_${idx}`)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="border border-gray-300 px-2 py-2">
        <input
          type="text"
          placeholder="PAN/Aadhar"
          {...register(`${part}_pan_${idx}`)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="border border-gray-300 px-2 py-2">
        <input
          type="number"
          placeholder="0"
          {...register(`${part}_donated_${idx}`)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
        />
      </td>
      <td className="border border-gray-300 px-2 py-2">
        <input
          type="number"
          placeholder="0"
          {...register(`${part}_in_other_${idx}`)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
        />
      </td>
      <td className="border border-gray-300 px-2 py-2 bg-yellow-50">
        <input
          type="number"
          placeholder="0"
          {...register(`${part}_eligible_${idx}`)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
        />
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule 80G</h2>
        <p className="text-gray-600">Details of donations entitled for deduction under section 80G</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Part A: 100% Deduction without Qualifying Limit */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-blue-100 px-4 py-2 font-semibold text-gray-800">
            Part A: Donations entitled for 100% deduction without qualifying limit
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-8">Sl</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Name and address of donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-24">PAN of Donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donated in cash (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donation in other mode (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Total Donation (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((idx) => (
                  <DonationRow key={idx} idx={idx} part="partA" />
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {calculatePartTotal("partA").toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {partAEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part B: 50% Deduction without Qualifying Limit */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-green-100 px-4 py-2 font-semibold text-gray-800">
            Part B: Donations entitled for 50% deduction without qualifying limit
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-green-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-8">Sl</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Name and address of donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-24">PAN of Donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donated in cash (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donation in other mode (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Eligible Amount (50%)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((idx) => (
                  <DonationRow key={idx} idx={idx} part="partB" />
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {calculatePartTotal("partB").toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {partBEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part C: 100% Deduction subject to Qualifying Limit */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-purple-100 px-4 py-2 font-semibold text-gray-800">
            Part C: Donations entitled for 100% deduction subject to qualifying limit
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-purple-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-8">Sl</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Name and address of donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-24">PAN of Donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donated in cash (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donation in other mode (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Eligible Amount of Donation</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((idx) => (
                  <DonationRow key={idx} idx={idx} part="partC" />
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {calculatePartTotal("partC").toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {partCEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part D: 50% Deduction subject to Qualifying Limit */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-pink-100 px-4 py-2 font-semibold text-gray-800">
            Part D: Donations entitled for 50% deduction subject to qualifying limit
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-pink-200">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-8">Sl</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Name and address of donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold w-24">PAN of Donee</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donated in cash (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Donation in other mode (₹)</th>
                  <th className="border border-gray-300 px-2 py-2 text-right font-semibold w-24">Eligible Amount of Donation</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((idx) => (
                  <DonationRow key={idx} idx={idx} part="partD" />
                ))}
                <tr className="bg-yellow-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2 text-right">Total</td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {calculatePartTotal("partD").toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2 text-right">
                    {partDEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part E: Summary */}
        <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-indigo-100 px-4 py-2 font-semibold text-gray-800">
            Part E: Total donations (All + B/II + C/III + D/II)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-indigo-200">
                <tr>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Category</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Total Donated (₹)</th>
                  <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Eligible Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">Part A (100% - No Limit)</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {partADonated.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-blue-700 font-semibold">
                    {partAEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">Part B (50% - No Limit)</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {partBDonated.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-green-700 font-semibold">
                    {partBEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">Part C (100% - With Limit)</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {partCDonated.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-purple-700 font-semibold">
                    {partCEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">Part D (50% - With Limit)</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {partDDonated.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right text-pink-700 font-semibold">
                    {partDEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
                <tr className="bg-yellow-100 border-t-2 border-yellow-400">
                  <td className="border border-gray-300 px-3 py-2 font-bold text-gray-800">Total Deduction u/s 80G</td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-bold">
                    {totalDonations.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right font-bold text-green-800">
                    {totalEligible.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Important Notes:</h3>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• Donations to qualified organizations under section 80G are deductible</li>
            <li>• 100% deduction is available for donations to certain specified institutions</li>
            <li>• 50% deduction is available for donations to other approved charities</li>
            <li>• Some donations are subject to qualifying limit (10% of AGI for 50% category)</li>
            <li>• Donation must be made in cash or cheque/DD</li>
            <li>• Donee organization must have 80G registration certificate</li>
            <li>• Donations made during FY 2024-25 are eligible for deduction in AY 2025-26</li>
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

export default Schedule80G;
