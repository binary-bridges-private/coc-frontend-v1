import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// P&L Account Form Data Type
export interface PLFormData {
  // Credits
  grossProfitFromTrading?: string;
  incomeFromIntradayTrading?: string;
  
  // Other Income
  rentIncome?: string;
  commissionIncome?: string;
  dividendIncome?: string;
  interestIncome?: string;
  profitOnSaleOfFixedAssets?: string;
  profitOnSaleOfSTTSecurities?: string;
  profitOnSaleOfOtherInvestment?: string;
  foreignExchangeGain?: string;
  profitOnInventoryConversion?: string;
  agriculturalIncome?: string;
  otherIncomeSpecified1?: string;
  otherIncomeSpecified2?: string;
  
  // Debits
  freightOutward?: string;
  consumptionOfStoresAndSpareParts?: string;
  powerAndFuel?: string;
  rents?: string;
  repairsToBuilding?: string;
  repairsToMachinery?: string;
  
  // Compensation to Employees
  salariesAndWages?: string;
  bonus?: string;
  reimbursementMedicalExpenses?: string;
  leaveEncashment?: string;
  leaveTravelBenefits?: string;
  contributionSuperannuationFund?: string;
  contributionProvidentFund?: string;
  contributionGratuityFund?: string;
  contributionOtherFund?: string;
  otherEmployeeBenefits?: string;
  paidToNonResidents?: string;
  
  // Insurance
  medicalInsurance?: string;
  lifeInsurance?: string;
  keymansInsurance?: string;
  otherInsurance?: string;
  
  // Other Expenses
  workmenWelfareExpenses?: string;
  entertainment?: string;
  hospitality?: string;
  conference?: string;
  salesPromotion?: string;
  advertisement?: string;
  commissionPaidOutsideIndia?: string;
  commissionPaidToOthers?: string;
  royaltyPaidOutsideIndia?: string;
  royaltyPaidToOthers?: string;
  professionalFeesPaidOutsideIndia?: string;
  professionalFeesPaidToOthers?: string;
  hotelBoardingLodging?: string;
  travelingExpenses?: string;
  foreignTravelingExpenses?: string;
  conveyanceExpenses?: string;
  telephoneExpenses?: string;
  guestHouseExpenses?: string;
  clubExpenses?: string;
  festivalCelebrationExpenses?: string;
  scholarship?: string;
  gift?: string;
  donation?: string;
  
  // Rates and Taxes
  unionExciseDuty?: string;
  serviceTax?: string;
  vatSalesTax?: string;
  cess?: string;
  cgst?: string;
  sgst?: string;
  igst?: string;
  utgst?: string;
  otherTaxDuty?: string;
  
  // Additional
  auditFee?: string;
  otherExpensesSpecified1?: string;
  otherExpensesSpecified2?: string;
  badDebtsPAN?: string;
  badDebtsNoPAN?: string;
  badDebtsLessThan1Lakh?: string;
  provisionForBadDebts?: string;
  otherProvisions?: string;
  interest?: string;
  depreciation?: string;
}

