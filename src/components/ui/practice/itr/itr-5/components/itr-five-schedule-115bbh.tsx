import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface SpecifiedIncomeDetail {
  slNo: string;
  particulars: string;
  totalOfColSchedule: string;
  amount: string;
}

export interface ItrFiveSchedule115BBHFormData {
  specifiedIncomeDetails?: SpecifiedIncomeDetail[];
  incomeReferredExplanation1?: string;
  incomeReferredExplanation1b?: string;
  incomeReferredExplanation1c?: string;
  incomeReferredExplanation1d?: string;
  incomeReferredExplanation2?: string;
  incomeReferredExplanation3?: string;
  incomeReferredExplanation4?: string;
  incomeReferredExplanation5?: string;
  incomeReferredExplanation6?: string;
  totalIncomeAll?: string;
}

// Zod validation schema
const specifiedIncomeSchema = z.object({
  slNo: z.string().optional(),
  particulars: z.string().optional(),
  totalOfColSchedule: z.string().optional(),
  amount: z.string().optional(),
});

const itrFiveSchedule115BBHSchema = z.object({
  specifiedIncomeDetails: z.array(specifiedIncomeSchema).optional(),
  incomeReferredExplanation1: z.string().optional(),
  incomeReferredExplanation1b: z.string().optional(),
  incomeReferredExplanation1c: z.string().optional(),
  incomeReferredExplanation1d: z.string().optional(),
  incomeReferredExplanation2: z.string().optional(),
  incomeReferredExplanation3: z.string().optional(),
  incomeReferredExplanation4: z.string().optional(),
  incomeReferredExplanation5: z.string().optional(),
  incomeReferredExplanation6: z.string().optional(),
  totalIncomeAll: z.string().optional(),
});

type ItrFiveSchedule115BBHFormType = z.infer<typeof itrFiveSchedule115BBHSchema>;

interface ItrFiveSchedule115BBHProps {
  initialData?: ItrFiveSchedule115BBHFormData;
  onSave: (data: ItrFiveSchedule115BBHFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveSchedule115BBH: React.FC<ItrFiveSchedule115BBHProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveSchedule115BBHFormType>({
    resolver: zodResolver(itrFiveSchedule115BBHSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [formValues, setFormValues] = useState({
    incomeReferredExplanation1: initialData?.incomeReferredExplanation1 || "",
    incomeReferredExplanation1b: initialData?.incomeReferredExplanation1b || "",
    incomeReferredExplanation1c: initialData?.incomeReferredExplanation1c || "",
    incomeReferredExplanation1d: initialData?.incomeReferredExplanation1d || "",
    incomeReferredExplanation2: initialData?.incomeReferredExplanation2 || "",
    incomeReferredExplanation3: initialData?.incomeReferredExplanation3 || "",
    incomeReferredExplanation4: initialData?.incomeReferredExplanation4 || "",
    incomeReferredExplanation5: initialData?.incomeReferredExplanation5 || "",
    incomeReferredExplanation6: initialData?.incomeReferredExplanation6 || "",
    totalIncomeAll: initialData?.totalIncomeAll || "",
  });

  const onSubmit = (data: ItrFiveSchedule115BBHFormType) => {
    onSave(formValues);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">
            Schedule 115BBH - Specified Income of Certain Institutions
          </h1>
          <p className="text-emerald-700">
            Details of specified income of certain institutions under section 115BBH
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-emerald-100 border-l-4 border-emerald-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-emerald-900">
            <strong>Important:</strong> This schedule captures specified income of certain institutions 
            including income referred in various explanations to section 115BBH that is not excluded from total income.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Income Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-600">
            <h2 className="text-lg font-bold text-emerald-900 mb-6">
              Specified Income Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  1. Income referred in Explanation 1 to the third proviso to section 115(3C) or section 11(3)
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation1}
                  onChange={(e) => handleInputChange("incomeReferredExplanation1", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  1b. Exemption referred to in Explanation 1 to the third proviso to section 115(2C)
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation1b}
                  onChange={(e) => handleInputChange("incomeReferredExplanation1b", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  1c. Income which is deemed to be income under the treaty-first proviso to section 115(2C) on excluded from the income
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation1c}
                  onChange={(e) => handleInputChange("incomeReferredExplanation1c", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  1d. Income which is not excluded from the total income as per section 115(3C)
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation1d}
                  onChange={(e) => handleInputChange("incomeReferredExplanation1d", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  2. Income accumulated or set apart in excess of forty per cent of the income
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation2}
                  onChange={(e) => handleInputChange("incomeReferredExplanation2", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  3. Income where accumulation is not allowed under any specific provision of the Act
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation3}
                  onChange={(e) => handleInputChange("incomeReferredExplanation3", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  4. Income from other sources taxable at special rates in India
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation4}
                  onChange={(e) => handleInputChange("incomeReferredExplanation4", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  5. Income from other sources chargeable at special rates in India
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation5}
                  onChange={(e) => handleInputChange("incomeReferredExplanation5", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-emerald-800">
                  6. Income from other sources chargeable at special rates in India as per DTAA
                </span>
                <input
                  type="text"
                  value={formValues.incomeReferredExplanation6}
                  onChange={(e) => handleInputChange("incomeReferredExplanation6", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-emerald-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pt-3 bg-emerald-50 p-3 rounded border-2 border-emerald-300">
                <span className="font-bold text-lg text-emerald-900">7. Total (total of all No. 1 to 6)</span>
                <input
                  type="text"
                  value={formValues.totalIncomeAll}
                  onChange={(e) => handleInputChange("totalIncomeAll", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-emerald-600 rounded text-right font-bold"
                />
              </div>
            </div>
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
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveSchedule115BBH;
