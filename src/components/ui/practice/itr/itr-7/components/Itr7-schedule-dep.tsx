import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleDEPProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleDEP: React.FC<ScheduleDEPProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule DEP
          </h1>
          <p className="text-slate-600 text-lg">
            Summary of depreciation on assets (Other than assets on which full capital expenditure is allowable as deduction under any other section)
          </p>
        </div>

        {/* Summary Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead className="bg-slate-200">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Sl. No.</th>
                  <th className="border border-slate-300 p-3">Depreciation Details</th>
                  <th className="border border-slate-300 p-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Plant and Machinery */}
                <tr>
                  <td className="border border-slate-300 p-3 rowSpan={5} font-bold">1</td>
                  <td className="border border-slate-300 p-3 font-semibold">Plant and machinery</td>
                  <td className="border border-slate-300 p-3"></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">a. Block entitled for depreciation @ 15 percent (Schedule DPM - 17i or 18i as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_pm_15_1a")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">b. Block entitled for depreciation @ 30 percent (Schedule DPM - 17ii or 18ii as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_pm_30_1b")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">c. Block entitled for depreciation @ 40 percent (Schedule DPM - 17iii or 18iii as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_pm_40_1c")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">d. Block entitled for depreciation @ 45 percent (Schedule DPM - 17iv or 18iv as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_pm_45_1d")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 p-3 font-bold">1e</td>
                  <td className="border border-slate-300 p-3 font-bold">Total depreciation on plant and machinery (1a+1b+1c+1d)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_total_pm_1e")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>

                {/* Building */}
                <tr>
                  <td className="border border-slate-300 p-3 rowSpan={4} font-bold">2</td>
                  <td className="border border-slate-300 p-3 font-semibold">Building (not including land)</td>
                  <td className="border border-slate-300 p-3"></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">a. Block entitled for depreciation @ 5 percent (Schedule DOA - 14ii or 15ii as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_bldg_5_2a")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">b. Block entitled for depreciation @ 10 percent (Schedule DOA - 14iii or 15iii as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_bldg_10_2b")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3 pl-8">c. Block entitled for depreciation @ 40 percent (Schedule DOA - 14iv or 15iv as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_bldg_40_2c")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 p-3 font-bold">2d</td>
                  <td className="border border-slate-300 p-3 font-bold">Total depreciation on building (2a+2b+2c)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_total_bldg_2d")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>

                {/* Furniture and Fittings */}
                <tr>
                  <td className="border border-slate-300 p-3 font-bold">3</td>
                  <td className="border border-slate-300 p-3">Furniture and fittings (Schedule DOA - 14v or 15v as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_furniture_3")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Intangible Assets */}
                <tr>
                  <td className="border border-slate-300 p-3 font-bold">4</td>
                  <td className="border border-slate-300 p-3">Intangible assets (Schedule DOA - 14vi or 15vi as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_intangible_4")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Ships */}
                <tr>
                  <td className="border border-slate-300 p-3 font-bold">5</td>
                  <td className="border border-slate-300 p-3">Ships (Schedule DOA - 14vii or 15vii as applicable)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_ships_5")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Total */}
                <tr className="bg-green-100">
                  <td className="border border-slate-300 p-3 font-bold">6</td>
                  <td className="border border-slate-300 p-3 font-bold">Total depreciation (1e+2d+3+4+5)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("dep_total_6")} className="w-full px-2 py-1 border rounded font-bold bg-yellow-200" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleDEP;