// Zod Schema with validation
const plSchema = z.object({
  // Credits
  grossProfitFromTrading: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  incomeFromIntradayTrading: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  rentIncome: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  commissionIncome: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  dividendIncome: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  interestIncome: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  profitOnSaleOfFixedAssets: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  
  profitOnSaleOfSTTSecurities: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  
  profitOnSaleOfOtherInvestment: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  
  foreignExchangeGain: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),
  
  profitOnInventoryConversion: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  agriculturalIncome: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  otherIncomeSpecified1: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  otherIncomeSpecified2: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  // All debit fields - optional non-negative amounts
  freightOutward: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  consumptionOfStoresAndSpareParts: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  powerAndFuel: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  rents: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  repairsToBuilding: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  repairsToMachinery: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  salariesAndWages: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  bonus: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  reimbursementMedicalExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  leaveEncashment: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  leaveTravelBenefits: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  contributionSuperannuationFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  contributionProvidentFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  contributionGratuityFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  contributionOtherFund: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  otherEmployeeBenefits: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  paidToNonResidents: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  medicalInsurance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  lifeInsurance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  keymansInsurance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  otherInsurance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  workmenWelfareExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  entertainment: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  hospitality: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  conference: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  salesPromotion: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  advertisement: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  commissionPaidOutsideIndia: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  commissionPaidToOthers: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  royaltyPaidOutsideIndia: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  royaltyPaidToOthers: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  professionalFeesPaidOutsideIndia: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  professionalFeesPaidToOthers: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  hotelBoardingLodging: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  travelingExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  foreignTravelingExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  conveyanceExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  telephoneExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  guestHouseExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  clubExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  festivalCelebrationExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  scholarship: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  gift: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  donation: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  unionExciseDuty: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  serviceTax: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  vatSalesTax: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  cess: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  cgst: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  sgst: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  igst: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  utgst: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  otherTaxDuty: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  auditFee: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  otherExpensesSpecified1: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  otherExpensesSpecified2: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  badDebtsPAN: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  badDebtsNoPAN: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  badDebtsLessThan1Lakh: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  provisionForBadDebts: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  otherProvisions: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  interest: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

  depreciation: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),

}).superRefine((data, ctx) => {
  // Helper function to safely parse amounts
  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // Calculate total credits
  const totalOtherIncome = 
    parseAmount(data.rentIncome) +
    parseAmount(data.commissionIncome) +
    parseAmount(data.dividendIncome) +
    parseAmount(data.interestIncome) +
    parseAmount(data.profitOnSaleOfFixedAssets) +
    parseAmount(data.profitOnSaleOfSTTSecurities) +
    parseAmount(data.profitOnSaleOfOtherInvestment) +
    parseAmount(data.foreignExchangeGain) +
    parseAmount(data.profitOnInventoryConversion) +
    parseAmount(data.agriculturalIncome) +
    parseAmount(data.otherIncomeSpecified1) +
    parseAmount(data.otherIncomeSpecified2);

  const totalCredits = 
    parseAmount(data.grossProfitFromTrading) +
    parseAmount(data.incomeFromIntradayTrading) +
    totalOtherIncome;

  // Calculate total compensation to employees
  const totalCompensation = 
    parseAmount(data.salariesAndWages) +
    parseAmount(data.bonus) +
    parseAmount(data.reimbursementMedicalExpenses) +
    parseAmount(data.leaveEncashment) +
    parseAmount(data.leaveTravelBenefits) +
    parseAmount(data.contributionSuperannuationFund) +
    parseAmount(data.contributionProvidentFund) +
    parseAmount(data.contributionGratuityFund) +
    parseAmount(data.contributionOtherFund) +
    parseAmount(data.otherEmployeeBenefits);

  // Calculate total insurance
  const totalInsurance = 
    parseAmount(data.medicalInsurance) +
    parseAmount(data.lifeInsurance) +
    parseAmount(data.keymansInsurance) +
    parseAmount(data.otherInsurance);

  // Calculate total taxes
  const totalTaxes = 
    parseAmount(data.unionExciseDuty) +
    parseAmount(data.serviceTax) +
    parseAmount(data.vatSalesTax) +
    parseAmount(data.cess) +
    parseAmount(data.cgst) +
    parseAmount(data.sgst) +
    parseAmount(data.igst) +
    parseAmount(data.utgst) +
    parseAmount(data.otherTaxDuty);

  // Calculate total commissions
  const totalCommission = 
    parseAmount(data.commissionPaidOutsideIndia) +
    parseAmount(data.commissionPaidToOthers);

  // Calculate total royalty
  const totalRoyalty = 
    parseAmount(data.royaltyPaidOutsideIndia) +
    parseAmount(data.royaltyPaidToOthers);

  // Calculate total professional fees
  const totalProfessionalFees = 
    parseAmount(data.professionalFeesPaidOutsideIndia) +
    parseAmount(data.professionalFeesPaidToOthers);

  // Calculate total bad debts
  const totalBadDebts = 
    parseAmount(data.badDebtsPAN) +
    parseAmount(data.badDebtsNoPAN) +
    parseAmount(data.badDebtsLessThan1Lakh);

  // Calculate total debits
  const totalDebits = 
    parseAmount(data.freightOutward) +
    parseAmount(data.consumptionOfStoresAndSpareParts) +
    parseAmount(data.powerAndFuel) +
    parseAmount(data.rents) +
    parseAmount(data.repairsToBuilding) +
    parseAmount(data.repairsToMachinery) +
    totalCompensation +
    totalInsurance +
    parseAmount(data.workmenWelfareExpenses) +
    parseAmount(data.entertainment) +
    parseAmount(data.hospitality) +
    parseAmount(data.conference) +
    parseAmount(data.salesPromotion) +
    parseAmount(data.advertisement) +
    totalCommission +
    totalRoyalty +
    totalProfessionalFees +
    parseAmount(data.hotelBoardingLodging) +
    parseAmount(data.travelingExpenses) +
    parseAmount(data.foreignTravelingExpenses) +
    parseAmount(data.conveyanceExpenses) +
    parseAmount(data.telephoneExpenses) +
    parseAmount(data.guestHouseExpenses) +
    parseAmount(data.clubExpenses) +
    parseAmount(data.festivalCelebrationExpenses) +
    parseAmount(data.scholarship) +
    parseAmount(data.gift) +
    parseAmount(data.donation) +
    totalTaxes +
    parseAmount(data.auditFee) +
    parseAmount(data.otherExpensesSpecified1) +
    parseAmount(data.otherExpensesSpecified2) +
    totalBadDebts +
    parseAmount(data.provisionForBadDebts) +
    parseAmount(data.otherProvisions) +
    parseAmount(data.interest) +
    parseAmount(data.depreciation);

  const netProfit = totalCredits - totalDebits;

  console.log('📊 P&L Account Calculations:', {
    'Total Credits': totalCredits,
    'Total Debits': totalDebits,
    'Net Profit/Loss': netProfit,
    'Total Compensation': totalCompensation,
    'Total Insurance': totalInsurance,
    'Total Taxes': totalTaxes,
    'Total Bad Debts': totalBadDebts,
  });

  // Validation: Total bad debts should be reasonable
  if (totalBadDebts > totalCredits * 0.5) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Total Bad Debts (₹${totalBadDebts.toFixed(2)}) should not exceed 50% of total credits.`,
      path: [],
    });
  }
});

interface ItrThreePartAPLProps {
  initialData?: PLFormData;
  onNext: () => void;
  onBack: () => void;
  onSave: (data: PLFormData) => void;
}

const ItrThreePartAPL: React.FC<ItrThreePartAPLProps> = ({
  initialData,
  onNext,
  onBack,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PLFormData>({
    resolver: zodResolver(plSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  // Watch key fields for calculations
  const grossProfit = watch('grossProfitFromTrading');
  const intradayIncome = watch('incomeFromIntradayTrading');
  const rentIncome = watch('rentIncome');
  const commissionIncome = watch('commissionIncome');
  const interestIncome = watch('interestIncome');

  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  const totalCredits = useMemo(() => {
    return parseAmount(grossProfit) + parseAmount(intradayIncome) + parseAmount(rentIncome) + 
           parseAmount(commissionIncome) + parseAmount(interestIncome);
  }, [grossProfit, intradayIncome, rentIncome, commissionIncome, interestIncome]);

  const onSubmit = (data: PLFormData) => {
    onSave(data);
    onNext();
  };

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
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Part A - Profit and Loss Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Financial Year 2024-25 | Fill items 13 to 60 for regular books of account
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
        {/* Credits Section */}
        <div className="space-y-6">
          <div className="border-b-2 border-green-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">CREDITS TO P&L ACCOUNT</h3>
          </div>

          {/* Item 13 & 14 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                13. Gross Profit from Trading Account
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                {...register('grossProfitFromTrading')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.grossProfitFromTrading ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.grossProfitFromTrading && (
                <p className="mt-1 text-xs text-red-600">{errors.grossProfitFromTrading.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Income from Intraday Trading
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                {...register('incomeFromIntradayTrading')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.incomeFromIntradayTrading ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.incomeFromIntradayTrading && (
                <p className="mt-1 text-xs text-red-600">{errors.incomeFromIntradayTrading.message}</p>
              )}
            </div>
          </div>

          {/* Other Income Section */}
          <div className="space-y-4 rounded-lg bg-green-50 p-4">
            <h4 className="font-semibold text-gray-900">14. Other Income</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">i. Rent Income</label>
                <input type="number" placeholder="₹" step="0.01" {...register('rentIncome')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ii. Commission Income</label>
                <input type="number" placeholder="₹" step="0.01" {...register('commissionIncome')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iii. Dividend Income</label>
                <input type="number" placeholder="₹" step="0.01" {...register('dividendIncome')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iv. Interest Income</label>
                <input type="number" placeholder="₹" step="0.01" {...register('interestIncome')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">v. Profit on Sale of Fixed Assets</label>
                <input type="number" placeholder="₹" step="0.01" {...register('profitOnSaleOfFixedAssets')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">vi. Profit on Sale of STT Securities</label>
                <input type="number" placeholder="₹" step="0.01" {...register('profitOnSaleOfSTTSecurities')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Total Credits */}
          <div className="rounded-lg bg-green-100 p-4 border-l-4 border-green-500">
            <p className="text-sm font-semibold text-gray-900">Total Credits (13 + 14xii)</p>
            <p className="text-2xl font-bold text-green-700">₹{totalCredits.toFixed(2)}</p>
          </div>
        </div>

        {/* Debits Section - Simplified for display */}
        <div className="space-y-6">
          <div className="border-b-2 border-red-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">DEBITS TO P&L ACCOUNT</h3>
          </div>

          <div className="rounded-lg bg-yellow-50 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-4">16-21. Operating Expenses</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">16. Freight Outward</label>
                <input type="number" placeholder="₹" step="0.01" {...register('freightOutward')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">17. Consumption of Stores & Spare Parts</label>
                <input type="number" placeholder="₹" step="0.01" {...register('consumptionOfStoresAndSpareParts')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">18. Power and Fuel</label>
                <input type="number" placeholder="₹" step="0.01" {...register('powerAndFuel')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">19. Rents</label>
                <input type="number" placeholder="₹" step="0.01" {...register('rents')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">20. Repairs to Building</label>
                <input type="number" placeholder="₹" step="0.01" {...register('repairsToBuilding')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">21. Repairs to Machinery</label>
                <input type="number" placeholder="₹" step="0.01" {...register('repairsToMachinery')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Compensation Section */}
          <div className="space-y-4 rounded-lg bg-blue-50 p-4">
            <h4 className="font-semibold text-gray-900">22. Compensation to Employees</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">i. Salaries and Wages</label>
                <input type="number" placeholder="₹" step="0.01" {...register('salariesAndWages')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ii. Bonus</label>
                <input type="number" placeholder="₹" step="0.01" {...register('bonus')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iii. Medical Reimbursement</label>
                <input type="number" placeholder="₹" step="0.01" {...register('reimbursementMedicalExpenses')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iv. Leave Encashment</label>
                <input type="number" placeholder="₹" step="0.01" {...register('leaveEncashment')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Insurance Section */}
          <div className="space-y-4 rounded-lg bg-purple-50 p-4">
            <h4 className="font-semibold text-gray-900">23. Insurance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">i. Medical Insurance</label>
                <input type="number" placeholder="₹" step="0.01" {...register('medicalInsurance')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ii. Life Insurance</label>
                <input type="number" placeholder="₹" step="0.01" {...register('lifeInsurance')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iii. Keyman's Insurance</label>
                <input type="number" placeholder="₹" step="0.01" {...register('keymansInsurance')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iv. Other Insurance</label>
                <input type="number" placeholder="₹" step="0.01" {...register('otherInsurance')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Taxes Section */}
          <div className="space-y-4 rounded-lg bg-orange-50 p-4">
            <h4 className="font-semibold text-gray-900">44. Rates and Taxes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">i. Union Excise Duty</label>
                <input type="number" placeholder="₹" step="0.01" {...register('unionExciseDuty')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ii. Service Tax</label>
                <input type="number" placeholder="₹" step="0.01" {...register('serviceTax')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">v. CGST</label>
                <input type="number" placeholder="₹" step="0.01" {...register('cgst')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">vi. SGST</label>
                <input type="number" placeholder="₹" step="0.01" {...register('sgst')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Bad Debts Section */}
          <div className="space-y-4 rounded-lg bg-red-50 p-4">
            <h4 className="font-semibold text-gray-900">47. Bad Debts</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">i. Bad Debts with PAN</label>
                <input type="number" placeholder="₹" step="0.01" {...register('badDebtsPAN')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ii. Bad Debts without PAN (above Rs 1L)</label>
                <input type="number" placeholder="Amount" step="0.01" {...register('badDebtsNoPAN')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">iii. Bad Debts (below Rs 1L)</label>
                <input type="number" placeholder="Amount" step="0.01" {...register('badDebtsLessThan1Lakh')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Other Debit Fields */}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4">
            <h4 className="font-semibold text-gray-900">Other Debit Items</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">24. Workmen & Staff Welfare</label>
                <input type="number" placeholder="₹" step="0.01" {...register('workmenWelfareExpenses')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">25. Entertainment</label>
                <input type="number" placeholder="₹" step="0.01" {...register('entertainment')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">29. Advertisement</label>
                <input type="number" placeholder="₹" step="0.01" {...register('advertisement')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">45. Audit Fee</label>
                <input type="number" placeholder="₹" step="0.01" {...register('auditFee')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">48. Provision for Bad Debts</label>
                <input type="number" placeholder="₹" step="0.01" {...register('provisionForBadDebts')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Depreciation</label>
                <input type="number" placeholder="₹" step="0.01" {...register('depreciation')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
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
            Next: Complete Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreePartAPL;
