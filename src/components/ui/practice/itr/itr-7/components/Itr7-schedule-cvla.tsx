import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleCVLAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleCVLA: React.FC<ScheduleCVLAProps> = ({ form, onCancel, onSubmit }) => {
  const { watch, setValue } = form;

  // Watch loss to setoff for calculation
  const cvla_loss_to_setoff = watch("cvla_loss_to_setoff");
  const cvla_total_loss_setoff = watch("cvla_total_loss_setoff");

  // Calculate final loss remaining (i - xvii)
  useEffect(() => {
    if (cvla_loss_to_setoff || cvla_total_loss_setoff) {
      const remaining = (cvla_loss_to_setoff || 0) - (cvla_total_loss_setoff || 0);
      setValue("cvla_loss_remaining", Math.max(0, remaining));
    }
  }, [cvla_loss_to_setoff, cvla_total_loss_setoff, setValue]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule CVLA</h2>
      <p className="text-gray-600 mb-6">Details of Income after Set-off of current year losses</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> This schedule shows income from various sources after set-off of current year losses. 
            Enter the loss available for set-off in row (i) and then track how much is set-off against each income source.
          </p>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="border border-gray-300 p-2 text-left font-semibold w-12">Sl.No</th>
                <th className="border border-gray-300 p-2 text-left font-semibold">Head/ Source of Income</th>
                <th className="border border-gray-300 p-2 text-center font-semibold">Income of current year (Fill this column only if income positive)</th>
                <th className="border border-gray-300 p-2 text-center font-semibold">House property loss of the current year set off</th>
                <th className="border border-gray-300 p-2 text-center font-semibold">Business Loss (other than speculation or specified business loss) of the current year set off</th>
                <th className="border border-gray-300 p-2 text-center font-semibold">Other sources loss (other than loss from race horses and set off to special rate of tax) of the current year set off</th>
                <th className="border border-gray-300 p-2 text-center font-semibold">Current year's Income after set off</th>
              </tr>
            </thead>
            <tbody>
              {/* Row i: Loss to be set off */}
              <tr className="bg-yellow-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">i</td>
                <td className="border border-gray-300 p-2">
                  <span className="font-semibold">Loss to be set off (Fill this row only, if computed figure is negative)</span>
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_loss_to_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="5+1-2-3-4"
                  />
                </td>
              </tr>

              {/* Row ii: House property */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">ii</td>
                <td className="border border-gray-300 p-2">House property</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_house_property_income", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_house_property_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_house_property", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              {/* Row iii: Business Income */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">iii</td>
                <td className="border border-gray-300 p-2">Business (excluding Income from life insurance business u/s 115B speculation income and income from specified business)</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_business_income_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_business_hp_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_business_bus_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_business_other_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_business_income", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              {/* Row iv: Income from life insurance */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">iv</td>
                <td className="border border-gray-300 p-2">Income from life insurance business u/s 115B</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_insurance_income_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_income_from_insurance", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              {/* Row v: Speculation income */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">v</td>
                <td className="border border-gray-300 p-2">Speculation income</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_speculation_income_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_speculation_income", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              {/* Row vi: Specified business income */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">vi</td>
                <td className="border border-gray-300 p-2">Specified business income u/s 55AD</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_specified_business_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_specified_business", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              {/* Capital Gains rows (vii-xiii) - STCG */}
              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">vii</td>
                <td className="border border-gray-300 p-2">Short-term capital gain taxable @ 15%</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_stcg_15_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">viii</td>
                <td className="border border-gray-300 p-2">Short-term capital gain taxable @ 20%</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_stcg_20_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">ix</td>
                <td className="border border-gray-300 p-2">Short-term capital gain taxable @ 30%</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_stcg_30_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">x</td>
                <td className="border border-gray-300 p-2">Short-term capital gain taxable at applicable rates</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_stcg_applicable_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xi</td>
                <td className="border border-gray-300 p-2">Short-term capital gain taxable at special rates in India as per DTAA</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_stcg_special_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              {/* LTCG rows (xii-xv) */}
              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xii</td>
                <td className="border border-gray-300 p-2">Long term capital gain taxable @ 10%</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_ltcg_10_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xiii</td>
                <td className="border border-gray-300 p-2">Long term capital gain taxable @ 12.5%</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_ltcg_12_5_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xiv</td>
                <td className="border border-gray-300 p-2">Long term capital gain taxable @ 20%</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_ltcg_20_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xv</td>
                <td className="border border-gray-300 p-2">Long term capital gain taxable at special rates in India as per DTAA</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_ltcg_special_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              {/* Other sources rows (xvi-xvii) */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xvi</td>
                <td className="border border-gray-300 p-2">Income from other sources chargeable at normal applicable rates</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_os_normal_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_os_normal_hp_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_os_normal_bus_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_os_normal_other_setoff", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_os_normal_rates", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xvii</td>
                <td className="border border-gray-300 p-2">Profit from the activity of owning and maintaining race horses</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_race_horses_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_race_horses_income", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xviii</td>
                <td className="border border-gray-300 p-2">Income from other sources taxable at special rates in India as per DTAA</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_os_special_amt", { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                  />
                </td>
                <td colSpan={4} className="border border-gray-300 p-2 text-center text-gray-500 text-xs">No set-off</td>
              </tr>

              {/* Total Loss Set-off row */}
              <tr className="bg-blue-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xix</td>
                <td className="border border-gray-300 p-2 font-semibold">Total loss set off</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_total_hp_setoff", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_total_bus_setoff", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_total_loss_setoff", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
              </tr>

              {/* Loss remaining row */}
              <tr className="bg-green-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">xx</td>
                <td className="border border-gray-300 p-2 font-semibold">Loss remaining after set-off (i - xix)</td>
                <td className="border border-gray-300 p-2"></td>
                <td colSpan={4} className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cvla_loss_remaining", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600 font-semibold"
                    placeholder="Auto-calculated"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleCVLA;
