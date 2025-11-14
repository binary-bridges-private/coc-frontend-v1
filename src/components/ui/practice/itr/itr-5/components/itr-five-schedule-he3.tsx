import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface IncomeExpenditureHE3Detail {
  objectiveOfInstitution: string;
  addressesWhereActivityCarried: string;
  totalReceiptsIncludingVoluntary: string;
  governmentGrants: string;
  amountAppliedObjective: string;
  balanceAccumulated: string;
}

export interface ItrFiveScheduleHE3FormData {
  incomeExpenditureHE3Details?: IncomeExpenditureHE3Detail;
}

// Zod validation schema
const incomeExpenditureHE3DetailSchema = z.object({
  objectiveOfInstitution: z.string().optional(),
  addressesWhereActivityCarried: z.string().optional(),
  totalReceiptsIncludingVoluntary: z.string().optional(),
  governmentGrants: z.string().optional(),
  amountAppliedObjective: z.string().optional(),
  balanceAccumulated: z.string().optional(),
});

const itrFiveScheduleHE3Schema = z.object({
  incomeExpenditureHE3Details: incomeExpenditureHE3DetailSchema.optional(),
});

type ItrFiveScheduleHE3FormType = z.infer<typeof itrFiveScheduleHE3Schema>;

interface ItrFiveScheduleHE3Props {
  initialData?: ItrFiveScheduleHE3FormData;
  onSave: (data: ItrFiveScheduleHE3FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleHE3: React.FC<ItrFiveScheduleHE3Props> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleHE3FormType>({
    resolver: zodResolver(itrFiveScheduleHE3Schema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<IncomeExpenditureHE3Detail>(
    initialData?.incomeExpenditureHE3Details || {
      objectiveOfInstitution: "",
      addressesWhereActivityCarried: "",
      totalReceiptsIncludingVoluntary: "",
      governmentGrants: "",
      amountAppliedObjective: "",
      balanceAccumulated: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleHE3FormType) => {
    onSave({
      incomeExpenditureHE3Details: details,
    });
  };

  const updateDetail = (field: keyof IncomeExpenditureHE3Detail, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-900 mb-2">
            Schedule HE-3 - Income & Expenditure Statement
          </h1>
          <p className="text-orange-700">
            Applicable for assessees claiming exemption under sections 10(23C)(iiiad), 10(23C)(iv), 10(23C)(v), 10(23C)(vi), 10(23C)(vii), 10(23C)(viii)
          </p>
          <p className="text-xs text-orange-600 mt-2">
            (Subject to total receipts from all institutions/universities not exceeding fifty per cent of the total receipts)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-orange-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-orange-800 space-y-1 list-disc pl-5">
            <li>Report objective of the institution</li>
            <li>List all addresses where activities are carried out</li>
            <li>Include total receipts with voluntary contributions</li>
            <li>Specify government grants separately</li>
            <li>Show accumulated balances</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Institution Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
            <h2 className="text-xl font-bold text-orange-900 mb-6">
              Institution Details
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
                  className="w-full px-3 py-2 border border-orange-300 rounded-lg"
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
                  className="w-full px-3 py-2 border border-orange-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">2</p>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-xl font-bold text-orange-900 mb-6">
              3. Gross annual receipts (Sum of Sl. No. 3)
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total receipts including any voluntary contribution
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.totalReceiptsIncludingVoluntary}
                    onChange={(e) =>
                      updateDetail("totalReceiptsIncludingVoluntary", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">3</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    4. Government Grants
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.governmentGrants}
                    onChange={(e) =>
                      updateDetail("governmentGrants", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">4</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    5. Amount applied for objective
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
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">5</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    6. Balance accumulated
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
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">6</p>
                </div>
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
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleHE3;
