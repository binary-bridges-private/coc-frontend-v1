import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// Other Information Form Data Type
export interface OIFormData {
  // 1. Accounting Method
  methodOfAccounting?: string; // Tick mark or Cash/Mercantile

  // 2. Change in method of accounting
  changeInAccountingMethod?: 'yes' | 'no';
  increaseDecreaseDeviation3a?: string;
  decreaseIncreaseDeviation3b?: string;

  // 4. Valuation of closing stock
  stockValuationMethod?: string;
  changeInStockValuationMethod?: 'yes' | 'no';
  increaseDecreaseDeviation4d?: string;
  decreaseIncreaseDeviation4e?: string;

  // 5. Amounts not credited to P&L
  itemsFallingSection28?: string;
  performaCreditsDuty?: string;
  escalationClaimsYear?: string;
  anyOtherIncomeItem?: string;
  capitalReceipt?: string;

  // 6. Amounts debited under section 36
  insuranceStockDamage?: string;
  insuranceHealthEmployees?: string;
  bonusCommissionEmployees?: string;
  interestPaid?: string;
  discountZeroCoupon?: string;
  recognizedProvidentFund?: string;
  approvedSuperannuationFund?: string;
  pensionScheme?: string;
  approvedGratuityFund?: string;
  otherFunds?: string;
  otherContributionsEmployees?: string;
  badDebtAndDoubtful?: string;
  provisionBadDebts?: string;
  specialReserve?: string;
  promotingEmployees?: string;
  securitiesTransactionTax?: string;
  markToMarketLoss?: string;
  otherDisallowance?: string;

  // 7. Amounts disallowable under section 37
  capitalExpenditureTax?: string;
  capitalExpenditurePersonal?: string;
  advertisementViability?: string;
  advertisementPolitical?: string;
  penaltyOrFine?: string;
  anyOtherPenalty?: string;
  liabilityContingent?: string;
  otherDisallowanceSection37?: string;

  // 8. Amounts disallowable under section 40
  nonComplianceChapter7?: string;
  nonComplianceChapter7B1?: string;
  nonComplianceChapter8?: string;
  nonComplianceChapter8Finance?: string;
  nonComplianceCorporateForm?: string;
  taxNotRemitted?: string;
  wealthTaxFee?: string;
  interestNonBankingFin?: string;
  interestFromBank?: string;
  employeeContribution?: string;
  loanBorrowing?: string;
  loanBorrowingScheduledBank?: string;
  leaveEncashmentPayable?: string;
  railwayAssetsPayable?: string;
  msmePayable?: string;

  // 9. Amounts disallowable under section 40A
  amountsPaid?: string;
  paymentByCheck?: string;
  paymentElectronicMode?: string;
  provisionGratuity?: string;
  otherDisallowanceSection40A?: string;

  // 10. Amounts disallowable under section 43B
  taxDuePayable?: string;
  taxPayableElectronic?: string;
  provisionGratuityEmployees?: string;
  otherFundWelfare?: string;

  // 11. Disallowance under other sections
  anyAmountDisallowable43B?: string;

  // 12. Credit outstanding in accounts
  unionExciseDutyCredit?: string;
  serviceTaxCredit?: string;
  vatSalesTaxCredit?: string;
  cgstCredit?: string;
  sgstCredit?: string;
  igstCredit?: string;
  utgstCredit?: string;
  otherTaxCredit?: string;

  // 13. Amounts deemed under section 23AB/23ABA
  amountsDeemedSection23AB?: string;

  // 14. Profit chargeable under section 41
  profitChargeableSection41?: string;

  // 15. Prior period income/expenditure
  priorPeriodIncome?: string;
  priorPeriodExpenditure?: string;

  // 16. Disallowance under section 92 IA
  disallowanceSection92IA?: string;

  // 17. FPSA exercise
  fpsa?: string;
}

