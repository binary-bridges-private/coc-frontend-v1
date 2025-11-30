import React from 'react';
import { useForm, useFieldArray, Control, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from "lucide-react";
import { ITR7ScheduleSH2Data } from './itr-7-schedule-sh2.types';

interface Itr7ScheduleSH2Props {
  form: UseFormReturn<ITR7ScheduleSH2Data>;
}

const Itr7ScheduleSH2: React.FC<Itr7ScheduleSH2Props> = ({ form }) => {
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
        <h1 className="text-xl font-bold">SCHEDULE SH-2</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          SHAREHOLDING OF START-UPS
        </span>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        If you are a start-up which has filed declaration in Form-2 under para 5 of DPIIT notification dated 19.02.2019, please furnish the following details of shareholding;-
      </div>

      {/* Table 1: Details of shareholding as at the end of the previous year */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">Details of shareholding as at the end of the previous year</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-[50px]">No.</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Name of the shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Category of shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Type of share</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">PAN / Aadhaar No.</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date of allotment</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Number of shares held</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Face value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Issue Price per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Paid up value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Share premium</th>
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
                    {...register(`shareholders.${index}.category`)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="non-resident">Non-resident</option>
                    <option value="venture-capital-company">Venture Capital Company</option>
                    <option value="venture-capital-fund">Venture Capital Fund</option>
                    <option value="specified-company">Specified Company</option>
                    <option value="any-other-person">Any other person</option>
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
                    {...register(`shareholders.${index}.paid_up_value`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`shareholders.${index}.share_premium`)}
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
            category: '',
            type_of_share: '',
            pan_aadhaar: '',
            date_of_allotment: '',
            number_of_shares: 0,
            face_value: 0,
            issue_price: 0,
            paid_up_value: 0,
            share_premium: 0
          })}
          className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Add Shareholder
        </button>
      </div>

      {/* Table 2: Details of share application money pending allotment */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">Details of share application money pending allotment as at the end of the previous year</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-[50px]">No.</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Name of the applicant</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Category of applicant</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Type of share</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">PAN / Aadhaar No.</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date of application</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Number of shares applied for</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Face value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Proposed issue price</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Share application money</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Share premium</th>
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
                    {...register(`application_money.${index}.category`)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="non-resident">Non-resident</option>
                    <option value="venture-capital-company">Venture Capital Company</option>
                    <option value="venture-capital-fund">Venture Capital Fund</option>
                    <option value="specified-company">Specified Company</option>
                    <option value="any-other-person">Any other person</option>
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
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`application_money.${index}.share_application_money`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register(`application_money.${index}.share_premium`)}
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
            category: '',
            type_of_share: '',
            pan_aadhaar: '',
            date_of_application: '',
            number_of_shares_applied: 0,
            face_value: 0,
            proposed_issue_price: 0,
            share_application_money: 0,
            share_premium: 0
          })}
          className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
        >
          <Plus className="h-4 w-4" /> Add Applicant
        </button>
      </div>

      {/* Table 3: Details of shareholder who is not a shareholder at the end of the previous year */}
      <div className="mb-8 overflow-x-auto">
        <h3 className="font-semibold mb-2">Details of shareholder who is not a shareholder at the end of the previous year but was a shareholder at any time during the previous year</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 w-[50px]">No.</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Name of the shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[150px]">Category of shareholder</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Type of share</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">PAN / Aadhaar No.</th>
              <th className="border border-gray-300 p-2 min-w-[120px]">Date of allotment</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Number of shares held</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Face value per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Issue Price per share</th>
              <th className="border border-gray-300 p-2 min-w-[100px]">Paid up value per share</th>
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
                    {...register(`ceased_shareholders.${index}.category`)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="non-resident">Non-resident</option>
                    <option value="venture-capital-company">Venture Capital Company</option>
                    <option value="venture-capital-fund">Venture Capital Fund</option>
                    <option value="specified-company">Specified Company</option>
                    <option value="any-other-person">Any other person</option>
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
                    type="date"
                    {...register(`ceased_shareholders.${index}.date_of_allotment`)}
                    className="w-full p-1 border rounded"
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
                    {...register(`ceased_shareholders.${index}.paid_up_value`)}
                    className="w-full p-1 border rounded text-right"
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
            category: '',
            type_of_share: '',
            pan_aadhaar: '',
            date_of_allotment: '',
            number_of_shares: 0,
            face_value: 0,
            issue_price: 0,
            paid_up_value: 0,
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

export default Itr7ScheduleSH2;
