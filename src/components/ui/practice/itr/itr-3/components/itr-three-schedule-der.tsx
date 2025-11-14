import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Asset Row Interface for DER
export interface DERAssetRow {
  blockId: string;
  blockName?: string;
  rate?: string;
  depreciation?: string;
  reference?: string;
}

// DER Form Data Interface
export interface ScheduleDERFormData {
  assets: DERAssetRow[];
  rate15Total?: string;
  rate30Total?: string;
  rate40Total?: string;
  rate45Total?: string;
  grandTotal?: string;
}

// Zod Schema for DER Asset Row
const derAssetRowSchema = z.object({
  blockId: z.string().min(1, "Asset block ID required"),
  blockName: z.string().optional(),
  rate: z.string().optional(),
  depreciation: z.string().optional(),
  reference: z.string().optional(),
});

// Zod Schema for Schedule DER
const scheduleDERSchema = z.object({
  assets: z.array(derAssetRowSchema).min(1, "At least one asset block required"),
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

  console.log("DER Depreciation Summary:", {
    rate15: rate15Sum,
    rate30: rate30Sum,
    rate40: rate40Sum,
    rate45: rate45Sum,
    total: grandTotal,
  });
});

interface ScheduleDERProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: ScheduleDERFormData) => void;
  initialData?: ScheduleDERFormData;
}

const ItrThreeScheduleDER: React.FC<ScheduleDERProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const { watch, handleSubmit, formState: { errors }, control, setValue } = useForm<ScheduleDERFormData>({
    resolver: zodResolver(scheduleDERSchema),
    defaultValues: initialData || {
      assets: [
        { blockId: "1", blockName: "Plant and machinery (a) 15%", rate: "15" },
        { blockId: "2", blockName: "Building (a) 5%", rate: "5" },
        { blockId: "3", blockName: "Furniture and fittings (a) 10%", rate: "10" },
        { blockId: "4", blockName: "Intangibles (a) 40%", rate: "40" },
        { blockId: "5", blockName: "Ships (a) 20%", rate: "20" },
        { blockId: "6", blockName: "Total depreciation", rate: "total" },
      ],
      grandTotal: "0",
    },
    mode: "onChange",
  });

  const formData = watch();

  const depreciateSummary = useMemo(() => {
    const buckets: Record<string, number[]> = {
      "15": [],
      "30": [],
      "40": [],
      "45": [],
    };

    formData.assets?.forEach((asset) => {
      if (!asset) return;
      // Normalize depreciation value: remove commas and spaces
      const rawDep = typeof asset.depreciation === "string" ? asset.depreciation.replace(/[,\s]/g, "") : asset.depreciation;
      const dep = rawDep ? parseFloat(String(rawDep)) : 0;
      if (!dep || dep <= 0) return;

      // Parse numeric rate (handle values like "15", "15%", or "15.0")
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
      <div className="space-y-2 border-b-2 border-cyan-500 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule DER - Summary of Depreciation on Other Assets
        </h2>
        <p className="text-sm text-gray-600">
          Summary of depreciation on assets (other than assets on which full capital expenditure is allowable as deduction under any other section)
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
            title="Auto-calculate sample depreciation"
          >
            🧮 Auto Calculate
          </button>
          <span className="text-sm text-gray-500">Fill with sample values for testing</span>
        </div>

        {/* Summary Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-cyan-100">
              <tr>
                <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                  Asset Category
                </th>
                <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-left font-semibold text-gray-800">
                  Rate %
                </th>
                <th className="border border-gray-300 bg-cyan-200 px-3 py-2 text-right font-semibold text-gray-800">
                  Depreciation Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.assets?.map((asset, idx) => (
                <tr key={asset.blockId} className="hover:bg-cyan-50">
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
                      className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-cyan-500 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-cyan-300 bg-cyan-50 p-4">
            <p className="text-sm text-gray-600">@ 15% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-cyan-700">
              ₹{depreciateSummary.rate15.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-lg border border-cyan-300 bg-cyan-50 p-4">
            <p className="text-sm text-gray-600">@ 30% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-cyan-700">
              ₹{depreciateSummary.rate30.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-lg border border-cyan-300 bg-cyan-50 p-4">
            <p className="text-sm text-gray-600">@ 40% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-cyan-700">
              ₹{depreciateSummary.rate40.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-lg border border-cyan-300 bg-cyan-50 p-4">
            <p className="text-sm text-gray-600">@ 45% Depreciation</p>
            <p className="mt-2 text-2xl font-bold text-cyan-700">
              ₹{depreciateSummary.rate45.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Grand Total */}
        <div className="rounded-lg border-2 border-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">Total Depreciation</p>
            <p className="text-3xl font-bold text-cyan-700">
              ₹{depreciateSummary.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
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
            className="flex-1 rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-700 disabled:bg-gray-400"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreeScheduleDER;
