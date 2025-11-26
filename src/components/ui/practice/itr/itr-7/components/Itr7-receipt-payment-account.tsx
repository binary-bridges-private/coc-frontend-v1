import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types.ts";

const ReceiptPaymentAccount: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "opening",
    "receipts",
    "payments",
    "closing",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Calculate totals
  const cashInHand = watch("rpa_opening_cash") || 0;
  const bankBalance = watch("rpa_opening_bank") || 0;
  const totalOpeningBalance = cashInHand + bankBalance;

  const interest = watch("rpa_receipt_interest") || 0;
  const dividend = watch("rpa_receipt_dividend") || 0;
  const saleAssets = watch("rpa_receipt_sale_assets_total") || 0;
  const realizedDebtors = watch("rpa_receipt_realization_debtors") || 0;
  const othersReceipts = watch("rpa_receipt_others_total") || 0;
  const totalReceipts = interest + dividend + saleAssets + realizedDebtors + othersReceipts;

  const totalOpeningAndReceipts = totalOpeningBalance + totalReceipts;

  const repaymentSecured = watch("rpa_payment_repayment_secured") || 0;
  const repaymentUnsecured = watch("rpa_payment_repayment_unsecured") || 0;
  const repaymentCreditors = watch("rpa_payment_repayment_creditors") || 0;
  const commission = watch("rpa_payment_commission") || 0;
  const othersPayments = watch("rpa_payment_others_total") || 0;
  const totalPayments = repaymentSecured + repaymentUnsecured + repaymentCreditors + commission + othersPayments;

  const closingCash = watch("rpa_closing_cash") || 0;
  const closingBank = watch("rpa_closing_bank") || 0;
  const totalClosingBalance = closingCash + closingBank;

  const totalPaymentsAndClosing = totalPayments + totalClosingBalance;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
        Part A-OL: Receipt and Payment Account
      </h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Company under liquidation
      </p>

      {/* Opening Balance */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("opening")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("opening") ? "▼" : "▶"} 1. Opening Balance
        </button>

        {expandedSections.includes("opening") && (
          <div className="p-4 bg-white border-t border-blue-200 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  i. Cash in hand
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_opening_cash", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ii. Bank
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_opening_bank", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-800">
                iii. Total opening balance: ₹ {totalOpeningBalance.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Receipts */}
      <div className="mb-6 border-l-4 border-green-500">
        <button
          onClick={() => toggleSection("receipts")}
          className="w-full bg-green-50 hover:bg-green-100 px-4 py-3 font-semibold text-left text-green-700 rounded transition"
        >
          {expandedSections.includes("receipts") ? "▼" : "▶"} 2. Receipts
        </button>

        {expandedSections.includes("receipts") && (
          <div className="p-4 bg-white border-t border-green-200 space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  i. Interest
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_receipt_interest", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ii. Dividend
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_receipt_dividend", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">iii. Sale of assets (pls specify nature and amount)</h4>
                <div className="space-y-2 ml-2">
                  {[
                    { field: "rpa_receipt_sale_assets_a", label: "a" },
                    { field: "rpa_receipt_sale_assets_b", label: "b" },
                    { field: "rpa_receipt_sale_assets_c", label: "c" },
                  ].map((item) => (
                    <input
                      key={item.field}
                      type="number"
                      step="0.01"
                      {...register(item.field as any, { valueAsNumber: true })}
                      placeholder={`Sale asset ${item.label}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  ))}
                </div>
                <div className="mt-2 bg-green-50 p-2 rounded">
                  <input
                    type="number"
                    step="0.01"
                    {...register("rpa_receipt_sale_assets_total", { valueAsNumber: true })}
                    placeholder="Total (iii a + iii b + iii c)"
                    className="w-full px-3 py-2 border border-green-300 rounded bg-white text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  iv. Realization of debtors
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_receipt_realization_debtors", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">v. Others (pls specify whether revenue/capital, nature and amount)</h4>
                <div className="space-y-2 ml-2">
                  {[
                    { field: "rpa_receipt_others_a", label: "a" },
                    { field: "rpa_receipt_others_b", label: "b" },
                  ].map((item) => (
                    <input
                      key={item.field}
                      type="number"
                      step="0.01"
                      {...register(item.field as any, { valueAsNumber: true })}
                      placeholder={`Other receipt ${item.label}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  ))}
                </div>
                <div className="mt-2 bg-green-50 p-2 rounded">
                  <input
                    type="number"
                    step="0.01"
                    {...register("rpa_receipt_others_total", { valueAsNumber: true })}
                    placeholder="Total of other receipts (v a + v b)"
                    className="w-full px-3 py-2 border border-green-300 rounded bg-white text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-800">
                vi. Total receipts (2i + 2ii + 2iii + 2iv + 2v): ₹ {totalReceipts.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Total Opening Balance and Receipts */}
      <div className="mb-6 bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
        <p className="text-base font-semibold text-indigo-800">
          3. Total of opening balance and receipts (1iii + 2vi): ₹ {totalOpeningAndReceipts.toFixed(2)}
        </p>
      </div>

      {/* Payments */}
      <div className="mb-6 border-l-4 border-red-500">
        <button
          onClick={() => toggleSection("payments")}
          className="w-full bg-red-50 hover:bg-red-100 px-4 py-3 font-semibold text-left text-red-700 rounded transition"
        >
          {expandedSections.includes("payments") ? "▼" : "▶"} 4. Payments
        </button>

        {expandedSections.includes("payments") && (
          <div className="p-4 bg-white border-t border-red-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                i. Repayment of secured loan
              </label>
              <input
                type="number"
                step="0.01"
                {...register("rpa_payment_repayment_secured", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ii. Repayment of unsecured loan
              </label>
              <input
                type="number"
                step="0.01"
                {...register("rpa_payment_repayment_unsecured", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                iii. Repayment to creditors
              </label>
              <input
                type="number"
                step="0.01"
                {...register("rpa_payment_repayment_creditors", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                iv. Commission
              </label>
              <input
                type="number"
                step="0.01"
                {...register("rpa_payment_commission", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">v. Others (pls specify)</h4>
              <div className="space-y-2 ml-2">
                {[
                  { field: "rpa_payment_others_a", label: "a" },
                  { field: "rpa_payment_others_b", label: "b" },
                ].map((item) => (
                  <input
                    key={item.field}
                    type="number"
                    step="0.01"
                    {...register(item.field as any, { valueAsNumber: true })}
                    placeholder={`Other payment ${item.label}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                ))}
              </div>
              <div className="mt-2 bg-red-50 p-2 rounded">
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_payment_others_total", { valueAsNumber: true })}
                  placeholder="Total of other payments (4v a + 4v b)"
                  className="w-full px-3 py-2 border border-red-300 rounded bg-white text-sm font-semibold"
                />
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded border border-red-200">
              <p className="text-sm font-semibold text-red-800">
                vi. Total payments (4i + 4ii + 4iii + 4iv + 4v): ₹ {totalPayments.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Closing Balance */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("closing")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("closing") ? "▼" : "▶"} 5. Closing Balance
        </button>

        {expandedSections.includes("closing") && (
          <div className="p-4 bg-white border-t border-purple-200 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  i. Cash in hand
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_closing_cash", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ii. Bank
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("rpa_closing_bank", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200">
              <p className="text-sm font-semibold text-purple-800">
                iii. Total closing balance (5i + 5ii): ₹ {totalClosingBalance.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Final Total */}
      <div className="mb-6 bg-indigo-100 border-l-4 border-indigo-600 p-4 rounded">
        <p className="text-base font-bold text-indigo-900">
          6. Total of closing balance and payments (4vi + 5iii): ₹ {totalPaymentsAndClosing.toFixed(2)}
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

export default ReceiptPaymentAccount;
