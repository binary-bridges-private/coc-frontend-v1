import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ScheduleDAEntry {
  accumulationFY: string;
  priorTo2021_22: string;
  fy2021_22: string;
  fy2022_23: string;
  fy2023_24: string;
  fy2024_25: string;
  total: string;
}

export interface ItrFiveScheduleDAFormData {
  entries?: ScheduleDAEntry[];
}

// Zod validation schema
const scheduleDAEntrySchema = z.object({
  accumulationFY: z.string().optional(),
  priorTo2021_22: z.string().optional(),
  fy2021_22: z.string().optional(),
  fy2022_23: z.string().optional(),
  fy2023_24: z.string().optional(),
  fy2024_25: z.string().optional(),
  total: z.string().optional(),
});

const itrFiveScheduleDASchema = z.object({
  entries: z.array(scheduleDAEntrySchema).optional(),
});

type ItrFiveScheduleDAFormType = z.infer<typeof itrFiveScheduleDASchema>;

interface ItrFiveScheduleDAProps {
  initialData?: ItrFiveScheduleDAFormData;
  onSave: (data: ItrFiveScheduleDAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleDA: React.FC<ItrFiveScheduleDAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleDAFormType>({
    resolver: zodResolver(itrFiveScheduleDASchema),
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

  const [entries, setEntries] = React.useState<ScheduleDAEntry[]>(
    initialData?.entries || [
      {
        accumulationFY: "Prior to FY 2019-20",
        priorTo2021_22: "",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        accumulationFY: "2019-20",
        priorTo2021_22: "",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        accumulationFY: "2020-21",
        priorTo2021_22: "",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        accumulationFY: "2021-22",
        priorTo2021_22: "",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        accumulationFY: "2022-23",
        priorTo2021_22: "",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
    ]
  );

  const onSubmit = (data: ItrFiveScheduleDAFormType) => {
    onSave({
      entries,
    });
  };

  const updateEntry = (
    idx: number,
    field: keyof ScheduleDAEntry,
    value: string
  ) => {
    const updated = [...entries];
    updated[idx][field] = value;
    setEntries(updated);
  };

  const calculateRowTotal = (idx: number): string => {
    const entry = entries[idx];
    const total =
      (parseFloat(entry.priorTo2021_22) || 0) +
      (parseFloat(entry.fy2021_22) || 0) +
      (parseFloat(entry.fy2022_23) || 0) +
      (parseFloat(entry.fy2023_24) || 0) +
      (parseFloat(entry.fy2024_25) || 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const calculateColumnTotal = (field: "priorTo2021_22" | "fy2021_22" | "fy2022_23" | "fy2023_24" | "fy2024_25"): string => {
    const total = entries.reduce((sum, entry) => {
      return sum + (parseFloat(entry[field]) || 0);
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const calculateGrandTotal = (): string => {
    const total = entries.reduce((sum, entry) => {
      return (
        sum +
        (parseFloat(entry.priorTo2021_22) || 0) +
        (parseFloat(entry.fy2021_22) || 0) +
        (parseFloat(entry.fy2022_23) || 0) +
        (parseFloat(entry.fy2023_24) || 0) +
        (parseFloat(entry.fy2024_25) || 0)
      );
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Schedule DA - Accumulated Income Taxed in Earlier Years
          </h1>
          <p className="text-indigo-700">
            Details of accumulated income taxed in earlier assessment years as per section 11(1B)
          </p>
          <p className="text-xs text-indigo-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Schedule DA Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">
              Accumulated Income Taxed Details
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-32">
                      Year of Accumulation (F.Y.)
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-28">
                      Prior to A.Y. 2021-22<br/>
                      <span className="text-xs font-normal">(A)</span>
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      2021-22<br/>
                      <span className="text-xs font-normal">(B)</span>
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      2022-23<br/>
                      <span className="text-xs font-normal">(C)</span>
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      2023-24<br/>
                      <span className="text-xs font-normal">(D)</span>
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      2024-25<br/>
                      <span className="text-xs font-normal">(E)</span>
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Total<br/>
                      <span className="text-xs font-normal">(F) = A+B+C+D+E</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50">
                      <td className="border border-gray-300 px-2 py-2 text-xs font-medium">
                        {entry.accumulationFY}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.priorTo2021_22}
                          onChange={(e) =>
                            updateEntry(idx, "priorTo2021_22", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.fy2021_22}
                          onChange={(e) =>
                            updateEntry(idx, "fy2021_22", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.fy2022_23}
                          onChange={(e) =>
                            updateEntry(idx, "fy2022_23", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.fy2023_24}
                          onChange={(e) =>
                            updateEntry(idx, "fy2023_24", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={entry.fy2024_25}
                          onChange={(e) =>
                            updateEntry(idx, "fy2024_25", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 bg-indigo-50 text-center font-semibold">
                        <div className="text-xs">
                          {calculateRowTotal(idx)}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-100 font-semibold">
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      Total
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      {calculateColumnTotal("priorTo2021_22")}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      {calculateColumnTotal("fy2021_22")}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      {calculateColumnTotal("fy2022_23")}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      {calculateColumnTotal("fy2023_24")}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      {calculateColumnTotal("fy2024_25")}
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                      {calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-600 mt-4 italic">
              Note: Row totals and column totals are automatically calculated. Assessment year columns refer to years in which the amount referred at Col 5 of Schedule D was taxed.
            </p>
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
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleDA;
