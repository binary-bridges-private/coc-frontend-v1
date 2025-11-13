import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ===== SCHEDULE 115AD(1)(b)(iii) - NON-RESIDENTS EQUITY SHARES =====
export interface NonResidentEquityTransaction {
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
  totalFmv?: string;
  expenditureDeductions?: string;
  balanceToSchedule?: string;
}

export interface Schedule115ADFormData {
  nonResidentEquityTransactions?: NonResidentEquityTransaction[];
  totalBeforeSaleValue?: string;
  totalBeforeCostAcq?: string;
  totalBeforeIndexation?: string;
  totalBeforeExpenses?: string;
  totalBeforeFmv?: string;
  totalBeforeDeduction?: string;
  totalBeforeBalance?: string;

  totalAfterSaleValue?: string;
  totalAfterCostAcq?: string;
  totalAfterIndexation?: string;
  totalAfterExpenses?: string;
  totalAfterFmv?: string;
  totalAfterDeduction?: string;
  totalAfterBalance?: string;

  totalCombinedBalance?: string;
  remarksNotes?: string;
}

const schedule115ADSchema = z.object({
  nonResidentEquityTransactions: z.array(z.object({
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
    totalFmv: z.string().optional(),
    expenditureDeductions: z.string().optional(),
    balanceToSchedule: z.string().optional(),
  })).optional(),

  totalBeforeSaleValue: z.string().optional(),
  totalBeforeCostAcq: z.string().optional(),
  totalBeforeIndexation: z.string().optional(),
  totalBeforeExpenses: z.string().optional(),
  totalBeforeFmv: z.string().optional(),
  totalBeforeDeduction: z.string().optional(),
  totalBeforeBalance: z.string().optional(),

  totalAfterSaleValue: z.string().optional(),
  totalAfterCostAcq: z.string().optional(),
  totalAfterIndexation: z.string().optional(),
  totalAfterExpenses: z.string().optional(),
  totalAfterFmv: z.string().optional(),
  totalAfterDeduction: z.string().optional(),
  totalAfterBalance: z.string().optional(),

  totalCombinedBalance: z.string().optional(),
  remarksNotes: z.string().optional(),
}).superRefine((data, ctx) => {
  console.log("Schedule 115AD(1)(b)(iii) - Non-Residents Equity Data", data);
});

interface Schedule115ADProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: Schedule115ADFormData) => void;
  initialData?: Schedule115ADFormData;
}

const ItrThreeSchedule115AD: React.FC<Schedule115ADProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const [transactions, setTransactions] = useState<NonResidentEquityTransaction[]>(
    initialData?.nonResidentEquityTransactions || [{}]
  );

  const { watch, handleSubmit, formState: { errors }, register } = useForm<Schedule115ADFormData>({
    resolver: zodResolver(schedule115ADSchema),
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

  const updateRow = (index: number, field: keyof NonResidentEquityTransaction, value: string) => {
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

    const calculateTotal = (txns: NonResidentEquityTransaction[], field: keyof NonResidentEquityTransaction) => {
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
        fmv: calculateTotal(beforeTransactions, "totalFmv"),
        deduction: calculateTotal(beforeTransactions, "expenditureDeductions"),
        balance: calculateTotal(beforeTransactions, "balanceToSchedule"),
      },
      totalAfter: {
        saleValue: calculateTotal(afterTransactions, "totalSaleValue"),
        costAcq: calculateTotal(afterTransactions, "costOfAcquisition"),
        indexation: calculateTotal(afterTransactions, "indexationBenefit"),
        expenses: calculateTotal(afterTransactions, "costOfExpenditure"),
        fmv: calculateTotal(afterTransactions, "totalFmv"),
        deduction: calculateTotal(afterTransactions, "expenditureDeductions"),
        balance: calculateTotal(afterTransactions, "balanceToSchedule"),
      },
      combinedBalance: calculateTotal(transactions, "balanceToSchedule"),
    };
  }, [transactions]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm max-h-screen overflow-y-auto">
      <div className="space-y-2 border-b-2 border-purple-500 pb-4 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule 115AD(1)(b)(iii) - Non-Residents: Equity Share Sales with STT
        </h2>
        <p className="text-sm text-gray-600">
          For sale of equity share in company or unit of equity-oriented fund or business trust on which STT is paid (Section 115AD(1)(b)(iii))
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
          onSave({ ...data, nonResidentEquityTransactions: transactions });
          onNext();
        })}
        className="space-y-6"
      >
        {/* TRANSACTIONS TABLE */}
        <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 space-y-3">
          <h3 className="font-bold text-purple-900">Non-Resident Equity Transactions (Section 115AD)</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-purple-200">
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
                  <th className="border border-gray-300 p-2">Total FMV</th>
                  <th className="border border-gray-300 p-2">Deductions</th>
                  <th className="border border-gray-300 p-2">Balance to CG</th>
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
                        value={txn.totalFmv || ""}
                        onChange={(e) => updateRow(idx, "totalFmv", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.expenditureDeductions || ""}
                        onChange={(e) => updateRow(idx, "expenditureDeductions", e.target.value)}
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
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            + Add Row
          </button>
        </div>

        {/* SUMMARY - BEFORE 23 JULY 2024 */}
        <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-4">
          <h4 className="font-bold text-yellow-900 mb-3">Total of Col 14 where transfer was before 23rd July 2024</h4>
          <div className="grid grid-cols-4 gap-2">
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.saleValue}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 bg-gray-100 text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Cost</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.costAcq}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 bg-gray-100 text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Balance to Schedule CG</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalBefore.balance}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 bg-gray-100 text-xs font-bold"
              />
            </label>
          </div>
        </div>

        {/* SUMMARY - ON/AFTER 23 JULY 2024 */}
        <div className="rounded-lg border-2 border-green-400 bg-green-50 p-4">
          <h4 className="font-bold text-green-900 mb-3">Total of Col 14 where transfer was on or after 23rd July 2024</h4>
          <div className="grid grid-cols-4 gap-2">
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.saleValue}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 bg-gray-100 text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Cost</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.costAcq}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 bg-gray-100 text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Balance to Schedule CG</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalAfter.balance}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 bg-gray-100 text-xs font-bold"
              />
            </label>
          </div>
        </div>

        {/* TOTAL COMBINED BALANCE */}
        <div className="rounded-lg border-3 border-purple-600 bg-purple-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-purple-900">Total (i + ii) - LTCG per Schedule 115AD(1)(b)(iii)</p>
            <p className="text-3xl font-bold text-purple-700">
              ₹{summary.combinedBalance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <p className="text-xs text-purple-700 mt-2">Transfer to Schedule CG Item 5 (c) of ITR3</p>
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
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 disabled:bg-gray-400"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreeSchedule115AD;
