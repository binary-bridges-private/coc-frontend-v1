import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface IncomeSourceDetail {
  receiptsFromMainObjects: string;
  receiptsFromIncidentalObjects: string;
  rent: string;
  commission: string;
  dividendIncome: string;
  interestIncome: string;
  agricultureIncome: string;
  netConsiderationTransferCapitalAsset: string;
  otherIncomeNatureAmount: string;
  passThroughIncomeLossr: string;
  passThroughIncomeNature: string;
  passThroughIncomeAmount: string;
  totalRowNine: string;
  totalAllIncome: string;
}

export interface ItrFiveScheduleAIFormData {
  incomeSourceDetails?: IncomeSourceDetail;
}

// Zod validation schema
const incomeSourceDetailSchema = z.object({
  receiptsFromMainObjects: z.string().optional(),
  receiptsFromIncidentalObjects: z.string().optional(),
  rent: z.string().optional(),
  commission: z.string().optional(),
  dividendIncome: z.string().optional(),
  interestIncome: z.string().optional(),
  agricultureIncome: z.string().optional(),
  netConsiderationTransferCapitalAsset: z.string().optional(),
  otherIncomeNatureAmount: z.string().optional(),
  passThroughIncomeLossr: z.string().optional(),
  passThroughIncomeNature: z.string().optional(),
  passThroughIncomeAmount: z.string().optional(),
  totalRowNine: z.string().optional(),
  totalAllIncome: z.string().optional(),
});

const itrFiveScheduleAISchema = z.object({
  incomeSourceDetails: incomeSourceDetailSchema.optional(),
});

type ItrFiveScheduleAIFormType = z.infer<typeof itrFiveScheduleAISchema>;

interface ItrFiveScheduleAIProps {
  initialData?: ItrFiveScheduleAIFormData;
  onSave: (data: ItrFiveScheduleAIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleAI: React.FC<ItrFiveScheduleAIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleAIFormType>({
    resolver: zodResolver(itrFiveScheduleAISchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<IncomeSourceDetail>(
    initialData?.incomeSourceDetails || {
      receiptsFromMainObjects: "",
      receiptsFromIncidentalObjects: "",
      rent: "",
      commission: "",
      dividendIncome: "",
      interestIncome: "",
      agricultureIncome: "",
      netConsiderationTransferCapitalAsset: "",
      otherIncomeNatureAmount: "",
      passThroughIncomeLossr: "",
      passThroughIncomeNature: "",
      passThroughIncomeAmount: "",
      totalRowNine: "",
      totalAllIncome: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleAIFormType) => {
    onSave({
      incomeSourceDetails: details,
    });
  };

  const updateDetail = (field: keyof IncomeSourceDetail, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const parseNumber = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/,/g, "")) || 0;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  // Calculate totals
  const totalMainIncome =
    parseNumber(details.receiptsFromMainObjects) +
    parseNumber(details.receiptsFromIncidentalObjects) +
    parseNumber(details.rent) +
    parseNumber(details.commission) +
    parseNumber(details.dividendIncome) +
    parseNumber(details.interestIncome) +
    parseNumber(details.agricultureIncome) +
    parseNumber(details.netConsiderationTransferCapitalAsset);

  const totalWithPassThrough =
    totalMainIncome +
    parseNumber(details.passThroughIncomeAmount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Schedule AI - Aggregate of Income
          </h1>
          <p className="text-indigo-700">
            Aggregate of income derived during the previous year excluding Voluntary contributions
          </p>
          <p className="text-xs text-indigo-600 mt-2">
            (For assessees claiming exemption u/s 11 and 12 or u/s 10(23C)(vi) or 10(23C)(vii) or 10(23C)(viii) or 10(23C)(ixd))
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-indigo-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-indigo-800 space-y-1 list-disc pl-5">
            <li>Report all income derived from various sources during the financial year</li>
            <li>Exclude voluntary contributions received</li>
            <li>Include pass-through income separately with nature specification</li>
            <li>All figures should be in Indian Rupees</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Income Sources */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <h2 className="text-xl font-bold text-indigo-900 mb-6">
              Aggregate of Income Derived During Previous Year
            </h2>

            <div className="space-y-4">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    1. Receipts from main objects
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.receiptsFromMainObjects}
                    onChange={(e) =>
                      updateDetail("receiptsFromMainObjects", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">1</p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    2. Receipts from incidental objects
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.receiptsFromIncidentalObjects}
                    onChange={(e) =>
                      updateDetail("receiptsFromIncidentalObjects", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">2</p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    3. Rent
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.rent}
                    onChange={(e) => updateDetail("rent", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">3</p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    4. Commission
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.commission}
                    onChange={(e) => updateDetail("commission", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">4</p>
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    5. Dividend income
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.dividendIncome}
                    onChange={(e) =>
                      updateDetail("dividendIncome", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">5</p>
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    6. Interest income
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.interestIncome}
                    onChange={(e) =>
                      updateDetail("interestIncome", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">6</p>
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    7. Agriculture income
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.agricultureIncome}
                    onChange={(e) =>
                      updateDetail("agricultureIncome", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">7</p>
                </div>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    8. Net consideration on transfer of capital asset
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.netConsiderationTransferCapitalAsset}
                    onChange={(e) =>
                      updateDetail("netConsiderationTransferCapitalAsset", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">8</p>
                </div>
              </div>

              {/* Row 9a */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    9. Any other income (specify nature and amount)
                  </label>
                  <p className="text-xs text-gray-500">Nature</p>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.otherIncomeNatureAmount}
                    onChange={(e) =>
                      updateDetail("otherIncomeNatureAmount", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Amount</p>
                </div>
              </div>

              {/* Row 9b - Pass through income */}
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-indigo-800 mb-4">
                  Pass Through Income (Loss) (Fill Schedule P11)
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        a. Loss if any from Pass Through Income
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={details.passThroughIncomeLossr}
                        onChange={(e) =>
                          updateDetail("passThroughIncomeLossr", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                      />
                      <p className="text-xs text-gray-500 mt-1">9a</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        b. Nature of Pass Through Income
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={details.passThroughIncomeNature}
                        onChange={(e) =>
                          updateDetail("passThroughIncomeNature", e.target.value)
                        }
                        placeholder="Specify"
                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-1">9b</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        c. Amount
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={details.passThroughIncomeAmount}
                        onChange={(e) =>
                          updateDetail("passThroughIncomeAmount", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-right"
                      />
                      <p className="text-xs text-gray-500 mt-1">9c</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-indigo-900 mb-6">
              Summary Totals
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b-2 border-indigo-300">
                <span className="font-semibold text-indigo-800">
                  9e. Total (9a - 9b + 9c - 9d)
                </span>
                <span className="font-bold text-lg text-indigo-900">
                  ₹ {formatNumber(totalMainIncome)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 pb-3 border-b-2 border-blue-300 bg-blue-50 p-4 rounded">
                <span className="font-bold text-lg text-indigo-900">
                  10. Total (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9)
                </span>
                <span className="font-bold text-2xl text-blue-900">
                  ₹ {formatNumber(totalWithPassThrough)}
                </span>
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

export default ItrFiveScheduleAI;
