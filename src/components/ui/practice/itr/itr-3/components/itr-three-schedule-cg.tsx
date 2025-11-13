import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ===== COMPREHENSIVE CAPITAL GAINS FORM DATA INTERFACE =====
export interface ScheduleCGFormData {
  // ===== SECTION A: SHORT-TERM CAPITAL GAINS ON PROPERTY =====
  stcgPropertySubtotal?: string;
  
  // ===== SECTION 2: SLUMP SALE =====
  slumpSaleFairMarket?: string;
  slumpSaleCostOfPurchase?: string;
  slumpSaleNetWorth?: string;
  slumpSaleGain?: string;

  // ===== SECTION 3: EQUITY SHARES & MUTUAL FUNDS (Section 112A/111A) =====
  equityBeforeSttValue?: string;
  equityBeforeCost?: string;
  equityBeforeExpenses?: string;
  equityBeforeGain?: string;

  equityOnAfterSttValue?: string;
  equityOnAfterCost?: string;
  equityOnAfterExpenses?: string;
  equityOnAfterGain?: string;

  // ===== SECTION 4: GDR & FPI TRANSACTIONS =====
  gdrSaleValue?: string;
  gdrSaleCostOfAcq?: string;
  gdrSaleExpenses?: string;
  gdrSaleGain?: string;

  // ===== SECTION 5: EQUITY STT SECURITIES (Section 111A) =====
  equitySttSaleValue?: string;
  equitySttCostOfAcq?: string;
  equitySttExpenses?: string;
  equitySttGain?: string;

  // ===== SECTION 6: NON-RESIDENTS STT SECURITIES =====
  nonResidentsSttValue?: string;
  nonResidentsSttCost?: string;
  nonResidentsSttExpenses?: string;
  nonResidentsSttGain?: string;

  // ===== SECTION 7: BONDS & DEBENTURES (Section 112(1)) =====
  bondsDebentureSaleValue?: string;
  bondsDebentureCost?: string;
  bondsDebentureExpenses?: string;
  bondsDebentureGain?: string;

  // ===== SECTION 8: UNLISTED SECURITIES (STT/Non-STT) =====
  unlistedSecuritiesDescription?: string;
  unlistedSecuritiesValue?: string;
  unlistedSecuritiesCost?: string;
  unlistedSecuritiesExpenses?: string;
  unlistedSecuritiesGain?: string;

  // ===== SECTION 9: NON-RESIDENT - UNLISTED SHARES & SECURITIES =====
  nonResidentUnlistedValue?: string;
  nonResidentUnlistedCost?: string;
  nonResidentUnlistedExpenses?: string;
  nonResidentUnlistedGain?: string;

  // ===== SECTION 10: PROPERTY SECTION - LTCG BEFORE 23 JULY 2024 =====
  ltcgPropertyBeforeValue?: string;
  ltcgPropertyBeforeCost?: string;
  ltcgPropertyBeforeIndexedCost?: string;
  ltcgPropertyBeforeExpenses?: string;
  ltcgPropertyBeforeDeductionU54?: string;
  ltcgPropertyBeforeGain?: string;

  // ===== SECTION 11: PROPERTY SECTION - LTCG ON/AFTER 23 JULY 2024 =====
  ltcgPropertyAfterValue?: string;
  ltcgPropertyAfterCost?: string;
  ltcgPropertyAfterIndexedCost?: string;
  ltcgPropertyAfterExpenses?: string;
  ltcgPropertyAfterDeductionU54?: string;
  ltcgPropertyAfterGain?: string;

  // ===== SECTION 12: FOREIGN EXCHANGE ASSET - NON-RESIDENT =====
  foreignExchangeAssetValue?: string;
  foreignExchangeAssetCost?: string;
  foreignExchangeAssetExpenses?: string;
  foreignExchangeAssetGain?: string;
  foreignExchangeBeforeDeductionU115F?: string;
  foreignExchangeAfterDeductionU115F?: string;

  // ===== SECTION 13: SECTION 54 DEDUCTIONS (Residential Property) =====
  section54ResidentialDate?: string;
  section54ResidentialCost?: string;
  section54ResidentialDeduction?: string;

  // ===== SECTION 14: SECTION 54F DEDUCTIONS (Non-Residential/Agricultural) =====
  section54FAgricultureDate?: string;
  section54FAgricultureCost?: string;
  section54FAgricultureDeduction?: string;

  // ===== SECTION 15: SECTION 54G/54GA DEDUCTIONS =====
  section54GDeductionDate?: string;
  section54GDeductionAmount?: string;

  // ===== SECTION 16: CAPITAL LOSS BROUGHT FORWARD =====
  capitalLossBroughtForwardShortTerm?: string;
  capitalLossBroughtForwardLongTerm?: string;
  capitalLossBroughtForwardTotal?: string;

  // ===== SECTION 17: PASS THROUGH INCOME/LOSS (DTAA) =====
  passThroughIncomeLTCG?: string;
  passThroughIncomeLTCGRate?: string;
  passThroughIncomeOtherUS?: string;
  passThroughIncomeOtherRate?: string;
  passThroughIncomeChargeable?: string;

  // ===== SECTION 18: DTAA CLAIMED - LTCG =====
  dtaaClaimedLTCGAmount?: string;
  dtaaClaimedLTCGCountry?: string;
  dtaaClaimedLTCGArticle?: string;
  dtaaClaimedLTCGRate?: string;

  // ===== SECTION 19: CAPITAL LOSS - BUY BACK OF SHARES =====
  capitalLossBuyBackDate?: string;
  capitalLossBuyBackAmount?: string;
  capitalLossBuyBackSetOff?: string;

