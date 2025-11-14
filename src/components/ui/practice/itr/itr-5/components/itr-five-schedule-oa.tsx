import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface BusinessProfessionDetail {
  natureOfBusinessProfession: string;
  numberOfBranches: string;
  methodOfAccounting: string;
  methodOfAccountingOther: string;
  changeInMethodOfAccounting: string;
  effectOnProfitDeviation: string;
  deviationReason: string;
  methodOfValuationClosingStock: string;
  rawMaterialRawValue: string;
  rawMaterialWriteIf: string;
  finishedGoodsValue: string;
  finishedGoodsWriteIf: string;
  changeInStockValuationMethod: string;
  effectOnProfitLossDeviation: string;
  deviationReasonValuation: string;
}

export interface ItrFiveScheduleOAFormData {
  businessProfessionDetails?: BusinessProfessionDetail;
  hasIncomeUnderBusinessProfession?: string;
  followingDetails?: string;
}

// Zod validation schema
const businessProfessionDetailSchema = z.object({
  natureOfBusinessProfession: z.string().optional(),
  numberOfBranches: z.string().optional(),
  methodOfAccounting: z.string().optional(),
  methodOfAccountingOther: z.string().optional(),
  changeInMethodOfAccounting: z.string().optional(),
  effectOnProfitDeviation: z.string().optional(),
  deviationReason: z.string().optional(),
  methodOfValuationClosingStock: z.string().optional(),
  rawMaterialRawValue: z.string().optional(),
  rawMaterialWriteIf: z.string().optional(),
  finishedGoodsValue: z.string().optional(),
  finishedGoodsWriteIf: z.string().optional(),
  changeInStockValuationMethod: z.string().optional(),
  effectOnProfitLossDeviation: z.string().optional(),
  deviationReasonValuation: z.string().optional(),
});

const itrFiveScheduleOASchema = z.object({
  businessProfessionDetails: businessProfessionDetailSchema.optional(),
  hasIncomeUnderBusinessProfession: z.string().optional(),
  followingDetails: z.string().optional(),
});

type ItrFiveScheduleOAFormType = z.infer<typeof itrFiveScheduleOASchema>;

