import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface TaxComputationDetail {
  taxAtNormalRates: string;
  taxAtSpecialRates: string;
  taxAnonymousDonation: string;
  taxUnder115BBH: string;
  taxMaximumMarginal: string;
  taxAgriculturalIncome: string;
  totalTaxPayable: string;
}

export interface SurchargeDetail {
  columnI: string;
  columnII: string;
  totalSurcharge: string;
}

export interface HealthEducationCess {
  grossTaxLiability: string;
  healthEducationCess: string;
}

export interface TaxReliefDetail {
  section90A: string;
  section91: string;
  totalTaxRelief: string;
}

export interface InterestAndFeesDetail {
  interestDefault234A: string;
  interestDefault234B: string;
  interestDeferment234C: string;
  feeDefault234F: string;
  totalInterestAndFees: string;
}

export interface TaxesPaidDetail {
  advanceTax: string;
  tds: string;
  tcs: string;
  selfAssessmentTax: string;
  totalTaxesPaid: string;
}

export interface BankAccountDetail {
  ifscCode: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  selectAccountForCredit: string;
}

export interface ItrFiveScheduleTTIFormData {
  taxComputation?: TaxComputationDetail;
  surcharge?: SurchargeDetail;
  healthEducationCess?: HealthEducationCess;
  taxRelief?: TaxReliefDetail;
  interestAndFees?: InterestAndFeesDetail;
  taxesPaid?: TaxesPaidDetail;
  amountPayable?: string;
  refund?: string;
  netTaxPayable115TD?: string;
  bankAccounts?: BankAccountDetail[];
  beneficialOwnerQuestion?: string;
  foreignAssetQuestion?: string;
}

// Zod validation schemas
const taxComputationSchema = z.object({
  taxAtNormalRates: z.string().optional(),
  taxAtSpecialRates: z.string().optional(),
  taxAnonymousDonation: z.string().optional(),
  taxUnder115BBH: z.string().optional(),
  taxMaximumMarginal: z.string().optional(),
  taxAgriculturalIncome: z.string().optional(),
  totalTaxPayable: z.string().optional(),
});

const surchargeSchema = z.object({
  columnI: z.string().optional(),
  columnII: z.string().optional(),
  totalSurcharge: z.string().optional(),
});

const healthEducationCessSchema = z.object({
  grossTaxLiability: z.string().optional(),
  healthEducationCess: z.string().optional(),
});

const taxReliefSchema = z.object({
  section90A: z.string().optional(),
  section91: z.string().optional(),
  totalTaxRelief: z.string().optional(),
});

const interestAndFeesSchema = z.object({
  interestDefault234A: z.string().optional(),
  interestDefault234B: z.string().optional(),
  interestDeferment234C: z.string().optional(),
  feeDefault234F: z.string().optional(),
  totalInterestAndFees: z.string().optional(),
});

const taxesPaidSchema = z.object({
  advanceTax: z.string().optional(),
  tds: z.string().optional(),
  tcs: z.string().optional(),
  selfAssessmentTax: z.string().optional(),
  totalTaxesPaid: z.string().optional(),
});

const bankAccountSchema = z.object({
  ifscCode: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountType: z.string().optional(),
  selectAccountForCredit: z.string().optional(),
});

const itrFiveScheduleTTISchema = z.object({
  taxComputation: taxComputationSchema.optional(),
  surcharge: surchargeSchema.optional(),
  healthEducationCess: healthEducationCessSchema.optional(),
  taxRelief: taxReliefSchema.optional(),
  interestAndFees: interestAndFeesSchema.optional(),
  taxesPaid: taxesPaidSchema.optional(),
  amountPayable: z.string().optional(),
  refund: z.string().optional(),
  netTaxPayable115TD: z.string().optional(),
  bankAccounts: z.array(bankAccountSchema).optional(),
  beneficialOwnerQuestion: z.string().optional(),
  foreignAssetQuestion: z.string().optional(),
});

type ItrFiveScheduleTTIFormType = z.infer<typeof itrFiveScheduleTTISchema>;