  // ===== SECTION C: CAPITAL GAIN ON VIRTUAL DIGITAL ASSET (VDA) =====
  vdaCapitalGainRate30?: string; // 30% tax rate on VDA transfer

  // ===== SECTION E: SET-OFF OF CURRENT YEAR CAPITAL LOSSES WITH GAINS =====
  // Capital Loss rows by rate (for tracking losses against gains)
  capitalLoss15Percent?: string;
  capitalLoss15PercentSetOff?: string;
  capitalLoss20Percent?: string;
  capitalLoss20PercentSetOff?: string;
  capitalLoss30Percent?: string;
  capitalLoss30PercentSetOff?: string;
  capitalLossApplicableRate?: string;
  capitalLossApplicableRateSetOff?: string;
  capitalLossDTAARate?: string;
  capitalLossDTAARateSetOff?: string;

  // Set-off registration - tracking loss against different rate gains
  lossSetOffAgainst15?: string;
  lossSetOffAgainst20?: string;
  lossSetOffAgainst30?: string;
  lossSetOffAgainstApplicable?: string;
  lossSetOffAgainstDTAA?: string;

  // ===== SECTION F: INFORMATION ABOUT ACCRUAL/RECEIPT OF CAPITAL GAIN BY DATE =====
  // STCG by rate and date period
  stcgUpto15June15Percent?: string;
  stcgUpto15June20Percent?: string;
  stcgUpto15June30Percent?: string;
  stcgUpto15JuneApplicable?: string;
  stcgUpto15JuneDTAA?: string;

  stcg16JuneTo15Sep15Percent?: string;
  stcg16JuneTo15Sep20Percent?: string;
  stcg16JuneTo15Sep30Percent?: string;
  stcg16JuneTo15SepApplicable?: string;
  stcg16JuneTo15SepDTAA?: string;

  stcg16SepTo15Dec15Percent?: string;
  stcg16SepTo15Dec20Percent?: string;
  stcg16SepTo15Dec30Percent?: string;
  stcg16SepTo15DecApplicable?: string;
  stcg16SepTo15DecDTAA?: string;

  stcg16DecTo15Mar15Percent?: string;
  stcg16DecTo15Mar20Percent?: string;
  stcg16DecTo15Mar30Percent?: string;
  stcg16DecTo15MarApplicable?: string;
  stcg16DecTo15MarDTAA?: string;

  stcg16MarTo31Mar15Percent?: string;
  stcg16MarTo31Mar20Percent?: string;
  stcg16MarTo31Mar30Percent?: string;
  stcg16MarTo31MarApplicable?: string;
  stcg16MarTo31MarDTAA?: string;

  // LTCG by rate and date period
  ltcgUpto15June10Percent?: string;
  ltcgUpto15June12Point5?: string;
  ltcgUpto15JuneDTAA?: string;

  ltcg16JuneTo15Sep10Percent?: string;
  ltcg16JuneTo15Sep12Point5?: string;
  ltcg16JuneTo15SepDTAA?: string;

  ltcg16SepTo15Dec10Percent?: string;
  ltcg16SepTo15Dec12Point5?: string;
  ltcg16SepTo15DecDTAA?: string;

  ltcg16DecTo15Mar10Percent?: string;
  ltcg16DecTo15Mar12Point5?: string;
  ltcg16DecTo15MarDTAA?: string;

  ltcg16MarTo31Mar10Percent?: string;
  ltcg16MarTo31Mar12Point5?: string;
  ltcg16MarTo31MarDTAA?: string;

  // ===== TOTAL LOSS CALCULATION =====
  totalLossSetOff?: string;
  lossRemainingAfterSetOff?: string;

  // ===== SECTION B2: LONG-TERM CAPITAL GAINS ON PROPERTY =====
  ltcgPropertySubtotal?: string;

  // ===== SECTION 8: LTCG - DEPRECIABLE ASSETS (Schedule DCG) =====
  ltcgDepreciableAssets?: string;
  ltcgDepreciableDeductionsU54?: string;
  ltcgDepreciableBalance?: string;

  // ===== SECTION 9: LTCG - OTHER ASSETS =====
  ltcgOtherAssets?: string;
  ltcgOtherDeductionsU54?: string;
  ltcgOtherBalance?: string;

  // ===== SECTION 10: UNLISTED SECURITIES =====
  unlistedSTCGSaleValue?: string;
  unlistedSTCGCost?: string;
  unlistedSTCGExpenses?: string;
  unlistedSTCGGain?: string;

  unlistedLTCGSaleValue?: string;
  unlistedLTCGCost?: string;
  unlistedLTCGExpenses?: string;
  unlistedLTCGGain?: string;

  // ===== SECTION 11: NON-RESIDENTS GDR/FPI =====
  nonResidentsGdrValue?: string;
  nonResidentsGdrCost?: string;
  nonResidentsGdrExpenses?: string;
  nonResidentsGdrGain?: string;

  // ===== BROUGHT FORWARD LOSSES =====
  broughtForwardSTCGLoss?: string;
  broughtForwardLTCGLoss?: string;
  broughtForwardCapitalLoss?: string;

  // ===== DEDUCTIONS UNDER SECTION 48 =====
  deductionSection48STCG?: string;
  deductionSection48LTCG?: string;

  // ===== DEDUCTIONS UNDER SECTION 54 =====
  deductionSection54Residential?: string;
  deductionSection54NonResidential?: string;

  // ===== TAX COMPUTATION FIELDS =====
  stcgTaxableIncome?: string;
  ltcgTaxableIncome?: string;
  ltcgRate?: string; // Tax rate applicable

