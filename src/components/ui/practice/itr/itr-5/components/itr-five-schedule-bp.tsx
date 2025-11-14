import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface BusinessIncomeComputationDetail {
  // Section A - From business/profession other than speculative/specified
  profitBeforeTaxAsPerIncomeAccountOrCustomAccount: string;
  netProfitOrLossFromSpeculativeBusiness: string;
  netProfitOrLossFromSpecifiedBusiness: string;
  incomeReceiptsCreditedToProfitLoss: string;
  profitOrLossIncludedIn1: string;
  
  // Section - Profit or loss from various sources
  profitOrLossIncludedIn1ReferredTo44AE: string;
  incomeCreatedToProfitAndLossAccount: string;
  shareOfIncomeFromAOP: string;
  shareOfIncomeFromBOI: string;
  anyOtherExemptIncome: string;
  
  // Deductions and adjustments
  totalExemptIncomeDeduction: string;
  expensesDebited: string;
  depreciationAmortization: string;
  adjustedProfitOrLoss: string;
  depreciationDebited: string;
  depreciationUnderITA: string;
  
  // Various deductions (items 13-30)
  amountDeductibleSection10: string;
  amountDeductibleSection35: string;
  amountDeductibleSection38: string;
  interestDisallowableMSME: string;
  deemedIncomeSection41: string;
  deemedIncome32AC: string;
  otherDeductionSection28: string;
  anyOtherExpenseNotAllowable: string;
  
  // Loss adjustments and calculations
  decreaseInProfitICDSAdjustment: string;
  totalDeductions: string;
  incomeBeforeLoss: string;
  
  // Speculable business calculations
  netProfitLossSpeculativeBusiness: string;
  additionsSpeculativeBusiness: string;
  deductionsSpeculativeBusiness: string;
  incomeSpeculativeBusiness: string;
  
  // Specified business calculations
  netProfitLossSpecifiedBusiness: string;
  additionsSpecifiedBusiness: string;
  deductionsSpecifiedBusiness: string;
  incomeSpecifiedBusiness: string;
  
  // Specified business class of subsection
  relevantClassOfSubsection: string;
}

export interface IntraHeadSetOffDetail {
  slNo: string;
  typeOfBusinessIncome: string;
  currentYearIncome: string;
  businessLossetOff: string;
  businessIncomeRemaining: string;
}

export interface ItrFiveScheduleBPFormData {
  businessIncomeComputationDetail?: BusinessIncomeComputationDetail;
  intraHeadSetOffDetails?: IntraHeadSetOffDetail[];
  totalComputedIncome?: string;
}

// Zod validation schema
const businessIncomeComputationSchema = z.object({
  profitBeforeTaxAsPerIncomeAccountOrCustomAccount: z.string().optional(),
  netProfitOrLossFromSpeculativeBusiness: z.string().optional(),
  netProfitOrLossFromSpecifiedBusiness: z.string().optional(),
  incomeReceiptsCreditedToProfitLoss: z.string().optional(),
  profitOrLossIncludedIn1: z.string().optional(),
  profitOrLossIncludedIn1ReferredTo44AE: z.string().optional(),
  incomeCreatedToProfitAndLossAccount: z.string().optional(),
  shareOfIncomeFromAOP: z.string().optional(),
  shareOfIncomeFromBOI: z.string().optional(),
  anyOtherExemptIncome: z.string().optional(),
  totalExemptIncomeDeduction: z.string().optional(),
  expensesDebited: z.string().optional(),
  depreciationAmortization: z.string().optional(),
  adjustedProfitOrLoss: z.string().optional(),
  depreciationDebited: z.string().optional(),
  depreciationUnderITA: z.string().optional(),
  amountDeductibleSection10: z.string().optional(),
  amountDeductibleSection35: z.string().optional(),
  amountDeductibleSection38: z.string().optional(),
  interestDisallowableMSME: z.string().optional(),
  deemedIncomeSection41: z.string().optional(),
  deemedIncome32AC: z.string().optional(),
  otherDeductionSection28: z.string().optional(),
  anyOtherExpenseNotAllowable: z.string().optional(),
  decreaseInProfitICDSAdjustment: z.string().optional(),
  totalDeductions: z.string().optional(),
  incomeBeforeLoss: z.string().optional(),
  netProfitLossSpeculativeBusiness: z.string().optional(),
  additionsSpeculativeBusiness: z.string().optional(),
  deductionsSpeculativeBusiness: z.string().optional(),
  incomeSpeculativeBusiness: z.string().optional(),
  netProfitLossSpecifiedBusiness: z.string().optional(),
  additionsSpecifiedBusiness: z.string().optional(),
  deductionsSpecifiedBusiness: z.string().optional(),
  incomeSpecifiedBusiness: z.string().optional(),
  relevantClassOfSubsection: z.string().optional(),
});

