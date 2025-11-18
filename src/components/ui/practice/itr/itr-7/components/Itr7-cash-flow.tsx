import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

const CashFlowStatement: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "operating",
    "investing",
    "financing",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Watch all cash flow fields
  const operatingActivities = watch([
    "cf_net_profit_loss",
    "cf_depreciation",
    "cf_amortization",
    "cf_impairment_loss",
    "cf_finance_costs",
    "cf_foreign_exchange_loss",
    "cf_profit_loss_on_assets",
  ]);

  const operatingTotal =
    (watch("cf_net_profit_loss") || 0) +
    (watch("cf_depreciation") || 0) +
    (watch("cf_amortization") || 0) +
    (watch("cf_impairment_loss") || 0) +
    (watch("cf_finance_costs") || 0) +
    (watch("cf_foreign_exchange_loss") || 0) +
    (watch("cf_profit_loss_on_assets") || 0);

  const workingCapitalAdjustments = watch([
    "cf_trade_receivables_decrease",
    "cf_inventories_decrease",
    "cf_trade_payables_increase",
    "cf_other_payables_increase",
    "cf_current_assets_decrease",
    "cf_current_liabilities_increase",
  ]);

  const adjustmentsTotal =
    (watch("cf_trade_receivables_decrease") || 0) +
    (watch("cf_inventories_decrease") || 0) +
    (watch("cf_trade_payables_increase") || 0) +
    (watch("cf_other_payables_increase") || 0) +
    (watch("cf_current_assets_decrease") || 0) +
    (watch("cf_current_liabilities_increase") || 0);

  const cashFromOperations = operatingTotal + adjustmentsTotal;

  const investingActivities = watch([
    "cf_capital_work_purchase",
    "cf_capital_work_sale",
    "cf_investments_purchase",
    "cf_investments_sale",
    "cf_loans_advance_given",
    "cf_loans_advance_received",
  ]);

  const cashFromInvesting =
    (watch("cf_capital_work_purchase") || 0) +
    (watch("cf_capital_work_sale") || 0) +
    (watch("cf_investments_purchase") || 0) +
    (watch("cf_investments_sale") || 0) +
    (watch("cf_loans_advance_given") || 0) +
    (watch("cf_loans_advance_received") || 0);

  const financingActivities = watch([
    "cf_equity_share_issued",
    "cf_borrowings_taken",
    "cf_borrowings_repaid",
    "cf_dividend_paid",
    "cf_interest_paid",
  ]);

  const cashFromFinancing =
    (watch("cf_equity_share_issued") || 0) +
    (watch("cf_borrowings_taken") || 0) +
    (watch("cf_borrowings_repaid") || 0) +
    (watch("cf_dividend_paid") || 0) +
    (watch("cf_interest_paid") || 0);

  const netChangeInCash = cashFromOperations + cashFromInvesting + cashFromFinancing;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Cash Flow Statement
      </h2>

      {/* Operating Activities */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("operating")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("operating") ? "▼" : "▶"} A. Cash Flow from Operating Activities
        </button>

        {expandedSections.includes("operating") && (
          <div className="p-4 bg-white border-t border-purple-200">
            {/* Profit/Loss Adjustment */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">1. Net Profit/Loss</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Net Profit/(Loss) for the period
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_net_profit_loss", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_net_profit_loss ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_net_profit_loss && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_net_profit_loss.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Non-Cash Items */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">2. Adjustments for non-cash items:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Depreciation
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_depreciation", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_depreciation ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_depreciation && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_depreciation.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amortization
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_amortization", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_amortization ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_amortization && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_amortization.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impairment Loss
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_impairment_loss", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_impairment_loss ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_impairment_loss && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_impairment_loss.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Finance Costs
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_finance_costs", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_finance_costs ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_finance_costs && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_finance_costs.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Exchange Loss/(Gain)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_foreign_exchange_loss", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_foreign_exchange_loss ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_foreign_exchange_loss && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_foreign_exchange_loss.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profit/(Loss) on sale of assets
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_profit_loss_on_assets", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_profit_loss_on_assets ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cf_profit_loss_on_assets && (
                    <p className="text-red-500 text-xs mt-1">{errors.cf_profit_loss_on_assets.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Operating Profit Before Working Capital Changes */}
            <div className="bg-purple-100 p-3 rounded mb-4">
              <p className="font-semibold text-sm text-purple-700">
                Operating profit before working capital changes:{" "}
                <span className="text-lg">{operatingTotal.toFixed(2)}</span>
              </p>
            </div>

            {/* Working Capital Changes */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-3">3. Working capital changes:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (Decrease)/Increase in Trade Receivables
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_trade_receivables_decrease", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_trade_receivables_decrease ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (Decrease)/Increase in Inventories
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_inventories_decrease", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_inventories_decrease ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Increase/(Decrease) in Trade Payables
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_trade_payables_increase", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_trade_payables_increase ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Increase/(Decrease) in Other Payables
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_other_payables_increase", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_other_payables_increase ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    (Decrease)/Increase in Current Assets
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_current_assets_decrease", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_current_assets_decrease ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Increase/(Decrease) in Current Liabilities
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("cf_current_liabilities_increase", { valueAsNumber: true })}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.cf_current_liabilities_increase ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Cash from Operating */}
            <div className="bg-green-100 p-3 rounded mb-4">
              <p className="font-semibold text-sm text-green-700">
                Cash generated from/(used in) operating activities:{" "}
                <span className="text-lg">{cashFromOperations.toFixed(2)}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Investing Activities */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("investing")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("investing") ? "▼" : "▶"} B. Cash Flow from Investing Activities
        </button>

        {expandedSections.includes("investing") && (
          <div className="p-4 bg-white border-t border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase of Capital Works in Progress
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_capital_work_purchase", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_capital_work_purchase ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale of Capital Works in Progress
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_capital_work_sale", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_capital_work_sale ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase of Investments
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_investments_purchase", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_investments_purchase ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale of Investments
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_investments_sale", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_investments_sale ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loans and Advances Given
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_loans_advance_given", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_loans_advance_given ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loans and Advances Received
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_loans_advance_received", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_loans_advance_received ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Cash from Investing */}
            <div className="bg-blue-100 p-3 rounded mt-4">
              <p className="font-semibold text-sm text-blue-700">
                Cash used in investing activities:{" "}
                <span className="text-lg">{cashFromInvesting.toFixed(2)}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Financing Activities */}
      <div className="mb-6 border-l-4 border-orange-500">
        <button
          onClick={() => toggleSection("financing")}
          className="w-full bg-orange-50 hover:bg-orange-100 px-4 py-3 font-semibold text-left text-orange-700 rounded transition"
        >
          {expandedSections.includes("financing") ? "▼" : "▶"} C. Cash Flow from Financing Activities
        </button>

        {expandedSections.includes("financing") && (
          <div className="p-4 bg-white border-t border-orange-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proceeds from Issue of Equity Shares
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_equity_share_issued", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_equity_share_issued ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Borrowings - Taken
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_borrowings_taken", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_borrowings_taken ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Borrowings - Repaid
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_borrowings_repaid", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_borrowings_repaid ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dividend Paid
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_dividend_paid", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_dividend_paid ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Paid
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("cf_interest_paid", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.cf_interest_paid ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            {/* Cash from Financing */}
            <div className="bg-orange-100 p-3 rounded mt-4">
              <p className="font-semibold text-sm text-orange-700">
                Cash from/(used in) financing activities:{" "}
                <span className="text-lg">{cashFromFinancing.toFixed(2)}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Net Change in Cash */}
      <div className="bg-red-100 p-4 rounded mb-6 border-l-4 border-red-500">
        <p className="font-bold text-lg text-red-700">
          Net increase/(decrease) in cash and cash equivalents:{" "}
          <span className="text-xl">{netChangeInCash.toFixed(2)}</span>
        </p>
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

export default CashFlowStatement;
