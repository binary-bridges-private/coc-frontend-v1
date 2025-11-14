import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ShortTermCapitalGainDetail {
  fullValueConsideration: string;
  valuePropertyStampValuation: string;
  fullValueConsiderationAdopted: string;
  costAcquisitionWithoutIndexation: string;
  costImprovementWithoutIndexation: string;
  expenditureTransfer: string;
  totalDeductions: string;
  stcgImmovableProperty: string;
  stampSaleDetails: string;
  fairMarketValueRule111AE2: string;
  fairMarketValueRule111AE3: string;
  fullValueConsiderationHigher: string;
  netWorthUndertakingDivision: string;
  balanceSTCG: string;
  deductionSection54: string;
  stcgBonds: string;
}

export interface LongTermCapitalGainDetail {
  fullValueConsideration: string;
  valuePropertyStampValuation: string;
  fullValueConsiderationAdopted: string;
  costAcquisitionWithoutIndexation: string;
  costImprovementWithoutIndexation: string;
  expenditureTransfer: string;
  totalDeductionsLTCG: string;
  balanceLTCG: string;
  deductionSection54: string;
  ltcgImmovableProperty: string;
  costImprovementIndexed: string;
  yearImprovement: string;
}

export interface UnrealizedCapitalGainDetail {
  year: string;
  sectionUnderDeductionClaimed: string;
  newAssetAcquired: string;
  previousYearAmount: string;
  amountUtilized: string;
  amountRemained: string;
}

export interface CapitalGainsDeductionDetail {
  deductionType: string; // a, b, c, d
  dateOfAcquisitionOriginal: string;
  costOfPurchaseConstruction: string;
  dateOfPurchaseBuilding: string;
  amountInCapitalGainsAccount: string;
  accountNumber: string;
  ifsCode: string;
  dateOfTransferOriginal: string;
  amountInvestedSpecifiedBonds: string;
  dateOfInvestment: string;
  amountDeductionClaimed: string;
  dateOfTransferAsset: string;
  costAndExpensesForPurchase: string;
  dateOfPurchaseConstructionNewAsset: string;
  amountDepositedCapitalGains: string;
  dateCGADeposit: string;
  accountNumberCGA: string;
  ifsCodeCGA: string;
  dateTransferUrbanArea: string;
  costExpensesUrbanArea: string;
  dateConstructionNewAsset: string;
  amountDepositedSEZ: string;
  totalDeductionClaimed: string;
  deductionClaimedSection54G: string;
}

export interface CapitalLossSetOffDetail {
  stcgType: string;
  currentYearGainIfPositive: string;
  percentageRate: string;
  applicableRate: string;
  taxRate: string;
  dtaaRate: string;
  currentYearCapitalGainRemaining: string;
}

export interface CapitalGainAccrualDetail {
  dateRange: string;
  typeOfGain: string;
  amount: string;
}

export interface ItrFiveScheduleCGFormData {
  stcgDetails?: ShortTermCapitalGainDetail;
  ltcgDetails?: LongTermCapitalGainDetail;
  unrealizedCapitalGains?: UnrealizedCapitalGainDetail[];
  deductionDetails?: CapitalGainsDeductionDetail[];
  capitalLossSetOff?: CapitalLossSetOffDetail[];
  capitalGainAccrual?: CapitalGainAccrualDetail[];
  totalSTCG?: string;
  totalLTCG?: string;
  totalCapitalGain?: string;
}

// Zod validation schema
const shortTermCapitalGainSchema = z.object({
  fullValueConsideration: z.string().optional(),
  valuePropertyStampValuation: z.string().optional(),
  fullValueConsiderationAdopted: z.string().optional(),
  costAcquisitionWithoutIndexation: z.string().optional(),
  costImprovementWithoutIndexation: z.string().optional(),
  expenditureTransfer: z.string().optional(),
  totalDeductions: z.string().optional(),
  stcgImmovableProperty: z.string().optional(),
  stampSaleDetails: z.string().optional(),
  fairMarketValueRule111AE2: z.string().optional(),
  fairMarketValueRule111AE3: z.string().optional(),
  fullValueConsiderationHigher: z.string().optional(),
  netWorthUndertakingDivision: z.string().optional(),
  balanceSTCG: z.string().optional(),
  deductionSection54: z.string().optional(),
  stcgBonds: z.string().optional(),
});

