import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Asset Row Interface for DCG
export interface DCGAssetRow {
  blockId: string;
  blockName?: string;
  rate?: string;
  depreciation?: string;
  reference?: string;
}

// DCG Form Data Interface
export interface ScheduleDCGFormData {
  assets: DCGAssetRow[];
  rate15Total?: string;
  rate30Total?: string;
  rate40Total?: string;
  rate45Total?: string;
  grandTotal?: string;
}

// Zod Schema for DCG Asset Row
const dcgAssetRowSchema = z.object({
  blockId: z.string().min(1, "Asset block ID required"),
  blockName: z.string().optional(),
  rate: z.string().optional(),
  depreciation: z.string().optional(),
  reference: z.string().optional(),
});

// Zod Schema for Schedule DCG
const scheduleDCGSchema = z.object({
  assets: z.array(dcgAssetRowSchema).min(1, "At least one asset block required"),
  rate15Total: z.string().optional(),
  rate30Total: z.string().optional(),
  rate40Total: z.string().optional(),
  rate45Total: z.string().optional(),
  grandTotal: z.string().optional(),
}).superRefine((data, ctx) => {
  const rates: Record<string, number[]> = {
    "15": [],
    "30": [],
    "40": [],
    "45": [],
  };

  // Group assets by rate
  data.assets.forEach((asset) => {
    const dep = asset.depreciation ? parseFloat(asset.depreciation) : 0;
    if (dep > 0 && asset.rate) {
      if (asset.rate === "15") rates["15"].push(dep);
      else if (asset.rate === "30") rates["30"].push(dep);
      else if (asset.rate === "40") rates["40"].push(dep);
      else if (asset.rate === "45") rates["45"].push(dep);
    }
  });

  // Calculate totals
  const rate15Sum = rates["15"].reduce((a, b) => a + b, 0);
  const rate30Sum = rates["30"].reduce((a, b) => a + b, 0);
  const rate40Sum = rates["40"].reduce((a, b) => a + b, 0);
  const rate45Sum = rates["45"].reduce((a, b) => a + b, 0);
  const grandTotal = rate15Sum + rate30Sum + rate40Sum + rate45Sum;

  console.log("DCG Deemed Capital Gains Summary:", {
    rate15: rate15Sum,
    rate30: rate30Sum,
    rate40: rate40Sum,
    rate45: rate45Sum,
    total: grandTotal,
  });
});

interface ScheduleDCGProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: ScheduleDCGFormData) => void;
  initialData?: ScheduleDCGFormData;
}

