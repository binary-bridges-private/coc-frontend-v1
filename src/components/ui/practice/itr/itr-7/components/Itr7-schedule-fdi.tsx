import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleFDIProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleFDI: React.FC<ScheduleFDIProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule FDI</h2>
      <p className="text-gray-600 mb-6">
        Foreign Direct Investment and Global Transactions
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide information on
            foreign direct investments, cross-border transactions, and
            international business activities.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
            A. Foreign Direct Investment Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total FDI Received (in INR)
              </label>
              <input
                type="number"
                {...register("fdi_total_received" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                FDI Deployed in India (in INR)
              </label>
              <input
                type="number"
                {...register("fdi_deployed_india" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              FDI Source Countries (comma separated)
            </label>
            <textarea
              {...register("fdi_source_countries" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="e.g., USA, UK, Singapore"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
            B. International Transactions & Remittances
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Inward Remittances (in INR)
              </label>
              <input
                type="number"
                {...register("fdi_inward_remittances" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Outward Remittances (in INR)
              </label>
              <input
                type="number"
                {...register("fdi_outward_remittances" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              International Trade Partners (comma separated)
            </label>
            <textarea
              {...register("fdi_trade_partners" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="e.g., Germany, Japan, Australia"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
            C. Overseas Assets and Liabilities
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Foreign Assets (in INR)
              </label>
              <input
                type="number"
                {...register("fdi_foreign_assets" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total Foreign Liabilities (in INR)
              </label>
              <input
                type="number"
                {...register("fdi_foreign_liabilities" as any, {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Countries of Overseas Assets/Liabilities
            </label>
            <textarea
              {...register("fdi_overseas_locations" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="e.g., USA, Dubai, Singapore"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
            D. Permanent Establishment & Related Party Details
          </h3>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Whether entity has Permanent Establishment (PE) abroad
            </label>
            <select
              {...register("fdi_has_pe" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Related Party Transactions Details
            </label>
            <textarea
              {...register("fdi_related_party_details" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter details of related party transactions, arm's length principle, transfer pricing study filed, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transfer Pricing Study Filed
            </label>
            <select
              {...register("fdi_tp_study_filed" as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

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

export default ScheduleFDI;
