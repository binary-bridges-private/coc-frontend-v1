import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ===== SCHEDULE VDA - VIRTUAL DIGITAL ASSETS =====
export interface VDATransaction {
  sNo?: string;
  dateOfAcquisition?: string;
  dateOfTransfer?: string;
  headOfIncome?: string; // Business Capital Gain, Business Income, Capital Gain, etc.
  costOfAcquisition?: string;
  considerationReceived?: string;
  incomeFromVDA?: string;
}

export interface ScheduleVDAFormData {
  vdaTransactions?: VDATransaction[];
  totalCostOfAcquisition?: string;
  totalConsideration?: string;
  totalIncomeFromVDA?: string;

  // Summary by income type
  totalBusinessCapitalGain?: string;
  totalBusinessIncome?: string;
  totalCapitalGain?: string;
  totalOtherIncome?: string;

  // Linkage to other schedules
  scheduleAGAmountFromVDA?: string; // Item A3g of Schedule BP
  scheduleCGAmountFromVDA?: string; // Item C2 of Schedule CG

  remarksNotes?: string;
}

const scheduleVDASchema = z.object({
  vdaTransactions: z.array(z.object({
    sNo: z.string().optional(),
    dateOfAcquisition: z.string().optional(),
    dateOfTransfer: z.string().optional(),
    headOfIncome: z.string().optional(),
    costOfAcquisition: z.string().optional(),
    considerationReceived: z.string().optional(),
    incomeFromVDA: z.string().optional(),
  })).optional(),

  totalCostOfAcquisition: z.string().optional(),
  totalConsideration: z.string().optional(),
  totalIncomeFromVDA: z.string().optional(),

  totalBusinessCapitalGain: z.string().optional(),
  totalBusinessIncome: z.string().optional(),
  totalCapitalGain: z.string().optional(),
  totalOtherIncome: z.string().optional(),

  scheduleAGAmountFromVDA: z.string().optional(),
  scheduleCGAmountFromVDA: z.string().optional(),

  remarksNotes: z.string().optional(),
}).superRefine((data, ctx) => {
  console.log("Schedule VDA - Virtual Digital Assets Data", data);
});

interface ScheduleVDAProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: ScheduleVDAFormData) => void;
  initialData?: ScheduleVDAFormData;
}

