import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface IncomeExpenditureDetail {
  totalReceiptsExcludingVoluntary: string;
  applicationTowardObjectives: string;
  accumulationOfIncome: string;
  anyIncomeViolable: string;
  incomeFromHouseProperty: string;
  incomeFromBusinessProfession: string;
  incomeFromCapitalGains: string;
  incomeFromOtherSources: string;
}

export interface ItrFiveScheduleHE1FormData {
  incomeExpenditureDetails?: IncomeExpenditureDetail;
}

// Zod validation schema
const incomeExpenditureDetailSchema = z.object({
  totalReceiptsExcludingVoluntary: z.string().optional(),
  applicationTowardObjectives: z.string().optional(),
  accumulationOfIncome: z.string().optional(),
  anyIncomeViolable: z.string().optional(),
  incomeFromHouseProperty: z.string().optional(),
  incomeFromBusinessProfession: z.string().optional(),
  incomeFromCapitalGains: z.string().optional(),
  incomeFromOtherSources: z.string().optional(),
});

const itrFiveScheduleHE1Schema = z.object({
  incomeExpenditureDetails: incomeExpenditureDetailSchema.optional(),
});

type ItrFiveScheduleHE1FormType = z.infer<typeof itrFiveScheduleHE1Schema>;

interface ItrFiveScheduleHE1Props {
  initialData?: ItrFiveScheduleHE1FormData;
  onSave: (data: ItrFiveScheduleHE1FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleHE1: React.FC<ItrFiveScheduleHE1Props> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleHE1FormType>({
    resolver: zodResolver(itrFiveScheduleHE1Schema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<IncomeExpenditureDetail>(
    initialData?.incomeExpenditureDetails || {
      totalReceiptsExcludingVoluntary: "",
      applicationTowardObjectives: "",
      accumulationOfIncome: "",
      anyIncomeViolable: "",
      incomeFromHouseProperty: "",
      incomeFromBusinessProfession: "",
      incomeFromCapitalGains: "",
      incomeFromOtherSources: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleHE1FormType) => {
    onSave({
      incomeExpenditureDetails: details,
    });
  };

  const updateDetail = (field: keyof IncomeExpenditureDetail, value: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            Schedule HE-1 - Income & Expenditure Statement
          </h1>
          <p className="text-red-700">
            Applicable for assessees claiming exemption under sections 10(21), 10(22)(4), 10(23B), 10(23D)
          </p>
          <p className="text-xs text-red-600 mt-2">
            (Row A below are exempt)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-red-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-red-800 space-y-1 list-disc pl-5">
            <li>Report total receipts excluding voluntary contributions</li>
            <li>Show application towards stated objectives</li>
            <li>Specify any income that violates taxable provisions</li>
            <li>Break down income from various sources</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section A - Receipts */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-xl font-bold text-red-900 mb-6">
              A. Receipts excluding voluntary contribution
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    1. Total receipts (Excluding receipts falling under taxable leads to be reported as Row B)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.totalReceiptsExcludingVoluntary}
                    onChange={(e) =>
                      updateDetail("totalReceiptsExcludingVoluntary", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-red-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section B - Application & Accumulation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-rose-600">
            <h2 className="text-xl font-bold text-red-900 mb-6">
              B. Application of Income
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    2. Application of income towards object of the institution
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.applicationTowardObjectives}
                    onChange={(e) =>
                      updateDetail("applicationTowardObjectives", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-rose-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">2</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    3. Accumulation of income
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.accumulationOfIncome}
                    onChange={(e) =>
                      updateDetail("accumulationOfIncome", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-rose-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section C - Income Violation Check */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-xl font-bold text-red-900 mb-6">
              C. Income Violating Tax Provisions
            </h2>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Do you have any income which is taxable? If Yes Please provide details (Tick as applicable)
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-2 hover:bg-white rounded">
                  <input
                    type="checkbox"
                    checked={details.anyIncomeViolable === "yes"}
                    onChange={(e) =>
                      updateDetail("anyIncomeViolable", e.target.checked ? "yes" : "")
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>

                <label className="flex items-center gap-3 p-2 hover:bg-white rounded">
                  <input
                    type="checkbox"
                    checked={details.anyIncomeViolable === "no"}
                    onChange={(e) =>
                      updateDetail("anyIncomeViolable", e.target.checked ? "no" : "")
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Income Sources */}
          {details.anyIncomeViolable === "yes" && (
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
              <h2 className="text-xl font-bold text-red-900 mb-6">
                Income Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      a. Income from House Property: (If yes, Please fill Schedule HP)
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={details.incomeFromHouseProperty}
                      onChange={(e) =>
                        updateDetail("incomeFromHouseProperty", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-red-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      b. Income from Business or Profession (If yes, Please fill Schedule BP)
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={details.incomeFromBusinessProfession}
                      onChange={(e) =>
                        updateDetail("incomeFromBusinessProfession", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-red-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">b</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      c. Income from Capital gains (If yes, Please fill Schedule CG)
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={details.incomeFromCapitalGains}
                      onChange={(e) =>
                        updateDetail("incomeFromCapitalGains", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-red-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">c</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      d. Income from other Sources (If yes, Please fill Schedule OS)
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={details.incomeFromOtherSources}
                      onChange={(e) =>
                        updateDetail("incomeFromOtherSources", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-red-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">d</p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleHE1;
