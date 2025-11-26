import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleESRProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleESR: React.FC<ScheduleESRProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule ESR
          </h1>
          <p className="text-slate-600 text-lg">
            Expenditure on scientific Research etc. (Deduction under section 35 or 35CCC or 35CCD)
          </p>
        </div>

        {/* Scientific Research Expenditure Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead className="bg-slate-200">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Sl. No.</th>
                  <th className="border border-slate-300 p-3">Expenditure of the nature referred to in section</th>
                  <th className="border border-slate-300 p-3">Amount, if any, debited to profit and loss account</th>
                  <th className="border border-slate-300 p-3">Amount of deduction allowable</th>
                  <th className="border border-slate-300 p-3">Amount of deduction in excess of the amount debited to profit and loss account</th>
                </tr>
              </thead>
              <tbody>
                {/* Row Headers */}
                <tr className="bg-slate-100">
                  <td className="border border-slate-300 p-3">(1)</td>
                  <td className="border border-slate-300 p-3">(2)</td>
                  <td className="border border-slate-300 p-3">(3)</td>
                  <td className="border border-slate-300 p-3">(4)</td>
                  <td className="border border-slate-300 p-3">(5) = (3) - (2)</td>
                </tr>

                {/* Row i */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">i</td>
                  <td className="border border-slate-300 p-3">35(1)(i)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_i_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_i_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_i_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row ii */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">ii</td>
                  <td className="border border-slate-300 p-3">35(1)(ii)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_ii_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_ii_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_ii_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row iii */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">iii</td>
                  <td className="border border-slate-300 p-3">35(1)(iii)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_iii_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_iii_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_iii_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row iv */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">iv</td>
                  <td className="border border-slate-300 p-3">35(1)(iii)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_iv_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_iv_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_iv_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row v */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">v</td>
                  <td className="border border-slate-300 p-3">35(1)(iv)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_v_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_v_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_1_v_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row vi */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">vi</td>
                  <td className="border border-slate-300 p-3">35(2AA)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_2aa_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_2aa_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_2aa_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row vii */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">vii</td>
                  <td className="border border-slate-300 p-3">35(2AB)</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_2ab_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_2ab_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35_2ab_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row viii */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">viii</td>
                  <td className="border border-slate-300 p-3">35CCC</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35ccc_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35ccc_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35ccc_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row ix */}
                <tr>
                  <td className="border border-slate-300 p-3 font-semibold">ix</td>
                  <td className="border border-slate-300 p-3">35CCD</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35ccd_debited")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35ccd_allowable")} className="w-full px-2 py-1 border rounded" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_35ccd_excess")} className="w-full px-2 py-1 border rounded" /></td>
                </tr>

                {/* Row x - Total */}
                <tr className="bg-blue-50">
                  <td className="border border-slate-300 p-3 font-bold">x</td>
                  <td className="border border-slate-300 p-3 font-bold">Total</td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_total_debited")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_total_allowable")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                  <td className="border border-slate-300 p-3"><input type="number" {...register("esr_total_excess")} className="w-full px-2 py-1 border rounded font-bold" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <p className="text-sm font-semibold text-slate-700 mb-2">
              NOTE: In case any deduction is claimed under sections 35(1)(i) or 35(1)(iii) or 35(1)(iii) or 35(2AA), please provide the details as per Schedule RA.
            </p>
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

export default ScheduleESR;