const longTermCapitalGainSchema = z.object({
  fullValueConsideration: z.string().optional(),
  valuePropertyStampValuation: z.string().optional(),
  fullValueConsiderationAdopted: z.string().optional(),
  costAcquisitionWithoutIndexation: z.string().optional(),
  costImprovementWithoutIndexation: z.string().optional(),
  expenditureTransfer: z.string().optional(),
  totalDeductionsLTCG: z.string().optional(),
  balanceLTCG: z.string().optional(),
  deductionSection54: z.string().optional(),
  ltcgImmovableProperty: z.string().optional(),
  costImprovementIndexed: z.string().optional(),
  yearImprovement: z.string().optional(),
});

const unrealizedCapitalGainSchema = z.object({
  year: z.string().optional(),
  sectionUnderDeductionClaimed: z.string().optional(),
  newAssetAcquired: z.string().optional(),
  previousYearAmount: z.string().optional(),
  amountUtilized: z.string().optional(),
  amountRemained: z.string().optional(),
});

const capitalGainsDeductionSchema = z.object({
  deductionType: z.string().optional(),
  dateOfAcquisitionOriginal: z.string().optional(),
  costOfPurchaseConstruction: z.string().optional(),
  dateOfPurchaseBuilding: z.string().optional(),
  amountInCapitalGainsAccount: z.string().optional(),
  accountNumber: z.string().optional(),
  ifsCode: z.string().optional(),
  dateOfTransferOriginal: z.string().optional(),
  amountInvestedSpecifiedBonds: z.string().optional(),
  dateOfInvestment: z.string().optional(),
  amountDeductionClaimed: z.string().optional(),
  dateOfTransferAsset: z.string().optional(),
  costAndExpensesForPurchase: z.string().optional(),
  dateOfPurchaseConstructionNewAsset: z.string().optional(),
  amountDepositedCapitalGains: z.string().optional(),
  dateCGADeposit: z.string().optional(),
  accountNumberCGA: z.string().optional(),
  ifsCodeCGA: z.string().optional(),
  dateTransferUrbanArea: z.string().optional(),
  costExpensesUrbanArea: z.string().optional(),
  dateConstructionNewAsset: z.string().optional(),
  amountDepositedSEZ: z.string().optional(),
  totalDeductionClaimed: z.string().optional(),
  deductionClaimedSection54G: z.string().optional(),
});

const capitalLossSetOffSchema = z.object({
  stcgType: z.string().optional(),
  currentYearGainIfPositive: z.string().optional(),
  percentageRate: z.string().optional(),
  applicableRate: z.string().optional(),
  taxRate: z.string().optional(),
  dtaaRate: z.string().optional(),
  currentYearCapitalGainRemaining: z.string().optional(),
});

const capitalGainAccrualSchema = z.object({
  dateRange: z.string().optional(),
  typeOfGain: z.string().optional(),
  amount: z.string().optional(),
});

const itrFiveScheduleCGSchema = z.object({
  stcgDetails: shortTermCapitalGainSchema.optional(),
  ltcgDetails: longTermCapitalGainSchema.optional(),
  unrealizedCapitalGains: z.array(unrealizedCapitalGainSchema).optional(),
  deductionDetails: z.array(capitalGainsDeductionSchema).optional(),
  capitalLossSetOff: z.array(capitalLossSetOffSchema).optional(),
  capitalGainAccrual: z.array(capitalGainAccrualSchema).optional(),
  totalSTCG: z.string().optional(),
  totalLTCG: z.string().optional(),
  totalCapitalGain: z.string().optional(),
});

type ItrFiveScheduleCGFormType = z.infer<typeof itrFiveScheduleCGSchema>;