interface ItrFiveScheduleOAProps {
  initialData?: ItrFiveScheduleOAFormData;
  onSave: (data: ItrFiveScheduleOAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleOA: React.FC<ItrFiveScheduleOAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleOAFormType>({
    resolver: zodResolver(itrFiveScheduleOASchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [businessDetails, setBusinessDetails] = useState<BusinessProfessionDetail>(
    initialData?.businessProfessionDetails || {
      natureOfBusinessProfession: "",
      numberOfBranches: "",
      methodOfAccounting: "",
      methodOfAccountingOther: "",
      changeInMethodOfAccounting: "",
      effectOnProfitDeviation: "",
      deviationReason: "",
      methodOfValuationClosingStock: "",
      rawMaterialRawValue: "",
      rawMaterialWriteIf: "",
      finishedGoodsValue: "",
      finishedGoodsWriteIf: "",
      changeInStockValuationMethod: "",
      effectOnProfitLossDeviation: "",
      deviationReasonValuation: "",
    }
  );

  const [hasIncomeUnderBusinessProfession, setHasIncomeUnderBusinessProfession] = useState(
    initialData?.hasIncomeUnderBusinessProfession || ""
  );
  const [followingDetails, setFollowingDetails] = useState(
    initialData?.followingDetails || ""
  );

  const onSubmit = (data: ItrFiveScheduleOAFormType) => {
    onSave({
      businessProfessionDetails: businessDetails,
      hasIncomeUnderBusinessProfession,
      followingDetails,
    });
  };

  const updateBusinessDetail = (
    field: keyof BusinessProfessionDetail,
    value: string
  ) => {
    setBusinessDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-900 mb-2">
            Schedule OA - Business and Profession
          </h1>
          <p className="text-teal-700">
            General information about business and profession
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-teal-100 border-l-4 border-teal-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-teal-900">
            <strong>Important:</strong> Provide details about your business/profession including nature, 
            number of branches, method of accounting, stock valuation method, and any changes during the year.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Income Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-lg font-bold text-teal-900 mb-4">
              Do you have any income under the head business and profession?
            </h2>

            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasIncome"
                  checked={hasIncomeUnderBusinessProfession === "yes"}
                  onChange={(e) =>
                    setHasIncomeUnderBusinessProfession(e.target.checked ? "yes" : "")
                  }
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <label htmlFor="hasIncome" className="text-teal-900 font-semibold">
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noIncome"
                  checked={hasIncomeUnderBusinessProfession === "no"}
                  onChange={(e) =>
                    setHasIncomeUnderBusinessProfession(e.target.checked ? "no" : "")
                  }
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <label htmlFor="noIncome" className="text-teal-900 font-semibold">
                  No
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ifYes"
                  className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                />
                <label htmlFor="ifYes" className="text-teal-900 font-semibold">
                  if("Yes") please enter following details
                </label>
              </div>
            </div>
          </div>

          {/* Business Details Section */}
          {hasIncomeUnderBusinessProfession === "yes" && (
            <>
              {/* General Information */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
                <h2 className="text-lg font-bold text-teal-900 mb-6">
                  1. General Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      1. Nature of Business or profession (refer to the instructions)
                    </label>
                    <input
                      type="text"
                      value={businessDetails.natureOfBusinessProfession}
                      onChange={(e) =>
                        updateBusinessDetail("natureOfBusinessProfession", e.target.value)
                      }
                      placeholder="Enter nature of business/profession"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Field Code: 1</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      2. Number of branches
                    </label>
                    <input
                      type="text"
                      value={businessDetails.numberOfBranches}
                      onChange={(e) =>
                        updateBusinessDetail("numberOfBranches", e.target.value)
                      }
                      placeholder="Enter number of branches"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">Field Code: 2</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      3. Method of accounting employed in the previous year (Tick)
                    </label>
                    <div className="flex gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="mercantile"
                          name="accounting"
                          value="mercantile"
                          checked={businessDetails.methodOfAccounting === "mercantile"}
                          onChange={(e) =>
                            updateBusinessDetail("methodOfAccounting", e.target.value)
                          }
                          className="w-4 h-4 text-teal-600"
                        />
                        <label htmlFor="mercantile" className="text-teal-900">
                          Mercantile
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="cash"
                          name="accounting"
                          value="cash"
                          checked={businessDetails.methodOfAccounting === "cash"}
                          onChange={(e) =>
                            updateBusinessDetail("methodOfAccounting", e.target.value)
                          }
                          className="w-4 h-4 text-teal-600"
                        />
                        <label htmlFor="cash" className="text-teal-900">
                          Cash
                        </label>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={businessDetails.methodOfAccountingOther}
                        onChange={(e) =>
                          updateBusinessDetail("methodOfAccountingOther", e.target.value)
                        }
                        placeholder="Other (Please specify)"
                        className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Field Code: 3</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      4. Is there any change in method of accounting?
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="accYes"
                          name="changeAccounting"
                          value="yes"
                          checked={businessDetails.changeInMethodOfAccounting === "yes"}
                          onChange={(e) =>
                            updateBusinessDetail("changeInMethodOfAccounting", e.target.value)
                          }
                          className="w-4 h-4 text-teal-600"
                        />
                        <label htmlFor="accYes" className="text-teal-900">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="accNo"
                          name="changeAccounting"
                          value="no"
                          checked={businessDetails.changeInMethodOfAccounting === "no"}
                          onChange={(e) =>
                            updateBusinessDetail("changeInMethodOfAccounting", e.target.value)
                          }
                          className="w-4 h-4 text-teal-600"
                        />
                        <label htmlFor="accNo" className="text-teal-900">
                          No
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Field Code: 4</p>
                  </div>

                  {businessDetails.changeInMethodOfAccounting === "yes" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        5. Effect on the profit because of deviation, if any, in the method of accounting employed in the previous year
                      </label>
                      <input
                        type="text"
                        value={businessDetails.effectOnProfitDeviation}
                        onChange={(e) =>
                          updateBusinessDetail("effectOnProfitDeviation", e.target.value)
                        }
                        placeholder="Enter effect on profit"
                        className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-right"
                      />
                      <p className="text-xs text-gray-500 mt-1">Field Code: 5</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Valuation Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h2 className="text-lg font-bold text-teal-900 mb-6">
                  6. Method of valuation of closing stock employed in the previous year
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      6a. Raw Material (if at cost or market rates whichever is less write 1, if at cost write 2, if at market rate write 3)
                    </label>
                    <input
                      type="text"
                      value={businessDetails.rawMaterialRawValue}
                      onChange={(e) =>
                        updateBusinessDetail("rawMaterialRawValue", e.target.value)
                      }
                      placeholder="1, 2, or 3"
                      className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                    />
                    <p className="text-xs text-gray-500 mt-1">Field Code: 6a</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      6b. Finished goods (if at cost or market rates whichever is less write 1, if at cost write 2, if at market rate write 3)
                    </label>
                    <input
                      type="text"
                      value={businessDetails.finishedGoodsValue}
                      onChange={(e) =>
                        updateBusinessDetail("finishedGoodsValue", e.target.value)
                      }
                      placeholder="1, 2, or 3"
                      className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                    />
                    <p className="text-xs text-gray-500 mt-1">Field Code: 6b</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      6c. Is there any change in stock valuation method?
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="stockYes"
                          name="changeStock"
                          value="yes"
                          checked={businessDetails.changeInStockValuationMethod === "yes"}
                          onChange={(e) =>
                            updateBusinessDetail("changeInStockValuationMethod", e.target.value)
                          }
                          className="w-4 h-4 text-green-600"
                        />
                        <label htmlFor="stockYes" className="text-teal-900">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="stockNo"
                          name="changeStock"
                          value="no"
                          checked={businessDetails.changeInStockValuationMethod === "no"}
                          onChange={(e) =>
                            updateBusinessDetail("changeInStockValuationMethod", e.target.value)
                          }
                          className="w-4 h-4 text-green-600"
                        />
                        <label htmlFor="stockNo" className="text-teal-900">
                          No
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Field Code: 6c</p>
                  </div>

                  {businessDetails.changeInStockValuationMethod === "yes" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        6d. Effect on the profit or loss because of deviation, if any, from the method of valuation prescribed under section 145A
                      </label>
                      <input
                        type="text"
                        value={businessDetails.effectOnProfitLossDeviation}
                        onChange={(e) =>
                          updateBusinessDetail("effectOnProfitLossDeviation", e.target.value)
                        }
                        placeholder="Enter effect on profit/loss"
                        className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right"
                      />
                      <p className="text-xs text-gray-500 mt-1">Field Code: 6d</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notes:</h3>
                <ul className="text-sm text-yellow-900 space-y-1 list-disc list-inside">
                  <li>Enter "1" for cost or market rates whichever is less</li>
                  <li>Enter "2" for cost</li>
                  <li>Enter "3" for market rate only</li>
                  <li>Select appropriate method of accounting (Mercantile/Cash)</li>
                  <li>Report any changes in accounting or valuation methods</li>
                </ul>
              </div>
            </>
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
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleOA;
