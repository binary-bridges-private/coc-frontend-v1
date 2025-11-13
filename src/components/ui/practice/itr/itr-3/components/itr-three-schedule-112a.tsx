import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ===== SCHEDULE 112A - EQUITY SHARES WITH STT =====
export interface EquityTransaction {
  sNo?: string;
  acquisitionDate?: string;
  transferDate?: string;
  isinCode?: string;
  shareName?: string;
  noOfUnits?: string;
  salePricePerUnit?: string;
  totalSaleValue?: string;
  costOfAcquisition?: string;
  indexationBenefit?: string;
  costOfExpenditure?: string;
  ltcgAssetDate?: string;
  fairMarketValuePerShare?: string;
  totalDeduction?: string;
  balanceToSchedule?: string;
}

export interface Schedule112AFormData {
  equityTransactions?: EquityTransaction[];
  totalBeforeSaleValue?: string;
  totalBeforeCostAcq?: string;
  totalBeforeIndexation?: string;
  totalBeforeExpenses?: string;
  totalBeforeDeduction?: string;
  totalBeforeBalance?: string;

  totalAfterSaleValue?: string;
  totalAfterCostAcq?: string;
  totalAfterIndexation?: string;
  totalAfterExpenses?: string;
  totalAfterDeduction?: string;
  totalAfterBalance?: string;

  totalCombinedBalance?: string;
  remarksNotes?: string;
}

const schedule112ASchema = z.object({
  equityTransactions: z.array(z.object({
    sNo: z.string().optional(),
    acquisitionDate: z.string().optional(),
    transferDate: z.string().optional(),
    isinCode: z.string().optional(),
    shareName: z.string().optional(),
    noOfUnits: z.string().optional(),
    salePricePerUnit: z.string().optional(),
    totalSaleValue: z.string().optional(),
    costOfAcquisition: z.string().optional(),
    indexationBenefit: z.string().optional(),
    costOfExpenditure: z.string().optional(),
    ltcgAssetDate: z.string().optional(),
    fairMarketValuePerShare: z.string().optional(),
    totalDeduction: z.string().optional(),
    balanceToSchedule: z.string().optional(),
  })).optional(),

  totalBeforeSaleValue: z.string().optional(),
  totalBeforeCostAcq: z.string().optional(),
  totalBeforeIndexation: z.string().optional(),
  totalBeforeExpenses: z.string().optional(),
  totalBeforeDeduction: z.string().optional(),
  totalBeforeBalance: z.string().optional(),

  totalAfterSaleValue: z.string().optional(),
  totalAfterCostAcq: z.string().optional(),
  totalAfterIndexation: z.string().optional(),
  totalAfterExpenses: z.string().optional(),
  totalAfterDeduction: z.string().optional(),
  totalAfterBalance: z.string().optional(),

  totalCombinedBalance: z.string().optional(),
  remarksNotes: z.string().optional(),
}).superRefine((data, ctx) => {
  console.log("Schedule 112A - Equity Shares with STT Data", data);
});

interface Schedule112AProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: Schedule112AFormData) => void;
  initialData?: Schedule112AFormData;
}

