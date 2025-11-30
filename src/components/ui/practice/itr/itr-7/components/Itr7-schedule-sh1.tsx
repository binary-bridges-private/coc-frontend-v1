import React from 'react';
import { useForm, useFieldArray, Control, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from "lucide-react";
import { ITR7ScheduleSH1Data } from './itr-7-schedule-sh1.types';

interface Itr7ScheduleSH1Props {
  form: UseFormReturn<ITR7ScheduleSH1Data>;
}

const Itr7ScheduleSH1: React.FC<Itr7ScheduleSH1Props> = ({ form }) => {
  const { control, register } = form;

  const {
    fields: shareholderFields,
    append: appendShareholder,
    remove: removeShareholder,
  } = useFieldArray({
    control,
    name: "shareholders",
  });

  const {
    fields: appMoneyFields,
    append: appendAppMoney,
    remove: removeAppMoney,
  } = useFieldArray({
    control,
    name: "application_money",
  });

  const {
    fields: ceasedFields,
    append: appendCeased,
    remove: removeCeased,
  } = useFieldArray({
    control,
    name: "ceased_shareholders",
  });

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">SCHEDULE SH-1</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          SHAREHOLDING OF UNLISTED COMPANY
        </span>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        (other than a company that is registered under section 8 of the Companies Act, 2013 (or section 25 of the Companies Act, 1956) or a company limited by guarantee under section 3(2) of Companies Act, 2013 or a start-up for which Schedule SH-2 is to be filled up)
      </div>

      <div className="mb-4 font-medium">
        If you are an unlisted company, please furnish the following details;-
      </div>

      {/* Table 1: Details of shareholding at the end of the previous year */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">Details of shareholding at the end of the previous year</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-[50px]">No.</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Name of the shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Residential status in India</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Type of share</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">PAN / Aadhaar No.</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date of allotment</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Number of shares held</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Face value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Issue Price per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Amount received</th>
              <th className="border border-gray-300 p-2 w-[50px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {shareholderFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`shareholders.${index}.name`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    {...register(`shareholders.${index}.residential_status`)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="Resident">Resident</option>
                    <option value="Non-Resident">Non-Resident</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`shareholders.${index}.type_of_share`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`shareholders.${index}.pan_aadhaar`)}
                    className="w-full p-1 border rounded uppercase"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="date"
                    {...register(`shareholders.${index}.date_of_allotment`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`shareholders.${index}.number_of_shares`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`shareholders.${index}.face_value`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`shareholders.${index}.issue_price`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`shareholders.${index}.amount_received`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeShareholder(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => appendShareholder({
            name: '',
            residential_status: '',
            type_of_share: '',
            pan_aadhaar: '',
            date_of_allotment: '',
            number_of_shares: 0,
            face_value: 0,
            issue_price: 0,
            amount_received: 0
          })}
          className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Add Shareholder
        </button>
      </div>

      {/* Table 2: Details of equity share application money pending allotment */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">Details of equity share application money pending allotment at the end of the previous year</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-[50px]">No.</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Name of the applicant</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Residential status in India</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Type of share</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">PAN / Aadhaar No.</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date of application</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Number of shares applied for</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Application money received</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Face value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Proposed issue price</th>
              <th className="border border-gray-300 p-2 w-[50px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {appMoneyFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`application_money.${index}.name`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    {...register(`application_money.${index}.residential_status`)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="Resident">Resident</option>
                    <option value="Non-Resident">Non-Resident</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`application_money.${index}.type_of_share`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`application_money.${index}.pan_aadhaar`)}
                    className="w-full p-1 border rounded uppercase"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="date"
                    {...register(`application_money.${index}.date_of_application`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`application_money.${index}.number_of_shares_applied`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`application_money.${index}.application_money_received`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`application_money.${index}.face_value`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`application_money.${index}.proposed_issue_price`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeAppMoney(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => appendAppMoney({
            name: '',
            residential_status: '',
            type_of_share: '',
            pan_aadhaar: '',
            date_of_application: '',
            number_of_shares_applied: 0,
            application_money_received: 0,
            face_value: 0,
            proposed_issue_price: 0
          })}
          className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Add Applicant
        </button>
      </div>

      {/* Table 3: Details of shareholders who is not a shareholder at the end of the previous year */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">Details of shareholders who is not a shareholder at the end of the previous year but was a shareholder at any time during the previous year</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-[50px]">No.</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Name of the shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Residential status in India</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Type of share</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">PAN / Aadhaar No.</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Number of shares held</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Face value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Issue Price per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Amount received</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date of allotment</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date on which ceased to be shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Mode of cessation</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">In case of transfer, PAN of the new shareholder</th>
              <th className="border border-gray-300 p-2 w-[50px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {ceasedFields.map((field, index) => (
              <tr key={field.id}>
                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`ceased_shareholders.${index}.name`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    {...register(`ceased_shareholders.${index}.residential_status`)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="Resident">Resident</option>
                    <option value="Non-Resident">Non-Resident</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`ceased_shareholders.${index}.type_of_share`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`ceased_shareholders.${index}.pan_aadhaar`)}
                    className="w-full p-1 border rounded uppercase"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`ceased_shareholders.${index}.number_of_shares`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`ceased_shareholders.${index}.face_value`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`ceased_shareholders.${index}.issue_price`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`ceased_shareholders.${index}.amount_received`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="date"
                    {...register(`ceased_shareholders.${index}.date_of_allotment`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="date"
                    {...register(`ceased_shareholders.${index}.date_cessation`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`ceased_shareholders.${index}.mode_cessation`)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    {...register(`ceased_shareholders.${index}.pan_new_shareholder`)}
                    className="w-full p-1 border rounded uppercase"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    type="button"
                    onClick={() => removeCeased(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => appendCeased({
            name: '',
            residential_status: '',
            type_of_share: '',
            pan_aadhaar: '',
            number_of_shares: 0,
            face_value: 0,
            issue_price: 0,
            amount_received: 0,
            date_of_allotment: '',
            date_cessation: '',
            mode_cessation: '',
            pan_new_shareholder: ''
          })}
          className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Add Ceased Shareholder
        </button>
      </div>
    </div>
  );
};

export default Itr7ScheduleSH1;
