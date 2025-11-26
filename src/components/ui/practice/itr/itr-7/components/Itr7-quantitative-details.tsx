import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types.ts";

const QuantitativeDetails: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "trading",
    "manufacturing",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
        Part A-QD: Quantitative Details
      </h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Mandatory if liable for audit under section 44AB
      </p>

      {/* Trading Concern */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("trading")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("trading") ? "▼" : "▶"} (a) In the case of a trading concern
        </button>

        {expandedSections.includes("trading") && (
          <div className="p-4 bg-white border-t border-blue-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Quantity</th>
                    <th className="border border-gray-300 px-3 py-2 text-center">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Opening stock", field: "qd_trading_opening_stock" },
                    { label: "Purchase during the previous year", field: "qd_trading_purchase" },
                    { label: "Sales during the previous year", field: "qd_trading_sales" },
                    { label: "Closing stock", field: "qd_trading_closing_stock" },
                    { label: "Shortage/ excess, if any", field: "qd_trading_shortage_excess" },
                  ].map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-3 py-2">{item.label}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="number"
                          step="0.01"
                          {...register(item.field as any, { valueAsNumber: true })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          {...register(`${item.field}_unit` as any)}
                          placeholder="Qty/MT/etc"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Manufacturing Concern */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("manufacturing")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("manufacturing") ? "▼" : "▶"} (b) In the case of a manufacturing concern
        </button>

        {expandedSections.includes("manufacturing") && (
          <div className="p-4 bg-white border-t border-purple-200 space-y-6">
            {/* Raw Materials */}
            <div>
              <h4 className="font-semibold text-purple-700 mb-3">Raw Materials</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Value</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Opening stock", field: "qd_mfg_raw_opening" },
                      { label: "Purchase during the previous year", field: "qd_mfg_raw_purchase" },
                      { label: "Consumption during the previous year", field: "qd_mfg_raw_consumption" },
                      { label: "Closing stock", field: "qd_mfg_raw_closing" },
                      { label: "Shortage/ excess, if any", field: "qd_mfg_raw_shortage" },
                    ].map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-3 py-2">{item.label}</td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="number"
                            step="0.01"
                            {...register(item.field as any, { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="text"
                            {...register(`${item.field}_unit` as any)}
                            placeholder="Qty/MT/etc"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Finished Products */}
            <div>
              <h4 className="font-semibold text-purple-700 mb-3">Finished Products</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Quantity</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Opening stock", field: "qd_mfg_fp_opening" },
                      { label: "Quantity manufactured during the previous year", field: "qd_mfg_fp_manufactured" },
                      { label: "Sales during the previous year", field: "qd_mfg_fp_sales" },
                      { label: "Closing stock", field: "qd_mfg_fp_closing" },
                      { label: "Shortage/ excess, if any", field: "qd_mfg_fp_shortage" },
                    ].map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-3 py-2">{item.label}</td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="number"
                            step="0.01"
                            {...register(item.field as any, { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="text"
                            {...register(`${item.field}_unit` as any)}
                            placeholder="Qty/MT/etc"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* By-products */}
            <div>
              <h4 className="font-semibold text-purple-700 mb-3">Finished Products' By-products</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Item</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Quantity</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Opening stock", field: "qd_mfg_byp_opening" },
                      { label: "Purchase during the previous year", field: "qd_mfg_byp_purchase" },
                      { label: "Quantity manufactured during the previous year", field: "qd_mfg_byp_manufactured" },
                      { label: "Sales during the previous year", field: "qd_mfg_byp_sales" },
                      { label: "Closing stock", field: "qd_mfg_byp_closing" },
                      { label: "Shortage/ excess, if any", field: "qd_mfg_byp_shortage" },
                    ].map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-3 py-2">{item.label}</td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="number"
                            step="0.01"
                            {...register(item.field as any, { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="text"
                            {...register(`${item.field}_unit` as any)}
                            placeholder="Qty/MT/etc"
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

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

export default QuantitativeDetails;
