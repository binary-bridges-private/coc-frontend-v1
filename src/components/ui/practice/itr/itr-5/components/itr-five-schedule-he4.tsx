import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface IncomeExpenditureHE4Detail {
  objectiveOfInstitution: string;
  addressesWhereActivityCarried: string;
  grossAnnualReceipts: string;
  amountAppliedObjective: string;
  balanceAccumulated: string;
  addRowOption: string;
}

export interface ItrFiveScheduleHE4FormData {
  incomeExpenditureHE4Details?: IncomeExpenditureHE4Detail;
}

// Zod validation schema
const incomeExpenditureHE4DetailSchema = z.object({
  objectiveOfInstitution: z.string().optional(),
  addressesWhereActivityCarried: z.string().optional(),
  grossAnnualReceipts: z.string().optional(),
  amountAppliedObjective: z.string().optional(),
  balanceAccumulated: z.string().optional(),
  addRowOption: z.string().optional(),
});

const itrFiveScheduleHE4Schema = z.object({
  incomeExpenditureHE4Details: incomeExpenditureHE4DetailSchema.optional(),
});

type ItrFiveScheduleHE4FormType = z.infer<typeof itrFiveScheduleHE4Schema>;

interface ItrFiveScheduleHE4Props {
  initialData?: ItrFiveScheduleHE4FormData;
  onSave: (data: ItrFiveScheduleHE4FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleHE4: React.FC<ItrFiveScheduleHE4Props> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleHE4FormType>({
    resolver: zodResolver(itrFiveScheduleHE4Schema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<IncomeExpenditureHE4Detail>(
    initialData?.incomeExpenditureHE4Details || {
      objectiveOfInstitution: "",
      addressesWhereActivityCarried: "",
      grossAnnualReceipts: "",
      amountAppliedObjective: "",
      balanceAccumulated: "",
      addRowOption: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleHE4FormType) => {
    onSave({
      incomeExpenditureHE4Details: details,
    });
  };

  const updateDetail = (field: keyof IncomeExpenditureHE4Detail, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Schedule HE-4 - Income & Expenditure Statement
          </h1>
          <p className="text-green-700">
            Applicable for assessees claiming exemption under sections 10(23C)(iiiad) or 10(23C)(iv) or 10(23C)(v)
          </p>
          <p className="text-xs text-green-600 mt-2">
            (Other than funds subject to total receipts from all institutions/universities not exceeding fifty per cent of the total receipts)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-green-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-green-800 space-y-1 list-disc pl-5">
            <li>Provide institution objective and activity locations</li>
            <li>Report gross annual receipts with voluntary contributions</li>
            <li>Show amount applied for charitable objectives</li>
            <li>Add row option to be provided for Sl. No. 1 to 5 above</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Institution Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <h2 className="text-xl font-bold text-green-900 mb-6">
              Institution Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. Objective of the institution (Days don to be provided - Educational / Medical)
                </label>
                <input
                  type="text"
                  value={details.objectiveOfInstitution}
                  onChange={(e) =>
                    updateDetail("objectiveOfInstitution", e.target.value)
                  }
                  placeholder="e.g., Educational, Medical"
                  className="w-full px-3 py-2 border border-green-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">1</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Addresses where activity is carrying out
                </label>
                <textarea
                  value={details.addressesWhereActivityCarried}
                  onChange={(e) =>
                    updateDetail("addressesWhereActivityCarried", e.target.value)
                  }
                  placeholder="Enter addresses separated by commas"
                  rows={3}
                  className="w-full px-3 py-2 border border-green-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">2</p>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-lime-600">
            <h2 className="text-xl font-bold text-green-900 mb-6">
              Financial Information
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    3. Gross annual receipts
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.grossAnnualReceipts}
                    onChange={(e) =>
                      updateDetail("grossAnnualReceipts", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-lime-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">3</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    4. Amount applied for objective
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.amountAppliedObjective}
                    onChange={(e) =>
                      updateDetail("amountAppliedObjective", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-lime-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">4</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    5. Balance accumulated
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.balanceAccumulated}
                    onChange={(e) =>
                      updateDetail("balanceAccumulated", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-lime-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">5</p>
                </div>
              </div>

              <div className="bg-lime-50 p-4 rounded-lg border border-lime-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  (Add row option to be provided for Sl. No. 1 to 5 above)
                </label>
                <input
                  type="text"
                  value={details.addRowOption}
                  onChange={(e) =>
                    updateDetail("addRowOption", e.target.value)
                  }
                  placeholder="Enter additional row information if applicable"
                  className="w-full px-3 py-2 border border-lime-300 rounded-lg"
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
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleHE4;