interface ItrFiveScheduleCGProps {
  initialData?: ItrFiveScheduleCGFormData;
  onSave: (data: ItrFiveScheduleCGFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleCG: React.FC<ItrFiveScheduleCGProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleCGFormType>({
    resolver: zodResolver(itrFiveScheduleCGSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [stcgDetails, setSTCGDetails] = useState<ShortTermCapitalGainDetail>(
    initialData?.stcgDetails || {
      fullValueConsideration: "",
      valuePropertyStampValuation: "",
      fullValueConsiderationAdopted: "",
      costAcquisitionWithoutIndexation: "",
      costImprovementWithoutIndexation: "",
      expenditureTransfer: "",
      totalDeductions: "",
      stcgImmovableProperty: "",
      stampSaleDetails: "",
      fairMarketValueRule111AE2: "",
      fairMarketValueRule111AE3: "",
      fullValueConsiderationHigher: "",
      netWorthUndertakingDivision: "",
      balanceSTCG: "",
      deductionSection54: "",
      stcgBonds: "",
    }
  );

  const [ltcgDetails, setLTCGDetails] = useState<LongTermCapitalGainDetail>(
    initialData?.ltcgDetails || {
      fullValueConsideration: "",
      valuePropertyStampValuation: "",
      fullValueConsiderationAdopted: "",
      costAcquisitionWithoutIndexation: "",
      costImprovementWithoutIndexation: "",
      expenditureTransfer: "",
      totalDeductionsLTCG: "",
      balanceLTCG: "",
      deductionSection54: "",
      ltcgImmovableProperty: "",
      costImprovementIndexed: "",
      yearImprovement: "",
    }
  );

  const [unrealizedGains, setUnrealizedGains] = useState<
    UnrealizedCapitalGainDetail[]
  >(
    initialData?.unrealizedCapitalGains || [
      {
        year: "",
        sectionUnderDeductionClaimed: "",
        newAssetAcquired: "",
        previousYearAmount: "",
        amountUtilized: "",
        amountRemained: "",
      },
    ]
  );

  const [totalSTCG, setTotalSTCG] = useState(initialData?.totalSTCG || "");
  const [totalLTCG, setTotalLTCG] = useState(initialData?.totalLTCG || "");
  const [totalCapitalGain, setTotalCapitalGain] = useState(
    initialData?.totalCapitalGain || ""
  );

  const [deductionDetails, setDeductionDetails] = useState<
    CapitalGainsDeductionDetail[]
  >(
    initialData?.deductionDetails || [
      {
        deductionType: "",
        dateOfAcquisitionOriginal: "",
        costOfPurchaseConstruction: "",
        dateOfPurchaseBuilding: "",
        amountInCapitalGainsAccount: "",
        accountNumber: "",
        ifsCode: "",
        dateOfTransferOriginal: "",
        amountInvestedSpecifiedBonds: "",
        dateOfInvestment: "",
        amountDeductionClaimed: "",
        dateOfTransferAsset: "",
        costAndExpensesForPurchase: "",
        dateOfPurchaseConstructionNewAsset: "",
        amountDepositedCapitalGains: "",
        dateCGADeposit: "",
        accountNumberCGA: "",
        ifsCodeCGA: "",
        dateTransferUrbanArea: "",
        costExpensesUrbanArea: "",
        dateConstructionNewAsset: "",
        amountDepositedSEZ: "",
        totalDeductionClaimed: "",
        deductionClaimedSection54G: "",
      },
    ]
  );

  const [capitalLossSetOff, setCapitalLossSetOff] = useState<
    CapitalLossSetOffDetail[]
  >(
    initialData?.capitalLossSetOff || [
      {
        stcgType: "",
        currentYearGainIfPositive: "",
        percentageRate: "",
        applicableRate: "",
        taxRate: "",
        dtaaRate: "",
        currentYearCapitalGainRemaining: "",
      },
    ]
  );

  const [capitalGainAccrual, setCapitalGainAccrual] = useState<
    CapitalGainAccrualDetail[]
  >(
    initialData?.capitalGainAccrual || [
      {
        dateRange: "",
        typeOfGain: "",
        amount: "",
      },
    ]
  );

  const onSubmit = (data: ItrFiveScheduleCGFormType) => {
    onSave({
      stcgDetails,
      ltcgDetails,
      unrealizedCapitalGains: unrealizedGains,
      deductionDetails,
      capitalLossSetOff,
      capitalGainAccrual,
      totalSTCG,
      totalLTCG,
      totalCapitalGain,
    });
  };

  const updateSTCGDetail = (
    field: keyof ShortTermCapitalGainDetail,
    value: string
  ) => {
    setSTCGDetails((prev) => ({ ...prev, [field]: value }));
  };

  const updateLTCGDetail = (
    field: keyof LongTermCapitalGainDetail,
    value: string
  ) => {
    setLTCGDetails((prev) => ({ ...prev, [field]: value }));
  };

  const updateUnrealizedGain = (
    index: number,
    field: keyof UnrealizedCapitalGainDetail,
    value: string
  ) => {
    const updated = [...unrealizedGains];
    updated[index] = { ...updated[index], [field]: value };
    setUnrealizedGains(updated);
  };

  const addUnrealizedGainRow = () => {
    setUnrealizedGains([
      ...unrealizedGains,
      {
        year: "",
        sectionUnderDeductionClaimed: "",
        newAssetAcquired: "",
        previousYearAmount: "",
        amountUtilized: "",
        amountRemained: "",
      },
    ]);
  };

  const removeUnrealizedGainRow = (index: number) => {
    setUnrealizedGains(unrealizedGains.filter((_, i) => i !== index));
  };

  const updateDeductionDetail = (
    index: number,
    field: keyof CapitalGainsDeductionDetail,
    value: string
  ) => {
    const updated = [...deductionDetails];
    updated[index] = { ...updated[index], [field]: value };
    setDeductionDetails(updated);
  };

  const addDeductionRow = () => {
    setDeductionDetails([
      ...deductionDetails,
      {
        deductionType: "",
        dateOfAcquisitionOriginal: "",
        costOfPurchaseConstruction: "",
        dateOfPurchaseBuilding: "",
        amountInCapitalGainsAccount: "",
        accountNumber: "",
        ifsCode: "",
        dateOfTransferOriginal: "",
        amountInvestedSpecifiedBonds: "",
        dateOfInvestment: "",
        amountDeductionClaimed: "",
        dateOfTransferAsset: "",
        costAndExpensesForPurchase: "",
        dateOfPurchaseConstructionNewAsset: "",
        amountDepositedCapitalGains: "",
        dateCGADeposit: "",
        accountNumberCGA: "",
        ifsCodeCGA: "",
        dateTransferUrbanArea: "",
        costExpensesUrbanArea: "",
        dateConstructionNewAsset: "",
        amountDepositedSEZ: "",
        totalDeductionClaimed: "",
        deductionClaimedSection54G: "",
      },
    ]);
  };

  const removeDeductionRow = (index: number) => {
    setDeductionDetails(deductionDetails.filter((_, i) => i !== index));
  };

  const updateCapitalLossSetOff = (
    index: number,
    field: keyof CapitalLossSetOffDetail,
    value: string
  ) => {
    const updated = [...capitalLossSetOff];
    updated[index] = { ...updated[index], [field]: value };
    setCapitalLossSetOff(updated);
  };

  const addCapitalLossSetOffRow = () => {
    setCapitalLossSetOff([
      ...capitalLossSetOff,
      {
        stcgType: "",
        currentYearGainIfPositive: "",
        percentageRate: "",
        applicableRate: "",
        taxRate: "",
        dtaaRate: "",
        currentYearCapitalGainRemaining: "",
      },
    ]);
  };

  const removeCapitalLossSetOffRow = (index: number) => {
    setCapitalLossSetOff(capitalLossSetOff.filter((_, i) => i !== index));
  };

  const updateCapitalGainAccrual = (
    index: number,
    field: keyof CapitalGainAccrualDetail,
    value: string
  ) => {
    const updated = [...capitalGainAccrual];
    updated[index] = { ...updated[index], [field]: value };
    setCapitalGainAccrual(updated);
  };

  const addCapitalGainAccrualRow = () => {
    setCapitalGainAccrual([
      ...capitalGainAccrual,
      {
        dateRange: "",
        typeOfGain: "",
        amount: "",
      },
    ]);
  };

  const removeCapitalGainAccrualRow = (index: number) => {
    setCapitalGainAccrual(capitalGainAccrual.filter((_, i) => i !== index));
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Schedule CG - Capital Gains
          </h1>
          <p className="text-purple-700">
            Short-term Capital Gains (STCG) and Long-term Capital Gains (LTCG)
          </p>
          <p className="text-xs text-purple-600 mt-2">
            (Applicable for all assessees - Subdivisions A & B are not applicable for residents)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-pink-100 border-l-4 border-pink-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-purple-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-purple-800 space-y-1 list-disc pl-5">
            <li>Report all short-term and long-term capital gains separately</li>
            <li>Include deductions under relevant sections</li>
            <li>Provide details for immovable property transfers</li>
            <li>Include unrealized capital gains details where applicable</li>
            <li>Apply indexation benefit for LTCG on eligible assets</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section A: Short-Term Capital Gains */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-xl font-bold text-purple-900 mb-6">
              A. Short-Term Capital Gains (STCG) (Subdivisions A & B are not applicable for residents)
            </h2>

            <div className="space-y-4">
              {/* From sale of land or building */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-4">
                  1. From sale of land or building or both (Fill up details separately for each property)
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Date of purchase: DD/MM/YYYY
                      </label>
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full px-3 py-2 border border-purple-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Date of sale: DD/MM/YYYY
                      </label>
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full px-3 py-2 border border-purple-300 rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      i. Full value of consideration received/receivable
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.fullValueConsideration}
                      onChange={(e) => updateSTCGDetail("fullValueConsideration", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a1</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      ii. Value of property as per stamp valuation authority
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.valuePropertyStampValuation}
                      onChange={(e) => updateSTCGDetail("valuePropertyStampValuation", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a1I</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      iii. Full value of consideration adopted as per section 50C for the purpose of Capital Gains (in case (aii) does not exceed 1.10 times (ai), take this figure as (ai), or else take (aii))
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.fullValueConsiderationAdopted}
                      onChange={(e) => updateSTCGDetail("fullValueConsiderationAdopted", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a1III</p>
                  </div>
                </div>
              </div>

              {/* Deductions under section 48 */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-4">b. Deductions under section 48</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      i. Cost of acquisition without indexation
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.costAcquisitionWithoutIndexation}
                      onChange={(e) => updateSTCGDetail("costAcquisitionWithoutIndexation", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">bi</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      ii. Cost of improvement without indexation
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.costImprovementWithoutIndexation}
                      onChange={(e) => updateSTCGDetail("costImprovementWithoutIndexation", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">bii</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      iii. Expenditure wholly and exclusively in connection with transfer
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.expenditureTransfer}
                      onChange={(e) => updateSTCGDetail("expenditureTransfer", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">biii</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      iv. Total (bi + bii + biii)
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.totalDeductions}
                      onChange={(e) => updateSTCGDetail("totalDeductions", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">biv</p>
                  </div>
                </div>
              </div>

              {/* Balance and STCG */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    c. Balance (a1III - biv)
                  </label>
                  <input
                    type="text"
                    value={stcgDetails.balanceSTCG}
                    onChange={(e) => updateSTCGDetail("balanceSTCG", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">1c</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    d. Deduction under section 54/54GA/54G/54GA (Specify details in item D below)
                  </label>
                  <input
                    type="text"
                    value={stcgDetails.deductionSection54}
                    onChange={(e) => updateSTCGDetail("deductionSection54", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">1d</p>
                </div>
              </div>

              {/* STCG on Immovable Property and Other sources */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    e. STCG on Immovable property (1c - 1d)
                  </label>
                  <input
                    type="text"
                    value={stcgDetails.stcgImmovableProperty}
                    onChange={(e) => updateSTCGDetail("stcgImmovableProperty", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">A1c</p>
                </div>
              </div>

              {/* Additional STCG Fields */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-4">
                <h3 className="font-semibold text-purple-800 mb-4">Additional Details</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Stamp sale details (for stamp duty valuation)
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.stampSaleDetails}
                      onChange={(e) => updateSTCGDetail("stampSaleDetails", e.target.value)}
                      placeholder="Enter stamp sale details"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Fair Market Value as per Rule 111AE(2)
                      </label>
                      <input
                        type="text"
                        value={stcgDetails.fairMarketValueRule111AE2}
                        onChange={(e) => updateSTCGDetail("fairMarketValueRule111AE2", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Fair Market Value as per Rule 111AE(3)
                      </label>
                      <input
                        type="text"
                        value={stcgDetails.fairMarketValueRule111AE3}
                        onChange={(e) => updateSTCGDetail("fairMarketValueRule111AE3", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Full value of consideration (higher of values)
                      </label>
                      <input
                        type="text"
                        value={stcgDetails.fullValueConsiderationHigher}
                        onChange={(e) => updateSTCGDetail("fullValueConsiderationHigher", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Net worth under undertaking/Division
                      </label>
                      <input
                        type="text"
                        value={stcgDetails.netWorthUndertakingDivision}
                        onChange={(e) => updateSTCGDetail("netWorthUndertakingDivision", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      STCG on Bonds u/s 111A (if applicable)
                    </label>
                    <input
                      type="text"
                      value={stcgDetails.stcgBonds}
                      onChange={(e) => updateSTCGDetail("stcgBonds", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Long-Term Capital Gains */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-600">
            <h2 className="text-xl font-bold text-purple-900 mb-6">
              B. Long-term capital gain (LTCG) (Sub-items A & B are not applicable for residents)
            </h2>

            <div className="space-y-4">
              {/* From sale of land or building */}
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h3 className="font-semibold text-purple-800 mb-4">
                  1. From sale of land or building or both (Fill up details separately for each property)
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Date of purchase: DD/MM/YYYY
                      </label>
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full px-3 py-2 border border-pink-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Date of sale: DD/MM/YYYY
                      </label>
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full px-3 py-2 border border-pink-300 rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      i. Full value of consideration received/receivable
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.fullValueConsideration}
                      onChange={(e) => updateLTCGDetail("fullValueConsideration", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a1</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      ii. Value of property as per stamp valuation authority
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.valuePropertyStampValuation}
                      onChange={(e) => updateLTCGDetail("valuePropertyStampValuation", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a1I</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      iii. Full value of consideration adopted as per section 50C
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.fullValueConsiderationAdopted}
                      onChange={(e) => updateLTCGDetail("fullValueConsiderationAdopted", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">a1III</p>
                  </div>
                </div>
              </div>

              {/* Deductions under section 48 */}
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h3 className="font-semibold text-purple-800 mb-4">b. Deductions under section 48</h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      i. Cost of acquisition without indexation
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.costAcquisitionWithoutIndexation}
                      onChange={(e) => updateLTCGDetail("costAcquisitionWithoutIndexation", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">bi</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      ii. Cost of improvement without indexation
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.costImprovementWithoutIndexation}
                      onChange={(e) => updateLTCGDetail("costImprovementWithoutIndexation", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">bii</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Year of Improvement (for FY if made in same year)
                      </label>
                      <input
                        type="text"
                        value={ltcgDetails.yearImprovement}
                        onChange={(e) => updateLTCGDetail("yearImprovement", e.target.value)}
                        placeholder="YYYY"
                        className="w-full px-3 py-2 border border-pink-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Cost of improvement with indexation
                      </label>
                      <input
                        type="text"
                        value={ltcgDetails.costImprovementIndexed}
                        onChange={(e) => updateLTCGDetail("costImprovementIndexed", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      iii. Expenditure wholly and exclusively in connection with transfer
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.expenditureTransfer}
                      onChange={(e) => updateLTCGDetail("expenditureTransfer", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">biii</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      iv. Total (bi + bii + biii)
                    </label>
                    <input
                      type="text"
                      value={ltcgDetails.totalDeductionsLTCG}
                      onChange={(e) => updateLTCGDetail("totalDeductionsLTCG", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">biv</p>
                  </div>
                </div>
              </div>

              {/* Balance and LTCG */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    c. Balance (a1III - biv)
                  </label>
                  <input
                    type="text"
                    value={ltcgDetails.balanceLTCG}
                    onChange={(e) => updateLTCGDetail("balanceLTCG", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">1c</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    d. Deduction under section 54/54GA/54G/54GA
                  </label>
                  <input
                    type="text"
                    value={ltcgDetails.deductionSection54}
                    onChange={(e) => updateLTCGDetail("deductionSection54", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">1d</p>
                </div>
              </div>

              {/* LTCG on Immovable Property */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  e. LTCG on Immovable property (1c - 1d)
                </label>
                <input
                  type="text"
                  value={ltcgDetails.ltcgImmovableProperty}
                  onChange={(e) => updateLTCGDetail("ltcgImmovableProperty", e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-pink-300 rounded-lg text-right"
                />
                <p className="text-xs text-gray-500 mt-1">B1c</p>
              </div>
            </div>
          </div>

          {/* Section C: Unrealized Capital Gains */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <h2 className="text-xl font-bold text-purple-900 mb-6">
              C. Unrealized Capital Gains (u/s 101, 112, 112A, 115A)
            </h2>

            <div className="space-y-4">
              {unrealizedGains.length === 0 ? (
                <p className="text-gray-500 italic">No unrealized capital gains added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-green-100 border-b-2 border-green-400">
                        <th className="border px-3 py-2 text-left">Year</th>
                        <th className="border px-3 py-2 text-left">Section Under Deduction</th>
                        <th className="border px-3 py-2 text-left">New Asset Acquired</th>
                        <th className="border px-3 py-2 text-right">Previous Year Amt</th>
                        <th className="border px-3 py-2 text-right">Amount Utilized</th>
                        <th className="border px-3 py-2 text-right">Amount Remained</th>
                        <th className="border px-3 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unrealizedGains.map((gain, index) => (
                        <tr key={index} className="hover:bg-green-50">
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={gain.year}
                              onChange={(e) => updateUnrealizedGain(index, "year", e.target.value)}
                              placeholder="YYYY"
                              className="w-full px-2 py-1 border border-green-200 rounded"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={gain.sectionUnderDeductionClaimed}
                              onChange={(e) => updateUnrealizedGain(index, "sectionUnderDeductionClaimed", e.target.value)}
                              placeholder="u/s 101/112"
                              className="w-full px-2 py-1 border border-green-200 rounded"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <select
                              value={gain.newAssetAcquired}
                              onChange={(e) => updateUnrealizedGain(index, "newAssetAcquired", e.target.value)}
                              className="w-full px-2 py-1 border border-green-200 rounded"
                            >
                              <option value="">Select...</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={gain.previousYearAmount}
                              onChange={(e) => updateUnrealizedGain(index, "previousYearAmount", e.target.value)}
                              placeholder="0"
                              className="w-full px-2 py-1 border border-green-200 rounded text-right"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={gain.amountUtilized}
                              onChange={(e) => updateUnrealizedGain(index, "amountUtilized", e.target.value)}
                              placeholder="0"
                              className="w-full px-2 py-1 border border-green-200 rounded text-right"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={gain.amountRemained}
                              onChange={(e) => updateUnrealizedGain(index, "amountRemained", e.target.value)}
                              placeholder="0"
                              className="w-full px-2 py-1 border border-green-200 rounded text-right"
                            />
                          </td>
                          <td className="border px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeUnrealizedGainRow(index)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="button"
                onClick={addUnrealizedGainRow}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
              >
                + Add Unrealized Gain Row
              </button>
            </div>
          </div>

          {/* Section D: Information about deduction claimed against Capital Gains */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-purple-900 mb-6">
              D. Information about deduction claimed against Capital Gains
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 italic mb-4">
                Provide details of deductions claimed u/s 54, 54GA, 54G, 54GA (1), etc.
              </p>

              {deductionDetails.length === 0 ? (
                <p className="text-gray-500 italic">No deduction details added yet</p>
              ) : (
                <div className="space-y-4">
                  {deductionDetails.map((detail, index) => (
                    <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-blue-900">Deduction Detail {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeDeductionRow(index)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Deduction Type (a/b/c/d)
                          </label>
                          <select
                            value={detail.deductionType}
                            onChange={(e) => updateDeductionDetail(index, "deductionType", e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                          >
                            <option value="">Select</option>
                            <option value="a">a - Section 54</option>
                            <option value="b">b - Section 54GA</option>
                            <option value="c">c - Section 54G</option>
                            <option value="d">d - Section 54GA(1)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Total Deduction Claimed
                          </label>
                          <input
                            type="text"
                            value={detail.totalDeductionClaimed}
                            onChange={(e) => updateDeductionDetail(index, "totalDeductionClaimed", e.target.value)}
                            placeholder="0"
                            className="w-full px-2 py-1 border border-blue-300 rounded text-right text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Date of Acquisition (DD/MM/YYYY)
                          </label>
                          <input
                            type="text"
                            value={detail.dateOfAcquisitionOriginal}
                            onChange={(e) => updateDeductionDetail(index, "dateOfAcquisitionOriginal", e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Cost of Purchase/Construction
                          </label>
                          <input
                            type="text"
                            value={detail.costOfPurchaseConstruction}
                            onChange={(e) => updateDeductionDetail(index, "costOfPurchaseConstruction", e.target.value)}
                            placeholder="0"
                            className="w-full px-2 py-1 border border-blue-300 rounded text-right text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Amount Invested in Specified Bonds
                          </label>
                          <input
                            type="text"
                            value={detail.amountInvestedSpecifiedBonds}
                            onChange={(e) => updateDeductionDetail(index, "amountInvestedSpecifiedBonds", e.target.value)}
                            placeholder="0"
                            className="w-full px-2 py-1 border border-blue-300 rounded text-right text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Deduction Claimed u/s 54G
                          </label>
                          <input
                            type="text"
                            value={detail.deductionClaimedSection54G}
                            onChange={(e) => updateDeductionDetail(index, "deductionClaimedSection54G", e.target.value)}
                            placeholder="0"
                            className="w-full px-2 py-1 border border-blue-300 rounded text-right text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addDeductionRow}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                + Add Deduction Detail
              </button>
            </div>
          </div>

          {/* Section E: Set-off of Capital Losses */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
            <h2 className="text-xl font-bold text-purple-900 mb-6">
              E. Set-off of current year capital losses with current year capital gains (excluding amounts covered u/s 73)
            </h2>

            <div className="space-y-4">
              {capitalLossSetOff.length === 0 ? (
                <p className="text-gray-500 italic">No capital loss set-off details added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-orange-100 border-b-2 border-orange-400">
                        <th className="border px-2 py-2 text-left">Type of Capital Gain</th>
                        <th className="border px-2 py-2 text-right">Current Year Gain</th>
                        <th className="border px-2 py-2 text-left">% Rate</th>
                        <th className="border px-2 py-2 text-left">Applicable Rate</th>
                        <th className="border px-2 py-2 text-left">Tax Rate</th>
                        <th className="border px-2 py-2 text-left">DTAA Rate</th>
                        <th className="border px-2 py-2 text-right">Gain Remaining</th>
                        <th className="border px-2 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capitalLossSetOff.map((loss, index) => (
                        <tr key={index} className="hover:bg-orange-50">
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.stcgType}
                              onChange={(e) => updateCapitalLossSetOff(index, "stcgType", e.target.value)}
                              placeholder="STCG/LTCG"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.currentYearGainIfPositive}
                              onChange={(e) => updateCapitalLossSetOff(index, "currentYearGainIfPositive", e.target.value)}
                              placeholder="0"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.percentageRate}
                              onChange={(e) => updateCapitalLossSetOff(index, "percentageRate", e.target.value)}
                              placeholder="15%"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.applicableRate}
                              onChange={(e) => updateCapitalLossSetOff(index, "applicableRate", e.target.value)}
                              placeholder="Rate"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.taxRate}
                              onChange={(e) => updateCapitalLossSetOff(index, "taxRate", e.target.value)}
                              placeholder="Tax %"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.dtaaRate}
                              onChange={(e) => updateCapitalLossSetOff(index, "dtaaRate", e.target.value)}
                              placeholder="DTAA %"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={loss.currentYearCapitalGainRemaining}
                              onChange={(e) => updateCapitalLossSetOff(index, "currentYearCapitalGainRemaining", e.target.value)}
                              placeholder="0"
                              className="w-full px-1 py-1 border border-orange-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeCapitalLossSetOffRow(index)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="button"
                onClick={addCapitalLossSetOffRow}
                className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
              >
                + Add Capital Loss Set-off Row
              </button>
            </div>
          </div>

          {/* Section F: Information about accrual/receipt of capital gain */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-xl font-bold text-purple-900 mb-6">
              F. Information about accrual/receipt of capital gain
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-gray-600 italic mb-4">
                Provide details of capital gains received or accrued during various periods
              </p>

              {capitalGainAccrual.length === 0 ? (
                <p className="text-gray-500 italic">No capital gain accrual details added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-red-100 border-b-2 border-red-400">
                        <th className="border px-3 py-2 text-left">Date Range</th>
                        <th className="border px-3 py-2 text-left">Type of Capital Gain</th>
                        <th className="border px-3 py-2 text-right">Amount</th>
                        <th className="border px-3 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capitalGainAccrual.map((accrual, index) => (
                        <tr key={index} className="hover:bg-red-50">
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.dateRange}
                              onChange={(e) => updateCapitalGainAccrual(index, "dateRange", e.target.value)}
                              placeholder="Upto 15/6, 16/6-15/9, etc."
                              className="w-full px-2 py-1 border border-red-200 rounded text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <select
                              value={accrual.typeOfGain}
                              onChange={(e) => updateCapitalGainAccrual(index, "typeOfGain", e.target.value)}
                              className="w-full px-2 py-1 border border-red-200 rounded text-sm"
                            >
                              <option value="">Select Type</option>
                              <option value="stcg15">STCG @ 15%</option>
                              <option value="stcg20">STCG @ 20%</option>
                              <option value="stcg30">STCG @ 30%</option>
                              <option value="stcgApplicable">STCG @ Applicable Rate</option>
                              <option value="stcgDTAA">STCG @ DTAA Rate</option>
                              <option value="ltcg10">LTCG @ 10%</option>
                              <option value="ltcg12">LTCG @ 12.5%</option>
                              <option value="ltcg20">LTCG @ 20%</option>
                              <option value="ltcgDTAA">LTCG @ DTAA Rate</option>
                              <option value="virtualAsset">Capital Gains on Virtual Digital Asset @ 30%</option>
                            </select>
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.amount}
                              onChange={(e) => updateCapitalGainAccrual(index, "amount", e.target.value)}
                              placeholder="0"
                              className="w-full px-2 py-1 border border-red-200 rounded text-right text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeCapitalGainAccrualRow(index)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="button"
                onClick={addCapitalGainAccrualRow}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
              >
                + Add Capital Gain Accrual Row
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-xl font-bold text-purple-900 mb-4">Summary Totals</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">Total Short-Term Capital Gain</span>
                <input
                  type="text"
                  value={totalSTCG}
                  onChange={(e) => setTotalSTCG(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-300 rounded-lg text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">Total Long-Term Capital Gain</span>
                <input
                  type="text"
                  value={totalLTCG}
                  onChange={(e) => setTotalLTCG(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-300 rounded-lg text-right"
                />
              </div>

              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-purple-300">
                <span className="font-bold text-lg text-purple-900">Total Capital Gain</span>
                <input
                  type="text"
                  value={totalCapitalGain}
                  onChange={(e) => setTotalCapitalGain(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-purple-600 rounded-lg text-right font-bold"
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
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleCG;
