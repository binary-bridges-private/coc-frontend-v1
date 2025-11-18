import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleFSIProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleFSI: React.FC<ScheduleFSIProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  const countryCount = watch("fsi_country_count") || 1;
  const countries = Array.from({ length: Math.min(countryCount, 10) });

  const incomeHeads = [
    { id: "hp", label: "House Property" },
    { id: "bp", label: "Business or Profession" },
    { id: "cg", label: "Capital Gains" },
    { id: "os", label: "Other sources" },
  ];

  const calculateCountryTotals = (countryIdx: number) => {
    let totalIncomeOutside = 0;
    let totalTaxPaidOutside = 0;
    let totalTaxPayableIndia = 0;
    let totalTaxReliefAvailable = 0;

    incomeHeads.forEach((head) => {
      const income = parseFloat(watch(`fsi_income_${countryIdx}_${head.id}`) || 0) || 0;
      const taxPaid = parseFloat(watch(`fsi_tax_paid_${countryIdx}_${head.id}`) || 0) || 0;
      const taxIndia = parseFloat(watch(`fsi_tax_india_${countryIdx}_${head.id}`) || 0) || 0;
      const relief = parseFloat(watch(`fsi_relief_${countryIdx}_${head.id}`) || 0) || 0;

      totalIncomeOutside += income;
      totalTaxPaidOutside += taxPaid;
      totalTaxPayableIndia += taxIndia;
      totalTaxReliefAvailable += relief;
    });

    return { totalIncomeOutside, totalTaxPaidOutside, totalTaxPayableIndia, totalTaxReliefAvailable };
  };

  const calculateGrandTotals = () => {
    let grandIncomeOutside = 0;
    let grandTaxPaidOutside = 0;
    let grandTaxPayableIndia = 0;
    let grandTaxReliefAvailable = 0;

    countries.forEach((_, idx) => {
      const totals = calculateCountryTotals(idx);
      grandIncomeOutside += totals.totalIncomeOutside;
      grandTaxPaidOutside += totals.totalTaxPaidOutside;
      grandTaxPayableIndia += totals.totalTaxPayableIndia;
      grandTaxReliefAvailable += totals.totalTaxReliefAvailable;
    });

    return { grandIncomeOutside, grandTaxPaidOutside, grandTaxPayableIndia, grandTaxReliefAvailable };
  };

  const grandTotals = calculateGrandTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            Schedule FSI: Foreign Source Income
          </h1>
          <p className="text-emerald-700">
            Details of income from outside India and tax relief (available only in case of resident)
          </p>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <span className="font-bold">NOTE:</span> This schedule is available only for residents of India and applies to income earned from foreign sources subject to tax relief provisions.
          </p>
        </div>

        {/* Number of Countries */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-emerald-500">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Countries (Max 10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            {...register("fsi_country_count")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Countries Details */}
        {countries.map((_, countryIdx) => {
          const countryTotals = calculateCountryTotals(countryIdx);
          return (
            <div key={countryIdx} className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-emerald-600">
              <h2 className="text-lg font-bold text-emerald-800 mb-4">
                Country {countryIdx + 1}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country Code
                  </label>
                  <input
                    type="text"
                    placeholder="Country code (e.g., US, UK)"
                    {...register(`fsi_country_code_${countryIdx}`)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Taxpayer Identification Number
                  </label>
                  <input
                    type="text"
                    placeholder="TIN / Tax ID"
                    {...register(`fsi_tin_${countryIdx}`)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Income Details Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs border border-gray-300">
                  <thead>
                    <tr className="bg-emerald-100">
                      <th className="border border-gray-300 px-2 py-2 text-left">Head of Income</th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-28">Income from Outside India (₹)</th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-28">Tax Paid Outside India (₹)</th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-28">Tax Payable on Such Income in India (₹)</th>
                      <th className="border border-gray-300 px-2 py-2 text-center w-28">Tax Relief Available (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomeHeads.map((head) => (
                      <tr key={head.id} className="hover:bg-emerald-50">
                        <td className="border border-gray-300 px-2 py-2 font-semibold text-gray-700">{head.label}</td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="0"
                            step="0.01"
                            {...register(`fsi_income_${countryIdx}_${head.id}`)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="0"
                            step="0.01"
                            {...register(`fsi_tax_paid_${countryIdx}_${head.id}`)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="0"
                            step="0.01"
                            {...register(`fsi_tax_india_${countryIdx}_${head.id}`)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="0"
                            step="0.01"
                            {...register(`fsi_relief_${countryIdx}_${head.id}`)}
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-right"
                          />
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-100 font-bold">
                      <td className="border border-gray-300 px-2 py-2">Total</td>
                      <td className="border border-gray-300 px-2 py-2 text-center text-emerald-700">
                        {countryTotals.totalIncomeOutside.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center text-emerald-700">
                        {countryTotals.totalTaxPaidOutside.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center text-emerald-700">
                        {countryTotals.totalTaxPayableIndia.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center text-emerald-700">
                        {countryTotals.totalTaxReliefAvailable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Relevant Article Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Relevant Article of Tax Treaty / Relief claimed u/s 90 or 90A
                </label>
                <input
                  type="text"
                  placeholder="e.g., Article 10, 11, Section 90/90A"
                  {...register(`fsi_relevant_article_${countryIdx}`)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          );
        })}

        {/* Grand Total Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-4">Overall Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Income from Outside India</p>
              <p className="text-lg font-bold">₹ {grandTotals.grandIncomeOutside.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Tax Paid Outside</p>
              <p className="text-lg font-bold">₹ {grandTotals.grandTaxPaidOutside.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Tax in India</p>
              <p className="text-lg font-bold">₹ {grandTotals.grandTaxPayableIndia.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-xs opacity-90 mb-1">Total Tax Relief Available</p>
              <p className="text-lg font-bold">₹ {grandTotals.grandTaxReliefAvailable.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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

export default ScheduleFSI;
