import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface IncomeItemDetail {
  slNo: number;
  description: string;
  amountInRs: string;
}

export interface AdditionsDetail {
  slNo: number;
  description: string;
  amountInRs: string;
}

export interface DeductionDetail {
  slNo: number;
  category: string;
  amountInRs: string;
}

export interface ItrFiveSchedulePartBIIFormData {
  voluntaryContributions?: string;
  voluntaryContributionCorpus?: string;
  aggregateIncome?: string;
  amountEligibleExemption?: string;
  incomeChargeableSection?: string;
  totalIncome?: string;
  totalExpenditure?: string;
  expenditureDisallowed?: string;
  expenditureFromCorpus?: string;
  expenditureLoan?: string;
  depreciationAsset?: string;
  amountDisallowableExplanation?: string;
  amountDisallowableSpecified?: string;
  capitalExpenditure?: string;
  amountAccumulatedSet?: string;
  totalExpenditureToBe?: string;
  grossIncome?: string;
  lossesOfCurrentYear?: string;
  netAgriculturalIncome?: string;
  incomeChargeableNormalRates?: string;
  netIncome?: string;
  grossIncomeAfterExemptions?: string;
  lossesCurrent?: string;
  totalGrossIncome?: string;
  incomeSpecialRates?: string;
  anonymousDonations?: string;
  incomeChargeableUndis?: string;
  aggregateIncomeUndis?: string;
  incomeMaximumMarginal?: string;
}

// Zod validation schema
const incomeItemSchema = z.object({
  slNo: z.number().optional(),
  description: z.string().optional(),
  amountInRs: z.string().optional(),
});

const additionsSchema = z.object({
  slNo: z.number().optional(),
  description: z.string().optional(),
  amountInRs: z.string().optional(),
});

const deductionSchema = z.object({
  slNo: z.number().optional(),
  category: z.string().optional(),
  amountInRs: z.string().optional(),
});

const itrFiveSchedulePartBIISchema = z.object({
  voluntaryContributions: z.string().optional(),
  voluntaryContributionCorpus: z.string().optional(),
  aggregateIncome: z.string().optional(),
  amountEligibleExemption: z.string().optional(),
  incomeChargeableSection: z.string().optional(),
  totalIncome: z.string().optional(),
  totalExpenditure: z.string().optional(),
  expenditureDisallowed: z.string().optional(),
  expenditureFromCorpus: z.string().optional(),
  expenditureLoan: z.string().optional(),
  depreciationAsset: z.string().optional(),
  amountDisallowableExplanation: z.string().optional(),
  amountDisallowableSpecified: z.string().optional(),
  capitalExpenditure: z.string().optional(),
  amountAccumulatedSet: z.string().optional(),
  totalExpenditureToBe: z.string().optional(),
  grossIncome: z.string().optional(),
  lossesOfCurrentYear: z.string().optional(),
  netAgriculturalIncome: z.string().optional(),
  incomeChargeableNormalRates: z.string().optional(),
  netIncome: z.string().optional(),
  grossIncomeAfterExemptions: z.string().optional(),
  lossesCurrent: z.string().optional(),
  totalGrossIncome: z.string().optional(),
  incomeSpecialRates: z.string().optional(),
  anonymousDonations: z.string().optional(),
  incomeChargeableUndis: z.string().optional(),
  aggregateIncomeUndis: z.string().optional(),
  incomeMaximumMarginal: z.string().optional(),
});

type ItrFiveSchedulePartBIIFormType = z.infer<typeof itrFiveSchedulePartBIISchema>;

