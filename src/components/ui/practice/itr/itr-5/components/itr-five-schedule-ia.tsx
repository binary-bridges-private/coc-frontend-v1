import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ScheduleIAEntry {
  fiscalYear: string;
  fy2021_22: string;
  fy2022_23: string;
  fy2023_24: string;
  fy2024_25: string;
  total: string;
}

export interface ItrFiveScheduleIAFormData {
  entries?: ScheduleIAEntry[];
}

// Zod validation schema
const entrySchema = z.object({
  fiscalYear: z.string().min(1, "Fiscal year required"),
  fy2021_22: z.string().optional(),
  fy2022_23: z.string().optional(),
  fy2023_24: z.string().optional(),
  fy2024_25: z.string().optional(),
  total: z.string().optional(),
});

const itrFiveScheduleIASchema = z.object({
  entries: z.array(entrySchema).optional(),
});

type ItrFiveScheduleIAFormType = z.infer<typeof itrFiveScheduleIASchema>;

interface ItrFiveScheduleIAProps {
  initialData?: ItrFiveScheduleIAFormData;
  onSave: (data: ItrFiveScheduleIAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleIA: React.FC<ItrFiveScheduleIAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleIAFormType>({
    resolver: zodResolver(itrFiveScheduleIASchema),
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

  const formValues = watch();
  const [entries, setEntries] = React.useState<ScheduleIAEntry[]>(
    initialData?.entries || [
      {
        fiscalYear: "2019-20",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        fiscalYear: "2020-21",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        fiscalYear: "2021-22",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
      {
        fiscalYear: "2022-23",
        fy2021_22: "",
        fy2022_23: "",
        fy2023_24: "",
        fy2024_25: "",
        total: "",
      },
    ]
  );

  // Collect all errors
  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ItrFiveScheduleIAFormType) => {
    onSave({
      entries,
    });
  };

  const updateEntry = (idx: number, field: keyof ScheduleIAEntry, value: string) => {
    const updated = [...entries];
    updated[idx][field] = value;
    
    // Auto-calculate total
    if (["fy2021_22", "fy2022_23", "fy2023_24", "fy2024_25"].includes(field)) {
      const fy1 = parseFloat(updated[idx].fy2021_22) || 0;
      const fy2 = parseFloat(updated[idx].fy2022_23) || 0;
      const fy3 = parseFloat(updated[idx].fy2023_24) || 0;
      const fy4 = parseFloat(updated[idx].fy2024_25) || 0;
      updated[idx].total = (fy1 + fy2 + fy3 + fy4).toString();
    }
    
    setEntries(updated);
  };

  const calculateGrandTotal = (columnIndex: 0 | 1 | 2 | 3) => {
    const columns = ["fy2021_22", "fy2022_23", "fy2023_24", "fy2024_25"] as const;
    const column = columns[columnIndex];
    return entries.reduce((sum, entry) => {
      return sum + (parseFloat(entry[column]) || 0);
    }, 0);
  };

  const calculateTotalSum = () => {
    return entries.reduce((sum, entry) => {
      return sum + (parseFloat(entry.total) || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Schedule IA - Accumulated Income Taxed in Earlier Assessment Years
          </h1>
          <p className="text-purple-700">
            Details of accumulated income taxed in earlier assessment years as per section 11(3) (Figures in Rs.)
          </p>
        </div>

        {/* Error Banner */}
        {allErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="text-red-900 font-bold mb-2">
              ⚠️ Please correct {allErrors.length} error(s):
            </h3>
            <ul className="text-red-800 text-sm space-y-1 max-h-32 overflow-y-auto">
              {allErrors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Entries Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Accumulated Income Details
            </h2>

            <p className="text-sm text-gray-600 mb-4 italic">
              Assessment year in which the amount referred at Col 6 of Schedule I was taxed (Figures in Rs.)
            </p>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border border-gray-300 bg-purple-200 px-3 py-3 text-left font-semibold text-gray-800 min-w-28">
                      <div>F.Y.</div>
                      <div className="text-xs mt-1">(ΔX)</div>
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-3 py-3 text-center font-semibold text-gray-800 min-w-20">
                      <div>2021-22</div>
                      <div className="text-xs font-normal">(A)</div>
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-3 py-3 text-center font-semibold text-gray-800 min-w-20">
                      <div>2022-23</div>
                      <div className="text-xs font-normal">(B)</div>
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-3 py-3 text-center font-semibold text-gray-800 min-w-20">
                      <div>2023-24</div>
                      <div className="text-xs font-normal">(C)</div>
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-3 py-3 text-center font-semibold text-gray-800 min-w-20">
                      <div>2024-25</div>
                      <div className="text-xs font-normal">(D)</div>
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-3 py-3 text-center font-semibold text-gray-800 min-w-24">
                      <div>Total</div>
                      <div className="text-xs font-normal">(A+B+C+D)</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-purple-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium bg-purple-50">
                        {entry.fiscalYear}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={entry.fy2021_22}
                          onChange={(e) =>
                            updateEntry(idx, "fy2021_22", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={entry.fy2022_23}
                          onChange={(e) =>
                            updateEntry(idx, "fy2022_23", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={entry.fy2023_24}
                          onChange={(e) =>
                            updateEntry(idx, "fy2023_24", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={entry.fy2024_25}
                          onChange={(e) =>
                            updateEntry(idx, "fy2024_25", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right font-semibold bg-purple-50">
                        {parseFloat(entry.total || "0").toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-purple-100 font-bold">
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      Total
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">
                      {calculateGrandTotal(0).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">
                      {calculateGrandTotal(1).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">
                      {calculateGrandTotal(2).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right">
                      {calculateGrandTotal(3).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right bg-purple-200">
                      {calculateTotalSum().toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-600 mt-4 italic">
              Note: Total for each row is automatically calculated as sum of all assessment years. Grand total shows sum of all entries by year.
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
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid || entries.length > 0
                  ? "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid || entries.length > 0
                  ? "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleIA;
