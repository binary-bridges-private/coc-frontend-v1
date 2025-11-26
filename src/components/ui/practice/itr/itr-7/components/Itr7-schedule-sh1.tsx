import { useForm, UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface Itr7ScheduleSH1Props {
  form: UseFormReturn<any>;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function ScheduleSH1({
  form,
  onCancel,
  onSubmit,
}: Itr7ScheduleSH1Props) {
  const { watch, register } = form;

  // Section A: Details of shareholding at end of previous year
  const [previousYearRows, setPreviousYearRows] = useState(2);

  // Section B: Equity share application money pending allotment
  const [applicationMoneyRows, setApplicationMoneyRows] = useState(2);

  // Section C: Share application details
  const [shareApplicationRows, setShareApplicationRows] = useState(2);

  // Section D: Shareholders who ceased to be shareholders during previous year
  const [cessedShareholderRows, setCessedShareholderRows] = useState(2);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          Schedule SH-1 - Shareholding of Unlisted Company
        </h3>
        <p className="text-gray-600">
          Details of shareholding in unlisted companies (other than companies registered under section 8 of Companies Act, 2013 or companies limited by guarantee)
        </p>
      </div>

      {/* Section A: Details of shareholding at end of previous year */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section A: Details of shareholding at end of previous year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Shareholder</th>
                <th className="border border-gray-300 px-2 py-2">Residential Status in India</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Date of Allotment</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Held</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Issue Price per Share</th>
                <th className="border border-gray-300 px-2 py-2">Amount Received</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: previousYearRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_shareholder_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh1_prev_residential_status_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Resident">Resident</option>
                      <option value="NRI">NRI</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_allotment_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_shares_held_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_issue_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_prev_amount_received_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={10} className="border border-gray-300 px-2 py-2 text-center">
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

      {/* Section B: Equity share application money pending allotment */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section B: Details of equity share application money pending allotment at end of previous year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Applicant</th>
                <th className="border border-gray-300 px-2 py-2">Residential Status in India</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Date of Application</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Applied</th>
                <th className="border border-gray-300 px-2 py-2">Application Money Received</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Proposed Issue Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: applicationMoneyRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_applicant_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh1_app_residential_status_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Resident">Resident</option>
                      <option value="NRI">NRI</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_application_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_shares_applied_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_money_received_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_app_proposed_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={10} className="border border-gray-300 px-2 py-2 text-center">
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

      {/* Section C: Share application details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section C: Details of new share application received during the year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Applicant</th>
                <th className="border border-gray-300 px-2 py-2">Residential Status in India</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Date of Application</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Applied</th>
                <th className="border border-gray-300 px-2 py-2">Application Money Received</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Proposed Issue Price</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: shareApplicationRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_applicant_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh1_share_residential_status_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Resident">Resident</option>
                      <option value="NRI">NRI</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_application_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_shares_applied_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_money_received_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_share_proposed_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={10} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShareApplicationRows(shareApplicationRows + 1)}
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

      {/* Section D: Shareholders who ceased to be shareholders */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section D: Details of shareholders who ceased to be shareholders during the previous year
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Shareholder</th>
                <th className="border border-gray-300 px-2 py-2">Residential Status in India</th>
                <th className="border border-gray-300 px-2 py-2">Type of Share</th>
                <th className="border border-gray-300 px-2 py-2">PAN/Aadhaar No.</th>
                <th className="border border-gray-300 px-2 py-2">Number of Shares Held</th>
                <th className="border border-gray-300 px-2 py-2">Face Value per Share</th>
                <th className="border border-gray-300 px-2 py-2">Issue Price per Share</th>
                <th className="border border-gray-300 px-2 py-2">Amount Received</th>
                <th className="border border-gray-300 px-2 py-2">Date of Allotment</th>
                <th className="border border-gray-300 px-2 py-2">Date on which Ceased</th>
                <th className="border border-gray-300 px-2 py-2">Mode of Cessation</th>
                <th className="border border-gray-300 px-2 py-2">Transfer to PAN of New Shareholder</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: cessedShareholderRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_shareholder_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh1_ceased_residential_status_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Resident">Resident</option>
                      <option value="NRI">NRI</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_share_type_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_pan_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_shares_held_${idx}` as any)}
                      type="number"
                      step="1"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_face_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_issue_price_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_amount_received_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_allotment_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`sh1_ceased_cessation_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`sh1_ceased_mode_of_cessation_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
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
                      {...register(`sh1_ceased_transfer_pan_${idx}` as any)}
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