  // ===== SUMMARY TOTALS =====
  totalShortTermCapitalGain?: string;
  totalLongTermCapitalGain?: string;
  totalCapitalGain?: string;
  capitalLoss?: string;
  capitalLossSetOff?: string;
  netCapitalGain?: string;
  capitalLossCarryForward?: string;
}

// ===== ZOD SCHEMA =====
const scheduleCGSchema = z.object({
  stcgPropertySubtotal: z.string().optional(),
  slumpSaleFairMarket: z.string().optional(),
  slumpSaleCostOfPurchase: z.string().optional(),
  slumpSaleNetWorth: z.string().optional(),
  slumpSaleGain: z.string().optional(),

  equityBeforeSttValue: z.string().optional(),
  equityBeforeCost: z.string().optional(),
  equityBeforeExpenses: z.string().optional(),
  equityBeforeGain: z.string().optional(),
  equityOnAfterSttValue: z.string().optional(),
  equityOnAfterCost: z.string().optional(),
  equityOnAfterExpenses: z.string().optional(),
  equityOnAfterGain: z.string().optional(),

  gdrSaleValue: z.string().optional(),
  gdrSaleCostOfAcq: z.string().optional(),
  gdrSaleExpenses: z.string().optional(),
  gdrSaleGain: z.string().optional(),

  equitySttSaleValue: z.string().optional(),
  equitySttCostOfAcq: z.string().optional(),
  equitySttExpenses: z.string().optional(),
  equitySttGain: z.string().optional(),

  nonResidentsSttValue: z.string().optional(),
  nonResidentsSttCost: z.string().optional(),
  nonResidentsSttExpenses: z.string().optional(),
  nonResidentsSttGain: z.string().optional(),

  bondsDebentureSaleValue: z.string().optional(),
  bondsDebentureCost: z.string().optional(),
  bondsDebentureExpenses: z.string().optional(),
  bondsDebentureGain: z.string().optional(),

  unlistedSecuritiesDescription: z.string().optional(),
  unlistedSecuritiesValue: z.string().optional(),
  unlistedSecuritiesCost: z.string().optional(),
  unlistedSecuritiesExpenses: z.string().optional(),
  unlistedSecuritiesGain: z.string().optional(),

  nonResidentUnlistedValue: z.string().optional(),
  nonResidentUnlistedCost: z.string().optional(),
  nonResidentUnlistedExpenses: z.string().optional(),
  nonResidentUnlistedGain: z.string().optional(),

  ltcgPropertyBeforeValue: z.string().optional(),
  ltcgPropertyBeforeCost: z.string().optional(),
  ltcgPropertyBeforeIndexedCost: z.string().optional(),
  ltcgPropertyBeforeExpenses: z.string().optional(),
  ltcgPropertyBeforeDeductionU54: z.string().optional(),
  ltcgPropertyBeforeGain: z.string().optional(),

  ltcgPropertyAfterValue: z.string().optional(),
  ltcgPropertyAfterCost: z.string().optional(),
  ltcgPropertyAfterIndexedCost: z.string().optional(),
  ltcgPropertyAfterExpenses: z.string().optional(),
  ltcgPropertyAfterDeductionU54: z.string().optional(),
  ltcgPropertyAfterGain: z.string().optional(),

  foreignExchangeAssetValue: z.string().optional(),
  foreignExchangeAssetCost: z.string().optional(),
  foreignExchangeAssetExpenses: z.string().optional(),
  foreignExchangeAssetGain: z.string().optional(),
  foreignExchangeBeforeDeductionU115F: z.string().optional(),
  foreignExchangeAfterDeductionU115F: z.string().optional(),

  section54ResidentialDate: z.string().optional(),
  section54ResidentialCost: z.string().optional(),
  section54ResidentialDeduction: z.string().optional(),

  section54FAgricultureDate: z.string().optional(),
  section54FAgricultureCost: z.string().optional(),
  section54FAgricultureDeduction: z.string().optional(),

  section54GDeductionDate: z.string().optional(),
  section54GDeductionAmount: z.string().optional(),

  capitalLossBroughtForwardShortTerm: z.string().optional(),
  capitalLossBroughtForwardLongTerm: z.string().optional(),
  capitalLossBroughtForwardTotal: z.string().optional(),

  passThroughIncomeLTCG: z.string().optional(),
  passThroughIncomeLTCGRate: z.string().optional(),
  passThroughIncomeOtherUS: z.string().optional(),
  passThroughIncomeOtherRate: z.string().optional(),
  passThroughIncomeChargeable: z.string().optional(),

  dtaaClaimedLTCGAmount: z.string().optional(),
  dtaaClaimedLTCGCountry: z.string().optional(),
  dtaaClaimedLTCGArticle: z.string().optional(),
  dtaaClaimedLTCGRate: z.string().optional(),

  capitalLossBuyBackDate: z.string().optional(),
  capitalLossBuyBackAmount: z.string().optional(),
  capitalLossBuyBackSetOff: z.string().optional(),

  vdaCapitalGainRate30: z.string().optional(),

  capitalLoss15Percent: z.string().optional(),
  capitalLoss15PercentSetOff: z.string().optional(),
  capitalLoss20Percent: z.string().optional(),
  capitalLoss20PercentSetOff: z.string().optional(),
  capitalLoss30Percent: z.string().optional(),
  capitalLoss30PercentSetOff: z.string().optional(),
  capitalLossApplicableRate: z.string().optional(),
  capitalLossApplicableRateSetOff: z.string().optional(),
  capitalLossDTAARate: z.string().optional(),
  capitalLossDTAARateSetOff: z.string().optional(),

  lossSetOffAgainst15: z.string().optional(),
  lossSetOffAgainst20: z.string().optional(),
  lossSetOffAgainst30: z.string().optional(),
  lossSetOffAgainstApplicable: z.string().optional(),
  lossSetOffAgainstDTAA: z.string().optional(),

  stcgUpto15June15Percent: z.string().optional(),
  stcgUpto15June20Percent: z.string().optional(),
  stcgUpto15June30Percent: z.string().optional(),
  stcgUpto15JuneApplicable: z.string().optional(),
  stcgUpto15JuneDTAA: z.string().optional(),

  stcg16JuneTo15Sep15Percent: z.string().optional(),
  stcg16JuneTo15Sep20Percent: z.string().optional(),
  stcg16JuneTo15Sep30Percent: z.string().optional(),
  stcg16JuneTo15SepApplicable: z.string().optional(),
  stcg16JuneTo15SepDTAA: z.string().optional(),

  stcg16SepTo15Dec15Percent: z.string().optional(),
  stcg16SepTo15Dec20Percent: z.string().optional(),
  stcg16SepTo15Dec30Percent: z.string().optional(),
  stcg16SepTo15DecApplicable: z.string().optional(),
  stcg16SepTo15DecDTAA: z.string().optional(),

  stcg16DecTo15Mar15Percent: z.string().optional(),
  stcg16DecTo15Mar20Percent: z.string().optional(),
  stcg16DecTo15Mar30Percent: z.string().optional(),
  stcg16DecTo15MarApplicable: z.string().optional(),
  stcg16DecTo15MarDTAA: z.string().optional(),

  stcg16MarTo31Mar15Percent: z.string().optional(),
  stcg16MarTo31Mar20Percent: z.string().optional(),
  stcg16MarTo31Mar30Percent: z.string().optional(),
  stcg16MarTo31MarApplicable: z.string().optional(),
  stcg16MarTo31MarDTAA: z.string().optional(),

  ltcgUpto15June10Percent: z.string().optional(),
  ltcgUpto15June12Point5: z.string().optional(),
  ltcgUpto15JuneDTAA: z.string().optional(),

  ltcg16JuneTo15Sep10Percent: z.string().optional(),
  ltcg16JuneTo15Sep12Point5: z.string().optional(),
  ltcg16JuneTo15SepDTAA: z.string().optional(),

  ltcg16SepTo15Dec10Percent: z.string().optional(),
  ltcg16SepTo15Dec12Point5: z.string().optional(),
  ltcg16SepTo15DecDTAA: z.string().optional(),

  ltcg16DecTo15Mar10Percent: z.string().optional(),
  ltcg16DecTo15Mar12Point5: z.string().optional(),
  ltcg16DecTo15MarDTAA: z.string().optional(),

  ltcg16MarTo31Mar10Percent: z.string().optional(),
  ltcg16MarTo31Mar12Point5: z.string().optional(),
  ltcg16MarTo31MarDTAA: z.string().optional(),

  totalLossSetOff: z.string().optional(),
  lossRemainingAfterSetOff: z.string().optional(),

  ltcgPropertySubtotal: z.string().optional(),
  ltcgDepreciableAssets: z.string().optional(),
  ltcgDepreciableDeductionsU54: z.string().optional(),
  ltcgDepreciableBalance: z.string().optional(),
  ltcgOtherAssets: z.string().optional(),
  ltcgOtherDeductionsU54: z.string().optional(),
  ltcgOtherBalance: z.string().optional(),

  unlistedSTCGSaleValue: z.string().optional(),
  unlistedSTCGCost: z.string().optional(),
  unlistedSTCGExpenses: z.string().optional(),
  unlistedSTCGGain: z.string().optional(),

  unlistedLTCGSaleValue: z.string().optional(),
  unlistedLTCGCost: z.string().optional(),
  unlistedLTCGExpenses: z.string().optional(),
  unlistedLTCGGain: z.string().optional(),

  nonResidentsGdrValue: z.string().optional(),
  nonResidentsGdrCost: z.string().optional(),
  nonResidentsGdrExpenses: z.string().optional(),
  nonResidentsGdrGain: z.string().optional(),

  broughtForwardSTCGLoss: z.string().optional(),
  broughtForwardLTCGLoss: z.string().optional(),
  broughtForwardCapitalLoss: z.string().optional(),

  deductionSection48STCG: z.string().optional(),
  deductionSection48LTCG: z.string().optional(),
  deductionSection54Residential: z.string().optional(),
  deductionSection54NonResidential: z.string().optional(),

  stcgTaxableIncome: z.string().optional(),
  ltcgTaxableIncome: z.string().optional(),
  ltcgRate: z.string().optional(),

  totalShortTermCapitalGain: z.string().optional(),
  totalLongTermCapitalGain: z.string().optional(),
  totalCapitalGain: z.string().optional(),
  capitalLoss: z.string().optional(),
  capitalLossSetOff: z.string().optional(),
  netCapitalGain: z.string().optional(),
  capitalLossCarryForward: z.string().optional(),
}).superRefine((data, ctx) => {
  // Validate all amounts are non-negative numbers
  const numericFields = [
    "slumpSaleFairMarket", "slumpSaleCostOfPurchase", "slumpSaleNetWorth", "slumpSaleGain",
    "equityBeforeSttValue", "equityBeforeCost", "equityBeforeExpenses", "equityBeforeGain",
    "equityOnAfterSttValue", "equityOnAfterCost", "equityOnAfterExpenses", "equityOnAfterGain",
    "gdrSaleValue", "gdrSaleCostOfAcq", "gdrSaleExpenses", "gdrSaleGain",
    "equitySttSaleValue", "equitySttCostOfAcq", "equitySttExpenses", "equitySttGain",
    "nonResidentsSttValue", "nonResidentsSttCost", "nonResidentsSttExpenses", "nonResidentsSttGain",
    "bondsDebentureSaleValue", "bondsDebentureCost", "bondsDebentureExpenses", "bondsDebentureGain",
    "unlistedSecuritiesValue", "unlistedSecuritiesCost", "unlistedSecuritiesExpenses", "unlistedSecuritiesGain",
    "nonResidentUnlistedValue", "nonResidentUnlistedCost", "nonResidentUnlistedExpenses", "nonResidentUnlistedGain",
    "ltcgPropertyBeforeValue", "ltcgPropertyBeforeCost", "ltcgPropertyBeforeIndexedCost", 
    "ltcgPropertyBeforeExpenses", "ltcgPropertyBeforeDeductionU54", "ltcgPropertyBeforeGain",
    "ltcgPropertyAfterValue", "ltcgPropertyAfterCost", "ltcgPropertyAfterIndexedCost",
    "ltcgPropertyAfterExpenses", "ltcgPropertyAfterDeductionU54", "ltcgPropertyAfterGain",
    "foreignExchangeAssetValue", "foreignExchangeAssetCost", "foreignExchangeAssetExpenses", "foreignExchangeAssetGain",
    "foreignExchangeBeforeDeductionU115F", "foreignExchangeAfterDeductionU115F",
    "section54ResidentialCost", "section54ResidentialDeduction",
    "section54FAgricultureCost", "section54FAgricultureDeduction",
    "section54GDeductionAmount",
    "capitalLossBroughtForwardShortTerm", "capitalLossBroughtForwardLongTerm", "capitalLossBroughtForwardTotal",
    "passThroughIncomeLTCG", "passThroughIncomeOtherUS", "passThroughIncomeChargeable",
    "dtaaClaimedLTCGAmount",
    "capitalLossBuyBackAmount", "capitalLossBuyBackSetOff",
    "ltcgPropertySubtotal", "ltcgDepreciableAssets", "ltcgOtherAssets",
  ] as const;

  numericFields.forEach((field) => {
    const value = data[field as keyof typeof data] as string | undefined;
    if (value !== undefined && value !== "") {
      const val = parseFloat(value);
      if (isNaN(val) || val < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} must be a valid non-negative number`,
        });
      }
    }
  });

  console.log("Schedule CG - Comprehensive Capital Gains Data", data);
});

interface ScheduleCGProps {
  onNext: () => void;
  onBack: () => void;
  onSave: (data: ScheduleCGFormData) => void;
  initialData?: ScheduleCGFormData;
}

const ItrThreeScheduleCG: React.FC<ScheduleCGProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const { watch, handleSubmit, formState: { errors }, register } = useForm<ScheduleCGFormData>({
    resolver: zodResolver(scheduleCGSchema),
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const formData = watch();

  const capitalGainsSummary = useMemo(() => {
    const stcgProp = parseFloat(formData.stcgPropertySubtotal || "0") || 0;
    const slump = parseFloat(formData.slumpSaleGain || "0") || 0;
    const eqBefore = parseFloat(formData.equityBeforeGain || "0") || 0;
    const eqAfter = parseFloat(formData.equityOnAfterGain || "0") || 0;
    const gdr = parseFloat(formData.gdrSaleGain || "0") || 0;
    const eqStt = parseFloat(formData.equitySttGain || "0") || 0;
    const nonResStt = parseFloat(formData.nonResidentsSttGain || "0") || 0;
    const bonds = parseFloat(formData.bondsDebentureGain || "0") || 0;
    const unlistedStcg = parseFloat(formData.unlistedSTCGGain || "0") || 0;
    const nonResGdr = parseFloat(formData.nonResidentsGdrGain || "0") || 0;

    const shortTermTotal = stcgProp + slump + eqBefore + eqAfter + gdr + eqStt + nonResStt + bonds + unlistedStcg + nonResGdr;

    const ltcgProp = parseFloat(formData.ltcgPropertySubtotal || "0") || 0;
    const ltcgDepr = parseFloat(formData.ltcgDepreciableAssets || "0") || 0;
    const ltcgOther = parseFloat(formData.ltcgOtherAssets || "0") || 0;
    const unlistedLtcg = parseFloat(formData.unlistedLTCGGain || "0") || 0;

    const longTermTotal = ltcgProp + ltcgDepr + ltcgOther + unlistedLtcg;

    const grossGain = shortTermTotal + longTermTotal;
    const capLoss = parseFloat(formData.capitalLoss || "0") || 0;
    const netGain = Math.max(0, grossGain - capLoss);
    const carriedForward = Math.max(0, capLoss - grossGain);

    return {
      shortTermTotal,
      longTermTotal,
      grossGain,
      capitalLoss: capLoss,
      netGain,
      carriedForward,
    };
  }, [formData]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm max-h-screen overflow-y-auto">
      <div className="space-y-2 border-b-2 border-indigo-500 pb-4 sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-gray-900">
          Schedule CG - Capital Gains (Complete with 35+ Fields)
        </h2>
        <p className="text-sm text-gray-600">
          Comprehensive capital gains computation covering STCG, LTCG, property, equity, securities, GDR/FPI, and all deductions
        </p>
      </div>

      {hasErrors && (
        <div className="space-y-2 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="font-semibold text-red-900">Validation Errors Found</p>
          <p className="text-sm text-red-800">Please check your entries above.</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit((data) => {
          onSave(data);
          onNext();
        })}
        className="space-y-6"
      >
        {/* SECTION A: STCG on Property */}
        <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4 space-y-3">
          <h3 className="font-bold text-blue-900">A. Short-Term Capital Gains - Property</h3>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Total STCG from Property</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("stcgPropertySubtotal")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>

        {/* SECTION 2: Slump Sale */}
        <div className="rounded-lg border-2 border-purple-300 bg-purple-50 p-4 space-y-3">
          <h3 className="font-bold text-purple-900">2. Slump Sale</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Fair Market Value (Rule 11UA(2))</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("slumpSaleFairMarket")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Purchase</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("slumpSaleCostOfPurchase")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Net Worth of Undertaking</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("slumpSaleNetWorth")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Slump Sale Gain</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("slumpSaleGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 3: Equity Shares & Mutual Funds */}
        <div className="rounded-lg border-2 border-green-300 bg-green-50 p-4 space-y-3">
          <h3 className="font-bold text-green-900">3. Equity Shares & Mutual Funds (Section 112A/111A)</h3>
          
          <div className="space-y-3">
            <p className="font-semibold text-green-800">3.a Where transfer before 23 July 2024 (STT Marked Value)</p>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="text-sm font-semibold text-gray-700">STT Marked Value</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityBeforeSttValue")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityBeforeCost")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-gray-700">Expenses</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityBeforeExpenses")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-gray-700">STCG Gain</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityBeforeGain")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-green-200">
            <p className="font-semibold text-green-800">3.b Where transfer on or after 23 July 2024 (STT Marked Value)</p>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <span className="text-sm font-semibold text-gray-700">STT Marked Value</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityOnAfterSttValue")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityOnAfterCost")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-gray-700">Expenses</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityOnAfterExpenses")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-sm font-semibold text-gray-700">STCG Gain</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register("equityOnAfterGain")}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 4: GDR & FPI */}
        <div className="rounded-lg border-2 border-rose-300 bg-rose-50 p-4 space-y-3">
          <h3 className="font-bold text-rose-900">4. GDR & FPI Securities (with Forex Adjustment)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("gdrSaleValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("gdrSaleCostOfAcq")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("gdrSaleExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Total Gain</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("gdrSaleGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 5: STT Securities */}
        <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4 space-y-3">
          <h3 className="font-bold text-yellow-900">5. Equity STT Securities (Section 111A)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("equitySttSaleValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-yellow-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("equitySttCostOfAcq")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-yellow-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("equitySttExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-yellow-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Total Gain</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("equitySttGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-yellow-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 6: Non-STT Securities */}
        <div className="rounded-lg border-2 border-cyan-300 bg-cyan-50 p-4 space-y-3">
          <h3 className="font-bold text-cyan-900">6. Non-Residents STT Securities & Debentures</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentsSttValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentsSttCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentsSttExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Total Gain</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentsSttGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-cyan-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 7: Bonds & Debentures */}
        <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-4 space-y-3">
          <h3 className="font-bold text-orange-900">7. Bonds & Debentures (Section 112(1))</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("bondsDebentureSaleValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("bondsDebentureCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("bondsDebentureExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Total Gain</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("bondsDebentureGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION B2: LTCG on Property */}
        <div className="rounded-lg border-2 border-teal-300 bg-teal-50 p-4 space-y-3">
          <h3 className="font-bold text-teal-900">B2. Long-Term Capital Gains - Property (with Indexation)</h3>
          <label>
            <span className="text-sm font-semibold text-gray-700">Total LTCG from Property</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("ltcgPropertySubtotal")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-teal-600 focus:outline-none"
            />
          </label>
        </div>

        {/* SECTION 8: LTCG Depreciable Assets */}
        <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-4 space-y-3">
          <h3 className="font-bold text-indigo-900">8. LTCG - Depreciable Assets (Schedule DCG)</h3>
          <label>
            <span className="text-sm font-semibold text-gray-700">LTCG from Depreciable Assets</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("ltcgDepreciableAssets")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:outline-none"
            />
          </label>
        </div>

        {/* SECTION 9: LTCG Other Assets */}
        <div className="rounded-lg border-2 border-pink-300 bg-pink-50 p-4 space-y-3">
          <h3 className="font-bold text-pink-900">9. LTCG - Other Assets</h3>
          <label>
            <span className="text-sm font-semibold text-gray-700">LTCG from Other Assets</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("ltcgOtherAssets")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-pink-600 focus:outline-none"
            />
          </label>
        </div>

        {/* CAPITAL LOSS */}
        <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 space-y-3">
          <h3 className="font-bold text-red-900">Capital Loss</h3>
          <label>
            <span className="text-sm font-semibold text-gray-700">Capital Loss (Short-term/Long-term)</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("capitalLoss")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-red-600 focus:outline-none"
            />
          </label>
        </div>

        {/* SUMMARY */}
        <div className="space-y-4 rounded-lg border-2 border-indigo-400 bg-gradient-to-r from-indigo-50 to-blue-50 p-4">
          <h3 className="font-bold text-indigo-900 text-lg">Capital Gains Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded bg-white p-3 border border-blue-300 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">Total STCG</p>
              <p className="mt-2 text-xl font-bold text-blue-700">
                ₹{capitalGainsSummary.shortTermTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="rounded bg-white p-3 border border-blue-300 shadow-sm">
              <p className="text-xs font-semibold text-gray-600">Total LTCG</p>
              <p className="mt-2 text-xl font-bold text-blue-700">
                ₹{capitalGainsSummary.longTermTotal.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="rounded bg-white p-3 border border-indigo-300 shadow-sm col-span-2">
              <p className="text-xs font-semibold text-gray-600">Gross Capital Gain</p>
              <p className="mt-2 text-2xl font-bold text-indigo-700">
                ₹{capitalGainsSummary.grossGain.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 8: UNLISTED SECURITIES */}
        <div className="rounded-lg border-2 border-violet-300 bg-violet-50 p-4 space-y-3">
          <h3 className="font-bold text-violet-900">8. Unlisted Securities (STCG/LTCG)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Description</span>
              <input
                type="text"
                placeholder="e.g., Private Ltd shares"
                {...register("unlistedSecuritiesDescription")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("unlistedSecuritiesValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("unlistedSecuritiesCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("unlistedSecuritiesExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none"
              />
            </label>
            <label className="col-span-2">
              <span className="text-sm font-semibold text-gray-700">Gain/(Loss)</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("unlistedSecuritiesGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-violet-500 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 9: NON-RESIDENT - UNLISTED SHARES */}
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4 space-y-3">
          <h3 className="font-bold text-amber-900">9. Non-Resident - Unlisted Securities & Shares</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentUnlistedValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-amber-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentUnlistedCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-amber-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("nonResidentUnlistedExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-amber-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Gain/(Loss)</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("nonResidentUnlistedGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-amber-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 10: LTCG PROPERTY TRANSFER - BEFORE 23 JULY 2024 */}
        <div className="rounded-lg border-2 border-sky-300 bg-sky-50 p-4 space-y-3">
          <h3 className="font-bold text-sky-900">10. LTCG on Property - Before 23 July 2024</h3>
          <p className="text-xs text-sky-700 font-semibold">With Indexation Benefit (Rule 11UA)</p>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyBeforeValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-sky-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyBeforeCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-sky-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Indexed Cost</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyBeforeIndexedCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-sky-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyBeforeExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-sky-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Deduction Under Section 54</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyBeforeDeductionU54")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-sky-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Net Gain/(Loss)</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("ltcgPropertyBeforeGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-sky-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 11: LTCG PROPERTY TRANSFER - ON/AFTER 23 JULY 2024 */}
        <div className="rounded-lg border-2 border-slate-300 bg-slate-50 p-4 space-y-3">
          <h3 className="font-bold text-slate-900">11. LTCG on Property - On or After 23 July 2024</h3>
          <p className="text-xs text-slate-700 font-semibold">Without Indexation Benefit (New Rule)</p>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyAfterValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-slate-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyAfterCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-slate-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Indexed Cost (if applicable)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyAfterIndexedCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-slate-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyAfterExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-slate-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Deduction Under Section 54(1)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("ltcgPropertyAfterDeductionU54")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-slate-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Net Gain/(Loss)</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("ltcgPropertyAfterGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-slate-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 12: FOREIGN EXCHANGE ASSET - NON-RESIDENTS */}
        <div className="rounded-lg border-2 border-lime-300 bg-lime-50 p-4 space-y-3">
          <h3 className="font-bold text-lime-900">12. Sale of Foreign Exchange Assets - Non-Residents (Chapter XII-A)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Sale Value</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("foreignExchangeAssetValue")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-lime-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("foreignExchangeAssetCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-lime-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Expenses</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("foreignExchangeAssetExpenses")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-lime-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Gain as per Section 115F</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("foreignExchangeAssetGain")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-lime-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Deduction Under 115F (Before)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("foreignExchangeBeforeDeductionU115F")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-lime-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Deduction Under 115F (After)</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("foreignExchangeAfterDeductionU115F")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-lime-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 13: SECTION 54 DEDUCTIONS */}
        <div className="rounded-lg border-2 border-fuchsia-300 bg-fuchsia-50 p-4 space-y-3">
          <h3 className="font-bold text-fuchsia-900">13. Deductions Under Section 54 (Residential Property)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Date of Transfer (Original)</span>
              <input
                type="date"
                {...register("section54ResidentialDate")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-fuchsia-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("section54ResidentialCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-fuchsia-600 focus:outline-none"
              />
            </label>
            <label className="col-span-2">
              <span className="text-sm font-semibold text-gray-700">Deduction Claimed Under Section 54</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("section54ResidentialDeduction")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-fuchsia-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 14: SECTION 54F DEDUCTIONS */}
        <div className="rounded-lg border-2 border-red-400 bg-red-50 p-4 space-y-3">
          <h3 className="font-bold text-red-900">14. Deductions Under Section 54F (Agricultural Land)</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Date of Transfer</span>
              <input
                type="date"
                {...register("section54FAgricultureDate")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-red-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Cost of Acquisition</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("section54FAgricultureCost")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-red-600 focus:outline-none"
              />
            </label>
            <label className="col-span-2">
              <span className="text-sm font-semibold text-gray-700">Deduction Claimed Under Section 54F</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("section54FAgricultureDeduction")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-red-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 15: CAPITAL LOSS BROUGHT FORWARD */}
        <div className="rounded-lg border-2 border-gray-400 bg-gray-100 p-4 space-y-3">
          <h3 className="font-bold text-gray-900">15. Capital Loss Brought Forward</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">STCG Loss (Prev Year)</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("capitalLossBroughtForwardShortTerm")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-gray-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">LTCG Loss (Prev Year)</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("capitalLossBroughtForwardLongTerm")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-gray-600 focus:outline-none"
              />
            </label>
            <label className="col-span-2">
              <span className="text-sm font-semibold text-gray-700">Total Capital Loss BF</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("capitalLossBroughtForwardTotal")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-gray-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION 16: PASS THROUGH INCOME/LOSS - DTAA */}
        <div className="rounded-lg border-2 border-blue-400 bg-blue-100 p-4 space-y-3">
          <h3 className="font-bold text-blue-900">16. Pass Through Income/Loss (DTAA) - Section B12</h3>
          <p className="text-xs text-blue-700">LTCG Chargeable @ 12.5% u/s 112A</p>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Pass Through LTCG Amount</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("passThroughIncomeLTCG")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Tax Rate %</span>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="0.00"
                {...register("passThroughIncomeLTCGRate")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Other US Amount</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("passThroughIncomeOtherUS")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Other Rate %</span>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="0.00"
                {...register("passThroughIncomeOtherRate")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
              />
            </label>
            <label className="col-span-2">
              <span className="text-sm font-semibold text-gray-700">Total Amount Chargeable</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("passThroughIncomeChargeable")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* SECTION C: CAPITAL GAIN ON VIRTUAL DIGITAL ASSET */}
        <div className="rounded-lg border-2 border-purple-400 bg-purple-100 p-4 space-y-3">
          <h3 className="font-bold text-purple-900">C. Capital Gain on Transfer of Virtual Digital Asset (VDA)</h3>
          <p className="text-xs text-purple-700 font-semibold">Taxable at 30% rate (Item 1/10 of Schedule BFLA)</p>
          <label>
            <span className="text-sm font-semibold text-gray-700">VDA Capital Gain @ 30%</span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("vdaCapitalGainRate30")}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-purple-600 focus:outline-none"
            />
          </label>
        </div>

        {/* SECTION E: SET-OFF OF CURRENT YEAR CAPITAL LOSSES WITH GAINS */}
        <div className="rounded-lg border-2 border-red-500 bg-red-100 p-4 space-y-4">
          <h3 className="font-bold text-red-900">E. Set-off of Current Year Capital Losses with Current Year Capital Gains</h3>
          <p className="text-xs text-red-700">Capital Loss of Rupees (Fill this row only if figure is negative)</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-red-200">
                  <th className="border border-gray-300 p-2 text-left font-semibold">Rate %</th>
                  <th className="border border-gray-300 p-2 text-left font-semibold">Loss Amount</th>
                  <th className="border border-gray-300 p-2 text-left font-semibold">Set-off Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">15%</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLoss15Percent")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLoss15PercentSetOff")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">20%</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLoss20Percent")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLoss20PercentSetOff")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">30%</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLoss30Percent")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLoss30PercentSetOff")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">Applicable Rate</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLossApplicableRate")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLossApplicableRateSetOff")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                </tr>
                <tr className="bg-red-200">
                  <td className="border border-gray-300 p-2 font-semibold">DTAA Rates</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLossDTAARate")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("capitalLossDTAARateSetOff")}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-red-500 focus:outline-none"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION F: ACCRUAL/RECEIPT OF CAPITAL GAIN BY DATE */}
        <div className="rounded-lg border-2 border-teal-500 bg-teal-100 p-4 space-y-4">
          <h3 className="font-bold text-teal-900">F. Information about Accrual/Receipt of Capital Gain by Date</h3>
          
          {/* STCG Section */}
          <div className="space-y-2">
            <h4 className="font-semibold text-teal-800">Short-Term Capital Gains (STCG)</h4>
            <div className="grid grid-cols-3 gap-3">
              <label>
                <span className="text-xs font-semibold text-gray-700">Upto 15 June (15%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("stcgUpto15June15Percent")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Jun-15 Sep (20%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("stcg16JuneTo15Sep20Percent")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Sep-15 Dec (30%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("stcg16SepTo15Dec30Percent")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Dec-15 Mar (Applicable)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("stcg16DecTo15MarApplicable")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Mar-31 Mar (DTAA)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("stcg16MarTo31MarDTAA")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* LTCG Section */}
          <div className="space-y-2 border-t border-teal-300 pt-3">
            <h4 className="font-semibold text-teal-800">Long-Term Capital Gains (LTCG)</h4>
            <div className="grid grid-cols-3 gap-3">
              <label>
                <span className="text-xs font-semibold text-gray-700">Upto 15 June (10%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("ltcgUpto15June10Percent")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Jun-15 Sep (12.5%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("ltcg16JuneTo15Sep12Point5")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Sep-15 Dec (10%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("ltcg16SepTo15Dec10Percent")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Dec-15 Mar (12.5%)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("ltcg16DecTo15Mar12Point5")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
              <label>
                <span className="text-xs font-semibold text-gray-700">16 Mar-31 Mar (DTAA)</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("ltcg16MarTo31MarDTAA")}
                  className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-teal-500 focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        {/* TOTAL LOSS CALCULATION */}
        <div className="rounded-lg border-2 border-orange-500 bg-orange-100 p-4 space-y-3">
          <h3 className="font-bold text-orange-900">Total Loss Set-off Calculation</h3>
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="text-sm font-semibold text-gray-700">Total Loss Set-off</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("totalLossSetOff")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-600 focus:outline-none"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-gray-700">Loss Remaining After Set-off</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("lossRemainingAfterSetOff")}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:border-orange-600 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* NET CAPITAL GAIN */}
        <div className="rounded-lg border-3 border-green-600 bg-gradient-to-r from-green-100 to-emerald-100 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-green-900">Net Capital Gain (A10)</p>
              <p className="text-sm text-green-700 mt-1">Less: Capital Loss of ₹{capitalGainsSummary.capitalLoss.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
            </div>
            <p className="text-4xl font-bold text-green-700">
              ₹{capitalGainsSummary.netGain.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </p>
          </div>
          {capitalGainsSummary.carriedForward > 0 && (
            <p className="text-sm text-green-600 mt-3">Capital Loss to be carried forward: ₹{capitalGainsSummary.carriedForward.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 border-t border-gray-200 pt-6 sticky bottom-0 bg-white z-10">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={hasErrors}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreeScheduleCG;
