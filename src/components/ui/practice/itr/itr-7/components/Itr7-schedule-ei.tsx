import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface Itr7ScheduleEIProps {
  register: UseFormRegister<ITR7FormData>;
  watch: UseFormWatch<ITR7FormData>;
}

export const Itr7ScheduleEI: React.FC<Itr7ScheduleEIProps> = ({ register, watch }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Schedule EI - Details of Exempt Income</h2>
      <p className="text-gray-600 mb-4 italic">
        (Income not to be included in Total Income or not chargeable to tax)
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-12">Sl.</th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Details</th>
              <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {/* Section 1: Agricultural Income */}
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center align-top">1</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium">i. Gross Agricultural receipts (other than income to be excluded under rules 7A, 7B or 8 of I.T. Rules)</label>
                    <input type="number" {...register("exempt_ei_gross_agri_receipts" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mt-1" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">ii. Expenditure incurred on agriculture</label>
                    <input type="number" {...register("exempt_ei_agri_expenditure" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mt-1" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">iii. Unabsorbed agricultural loss of previous eight assessment years</label>
                    <input type="number" {...register("exempt_ei_unabsorbed_loss" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mt-1" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">iv. Agricultural income portion relating to Rule 7, 7A, 7B(1), 7B(1A) and 8 (From Sl. No. 39 of Sch. BP)</label>
                    <input type="number" {...register("exempt_ei_agri_rule_portion" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mt-1" placeholder="0" />
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <label className="block text-sm font-semibold">v. Net Agricultural income for the year (i - ii - iii + iv) (enter nil if loss)</label>
                    <input type="number" {...register("exempt_ei_net_agri_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mt-1 bg-gray-50" placeholder="0" readOnly />
                  </div>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                {(
                  Math.max(
                    0,
                    (watch("exempt_ei_gross_agri_receipts" as any) || 0) -
                    (watch("exempt_ei_agri_expenditure" as any) || 0) -
                    (watch("exempt_ei_unabsorbed_loss" as any) || 0) +
                    (watch("exempt_ei_agri_rule_portion" as any) || 0)
                  )
                ).toLocaleString()}
              </td>
            </tr>

            {/* Section VI: Agricultural Land Details - This becomes row 2 in the table */}
            <tr className="bg-blue-50 hover:bg-blue-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center align-top">2</td>
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                <div className="font-semibold mb-3">VI. In case the net agricultural income for the year exceeds Rs.5 lakh, please furnish the following details (Fill up details separately for each agricultural land)</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">a. Name of district along with pin code in which agricultural land is located</label>
                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Enter district & pin code" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">b. Measurement of agricultural land in Acre</label>
                    <input type="number" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">c. Whether the agricultural land is owned or held on lease (drop down to be provided)</label>
                    <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Select</option>
                      <option>Owned</option>
                      <option>Leased</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">d. Whether the agricultural land is irrigated or rain-fed (drop down to be provided)</label>
                    <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Select</option>
                      <option>Irrigated</option>
                      <option>Rain-fed</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>

            {/* Section 3: Other Exempt Income */}
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center">3</td>
              <td colSpan={2} className="border border-gray-300 px-4 py-2 font-semibold">
                Other exempt income (please specify) [3a+3b]
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center">3a</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Income u/s 10(1)(5B), 10(23FB), 10(23FC), 10(23FCA), 10(23FC), 10(23FF), 10(41D) (Please provide details of Acknowledgement Number and Date of Form 10-23FC and 10(41D) is claimed)</label>
                  <input type="text" {...register("exempt_ei_other_1_nature" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Enter nature of income" />
                  <input type="number" {...register("exempt_ei_other_1_amount" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Amount" />
                  <label className="block text-xs text-gray-500">Add row option to be provided in utility</label>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                {(watch("exempt_ei_other_1_amount" as any) || 0).toLocaleString()}
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center">3b</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Any other Income (Specify nature) - Add row option to be provided in utility</label>
                  <input type="text" {...register("exempt_ei_other_2_nature" as any)} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Specify nature" />
                  <input type="number" {...register("exempt_ei_other_2_amount" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Amount" />
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                {(watch("exempt_ei_other_2_amount" as any) || 0).toLocaleString()}
              </td>
            </tr>

            {/* Section 4: Income not chargeable as per DTAA */}
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center">4</td>
              <td colSpan={2} className="border border-gray-300 px-4 py-2 font-semibold">
                Income claimed as not chargeable to tax as per DTAA
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td colSpan={3} className="border border-gray-300 px-4 py-2">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-2 py-1 text-center">Sl. No.</th>
                        <th className="border border-gray-300 px-2 py-1">Amount of income</th>
                        <th className="border border-gray-300 px-2 py-1">Nature of income</th>
                        <th className="border border-gray-300 px-2 py-1">Country name & Code</th>
                        <th className="border border-gray-300 px-2 py-1">Article of DTAA</th>
                        <th className="border border-gray-300 px-2 py-1">Head of Income</th>
                        <th className="border border-gray-300 px-2 py-1 text-center">Whether TRC obtained (Y/N)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((row) => (
                        <tr key={row} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            <input type="text" {...register(`exempt_ei_dtaa_${row}_sl_no` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder={`${row}`} />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input type="number" {...register(`exempt_ei_dtaa_${row}_amount` as any, { valueAsNumber: true })} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="0" />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input type="text" {...register(`exempt_ei_dtaa_${row}_nature` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="Nature" />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input type="text" {...register(`exempt_ei_dtaa_${row}_country` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="Country" />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input type="text" {...register(`exempt_ei_dtaa_${row}_article` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="Article" />
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            <input type="text" {...register(`exempt_ei_dtaa_${row}_hoi` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs" placeholder="Head" />
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            <select {...register(`exempt_ei_dtaa_${row}_trc_obtained` as any)} className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs">
                              <option>Select</option>
                              <option>Y</option>
                              <option>N</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>

            {/* Section 5: Pass through income */}
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-center">5</td>
              <td colSpan={2} className="border border-gray-300 px-4 py-2 font-semibold">
                Pass through income claimed as not chargeable to tax (Schedule PTI)
              </td>
            </tr>

            {/* Total Row */}
            <tr className="bg-gray-200 font-bold">
              <td colSpan={2} className="border border-gray-300 px-4 py-2">
                Total (1+2+3+4+5)
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {(
                  Math.max(
                    0,
                    (watch("exempt_ei_gross_agri_receipts" as any) || 0) -
                    (watch("exempt_ei_agri_expenditure" as any) || 0) -
                    (watch("exempt_ei_unabsorbed_loss" as any) || 0) +
                    (watch("exempt_ei_agri_rule_portion" as any) || 0)
                  ) +
                  (watch("exempt_ei_other_1_amount" as any) || 0) +
                  (watch("exempt_ei_other_2_amount" as any) || 0) +
                  (watch("exempt_ei_dtaa_1_amount" as any) || 0) +
                  (watch("exempt_ei_dtaa_2_amount" as any) || 0) +
                  (watch("exempt_ei_dtaa_3_amount" as any) || 0)
                ).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> Please refer to the instructions for filling out this schedule. Items in Section 2 should only be filled if net agricultural income exceeds Rs. 5 lakh.
        </p>
      </div>
    </div>
  );
};