interface ItrFiveSchedulePartBIIProps {
  initialData?: ItrFiveSchedulePartBIIFormData;
  onSave: (data: ItrFiveSchedulePartBIIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveSchedulePartBII: React.FC<ItrFiveSchedulePartBIIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveSchedulePartBIIFormType>({
    resolver: zodResolver(itrFiveSchedulePartBIISchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [formData, setFormData] = useState<ItrFiveSchedulePartBIIFormData>(
    initialData || {}
  );

  const onSubmit = (data: ItrFiveSchedulePartBIIFormType) => {
    onSave(formData);
  };

  const updateField = (field: keyof ItrFiveSchedulePartBIIFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-900 mb-2">
            Part B-II - Statement of Income for the Period Ended on 31st March, 2025
          </h1>
          <p className="text-teal-700">
            Applicable if exemption is being claimed under sections 13A/13B and sections 10(21), 10(23AA), 10(23B), 10(23EE), etc.
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-teal-100 border-l-4 border-teal-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-teal-900">
            <strong>Important:</strong> This section captures comprehensive income details for eligible trusts/entities 
            claiming exemptions under the specified sections.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section I: Voluntary Contributions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-lg font-bold text-teal-900 mb-6">
              I. Voluntary Contributions and anonymous donations taxable u/s 11SBBC
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  1. Voluntary contributions (other than corpus body)
                </label>
                <input
                  type="text"
                  value={formData.voluntaryContributions || ""}
                  onChange={(e) => updateField("voluntaryContributions", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Voluntary contribution forming part of corpus
                </label>
                <input
                  type="text"
                  value={formData.voluntaryContributionCorpus || ""}
                  onChange={(e) => updateField("voluntaryContributionCorpus", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  2. Aggregate of income referred in sections 11, 12 and section 10(23C)
                </label>
                <input
                  type="text"
                  value={formData.aggregateIncome || ""}
                  onChange={(e) => updateField("aggregateIncome", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  3. Amount eligible for exemption u/s 11(1)(c)
                </label>
                <input
                  type="text"
                  value={formData.amountEligibleExemption || ""}
                  onChange={(e) => updateField("amountEligibleExemption", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  4. Income chargeable u/s 11(3) read with section 10(21)
                </label>
                <input
                  type="text"
                  value={formData.incomeChargeableSection || ""}
                  onChange={(e) => updateField("incomeChargeableSection", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section II: Income Computation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-lg font-bold text-teal-900 mb-6">
              II. Income Computation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Total Income
                </label>
                <input
                  type="text"
                  value={formData.totalIncome || ""}
                  onChange={(e) => updateField("totalIncome", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Total Expenditure
                </label>
                <input
                  type="text"
                  value={formData.totalExpenditure || ""}
                  onChange={(e) => updateField("totalExpenditure", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Expenditure from corpus standing to credit
                </label>
                <input
                  type="text"
                  value={formData.expenditureFromCorpus || ""}
                  onChange={(e) => updateField("expenditureFromCorpus", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Expenditure from loan or borrowing
                </label>
                <input
                  type="text"
                  value={formData.expenditureLoan || ""}
                  onChange={(e) => updateField("expenditureLoan", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Depreciation in respect of asset
                </label>
                <input
                  type="text"
                  value={formData.depreciationAsset || ""}
                  onChange={(e) => updateField("depreciationAsset", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Capital expenditure
                </label>
                <input
                  type="text"
                  value={formData.capitalExpenditure || ""}
                  onChange={(e) => updateField("capitalExpenditure", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Gross Income (before exemption)
                </label>
                <input
                  type="text"
                  value={formData.grossIncome || ""}
                  onChange={(e) => updateField("grossIncome", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Total Gross Income (6+7-8)
                </label>
                <input
                  type="text"
                  value={formData.totalGrossIncome || ""}
                  onChange={(e) => updateField("totalGrossIncome", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section III: Final Computation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-lg font-bold text-teal-900 mb-6">
              III. Summary and Final Income Computation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Gross Income after exemptions
                </label>
                <input
                  type="text"
                  value={formData.grossIncomeAfterExemptions || ""}
                  onChange={(e) => updateField("grossIncomeAfterExemptions", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Losses of current year to be set off against
                </label>
                <input
                  type="text"
                  value={formData.lossesCurrent || ""}
                  onChange={(e) => updateField("lossesCurrent", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Net Income (1-2-3)
                </label>
                <input
                  type="text"
                  value={formData.netIncome || ""}
                  onChange={(e) => updateField("netIncome", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Income which is included in 9 and chargeable at special rates
                </label>
                <input
                  type="text"
                  value={formData.incomeSpecialRates || ""}
                  onChange={(e) => updateField("incomeSpecialRates", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Anonymous donations, included in 9, to be taxed u/s 11SBBC @ 30%
                </label>
                <input
                  type="text"
                  value={formData.anonymousDonations || ""}
                  onChange={(e) => updateField("anonymousDonations", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Income chargeable u/s 11(3) read with section 10(23C)
                </label>
                <input
                  type="text"
                  value={formData.incomeChargeableUndis || ""}
                  onChange={(e) => updateField("incomeChargeableUndis", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Aggregate Income (10-11-12)
                </label>
                <input
                  type="text"
                  value={formData.aggregateIncomeUndis || ""}
                  onChange={(e) => updateField("aggregateIncomeUndis", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-900 mb-2">
                  Income chargeable at maximum marginal rates
                </label>
                <input
                  type="text"
                  value={formData.incomeMaximumMarginal || ""}
                  onChange={(e) => updateField("incomeMaximumMarginal", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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

export default ItrFiveSchedulePartBII;