interface ItrFiveScheduleTTIProps {
  initialData?: ItrFiveScheduleTTIFormData;
  onSave: (data: ItrFiveScheduleTTIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleTTI: React.FC<ItrFiveScheduleTTIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleTTIFormType>({
    resolver: zodResolver(itrFiveScheduleTTISchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [formData, setFormData] = useState<ItrFiveScheduleTTIFormData>(
    initialData || {
      taxComputation: {
        taxAtNormalRates: "",
        taxAtSpecialRates: "",
        taxAnonymousDonation: "",
        taxUnder115BBH: "",
        taxMaximumMarginal: "",
        taxAgriculturalIncome: "",
        totalTaxPayable: "",
      },
      surcharge: {
        columnI: "",
        columnII: "",
        totalSurcharge: "",
      },
      healthEducationCess: {
        grossTaxLiability: "",
        healthEducationCess: "",
      },
      taxRelief: {
        section90A: "",
        section91: "",
        totalTaxRelief: "",
      },
      interestAndFees: {
        interestDefault234A: "",
        interestDefault234B: "",
        interestDeferment234C: "",
        feeDefault234F: "",
        totalInterestAndFees: "",
      },
      taxesPaid: {
        advanceTax: "",
        tds: "",
        tcs: "",
        selfAssessmentTax: "",
        totalTaxesPaid: "",
      },
      bankAccounts: [
        {
          ifscCode: "",
          bankName: "",
          accountNumber: "",
          accountType: "",
          selectAccountForCredit: "",
        },
      ],
    }
  );

  const onSubmit = (data: ItrFiveScheduleTTIFormType) => {
    onSave(formData);
  };

  const updateField = (
    section: keyof ItrFiveScheduleTTIFormData,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (updated[section] && typeof updated[section] === "object") {
        (updated[section] as any)[field] = value;
      }
      return updated;
    });
  };

  const updateTopLevelField = (field: keyof ItrFiveScheduleTTIFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addBankAccount = () => {
    setFormData((prev) => ({
      ...prev,
      bankAccounts: [
        ...(prev.bankAccounts || []),
        {
          ifscCode: "",
          bankName: "",
          accountNumber: "",
          accountType: "",
          selectAccountForCredit: "",
        },
      ],
    }));
  };

  const updateBankAccount = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (updated.bankAccounts) {
        updated.bankAccounts[index] = {
          ...updated.bankAccounts[index],
          [field]: value,
        };
      }
      return updated;
    });
  };

