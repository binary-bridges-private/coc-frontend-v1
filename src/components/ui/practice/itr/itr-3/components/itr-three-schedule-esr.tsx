import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Scientific Research Row Interface
export interface ScientificResearchRow {
  id: string;
  section?: string;
  nature?: string;
  amountInProfit?: string;
  deductionAllowable?: string;
  deductionExcess?: string;
}

// ESR Form Data Interface
export interface ScheduleESRFormData {
  research: ScientificResearchRow[];
  section351i?: string;
  section351ii?: string;
  section351iia?: string;
  section351iii?: string;
  section351iv?: string;
  section352aa?: string;
  section352ab?: string;
  section35ccc?: string;
  section35ccd?: string;
  totalDeduction?: string;
}

// Zod Schema for Research Row
const researchRowSchema = z.object({
  id: z.string().min(1, "Row ID required"),
  section: z.string().optional(),
  nature: z.string().optional(),
  amountInProfit: z.string().optional(),
  deductionAllowable: z.string().optional(),
  deductionExcess: z.string().optional(),
});

// Zod Schema for Schedule ESR
const scheduleESRSchema = z.object({
  research: z.array(researchRowSchema).min(1, "At least one research entry required"),
  section351i: z.string().optional(),
  section351ii: z.string().optional(),
  section351iia: z.string().optional(),
  section351iii: z.string().optional(),
  section351iv: z.string().optional(),
  section352aa: z.string().optional(),
  section352ab: z.string().optional(),
  section35ccc: z.string().optional(),
  section35ccd: z.string().optional(),
  totalDeduction: z.string().optional(),
}).superRefine((data, ctx) => {
  // Validate amounts
  const sections = [
    data.section351i,
    data.section351ii,
    data.section351iia,
    data.section351iii,
    data.section351iv,
    data.section352aa,
    data.section352ab,
    data.section35ccc,
    data.section35ccd,
  ];

  sections.forEach((section) => {
    if (section) {
      const val = parseFloat(section);
      if (isNaN(val) || val < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Amount must be a valid non-negative number",
        });
      }
    }
  });

  // Calculate total
  const total = sections
    .filter((s) => s)
    .reduce((sum, s) => sum + parseFloat(s || "0"), 0);

  console.log("ESR Scientific Research Summary:", {
    section351i: parseFloat(data.section351i || "0"),
    section351ii: parseFloat(data.section351ii || "0"),
    section351iia: parseFloat(data.section351iia || "0"),
    section351iii: parseFloat(data.section351iii || "0"),
    section351iv: parseFloat(data.section351iv || "0"),
    section352aa: parseFloat(data.section352aa || "0"),
    section352ab: parseFloat(data.section352ab || "0"),
    section35ccc: parseFloat(data.section35ccc || "0"),
    section35ccd: parseFloat(data.section35ccd || "0"),
    total,
  });
});

interface ScheduleESRProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: ScheduleESRFormData) => void;
  initialData?: ScheduleESRFormData;
}

const ItrThreeScheduleESR: React.FC<ScheduleESRProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const { watch, handleSubmit, formState: { errors }, register } = useForm<ScheduleESRFormData>({
    resolver: zodResolver(scheduleESRSchema),
    defaultValues: initialData || {
      research: [
        { id: "1", section: "35(1)(i)", nature: "" },
        { id: "2", section: "35(1)(ii)", nature: "" },
        { id: "3", section: "35(1)(iia)", nature: "" },
        { id: "4", section: "35(1)(iii)", nature: "" },
        { id: "5", section: "35(1)(iv)", nature: "" },
        { id: "6", section: "35(2AA)", nature: "" },
        { id: "7", section: "35(2AB)", nature: "" },
        { id: "8", section: "35CCC", nature: "" },
        { id: "9", section: "35CCD", nature: "" },
      ],
      totalDeduction: "0",
    },
    mode: "onChange",
  });

  const formData = watch();

  const researchSummary = useMemo(() => {
    const amounts = [
      parseFloat(formData.section351i || "0"),
      parseFloat(formData.section351ii || "0"),
      parseFloat(formData.section351iia || "0"),
      parseFloat(formData.section351iii || "0"),
      parseFloat(formData.section351iv || "0"),
      parseFloat(formData.section352aa || "0"),
      parseFloat(formData.section352ab || "0"),
      parseFloat(formData.section35ccc || "0"),
      parseFloat(formData.section35ccd || "0"),
    ];

    const total = amounts.reduce((sum, amt) => sum + amt, 0);

    return {
      section351i: amounts[0],
      section351ii: amounts[1],
      section351iia: amounts[2],
      section351iii: amounts[3],
      section351iv: amounts[4],
      section352aa: amounts[5],
      section352ab: amounts[6],
      section35ccc: amounts[7],
      section35ccd: amounts[8],
      total,
    };
  }, [formData]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="space-y-2 border-b-2 border-orange-500 pb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule ESR - Expenditure on Scientific Research
        </h2>
        <p className="text-sm text-gray-600">
          Deduction under section 35, 35CCC or 35CCD for expenditure on scientific research
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

      <form
        onSubmit={handleSubmit((data) => {
          onSave(data);
          onNext();
        })}
        className="space-y-6"
      >
        {/* Research Expenditure Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-orange-100">
              <tr>
                <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-left font-semibold text-gray-800">
                  Section
                </th>
                <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-left font-semibold text-gray-800">
                  Nature of Expenditure
                </th>
                <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-right font-semibold text-gray-800">
                  Amount (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(1)(i)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  In-house research
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section351i")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(1)(ii)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Approved scientific research
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section351ii")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(1)(iia)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Research approved by specified authority
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section351iia")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(1)(iii)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Approved university research
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section351iii")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(1)(iv)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Approved research institute
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section351iv")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(2AA)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Specified scheme expenditure
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section352aa")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35(2AB)
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Other approved research
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section352ab")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35CCC
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Housing project deduction
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section35ccc")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>

              <tr className="hover:bg-orange-50">
                <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
                  35CCD
                </td>
                <td className="border border-gray-300 px-3 py-2 text-gray-600">
                  Infrastructure deduction
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("section35ccd")}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-right focus:border-orange-500 focus:outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="space-y-3 rounded-lg border-2 border-orange-300 bg-orange-50 p-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-700">35(1)(i)</p>
              <p className="text-lg font-bold text-orange-700">
                ₹{researchSummary.section351i.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">35(1)(ii)</p>
              <p className="text-lg font-bold text-orange-700">
                ₹{researchSummary.section351ii.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">35(1)(iia)</p>
              <p className="text-lg font-bold text-orange-700">
                ₹{researchSummary.section351iia.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Grand Total */}
        <div className="rounded-lg border-2 border-orange-600 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">Total Scientific Research Deduction</p>
            <p className="text-3xl font-bold text-orange-700">
              ₹{researchSummary.total.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
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
            className="flex-1 rounded-lg bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700 disabled:bg-gray-400"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreeScheduleESR;
