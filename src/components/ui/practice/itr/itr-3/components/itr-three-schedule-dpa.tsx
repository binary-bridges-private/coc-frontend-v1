import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== TYPE DEFINITIONS ====================

export interface OtherAssetRow {
  blockId: string;
  blockOfAssets?: string;
  rate?: string;                      // Depreciation rate - Nil, 5, 10, 40, 10, 25, 20
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
  netAggregateDepreciation?: string;  // 14 - Net aggregate depreciation
}

export interface ScheduleDPAFormData {
  assets?: OtherAssetRow[];
  totalDepreciationAllAssets?: string;
  depreciationRateNil?: string;
  depreciationRate5?: string;
  depreciationRate10?: string;
  depreciationRate40?: string;
  depreciationRate25?: string;
  depreciationRate20?: string;
  totalAggregateDepreciation?: string;
}

const otherAssetRowSchema = z.object({
  blockId: z.string(),
  blockOfAssets: z.string().optional().or(z.literal("")),
  rate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^(Nil|5|10|40|25|20)$/.test(val), {
      message: "Rate must be Nil, 5, 10, 40, 25, or 20",
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

const scheduleDPASchema = z.object({
  assets: z.array(otherAssetRowSchema).optional(),
  totalDepreciationAllAssets: z.string().optional().or(z.literal("")),
  depreciationRateNil: z.string().optional().or(z.literal("")),
  depreciationRate5: z.string().optional().or(z.literal("")),
  depreciationRate10: z.string().optional().or(z.literal("")),
  depreciationRate40: z.string().optional().or(z.literal("")),
  depreciationRate25: z.string().optional().or(z.literal("")),
  depreciationRate20: z.string().optional().or(z.literal("")),
  totalAggregateDepreciation: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  if (!data.assets || data.assets.length === 0) return;

  // Calculate totals for each rate bucket
  let totalNil = 0,
    total5 = 0,
    total10 = 0,
    total40 = 0,
    total25 = 0,
    total20 = 0;

  data.assets.forEach((asset) => {
    const netDepreciation = parseFloat(asset.netAggregateDepreciation || "0") || 0;
    const rate = asset.rate || "";

    if (rate === "Nil") totalNil += netDepreciation;
    else if (rate === "5") total5 += netDepreciation;
    else if (rate === "10") total10 += netDepreciation;
    else if (rate === "40") total40 += netDepreciation;
    else if (rate === "25") total25 += netDepreciation;
    else if (rate === "20") total20 += netDepreciation;
  });

  const grandTotal = totalNil + total5 + total10 + total40 + total25 + total20;

  console.log("📊 Schedule DPA Calculation Details:", {
    rateNilTotal: totalNil,
    rate5Total: total5,
    rate10Total: total10,
    rate40Total: total40,
    rate25Total: total25,
    rate20Total: total20,
    grandTotal: grandTotal,
  });
});

type ScheduleDPAFormType = z.infer<typeof scheduleDPASchema>;

// ==================== REACT COMPONENT ====================

interface ScheduleDPAProps {
  initialData?: ScheduleDPAFormData;
  onSave: (data: ScheduleDPAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleDPA({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleDPAProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ScheduleDPAFormType>({
    resolver: zodResolver(scheduleDPASchema),
    mode: "onChange",
    defaultValues: initialData || {
      assets: [
        { blockId: "1", rate: "Nil" },
        { blockId: "2", rate: "5" },
        { blockId: "3", rate: "10" },
        { blockId: "4", rate: "40" },
        { blockId: "5", rate: "25" },
        { blockId: "6", rate: "20" },
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
      Nil: 0,
      "5": 0,
      "10": 0,
      "40": 0,
      "25": 0,
      "20": 0,
    };

    assets.forEach((asset) => {
      const netDepreciation = parseFloat(asset.netAggregateDepreciation || "0") || 0;
      const rate = asset.rate || "Nil";
      if (rateGroups.hasOwnProperty(rate)) {
        rateGroups[rate] += netDepreciation;
      }
    });

    const grandTotal = Object.values(rateGroups).reduce((a, b) => a + b, 0);

    return {
      rateNil: rateGroups["Nil"].toFixed(2),
      rate5: rateGroups["5"].toFixed(2),
      rate10: rateGroups["10"].toFixed(2),
      rate40: rateGroups["40"].toFixed(2),
      rate25: rateGroups["25"].toFixed(2),
      rate20: rateGroups["20"].toFixed(2),
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

  const onSubmit = (data: ScheduleDPAFormType) => {
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-900 mb-2">
            Schedule DPA - Depreciation on Other Assets
          </h1>
          <p className="text-cyan-700">
            Calculate depreciation on other assets (Land, Buildings, Tangibles, Ships)
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
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-500">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              Depreciation by Rate (Other Assets)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-cyan-100">
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
                      Net Aggregate (14)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(formValues.assets || []).map((asset, idx) => (
                    <tr key={asset.blockId} className="hover:bg-cyan-50">
                      <td className="border border-gray-300 p-2">
                        <input
                          {...register(`assets.${idx}.blockOfAssets`)}
                          type="text"
                          placeholder="e.g., Land, Building"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          {...register(`assets.${idx}.rate`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="Nil">Nil</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="40">40%</option>
                          <option value="25">25%</option>
                          <option value="20">20%</option>
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
          <div className="bg-gradient-to-r from-cyan-50 to-blue-100 rounded-lg shadow-lg p-6 border-l-4 border-cyan-600">
            <h3 className="text-lg font-bold text-cyan-900 mb-4">
              Total Depreciation by Rate
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                <p className="text-sm text-gray-600">Nil Rate</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{parseFloat(calculations.rateNil).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">5% Rate</p>
                <p className="text-xl font-bold text-blue-900">
                  ₹{parseFloat(calculations.rate5).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                <p className="text-sm text-gray-600">10% Rate</p>
                <p className="text-xl font-bold text-indigo-900">
                  ₹{parseFloat(calculations.rate10).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm text-gray-600">40% Rate</p>
                <p className="text-xl font-bold text-red-900">
                  ₹{parseFloat(calculations.rate40).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                <p className="text-sm text-gray-600">25% Rate</p>
                <p className="text-xl font-bold text-orange-900">
                  ₹{parseFloat(calculations.rate25).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-amber-500">
                <p className="text-sm text-gray-600">20% Rate</p>
                <p className="text-xl font-bold text-amber-900">
                  ₹{parseFloat(calculations.rate20).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="col-span-3 bg-white p-4 rounded border-l-4 border-cyan-600">
                <p className="text-sm text-gray-600">Total Aggregate Depreciation</p>
                <p className="text-3xl font-bold text-cyan-900">
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
                  ? "bg-cyan-600 text-white hover:bg-cyan-700 cursor-pointer"
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
                  ? "bg-cyan-600 text-white hover:bg-cyan-700 cursor-pointer"
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
