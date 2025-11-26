import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface Schedule10AAProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const Schedule10AA: React.FC<Schedule10AAProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register } = form;
  const [undertakings, setUndertakings] = useState<
    Array<{ id: number; label: string }>
  >([{ id: 1, label: "Undertaking No.1" }]);

  const addUndertaking = () => {
    const newId = Math.max(...undertakings.map((u) => u.id), 0) + 1;
    setUndertakings([
      ...undertakings,
      { id: newId, label: `Undertaking No.${newId}` },
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule 10AA</h2>
      <p className="text-gray-600 mb-6">
        Deduction under section 10AA - Special Economic Zone (SEZ)
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Claim deduction for
            eligible undertakings in Special Economic Zones. Enter assessment
            year and deduction amount for each undertaking.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold w-8">
                  S.
                </th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  Undertaking
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Assessment year in which unit begins to
                  manufacture/produce/provide services
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-32">
                  Amount of deduction
                </th>
              </tr>
            </thead>
            <tbody>
              {undertakings.map((undertaking, idx) => (
                <tr key={undertaking.id} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-2 text-center font-semibold">
                    {String.fromCharCode(96 + undertaking.id)}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    {undertaking.label}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      {...register(`sez_10aa_ay_${undertaking.id}` as any)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 2023-24"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      {...register(
                        `sez_10aa_deduction_${undertaking.id}` as any,
                        { valueAsNumber: true }
                      )}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 border-b border-gray-300">
                <td
                  colSpan={2}
                  className="border border-gray-300 p-2 font-semibold"
                >
                  Total deduction under section 10AA
                </td>
                <td colSpan={2} className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...register("sez_10aa_total" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="0"
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={addUndertaking}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          + Add Undertaking
        </button>

        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Schedule10AA;
