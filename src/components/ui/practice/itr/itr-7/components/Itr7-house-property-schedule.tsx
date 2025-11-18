import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

const HousePropertySchedule: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedProperties, setExpandedProperties] = useState<string[]>([]);
  const [propertyCount, setPropertyCount] = useState(1);

  const toggleProperty = (propId: string) => {
    setExpandedProperties((prev) =>
      prev.includes(propId) ? prev.filter((p) => p !== propId) : [...prev, propId]
    );
  };

  const addProperty = () => {
    setPropertyCount((prev) => prev + 1);
    setExpandedProperties((prev) => [...prev, `property_${propertyCount}`]);
  };

  const renderPropertySection = (index: number) => {
    const propId = `property_${index}`;
    const prefix = `hp_property_${index}`;

    return (
      <div key={propId} className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleProperty(propId)}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedProperties.includes(propId) ? "▼" : "▶"} Property {index}
        </button>

        {expandedProperties.includes(propId) && (
          <div className="p-4 bg-white border-t border-blue-200 space-y-4">
            {/* Property Address */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address of property
                </label>
                <input
                  type="text"
                  {...register(`${prefix}_address` as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town/City
                </label>
                <input
                  type="text"
                  {...register(`${prefix}_city` as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  {...register(`${prefix}_state` as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  {...register(`${prefix}_country` as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code/Zip Code
                </label>
                <input
                  type="text"
                  {...register(`${prefix}_pincode` as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Ownership */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-50 p-3 rounded">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is the property co-owned?
                </label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register(`${prefix}_coowned` as any)}
                      value="yes"
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-600">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      {...register(`${prefix}_coowned` as any)}
                      value="no"
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-600">No</label>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assessees percentage of share in the property %
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_ownership_percentage` as any, { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Co-owners Details */}
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-700 mb-3">Co-owner(s) Details</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-2 py-2 text-left">Name of Co-owner</th>
                      <th className="border border-gray-300 px-2 py-2 text-left">PAN/Aadhaar No.</th>
                      <th className="border border-gray-300 px-2 py-2 text-center">% Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2].map((coOwnerIdx) => (
                      <tr key={coOwnerIdx} className={coOwnerIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            {...register(`${prefix}_coowner_${coOwnerIdx}_name` as any)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            {...register(`${prefix}_coowner_${coOwnerIdx}_pan` as any)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            step="0.01"
                            {...register(`${prefix}_coowner_${coOwnerIdx}_share` as any, { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-center"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Property Calculations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-blue-50 p-3 rounded border border-blue-200">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1a. Gross rent received or receivable or lettable value
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_gross_rent` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1b. The amount of rent which cannot be realised
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_rent_not_realised` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1c. Tax paid to local authorities
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_tax_local_authorities` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1d. Total (1b + 1c)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_total_deduction` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-blue-100 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1e. Annual value (1a - 1d)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_annual_value` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-blue-100 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1f. Annual value of the property owned (own %) (annual value x 1e)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_annual_value_owned` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-blue-100 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1g. 30% of 1f
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_thirty_percent` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1h. Interest payable on borrowed capital (Details are to be filled in the drop down)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_interest_borrowed` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1i. Deduction (1g - 1h)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_deduction` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-blue-100 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1j. Arrears/Unrealised rent received during the year less 30%
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_arrears_unrealised` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  1k. Income from house property 1 (1f - 1i+1j)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_income_property` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-green-100 font-semibold"
                />
              </div>
            </div>

            {/* Pass-through and Loss */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-purple-50 p-3 rounded border border-purple-200">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  2. Pass through loss/income if any *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_passthrough_loss` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  3. Income under the head "Income from house property" (2 - 1k + 2)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register(`${prefix}_total_income_property` as any, { valueAsNumber: true })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-purple-100 font-semibold"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
        Schedule HP: Details of Income from House Property
      </h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        (Please refer instructions. Drop down to be provided indicating ownership of property)
      </p>

      {/* Properties */}
      {Array.from({ length: propertyCount }).map((_, index) =>
        renderPropertySection(index + 1)
      )}

      {/* Add More Property Button */}
      <button
        onClick={addProperty}
        className="w-full bg-indigo-100 hover:bg-indigo-200 px-4 py-2 text-indigo-700 font-semibold rounded mb-6 transition"
      >
        + Add Another Property
      </button>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HousePropertySchedule;