const ItrThreeSchedule112A: React.FC<Schedule112AProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const [transactions, setTransactions] = useState<EquityTransaction[]>(
    initialData?.equityTransactions || [{}]
  );

  const { watch, handleSubmit, formState: { errors }, register } = useForm<Schedule112AFormData>({
    resolver: zodResolver(schedule112ASchema),
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const formData = watch();

  const addRow = () => {
    setTransactions([...transactions, {}]);
  };

  const removeRow = (index: number) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof EquityTransaction, value: string) => {
    const updated = [...transactions];
    updated[index][field] = value;
    setTransactions(updated);
  };

  // Separate before/after 23 July 2024
  const isTransferBefore23July = (dateStr?: string): boolean => {
    if (!dateStr) return false;
    const transferDate = new Date(dateStr);
    const threshold = new Date("2024-07-23");
    return transferDate < threshold;
  };

  const summary = useMemo(() => {
    const beforeTransactions = transactions.filter(t => isTransferBefore23July(t.transferDate));
    const afterTransactions = transactions.filter(t => !isTransferBefore23July(t.transferDate));

    const calculateTotal = (txns: EquityTransaction[], field: keyof EquityTransaction) => {
      return txns.reduce((sum, t) => {
        const val = parseFloat(t[field] as string || "0") || 0;
        return sum + val;
      }, 0);
    };

    return {
      beforeCount: beforeTransactions.length,
      afterCount: afterTransactions.length,
      totalBefore: {
        saleValue: calculateTotal(beforeTransactions, "totalSaleValue"),
        costAcq: calculateTotal(beforeTransactions, "costOfAcquisition"),
        indexation: calculateTotal(beforeTransactions, "indexationBenefit"),
        expenses: calculateTotal(beforeTransactions, "costOfExpenditure"),
        deduction: calculateTotal(beforeTransactions, "totalDeduction"),
        balance: calculateTotal(beforeTransactions, "balanceToSchedule"),
      },
      totalAfter: {
        saleValue: calculateTotal(afterTransactions, "totalSaleValue"),
        costAcq: calculateTotal(afterTransactions, "costOfAcquisition"),
        indexation: calculateTotal(afterTransactions, "indexationBenefit"),
        expenses: calculateTotal(afterTransactions, "costOfExpenditure"),
        deduction: calculateTotal(afterTransactions, "totalDeduction"),
        balance: calculateTotal(afterTransactions, "balanceToSchedule"),
      },
      combinedBalance: calculateTotal(transactions, "balanceToSchedule"),
    };
  }, [transactions]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm max-h-screen overflow-y-auto">
      <div className="space-y-2 border-b-2 border-blue-500 pb-4 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule 112A - From Sale of Equity Shares with STT
        </h2>
        <p className="text-sm text-gray-600">
          Detailed transaction records with indexation benefit (Rule 11UA) for equity shares/mutual funds
        </p>
      </div>

      {hasErrors && (
        <div className="space-y-2 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="font-semibold text-red-900">Validation Errors Found</p>
          <p className="text-sm text-red-800">Please check your entries above.</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit((data) => {
          onSave({ ...data, equityTransactions: transactions });
          onNext();
        })}
        className="space-y-6"
      >
        {/* TRANSACTIONS TABLE */}
        <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 space-y-3">
          <h3 className="font-bold text-blue-900">Equity Share Transactions (Section 112A)</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-blue-200">
                  <th className="border border-gray-300 p-2">S.No</th>
                  <th className="border border-gray-300 p-2">Acquisition Date</th>
                  <th className="border border-gray-300 p-2">Transfer Date</th>
                  <th className="border border-gray-300 p-2">ISIN</th>
                  <th className="border border-gray-300 p-2">Share Name</th>
                  <th className="border border-gray-300 p-2">No. of Units</th>
                  <th className="border border-gray-300 p-2">Sale Price/Unit</th>
                  <th className="border border-gray-300 p-2">Total Sale Value</th>
                  <th className="border border-gray-300 p-2">Cost of Acq.</th>
                  <th className="border border-gray-300 p-2">Indexation</th>
                  <th className="border border-gray-300 p-2">Expenses</th>
                  <th className="border border-gray-300 p-2">LTCG Date</th>
                  <th className="border border-gray-300 p-2">FMV/Share</th>
                  <th className="border border-gray-300 p-2">Deduction</th>
                  <th className="border border-gray-300 p-2">Balance to Schedule</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx} className={isTransferBefore23July(txn.transferDate) ? "bg-yellow-50" : "bg-green-50"}>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        placeholder={`${idx + 1}`}
                        value={txn.sNo || ""}
                        onChange={(e) => updateRow(idx, "sNo", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="date"
                        value={txn.acquisitionDate || ""}
                        onChange={(e) => updateRow(idx, "acquisitionDate", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="date"
                        value={txn.transferDate || ""}
                        onChange={(e) => updateRow(idx, "transferDate", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        placeholder="ISIN"
                        value={txn.isinCode || ""}
                        onChange={(e) => updateRow(idx, "isinCode", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="text"
                        placeholder="Share name"
                        value={txn.shareName || ""}
                        onChange={(e) => updateRow(idx, "shareName", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        placeholder="Units"
                        value={txn.noOfUnits || ""}
                        onChange={(e) => updateRow(idx, "noOfUnits", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={txn.salePricePerUnit || ""}
                        onChange={(e) => updateRow(idx, "salePricePerUnit", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.totalSaleValue || ""}
                        onChange={(e) => updateRow(idx, "totalSaleValue", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.costOfAcquisition || ""}
                        onChange={(e) => updateRow(idx, "costOfAcquisition", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.indexationBenefit || ""}
                        onChange={(e) => updateRow(idx, "indexationBenefit", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.costOfExpenditure || ""}
                        onChange={(e) => updateRow(idx, "costOfExpenditure", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="date"
                        value={txn.ltcgAssetDate || ""}
                        onChange={(e) => updateRow(idx, "ltcgAssetDate", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.fairMarketValuePerShare || ""}
                        onChange={(e) => updateRow(idx, "fairMarketValuePerShare", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.totalDeduction || ""}
                        onChange={(e) => updateRow(idx, "totalDeduction", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.balanceToSchedule || ""}
                        onChange={(e) => updateRow(idx, "balanceToSchedule", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addRow}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Row
          </button>
        </div>

        {/* SUMMARY - BEFORE 23 JULY 2024 */}
        <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-4">
          <h4 className="font-bold text-yellow-900 mb-3">Total of Col 14 where transfer was before 23rd July 2024</h4>
          <div className="grid grid-cols-3 gap-2">
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Sale Value</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.saleValue}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Cost of Acq.</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.costAcq}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Indexation</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.indexation}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Expenses</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.expenses}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Deduction</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.deduction}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Balance to Schedule</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.balance}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 font-bold"
              />
            </label>
          </div>
        </div>

        {/* SUMMARY - ON/AFTER 23 JULY 2024 */}
        <div className="rounded-lg border-2 border-green-400 bg-green-50 p-4">
          <h4 className="font-bold text-green-900 mb-3">Total of Col 14 where transfer was on or after 23rd July 2024</h4>
          <div className="grid grid-cols-3 gap-2">
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Sale Value</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.saleValue}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Cost of Acq.</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.costAcq}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Indexation</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.indexation}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Expenses</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.expenses}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Deduction</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.deduction}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Balance to Schedule</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.balance}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 font-bold"
              />
            </label>
          </div>
        </div>

        {/* TOTAL COMBINED BALANCE */}
        <div className="rounded-lg border-3 border-indigo-600 bg-indigo-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-indigo-900">Total (i + ii) - Combined LTCG per Schedule 112A</p>
            <p className="text-3xl font-bold text-indigo-700">
              ₹{summary.combinedBalance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* NOTES */}
        <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-4">
          <label>
            <span className="text-sm font-semibold text-gray-700">Remarks/Notes</span>
            <textarea
              rows={3}
              placeholder="Additional notes or remarks..."
              {...register("remarksNotes")}
              className="mt-2 w-full rounded border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
            />
          </label>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 border-t border-gray-200 pt-6 sticky bottom-0 bg-white z-10">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={hasErrors}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreeSchedule112A;
