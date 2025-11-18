import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleVIAProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleVIA: React.FC<ScheduleVIAProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const partAItems = [
    { id: "80ga", code: "80GA", label: "80GA - Donations to Scientific Research" },
    { id: "80gca", code: "80GCA", label: "80GCA - Donations for Maintenance of Cattle" },
    { id: "80gcb", code: "80GCB", label: "80GCB - Donations for Family Planning" },
    { id: "80gcc", code: "80GCC", label: "80GCC - Donations for Disabled Relief" },
  ];

  const partBItems = [
    { id: "80ia", code: "80IA", label: "80IA - Industrial Undertaking" },
    { id: "80ib", code: "80IB", label: "80IB - Infrastructure Undertaking" },
    { id: "80ic", code: "80IC", label: "80IC - Shipping Company" },
    { id: "80id", code: "80ID", label: "80ID - Telecommunications Infrastructure" },
    { id: "80ie", code: "80IE", label: "80IE - Green Technology" },
  ];

  const partCItems = [
    { id: "80jja", code: "80JJA", label: "80JJA - Employment to Disabled" },
    { id: "80la", code: "80LA", label: "80LA - Deduction to Senior Citizens" },
  ];

  const calculatePartATotal = () => {
    let total = 0;
    partAItems.forEach((item) => {
      const amount = parseFloat(watch(`via_parta_${item.id}`) || 0) || 0;
      total += amount;
    });
    return total;
  };

  const calculatePartBTotal = () => {
    let total = 0;
    partBItems.forEach((item) => {
      const amount = parseFloat(watch(`via_partb_${item.id}`) || 0) || 0;
      total += amount;
    });
    return total;
  };

  const calculatePartCTotal = () => {
    let total = 0;
    partCItems.forEach((item) => {
      const amount = parseFloat(watch(`via_partc_${item.id}`) || 0) || 0;
      total += amount;
    });
    return total;
  };

  const partATotal = calculatePartATotal();
  const partBTotal = calculatePartBTotal();
  const partCTotal = calculatePartCTotal();
  const partBCATotal = partBTotal + partCTotal;
  const grandTotal = partATotal + partBCATotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Schedule VI-A: Deductions under Chapter VI-A
          </h1>
          <p className="text-indigo-700">
            Summary of deductions claimed under various sections of Chapter VI-A
          </p>
        </div>

        {/* Part A: Donations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">
            Part A: Deductions - Donations & Relief
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border border-gray-300 px-4 py-2 text-left w-1/3">
                    Section
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-24">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {partAItems.map((item) => (
                  <tr key={item.id} className="hover:bg-indigo-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-indigo-700">
                      {item.code}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {item.label}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`via_parta_${item.id}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-indigo-50 font-bold">
                  <td colSpan={2} className="border border-gray-300 px-4 py-2">
                    Total Deduction under Part A (a + b + c + d)
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-indigo-700">
                    ₹ {partATotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Part B: Business Deductions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-600">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">
            Part B: Deductions - Business & Industrial Undertakings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border border-gray-300 px-4 py-2 text-left w-1/3">
                    Section
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-24">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {partBItems.map((item) => (
                  <tr key={item.id} className="hover:bg-indigo-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-indigo-700">
                      {item.code}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {item.label}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`via_partb_${item.id}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part C: Other Deductions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-600">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">
            Part C: Deductions - Employment & Other
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border border-gray-300 px-4 py-2 text-left w-1/3">
                    Section
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-24">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {partCItems.map((item) => (
                  <tr key={item.id} className="hover:bg-indigo-50">
                    <td className="border border-gray-300 px-4 py-2 font-bold text-indigo-700">
                      {item.code}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      {item.label}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        placeholder="0"
                        step="0.01"
                        {...register(`via_partc_${item.id}`)}
                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-700">
          <h2 className="text-xl font-bold text-indigo-800 mb-6">
            Summary of Deductions under Chapter VI-A
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
              <span className="text-sm font-semibold text-gray-700">
                1. Total deduction under Part A (a + b + c + d)
              </span>
              <span className="text-lg font-bold text-indigo-700">
                ₹ {partATotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-indigo-50 rounded">
              <span className="text-sm font-semibold text-gray-700">
                2. Total deduction under Part B and C (e + f + g + h + i + j + k)
              </span>
              <span className="text-lg font-bold text-indigo-700">
                ₹ {partBCATotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded text-white">
              <span className="text-base font-bold">
                3. Total deduction under Chapter VI-A (1 + 2)
              </span>
              <span className="text-2xl font-bold">
                ₹ {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>This schedule provides summary of all deductions under Chapter VI-A</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Detailed schedules should be prepared for each deduction claimed</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Supporting documentation required as per each section's conditions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Total deduction cannot exceed eligible income limits</span>
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
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleVIA;