const intraHeadSetOffSchema = z.object({
  slNo: z.string().optional(),
  typeOfBusinessIncome: z.string().optional(),
  currentYearIncome: z.string().optional(),
  businessLossetOff: z.string().optional(),
  businessIncomeRemaining: z.string().optional(),
});

const itrFiveScheduleBPSchema = z.object({
  businessIncomeComputationDetail: businessIncomeComputationSchema.optional(),
  intraHeadSetOffDetails: z.array(intraHeadSetOffSchema).optional(),
  totalComputedIncome: z.string().optional(),
});

type ItrFiveScheduleBPFormType = z.infer<typeof itrFiveScheduleBPSchema>;

interface ItrFiveScheduleBPProps {
  initialData?: ItrFiveScheduleBPFormData;
  onSave: (data: ItrFiveScheduleBPFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleBP: React.FC<ItrFiveScheduleBPProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleBPFormType>({
    resolver: zodResolver(itrFiveScheduleBPSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [computationDetail, setComputationDetail] = useState<BusinessIncomeComputationDetail>(
    initialData?.businessIncomeComputationDetail || {
      profitBeforeTaxAsPerIncomeAccountOrCustomAccount: "",
      netProfitOrLossFromSpeculativeBusiness: "",
      netProfitOrLossFromSpecifiedBusiness: "",
      incomeReceiptsCreditedToProfitLoss: "",
      profitOrLossIncludedIn1: "",
      profitOrLossIncludedIn1ReferredTo44AE: "",
      incomeCreatedToProfitAndLossAccount: "",
      shareOfIncomeFromAOP: "",
      shareOfIncomeFromBOI: "",
      anyOtherExemptIncome: "",
      totalExemptIncomeDeduction: "",
      expensesDebited: "",
      depreciationAmortization: "",
      adjustedProfitOrLoss: "",
      depreciationDebited: "",
      depreciationUnderITA: "",
      amountDeductibleSection10: "",
      amountDeductibleSection35: "",
      amountDeductibleSection38: "",
      interestDisallowableMSME: "",
      deemedIncomeSection41: "",
      deemedIncome32AC: "",
      otherDeductionSection28: "",
      anyOtherExpenseNotAllowable: "",
      decreaseInProfitICDSAdjustment: "",
      totalDeductions: "",
      incomeBeforeLoss: "",
      netProfitLossSpeculativeBusiness: "",
      additionsSpeculativeBusiness: "",
      deductionsSpeculativeBusiness: "",
      incomeSpeculativeBusiness: "",
      netProfitLossSpecifiedBusiness: "",
      additionsSpecifiedBusiness: "",
      deductionsSpecifiedBusiness: "",
      incomeSpecifiedBusiness: "",
      relevantClassOfSubsection: "",
    }
  );

  const [intraHeadSetOff, setIntraHeadSetOff] = useState<IntraHeadSetOffDetail[]>(
    initialData?.intraHeadSetOffDetails || [
      {
        slNo: "i",
        typeOfBusinessIncome: "Loss to be set off (Fill this row only if figure is negative)",
        currentYearIncome: "",
        businessLossetOff: "",
        businessIncomeRemaining: "",
      },
      {
        slNo: "ii",
        typeOfBusinessIncome: "Income from speculative business",
        currentYearIncome: "",
        businessLossetOff: "",
        businessIncomeRemaining: "",
      },
      {
        slNo: "iii",
        typeOfBusinessIncome: "Income from specified business",
        currentYearIncome: "",
        businessLossetOff: "",
        businessIncomeRemaining: "",
      },
    ]
  );

  const [totalComputedIncome, setTotalComputedIncome] = useState(
    initialData?.totalComputedIncome || ""
  );

  const onSubmit = (data: ItrFiveScheduleBPFormType) => {
    onSave({
      businessIncomeComputationDetail: computationDetail,
      intraHeadSetOffDetails: intraHeadSetOff,
      totalComputedIncome,
    });
  };

  const updateComputationDetail = (
    field: keyof BusinessIncomeComputationDetail,
    value: string
  ) => {
    setComputationDetail((prev) => ({ ...prev, [field]: value }));
  };

  const updateIntraHeadSetOff = (
    index: number,
    field: keyof IntraHeadSetOffDetail,
    value: string
  ) => {
    const updated = [...intraHeadSetOff];
    updated[index] = { ...updated[index], [field]: value };
    setIntraHeadSetOff(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Schedule BP - Computation of Income from Business or Profession
          </h1>
          <p className="text-indigo-700">
            Detailed computation of business income including deductions, adjustments, and set-offs
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-indigo-100 border-l-4 border-indigo-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-indigo-900">
            <strong>Important:</strong> Complete all sections covering profit computation, deductions, 
            and various additions/adjustments as per tax laws. Include adjustments for depreciation, 
            deemed income, and other statutory provisions.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section A - Profit Before Tax */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <h2 className="text-lg font-bold text-indigo-900 mb-6">
              A. From business or profession other than speculative business and specified business
            </h2>

            <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. Profit before tax as per Income account or Customary account
                </label>
                <input
                  type="text"
                  value={computationDetail.profitBeforeTaxAsPerIncomeAccountOrCustomAccount}
                  onChange={(e) =>
                    updateComputationDetail("profitBeforeTaxAsPerIncomeAccountOrCustomAccount", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 1</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2a. Net profit or loss from speculative business
                </label>
                <input
                  type="text"
                  value={computationDetail.netProfitOrLossFromSpeculativeBusiness}
                  onChange={(e) =>
                    updateComputationDetail("netProfitOrLossFromSpeculativeBusiness", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 2a</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2b. Net profit or loss from Specified Business (enter -ve sign in case of loss)
                </label>
                <input
                  type="text"
                  value={computationDetail.netProfitOrLossFromSpecifiedBusiness}
                  onChange={(e) =>
                    updateComputationDetail("netProfitOrLossFromSpecifiedBusiness", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 2b</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  3. Income/receipts credited to profit and loss account considered under other heads
                </label>
                <input
                  type="text"
                  value={computationDetail.incomeReceiptsCreditedToProfitLoss}
                  onChange={(e) =>
                    updateComputationDetail("incomeReceiptsCreditedToProfitLoss", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 3</p>
              </div>
            </div>
          </div>

          {/* Deductions and Adjustments */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-lg font-bold text-indigo-900 mb-6">
              Deductions and Adjustments
            </h2>

            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  4. Profit or loss included in 1, which is referred to in section 44AE
                </label>
                <input
                  type="text"
                  value={computationDetail.profitOrLossIncludedIn1ReferredTo44AE}
                  onChange={(e) =>
                    updateComputationDetail("profitOrLossIncludedIn1ReferredTo44AE", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 4</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  5. Income credited to Profit and Loss account (included in 1) which is exempt
                </label>
                <input
                  type="text"
                  value={computationDetail.incomeCreatedToProfitAndLossAccount}
                  onChange={(e) =>
                    updateComputationDetail("incomeCreatedToProfitAndLossAccount", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 5</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Share of income from AOP/BOI
                </label>
                <input
                  type="text"
                  value={computationDetail.shareOfIncomeFromAOP}
                  onChange={(e) =>
                    updateComputationDetail("shareOfIncomeFromAOP", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 5a</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  6. Balance (1–2a – 2b – 3a – 3b – 3c – 3d – 3e – 3d – 5d)
                </label>
                <input
                  type="text"
                  value={computationDetail.adjustedProfitOrLoss}
                  onChange={(e) =>
                    updateComputationDetail("adjustedProfitOrLoss", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 6</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  7a. Expenses debited in profit and loss account
                </label>
                <input
                  type="text"
                  value={computationDetail.expensesDebited}
                  onChange={(e) =>
                    updateComputationDetail("expensesDebited", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 7a</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  7b. Depreciation and Amortization
                </label>
                <input
                  type="text"
                  value={computationDetail.depreciationAmortization}
                  onChange={(e) =>
                    updateComputationDetail("depreciationAmortization", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 7b</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  8. Total (7a + 7b + 7c + 7d)
                </label>
                <input
                  type="text"
                  value={computationDetail.totalDeductions}
                  onChange={(e) =>
                    updateComputationDetail("totalDeductions", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 8</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  9. Adjusted profit or loss (6-8)
                </label>
                <input
                  type="text"
                  value={computationDetail.incomeBeforeLoss}
                  onChange={(e) =>
                    updateComputationDetail("incomeBeforeLoss", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right"
                />
                <p className="text-xs text-gray-500 mt-1">Field Code: 9</p>
              </div>
            </div>
          </div>

          {/* Intra-head Set-off of Business Loss */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-600">
            <h2 className="text-lg font-bold text-indigo-900 mb-6">
              E. Intra-head set-off of business loss of current year
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-pink-100 border-b-2 border-pink-400">
                    <th className="border px-3 py-2 text-left font-semibold">S.I.</th>
                    <th className="border px-3 py-2 text-left font-semibold">Type of Business Income</th>
                    <th className="border px-3 py-2 text-right font-semibold">
                      Income of current year (Fill this only if figure is zero or positive)
                    </th>
                    <th className="border px-3 py-2 text-right font-semibold">Business Loss set off</th>
                    <th className="border px-3 py-2 text-right font-semibold">
                      Business income remaining after set off
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {intraHeadSetOff.map((row, index) => (
                    <tr key={index} className="hover:bg-pink-50">
                      <td className="border px-3 py-2">
                        <input
                          type="text"
                          value={row.slNo}
                          disabled
                          className="w-8 px-2 py-1 border border-pink-200 rounded text-center text-xs bg-gray-100"
                        />
                      </td>
                      <td className="border px-3 py-2">
                        <input
                          type="text"
                          value={row.typeOfBusinessIncome}
                          disabled
                          className="w-full px-2 py-1 border border-pink-200 rounded text-xs bg-gray-100"
                        />
                      </td>
                      <td className="border px-3 py-2">
                        <input
                          type="text"
                          value={row.currentYearIncome}
                          onChange={(e) =>
                            updateIntraHeadSetOff(index, "currentYearIncome", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-pink-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-3 py-2">
                        <input
                          type="text"
                          value={row.businessLossetOff}
                          onChange={(e) =>
                            updateIntraHeadSetOff(index, "businessLossetOff", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-pink-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-3 py-2">
                        <input
                          type="text"
                          value={row.businessIncomeRemaining}
                          onChange={(e) =>
                            updateIntraHeadSetOff(index, "businessIncomeRemaining", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-2 py-1 border border-pink-200 rounded text-right text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">
              Total Computed Income
            </h2>

            <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-indigo-300">
              <span className="font-bold text-lg text-indigo-900">
                Total Income from Business/Profession
              </span>
              <input
                type="text"
                value={totalComputedIncome}
                onChange={(e) => setTotalComputedIncome(e.target.value)}
                placeholder="0"
                className="w-40 px-3 py-2 border-2 border-indigo-600 rounded-lg text-right font-bold"
              />
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
            <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
              <li>Include all adjustments as per section 28 to 44DB</li>
              <li>Add deemed income under section 41 and 32AC if applicable</li>
              <li>Deduct depreciation under section 32 and Income-tax Act provisions</li>
              <li>Consider set-offs and carry-forward of business losses</li>
              <li>Include additions for disallowed expenses and amounts</li>
            </ul>
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

export default ItrFiveScheduleBP;