const ItrThreeScheduleDCG: React.FC<ScheduleDCGProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const { watch, handleSubmit, formState: { errors }, control, setValue } = useForm<ScheduleDCGFormData>({
    resolver: zodResolver(scheduleDCGSchema),
    defaultValues: initialData || {
      assets: [
        { blockId: "1", blockName: "Plant and machinery (a) 15%", rate: "15" },
        { blockId: "2", blockName: "Building (a) 5%", rate: "5" },
        { blockId: "3", blockName: "Furniture and fittings (a) 10%", rate: "10" },
        { blockId: "4", blockName: "Intangibles (a) 40%", rate: "40" },
        { blockId: "5", blockName: "Ships (a) 20%", rate: "20" },
        { blockId: "6", blockName: "Total deemed capital gains", rate: "total" },
      ],
      grandTotal: "0",
    },
    mode: "onChange",
  });

  const formData = watch();

  const capitalGainsSummary = useMemo(() => {
    const buckets: Record<string, number[]> = {
      "15": [],
      "30": [],
      "40": [],
      "45": [],
    };

    formData.assets?.forEach((asset) => {
      if (!asset) return;
      const rawDep = typeof asset.depreciation === "string" ? asset.depreciation.replace(/[,\s]/g, "") : asset.depreciation;
      const dep = rawDep ? parseFloat(String(rawDep)) : 0;
      if (!dep || dep <= 0) return;

      const rateStr = asset.rate ? String(asset.rate).replace(/[^0-9.]/g, "") : "";
      const rateNum = rateStr ? parseFloat(rateStr) : NaN;

      if (!isNaN(rateNum)) {
        const rounded = Math.round(rateNum);
        if (rounded === 15) buckets["15"].push(dep);
        else if (rounded === 30) buckets["30"].push(dep);
        else if (rounded === 40) buckets["40"].push(dep);
        else if (rounded === 45) buckets["45"].push(dep);
      }
    });

    const r15Sum = buckets["15"].reduce((a, b) => a + b, 0);
    const r30Sum = buckets["30"].reduce((a, b) => a + b, 0);
    const r40Sum = buckets["40"].reduce((a, b) => a + b, 0);
    const r45Sum = buckets["45"].reduce((a, b) => a + b, 0);

    return {
      rate15: r15Sum,
      rate30: r30Sum,
      rate40: r40Sum,
      rate45: r45Sum,
      total: r15Sum + r30Sum + r40Sum + r45Sum,
    };
  }, [formData.assets]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="space-y-2 border-b-2 border-purple-500 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule DCG - Deemed Capital Gains on Sale of Depreciable Assets
        </h2>
        <p className="text-sm text-gray-600">
          Deemed Capital Gains on sale of depreciable assets as per section 50
        </p>
      </div>

      {hasErrors && (
        <div className="space-y-2 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="font-semibold text-red-900">Validation Errors:</p>
          <ul className="space-y-1 text-sm text-red-800">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>
                • {field}: {error?.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit((data) => {
        onSave(data);
        onNext();
      })} className="space-y-6">
        {/* Auto Calculate Button */}
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => {
              const newAssets = formData.assets?.map((asset) => ({
                ...asset,
                depreciation: asset.blockId === "1" ? "50000" : asset.blockId === "2" ? "25000" : asset.blockId === "3" ? "15000" : asset.blockId === "4" ? "75000" : asset.blockId === "5" ? "40000" : asset.depreciation,
              })) || [];
              newAssets.forEach((_, idx) => {
                const value = newAssets[idx].depreciation || "";
                setValue(`assets.${idx}.depreciation` as any, value, { shouldValidate: true });
              });
            }}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            title="Auto-calculate sample deemed capital gains"
          >
            🧮 Auto Calculate
          </button>
          <span className="text-sm text-gray-500">Fill with sample values for testing</span>
        </div>

        {/* Summary Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-purple-100">
              <tr>
                <th className="border border-gray-300 bg-purple-200 px-3 py-2 text-left font-semibold text-gray-800">
                  Asset Category
                </th>
                <th className="border border-gray-300 bg-purple-200 px-3 py-2 text-left font-semibold text-gray-800">
                  Rate %
                </th>
                <th className="border border-gray-300 bg-purple-200 px-3 py-2 text-right font-semibold text-gray-800">
                  Deemed Capital Gains
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.assets?.map((asset, idx) => (
                <tr key={asset.blockId} className="hover:bg-purple-50">
                  <td className="border border-gray-300 px-3 py-2 text-gray-700">
                    {asset.blockName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-gray-600">
                    {asset.rate}%
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={asset.depreciation || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValue(`assets.${idx}.depreciation` as any, val, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-purple-500 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-purple-300 bg-purple-50 p-4">
            <p className="text-sm text-gray-600">@ 15% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-purple-700">
              ₹{capitalGainsSummary.rate15.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-lg border border-purple-300 bg-purple-50 p-4">
            <p className="text-sm text-gray-600">@ 30% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-purple-700">
              ₹{capitalGainsSummary.rate30.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-lg border border-purple-300 bg-purple-50 p-4">
            <p className="text-sm text-gray-600">@ 40% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-purple-700">
              ₹{capitalGainsSummary.rate40.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-lg border border-purple-300 bg-purple-50 p-4">
            <p className="text-sm text-gray-600">@ 45% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-purple-700">
              ₹{capitalGainsSummary.rate45.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Grand Total */}
        <div className="rounded-lg border-2 border-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">Total Deemed Capital Gains</p>
            <p className="text-3xl font-bold text-purple-700">
              ₹{capitalGainsSummary.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 border-t border-gray-200 pt-6">
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

export default ItrThreeScheduleDCG;
