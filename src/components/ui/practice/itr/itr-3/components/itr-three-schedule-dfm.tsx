import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== TYPE DEFINITIONS ====================

export interface AssetRow {
  blockId: string;                    // Unique ID for each block
  blockOfAssets?: string;             // Name/description of asset block
  rate?: string;                      // Depreciation rate (%) - 15, 30, 40, 45
  writtenDownValuePrev?: string;      // 3a - Written down value on first day
  adjustmentU115BAC?: string;         // 3b - Adjustment per second proviso
  totalAddition?: string;             // 3 - Total (3a + 3b)
  additionsPeriod180?: string;        // 4 - Additions for 180+ days
  deductions?: string;                // 5 - Deduction/realization
  totalAdditions?: string;            // Total (4 + 5 + 6)
  depreciationFullRate?: string;      // 9 - Depreciation @full rate
  depreciationHalfRate?: string;      // 9 - Depreciation @ half rate
  depreciationOnSix?: string;         // 10 - Depreciation on 6 at full rate
  depreciationOnNine?: string;        // 11 - Depreciation on 9 at half rate
  additionalDepreciation?: string;    // 12 - Additional depreciation
  depreciationDisallowed?: string;    // 13 - Depreciation disallowed u/s 32(2)
  netAggregateDepreciation?: string;  // 17 - Net aggregate depreciation
}

export interface ScheduleDFMFormData {
  assets?: AssetRow[];
  totalDepreciationAllAssets?: string;  // Total for all plant & machinery
  depreciationRate15?: string;
  depreciationRate30?: string;
  depreciationRate40?: string;
  depreciationRate45?: string;
  totalAggregateDepreciation?: string;  // Final total
}

const assetRowSchema = z.object({
  blockId: z.string(),
  blockOfAssets: z.string().optional().or(z.literal("")),
  rate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^(15|30|40|45)$/.test(val), {
      message: "Rate must be 15, 30, 40, or 45",
    }),
  writtenDownValuePrev: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  adjustmentU115BAC: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num);
    }, "Must be valid amount"),
  totalAddition: z.string().optional().or(z.literal("")),
  additionsPeriod180: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  deductions: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  totalAdditions: z.string().optional().or(z.literal("")),
  depreciationFullRate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  depreciationHalfRate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  depreciationOnSix: z.string().optional().or(z.literal("")),
  depreciationOnNine: z.string().optional().or(z.literal("")),
  additionalDepreciation: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  depreciationDisallowed: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),
  netAggregateDepreciation: z.string().optional().or(z.literal("")),
});

const scheduleDFMSchema = z.object({
  assets: z.array(assetRowSchema).optional(),
  totalDepreciationAllAssets: z.string().optional().or(z.literal("")),
  depreciationRate15: z.string().optional().or(z.literal("")),
  depreciationRate30: z.string().optional().or(z.literal("")),
  depreciationRate40: z.string().optional().or(z.literal("")),
  depreciationRate45: z.string().optional().or(z.literal("")),
  totalAggregateDepreciation: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  if (!data.assets || data.assets.length === 0) return;

  // Calculate totals for each rate bucket
  let total15 = 0,
    total30 = 0,
    total40 = 0,
    total45 = 0;

  data.assets.forEach((asset) => {
    const netDepreciation = parseFloat(asset.netAggregateDepreciation || "0") || 0;
    const rate = asset.rate || "";

    if (rate === "15") total15 += netDepreciation;
    else if (rate === "30") total30 += netDepreciation;
    else if (rate === "40") total40 += netDepreciation;
    else if (rate === "45") total45 += netDepreciation;
  });

  const grandTotal = total15 + total30 + total40 + total45;

  console.log("📊 Schedule DFM Calculation Details:", {
    rate15Total: total15,
    rate30Total: total30,
    rate40Total: total40,
    rate45Total: total45,
    grandTotal: grandTotal,
  });
});

type ScheduleDFMFormType = z.infer<typeof scheduleDFMSchema>;

// ==================== REACT COMPONENT ====================

interface ScheduleDFMProps {
  initialData?: ScheduleDFMFormData;
  onSave: (data: ScheduleDFMFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleDFM({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleDFMProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control,
  } = useForm<ScheduleDFMFormType>({
    resolver: zodResolver(scheduleDFMSchema),
    mode: "onChange",
    defaultValues: initialData || {
      assets: [
        { blockId: "1", rate: "15" },
        { blockId: "2", rate: "30" },
        { blockId: "3", rate: "40" },
        { blockId: "4", rate: "45" },
      ],
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const formValues = watch();

  // Calculate depreciation for each asset block
  const calculations = useMemo(() => {
    const assets = formValues.assets || [];
    const rateGroups: { [key: string]: number } = {
      "15": 0,
      "30": 0,
      "40": 0,
      "45": 0,
    };

    assets.forEach((asset) => {
      const netDepreciation = parseFloat(asset.netAggregateDepreciation || "0") || 0;
      const rate = asset.rate || "0";
      if (rateGroups.hasOwnProperty(rate)) {
        rateGroups[rate] += netDepreciation;
      }
    });

    const grandTotal = Object.values(rateGroups).reduce((a, b) => a + b, 0);

    return {
      rate15: rateGroups["15"].toFixed(2),
      rate30: rateGroups["30"].toFixed(2),
      rate40: rateGroups["40"].toFixed(2),
      rate45: rateGroups["45"].toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };
  }, [formValues]);

  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ScheduleDFMFormType) => {
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Schedule DFM - Depreciation on Plant & Machinery
          </h1>
          <p className="text-green-700">
            Calculate depreciation on plant and machinery at various rates (15%, 30%, 40%, 45%)
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Asset Blocks Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Depreciation by Rate (Plant & Machinery)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">
                      Block of Assets
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Rate (%)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      WDV Prev Year (3a)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Adjustment (3b)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Additions 180+ Days (4)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Deductions (5)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Depreciation Full (9)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Depreciation Half (9)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Additional Dep (12)
                    </th>
                    <th className="border border-gray-300 p-2 text-right">
                      Net Aggregate (17)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(formValues.assets || []).map((asset, idx) => (
                    <tr key={asset.blockId} className="hover:bg-green-50">
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.blockOfAssets`)}
                          type="text"
                          placeholder="e.g., Plant & Machinery"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          {...register(`assets.${idx}.rate`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="15">15%</option>
                          <option value="30">30%</option>
                          <option value="40">40%</option>
                          <option value="45">45%</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.writtenDownValuePrev`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.adjustmentU115BAC`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.additionsPeriod180`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.deductions`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.depreciationFullRate`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.depreciationHalfRate`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.additionalDepreciation`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.netAggregateDepreciation`)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-right font-bold"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Depreciation Summary by Rate */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <h3 className="text-lg font-bold text-green-900 mb-4">
              Total Depreciation by Rate
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">15% Rate Depreciation</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{parseFloat(calculations.rate15).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-sm text-gray-600">30% Rate Depreciation</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{parseFloat(calculations.rate30).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <p className="text-sm text-gray-600">40% Rate Depreciation</p>
                <p className="text-2xl font-bold text-orange-900">
                  ₹{parseFloat(calculations.rate40).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm text-gray-600">45% Rate Depreciation</p>
                <p className="text-2xl font-bold text-red-900">
                  ₹{parseFloat(calculations.rate45).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="col-span-2 bg-white p-4 rounded border-l-4 border-green-600">
                <p className="text-sm text-gray-600">Total Aggregate Depreciation</p>
                <p className="text-3xl font-bold text-green-900">
                  ₹{parseFloat(calculations.grandTotal).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
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
}
