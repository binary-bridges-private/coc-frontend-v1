import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ScheduleDEntry {
  yearDeemed: string;
  amountDeemedApplied: string;
  reasonOfDeeming: string;
  outOfDeemedApplicationIncome: string;
  amountTaxedAnyEarlierAY: string;
  outOfDeemedApplicationAmount: string;
  amountDeemedEnteredFinancialYear: string;
  amountWhichNotBeApplied: string;
  balanceAmountExemptionClaimed: string;
}

export interface ItrFiveScheduleDFormData {
  entries?: ScheduleDEntry[];
}

// Zod validation schema
const scheduleDEntrySchema = z.object({
  yearDeemed: z.string().optional(),
  amountDeemedApplied: z.string().optional(),
  reasonOfDeeming: z.string().optional(),
  outOfDeemedApplicationIncome: z.string().optional(),
  amountTaxedAnyEarlierAY: z.string().optional(),
  outOfDeemedApplicationAmount: z.string().optional(),
  amountDeemedEnteredFinancialYear: z.string().optional(),
  amountWhichNotBeApplied: z.string().optional(),
  balanceAmountExemptionClaimed: z.string().optional(),
});

const itrFiveScheduleDSchema = z.object({
  entries: z.array(scheduleDEntrySchema).optional(),
});

type ItrFiveScheduleDFormType = z.infer<typeof itrFiveScheduleDSchema>;

interface ItrFiveScheduleDProps {
  initialData?: ItrFiveScheduleDFormData;
  onSave: (data: ItrFiveScheduleDFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleD: React.FC<ItrFiveScheduleDProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleDFormType>({
    resolver: zodResolver(itrFiveScheduleDSchema),
    mode: "onChange",
    defaultValues: initialData || {
      entries: [],
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [entries, setEntries] = React.useState<ScheduleDEntry[]>(
    initialData?.entries || [
      {
        yearDeemed: "2024-25",
        amountDeemedApplied: "",
        reasonOfDeeming: "",
        outOfDeemedApplicationIncome: "",
        amountTaxedAnyEarlierAY: "",
        outOfDeemedApplicationAmount: "",
        amountDeemedEnteredFinancialYear: "",
        amountWhichNotBeApplied: "",
        balanceAmountExemptionClaimed: "",
      },
    ]
  );

  const onSubmit = (data: ItrFiveScheduleDFormType) => {
    onSave({
      entries,
    });
  };

  const updateEntry = (
    idx: number,
    field: keyof ScheduleDEntry,
    value: string
  ) => {
    const updated = [...entries];
    updated[idx][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        yearDeemed: "",
        amountDeemedApplied: "",
        reasonOfDeeming: "",
        outOfDeemedApplicationIncome: "",
        amountTaxedAnyEarlierAY: "",
        outOfDeemedApplicationAmount: "",
        amountDeemedEnteredFinancialYear: "",
        amountWhichNotBeApplied: "",
        balanceAmountExemptionClaimed: "",
      },
    ]);
  };

  const removeEntry = (idx: number) => {
    setEntries(entries.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Schedule D - Deemed Application of Income
          </h1>
          <p className="text-purple-700">
            Details of deemed application of income under clause (2) of Explanation 1 to sub-section (1) of section 11
          </p>
          <p className="text-xs text-purple-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Schedule D Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Deemed Application Details
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-20">
                      Year (F.Y.)
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount Deemed Applied
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-28">
                      Reason of Deeming
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Out of Deemed Application (Income)
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount Taxed (Earlier A.Y.)
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Out of Deemed Application (Amount)
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount Entered in F.Y.
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount Not Applicable
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Balance Amount (Exemption)
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-16">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-purple-50">
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.yearDeemed}
                          onChange={(e) =>
                            updateEntry(idx, "yearDeemed", e.target.value)
                          }
                          placeholder="F.Y."
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.amountDeemedApplied}
                          onChange={(e) =>
                            updateEntry(idx, "amountDeemedApplied", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <textarea
                          value={entry.reasonOfDeeming}
                          onChange={(e) =>
                            updateEntry(idx, "reasonOfDeeming", e.target.value)
                          }
                          placeholder="Reason"
                          rows={2}
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.outOfDeemedApplicationIncome}
                          onChange={(e) =>
                            updateEntry(idx, "outOfDeemedApplicationIncome", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.amountTaxedAnyEarlierAY}
                          onChange={(e) =>
                            updateEntry(idx, "amountTaxedAnyEarlierAY", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.outOfDeemedApplicationAmount}
                          onChange={(e) =>
                            updateEntry(idx, "outOfDeemedApplicationAmount", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.amountDeemedEnteredFinancialYear}
                          onChange={(e) =>
                            updateEntry(idx, "amountDeemedEnteredFinancialYear", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.amountWhichNotBeApplied}
                          onChange={(e) =>
                            updateEntry(idx, "amountWhichNotBeApplied", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.balanceAmountExemptionClaimed}
                          onChange={(e) =>
                            updateEntry(idx, "balanceAmountExemptionClaimed", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeEntry(idx)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addEntry}
              className="mb-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-semibold"
            >
              + Add Entry
            </button>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleD;