  const removeBankAccount = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            Part B - TTI - Computation of Tax Liability on Total Income
          </h1>
          <p className="text-red-700">
            Detailed computation of tax liability including surcharge, cess, relief, and taxes paid
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-red-900">
            <strong>Important:</strong> This section computes total tax liability including tax at normal rates,
            special rates, surcharge, health and education cess, and tax relief.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Tax Payable on Total Income */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">
              1. Tax payable on total income
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1a. Tax at normal rates (SL No. 17 of Part B1 of Part B-TI)
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.taxAtNormalRates || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "taxAtNormalRates", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1b. Tax at special rates (Schedule SI)
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.taxAtSpecialRates || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "taxAtSpecialRates", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1c. Tax on anonymous donation u/s 11SBBC @ 30%
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.taxAnonymousDonation || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "taxAnonymousDonation", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1d. Tax on income u/s 115BBH @ 30%
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.taxUnder115BBH || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "taxUnder115BBH", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1e. Tax at maximum marginal rate
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.taxMaximumMarginal || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "taxMaximumMarginal", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1f. Rebate on agricultural income u/s Part B2
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.taxAgriculturalIncome || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "taxAgriculturalIncome", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  1g. Tax Payable on Total Income (1a+1b+1c+1d+1e-1f)
                </label>
                <input
                  type="text"
                  value={formData.taxComputation?.totalTaxPayable || ""}
                  onChange={(e) =>
                    updateField("taxComputation", "totalTaxPayable", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold bg-red-50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Surcharge */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">2. Surcharge</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  2i. 25% of Column (ii) of Schedule SI
                </label>
                <input
                  type="text"
                  value={formData.surcharge?.columnI || ""}
                  onChange={(e) => updateField("surcharge", "columnI", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  2ii. On [1g - (Column (ii) of Schedule SI)]
                </label>
                <input
                  type="text"
                  value={formData.surcharge?.columnII || ""}
                  onChange={(e) => updateField("surcharge", "columnII", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  2iii. Total (i + ii)
                </label>
                <input
                  type="text"
                  value={formData.surcharge?.totalSurcharge || ""}
                  onChange={(e) =>
                    updateField("surcharge", "totalSurcharge", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Health and Education Cess */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">3. Health and Education cess @ 4%</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Gross tax liability (1g+2iii)
                </label>
                <input
                  type="text"
                  value={formData.healthEducationCess?.grossTaxLiability || ""}
                  onChange={(e) =>
                    updateField("healthEducationCess", "grossTaxLiability", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  Health and Education cess
                </label>
                <input
                  type="text"
                  value={formData.healthEducationCess?.healthEducationCess || ""}
                  onChange={(e) =>
                    updateField("healthEducationCess", "healthEducationCess", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Gross Tax Liability */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-2">4. Gross tax liability (1g+2iii+3)</h2>
            <input
              type="text"
              placeholder="Amount in Rs."
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold bg-red-50"
            />
          </div>

          {/* Section 5: Tax Relief */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">5. Tax relief</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  5a. Section 90/90A (2 of Schedule TR)
                </label>
                <input
                  type="text"
                  value={formData.taxRelief?.section90A || ""}
                  onChange={(e) => updateField("taxRelief", "section90A", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  5b. Section 91 (1 of Schedule TR)
                </label>
                <input
                  type="text"
                  value={formData.taxRelief?.section91 || ""}
                  onChange={(e) => updateField("taxRelief", "section91", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  5c. Total (5a+5b)
                </label>
                <input
                  type="text"
                  value={formData.taxRelief?.totalTaxRelief || ""}
                  onChange={(e) =>
                    updateField("taxRelief", "totalTaxRelief", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Net Tax Liability */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-2">6. Net tax liability (4 - 5c)</h2>
            <input
              type="text"
              placeholder="Amount in Rs."
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold bg-red-50"
            />
          </div>

          {/* Section 7: Interest and Fee Payable */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">7. Interest and fee payable</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  7a. Interest for default in furnishing return (section 234A)
                </label>
                <input
                  type="text"
                  value={formData.interestAndFees?.interestDefault234A || ""}
                  onChange={(e) =>
                    updateField("interestAndFees", "interestDefault234A", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  7b. Interest for default in payment (section 234B)
                </label>
                <input
                  type="text"
                  value={formData.interestAndFees?.interestDefault234B || ""}
                  onChange={(e) =>
                    updateField("interestAndFees", "interestDefault234B", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  7c. Interest for deferment of advance tax (section 234C)
                </label>
                <input
                  type="text"
                  value={formData.interestAndFees?.interestDeferment234C || ""}
                  onChange={(e) =>
                    updateField("interestAndFees", "interestDeferment234C", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  7d. Fee for default in furnishing return (section 234F)
                </label>
                <input
                  type="text"
                  value={formData.interestAndFees?.feeDefault234F || ""}
                  onChange={(e) =>
                    updateField("interestAndFees", "feeDefault234F", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  7e. Total Interest and Fee Payable (7a+7b+7c+7d)
                </label>
                <input
                  type="text"
                  value={formData.interestAndFees?.totalInterestAndFees || ""}
                  onChange={(e) =>
                    updateField("interestAndFees", "totalInterestAndFees", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 8: Aggregate Liability */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-2">8. Aggregate liability (6+7e)</h2>
            <input
              type="text"
              placeholder="Amount in Rs."
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold bg-red-50"
            />
          </div>

          {/* Section 9: Taxes Paid */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">9. Taxes Paid</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  9a. Advance Tax
                </label>
                <input
                  type="text"
                  value={formData.taxesPaid?.advanceTax || ""}
                  onChange={(e) => updateField("taxesPaid", "advanceTax", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  9b. TDS (Total of column 9 of Schedule TDS)
                </label>
                <input
                  type="text"
                  value={formData.taxesPaid?.tds || ""}
                  onChange={(e) => updateField("taxesPaid", "tds", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  9c. TCS (Total of column 7 of TCS)
                </label>
                <input
                  type="text"
                  value={formData.taxesPaid?.tcs || ""}
                  onChange={(e) => updateField("taxesPaid", "tcs", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  9d. Self-Assessment Tax
                </label>
                <input
                  type="text"
                  value={formData.taxesPaid?.selfAssessmentTax || ""}
                  onChange={(e) =>
                    updateField("taxesPaid", "selfAssessmentTax", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  9e. Total Taxes Paid (9a+9b+9c+9d)
                </label>
                <input
                  type="text"
                  value={formData.taxesPaid?.totalTaxesPaid || ""}
                  onChange={(e) =>
                    updateField("taxesPaid", "totalTaxesPaid", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 10: Amount Payable / Refund */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">10. Amount Payable / Refund</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  10. Amount payable (Enter if 8 is greater than 9e)
                </label>
                <input
                  type="text"
                  value={formData.amountPayable || ""}
                  onChange={(e) => updateTopLevelField("amountPayable", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  11. Refund (if 9e is greater than 8)
                </label>
                <input
                  type="text"
                  value={formData.refund || ""}
                  onChange={(e) => updateTopLevelField("refund", e.target.value)}
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-red-900 mb-2">
                  12. Net tax payable 115TD income including interest u/s 115TE
                </label>
                <input
                  type="text"
                  value={formData.netTaxPayable115TD || ""}
                  onChange={(e) =>
                    updateTopLevelField("netTaxPayable115TD", e.target.value)
                  }
                  placeholder="Amount in Rs."
                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Section 13: Bank Accounts */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-6">
              13. Bank Accounts in India (Non-Residents claiming refund with no bank account in India)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-red-200 border-b-2 border-red-400">
                    <th className="border px-2 py-2 text-left font-semibold">IFSC Code</th>
                    <th className="border px-2 py-2 text-left font-semibold">Bank Name</th>
                    <th className="border px-2 py-2 text-left font-semibold">Account Number</th>
                    <th className="border px-2 py-2 text-left font-semibold">Account Type</th>
                    <th className="border px-2 py-2 text-left font-semibold">Select Account</th>
                    <th className="border px-2 py-2 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.bankAccounts?.map((account, index) => (
                    <tr key={index} className="hover:bg-red-50">
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={account.ifscCode}
                          onChange={(e) =>
                            updateBankAccount(index, "ifscCode", e.target.value)
                          }
                          placeholder="IFSC"
                          className="w-20 px-1 py-1 border border-red-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={account.bankName}
                          onChange={(e) =>
                            updateBankAccount(index, "bankName", e.target.value)
                          }
                          placeholder="Bank Name"
                          className="w-24 px-1 py-1 border border-red-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={account.accountNumber}
                          onChange={(e) =>
                            updateBankAccount(index, "accountNumber", e.target.value)
                          }
                          placeholder="Account #"
                          className="w-24 px-1 py-1 border border-red-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select
                          value={account.accountType}
                          onChange={(e) =>
                            updateBankAccount(index, "accountType", e.target.value)
                          }
                          className="w-24 px-1 py-1 border border-red-200 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="Savings">Savings</option>
                          <option value="Current">Current</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <select
                          value={account.selectAccountForCredit}
                          onChange={(e) =>
                            updateBankAccount(
                              index,
                              "selectAccountForCredit",
                              e.target.value
                            )
                          }
                          className="w-16 px-1 py-1 border border-red-200 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2 text-center">
                        {formData.bankAccounts && formData.bankAccounts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBankAccount(index)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={addBankAccount}
                className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
              >
                + Add Bank Account
              </button>
            </div>
          </div>

          {/* Section 14: Beneficial Owner Question */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-4">
              14. Do you at any time during the previous year hold, as beneficial owner, beneficiary or otherwise,
              any asset outside India?
            </h2>

            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="beneficial-owner"
                  value="Yes"
                  checked={formData.beneficialOwnerQuestion === "Yes"}
                  onChange={(e) => updateTopLevelField("beneficialOwnerQuestion", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-semibold text-red-900">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="beneficial-owner"
                  value="No"
                  checked={formData.beneficialOwnerQuestion === "No"}
                  onChange={(e) => updateTopLevelField("beneficialOwnerQuestion", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-semibold text-red-900">No</span>
              </label>
            </div>
          </div>

          {/* Section 15: Foreign Asset Question */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-lg font-bold text-red-900 mb-4">
              15. Have you signing authority in any account located outside India; or have income from any source
              outside India?
            </h2>

            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="foreign-asset"
                  value="Yes"
                  checked={formData.foreignAssetQuestion === "Yes"}
                  onChange={(e) => updateTopLevelField("foreignAssetQuestion", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-semibold text-red-900">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="foreign-asset"
                  value="No"
                  checked={formData.foreignAssetQuestion === "No"}
                  onChange={(e) => updateTopLevelField("foreignAssetQuestion", e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm font-semibold text-red-900">No</span>
              </label>
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

export default ItrFiveScheduleTTI;