// Zod Schema
const oiSchema = z.object({
  methodOfAccounting: z.string().optional().or(z.literal('')),
  changeInAccountingMethod: z.enum(['yes', 'no']).optional(),
  increaseDecreaseDeviation3a: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  decreaseIncreaseDeviation3b: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  stockValuationMethod: z.string().optional().or(z.literal('')),
  changeInStockValuationMethod: z.enum(['yes', 'no']).optional(),
  increaseDecreaseDeviation4d: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  decreaseIncreaseDeviation4e: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  itemsFallingSection28: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  performaCreditsDuty: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  escalationClaimsYear: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  anyOtherIncomeItem: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  capitalReceipt: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  // All remaining fields - similar validation pattern
  insuranceStockDamage: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  insuranceHealthEmployees: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  bonusCommissionEmployees: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  interestPaid: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  discountZeroCoupon: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  recognizedProvidentFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  approvedSuperannuationFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  pensionScheme: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  approvedGratuityFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherFunds: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherContributionsEmployees: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  badDebtAndDoubtful: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  provisionBadDebts: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  specialReserve: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  promotingEmployees: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  securitiesTransactionTax: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  markToMarketLoss: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherDisallowance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  capitalExpenditureTax: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  capitalExpenditurePersonal: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  advertisementViability: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  advertisementPolitical: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  penaltyOrFine: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  anyOtherPenalty: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  liabilityContingent: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherDisallowanceSection37: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  nonComplianceChapter7: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  nonComplianceChapter7B1: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  nonComplianceChapter8: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  nonComplianceChapter8Finance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  nonComplianceCorporateForm: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  taxNotRemitted: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  wealthTaxFee: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  interestNonBankingFin: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  interestFromBank: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  employeeContribution: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  loanBorrowing: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  loanBorrowingScheduledBank: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  leaveEncashmentPayable: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  railwayAssetsPayable: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  msmePayable: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  amountsPaid: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  paymentByCheck: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  paymentElectronicMode: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  provisionGratuity: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherDisallowanceSection40A: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  taxDuePayable: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  taxPayableElectronic: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  provisionGratuityEmployees: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherFundWelfare: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  anyAmountDisallowable43B: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  unionExciseDutyCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  serviceTaxCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  vatSalesTaxCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  cgstCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  sgstCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  igstCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  utgstCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  otherTaxCredit: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  amountsDeemedSection23AB: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  profitChargeableSection41: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  priorPeriodIncome: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  priorPeriodExpenditure: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  disallowanceSection92IA: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  fpsa: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // Validate Section 36 disallowances
  const section36Items = [
    parseAmount(data.insuranceStockDamage),
    parseAmount(data.insuranceHealthEmployees),
    parseAmount(data.bonusCommissionEmployees),
    parseAmount(data.interestPaid),
    parseAmount(data.discountZeroCoupon),
    parseAmount(data.recognizedProvidentFund),
    parseAmount(data.approvedSuperannuationFund),
    parseAmount(data.pensionScheme),
    parseAmount(data.approvedGratuityFund),
    parseAmount(data.otherFunds),
    parseAmount(data.otherContributionsEmployees),
    parseAmount(data.badDebtAndDoubtful),
    parseAmount(data.provisionBadDebts),
    parseAmount(data.specialReserve),
    parseAmount(data.promotingEmployees),
    parseAmount(data.securitiesTransactionTax),
    parseAmount(data.markToMarketLoss),
    parseAmount(data.otherDisallowance),
  ];
  const section36Total = section36Items.reduce((a, b) => a + b, 0);

  // Validate Section 37 disallowances
  const section37Items = [
    parseAmount(data.capitalExpenditureTax),
    parseAmount(data.capitalExpenditurePersonal),
    parseAmount(data.advertisementViability),
    parseAmount(data.advertisementPolitical),
    parseAmount(data.penaltyOrFine),
    parseAmount(data.anyOtherPenalty),
    parseAmount(data.liabilityContingent),
    parseAmount(data.otherDisallowanceSection37),
  ];
  const section37Total = section37Items.reduce((a, b) => a + b, 0);

  // Validate Section 40 disallowances
  const section40Items = [
    parseAmount(data.nonComplianceChapter7),
    parseAmount(data.nonComplianceChapter7B1),
    parseAmount(data.nonComplianceChapter8),
    parseAmount(data.nonComplianceChapter8Finance),
    parseAmount(data.nonComplianceCorporateForm),
    parseAmount(data.taxNotRemitted),
    parseAmount(data.wealthTaxFee),
    parseAmount(data.interestNonBankingFin),
    parseAmount(data.interestFromBank),
    parseAmount(data.employeeContribution),
    parseAmount(data.loanBorrowing),
    parseAmount(data.loanBorrowingScheduledBank),
    parseAmount(data.leaveEncashmentPayable),
    parseAmount(data.railwayAssetsPayable),
    parseAmount(data.msmePayable),
  ];
  const section40Total = section40Items.reduce((a, b) => a + b, 0);

  // Validate Section 40A disallowances
  const section40AItems = [
    parseAmount(data.amountsPaid),
    parseAmount(data.paymentByCheck),
    parseAmount(data.paymentElectronicMode),
    parseAmount(data.provisionGratuity),
    parseAmount(data.otherDisallowanceSection40A),
  ];
  const section40ATotal = section40AItems.reduce((a, b) => a + b, 0);

  // Validate Section 43B disallowances
  const section43BItems = [
    parseAmount(data.taxDuePayable),
    parseAmount(data.taxPayableElectronic),
    parseAmount(data.provisionGratuityEmployees),
    parseAmount(data.otherFundWelfare),
    parseAmount(data.anyAmountDisallowable43B),
  ];
  const section43BTotal = section43BItems.reduce((a, b) => a + b, 0);

  // Validate amounts not credited to P&L
  const notCreditedItems = [
    parseAmount(data.itemsFallingSection28),
    parseAmount(data.performaCreditsDuty),
    parseAmount(data.escalationClaimsYear),
    parseAmount(data.anyOtherIncomeItem),
    parseAmount(data.capitalReceipt),
  ];
  const notCreditedTotal = notCreditedItems.reduce((a, b) => a + b, 0);

  // Validate tax credits outstanding
  const creditItems = [
    parseAmount(data.unionExciseDutyCredit),
    parseAmount(data.serviceTaxCredit),
    parseAmount(data.vatSalesTaxCredit),
    parseAmount(data.cgstCredit),
    parseAmount(data.sgstCredit),
    parseAmount(data.igstCredit),
    parseAmount(data.utgstCredit),
    parseAmount(data.otherTaxCredit),
  ];
  const creditTotal = creditItems.reduce((a, b) => a + b, 0);

  // Cross-field validation: Section 40A total should not exceed a reasonable percentage of Section 36
  if (section40ATotal > 0 && section36Total > 0 && section40ATotal > section36Total * 0.5) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Section 40A total disallowances (₹${section40ATotal.toFixed(2)}) appears high relative to Section 36 (₹${section36Total.toFixed(2)}). Please verify.`,
      path: [],
    });
  }

  // Cross-field validation: If accounting method changed, deviations should have values
  if (data.changeInAccountingMethod === 'yes') {
    const deviation3aValue = parseAmount(data.increaseDecreaseDeviation3a);
    const deviation3bValue = parseAmount(data.decreaseIncreaseDeviation3b);
    if (deviation3aValue === 0 && deviation3bValue === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Since accounting method changed (Item 2), please provide deviation amounts in Items 3a and/or 3b.',
        path: [],
      });
    }
  }

  // Cross-field validation: If stock valuation method changed, deviations should have values
  if (data.changeInStockValuationMethod === 'yes') {
    const deviation4dValue = parseAmount(data.increaseDecreaseDeviation4d);
    const deviation4eValue = parseAmount(data.decreaseIncreaseDeviation4e);
    if (deviation4dValue === 0 && deviation4eValue === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Since stock valuation method changed (Item 4), please provide deviation amounts in Items 4d and/or 4e.',
        path: [],
      });
    }
  }

  // Log detailed breakdown for debugging
  console.log('📋 Other Information Validation Summary:', {
    'Section 5 - Not Credited to P&L': notCreditedTotal,
    'Section 6 - Disallowances': section36Total,
    'Section 7 - Disallowances': section37Total,
    'Section 40 - Disallowances': section40Total,
    'Section 40A - Disallowances': section40ATotal,
    'Section 43B - Disallowances': section43BTotal,
    'Tax Credits Outstanding': creditTotal,
    'Total All Disallowances': section36Total + section37Total + section40Total + section40ATotal + section43BTotal,
  });
});

interface ItrThreePartAOIProps {
  initialData?: OIFormData;
  onNext: () => void;
  onBack: () => void;
  onSave: (data: OIFormData) => void;
}

const ItrThreePartAOI: React.FC<ItrThreePartAOIProps> = ({
  initialData,
  onNext,
  onBack,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OIFormData>({
    resolver: zodResolver(oiSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const formData = watch();

  const onSubmit = (data: OIFormData) => {
    onSave(data);
    onNext();
  };

  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // Calculate section totals
  const totals = useMemo(() => {
    const section36 = [
      parseAmount(formData.insuranceStockDamage),
      parseAmount(formData.insuranceHealthEmployees),
      parseAmount(formData.bonusCommissionEmployees),
      parseAmount(formData.interestPaid),
      parseAmount(formData.discountZeroCoupon),
      parseAmount(formData.recognizedProvidentFund),
      parseAmount(formData.approvedSuperannuationFund),
      parseAmount(formData.pensionScheme),
      parseAmount(formData.approvedGratuityFund),
      parseAmount(formData.otherFunds),
      parseAmount(formData.otherContributionsEmployees),
      parseAmount(formData.badDebtAndDoubtful),
      parseAmount(formData.provisionBadDebts),
      parseAmount(formData.specialReserve),
      parseAmount(formData.promotingEmployees),
      parseAmount(formData.securitiesTransactionTax),
      parseAmount(formData.markToMarketLoss),
      parseAmount(formData.otherDisallowance),
    ].reduce((a, b) => a + b, 0);

    const section37 = [
      parseAmount(formData.capitalExpenditureTax),
      parseAmount(formData.capitalExpenditurePersonal),
      parseAmount(formData.advertisementViability),
      parseAmount(formData.advertisementPolitical),
      parseAmount(formData.penaltyOrFine),
      parseAmount(formData.anyOtherPenalty),
      parseAmount(formData.liabilityContingent),
      parseAmount(formData.otherDisallowanceSection37),
    ].reduce((a, b) => a + b, 0);

    const section40 = [
      parseAmount(formData.nonComplianceChapter7),
      parseAmount(formData.nonComplianceChapter7B1),
      parseAmount(formData.nonComplianceChapter8),
      parseAmount(formData.nonComplianceChapter8Finance),
      parseAmount(formData.nonComplianceCorporateForm),
      parseAmount(formData.taxNotRemitted),
      parseAmount(formData.wealthTaxFee),
      parseAmount(formData.interestNonBankingFin),
      parseAmount(formData.interestFromBank),
      parseAmount(formData.employeeContribution),
      parseAmount(formData.loanBorrowing),
      parseAmount(formData.loanBorrowingScheduledBank),
      parseAmount(formData.leaveEncashmentPayable),
      parseAmount(formData.railwayAssetsPayable),
      parseAmount(formData.msmePayable),
    ].reduce((a, b) => a + b, 0);

    const notCredited = [
      parseAmount(formData.itemsFallingSection28),
      parseAmount(formData.performaCreditsDuty),
      parseAmount(formData.escalationClaimsYear),
      parseAmount(formData.anyOtherIncomeItem),
      parseAmount(formData.capitalReceipt),
    ].reduce((a, b) => a + b, 0);

    const taxCredits = [
      parseAmount(formData.unionExciseDutyCredit),
      parseAmount(formData.serviceTaxCredit),
      parseAmount(formData.cgstCredit),
      parseAmount(formData.sgstCredit),
      parseAmount(formData.igstCredit),
    ].reduce((a, b) => a + b, 0);

    const allDisallowances = section36 + section37 + section40;

    return { section36, section37, section40, notCredited, taxCredits, allDisallowances };
  }, [formData]);

  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([key, error]) => {
      if (error?.message) {
        errorList.push(`${key}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Part A-OI: Other Information</h2>
        <p className="mt-2 text-sm text-gray-600">
          Mandatory disclosure if liable for audit under section 44AB or as applicable. Fill items as per ITR-3 requirements.
        </p>
      </div>

      {/* Error Banner */}
      {hasErrors && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-900">
            ⚠️ Please correct the following {allErrors.length} error(s):
          </p>
          <ul className="mt-2 space-y-1 max-h-48 overflow-y-auto">
            {allErrors.map((error, index) => (
              <li key={index} className="text-xs text-red-800">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. Accounting Method */}
        <div className="space-y-4 rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900">1. Method of Accounting employed in the previous year</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <input type="radio" value="Cash" {...register('methodOfAccounting')} className="mr-2" />
              Cash System
            </label>
            <label className="block text-sm font-medium text-gray-700">
              <input type="radio" value="Mercantile" {...register('methodOfAccounting')} className="mr-2" />
              Mercantile System
            </label>
          </div>
        </div>

        {/* 2. Change in accounting method */}
        <div className="space-y-4 rounded-lg bg-yellow-50 p-4 border-l-4 border-yellow-500">
          <h3 className="font-semibold text-gray-900">2. Change in method of accounting</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input type="radio" value="yes" {...register('changeInAccountingMethod')} className="mr-2" />
              <span className="text-sm font-medium">Yes</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="no" {...register('changeInAccountingMethod')} className="mr-2" />
              <span className="text-sm font-medium">No</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">3a. Increase/Decrease in profit/loss due to deviation (as per ICDS)</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('increaseDecreaseDeviation3a')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">3b. Decrease/Increase in profit/loss (Schedule ICDS)</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('decreaseIncreaseDeviation3b')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        {/* 4. Stock Valuation */}
        <div className="space-y-4 rounded-lg bg-purple-50 p-4 border-l-4 border-purple-500">
          <h3 className="font-semibold text-gray-900">4. Method of valuation of closing stock</h3>
          <div>
            <input type="text" placeholder="Specify method (FIFO/LIFO/WAC/Market Rate)" {...register('stockValuationMethod')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none mb-4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input type="radio" value="yes" {...register('changeInStockValuationMethod')} className="mr-2" />
              <span className="text-sm font-medium">Change in method</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="no" {...register('changeInStockValuationMethod')} className="mr-2" />
              <span className="text-sm font-medium">No change</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">4d. Increase/Decrease due to deviation</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('increaseDecreaseDeviation4d')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">4e. Decrease/Increase from valuation method</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('decreaseIncreaseDeviation4e')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        {/* 5. Amounts not credited to P&L */}
        <div className="space-y-4 rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-900">5. Amounts not credited to P&L Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">5a. Items falling within section 28</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('itemsFallingSection28')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">5b. Performa Credits/Drawbacks/Refunds</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('performaCreditsDuty')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">5c. Escalation Claims in Previous Year</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('escalationClaimsYear')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">5d. Any Other Item of Income</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('anyOtherIncomeItem')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">5e. Capital Receipt</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('capitalReceipt')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-green-100 border border-green-300">
            <p className="text-sm font-semibold text-green-900">
              Section 5 Total: <span className="text-lg">₹{totals.notCredited.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* 6. Disallowance under Section 36 */}
        <div className="space-y-4 rounded-lg bg-orange-50 p-4 border-l-4 border-orange-500">
          <h3 className="font-semibold text-gray-900">6. Amounts debited under Section 36 (Disallowances)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6a. Insurance - Stock/Damage</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('insuranceStockDamage')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6b. Insurance - Employees Health</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('insuranceHealthEmployees')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6c. Bonus/Commission to Employees</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('bonusCommissionEmployees')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6d. Interest Paid</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('interestPaid')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6e. Discount on Zero-Coupon Bond</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('discountZeroCoupon')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">6f. Contribution - Provident Fund</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('recognizedProvidentFund')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-orange-100 border border-orange-300">
            <p className="text-sm font-semibold text-orange-900">
              Section 36 Total: <span className="text-lg">₹{totals.section36.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* 7. Disallowance under Section 37 */}
        <div className="space-y-4 rounded-lg bg-red-50 p-4 border-l-4 border-red-500">
          <h3 className="font-semibold text-gray-900">7. Amounts disallowable under Section 37</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">7a. Capital Expenditure</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('capitalExpenditureTax')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">7b. Personal Expenditure</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('capitalExpenditurePersonal')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">7c. Advertisement - Viability</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('advertisementViability')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">7e. Penalty or Fine</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('penaltyOrFine')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-300">
            <p className="text-sm font-semibold text-red-900">
              Section 37 Total: <span className="text-lg">₹{totals.section37.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Summary of Disallowances */}
        <div className="space-y-4 rounded-lg bg-slate-100 p-4 border-l-4 border-slate-600">
          <h3 className="font-semibold text-gray-900">Summary: Total Disallowances</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-lg bg-white p-3 border border-orange-200">
              <p className="text-xs text-gray-600">Section 36 Total</p>
              <p className="text-lg font-bold text-orange-700">₹{totals.section36.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-red-200">
              <p className="text-xs text-gray-600">Section 37 Total</p>
              <p className="text-lg font-bold text-red-700">₹{totals.section37.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-purple-200">
              <p className="text-xs text-gray-600">Section 40 Total</p>
              <p className="text-lg font-bold text-purple-700">₹{totals.section40.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 border border-blue-300">
              <p className="text-xs text-gray-600">Total Disallowances</p>
              <p className="text-lg font-bold text-blue-900">₹{totals.allDisallowances.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* 12. Credit Outstanding */}
        <div className="space-y-4 rounded-lg bg-indigo-50 p-4 border-l-4 border-indigo-500">
          <h3 className="font-semibold text-gray-900">12. Amount of Credit Outstanding in Accounts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Union Excise Duty</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('unionExciseDutyCredit')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Tax</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('serviceTaxCredit')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGST</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('cgstCredit')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SGST</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('sgstCredit')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IGST</label>
              <input type="number" placeholder="Amount" step="0.01" {...register('igstCredit')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-indigo-100 border border-indigo-300">
            <p className="text-sm font-semibold text-indigo-900">
              Total Tax Credits Outstanding: <span className="text-lg">₹{totals.taxCredits.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={hasErrors}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors ${
              hasErrors
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Submit & Complete ITR-3
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreePartAOI;
