import { useForm, UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface Itr7ScheduleSH2Props {
  form: UseFormReturn<any>;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function ScheduleSH2({
  form,
  onCancel,
  onSubmit,
}: Itr7ScheduleSH2Props) {
  const { watch, register } = form;

  // Section A: Details of shareholding at end of previous year
  const [previousYearRows, setPreviousYearRows] = useState(2);

  // Section B: Equity share application money pending allotment
  const [applicationMoneyRows, setApplicationMoneyRows] = useState(2);

  // Section C: Shareholders who ceased to be shareholders during previous year
  const [cessedShareholderRows, setCessedShareholderRows] = useState(2);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          Schedule SH-2 - Shareholding of Start-ups
        </h3>
        <p className="text-gray-600">
          Details of shareholding in start-up companies that have filed declaration in Form-2 under para 5 of DPIIT notification dated 19.02.2019
        </p>
      </div>

      {/* Section A: Details of shareholding at end of previous year */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section A: Details of shareholding as at the end of the previous year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Shareholder</th>
                <th className="border border-gray-300 px-2 py-2">Category of Shareholder</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Date of Allotment</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Held</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Issue Price per Share</th>
                <th className="border border-gray-300 px-2 py-2">Paid up Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Share Premium per Share</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: previousYearRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_shareholder_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh2_prev_category_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Non-resident">Non-resident</option>
                      <option value="Venture Capital">Venture Capital Company</option>
                      <option value="Venture Capital Fund">Venture Capital Fund</option>
                      <option value="Specified Company">Specified Company</option>
                      <option value="Other Person">Other Person</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_allotment_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_shares_held_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_issue_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_paid_up_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_prev_share_premium_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={11} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setPreviousYearRows(previousYearRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section B: Share application money pending allotment */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section B: Details of share application money pending allotment as at end of previous year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Applicant</th>
                <th className="border border-gray-300 px-2 py-2">Category of Applicant</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Date of Application</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Applied</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Proposed Issue Price per Share</th>
                <th className="border border-gray-300 px-2 py-2">Share Application Money</th>
                <th className="border border-gray-300 px-2 py-2">Share Application Premium</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: applicationMoneyRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_applicant_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh2_app_category_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Non-resident">Non-resident</option>
                      <option value="Venture Capital">Venture Capital Company</option>
                      <option value="Venture Capital Fund">Venture Capital Fund</option>
                      <option value="Specified Company">Specified Company</option>
                      <option value="Other Person">Other Person</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_application_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_shares_applied_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_proposed_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_money_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_app_premium_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={11} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setApplicationMoneyRows(applicationMoneyRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section C: Shareholders who ceased to be shareholders */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section C: Details of shareholder who is not a shareholder at end of previous year but was a shareholder at any time during the previous year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Shareholder</th>
                <th className="border border-gray-300 px-2 py-2">Category of Shareholder</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Date of Allotment</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Held</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Issue Price per Share</th>
                <th className="border border-gray-300 px-2 py-2">Paid up Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Date on which Ceased</th>
                <th className="border border-gray-300 px-2 py-2">Mode of Cessation</th>
                <th className="border border-gray-300 px-2 py-2">In case of Transfer, PAN of New Shareholder</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: cessedShareholderRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_shareholder_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh2_ceased_category_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Non-resident">Non-resident</option>
                      <option value="Venture Capital">Venture Capital Company</option>
                      <option value="Venture Capital Fund">Venture Capital Fund</option>
                      <option value="Specified Company">Specified Company</option>
                      <option value="Other Person">Other Person</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_allotment_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_shares_held_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_issue_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_paid_up_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_cessation_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh2_ceased_mode_of_cessation_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Redemption">Redemption</option>
                      <option value="Surrender">Surrender</option>
                      <option value="Death">Death</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh2_ceased_transfer_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={13} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCessedShareholderRows(cessedShareholderRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex gap-4 justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          ← Back
        </button>
        <button
          type="submit"
          onClick={() => onSubmit(form.getValues())}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
