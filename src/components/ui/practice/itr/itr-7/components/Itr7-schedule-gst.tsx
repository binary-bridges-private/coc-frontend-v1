import React from 'react';
import { useForm, useFieldArray, Control, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from "lucide-react";
import { ITR7ScheduleGSTData } from './itr-7-schedule-gst.types';

interface Itr7ScheduleGSTProps {
  form: UseFormReturn<ITR7ScheduleGSTData>;
}

const Itr7ScheduleGST: React.FC<Itr7ScheduleGSTProps> = ({ form }) => {
  const { control, register } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "scheduleGST.details",
  });

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">SCHEDULE GST</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          INFORMATION REGARDING TURNOVER/GROSS RECEIPT REPORTED FOR GST
        </span>
      </div>

      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-[50px]">Sl. No.</th>
              <th className="border p-2">GSTIN No(s).</th>
              <th className="border p-2">Annual value of outward supplies as per the GST return(s) filed</th>
              <th className="border p-2 w-[50px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">
                  <input
                    {...register(`scheduleGST.details.${index}.gstin`)}
                    className="w-full p-1 border rounded uppercase"
                    maxLength={15}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    {...register(`scheduleGST.details.${index}.annual_value_outward_supplies`)}
                    className="w-full p-1 border rounded text-right"
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
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
          onClick={() => append({ gstin: '', annual_value_outward_supplies: 0 })}
          className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Row
        </button>
      </div>
      <div className="text-sm text-gray-600">
        NOTE: Please furnish the information above for each GSTIN No. separately
      </div>
    </div>
  );
};

export default Itr7ScheduleGST;