const ItrThreeScheduleVDA: React.FC<ScheduleVDAProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const [transactions, setTransactions] = useState<VDATransaction[]>(
    initialData?.vdaTransactions || [{}]
  );

  const { watch, handleSubmit, formState: { errors }, register } = useForm<ScheduleVDAFormData>({
    resolver: zodResolver(scheduleVDASchema),
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

  const updateRow = (index: number, field: keyof VDATransaction, value: string) => {
    const updated = [...transactions];
    updated[index][field] = value;
    setTransactions(updated);
  };

  const summary = useMemo(() => {
    const totalCost = transactions.reduce((sum, t) => {
      const val = parseFloat(t.costOfAcquisition || "0") || 0;
      return sum + val;
    }, 0);

    const totalConsideration = transactions.reduce((sum, t) => {
      const val = parseFloat(t.considerationReceived || "0") || 0;
      return sum + val;
    }, 0);

    const totalIncome = transactions.reduce((sum, t) => {
      const val = parseFloat(t.incomeFromVDA || "0") || 0;
      return sum + val;
    }, 0);

    // Group by head of income
    const byHead: Record<string, number> = {};
    transactions.forEach(t => {
      if (t.headOfIncome && t.incomeFromVDA) {
        const head = t.headOfIncome;
        const income = parseFloat(t.incomeFromVDA) || 0;
        byHead[head] = (byHead[head] || 0) + income;
      }
    });

    return {
      totalCost,
      totalConsideration,
      totalIncome,
      byHead,
      businessCapitalGain: byHead["Business Capital Gain"] || 0,
      businessIncome: byHead["Business Income"] || 0,
      capitalGain: byHead["Capital Gain"] || 0,
      otherIncome: byHead["Other Income"] || 0,
    };
  }, [transactions]);

  const hasErrors = Object.keys(errors).length > 0;

  const incomeHeadOptions = [
    "Business Capital Gain",
    "Business Income",
    "Capital Gain",
    "Other Income",
    "Speculative Income",
  ];

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm max-h-screen overflow-y-auto">
      <div className="space-y-2 border-b-2 border-emerald-500 pb-4 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule VDA - Income from Transfer of Virtual Digital Assets
        </h2>
        <p className="text-sm text-gray-600">
          Details of every transaction where transfer is a transaction (Taxable @ 30%)
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
          onSave({ ...data, vdaTransactions: transactions });
          onNext();
        })}
        className="space-y-6"
      >
        {/* TRANSACTIONS TABLE */}
        <div className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4 space-y-3">
          <h3 className="font-bold text-emerald-900">Virtual Digital Asset Transactions</h3>
          <p className="text-xs text-emerald-700">Each transfer transaction must be detailed below</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-200">
                  <th className="border border-gray-300 p-2">S.No</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Date of Transfer</th>
                  <th className="border border-gray-300 p-2">Head of Income</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition</th>
                  <th className="border border-gray-300 p-2">Consideration Received</th>
                  <th className="border border-gray-300 p-2">Income from VDA</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="bg-white hover:bg-emerald-100">
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
                        value={txn.dateOfAcquisition || ""}
                        onChange={(e) => updateRow(idx, "dateOfAcquisition", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="date"
                        value={txn.dateOfTransfer || ""}
                        onChange={(e) => updateRow(idx, "dateOfTransfer", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <select
                        value={txn.headOfIncome || ""}
                        onChange={(e) => updateRow(idx, "headOfIncome", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      >
                        <option value="">Select Head</option>
                        {incomeHeadOptions.map(head => (
                          <option key={head} value={head}>{head}</option>
                        ))}
                      </select>
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
                        value={txn.considerationReceived || ""}
                        onChange={(e) => updateRow(idx, "considerationReceived", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={txn.incomeFromVDA || ""}
                        onChange={(e) => updateRow(idx, "incomeFromVDA", e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none font-semibold"
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
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            + Add Transaction
          </button>
        </div>

        {/* TOTALS */}
        <div className="rounded-lg border-2 border-emerald-400 bg-emerald-50 p-4">
          <h4 className="font-bold text-emerald-900 mb-3">Transaction Totals</h4>
          <div className="grid grid-cols-3 gap-3">
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalCost}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Consideration Received</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalConsideration}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Total Income from VDA</span>
              <input
                type="number"
                step="0.01"
                value={summary.totalIncome}
                readOnly
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 font-bold text-xs"
              />
            </label>
          </div>
        </div>

        {/* SUMMARY BY INCOME HEAD */}
        <div className="rounded-lg border-2 border-cyan-400 bg-cyan-50 p-4">
          <h4 className="font-bold text-cyan-900 mb-3">Summary by Head of Income</h4>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Business Capital Gain (Item A3g of Sch BP)</span>
              <input
                type="number"
                step="0.01"
                value={summary.businessCapitalGain}
                {...register("scheduleAGAmountFromVDA")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Business Income</span>
              <input
                type="number"
                step="0.01"
                value={summary.businessIncome}
                {...register("totalBusinessIncome")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Capital Gain (Item C2 of Sch CG)</span>
              <input
                type="number"
                step="0.01"
                value={summary.capitalGain}
                {...register("scheduleCGAmountFromVDA")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none text-xs"
              />
            </label>
            <label className="text-sm">
              <span className="font-semibold text-gray-700">Other Income</span>
              <input
                type="number"
                step="0.01"
                value={summary.otherIncome}
                {...register("totalOtherIncome")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:outline-none text-xs"
              />
            </label>
          </div>
        </div>

        {/* SUMMARY DISPLAY */}
        <div className="rounded-lg border-3 border-emerald-600 bg-gradient-to-r from-emerald-100 to-cyan-100 p-6 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded bg-white p-3 border border-emerald-300 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">Total VDA Transactions</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">{transactions.length}</p>
            </div>
            <div className="rounded bg-white p-3 border border-emerald-300 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">Total Income from VDA</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">
                ₹{summary.totalIncome.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="rounded bg-white p-3 border border-emerald-300 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">Tax @ 30% on VDA</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">
                ₹{(summary.totalIncome * 0.30).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-4">
          <label>
            <span className="text-sm font-semibold text-gray-700">Remarks/Notes</span>
            <textarea
              rows={3}
              placeholder="Additional notes or remarks about VDA transactions..."
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
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:bg-gray-400"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreeScheduleVDA;
